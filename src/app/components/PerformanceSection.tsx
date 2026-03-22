'use client';

import { useRef, useState, MouseEvent } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useTransform as useMotionTransform } from 'framer-motion';

const stats = [
  { value: '2.4GHz', label: 'Ultra-low latency wireless' },
  { value: '60h', label: 'Battery life per charge' },
  { value: '7.1', label: 'Virtual surround channels' },
  { value: 'USB-C', label: 'Fast charge technology' }
];

function TiltCard({ stat, i }: { stat: any, i: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useMotionTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useMotionTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-10%' }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-7 rounded-[20px] bg-[#0d0d10]/60 border border-white/5 backdrop-blur-xl overflow-hidden cursor-crosshair transform-gpu shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
    >
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(0,80,255,0.08)_0%,transparent_60%)] group-hover:bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.15)_0%,transparent_60%)] transition-colors duration-500" 
      />
      
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="text-[28px] font-black mb-1.5 bg-gradient-to-br from-[#8b5cf6] to-[#c084fc] text-transparent bg-clip-text group-hover:from-[#00d6ff] group-hover:to-[#0050ff] transition-all duration-500">
          {stat.value}
        </div>
        <div className="text-[12px] text-white/60 leading-snug group-hover:text-white/80 transition-colors">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
}

export default function PerformanceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  return (
    <section 
      id="performance" 
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden [perspective:1000px]"
    >
      {/* Background Image & Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div style={{ y: yBg, scale: scaleBg, width: '100%', height: '120%' }} className="absolute -top-[10%] left-0 origin-center">
          <motion.img 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-10%' }}
            src="/assets/images/headset-performance.png" 
            alt="GX-900 Pro Performance" 
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.3)_0%,rgba(5,5,5,0.85)_65%,rgba(5,5,5,1)_100%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(139,92,246,0.14)_0%,transparent_70%)] animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-20 py-32 md:py-40 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="max-w-[700px] relative z-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gradient-to-r from-[#0050ff] to-[#00d6ff]" />
            <span className="text-[11px] font-semibold uppercase tracking-[4px] text-[#00d6ff]">Performance</span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-[#0050ff] to-[#00d6ff]" />
          </div>
          
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            viewport={{ margin: '-10%' }}
            className="text-[clamp(32px,4.5vw,56px)] font-black leading-[1.05] tracking-[-0.03em] mb-12 text-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
          >
            Zero lag.<br/>
            <span className="text-gradient-purple">Pure immersion.</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[500px] mx-auto [perspective:1000px]">
            {stats.map((stat, i) => (
              <TiltCard key={i} stat={stat} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
