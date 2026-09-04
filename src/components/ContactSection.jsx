import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Github, Linkedin, Send, Copy, Check, Sparkles, PhoneCall, Globe } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function ContactSection() {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.socialLinks.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card rounded-3xl border border-white/15 p-8 sm:p-14 relative overflow-hidden shadow-glow-sm text-center flex flex-col items-center">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/20 text-white text-xs font-mono mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? "Let's Connect" : "Vamos Conectar"}</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4 max-w-3xl">
            {lang === 'en' ? "Have an " : "Tem uma "}
            <span className="text-gradient-green">
              {lang === 'en' ? "idea?" : "ideia?"}
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-slate-300 font-light max-w-2xl mb-10">
            {lang === 'en' ? "Let's turn it into reality." : "Vamos transformar em realidade."}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
            <a
              href={personalInfo.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-extrabold text-base shadow-glow-sm hover:bg-slate-200 hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <Send className="w-5 h-5" />
              <span>{lang === 'en' ? "Chat on WhatsApp" : "Vamos conversar no WhatsApp"}</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel border border-white/20 text-slate-200 hover:text-white font-bold text-base hover:border-white/50 transition-colors flex items-center justify-center gap-3 cursor-pointer"
            >
              {copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5" />}
              <span>{copied ? (lang === 'en' ? "Email Copied!" : "E-mail Copiado!") : (lang === 'en' ? "Copy Email Address" : "Copiar Endereço de E-mail")}</span>
            </button>
          </div>

          {/* Social Links Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full max-w-3xl pt-8 border-t border-white/10">
            <a
              href={personalInfo.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl glass-panel border border-white/20 hover:border-white/50 flex flex-col items-center gap-2 group transition-colors shadow-glow-sm col-span-2 sm:col-span-1"
            >
              <Globe className="w-6 h-6 text-white group-hover:text-slate-200 transition-colors" />
              <span className="text-xs font-mono text-white font-bold">{t('contact.company')} ↗</span>
            </a>

            <a
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl glass-panel border border-white/5 hover:border-white/30 flex flex-col items-center gap-2 group transition-colors"
            >
              <Github className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
              <span className="text-xs font-mono text-slate-300">GitHub</span>
            </a>

            <a
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl glass-panel border border-white/5 hover:border-white/30 flex flex-col items-center gap-2 group transition-colors"
            >
              <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
              <span className="text-xs font-mono text-slate-300">LinkedIn</span>
            </a>

            <a
              href={personalInfo.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl glass-panel border border-white/5 hover:border-white/30 flex flex-col items-center gap-2 group transition-colors"
            >
              <PhoneCall className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
              <span className="text-xs font-mono text-slate-300">WhatsApp</span>
            </a>

            <a
              href={`mailto:${personalInfo.socialLinks.email}`}
              className="p-4 rounded-xl glass-panel border border-white/5 hover:border-white/30 flex flex-col items-center gap-2 group transition-colors"
            >
              <Mail className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
              <span className="text-xs font-mono text-slate-300">{t('misc.emailLabel')}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
