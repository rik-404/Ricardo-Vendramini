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
import ExperienceSection from './components/ExperienceSection';
import LeadershipSection from './components/LeadershipSection';
import BooksSection from './components/BooksSection';
import BookModal from './components/BookModal';
import AchievementsSection from './components/AchievementsSection';
import TerminalSection from './components/TerminalSection';
import TechLabSection from './components/TechLabSection';
import EasterEggModal from './components/EasterEggModal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [allProjectsOpen, setAllProjectsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [matrixCanvasMode, setMatrixCanvasMode] = useState(false);

  // Force scroll to top on page refresh/load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // Konami Code Secret Listener: ↑ ↑ ↓ ↓ ← → ← → b a
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          triggerEasterEgg();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerEasterEgg = () => {
    setEasterEggOpen(true);
    setMatrixCanvasMode(true);
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
        <SkillsSection />
        <ProjectsSection
          onSelectProject={setSelectedProject}
          onOpenAllProjects={() => setAllProjectsOpen(true)}
        />
        <ExperienceSection />
        <LeadershipSection />
        <BooksSection onSelectBook={setSelectedBook} />
        <AchievementsSection />
        <TerminalSection onTriggerEasterEgg={triggerEasterEgg} />
        <TechLabSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

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
    </div>
  );
}
