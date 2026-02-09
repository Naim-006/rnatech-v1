
import * as React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../App';
import { ICONS } from '../constants';

const AboutPage = () => {
  const { lang, t } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20 md:mb-32"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 md:mb-10 leading-[1.1] tracking-tight">
          {lang === 'bn' ? 'প্রযুক্তির মাধ্যমে' : 'Transforming Bangladesh'}<br />
          <span className="text-gradient animate-gradient">{lang === 'bn' ? 'বাংলাদেশকে বদলে দিচ্ছি' : 'With Technology'}</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          {lang === 'bn'
            ? 'নেক্সাসটেক একটি নেতৃস্থানীয় প্রযুক্তি প্রতিষ্ঠান যা বাংলাদেশের ব্যবসায়ী এবং শিল্প খাতের ডিজিটালাইজেশনে কাজ করছে।'
            : 'NexusTech is a leading technology company working on the digitalization of business and industrial sectors in Bangladesh.'}
        </p>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <div className="glass p-8 md:p-12 rounded-3xl md:rounded-[3.5rem] border-white/5 space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{lang === 'bn' ? 'আমাদের লক্ষ্য' : 'Our Mission'}</h2>
          <p className="text-slate-400 leading-relaxed text-base md:text-lg">
            {lang === 'bn'
              ? 'প্রতিটি ছোট এবং মাঝারি ব্যবসাকে স্মার্ট প্রযুক্তির আওতায় নিয়ে আসা যাতে তারা আরও দক্ষ এবং লাভজনক হতে পারে।'
              : 'To bring every small and medium business under smart technology so they can become more efficient and profitable.'}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 md:p-6 bg-white/5 rounded-2xl">
              <div className="text-brand-500 font-black text-xl md:text-2xl mb-1 md:mb-2">১০০%</div>
              <div className="text-[9px] md:text-[10px] uppercase font-bold text-slate-500">Local Focus</div>
            </div>
            <div className="p-4 md:p-6 bg-white/5 rounded-2xl">
              <div className="text-cyan-500 font-black text-xl md:text-2xl mb-1 md:mb-2">Global</div>
              <div className="text-[9px] md:text-[10px] uppercase font-bold text-slate-500">Quality Tech</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-brand-500/20 blur-[100px] -z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
            className="w-full rounded-3xl md:rounded-[3rem] shadow-2xl border border-white/10"
            alt="Team"
          />
        </div>
      </div>

      <section className="py-16 md:py-24 bg-slate-900/50 rounded-3xl md:rounded-[4rem] px-8 md:px-12 text-center border border-white/10">
        <h2 className="text-2xl md:text-3xl font-black mb-12 md:mb-16">{lang === 'bn' ? 'কেন আমাদের বেছে নেবেন?' : 'Why Choose Us?'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { title: lang === 'bn' ? 'অভিজ্ঞ টিম' : 'Expert Team', icon: <ICONS.User /> },
            { title: lang === 'bn' ? 'আধুনিক প্রযুক্তি' : 'Modern Tech', icon: <ICONS.Cpu /> },
            { title: lang === 'bn' ? 'সহজ ইন্টারফেস' : 'Easy UI', icon: <ICONS.Layout /> },
            { title: lang === 'bn' ? 'বাংলা সাপোর্ট' : 'Bangla Support', icon: <ICONS.WhatsApp /> }
          ].map((item, i) => (
            <div key={i} className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-500">
                {item.icon}
              </div>
              <h4 className="font-bold">{item.title}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
