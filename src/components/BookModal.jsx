import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Sparkles, BookOpen, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function BookModal({ book, onClose }) {
  if (!book) return null;

  return (
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

        {/* Modal Box - Wider max-w-4xl and optimized space for zero scrolling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl glass-card rounded-3xl border border-[#00ff88]/50 shadow-glow-lg overflow-hidden z-10 p-5 sm:p-7 space-y-4 max-h-[95vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-white/20 text-slate-300 hover:text-[#00ff88] hover:border-[#00ff88] transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-center md:items-start">
            {/* Book Cover in Modal */}
            <div className="relative shrink-0 flex flex-col items-center">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-48 sm:w-56 lg:w-64 h-[310px] sm:h-[370px] object-cover rounded-2xl shadow-glow-md border border-[#10b981]/50"
              />
            </div>

            <div className="space-y-3.5 text-left flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#0c2e17] border border-[#00ff88]/30 text-[#00ff88] text-xs font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#00ff88]" />
                <span>Ano: {book.year} • {book.status}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">{book.title}</h2>
              <p className="text-xs font-mono text-[#00ff88]">{book.subtitle}</p>

              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase mb-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#00ff88]" /> Sinopse:
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed whitespace-pre-line">
                  {book.synopsis}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#00ff88]" /> Gênero & Temas:
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                  {book.creationProcess}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono text-slate-400">Autor: {personalInfo.name}</span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {book.amazonLink && (
                    <a
                      href={book.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-transform hover:scale-105 shadow-glow-sm"
                    >
                      <span>Comprar na Amazon</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {book.uiclapLink && (
                    <a
                      href={book.uiclapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#059669] to-[#00ff88] text-black font-extrabold text-xs flex items-center gap-1.5 transition-transform hover:scale-105 shadow-glow-sm"
                    >
                      <span>Comprar na UICLAP</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
