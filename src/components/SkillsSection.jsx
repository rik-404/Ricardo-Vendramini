import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles, Info, X, CheckCircle2 } from 'lucide-react';
import { skillsCategories, skillsData } from '../data/portfolioData';

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeSkill, setActiveSkill] = useState(null);

  const filteredSkills = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0c140e] border border-[#00ff88]/30 mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">Conhecimentos & Ferramentas</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Ecossistema <span className="text-gradient-green">Tecnológico.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl font-light text-base">
            Tecnologias, frameworks, bancos de dados, cloud e ferramentas do dia a dia.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {skillsCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#059669] to-[#00ff88] text-black font-extrabold shadow-glow-sm scale-105'
                  : 'glass-panel text-slate-300 hover:text-white hover:border-[#00ff88]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Skills Cards Grid (Without Percentage Bars) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => {
            const isSelected = activeSkill?.name === skill.name;
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: index * 0.02 }}
                onClick={() => setActiveSkill(isSelected ? null : skill)}
                className={`glass-card p-5 rounded-2xl cursor-pointer relative group border transition-all duration-300 ${
                  isSelected
                    ? 'border-[#00ff88] shadow-glow-md bg-[#0c2e17]/60'
                    : 'border-[#10b981]/20 hover:border-[#00ff88]/50 hover:bg-[#06140d]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-wider px-2 py-0.5 rounded bg-[#0c2e17] border border-[#00ff88]/20">
                    {skill.category}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#00ff88] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00ff88] transition-colors flex items-center justify-between">
                  <span>{skill.name}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#00ff88] opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed mt-1">
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Skill Detail Modal Drawer */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 p-6 rounded-2xl glass-card border border-[#00ff88]/40 shadow-glow-md relative"
            >
              <button
                onClick={() => setActiveSkill(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
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
                      <span key={pIdx} className="px-3 py-1 rounded-lg bg-[#10b981]/20 text-[#00ff88] text-xs font-semibold">
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
