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
      <div className="proj-modal fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
          className="relative w-full max-w-6xl glass-card rounded-3xl border border-white/20 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col bg-zinc-950/95"
        >
          {/* Modal Header */}
          <div className="p-6 sm:p-8 border-b border-white/10 shrink-0 bg-zinc-900/90 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:text-zinc-200 hover:border-white/40 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                {lang === 'en' ? 'Knowledge Catalog' : 'Catálogo de Conhecimentos'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {lang === 'en' ? 'All Technologies & ' : 'Todas as Tecnologias & '}
              <span className="text-gradient-green">
                {lang === 'en' ? 'Skills' : 'Conhecimentos'}
              </span>
            </h2>
            <p className="text-zinc-300 text-sm font-light mt-1 max-w-2xl">
              {lang === 'en'
                ? 'Explore the full stack ecosystem of languages, frameworks, databases, cloud platforms, and production tools.'
                : 'Explore o ecossistema completo de linguagens, frameworks, bancos de dados, cloud e ferramentas utilizadas em produção.'}
            </p>

            {/* Controls Bar: Search & Category Filter Pills */}
            <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={lang === 'en' ? 'Search technology, tool, or project...' : 'Pesquisar tecnologia, ferramenta ou projeto...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-white/50 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
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
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-white text-zinc-950 font-bold shadow-md'
                        : 'glass-panel text-zinc-300 hover:text-white hover:border-white/40'
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
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="px-6 py-4 bg-zinc-900/90 border-b border-white/15 shrink-0 relative"
              >
                <button
                  onClick={() => setSelectedSkillDetail(null)}
                  className="absolute top-4 right-6 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-5xl">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
                      <Info className="w-3.5 h-3.5" /> {selectedSkillDetail.category.toUpperCase()}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">{selectedSkillDetail.name}</h4>
                    <p className="text-xs text-zinc-300 max-w-xl">{selectedSkillDetail.description}</p>
                  </div>
                  <div className="shrink-0 bg-zinc-950 p-3 rounded-xl border border-white/10">
                    <span className="text-[11px] font-mono text-zinc-400 block mb-1.5 uppercase">{t('skills.relatedProjects')}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSkillDetail.relatedProjects.map((p, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded bg-white/10 text-zinc-200 text-[11px] font-semibold">
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
                      className={`glass-card p-5 rounded-2xl cursor-pointer relative group border transition-[background-color,border-color] duration-300 flex flex-col justify-between ${
                        isSelected
                          ? 'border-white bg-zinc-800/80 shadow-md'
                          : 'border-white/10 hover:border-white/30 hover:bg-zinc-900/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 border border-white/10">
                            {skill.category}
                          </span>
                          <CheckCircle2 className="w-4 h-4 text-zinc-300 opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors flex items-center justify-between">
                          <span>{skill.name}</span>
                          <Sparkles className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>

                        <p className="text-zinc-300 text-xs font-light line-clamp-2 leading-relaxed mb-4">
                          {skill.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                        {skill.relatedProjects.map((proj, pIdx) => (
                          <span key={pIdx} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-zinc-300">
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
          <div className="p-4 sm:p-6 border-t border-white/10 shrink-0 bg-zinc-900/90 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">
              {t('skills.showingOf')} <strong className="text-white">{filteredSkills.length}</strong> {t('skills.of')} {skillsData.length} {t('skills.technologies')}
            </span>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              {t('skills.closeCatalog')}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
