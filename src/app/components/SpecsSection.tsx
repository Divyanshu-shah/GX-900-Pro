'use client';

import { motion } from 'framer-motion';

const specGroups = [
  {
    title: 'Audio',
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
    specs: [
      { key: 'Type', val: 'Detachable Boom' },
      { key: 'Pattern', val: 'Cardioid' },
      { key: 'Noise Cancellation', val: 'AI-Powered' },
      { key: 'Frequency', val: '100Hz – 10kHz' },
    ]
  },
  {
    title: 'Connectivity',
    specs: [
      { key: 'Wireless', val: '2.4GHz Lossless' },
      { key: 'Bluetooth', val: '5.3 with LC3' },
      { key: 'Wired', val: 'USB-C / 3.5mm' },
      { key: 'Latency', val: '<5ms (2.4GHz)' },
    ]
  },
  {
    title: 'Design',
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
    <section id="specs" className="relative pt-[120px] pb-[160px] px-6 lg:px-20 bg-[#0a0a0c] border-t border-white/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="w-8 h-[1px] bg-gradient-to-r from-[#0050ff] to-[#00d6ff]" />
          <span className="text-[11px] font-semibold uppercase tracking-[4px] text-[#00d6ff]">Technical Specifications</span>
          <div className="w-8 h-[1px] bg-gradient-to-l from-[#0050ff] to-[#00d6ff]" />
        </div>
        
        <h2 className="text-[clamp(36px,5vw,64px)] font-black leading-[1.05] tracking-[-0.03em] mb-16 text-center">
          Every detail,<br/>
          <span className="text-gradient">engineered.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specGroups.map((group, i) => (
            <motion.div 
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-10%' }}
              className="p-8 rounded-[20px] bg-[#0d0d10] border border-white/5 transition-all duration-300 hover:border-[#0050ff]/15 hover:bg-[#111117]"
            >
              <h3 className="text-[14px] font-semibold tracking-[2px] uppercase text-[#00d6ff] mb-6 pb-4 border-b border-white/5">
                {group.title}
              </h3>
              
              <div className="flex flex-col">
                {group.specs.map((spec, j) => (
                  <div key={j} className="flex justify-between items-center py-2.5 border-b border-white/[0.03] last:border-0">
                    <span className="text-[13px] text-white/35">{spec.key}</span>
                    <span className="text-[13px] font-medium text-white text-right ml-4">{spec.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
