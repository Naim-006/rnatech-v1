import SSLCommerzPayment from 'sslcommerz-lts';

// Vercel Serverless Function: /api/payment.js
export default async function handler(req, res) {
  // 1. Set CORS Headers (Optional but recommended for cross-origin frontend)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. Only allow POST requests for payment initiation
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // 3. Environment Variables (Set these in your Vercel Dashboard)
  const store_id = process.env.STORE_ID;
  const store_pass = process.env.STORE_PASS;
  const is_live = process.env.IS_LIVE === 'true'; // Set to true for production
  const backend_url = process.env.BACKEND_URL; // e.g., https://your-app.vercel.app

  // 4. Initialize SSLCommerz
  const sslcommerz = new SSLCommerzPayment(store_id, store_pass, is_live);

  const { order_id, amount, customer_name, customer_email, customer_phone } = req.body;

  // 5. Build the payment data object correctly for SSLCommerz
  const data = {
    total_amount: amount,
    currency: 'BDT',
    tran_id: order_id,
    success_url: `${backend_url}/api/success?orderId=${order_id}`, // Add logic for this in /api/success.js
    fail_url: `${backend_url}/api/fail?orderId=${order_id}`,       // Add logic for this in /api/fail.js
    cancel_url: `${backend_url}/api/cancel?orderId=${order_id}`,   // Add logic for this in /api/cancel.js
    ipn_url: `${backend_url}/api/ipn`,                             // Add logic for this in /api/ipn.js
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
    value_a: order_id, // Store order ID for reference in IPN
  };

  try {
    // 6. Initiate Payment
    const apiResponse = await sslcommerz.init(data);
    
    if (apiResponse.GatewayPageURL) {
      // Return the redirect URL to the frontend
      return res.status(200).json({ url: apiResponse.GatewayPageURL });
    } else {
      // Log error for debugging (visible in Vercel logs)
      console.error('SSLCommerz Session Failed:', apiResponse);
      return res.status(400).json({ 
        message: 'SSLCommerz session initiation failed', 
        error: apiResponse.failedreason || 'Unknown error' 
      });
    }
  } catch (err) {
    console.error('Server Internal Error:', err);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: err.message 
    });
  }
}

/**
 * DEPLOYMENT NOTES:
 * 
 * 1. SUCCESS/FAIL/CANCEL HANDLING:
 *    To handle the redirect after payment, create separate files:
 *    - /api/success.js
 *    - /api/fail.js
 *    - /api/cancel.js
 * 
 *    Example logic for /api/success.js:
 *    export default async function handler(req, res) {
 *       const { orderId } = req.query;
 *       // Update your Database (e.g., Supabase) here using orderId
 *       res.redirect(`${process.env.FRONTEND_URL}/tracking?order=${orderId}&status=paid`);
 *    }
 * 
 * 2. DATABASE INTEGRATION:
 *    Vercel functions are stateless. Use a remote database like Supabase (which you are already using).
 *    Initialize your Supabase client inside the handler or globally in the file.
 * 
 * 3. IPN (Instant Payment Notification):
 *    SSLCommerz will send a POST to /api/ipn. Your handler there should verify the signature 
 *    and update the order status in your DB to 'PAID'.
 */
