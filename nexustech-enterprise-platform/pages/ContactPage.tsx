
import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../constants';

const ContactPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tight">যোগাযোগ করুন</h1>
          <p className="text-lg text-slate-400 mb-12 leading-relaxed">আপনার যে কোনো প্রজেক্ট বা জিজ্ঞাসা থাকলে আমাদের মেসেজ দিন। আমাদের টিম ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে।</p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center group-hover:bg-brand-500 transition-all">
                <ICONS.User />
              </div>
              <div>
                <h4 className="font-bold text-lg">সরাসরি অফিস</h4>
                <p className="text-slate-400">গুলশান-১, ঢাকা-১২১২, বাংলাদেশ</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500 transition-all text-green-500 group-hover:text-white">
                <ICONS.WhatsApp />
              </div>
              <div>
                <h4 className="font-bold text-lg">হোয়াটসঅ্যাপ সাপোর্ট</h4>
                <p className="text-slate-400">+৮৮০ ১৭১২-৩৪৫৬৭৮</p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-brand-500 mb-6">Visit Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all text-slate-400 hover:text-white">
                  <ICONS.Facebook />
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all text-slate-400 hover:text-white">
                  <ICONS.YouTube />
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all text-slate-400 hover:text-white">
                  <ICONS.LinkedIn />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="glass p-10 rounded-[2.5rem] border-white/5"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">আপনার নাম</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500" placeholder="যেমন: রহিম আহমেদ" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">মোবাইল নম্বর</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500" placeholder="০১৭XXXXXXXX" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400">আপনার সার্ভিস প্রয়োজন</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
                <option>ওয়েবসাইট ডেভেলপমেন্ট</option>
                <option>পজ (POS) সিস্টেম</option>
                <option>মোবাইল অ্যাপ</option>
                <option>ইন্ডাস্ট্রিয়াল আইওটি</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400">বিস্তারিত মেসেজ</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500" placeholder="আপনার প্রয়োজনীয় তথ্য লিখুন..." />
            </div>
            <button className="w-full py-5 bg-brand-600 rounded-2xl font-black text-lg shadow-xl shadow-brand-600/30 hover:-translate-y-1 transition-all">
              মেসেজ পাঠান
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
