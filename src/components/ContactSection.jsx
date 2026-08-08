import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Github, Linkedin, Send, Copy, Check, Sparkles, PhoneCall, Globe } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.socialLinks.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card rounded-3xl border border-[#00ff88]/40 p-8 sm:p-14 relative overflow-hidden shadow-glow-lg text-center flex flex-col items-center">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#00ff88]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c2e17] border border-[#00ff88]/40 text-[#00ff88] text-xs font-mono mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Vamos Conectar</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4 max-w-3xl">
            Tem uma <span className="text-gradient-green">ideia?</span>
          </h2>

          <p className="text-xl sm:text-2xl text-slate-300 font-light max-w-2xl mb-10">
            Talvez eu consiga transformá-la em realidade.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
            <a
              href={personalInfo.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00f2fe] via-[#10b981] to-[#00ff88] text-black font-extrabold text-base shadow-glow-md hover:scale-105 transition-transform flex items-center justify-center gap-3"
            >
              <Send className="w-5 h-5" />
              <span>Vamos conversar no WhatsApp</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto px-6 py-4 rounded-xl glass-panel border border-[#10b981]/40 text-white hover:text-[#00ff88] font-mono text-sm flex items-center justify-center gap-2 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-[#00ff88]" /> : <Copy className="w-4 h-4 text-[#00ff88]" />}
              <span>{copied ? 'E-mail Copiado!' : personalInfo.socialLinks.email}</span>
            </button>
          </div>

          {/* Social Links Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full max-w-3xl pt-8 border-t border-white/10">
            <a
              href={personalInfo.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl glass-panel border border-[#00f2fe]/30 hover:border-[#00ff88] flex flex-col items-center gap-2 group transition-colors shadow-glow-sm col-span-2 sm:col-span-1"
            >
              <Globe className="w-6 h-6 text-[#00f2fe] group-hover:text-[#00ff88] transition-colors" />
              <span className="text-xs font-mono text-[#00f2fe] font-bold">Empresa ↗</span>
            </a>

            <a
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl glass-panel border border-white/5 hover:border-[#00ff88]/40 flex flex-col items-center gap-2 group transition-colors"
            >
              <Github className="w-6 h-6 text-slate-400 group-hover:text-[#00ff88] transition-colors" />
              <span className="text-xs font-mono text-slate-300">GitHub</span>
            </a>

            <a
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl glass-panel border border-white/5 hover:border-[#00ff88]/40 flex flex-col items-center gap-2 group transition-colors"
            >
              <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-[#00ff88] transition-colors" />
              <span className="text-xs font-mono text-slate-300">LinkedIn</span>
            </a>

            <a
              href={personalInfo.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl glass-panel border border-white/5 hover:border-[#00ff88]/40 flex flex-col items-center gap-2 group transition-colors"
            >
              <PhoneCall className="w-6 h-6 text-slate-400 group-hover:text-[#00ff88] transition-colors" />
              <span className="text-xs font-mono text-slate-300">WhatsApp</span>
            </a>

            <a
              href={`mailto:${personalInfo.socialLinks.email}`}
              className="p-4 rounded-xl glass-panel border border-white/5 hover:border-[#00ff88]/40 flex flex-col items-center gap-2 group transition-colors"
            >
              <Mail className="w-6 h-6 text-slate-400 group-hover:text-[#00ff88] transition-colors" />
              <span className="text-xs font-mono text-slate-300">E-mail</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
