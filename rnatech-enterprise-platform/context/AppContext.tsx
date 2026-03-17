import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, CartItem } from '../types';
import { TRANSLATIONS } from '../constants';
import { supabase } from '../supabase';

type AppContextType = {
  state: AppState;
  lang: 'bn' | 'en';
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setLang: (l: 'bn' | 'en') => void;
  t: (key: string) => string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  systemSettings: any;
  currency: string;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [systemSettings, setSystemSettings] = useState<any>(null);
  const [state, setState] = useState<AppState>({
    cart: (() => {
      try {
        const saved = localStorage.getItem('rnatech_cart');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    })(),
    isDark: theme === 'dark'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Safety timeout for system settings
        const { data, error } = await Promise.race([
          supabase.from('company_settings').select('*').eq('id', 'global').maybeSingle(),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Settings Timeout")), 5000))
        ]) as any;

        if (error) console.error("[App] Settings fetch error:", error);
        if (data) setSystemSettings(data);
      } catch (err) {
        console.warn("[App] Settings initialization timed out or failed. Using defaults.");
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    setState(prev => ({...prev, isDark: theme === 'dark'}));
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [theme]);

  // Cart Persistence
  useEffect(() => {
    localStorage.setItem('rnatech_cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;
  const currency = systemSettings?.currency_symbol || '৳';

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

  const updateQuantity = (id: string, delta: number) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.map(c => {
        if (c.product.id === id) {
          const newQty = Math.max(1, c.quantity + delta);
          return { ...c, quantity: newQty };
        }
        return c;
      })
    }));
  };

  const clearCart = () => {
    setState(prev => ({ ...prev, cart: [] }));
  };

  return (
    <AppContext.Provider value={{
      state, theme, toggleTheme,
      lang, setLang, t,
      isMobileMenuOpen, setIsMobileMenuOpen,
      addToCart, removeFromCart, updateQuantity, clearCart,
      systemSettings, currency
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useApp must be used within an AppProvider');
  return context;
};
