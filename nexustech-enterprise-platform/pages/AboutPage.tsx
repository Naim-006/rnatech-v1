
import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../App';
import { ICONS } from '../constants';

const AboutPage = () => {
  const { lang, t, theme } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const values = [
    { title: t('about_value_integrity'), icon: <ICONS.Shield />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: t('about_value_innovation'), icon: <ICONS.Zap />, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { title: t('about_value_quality'), icon: <ICONS.Cpu />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: t('about_value_global'), icon: <ICONS.Globe />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  const journey = [
    { year: '2020', title: t('about_timeline_2020'), desc: lang === 'bn' ? 'আমাদের প্রযুক্তি গবেষনা ও উন্নয়ন শুরু হয়।' : 'Focused on R&D for deep-tech industrial solutions.' },
    { year: '2022', title: t('about_timeline_2022'), desc: lang === 'bn' ? 'সফলভাবে আইওটি এবং কাস্টম সিস্টেম লঞ্চিং।' : 'First production rollout of smart IoT and custom ERPs.' },
    { year: '2024', title: t('about_timeline_2024'), desc: lang === 'bn' ? 'গ্লোবাল ব্র্যান্ডিং এবং পূর্ণাঙ্গ যাত্রা।' : 'Major pivot and rebranding to become RNATech.' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-hidden ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full animate-pulse ${theme === 'dark' ? 'bg-brand-600/20' : 'bg-brand-400/10'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full ${theme === 'dark' ? 'bg-cyan-600/20' : 'bg-cyan-400/10'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <motion.div variants={itemVariants} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold mb-8 transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/10 text-brand-400' : 'bg-brand-50 border-brand-100 text-brand-600'}`}>
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping"></span>
            {t('about_hero_badge')}
          </motion.div>
          <motion.h1 variants={itemVariants} className={`text-4xl sm:text-6xl md:text-7xl font-black mb-8 tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
            {t('about_title_1')}<br />
            <span className="text-gradient animate-gradient">{t('about_title_2')}</span>
          </motion.h1>
          <motion.p variants={itemVariants} className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('about_desc')}
          </motion.p>
        </motion.section>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`glass p-10 rounded-[3rem] border relative group overflow-hidden transition-all ${theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-slate-200 bg-slate-50 shadow-xl shadow-slate-200/50'}`}
          >
            <div className={`absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              <ICONS.Globe />
            </div>
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-brand-500 rounded-full"></span>
              {t('about_vision_title')}
            </h2>
            <p className={`text-lg leading-relaxed mb-10 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('about_vision_desc')}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className={`p-6 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                <div className="text-brand-500 font-bold text-3xl mb-1">100%</div>
                <div className="text-xs uppercase tracking-widest font-black text-slate-500">{t('about_stat_focus')}</div>
              </div>
              <div className={`p-6 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                <div className="text-cyan-500 font-bold text-3xl mb-1">Elite</div>
                <div className="text-xs uppercase tracking-widest font-black text-slate-500">{t('about_stat_quality')}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{t('about_mission_title')}</h2>
            <p className={`text-lg leading-relaxed transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('about_mission_desc')}
            </p>
            <div className="space-y-4">
              {[
                { t: lang === 'bn' ? 'উদ্ভাবনী সলিউশন' : 'Innovative Solutions', c: 'border-brand-500/30' },
                { t: lang === 'bn' ? 'সহজ টেক সাপোর্ট' : 'Seamless Tech Support', c: 'border-cyan-500/30' },
                { t: lang === 'bn' ? 'ডাটানির্ভর সিদ্ধান্ত' : 'Data-Driven Growth', c: 'border-purple-500/30' }
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border-l-4 ${item.c} flex items-center justify-between transition-all ${theme === 'dark' ? 'bg-white/5' : 'bg-white border shadow-sm border-slate-100'}`}>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.t}</span>
                  <ICONS.ChevronRight />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-black mb-4 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{t('about_why_title')}</h2>
            <div className="w-24 h-1 bg-brand-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className={`glass p-8 rounded-[2rem] border text-center group transition-all ${theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-slate-200 bg-white shadow-xl shadow-slate-200/40'}`}
              >
                <div className={`w-16 h-16 rounded-2xl ${val.bg} ${val.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  {val.icon}
                </div>
                <h4 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{val.title}</h4>
                <p className={`text-sm leading-relaxed transition-colors ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                  {lang === 'bn' ? 'আমরা প্রতিটি প্রজেক্টে সর্বোচ্চ মান বজায় রাখতে প্রতিশ্রুতিবদ্ধ।' : 'Unwavering commitment to excellence in every engineering sprint.'}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* The Journey */}
        <section className="mb-32">
          <div className={`glass p-12 rounded-[3.5rem] border overflow-hidden relative transition-all ${theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-slate-200 bg-slate-50/50 shadow-2xl'}`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[100px] -z-10"></div>
            <h2 className={`text-3xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{t('about_timeline_title')}</h2>

            <div className={`relative border-l-2 ml-6 md:ml-12 space-y-16 ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
              {journey.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-12"
                >
                  <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-brand-500 border-4 ${theme === 'dark' ? 'border-slate-950' : 'border-white'}`}></div>
                  <div className="text-brand-500 font-black text-2xl mb-2">{step.year}</div>
                  <h4 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{step.title}</h4>
                  <p className={`max-w-2xl leading-relaxed transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="text-center">
          <h2 className={`text-3xl font-black mb-12 ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{t('about_stack_title')}</h2>
          <div className={`flex flex-wrap justify-center gap-8 md:gap-16 transition-all ${theme === 'dark' ? 'opacity-50 grayscale hover:grayscale-0' : 'opacity-70'}`}>
            {['React', 'Next.js', 'Typescript', 'Node.js', 'Python', 'Tailwind', 'PostgreSQL', 'AWS'].map((tech) => (
              <div key={tech} className={`text-xl font-black tracking-tighter hover:text-brand-500 cursor-default transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {tech}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
