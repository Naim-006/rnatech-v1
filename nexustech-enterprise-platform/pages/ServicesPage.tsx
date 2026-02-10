
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_SERVICES, ICONS } from '../constants';
import { useApp } from '../App';
import { ServicePackage } from '../types';

const ServicesPage = () => {
  const { lang, theme, t } = useApp();
  const [activeTab, setActiveTab] = useState<'website' | 'pos' | 'app'>('website');
  const [subTab, setSubTab] = useState<string>('E-commerce');

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

  const filteredServices = MOCK_SERVICES.filter(s => {
    if (activeTab === 'app') return s.type === 'app';
    return s.type === activeTab && s.category === subTab;
  }).sort((a, b) => a.price - b.price);

  const sendInquiry = (service: ServicePackage) => {
    const message = `Hello RNATECH! I'm interested in the ${service.name_en} package (Price: ৳${service.price}). Please share more details.`;
    window.open(`https://wa.me/8801712345678?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 relative min-h-screen">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className={`text-4xl md:text-7xl font-black mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {t('services_title_1')}<br />
          <span className="text-gradient animate-gradient">{t('services_title_2')}</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
          {t('services_desc')}
        </p>
      </motion.div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {mainCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveTab(cat.id as any);
              if (cat.id === 'website') setSubTab('E-commerce');
              if (cat.id === 'pos') setSubTab('Only App');
            }}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-[12px] tracking-widest transition-all
              ${activeTab === cat.id
                ? 'bg-brand-600 text-white shadow-xl shadow-brand-600/30 scale-105'
                : theme === 'dark' ? 'bg-white/5 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            <div className="scale-75">{cat.icon}</div>
            {lang === 'bn' ? cat.label_bn : cat.label_en}
          </button>
        ))}
      </div>

      {/* Sub Tab Switcher */}
      <AnimatePresence mode="wait">
        {getSubTabs().length > 0 && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-16 px-6 -mx-6 md:px-0 md:mx-0"
          >
            <div className="flex md:justify-center gap-3 overflow-x-auto overflow-y-hidden pb-2 scrollbar-hide snap-x snap-mandatory scroll-smooth">
              {getSubTabs().map(tab => (
                <button
                  key={tab}
                  onClick={() => setSubTab(tab)}
                  className={`flex-shrink-0 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all border snap-center
                    ${subTab === tab
                      ? 'border-brand-500 bg-brand-500/5 text-brand-500'
                      : theme === 'dark' ? 'border-white/10 text-slate-500 hover:border-white/20' : 'border-slate-200 text-slate-400 hover:border-slate-300'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              className={`relative rounded-[2.5rem] p-8 border flex flex-col group smooth-animate
                ${theme === 'dark' ? 'bg-slate-900/50 border-white/5 hover:border-brand-500/30' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'}`}
            >
              {service.tier === 'Standard' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-brand-600 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 
                  ${service.tier === 'Beginner' ? 'text-cyan-500' : service.tier === 'Standard' ? 'text-brand-500' : 'text-purple-500'}`}>
                  {service.tier} Pack
                </div>
                <h3 className="text-3xl font-black mb-4 group-hover:text-brand-500 transition-colors">
                  {lang === 'bn' ? service.name_bn : service.name_en}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-slate-400 text-sm">৳</span>
                  <span className="text-5xl font-black">{service.price.toLocaleString()}</span>
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest ml-2">/ Total</span>
                </div>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {lang === 'bn' ? service.desc_bn : service.desc_en}
                </p>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {(lang === 'bn' ? service.features_bn : service.features_en).map((feat: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-[13px] font-bold text-slate-500">
                    <div className="text-brand-500"><ICONS.Zap /></div>
                    {feat}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-500/5 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  <span>Timeline</span>
                  <span>{service.timeline}</span>
                </div>
                <button
                  onClick={() => sendInquiry(service)}
                  className={`w-full py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all active:scale-95
                    ${service.tier === 'Standard'
                      ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-xl shadow-brand-600/30'
                      : theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                >
                  {t('services_btn_order')} {service.tier}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom CTA / Help */}
      <section className={`p-10 md:p-16 rounded-[3rem] border transition-all text-center
        ${theme === 'dark' ? 'bg-brand-500/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
        <h3 className="text-3xl md:text-5xl font-black mb-6">{t('services_custom_title')}</h3>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
          {t('services_custom_desc')}
        </p>
        <button className="px-12 py-5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-black uppercase text-[12px] tracking-[0.2em] shadow-2xl shadow-brand-500/40 transition-all hover:-translate-y-1">
          {t('services_btn_specialist')}
        </button>
      </section>
    </div>
  );
};

export default ServicesPage;

