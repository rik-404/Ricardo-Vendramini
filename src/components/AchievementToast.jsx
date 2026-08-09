import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Bug, Gamepad2, KeyRound, Terminal, Trash2, Trophy, Sparkles, Zap, Activity } from 'lucide-react';

export const ACHIEVEMENTS_META = {
  mosca: {
    title: 'Caçador de Bugs',
    description: 'Elimine a mosquinha que pousou no hero do portfólio.',
    hint: '🔍 Dica: Título parado atrai inseto...',
    icon: Bug,
  },
  titulo: {
    title: 'Tenha raiva de mim',
    description: 'Clique repetidamente no título para forçar uma falha crítica no sistema.',
    hint: '🔍 Dica: Tenha raiva de logos...',
    icon: Zap,
  },
  konami: {
    title: 'Código Konami Clássico',
    description: 'Digite a sequência secreta ↑ ↑ ↓ ↓ ← → ← → B A para ativar o modo místico.',
    hint: '🔍 Dica: Use as setas do teclado para inserir a combinação secreta clássica de videogame...',
    icon: Trophy,
  },
  matrix: {
    title: 'Protocolo Matrix',
    description: 'Digite "matrix" no terminal e veja a chuva de caracteres cair.',
    hint: '🔍 Dica: Acesse o terminal e digite o nome de uma famosa franquia de ficção mística...',
    icon: Sparkles,
  },
  navinha: {
    title: 'Arcade Space Invaders',
    description: 'Inicie "navinha" e defenda o mundo de formas geométricas.',
    hint: '🔍 Dica: Que tal dar um "play"?',
    icon: Gamepad2,
  },
  root: {
    title: 'Acesso Root & Post-it',
    description: 'Obtenha as credenciais de root no terminal.',
    hint: '🔍 Dica: Tente solicitar acesso de superusuário digitando "root" no terminal...',
    icon: KeyRound,
  },
  tilt: {
    title: 'Modo Tilt & Terremoto',
    description: 'Executou o comando "tilt" no terminal e fez toda a estrutura do site balançar.',
    hint: '🔍 Dica: Faça as coisas balançarem no terminal...',
    icon: Activity,
  },
  breakout: {
    title: 'Mestre do Breakout',
    description: 'Ativou o modo Breakout e destruiu os blocos do site com a raquete e a bolinha.',
    hint: '🔍 Dica: Digite o nome do jogo famoso de quebrar tijolos...',
    icon: Gamepad2,
  },
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
  const [current, setCurrent] = useState(null);
  const queueRef = useRef([]);
  const showingRef = useRef(false);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const showNext = () => {
    const next = queueRef.current.shift() || null;
    if (!next) {
      showingRef.current = false;
      setCurrent(null);
      return;
    }
    setCurrent(next);
    showingRef.current = true;
    if (progressRef.current) {
      progressRef.current.style.animation = 'none';
      void progressRef.current.offsetWidth;
      progressRef.current.style.animation = 'achvProgress 4.2s linear forwards';
    }
    playUnlockSound();
    timerRef.current = setTimeout(showNext, 4600);
  };

  useEffect(() => {
    const handle = (e) => {
      const meta = ACHIEVEMENTS_META[e.detail?.id];
      if (!meta) return;
      queueRef.current.push({
        id: e.detail.id,
        title: meta.title,
        description: meta.description,
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
  }, []);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 120, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="fixed top-4 right-4 z-[99999] w-80 sm:w-96 pointer-events-none"
          role="status"
          aria-live="polite"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#00ff88]/40 bg-[#050d08]/95 backdrop-blur-md shadow-[0_0_35px_rgba(0,255,136,0.25),0_10px_30px_rgba(0,0,0,0.6)]">
            {/* Progress bar */}
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[#00ff88] to-[#00f2fe]"
              style={{ width: '100%', transformOrigin: 'left', animation: 'achvProgress 4.2s linear forwards' }}
            />

            <div className="flex items-center gap-4 p-4">
              {/* Trophy icon with glow */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#00ff88]/30 blur-lg" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#0c2e17] to-[#06200e] border border-[#00ff88]/50 flex items-center justify-center">
                  {(() => {
                    const Icon = current.Icon;
                    return <Icon className="w-6 h-6 text-[#00ff88]" />;
                  })()}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] text-[#00ff88]/80 uppercase mb-0.5">
                  <Award className="w-3 h-3" />
                  Conquista desbloqueada
                </p>
                <h4 className="text-sm font-bold text-white truncate leading-tight">
                  {current.title}
                </h4>
                <p className="text-[11px] text-slate-400 font-light leading-snug mt-0.5 line-clamp-2">
                  {current.description}
                </p>
              </div>
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