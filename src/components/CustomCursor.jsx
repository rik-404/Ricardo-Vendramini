import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [swatMode, setSwatMode] = useState(false);
  const [gloveMode, setGloveMode] = useState(false);

  useEffect(() => {
    const handleSwat = (e) => setSwatMode(e.detail);
    window.addEventListener('fly-swat', handleSwat);
    return () => window.removeEventListener('fly-swat', handleSwat);
  }, []);

  useEffect(() => {
    const handleGlove = (e) => setGloveMode(e.detail);
    window.addEventListener('glove-cursor', handleGlove);
    return () => window.removeEventListener('glove-cursor', handleGlove);
  }, []);

  // Hide native cursor while boxing glove is active
  useEffect(() => {
    document.body.style.cursor = gloveMode ? 'none' : '';
    return () => { document.body.style.cursor = ''; };
  }, [gloveMode]);

  useEffect(() => {
    // Check if device is touch primary
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if mouse is hovering an interactive element
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .interactive-hover');
      setIsHovered(!!isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  // Smooth trailing effect
  useEffect(() => {
    if (isTouch) return;
    let animationFrame;
    const followMouse = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animationFrame = requestAnimationFrame(followMouse);
    };
    animationFrame = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(animationFrame);
  }, [position, isTouch]);

  if (isTouch) return null;

  // Boxing glove mode: real 🥊 emoji follows the mouse
  if (gloveMode && isVisible) {
    return (
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] select-none"
        style={{
          transform: `translate3d(${position.x - 26}px, ${position.y - 22}px, 0) rotate(-20deg)`,
          fontSize: '38px',
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        🥊
      </div>
    );
  }

  if (!isVisible || swatMode) return null;

  return (
    <>
      {/* Outer Halo */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-transform duration-100 ease-out border border-[#00ff88]/40"
        style={{
          transform: `translate3d(${trailingPos.x - (isHovered ? 24 : 16)}px, ${trailingPos.y - (isHovered ? 24 : 16)}px, 0) scale(${isHovered ? 1.4 : 1})`,
          width: '32px',
          height: '32px',
          backgroundColor: isHovered ? 'rgba(0, 255, 136, 0.08)' : 'rgba(16, 185, 129, 0.03)',
          boxShadow: isHovered ? '0 0 20px rgba(0, 255, 136, 0.3)' : 'none',
        }}
      />
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#00ff88]"
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
          width: '8px',
          height: '8px',
          boxShadow: '0 0 10px #00ff88, 0 0 20px #00ff88',
        }}
      />
    </>
  );
}
