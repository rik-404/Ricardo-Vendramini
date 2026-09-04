import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Workflow, ShieldAlert, Target, Compass } from 'lucide-react';
import { getLeadershipPillars } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Users: Users,
  MessageSquare: MessageSquare,
  Workflow: Workflow,
  ShieldAlert: ShieldAlert,
  Target: Target,
  Compass: Compass,
};

export default function LeadershipSection() {
  const { lang, t } = useLanguage();
  const pillars = getLeadershipPillars(lang);

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/15 mb-4">
            <Users className="w-3.5 h-3.5 text-slate-200" />
            <span className="text-xs font-mono text-slate-200 tracking-widest uppercase">
              {lang === 'en' ? 'Leadership & People' : 'Gestão & Pessoas'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {lang === 'en' ? 'Tech is built by ' : 'Tecnologia é feita por '}
            <span className="text-gradient-green">
              {lang === 'en' ? 'people.' : 'pessoas.'}
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl font-light text-base">
            {lang === 'en'
              ? 'Core leadership principles ensuring healthy team cultures, technical alignment, and high productivity.'
              : 'Princípios fundamentais de liderança que garantem ambientes saudáveis, alinhamento técnico e alta produtividade.'}
          </p>
        </div>

        {/* Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const IconComponent = iconMap[pillar.icon] || Users;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 rounded-3xl border border-white/10 hover:border-white/40 group relative overflow-hidden transition-all"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none group-hover:bg-white/10 transition-colors" />

                <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/20 flex items-center justify-center text-white shadow-glow-sm mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
