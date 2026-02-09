
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_HARDWARE, ICONS } from '../constants';
import { useApp } from '../App';

const ShopPage = () => {
  const { lang, theme, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Retail Systems', 'Industrial', 'Sensors'];
  const filtered = activeCategory === 'All' ? MOCK_HARDWARE : MOCK_HARDWARE.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 relative">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20 md:mb-32">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-center lg:text-left">
          <h2 className={`text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {lang === 'bn' ? 'হার্ডওয়্যার শপ' : 'Nexus IoT'}<br />
            <span className="text-gradient animate-gradient">Hardware Hub</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl mx-auto lg:mx-0">
            Industrial-grade sensors, POS equipment, and automation hardware for scale.
          </p>
        </motion.div>

        <div className={`flex flex-wrap items-center justify-center gap-2 md:gap-3 p-2 md:p-3 rounded-3xl md:rounded-[2.5rem] border transition-all
          ${theme === 'dark' ? 'bg-slate-900/60 border-white/5 shadow-inner' : 'bg-slate-100 border-slate-200'}`}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 md:px-8 py-2 md:py-3 rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all
                ${activeCategory === cat ? 'bg-brand-600 text-white shadow-2xl shadow-brand-600/30' : 'text-slate-500 hover:text-brand-500'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-40">
        <AnimatePresence mode="popLayout">
          {filtered.map((product, idx) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className={`group rounded-3xl md:rounded-[4.5rem] border overflow-hidden transition-all shadow-3xl smooth-animate flex flex-col
                ${theme === 'dark' ? 'bg-slate-900/50 border-white/5 hover:border-brand-500/40' : 'bg-white border-slate-200 shadow-slate-200/50 hover:shadow-3xl'}`}
            >
              <div className="aspect-[5/4] relative overflow-hidden md:group-hover:p-4 transition-all duration-700">
                <img src={product.image} alt={product.name_en} className="w-full h-full object-cover rounded-t-3xl md:rounded-t-[4rem] md:group-hover:rounded-[3.5rem] transition-all duration-700 smooth-animate" />
                <div className="absolute top-10 left-10 flex flex-col gap-3">
                  <div className="bg-slate-950/80 glass px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
                    {product.category}
                  </div>
                  {product.tag && (
                    <div className="bg-brand-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
                      {product.tag}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8 md:p-12 pt-6 md:pt-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-xl md:text-2xl font-black transition-colors ${theme === 'dark' ? 'text-white hover:text-brand-500' : 'text-slate-900 hover:text-brand-600'}`}>
                    {lang === 'bn' ? product.name_bn : product.name_en}
                  </h3>
                  <div className={`text-lg md:text-xl font-black ${theme === 'dark' ? 'text-brand-400' : 'text-brand-600'}`}>৳{product.price.toLocaleString()}</div>
                </div>

                <p className="text-slate-500 text-sm md:text-lg leading-relaxed mb-8 md:mb-10 flex-grow">
                  {lang === 'bn' ? product.desc_bn : product.desc_en}
                </p>

                <div className={`grid grid-cols-2 gap-4 mb-8 md:mb-12 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border transition-colors
                  ${theme === 'dark' ? 'bg-slate-950/60 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                  {Object.entries(product.specs).slice(0, 2).map(([key, val]: [string, any]) => (
                    <div key={key}>
                      <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{key}</span>
                      <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{val}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => addToCart({ product, quantity: 1 })}
                  className="w-full py-4 md:py-6 rounded-2xl md:rounded-[2rem] bg-brand-600 hover:bg-brand-500 text-white font-black text-[11px] md:text-[13px] tracking-[0.2em] uppercase flex items-center justify-center gap-4 transition-all shadow-2xl shadow-brand-600/30 active:scale-95"
                >
                  <ICONS.ShoppingCart /> {lang === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ShopPage;
