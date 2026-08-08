import React from 'react';
import { motion } from 'framer-motion';
import { User, Code2, Compass, Cpu, Heart, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#071410] border border-[#00f2fe]/30 mb-4">
            <User className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">Sobre Mim</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Quem está por trás do <span className="text-gradient-green">código?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl font-light text-base">
            Uma trajetória construída com paixão por tecnologia, aprendizado contínuo e busca por impacto real.
          </p>
        </div>

        {/* Asymmetric Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Photo & Tech Badge Cards (Reveals First) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Glow frame behind image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#00f2fe]/30 via-[#10b981]/30 to-[#00ff88]/20 rounded-3xl blur-2xl opacity-70 pointer-events-none" />
            
            <div className="relative rounded-2xl overflow-hidden glass-card p-3 border border-[#00f2fe]/30 shadow-glow-md">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.name}
                className="w-full h-[440px] object-cover object-top rounded-xl filter contrast-110 hover:scale-102 transition-all duration-700"
              />

              {/* Overlay Badge with Company Link */}
              <a
                href={personalInfo.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-[#00ff88]/40 shadow-glow-sm hover:border-[#00f2fe] hover:scale-[1.02] transition-all group"
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
                  <ShieldCheck className="w-6 h-6 text-[#00f2fe]" />
                </div>
              </a>
            </div>

            {/* Micro Tech Floating Card */}
            <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 p-3 rounded-xl glass-panel border border-[#00f2fe]/40 shadow-glow-md">
              <div className="p-2 rounded-lg bg-[#00f2fe]/10 text-[#00f2fe]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Visão Sistêmica</span>
                <span className="text-xs font-bold text-white">Full Stack & Tech Leader</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Story & Core Pillars (Slides in AFTER photo) */}
          <motion.div
            initial={{ opacity: 0, x: 70, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="glass-card p-8 rounded-2xl relative border border-[#00f2fe]/20">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Compass className="w-6 h-6 text-[#00f2fe]" />
                <span>Trajetória, Visão & Propósito</span>
              </h3>

              <div className="space-y-4 text-slate-300 font-light text-sm leading-relaxed">
                {personalInfo.aboutStory.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Core Principles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00ff88] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Qualidade do Código</h5>
                    <p className="text-[12px] text-slate-400">Arquitetura limpa, manutenível e escalável.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00f2fe] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Foco em Resultados</h5>
                    <p className="text-[12px] text-slate-400">Produtos que resolvem dores reais de negócio.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00f2fe] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Liderança de Pessoas</h5>
                    <p className="text-[12px] text-slate-400">Comunicação transparente e trabalho em equipe.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00ff88] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Evolução Contínua</h5>
                    <p className="text-[12px] text-slate-400">Aprendizado constante de novas tecnologias.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Fact Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#00f2fe]/10 via-[#0c2e17]/60 to-[#040705] border border-[#00f2fe]/30 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-mono">
                "Código é poesia estruturada para transformar realidades."
              </span>
              <Building2 className="w-5 h-5 text-[#00f2fe]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
