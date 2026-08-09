import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import { getExperienceData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function ExperienceSection() {
  const { lang, t } = useLanguage();
  const experiences = getExperienceData(lang);

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c140e] border border-[#10b981]/30 mb-4">
            <Briefcase className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">
              {lang === 'en' ? 'Professional Experience' : 'Atuação Profissional'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {lang === 'en' ? 'Experience beyond ' : 'Experiência que vai '}
            <span className="text-gradient-green">
              {lang === 'en' ? 'code.' : 'além do código.'}
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl font-light text-base">
            {lang === 'en'
              ? 'Leadership, process management, business vision, and technical excellence.'
              : 'Liderança, gestão de processos, visão de negócios e excelência na entrega de soluções.'}
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-[#10b981]/25 relative overflow-hidden group hover:border-[#00ff88]/50"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c2e17] text-[#00ff88] text-xs font-mono mb-2">
                    <Building className="w-3.5 h-3.5" />
                    <span>{exp.company}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                </div>

                <div className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 shrink-0 self-start sm:self-auto">
                  {exp.period}
                </div>
              </div>

              <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
                {exp.summary}
              </p>

              <div className="space-y-3">
                <span className="text-xs font-mono text-[#00ff88] uppercase tracking-wider block">
                  {lang === 'en' ? 'Key Contributions & Impact:' : 'Principais Contribuições & Impacto:'}
                </span>
                <ul className="space-y-2">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
