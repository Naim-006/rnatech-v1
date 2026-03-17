
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { ICONS } from '../constants';
import { UserRole } from '../types';
import { supabase } from '../supabase';

const LoginPage = () => {
    const { theme, t, lang } = useApp();
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { user } = await signIn(email, password);

            if (user) {
                let actualRole: UserRole | null = null;
                setLoading(true);

                try {
                    if (role === UserRole.ADMIN) {
                        const { data: adminData } = await supabase
                            .from('admins')
                            .select('id')
                            .eq('id', user.id)
                            .maybeSingle();
                        if (adminData) actualRole = UserRole.ADMIN;
                    } else {
                        const { data: profileData } = await supabase
                            .from('profiles')
                            .select('id')
                            .eq('id', user.id)
                            .maybeSingle();
                        if (profileData) actualRole = UserRole.CUSTOMER;
                    }

                    // Role mismatch protection
                    if (actualRole !== UserRole.CUSTOMER) {
                        await supabase.auth.signOut();
                        alert("CLEARANCE MISMATCH: This portal is for Customers only. Administrators should use the Secure Portal.");
                        return;
                    }

                    if (actualRole === UserRole.CUSTOMER) {
                        navigate('/dashboard');
                    } else {
                        // Edge case: Authenticated but no profile created by trigger yet
                        await supabase.auth.signOut();
                        alert("ACCOUNT INITIALIZATION PENDING: Your profile is being prepared. Please try logging in again in a few moments.");
                    }
                } catch (profileError: any) {
                    await supabase.auth.signOut();
                    throw new Error(`Profile Verification Failed: ${profileError.message}`);
                }
            }
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full ${theme === 'dark' ? 'bg-brand-600/20' : 'bg-brand-400/10'}`} />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full ${theme === 'dark' ? 'bg-cyan-600/20' : 'bg-cyan-400/10'}`} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`w-full max-w-lg p-10 rounded-[3rem] border relative overflow-hidden transition-all ${theme === 'dark' ? 'glass border-white/5 bg-white/5' : 'bg-white border-slate-200 shadow-2xl'}`}
            >
                <div className="text-center mb-10">
                    <div className="inline-block p-4 rounded-3xl bg-brand-500/10 mb-6">
                        <ICONS.Logo theme={theme} className="w-12 h-12" />
                    </div>
                    <h1 className="text-3xl font-black mb-3 tracking-tight">{t('auth_login_title')}</h1>
                    <p className="text-slate-500 font-medium leading-relaxed">{t('auth_login_subtitle')}</p>
                </div>

                {/* Simple Login Header */}
                <div className="mb-8 text-center">
                    <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand-500/20 shadow-lg shadow-brand-500/5">
                        <ICONS.Logo theme={theme} />
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t('auth_email')}</label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                placeholder="hello@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500">{t('auth_password')}</label>
                            <button type="button" className="text-xs font-black text-brand-500 hover:text-brand-400 uppercase tracking-widest">{t('auth_forgot')}</button>
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center gap-3 px-1">
                        <input type="checkbox" id="remember" className="w-5 h-5 rounded-lg border-2 border-brand-500 bg-transparent text-brand-500 focus:ring-brand-500 focus:ring-offset-0" />
                        <label htmlFor="remember" className="text-sm font-bold text-slate-500">{t('auth_remember')}</label>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-black text-lg transition-all shadow-2xl shadow-brand-600/30 mt-4"
                    >
                        {t('auth_btn_login')}
                    </motion.button>
                </form>

                {/* Admin context removed from public login */}

                <div className="mt-10 pt-10 border-t border-slate-200/10 text-center">
                    <p className="text-slate-500 font-medium tracking-tight">
                        {t('auth_no_account')}{' '}
                        <Link to="/signup" className="text-brand-500 font-black hover:text-brand-400">
                            {t('auth_btn_signup')}
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
