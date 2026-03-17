import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS } from '../constants';
import { useApp } from '../context/AppContext';
import { supabase } from '../supabase';

const ServicesPage = () => {
  const { lang, theme, t } = useApp();
  const [activeTab, setActiveTab] = useState('website');
  const [subTab, setSubTab] = useState<string>('E-commerce');
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
   const [selectedService, setSelectedService] = useState<any>(null);
   const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase.from('services').select('*').order('base_price', { ascending: true });
      if (data) setServices(data);
      setLoading(false);
    };
    fetchServices();
  }, []);

  const mainCategories = [
    { id: 'website', label_en: 'Websites', label_bn: 'ওয়েবসাইট', icon: <ICONS.Globe /> },
    { id: 'pos', label_en: 'Smart POS', label_bn: 'স্মার্ট পজ', icon: <ICONS.ShoppingCart /> },
    { id: 'app', label_en: 'Mobile Apps', label_bn: 'মোবাইল অ্যাপ', icon: <ICONS.Layout /> },
  ];

  const getSubTabs = () => {
    if (activeTab === 'website') return ['E-commerce', 'Portfolio', 'Blog', 'News/Portal', 'Landing Page', 'Custom'];
    if (activeTab === 'pos') return ['Only App', 'Full Setup'];
    return [];
  };

  const filteredServices = services.filter(s => {
    if (s.type !== activeTab) return false;
    if (activeTab !== 'app' && subTab) {
      return (s.category || '').toLowerCase().includes(subTab.toLowerCase());
    }
    return true;
  });

  const sendInquiry = (service: any) => {
    const message = `Hello RNATECH! I'm interested in the ${service.name} package (Price: ৳${service.base_price}). Please share more details.`;
    window.open(`https://wa.me/8801712345678?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="relative">
            <div className="w-20 h-20 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-cyan-500/20 border-b-cyan-500 rounded-full animate-spin-slow"></div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] opacity-10 rounded-full ${theme === 'dark' ? 'bg-brand-500' : 'bg-brand-300'}`} />
          <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] blur-[150px] opacity-10 rounded-full ${theme === 'dark' ? 'bg-cyan-500' : 'bg-cyan-300'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 md:mb-24">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black mb-6 tracking-widest uppercase
            ${theme === 'dark' ? 'bg-brand-500/10 border-brand-500/20 text-brand-500' : 'bg-brand-50 border-brand-100 text-brand-600'}`}>
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            Our Expertise
          </div>
          <h1 className={`fluid-text-title font-black mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {t('services_title_1')}<br />
            <span className="text-gradient animate-gradient">{t('services_title_2')}</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            {t('services_desc')}
          </p>
        </motion.div>

        {/* Main Tab Switcher - Responsive Scroll/Grid */}
        <div className="flex gap-4 mb-12 p-2 bg-white/5 border border-white/10 rounded-[2.5rem] w-fit mx-auto overflow-x-auto custom-scrollbar no-scrollbar-mobile">
          {mainCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id as any);
                if (cat.id === 'website') setSubTab('E-commerce');
                if (cat.id === 'pos') setSubTab('Only App');
              }}
              className={`flex items-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-5 rounded-[2rem] font-black uppercase text-[10px] md:text-[12px] tracking-widest transition-all whitespace-nowrap
                ${activeTab === cat.id
                  ? 'bg-brand-600 text-white shadow-2xl shadow-brand-600/30 scale-105'
                  : theme === 'dark' ? 'bg-white/5 text-slate-400 hover:text-white border border-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'}`}
            >
              <div className="scale-75 md:scale-90">{cat.icon}</div>
              {lang === 'bn' ? cat.label_bn : cat.label_en}
            </button>
          ))}
        </div>

        {/* Sub-tab Switcher (Web/POS) */}
        {activeTab !== 'app' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16">
            {getSubTabs().map((tab) => (
              <button
                key={tab}
                onClick={() => setSubTab(tab)}
                className={`px-4 md:px-6 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all
                  ${subTab === tab
                    ? 'bg-brand-500/20 text-brand-500 border border-brand-500/40'
                    : theme === 'dark' ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-20 md:mb-32">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => { setSelectedService(service); setSelectedImgIdx(0); }}
                className={`group cursor-pointer premium-card overflow-hidden !p-0 border-transparent hover:!border-brand-500/40 hover:shadow-2xl transition-all duration-500
                  ${theme === 'dark' ? 'hover:bg-brand-500/5' : 'hover:bg-slate-50'}`}
              >
                <div className="aspect-[16/10] overflow-hidden relative border-b border-white/5">
                   <img 
                      src={service.image_url || `https://placehold.co/800x600/1e293b/94a3b8?text=${service.category}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/800x600/1e293b/94a3b8?text=${service.category}`; }}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <div className="absolute bottom-6 left-6 right-6 flex items-baseline gap-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      <span className="text-white text-xs font-black">৳</span>
                      <span className="text-3xl font-black text-white">{(service.base_price || 0).toLocaleString()}</span>
                   </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-4">
                     <span className={`px-2.5 py-1 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest border
                       ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                       {service.category}
                     </span>
                  </div>
                  <h3 className={`text-xl md:text-2xl font-black mb-3 group-hover:text-brand-500 transition-colors uppercase tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {service.name}
                  </h3>
                  <p className="text-slate-500 text-[10px] md:text-xs font-bold leading-relaxed line-clamp-2 mb-6 md:mb-8">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-5 md:pt-6 border-t border-white/5">
                     <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-brand-500">{t('portfolio_view_details')}</span>
                     <ICONS.ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-brand-500 group-hover:translate-x-2 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA / Help */}
        <section className={`p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border transition-all text-center relative overflow-hidden
          ${theme === 'dark' ? 'bg-brand-500/5 border-white/5' : 'bg-white border-slate-200 shadow-3xl shadow-slate-200/50'}`}>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-500/10 blur-[100px] rounded-full"></div>
          <h3 className={`text-3xl md:text-5xl font-black mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('services_custom_title')}</h3>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {t('services_custom_desc')}
          </p>
          <button className="px-10 md:px-12 py-4 md:py-5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-black uppercase text-[10px] md:text-[12px] tracking-[0.2em] shadow-2xl shadow-brand-500/40 transition-all hover:-translate-y-2">
            {t('services_btn_specialist')}
          </button>
        </section>
      </div>

      {/* Service Detail Modal - Responsive Refined */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-slate-950/60 backdrop-blur-2xl"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className={`relative responsive-modal-container !p-0 overflow-hidden border shadow-3xl
                ${theme === 'dark' ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-rose-500 transition-all border border-white/10"
              >
                <ICONS.X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  <div className="h-full min-h-[300px] md:min-h-[400px] relative border-b md:border-b-0 md:border-r border-white/5 flex flex-col">
                    <div className="flex-grow relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.img 
                                key={selectedImgIdx}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                src={(selectedService.images && selectedService.images.length > 0) ? selectedService.images[selectedImgIdx] : (selectedService.image_url || 'https://placehold.co/800x1200')} 
                                className="w-full h-full object-cover" 
                                alt={selectedService.name}
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12">
                           <div className="flex items-baseline gap-1 text-white">
                              <span className="text-xl font-black">৳</span>
                              <span className="text-4xl md:text-6xl font-black tracking-tighter">{(selectedService.base_price || 0).toLocaleString()}</span>
                           </div>
                           <p className="text-brand-500 font-black text-[9px] md:text-xs uppercase tracking-widest mt-2">Starting Investment</p>
                        </div>
                    </div>
                    
                    {selectedService.images && selectedService.images.length > 1 && (
                        <div className="p-4 md:p-6 bg-slate-950/50 flex gap-3 overflow-x-auto custom-scrollbar no-scrollbar-mobile">
                            {selectedService.images.map((img: string, i: number) => (
                                <button 
                                    key={i} 
                                    onClick={() => setSelectedImgIdx(i)}
                                    className={`w-12 h-10 md:w-16 md:h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all
                                        ${selectedImgIdx === i ? 'border-brand-500 scale-105 shadow-lg shadow-brand-500/20' : 'border-transparent opacity-40 hover:opacity-100'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                  </div>

                 <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-[9px] font-black text-brand-500 uppercase tracking-[0.2em] mb-4 md:mb-6 inline-block w-fit">
                      {selectedService.category}
                    </span>
                    <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6 tracking-tighter uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {selectedService.name}
                    </h2>
                    <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-medium mb-8 md:mb-10">
                      {selectedService.description}
                    </p>

                    <div className="space-y-4 mb-10 md:mb-12">
                       <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">System Metrics</h4>
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-500">
                             <ICONS.Zap className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <p className="text-[10px] md:text-xs font-black uppercase tracking-widest">{selectedService.timeline || '7-14 Days'} Timeline</p>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-500">
                             <ICONS.Shield className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <p className="text-[10px] md:text-xs font-black uppercase tracking-widest">{selectedService.tier || 'Enterprise'} Class Maintenance</p>
                       </div>
                    </div>

                    {selectedService.features && selectedService.features.length > 0 && (
                        <div className="mb-10 md:mb-12">
                            <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Payload Features</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                                {selectedService.features.map((f: string, i: number) => (
                                    <div key={i} className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-slate-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                                        {f}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button 
                      onClick={() => sendInquiry(selectedService)}
                      className="w-full py-4 md:py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl flex items-center justify-center gap-3 md:gap-4 text-xs md:text-sm font-black uppercase tracking-widest transition-all shadow-2xl shadow-brand-600/30 hover:-translate-y-1"
                    >
                      Manifest Inquiry <ICONS.WhatsApp className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesPage;

