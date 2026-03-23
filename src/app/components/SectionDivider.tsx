'use client';

import { motion } from 'framer-motion';

export default function SectionDivider({ accent = '#0050ff' }: { accent?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="relative w-full h-[1px] overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`,
        }}
      />
      {/* Center dot */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
        style={{
          background: accent,
          boxShadow: `0 0 12px ${accent}60, 0 0 4px ${accent}`,
        }}
      />
    </motion.div>
  );
}
