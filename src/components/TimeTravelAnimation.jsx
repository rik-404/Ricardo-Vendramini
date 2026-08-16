import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Clock, Gauge, Zap, Flame, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DEST_SAMPLES = {
  TO_PAST: ['OCT 26 1??9', 'OCT 2? 1999', '?? 26 19??', 'OCT 26 19?9', 'JUL 04 1985', 'MAY 04 1955'],
  TO_FUTURE: ['AUG 09 2026', '?? 09 2026', 'AUG 09 20??', 'AUG ?? 2026', 'OCT 21 2015', 'JUL 04 1985'],
};

export default function TimeTravelAnimation({ mode, onComplete }) {
  // mode: 'TO_PAST' (2026 -> 1999) | 'TO_FUTURE' (1999 -> 2026)
  const { lang } = useLanguage();
  const isToPast = mode === 'TO_PAST';
  const startYear = isToPast ? 2026 : 1999;
  const targetYear = isToPast ? 1999 : 2026;

  const [speed, setSpeed] = useState(0);
  const [yearDisplay, setYearDisplay] = useState(startYear);
  const [hasJumped, setHasJumped] = useState(false);
  const [destVal, setDestVal] = useState(isToPast ? 'OCT ?? 19??' : '?? ?? 20??');

  // Speed streaks (synthesized light trail particles)
  const streaks = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        top: (i * 37 + 13) % 100,
        width: 6 + ((i * 53) % 14) + (i % 3) * 4,
        duration: 0.3 + ((i * 29) % 18) / 100,
        delay: -((i * 47) % 30) / 10,
        color: i % 2 ? '#00f2fe' : '#00ff88',
      })),
    [mode]
  );

  // Lightning strike flashes during pre-88 acceleration
  const lightning = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        left: 8 + i * 32 + (i % 2) * 6,
        delay: 0.9 + i * 0.85,
        duration: 0.35 + (i % 2) * 0.2,
      })),
    [mode]
  );

  useEffect(() => {
    if (!mode) return;
    const step = isToPast ? -1 : 1;

    setSpeed(0);
    setYearDisplay(startYear);
    setHasJumped(false);
    setDestVal(isToPast ? 'OCT ?? 19??' : '?? ?? 20??');

    // Eased throttle ramp to 88 MPH (accelerate fast, ease at the top)
    const SPEED_END = 88;
    const ACCEL_MS = 2100;
    let startAccel = null;
    let raf;
    let jumpFired = false;

    const tick = (t) => {
      if (startAccel === null) startAccel = t;
      const elapsed = t - startAccel;
      const p = Math.min(elapsed / ACCEL_MS, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const s = Math.min(SPEED_END, Math.round(eased * SPEED_END));
      setSpeed(s);
      if (s >= SPEED_END && !jumpFired) {
        jumpFired = true;
        setHasJumped(true);
      }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Digital destination readout flicker (classic: doesn't lock until 88)
    const destInterval = setInterval(() => {
      setDestVal((prev) => {
        const samples = DEST_SAMPLES[mode];
        let next = prev;
        while (next === prev) next = samples[Math.floor(Math.random() * samples.length)];
        return next;
      });
    }, 130);

    // Real-time year counter (time dilation display)
    let currentYear = startYear;
    let yearInterval = null;
    const yearTimeout = setTimeout(() => {
      yearInterval = setInterval(() => {
        currentYear += step;
        setYearDisplay(currentYear);
        setDestVal(isToPast ? `OCT 26 ${currentYear}` : `AUG 09 ${currentYear}`);
        if (currentYear === targetYear) clearInterval(yearInterval);
      }, 60);
      clearInterval(destInterval);
    }, 900);

    // Auto complete sequence after 4.4s
    const doneTimeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(yearTimeout);
      clearTimeout(doneTimeout);
      clearInterval(destInterval);
      if (yearInterval) clearInterval(yearInterval);
    };
  }, [mode]);

  // Stop the destination flicker once the jump fires
  useEffect(() => {
    if (hasJumped) {
      setDestVal(isToPast ? 'OCT 26 1999' : 'AUG 09 2026');
    }
  }, [hasJumped]);

  if (!mode) return null;

  const shakeOn = speed >= 70;
  const gridAnim = `${Math.max(0.12, 0.4 - speed * 0.0022)}s`;
  const fluxSpeed = `${Math.max(0.5, 3 - speed * 0.03)}s`;
  const trailsOpacity = Math.min(1, speed / 88 + 0.35);

  const finalDest = isToPast ? 'OCT 26 1999' : 'AUG 09 2026';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="timewalk-scope fixed inset-0 z-[9999999] bg-black flex flex-col items-center justify-between p-6 overflow-hidden select-none font-mono text-white"
      >
        {/* Chromatic aberration border bleed while accelerating */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{ boxShadow: speed > 40 ? '0 0 60px 8px rgba(0,255,136,0.12), 0 0 120px 24px rgba(0,242,254,0.08), inset 0 0 80px 20px rgba(0,242,254,0.10)' : 'inset 0 0 80px 20px rgba(0,242,254,0.06)' }}
        />

        {/* Lightning strikes (pre-88 storm) */}
        <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
          {lightning.map((l, i) => (
            <div
              key={i}
              className="absolute top-0 w-px h-[45vh]"
              style={{
                left: `${l.left}%`,
                background: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0))',
                filter: 'drop-shadow(0 0 8px #aeb3ff)',
                opacity: 0,
                animation: `lightningFlash ${l.duration}s linear ${l.delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Animated Cyberpunk Grid Road (speed follows throttle) */}
        <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
          <div
            className="tw-grid absolute inset-[-20%]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0, 255, 136, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 242, 254, 0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              transform: 'perspective(500px) rotateX(60deg) translateY(-60px) scale(2)',
              animation: `gridRoadMove ${gridAnim} linear infinite`,
            }}
          />
        </div>

        {/* Speed light streaks (intensity scales with velocity) */}
        <div
          className="absolute inset-0 pointer-events-none z-[2] overflow-hidden transition-opacity duration-150"
          style={{ opacity: speed > 12 ? Math.min(1, speed / 55) : 1 }}
        >
          {streaks.map((s, i) => (
            <div
              key={i}
              className="tw-streak absolute h-[2px] rounded-full"
              style={{
                top: `${s.top}%`,
                left: '100%',
                width: `${s.width}vw`,
                background: `linear-gradient(to left, ${s.color}, transparent)`,
                boxShadow: `0 0 8px ${s.color}`,
                opacity: speed > 12 ? 1 : 0,
                animation: `streakMove ${Math.max(0.1, s.duration - speed * 0.0012)}s linear ${s.delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Time vortex tunnel (active after the 88 MPH jump) */}
        <div
          className="absolute inset-0 pointer-events-none z-[3] transition-opacity duration-300"
          style={{ opacity: hasJumped ? 1 : 0 }}
        >
          <div
            className="tw-vortex absolute -inset-[35%]"
            style={{
              background:
                'conic-gradient(from 0deg, rgba(0,255,136,0) 0deg, rgba(0,242,254,0.35) 40deg, rgba(0,255,136,0) 80deg, rgba(0,255,136,0.25) 160deg, rgba(0,242,254,0.35) 220deg, rgba(0,255,136,0) 280deg)',
              WebkitMask: 'radial-gradient(closest-side, transparent 30%, black 55%, transparent 72%)',
              mask: 'radial-gradient(closest-side, transparent 30%, black 55%, transparent 72%)',
              animation: 'tunnelSpin 1.1s linear infinite',
            }}
          />
        </div>

        {/* White flash + shockwave at 88 MPH jump */}
        <AnimatePresence>
          {hasJumped && (
            <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden">
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="absolute inset-0 bg-white"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 1.15, ease: 'easeOut' }}
                className="absolute w-80 h-80 rounded-full border-4 border-[#00f2fe] shadow-[0_0_60px_#00f2fe]"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: 5, opacity: 0 }}
                transition={{ duration: 1.3, ease: 'easeOut', delay: 0.1 }}
                className="absolute w-96 h-96 rounded-full border-2 border-[#00ff88]"
              />
            </div>
          )}
        </AnimatePresence>

        {/* Main content (screen shake near 88 MPH) */}
        <div
          className="relative z-10 w-full h-full flex flex-col items-center justify-between"
          style={{ animation: shakeOn ? 'uxShake 0.09s linear infinite' : 'none' }}
        >
          {/* Top Digital Flux Capacitor & Destination Circuits */}
          <div className="relative z-10 w-full max-w-2xl text-center space-y-4 pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#05150a] border border-[#00ff88]/50 shadow-[0_0_20px_rgba(0,255,136,0.4)]">
              <Clock className="w-4 h-4 text-[#00ff88] animate-spin" />
              <span className="text-xs font-bold text-[#00ff88] tracking-widest uppercase">
                {isToPast ? 'PROTOCÓLO DE VIAGEM NO TEMPO // TIMEWALKER' : 'RESTAURANDO LINHA TEMPORAL // PRESENT 2026'}
              </span>
            </div>

            {/* DeLorean Flux Capacitor Circuits Box */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto p-3 sm:p-4 rounded-2xl bg-[#09120c] border-2 border-[#00ff88]/40 shadow-[0_0_30px_rgba(0,255,136,0.2)]">
              {/* Destination Time */}
              <div className="p-2 sm:p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-center">
                <span className="text-[9px] sm:text-[10px] text-red-400 font-bold block uppercase tracking-wider">DESTINO</span>
                <span
                  className={`text-lg sm:text-2xl font-extrabold tracking-wider ${hasJumped ? 'text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.9)]' : 'text-red-500/70'}`}
                  style={hasJumped ? undefined : { textShadow: '0 0 6px rgba(239,68,68,0.4)' }}
                >
                  {hasJumped ? finalDest : destVal}
                </span>
              </div>

              {/* Present Time */}
              <div className="p-2 sm:p-3 rounded-xl bg-yellow-950/80 border border-yellow-500/50 text-center">
                <span className="text-[9px] sm:text-[10px] text-yellow-400 font-bold block uppercase tracking-wider">TEMPO ATUAL</span>
                <span className={`text-lg sm:text-2xl font-extrabold tracking-wider ${yearDisplay === targetYear ? 'text-[#00ff88] drop-shadow-[0_0_14px_#00ff88] animate-pulse' : 'text-yellow-400'} drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]`}>
                  {yearDisplay}
                </span>
              </div>

              {/* Speedometer */}
              <div className="p-2 sm:p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/50 text-center">
                <span className="text-[9px] sm:text-[10px] text-cyan-400 font-bold block uppercase tracking-wider">VELOCIDADE</span>
                <span className={`text-lg sm:text-2xl font-extrabold tracking-wider ${speed === 88 ? 'text-[#00ff88] drop-shadow-[0_0_12px_#00ff88] animate-pulse' : 'text-cyan-400'}`}>
                  {speed} <span className="text-xs">MPH</span>
                </span>
              </div>
            </div>
          </div>

          {/* Center: DeLorean Time Machine Car & Sparks FX */}
          <div className="relative my-auto flex flex-col items-center justify-center">
            {/* Flux capacitor rotating energy rings (speed up with throttle) */}
            <div
              className="tw-ring absolute w-[420px] h-[420px] rounded-full pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, #00ff88 30deg, transparent 70deg, transparent 180deg, #00f2fe 210deg, transparent 250deg)',
                WebkitMask: 'radial-gradient(closest-side, transparent 76%, black 79%)',
                mask: 'radial-gradient(closest-side, transparent 76%, black 79%)',
                opacity: 0.55,
                animation: `fluxSpin ${fluxSpeed} linear infinite`,
              }}
            />
            <div
              className="tw-ring absolute w-[340px] h-[340px] rounded-full pointer-events-none"
              style={{
                background: 'conic-gradient(from 180deg, transparent 0deg, #00f2fe 25deg, transparent 60deg, transparent 220deg, #00ff88 255deg, transparent 290deg)',
                WebkitMask: 'radial-gradient(closest-side, transparent 79%, black 82%)',
                mask: 'radial-gradient(closest-side, transparent 79%, black 82%)',
                opacity: 0.5,
                animation: `fluxSpin ${Math.max(0.35, fluxSpeed * 0.6)}s linear infinite reverse`,
              }}
            />

            {/* Lightning Shockwave Ring */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border-2 border-[#00f2fe]/40 animate-ping pointer-events-none opacity-50" />
            <div className="absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full border-2 border-[#00ff88]/60 animate-pulse pointer-events-none opacity-70" />

            {/* DeLorean Car Visual */}
            <motion.div
              animate={{
                x: speed >= 70 ? [0, -5, 5, -3, 3, 0] : [0, -2, 2, -1, 1, 0],
                y: speed >= 70 ? [0, -7, 3, -4, 1, 0] : [0, -3, 1, -2, 0],
                scale: speed === 88 ? [1, 1.08, 1.15, 1.05] : [1, 1.02, 1],
              }}
              transition={{ repeat: Infinity, duration: 0.15 }}
              className="relative flex flex-col items-center"
            >
              {/* Fire Trails behind the tires */}
              <div
                className="absolute bottom-2 left-4 w-28 h-6 bg-gradient-to-l from-amber-500 via-orange-600 to-transparent blur-sm animate-pulse rounded-full"
                style={{ opacity: trailsOpacity, transform: `scaleX(${1 + speed / 180})` }}
              />
              <div
                className="absolute bottom-2 right-4 w-28 h-6 bg-gradient-to-r from-amber-500 via-orange-600 to-transparent blur-sm animate-pulse rounded-full"
                style={{ opacity: trailsOpacity, transform: `scaleX(${1 + speed / 180})` }}
              />

              {/* DeLorean Body Vector */}
              <div className="relative w-64 sm:w-80 h-28 sm:h-36 flex items-center justify-center">
                <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-32 sm:w-44 h-16 bg-gradient-to-r from-[#00f2fe]/80 via-[#00ff88]/40 to-transparent blur-md rounded-full pointer-events-none" />

                <div className="dt-panel relative z-10 p-5 rounded-3xl bg-gradient-to-r from-[#0c2417] via-[#040f09] to-[#0c2417] border-2 border-[#00ff88] shadow-[0_0_50px_rgba(0,255,136,0.6)] flex items-center gap-3">
                  <Car className="w-12 h-12 sm:w-16 sm:h-16 text-[#00ff88] drop-shadow-[0_0_15px_#00ff88]" />
                  <div className="flex flex-col items-start">
                    <span className={`text-[10px] sm:text-xs font-mono ${speed === 88 ? 'text-[#00ff88] drop-shadow-[0_0_8px_#00ff88] animate-pulse' : 'text-cyan-400'}`}>
                      {speed === 88 ? <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> 1.21 GIGAWATTS ALCANÇADOS!</span> : <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> ACELERANDO PARA 88 MPH...</span>}
                    </span>
                    <div className="mt-1.5 w-full h-1.5 rounded-full bg-black/70 overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-[#00f2fe] via-[#10b981] to-[#00ff88] rounded-full shadow-[0_0_8px_#00ff88]"
                        style={{ transform: `scaleX(${speed / 100})`, transformOrigin: 'left', transition: 'transform 80ms linear' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Fire Trails on Ground */}
            <div
              className="w-80 sm:w-[480px] h-3 bg-gradient-to-r from-amber-500 via-red-600 to-amber-500 rounded-full blur-md shadow-[0_0_20px_#f97316] mt-2 animate-pulse"
              style={{ opacity: trailsOpacity }}
            />
          </div>

          {/* Bottom Banner Status */}
          <div className="relative z-10 w-full max-w-xl text-center space-y-2 pb-4">
            <p className="text-xs sm:text-sm font-bold text-slate-200 tracking-wider">
              {isToPast
                ? '"Se você vai construir uma máquina do tempo em um carro, por que não fazer com estilo?"'
                : '"O seu futuro ainda não foi escrito. O de ninguém foi. O seu futuro é o que você fizer dele."'}
            </p>

            <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-[#00ff88]/30">
              <div
                className="h-full bg-gradient-to-r from-[#00f2fe] via-[#10b981] to-[#00ff88] rounded-full shadow-[0_0_15px_#00ff88]"
                style={{ transform: `scaleX(${speed / 88})`, transformOrigin: 'left', transition: 'transform 80ms linear' }}
              />
            </div>

            <p className="text-[11px] text-[#00ff88] font-mono font-bold tracking-widest uppercase animate-pulse">
              {speed === 88 ? (
                <span className="flex items-center justify-center gap-2">
                  <Gauge className="w-3.5 h-3.5" /> SALTO TEMPORAL EM ANDAMENTO...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" /> ENTRANDO NA FENDA TEMPORAL...
                </span>
              )}
            </p>
          </div>
        </div>

        <style>{`
          @keyframes gridRoadMove {
            0% { background-position: 0 0; }
            100% { background-position: 0 40px; }
          }
          @keyframes streakMove {
            from { transform: translateX(0); }
            to { transform: translateX(-130vw); }
          }
          @keyframes fluxSpin {
            to { transform: rotate(360deg); }
          }
          @keyframes tunnelSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes uxShake {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(-2px, 1px); }
            50% { transform: translate(2px, -1px); }
            75% { transform: translate(-1px, -1px); }
          }
          @keyframes lightningFlash {
            0%, 80%, 90%, 100% { opacity: 0; }
            85% { opacity: 0.9; }
            87% { opacity: 0.15; }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}