import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Sparkles, BookOpen, ExternalLink, ShoppingCart, Tag } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function BookModal({ book, onClose }) {
  useEffect(() => {
    if (!book) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl glass-card rounded-3xl border border-[#00ff88]/50 shadow-glow-lg overflow-hidden z-10 p-5 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto bg-[#040705]/95"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-black/60 border border-white/20 text-slate-300 hover:text-[#00ff88] hover:border-[#00ff88] transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-center md:items-start">
            {/* Book Cover in Modal */}
            <div className="relative shrink-0 flex flex-col items-center">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-48 sm:w-56 lg:w-64 h-[310px] sm:h-[370px] object-cover rounded-2xl shadow-glow-md border border-[#10b981]/50 filter contrast-105"
              />
              <span className="mt-3 text-[11px] font-mono text-slate-400">
                Autor: <strong className="text-white">{personalInfo.name}</strong>
              </span>
            </div>

            <div className="space-y-4 text-left flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c2e17] border border-[#00ff88]/40 text-[#00ff88] text-xs font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#00ff88]" />
                  Ano: {book.year} • {book.status}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">{book.title}</h2>
                <p className="text-xs font-mono text-[#00f2fe] mt-0.5">{book.subtitle}</p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#00ff88]" /> Sinopse Oficial:
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed whitespace-pre-line bg-[#071410]/50 p-4 rounded-xl border border-white/5">
                  {book.synopsis}
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00ff88]" /> Gênero & Temas:
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                  {book.creationProcess}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {book.tags?.map((tag, tIdx) => (
                  <span key={tIdx} className="px-2.5 py-0.5 rounded-md bg-[#071910] border border-[#00ff88]/20 text-[#00ff88] text-[11px] font-mono">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  {book.amazonLink && (
                    <a
                      href={book.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs font-mono uppercase flex items-center gap-2 transition-transform hover:scale-105 shadow-glow-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Comprar na Amazon</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {book.uiclapLink && (
                    <a
                      href={book.uiclapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#059669] via-[#10b981] to-[#00ff88] text-black font-extrabold text-xs font-mono uppercase flex items-center gap-2 transition-transform hover:scale-105 shadow-glow-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Comprar na UICLAP</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs font-mono hover:bg-white/20 transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
