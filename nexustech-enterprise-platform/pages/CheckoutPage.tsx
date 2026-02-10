
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { ICONS } from '../constants';

const CheckoutPage = () => {
    const { state, theme, t, lang, updateQuantity, removeFromCart, clearCart } = useApp();
    const navigate = useNavigate();
    const [step, setStep] = useState<'cart' | 'details' | 'success'>('cart');
    const [orderId, setOrderId] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        name: state.user?.email || '',
        phone: '',
        address: '',
        paymentMethod: 'cod' // cod or digital
    });

    useEffect(() => {
        if (state.cart.length === 0 && step !== 'success') {
            // If cart is empty and not in success state, maybe redirect or show empty state
        }
    }, [state.cart, step]);

    const subtotal = state.cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const deliveryFee = 100; // Flat rate for now
    const total = subtotal + deliveryFee;

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock Order Placement
        const newOrderId = 'ORD-' + Math.floor(Math.random() * 1000000);
        setOrderId(newOrderId);
        setStep('success');
        clearCart();
        window.scrollTo(0, 0);
    };

    if (state.cart.length === 0 && step !== 'success') {
        return (
            <div className={`min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                <div className={`p-10 rounded-[3rem] border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                    <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
                        <ICONS.ShoppingCart className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-black mb-2">{t('checkout_cart_empty')}</h2>
                    <p className="text-slate-500 mb-8 max-w-xs mx-auto">Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/shop" className="inline-block px-8 py-4 rounded-2xl bg-brand-600 text-white font-black uppercase tracking-widest hover:bg-brand-500 transition-all shadow-lg shadow-brand-600/30">
                        {t('checkout_continue_shopping')}
                    </Link>
                </div>
            </div>
        );
    }

    if (step === 'success') {
        return (
            <div className={`min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`max-w-md w-full p-10 rounded-[3rem] border relative overflow-hidden ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-500 to-cyan-500" />

                    <div className="w-24 h-24 mx-auto bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-black mb-2">{t('checkout_success_title')}</h2>
                    <p className="text-slate-500 mb-8 font-medium">{t('checkout_success_desc')}</p>

                    <div className={`p-6 rounded-2xl mb-8 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
                        <span className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1">{t('checkout_order_id')}</span>
                        <span className="text-xl font-mono font-bold tracking-wider">{orderId}</span>
                    </div>

                    <Link to="/shop" className="block w-full px-8 py-4 rounded-2xl bg-brand-600 text-white font-black uppercase tracking-widest hover:bg-brand-500 transition-all shadow-lg shadow-brand-600/30">
                        {t('checkout_continue_shopping')}
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pt-32 pb-20 px-6 transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-3">{t('checkout_title')}</h1>
                    <p className="text-slate-500 text-lg font-medium">{t('checkout_subtitle')}</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Cart & Form */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Cart Review */}
                        <section className={`p-8 rounded-[2.5rem] border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center text-sm">1</span>
                                {t('checkout_cart_items')}
                            </h3>

                            <div className="space-y-6">
                                {state.cart.map((item) => (
                                    <div key={item.product.id} className={`flex gap-4 p-4 rounded-2xl transition-colors ${theme === 'dark' ? 'bg-slate-900/30 hover:bg-slate-900/50' : 'bg-slate-50 hover:bg-slate-100'}`}>
                                        <div className="w-20 h-20 rounded-xl bg-slate-200 overflow-hidden flex-shrink-0">
                                            <img src={item.product.image} alt={item.product.name_en} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow flex flex-col justify-center">
                                            <h4 className="font-bold text-lg leading-tight mb-1">{lang === 'bn' ? item.product.name_bn : item.product.name_en}</h4>
                                            <p className="text-brand-500 font-bold">৳{item.product.price.toLocaleString()}</p>
                                        </div>
                                        <div className="flex flex-col items-end justify-between">
                                            <div className="flex items-center gap-3 bg-white/10 rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, -1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-500/20 text-slate-500"
                                                >
                                                    -
                                                </button>
                                                <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, 1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-brand-500/20 text-brand-500"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-wider"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Guest Details Form */}
                        <section className={`p-8 rounded-[2.5rem] border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center text-sm">2</span>
                                {t('checkout_customer_details')}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t('auth_name')}</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t('auth_phone')}</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className={`w-full border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                        placeholder="Mobile Number"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t('checkout_address')}</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className={`w-full border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all resize-none ${theme === 'dark' ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                        placeholder="Delivery Address"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Summary & Payment */}
                    <div className="lg:col-span-1">
                        <div className={`sticky top-24 p-8 rounded-[2.5rem] border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
                            <h3 className="text-xl font-black mb-6">{t('checkout_summary')}</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                                    <span>{t('checkout_subtotal')}</span>
                                    <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>৳{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                                    <span>{t('checkout_delivery')}</span>
                                    <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>৳{deliveryFee.toLocaleString()}</span>
                                </div>
                                <div className={`h-px w-full ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`} />
                                <div className="flex justify-between items-center text-xl font-black">
                                    <span>{t('checkout_total')}</span>
                                    <span className="text-brand-500">৳{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">{t('checkout_payment_method')}</h4>
                                <label className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-brand-500 bg-brand-500/5' : theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={formData.paymentMethod === 'cod'}
                                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                                        className="text-brand-500 focus:ring-brand-500"
                                    />
                                    <span className="font-bold text-sm">{t('checkout_cod')}</span>
                                </label>
                                <label className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === 'digital' ? 'border-brand-500 bg-brand-500/5' : theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="digital"
                                        checked={formData.paymentMethod === 'digital'}
                                        onChange={() => setFormData({ ...formData, paymentMethod: 'digital' })}
                                        className="text-brand-500 focus:ring-brand-500"
                                    />
                                    <span className="font-bold text-sm">{t('checkout_digital')}</span>
                                    <span className="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded bg-slate-200 text-slate-600">Soon</span>
                                </label>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={state.cart.length === 0 || !formData.name || !formData.phone || !formData.address}
                                className="w-full py-5 rounded-2xl bg-brand-600 text-white font-black uppercase tracking-widest hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-brand-600/30"
                            >
                                {t('checkout_place_order')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
