
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ICONS } from '../constants';
import { useApp } from '../App';

const LandingPage = () => {
  const { t, lang, theme } = useApp();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute top-0 left-[10%] w-[600px] h-[600px] blur-[160px] opacity-20 ${theme === 'dark' ? 'bg-brand-500' : 'bg-brand-300'}`}
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, -100, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute bottom-0 right-[15%] w-[800px] h-[800px] blur-[200px] opacity-15 ${theme === 'dark' ? 'bg-cyan-500' : 'bg-cyan-300'}`}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-48 pb-40 px-6 max-w-7xl mx-auto">
        <motion.div variants={container} initial="hidden" animate="show" className="text-center">
          <motion.div
            variants={item}
            className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full border text-[11px] font-black mb-12 tracking-[0.2em] uppercase transition-all
              ${theme === 'dark' ? 'bg-brand-500/10 border-brand-500/20 text-brand-500' : 'bg-brand-50 border-brand-200 text-brand-600'}`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse"></span>
            {t('hero_badge')}
          </motion.div>

          <motion.h1
            variants={item}
            className={`text-4xl sm:text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight transition-colors select-none
              ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}
          >
            {t('hero_title_1')} <br />
            <span className="text-gradient animate-gradient">{t('hero_title_2')}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className={`text-lg md:text-2xl max-w-4xl mx-auto mb-20 leading-relaxed font-medium transition-colors opacity-80
              ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
          >
            {t('hero_desc')}
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <Link to="/services" className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-6 rounded-2xl md:rounded-[2.5rem] bg-brand-600 hover:bg-brand-500 text-white text-lg md:text-xl font-black transition-all shadow-2xl shadow-brand-600/40 hover:-translate-y-2">
              {t('btn_start')}
            </Link>
            <Link to="/shop" className={`w-full sm:w-auto px-10 md:px-16 py-5 md:py-6 rounded-2xl md:rounded-[2.5rem] border text-lg md:text-xl font-black transition-all backdrop-blur-md hover:-translate-y-1
              ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-900'}`}>
              {t('btn_shop')}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Ticker / Stats */}
      <section className={`py-12 md:py-20 border-y transition-colors relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900/40 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-center">
          {[
            { label: lang === 'bn' ? 'সফল প্রজেক্ট' : 'Projects Done', val: '৫০০+', color: 'text-brand-500' },
            { label: lang === 'bn' ? 'হ্যাপি ক্লায়েন্ট' : 'Happy Clients', val: '১২০+', color: 'text-cyan-500' },
            { label: lang === 'bn' ? 'এক্সপার্ট টিম' : 'Expert Team', val: '২৫+', color: 'text-purple-500' },
            { label: lang === 'bn' ? 'সার্ভিস এরিয়া' : 'Service Areas', val: '৬৪ জেলা', color: 'text-orange-500' }
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="smooth-animate">
              <div className={`text-4xl md:text-5xl font-black mb-2 tracking-tight ${stat.color}`}>{stat.val}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-48 max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className={`text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
            {t('section_solutions')}
          </h2>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">{t('solutions_desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: lang === 'bn' ? 'স্মার্ট শপ সলিউশন' : 'Smart Retail Hub',
              desc: lang === 'bn' ? 'পজ (POS) সিস্টেম এবং রিয়েল-টাইম ইনভেন্টরি ম্যানেজমেন্ট সলিউশন।' : 'AI-driven POS systems and real-time enterprise inventory management.',
              icon: <ICONS.ShoppingCart />,
              color: 'from-blue-600 to-cyan-400'
            },
            {
              title: lang === 'bn' ? 'ফ্যাক্টরি অটোমেশন' : 'Factory Core',
              desc: lang === 'bn' ? 'আইওটি (IoT) সেন্সর দিয়ে ফ্যাক্টরির মেশিন মনিটরিং ও কন্ট্রোল।' : 'Industrial IoT automation for garment manufacturing and heavy machinery.',
              icon: <ICONS.Cpu />,
              color: 'from-purple-600 to-pink-400'
            },
            {
              title: lang === 'bn' ? 'এন্টারপ্রাইজ আইটি' : 'ERP Next-Gen',
              desc: lang === 'bn' ? 'আধুনিক ইআরপি (ERP) এবং বিজনেস ম্যানেজমেন্ট সফটওয়্যার।' : 'Custom-built ERP and cloud management dashboards for scale.',
              icon: <ICONS.Layout />,
              color: 'from-orange-600 to-red-400'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -20 }}
              className={`p-10 md:p-16 rounded-[2.5rem] md:rounded-[5rem] border transition-all group flex flex-col h-full smooth-animate
                ${theme === 'dark' ? 'bg-slate-900/60 border-white/5 hover:border-brand-500/40' : 'bg-white border-slate-200 hover:shadow-3xl shadow-slate-200/50'}`}
            >
              <div className={`w-28 h-28 rounded-[2.5rem] mb-14 flex items-center justify-center bg-gradient-to-br ${item.color} text-white shadow-2xl transition-transform group-hover:scale-110`}>
                {item.icon}
              </div>
              <h3 className={`text-3xl font-black mb-6 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{item.title}</h3>
              <p className="text-slate-500 leading-relaxed text-lg mb-10 flex-grow">{item.desc}</p>
              <Link to="/services" className="flex items-center gap-3 text-brand-500 font-bold group-hover:gap-6 transition-all uppercase text-[10px] tracking-[0.2em]">
                {lang === 'bn' ? 'বিস্তারিত' : 'Learn More'} <ICONS.ChevronRight />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA section with high-impact design */}
      <section className="py-40 relative px-6">
        <div className={`max-w-7xl mx-auto rounded-[3rem] md:rounded-[8rem] overflow-hidden relative shadow-3xl smooth-animate
          ${theme === 'dark' ? 'bg-brand-600' : 'bg-brand-500'}`}>
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 animate-slow-spin opacity-50 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          </div>
          <div className="relative z-10 p-12 md:p-36 flex flex-col md:flex-row items-center gap-12 md:gap-32">
            <div className="flex-[1.5] text-center md:text-left">
              <h2 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8">{t('support_title')}</h2>
              <p className="text-lg md:text-2xl text-white/90 leading-relaxed mb-12 max-w-2xl font-medium">{t('support_desc')}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 mb-16 md:mb-20">
                {[
                  lang === 'bn' ? '২৪/৭ সরাসরি কল' : '24/7 Enterprise Support',
                  lang === 'bn' ? 'লোকাল ডাটা সেন্টার' : 'On-Shore Data Centers',
                  lang === 'bn' ? 'কাস্টম ডিজাইন' : 'Bespoke Engineering'
                ].map(tag => (
                  <span key={tag} className="px-6 md:px-10 py-3 md:py-5 rounded-full md:rounded-[2rem] bg-white/20 backdrop-blur-xl text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] shadow-lg">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to="/contact" className="inline-block px-12 md:px-20 py-5 md:py-8 bg-slate-950 text-white rounded-[2rem] md:rounded-[3rem] font-black text-xl md:text-3xl hover:bg-slate-900 transition-all shadow-3xl shadow-black/40 hover:-translate-y-2">
                {lang === 'bn' ? 'আজই শুরু করুন' : 'Start Partnership'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
