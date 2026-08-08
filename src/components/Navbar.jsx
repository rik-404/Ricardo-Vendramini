import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const navItems = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#about' },
  { label: 'Experiência', href: '#experience' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Livros', href: '#books' },
  { label: 'Conquistas', href: '#achievements' },
  { label: 'Contato', href: '#contact' },
];

export default function Navbar({ onTriggerEasterEgg }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll Spy logic
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);
    if (nextCount >= 5) {
      setLogoClicks(0);
      if (onTriggerEasterEgg) onTriggerEasterEgg();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel py-3 shadow-lg shadow-black/60 border-b border-[#00f2fe]/20'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Company Icon */}
        <a
          href="#hero"
          onClick={handleLogoClick}
          className="group flex items-center gap-3 text-lg font-extrabold tracking-tight text-white interactive-hover"
          title="Vendramini Informática - Clique 5x para um Easter Egg"
        >
          <div className="w-10 h-10 rounded-xl bg-[#040705] border border-[#00f2fe]/40 p-1 flex items-center justify-center shadow-glow-sm group-hover:scale-105 group-hover:border-[#00ff88] transition-all">
            <img
              src={personalInfo.companyLogoUrl}
              alt={personalInfo.companyName}
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-base tracking-wider flex items-center gap-1.5 font-extrabold">
              RICARDO <span className="text-gradient-green">VENDRAMINI</span>
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse shadow-glow-sm" />
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-normal tracking-widest uppercase flex items-center gap-1">
              <span className="text-[#00f2fe]">Vendramini</span> Informática
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-[#080d09]/80 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-glow-sm">
          {navItems.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 rounded-full ${
                  isActive
                    ? 'text-[#00ff88] font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#00f2fe] via-[#10b981] to-[#00ff88] rounded-full shadow-glow-sm" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Terminal Quick Trigger */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onTriggerEasterEgg}
            className="p-2 rounded-xl bg-[#0a1410] border border-[#00f2fe]/30 text-slate-300 hover:text-[#00ff88] hover:border-[#00ff88]/60 transition-all shadow-glow-sm"
            title="Easter Egg Secreto"
          >
            <Sparkles className="w-4 h-4 text-[#00f2fe]" />
          </button>
          
          <a
            href="#contact"
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#00f2fe] via-[#10b981] to-[#00ff88] text-black shadow-glow-sm hover:shadow-glow-md transition-all transform hover:-translate-y-0.5"
          >
            Falar Comigo
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#0c140e] border border-[#00f2fe]/30 text-slate-300 hover:text-white"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#00ff88]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-[#00f2fe]/30 px-6 py-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-lg text-sm font-medium text-slate-200 hover:bg-[#00f2fe]/10 hover:text-[#00ff88] transition-colors border-l-2 border-transparent hover:border-[#00ff88]"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#00ff88] text-black font-bold text-sm"
              >
                Vamos Conversar
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
