'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function AudioSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let wavePhase = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = Math.min(400, window.innerWidth - 40);
      canvas.width = w * dpr;
      canvas.height = 60 * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `60px`;
    };

    const loop = () => {
      if (!isInView) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      
      wavePhase += 0.03;

      const layers = [
        { color: '#0050FF', amp: 12, freq: 0.012, alpha: 0.6 },
        { color: '#00D6FF', amp: 8, freq: 0.018, alpha: 0.45 },
        { color: '#8B5CF6', amp: 6, freq: 0.024, alpha: 0.3 },
      ];

      layers.forEach((layer, idx) => {
        ctx.beginPath();
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = 1.5 * dpr;
        ctx.globalAlpha = layer.alpha;
        ctx.shadowBlur = 0;

        for (let x = 0; x < w; x += 3) {
          const y = h / 2
            + Math.sin(x * layer.freq + wavePhase + idx * 1.2) * layer.amp * dpr
            + Math.sin(x * layer.freq * 2.1 + wavePhase * 1.4) * (layer.amp * 0.25) * dpr;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView]);

  return (
    <section id="audio" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image & Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.08, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-10%' }}
          src="/assets/images/headset-audio.png" 
          alt="GX-900 Pro Audio System" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-l from-[#050505]/95 via-[#050505]/40 to-[#050505]/95" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,214,255,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Content */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        onViewportEnter={() => setIsInView(true)}
        onViewportLeave={() => setIsInView(false)}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ margin: '-20%' }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-20 py-32 md:py-40 flex items-center justify-end min-h-screen"
      >
        <div className="max-w-[520px] ml-auto relative z-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gradient-to-r from-[#0050ff] to-[#00d6ff]" />
            <span className="text-[11px] font-semibold uppercase tracking-[4px] text-[#00d6ff]">Audio System</span>
          </div>
          
          <h2 className="text-[clamp(32px,4.5vw,56px)] font-black leading-[1.05] tracking-[-0.03em] mb-8 text-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
            Hear everything.<br/>
            <span className="text-gradient-cyan">Miss nothing.</span>
          </h2>

          <div className="flex flex-col gap-5 mb-8">
            <div className="flex items-baseline gap-4">
              <div className="text-[28px] font-black min-w-[70px] bg-gradient-to-br from-[#00d6ff] to-[#00ffd4] text-transparent bg-clip-text">360°</div>
              <div className="text-[14px] text-white/60 text-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">Spatial audio awareness</div>
            </div>
            <div className="flex items-baseline gap-4">
              <div className="text-[28px] font-black min-w-[70px] bg-gradient-to-br from-[#00d6ff] to-[#00ffd4] text-transparent bg-clip-text">AI</div>
              <div className="text-[14px] text-white/60 text-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">Noise-isolating pro microphone clarity</div>
            </div>
            <div className="flex items-baseline gap-4">
              <div className="text-[28px] font-black min-w-[70px] bg-gradient-to-br from-[#00d6ff] to-[#00ffd4] text-transparent bg-clip-text">&lt;5ms</div>
              <div className="text-[14px] text-white/60 text-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">Real-time team communication precision</div>
            </div>
          </div>

          <div className="mt-2 w-full max-w-[400px]">
            <canvas ref={canvasRef} className="block w-full" />
          </div>
        </div>
      </motion.div>

      {/* Tech Callouts (Hidden on mobile) */}
      <div className="absolute inset-0 z-[5] pointer-events-none hidden lg:block">
        <motion.div 
          initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true, margin: '-20%' }}
          className="absolute flex flex-row-reverse items-center gap-2 top-[38%] left-[18%]"
        >
          <span className="w-2 h-2 rounded-full bg-[#00d6ff] shadow-[0_0_12px_rgba(0,214,255,0.4),_0_0_4px_#00d6ff] animate-pulse shrink-0" />
          <span className="w-12 h-[1px] bg-gradient-to-l from-[#00d6ff] to-transparent" />
          <span className="text-[11px] font-semibold tracking-[1px] uppercase text-white/60 whitespace-nowrap px-3 py-1 bg-black/70 border border-[#00d6ff]/15 rounded-md backdrop-blur-md">
            Boom Microphone
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} viewport={{ once: true, margin: '-20%' }}
          className="absolute flex flex-row-reverse items-center gap-2 top-[55%] left-[22%]"
        >
          <span className="w-2 h-2 rounded-full bg-[#00d6ff] shadow-[0_0_12px_rgba(0,214,255,0.4),_0_0_4px_#00d6ff] animate-pulse shrink-0" />
          <span className="w-12 h-[1px] bg-gradient-to-l from-[#00d6ff] to-transparent" />
          <span className="text-[11px] font-semibold tracking-[1px] uppercase text-white/60 whitespace-nowrap px-3 py-1 bg-black/70 border border-[#00d6ff]/15 rounded-md backdrop-blur-md">
            Audio Processor
          </span>
        </motion.div>
      </div>
    </section>
  );
}
