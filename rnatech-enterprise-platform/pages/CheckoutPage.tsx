
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { ICONS } from '../constants';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { state, theme, t, lang, updateQuantity, removeFromCart, clearCart, currency, systemSettings } = useApp();
    const { user, profile } = useAuth();
    const [checkoutStep, setCheckoutStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [isApplyingPromo, setIsApplyingPromo] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isCopied, setIsCopied] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.email?.split('@')[0] || '',
        phone: '',
        district: 'dhaka',
        address: '',
        paymentType: 'cod' as 'cod' | 'mobile' | 'digital',
        mobileProvider: 'bkash' as 'bkash' | 'nagad' | 'rocket',
        mobileNumber: '',
        trxId: ''
    });

    useEffect(() => {
        if (profile) {
            setFormData(prev => ({
                ...prev,
                name: profile.full_name || user?.email?.split('@')[0] || prev.name,
                phone: profile.phone || prev.phone,
                address: profile.address || prev.address
            }));
        }
    }, [profile, user]);

    const subtotal = state.cart.reduce((acc, item) => acc + (Number(item.product.price || 0) * item.quantity), 0);

    const getDeliveryFee = () => {
        if (!systemSettings) return 0;
        if (subtotal >= Number(systemSettings.free_shipping_threshold || 5000)) return 0;
        return formData.district === 'dhaka'
            ? Number(systemSettings.shipping_fee_inside_dhaka || 60)
            : Number(systemSettings.shipping_fee_outside_dhaka || 120);
    };

    const deliveryFee = getDeliveryFee();
    const vat = subtotal * (Number(systemSettings?.vat_percentage || 0) / 100);
    const total = subtotal + deliveryFee + vat - discount;

    const handleApplyPromo = async () => {
        setIsApplyingPromo(true);
        if (!promoCode) {
            setIsApplyingPromo(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('promo_codes')
                .select('*')
                .eq('code', promoCode.toUpperCase())
                .eq('status', 'active')
                .single();

            if (error || !data) {
                alert("Invalid or expired promo code");
                setDiscount(0); // Reset discount if invalid
                setIsApplyingPromo(false);
                return;
            }

            // Check expiry
            if (data.expiry_date && new Date(data.expiry_date) < new Date()) {
                alert("Promo code has expired");
                setDiscount(0);
                setIsApplyingPromo(false);
                return;
            }

            // Check min order
            if (subtotal < data.min_order_amount) {
                alert(`Min order for this code is ৳${data.min_order_amount}`);
                setDiscount(0);
                setIsApplyingPromo(false);
                return;
            }

            let calculatedDiscount = 0;
            if (data.discount_type === 'percentage') {
                calculatedDiscount = (subtotal * data.discount_value) / 100;
                if (data.max_discount && calculatedDiscount > data.max_discount) {
                    calculatedDiscount = data.max_discount;
                }
            } else {
                calculatedDiscount = data.discount_value;
            }

            setDiscount(calculatedDiscount);
            alert(`Promo code applied! You saved ${currency}${(calculatedDiscount || 0).toLocaleString()}`);
            // setShowCelebration(true); // Assuming this is a UI state, not defined in snippet
            // setTimeout(() => setShowCelebration(false), 3000);
        } catch (err: any) {
            console.error("Error applying promo:", err);
            alert("Failed to apply promo code: " + err.message);
            setDiscount(0);
        } finally {
            setIsApplyingPromo(false);
        }
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        setCheckoutStep('processing'); // Move to processing step immediately

        try {
            const newOrderId = `RNA-${Math.floor(100000 + Math.random() * 900000)}`;

            const { data: orderData, error: orderError } = await supabase.from('orders').insert({
                user_id: user?.id || null,
                tracking_number: newOrderId,
                total_amount: total,
                subtotal: subtotal,
                delivery_fee: deliveryFee,
                discount_amount: discount,
                promo_code_applied: promoCode || null,
                status: 'pending',
                payment_status: formData.paymentType === 'digital' ? 'PENDING' : 'UNPAID',
                mobile_payment_trxid: formData.paymentType === 'mobile' ? formData.trxId : null,
                shipping_address: formData.address,
                customer_name: formData.name,
                customer_phone: formData.phone,
                delivery_district: formData.district,
                payment_type: formData.paymentType,
                mobile_payment_provider: formData.paymentType === 'mobile' ? formData.mobileProvider : null,
                mobile_payment_number: formData.paymentType === 'mobile' ? formData.mobileNumber : null,
            }).select('id').single();

            if (orderError || !orderData) {
                throw orderError || new Error("Failed to create order.");
            }

            // Insert items into order_items table
            const itemInserts = state.cart.map(item => ({
                order_id: orderData.id,
                product_id: item.product.id,
                quantity: item.quantity,
                unit_price: item.product.price
            }));

            const { error: itemsError } = await supabase.from('order_items').insert(itemInserts);
            if (itemsError) throw itemsError;

            // In a real app, also add a logistics log entry
            await supabase.from('logistics_logs').insert({
                order_id: orderData.id,
                status: 'pending',
                location: 'Dhaka Warehouse',
                notes: 'Order placed and awaiting processing.'
            });

            setOrderId(newOrderId);

            // GUEST MEMORY: Save to local storage for quick tracking
            try {
                const existing = JSON.parse(localStorage.getItem('rnatech_recent_orders') || '[]');
                const updated = [newOrderId, ...existing.filter((id: string) => id !== newOrderId)].slice(0, 5);
                localStorage.setItem('rnatech_recent_orders', JSON.stringify(updated));
            } catch (lsErr) {
                console.error("Local Storage Save Fail:", lsErr);
            }

            // SSLCommerz Integration
            if (formData.paymentType === 'digital') {
                const response = await fetch('http://localhost:5000/payment/init', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        order_id: orderData.id,
                        amount: total,
                        customer_name: formData.name,
                        customer_email: user?.email || 'guest@rnatech.cloud',
                        customer_phone: formData.phone,
                        items: state.cart.map(i => i.product.name)
                    })
                });

                const paymentData = await response.json();
                if (paymentData.url) {
                    window.location.href = paymentData.url;
                    return; // Stop further execution as we are redirecting
                } else {
                    throw new Error(paymentData.message || "Payment initiation failed");
                }
            }

            setCheckoutStep('success');
            clearCart();
            window.scrollTo(0, 0);

        } catch (error: any) {
            console.error("Error placing order:", error);
            alert("Failed to place order: " + error.message);
            setCheckoutStep('details'); // Go back to details or an error state
        } finally {
            setIsProcessing(false);
        }
    };

    const steps = [
        { id: 'details', label: t('checkout_step_info'), icon: ICONS.Menu },
        { id: 'payment', label: t('checkout_step_payment'), icon: ICONS.Shield },
        { id: 'success', label: 'Done', icon: ICONS.Globe }
    ];

    if (state.cart.length === 0 && checkoutStep !== 'success' && checkoutStep !== 'processing') {
        return (
            <div className={`min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                <div className={`p-10 rounded-[3rem] border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                    <div className="w-20 h-20 mx-auto bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-400 mb-6">
                        <ICONS.ShoppingCart />
                    </div>
                    <h2 className="text-2xl font-black mb-2">{t('checkout_cart_empty')}</h2>
                    <p className="text-slate-500 mb-8 max-w-xs mx-auto">Your cart is empty. Explore our enterprise hardware and smart solutions.</p>
                    <Link to="/shop" className="inline-block px-12 py-4 rounded-2xl bg-brand-600 text-white font-black uppercase tracking-widest hover:bg-brand-500 transition-all shadow-xl shadow-brand-600/30">
                        {t('checkout_continue_shopping')}
                    </Link>
                </div>
            </div>
        );
    }

    if (checkoutStep === 'processing') {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center text-center ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50'}`}>
                <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-slate-200 border-t-brand-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-brand-500">
                        {formData.paymentType === 'digital' ? <ICONS.Shield className="animate-pulse" /> : <ICONS.Zap className="animate-pulse" />}
                    </div>
                </div>
                <h2 className="mt-12 text-3xl font-black tracking-tighter uppercase whitespace-pre-line">
                    {formData.paymentType === 'digital' ? 'Connecting to \n SSL Commerz Secure Gateway...' : 'Validating Your \n Secure Transaction...'}
                </h2>
                <p className="text-slate-500 font-bold mt-4 tracking-widest uppercase text-xs">Security Protocol: 256-Bit Encrypted Link</p>
            </div>
        );
    }

    if (checkoutStep === 'success') {
        return (
            <div className={`min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className={`max-w-xl w-full p-12 rounded-[3.5rem] border relative overflow-hidden ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-3xl'}`}
                >
                    <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-brand-600 via-cyan-500 to-brand-600" />
                    <div className="w-24 h-24 mx-auto bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-8 border-4 border-green-500/5">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-black mb-4 tracking-tighter">Order Authenticated!</h2>
                    <p className="text-slate-500 mb-10 font-medium text-lg">
                        Thank you for choosing RNAtech. Your order has been placed successfully using <span className="text-brand-600 font-bold">
                            {formData.paymentType === 'cod' ? t('payment_cod') :
                                formData.paymentType === 'mobile' ? (formData.mobileProvider === 'bkash' ? 'bKash' : formData.mobileProvider === 'nagad' ? 'Nagad' : 'Rocket') :
                                    'SSL Commerz'}
                        </span>.
                    </p>
                    <div className={`p-8 rounded-[2rem] text-left mb-10 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Tracking ID</span>
                                <span className="text-2xl font-black tracking-widest text-brand-500">{orderId}</span>
                            </div>
                            <ICONS.Globe className="text-slate-300 dark:text-white/5 w-12 h-12" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Link to="/tracking" className="py-5 rounded-2xl bg-brand-600 text-white font-black uppercase tracking-widest text-xs hover:bg-brand-500 transition-all shadow-xl text-center">Track Order</Link>
                        <Link to="/shop" className={`py-5 rounded-2xl border-2 font-black uppercase tracking-widest text-xs transition-all text-center ${theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>Continue Shopping</Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pt-32 pb-20 px-6 transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-[#FAFAFC] text-slate-900'}`}>
            <div className="max-w-[1400px] mx-auto">
                <div className="flex items-center justify-center gap-4 mb-20 pointer-events-none">
                    {steps.map((s, idx) => (
                        <React.Fragment key={s.id}>
                            <div className="flex flex-col items-center gap-3">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700
                                    ${checkoutStep === s.id ? 'bg-brand-600 text-white shadow-2xl shadow-brand-600/40 ring-4 ring-brand-600/10' :
                                        ((checkoutStep === 'payment' || (checkoutStep as string) === 'success') && idx === 0) || ((checkoutStep as string) === 'success' && idx === 1) ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-white/5 text-slate-400'}`}>
                                    <s.icon />
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${checkoutStep === s.id ? 'text-brand-600' : 'text-slate-400'}`}>{s.label}</span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className={`w-24 h-0.5 rounded-full transition-all duration-1000
                                    ${((idx === 0 && (checkoutStep === 'payment' || (checkoutStep as string) === 'success')) || (idx === 1 && (checkoutStep as string) === 'success')) ? 'bg-green-500' : 'bg-slate-200 dark:bg-white/5'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Main Section */}
                    <div className="lg:col-span-8 space-y-8">
                        {checkoutStep === 'details' ? (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                                {/* Enhanced Cart Management Section */}
                                <section className={`p-10 rounded-[3.5rem] border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/40'}`}>
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                                            <ICONS.ShoppingCart />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black tracking-tight">Review & Manage Items</h3>
                                            <p className="text-slate-500 text-sm font-medium">Verify your high-tech inventory before proceeding.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {state.cart.map(item => (
                                            <div key={item.product.id} className={`flex flex-col md:flex-row gap-6 p-6 rounded-3xl border-2 transition-all group ${theme === 'dark' ? 'bg-slate-900/30 border-white/5 hover:border-white/10' : 'bg-white border-slate-50 hover:border-slate-200'}`}>
                                                <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-100 dark:border-white/5 transition-transform group-hover:scale-[1.02]">
                                                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-grow space-y-2">
                                                    <h4 className="text-lg font-black tracking-tight">{item.product.name}</h4>
                                                    <p className="text-brand-500 font-black text-xl">{currency}{(item.product.price || 0).toLocaleString()}</p>
                                                    <div className="flex items-center gap-6 pt-2">
                                                        <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-2xl p-1 border border-slate-200/50 dark:border-white/10">
                                                            <button onClick={() => updateQuantity(item.product.id, -1)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all text-slate-500 shadow-sm"><ICONS.Minus /></button>
                                                            <span className="w-12 text-center font-black text-sm">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.product.id, 1)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-brand-500 hover:text-white transition-all text-brand-500 shadow-sm"><ICONS.Plus /></button>
                                                        </div>
                                                        <button onClick={() => removeFromCart(item.product.id)} className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all">Remove</button>
                                                    </div>
                                                </div>
                                                <div className="text-right hidden md:block">
                                                    <span className="block text-[10px] font-black uppercase text-slate-400 mb-1">Item Total</span>
                                                    <span className="text-xl font-black">{currency}{((item.product.price || 0) * item.quantity).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Delivery Info Section */}
                                <section className={`p-10 rounded-[3.5rem] border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/40'}`}>
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                                            <ICONS.Home />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black tracking-tight">Logistics Destination</h3>
                                            <p className="text-slate-500 text-sm font-medium">Input accurate coordinates for dispatch.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Recipient Name</label>
                                            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full border-2 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all font-bold text-sm ${theme === 'dark' ? 'bg-slate-900/50 border-white/5 text-white' : 'bg-slate-50 border-slate-100'}`} placeholder="Full Name" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Secure Phone Line</label>
                                            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={`w-full border-2 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all font-bold text-sm ${theme === 'dark' ? 'bg-slate-900/50 border-white/5 text-white' : 'bg-slate-50 border-slate-100'}`} placeholder="+880 1XXX-XXXXXX" />
                                        </div>
                                        <div className="space-y-3 md:col-span-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Select Shipping District</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {['dhaka', 'outside'].map(d => (
                                                    <button key={d} onClick={() => setFormData({ ...formData, district: d })} className={`p-4 rounded-2xl border-2 transition-all font-black uppercase text-[10px] tracking-widest ${formData.district === d ? 'border-brand-500 bg-brand-500/5 text-brand-500' : 'border-slate-100 dark:border-white/5 text-slate-400'}`}>
                                                        {d === 'dhaka' ? t('checkout_dhaka') : t('checkout_outside_dhaka')}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Detailed Physical Address</label>
                                            <textarea rows={3} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className={`w-full border-2 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all resize-none font-bold text-sm ${theme === 'dark' ? 'bg-slate-900/50 border-white/5 text-white' : 'bg-slate-50 border-slate-100'}`} placeholder="Exact location details..." />
                                        </div>
                                    </div>
                                    <button onClick={() => setCheckoutStep('payment')} disabled={!formData.name || !formData.phone || !formData.address} className="mt-12 w-full py-6 rounded-[2rem] bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl disabled:opacity-50">Proceed to Secure Payment</button>
                                </section>
                            </motion.div>
                        ) : (
                            <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`p-10 rounded-[3.5rem] border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-2xl'}`}>
                                <div className="flex items-center justify-between mb-12">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center"><ICONS.Shield /></div>
                                        <div><h3 className="text-2xl font-black tracking-tight">Payment Verification</h3><p className="text-slate-500 text-sm font-medium">Select a secure transaction gateway.</p></div>
                                    </div>
                                    <button onClick={() => setCheckoutStep('details')} className="text-[10px] font-black text-brand-600 uppercase tracking-widest bg-brand-500/5 px-4 py-2 rounded-xl border border-brand-500/10">Modify Details</button>
                                </div>

                                <div className="space-y-10">
                                    {/* Categorized Payment Options */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            { id: 'cod', label: 'Cash On Delivery', sub: 'Pay when you receive', icon: ICONS.CashOnDelivery },
                                            { id: 'mobile', label: 'Mobile Banking', sub: 'bKash • Nagad • Rocket', icon: ICONS.BkashLogo },
                                            { id: 'digital', label: 'SSL Commerz', sub: 'Card / Net Banking', icon: ICONS.SSLCommerzLogo }
                                        ].map(type => (
                                            <button key={type.id} onClick={() => setFormData({ ...formData, paymentType: type.id as any })} className={`flex flex-col items-center gap-4 p-8 rounded-[2.5rem] border-2 transition-all duration-500 hover:scale-[1.02] ${formData.paymentType === type.id ? 'border-brand-500 bg-brand-500/5 ring-4 ring-brand-500/10 shadow-xl' : theme === 'dark' ? 'border-white/5 hover:border-white/10' : 'border-slate-200 hover:border-slate-300'}`}>
                                                <type.icon className={`${formData.paymentType === type.id ? 'scale-110' : 'opacity-70'} transition-all`} />
                                                <div className="text-center">
                                                    <span className="block font-black text-[11px] uppercase tracking-widest">{type.label}</span>
                                                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{type.sub}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Sub-selection for Mobile Banking */}
                                    <AnimatePresence mode="wait">
                                        {formData.paymentType === 'mobile' && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                                                <div className="grid grid-cols-3 gap-4">
                                                    {[
                                                        { id: 'bkash', label: 'bKash', icon: ICONS.BkashLogo },
                                                        { id: 'nagad', label: 'Nagad', icon: ICONS.NagadLogo },
                                                        { id: 'rocket', label: 'Rocket', icon: ICONS.RocketLogo }
                                                    ].map(m => (
                                                        <button key={m.id} onClick={() => setFormData({ ...formData, mobileProvider: m.id as any })}
                                                            className={`p-5 rounded-2xl border-2 transition-all font-black uppercase text-[10px] tracking-widest flex flex-col items-center gap-3
                                                            ${formData.mobileProvider === m.id ? 'border-brand-500 bg-brand-500/5 text-brand-500 shadow-lg' : theme === 'dark' ? 'border-white/5 opacity-60 hover:opacity-100 text-white' : 'border-slate-200 opacity-60 hover:opacity-100'}`}>
                                                            <m.icon />
                                                            {m.label}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className={`p-8 rounded-[2.5rem] border-2 border-brand-500/20 ${theme === 'dark' ? 'bg-brand-500/5' : 'bg-slate-50'} space-y-6`}>
                                                    <p className="text-xs font-black leading-relaxed tracking-tight text-center border-b border-brand-500/10 pb-4 uppercase flex flex-col items-center gap-2">
                                                        <span>Send <span className="text-xl font-bold text-brand-600 mx-2">{currency}{(total || 0).toLocaleString()}</span> to <span className="text-xl font-bold text-brand-600 mx-2">01969-507606</span> (Send-Money)</span>
                                                        <button 
                                                            onClick={() => {
                                                                navigator.clipboard.writeText('01969507606');
                                                                setIsCopied(true);
                                                                setTimeout(() => setIsCopied(false), 2000);
                                                            }}
                                                            className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${isCopied ? 'bg-emerald-500 text-white' : 'bg-brand-500/10 text-brand-500 border border-brand-500/20 hover:bg-brand-500 hover:text-white'}`}
                                                        >
                                                            {isCopied ? '✓ Copied' : '📄 Copy Number'}
                                                        </button>
                                                    </p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{formData.mobileProvider.toUpperCase()} Number</label>
                                                            <input type="tel" value={formData.mobileNumber} onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} className={`w-full border-2 rounded-xl px-6 py-4 font-black text-sm ${theme === 'dark' ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`} placeholder="01XXXXXXXXX" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Transaction ID (TrxID)</label>
                                                            <input type="text" value={formData.trxId} onChange={(e) => setFormData({ ...formData, trxId: e.target.value })} className={`w-full border-2 rounded-xl px-6 py-4 font-black text-sm ${theme === 'dark' ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`} placeholder="8X2HS94K2" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                        {formData.paymentType === 'digital' && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`p-8 rounded-[2.5rem] border-2 border-brand-600/20 ${theme === 'dark' ? 'bg-brand-600/5' : 'bg-blue-50'} text-center space-y-4`}>
                                                <ICONS.SSLCommerzLogo className="mx-auto !w-16 !h-16" />
                                                <h4 className="text-xl font-black uppercase tracking-tighter">SSL Commerz Secure Redirect</h4>
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest max-w-xs mx-auto">You will be securely redirected to SSL Commerz to complete your transaction via Card or Net Banking.</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <button onClick={handlePlaceOrder} className="w-full py-6 rounded-[2.5rem] bg-brand-600 text-white font-black uppercase tracking-widest hover:bg-brand-500 transition-all shadow-2xl shadow-brand-600/30">
                                        {formData.paymentType === 'digital' ? 'Initialize Secure Payment' : 'Finalize & Secure Order'}
                                    </button>
                                </div>
                            </motion.section>
                        )}
                    </div>

                    <div className="lg:col-span-4 lg:sticky lg:top-32">
                        <div className={`p-10 rounded-[3.5rem] border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-2xl'}`}>
                            <h3 className="text-xl font-black mb-10 tracking-tighter">Financial Summary</h3>
                            <div className="space-y-5 mb-10 pb-10 border-b border-slate-500/10">
                                <div className="flex justify-between items-center text-xs font-bold text-slate-500"><span>Net Subtotal</span><span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{currency}{(subtotal || 0).toLocaleString()}</span></div>
                                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                                    <span>Logistics Fee</span>
                                    <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
                                        {deliveryFee > 0 ? `${currency}${(deliveryFee || 0).toLocaleString()}` : <span className="text-green-500">FREE</span>}
                                    </span>
                                </div>
                                {discount > 0 && <div className="flex justify-between items-center text-xs font-bold text-green-500"><span>Enterprise Promo</span><span>-{currency}{(discount || 0).toLocaleString()}</span></div>}
                                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                                    <span className="uppercase tracking-widest text-[10px]">Tax / VAT ({systemSettings?.vat_percentage || 0}%)</span>
                                    <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{currency}{(vat || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-3xl font-black pt-4 border-t border-slate-500/10 text-brand-600"><span>Total</span><span>{currency}{(total || 0).toLocaleString()}</span></div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-2 p-1.5 rounded-3xl border-2 border-slate-500/10">
                                    <input type="text" placeholder="PROMO CODE" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="flex-grow bg-transparent border-none outline-none px-6 font-black text-[10px] tracking-widest uppercase" />
                                    <button onClick={handleApplyPromo} disabled={isApplyingPromo || !promoCode} className="px-8 py-4 rounded-2xl bg-slate-900 text-white font-black text-[10px] tracking-widest hover:bg-slate-800 transition-all uppercase">Apply</button>
                                </div>
                                <div className="p-6 rounded-3xl bg-brand-600/5 text-center">
                                    <p className="text-[10px] font-black text-slate-500 leading-relaxed uppercase tracking-widest">
                                        End-to-end encryption <br /> by <span className="text-brand-600">RNAtech Security Labs</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
