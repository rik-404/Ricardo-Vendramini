import React, { useEffect, useRef, useState } from 'react';
import { dispatchAchievementUnlocked } from './AchievementToast';

const SWATTER_CURSOR = `url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='48'%20height='48'%20viewBox='0%200%2048%2048'%3E%3Crect%20x='14'%20y='30'%20width='4'%20height='14'%20rx='2'%20fill='%238b5a2b'/%3E%3Crect%20x='7'%20y='5'%20width='34'%20height='27'%20rx='9'%20fill='%23e0b877'%20stroke='%238b5a2b'%20stroke-width='2'/%3E%3Ccircle%20cx='15'%20cy='12'%20r='1.5'%20fill='%238b5a2b'/%3E%3Ccircle%20cx='24'%20cy='12'%20r='1.5'%20fill='%238b5a2b'/%3E%3Ccircle%20cx='33'%20cy='12'%20r='1.5'%20fill='%238b5a2b'/%3E%3Ccircle%20cx='15'%20cy='19'%20r='1.5'%20fill='%238b5a2b'/%3E%3Ccircle%20cx='24'%20cy='19'%20r='1.5'%20fill='%238b5a2b'/%3E%3Ccircle%20cx='33'%20cy='19'%20r='1.5'%20fill='%238b5a2b'/%3E%3Ccircle%20cx='15'%20cy='26'%20r='1.5'%20fill='%238b5a2b'/%3E%3Ccircle%20cx='24'%20cy='26'%20r='1.5'%20fill='%238b5a2b'/%3E%3Ccircle%20cx='33'%20cy='26'%20r='1.5'%20fill='%238b5a2b'/%3E%3C/svg%3E") 24 18, auto`;

export default function FlyEasterEgg({ isActive = true, containerRef, titleRef }) {
  const [phase, setPhase] = useState('idle');
  const phaseRef = useRef(phase);
  const flyRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, leaving: false });
  const audioRef = useRef({ ctx: null, osc: null, lfo: null, master: null });
  const rafRef = useRef(null);
  const timersRef = useRef([]);

  const isMoscaUnlocked = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('ricardodev_achievements') || '[]');
      return saved.includes('mosca');
    } catch {
      return false;
    }
  };

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const ensureCtx = () => {
    const a = audioRef.current;
    if (!a.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) a.ctx = new Ctx();
    }
    if (a.ctx && a.ctx.state === 'suspended') a.ctx.resume();
    return a.ctx;
  };

  const startBuzz = () => {
    const a = audioRef.current;
    const ctx = ensureCtx();
    if (!ctx || a.osc) return;
    a.master = ctx.createGain();
    a.master.gain.value = 0.09;
    a.master.connect(ctx.destination);
    a.osc = ctx.createOscillator();
    a.osc.type = 'sawtooth';
    a.osc.frequency.value = 160 + Math.random() * 60;
    a.lfo = ctx.createOscillator();
    a.lfo.type = 'square';
    a.lfo.frequency.value = 120 + Math.random() * 40;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 85;
    a.lfo.connect(lfoGain);
    lfoGain.connect(a.osc.frequency);
    a.osc.connect(a.master);
    a.osc.start();
    a.lfo.start();
  };

  const stopBuzz = () => {
    const a = audioRef.current;
    try { if (a.osc) a.osc.stop(); } catch (e) {}
    try { if (a.lfo) a.lfo.stop(); } catch (e) {}
    try { if (a.master) a.master.disconnect(); } catch (e) {}
    a.osc = null;
    a.lfo = null;
    a.master = null;
  };

  const playSplat = () => {
    const ctx = ensureCtx();
    if (!ctx) return;
    const dur = 0.2;
    const size = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < size; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / size);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.7, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    src.connect(g).connect(ctx.destination);
    src.start();
  };

  const setSwatMode = (on) => {
    document.body.classList.toggle('fly-swat-mode', on);
    window.dispatchEvent(new CustomEvent('fly-swat', { detail: on }));
  };

  function updateFly() {
    const p = posRef.current;
    const dx = p.tx - p.x;
    const dy = p.ty - p.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 10) {
      cancelAnimationFrame(rafRef.current);
      if (p.leaving) {
        stopBuzz();
        setPhase('idle');
      } else {
        land();
      }
      return;
    }

    const speed = p.leaving ? 8 : 5;
    const wobble = Math.sin(performance.now() / 35) * 2.2;
    p.x += (dx / dist) * speed + (Math.random() - 0.5) * 3.5;
    p.y += (dy / dist) * speed + (Math.random() - 0.5) * 3.5 + wobble;

    if (flyRef.current) {
      flyRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
    }
    rafRef.current = requestAnimationFrame(updateFly);
  }

  function spawnFly() {
    if (phaseRef.current !== 'idle') return;
    if (isMoscaUnlocked()) return;
    if (!containerRef.current || !titleRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current.getBoundingClientRect();
    const title = titleRef.current.getBoundingClientRect();
    const p = posRef.current;
    p.tx = title.left + title.width / 2 - container.left;
    p.ty = title.top + title.height / 2 - container.top;

    const edge = Math.floor(Math.random() * 4);
    if (edge === 0) {
      p.x = -30;
      p.y = Math.random() * container.height;
    } else if (edge === 1) {
      p.x = container.width + 30;
      p.y = Math.random() * container.height;
    } else if (edge === 2) {
      p.x = Math.random() * container.width;
      p.y = -30;
    } else {
      p.x = Math.random() * container.width;
      p.y = container.height + 30;
    }
    p.leaving = false;

    if (flyRef.current) {
      flyRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
    }
    setPhase('flying');
    startBuzz();
    rafRef.current = requestAnimationFrame(updateFly);
  }

  function land() {
    setPhase('landed');
    stopBuzz();
    setSwatMode(true);
    timersRef.current.push(setTimeout(flyAway, 10000));
  }

  function flyAway() {
    if (phaseRef.current !== 'landed') return;
    if (!containerRef.current) {
      setPhase('idle');
      setSwatMode(false);
      return;
    }

    const container = containerRef.current.getBoundingClientRect();
    const p = posRef.current;
    const edge = Math.floor(Math.random() * 4);
    if (edge === 0) {
      p.tx = -40;
      p.ty = p.y;
    } else if (edge === 1) {
      p.tx = container.width + 40;
      p.ty = p.y;
    } else if (edge === 2) {
      p.tx = p.x;
      p.ty = -40;
    } else {
      p.tx = p.x;
      p.ty = container.height + 40;
    }
    p.leaving = true;

    setSwatMode(false);
    setPhase('leaving');
    startBuzz();
    rafRef.current = requestAnimationFrame(updateFly);
  }

  function killFly() {
    if (phaseRef.current !== 'landed') return;
    setSwatMode(false);
    stopBuzz();
    playSplat();

    try {
      const saved = JSON.parse(localStorage.getItem('ricardodev_achievements') || '[]');
      if (!saved.includes('mosca')) {
        saved.push('mosca');
        localStorage.setItem('ricardodev_achievements', JSON.stringify(saved));
        dispatchAchievementUnlocked('mosca');
      }
    } catch {}

    setPhase('splat');
    timersRef.current.push(setTimeout(() => {
      setPhase('idle');
    }, 900));
  }

  // Idle Timer inside CLI Mode: Spawns fly after 12 seconds of inactivity in CLI
  useEffect(() => {
    if (!isActive || isMoscaUnlocked()) return undefined;

    clearTimers();
    const idleTimer = setTimeout(() => {
      spawnFly();
    }, 12000); // 12 seconds in CLI idle

    timersRef.current.push(idleTimer);

    return () => {
      clearTimers();
      cancelAnimationFrame(rafRef.current);
      stopBuzz();
      setSwatMode(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  if (phase === 'idle') return null;

  const wingsPaused = phase === 'landed';

  return (
    <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
      <div
        ref={flyRef}
        onClick={phase === 'landed' ? killFly : undefined}
        className="absolute top-0 left-0 w-9 h-9 will-change-transform"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          pointerEvents: phase === 'landed' ? 'auto' : 'none',
          cursor: phase === 'landed' ? SWATTER_CURSOR : 'default',
        }}
      >
        {phase === 'splat' ? (
          <svg viewBox="0 0 44 44" className="w-10 h-10">
            <path d="M16 15 L7 10 M18 17 L26 8 M28 18 L37 11" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
            <path d="M15 22 L6 24 M29 22 L38 24 M16 29 L9 34 M28 28 L35 33" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
            <circle cx="22" cy="22" r="7" fill="#0d0d0d" />
            <circle cx="22" cy="22" r="10" fill="#0d0d0d" opacity="0.35" />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" className="w-9 h-9">
            <ellipse className="fly-wing" cx="7.5" cy="10" rx="3.5" ry="6" fill="rgba(220,235,255,0.5)" style={wingsPaused ? { animationPlayState: 'paused' } : undefined} />
            <ellipse className="fly-wing" cx="12.5" cy="10" rx="3.5" ry="6" fill="rgba(220,235,255,0.5)" style={wingsPaused ? { animationPlayState: 'paused' } : undefined} />
            <ellipse cx="10" cy="11.5" rx="3" ry="6" fill="#141414" />
            <circle cx="10" cy="6.5" r="2.2" fill="#0c0c0c" />
            <circle cx="8.6" cy="5.4" r="0.7" fill="#ff4d4d" />
            <circle cx="11.4" cy="5.4" r="0.7" fill="#ff4d4d" />
          </svg>
        )}
      </div>
      <style>{`
        .fly-wing {
          transform-box: fill-box;
          transform-origin: center;
          animation: flyFlap 0.06s linear infinite alternate;
        }
        @keyframes flyFlap {
          from { transform: scaleY(0.25); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
