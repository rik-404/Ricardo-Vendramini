import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Cog, Target, Users, Rocket, Quote } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function AboutSection() {
  const personalPillars = [
    {
      icon: Cog,
      emoji: '⚙️',
      title: 'Construir para funcionar',
      description: 'Não basta parecer bonito. Gosto de criar soluções que sejam úteis, estáveis e fáceis de evoluir.',
      borderColor: 'hover:border-[#00ff88]/50 hover:bg-[#061c10]/40',
      iconColor: 'text-[#00ff88]'
    },
    {
      icon: Target,
      emoji: '🎯',
      title: 'Resolver problemas reais',
      description: 'Tecnologia tem valor quando resolve um problema de verdade e facilita a vida de quem está do outro lado.',
      borderColor: 'hover:border-[#00f2fe]/50 hover:bg-[#051824]/40',
      iconColor: 'text-[#00f2fe]'
    },
    {
      icon: Users,
      emoji: '👥',
      title: 'Pessoas antes da tecnologia',
      description: 'Experiência, comunicação e colaboração são tão importantes quanto código e ferramentas.',
      borderColor: 'hover:border-[#10b981]/50 hover:bg-[#061a12]/40',
      iconColor: 'text-[#10b981]'
    },
    {
      icon: Rocket,
      emoji: '🚀',
      title: 'Sempre evoluindo',
      description: 'Cada projeto é uma oportunidade de aprender algo novo, testar ideias e melhorar o que já existe.',
      borderColor: 'hover:border-[#00ff88]/50 hover:bg-[#061c10]/40',
      iconColor: 'text-[#00ff88]'
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#071410] border border-[#00ff88]/30 mb-3">
            <User className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">Sobre Mim</span>
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
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#00f2fe]/20 via-[#10b981]/25 to-[#00ff88]/20 rounded-3xl blur-xl opacity-60 pointer-events-none" />
            
            <div className="relative rounded-2xl overflow-hidden glass-card p-3 border border-[#00ff88]/30 shadow-glow-md bg-[#040705]">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.name}
                className="w-full h-[460px] object-cover object-top rounded-xl filter contrast-105 hover:scale-[1.01] transition-all duration-700"
              />

              {/* Overlay Badge with Company Link */}
              <a
                href={personalInfo.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-[#00ff88]/40 shadow-glow-sm hover:border-[#00f2fe] hover:scale-[1.02] transition-all group bg-[#040705]/90"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={personalInfo.companyLogoUrl}
                      alt={personalInfo.companyName}
                      className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#00ff88] transition-colors">{personalInfo.name}</h4>
                      <p className="text-xs text-[#00ff88] font-mono flex items-center gap-1">
                        {personalInfo.companyName} <span className="text-[10px] text-[#00f2fe]">↗</span>
                      </p>
                    </div>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-[#00ff88]" />
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
                {personalInfo.aboutTitle || "Minha trajetória, minha visão e o que me move"}
              </h2>

              <div className="space-y-4 text-slate-300 font-light text-sm sm:text-base leading-relaxed mb-8">
                {personalInfo.aboutStory.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* 4 Personal Cards Grid (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              {personalPillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className={`glass-card p-4 rounded-xl border border-white/10 transition-all duration-300 ${pillar.borderColor}`}
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
          className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl glass-card border border-[#00ff88]/40 shadow-glow-md text-center relative bg-gradient-to-r from-[#040705] via-[#071d12] to-[#040705]"
        >
          <Quote className="w-8 h-8 text-[#00ff88]/40 mx-auto mb-3" />
          <blockquote className="text-lg sm:text-2xl font-bold text-white tracking-wide font-sans leading-snug">
            "{personalInfo.aboutQuote || 'Não quero apenas escrever código. Quero construir coisas que façam sentido.'}"
          </blockquote>
        </motion.div>

      </div>
    </section>
  );
}
