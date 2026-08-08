import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles, Info, X, CheckCircle2 } from 'lucide-react';
import { skillsData } from '../data/portfolioData';

export default function SkillsSection({ onOpenAllSkills }) {
  const [activeSkill, setActiveSkill] = useState(null);

  // Duplicar a lista de tecnologias para garantir um loop infinito contínuo e perfeito
  const marqueeSkills = [
    ...skillsData,
    ...skillsData,
    ...skillsData,
    ...skillsData
  ];

  return (
    <section id="skills" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0c140e] border border-[#00ff88]/30 mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">Conhecimentos & Ferramentas</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Ecossistema <span className="text-gradient-green">Tecnológico.</span>
          </h2>

          <p className="text-slate-400 max-w-2xl font-light text-base mb-8">
            Passe o mouse sobre qualquer tecnologia para pausar o carrossel e visualizar os detalhes completos.
          </p>

          {/* Button to open All Skills Modal */}
          <button
            onClick={onOpenAllSkills}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#08180e] border border-[#00ff88]/40 text-[#00ff88] hover:bg-[#00ff88] hover:text-black font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-glow-sm hover:scale-105"
          >
            <span>Ver Todas as Tecnologias ({skillsData.length})</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Infinite Looping Continuous Marquee Track */}
      <div className="relative w-full overflow-hidden py-4">
        
        {/* Left & Right Gradient Shadows for Seamless Fade */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[#040705] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-[#040705] to-transparent z-20 pointer-events-none" />

        <div className="animate-infinite-marquee flex items-center gap-6 px-4">
          {marqueeSkills.map((skill, index) => {
            const isSelected = activeSkill?.name === skill.name;
            return (
              <div
                key={`${skill.name}-${index}`}
                onClick={() => setActiveSkill(isSelected ? null : skill)}
                className={`w-[280px] sm:w-[320px] shrink-0 glass-card p-5 rounded-2xl cursor-pointer relative group border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#00ff88] shadow-glow-md bg-[#0c2e17]/60'
                    : 'border-[#10b981]/25 hover:border-[#00ff88]/70 hover:bg-[#06140d]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-wider px-2 py-0.5 rounded bg-[#0c2e17] border border-[#00ff88]/30">
                      {skill.category}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#00ff88] opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00ff88] transition-colors flex items-center justify-between">
                    <span>{skill.name}</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#00ff88] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  <p className="text-xs text-slate-300 font-light line-clamp-2 leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                {/* Card Footer Related Projects Pills */}
                <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1">
                  {skill.relatedProjects.slice(0, 2).map((proj, pIdx) => (
                    <span key={pIdx} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-300 truncate max-w-[130px]">
                      {proj}
                    </span>
                  ))}
                  {skill.relatedProjects.length > 2 && (
                    <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-400">
                      +{skill.relatedProjects.length - 2}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Skill Detail Modal Drawer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 p-6 rounded-2xl glass-card border border-[#00ff88]/50 shadow-glow-md relative bg-[#06100a]/90"
            >
              <button
                onClick={() => setActiveSkill(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#00ff88] hover:border-[#00ff88] transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#00ff88]/10 text-[#00ff88] text-xs font-mono uppercase mb-2">
                    <Info className="w-3.5 h-3.5" /> Detalhes da Tecnologia
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">{activeSkill.name}</h4>
                  <p className="text-slate-300 text-sm max-w-2xl">{activeSkill.description}</p>
                </div>

                <div className="shrink-0 bg-[#040705] p-4 rounded-xl border border-white/10">
                  <span className="text-xs font-mono text-slate-400 block mb-2 uppercase">Projetos Relacionados:</span>
                  <div className="flex flex-wrap gap-2">
                    {activeSkill.relatedProjects.map((proj, pIdx) => (
                      <span key={pIdx} className="px-3 py-1 rounded-lg bg-[#10b981]/20 border border-[#00ff88]/30 text-[#00ff88] text-xs font-semibold">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
