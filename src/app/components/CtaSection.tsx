'use client';

import { motion } from 'framer-motion';

export default function CtaSection() {
  return (
    <section id="cta-section" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
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
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.3)_0%,rgba(5,5,5,0.88)_65%,rgba(5,5,5,1)_100%)]" />

        {/* Animated gradient orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,80,255,0.12)_0%,transparent_70%)] animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute top-[30%] left-[60%] w-[400px] h-[400px] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)] animate-[pulse_5s_ease-in-out_infinite_0.5s]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-20 py-32 md:py-40 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="max-w-[750px] mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-[11px] font-semibold tracking-[3px] uppercase text-[#00d6ff] mb-8 mx-auto"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d6ff] animate-[pulse_2s_ease-in-out_infinite]" />
            Available Now
          </motion.div>

          {/* Headline with shimmer */}
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-[clamp(48px,8vw,100px)] font-black leading-none tracking-[-0.04em] mb-6 relative"
          >
            <span className="block">Play at your</span>
            <span className="block relative">
              <span className="text-gradient">peak.</span>
              {/* Shimmer overlay */}
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite]"
                aria-hidden="true"
              >
                peak.
              </span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-[17px] text-white/55 mb-12 leading-relaxed max-w-[420px] mx-auto"
          >
            GX-900 Pro. Designed for gamers who demand more.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          >
            {/* Primary button with animated shimmer */}
            <a
              href="#"
              className="group relative inline-flex items-center justify-center gap-2.5 px-10 py-[18px] text-[15px] font-semibold rounded-full bg-gradient-to-br from-[#0050ff] to-[#00d6ff] text-white transition-all shadow-[0_4px_32px_rgba(0,80,255,0.35),0_0_80px_rgba(0,80,255,0.1)] hover:shadow-[0_8px_48px_rgba(0,80,255,0.55),0_0_120px_rgba(0,80,255,0.2)] hover:-translate-y-1 overflow-hidden"
            >
              {/* Shimmer line */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative z-10">Enter the Game</span>
              <svg className="relative z-10 transition-transform group-hover:translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            <a href="#specs" className="group inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] font-semibold rounded-full bg-transparent border border-white/10 text-white transition-all hover:bg-white/[0.04] hover:border-white/20 hover:-translate-y-1">
              <span>View Specs</span>
              <svg className="transition-transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </a>
          </motion.div>

          {/* Platform badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="block text-[10px] text-white/25 tracking-[3px] uppercase mb-4">
              Compatible with
            </span>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { name: 'PlayStation 5', icon: '🎮' },
                { name: 'Xbox Series X', icon: '🟩' },
                { name: 'PC', icon: '🖥️' },
                { name: 'Switch', icon: '🔴' },
              ].map((platform) => (
                <span
                  key={platform.name}
                  className="group inline-flex items-center gap-1.5 text-[11px] font-medium px-4 py-2 rounded-full border border-white/[0.04] text-white/50 bg-white/[0.01] transition-all duration-300 hover:border-[#00d6ff]/20 hover:text-white/80 hover:bg-[#00d6ff]/[0.03] cursor-default"
                >
                  <span className="text-sm">{platform.icon}</span>
                  {platform.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
