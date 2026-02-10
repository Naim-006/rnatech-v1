
import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../constants';
import { useApp } from '../App';

const ContactPage = () => {
  const { lang, t, theme } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const socialLinks = [
    { icon: <ICONS.Facebook />, label: 'Facebook', color: 'hover:bg-blue-600', href: 'https://facebook.com/RNATechBD' },
    { icon: <ICONS.Linkedin />, label: 'LinkedIn', color: 'hover:bg-blue-700', href: 'https://linkedin.com/company/RNATech' },
    { icon: <ICONS.TwitterX />, label: 'Twitter', color: 'hover:bg-slate-800', href: 'https://twitter.com/RNATech' },
    { icon: <ICONS.Instagram />, label: 'Instagram', color: 'hover:bg-pink-600', href: 'https://instagram.com/RNATech' },
  ];

  const contactMethods = [
    {
      icon: <ICONS.User />,
      title: t('contact_address_title'),
      val: t('contact_address_val'),
      sub: lang === 'bn' ? 'প্রধান অফিস' : 'Headquarters'
    },
    {
      icon: <ICONS.WhatsApp />,
      title: t('contact_whatsapp_title'),
      val: '+৮৮০ ১৭১২-৩৪৫৬৭৮',
      sub: lang === 'bn' ? 'সরাসরি চ্যাট' : 'Direct Chat'
    },
    {
      icon: <ICONS.Globe />,
      title: t('contact_email_sales'),
      val: 'sales@rnatech.com.bd',
      sub: 'sales@rnatech.com'
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 py-20 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className={`text-4xl md:text-6xl font-black mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{t('contact_title')}</h1>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('contact_desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Info & Socials */}
          <div className="lg:col-span-5 space-y-12">
            {/* Contact Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {contactMethods.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={`flex items-start gap-6 p-6 rounded-3xl border transition-all group ${theme === 'dark' ? 'glass border-white/5 bg-white/5 hover:border-brand-500/30' : 'bg-white border-slate-200 hover:border-brand-500 shadow-xl shadow-slate-200/40'}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-brand-500 transition-all duration-500 ${theme === 'dark' ? 'bg-white/5 group-hover:bg-brand-500 group-hover:text-white' : 'bg-brand-50 group-hover:bg-brand-600 group-hover:text-white'}`}>
                    <div className="scale-110">{item.icon}</div>
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">{item.sub}</div>
                    <h4 className={`font-bold text-xl mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                    <p className={`transition-colors ${theme === 'dark' ? 'text-slate-400 group-hover:text-white' : 'text-slate-600'}`}>{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Hub */}
            <div className={`p-8 rounded-[2.5rem] border transition-all ${theme === 'dark' ? 'glass border-white/5 bg-white/5' : 'bg-slate-50 border-slate-200 shadow-inner'}`}>
              <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-brand-500 rounded-full"></span>
                {t('contact_social_title')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 group ${link.color} ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}
                  >
                    <div className={`mb-2 scale-125 group-hover:scale-110 transition-transform ${theme === 'dark' ? '' : 'text-slate-700 group-hover:text-white'}`}>{link.icon}</div>
                    <span className={`text-[10px] font-black uppercase opacity-50 group-hover:opacity-100 ${theme === 'dark' ? '' : 'text-slate-900 group-hover:text-white'}`}>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className={`p-8 rounded-[2.5rem] border transition-all ${theme === 'dark' ? 'glass border-white/5 bg-brand-500/5' : 'bg-brand-50 border-brand-100/50 shadow-inner'}`}>
              <h3 className="text-xl font-black mb-6">{t('contact_hours_title')}</h3>
              <div className="space-y-4">
                <div className={`flex justify-between items-center pb-4 border-b ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
                  <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{t('contact_hours_val')}</span>
                  <span className="text-emerald-500 text-sm font-black">Open</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{t('contact_hours_off')}</span>
                  <span className="text-rose-500 text-sm font-black">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form & Map */}
          <div className="lg:col-span-7 space-y-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-10 rounded-[3rem] border relative overflow-hidden transition-all ${theme === 'dark' ? 'glass border-white/5 bg-white/5' : 'bg-white border-slate-200 shadow-2xl'}`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <ICONS.Zap />
              </div>
              <form className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t('contact_form_name')}</label>
                    <input className={`w-full border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-white/10' : 'bg-slate-50 border-slate-200'}`} placeholder={t('contact_form_name_placeholder')} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t('contact_form_mobile')}</label>
                    <input className={`w-full border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-white/10' : 'bg-slate-50 border-slate-200'}`} placeholder={t('contact_form_mobile_placeholder')} />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t('contact_form_service')}</label>
                  <select className={`w-full border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all appearance-none ${theme === 'dark' ? 'bg-slate-900/50 border-white/10' : 'bg-slate-50 border-slate-200 text-slate-900'}`}>
                    <option>{t('contact_form_service_option1')}</option>
                    <option>{t('contact_form_service_option2')}</option>
                    <option>{t('contact_form_service_option3')}</option>
                    <option>{t('contact_form_service_option4')}</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t('contact_form_message')}</label>
                  <textarea rows={5} className={`w-full border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-white/10' : 'bg-slate-50 border-slate-200'}`} placeholder={t('contact_form_message_placeholder')} />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-gradient-to-r from-brand-600 to-brand-400 rounded-2xl font-black text-lg shadow-2xl shadow-brand-600/20 hover:shadow-brand-600/40 transition-all flex items-center justify-center gap-3 text-white"
                >
                  {t('contact_form_btn')}
                  <ICONS.ChevronRight />
                </motion.button>
              </form>
            </motion.div>

            {/* Map Integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-4 rounded-[3rem] border h-[450px] overflow-hidden transition-all ${theme === 'dark' ? 'glass border-white/5 bg-white/10' : 'bg-slate-50 border-slate-200 shadow-inner'}`}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14604.434759367746!2d90.4125192!3d23.771143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70deb73%3A0x30c3339c33883c0e!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1715200000000!5m2!1sen!2sbd"
                className={`w-full h-full rounded-[2.5rem] border-0 transition-all ${theme === 'dark' ? 'grayscale invert opacity-80 contrast-125' : 'opacity-90'}`}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
