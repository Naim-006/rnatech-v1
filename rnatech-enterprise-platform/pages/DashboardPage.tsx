
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { ICONS } from '../constants';
import { supabase } from '../supabase';

const DashboardPage = () => {
  const { theme, t, currency } = useApp();
  const { user, profile: authProfile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'projects' | 'address' | 'settings'>('overview');
  const [orders, setOrders] = useState<any[]>([]);
  const [orderItems, setOrderItems] = useState<Record<string, any[]>>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [profile, setProfile] = useState({
    full_name: authProfile?.full_name || '',
    phone: authProfile?.phone || '',
    address: authProfile?.address || ''
  });
  const [isAddrModalOpen, setIsAddrModalOpen] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: '', address: '' });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, authProfile]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Orders
            const { data: ordersData } = await supabase
              .from('orders')
              .select('*')
              .eq('user_id', user?.id)
              .order('created_at', { ascending: false });
            
            if (ordersData) {
                setOrders(ordersData);
                // Fetch Items for each order reactively or in batch
                const orderIds = ordersData.map(o => o.id);
                if (orderIds.length > 0) {
                    const { data: itemsData } = await supabase
                        .from('order_items')
                        .select('*, products(name, image_url)')
                        .in('order_id', orderIds);
                    
                    if (itemsData) {
                        const itemsMap = itemsData.reduce((acc: any, item: any) => {
                            if (!acc[item.order_id]) acc[item.order_id] = [];
                            acc[item.order_id].push(item);
                            return acc;
                        }, {});
                        setOrderItems(itemsMap);
                    }
                }
            }

            // Fetch Projects (Service Requests)
            const { data: projectsData } = await supabase
              .from('service_requests')
              .select('*, services(*)')
              .eq('user_id', user?.id)
              .order('created_at', { ascending: false });

            if (projectsData) setProjects(projectsData);
            
            if (authProfile) {
              setProfile({
                full_name: authProfile.full_name || '',
                phone: authProfile.phone || '',
                address: authProfile.address || ''
              });
              setLoyaltyPoints(authProfile.loyalty_points || 0);
            }

            // Fetch Saved Addresses
            const { data: addrData } = await supabase
                .from('saved_addresses')
                .select('*')
                .eq('user_id', user?.id);
            if (addrData) setSavedAddresses(addrData);

        } catch (e) {
            console.error("Dashboard fetch error:", e);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

  const updateProfile = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.full_name,
      })
      .eq('id', user?.id);
    
    if (error) alert("Error updating profile: " + error.message);
    else alert("Profile updated successfully!");
  };

  const addAddress = async (label: string, address: string) => {
    const { error } = await supabase
      .from('saved_addresses')
      .insert({
        user_id: user?.id,
        label,
        address
      });
    
    if (error) alert("Error adding address: " + error.message);
    else fetchData();
  };

  const removeAddress = async (id: string) => {
    const { error } = await supabase
      .from('saved_addresses')
      .delete()
      .eq('id', id);
    
    if (error) alert("Error removing address: " + error.message);
    else fetchData();
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className={`min-h-screen pt-12 pb-24 transition-all duration-700 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Profile Header Card - Glassmorphic */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass !p-8 md:!p-12 mb-12 relative overflow-hidden border border-white/10 shadow-2xl rounded-[4rem]"
        >
          {/* Animated Background Aura */}
          <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, 90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-brand-500/20 blur-[120px] rounded-full pointer-events-none" 
          />
          
          <div className="relative flex flex-col md:flex-row items-center gap-10">
            <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-[3rem] bg-gradient-to-br from-brand-500 via-brand-600 to-cyan-600 flex items-center justify-center text-5xl font-black text-white shadow-[0_0_50px_rgba(59,130,246,0.3)] border-4 border-white/10 group-hover:border-white/20 transition-all overflow-hidden relative">
                {user?.email.charAt(0).toUpperCase()}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -bottom-2 -right-2 p-3 rounded-2xl bg-slate-900 text-brand-500 shadow-2xl border border-white/10 hover:bg-brand-500 hover:text-white transition-all z-10"
              >
                <ICONS.Camera className="w-4 h-4" />
              </motion.button>
            </motion.div>
            
            <div className="text-center md:text-left flex-grow space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                    {profile.full_name || 'RNA Agent'}
                </h1>
                <span className={`w-fit px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm ${
                    authProfile?.role === 'ADMIN' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-brand-500/10 text-brand-500 border-brand-500/20'
                }`}>
                    {authProfile?.role || 'CLIENT'} PROTOCOL
                </span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-5 py-2.5 rounded-2xl border border-white/5">
                  <ICONS.User className="w-3.5 h-3.5 text-brand-500" /> Authorized since {new Date(authProfile?.created_at || Date.now()).getFullYear()}
                </span>
                <span className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-5 py-2.5 rounded-2xl border border-white/5">
                  <ICONS.Globe className="w-3.5 h-3.5 text-cyan-500" /> Global Node Access
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => { setIsRefreshing(true); fetchData(); }}
                disabled={isRefreshing}
                className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3 disabled:opacity-50"
              >
                <div className={isRefreshing ? 'animate-spin' : ''}>
                    <ICONS.Zap className="w-4 h-4 text-brand-500" />
                </div>
                {isRefreshing ? 'Syncing...' : 'Sync Pulse'}
              </button>
              <button 
                onClick={signOut}
                className="px-10 py-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-xl shadow-rose-500/10"
              >
                Log Out
              </button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs - Modern Segmented Control */}
        <div className="flex gap-2 mb-16 p-2 bg-white/5 border border-white/10 rounded-[2.5rem] w-fit mx-auto md:mx-0 overflow-x-auto custom-scrollbar">
          {[
            { id: 'overview', label: 'System Overview', icon: ICONS.Layout },
            { id: 'orders', label: 'Hardware Archive', icon: ICONS.Box },
            { id: 'projects', label: 'Project Pipeline', icon: ICONS.Cpu },
            { id: 'address', label: 'Address Book', icon: ICONS.MapPin },
            { id: 'settings', label: 'Secure Config', icon: ICONS.Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'bg-brand-600 text-white shadow-[0_0_30px_rgba(59,130,246,0.3)] scale-105' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="min-h-[400px]"
          >
            {activeTab === 'overview' && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="premium-card !p-10 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <ICONS.Box className="w-24 h-24" />
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center mb-10 shadow-3xl shadow-brand-500/20">
                      <ICONS.Box className="w-7 h-7" />
                    </div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Hardware Units Acquired</p>
                    <h3 className="text-4xl font-black tracking-tight">{orders.reduce((acc, curr) => acc + (curr.total_items || 1), 0)} <span className="text-slate-500 text-sm font-bold uppercase ml-1">Units</span></h3>
                    <div className="mt-6 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-500">
                        <ICONS.Zap className="w-3 h-3" /> System Integration Active
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="premium-card !p-10 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <ICONS.Cpu className="w-24 h-24" />
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-700 text-white flex items-center justify-center mb-10 shadow-3xl shadow-cyan-500/20">
                      <ICONS.Cpu className="w-7 h-7" />
                    </div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Active Engineering Projects</p>
                    <h3 className="text-4xl font-black tracking-tight">{projects.filter(p => p.status !== 'COMPLETED').length} <span className="text-slate-500 text-sm font-bold uppercase ml-1">Streams</span></h3>
                    <div className="mt-6 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-cyan-500">
                        <ICONS.Globe className="w-3.5 h-3.5" /> High-Velocity Deployment
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="premium-card !p-10 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <ICONS.Zap className="w-24 h-24" />
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center mb-10 shadow-3xl shadow-purple-500/20">
                      <ICONS.Zap className="w-7 h-7" />
                    </div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Loyalty Intelligence</p>
                    <h3 className="text-4xl font-black tracking-tight">{loyaltyPoints} <span className="text-slate-500 text-sm font-bold uppercase ml-1">Credits</span></h3>
                    <div className="mt-6 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-purple-500">
                        <ICONS.Shield className="w-3.5 h-3.5" /> High-Value Node Status
                    </div>
                  </motion.div>
                </div>

                {/* Quick Actions Hub */}
                <div className="premium-card !p-0 overflow-hidden border border-brand-500/10">
                    <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
                        <h4 className="text-xl font-black uppercase tracking-tight">Mission Control</h4>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Rapid Deployment Hub</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                        <Link to="/services" className="p-10 flex flex-col items-center gap-4 hover:bg-brand-500/5 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-brand-500 group-hover:text-white transition-all shadow-inner">
                                <ICONS.Zap className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Request Intel</span>
                        </Link>
                        <Link to="/shop" className="p-10 flex flex-col items-center gap-4 hover:bg-cyan-500/5 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-inner">
                                <ICONS.ShoppingCart className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Order Hardware</span>
                        </Link>
                        <Link to="/contact" className="p-10 flex flex-col items-center gap-4 hover:bg-purple-500/5 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-inner">
                                <ICONS.User className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Direct Comms</span>
                        </Link>
                        <button onClick={() => setActiveTab('settings')} className="p-10 flex flex-col items-center gap-4 hover:bg-slate-500/5 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-slate-300 group-hover:text-slate-900 transition-all shadow-inner">
                                <ICONS.Settings className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Config System</span>
                        </button>
                    </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                {orders.length === 0 ? (
                  <div className="text-center py-32 bg-white/5 rounded-[4rem] border border-white/5 backdrop-blur-sm">
                    <div className="w-20 h-20 bg-slate-900 rounded-[2rem] border border-white/5 flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <ICONS.Box className="w-8 h-8 text-slate-700" />
                    </div>
                    <h3 className="text-2xl font-black mb-2 uppercase tracking-tight italic opacity-50">Empty Manifest</h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">No hardware transactions recorded in the secure ledger.</p>
                  </div>
                ) : (
                  orders.map(order => (
                    <motion.div 
                        layout
                        key={order.id} 
                        className="premium-card !p-0 overflow-hidden border border-white/5 hover:border-brand-500/20 transition-all group shadow-xl"
                    >
                      <div className="p-10 flex flex-col xl:flex-row xl:items-center justify-between gap-10">
                        <div className="flex items-center gap-8">
                          <div className="w-20 h-20 rounded-3xl bg-brand-500/10 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all shadow-inner border border-brand-500/20">
                            <ICONS.Box className="w-10 h-10" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] bg-brand-500/10 px-3 py-1 rounded-lg border border-brand-500/20">
                                    MSG-ID: {order.id.slice(0, 8).toUpperCase()}
                                </span>
                                <span className="text-[10px] font-bold text-slate-500">[{new Date(order.created_at).toLocaleString()}]</span>
                            </div>
                            <h4 className="font-black text-2xl tracking-tighter uppercase mb-1">Advanced Hardware Package</h4>
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none">Fulfillment Priority: Level Alpha</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-12">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Total Value</p>
                                <p className="text-2xl font-black text-brand-500 font-mono tracking-tighter">{currency}{(order.total_amount || 0).toLocaleString()}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Flow State</p>
                                <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm inline-block ${
                                  order.status === 'delivered' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 
                                  order.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                  order.status === 'cancelled' ? 'bg-rose-500/10 text-rose-500' : 'bg-brand-500 text-white'
                                }`}>
                                  {order.status}
                                </span>
                            </div>
                            <Link to="/tracking" className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3 shadow-lg group/btn">
                                Track Live Flow <ICONS.ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                      </div>

                      {/* Explicit Items Visualization */}
                      {orderItems[order.id] && (
                        <div className="bg-slate-900/40 border-t border-white/5 p-8">
                            <h5 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 px-2">Hardware Inventory Breakdown</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {orderItems[order.id].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 overflow-hidden">
                                            <img src={item.products?.image_url} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="text-[11px] font-black uppercase tracking-tight truncate max-w-[140px]">{item.products?.name}</div>
                                            <div className="text-[9px] font-bold text-slate-500">{item.quantity} Units × {currency}{item.unit_price.toLocaleString()}</div>
                                        </div>
                                        <div className="text-[11px] font-black font-mono text-brand-500">
                                            {currency}{(item.quantity * item.unit_price).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            )}
            
            {activeTab === 'projects' && (
              <div className="space-y-8">
                {projects.length === 0 ? (
                  <div className="text-center py-32 bg-white/5 rounded-[4rem] border border-white/5 backdrop-blur-sm">
                    <div className="w-20 h-20 bg-slate-900 rounded-[2rem] border border-white/5 flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <ICONS.Cpu className="w-8 h-8 text-slate-700" />
                    </div>
                    <h3 className="text-2xl font-black mb-2 uppercase tracking-tight italic opacity-50">No Active Pipeline</h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Engage an engineering service to initialise the project flow.</p>
                  </div>
                ) : (
                  projects.map(project => (
                    <motion.div 
                        key={project.id} 
                        className="premium-card !p-10 group border border-white/5 hover:border-cyan-500/20 transition-all shadow-2xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform">
                        <ICONS.Cpu className="w-48 h-48" />
                      </div>
                      
                      <div className="relative flex flex-col xl:flex-row xl:items-start justify-between gap-12">
                        <div className="max-w-xl">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 shadow-inner">
                              <ICONS.Globe className="w-8 h-8" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] leading-none mb-2">Project Stream {project.services?.category || 'Custom'}</p>
                              <h4 className="font-black text-3xl tracking-tighter uppercase">{project.services?.name || 'Service Manifest'}</h4>
                            </div>
                          </div>
                          
                          <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                            {project.details || 'System architecture design and implementation phase active. Resources currently deployed for development cycle.'}
                          </p>

                          {/* Progress Pipeline Visualization */}
                          <div className="space-y-3">
                            <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em] text-cyan-500">
                                <span>Deployment Pipeline</span>
                                <span>{project.status === 'COMPLETED' ? '100%' : '35%'} Optimized</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: project.status === 'COMPLETED' ? '100%' : '35%' }}
                                    className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                                />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-6 min-w-[240px]">
                            <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Deployment State</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                        <span className="text-xs font-black uppercase tracking-widest text-white">{project.status}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Projected Milestone</p>
                                    <p className="text-xs font-black text-white">{project.project_deadline ? new Date(project.project_deadline).toLocaleDateString() : 'TBD (Scanning)'}</p>
                                </div>
                            </div>
                            <button className="w-full py-5 rounded-[1.8rem] bg-cyan-600 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-cyan-500 transition-all shadow-3xl shadow-cyan-600/20 active:scale-95">
                              Extract Full Scope
                            </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'address' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter">Address Protocol</h2>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Manage your deployment locations.</p>
                    </div>
                    <button 
                        onClick={() => setIsAddrModalOpen(true)}
                        className="px-8 py-4 rounded-2xl bg-brand-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-brand-500 transition-all shadow-xl shadow-brand-600/20 flex items-center gap-3"
                    >
                        <ICONS.Plus className="w-4 h-4" /> Add New Node
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {savedAddresses.length === 0 ? (
                        <div className="md:col-span-2 text-center py-32 bg-white/5 rounded-[4rem] border border-white/5 backdrop-blur-sm">
                            <div className="w-20 h-20 bg-slate-900 rounded-[2rem] border border-white/5 flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <ICONS.MapPin className="w-8 h-8 text-slate-700" />
                            </div>
                            <h3 className="text-2xl font-black mb-2 uppercase tracking-tight italic opacity-50">No Saved Nodes</h3>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Initialise your primary deployment addresses for faster hardware verification.</p>
                        </div>
                    ) : (
                        savedAddresses.map(addr => (
                            <motion.div key={addr.id} className="premium-card !p-10 border border-white/5 group hover:border-brand-500/20 transition-all shadow-2xl relative overflow-hidden">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-500 shadow-inner">
                                        <ICONS.MapPin className="w-8 h-8" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-3 rounded-xl bg-white/5 hover:bg-brand-500/10 text-slate-500 hover:text-brand-500 transition-all border border-white/5">
                                            <ICONS.Settings className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => removeAddress(addr.id)}
                                            className="p-3 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 transition-all border border-white/5"
                                        >
                                            <ICONS.Trash className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <h4 className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-2">{addr.label} ADDRESS</h4>
                                <p className="text-slate-300 font-bold leading-relaxed">{addr.address}</p>
                                <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-slate-600">
                                    <ICONS.Zap className="w-3 h-3" /> Node Active
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="premium-card !p-12 relative overflow-hidden border border-white/5">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="flex items-center gap-4 mb-12">
                      <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-500">
                        <ICONS.User className="w-6 h-6" />
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter">Profile Intelligence</h3>
                  </div>
                  <div className="space-y-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Identity Display</label>
                      <input 
                        type="text" 
                        placeholder="Agent Name"
                        value={profile.full_name}
                        onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 font-black text-white focus:border-brand-500 transition-all outline-none shadow-inner"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Secure Comms Channel</label>
                      <input 
                        type="text" 
                        value={user?.email}
                        disabled
                        className="w-full bg-white/5 border border-white/5 opacity-40 rounded-2xl px-6 py-5 font-black cursor-not-allowed text-slate-400"
                      />
                    </div>
                    <div className="pt-4">
                      <button 
                        onClick={updateProfile}
                        className="w-full py-5 bg-brand-600 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-500 transition-all shadow-3xl shadow-brand-600/40 active:scale-95"
                      >
                        Commit Manifest
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <div className="premium-card !p-10 border border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8 border-b border-white/5 pb-4">Security Protocol Status</h4>
                        <div className="space-y-6">
                            {[
                                { label: 'Two-Factor Access', status: 'Deactivated', color: 'text-slate-600' },
                                { label: 'Biometric Link', status: 'Encrypted', color: 'text-emerald-500' },
                                { label: 'API Pulse Key', status: 'Inbound', color: 'text-brand-500' }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400">{item.label}</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="premium-card !p-10 border border-rose-500/10 bg-rose-500/5 group hover:bg-rose-500/10 transition-all">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-4 font-black">System Decommission</h4>
                        <p className="text-slate-500 text-xs mb-8 font-medium italic">Warning: This action will permanently archive all security tokens and asset logs.</p>
                        <button className="w-full py-4 rounded-xl border border-rose-500/30 text-rose-500 text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">
                            Purge Records
                        </button>
                    </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Address Protocol Modal */}
        <AnimatePresence>
            {isAddrModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={() => setIsAddrModalOpen(false)}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                    />
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-xl premium-card !p-12 border border-white/10 shadow-4xl overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-3xl font-black uppercase tracking-tighter italic">Initialise Node</h3>
                            <button onClick={() => setIsAddrModalOpen(false)} className="p-3 rounded-full hover:bg-white/10 transition-colors text-slate-500">
                                <ICONS.Plus className="w-6 h-6 rotate-45" />
                            </button>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1 text-xs">Node Designation (Label)</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. HOME, OFFICE, LAB"
                                    value={newAddr.label}
                                    onChange={(e) => setNewAddr(prev => ({ ...prev, label: e.target.value.toUpperCase() }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 font-black text-white focus:border-brand-500 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1 text-xs">Physical Deployment Coordinates</label>
                                <textarea 
                                    placeholder="Full delivery address..."
                                    value={newAddr.address}
                                    onChange={(e) => setNewAddr(prev => ({ ...prev, address: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 font-bold text-white focus:border-brand-500 transition-all outline-none h-32 resize-none"
                                />
                            </div>

                            <button 
                                onClick={() => {
                                    addAddress(newAddr.label, newAddr.address);
                                    setIsAddrModalOpen(false);
                                    setNewAddr({ label: '', address: '' });
                                }}
                                className="w-full py-6 bg-brand-600 text-white rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-500 transition-all shadow-3xl shadow-brand-600/40 active:scale-95 mt-4"
                            >
                                Deploy Node Metadata
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardPage;
