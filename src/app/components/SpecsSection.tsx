'use client';

import { motion } from 'framer-motion';

const specGroups = [
  {
    title: 'Audio',
    icon: '🎧',
    accent: '#0050ff',
    specs: [
      { key: 'Driver Size', val: '50mm Neodymium' },
      { key: 'Frequency Response', val: '20Hz – 40kHz' },
      { key: 'Impedance', val: '32 Ohms' },
      { key: 'Sound', val: '7.1 Virtual Surround' },
      { key: 'Spatial Audio', val: '360° Tempest / Dolby Atmos' },
    ]
  },
  {
    title: 'Microphone',
    icon: '🎙️',
    accent: '#00d6ff',
    specs: [
      { key: 'Type', val: 'Detachable Boom' },
      { key: 'Pattern', val: 'Cardioid' },
      { key: 'Noise Cancellation', val: 'AI-Powered' },
      { key: 'Frequency', val: '100Hz – 10kHz' },
    ]
  },
  {
    title: 'Connectivity',
    icon: '📡',
    accent: '#8b5cf6',
    specs: [
      { key: 'Wireless', val: '2.4GHz Lossless' },
      { key: 'Bluetooth', val: '5.3 with LC3' },
      { key: 'Wired', val: 'USB-C / 3.5mm' },
      { key: 'Latency', val: '<5ms (2.4GHz)' },
    ]
  },
  {
    title: 'Design',
    icon: '✨',
    accent: '#00d6ff',
    specs: [
      { key: 'Weight', val: '295g' },
      { key: 'Battery', val: '60 hours' },
      { key: 'Charging', val: 'USB-C Fast Charge' },
      { key: 'Colors', val: 'Matte Black / Arctic White' },
      { key: 'RGB', val: '16.8M Colors, App Control' },
    ]
  }
];

export default function SpecsSection() {
  return (
    <section id="specs" className="relative pt-[120px] pb-[160px] px-6 lg:px-20 bg-[#0a0a0c] border-t border-white/5 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,80,255,0.06)_0%,transparent_70%)]" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gradient-to-r from-[#0050ff] to-[#00d6ff]" />
            <span className="text-[11px] font-semibold uppercase tracking-[4px] text-[#00d6ff]">Technical Specifications</span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-[#0050ff] to-[#00d6ff]" />
          </div>

          <h2 className="text-[clamp(36px,5vw,64px)] font-black leading-[1.05] tracking-[-0.03em]">
            Every detail,<br/>
            <span className="text-gradient">engineered.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-10%' }}
              className="group relative"
            >
              {/* Animated border glow */}
              <div
                className="absolute -inset-[1px] rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  background: `linear-gradient(135deg, ${group.accent}40, transparent 50%, ${group.accent}20)`,
                }}
              />

              <div className="relative p-7 rounded-[20px] bg-[#0d0d10] border border-white/[0.04] transition-all duration-500 group-hover:border-transparent group-hover:bg-[#0f0f14] overflow-hidden h-full">
                {/* Top glow effect on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${group.accent}80, transparent)` }}
                />

                {/* Inner radial glow */}
                <div
                  className="absolute -top-20 left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${group.accent}08 0%, transparent 70%)` }}
                />

                {/* Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.04] relative">
                  <span className="text-xl">{group.icon}</span>
                  <h3
                    className="text-[14px] font-bold tracking-[2px] uppercase transition-colors duration-300"
                    style={{ color: group.accent }}
                  >
                    {group.title}
                  </h3>
                </div>

                {/* Spec rows */}
                <div className="flex flex-col">
                  {group.specs.map((spec, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 + j * 0.05 }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center py-2.5 border-b border-white/[0.02] last:border-0 group/row"
                    >
                      <span className="text-[12px] text-white/30 group-hover/row:text-white/50 transition-colors duration-200">{spec.key}</span>
                      <span className="text-[12px] font-medium text-white/80 group-hover/row:text-white transition-colors duration-200 text-right ml-4">{spec.val}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
