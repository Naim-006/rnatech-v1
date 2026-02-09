
import * as React from 'react';
import { useApp } from '../App';
import { ICONS } from '../constants';

const CheckoutPage = () => {
  const { state, removeFromCart } = useApp();
  const total = state.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (state.cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-32 text-center">
        <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5">
          <ICONS.ShoppingCart />
        </div>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-slate-400 mb-8">Looks like you haven't added any enterprise hardware yet.</p>
        <button className="px-8 py-3 bg-brand-600 rounded-xl font-bold">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-5xl font-black mb-12 tracking-tight">Secure Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {state.cart.map(item => (
            <div key={item.product.id} className="flex flex-col sm:flex-row gap-6 p-6 md:p-8 glass rounded-2xl md:rounded-[2.5rem] border border-white/5">
              <img src={item.product.image} className="w-full sm:w-24 h-48 sm:h-24 rounded-xl object-cover" />
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg md:text-xl">{item.product.name}</h4>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-slate-500 hover:text-red-500 transition-colors text-sm font-bold uppercase tracking-widest">
                    Remove
                  </button>
                </div>
                <p className="text-slate-400 text-sm mb-4">Qty: {item.quantity}</p>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="font-mono text-brand-500 text-sm">৳{item.product.price.toLocaleString()}</span>
                  <span className="font-bold text-lg">৳{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/10">
            <h3 className="text-xl md:text-2xl font-black mb-8 italic uppercase tracking-wider">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Subtotal</span>
                <span>৳{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Shipping</span>
                <span className="text-[10px] uppercase font-black">Calculated at next step</span>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="text-3xl font-black text-brand-500 tracking-tight">৳{total.toLocaleString()}</span>
              </div>
            </div>
            <button className="w-full py-4 bg-brand-600 hover:bg-brand-500 rounded-xl font-bold text-lg shadow-lg shadow-brand-600/20 transition-all">
              Proceed to Payment
            </button>
            <div className="mt-6 flex items-center justify-center gap-4 grayscale opacity-50">
              <span className="text-xs font-bold italic">STRIPE</span>
              <span className="text-xs font-bold italic">PAYPAL</span>
              <span className="text-xs font-bold italic">APPLE PAY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
