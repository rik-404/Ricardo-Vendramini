import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, Sparkles, Terminal, Code } from 'lucide-react';
import { easterEggInfo, easterEggInfoEn } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function EasterEggModal({ isOpen, onClose }) {
  const { lang, t } = useLanguage();
  const info = lang === 'en' ? easterEggInfoEn : easterEggInfo;
  useEffect(() => {
    if (isOpen) {
      // Trigger platinum / silver celebratory confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#e4e4e7', '#a1a1aa', '#71717a'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="easter-egg-scope fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Easter Egg Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.85 }}
        className="relative w-full max-w-lg bg-zinc-950 border-2 border-white/30 rounded-3xl p-8 shadow-2xl z-10 text-center space-y-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white shadow-lg">
          <Terminal className="w-8 h-8 animate-bounce" />
        </div>

        <h3 className="text-2xl font-extrabold text-white font-mono tracking-tight">
          {info.title}
        </h3>

        <p className="text-zinc-300 text-sm font-light leading-relaxed">
          {info.message}
        </p>

        <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 font-mono text-xs text-zinc-300">
          {info.quote}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-white text-zinc-950 font-extrabold text-sm hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
        >
          {t('easterEgg.continue')} 🚀
        </button>
      </motion.div>
    </div>
  );
}
