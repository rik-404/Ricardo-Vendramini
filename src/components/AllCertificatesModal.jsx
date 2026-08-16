import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Award, Eye, ShieldCheck, Sparkles, ExternalLink, CheckCircle2 } from 'lucide-react';
import { getCertificatesData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function AllCertificatesModal({ isOpen, onClose }) {
  const { lang, t } = useLanguage();
  const certificates = getCertificatesData(lang);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);

  // Close modal on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedCert) {
          setSelectedCert(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedCert, onClose]);

  if (!isOpen) return null;

  const categories = ['all', 'web', 'frontend', 'networks', 'soft', 'data', 'ai'];
  const categoryLabel = (id) => t(`certificates.categories.${id}`);
  const filterKeywords = {
    web: ['web design', 'ui/ux'],
    frontend: ['front-end'],
    networks: ['redes', 'network', 'infraestrutura'],
    soft: ['soft skills', 'liderança', 'comunicação'],
    data: ['dados', 'excel', 'data analysis'],
    ai: ['inteligência artificial', 'ai'],
  };

  const filteredCertificates = certificates.filter((cert) => {
    const searchText =
      `${cert.title} ${cert.subtitle} ${cert.category} ${cert.description} ${cert.skills.join(' ')}`.toLowerCase();
    const matchesCategory =
      activeFilter === 'all' || filterKeywords[activeFilter].some((kw) => searchText.includes(kw));

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || searchText.includes(query);

    return matchesCategory && matchesSearch;
  });

  const modalContent = (
    <AnimatePresence>
      <div className="cert-modal fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
              className="absolute top-6 right-6 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#00ff88] hover:border-[#00ff88] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-[#00ff88]" />
              <span className="text-xs font-mono text-[#00ff88] uppercase tracking-widest">{t('certificates.allGallery')}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {t('certificates.allTitle')}<span className="text-gradient-green">{t('certificates.allAccent')}</span>
            </h2>
            <p className="text-slate-300 text-sm font-light mt-1 max-w-2xl">
              {t('certificates.allSubtitle')}
            </p>

            {/* Controls Bar: Search & Category Filter Tags */}
            <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t('certificates.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00ff88] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                  >
                    {t('certificates.clear')}
                  </button>
                )}
              </div>

              {/* Category Filter Tags */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors ${
                      activeFilter === cat
                        ? 'bg-[#00ff88] text-black font-bold shadow-glow-sm'
                        : 'bg-black/60 text-slate-300 hover:text-white border border-white/10 hover:border-[#00ff88]/50'
                    }`}
                  >
                    {categoryLabel(cat)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Grid Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1">
            {filteredCertificates.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-400 font-mono text-sm">{t('certificates.noResults')}</p>
                <button
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#00ff88]/20 border border-[#00ff88]/40 text-[#00ff88] text-xs font-mono hover:bg-[#00ff88] hover:text-black transition-colors"
                >
                  {t('certificates.resetFilters')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertificates.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    className="glass-card rounded-2xl overflow-hidden border border-[#10b981]/25 hover:border-[#00ff88]/70 group cursor-pointer flex flex-col justify-between bg-[#040705]"
                  >
                    <div>
                      {/* Image Container */}
                      <div className="relative h-48 overflow-hidden bg-[#0a120c]">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 filter contrast-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040705] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

                        {/* Top Badge */}
                        <div className="cert-official-badge absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-panel border border-[#00ff88]/40 text-[#00ff88] text-[11px] font-mono font-semibold">
                          <ShieldCheck className="w-3 h-3 text-[#00ff88]" />
                          <span>{cert.badge}</span>
                        </div>

                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#040705]/80 border border-white/10 text-[10px] font-mono text-slate-300">
                          {cert.date}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-5">
                        <span className="text-[11px] font-mono text-[#00f2fe] uppercase tracking-wider block mb-1">
                          {cert.category}
                        </span>

                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00ff88] transition-colors truncate">
                          {cert.title}
                        </h3>

                        <p className="text-xs font-medium text-slate-400 mb-2 truncate">
                          {cert.subtitle}
                        </p>

                        <p className="text-slate-300 text-xs font-light line-clamp-3 leading-relaxed mb-4">
                          {cert.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {cert.skills.slice(0, 3).map((sk, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-[#071910] border border-[#00ff88]/20 text-slate-300 text-[10px] font-mono">
                              {sk}
                            </span>
                          ))}
                          {cert.skills.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-400">
                              +{cert.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCert(cert);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-[#092415] hover:bg-[#00ff88] text-[#00ff88] hover:text-black font-mono text-xs font-semibold tracking-wider uppercase transition-colors border border-[#00ff88]/30 flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{t('certificates.view')}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Nested Lightbox for Selected Certificate Preview */}
        <AnimatePresence>
          {selectedCert && (
            <div className="cert-modal fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 lg:p-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl max-h-[90vh] bg-[#040705] border border-[#00ff88]/40 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
              >
                <div className="p-4 sm:p-6 border-b border-[#00ff88]/20 flex items-center justify-between bg-[#071410]/90">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30">
                      <Award className="w-5 h-5 text-[#00ff88]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {selectedCert.title}
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00ff88]/20 text-[#00ff88] font-mono border border-[#00ff88]/30">
                          {selectedCert.badge}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">{selectedCert.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={selectedCert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-white/5 hover:bg-[#00ff88]/20 border border-white/10 hover:border-[#00ff88]/40 text-slate-300 hover:text-[#00ff88] transition-colors"
                      title={t('certificates.openOriginal')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setSelectedCert(null)}
                      className="p-2.5 rounded-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-slate-300 hover:text-red-400 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[#020503] flex items-center justify-center">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-xl border border-[#00ff88]/20 shadow-2xl"
                  />
                </div>

                <div className="p-4 sm:p-5 border-t border-[#00ff88]/20 bg-[#071410]/90 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
                    <span>{t('certificates.issuer')} {selectedCert.issuer} ({selectedCert.date})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills?.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#0c2e17] text-[#00ff88] text-[10px]">
                        #{sk}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
