'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Subtle parallax on scroll (within the single screen)
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <div className="relative w-full h-full">
        
        {/* Background Image & Effects (Parallax depth) */}
        <motion.div 
          className="absolute inset-0 z-0 origin-center"
          style={{ scale: scaleImage }}
        >
          <motion.img 
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            src="/assets/images/headset-hero.png" 
            alt="GX-900 Pro Gaming Headset" 
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.2)_0%,rgba(5,5,5,0.85)_70%,rgba(5,5,5,1)_100%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-0 pointer-events-none opacity-100 bg-[radial-gradient(circle,rgba(0,80,255,0.12)_0%,transparent_70%)] animate-pulse" />
        </motion.div>

        {/* Content (3D Tilt & Fade) */}
        <motion.div 
          style={{ 
            opacity: opacityText, 
            y: yText,
          }}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-20 h-full flex flex-col items-center text-center justify-end pb-[10vh]"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-white/5 text-[11px] text-[#00d6ff] tracking-[2px] uppercase font-semibold mb-7 backdrop-blur-md bg-[#0050ff]/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d6ff] shadow-[0_0_8px_rgba(0,214,255,0.4)] animate-[pulse_2s_ease-in-out_infinite]" />
            <span>Next Generation Audio</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-[clamp(64px,12vw,140px)] font-black leading-[0.9] tracking-[-0.04em] mb-4 text-shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
          >
            <span className="block">GX-900</span>
            <span className="block text-gradient">Pro</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-[clamp(18px,2.5vw,28px)] font-light text-white/60 tracking-[0.05em] mb-3"
          >
            Enter the game.
          </motion.p>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-[15px] text-white/35 leading-[1.7] max-w-[440px] mx-auto"
          >
            Next-gen immersive audio engineered<br />for competitive gaming.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#00d6ff] to-transparent animate-[scrollPulse_2s_ease-in-out_infinite] origin-top" />
            <span className="text-[10px] tracking-[3px] uppercase text-white/35">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
