import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabase';
import { useApp } from '../context/AppContext';
import { ICONS } from '../constants';

const AnnouncementBanner = () => {
    const [announcement, setAnnouncement] = useState<any>(null);
    const { lang, theme } = useApp();

    useEffect(() => {
        const fetchAnnouncement = async () => {
            const { data } = await supabase
                .from('global_announcements')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();
            
            if (data) setAnnouncement(data);
        };
        fetchAnnouncement();
    }, []);

    if (!announcement) return null;

    return (
        <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className={`relative z-[60] py-2 px-4 bg-gradient-to-r ${announcement.bg_gradient} text-white shadow-xl`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-center">
                <ICONS.Zap className="w-4 h-4 animate-pulse hidden sm:block" />
                <p className="text-[11px] font-black uppercase tracking-[0.15em] leading-tight">
                    {lang === 'en' ? announcement.content_en : announcement.content_bn}
                </p>
                <button 
                    onClick={() => setAnnouncement(null)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                >
                    <ICONS.X className="w-3 h-3" />
                </button>
            </div>
        </motion.div>
    );
};

export default AnnouncementBanner;
