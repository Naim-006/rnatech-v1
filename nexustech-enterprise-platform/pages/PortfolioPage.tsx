
import * as React from 'react';
import { motion } from 'framer-motion';

const PortfolioPage = () => {
  const projects = [
    { title: 'Daka SuperShop POS', client: 'Dhaka Retail Group', industry: 'Retail', year: '2023' },
    { title: 'TextileERP Pro', client: 'Apex Textiles Ltd', industry: 'Industrial', year: '2024' },
    { title: 'BD HealthCare App', client: 'LifeCare Hospital', industry: 'Healthcare', year: '2023' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-12 md:mb-16"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 leading-tight tracking-tight">সফল প্রোজেক্টসমূহ</h1>
        <p className="text-lg md:text-xl font-medium text-slate-400">আমাদের ক্লায়েন্টদের সফলতার গল্প</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-white/5 aspect-[4/5]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10"></div>
            <img
              src={`https://picsum.photos/seed/${project.title}/800/1000`}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
            />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full">
              <span className="px-3 py-1 rounded-full bg-brand-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-3 md:mb-4 inline-block">
                {project.industry}
              </span>
              <h3 className="text-xl md:text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-slate-400 text-xs md:text-sm mb-4">Client: {project.client}</p>
              <div className="flex items-center justify-between text-[10px] md:text-xs font-bold text-slate-500 border-t border-white/10 pt-4">
                <span>Completed: {project.year}</span>
                <button className="text-brand-500 hover:text-white transition-colors">Case Study →</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
