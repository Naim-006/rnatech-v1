
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { ICONS } from '../constants';

const SignupPage = () => {
    const { theme, t, lang } = useApp();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Mock signup logic
        console.log('Signing up:', formData);
        navigate('/login');
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-[-10%] right-[-10%] w-[50%] h-[50%] blur-[150px] rounded-full ${theme === 'dark' ? 'bg-brand-600/20' : 'bg-brand-400/10'}`} />
                <div className={`absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] blur-[150px] rounded-full ${theme === 'dark' ? 'bg-cyan-600/20' : 'bg-cyan-400/10'}`} />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-full max-w-xl p-10 rounded-[3rem] border relative overflow-hidden transition-all ${theme === 'dark' ? 'glass border-white/5 bg-white/5' : 'bg-white border-slate-200 shadow-2xl'}`}
            >
                <div className="text-center mb-10">
                    <div className="inline-block p-4 rounded-3xl bg-brand-500/10 mb-6">
                        <ICONS.Logo theme={theme} />
                    </div>
                    <h1 className="text-3xl font-black mb-3">{t('auth_signup_title')}</h1>
                    <p className="text-slate-500 font-medium">{t('auth_signup_subtitle')}</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t('auth_name')}</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t('auth_email')}</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`w-full border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                placeholder="hello@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t('auth_phone')}</label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={`w-full border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                placeholder="017XXXXXXXX"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t('auth_password')}</label>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className={`w-full border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Confirm Password</label>
                            <input
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className={`w-full border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-black text-lg transition-all shadow-2xl shadow-brand-600/30 mt-4"
                    >
                        {t('auth_btn_signup')}
                    </motion.button>
                </form>

                <div className="mt-10 pt-10 border-t border-slate-200/10 text-center">
                    <p className="text-slate-500 font-medium tracking-tight">
                        {t('auth_have_account')}{' '}
                        <Link to="/login" className="text-brand-500 font-black hover:text-brand-400">
                            {t('auth_btn_login')}
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
