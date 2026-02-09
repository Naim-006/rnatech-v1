
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3500); // Animation duration
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 overflow-hidden"
        >
            {/* Background Glow Effect */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0.15 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute w-[500px] h-[500px] bg-brand-500 rounded-full blur-[120px]"
            />

            <div className="relative flex flex-col items-center">
                {/* Logo Animation */}
                <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.2
                    }}
                    className="relative mb-8"
                >
                    <img
                        src="/logo-transparent.png"
                        alt="NexusTech"
                        className="w-32 h-32 object-contain"
                    />

                    {/* Animated Ring around logo */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute inset-0 border-2 border-brand-500/30 rounded-full"
                        style={{ margin: '-10px' }}
                    />
                </motion.div>

                {/* Text Animation */}
                <div className="overflow-hidden flex flex-col items-center">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        className="text-5xl font-black tracking-[-0.04em] text-white mb-3"
                    >
                        RNA<span className="text-brand-500">TECH</span>
                    </motion.h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "200px" }}
                        transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
                        className="h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent mb-4"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.6 }}
                        className="text-[12px] uppercase tracking-[0.5em] text-slate-400 font-bold"
                    >
                        Reliance Network & Automations
                    </motion.p>
                </div>
            </div>

            {/* Loading Progress Bar at bottom */}
            <motion.div
                className="absolute bottom-0 left-0 h-1 bg-brand-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
            />
        </motion.div>
    );
};

export default SplashScreen;
