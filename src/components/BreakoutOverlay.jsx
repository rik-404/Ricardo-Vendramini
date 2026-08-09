import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, RotateCcw, Volume2, VolumeX, Trophy, Heart, Gamepad2, Zap, Sparkles } from 'lucide-react';
import { dispatchAchievementUnlocked } from './AchievementToast';
import { useLanguage } from '../context/LanguageContext';

export default function BreakoutOverlay({ isOpen, onClose }) {
  const { t } = useLanguage();
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [gameState, setGameState] = useState('PLAYING'); // PLAYING | PAUSED | GAMEOVER | VICTORY
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [remainingBlocks, setRemainingBlocks] = useState(0);

  const soundEnabledRef = useRef(soundEnabled);
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  // Audio Context synth for retro arcade sound effects
  const audioCtxRef = useRef(null);

  const playSynthSound = (type) => {
    if (!soundEnabledRef.current) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new Ctx();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'paddle') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'brick') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(440 + Math.random() * 300, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'wall') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(240, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'life_lost') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.linearRampToValueAtTime(80, now + 0.25);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'victory') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        osc.frequency.setValueAtTime(1046.50, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {}
  };

  // Internal mutable game state ref for 60fps loop
  const stateRef = useRef({
    paddle: { width: 150, height: 16, x: 0, y: 0, speed: 12 },
    ball: { x: 0, y: 0, radius: 9, dx: 6, dy: -6, speed: 8 },
    bricks: [], // { element, x, y, w, h, status, fill, stroke, points }
    particles: [],
    keys: { left: false, right: false },
    score: 0,
    lives: 3,
    level: 1,
    isOver: false,
    isVictory: false,
    isPaused: false
  });

  const unlockAchievementOnce = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('ricardodev_achievements') || '[]');
      if (!saved.includes('breakout')) {
        saved.push('breakout');
        localStorage.setItem('ricardodev_achievements', JSON.stringify(saved));
        dispatchAchievementUnlocked('breakout');
      }
    } catch {}
  };

  // Restore all hidden site DOM elements back to normal
  const restoreSiteElements = () => {
    const st = stateRef.current;
    if (st.bricks && st.bricks.length > 0) {
      st.bricks.forEach((b) => {
        if (b.element) {
          b.element.style.transition = '';
          b.element.style.visibility = '';
          b.element.style.opacity = '';
          b.element.style.transform = '';
          b.element.style.filter = '';
          b.element.style.pointerEvents = '';
        }
      });
    }
    document.querySelectorAll('[data-breakout-target]').forEach((el) => {
      el.style.transition = '';
      el.style.visibility = '';
      el.style.opacity = '';
      el.style.transform = '';
      el.style.filter = '';
      el.style.pointerEvents = '';
      el.removeAttribute('data-breakout-target');
    });
  };

  const scanDomElementsAsBricks = (width, height) => {
    const selectors = [
      '.glass-card',
      'h1', 'h2', 'h3', 'h4',
      'p', 'button', 'a',
      'img', 'svg.lucide',
      '.timeline-card', '.skills-card',
      'div.rounded-2xl', 'div.rounded-3xl', 'span.inline-flex'
    ];

    const queriedNodes = document.querySelectorAll(selectors.join(','));
    const candidateElements = Array.from(queriedNodes);

    const colors = [
      { fill: '#ff0055', stroke: '#ff5588' },
      { fill: '#00ff88', stroke: '#55ffaa' },
      { fill: '#00f2fe', stroke: '#55f8ff' },
      { fill: '#f59e0b', stroke: '#fbbf24' },
      { fill: '#a855f7', stroke: '#c084fc' }
    ];

    const bricks = [];
    const usedRects = [];

    candidateElements.forEach((el, index) => {
      if (el.closest('.breakout-overlay-root') || el.closest('.terminal-flash-target')) return;

      const rect = el.getBoundingClientRect();

      if (
        rect.top >= 60 &&
        rect.bottom <= height - 60 &&
        rect.left >= 10 &&
        rect.right <= width - 10 &&
        rect.width >= 30 &&
        rect.height >= 15 &&
        rect.height <= 350
      ) {
        const isExactDuplicate = usedRects.some(
          (r) => Math.abs(r.left - rect.left) < 5 && Math.abs(r.top - rect.top) < 5 && Math.abs(r.width - rect.width) < 5
        );

        if (!isExactDuplicate) {
          usedRects.push(rect);
          const color = colors[index % colors.length];

          el.setAttribute('data-breakout-target', 'true');
          el.style.transition = 'all 0.2s ease-out';

          bricks.push({
            element: el,
            x: rect.left,
            y: rect.top,
            w: rect.width,
            h: rect.height,
            status: 1,
            fill: color.fill,
            stroke: color.stroke,
            points: Math.round(100 - rect.top / 10)
          });
        }
      }
    });

    if (bricks.length < 5) {
      const rows = 5;
      const cols = Math.floor(Math.min(12, Math.max(6, width / 100)));
      const padding = 12;
      const marginTop = 90;
      const totalPadding = (cols + 1) * padding;
      const brickWidth = (width - totalPadding) / cols;
      const brickHeight = 28;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const color = colors[r % colors.length];
          bricks.push({
            element: null,
            x: padding + c * (brickWidth + padding),
            y: marginTop + r * (brickHeight + padding),
            w: brickWidth,
            h: brickHeight,
            status: 1,
            fill: color.fill,
            stroke: color.stroke,
            points: (rows - r) * 20
          });
        }
      }
    }

    return bricks;
  };

  const initGame = (currentLevel = 1, currentScore = 0, currentLives = 3) => {
    unlockAchievementOnce();
    restoreSiteElements();

    const canvas = canvasRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas) {
      canvas.width = width;
      canvas.height = height;
    }

    const paddleWidth = Math.max(130, Math.min(200, width * 0.16));
    const paddleX = (width - paddleWidth) / 2;
    const paddleY = height - 50;

    const initialSpeed = 7 + currentLevel * 0.8;
    const angle = (Math.random() * 0.6 - 0.3) * Math.PI;

    const ball = {
      x: width / 2,
      y: paddleY - 25,
      radius: 9,
      dx: Math.sin(angle) * initialSpeed,
      dy: -Math.cos(angle) * initialSpeed,
      speed: initialSpeed
    };

    const bricks = scanDomElementsAsBricks(width, height);

    stateRef.current = {
      paddle: { width: paddleWidth, height: 16, x: paddleX, y: paddleY, speed: 12 },
      ball,
      bricks,
      particles: [],
      keys: { left: false, right: false },
      score: currentScore,
      lives: currentLives,
      level: currentLevel,
      isOver: false,
      isVictory: false,
      isPaused: false
    };

    setScore(currentScore);
    setLives(currentLives);
    setLevel(currentLevel);
    setRemainingBlocks(bricks.length);
    setGameState('PLAYING');
  };

  const createParticles = (x, y, color) => {
    const particles = stateRef.current.particles;
    for (let i = 0; i < 16; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      particles.push({
        x,
        y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        radius: Math.random() * 4 + 2,
        color,
        alpha: 1,
        decay: Math.random() * 0.04 + 0.02
      });
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    initGame(1, 0, 3);

    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        stateRef.current.keys.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        stateRef.current.keys.right = true;
      }
      if (e.key === 'Escape') {
        handleClose();
      }
      if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        togglePause();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        stateRef.current.keys.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        stateRef.current.keys.right = false;
      }
    };

    const handleMouseMove = (e) => {
      const st = stateRef.current;
      if (!st || st.isPaused || st.isOver || st.isVictory) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      st.paddle.x = Math.max(0, Math.min(canvas.width - st.paddle.width, mouseX - st.paddle.width / 2));
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const touchX = touch.clientX - rect.left;
        stateRef.current.paddle.x = Math.max(0, Math.min(canvas.width - stateRef.current.paddle.width, touchX - stateRef.current.paddle.width / 2));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Main 60FPS Game Loop
    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const st = stateRef.current;

      if (!st.isPaused && !st.isOver && !st.isVictory) {
        // Clear Canvas with subtle trail fade effect
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Move Paddle via keys
        if (st.keys.left) {
          st.paddle.x = Math.max(0, st.paddle.x - st.paddle.speed);
        }
        if (st.keys.right) {
          st.paddle.x = Math.min(canvas.width - st.paddle.width, st.paddle.x + st.paddle.speed);
        }

        // Move Ball
        st.ball.x += st.ball.dx;
        st.ball.y += st.ball.dy;

        // Wall collisions (Left & Right)
        if (st.ball.x - st.ball.radius < 0) {
          st.ball.x = st.ball.radius;
          st.ball.dx = Math.abs(st.ball.dx);
          playSynthSound('wall');
        } else if (st.ball.x + st.ball.radius > canvas.width) {
          st.ball.x = canvas.width - st.ball.radius;
          st.ball.dx = -Math.abs(st.ball.dx);
          playSynthSound('wall');
        }

        // Wall collision (Top)
        if (st.ball.y - st.ball.radius < 65) {
          st.ball.y = 65 + st.ball.radius;
          st.ball.dy = Math.abs(st.ball.dy);
          playSynthSound('wall');
        }

        // Paddle Collision
        if (
          st.ball.y + st.ball.radius >= st.paddle.y &&
          st.ball.y - st.ball.radius <= st.paddle.y + st.paddle.height &&
          st.ball.x >= st.paddle.x &&
          st.ball.x <= st.paddle.x + st.paddle.width &&
          st.ball.dy > 0
        ) {
          playSynthSound('paddle');
          st.ball.y = st.paddle.y - st.ball.radius;

          const hitPoint = (st.ball.x - (st.paddle.x + st.paddle.width / 2)) / (st.paddle.width / 2);
          const maxAngle = Math.PI / 3;
          const bounceAngle = hitPoint * maxAngle;

          const currentSpeed = Math.min(15, Math.hypot(st.ball.dx, st.ball.dy) * 1.02);
          st.ball.dx = currentSpeed * Math.sin(bounceAngle);
          st.ball.dy = -currentSpeed * Math.cos(bounceAngle);
        }

        // Bottom Fall (Life Lost)
        if (st.ball.y - st.ball.radius > canvas.height) {
          playSynthSound('life_lost');
          st.lives -= 1;
          setLives(st.lives);

          if (st.lives <= 0) {
            st.isOver = true;
            setGameState('GAMEOVER');
          } else {
            st.ball.x = st.paddle.x + st.paddle.width / 2;
            st.ball.y = st.paddle.y - 25;
            const speed = 7 + st.level * 0.8;
            st.ball.dx = (Math.random() > 0.5 ? 1 : -1) * (speed * 0.7);
            st.ball.dy = -speed;
          }
        }

        // Site Element Bricks Collisions
        let activeBricksCount = 0;
        for (let i = 0; i < st.bricks.length; i++) {
          const b = st.bricks[i];
          if (b.status === 1) {
            activeBricksCount++;

            // Bounding Box Collision
            if (
              st.ball.x + st.ball.radius > b.x &&
              st.ball.x - st.ball.radius < b.x + b.w &&
              st.ball.y + st.ball.radius > b.y &&
              st.ball.y - st.ball.radius < b.y + b.h
            ) {
              b.status = 0;
              playSynthSound('brick');
              createParticles(b.x + b.w / 2, b.y + b.h / 2, b.fill);

              // Destroy actual DOM Element on the page!
              if (b.element) {
                b.element.style.visibility = 'hidden';
                b.element.style.opacity = '0';
                b.element.style.transform = 'scale(0) rotate(20deg)';
                b.element.style.filter = 'blur(15px)';
                b.element.style.pointerEvents = 'none';
              }

              st.score += b.points;
              setScore(st.score);
              setRemainingBlocks(activeBricksCount - 1);

              const prevX = st.ball.x - st.ball.dx;
              if (prevX + st.ball.radius <= b.x || prevX - st.ball.radius >= b.x + b.w) {
                st.ball.dx = -st.ball.dx;
              } else {
                st.ball.dy = -st.ball.dy;
              }
              break;
            }
          }
        }

        // Victory Check
        if (activeBricksCount === 0 && st.bricks.length > 0) {
          playSynthSound('victory');
          st.isVictory = true;
          setGameState('VICTORY');
        }
      }

      // Draw Glowing Target Borders over site bricks
      for (let i = 0; i < st.bricks.length; i++) {
        const b = st.bricks[i];
        if (b.status === 1) {
          ctx.save();
          ctx.strokeStyle = b.stroke;
          ctx.fillStyle = b.fill + '22'; // 15% opacity tint overlay
          ctx.lineWidth = 2;
          ctx.shadowColor = b.fill;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.roundRect(b.x, b.y, b.w, b.h, 12);
          ctx.fill();
          ctx.stroke();

          // Draw target corners
          ctx.fillStyle = b.fill;
          ctx.fillRect(b.x, b.y, 6, 6);
          ctx.fillRect(b.x + b.w - 6, b.y, 6, 6);
          ctx.fillRect(b.x, b.y + b.h - 6, 6, 6);
          ctx.fillRect(b.x + b.w - 6, b.y + b.h - 6, 6, 6);
          ctx.restore();
        }
      }

      // Draw Explosion Particles
      for (let i = st.particles.length - 1; i >= 0; i--) {
        const p = st.particles[i];
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          st.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw Paddle
      const p = st.paddle;
      ctx.save();
      ctx.fillStyle = '#00ff88';
      ctx.strokeStyle = '#55ffaa';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, p.width, p.height, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(p.x + p.width * 0.35, p.y + 3, p.width * 0.3, 3);
      ctx.restore();

      // Draw Glowing Ball
      const b = st.ball;
      ctx.save();
      ctx.fillStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.body.style.overflow = '';
      restoreSiteElements();
    };
  }, [isOpen]);

  const togglePause = () => {
    const st = stateRef.current;
    if (st.isOver || st.isVictory) return;
    st.isPaused = !st.isPaused;
    setGameState(st.isPaused ? 'PAUSED' : 'PLAYING');
  };

  const handleClose = () => {
    document.body.style.overflow = '';
    restoreSiteElements();
    onClose();
  };

  const restartGame = () => {
    initGame(1, 0, 3);
  };

  const nextLevel = () => {
    initGame(level + 1, score, lives);
  };

  if (!isOpen) return null;

  const overlayContent = (
    <AnimatePresence>
      <div className="breakout-overlay-root fixed inset-0 z-[100000] flex flex-col pointer-events-none font-mono selection:bg-[#00ff88] selection:text-black">
        
        {/* Top HUD Bar */}
        <div className="relative z-30 px-4 sm:px-8 py-3 bg-[#040705]/95 border-b border-[#00ff88]/40 backdrop-blur-md flex items-center justify-between pointer-events-auto shadow-glow-sm">
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30">
              <Gamepad2 className="w-5 h-5 text-[#00ff88] animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                {t('breakout.title')}<span className="text-xs px-2 py-0.5 rounded-full bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30">{t('breakout.gameLabel')}</span>
              </h2>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {t('breakout.instructions')} <strong className="text-[#00ff88]">{t('breakout.arrows')}</strong> {t('breakout.orMouse')}. <kbd className="px-1 py-0.5 rounded bg-black border border-white/20 text-[#00ff88]">ESC</kbd> {t('breakout.restartSiteEsc')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-black/70 px-3.5 py-1.5 rounded-xl border border-white/10">
              <Sparkles className="w-4 h-4 text-[#00ff88]" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-slate-400 uppercase">{t('breakout.blocksLabel')}</span>
                <span className="text-sm font-extrabold text-[#00ff88]">{remainingBlocks}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-black/70 px-3.5 py-1.5 rounded-xl border border-white/10">
              <Trophy className="w-4 h-4 text-amber-400" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-slate-400 uppercase">{t('breakout.points')}</span>
                <span className="text-sm font-extrabold text-white">{score}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-black/70 px-3 py-1.5 rounded-xl border border-white/10">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 transition-colors ${
                    i < lives ? 'text-red-500 fill-red-500' : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-xl bg-black/60 border border-white/15 text-slate-300 hover:text-[#00ff88] transition-all"
              title={soundEnabled ? t('breakout.desactivateSound') : t('breakout.activateSound')}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00ff88]" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={restartGame}
              className="p-2.5 rounded-xl bg-black/60 border border-white/15 text-slate-300 hover:text-[#00ff88] transition-all"
              title={t('breakout.restartGame')}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleClose}
              className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 transition-all flex items-center gap-1.5 text-xs font-bold"
            >
              <X className="w-4 h-4" />
              <span>{t('breakout.restoreSiteEsc')}</span>
            </button>
          </div>
        </div>

        {/* Game Canvas Overlay */}
        <div className="relative flex-1 pointer-events-auto">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-none" />

          {/* Pause / GameOver / Victory Screens */}
          <AnimatePresence>
            {gameState === 'PAUSED' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-40 p-4"
              >
                <div className="glass-card p-8 rounded-3xl border border-[#00ff88]/40 text-center max-w-md w-full space-y-5 bg-[#040705]/95 shadow-glow-lg">
                  <div className="p-4 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/30 inline-block">
                    <Play className="w-8 h-8 text-[#00ff88]" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">{t('breakout.pausedTitle')}</h3>
                  <p className="text-xs text-slate-400">{t('breakout.pausedDesc')}</p>
                  <button
                    onClick={togglePause}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#059669] to-[#00ff88] text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-sm hover:scale-105 transition-all"
                  >
                    {t('breakout.continueDestroying')}
                  </button>
                </div>
              </motion.div>
            )}

            {gameState === 'GAMEOVER' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md z-40 p-4"
              >
                <div className="glass-card p-8 rounded-3xl border border-red-500/40 text-center max-w-md w-full space-y-5 bg-[#040705]/95 shadow-2xl">
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 inline-block">
                    <Zap className="w-8 h-8 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-white">{t('breakout.gameOverTitle')}</h3>
                    <p className="text-xs text-slate-400 mt-1">{t('breakout.gameOverDesc')}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                    <span className="text-xs text-slate-400">{t('breakout.totalScore')}</span>
                    <p className="text-3xl font-extrabold text-[#00ff88]">{score}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={restartGame}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#059669] to-[#00ff88] text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-sm hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{t('breakout.tryAgain')}</span>
                    </button>
                    <button
                      onClick={handleClose}
                      className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs"
                    >
                      {t('breakout.restoreSite')}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {gameState === 'VICTORY' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md z-40 p-4"
              >
                <div className="glass-card p-8 rounded-3xl border border-[#00ff88]/50 text-center max-w-md w-full space-y-5 bg-[#040705]/95 shadow-glow-lg">
                  <div className="p-4 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/30 inline-block animate-bounce">
                    <Sparkles className="w-8 h-8 text-[#00ff88]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-white">{t('breakout.victoryTitle')}</h3>
                    <p className="text-xs text-slate-400 mt-1">{t('breakout.victoryDesc')}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                    <span className="text-xs text-slate-400">{t('breakout.totalScore')}</span>
                    <p className="text-3xl font-extrabold text-[#00ff88]">{score}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleClose}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#059669] to-[#00ff88] text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-sm hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{t('breakout.restoreEntireSite')}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(overlayContent, document.body) : null;
}
