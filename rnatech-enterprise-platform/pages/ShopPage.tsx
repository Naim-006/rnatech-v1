
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { MOCK_HARDWARE, ICONS } from '../constants';
import { useApp } from '../context/AppContext';

const ShopPage = () => {
  const { lang, theme, addToCart, t, currency } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      const fetchProducts = async () => {
          const { data, error } = await supabase.from('products').select('*');
          if (error) {
              console.error("Error fetching products:", error);
              setProducts(MOCK_HARDWARE);
          } else {
              setProducts(data || []);
          }
          setLoading(false);
      };
      fetchProducts();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
        const fetchReviews = async () => {
            setReviewsLoading(true);
            const { data } = await supabase
                .from('product_reviews')
                .select('*')
                .eq('product_id', selectedProduct.id)
                .eq('status', 'APPROVED')
                .order('created_at', { ascending: false });
            setReviews(data || []);
            setReviewsLoading(false);
        };
        fetchReviews();
    }
  }, [selectedProduct]);

  const categories = [
    { id: 'All', label: t('cat_all'), icon: ICONS.Globe },
    { id: 'IoT Systems', label: t('cat_iot'), icon: ICONS.Zap },
    { id: 'Smart Home', label: t('cat_smart_home'), icon: ICONS.Home },
    { id: 'Robotics', label: t('cat_robotics'), icon: ICONS.Cpu },
    { id: 'Sensors', label: t('cat_sensors'), icon: ICONS.Search },
    { id: 'Power', label: t('cat_power'), icon: ICONS.Zap },
  ];

  const filteredAndSorted = useMemo(() => {
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
    });

    return filteredProducts;
  }, [activeCategory, searchQuery, sortBy, lang, products]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-[#FDFDFF]'}`}>
      <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row gap-6 px-4 py-10 lg:py-16">
        
        {/* COMPACT SIDEBAR */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className={`sticky top-32 p-6 rounded-[2rem] border transition-all duration-500
            ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/60 shadow-xl shadow-slate-200/20'}`}>
            
            <h2 className="text-xs font-black tracking-[0.2em] uppercase text-slate-500 mb-8 px-2">{t('shop_categories_title')}</h2>

            <nav className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full group flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300
                    ${activeCategory === cat.id 
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                      : theme === 'dark' ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'}`}
                >
                  <div className={`transition-colors ${activeCategory === cat.id ? 'text-white' : 'text-slate-400 group-hover:text-brand-500'}`}>
                    <cat.icon />
                  </div>
                  <span className="font-bold text-xs">{cat.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-10 pt-8 border-t border-slate-500/10 space-y-4">
                <div className="p-4 rounded-2xl bg-brand-500/5 border border-brand-500/10 mb-4">
                    <p className="text-[10px] font-black text-brand-500 uppercase tracking-widest mb-1">Support</p>
                    <p className="text-[11px] font-bold text-slate-500">Need corporate pricing? Contact our sales team.</p>
                </div>

                <Link to="/tracking" className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all group
                    ${theme === 'dark' ? 'bg-white/5 border-white/5 hover:border-brand-500/50' : 'bg-slate-50 border-slate-100 hover:border-brand-500/20 shadow-sm'}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/20">
                            <ICONS.Globe />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-500 mb-0.5">{t('tracking_title')}</p>
                            <p className="text-[9px] font-bold text-slate-500 uppercase">Check Logistics Status</p>
                        </div>
                    </div>
                    <div className="text-slate-400 group-hover:text-brand-500 transition-transform group-hover:translate-x-1">
                        <ICONS.ChevronRight />
                    </div>
                </Link>
            </div>
          </div>
        </aside>

        {/* COMPACT MAIN CONTENT */}
        <main className="flex-grow">
          {/* Refined Search & Stats Bar */}
          <div className={`px-6 py-4 rounded-[1.5rem] border mb-8 flex flex-col md:flex-row items-center justify-between gap-4 transition-all
            ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100 shadow-lg shadow-slate-200/20'}`}>
            
            <div className="relative w-full md:w-80">
                <input
                    type="text"
                    placeholder={t('shop_search_placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full py-3 pl-10 pr-4 rounded-xl border transition-all text-xs font-bold
                        ${theme === 'dark' ? 'bg-slate-900 border-white/5 focus:border-brand-500' : 'bg-slate-50 border-slate-100 focus:border-brand-500'}`}
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]">
                    <ICONS.Search />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`bg-transparent border-none font-black text-[10px] uppercase tracking-widest outline-none cursor-pointer ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                >
                    <option value="newest">Latest</option>
                    <option value="price_low">Price +</option>
                    <option value="price_high">Price -</option>
                    <option value="name">A-Z</option>
                </select>
                <div className="h-6 w-px bg-slate-500/10" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {filteredAndSorted.length} {t('shop_stat_items')}
                </span>
            </div>
          </div>

          {/* MINIMIZED PRODUCT GRID (5 columns on huge screens) */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredAndSorted.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  onClick={() => { setSelectedProduct(product); setSelectedImageIdx(0); }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`group relative rounded-[1.5rem] p-3 md:p-4 border border-transparent transition-all duration-300 cursor-pointer
                    ${theme === 'dark' ? 'bg-white/5 hover:bg-white/[0.08] hover:border-white/10' : 'bg-white hover:border-brand-500/20 hover:shadow-xl hover:shadow-slate-200/60'}`}
                >
                  <div className="aspect-square relative overflow-hidden rounded-[1.2rem] mb-4 bg-slate-100">
                    <img
                      src={product.image_url || product.image || 'https://placehold.co/400x400/1e293b/94a3b8?text=No+Image'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/1e293b/94a3b8?text=No+Image'; }}
                    />
                    {product.is_on_sale && (
                        <div className="absolute top-2 left-2 bg-rose-600 text-white px-3 py-1 rounded-full text-[7px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                            <ICONS.Zap className="w-2 h-2" />
                            Offer -{Math.round((1 - product.price / product.original_price) * 100)}%
                        </div>
                    )}
                    {product.tag && !product.is_on_sale && (
                        <div className="absolute top-2 left-2 bg-brand-600 text-white px-3 py-1 rounded-full text-[7px] font-black uppercase tracking-widest shadow-lg">
                            {product.tag}
                        </div>
                    )}
                  </div>

                  <div className="px-1">
                    <h3 className="text-sm font-black tracking-tight leading-tight mb-2 group-hover:text-brand-500 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex flex-col">
                            <p className="text-sm font-black text-brand-500 truncate">{currency}{(product.price || 0).toLocaleString()}</p>
                            {product.is_on_sale && (
                                <p className="text-[10px] font-bold text-slate-500 line-through opacity-60">{currency}{(product.original_price || 0).toLocaleString()}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            <ICONS.Shield />
                            <span className="text-[9px] font-bold text-slate-500">4.8</span>
                        </div>
                    </div>
                    
                    {product.stock > 0 && product.stock < 5 && (
                      <div className="mb-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                        <span className="text-[8px] font-black uppercase text-rose-500 tracking-widest">
                          {lang === 'bn' ? 'অল্প স্টোক' : 'Low Stock'}: {product.stock} Units
                        </span>
                      </div>
                    )}
                    
                    <button
                        onClick={(e) => { e.stopPropagation(); addToCart({ product, quantity: 1 }); }}
                        className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-brand-600 hover:bg-brand-500 text-white font-black text-[9px] uppercase tracking-widest transition-all active:scale-95"
                    >
                        {t('shop_add_to_cart')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>

      {/* PRODUCT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative responsive-modal-container flex flex-col md:flex-row shadow-2xl
                ${theme === 'dark' ? 'bg-slate-900 border border-white/10' : 'bg-white'}`}
            >
              {/* Close Button - Responsive Position */}
              <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-slate-500/10 backdrop-blur-md flex items-center justify-center text-slate-500 hover:bg-rose-500 hover:text-white transition-all z-[110] border border-white/5"
              >
                  <ICONS.X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Image Gallery */}
              <div className="w-full md:w-1/2 p-0 md:p-4 space-y-6">
                <div className="aspect-square rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-slate-100 group">
                    <motion.img
                        key={selectedImageIdx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                         src={selectedProduct.images?.[selectedImageIdx] || selectedProduct.image_url || selectedProduct.image || 'https://placehold.co/600x600/1e293b/94a3b8?text=No+Image'}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar lg:pb-0">
                        {selectedProduct.images.map((img: string, i: number) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImageIdx(i)}
                                className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all
                                    ${selectedImageIdx === i ? 'border-brand-500 shadow-lg shadow-brand-500/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                <img src={img} alt="detail" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
              </div>

              {/* Product Info */}
              <div className="w-full md:w-1/2 p-0 md:p-4 mt-8 md:mt-0 flex flex-col">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-brand-500/10 text-brand-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest leading-none">
                            {selectedProduct.category}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-500">
                            <ICONS.Shield className="w-3 h-3" />
                            <span className="text-[10px] font-black text-slate-500">4.8</span>
                        </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-4 leading-tight uppercase">
                        {selectedProduct.name}
                    </h2>

                    <div className="flex flex-wrap items-center gap-3 mb-8">
                      <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-0.5 whitespace-nowrap">Stock SKU</div>
                        <div className="text-[9px] font-mono font-bold text-brand-500 uppercase">{selectedProduct.sku || 'N/A-SKU'}</div>
                      </div>
                      <div className={`px-3 py-2 rounded-xl border ${selectedProduct.stock < 5 ? 'bg-rose-500/10 border-rose-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                        <div className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-0.5 whitespace-nowrap">Availability</div>
                        <div className={`text-[9px] font-bold ${selectedProduct.stock < 5 ? 'text-rose-500' : 'text-green-500'}`}>
                          {selectedProduct.stock > 0 ? `${selectedProduct.stock} Reserve` : 'Out of Stock'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-end gap-3 mb-6">
                        <p className="text-3xl md:text-4xl font-black text-brand-500 leading-none">{currency}{(selectedProduct.price || 0).toLocaleString()}</p>
                        {selectedProduct.is_on_sale && (
                            <div className="flex flex-col gap-0.5 mb-1">
                                <span className="text-xs font-bold text-slate-500 line-through opacity-50">{currency}{(selectedProduct.original_price || 0).toLocaleString()}</span>
                                <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest">SAVE {Math.round((1 - (selectedProduct.price || 0) / (selectedProduct.original_price || 1)) * 100)}%</span>
                            </div>
                        )}
                    </div>
                    <p className={`text-xs md:text-sm font-medium leading-relaxed mb-8 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        {selectedProduct.description}
                    </p>

                    {/* Integrated Reviews Section */}
                    <div className="border-t border-white/5 pt-8 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Feedback</h4>
                            <span className="text-[8px] font-bold text-brand-500 uppercase tracking-widest">{reviews.length} entries</span>
                        </div>
                        
                        <div className="space-y-4 max-h-[200px] md:max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                            {reviewsLoading ? (
                                <div className="animate-pulse space-y-4">
                                    <div className="h-10 bg-white/5 rounded-xl w-full" />
                                    <div className="h-10 bg-white/5 rounded-xl w-3/4" />
                                </div>
                            ) : reviews.length === 0 ? (
                                <div className={`p-6 rounded-2xl border border-dashed text-center
                                    ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">No verified reviews yet.</p>
                                </div>
                            ) : (
                                reviews.map(review => (
                                    <div key={review.id} className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black">{review.user_name || 'Agent'}</span>
                                                {review.is_verified && <ICONS.Shield className="w-2.5 h-2.5 text-brand-500" />}
                                            </div>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`text-[8px] ${i < review.rating ? 'text-yellow-500' : 'text-slate-800'}`}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-[10px] font-medium text-slate-500 leading-relaxed italic">"{review.comment}"</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-auto space-y-4">
                    <button
                        onClick={() => { addToCart({ product: selectedProduct, quantity: 1 }); setSelectedProduct(null); }}
                        className="w-full py-5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-brand-600/30 transition-all active:scale-95"
                    >
                        {t('shop_add_to_cart')}
                    </button>
                    <div className="flex items-center justify-center gap-6 text-[8px] font-black uppercase tracking-widest text-slate-500">
                        <div className="flex items-center gap-2 pr-4 border-r border-white/5"><ICONS.Shield className="w-3 h-3" /> SECURE</div>
                        <div className="flex items-center gap-2"><ICONS.Globe className="w-3 h-3" /> GLOBAL DELIVERY</div>
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;

