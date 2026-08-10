import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Bug, Gamepad2, KeyRound, Terminal, Trash2, Trophy, Sparkles, Zap, Activity, Languages, Clock, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ACHIEVEMENT_IDS = ['mosca', 'titulo', 'konami', 'matrix', 'navinha', 'root', 'tilt', 'breakout', 'starwars', 'clean', 'polyglot', 'timewalker'];

export const ACHIEVEMENTS_META = {
  mosca: { icon: Bug },
  titulo: { icon: Zap },
  konami: { icon: Trophy },
  matrix: { icon: Sparkles },
  navinha: { icon: Gamepad2 },
  root: { icon: KeyRound },
  tilt: { icon: Activity },
  breakout: { icon: Gamepad2 },
  starwars: { icon: Sparkles },
  clean: { icon: Trash2 },
  polyglot: { icon: Languages },
  timewalker: { icon: Clock },
};

export function dispatchAchievementUnlocked(id) {
  window.dispatchEvent(new CustomEvent('ricardodev-achievement-unlocked', { detail: { id } }));
}

function playUnlockSound() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0.16;
    master.connect(ctx.destination);

    const notes = [660, 880, 1320];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.09;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.9, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
      osc.connect(g).connect(master);
      osc.start(t);
      osc.stop(t + 0.6);
    });
  } catch (e) {}
}

export default function AchievementToast() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(null);
  const queueRef = useRef([]);
  const showingRef = useRef(false);
  const timerRef = useRef(null);

  const showNext = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const next = queueRef.current.shift() || null;
    if (!next) {
      showingRef.current = false;
      setCurrent(null);
      return;
    }
    setCurrent(next);
    showingRef.current = true;
    playUnlockSound();
    timerRef.current = setTimeout(showNext, 4600);
  };

  const handleDismiss = () => {
    showNext();
  };

  useEffect(() => {
    const handle = (e) => {
      const meta = ACHIEVEMENTS_META[e.detail?.id];
      if (!meta) return;
      queueRef.current.push({
        id: e.detail.id,
        keyId: `${e.detail.id}-${Date.now()}`,
        title: t(`achievements.meta.${e.detail.id}.title`),
        description: t(`achievements.meta.${e.detail.id}.description`),
        Icon: meta.icon,
      });
      if (!showingRef.current) showNext();
    };

    window.addEventListener('ricardodev-achievement-unlocked', handle);
    return () => {
      window.removeEventListener('ricardodev-achievement-unlocked', handle);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  return (
    <AnimatePresence mode="wait">
      {current && (
        <motion.div
          key={current.keyId || current.id}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="achv-toast fixed top-4 right-4 z-[9999999] w-80 sm:w-96"
          role="status"
          aria-live="polite"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#00ff88]/40 bg-[#050d08]/95 backdrop-blur-md shadow-[0_0_35px_rgba(0,255,136,0.25),0_10px_30px_rgba(0,0,0,0.6)]">
            {/* Progress bar */}
            <div
              key={`bar-${current.keyId || current.id}`}
              className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[#00ff88] to-[#00f2fe]"
              style={{ width: '100%', transformOrigin: 'left', animation: 'achvProgress 4.2s linear forwards' }}
            />

            <div className="flex items-center gap-3.5 p-4">
              {/* Trophy icon with glow */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#00ff88]/30 blur-lg" />
                <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#0c2e17] to-[#06200e] border border-[#00ff88]/50 flex items-center justify-center">
                  {(() => {
                    const Icon = current.Icon;
                    return <Icon className="w-5 h-5 text-[#00ff88]" />;
                  })()}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] text-[#00ff88]/80 uppercase mb-0.5">
                  <Award className="w-3 h-3" />
                  {t('achievements.toastLabel')}
                </p>
                <h4 className="text-sm font-bold text-white truncate leading-tight">
                  {current.title}
                </h4>
                <p className="text-[11px] text-slate-400 font-light leading-snug mt-0.5 line-clamp-2">
                  {current.description}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <style>{`
        @keyframes achvProgress {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </AnimatePresence>
  );
}