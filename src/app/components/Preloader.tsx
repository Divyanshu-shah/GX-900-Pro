'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ isLoading }: { isLoading: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        // Accelerating counter — slow start, fast finish
        const step = prev < 30 ? 2 : prev < 70 ? 3 : 5;
        return Math.min(100, prev + step);
      });
    }, 30);
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-[#030305] flex flex-col items-center justify-center"
        >
          {/* Animated rings */}
          <div className="relative w-[140px] h-[140px] mb-10">
            <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0050ff] animate-[spin_1.5s_linear_infinite]"
            />
            <div
              className="absolute inset-[10px] rounded-full border border-transparent border-r-[#00d6ff] animate-[spin_1s_linear_infinite_reverse]"
            />
            <div
              className="absolute inset-[22px] rounded-full border border-transparent border-b-[#8b5cf6] animate-[spin_0.8s_linear_infinite]"
            />
            {/* Center counter */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-black tabular-nums bg-gradient-to-br from-white to-white/60 text-transparent bg-clip-text">
                {count}
              </span>
            </div>
          </div>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-center"
          >
            <div className="text-sm font-bold tracking-[8px] uppercase text-white/90 mb-2">
              GX-900 PRO
            </div>
            <div className="text-[10px] tracking-[4px] uppercase text-white/25 animate-[pulse_1.5s_ease-in-out_infinite]">
              Initializing Experience
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[200px]">
            <div className="h-[1px] w-full bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0050ff] via-[#00d6ff] to-[#8b5cf6]"
                style={{ width: `${count}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
