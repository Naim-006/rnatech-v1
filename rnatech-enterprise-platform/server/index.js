import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import SSLCommerzPayment from 'sslcommerz-lts';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

// Supabase Setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// SSLCommerz Setup
const store_id = process.env.STORE_ID;
const store_pass = process.env.STORE_PASS;
const is_live = process.env.IS_LIVE === 'true';

const sslcommerz = new SSLCommerzPayment(store_id, store_pass, is_live);

// --- Payment Routes ---

// Initiates a payment session
app.post('/payment/init', async (req, res) => {
  const { order_id, amount, customer_name, customer_email, customer_phone, items } = req.body;

  const data = {
    total_amount: amount,
    currency: 'BDT',
    tran_id: order_id, // using our internal order_id as the transaction id
    success_url: `${process.env.BACKEND_URL}/payment/success/${order_id}`,
    fail_url: `${process.env.BACKEND_URL}/payment/fail/${order_id}`,
    cancel_url: `${process.env.BACKEND_URL}/payment/cancel/${order_id}`,
    ipn_url: `${process.env.BACKEND_URL}/payment/ipn`,
    shipping_method: 'Courier',
    product_name: 'Hardware Order',
    product_category: 'Electronics',
    product_profile: 'general',
    cus_name: customer_name,
    cus_email: customer_email,
    cus_add1: 'Dhaka',
    cus_city: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: customer_phone,
    ship_name: customer_name,
    ship_add1: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: '1000',
    ship_country: 'Bangladesh',
    value_a: order_id,
  };

  try {
    const apiResponse = await sslcommerz.init(data);
    if (apiResponse.GatewayPageURL) {
      res.status(200).json({ url: apiResponse.GatewayPageURL });
    } else {
      res.status(400).json({ message: 'SSLCommerz session initiation failed', error: apiResponse });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Success handling
app.post('/payment/success/:orderId', async (req, res) => {
  const { orderId } = req.params;
  
  // Here we redirect back to the frontend with a success flag
  res.redirect(`${process.env.FRONTEND_URL}/tracking?order=${orderId}&status=paid`);
});

// Fail handling
app.post('/payment/fail/:orderId', async (req, res) => {
  const { orderId } = req.params;
  res.redirect(`${process.env.FRONTEND_URL}/checkout?error=payment_failed`);
});

// Cancel handling
app.post('/payment/cancel/:orderId', async (req, res) => {
  const { orderId } = req.params;
  res.redirect(`${process.env.FRONTEND_URL}/checkout?error=payment_cancelled`);
});

// IPN Handling (Internal Payment Notification)
// This is the most crucial part for secure status updates
app.post('/payment/ipn', async (req, res) => {
  const payload = req.body;
  
  if (payload.status === 'VALID' || payload.status === 'VALIDATED') {
    const orderId = payload.value_a;
    
    // Update order in Supabase
    const { error } = await supabase
      .from('orders')
      .update({ 
        payment_status: 'PAID',
        status: 'processing',
        payment_details: payload
      })
      .eq('id', orderId);

    if (error) {
      console.error('IPN Status Update Error:', error);
      return res.status(500).send('Database update failed');
    }

    res.status(200).send('IPN Received and Processed');
  } else {
    res.status(400).send('Invalid Status');
  }
});

app.listen(port, () => {
    console.log(`Payment Server listening on port ${port}`);
});
