import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS } from '../constants';

const UnifiedMessaging = () => {
  const [isOpen, setIsOpen] = useState(false);

  const channels = [
    {
      name: 'WhatsApp',
      icon: <ICONS.WhatsApp />,
      color: 'bg-green-500',
      link: 'https://wa.me/8801969507606'
    },
    {
      name: 'Messenger',
      icon: <ICONS.Messenger />,
      color: 'bg-blue-600',
      link: 'https://m.me/1020004561188042'
    },
    {
      name: 'Telegram',
      icon: <ICONS.Telegram />,
      color: 'bg-sky-500',
      link: 'https://t.me/naim3301'
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col items-end gap-3 mb-2"
          >
            {channels.map((channel, index) => (
              <motion.a
                key={channel.name}
                href={channel.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ delay: index * 0.07 }}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl ${channel.color} text-white shadow-2xl hover:scale-105 transition-all`}
              >
                {channel.icon}
                <span className="text-xs font-bold uppercase tracking-wider">
                  {channel.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full ${isOpen ? 'bg-slate-800 rotate-45' : 'bg-brand-600'
          } flex items-center justify-center shadow-2xl transition-all relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>

        {isOpen ? (
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 6l12 12M6 18L18 6"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default UnifiedMessaging;