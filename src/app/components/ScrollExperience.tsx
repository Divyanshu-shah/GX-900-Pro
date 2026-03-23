'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ─── Lightweight waveform (reduced draw cost) ───
function WaveformCanvas({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full pointer-events-none z-[4]"
      style={{ height: '100px' }}
    />
  );
}

export default function ScrollExperience() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const img4Ref = useRef<HTMLDivElement>(null);
  const img5Ref = useRef<HTMLDivElement>(null);

  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const text5Ref = useRef<HTMLDivElement>(null);

  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // ─── Optimised waveform (lower cost: no shadowBlur, step=3) ───
  const wavePhase = useRef(0);
  const animFrameId = useRef<number>(0);
  const isVisible = useRef(false);

  const drawWave = useCallback(() => {
    if (!isVisible.current) {
      animFrameId.current = requestAnimationFrame(drawWave);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) { animFrameId.current = requestAnimationFrame(drawWave); return; }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // cap DPR lower
    const w = canvas.parentElement?.clientWidth || window.innerWidth;
    const cw = w * dpr;
    const ch = 100 * dpr;

    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
      canvas.style.width = `${w}px`;
      canvas.style.height = '100px';
    }

    ctx.clearRect(0, 0, cw, ch);
    wavePhase.current += 0.02;

    const layers = [
      { color: '#0050FF', amp: 14, freq: 0.008, alpha: 0.45, offset: 0 },
      { color: '#00D6FF', amp: 10, freq: 0.012, alpha: 0.3, offset: 1.2 },
      { color: '#8B5CF6', amp: 6, freq: 0.016, alpha: 0.2, offset: 2.4 },
    ];

    // No shadowBlur — much faster
    ctx.shadowBlur = 0;
    const step = 3; // draw every 3rd pixel

    layers.forEach((l) => {
      ctx.beginPath();
      ctx.strokeStyle = l.color;
      ctx.lineWidth = 1.5 * dpr;
      ctx.globalAlpha = l.alpha;

      for (let x = 0; x < cw; x += step) {
        const y =
          ch / 2 +
          Math.sin(x * l.freq + wavePhase.current + l.offset) * l.amp * dpr +
          Math.sin(x * l.freq * 2.3 + wavePhase.current * 1.6) * (l.amp * 0.25) * dpr;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });

    ctx.globalAlpha = 1;
    animFrameId.current = requestAnimationFrame(drawWave);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Visibility observer — pause canvas when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);

    drawWave();

    // ─── Main scroll-driven GSAP timeline ───
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=600%',
          scrub: 0.4,  // ← MUCH tighter scrub = less lag
          pin: true,
          anticipatePin: 1,
        },
      });

      // ──────────────────────────────────
      // PHASE 1 — HERO (0 → 1)
      // ──────────────────────────────────
      tl.fromTo(img1Ref.current,
        { opacity: 1, scale: 1.05, yPercent: 3 },
        { opacity: 1, scale: 1, yPercent: 0, duration: 1, ease: 'power2.out' },
        0
      );
      tl.fromTo(text1Ref.current,
        { opacity: 0, yPercent: 15 },
        { opacity: 1, yPercent: 0, duration: 0.8, ease: 'power3.out' },
        0.2
      );
      tl.fromTo(glow1Ref.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        0
      );

      // ──────────────────────────────────
      // PHASE 1→2 (1 → 2)
      // ──────────────────────────────────
      tl.to(text1Ref.current,
        { opacity: 0, yPercent: -15, duration: 0.6, ease: 'power2.in' }, 1
      );
      tl.to(img1Ref.current,
        { scale: 1.3, opacity: 0, duration: 1, ease: 'power2.inOut' }, 1
      );
      tl.fromTo(img2Ref.current,
        { opacity: 0, scale: 0.85, xPercent: 5 },
        { opacity: 1, scale: 1, xPercent: 0, duration: 1.2, ease: 'power3.out' },
        1.2
      );
      tl.fromTo(text2Ref.current,
        { opacity: 0, yPercent: 10, xPercent: -3 },
        { opacity: 1, yPercent: 0, xPercent: 0, duration: 0.8, ease: 'power3.out' },
        1.6
      );
      tl.to(glow1Ref.current,
        { opacity: 0.5, scale: 1.4, duration: 1, ease: 'power2.inOut' }, 1.2
      );
      tl.fromTo(glow2Ref.current,
        { opacity: 0, scale: 0.6 },
        { opacity: 0.7, scale: 1.2, duration: 1, ease: 'power2.out' },
        1.4
      );

      // ──────────────────────────────────
      // PHASE 2→3 (2.5 → 3.5)
      // ──────────────────────────────────
      tl.to(text2Ref.current,
        { opacity: 0, yPercent: -12, duration: 0.5, ease: 'power2.in' }, 2.5
      );
      tl.to(img2Ref.current,
        { opacity: 0, scale: 1.15, xPercent: -4, duration: 0.8, ease: 'power2.inOut' }, 2.6
      );
      tl.fromTo(img3Ref.current,
        { opacity: 0, scale: 1.15, rotation: 3 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'power3.out' },
        2.8
      );
      tl.fromTo(text3Ref.current,
        { opacity: 0, yPercent: 10 },
        { opacity: 1, yPercent: 0, duration: 0.8, ease: 'power3.out' },
        3.2
      );
      tl.to(glow2Ref.current,
        { opacity: 0.3, scale: 1.5, duration: 0.8, ease: 'power2.inOut' }, 2.8
      );
      tl.to(glow1Ref.current,
        { opacity: 0.7, scale: 1, duration: 1, ease: 'power2.out' }, 3
      );

      // ──────────────────────────────────
      // PHASE 3→4 (4 → 5)
      // ──────────────────────────────────
      tl.to(text3Ref.current,
        { opacity: 0, yPercent: -12, duration: 0.5, ease: 'power2.in' }, 4
      );
      tl.to(img3Ref.current,
        { opacity: 0, scale: 0.9, duration: 0.8, ease: 'power2.inOut' }, 4
      );
      tl.fromTo(img4Ref.current,
        { opacity: 0, scale: 1.1, yPercent: 4 },
        { opacity: 1, scale: 1, yPercent: 0, duration: 1.2, ease: 'power3.out' },
        4.2
      );
      tl.fromTo(text4Ref.current,
        { opacity: 0, yPercent: 10, xPercent: 3 },
        { opacity: 1, yPercent: 0, xPercent: 0, duration: 0.8, ease: 'power3.out' },
        4.6
      );
      tl.to(bgRef.current,
        { background: 'linear-gradient(180deg, #050510 0%, #0a0a18 40%, #0d0d1a 100%)', duration: 1.5, ease: 'power2.inOut' },
        4.2
      );

      // ──────────────────────────────────
      // PHASE 4→5 (5 → 6) — Reassembly
      // ──────────────────────────────────
      tl.to(text4Ref.current,
        { opacity: 0, yPercent: -12, duration: 0.5, ease: 'power2.in' }, 5
      );
      tl.to(img4Ref.current,
        { opacity: 0, scale: 1.2, duration: 0.8, ease: 'power2.inOut' }, 5
      );
      tl.fromTo(img5Ref.current,
        { opacity: 0, scale: 0.7, rotation: -5 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.4, ease: 'power3.out' },
        5.2
      );
      tl.fromTo(text5Ref.current,
        { opacity: 0, yPercent: 12, scale: 0.95 },
        { opacity: 1, yPercent: 0, scale: 1, duration: 1, ease: 'power3.out' },
        5.6
      );
      tl.to(glow1Ref.current,
        { opacity: 1, scale: 1.6, duration: 1.5, ease: 'power2.out' }, 5.2
      );
      tl.to(glow2Ref.current,
        { opacity: 0.5, scale: 1.4, duration: 1.2, ease: 'power2.out' }, 5.4
      );
      tl.to(bgRef.current,
        { background: 'linear-gradient(180deg, #050510 0%, #080818 30%, #0c0c20 60%, #0f0f28 100%)', duration: 1.5, ease: 'power2.inOut' },
        5.2
      );
    });

    return () => {
      cancelAnimationFrame(animFrameId.current);
      observer.disconnect();
      ctx.revert();
    };
  }, [drawWave]);

  // Shared GPU-promoted image layer class
  const imgLayerClass = "absolute inset-0 z-[3] will-change-transform";
  const imgClass = "w-full h-full object-cover object-center";

  return (
    <section id="scroll-experience" className="relative">
      <div
        ref={wrapperRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Background */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-0"
          style={{ background: '#050505' }}
        />

        {/* Ambient glow orbs */}
        <div
          ref={glow1Ref}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full z-[2] pointer-events-none opacity-0 will-change-transform"
          style={{ background: 'radial-gradient(circle, rgba(0,80,255,0.15) 0%, transparent 70%)' }}
        />
        <div
          ref={glow2Ref}
          className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full z-[2] pointer-events-none opacity-0 will-change-transform"
          style={{ background: 'radial-gradient(circle, rgba(0,214,255,0.12) 0%, transparent 70%)' }}
        />

        {/* ── IMAGE LAYERS (GPU-promoted, no filter animations) ── */}

        <div ref={img1Ref} className={imgLayerClass}>
          <img src="/assets/images/headset-hero.png" alt="GX-900 Pro" className={imgClass} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.15)_0%,rgba(5,5,5,0.8)_65%,rgba(5,5,5,1)_100%)]" />
        </div>

        <div ref={img2Ref} className={`${imgLayerClass} opacity-0`}>
          <img src="/assets/images/headset-exploded.png" alt="GX-900 Pro Exploded" className={imgClass} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.1)_0%,rgba(5,5,5,0.75)_60%,rgba(5,5,5,1)_100%)]" />
        </div>

        <div ref={img3Ref} className={`${imgLayerClass} opacity-0`}>
          <img src="/assets/images/headset-audio.png" alt="GX-900 Pro Audio" className={imgClass} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.1)_0%,rgba(5,5,5,0.7)_55%,rgba(5,5,5,1)_100%)]" />
        </div>

        <div ref={img4Ref} className={`${imgLayerClass} opacity-0`}>
          <img src="/assets/images/headset-performance.png" alt="GX-900 Pro Performance" className={imgClass} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.1)_0%,rgba(5,5,5,0.7)_55%,rgba(5,5,5,1)_100%)]" />
        </div>

        <div ref={img5Ref} className={`${imgLayerClass} opacity-0`}>
          <img src="/assets/images/headset-hero.png" alt="GX-900 Pro Reassembled" className={imgClass} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.15)_0%,rgba(5,5,5,0.75)_60%,rgba(5,5,5,1)_100%)]" />
        </div>

        {/* ── TEXT PANELS ── */}

        {/* Text 1 — Hero */}
        <div
          ref={text1Ref}
          className="absolute inset-0 z-[10] flex flex-col items-center justify-end pb-[12vh] pointer-events-none opacity-0 will-change-transform"
        >
          <div className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full border border-white/10 text-[11px] text-[#00d6ff] tracking-[3px] uppercase font-semibold mb-6 bg-[#0050ff]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d6ff] shadow-[0_0_8px_rgba(0,214,255,0.5)] animate-[pulse_2s_ease-in-out_infinite]" />
            Next Generation Audio
          </div>
          <h1 className="text-[clamp(48px,10vw,120px)] font-black leading-[0.9] tracking-[-0.04em] text-center mb-4">
            <span className="block">ENGINEERED FOR</span>
            <span className="block bg-gradient-to-r from-[#0050ff] via-[#00d6ff] to-[#8b5cf6] text-transparent bg-clip-text">PURE SOUND</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 tracking-wide font-light text-center">GX-900 PRO</p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="w-[1px] h-14 bg-gradient-to-b from-[#00d6ff] to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
            <span className="text-[10px] tracking-[4px] uppercase text-white/30">Scroll to explore</span>
          </div>
        </div>

        {/* Text 2 — Exploded */}
        <div ref={text2Ref} className="absolute inset-0 z-[10] flex items-center pointer-events-none opacity-0 will-change-transform">
          <div className="ml-8 md:ml-20 max-w-[480px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[2px] bg-gradient-to-r from-[#00d6ff] to-transparent" />
              <span className="text-[11px] font-semibold uppercase tracking-[4px] text-[#00d6ff]">Engineering</span>
            </div>
            <h2 className="text-[clamp(32px,5vw,64px)] font-black leading-[1.05] tracking-[-0.03em] mb-5">
              Precision in<br />
              <span className="bg-gradient-to-r from-[#0050ff] to-[#00d6ff] text-transparent bg-clip-text">Every Component</span>
            </h2>
            <p className="text-[15px] text-white/55 leading-relaxed max-w-[380px]">
              Each part engineered with aerospace-grade precision. 50mm neodymium drivers, adaptive headband, and memory foam cushions work in perfect harmony.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {['50mm Drivers', 'Adaptive Headband', 'Memory Foam'].map((tag) => (
                <span key={tag} className="text-[11px] font-semibold px-4 py-1.5 rounded-full border border-[#00d6ff]/20 text-[#00d6ff] bg-[#0050ff]/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Text 3 — Audio */}
        <div ref={text3Ref} className="absolute inset-0 z-[10] flex items-center justify-end pointer-events-none opacity-0 will-change-transform">
          <div className="mr-8 md:mr-20 max-w-[480px] text-right">
            <div className="flex items-center justify-end gap-3 mb-5">
              <span className="text-[11px] font-semibold uppercase tracking-[4px] text-[#8b5cf6]">Audio System</span>
              <div className="w-10 h-[2px] bg-gradient-to-l from-[#8b5cf6] to-transparent" />
            </div>
            <h2 className="text-[clamp(32px,5vw,64px)] font-black leading-[1.05] tracking-[-0.03em] mb-5">
              Powered by<br />
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#c084fc] text-transparent bg-clip-text">Advanced Acoustics</span>
            </h2>
            <p className="text-[15px] text-white/55 leading-relaxed">
              Custom-tuned drivers deliver 360° spatial audio with AI-powered noise isolation. Every frequency meticulously balanced.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 justify-end">
              {[
                { val: '360°', label: 'Spatial Audio' },
                { val: '<5ms', label: 'Latency' },
                { val: 'AI', label: 'Noise Control' },
              ].map((s) => (
                <div key={s.val} className="text-center">
                  <div className="text-[24px] font-black bg-gradient-to-br from-[#8b5cf6] to-[#c084fc] text-transparent bg-clip-text">{s.val}</div>
                  <div className="text-[10px] text-white/40 tracking-wider uppercase mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text 4 — Performance */}
        <div ref={text4Ref} className="absolute inset-0 z-[10] flex items-center pointer-events-none opacity-0 will-change-transform">
          <div className="ml-auto mr-8 md:mr-20 max-w-[480px] text-right">
            <div className="flex items-center justify-end gap-3 mb-5">
              <span className="text-[11px] font-semibold uppercase tracking-[4px] text-[#00d6ff]">Performance</span>
              <div className="w-10 h-[2px] bg-gradient-to-l from-[#00d6ff] to-transparent" />
            </div>
            <h2 className="text-[clamp(32px,5vw,64px)] font-black leading-[1.05] tracking-[-0.03em] mb-5">
              Zero Latency.<br />
              <span className="bg-gradient-to-r from-[#0050ff] to-[#00d6ff] text-transparent bg-clip-text">Maximum Power.</span>
            </h2>
            <p className="text-[15px] text-white/55 leading-relaxed">
              Ultra-low 2.4GHz wireless with dual-processor architecture. Every signal path optimised for competitive gaming.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 justify-end">
              {[
                { val: '2.4GHz', label: 'Wireless' },
                { val: '60h', label: 'Battery' },
                { val: '7.1', label: 'Surround' },
              ].map((s) => (
                <div key={s.val} className="text-center">
                  <div className="text-[24px] font-black bg-gradient-to-br from-[#00d6ff] to-[#0050ff] text-transparent bg-clip-text">{s.val}</div>
                  <div className="text-[10px] text-white/40 tracking-wider uppercase mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text 5 — Final CTA */}
        <div ref={text5Ref} className="absolute inset-0 z-[10] flex flex-col items-center justify-center pointer-events-none opacity-0 will-change-transform">
          <h2 className="text-[clamp(40px,8vw,100px)] font-black leading-[0.95] tracking-[-0.04em] text-center mb-6">
            Experience the<br />
            <span className="bg-gradient-to-r from-[#0050ff] via-[#00d6ff] to-[#8b5cf6] text-transparent bg-clip-text">Future of Sound</span>
          </h2>
          <p className="text-lg text-white/50 mb-10 text-center max-w-md">
            GX-900 Pro. Designed for gamers who demand more.
          </p>
          <div className="flex gap-4 pointer-events-auto">
            <a href="#cta-section" className="group relative inline-flex items-center justify-center gap-2.5 px-10 py-4 text-[15px] font-semibold rounded-full bg-gradient-to-br from-[#0050ff] to-[#00d6ff] text-white transition-all shadow-[0_4px_32px_rgba(0,80,255,0.35),0_0_80px_rgba(0,80,255,0.12)] hover:shadow-[0_8px_40px_rgba(0,80,255,0.5),0_0_100px_rgba(0,80,255,0.18)] hover:-translate-y-0.5 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Enter the Game</span>
              <svg className="relative z-10" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#specs" className="inline-flex items-center justify-center px-10 py-4 text-[15px] font-semibold rounded-full border border-white/15 text-white hover:bg-white/[0.04] hover:border-white/30 hover:-translate-y-0.5 transition-all">
              View Specs
            </a>
          </div>
        </div>

        {/* Waveform */}
        <WaveformCanvas canvasRef={canvasRef} />

        {/* Vignette (lightweight, no scanlines) */}
        <div className="absolute inset-0 z-[6] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]" />
      </div>
    </section>
  );
}
