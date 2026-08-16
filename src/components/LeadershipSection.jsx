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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c140e] border border-[#10b981]/30 mb-4">
            <Users className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">
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
                className="glass-card p-8 rounded-3xl border border-[#10b981]/25 hover:border-[#00ff88]/50 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ff88]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00ff88]/15 transition-colors" />

                <div className="w-12 h-12 rounded-2xl bg-[#0c2e17] border border-[#00ff88]/40 flex items-center justify-center text-[#00ff88] shadow-glow-sm mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00ff88] transition-colors">
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
