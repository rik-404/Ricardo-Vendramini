import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';
import { personalInfo, projectsData, skillsData } from '../data/portfolioData';
import { dispatchAchievementUnlocked } from './AchievementToast';
import { useLanguage } from '../context/LanguageContext';

export default function StarWarsCrawlOverlay({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [phase, setPhase] = useState('INTRO'); // INTRO | LOGO | CRAWL
  const [soundEnabled, setSoundEnabled] = useState(true);
  const soundEnabledRef = useRef(soundEnabled);
  const audioCtxRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  const unlockAchievementOnce = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('ricardodev_achievements') || '[]');
      if (!saved.includes('starwars')) {
        saved.push('starwars');
        localStorage.setItem('ricardodev_achievements', JSON.stringify(saved));
        dispatchAchievementUnlocked('starwars');
      }
    } catch {}
  };

  const playStarWarsFanfare = () => {
    if (!soundEnabledRef.current) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new Ctx();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const notes = [
        { f: 293.66, t: 0, d: 0.25 }, // D4
        { f: 293.66, t: 0.25, d: 0.25 }, // D4
        { f: 293.66, t: 0.5, d: 0.25 }, // D4
        { f: 392.00, t: 0.75, d: 0.8 }, // G4
        { f: 587.33, t: 1.6, d: 0.8 }, // D5
        { f: 523.25, t: 2.5, d: 0.2 }, // C5
        { f: 493.88, t: 2.75, d: 0.2 }, // B4
        { f: 440.00, t: 3.0, d: 0.2 }, // A4
        { f: 783.99, t: 3.25, d: 0.8 }, // G5
      ];

      notes.forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now + t);
        gain.gain.setValueAtTime(0.2, now + t);
        gain.gain.exponentialRampToValueAtTime(0.01, now + t + d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + d);
      });
    } catch (e) {}
  };

  // Realistic Starfield Animation (Twinkling Round Stars)
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const numStars = 160;
    const stars = [];
    const colors = ['#ffffff', '#00ff88', '#00f2fe', '#ffe81f'];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        delta: Math.random() * 0.02 * (Math.random() > 0.5 ? 1 : -1)
      });
    }

    const renderStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.alpha += star.delta;
        if (star.alpha <= 0.2 || star.alpha >= 1) {
          star.delta = -star.delta;
        }

        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.radius * 3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(renderStars);
    };

    rafRef.current = requestAnimationFrame(renderStars);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    unlockAchievementOnce();
    setPhase('INTRO');
    document.body.style.overflow = 'hidden';

    // Timeline sequence
    const t1 = setTimeout(() => {
      setPhase('LOGO');
      playStarWarsFanfare();
    }, 3200);

    const t2 = setTimeout(() => {
      setPhase('CRAWL');
    }, 6200);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  if (!isOpen) return null;

  const overlayContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] bg-[#030604] text-[#00ff88] overflow-hidden font-mono select-none">
        
        {/* Canvas Twinkling Starfield */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none z-0" />

        {/* Ambient Nebula Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00ff88]/10 rounded-full blur-[160px] pointer-events-none" />

        {/* Top Control Bar */}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-full bg-[#06140d]/90 border border-[#00ff88]/50 text-[#00ff88] hover:bg-[#00ff88] hover:text-black transition-all shadow-glow-sm cursor-pointer"
            title={soundEnabled ? t('starwars.soundOff') : t('starwars.soundOn')}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-full bg-[#06140d]/90 border border-[#00ff88]/50 text-[#00ff88] hover:bg-[#00ff88] hover:text-black transition-all flex items-center gap-2 text-xs font-bold shadow-glow-sm cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>{t('starwars.restoreGalaxy')}</span>
          </button>
        </div>

        {/* Phase 1: Intro Text */}
        {phase === 'INTRO' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 flex items-center justify-center p-6 text-center z-10"
          >
            <h3 className="text-xl sm:text-3xl font-bold text-[#00f2fe] tracking-widest leading-relaxed max-w-2xl drop-shadow-[0_0_25px_rgba(0,242,254,0.7)] font-mono">
              {t('starwars.intro')}
            </h3>
          </motion.div>
        )}

        {/* Phase 2: Star Wars Title Logo Smooth Recession */}
        {phase === 'LOGO' && (
          <motion.div
            initial={{ scale: 1.3, opacity: 1 }}
            animate={{ scale: 0.35, opacity: 0 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none z-10"
          >
            <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#00ff88] via-[#00f2fe] to-[#ffe81f] drop-shadow-[0_0_40px_rgba(0,255,136,0.8)]">
              RICARDO.DEV
            </h1>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-widest text-[#00ff88] mt-2">
              {t('starwars.galacticTitle')}
            </h2>
          </motion.div>
        )}

        {/* Phase 3: Smooth 3D Crawl */}
        {phase === 'CRAWL' && (
          <div className="absolute inset-0 flex justify-center overflow-hidden [perspective:420px] z-10">
            <motion.div
              initial={{ y: '85vh', rotateX: 22 }}
              animate={{ y: '-240vh' }}
              transition={{ duration: 60, ease: 'linear' }}
              className="w-full max-w-2xl text-center space-y-12 tracking-wider font-sans font-extrabold px-6 text-[#ffe81f] drop-shadow-[0_0_12px_rgba(255,232,31,0.7)] [transform-origin:50%_100%]"
            >
              <div className="space-y-3 uppercase font-mono">
                <p className="text-2xl sm:text-3xl font-black tracking-widest text-[#00f2fe]">{t('starwars.episode')}</p>
                <h2 className="text-3xl sm:text-5xl font-black text-[#00ff88] tracking-widest">{t('starwars.crawlTitle')}</h2>
              </div>

              <p className="text-lg sm:text-2xl leading-relaxed font-light text-justify">
                {t('starwars.crawlP1')}
              </p>

              <p className="text-lg sm:text-2xl leading-relaxed font-light text-justify">
                {t('starwars.crawlP2').replace('{name}', personalInfo.name).replace('{company}', personalInfo.companyName)}
              </p>

              {/* Skills Section Crawl */}
              <div className="space-y-4 pt-6 border-t border-[#00ff88]/30">
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#00ff88]">{t('starwars.jediSkills')}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm sm:text-lg font-mono">
                  {skillsData.slice(0, 8).map((skill, idx) => (
                    <div key={idx} className="p-3 bg-[#06140d]/80 border border-[#00ff88]/40 rounded-xl text-center text-[#00ff88]">
                      ★ {skill.name} ({skill.level})
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects Crawl */}
              <div className="space-y-4 pt-6 border-t border-[#00ff88]/30">
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#00f2fe]">{t('starwars.iconicProjects')}</h3>
                {projectsData.slice(0, 4).map((proj, idx) => (
                  <div key={idx} className="p-4 bg-[#06140d]/80 border border-[#00f2fe]/40 rounded-2xl text-left space-y-1">
                    <h4 className="text-xl font-bold text-[#00ff88]">{proj.title}</h4>
                    <p className="text-sm text-slate-300 font-light">{proj.shortDescription}</p>
                  </div>
                ))}
              </div>

              <div className="pt-12 text-center space-y-6">
                <p className="text-2xl sm:text-3xl font-black text-white tracking-widest">
                  {t('starwars.finalLine')}
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#059669] via-[#10b981] to-[#00ff88] text-black font-extrabold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-glow-md cursor-pointer"
                >
                  {t('starwars.forceButton')}
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(overlayContent, document.body) : null;
}
