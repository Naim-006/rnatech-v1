
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_HARDWARE, ICONS } from '../constants';
import { useApp } from '../App';

const ShopPage = () => {
  const { lang, theme, addToCart, t } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Retail Systems', 'Industrial', 'Sensors'];
  const filtered = activeCategory === 'All' ? MOCK_HARDWARE : MOCK_HARDWARE.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Shop Hero */}
      <section className={`relative py-20 px-6 overflow-hidden border-b transition-colors
        ${theme === 'dark' ? 'bg-slate-950 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-[9px] font-black uppercase tracking-[0.3em] mb-6">
              {t('shop_hero_badge')}
            </div>
            <h1 className={`text-5xl md:text-7xl font-black mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t('shop_title_1')}<br />
              <span className="text-gradient animate-gradient">{t('shop_title_2')}</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              {t('shop_desc')}
            </p>
          </motion.div>
        </div>

        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500 blur-[150px] rounded-full"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Category & Stats bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 px-4">
          <div className={`flex flex-wrap gap-2 p-2 rounded-2xl border transition-all
            ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                  ${activeCategory === cat
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                    : 'text-slate-500 hover:text-brand-500'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-10">
            <div className="text-center">
              <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('shop_stat_items')}</span>
              <span className="text-2xl font-black tracking-tight">{filtered.length}</span>
            </div>
            <div className="w-px h-10 bg-slate-500/20"></div>
            <div className="text-center">
              <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('shop_stat_standard')}</span>
              <span className="text-2xl font-black tracking-tight">Global QC</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                className={`group relative rounded-[2.5rem] p-4 border transition-all duration-500 flex flex-col
                  ${theme === 'dark' ? 'bg-slate-900/40 border-white/5 hover:border-brand-500/30' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/40 hover:shadow-3xl'}`}
              >
                {/* Image Container */}
                <div className="aspect-[4/3] relative overflow-hidden rounded-[2rem] mb-8">
                  <img
                    src={product.image}
                    alt={product.name_en}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="glass px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest text-white border border-white/10">
                      {product.category}
                    </div>
                    {product.tag && (
                      <div className="bg-brand-600 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-lg">
                        {product.tag}
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <button className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-2xl hover:bg-brand-500 hover:text-white transition-colors">
                      <ICONS.Search />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-4 flex-grow flex flex-col">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="text-2xl font-black tracking-tight leading-tight group-hover:text-brand-500 transition-colors">
                      {lang === 'bn' ? product.name_bn : product.name_en}
                    </h3>
                    <div className="text-xl font-black text-brand-500">
                      ৳{product.price.toLocaleString()}
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-2">
                    {lang === 'bn' ? product.desc_bn : product.desc_en}
                  </p>

                  <div className={`grid grid-cols-2 gap-4 mb-10 p-5 rounded-2xl border transition-colors
                    ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                    {Object.entries(product.specs).slice(0, 2).map(([key, val]: [string, any]) => (
                      <div key={key}>
                        <span className="block text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">{key}</span>
                        <span className="text-xs font-bold truncate block">{val}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => addToCart({ product, quantity: 1 })}
                    className="w-full py-5 rounded-2xl bg-slate-900 hover:bg-brand-600 text-white font-black text-[11px] tracking-[0.2em] uppercase flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95"
                  >
                    <ICONS.ShoppingCart /> {t('shop_add_to_cart')}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopPage;

