import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Layers, Sparkles, Terminal, ChevronDown, Rocket, Building2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import FlyEasterEgg from './FlyEasterEgg';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection() {
  const { lang, t } = useLanguage();
  const heroRef = useRef(null);
  const titleRef = useRef(null);

  const prefixText = t('hero.prefix');
  const gradientText = t('hero.gradient');
  const fullText = prefixText + gradientText;

  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setCharIndex(0);
  }, [lang]);

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 55);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, fullText.length]);

  const currentPrefix = fullText.slice(0, Math.min(charIndex, prefixText.length));
  const currentGradient = charIndex > prefixText.length
    ? fullText.slice(prefixText.length, charIndex)
    : "";

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Glow Orbs Backdrop Cyan to Green */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#00f2fe]/15 via-[#10b981]/15 to-[#00ff88]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[320px] h-[320px] bg-[#00f2fe]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        
        {/* Top Company & Status Pill */}
        <motion.a
          href={personalInfo.companyWebsite}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-[#00f2fe]/40 mb-8 shadow-glow-sm hover:border-[#00ff88] hover:scale-105 transition-all group cursor-pointer"
        >
          <img
            src={personalInfo.companyLogoUrl}
            alt={personalInfo.companyName}
            className="w-5 h-5 object-contain"
          />
          <span className="text-xs font-mono text-slate-200 font-semibold group-hover:text-[#00ff88] transition-colors">
            {personalInfo.companyName}
          </span>
          <span className="text-slate-600">•</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
          </span>
          <span className="text-xs font-mono text-[#00ff88] tracking-wider uppercase flex items-center gap-1">
            {t('hero.access')} ↗
          </span>
        </motion.a>

        {/* Main Headline with Typewriter Effect */}
        <motion.h1
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-[1.1] mb-6 min-h-[2.4em] sm:min-h-[2.2em] flex items-center justify-center flex-wrap"
        >
          <span>{currentPrefix}</span>
          {currentGradient && (
            <span className="text-gradient-cyan-green drop-shadow-[0_0_35px_rgba(0,242,254,0.3)]">
              {currentGradient}
            </span>
          )}
          {/* Blinking Cursor Bar */}
          <span className="inline-block w-1 sm:w-1.5 h-[0.75em] bg-[#00ff88] animate-pulse ml-1 align-middle shadow-glow-sm rounded-sm" />
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-slate-300 max-w-3xl font-light leading-relaxed mb-10"
        >
          {t('hero.description')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16"
        >
          <a
            href="#about"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00f2fe] via-[#10b981] to-[#00ff88] text-black font-bold text-base shadow-glow-md hover:shadow-glow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
          >
            <span>{t('hero.learnStory')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel border border-[#00f2fe]/40 text-slate-100 hover:text-[#00ff88] hover:border-[#00ff88] font-semibold text-base transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
          >
            <span>{t('hero.ctaProjects')}</span>
            <Rocket className="w-5 h-5 text-[#00f2fe] group-hover:rotate-12 transition-transform" />
          </a>
        </motion.div>

        {/* Tech Stack Interactive Floating Grid Concept */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-4xl p-6 rounded-2xl glass-card relative border border-[#00f2fe]/25 overflow-hidden shadow-glow-sm"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f2fe]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 text-slate-300">ricardo-vendramini-ecosystem ~ v2026.1</span>
            </div>
            <div className="flex items-center gap-2 text-[#00f2fe]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('hero.stackLabel')}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-3 rounded-lg bg-[#040705]/60 border border-white/5 hover:border-[#00f2fe]/40 transition-colors">
              <span className="text-[10px] font-mono uppercase text-[#00f2fe] block mb-1">{t('hero.stackArchitecture')}</span>
              <span className="text-xs font-semibold text-slate-200 block">React & Next.js</span>
            </div>
            <div className="p-3 rounded-lg bg-[#040705]/60 border border-white/5 hover:border-[#00ff88]/40 transition-colors">
              <span className="text-[10px] font-mono uppercase text-[#00ff88] block mb-1">{t('hero.stackServices')}</span>
              <span className="text-xs font-semibold text-slate-200 block">Node.js & Supabase</span>
            </div>
            <div className="p-3 rounded-lg bg-[#040705]/60 border border-white/5 hover:border-[#00f2fe]/40 transition-colors">
              <span className="text-[10px] font-mono uppercase text-[#00f2fe] block mb-1">{t('hero.stackInfrastructure')}</span>
              <span className="text-xs font-semibold text-slate-200 block">Linux & Cloud Deploy</span>
            </div>
            <div className="p-3 rounded-lg bg-[#040705]/60 border border-white/5 hover:border-[#00ff88]/40 transition-colors">
              <span className="text-[10px] font-mono uppercase text-[#00ff88] block mb-1">{t('hero.stackGovernance')}</span>
              <span className="text-xs font-semibold text-slate-200 block">Leadership & Operations</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-12 text-slate-400 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView()}
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#00f2fe]/80">{t('hero.scrollHint')}</span>
          <ChevronDown className="w-5 h-5 text-[#00ff88]" />
        </motion.div>
      </div>

      {/* Mosca aleatória que pousa no título */}
      <FlyEasterEgg containerRef={heroRef} titleRef={titleRef} />
    </section>
  );
}
