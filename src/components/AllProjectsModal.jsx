import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Sparkles, ExternalLink, ChevronRight, Filter, FolderCode } from 'lucide-react';
import { projectsData } from '../data/portfolioData';

export default function AllProjectsModal({ isOpen, onClose, onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = ['Todas', 'Plataforma / SaaS', 'Portal Institucional', 'Open Source', 'E-Commerce'];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory =
      activeFilter === 'Todas' ||
      project.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
      project.badge.toLowerCase().includes(activeFilter.toLowerCase());

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      project.name.toLowerCase().includes(query) ||
      project.subtitle.toLowerCase().includes(query) ||
      project.shortDescription.toLowerCase().includes(query) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl glass-card rounded-3xl border border-[#00ff88]/40 shadow-glow-lg overflow-hidden z-10 max-h-[92vh] flex flex-col bg-[#040705]/95"
        >
          {/* Modal Header */}
          <div className="p-6 sm:p-8 border-b border-white/10 shrink-0 bg-[#06100a]/90 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#00ff88] hover:border-[#00ff88] transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <FolderCode className="w-4 h-4 text-[#00ff88]" />
              <span className="text-xs font-mono text-[#00ff88] uppercase tracking-widest">Galeria Completa de Soluções</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Todos os Projetos & <span className="text-gradient-green">Aplicações</span>
            </h2>
            <p className="text-slate-300 text-sm font-light mt-1 max-w-2xl">
              Explore o ecossistema completo de sistemas em produção, portais institucionais e projetos open source.
            </p>

            {/* Controls Bar: Search & Category Filter Tags */}
            <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pesquisar por nome, tecnologia ou palavra-chave..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00ff88] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Category Filter Tags */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                      activeFilter === cat
                        ? 'bg-[#00ff88] text-black font-bold shadow-glow-sm'
                        : 'glass-panel text-slate-300 hover:text-white hover:border-[#00ff88]/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Modal Grid Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <p className="text-lg font-semibold mb-2">Nenhum projeto encontrado</p>
                <p className="text-xs text-slate-500">Tente ajustar a busca ou o filtro de categoria selecionado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => {
                      onClose();
                      onSelectProject(project);
                    }}
                    className="glass-card rounded-2xl overflow-hidden border border-[#10b981]/25 hover:border-[#00ff88]/70 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Container */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040705] via-[#040705]/40 to-transparent" />

                        {/* Top Badge */}
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-panel border border-[#00ff88]/40 text-[#00ff88] text-[10px] font-mono font-semibold">
                          <Sparkles className="w-3 h-3" />
                          <span>{project.badge}</span>
                        </div>

                        {/* Status Indicator */}
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#040705]/80 border border-white/10 text-[10px] font-mono text-slate-300">
                          {project.status}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-5">
                        <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-wider block mb-1">
                          {project.category} • {project.date}
                        </span>

                        <h3 className="text-lg font-extrabold text-white mb-1 group-hover:text-[#00ff88] transition-colors truncate">
                          {project.name}
                        </h3>

                        <p className="text-slate-300 text-xs font-light line-clamp-2 leading-relaxed mb-4">
                          {project.shortDescription}
                        </p>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {project.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer CTA */}
                    <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#00ff88] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Ver Case Completo <ChevronRight className="w-4 h-4" />
                      </span>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg bg-[#00ff88]/10 text-[#00ff88] hover:bg-[#00ff88]/20 transition-colors"
                          title="Abrir Projeto"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-6 border-t border-white/10 shrink-0 bg-[#06100a]/90 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Exibindo <strong className="text-white">{filteredProjects.length}</strong> de {projectsData.length} projetos
            </span>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
            >
              Fechar Galeria
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
