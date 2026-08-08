import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { dispatchAchievementUnlocked } from './AchievementToast';

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
  const [glitchPhase, setGlitchPhase] = useState(0); // 0=normal, 1=glitching, 2=broken, 3=bsod, 4=recovering
  const [titleUnlocked, setTitleUnlocked] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ricardodev_achievements') || '[]');
      return saved.includes('titulo');
    } catch { return false; }
  });
  const clickTimerRef = useRef(null);

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

  const handleLogoClick = (e) => {
    if (glitchPhase > 0) return; // Already animating

    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);

    // Reset click counter after 2 seconds of no clicks
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => setLogoClicks(0), 2000);

    if (nextCount >= 7) {
      e.preventDefault();
      setLogoClicks(0);
      triggerGlitchSequence();
    }
  };

  const triggerGlitchSequence = () => {
    // Unlock achievement (only first time)
    try {
      const saved = JSON.parse(localStorage.getItem('ricardodev_achievements') || '[]');
      if (!saved.includes('titulo')) {
        saved.push('titulo');
        localStorage.setItem('ricardodev_achievements', JSON.stringify(saved));
        dispatchAchievementUnlocked('titulo');
      }
      setTitleUnlocked(true);
    } catch {}

    // Phase 1: Glitch effect on the title (flickering)
    setGlitchPhase(1);

    setTimeout(() => {
      // Phase 2: Title breaks apart
      setGlitchPhase(2);
    }, 800);

    setTimeout(() => {
      // Phase 3: Full screen BSOD / Error overlay
      setGlitchPhase(3);
    }, 1800);

    setTimeout(() => {
      // Phase 4: Recovery
      setGlitchPhase(4);
    }, 5500);

    setTimeout(() => {
      // Back to normal
      setGlitchPhase(0);
    }, 7000);
  };

  // Glitched title text
  const renderBrandText = () => {
    if (glitchPhase === 0) {
      return (
        <span className="font-sans text-base tracking-wider flex items-center gap-1.5 font-extrabold">
          RICARDO<span className="text-gradient-green">.DEV</span>
          <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse shadow-glow-sm" />
        </span>
      );
    }

    if (glitchPhase === 1) {
      return (
        <span className="font-sans text-base tracking-wider flex items-center gap-1.5 font-extrabold animate-glitch-text">
          R̷I̸C̶A̵R̸D̷O<span className="text-red-500">.D̵̡̛E̸V̶̢</span>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        </span>
      );
    }

    if (glitchPhase === 2) {
      return (
        <span className="font-sans text-base tracking-wider flex items-center gap-1.5 font-extrabold">
          <span className="inline-block rotate-[-8deg] text-red-500 translate-y-1">R̷I̸C̶</span>
          <span className="inline-block rotate-[12deg] text-yellow-500 -translate-y-2 translate-x-1">A̵R̸</span>
          <span className="inline-block rotate-[-5deg] text-red-400 translate-y-3">D̷O</span>
          <span className="inline-block rotate-[20deg] text-red-600 -translate-y-3 translate-x-2">.D̶E̵V̷</span>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        </span>
      );
    }

    if (glitchPhase >= 3) {
      return (
        <span className="font-sans text-base tracking-wider flex items-center gap-1.5 font-extrabold text-red-500">
          [ERRO FATAL]
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        </span>
      );
    }
  };

  return (
    <>
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
            onMouseEnter={() => {
              if (!titleUnlocked && glitchPhase === 0) {
                window.dispatchEvent(new CustomEvent('glove-cursor', { detail: true }));
              }
            }}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('glove-cursor', { detail: false }))}
            className={`group flex items-center gap-3 text-lg font-extrabold tracking-tight text-white interactive-hover select-none ${
              glitchPhase === 1 ? 'animate-glitch-shake' : ''
            }`}
            title="Vendramini Informática"
          >
            <div className={`w-10 h-10 rounded-xl bg-[#040705] border p-1 flex items-center justify-center shadow-glow-sm transition-all ${
              glitchPhase > 0 && glitchPhase < 4
                ? 'border-red-500/60 rotate-12 scale-110'
                : 'border-[#00f2fe]/40 group-hover:scale-105 group-hover:border-[#00ff88]'
            }`}>
              <img
                src={personalInfo.companyLogoUrl}
                alt={personalInfo.companyName}
                className={`w-full h-full object-contain filter ${
                  glitchPhase > 0 && glitchPhase < 4
                    ? 'hue-rotate-180 saturate-200 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]'
                    : 'drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]'
                }`}
              />
            </div>
            <div className="flex flex-col">
              {renderBrandText()}
              <span className={`text-[10px] font-mono font-normal tracking-widest uppercase flex items-center gap-1 ${
                glitchPhase > 0 && glitchPhase < 4 ? 'text-red-400' : 'text-slate-400'
              }`}>
                {glitchPhase > 0 && glitchPhase < 4 ? (
                  <span className="text-red-400">SYSTEM MALFUNCTION</span>
                ) : (
                  <>
                    <span className="text-[#00f2fe]">Vendramini</span> Informática
                  </>
                )}
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

      {/* BSOD / Crash Error Overlay - Phase 3 */}
      {glitchPhase === 3 && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ animation: 'bsodFlash 0.3s ease-out' }}
        >
          {/* Scanline background */}
          <div className="absolute inset-0 bg-[#0a0a2e]" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
          />

          <div className="relative text-center px-8 max-w-2xl mx-auto font-mono z-10">
            {/* Error emoticon */}
            <div className="text-6xl sm:text-8xl font-bold text-white mb-6" style={{ textShadow: '0 0 30px rgba(255,255,255,0.3)' }}>
              :(
            </div>

            <p className="text-white text-sm sm:text-base mb-6 leading-relaxed">
              Seu portfólio encontrou um problema e precisa ser reiniciado.
              Estamos coletando algumas informações de erro e então
              reiniciaremos para você.
            </p>

            <div className="w-48 h-1.5 mx-auto rounded-full bg-white/20 mb-6 overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ animation: 'bsodProgress 3.5s ease-in-out forwards' }}
              />
            </div>

            <p className="text-white/60 text-xs mb-8">
              42% concluído
            </p>

            <div className="text-left text-white/40 text-[10px] sm:text-xs space-y-1 mb-8">
              <p>Código de parada: CLIQUE_EXCESSIVO_NO_LOGO</p>
              <p>Módulo com falha: Ricardo.DEV.exe</p>
              <p>Erro: ERR_USER_TOO_CURIOUS (0x00000DEV)</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
              <p className="text-[#00ff88] text-sm font-bold mb-2">
                😎 Brincadeira! Relaxa.
              </p>
              <p className="text-white/70 text-xs">
                Achou que ia quebrar meu site clicando no logo? Sou dev, protejo até os cliques.
              </p>
              <p className="text-white/40 text-[10px] mt-3">
                Restaurando sistema em alguns segundos...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recovery flash overlay - Phase 4 */}
      {glitchPhase === 4 && (
        <div
          className="fixed inset-0 z-[9999] bg-white pointer-events-none"
          style={{ animation: 'recoveryFade 1.5s ease-out forwards' }}
        />
      )}

      {/* Injected CSS keyframes */}
      <style>{`
        @keyframes bsodFlash {
          0% { opacity: 0; transform: scale(1.05); }
          50% { opacity: 1; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes bsodProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes recoveryFade {
          0% { opacity: 1; }
          30% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        .animate-glitch-shake {
          animation: glitchShake 0.1s infinite;
        }
        @keyframes glitchShake {
          0% { transform: translate(0); }
          25% { transform: translate(-3px, 2px); }
          50% { transform: translate(2px, -1px); }
          75% { transform: translate(-1px, -2px); }
          100% { transform: translate(3px, 1px); }
        }
        .animate-glitch-text {
          animation: glitchText 0.15s infinite;
        }
        @keyframes glitchText {
          0% { text-shadow: 2px 0 #ff0000, -2px 0 #00ff00; }
          25% { text-shadow: -2px 0 #ff0000, 2px 0 #00ff00; }
          50% { text-shadow: 2px 2px #ff0000, -2px -2px #00ff00; clip-path: inset(20% 0 40% 0); }
          75% { text-shadow: -1px -1px #ff0000, 1px 1px #00ff00; clip-path: inset(60% 0 10% 0); }
          100% { text-shadow: 1px 0 #ff0000, -1px 0 #00ff00; clip-path: none; }
        }
      `}</style>
    </>
  );
}
