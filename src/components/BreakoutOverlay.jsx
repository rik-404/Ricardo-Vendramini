import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, RotateCcw, Volume2, VolumeX, Trophy, Heart, Gamepad2, ArrowLeft, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { dispatchAchievementUnlocked } from './AchievementToast';

export default function BreakoutOverlay({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [gameState, setGameState] = useState('PLAYING'); // PLAYING | PAUSED | GAMEOVER | VICTORY
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

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
        osc.frequency.setValueAtTime(440 + Math.random() * 200, now);
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
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {}
  };

  // Internal mutable game state ref for 60fps loop
  const stateRef = useRef({
    paddle: { width: 140, height: 16, x: 0, y: 0, speed: 10 },
    ball: { x: 0, y: 0, radius: 8, dx: 5, dy: -5, speed: 7 },
    bricks: [],
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

  const initGame = (currentLevel = 1, currentScore = 0, currentLives = 3) => {
    unlockAchievementOnce();
    const canvas = canvasRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas) {
      canvas.width = width;
      canvas.height = height;
    }

    const paddleWidth = Math.max(120, Math.min(180, width * 0.14));
    const paddleX = (width - paddleWidth) / 2;
    const paddleY = height - 60;

    const initialSpeed = 6 + currentLevel * 0.8;
    const angle = (Math.random() * 0.6 - 0.3) * Math.PI;

    const ball = {
      x: width / 2,
      y: paddleY - 20,
      radius: 9,
      dx: Math.sin(angle) * initialSpeed,
      dy: -Math.cos(angle) * initialSpeed,
      speed: initialSpeed
    };

    // Brick colors (Cyberpunk Neon Palette)
    const brickColors = [
      { fill: '#ff0055', stroke: '#ff5588', name: 'magenta' },
      { fill: '#00ff88', stroke: '#55ffaa', name: 'green' },
      { fill: '#00f2fe', stroke: '#55f8ff', name: 'cyan' },
      { fill: '#f59e0b', stroke: '#fbbf24', name: 'amber' },
      { fill: '#a855f7', stroke: '#c084fc', name: 'purple' }
    ];

    // Generate Brick Grid across top
    const rows = Math.min(6, 4 + currentLevel);
    const cols = Math.floor(Math.min(14, Math.max(7, width / 90)));
    const padding = 10;
    const marginTop = 90;
    const totalPadding = (cols + 1) * padding;
    const brickWidth = (width - totalPadding) / cols;
    const brickHeight = 24;

    const bricks = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const color = brickColors[r % brickColors.length];
        bricks.push({
          x: padding + c * (brickWidth + padding),
          y: marginTop + r * (brickHeight + padding),
          w: brickWidth,
          h: brickHeight,
          status: 1, // 1 = active, 0 = destroyed
          fill: color.fill,
          stroke: color.stroke,
          points: (rows - r) * 10
        });
      }
    }

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
    setGameState('PLAYING');
  };

  const createParticles = (x, y, color) => {
    const particles = stateRef.current.particles;
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      particles.push({
        x,
        y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        radius: Math.random() * 3.5 + 1.5,
        color,
        alpha: 1,
        decay: Math.random() * 0.04 + 0.02
      });
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    initGame(1, 0, 3);

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        stateRef.current.keys.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        stateRef.current.keys.right = true;
      }
      if (e.key === 'Escape') {
        onClose();
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

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Main 60FPS Game Loop
    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const st = stateRef.current;

      if (!st.isPaused && !st.isOver && !st.isVictory) {
        // Clear Canvas with subtle trail fade effect
        ctx.fillStyle = 'rgba(4, 7, 5, 0.35)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        if (st.ball.y - st.ball.radius < 75) {
          st.ball.y = 75 + st.ball.radius;
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

          // Calculate bounce angle depending on hit location on paddle
          const hitPoint = (st.ball.x - (st.paddle.x + st.paddle.width / 2)) / (st.paddle.width / 2);
          const maxAngle = Math.PI / 3; // 60 deg max angle
          const bounceAngle = hitPoint * maxAngle;

          const currentSpeed = Math.min(14, Math.hypot(st.ball.dx, st.ball.dy) * 1.02);
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
            // Reset ball position on paddle
            st.ball.x = st.paddle.x + st.paddle.width / 2;
            st.ball.y = st.paddle.y - 20;
            const speed = 6 + st.level * 0.8;
            st.ball.dx = (Math.random() > 0.5 ? 1 : -1) * (speed * 0.7);
            st.ball.dy = -speed;
          }
        }

        // Brick Collisions
        let activeBricks = 0;
        for (let i = 0; i < st.bricks.length; i++) {
          const b = st.bricks[i];
          if (b.status === 1) {
            activeBricks++;
            // Check collision with brick bounding box
            if (
              st.ball.x + st.ball.radius > b.x &&
              st.ball.x - st.ball.radius < b.x + b.w &&
              st.ball.y + st.ball.radius > b.y &&
              st.ball.y - st.ball.radius < b.y + b.h
            ) {
              b.status = 0;
              playSynthSound('brick');
              createParticles(b.x + b.w / 2, b.y + b.h / 2, b.fill);

              st.score += b.points;
              setScore(st.score);

              // Reverse ball direction based on collision side
              const prevX = st.ball.x - st.ball.dx;
              const prevY = st.ball.y - st.ball.dy;

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
        if (activeBricks === 0 && st.bricks.length > 0) {
          playSynthSound('victory');
          st.isVictory = true;
          setGameState('VICTORY');
        }
      } else {
        // Draw dark background when paused/over/victory
        ctx.fillStyle = 'rgba(4, 7, 5, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw Bricks
      for (let i = 0; i < st.bricks.length; i++) {
        const b = st.bricks[i];
        if (b.status === 1) {
          ctx.save();
          ctx.fillStyle = b.fill;
          ctx.strokeStyle = b.stroke;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = b.fill;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.roundRect(b.x, b.y, b.w, b.h, 6);
          ctx.fill();
          ctx.stroke();

          // Glossy highlight
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.fillRect(b.x + 3, b.y + 3, b.w - 6, b.h / 3);
          ctx.restore();
        }
      }

      // Draw Particles
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
        ctx.shadowBlur = 6;
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
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, p.width, p.height, 8);
      ctx.fill();
      ctx.stroke();

      // Paddle neon center bar
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(p.x + p.width * 0.3, p.y + 3, p.width * 0.4, 3);
      ctx.restore();

      // Draw Ball
      const b = st.ball;
      ctx.save();
      ctx.fillStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 16;
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
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const togglePause = () => {
    const st = stateRef.current;
    if (st.isOver || st.isVictory) return;
    st.isPaused = !st.isPaused;
    setGameState(st.isPaused ? 'PAUSED' : 'PLAYING');
  };

  const restartGame = () => {
    initGame(1, 0, 3);
  };

  const nextLevel = () => {
    const nextLvl = level + 1;
    initGame(nextLvl, score, lives);
  };

  if (!isOpen) return null;

  const overlayContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] bg-[#040705] flex flex-col overflow-hidden font-mono selection:bg-[#00ff88] selection:text-black">
        
        {/* Top Floating HUD Bar */}
        <div className="relative z-30 px-4 sm:px-8 py-3 bg-[#071410]/90 border-b border-[#00ff88]/30 backdrop-blur-md flex items-center justify-between shadow-glow-sm">
          
          {/* Left Title & Status */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30">
              <Gamepad2 className="w-5 h-5 text-[#00ff88] animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                BREAKOUT ARCADE <span className="text-xs px-2 py-0.5 rounded-full bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30">NÍVEL {level}</span>
              </h2>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Use as <strong className="text-[#00ff88]">setinhas (← →)</strong> ou o <strong className="text-[#00ff88]">Mouse</strong> para rebater a bolinha e destruir os blocos!
              </p>
            </div>
          </div>

          {/* Center Stats: Score & Lives */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-black/60 px-4 py-1.5 rounded-xl border border-white/10">
              <Trophy className="w-4 h-4 text-amber-400" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-slate-400 uppercase">Pontuação</span>
                <span className="text-sm font-extrabold text-white">{score}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-black/60 px-3 py-1.5 rounded-xl border border-white/10">
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

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-xl bg-black/60 border border-white/15 text-slate-300 hover:text-[#00ff88] transition-all"
              title={soundEnabled ? 'Desativar Som' : 'Ativar Som'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00ff88]" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={restartGame}
              className="p-2.5 rounded-xl bg-black/60 border border-white/15 text-slate-300 hover:text-[#00ff88] transition-all"
              title="Reiniciar Jogo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 transition-all flex items-center gap-1 text-xs font-bold"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Sair do Jogo</span>
            </button>
          </div>
        </div>

        {/* Game Canvas Area */}
        <div className="relative flex-1 bg-[#040705]">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-none" />

          {/* Overlay Screens for Pause / GameOver / Victory */}
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
                  <h3 className="text-2xl font-extrabold text-white">JOGO PAUSADO</h3>
                  <p className="text-xs text-slate-400">Pressione Espaço ou clique abaixo para continuar a partida.</p>
                  <button
                    onClick={togglePause}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#059669] to-[#00ff88] text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-sm hover:scale-105 transition-all"
                  >
                    Continuar Jogo
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
                    <h3 className="text-3xl font-extrabold text-white">GAME OVER</h3>
                    <p className="text-xs text-slate-400 mt-1">A bolinha caiu! Tente novamente para quebrar o recorde.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                    <span className="text-xs text-slate-400">Pontuação Final</span>
                    <p className="text-3xl font-extrabold text-[#00ff88]">{score}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={restartGame}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#059669] to-[#00ff88] text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-sm hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Tentar Novamente</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs"
                    >
                      Sair
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
                    <h3 className="text-3xl font-extrabold text-white">FOGOS & VITÓRIA! 🎉</h3>
                    <p className="text-xs text-slate-400 mt-1">Você destruiu todos os blocos neon da tela!</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                    <span className="text-xs text-slate-400">Pontuação Total</span>
                    <p className="text-3xl font-extrabold text-[#00ff88]">{score}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={nextLevel}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#059669] to-[#00ff88] text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-sm hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Ir para o Nível {level + 1}</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Help Controls Bar */}
        <div className="px-4 py-2 bg-[#06100a] border-t border-white/10 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-0.5 rounded bg-black border border-white/20 text-[#00ff88] font-bold">←</kbd>
            <kbd className="px-2 py-0.5 rounded bg-black border border-white/20 text-[#00ff88] font-bold">→</kbd> ou <strong className="text-white">Mouse</strong> : Mover Raquete
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-0.5 rounded bg-black border border-white/20 text-[#00ff88] font-bold">Espaço</kbd> : Pausar Jogo
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-0.5 rounded bg-black border border-white/20 text-[#00ff88] font-bold">ESC</kbd> : Sair
          </span>
        </div>

      </div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(overlayContent, document.body) : null;
}
