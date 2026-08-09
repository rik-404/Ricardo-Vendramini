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
import AchievementToast, { dispatchAchievementUnlocked } from './components/AchievementToast';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [allProjectsOpen, setAllProjectsOpen] = useState(false);
  const [allSkillsOpen, setAllSkillsOpen] = useState(false);
  const [allCertificatesOpen, setAllCertificatesOpen] = useState(false);
  const [breakoutGameOpen, setBreakoutGameOpen] = useState(false);
  const [achievementsModalOpen, setAchievementsModalOpen] = useState(false);
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
    <div className="relative min-h-screen bg-[#040705] text-slate-100 font-sans selection:bg-[#00ff88] selection:text-black">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Dynamic Particle / Matrix Background Canvas */}
      <HeroCanvas matrixMode={matrixCanvasMode} />

      {/* Floating Header Navbar */}
      <Navbar onTriggerEasterEgg={triggerEasterEgg} />

      {/* Main Experience Layout */}
      <main className="relative z-10 space-y-12">
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
        <AchievementsSection />
        <TerminalSection
          onTriggerEasterEgg={triggerMatrixOnly}
          onOpenAchievements={() => setAchievementsModalOpen(true)}
          onTriggerBreakout={() => setBreakoutGameOpen(true)}
        />
        <TechLabSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Breakout Arcade Fullscreen Game Overlay */}
      <BreakoutOverlay
        isOpen={breakoutGameOpen}
        onClose={() => setBreakoutGameOpen(false)}
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

      {/* Galeria de Conquistas & Segredos (Bloqueadas e Desbloqueadas) */}
      <AchievementsModal
        isOpen={achievementsModalOpen}
        onClose={() => setAchievementsModalOpen(false)}
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

      {/* PC-style Achievement Unlock Notification */}
      <AchievementToast />
    </div>
  );
}
