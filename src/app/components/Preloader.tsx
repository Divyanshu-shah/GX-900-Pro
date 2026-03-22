'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1, visibility: 'visible' }}
          exit={{ opacity: 0, visibility: 'hidden' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-[#050505] flex items-center justify-center"
        >
          <div className="relative text-center">
            <div className="absolute top-1/2 left-1/2 rounded-full border border-transparent w-[120px] h-[120px] -mt-[60px] -ml-[60px] border-t-[#0050ff] animate-[spin_1.2s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 rounded-full border border-transparent w-[90px] h-[90px] -mt-[45px] -ml-[45px] border-r-[#00d6ff] animate-[spin_0.9s_linear_infinite_reverse]" />
            <div className="absolute top-1/2 left-1/2 rounded-full border border-transparent w-[60px] h-[60px] -mt-[30px] -ml-[30px] border-b-[#8b5cf6] animate-[spin_0.7s_linear_infinite]" />
            
            <span className="block text-sm font-bold tracking-[6px] uppercase mt-[90px]">
              GX-900 PRO
            </span>
            <span className="block text-[11px] text-white/35 tracking-[3px] uppercase mt-2 animate-[pulse_1.5s_ease-in-out_infinite]">
              Loading Experience...
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
