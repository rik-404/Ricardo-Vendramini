import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Settings, Sun, Moon, Terminal, Globe, MoveRight } from 'lucide-react';
import { dispatchAchievementUnlocked } from './AchievementToast';
import { useLanguage } from '../context/LanguageContext';

/* ---------------------------------------------------------------- *
 *  Minimalist Utilities — reusable controls inside the "gaveta"
 * ---------------------------------------------------------------- */

function LanguageSegmented() {
  const { lang, toggleLang, t } = useLanguage();
  const isPt = lang === 'pt';

  return (
    <div
      className="flex items-center rounded-xl hdr-glass-ring hdr-util-row"
      role="group"
      aria-label={t('nav.langTitle')}
    >
      <button
        onClick={toggleLang}
        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
          isPt ? 'hdr-util-active-pt' : 'hdr-util-idle'
        }`}
      >
        <span>🇧🇷</span>
        <span>PT</span>
      </button>
      <button
        onClick={toggleLang}
        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
          !isPt ? 'hdr-util-active-en' : 'hdr-util-idle'
        }`}
      >
        <span>EN</span>
        <span>🇺🇸</span>
      </button>
    </div>
  );
}

function ThemeRow({ headerLight, onToggle }) {
  const { t } = useLanguage();
  return (
    <button
      onClick={onToggle}
      className="hdr-util-row w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
      title={t('nav.themeAria')}
      aria-label={t('nav.themeAria')}
    >
      <span className="flex items-center gap-2.5">
        {headerLight ? <Sun className="w-4 h-4 hdr-util-icon" /> : <Moon className="w-4 h-4 hdr-util-icon" />}
        <span className="text-xs font-medium hdr-util-label">{t('nav.theme')}</span>
      </span>
      <span className={`relative w-9 h-5 rounded-full p-0.5 flex items-center transition-colors hdr-theme-track ${headerLight ? 'hdr-theme-track-on' : ''}`}>
        <span
          className={`w-4 h-4 rounded-full shadow transition-transform duration-300 ${
            headerLight ? 'translate-x-4 bg-white' : 'translate-x-0 bg-[#00ff88] shadow-[0_0_8px_#00ff88]'
          }`}
        />
      </span>
    </button>
  );
}

function CliRow({ onOpenTerminal }) {
  const { t } = useLanguage();
  return (
    <button
      onClick={() => {
        if (onOpenTerminal) onOpenTerminal();
      }}
      className="hdr-util-row w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
      title={t('nav.openCli')}
    >
      <span className="flex items-center gap-2.5">
        <Terminal className="w-4 h-4 text-[#00ff88]" />
        <span className="text-xs font-mono font-bold hdr-util-label">
          <span className="text-[#00ff88]">&gt;_</span> CLI
        </span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse shadow-glow-sm" />
        <MoveRight className="w-3.5 h-3.5 hdr-util-icon" />
      </span>
    </button>
  );
}

/* ---------------------------------------------------------------- *
 *  Main Navbar — minimal 3-zone header (Vercel / Linear style)
 * ---------------------------------------------------------------- */

const anchorSections = ['about', 'projects', 'experience', 'contact'];

export default function Navbar({ onTriggerEasterEgg, onOpenTerminal, theme, onToggleTheme }) {
  const { lang, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [utilitiesOpen, setUtilitiesOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  const headerLight = theme === 'light';

  const utilitiesRef = useRef(null);
  const clickTimerRef = useRef(null);

  const navLinks = [
    { key: 'about', label: t('nav.about'), href: '#about' },
    { key: 'projects', label: t('nav.projects'), href: '#projects' },
    { key: 'trajectory', label: t('nav.trajectory'), href: '#experience' },
    { key: 'contact', label: t('nav.contact'), href: '#contact' },
  ];

  const [glitchPhase, setGlitchPhase] = useState(0); // 0=normal, 1=glitching, 2=broken, 3=bsod, 4=recovering

  // Scroll-spy for the essential anchor sections
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const scrollPos = window.scrollY + 160;
      let current = '';
      for (let i = anchorSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(anchorSections[i]);
        if (el && el.offsetTop <= scrollPos) {
          current = anchorSections[i];
          break;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close utilities drawer on outside click / Escape
  useEffect(() => {
    const handleClick = (e) => {
      if (utilitiesRef.current && !utilitiesRef.current.contains(e.target)) {
        setUtilitiesOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setUtilitiesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const openCli = () => {
    setUtilitiesOpen(false);
    if (onOpenTerminal) {
      onOpenTerminal();
    } else {
      const elem = document.getElementById('terminal');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e) => {
    if (glitchPhase > 0) return;

    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => setLogoClicks(0), 2000);

    if (nextCount >= 7) {
      e.preventDefault();
      setLogoClicks(0);
      triggerGlitchSequence();
    }
  };

  const triggerGlitchSequence = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('ricardodev_achievements') || '[]');
      if (!saved.includes('titulo')) {
        saved.push('titulo');
        localStorage.setItem('ricardodev_achievements', JSON.stringify(saved));
        dispatchAchievementUnlocked('titulo');
      }
    } catch {}

    setGlitchPhase(1);
    setTimeout(() => setGlitchPhase(2), 800);
    setTimeout(() => setGlitchPhase(3), 1800);
    setTimeout(() => setGlitchPhase(4), 5500);
    setTimeout(() => setGlitchPhase(0), 7000);
  };

  const renderBrandText = () => {
    if (glitchPhase === 0) {
      return (
        <span className="font-sans text-sm sm:text-base tracking-wider font-extrabold flex items-center gap-1.5 hdr-text-primary">
          RICARDO<span className="text-gradient-green">.DEV</span>
        </span>
      );
    }
    if (glitchPhase === 1) {
      return (
        <span className="font-sans text-sm sm:text-base tracking-wider font-extrabold flex items-center gap-1.5 animate-glitch-text">
          R̷I̸C̶A̵R̸D̷O<span className="text-red-500">.D̵̡̛E̸V̶̢</span>
        </span>
      );
    }
    if (glitchPhase === 2) {
      return (
        <span className="font-sans text-sm sm:text-base tracking-wider font-extrabold flex items-center gap-1">
          <span className="inline-block rotate-[-8deg] text-red-500 translate-y-1">R̷I̸C̶</span>
          <span className="inline-block rotate-[12deg] text-yellow-500 -translate-y-2 translate-x-1">A̵R̸</span>
          <span className="inline-block rotate-[-5deg] text-red-400 translate-y-3">D̷O</span>
          <span className="inline-block rotate-[20deg] text-red-600 -translate-y-3 translate-x-2">.D̶E̵V̷</span>
        </span>
      );
    }
    return (
      <span className="font-sans text-sm sm:text-base tracking-wider font-extrabold text-red-500">
        {t('nav.bsod.fatal')}
      </span>
    );
  };

  /* Applies accent-on-dark or accent-on-light heading depending on glitch */
  const statusDotActive = glitchPhase === 0 || glitchPhase === 4;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 chpw-header ${
          headerLight ? 'chpw-header-light' : ''
        } ${scrolled ? 'chpw-header-scrolled' : 'chpw-header-top'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* ── ZONE 1 · Identity & status ─────────────────────── */}
          <a
            href="#hero"
            onClick={handleLogoClick}
            onMouseEnter={() => {
              if (glitchPhase === 0) {
                window.dispatchEvent(new CustomEvent('glove-cursor', { detail: true }));
              }
            }}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('glove-cursor', { detail: false }))}
            className={`group flex items-center gap-2.5 shrink-0 select-none cursor-pointer ${
              glitchPhase === 1 ? 'animate-glitch-shake' : ''
            }`}
            title={t('nav.brand')}
          >
            <div
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                glitchPhase > 0 && glitchPhase < 4
                  ? 'border-red-500/60 rotate-12 scale-110'
                  : 'border-[#00f2fe]/40 group-hover:border-[#00ff88] group-hover:scale-105'
              }`}
            >
              <span
                className={`text-sm font-black tracking-tight ${
                  glitchPhase > 0 && glitchPhase < 4
                    ? 'text-red-500'
                    : 'text-gradient-green drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]'
                }`}
              >
                RV
              </span>
            </div>

            <div className="flex flex-col min-w-0 leading-tight">
              {renderBrandText()}
              {/* Online status — subtle availability indicator */}
              <span
                className={`inline-flex items-center gap-1.5 mt-0.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider hdr-text-muted`}
                title={t('nav.statusOnline')}
              >
                <span className={`relative flex w-1.5 h-1.5 ${statusDotActive ? 'hdr-status-on' : 'hdr-status-off'}`}>
                  <span className={`absolute inline-flex h-full w-full rounded-full ${statusDotActive ? 'hdr-status-ping' : ''}`} />
                  <span className={`relative inline-flex rounded-full w-1.5 h-1.5 ${statusDotActive ? 'hdr-status-core' : ''}`} />
                </span>
                <span className="hidden sm:inline">{t('nav.status')}</span>
              </span>
            </div>
          </a>

          {/* ── ZONE 2 · Essential navigation (desktop) ────────── */}
          <nav className="hidden lg:flex items-center gap-0.5 hdr-glass px-1.5 py-1 rounded-full">
            {navLinks.map((item) => {
              const isActive = activeSection === item.key;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className={`nav-link relative px-3 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 rounded-full ${
                    isActive ? 'nav-link-active' : ''
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-[#00f2fe] via-[#10b981] to-[#00ff88] rounded-full shadow-glow-sm" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── ZONE 3 · Actions & utilities (right) ───────────── */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#00f2fe] via-[#10b981] to-[#00ff88] text-black shadow-glow-sm hover:shadow-glow-md transition-all transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
            >
              {t('nav.contactBtn')}
              <MoveRight className="w-3.5 h-3.5" />
            </a>

            {/* Compact utilities "gaveta" */}
            <div className="relative" ref={utilitiesRef}>
              <button
                onClick={() => setUtilitiesOpen((o) => !o)}
                className={`hdr-btn-ghost p-2 rounded-xl transition-all cursor-pointer select-none ${
                  utilitiesOpen ? 'chpw-util-open' : ''
                }`}
                aria-label={t('nav.utilities')}
                title={t('nav.utilities')}
              >
                <Settings className="w-4 h-4 hdr-util-icon transition-transform duration-300" style={{ transform: utilitiesOpen ? 'rotate(45deg)' : 'none' }} />
              </button>

              {utilitiesOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 chpw-drawer rounded-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-150 shadow-xl">
                  <p className="px-3 pt-1.5 pb-1 text-[10px] font-mono uppercase tracking-widest hdr-drawer-label">
                    {t('nav.preferences')}
                  </p>

                  <LanguageSegmented />

                  <div className="mt-1.5">
                    <ThemeRow headerLight={headerLight} onToggle={onToggleTheme} />
                  </div>

                  <div className="my-1.5 border-t hdr-drawer-divider" />

                  <CliRow onOpenTerminal={openCli} />

                  {/* Online status inside the drawer */}
                  <div className="mt-1.5 px-3 py-2.5 rounded-xl hdr-util-row flex items-center gap-2.5">
                    <span className={`relative flex w-2 h-2 ${statusDotActive ? 'hdr-status-on' : 'hdr-status-off'}`}>
                      <span className={`absolute inline-flex h-full w-full rounded-full ${statusDotActive ? 'hdr-status-ping' : ''}`} />
                      <span className={`relative inline-flex rounded-full w-2 h-2 ${statusDotActive ? 'hdr-status-core' : ''}`} />
                    </span>
                    <span className="text-xs font-medium hdr-util-label">{t('nav.statusOnline')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className={`lg:hidden hdr-btn-ghost p-2 rounded-xl transition-colors cursor-pointer select-none`}
              aria-label={t('nav.menuAria')}
            >
              {mobileOpen ? <X className="w-4 h-4 hdr-util-icon" /> : <Menu className="w-4 h-4 hdr-util-icon" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer — essential links + CTA */}
        {mobileOpen && (
          <div className="lg:hidden chpw-drawer border-t hdr-drawer-divider px-6 py-5 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 px-4 rounded-lg text-sm font-medium nav-link transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="pt-4 mt-3 border-t hdr-drawer-divider">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#00ff88] text-black font-bold text-sm cursor-pointer"
              >
                {t('nav.contactBtn')}
                <MoveRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* BSOD / Cyberpunk Crash Error Overlay - Phase 3 */}
      {glitchPhase === 3 && (
        <div className="chpw-theme-dark fixed inset-0 z-[99999] flex items-center justify-center p-4" style={{ animation: 'bsodFlash 0.3s ease-out' }}>
          <div className="absolute inset-0 bg-[#040705]/95 backdrop-blur-2xl" />
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.06) 2px, rgba(0,255,136,0.06) 4px)',
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.12)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative text-center px-6 sm:px-8 py-8 sm:py-10 max-w-2xl mx-auto font-mono z-10 glass-card rounded-3xl border border-[#00ff88]/40 shadow-[0_0_80px_rgba(0,255,136,0.25)] bg-[#050c08]/90">
            <div className="text-6xl sm:text-8xl font-extrabold text-[#ff4d4d] mb-6 drop-shadow-[0_0_25px_rgba(255,77,77,0.8)] animate-pulse">:(</div>
            <p className="text-slate-100 text-sm sm:text-base mb-3 leading-relaxed font-bold">{t('nav.bsod.title')}</p>
            <p className="text-slate-400 text-xs sm:text-sm mb-6 font-light leading-relaxed">{t('nav.bsod.subtitle')}</p>
            <div className="w-64 h-2 mx-auto rounded-full bg-slate-900 mb-3 overflow-hidden border border-[#00ff88]/30">
              <div className="h-full bg-gradient-to-r from-[#00f2fe] via-[#10b981] to-[#00ff88] rounded-full shadow-[0_0_15px_rgba(0,255,136,0.8)]" style={{ animation: 'bsodProgress 3.5s ease-in-out forwards' }} />
            </div>
            <p className="text-[#00ff88] text-xs mb-6 font-mono font-bold">{t('nav.bsod.progress')}</p>
            <div className="text-left bg-black/60 p-4 rounded-xl border border-white/10 text-[11px] sm:text-xs space-y-1 mb-6 font-mono">
              <p className="text-red-400"><span className="text-slate-500">{t('nav.bsod.stopLabel')}</span> {t('nav.bsod.stopValue')}</p>
              <p className="text-cyan-400"><span className="text-slate-500">{t('nav.bsod.moduleLabel')}</span> {t('nav.bsod.moduleValue')}</p>
              <p className="text-emerald-400"><span className="text-slate-500">{t('nav.bsod.statusLabel')}</span> {t('nav.bsod.statusValue')}</p>
            </div>
            <div className="bg-[#0c2e17]/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#00ff88]/40 shadow-inner">
              <p className="text-[#00ff88] text-sm font-bold mb-1 flex items-center justify-center gap-1.5">
                <Globe className="w-4 h-4" />
                <span>{t('nav.bsod.joke')}</span>
              </p>
              <p className="text-slate-300 text-xs">{t('nav.bsod.jokeDesc')}</p>
              <p className="text-[#00f2fe] text-[10px] font-mono mt-2 animate-pulse">{t('nav.bsod.restoring')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Recovery flash overlay - Phase 4 */}
      {glitchPhase === 4 && (
        <div className="fixed inset-0 z-[99999] bg-[#00ff88]/20 backdrop-blur-xl pointer-events-none" style={{ animation: 'recoveryFade 1.5s ease-out forwards' }} />
      )}

      {/* Injected CSS — header + glitch keyframes */}
      <style>{`
        /* ---------------------------------------------------------
           Header theme tokens (dark default)
        --------------------------------------------------------- */
        .chpw-header {
          background: rgba(4, 7, 5, 0.55);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .chpw-header-top {
          background: rgba(4, 7, 5, 0.35);
          backdrop-filter: blur(8px);
        }
        .chpw-header-scrolled {
          background: rgba(4, 7, 5, 0.78);
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
          border-bottom: 1px solid rgba(0, 242, 254, 0.12);
        }

        .hdr-text-primary { color: #f8fafc; }
        .hdr-text-muted { color: #94a3b8; }
        .hdr-glass {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
        }
        .nav-link { color: #cbd5e1; }
        .nav-link:hover { background: rgba(255, 255, 255, 0.06); color: #ffffff; }
        .nav-link.nav-link-active { color: #00ff88; font-weight: 700; background: rgba(255, 255, 255, 0.05); }

        .hdr-btn-ghost {
          color: #cbd5e1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .hdr-btn-ghost:hover { background: rgba(255, 255, 255, 0.1); color: #ffffff; }
        .hdr-util-icon { color: #cbd5e1; }
        .hdr-util-label { color: #e2e8f0; }
        .hdr-util-row { background: rgba(255, 255, 255, 0.04); }
        .hdr-util-row:hover { background: rgba(255, 255, 255, 0.08); }
        .hdr-util-idle { color: #94a3b8; background: transparent; }
        .hdr-util-active-pt {
          color: #00ff88; background: rgba(0, 255, 136, 0.12);
          box-shadow: inset 0 0 0 1px rgba(0, 255, 136, 0.4);
        }
        .hdr-util-active-en {
          color: #00f2fe; background: rgba(0, 242, 254, 0.12);
          box-shadow: inset 0 0 0 1px rgba(0, 242, 254, 0.4);
        }
        .hdr-glass-ring { background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); }
        .hdr-theme-track { background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.1); }
        .hdr-theme-track-on { background: rgba(0, 255, 136, 0.55); border-color: rgba(0, 255, 136, 0.4); }
        .chpw-header.chpw-header-light .hdr-theme-track-on { background: rgba(16, 185, 129, 0.45); border-color: rgba(16, 185, 129, 0.5); }

        .chpw-drawer {
          background: rgba(7, 12, 9, 0.92);
          border: 1px solid rgba(0, 255, 136, 0.18);
          backdrop-filter: blur(24px);
        }
        .hdr-drawer-label { color: #64748b; }
        .hdr-drawer-divider { border-color: rgba(255, 255, 255, 0.08); }
        .chpw-util-open { background: rgba(0, 255, 136, 0.12); color: #00ff88; border-color: rgba(0, 255, 136, 0.4); }
        .chpw-util-open .hdr-util-icon { color: #00ff88; }

        .hdr-status-on .hdr-status-core { background: #00ff88; box-shadow: 0 0 8px #00ff88; }
        .hdr-status-on .hdr-status-ping { background: #00ff88; opacity: 0.5; animation: statusPing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .hdr-status-off .hdr-status-core { background: #ef4444; box-shadow: 0 0 8px #ef4444; }

        /* ---------------------------------------------------------
           Light theme (affects only this header)
        --------------------------------------------------------- */
        .chpw-header.chpw-header-light {
          background: rgba(255, 255, 255, 0.72);
          border-bottom-color: rgba(15, 23, 42, 0.08);
        }
        .chpw-header.chpw-header-light.chpw-header-scrolled {
          background: rgba(255, 255, 255, 0.82);
          box-shadow: 0 8px 30px rgba(15, 23, 42, 0.08);
          border-bottom-color: rgba(15, 23, 42, 0.1);
        }
        .chpw-header.chpw-header-light .hdr-text-primary { color: #0f172a; }
        .chpw-header.chpw-header-light .hdr-text-muted { color: #475569; }
        .chpw-header.chpw-header-light .hdr-glass { background: rgba(15, 23, 42, 0.04); border-color: rgba(15, 23, 42, 0.08); }
        .chpw-header.chpw-header-light .nav-link { color: #475569; }
        .chpw-header.chpw-header-light .nav-link:hover { background: rgba(15, 23, 42, 0.05); color: #0f172a; }
        .chpw-header.chpw-header-light .nav-link.nav-link-active { color: #047857; background: rgba(16, 185, 129, 0.1); }
        .chpw-header.chpw-header-light .hdr-btn-ghost { color: #334155; background: rgba(15, 23, 42, 0.04); border-color: rgba(15, 23, 42, 0.12); }
        .chpw-header.chpw-header-light .hdr-btn-ghost:hover { background: rgba(15, 23, 42, 0.08); color: #0f172a; }
        .chpw-header.chpw-header-light .hdr-util-icon { color: #475569; }
        .chpw-header.chpw-header-light .hdr-util-label { color: #1e293b; }
        .chpw-header.chpw-header-light .hdr-util-row,
        .chpw-header.chpw-header-light .hdr-glass-ring { background: rgba(15, 23, 42, 0.04); border-color: rgba(15, 23, 42, 0.1); }
        .chpw-header.chpw-header-light .hdr-util-row:hover { background: rgba(15, 23, 42, 0.08); }
        .chpw-header.chpw-header-light .hdr-util-idle { color: #64748b; }
        .chpw-header.chpw-header-light .hdr-theme-track { background: rgba(15, 23, 42, 0.12); border-color: rgba(15, 23, 42, 0.1); }
        .chpw-header.chpw-header-light .chpw-drawer {
          background: rgba(255, 255, 255, 0.92);
          border-color: rgba(15, 23, 42, 0.1);
        }
        .chpw-header.chpw-header-light .hdr-drawer-label { color: #64748b; }
        .chpw-header.chpw-header-light .hdr-drawer-divider { border-color: rgba(15, 23, 42, 0.1); }

        /* ---------------------------------------------------------
           Animations
        --------------------------------------------------------- */
        @keyframes statusPing {
          0% { transform: scale(1); opacity: 0.6; }
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
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
        .animate-glitch-shake { animation: glitchShake 0.1s infinite; }
        @keyframes glitchShake {
          0% { transform: translate(0); }
          25% { transform: translate(-3px, 2px); }
          50% { transform: translate(2px, -1px); }
          75% { transform: translate(-1px, -2px); }
          100% { transform: translate(3px, 1px); }
        }
        .animate-glitch-text { animation: glitchText 0.15s infinite; }
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