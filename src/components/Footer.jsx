import React from 'react';
import { Github, Linkedin, Instagram, Facebook, Globe, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialButtons = [
    {
      name: 'Instagram',
      url: personalInfo.socialLinks.instagram,
      icon: Instagram,
      color: 'hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10',
    },
    {
      name: 'GitHub',
      url: personalInfo.socialLinks.github,
      icon: Github,
      color: 'hover:text-[#00ff88] hover:border-[#00ff88]/50 hover:bg-[#00ff88]/10',
    },
    {
      name: 'Facebook',
      url: personalInfo.socialLinks.facebook,
      icon: Facebook,
      color: 'hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10',
    },
    {
      name: 'LinkedIn',
      url: personalInfo.socialLinks.linkedin,
      icon: Linkedin,
      color: 'hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10',
    },
    {
      name: 'Empresa',
      url: personalInfo.companyWebsite,
      icon: Globe,
      color: 'hover:text-[#00ff88] hover:border-[#00ff88]/50 hover:bg-[#00ff88]/10',
    },
  ];

  return (
    <footer className="py-12 border-t border-[#00ff88]/20 relative z-10 bg-[#040705]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Brand with Company Logo Link */}
        <a
          href={personalInfo.companyWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group transition-transform hover:scale-105"
        >
          <img
            src={personalInfo.companyLogoUrl}
            alt={personalInfo.companyName}
            className="w-10 h-10 object-contain filter drop-shadow-[0_0_8px_rgba(0,255,136,0.4)] group-hover:scale-110 transition-transform"
          />
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 text-white font-extrabold tracking-wider text-base">
              <span>RICARDO <span className="text-gradient-green">VENDRAMINI</span></span>
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            </div>
            <p className="text-xs font-mono text-[#00ff88] group-hover:underline transition-colors flex items-center gap-1">
              {personalInfo.companyName} ↗
            </p>
          </div>
        </a>

        {/* Center Social Buttons with Icons */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {socialButtons.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className={`p-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 flex items-center gap-2 text-xs font-mono group ${item.color}`}
              >
                <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="hidden sm:inline">{item.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right Rights */}
        <div className="flex flex-col items-center md:items-end gap-1 text-xs font-mono text-slate-500 text-center md:text-right">
          <span>© {currentYear} Ricardo Vendramini.</span>
          <span className="text-[11px] text-slate-600">Todos os direitos reservados.</span>
        </div>

      </div>
    </footer>
  );
}
