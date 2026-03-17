import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabase';
import { useApp } from '../context/AppContext';
import { ICONS } from '../constants';

const PortfolioPage = () => {
  const { t, theme, lang } = useApp();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
      if (data) setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="relative">
            <div className="w-20 h-20 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-cyan-500/20 border-b-cyan-500 rounded-full animate-spin-slow"></div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="relative min-h-screen pb-24">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] opacity-10 rounded-full ${theme === 'dark' ? 'bg-brand-500' : 'bg-brand-300'}`} />
          <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] blur-[150px] opacity-10 rounded-full ${theme === 'dark' ? 'bg-cyan-500' : 'bg-cyan-300'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black mb-6 tracking-widest uppercase
            ${theme === 'dark' ? 'bg-brand-500/10 border-brand-500/20 text-brand-500' : 'bg-brand-50 border-brand-100 text-brand-600'}`}>
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            Showcase
          </div>
          <h1 className={`fluid-text-title font-black mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('portfolio_title')}</h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">{t('portfolio_desc')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedProject(project)}
              className={`group cursor-pointer premium-card overflow-hidden !p-0 border-transparent hover:!border-brand-500/40 hover:shadow-2xl transition-all duration-500
                ${theme === 'dark' ? 'hover:bg-brand-500/5' : 'hover:bg-slate-50'}`}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={project.images?.[0] || `https://placehold.co/800x600/1e293b/94a3b8?text=${project.title}`}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/800x600/1e293b/94a3b8?text=${project.title}`; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-black text-white uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className={`text-xl md:text-2xl font-black mb-3 group-hover:text-brand-500 transition-colors tracking-tight uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {project.title}
                </h3>
                <p className="text-slate-500 text-[10px] md:text-xs font-bold mb-6 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech_stack?.slice(0, 3).map((tech: string, idx: number) => (
                    <span key={idx} className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tighter border 
                      ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                      {tech}
                    </span>
                  ))}
                  {project.tech_stack?.length > 3 && (
                    <span className="text-[8px] font-black text-slate-500 self-center">+{project.tech_stack.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-5 md:pt-6 border-t border-white/5">
                   <div className="flex flex-col">
                      <span className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest">{t('portfolio_client')}</span>
                      <span className="text-[10px] md:text-xs font-black text-brand-500">{project.client_name || 'Global Enterprise'}</span>
                   </div>
                   <ICONS.ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-brand-500 group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal - Responsive Refined */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-slate-950/60 backdrop-blur-2xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className={`relative responsive-modal-container !p-0 overflow-hidden border shadow-3xl
                ${theme === 'dark' ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-rose-500 transition-all border border-white/10"
              >
                <ICONS.X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Media Gallery */}
                <div className="p-6 md:p-12 space-y-4 md:space-y-6 border-b lg:border-b-0 lg:border-r border-white/5 bg-slate-950/20">
                   <div className="aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                      <img 
                        src={selectedProject.images?.[0] || 'https://placehold.co/1200x800'} 
                        className="w-full h-full object-cover" 
                        alt={selectedProject.title}
                      />
                   </div>
                   <div className="grid grid-cols-3 gap-3 md:gap-6">
                      {selectedProject.images?.slice(1, 4).map((img: string, idx: number) => (
                        <div key={idx} className="aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-white/5 hover:border-brand-500/50 transition-all cursor-pointer">
                           <img src={img} className="w-full h-full object-cover" />
                        </div>
                      ))}
                   </div>
                </div>

                {/* Content Details */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                   <div className="mb-8 md:mb-12">
                      <span className="px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-[9px] font-black text-brand-500 uppercase tracking-[0.2em] mb-4 md:mb-6 inline-block w-fit">
                        {selectedProject.category}
                      </span>
                      <h2 className={`text-2xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 tracking-tighter uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {selectedProject.title}
                      </h2>
                      <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-medium">
                        {selectedProject.description}
                      </p>
                   </div>

                   <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
                      <div className="space-y-1 md:space-y-2">
                         <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{t('portfolio_client')}</h4>
                         <p className={`font-black text-sm md:text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{selectedProject.client_name || 'Confidential'}</p>
                      </div>
                      <div className="space-y-1 md:space-y-2">
                         <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{t('portfolio_completed')}</h4>
                         <p className={`font-black text-sm md:text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                           {selectedProject.completion_date ? new Date(selectedProject.completion_date).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { year: 'numeric', month: 'long' }) : '2024'}
                         </p>
                      </div>
                   </div>

                   <div className="space-y-3 md:space-y-4 mb-10 md:mb-12">
                      <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{t('portfolio_tech_stack')}</h4>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                         {selectedProject.tech_stack?.map((tech: string, idx: number) => (
                            <span key={idx} className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-[9px] md:text-xs font-black border transition-colors
                              ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                               {tech}
                            </span>
                         ))}
                      </div>
                   </div>

                   {selectedProject.project_url && (
                     <a 
                       href={selectedProject.project_url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="w-full py-4 md:py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl flex items-center justify-center gap-3 md:gap-4 text-xs md:text-sm font-black uppercase tracking-widest transition-all shadow-2xl shadow-brand-600/30 hover:-translate-y-1"
                     >
                       Launch Live Project <ICONS.Globe className="w-4 h-4 md:w-5 md:h-5" />
                     </a>
                   )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;
