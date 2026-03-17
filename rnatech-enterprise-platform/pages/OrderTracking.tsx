
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ICONS } from '../constants';
import { supabase } from '../supabase';

const OrderTracking = () => {
  const { theme, t, lang } = useApp();
  const [orderIdInput, setOrderIdInput] = useState('');
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [trackingHistory, setTrackingHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentNotice, setPaymentNotice] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [recentOrders, setRecentOrders] = useState<string[]>([]);

  React.useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('rnatech_recent_orders') || '[]');
      setRecentOrders(saved);
    } catch (e) {
      console.error("Local Storage Read Error:", e);
    }
  }, []);

  const handleRecentClick = (id: string) => {
    setOrderIdInput(id);
    // Automatically trigger track
    setTimeout(() => {
        const form = document.querySelector('form');
        if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 10);
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setActiveOrder(null);
    setTrackingHistory([]);

    try {
      // 1. Fetch the order by tracking number
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*, profiles(full_name)')
        .eq('tracking_number', orderIdInput.toUpperCase())
        .maybeSingle();

      if (orderError) throw orderError;
      if (!order) {
        setError('Order ID not found. Please check and try again.');
        return;
      }

      setActiveOrder(order);

      // 2. Fetch logistics logs for this order
      const { data: logs, error: logsError } = await supabase
        .from('logistics_logs')
        .select('*')
        .eq('order_id', order.id)
        .order('created_at', { ascending: false });

      if (logsError) throw logsError;
      setTrackingHistory(logs || []);

    } catch (err: any) {
      console.error("Tracking Error:", err);
      setError('System failure while fetching logistics data.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderNum = params.get('order');
    const status = params.get('status');
    const errorParam = params.get('error');

    if (orderNum) {
      setOrderIdInput(orderNum);
      // Automatically trigger tracking if order number is in URL
      const fetchOrder = async () => {
        setLoading(true);
        try {
          const { data: order } = await supabase
            .from('orders')
            .select('*, profiles(full_name)')
            .eq('tracking_number', orderNum.toUpperCase())
            .maybeSingle();
          if (order) {
            setActiveOrder(order);
            const { data: logs } = await supabase.from('logistics_logs').select('*').eq('order_id', order.id).order('created_at', { ascending: false });
            setTrackingHistory(logs || []);
          }
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }

    if (status === 'paid') {
      setPaymentNotice({ type: 'success', message: 'Hooray! Your payment has been successfully authorized via SSLCommerz.' });
    } else if (errorParam) {
      setPaymentNotice({ type: 'error', message: `Mmm, something went wrong with the payment: ${errorParam.replace('_', ' ')}` });
    }
  }, []);

  const statusSteps = ['pending', 'processing', 'shipped', 'delivered'];
  const currentStepIndex = activeOrder ? statusSteps.indexOf(activeOrder.status) : -1;

  return (
    <div className={`min-h-screen pt-32 pb-20 px-6 transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            Real-time Logistics
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
            {t('tracking_title')}
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
            {t('tracking_desc')}
          </p>
        </div>

        {paymentNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-12 p-6 rounded-[2rem] border flex items-center gap-4 ${
              paymentNotice.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              paymentNotice.type === 'success' ? 'bg-emerald-500/20' : 'bg-rose-500/20'
            }`}>
              {paymentNotice.type === 'success' ? '✓' : '!'}
            </div>
            <p className="font-black uppercase tracking-widest text-[10px] leading-relaxed">
              {paymentNotice.message}
            </p>
            <button onClick={() => setPaymentNotice(null)} className="ml-auto opacity-50 hover:opacity-100 uppercase text-[8px] font-black">Dismiss</button>
          </motion.div>
        )}

        {activeOrder && activeOrder.payment_type === 'mobile' && activeOrder.payment_status === 'UNPAID' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 p-10 rounded-[3rem] bg-amber-500/10 border border-amber-500/20 text-amber-500 flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-amber-500/5"
          >
            <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 text-2xl animate-pulse">
                ⏳
            </div>
            <div>
                <h4 className="text-xl font-black mb-2 uppercase tracking-tighter">Mobile Payment Awaiting Verification</h4>
                <p className="text-sm font-bold opacity-80 leading-relaxed">
                    Our billing department has received your {activeOrder.mobile_payment_provider} transaction ID: <span className="text-white font-mono bg-amber-500/30 px-2 py-0.5 rounded">{activeOrder.mobile_payment_trxid}</span>. 
                    Please wait while we cross-reference this with bank statements. Your order will move to 'Processing' once verified.
                </p>
            </div>
          </motion.div>
        )}

        {/* Input Card */}
        <section className={`p-8 md:p-12 rounded-[3.5rem] border mb-12 shadow-2xl shadow-black/5 transition-all
          ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative group">
              <input
                type="text"
                placeholder={t('tracking_placeholder')}
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                className={`w-full px-8 py-5 rounded-3xl border text-lg font-bold transition-all outline-none
                  ${theme === 'dark' ? 'bg-slate-900/50 border-white/5 focus:border-brand-500' : 'bg-slate-50 border-slate-100 focus:border-brand-500'}`}
              />
              <div className="absolute top-1/2 right-6 -translate-y-1/2 text-slate-500">
                <ICONS.Search />
              </div>
            </div>
            <button
              type="submit"
              className="px-10 py-5 rounded-3xl bg-brand-600 text-white font-black uppercase tracking-widest hover:bg-brand-500 transition-all shadow-xl shadow-brand-600/30"
            >
              {t('tracking_btn')}
            </button>
          </form>
          {error && <p className="mt-4 text-red-500 font-bold text-center text-sm">{error}</p>}

          {recentOrders.length > 0 && !activeOrder && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mr-2">Recently Tracked:</span>
                {recentOrders.map(id => (
                    <button 
                        key={id} 
                        onClick={() => handleRecentClick(id)}
                        className={`px-4 py-2 rounded-xl border border-white/5 bg-white/5 text-[10px] font-bold text-slate-400 hover:border-brand-500/30 hover:text-brand-500 transition-all active:scale-95`}
                    >
                        {id}
                    </button>
                ))}
            </div>
          )}
        </section>

        {/* Tracking Results */}
        <AnimatePresence mode="wait">
          {activeOrder && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-8"
            >
              {/* Summary Card */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 p-10 rounded-[3rem] border
                  ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Customer</span>
                    <p className="text-xl font-black">{activeOrder.profiles?.full_name || 'Verified Customer'}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Items</span>
                    <p className="text-sm font-bold">{activeOrder.items?.length || 0} Professional Hardware Units</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('tracking_eta')}</span>
                    <p className="text-xl font-black text-brand-500">{activeOrder.status === 'delivered' ? 'Delivered' : 'Estimated 3-5 Days'}</p>
                  </div>
                </div>

                {/* Progress Visualizer & History - STRICT MODE: Only visible if PAID */}
                {activeOrder.payment_status === 'PAID' ? (
                  <div className={`p-12 rounded-[3.5rem] border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                    <div className="relative flex justify-between items-center mb-20">
                      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0" />
                      <div 
                        className="absolute top-1/2 left-0 h-1 bg-brand-500 -translate-y-1/2 z-10 transition-all duration-1000"
                        style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                      />

                      {statusSteps.map((step, idx) => (
                        <div key={step} className="relative z-20 flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500
                            ${idx <= currentStepIndex 
                              ? 'bg-brand-600 border-brand-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                              : theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-700' : 'bg-slate-100 border-white text-slate-400'}`}>
                            {idx < currentStepIndex ? '✓' : idx + 1}
                          </div>
                          <span className={`absolute -bottom-10 whitespace-nowrap text-[10px] font-black uppercase tracking-widest
                            ${idx <= currentStepIndex ? 'text-brand-500' : 'text-slate-500'}`}>
                            {t(`tracking_status_${step}`)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* History Timeline */}
                    <div className="space-y-8 mt-16 max-w-xl">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-10">Detailed Activity</h4>
                      {trackingHistory.length === 0 ? (
                        <p className="text-slate-500 text-sm font-bold">No logs available for this order yet.</p>
                      ) : (
                        trackingHistory.map((item: any, idx: number) => (
                          <div key={item.id} className="flex gap-6 relative">
                            {idx !== trackingHistory.length - 1 && (
                              <div className="absolute top-8 left-3 w-px h-full bg-slate-800" />
                            )}
                            <div className={`w-6 h-6 rounded-full flex-shrink-0 mt-1 border-2 
                              ${idx === 0 ? 'bg-brand-500 border-brand-400' : 'bg-slate-800 border-slate-700'}`} />
                            <div className="pb-8">
                              <span className="block text-[10px] font-black text-slate-500 uppercase mb-1">{new Date(item.created_at).toLocaleString()}</span>
                              <h5 className="font-black text-lg mb-1 uppercase text-brand-500">{item.status}</h5>
                              <p className="text-sm font-bold text-white/70 mb-1">{item.location}</p>
                              <p className="text-sm font-medium text-slate-500 italic">"{item.notes || item.description}"</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={`p-12 rounded-[3.5rem] border text-center ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                    <div className="w-20 h-20 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center mx-auto mb-8 text-3xl">🔏</div>
                    <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">Logistics Data Masked</h3>
                    <p className="text-slate-500 text-sm font-bold max-w-md mx-auto leading-relaxed">
                      Detailed logistics intelligence and real-time tracking are reserved for authenticated payments. 
                      Once your <span className="text-brand-500">{activeOrder.payment_type.toUpperCase()}</span> transaction is verified, the cargo manifest and full history will be unlocked.
                    </p>
                  </div>
                )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderTracking;
