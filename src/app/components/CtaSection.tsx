'use client';

import { motion } from 'framer-motion';

export default function CtaSection() {
  return (
    <section id="cta-section" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image & Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.08, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-10%' }}
          src="/assets/images/headset-hero.png" 
          alt="GX-900 Pro" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.3)_0%,rgba(5,5,5,0.85)_65%,rgba(5,5,5,1)_100%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,80,255,0.15)_0%,transparent_70%)]" />
      </div>

      {/* Content */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ margin: '-20%' }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-20 py-32 md:py-40 flex flex-col items-center justify-center min-h-screen text-center"
      >
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[clamp(48px,8vw,96px)] font-black leading-none tracking-[-0.04em] mb-5 text-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            Play at your<br/>
            <span className="text-gradient">peak.</span>
          </h2>
          
          <p className="text-[17px] text-white/60 mb-10 leading-relaxed max-w-[400px] mx-auto">
            GX-900 Pro. Designed for gamers who demand more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#" className="group relative inline-flex items-center justify-center gap-2.5 px-9 py-4 text-[15px] font-semibold rounded-full bg-gradient-to-br from-[#0050ff] to-[#00d6ff] text-white transition-all shadow-[0_4px_24px_rgba(0,80,255,0.3),0_0_60px_rgba(0,80,255,0.1)] hover:shadow-[0_8px_32px_rgba(0,80,255,0.5),0_0_80px_rgba(0,80,255,0.15)] hover:-translate-y-0.5 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Enter the Game</span>
              <svg className="relative z-10" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            
            <a href="#specs" className="inline-flex items-center justify-center gap-2 px-9 py-4 text-[15px] font-semibold rounded-full bg-transparent border border-white/15 text-white transition-all hover:bg-white/[0.04] hover:border-white/30 hover:-translate-y-0.5">
              <span>View Specs</span>
            </a>
          </div>
          
          <div className="text-center">
            <span className="block text-[11px] text-white/35 tracking-[2px] uppercase mb-4">
              Compatible with
            </span>
            <div className="flex flex-wrap gap-3 justify-center">
              {['PlayStation 5', 'Xbox Series X', 'PC', 'Switch'].map(platform => (
                <span key={platform} className="text-[11px] font-medium px-4 py-1.5 rounded-full border border-white/5 text-white/60 bg-white/[0.02] transition-colors hover:border-[#00d6ff]/30 hover:text-white">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
