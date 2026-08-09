import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import HeroCanvas from './components/HeroCanvas';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import StatsSection from './components/StatsSection';
import TimelineSection from './components/TimelineSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ProjectModal from './components/ProjectModal';
import AllProjectsModal from './components/AllProjectsModal';
import AllSkillsModal from './components/AllSkillsModal';
import AllCertificatesModal from './components/AllCertificatesModal';
import ExperienceSection from './components/ExperienceSection';
import LeadershipSection from './components/LeadershipSection';
import CertificatesSection from './components/CertificatesSection';
import BooksSection from './components/BooksSection';
import BookModal from './components/BookModal';
import AchievementsSection from './components/AchievementsSection';
import AchievementsModal from './components/AchievementsModal';
import TerminalSection from './components/TerminalSection';
import TechLabSection from './components/TechLabSection';
import EasterEggModal from './components/EasterEggModal';
import BreakoutOverlay from './components/BreakoutOverlay';
import StarWarsCrawlOverlay from './components/StarWarsCrawlOverlay';
import Retro1999Overlay from './components/Retro1999Overlay';
import TimeTravelAnimation from './components/TimeTravelAnimation';
import AchievementToast, { dispatchAchievementUnlocked } from './components/AchievementToast';
import { Trash2, RotateCcw } from 'lucide-react';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [allProjectsOpen, setAllProjectsOpen] = useState(false);
  const [allCertificatesOpen, setAllCertificatesOpen] = useState(false);
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);
  const [allSkillsOpen, setAllSkillsOpen] = useState(false);
  const [breakoutGameOpen, setBreakoutGameOpen] = useState(false);
  const [starWarsOpen, setStarWarsOpen] = useState(false);
  const [retro1999Open, setRetro1999Open] = useState(false);
  const [siteCleaned, setSiteCleaned] = useState(false);
  const [timeTravelMode, setTimeTravelMode] = useState(null); // 'TO_PAST' | 'TO_FUTURE' | null
  // Global light/dark theme — applies `theme-light` class on <html>.
  // Defaults: theme salvo pelo usuário > sistema (claro se for dia ou o SO
  // for claro), com o botão do header sempre disponível para trocar.
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('ricardodev_theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {}
    const prefersLight = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;
    return isDay || prefersLight ? 'light' : 'dark';
  });

  // Global light/dark theme — applies `theme-light` class on <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('theme-light', theme === 'light');
    root.style.colorScheme = theme === 'light' ? 'light' : 'dark';
    try {
      localStorage.setItem('ricardodev_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const handleStartTimewalker = () => {
    setTimeTravelMode('TO_PAST');
  };

  const handleReturnFrom1999 = () => {
    setRetro1999Open(false);
    setTimeTravelMode('TO_FUTURE');
  };
  const [selectedBook, setSelectedBook] = useState(null);
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [matrixCanvasMode, setMatrixCanvasMode] = useState(false);

  // Preserve and restore exact scroll position on page reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
    }

    const savedPos = sessionStorage.getItem('portfolioScrollPos');
    if (savedPos !== null) {
      const pos = parseInt(savedPos, 10);
      setTimeout(() => {
        window.scrollTo(0, pos);
      }, 50);
    }

    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        sessionStorage.setItem('portfolioScrollPos', window.scrollY.toString());
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Global Secret Listeners: Konami Code & typing "matrix" anywhere
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let konamiIndex = 0;

    const matrixWord = ['m', 'a', 't', 'r', 'i', 'x'];
    let matrixIndex = 0;

    const breakoutWord = ['b', 'r', 'e', 'a', 'k', 'o', 'u', 't'];
    let breakoutIndex = 0;

    const handleKeyDown = (e) => {
      const targetTag = e.target?.tagName?.toLowerCase();
      const isInput = targetTag === 'input' || targetTag === 'textarea' || e.target?.isContentEditable;

      if (!isInput) {
        if (e.key === konamiCode[konamiIndex]) {
          konamiIndex++;
          if (konamiIndex === konamiCode.length) {
            triggerEasterEgg();
            konamiIndex = 0;
          }
        } else {
          konamiIndex = 0;
        }

        if (e.key.toLowerCase() === matrixWord[matrixIndex]) {
          matrixIndex++;
          if (matrixIndex === matrixWord.length) {
            triggerMatrixOnly();
            try {
              const saved = JSON.parse(localStorage.getItem('ricardodev_achievements') || '[]');
              if (!saved.includes('matrix')) {
                saved.push('matrix');
                localStorage.setItem('ricardodev_achievements', JSON.stringify(saved));
                dispatchAchievementUnlocked('matrix');
              }
            } catch {}
            matrixIndex = 0;
          }
        } else {
          matrixIndex = 0;
        }

        if (e.key.toLowerCase() === breakoutWord[breakoutIndex]) {
          breakoutIndex++;
          if (breakoutIndex === breakoutWord.length) {
            setBreakoutGameOpen(true);
            try {
              const saved = JSON.parse(localStorage.getItem('ricardodev_achievements') || '[]');
              if (!saved.includes('breakout')) {
                saved.push('breakout');
                localStorage.setItem('ricardodev_achievements', JSON.stringify(saved));
                dispatchAchievementUnlocked('breakout');
              }
            } catch {}
            breakoutIndex = 0;
          }
        } else {
          breakoutIndex = 0;
        }

        const starWarsWord = ['s', 't', 'a', 'r', 'w', 'a', 'r', 's'];
        let starWarsIndex = 0;

        if (e.key.toLowerCase() === starWarsWord[starWarsIndex]) {
          starWarsIndex++;
          if (starWarsIndex === starWarsWord.length) {
            setStarWarsOpen(true);
            try {
              const saved = JSON.parse(localStorage.getItem('ricardodev_achievements') || '[]');
              if (!saved.includes('starwars')) {
                saved.push('starwars');
                localStorage.setItem('ricardodev_achievements', JSON.stringify(saved));
                dispatchAchievementUnlocked('starwars');
              }
            } catch {}
            starWarsIndex = 0;
          }
        } else {
          starWarsIndex = 0;
        }

        const cleanWord = ['c', 'l', 'e', 'a', 'n'];
        let cleanIndex = 0;

        if (e.key.toLowerCase() === cleanWord[cleanIndex]) {
          cleanIndex++;
          if (cleanIndex === cleanWord.length) {
            setSiteCleaned(true);
            try {
              const saved = JSON.parse(localStorage.getItem('ricardodev_achievements') || '[]');
              if (!saved.includes('clean')) {
                saved.push('clean');
                localStorage.setItem('ricardodev_achievements', JSON.stringify(saved));
                dispatchAchievementUnlocked('clean');
              }
            } catch {}
            cleanIndex = 0;
          }
        } else {
          cleanIndex = 0;
        }

        if (e.key === 'Escape') {
          setSiteCleaned(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerEasterEgg = () => {
    setEasterEggOpen(true);
    setMatrixCanvasMode(true);
    try {
      const saved = JSON.parse(localStorage.getItem('ricardodev_achievements') || '[]');
      if (!saved.includes('konami')) {
        saved.push('konami');
        localStorage.setItem('ricardodev_achievements', JSON.stringify(saved));
        dispatchAchievementUnlocked('konami');
      }
    } catch {}
  };

  const triggerMatrixOnly = () => {
    setMatrixCanvasMode(true);
    setTimeout(() => setMatrixCanvasMode(false), 10000);
  };

  const closeEasterEgg = () => {
    setEasterEggOpen(false);
    setTimeout(() => setMatrixCanvasMode(false), 5000);
  };

  return (
    <div className={`relative min-h-screen font-sans selection:bg-[#00ff88] selection:text-black ${theme === 'light' ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#040705] text-slate-100'}`}>
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Dynamic Particle / Matrix Background Canvas */}
      <HeroCanvas matrixMode={matrixCanvasMode} theme={theme} />

      {/* Floating Header Navbar */}
      <div className={`transition-opacity duration-500 ${siteCleaned ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Navbar
          onTriggerEasterEgg={triggerEasterEgg}
          onOpenTerminal={() => setTerminalModalOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      </div>

      {/* Main Experience Layout */}
      <main className={`relative z-10 space-y-12 transition-opacity duration-500 ${siteCleaned ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <TimelineSection />
        <SkillsSection onOpenAllSkills={() => setAllSkillsOpen(true)} />
        <ProjectsSection
          onSelectProject={setSelectedProject}
          onOpenAllProjects={() => setAllProjectsOpen(true)}
        />
        <ExperienceSection />
        <LeadershipSection />
        <CertificatesSection onOpenAllCertificates={() => setAllCertificatesOpen(true)} />
        <BooksSection onSelectBook={setSelectedBook} />
      </main>

      <div className={`transition-opacity duration-500 ${siteCleaned ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <TechLabSection />
        <ContactSection />
        <Footer />
      </div>

      {/* Floating Clean Mode Active Banner */}
      {siteCleaned && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] px-6 py-3.5 rounded-2xl bg-[#06140d]/95 border border-[#00ff88]/50 text-white font-mono text-xs shadow-glow-lg flex items-center gap-4 animate-bounce">
          <span className="flex items-center gap-2 text-[#00ff88]">
            <Trash2 className="w-4 h-4 text-[#00ff88]" />
            <span>{t('cleanBanner.active')}</span>
          </span>
          <button
            onClick={() => setSiteCleaned(false)}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#059669] to-[#00ff88] text-black font-extrabold flex items-center gap-1.5 hover:scale-105 transition-all cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('cleanBanner.restore')} (ESC)</span>
          </button>
        </div>
      )}

      {/* Breakout Arcade Fullscreen Game Overlay */}
      <BreakoutOverlay
        isOpen={breakoutGameOpen}
        onClose={() => setBreakoutGameOpen(false)}
      />

      {/* Star Wars 3D Crawl Easter Egg Overlay */}
      <StarWarsCrawlOverlay
        isOpen={starWarsOpen}
        onClose={() => setStarWarsOpen(false)}
      />

      {/* Catálogo Completo de Tecnologias & Conhecimentos (Renderizado no nível raiz z-[999]) */}
      <AllSkillsModal
        isOpen={allSkillsOpen}
        onClose={() => setAllSkillsOpen(false)}
      />

      {/* Galeria Completa de Certificações (Renderizada no nível raiz z-[999]) */}
      <AllCertificatesModal
        isOpen={allCertificatesOpen}
        onClose={() => setAllCertificatesOpen(false)}
      />

      {/* Galeria Completa de Projetos (Renderizada no nível raiz z-[999]) */}
      <AllProjectsModal
        isOpen={allProjectsOpen}
        onClose={() => setAllProjectsOpen(false)}
        onSelectProject={(proj) => {
          setAllProjectsOpen(false);
          setSelectedProject(proj);
        }}
      />

      {/* Case Study Detail Modal (Renderizado no nível raiz z-[1000]) */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Book Detail Modal (Rendered at top z-index root level) */}
      <BookModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      {/* Secret Easter Egg Unlocked Modal */}
      <EasterEggModal
        isOpen={easterEggOpen}
        onClose={closeEasterEgg}
      />

      {/* Retro 1999 Web 1.0 Experience Overlay */}
      <Retro1999Overlay
        isOpen={retro1999Open}
        onClose={handleReturnFrom1999}
      />

      {/* Back to the Future DeLorean Time Travel Animation */}
      <TimeTravelAnimation
        mode={timeTravelMode}
        onComplete={() => {
          if (timeTravelMode === 'TO_PAST') {
            setRetro1999Open(true);
          }
          setTimeTravelMode(null);
        }}
      />

      {/* Standalone Exclusive Terminal CLI & Easter Eggs Fullscreen Sandbox */}
      {terminalModalOpen && (
        <TerminalSection
          isModal={true}
          onClose={() => setTerminalModalOpen(false)}
          onTriggerEasterEgg={() => {
            setTerminalModalOpen(false);
            triggerMatrixOnly();
          }}
          onTriggerBreakout={() => {
            setTerminalModalOpen(false);
            setBreakoutGameOpen(true);
          }}
          onTriggerStarWars={() => {
            setTerminalModalOpen(false);
            setStarWarsOpen(true);
          }}
          onTriggerClean={() => {
            setTerminalModalOpen(false);
            setSiteCleaned(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onRestoreClean={() => setSiteCleaned(false)}
          onTriggerTimewalker={() => {
            setTerminalModalOpen(false);
            setTimeTravelMode('TO_PAST');
          }}
        />
      )}

      {/* PC-style Achievement Unlock Notification */}
      <AchievementToast />
    </div>
  );
}
