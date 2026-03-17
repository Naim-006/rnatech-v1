import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppState, UserRole, CartItem } from './types';
import { ICONS, TRANSLATIONS } from './constants';
import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import ShopPage from './pages/ShopPage';
import DashboardPage from './pages/DashboardPage';
import CheckoutPage from './pages/CheckoutPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OrderTracking from './pages/OrderTracking';
import { supabase } from './supabase';
import UnifiedMessaging from './components/UnifiedMessaging';
import ThreeBackground from './components/ThreeBackground';
import SplashScreen from './components/SplashScreen';
import AnalyticsProvider from './components/AnalyticsProvider';
import AnnouncementBanner from './components/AnnouncementBanner';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const Header = () => {
  const { lang, setLang, theme, toggleTheme, t, state } = useApp();
  const { user, profile, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminPath) return null;

  const navLinks = [
    { to: '/', label: t('nav_home'), icon: <ICONS.Home className="w-4 h-4" /> },
    { to: '/services', label: t('nav_services'), icon: <ICONS.Zap className="w-4 h-4" /> },
    { to: '/shop', label: t('nav_shop'), icon: <ICONS.ShoppingCart className="w-4 h-4" /> },
    { to: '/portfolio', label: t('nav_portfolio'), icon: <ICONS.Globe className="w-4 h-4" /> },
    { to: '/about', label: t('nav_about'), icon: <ICONS.Shield className="w-4 h-4" /> },
    { to: '/contact', label: t('nav_contact'), icon: <ICONS.User className="w-4 h-4" /> },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out px-4 flex justify-center ${scrolled ? 'pt-4' : 'pt-6 md:pt-8'
        }`}
    >
      <div className={`max-w-7xl w-full flex items-center justify-between transition-all duration-700 ${scrolled
          ? `px-6 py-3 rounded-[2.5rem] ${theme === 'dark' ? 'bg-slate-950/70 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'bg-white/70 border-slate-200 shadow-[0_15px_30px_rgba(0,0,0,0.05)]'} backdrop-blur-2xl border`
          : 'px-2 py-0'
        }`}>
        <Link to="/" className="flex items-center gap-3 group px-4">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className={`absolute inset-0 bg-brand-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700`} />
            <div className="relative z-10 p-2 rounded-xl bg-gradient-to-br from-brand-600 to-cyan-600 shadow-lg group-hover:rotate-6 transition-transform">
              <ICONS.Logo theme="dark" className="w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-black tracking-tighter leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              RNA<span className="text-brand-500">TECH</span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-80"></span>
          </div>
        </Link>

        {/* Desktop Navigation - Smart Professional Pill */}
        <nav className={`hidden lg:flex items-center gap-1 p-1 rounded-2xl transition-all duration-500 ${scrolled ? 'bg-transparent' : theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'
          }`}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative group ${location.pathname === link.to
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                  : theme === 'dark'
                    ? 'text-slate-400 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.div layoutId="nav-active" className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-white rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 px-4">
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-xs transition-all ${theme === 'dark' ? 'bg-white/5 text-slate-300 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              title="Toggle Language"
            >
              {lang === 'en' ? 'BN' : 'EN'}
            </button>

            <button
              onClick={toggleTheme}
              className={`group w-10 h-10 flex items-center justify-center rounded-xl transition-all ${theme === 'dark' ? 'bg-white/5 text-yellow-400 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              title="Toggle Intelligence Theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ?
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><ICONS.Sun className="w-4 h-4" /></motion.div> :
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><ICONS.Moon className="w-4 h-4" /></motion.div>
                }
              </AnimatePresence>
            </button>

            <Link
              to="/checkout"
              className={`relative p-2.5 rounded-xl transition-all ${theme === 'dark' ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
            >
              <ICONS.ShoppingCart className="w-4 h-4" />
              {state.cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 bg-brand-500 text-[9px] font-black flex items-center justify-center px-1 rounded-full text-white ring-2 ring-slate-950 shadow-lg animate-pulse">
                  {state.cart.reduce((acc, c) => acc + c.quantity, 0)}
                </span>
              )}
            </Link>
          </div>

          <div className="w-px h-6 bg-white/10 hidden md:block mx-1" />

          {user ? (
            <Link
              to="/dashboard"
              className={`hidden sm:flex items-center gap-2 p-1.5 pr-5 rounded-2xl border transition-all group ${theme === 'dark' ? 'bg-brand-500/5 border-white/5 hover:border-brand-500/50' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-cyan-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg group-hover:rotate-3 group-hover:scale-110 transition-transform">
                {user.email[0].toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className={`text-[10px] font-black uppercase tracking-tight leading-none mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Dashboard</span>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest opacity-60">Verified Node</span>
              </div>
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex px-6 py-2.5 rounded-xl bg-brand-600 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-500 transition-all shadow-xl shadow-brand-600/20 active:scale-95"
            >
              Access Portal
            </Link>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`p-3 rounded-xl transition-all lg:hidden ${theme === 'dark' ? 'bg-white/5 text-brand-500 border border-white/10' : 'bg-slate-100 text-slate-900'}`}
          >
            <ICONS.Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu Redesign */}
      {createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[199]"
              />
              <motion.div
                initial={{ x: '100%', opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0.5 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className={`fixed inset-y-0 right-0 w-full max-w-sm z-[200] flex flex-col ${theme === 'dark' ? 'bg-slate-950 border-l border-white/10' : 'bg-white border-l border-slate-200'
                  } shadow-[0_0_100px_rgba(0,0,0,0.5)]`}
              >
                <div className="p-8 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-brand-600 to-cyan-600">
                      <ICONS.Logo theme="dark" className="w-5 h-5" />
                    </div>
                    <span className={`text-lg font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>RNA<span className="text-brand-500">TECH</span></span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-3 rounded-xl transition-all ${theme === 'dark' ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'}`}
                  >
                    <ICONS.X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-3 custom-scrollbar">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-5 rounded-2xl transition-all border ${location.pathname === link.to
                            ? 'bg-brand-500 border-brand-400 text-white shadow-xl shadow-brand-500/20'
                            : theme === 'dark'
                              ? 'bg-white/5 border-transparent text-slate-300 hover:border-white/10 hover:bg-white/10 hover:text-white'
                              : 'bg-slate-50 border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-950'
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${location.pathname === link.to ? 'bg-white/20' : theme === 'dark' ? 'bg-white/10' : 'bg-white border border-slate-200'}`}>
                            {link.icon}
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest">{link.label}</span>
                        </div>
                        <ICONS.ChevronRight className={`w-4 h-4 opacity-50 ${location.pathname === link.to ? 'text-white' : ''}`} />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className={`p-8 border-t border-white/5 space-y-6 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-white/5 text-yellow-400 border border-white/10' : 'bg-white text-slate-600 border border-slate-200 shadow-sm hover:bg-slate-50'}`}
                  >
                    {theme === 'dark' ? <><ICONS.Sun className="w-5 h-5" /> Switch to Light Mode</> : <><ICONS.Moon className="w-5 h-5" /> Switch to Dark Mode</>}
                  </button>

                  {/* Language Switcher */}
                  <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                    <button onClick={() => setLang('en')} className={`flex-1 py-4 rounded-xl text-[10px] font-black transition-all ${lang === 'en' ? 'bg-brand-500 text-white shadow-lg' : 'text-slate-500'}`}>ENGLISH</button>
                    <button onClick={() => setLang('bn')} className={`flex-1 py-4 rounded-xl text-[10px] font-black transition-all ${lang === 'bn' ? 'bg-brand-500 text-white shadow-lg' : 'text-slate-500'}`}>বাংলা</button>
                  </div>

                  {user ? (
                    <div className="space-y-3">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-brand-600 to-cyan-600 text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-brand-600/30"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">{user.email[0].toUpperCase()}</div>
                        Account Dashboard
                      </Link>
                      <button
                        onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                        className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border transition-all ${theme === 'dark' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white' : 'bg-white border-rose-100 text-rose-500 hover:bg-rose-50'
                          }`}
                      >
                        Terminate Session
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full py-5 rounded-3xl bg-brand-600 text-white font-black text-center text-xs uppercase tracking-[0.3em] shadow-2xl shadow-brand-600/30 active:scale-95 transition-all"
                    >
                      Authenticate Protocol
                    </Link>
                  )}
                  <p className="text-center text-[7px] font-black text-slate-600 tracking-[0.6em] uppercase">RNATECH ENTERPRISE OS v1.2</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.header>
  );
};

// Specialized Route Guards
const CustomerRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-950 font-black animate-pulse">
      <div className="text-center">
        <div className="text-brand-500 text-6xl mb-4">⚓</div>
        <div className="tracking-[0.3em] text-[10px] text-slate-500 uppercase">Verifying Customer Clearance</div>
      </div>
    </div>
  );

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  if (profile?.role !== UserRole.CUSTOMER) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// AdminRoute removed - moved to admin/AdminApp.tsx

const AppContent = () => {
  const { theme, lang, t } = useApp();
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const lastShow = localStorage.getItem('lastSplashShow');
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (!lastShow || (now - parseInt(lastShow)) > twentyFourHours) {
      setShowSplash(true);
      localStorage.setItem('lastSplashShow', now.toString());
    }
  }, []);

  return (
    <Router>
      <AnalyticsProvider>
        <AnimatePresence>
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        </AnimatePresence>
        <div className={`min-h-screen flex flex-col transition-all duration-700 
        ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          <ThreeBackground theme={theme} />
          <Header />
          <AnnouncementBanner />
          <UnifiedMessaging />
          <main className="flex-grow pt-20">
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Core Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/tracking" element={<OrderTracking />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Customer Segment */}
                <Route path="/dashboard" element={
                  <CustomerRoute>
                    <DashboardPage />
                  </CustomerRoute>
                } />

                {/* Secure Admin Segment - Optional: Keep a redirect or remove entirely if hosted separately */}
                <Route path="/admin/*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </main>

          <footer className={`py-16 transition-all duration-500 
          ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-900'}`}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-12">
                <div className="max-w-md">
                  <Link to="/" className="flex items-center gap-3 mb-8 group">
                    <div className="relative">
                      <ICONS.Logo theme={theme} />
                      <div className="absolute inset-0 bg-brand-500/10 blur-xl rounded-full" />
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-3">
                      <span className="text-3xl font-black tracking-[-0.02em] leading-none mb-1">
                        RNA<span className="text-brand-500">Tech</span>
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 leading-tight">
                        Reliance Network & <br className="hidden md:block" /> Automations
                      </span>
                    </div>
                  </Link>
                  <p className="text-slate-500 font-medium leading-relaxed text-lg mb-8">
                    {lang === 'bn'
                      ? 'বাংলাদেশের শীর্ষস্থানীয় ডিজিটাল সলিউশন প্রোভাইডার। আমরা আপনার ব্যবসাকে নিয়ে যাই আগামীর দোরগোড়ায় আধুনিক প্রযুক্তি এবং নির্ভরযোগ্য সাপোর্টের মাধ্যমে।'
                      : 'Leading digital solution provider in Bangladesh. We take your business to the doorstep of tomorrow with modern tech and reliable support.'}
                  </p>
                  <div className="flex items-center gap-4">
                    {[
                      { icon: ICONS.Facebook, name: 'Facebook', url: '#' },
                      { icon: ICONS.TwitterX, name: 'Twitter', url: '#' },
                      { icon: ICONS.Linkedin, name: 'LinkedIn', url: '#' },
                      { icon: ICONS.Instagram, name: 'Instagram', url: '#' }
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-500 hover:border-brand-500/50 hover:bg-brand-500/5 transition-all duration-300 group"
                        aria-label={social.name}
                      >
                        <social.icon />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
                  <div className="space-y-6">
                    <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-brand-500">{t('nav_navigation')}</h4>
                    <div className="flex flex-col gap-4 text-sm font-bold text-slate-400">
                      <Link to="/" className="hover:text-brand-500 transition-colors">{t('nav_home')}</Link>
                      <Link to="/about" className="hover:text-brand-500 transition-colors">{t('nav_about')}</Link>
                      <Link to="/portfolio" className="hover:text-brand-500 transition-colors">{t('nav_portfolio')}</Link>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-brand-500">{t('nav_solutions')}</h4>
                    <div className="flex flex-col gap-4 text-sm font-bold text-slate-400">
                      <Link to="/services" className="hover:text-brand-500 transition-colors">{t('nav_services')}</Link>
                      <Link to="/shop" className="hover:text-brand-500 transition-colors">{t('nav_shop')}</Link>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-brand-500">{t('nav_inquiry')}</h4>
                    <div className="flex flex-col gap-4 text-sm font-bold text-slate-400">
                      <Link to="/contact" className="hover:text-brand-500 transition-colors">{t('nav_contact')}</Link>
                      <span className="break-all">hello@rnatech.com.bd</span>
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
      </AnalyticsProvider>
    </Router>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </AppProvider>
  );
};

export default App;
