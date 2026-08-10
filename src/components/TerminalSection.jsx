import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Play, RefreshCw, Sparkles, X, Gamepad2, ArrowLeft, ArrowRight, Zap, Trophy } from 'lucide-react';
import { terminalCommands, terminalCommandsEn } from '../data/portfolioData';
import { dispatchAchievementUnlocked, ACHIEVEMENTS_META } from './AchievementToast';
import AchievementsModal from './AchievementsModal';
import FlyEasterEgg from './FlyEasterEgg';
import { useLanguage } from '../context/LanguageContext';

export default function TerminalSection({ onTriggerEasterEgg, onOpenAchievements, onTriggerBreakout, onTriggerStarWars, onTriggerClean, onRestoreClean, onTriggerTimewalker, isModal = false, onClose, theme, onToggleTheme }) {
  const { lang, t, toggleLang, changeLang } = useLanguage();
  const cliContainerRef = useRef(null);
  const cliTitleRef = useRef(null);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState(lang === 'en' ? terminalCommandsEn.welcome : terminalCommands.welcome);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('PLAYING'); // PLAYING | GAMEOVER | VICTORY
  const [adminMode, setAdminMode] = useState(false); // waiting for password
  const [rickrollActive, setRickrollActive] = useState(false);
  const [showPostIt, setShowPostIt] = useState(true);
  const [localAchievementsOpen, setLocalAchievementsOpen] = useState(false);
  const [achievements, setAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem('ricardodev_achievements');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  const unlockAchievement = (id) => {
    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem('ricardodev_achievements') || '[]');
    } catch {
      saved = [];
    }
    if (!saved.includes(id)) {
      saved.push(id);
      localStorage.setItem('ricardodev_achievements', JSON.stringify(saved));
      dispatchAchievementUnlocked(id);
    }
    setAchievements(new Set(saved));
  };

  const ROOT_USED_KEY = 'ricardodev_root_used';
  const isRootUsed = () => {
    try { return !!localStorage.getItem(ROOT_USED_KEY); } catch { return false; }
  };
  const markRootUsed = () => {
    try { localStorage.setItem(ROOT_USED_KEY, '1'); } catch {}
  };

  const closePostIt = () => {
    setShowPostIt(false);
    postItTriggeredRef.current = false;
  };

  const outputContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const sectionRef = useRef(null);
  const inputRef = useRef(null);
  const postItTriggeredRef = useRef(false);
  const lastActivityRef = useRef(Date.now());

  // Track input typing or game activity to reset idle timer
  useEffect(() => {
    lastActivityRef.current = Date.now();
  }, [inputVal, gameActive]);

  // ESC key listener to close Rickroll overlay
  useEffect(() => {
    if (!rickrollActive) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setRickrollActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rickrollActive]);

  // 5-second idle viewport timer: only drops if user is NOT playing game AND NOT typing
  useEffect(() => {
    if (!sectionRef.current) return;

    let timer = null;

    const checkAndTrigger = () => {
      if (postItTriggeredRef.current || gameActive) return;

      const isInputFocused = document.activeElement === inputRef.current;
      const isTyping = inputVal.trim().length > 0;
      const timeSinceActivity = Date.now() - lastActivityRef.current;

      if (timeSinceActivity >= 5000 && !isInputFocused && !isTyping && !isRootUsed()) {
        postItTriggeredRef.current = true;
        setShowPostIt(true);
      } else {
        // Re-check in 1 second if still idle in viewport
        timer = setTimeout(checkAndTrigger, 1000);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !postItTriggeredRef.current && !gameActive) {
          lastActivityRef.current = Date.now();
          if (timer) clearTimeout(timer);
          timer = setTimeout(checkAndTrigger, 5000);
        } else {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [gameActive, inputVal]);

  // Game internal state ref for 60fps canvas loop
  const gameStateRef = useRef({
    player: { x: 300, y: 300, width: 24, height: 20, speed: 6, dx: 0 },
    lasers: [],
    alienLasers: [],
    aliens: [],
    particles: [],
    direction: 1,
    alienSpeed: 1,
    alienDrop: false,
    score: 0,
    lives: 3,
    level: 1,
    gameOver: false,
    victory: false,
    keys: {}
  });

  useEffect(() => {
    if (!gameActive && outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [history, gameActive]);

  // Init Aliens Grid
  const initAliens = (currentLevel) => {
    const aliens = [];
    const rows = 4;
    const cols = 8;
    const colors = ['#ec4899', '#a855f7', '#00f2fe', '#eab308'];
    const shapes = ['hexagon', 'diamond', 'square', 'triangle'];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        aliens.push({
          x: 40 + c * 45,
          y: 35 + r * 35,
          width: 22,
          height: 22,
          color: colors[r % colors.length],
          shape: shapes[r % shapes.length],
          alive: true
        });
      }
    }
    return aliens;
  };

  // Start Space Invaders Game
  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameState('PLAYING');

    gameStateRef.current = {
      player: { x: 260, y: 280, width: 24, height: 20, speed: 6, dx: 0 },
      lasers: [],
      alienLasers: [],
      aliens: initAliens(1),
      particles: [],
      direction: 1,
      alienSpeed: 0.8,
      alienDrop: false,
      score: 0,
      lives: 3,
      level: 1,
      gameOver: false,
      victory: false,
      keys: {}
    };
  };

  // Keyboard Handlers for Game
  useEffect(() => {
    if (!gameActive) return;

    const handleKeyDown = (e) => {
      const g = gameStateRef.current;
      g.keys[e.code] = true;

      if (e.code === 'Escape') {
        setGameActive(false);
        setHistory((prev) => [...prev, t('terminal.gameEnded')]);
      }

      if ((e.code === 'Space' || e.code === 'Enter') && !g.gameOver && !g.victory) {
        e.preventDefault();
        // Fire Laser
        if (g.lasers.length < 4) {
          g.lasers.push({
            x: g.player.x + g.player.width / 2 - 2,
            y: g.player.y - 6,
            width: 4,
            height: 12,
            speed: 8
          });
        }
      }

      if ((g.gameOver || g.victory) && (e.code === 'KeyR' || e.code === 'Space')) {
        startGame();
      }
    };

    const handleKeyUp = (e) => {
      if (gameStateRef.current) {
        gameStateRef.current.keys[e.code] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameActive]);

  // Main Canvas Render & Animation Loop
  useEffect(() => {
    if (!gameActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const update = () => {
      const g = gameStateRef.current;
      if (!g || g.gameOver || g.victory) return;

      // Update Player Position
      if (g.keys['ArrowLeft'] || g.keys['KeyA']) {
        g.player.x = Math.max(10, g.player.x - g.player.speed);
      }
      if (g.keys['ArrowRight'] || g.keys['KeyD']) {
        g.player.x = Math.min(canvas.width - g.player.width - 10, g.player.x + g.player.speed);
      }

      // Update Lasers
      g.lasers.forEach((l) => (l.y -= l.speed));
      g.lasers = g.lasers.filter((l) => l.y > -20);

      // Update Alien Lasers
      g.alienLasers.forEach((al) => (al.y += al.speed));
      g.alienLasers = g.alienLasers.filter((al) => al.y < canvas.height + 20);

      // Alien Lasers Collision with Player
      g.alienLasers.forEach((al) => {
        if (
          al.x < g.player.x + g.player.width &&
          al.x + al.width > g.player.x &&
          al.y < g.player.y + g.player.height &&
          al.y + al.height > g.player.y
        ) {
          al.y = canvas.height + 100;
          g.lives -= 1;
          setLives(g.lives);

          // Particles
          createExplosion(g.player.x + 12, g.player.y + 10, '#00ff88', 20);

          if (g.lives <= 0) {
            g.gameOver = true;
            setGameState('GAMEOVER');
          }
        }
      });

      // Update Aliens Movement
      let hitEdge = false;
      const aliveAliens = g.aliens.filter((a) => a.alive);

      if (aliveAliens.length === 0) {
        g.victory = true;
        setGameState('VICTORY');
        return;
      }

      aliveAliens.forEach((alien) => {
        alien.x += g.alienSpeed * g.direction;
        if (alien.x + alien.width >= canvas.width - 15 || alien.x <= 15) {
          hitEdge = true;
        }

        // Alien reaches bottom (Game Over)
        if (alien.y + alien.height >= g.player.y) {
          g.gameOver = true;
          setGameState('GAMEOVER');
        }

        // Random Alien Fire
        if (Math.random() < 0.002) {
          g.alienLasers.push({
            x: alien.x + alien.width / 2 - 2,
            y: alien.y + alien.height,
            width: 3,
            height: 10,
            speed: 4,
            color: alien.color
          });
        }
      });

      if (hitEdge) {
        g.direction *= -1;
        aliveAliens.forEach((alien) => {
          alien.y += 10;
        });
      }

      // Laser Collision with Aliens
      g.lasers.forEach((laser) => {
        aliveAliens.forEach((alien) => {
          if (
            laser.y < alien.y + alien.height &&
            laser.y + laser.height > alien.y &&
            laser.x < alien.x + alien.width &&
            laser.x + laser.width > alien.x
          ) {
            alien.alive = false;
            laser.y = -100;
            g.score += 10;
            setScore(g.score);

            // Create Geometric Particles
            createExplosion(alien.x + 11, alien.y + 11, alien.color, 12);
          }
        });
      });

      // Update Particles
      g.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;
      });
      g.particles = g.particles.filter((p) => p.alpha > 0);
    };

    const createExplosion = (x, y, color, count) => {
      const g = gameStateRef.current;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        g.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          size: Math.random() * 3 + 1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const g = gameStateRef.current;
      if (!g) return;

      // Background Starfield Grid
      ctx.fillStyle = '#050906';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(0, 255, 136, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Player Ship (Geometric Neon Triangle)
      ctx.save();
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#00ff88';
      ctx.beginPath();
      ctx.moveTo(g.player.x + g.player.width / 2, g.player.y);
      ctx.lineTo(g.player.x, g.player.y + g.player.height);
      ctx.lineTo(g.player.x + g.player.width / 2, g.player.y + g.player.height - 4);
      ctx.lineTo(g.player.x + g.player.width, g.player.y + g.player.height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Draw Lasers
      g.lasers.forEach((l) => {
        ctx.save();
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#00f2fe';
        ctx.fillRect(l.x, l.y, l.width, l.height);
        ctx.restore();
      });

      // Draw Alien Lasers
      g.alienLasers.forEach((al) => {
        ctx.save();
        ctx.shadowColor = al.color;
        ctx.shadowBlur = 6;
        ctx.fillStyle = al.color;
        ctx.fillRect(al.x, al.y, al.width, al.height);
        ctx.restore();
      });

      // Draw Geometric Aliens
      g.aliens.forEach((alien) => {
        if (!alien.alive) return;

        ctx.save();
        ctx.shadowColor = alien.color;
        ctx.shadowBlur = 8;
        ctx.strokeStyle = alien.color;
        ctx.fillStyle = alien.color + '40'; // Transparent fill
        ctx.lineWidth = 1.5;

        const cx = alien.x + alien.width / 2;
        const cy = alien.y + alien.height / 2;
        const r = alien.width / 2;

        ctx.beginPath();
        if (alien.shape === 'hexagon') {
          for (let i = 0; i < 6; i++) {
            const a = (i * Math.PI) / 3;
            const x = cx + r * Math.cos(a);
            const y = cy + r * Math.sin(a);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
        } else if (alien.shape === 'diamond') {
          ctx.moveTo(cx, cy - r);
          ctx.lineTo(cx + r, cy);
          ctx.lineTo(cx, cy + r);
          ctx.lineTo(cx - r, cy);
        } else if (alien.shape === 'triangle') {
          ctx.moveTo(cx, cy - r);
          ctx.lineTo(cx + r, cy + r);
          ctx.lineTo(cx - r, cy + r);
        } else {
          ctx.rect(alien.x, alien.y, alien.width, alien.height);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Draw Particles
      g.particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();
      });

      // Draw Game Over or Victory Overlays
      if (g.gameOver) {
        ctx.fillStyle = 'rgba(4, 7, 5, 0.85)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#ef4444';
        ctx.textAlign = 'center';
        ctx.fillText(t('terminal.gameOver'), canvas.width / 2, canvas.height / 2 - 15);

        ctx.font = '12px monospace';
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(`${t('terminal.finalScore')} ${g.score}`, canvas.width / 2, canvas.height / 2 + 15);
        ctx.fillText(t('terminal.pressRestartSpace'), canvas.width / 2, canvas.height / 2 + 40);
      }

      if (g.victory) {
        ctx.fillStyle = 'rgba(4, 7, 5, 0.85)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#00ff88';
        ctx.textAlign = 'center';
        ctx.fillText(t('terminal.victory'), canvas.width / 2, canvas.height / 2 - 15);

        ctx.font = '12px monospace';
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(`${t('terminal.finalScore')} ${g.score}`, canvas.width / 2, canvas.height / 2 + 15);
        ctx.fillText(t('terminal.pressPlayAgainSpace'), canvas.width / 2, canvas.height / 2 + 40);
      }
    };

    const loop = () => {
      update();
      draw();
      gameLoopRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameActive]);

  // Mobile Touch Controls Actions
  const handleTouchMove = (direction) => {
    const g = gameStateRef.current;
    if (!g) return;
    if (direction === 'left') {
      g.player.x = Math.max(10, g.player.x - 20);
    } else if (direction === 'right') {
      g.player.x = Math.min(500, g.player.x + 20);
    }
  };

  const handleTouchShoot = () => {
    const g = gameStateRef.current;
    if (!g || g.gameOver || g.victory) {
      if (g && (g.gameOver || g.victory)) startGame();
      return;
    }
    if (g.lasers.length < 4) {
      g.lasers.push({
        x: g.player.x + g.player.width / 2 - 2,
        y: g.player.y - 6,
        width: 4,
        height: 12,
        speed: 8
      });
    }
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    // Admin mode: waiting for password
    if (adminMode) {
      const maskedHistory = [...history, `${t('terminal.passwordPrompt').slice(1)} ${'*'.repeat(inputVal.trim().length)}`];
      setInputVal('');

      if (cmd === 'admin admin' || cmd === 'admin' || cmd === 'root') {
        setAdminMode(false);
        setShowPostIt(false);
        setHistory([...maskedHistory, '', t('terminal.passOk')]);

        setTimeout(() => {
          setHistory((prev) => [...prev, t('terminal.loadingPanel')]);
        }, 600);

        setTimeout(() => {
          setHistory((prev) => [...prev, t('terminal.connectingServer')]);
        }, 1200);

        setTimeout(() => {
          setHistory((prev) => [...prev, t('terminal.loadingModules')]);
        }, 2000);

        setTimeout(() => {
          setHistory((prev) => [...prev, t('terminal.checkingPerms')]);
        }, 2800);

        setTimeout(() => {
          setHistory((prev) => [...prev, t('terminal.initDashboard')]);
        }, 3500);

        setTimeout(() => {
          setHistory((prev) => [...prev, t('terminal.ready100')]);
        }, 4200);

        setTimeout(() => {
          setHistory((prev) => [...prev, '', t('terminal.openingPanel')]);
        }, 4800);

        setTimeout(() => {
          // RICKROLL!
          setRickrollActive(true);
          unlockAchievement('root');
        }, 5500);

        return;
      } else {
        setHistory([...maskedHistory, '', t('terminal.wrongPassword'), `> ${t('terminal.tryAgain')} 'root'.`]);
        setAdminMode(false);
        setShowPostIt(false);
        return;
      }
    }

    const newHistory = [...history, `ricardo@dev:~$ ${inputVal}`];

    // Root command — easter egg with falling post-it
    if (cmd === 'root') {
      postItTriggeredRef.current = true;
      markRootUsed();
      setInputVal('');
      setHistory([
        ...newHistory,
        '',
        t('terminal.rootAccess'),
        '',
        t('terminal.authNeeded'),
        t('terminal.rootPasswordPrompt'),
        '',
        t('terminal.passwordPrompt')
      ]);
      setAdminMode(true);

      // Post-it falls after a short delay
      setTimeout(() => {
        setShowPostIt(true);
      }, 800);

      return;
    }
    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (cmd === 'clean' || cmd === 'limpar' || cmd === 'clean-site' || cmd === 'purge') {
      unlockAchievement('clean');
      newHistory.push(t('terminal.cleanActivated'));
      setHistory(newHistory);
      setInputVal('');
      if (isModal && onClose) onClose();
      if (onTriggerClean) onTriggerClean();
      return;
    }

    if (cmd === 'restore' || cmd === 'restaurar') {
      newHistory.push(t('terminal.restoreActivated'));
      setHistory(newHistory);
      setInputVal('');
      if (onRestoreClean) onRestoreClean();
      return;
    }

    if (cmd === 'matrix') {
      unlockAchievement('matrix');
      newHistory.push(t('terminal.matrixRunning'));
      setHistory(newHistory);
      setInputVal('');
      if (onTriggerEasterEgg) onTriggerEasterEgg();
      return;
    }

    if (cmd === 'konami') {
      unlockAchievement('konami');
      newHistory.push(t('terminal.konamiActivated'));
      setHistory(newHistory);
      setInputVal('');
      if (onTriggerEasterEgg) onTriggerEasterEgg();
      return;
    }

    if (cmd === 'tilt' || cmd === 'balancar' || cmd === 'terremoto') {
      unlockAchievement('tilt');
      newHistory.push(t('terminal.tiltActivated'));
      setHistory(newHistory);
      setInputVal('');

      if (isModal && onClose) onClose();

      document.body.classList.add('site-tilt-active');
      setTimeout(() => {
        document.body.classList.remove('site-tilt-active');
      }, 3500);
      return;
    }

    if (cmd === 'navinha' || cmd === 'play' || cmd === 'space' || cmd === 'invaders') {
      unlockAchievement('navinha');
      startGame();
      setInputVal('');
      return;
    }

    if (cmd === 'breakout' || cmd === 'bloquinhos' || cmd === 'tijolos' || cmd === 'arcanoid' || cmd === 'arkanoid') {
      unlockAchievement('breakout');
      newHistory.push(t('terminal.breakoutActivated'));
      setHistory(newHistory);
      setInputVal('');
      if (onTriggerBreakout) onTriggerBreakout();
      return;
    }

    if (cmd === 'starwars' || cmd === 'star-wars' || cmd === 'vader' || cmd === 'jedi' || cmd === 'forcemode') {
      unlockAchievement('starwars');
      newHistory.push(t('terminal.starwarsActivated'));
      setHistory(newHistory);
      setInputVal('');
      if (onTriggerStarWars) onTriggerStarWars();
      return;
    }

    if (cmd === 'timewalker' || cmd === 'time-walker' || cmd === 'viagem-no-tempo' || cmd === 'retro' || cmd === '90s') {
      unlockAchievement('timewalker');
      newHistory.push(lang === 'en' ? '> ⏳ TIMEWALKER PROTOCOL ACTIVATED! Traveling back to 1999 Web Era...' : '> ⏳ PROTOCOLO TIMEWALKER ATIVADO! Viajando de volta para a Web Retrô de 1999...');
      setHistory(newHistory);
      setInputVal('');

      if (onTriggerTimewalker) {
        onTriggerTimewalker();
      } else {
        document.body.classList.add('site-timewalker-active');
      }
      return;
    }

    if (cmd === 'english' || cmd === 'ingles' || cmd === 'inglês' || cmd === 'en') {
      unlockAchievement('polyglot');
      if (changeLang) changeLang('en');
      else toggleLang();
      newHistory.push('> 🌐 Switched site language to English!');
      setHistory(newHistory);
      setInputVal('');
      return;
    }

    if (cmd === 'portugues' || cmd === 'português' || cmd === 'portuguese' || cmd === 'pt') {
      unlockAchievement('polyglot');
      if (changeLang) changeLang('pt');
      else toggleLang();
      newHistory.push('> 🌐 Idioma do site alterado para Português!');
      setHistory(newHistory);
      setInputVal('');
      return;
    }

    if (cmd === 'lang' || cmd === 'idioma' || cmd === 'language' || cmd === 'polyglot') {
      unlockAchievement('polyglot');
      toggleLang();
      newHistory.push('> 🌐 Idioma alterado com sucesso / Language switched successfully!');
      setHistory(newHistory);
      setInputVal('');
      return;
    }

    if (cmd === 'dark' || cmd === 'escuro') {
      if (theme !== 'dark' && onToggleTheme) onToggleTheme();
      newHistory.push('> 🌙 Tema escuro ativado!');
      setHistory(newHistory);
      setInputVal('');
      return;
    }

    if (cmd === 'light' || cmd === 'claro') {
      if (theme !== 'light' && onToggleTheme) onToggleTheme();
      newHistory.push('> ☀️ Tema claro ativado!');
      setHistory(newHistory);
      setInputVal('');
      return;
    }

    if (cmd === 'game' || cmd === 'games' || cmd === 'arcade') {
      setHistory([...newHistory, ...terminalCommands.games]);
      setInputVal('');
      return;
    }

    if (cmd === 'reset' || cmd === 'achievements reset' || cmd === 'reset achievements') {
      const ALL_OTHER = ['mosca', 'titulo', 'konami', 'matrix', 'navinha', 'root', 'tilt', 'breakout', 'starwars', 'clean', 'polyglot', 'timewalker'];
      const allUnlocked = ALL_OTHER.every(id => achievements.has(id));
      let resetMsg;
      try {
        if (allUnlocked) {
          localStorage.setItem('ricardodev_achievements', JSON.stringify(['sacrificio']));
          setAchievements(new Set(['sacrificio']));
          window.dispatchEvent(new CustomEvent('ricardodev-achievement-unlocked', { detail: { id: 'sacrificio' } }));
          resetMsg = ['', '💀 SACRIFÍCIO REALIZADO!', '────────────────────────────────────────────────', '> Todas as conquistas foram sacrificadas...', '> Mas uma permanece para sempre.', '> Apenas quem completa tudo pode fazer esse sacrifício.', ''];
        } else {
          localStorage.removeItem('ricardodev_achievements');
          setAchievements(new Set());
          window.dispatchEvent(new CustomEvent('ricardodev-achievement-unlocked'));
          resetMsg = ['', t('terminal.achievementsReset'), '────────────────────────────────────────────────', t('terminal.achievementsResetDesc1'), t('terminal.achievementsResetDesc2'), ''];
        }
        localStorage.removeItem('ricardodev_fly_shown');
        localStorage.removeItem('ricardodev_root_used');
        localStorage.removeItem('ricardodev_postit_shown');
      } catch (e) {}
      setHistory([...newHistory, ...resetMsg]);
      setInputVal('');
      return;
    }

    if (cmd === 'achievements' || cmd === 'conquistas' || cmd === 'secrets') {
      setHistory([
        ...newHistory,
        '',
        t('terminal.achievementsGallery'),
        t('terminal.achievementsGalleryDesc1'),
        t('terminal.achievementsGalleryDesc2'),
        ''
      ]);
      setInputVal('');
      return;
    }

    if (cmd === 'help') {
      setHistory([...newHistory, ...(lang === 'en' ? terminalCommandsEn.help : terminalCommands.help)]);
    } else if (cmd === 'sobre') {
      setHistory([...newHistory, t('terminal.aboutResp')]);
    } else if (cmd === 'skills') {
      setHistory([...newHistory, t('terminal.skillsResp')]);
    } else if (cmd === 'projetos') {
      setHistory([...newHistory, t('terminal.projectsResp')]);
    } else if (cmd === 'livros') {
      setHistory([...newHistory, t('terminal.booksResp')]);
    } else if (cmd === 'contato') {
      setHistory([...newHistory, t('terminal.contactResp')]);
    } else {
      setHistory([...newHistory, t('terminal.cmdUnknown').replace('{cmd}', cmd)]);
    }

    setInputVal('');
  };

  const content = (
    <React.Fragment>
      <div ref={cliContainerRef} className={isModal ? "relative w-full max-w-5xl mx-auto p-4 sm:p-6 my-auto" : "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c140e] border border-[#10b981]/30 mb-3">
          <TerminalIcon className="w-3.5 h-3.5 text-[#00ff88]" />
          <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">{t('terminal.badge')}</span>
        </div>

        <h2 ref={cliTitleRef} className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 select-none">
          RICARDO.<span className="text-[#00ff88]">DEV</span> {t('terminal.titleTerm')}
        </h2>
        {isModal && (
          <p className="text-xs text-slate-400 font-mono">
            {lang === 'en' ? 'Exclusive CLI Terminal & Arcade Sandbox Area' : 'Área Exclusiva de Terminal CLI & Jogos Retrô'}
          </p>
        )}
      </div>

      {/* Mosca aleatória que pousa no título quando o CLI fica inativo por 12s */}
      <FlyEasterEgg isActive={true} containerRef={cliContainerRef} titleRef={cliTitleRef} />

      {/* Terminal Window Mockup */}
      <div className="terminal-flash-target max-w-4xl mx-auto glass-card rounded-2xl border border-[#00ff88]/40 overflow-hidden shadow-[0_0_50px_rgba(0,255,136,0.15)] font-mono text-xs sm:text-sm">
        
        {/* Top Bar */}
        <div className="bg-[#040705] px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block cursor-pointer" onClick={isModal ? onClose : undefined} title="Fechar" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-2 text-slate-400 text-xs">
              {gameActive ? t('terminal.arcadeMode') : 'bash - 80x24 (CLI Environment)'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {gameActive ? (
              <div className="flex items-center gap-4 text-xs font-bold text-white">
                <span className="text-[#00ff88]">{t('terminal.points')} {score}</span>
                <span className="text-[#00f2fe]">{t('terminal.lives')} {'❤️'.repeat(lives)}</span>
                <button
                  onClick={() => setGameActive(false)}
                  className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500/40 text-[11px] flex items-center gap-1 border border-red-500/30 cursor-pointer"
                >
                  <X className="w-3 h-3" /> {t('terminal.exit')}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[#00ff88] text-xs">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span>{t('terminal.online')}</span>
              </div>
            )}

            {isModal && (
              <button
                onClick={onClose}
                className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-600 hover:text-white border border-red-500/40 text-xs font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title={lang === 'en' ? 'Exit CLI & Return to Portfolio' : 'Sair do CLI & Voltar ao Portfólio'}
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'en' ? 'Return to Portfolio' : 'Voltar ao Portfólio'}</span>
              </button>
            )}
          </div>
        </div>

          {/* Terminal Screen / Canvas Game Container */}
          {gameActive ? (
            <div className="relative bg-[#050906] flex flex-col items-center justify-center p-4">
              <canvas
                ref={canvasRef}
                width={540}
                height={320}
                className="w-full max-w-[540px] h-[320px] rounded-xl border border-[#00ff88]/30 bg-[#050906] shadow-inner"
              />

              {/* Touch Controls Bar for Mobile/Tablet */}
              <div className="w-full max-w-[540px] mt-3 flex items-center justify-between gap-2 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTouchMove('left')}
                    className="p-3 rounded-xl bg-white/10 text-white hover:bg-[#00ff88]/20 hover:text-[#00ff88] border border-white/10"
                    title={t('terminal.moveLeft')}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleTouchMove('right')}
                    className="p-3 rounded-xl bg-white/10 text-white hover:bg-[#00ff88]/20 hover:text-[#00ff88] border border-white/10"
                    title={t('terminal.moveRight')}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handleTouchShoot}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#00ff88] text-black font-extrabold text-xs flex items-center gap-2 shadow-glow-sm"
                >
                  <Zap className="w-4 h-4" /> {t('terminal.shoot')}
                </button>
              </div>
            </div>
          ) : (
            <div ref={outputContainerRef} className="p-6 bg-[#050906]/90 min-h-[300px] max-h-[420px] overflow-y-auto space-y-2 text-slate-200">
              {history.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.startsWith('ricardo@dev')
                      ? 'text-[#00ff88] font-bold'
                      : line.startsWith('[OK]')
                      ? 'text-emerald-400'
                      : line.startsWith('STATUS:')
                      ? 'text-[#00ff88] font-extrabold'
                      : line.startsWith('★')
                      ? 'text-[#f59e0b] font-semibold drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]'
                      : line.startsWith('⚡')
                      ? 'text-[#a855f7] font-extrabold text-sm tracking-wide drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]'
                      : line.startsWith('Comandos')
                      ? 'text-[#00f2fe] font-bold'
                      : line.includes('WARNING')
                      ? 'text-red-500 font-extrabold text-base animate-pulse'
                      : line.startsWith('[███')
                      ? 'text-red-400 font-mono font-bold'
                      : line.includes('Deleting')
                      ? 'text-red-400 font-bold'
                      : line.includes('Brincadeira')
                      ? 'text-[#00ff88] font-extrabold text-base drop-shadow-[0_0_10px_rgba(0,255,136,0.6)]'
                      : line.includes('Boa tentativa')
                      ? 'text-[#f59e0b] font-bold text-sm'
                      : line.includes('Sou dev')
                      ? 'text-slate-400 italic text-xs'
                      : line.includes('Firewall')
                      ? 'text-emerald-400 font-bold'
                      : 'text-slate-300'
                  }
                >
                  {line}
                </div>
              ))}
            </div>
          )}

          {/* Terminal Input Form */}
          {!gameActive && (
            <form onSubmit={handleCommandSubmit} className="bg-[#040705] px-4 py-3 border-t border-white/10 flex items-center gap-2">
              <span className={`font-bold shrink-0 ${adminMode ? 'text-yellow-400' : 'text-[#00ff88]'}`}>
                {adminMode ? t('terminal.passwordPrompt') : t('terminal.prompt')}
              </span>
              <input
                ref={inputRef}
                type={adminMode ? 'password' : 'text'}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={adminMode ? t('terminal.passwordPlaceholder') : t('terminal.helpPlaceholder')}
                className="w-full bg-transparent text-white focus:outline-none font-mono text-xs sm:text-sm placeholder-slate-600"
                autoFocus
              />
              <button type="submit" className="p-1.5 rounded bg-[#10b981]/20 text-[#00ff88] hover:bg-[#10b981]/40 cursor-pointer">
                <Play className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

        </div>

        {/* Button to view all achievements / secrets (Locked & Unlocked) */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              if (onOpenAchievements) onOpenAchievements();
              setLocalAchievementsOpen(true);
            }}
            className="achv-cta-btn group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#0c2e17] via-[#071f11] to-[#0c2e17] border border-[#00ff88]/40 hover:border-[#00ff88] text-white font-bold text-sm shadow-[0_0_25px_rgba(0,255,136,0.15)] hover:shadow-[0_0_35px_rgba(0,255,136,0.35)] transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/15 via-transparent to-[#00f2fe]/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Trophy className="w-5 h-5 text-[#00ff88] group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">{t('terminal.viewAchievements')}</span>
            <span className="relative z-10 ml-1 px-2.5 py-0.5 rounded-full bg-[#00ff88]/20 text-[#00ff88] text-xs font-mono border border-[#00ff88]/40">
              {achievements.size}/{Object.keys(ACHIEVEMENTS_META).length}
            </span>
          </motion.button>
          <p className="text-xs font-mono text-slate-400 mt-2.5">
            Digite <code className="text-[#00ff88] bg-black/40 px-1.5 py-0.5 rounded border border-[#00ff88]/30">help</code> {t('terminal.helpHint')}
          </p>
        </div>

      </div>

      {/* FALLING POST-IT NOTE (Positioned on the clean right side) */}
      {showPostIt && (
        <div className="fixed inset-0 z-[9999991] pointer-events-none flex items-start justify-end pr-6 sm:pr-12 lg:pr-20" style={{ perspective: '800px' }}>
          <div
            className="pointer-events-auto mt-24 sm:mt-32 relative cursor-grab active:cursor-grabbing"
            style={{
              animation: 'postItFall 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              transformOrigin: 'top center',
            }}
          >
            {/* Tape strip */}
            <div
              className="cli-postit-tape absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 rounded-sm z-10"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 100%)',
                backdropFilter: 'blur(2px)',
                transform: 'rotate(-2deg)',
              }}
            />

            {/* Post-it body */}
            <div
              className="cli-postit relative w-64 sm:w-72 p-6 rounded-sm shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #fef08a 0%, #fde047 50%, #facc15 100%)',
                transform: 'rotate(-3deg)',
                boxShadow: '4px 4px 15px rgba(0,0,0,0.3), inset 0 -3px 6px rgba(0,0,0,0.05)',
              }}
            >
              {/* Folded corner */}
              <div
                className="cli-postit-corner absolute bottom-0 right-0 w-8 h-8"
                style={{
                  background: 'linear-gradient(135deg, transparent 50%, #eab308 50%)',
                  borderTopLeftRadius: '4px',
                }}
              />

              {/* Content */}
              <p className="text-[10px] text-amber-800/70 font-mono uppercase tracking-widest mb-1.5 font-bold flex items-center justify-between">
                <span>{t('terminal.memoDev')}</span>
                <span className="text-[9px] text-amber-700/50">v4.2</span>
              </p>

              <div className="border-b border-dashed border-amber-700/30 mb-2.5" />

              <div className="space-y-1 font-mono text-xs text-amber-950 font-medium bg-amber-900/10 p-2 rounded border border-amber-800/20">
                <p><span className="text-amber-800/80">user:</span> <strong className="text-amber-950 font-bold">root</strong></p>
                <p><span className="text-amber-800/80">pass:</span> <strong className="text-amber-950 font-bold">admin</strong></p>
              </div>

              <div className="border-b border-dashed border-amber-700/30 my-2.5" />

              <p className="text-[9.5px] text-amber-900/75 font-mono italic leading-tight">
                {t('terminal.reminder')}
              </p>
            </div>

            {/* Close post-it button */}
            <button
              onClick={closePostIt}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors pointer-events-auto z-20"
              title={t('terminal.removePostIt')}
            >
              ×
            </button>
          </div>

          <style>{`
            @keyframes postItFall {
              0% {
                opacity: 0;
                transform: translateY(-200px) rotate(-15deg) scale(0.5);
              }
              60% {
                opacity: 1;
                transform: translateY(10px) rotate(2deg) scale(1.05);
              }
              80% {
                transform: translateY(-5px) rotate(-1deg) scale(0.98);
              }
              100% {
                opacity: 1;
                transform: translateY(0) rotate(-3deg) scale(1);
              }
            }
          `}</style>
        </div>
      )}

      {/* RICKROLL OVERLAY (Rendered via Portal to document.body at top z-index z-[999999]) */}
      {rickrollActive && createPortal(
        <div className="rickroll-scope fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl p-4 overflow-y-auto">
          {/* Top bar fake admin */}
          <div className="absolute top-0 left-0 right-0 bg-[#0d1510] border-b border-[#00ff88]/30 px-6 py-4 flex items-center justify-between z-[1000000]">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-white/90 text-xs sm:text-sm font-mono font-bold">{t('terminal.adminPanel')}</span>
            </div>
            <button
              onClick={() => setRickrollActive(false)}
              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 transition-all font-mono text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
              title={t('terminal.closePanelTitle')}
            >
              <X className="w-4 h-4" />
              <span>{t('terminal.closePanel')}</span>
            </button>
          </div>

          {/* YouTube Video */}
          <div className="w-full max-w-4xl aspect-video mt-16 rounded-2xl overflow-hidden border-2 border-[#00ff88]/40 shadow-[0_0_80px_rgba(0,255,136,0.3)] bg-black">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&loop=1&playlist=dQw4w9WgXcQ"
              title="Admin Panel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Troll message */}
          <div className="mt-6 text-center px-4">
            <p className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              🎵 Never Gonna Give You Up!
            </p>
            <p className="text-slate-300 text-sm font-mono">
              {t('terminal.trollMessage')}
            </p>
            <p className="text-[#00ff88] text-xs font-mono mt-2 font-bold">
              {t('terminal.rickrolled')}
            </p>
          </div>
        </div>,
        document.body
      )}
    </React.Fragment>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-[999999] overflow-y-auto bg-[#040805]/95 backdrop-blur-2xl flex flex-col justify-between select-none">
        {content}
        {/* Local Achievements Modal inside CLI */}
        <AchievementsModal
          isOpen={localAchievementsOpen}
          onClose={() => setLocalAchievementsOpen(false)}
        />
      </div>
    );
  }

  return (
    <section ref={sectionRef} id="terminal" className="py-24 relative z-10">
      {content}
      <AchievementsModal
        isOpen={localAchievementsOpen}
        onClose={() => setLocalAchievementsOpen(false)}
      />
    </section>
  );
}
