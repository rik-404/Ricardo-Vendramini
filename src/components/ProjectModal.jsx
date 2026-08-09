import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Lightbulb, Wrench, Trophy, ArrowDown, Lock, Cpu, ShieldCheck, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectModal({ project, onClose }) {
  const { lang, t } = useLanguage();

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl glass-card rounded-3xl border border-[#00ff88]/40 shadow-glow-lg overflow-hidden z-10 max-h-[90vh] flex flex-col bg-[#080d09]"
        >
          {/* Header Image */}
          <div className="relative h-64 sm:h-80 shrink-0">
            <img
              src={project.image}
              alt={project.name || project.title}
              className="w-full h-full object-cover filter contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d09] via-[#080d09]/60 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#00ff88] hover:border-[#00ff88] transition-all z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-mono text-[#00ff88] uppercase tracking-wider block mb-1">
                {project.category} • {lang === 'en' ? 'Case Study' : 'Estudo de Caso'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{project.title || project.name}</h2>
              <p className="text-slate-300 text-sm font-light mt-1">{project.subtitle}</p>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            
            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#040705]/80 border border-white/10">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                  {lang === 'en' ? 'Year' : 'Ano'}
                </span>
                <span className="text-sm font-bold text-white">{project.date}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Status</span>
                <span className="text-sm font-bold text-[#00ff88]">{project.status}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                  {lang === 'en' ? 'Category' : 'Categoria'}
                </span>
                <span className="text-sm font-bold text-white">{project.category}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                  {lang === 'en' ? 'Code Access' : 'Código'}
                </span>
                <span className="text-xs font-mono text-slate-300 flex items-center gap-1 mt-0.5">
                  <Lock className="w-3 h-3 text-amber-400" />
                  {lang === 'en' ? 'Private Repository' : 'Repositório Privado'}
                </span>
              </div>
            </div>

            {/* Case Methodology Timeline Flow */}
            <div className="space-y-6">
              
              {/* 1. O Problema */}
              <div className="p-5 rounded-2xl bg-[#0c140e] border border-red-500/20 relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'en' ? '1. The Problem' : '1. O Problema'}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed pl-10">
                  {project.problem}
                </p>
              </div>

              <div className="flex justify-center text-[#00ff88]">
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </div>

              {/* 2. A Ideia */}
              <div className="p-5 rounded-2xl bg-[#0c140e] border border-amber-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'en' ? '2. The Idea & Strategy' : '2. A Ideia'}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed pl-10">
                  {project.idea}
                </p>
              </div>

              <div className="flex justify-center text-[#00ff88]">
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </div>

              {/* 3. A Construção */}
              <div className="p-5 rounded-2xl bg-[#0c140e] border border-[#10b981]/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#10b981]/10 text-[#10b981]">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'en' ? '3. Architecture & Build' : '3. A Construção'}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed pl-10 mb-4">
                  {project.construction}
                </p>
                <div className="pl-10 flex flex-wrap gap-2">
                  {project.technologies.map((t, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-md bg-[#040705] border border-[#00ff88]/30 text-xs font-mono text-[#00ff88]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center text-[#00ff88]">
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </div>

              {/* 4. O Resultado */}
              <div className="p-5 rounded-2xl bg-[#0c2e17]/40 border border-[#00ff88]/50 shadow-glow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#00ff88]/20 text-[#00ff88]">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'en' ? '4. Final Impact & Result' : '4. O Resultado'}
                  </h3>
                </div>
                <p className="text-slate-200 text-sm font-medium leading-relaxed pl-10">
                  {project.result}
                </p>
              </div>

              {/* 5. Deep Dive Arquitetural & Banco de Dados (Para Projetos Principais como Elite House & C4T4T4U) */}
              {project.architectureDetails && (
                <div className="p-6 rounded-2xl bg-[#061009] border-2 border-[#00ff88]/40 space-y-6 shadow-2xl">
                  <div className="flex items-center gap-3 border-b border-[#00ff88]/20 pb-3">
                    <div className="p-2 rounded-lg bg-[#00ff88]/20 text-[#00ff88]">
                      <Cpu className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest block">
                        {lang === 'en' ? 'Technical Article & Deep Dive' : 'Artigo Técnico & Arquitetura'}
                      </span>
                      <h3 className="text-xl font-extrabold text-white">
                        {project.architectureDetails.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm italic bg-[#040805] p-3.5 rounded-xl border border-white/5 leading-relaxed">
                    "{project.architectureDetails.architectureSummary}"
                  </p>

                  {/* Desafios Arquiteturais Enfrentados */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#00ff88] flex items-center gap-2 font-mono">
                      <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
                      {lang === 'en' ? 'Architectural Challenges & Solutions' : 'Desafios Arquiteturais Enfrentados & Soluções'}
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {project.architectureDetails.challenges.map((c, i) => (
                        <div key={i} className="p-4 rounded-xl bg-[#09150d] border border-white/10 space-y-1">
                          <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#00ff88] inline-block shrink-0" />
                            {c.topic}
                          </h5>
                          <p className="text-xs text-slate-300 leading-relaxed pl-3">
                            {c.solution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decisões de Design de Banco de Dados */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#00f2fe] flex items-center gap-2 font-mono">
                      <Database className="w-4 h-4 text-[#00f2fe]" />
                      {lang === 'en' ? 'Database Design & RLS Security' : 'Design de Banco de Dados & Políticas RLS'}
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {project.architectureDetails.databaseDesign.map((d, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-[#071318] border border-[#00f2fe]/20 space-y-1">
                          <h5 className="text-xs font-bold text-[#00f2fe] font-mono">
                            {d.entity}
                          </h5>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {d.schemaDetails}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trade-offs & Decisões Técnicas */}
                  {project.architectureDetails.techDecisions && (
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-slate-400 font-mono mb-2 uppercase">
                        {lang === 'en' ? 'Core Technical Trade-offs' : 'Trade-offs & Decisões de Engenharia'}
                      </h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5 font-sans">
                        {project.architectureDetails.techDecisions.map((td, i) => (
                          <li key={i}>{td}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Action Links */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-[#059669] to-[#00ff88] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-glow-sm hover:scale-105 transition-transform"
                  >
                    <span>{lang === 'en' ? 'Launch Live App' : 'Acessar Aplicação'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl glass-panel text-slate-200 hover:text-white flex items-center justify-center gap-2 border border-white/20 hover:border-[#00ff88]"
                  >
                    <span className="text-xs font-mono">
                      {lang === 'en' ? 'Public Repository ↗' : 'Repositório Aberto ↗'}
                    </span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm font-semibold transition-all cursor-pointer"
              >
                {lang === 'en' ? 'Close Case' : 'Fechar Case'}
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
