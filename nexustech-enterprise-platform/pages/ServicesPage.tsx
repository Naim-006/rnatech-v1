
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_SERVICES, ICONS } from '../constants';
import { useApp } from '../App';

const ServicesPage = () => {
  const { lang, theme } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const sendInquiry = (channel: 'whatsapp' | 'messenger' | 'web', service: any) => {
    const message = `Hello NexusTech! I am interested in the ${service.name_en} package (Price: ৳${service.price}). Please provide more information.`;
    const encoded = encodeURIComponent(message);

    if (channel === 'whatsapp') {
      window.open(`https://wa.me/8801712345678?text=${encoded}`, '_blank');
    } else if (channel === 'messenger') {
      window.open(`https://m.me/nexustechbd`, '_blank');
    } else {
      // Logic for internal web messaging can go here
      alert("Opening web inquiry portal...");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 relative min-h-screen">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-32">
        <div className="inline-block px-5 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
          Precision Engineering
        </div>
        <h2 className={`text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {lang === 'bn' ? 'ডিজিটাল সলিউশন' : 'Digital Services'}<br />
          <span className="text-gradient animate-gradient">{lang === 'bn' ? 'প্যাকেজসমূহ' : 'For High Scale'}</span>
        </h2>
        <p className="text-slate-500 text-xl max-w-4xl mx-auto font-medium leading-relaxed">
          {lang === 'bn'
            ? 'আপনার ব্যবসার প্রয়োজন অনুযায়ী আমাদের বিশেষায়িত ডিজিটাল সার্ভিস প্যাকগুলো থেকে বেছে নিন।'
            : 'Select from our specialized digital service tiers built for reliability, performance, and conversion.'}
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 gap-6 md:gap-10 mb-40">
        {MOCK_SERVICES.map((service) => (
          <motion.div
            key={service.id}
            variants={item}
            className={`rounded-3xl md:rounded-[4rem] border transition-all overflow-hidden smooth-animate
              ${theme === 'dark' ? 'bg-slate-900/50 border-white/5' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'}
              ${expandedId === service.id ? 'ring-2 ring-brand-500/50' : ''}`}
          >
            <div className="p-8 md:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 md:gap-12">
              <div className="w-full lg:flex-grow flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10">
                <div className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-brand-500 flex-shrink-0
                  ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
                  {service.type === 'website' ? <ICONS.Globe /> : service.type === 'app' ? <ICONS.Layout /> : <ICONS.Cpu />}
                </div>
                <div>
                  <h3 className={`text-xl md:text-2xl font-black mb-2 md:mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'bn' ? service.name_bn : service.name_en}
                  </h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl">
                    {lang === 'bn' ? service.desc_bn : service.desc_en}
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-auto flex flex-row lg:flex-row items-center justify-between lg:justify-end gap-6 md:gap-12">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Pricing</p>
                  <div className={`text-xl md:text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>৳{service.price.toLocaleString()}</div>
                </div>
                <button
                  onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold uppercase text-[10px] md:text-[11px] tracking-widest transition-all active:scale-95
                    ${expandedId === service.id ? 'bg-slate-800 text-white' : 'bg-brand-600 hover:bg-brand-500 text-white shadow-xl shadow-brand-600/30'}`}
                >
                  {expandedId === service.id ? (lang === 'bn' ? 'বন্ধ করুন' : 'Hide Details') : (lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Expand Package')}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {expandedId === service.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/5 overflow-hidden"
                >
                  <div className="p-12 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div className="space-y-12">
                      <div>
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-500 mb-6">Service Breakdown</h4>
                        <p className="text-slate-400 text-xl leading-relaxed font-medium">
                          {lang === 'bn' ? service.extended_desc_bn : service.extended_desc_en}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {(lang === 'bn' ? service.features_bn : service.features_en).map((feat: string) => (
                          <div key={feat} className="flex items-start gap-4 text-slate-500 text-sm font-bold">
                            <div className="mt-1 text-brand-500"><ICONS.Zap /></div>
                            {feat}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`p-12 rounded-[3rem] border ${theme === 'dark' ? 'bg-slate-950/50 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                      <h4 className={`text-2xl font-black mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Enquire About This Pack</h4>
                      <p className="text-slate-500 mb-10 font-medium">Choose your preferred channel to speak with an engineering specialist about this package.</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <button
                          onClick={() => sendInquiry('whatsapp', service)}
                          className="flex items-center justify-center gap-4 py-6 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black text-[12px] tracking-widest shadow-xl shadow-green-600/20 transition-all"
                        >
                          <ICONS.WhatsApp /> WhatsApp
                        </button>
                        <button
                          onClick={() => sendInquiry('messenger', service)}
                          className="flex items-center justify-center gap-4 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-[12px] tracking-widest shadow-xl shadow-blue-600/20 transition-all"
                        >
                          <ICONS.Messenger /> Messenger
                        </button>
                        <button
                          onClick={() => sendInquiry('web', service)}
                          className={`flex items-center justify-center gap-4 py-6 border rounded-2xl font-black text-[12px] tracking-widest transition-all sm:col-span-2
                            ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-300 hover:bg-slate-100'}`}
                        >
                          Direct Web Message
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Pro Features section */}
      <section className={`py-32 px-12 rounded-[5rem] border mb-40 relative overflow-hidden transition-all
        ${theme === 'dark' ? 'bg-slate-900/40 border-brand-500/20' : 'bg-white border-slate-200 shadow-3xl shadow-slate-200/50'}`}>
        <div className="text-center mb-20">
          <h3 className={`text-4xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Standard In All Tiers
          </h3>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">Foundational reliability for every project we build.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { title: 'Free Domain', icon: <ICONS.Globe /> },
            { title: 'SSL Security', icon: <ICONS.Shield /> },
            { title: 'NVMe Hosting', icon: <ICONS.Zap /> },
            { title: 'SEO Optimized', icon: <ICONS.Layout /> }
          ].map((feature, i) => (
            <div key={i} className="text-center group">
              <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-brand-500 transition-all shadow-xl group-hover:scale-110
                ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
                {feature.icon}
              </div>
              <h4 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{feature.title}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
