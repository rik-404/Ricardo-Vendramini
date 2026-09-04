import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy } from 'lucide-react';
import { getAchievementsData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function AchievementsSection() {
  const { lang, t } = useLanguage();
  const achievements = getAchievementsData(lang);

  return (
    <section id="achievements" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/15 mb-4">
            <Trophy className="w-3.5 h-3.5 text-slate-200" />
            <span className="text-xs font-mono text-slate-200 tracking-widest uppercase">
              {lang === 'en' ? 'Achievements & Impact' : 'Marcos & Feitos'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {lang === 'en' ? 'Built along ' : 'Coisas que construí ao '}
            <span className="text-gradient-green">
              {lang === 'en' ? 'the journey.' : 'longo do caminho.'}
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl font-light text-base">
            {lang === 'en'
              ? 'Milestones achieved through impactful projects, leadership, and technical mastery.'
              : 'Conquistas consolidadas através de projetos de impacto, liderança e aprendizado técnico.'}
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-3xl border border-white/10 hover:border-white/40 relative group overflow-hidden flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold font-mono text-white/30 group-hover:text-white transition-colors">
                    {item.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/15 text-white text-[10px] font-mono uppercase">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-xs font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <Star className="w-3.5 h-3.5 text-white" />
                <span>{t('achievements.impactLabel')}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
