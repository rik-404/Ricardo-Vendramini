import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Sparkles, Cpu, CheckCircle2, Info } from 'lucide-react';
import { skillsCategories, getSkillsData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function AllSkillsModal({ isOpen, onClose }) {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkillDetail, setSelectedSkillDetail] = useState(null);

  if (!isOpen) return null;

  const skillsData = getSkillsData(lang);

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory =
      activeCategory === 'all' || skill.category === activeCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      skill.name.toLowerCase().includes(query) ||
      skill.description.toLowerCase().includes(query) ||
      skill.category.toLowerCase().includes(query) ||
      skill.relatedProjects.some((p) => p.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      <div className="chpw-theme-dark fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
              className="absolute top-6 right-6 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#00ff88] hover:border-[#00ff88] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-[#00ff88]" />
              <span className="text-xs font-mono text-[#00ff88] uppercase tracking-widest">
                {lang === 'en' ? 'Knowledge Catalog' : 'Catálogo de Conhecimentos'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {lang === 'en' ? 'All Technologies & ' : 'Todas as Tecnologias & '}
              <span className="text-gradient-green">
                {lang === 'en' ? 'Skills' : 'Conhecimentos'}
              </span>
            </h2>
            <p className="text-slate-300 text-sm font-light mt-1 max-w-2xl">
              {lang === 'en'
                ? 'Explore the full stack ecosystem of languages, frameworks, databases, cloud platforms, and production tools.'
                : 'Explore o ecossistema completo de linguagens, frameworks, bancos de dados, cloud e ferramentas utilizadas em produção.'}
            </p>

            {/* Controls Bar: Search & Category Filter Pills */}
            <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={lang === 'en' ? 'Search technology, tool, or project...' : 'Pesquisar tecnologia, ferramenta ou projeto...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00ff88] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                  >
                    {lang === 'en' ? 'Clear' : 'Limpar'}
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {skillsCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-[#00ff88] text-black font-bold shadow-glow-sm'
                        : 'glass-panel text-slate-300 hover:text-white hover:border-[#00ff88]/40'
                    }`}
                  >
                    {lang === 'en'
                      ? (cat.id === 'all' ? t('skills.categories.all') : t(`skills.categories.${cat.id}`))
                      : t(`skills.categories.${cat.id}`)}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Selected Skill Detail Sub-drawer */}
          <AnimatePresence>
            {selectedSkillDetail && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-6 py-4 bg-[#08180e] border-b border-[#00ff88]/40 shrink-0 relative"
              >
                <button
                  onClick={() => setSelectedSkillDetail(null)}
                  className="absolute top-4 right-6 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-5xl">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#00ff88] mb-1">
                      <Info className="w-3.5 h-3.5" /> {selectedSkillDetail.category.toUpperCase()}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">{selectedSkillDetail.name}</h4>
                    <p className="text-xs text-slate-300 max-w-xl">{selectedSkillDetail.description}</p>
                  </div>
                  <div className="shrink-0 bg-[#040705] p-3 rounded-xl border border-white/10">
                    <span className="text-[11px] font-mono text-slate-400 block mb-1.5 uppercase">{t('skills.relatedProjects')}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSkillDetail.relatedProjects.map((p, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded bg-[#10b981]/20 text-[#00ff88] text-[11px] font-semibold">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal Grid Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1">
            {filteredSkills.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <p className="text-lg font-semibold mb-2">{t('skills.noResultsTitle')}</p>
                <p className="text-xs text-slate-500">{t('skills.noResultsDesc')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSkills.map((skill, index) => {
                  const isSelected = selectedSkillDetail?.name === skill.name;
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedSkillDetail(isSelected ? null : skill)}
                      className={`glass-card p-5 rounded-2xl cursor-pointer relative group border transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#00ff88] shadow-glow-md bg-[#0c2e17]/70'
                          : 'border-[#10b981]/25 hover:border-[#00ff88]/70 hover:bg-[#06140d]/60'
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

                      <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                        {skill.relatedProjects.map((proj, pIdx) => (
                          <span key={pIdx} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-300">
                            {proj}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-6 border-t border-white/10 shrink-0 bg-[#06100a]/90 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              {t('skills.showingOf')} <strong className="text-white">{filteredSkills.length}</strong> {t('skills.of')} {skillsData.length} {t('skills.technologies')}
            </span>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
            >
              {t('skills.closeCatalog')}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
