import React from 'react';
import { ExternalLink, ChevronRight, Sparkles, FolderCode, Layers } from 'lucide-react';
import { getProjectsData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectsSection({ onSelectProject, onOpenAllProjects }) {
  const { lang, t } = useLanguage();
  const projectsData = getProjectsData(lang);

  // Duplicar a lista de projetos para garantir um loop infinito contínuo e perfeito
  const marqueeProjects = [
    ...projectsData,
    ...projectsData,
    ...projectsData,
    ...projectsData
  ];

  return (
    <section id="projects" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0c140e] border border-[#00ff88]/30 mb-4">
            <FolderCode className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">
              {lang === 'en' ? 'Solutions Portfolio' : 'Portfólio de Soluções'}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {lang === 'en' ? 'Things I have ' : 'Coisas que eu '}
            <span className="text-gradient-green">
              {lang === 'en' ? 'built.' : 'construí.'}
            </span>
          </h2>

          <p className="text-slate-400 max-w-2xl font-light text-base mb-6">
            {lang === 'en'
              ? 'Hover over any project card to pause the marquee, or click below to view the full gallery.'
              : 'Passe o mouse sobre qualquer projeto para pausar o carrossel ou clique no botão abaixo para explorar a galeria completa.'}
          </p>

          {/* Button Ver Todos os Projetos */}
          <button
            onClick={onOpenAllProjects}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#059669] via-[#10b981] to-[#00ff88] text-black font-extrabold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-glow-sm hover:scale-105 transition-all group cursor-pointer"
          >
            <Layers className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
            <span>
              {t('projects.viewAll')} ({projectsData.length})
            </span>
            <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Infinite Looping Continuous Marquee Track */}
      <div className="relative w-full overflow-hidden py-4">
        
        {/* Left & Right Gradient Shadows for Seamless Fade */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[#040705] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-[#040705] to-transparent z-20 pointer-events-none" />

        <div className="animate-infinite-marquee flex items-center gap-6 px-4">
          {marqueeProjects.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              onClick={() => onSelectProject(project)}
              className="proj-card w-[320px] sm:w-[380px] shrink-0 glass-card rounded-2xl overflow-hidden border border-[#10b981]/25 hover:border-[#00ff88]/70 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040705] via-[#040705]/40 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-panel border border-[#00ff88]/40 text-[#00ff88] text-[11px] font-mono font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>{project.badge}</span>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#040705]/80 border border-white/10 text-[10px] font-mono text-slate-300">
                    {project.status}
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-5">
                  <span className="text-[11px] font-mono text-[#10b981] font-semibold uppercase tracking-wider block mb-1">
                    {project.category} • {project.date}
                  </span>

                  <h3 className="text-lg font-extrabold text-white mb-1.5 group-hover:text-[#00ff88] transition-colors truncate">
                    {project.name}
                  </h3>

                  <p className="text-slate-400 text-xs font-light line-clamp-2 leading-relaxed mb-4">
                    {project.shortDescription}
                  </p>

                  {/* 3 Main Tech Tags for Clean Architecture */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="proj-tag px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-slate-300 group-hover:border-[#10b981]/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="proj-tag px-2 py-1 rounded-md bg-white/[0.03] text-[10px] font-mono text-slate-400">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#00ff88] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  {t('projects.viewCase')} <ChevronRight className="w-4 h-4" />
                </span>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#00ff88]/10 text-[#00ff88] hover:bg-[#00ff88]/20 transition-colors"
                      title={t('projects.openProject')}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
