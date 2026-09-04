import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Cog, Target, Users, Rocket, Quote } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection() {
  const { lang, t } = useLanguage();

  const personalPillars = [
    {
      icon: Cog,
      emoji: '⚙️',
      title: t('about.buildToWork'),
      description: t('about.buildToWorkDesc'),
      borderColor: 'hover:border-white/40 hover:bg-white/[0.04]',
      iconColor: 'text-white'
    },
    {
      icon: Target,
      emoji: '🎯',
      title: t('about.solveProblems'),
      description: t('about.solveProblemsDesc'),
      borderColor: 'hover:border-white/40 hover:bg-white/[0.04]',
      iconColor: 'text-slate-200'
    },
    {
      icon: Users,
      emoji: '👥',
      title: t('about.peopleFirst'),
      description: t('about.peopleFirstDesc'),
      borderColor: 'hover:border-white/40 hover:bg-white/[0.04]',
      iconColor: 'text-slate-200'
    },
    {
      icon: Rocket,
      emoji: '🚀',
      title: t('about.alwaysEvolving'),
      description: t('about.alwaysEvolvingDesc'),
      borderColor: 'hover:border-white/40 hover:bg-white/[0.04]',
      iconColor: 'text-white'
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/15 mb-3">
            <User className="w-3.5 h-3.5 text-slate-200" />
            <span className="text-xs font-mono text-slate-200 tracking-widest uppercase">{t('about.badge')}</span>
          </div>
        </div>

        {/* Asymmetric Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Photo & Brand Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            {/* Glow frame behind image */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-white/10 via-slate-400/8 to-zinc-600/8 rounded-3xl blur-xl opacity-60 pointer-events-none" />
            
            <div className="relative rounded-2xl overflow-hidden glass-card p-3 border border-white/15 shadow-glow-sm bg-bg-card">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.name}
                className="w-full h-[460px] object-cover object-top rounded-xl filter contrast-105 hover:scale-[1.01] transition-transform duration-200"
              />

              {/* Overlay Badge with Company Link */}
              <a
                href={personalInfo.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-white/20 shadow-glow-sm hover:border-white/50 hover:scale-[1.02] transition-all group bg-[#09090b]/90"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={personalInfo.companyLogoUrl}
                      alt={personalInfo.companyName}
                      className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-white transition-colors">{personalInfo.name}</h4>
                      <p className="text-xs text-slate-300 font-mono flex items-center gap-1">
                        {personalInfo.companyName} <span className="text-[10px] text-slate-400">↗</span>
                      </p>
                    </div>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Narrative Story & 4 Personal Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                {lang === 'en'
                  ? 'My journey, my vision, and what drives me'
                  : 'Minha trajetória, minha visão e o que me move'}
              </h2>

              <div className="space-y-4 text-slate-300 font-light text-sm sm:text-base leading-relaxed mb-8">
                {lang === 'en' ? (
                  <>
                    <p>
                      My relationship with technology began with a curiosity to understand how things work. What started with experiments and lines of code transformed into a constant quest to build solutions that truly make a difference.
                    </p>
                    <p>
                      Throughout this journey, I came to view software development from a broader perspective. For me, creating software isn't just about writing code: it's about understanding a problem, designing the user experience, and finding an efficient way to turn an idea into reality.
                    </p>
                    <p>
                      Today, I combine software engineering, tech, management, and leadership to build projects that go far beyond technical execution. I enjoy participating in the entire lifecycle—from concept and planning to implementation, deployment, and product evolution.
                    </p>
                  </>
                ) : (
                  personalInfo.aboutStory.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                )}
              </div>
            </div>

            {/* 4 Personal Cards Grid (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              {personalPillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className={`glass-card p-4 rounded-xl border border-white/10 ${pillar.borderColor}`}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`p-1.5 rounded-lg bg-white/5 border border-white/10 ${pillar.iconColor}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </motion.div>
        </div>

        {/* Bottom Standout Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="quote-card max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl glass-card border border-white/15 shadow-glow-sm text-center relative bg-gradient-to-r from-bg-card via-[#1c1c21] to-bg-card"
        >
          <Quote className="w-8 h-8 text-white/30 mx-auto mb-3" />
          <blockquote className="text-lg sm:text-2xl font-bold text-white tracking-wide font-sans leading-snug">
            "{lang === 'en' ? "I don't just want to write code. I want to build things that matter." : personalInfo.aboutQuote}"
          </blockquote>
        </motion.div>

      </div>
    </section>
  );
}
