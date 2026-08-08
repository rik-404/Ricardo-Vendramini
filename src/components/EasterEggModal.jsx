import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, Sparkles, Terminal, Code } from 'lucide-react';
import { easterEggInfo } from '../data/portfolioData';

export default function EasterEggModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      // Trigger green matrix celebratory confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00ff88', '#10b981', '#059669', '#ffffff'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Easter Egg Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.85 }}
        className="relative w-full max-w-lg bg-[#040705] border-2 border-[#00ff88] rounded-3xl p-8 shadow-[0_0_50px_rgba(0,255,136,0.4)] z-10 text-center space-y-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#00ff88]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto rounded-full bg-[#00ff88]/20 border border-[#00ff88] flex items-center justify-center text-[#00ff88] shadow-glow-md">
          <Terminal className="w-8 h-8 animate-bounce" />
        </div>

        <h3 className="text-2xl font-extrabold text-[#00ff88] font-mono tracking-tight">
          {easterEggInfo.title}
        </h3>

        <p className="text-slate-200 text-sm font-light leading-relaxed">
          {easterEggInfo.message}
        </p>

        <div className="p-4 rounded-xl bg-[#0c2e17]/60 border border-[#00ff88]/40 font-mono text-xs text-[#00ff88]">
          {easterEggInfo.quote}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-[#00ff88] text-black font-extrabold text-sm hover:scale-105 transition-transform shadow-glow-md"
        >
          Continuar Explorando o Portfólio 🚀
        </button>
      </motion.div>
    </div>
  );
}
