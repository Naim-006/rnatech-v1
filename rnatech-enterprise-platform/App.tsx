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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${theme === 'dark'
        ? 'bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/95 border-b-2 border-brand-500/20'
        : 'bg-gradient-to-b from-white via-white to-white/95 border-b-2 border-brand-500/10'
        } backdrop-blur-xl shadow-xl shadow-black/5`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-0 group">
          <div className="relative">
            <ICONS.Logo theme={theme} />
            <div className="absolute inset-0 bg-brand-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col justify-center border-l border-white/10 pl-3">
            <span className={`text-xl md:text-2xl font-black tracking-[-0.02em] leading-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              RNA<span className="text-brand-500">Tech</span>
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
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

        <div className="flex items-center gap-5">
          <button
            onClick={toggleTheme}
            className={`p-2 md:p-2.5 rounded-xl md:rounded-2xl transition-all ${theme === 'dark' ? 'bg-white/5 text-yellow-400 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {theme === 'dark' ? <ICONS.Sun /> : <ICONS.Moon />}
          </button>

          <div className={`hidden sm:flex p-1 rounded-2xl border transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
            <button onClick={() => setLang('en')} className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${lang === 'en' ? 'bg-brand-500 text-white' : 'text-slate-500'}`}>EN</button>
            <button onClick={() => setLang('bn')} className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${lang === 'bn' ? 'bg-brand-500 text-white' : 'text-slate-500'}`}>বাং</button>
          </div>

          <Link to="/checkout" className={`relative p-2 md:p-2.5 rounded-xl md:rounded-2xl transition-colors ${theme === 'dark' ? 'hover:bg-white/5 text-white' : 'hover:bg-slate-100 text-slate-900'}`}>
            <ICONS.ShoppingCart />
            {state.cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 text-[10px] font-black flex items-center justify-center rounded-full text-white ring-4 ring-slate-950">
                {state.cart.reduce((acc, c) => acc + c.quantity, 0)}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`lg:hidden p-2 rounded-xl transition-all ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-900'}`}
          >
            <ICONS.Menu />
          </button>
        </div>

        {/* Mobile Menu Overlay - Full Screen with High Z-Index - PORTAL */}
        {createPortal(
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={`fixed inset-0 z-[9999] flex flex-col ${theme === 'dark' ? 'bg-slate-950/98' : 'bg-white/98'
                  } backdrop-blur-xl font-sans`}
              >
                {/* Header with Gradient Background */}
                <div className="relative px-6 h-16 flex items-center justify-between bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-lg">
                      <ICONS.Logo theme="light" />
                    </div>
                    <span className="text-lg font-black text-white tracking-tight">
                      RNA<span className="text-cyan-200">TECH</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all"
                  >
                    <ICONS.X />
                  </button>
                </div>

                {/* Navigation with Card Design */}
                <div className="flex-1 flex flex-col justify-center px-6 py-2 overflow-y-auto">
                  <br></br> <nav className="grid grid-cols-3 gap-3">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.to}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          to={link.to}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`group relative overflow-hidden flex flex-col items-center justify-center p-6 rounded-2xl transition-all ${location.pathname === link.to
                            ? 'bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30'
                            : theme === 'dark'
                              ? 'bg-slate-800/50 hover:bg-slate-800 text-white border border-slate-700/50'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200'
                            }`}
                        >
                          <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${location.pathname === link.to ? 'text-white/70' : 'text-slate-500'
                            }`}>0{i + 1}</div>
                          <span className="text-base font-black uppercase tracking-tight text-center">{link.label}</span>
                          {location.pathname === link.to && (
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white animate-pulse" />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-12"
                  >
                    <Link
                      to={user ? (profile?.role === UserRole.ADMIN ? "/admin" : "/dashboard") : "/login"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full py-4 rounded-xl bg-brand-600 text-white font-bold text-center uppercase tracking-widest hover:bg-brand-500 transition-all shadow-lg shadow-brand-600/30"
                    >
                      {user ? t('btn_dashboard') : t('btn_login')}
                    </Link>
                  </motion.div>

                  {/* Decorative Wave Separator */}
                  <div className="relative mt-auto">

                  </div>

                  {/* Footer with Gradient Background */}
                  <div className={`relative px-6 py-1 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}`}>
                    {/* Language Switcher */}
                    <div className="mb-6">
                      <div className={`text-[10px] font-bold uppercase tracking-wider mb-3 text-center ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                        }`}>Select Language</div>
                      <div className="flex gap-2 p-1.5 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-700 shadow-inner">
                        <button
                          onClick={() => setLang('en')}
                          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${lang === 'en'
                            ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30 scale-105'
                            : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                          English
                        </button>
                        <button
                          onClick={() => setLang('bn')}
                          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${lang === 'bn'
                            ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30 scale-105'
                            : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                          বাংলা
                        </button>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-slate-700 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-300 to-transparent'}`} />
                      <div className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>Connect</div>
                      <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-slate-700 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-300 to-transparent'}`} />
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                      <a href="#" className="group relative overflow-hidden w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                        <ICONS.Facebook className="relative z-10" />
                      </a>
                      <a href="#" className="group relative overflow-hidden w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                        <ICONS.WhatsApp className="relative z-10" />
                      </a>
                    </div>

                    {/* Footer Text */}
                    <div className={`text-center mt-6 text-[10px] font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                      © 2026 RNATECH
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

        {user ? (
          <div className="hidden sm:flex items-center gap-3">
            {profile?.role === UserRole.ADMIN && (
              <Link 
                to="/admin" 
                className="px-6 py-3 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-500 text-[13px] font-black uppercase tracking-widest hover:bg-brand-500/20 transition-all"
              >
                Admin Portal
              </Link>
            )}
            <Link 
              to="/dashboard"
              className="flex items-center gap-2 p-1.5 pr-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[11px] font-black uppercase tracking-widest transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center text-[10px] text-white group-hover:scale-110 transition-transform">
                {user.email[0].toUpperCase()}
              </div>
              <span className="opacity-60">Profile</span>
            </Link>
            <button
              onClick={signOut}
              className="px-4 py-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[11px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/5 ml-1"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="hidden sm:block px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-[13px] font-black uppercase tracking-widest transition-all shadow-xl shadow-brand-600/30"
          >
            {t('btn_login')}
          </Link>
        )}
      </div>
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
