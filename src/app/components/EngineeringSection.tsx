'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Precision Drivers',
    desc: 'High-performance 50mm neodymium drivers tuned for clarity and impact.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Ergonomic Design',
    desc: 'Engineered for long gaming sessions with adaptive comfort system.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Advanced Cooling',
    desc: 'Breathable mesh and thermal management for peak performance.'
  }
];

export default function EngineeringSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax & 3D entrance effects based on scroll position naturally
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [10, 0]); // Rotates into place 3D
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]); // Fades in

  return (
    <section 
      id="engineering" 
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden [perspective:1200px]"
    >
      {/* Background Image & Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div style={{ y: imageY, width: '100%', height: '120%' }} className="absolute -top-[10%] left-0">
          <motion.img 
            initial={{ scale: 1.08, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-10%' }}
            src="/assets/images/headset-exploded.png" 
            alt="GX-900 Pro Exploded View" 
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#050505]/95 via-[#050505]/40 to-[#050505]/95" />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,80,255,0.15)_0%,transparent_70%)]" 
        />
      </div>

      {/* Content (3D Rotation on Scroll Enter) */}
      <motion.div 
        style={{ y: contentY, rotateX, opacity, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-20 py-32 md:py-40 flex items-center min-h-screen origin-center"
      >
        <div className="max-w-[520px] mr-auto relative z-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gradient-to-r from-[#0050ff] to-[#00d6ff]" />
            <span className="text-[11px] font-semibold uppercase tracking-[4px] text-[#00d6ff]">Engineering</span>
          </div>
          
          <h2 className="text-[clamp(32px,4.5vw,56px)] font-black leading-[1.05] tracking-[-0.03em] mb-8 text-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
            Built for<br/>
            <span className="text-gradient">competitive</span><br/>
            precision.
          </h2>
          
          <div className="flex flex-col gap-6">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: '-10%' }}
                className="flex gap-4 items-start relative group"
              >
                {/* 3D hover effect on icon */}
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#0050ff]/10 border border-[#0050ff]/20 flex items-center justify-center text-[#00d6ff] transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,80,255,0.3)]">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold mb-1 group-hover:text-[#00d6ff] transition-colors duration-300">{feature.title}</h4>
                  <p className="text-[13px] text-white/60 leading-relaxed text-shadow-[0_1px_8px_rgba(0,0,0,0.4)] transition-colors duration-300 group-hover:text-white/80">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tech Callouts (Parallax layer 3) */}
      <div className="absolute inset-0 z-[5] pointer-events-none hidden lg:block">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]) }}
          className="w-full h-full absolute"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true, margin: '-20%' }}
            className="absolute flex items-center gap-2 top-[28%] right-[18%]"
          >
            <span className="w-2 h-2 rounded-full bg-[#00d6ff] shadow-[0_0_12px_rgba(0,214,255,0.4),_0_0_4px_#00d6ff] animate-pulse shrink-0" />
            <span className="w-12 h-[1px] bg-gradient-to-r from-[#00d6ff] to-transparent" />
            <span className="text-[11px] font-semibold tracking-[1px] uppercase text-white/60 whitespace-nowrap px-3 py-1 bg-black/70 border border-[#00d6ff]/15 rounded-md backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              50mm Neodymium Drivers
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true, margin: '-20%' }}
            className="absolute flex items-center gap-2 top-[18%] right-[32%]"
          >
            <span className="w-2 h-2 rounded-full bg-[#00d6ff] shadow-[0_0_12px_rgba(0,214,255,0.4),_0_0_4px_#00d6ff] animate-pulse shrink-0" />
            <span className="w-12 h-[1px] bg-gradient-to-r from-[#00d6ff] to-transparent" />
            <span className="text-[11px] font-semibold tracking-[1px] uppercase text-white/60 whitespace-nowrap px-3 py-1 bg-black/70 border border-[#00d6ff]/15 rounded-md backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              Adaptive Headband
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} viewport={{ once: true, margin: '-20%' }}
            className="absolute flex items-center gap-2 top-[62%] right-[15%]"
          >
            <span className="w-2 h-2 rounded-full bg-[#00d6ff] shadow-[0_0_12px_rgba(0,214,255,0.4),_0_0_4px_#00d6ff] animate-pulse shrink-0" />
            <span className="w-12 h-[1px] bg-gradient-to-r from-[#00d6ff] to-transparent" />
            <span className="text-[11px] font-semibold tracking-[1px] uppercase text-white/60 whitespace-nowrap px-3 py-1 bg-black/70 border border-[#00d6ff]/15 rounded-md backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              Memory Foam Cushions
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
