import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, ExternalLink, Eye, X, ShieldCheck, Sparkles, ChevronRight, Layers } from 'lucide-react';
import { getCertificatesData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function CertificatesSection({ onOpenAllCertificates }) {
  const { lang, t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState(null);
  const certificatesData = getCertificatesData(lang);

  // Duplicar a lista de certificados para garantir um loop infinito contínuo e perfeito no carrossel
  const marqueeCertificates = [
    ...certificatesData,
    ...certificatesData,
    ...certificatesData,
    ...certificatesData
  ];

  // Close modal on ESC key
  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  return (
    <section id="certificates" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#071410] border border-[#00ff88]/30 mb-4">
            <Award className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">
              {lang === 'en' ? 'Certifications & Credentials' : 'Especializações & Qualificações'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {lang === 'en' ? 'Certifications ' : 'Certificações '}
            <span className="text-gradient-green">
              {lang === 'en' ? '& Credentials' : '& Credenciais'}
            </span>
          </h2>

          <p className="text-slate-400 max-w-2xl font-light text-base mb-6">
            {lang === 'en'
              ? 'Continuous education, diplomas, and official certifications.'
              : 'Formação continuada, diplomas e credenciais profissionais reconhecidas.'}
          </p>

          {/* Button to open All Certificates Modal */}
          <button
            onClick={onOpenAllCertificates}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#059669] via-[#10b981] to-[#00ff88] text-black font-extrabold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-glow-sm hover:scale-105 transition-all group"
          >
            <Layers className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
            <span>
              {t('certificates.viewAll')} ({certificatesData.length})
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
          {marqueeCertificates.map((cert, index) => (
            <div
              key={`${cert.id}-${index}`}
              onClick={() => setSelectedCert(cert)}
              className="w-[320px] sm:w-[380px] shrink-0 glass-card rounded-3xl border border-[#10b981]/25 hover:border-[#00ff88]/70 transition-all duration-500 overflow-hidden flex flex-col group relative bg-[#040705]/80 hover:shadow-glow-sm cursor-pointer justify-between"
            >
              <div>
                {/* Image Container / Preview */}
                <div className="relative h-52 overflow-hidden bg-[#0a120c]">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040705] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Hover Action Overlay */}
                  <div className="absolute inset-0 bg-[#00ff88]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-4 py-2 rounded-full bg-[#040705]/90 border border-[#00ff88] text-[#00ff88] text-xs font-mono font-semibold flex items-center gap-2 shadow-lg">
                      <Eye className="w-4 h-4" /> {t('certificates.zoom')}
                    </span>
                  </div>

                  {/* Badge Overlay */}
                  <div className="absolute top-3 left-3">
                    <span className="cert-official-badge px-3 py-1 rounded-full bg-[#040705]/90 backdrop-blur-md border border-[#00ff88]/40 text-[#00ff88] text-[11px] font-mono flex items-center gap-1.5 shadow-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
                      {cert.badge}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 text-[11px] font-mono">
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#00f2fe] uppercase tracking-wider mb-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{cert.category}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#00ff88] transition-colors mb-1 truncate">
                      {cert.title}
                    </h3>

                    <p className="text-xs font-medium text-slate-400 mb-2 truncate">
                      {cert.subtitle}
                    </p>

                    <p className="text-slate-300 text-xs font-light line-clamp-3 leading-relaxed mb-4">
                      {cert.description}
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.skills?.slice(0, 3).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-[#071910] border border-[#00ff88]/20 text-slate-300 text-[10px] font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills?.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-400">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCert(cert);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#092415] hover:bg-[#00ff88] text-[#00ff88] hover:text-black font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 border border-[#00ff88]/30 flex items-center justify-center gap-2 group/btn shadow-glow-sm"
                    >
                      <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      <span>{t('certificates.view')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Modal for Full Resolution Certificate rendered via Portal at Root Level */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedCert && (
            <div className="cert-modal fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 lg:p-10">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl max-h-[90vh] bg-[#040705] border border-[#00ff88]/40 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
              >
                {/* Modal Header */}
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
                      className="p-2.5 rounded-full bg-white/5 hover:bg-[#00ff88]/20 border border-white/10 hover:border-[#00ff88]/40 text-slate-300 hover:text-[#00ff88] transition-all"
                      title={t('certificates.openOriginal')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setSelectedCert(null)}
                      className="p-2.5 rounded-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-slate-300 hover:text-red-400 transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Certificate Image Body */}
                <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[#020503] flex items-center justify-center">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-xl border border-[#00ff88]/20 shadow-2xl"
                  />
                </div>

                {/* Modal Footer */}
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
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
