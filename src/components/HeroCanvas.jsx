import React, { useEffect, useRef } from 'react';

export default function HeroCanvas({ matrixMode = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particle system configuration with Cyan & Green
    const numParticles = Math.min(Math.floor((width * height) / 18000), 75);
    const particles = [];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.8 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.08 + 0.08;
        const rand = Math.random();
        this.color = rand > 0.6 ? '#10b981' : rand > 0.3 ? '#34d399' : '#00ff88';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Subtle mouse influence
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    // Matrix Rain Effect if matrixMode is active
    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]*=+#';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = new Array(columns).fill(1);

    const render = () => {
      // Ease mouse position
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      if (matrixMode) {
        ctx.fillStyle = 'rgba(4, 7, 5, 0.15)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#00ff88';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      } else {
        ctx.clearRect(0, 0, width, height);

        // Draw connecting lines between close particles (Cyan & Green gradients)
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 115) {
              const opacity = (1 - dist / 115) * 0.22;
              const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
              grad.addColorStop(0, particles[i].color);
              grad.addColorStop(1, particles[j].color);

              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = grad;
              ctx.globalAlpha = opacity;
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
          }
        }

        // Connect to mouse cursor
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const opacity = (1 - dist / 160) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = '#00f2fe';
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }

          particles[i].update();
          particles[i].draw();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [matrixMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 opacity-65"
    />
  );
}
