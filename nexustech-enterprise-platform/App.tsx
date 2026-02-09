
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppState, UserRole, CartItem } from './types';
import { ICONS, TRANSLATIONS } from './constants';
import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import ShopPage from './pages/ShopPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboard from './pages/AdminDashboard';
import CheckoutPage from './pages/CheckoutPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import UnifiedMessaging from './components/UnifiedMessaging';
import ThreeBackground from './components/ThreeBackground';
import SplashScreen from './components/SplashScreen';

type Language = 'bn' | 'en';
type Theme = 'dark' | 'light';

const AppContext = createContext<{
  state: AppState;
  lang: Language;
  theme: Theme;
  toggleTheme: () => void;
  setLang: (l: Language) => void;
  t: (key: string) => string;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  logout: () => void;
} | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const Header = () => {
  const { state, lang, setLang, theme, toggleTheme, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  const navLinks = [
    { to: '/', label: t('nav_home') },
    { to: '/services', label: t('nav_services') },
    { to: '/shop', label: t('nav_shop') },
    { to: '/portfolio', label: t('nav_portfolio') },
    { to: '/about', label: t('nav_about') },
    { to: '/contact', label: t('nav_contact') },
  ];

  const MobileMenu = () => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`fixed inset-0 z-[60] pt-24 px-6 flex flex-col gap-6
            ${theme === 'dark' ? 'bg-slate-950/95' : 'bg-white/95'} glass lg:hidden`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link: any) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-black uppercase tracking-tight p-4 rounded-3xl transition-all
                  ${theme === 'dark' ? 'hover:bg-white/5 text-white' : 'hover:bg-slate-100 text-slate-900'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pb-12 space-y-4">
            <Link
              to={state.user ? "/dashboard" : "/login"}
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center py-6 rounded-[2rem] bg-brand-600 text-white font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-brand-600/40"
            >
              {state.user ? (lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard') : (lang === 'bn' ? 'লগইন' : 'Login')}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 
        ${theme === 'dark' ? 'bg-slate-950/70' : 'bg-white/70'} glass`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <ICONS.Logo theme={theme} />
            <div className="absolute inset-0 bg-brand-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col justify-center border-l border-white/10 pl-3">
            <span className={`text-2xl font-black tracking-[-0.02em] leading-none transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              RNA<span className="text-brand-500">TECH</span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500 mt-1 whitespace-nowrap">
              Reliance Network & Automations
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[13px] font-black uppercase tracking-wider transition-all ${location.pathname === link.to ? 'text-brand-500' : theme === 'dark' ? 'text-slate-400 hover:text-brand-500' : 'text-slate-600 hover:text-brand-500'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2.5 rounded-2xl transition-all bg-white/5 text-slate-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ICONS.X /> : <ICONS.Menu />}
          </button>
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-2xl transition-all ${theme === 'dark' ? 'bg-white/5 text-yellow-400 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {theme === 'dark' ? <ICONS.Sun /> : <ICONS.Moon />}
          </button>

          <div className={`flex p-1 rounded-2xl border transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
            <button onClick={() => setLang('en')} className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${lang === 'en' ? 'bg-brand-500 text-white' : 'text-slate-500'}`}>EN</button>
            <button onClick={() => setLang('bn')} className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${lang === 'bn' ? 'bg-brand-500 text-white' : 'text-slate-500'}`}>বাং</button>
          </div>

          <Link to="/checkout" className={`relative p-2.5 rounded-2xl transition-colors ${theme === 'dark' ? 'hover:bg-white/5 text-white' : 'hover:bg-slate-100 text-slate-900'}`}>
            <ICONS.ShoppingCart />
            {state.cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 text-[10px] font-black flex items-center justify-center rounded-full text-white ring-4 ring-slate-950">
                {state.cart.reduce((acc, c) => acc + c.quantity, 0)}
              </span>
            )}
          </Link>

          <Link
            to={state.user ? "/dashboard" : "/login"}
            className="hidden sm:block px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-[13px] font-black uppercase tracking-widest transition-all shadow-xl shadow-brand-600/30"
          >
            {state.user ? (lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard') : (lang === 'bn' ? 'লগইন' : 'Login')}
          </Link>
        </div>
      </div>
      <MobileMenu />
    </motion.header>
  );
};

const App = () => {
  const [lang, setLang] = useState<Language>('bn');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
  const [showSplash, setShowSplash] = useState(false);
  const [state, setState] = useState<AppState>({
    user: { id: 'u-1', email: 'owner@shop.com.bd', role: UserRole.CUSTOMER },
    cart: [],
    isDark: theme === 'dark'
  });

  useEffect(() => {
    const lastShow = localStorage.getItem('lastSplashShow');
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (!lastShow || (now - parseInt(lastShow)) > twentyFourHours) {
      setShowSplash(true);
      localStorage.setItem('lastSplashShow', now.toString());
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  const addToCart = (item: CartItem) => {
    setState(prev => {
      const existing = prev.cart.find(c => c.product.id === item.product.id);
      if (existing) {
        return { ...prev, cart: prev.cart.map(c => c.product.id === item.product.id ? { ...c, quantity: c.quantity + item.quantity } : c) };
      }
      return { ...prev, cart: [...prev.cart, item] };
    });
  };

  const removeFromCart = (id: string) => {
    setState(prev => ({ ...prev, cart: prev.cart.filter(c => c.product.id !== id) }));
  };

  const logout = () => setState(prev => ({ ...prev, user: null }));

  return (
    <AppContext.Provider value={{ state, lang, theme, toggleTheme, setLang, t, addToCart, removeFromCart, logout }}>
      <Router>
        <AnimatePresence>
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        </AnimatePresence>
        <div className={`min-h-screen flex flex-col transition-all duration-700 
          ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          <ThreeBackground theme={theme} />
          <Header />
          <UnifiedMessaging />
          <main className="flex-grow pt-20">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </AnimatePresence>
          </main>

          <footer className={`py-24 transition-all duration-500 
            ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-900'}`}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
                <div className="max-w-md">
                  <Link to="/" className="flex items-center gap-3 mb-8 group">
                    <div className="relative">
                      <ICONS.Logo theme={theme} />
                      <div className="absolute inset-0 bg-brand-500/10 blur-xl rounded-full" />
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-3">
                      <span className="text-3xl font-black tracking-[-0.02em] leading-none mb-1">
                        RNA<span className="text-brand-500">TECH</span>
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">
                        Reliance Network & Automations
                      </span>
                    </div>
                  </Link>
                  <p className="text-slate-500 font-medium leading-relaxed text-lg">
                    {lang === 'bn'
                      ? 'বাংলাদেশের শীর্ষস্থানীয় ডিজিটাল সলিউশন প্রোভাইডার। আমরা আপনার ব্যবসাকে নিয়ে যাই আগামীর দোরগোড়ায় আধুনিক প্রযুক্তি এবং নির্ভরযোগ্য সাপোর্টের মাধ্যমে।'
                      : 'Leading digital solution provider in Bangladesh. We take your business to the doorstep of tomorrow with modern tech and reliable support.'}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                  <div className="space-y-6">
                    <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-brand-500">Navigation</h4>
                    <div className="flex flex-col gap-4 text-sm font-bold text-slate-400">
                      <Link to="/" className="hover:text-brand-500 transition-colors">{t('nav_home')}</Link>
                      <Link to="/about" className="hover:text-brand-500 transition-colors">{t('nav_about')}</Link>
                      <Link to="/portfolio" className="hover:text-brand-500 transition-colors">{t('nav_portfolio')}</Link>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-brand-500">Solutions</h4>
                    <div className="flex flex-col gap-4 text-sm font-bold text-slate-400">
                      <Link to="/services" className="hover:text-brand-500 transition-colors">{t('nav_services')}</Link>
                      <Link to="/shop" className="hover:text-brand-500 transition-colors">{t('nav_shop')}</Link>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-brand-500">Contact</h4>
                    <div className="flex flex-col gap-4 text-sm font-bold text-slate-400">
                      <Link to="/contact" className="hover:text-brand-500 transition-colors">{t('nav_contact')}</Link>
                      <span className="break-all">hello@rnatech.com.bd</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-brand-500">Visit Us</h4>
                    <div className="flex gap-4">
                      <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all text-slate-400 hover:text-white">
                        <ICONS.Facebook />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all text-slate-400 hover:text-white">
                        <ICONS.YouTube />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all text-slate-400 hover:text-white">
                        <ICONS.LinkedIn />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all text-slate-400 hover:text-white">
                        <ICONS.WhatsApp />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-black uppercase tracking-widest text-slate-500">
                <p>{t('footer_copy')}</p>
                <div className="flex gap-10">
                  <a href="#" className="hover:text-brand-500 transition-colors">Privacy</a>
                  <a href="#" className="hover:text-brand-500 transition-colors">Legal</a>
                  <a href="#" className="hover:text-brand-500 transition-colors">Security</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
