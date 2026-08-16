import React from 'react';
import { Github, Linkedin, Instagram, Facebook, Globe, MessageCircle, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: t('footer.about'), href: '#about' },
    { name: t('footer.experience'), href: '#experience' },
    { name: t('footer.skills'), href: '#skills' },
    { name: t('footer.projects'), href: '#projects' },
    { name: t('footer.contact'), href: '#contact' },
  ];

  const socialButtons = [
    {
      name: 'GitHub',
      url: personalInfo.socialLinks.github,
      icon: Github,
      color: 'hover:text-[#00ff88] hover:bg-[#00ff88]/15 hover:border-[#00ff88]/40',
    },
    {
      name: 'LinkedIn',
      url: personalInfo.socialLinks.linkedin,
      icon: Linkedin,
      color: 'hover:text-[#00f2fe] hover:bg-[#00f2fe]/15 hover:border-[#00f2fe]/40',
    },
    {
      name: 'Instagram',
      url: personalInfo.socialLinks.instagram,
      icon: Instagram,
      color: 'hover:text-pink-400 hover:bg-pink-500/15 hover:border-pink-500/40',
    },
    {
      name: 'Facebook',
      url: personalInfo.socialLinks.facebook,
      icon: Facebook,
      color: 'hover:text-blue-400 hover:bg-blue-500/15 hover:border-blue-500/40',
    },
    {
      name: 'WhatsApp',
      url: personalInfo.socialLinks.whatsapp,
      icon: MessageCircle,
      color: 'hover:text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-500/40',
    },
  ];

  return (
    <footer className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Floating Card Container in Dark Cyberpunk Glassmorphism */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#07130c]/95 via-[#050d08]/90 to-[#030705]/95 border border-[#00ff88]/20 backdrop-blur-2xl p-6 sm:p-10 md:p-12 shadow-[0_15px_40px_rgba(0,255,136,0.12)] group transition-[border-color,box-shadow] duration-200 hover:border-[#00ff88]/40 hover:shadow-[0_20px_50px_rgba(0,255,136,0.2)]">
        
        {/* Ambient Neon Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#00f2fe]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row: Site Logo & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          
          {/* Site Brand Logo & Subtitle */}
          <a
            href={personalInfo.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 group/brand transition-transform hover:scale-105"
          >
            <img
              src={personalInfo.companyLogoUrl}
              alt={personalInfo.companyName}
              className="w-11 h-11 object-contain filter drop-shadow-[0_0_10px_rgba(0,255,136,0.5)] group-hover/brand:scale-110 transition-transform"
            />
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2 text-white font-extrabold tracking-wider text-xl sm:text-2xl">
                <span>
                  RICARDO<span className="text-[#00ff88]">.DEV</span>
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_8px_#00ff88]" />
              </div>
              <span className="text-xs font-mono text-[#00ff88]/90 flex items-center gap-1 group-hover/brand:underline">
                {personalInfo.companyName} <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </a>

          {/* Site Action Buttons (Company Website & WhatsApp) */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Button 1: Company Website */}
            <a
              href={personalInfo.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/60 text-white transition-colors duration-300 shadow-md group/app backdrop-blur-md"
            >
              <div className="p-1.5 rounded-xl bg-[#00ff88]/20 text-[#00ff88]">
                <Globe className="w-4 h-4 group-hover/app:rotate-12 transition-transform" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-[#00ff88]/80 font-mono font-medium leading-none mb-1">
                  Empresa
                </span>
                <span className="text-xs sm:text-sm font-bold text-white leading-none group-hover/app:text-[#00ff88] transition-colors flex items-center gap-1">
                  {personalInfo.companyName} <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </a>

            {/* Button 2: WhatsApp Direct */}
            <a
              href={personalInfo.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-400/60 text-white transition-colors duration-300 shadow-md group/app backdrop-blur-md"
            >
              <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <MessageCircle className="w-4 h-4 group-hover/app:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-emerald-400/80 font-mono font-medium leading-none mb-1">
                  Contato Direto
                </span>
                <span className="text-xs sm:text-sm font-bold text-white leading-none group-hover/app:text-emerald-300 transition-colors">
                  Falar no WhatsApp
                </span>
              </div>
            </a>
          </div>

        </div>

        {/* Middle Section: Mission & Nav links */}
        <div className="my-8 relative z-10">
          <p className="text-slate-300 text-sm sm:text-base md:text-lg font-normal max-w-2xl leading-relaxed mb-6">
            {t('footer.mission')}
          </p>

          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 font-semibold text-base sm:text-lg text-white">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#00ff88] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Row: Copyright & Social Icons */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-xs sm:text-sm text-slate-400">
          <div className="font-mono">
            © {currentYear} <span className="text-white font-bold">RICARDO<span className="text-[#00ff88]">.DEV</span></span>. {t('footer.rights')}
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-2.5">
            {socialButtons.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className={`p-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors duration-300 flex items-center justify-center group ${item.color}`}
                >
                  <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
}
