'use client';

import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 25; // Reduced from 45

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Visibility observer — pause when tab hidden or element off-screen
    const handleVisibility = () => { isVisible = !document.hidden; };
    document.addEventListener('visibilitychange', handleVisibility);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
    }

    const particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap DPR
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const init = () => {
      resize();
      window.addEventListener('resize', resize);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.2 + 0.04,
          hue: Math.random() > 0.5 ? 210 : 190,
        });
      }
      loop();
    };

    const loop = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.width;
      const h = canvas.height;
      const sw = w / dpr;
      const sh = h / dpr;

      ctx.clearRect(0, 0, w, h);

      // No shadowBlur — much cheaper
      ctx.shadowBlur = 0;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = sw;
        if (p.x > sw) p.x = 0;
        if (p.y < 0) p.y = sh;
        if (p.y > sh) p.y = 0;

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = `hsl(${p.hue}, 100%, 70%)`;
        ctx.beginPath();
        ctx.arc(p.x * dpr, p.y * dpr, p.size * dpr, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connections — skip every other pair for perf
      const maxDist = 90;
      for (let i = 0; i < particles.length; i += 2) {
        for (let j = i + 2; j < particles.length; j += 2) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = dx * dx + dy * dy; // skip sqrt
          const maxDist2 = maxDist * maxDist;

          if (d < maxDist2) {
            ctx.globalAlpha = (1 - d / maxDist2) * 0.04;
            ctx.strokeStyle = `hsl(${a.hue}, 80%, 60%)`;
            ctx.lineWidth = 0.5 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x * dpr, a.y * dpr);
            ctx.lineTo(b.x * dpr, b.y * dpr);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(loop);
    };

    init();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none opacity-40"
    />
  );
}
