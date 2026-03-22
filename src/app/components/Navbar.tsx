'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#hero', label: 'Overview', id: 'hero' },
  { href: '#engineering', label: 'Engineering', id: 'engineering' },
  { href: '#audio', label: 'Audio', id: 'audio' },
  { href: '#performance', label: 'Performance', id: 'performance' },
  { href: '#specs', label: 'Specs', id: 'specs' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active link detection
      const sections = ['specs', 'performance', 'audio', 'engineering', 'hero'];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-6 lg:px-20">
        
        <a href="#" className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
          <span className="text-lg drop-shadow-[0_0_8px_rgba(0,214,255,0.4)]">⚡</span>
          <span>GX-900 Pro</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map(({ href, label, id }) => (
            <a 
              key={id} 
              href={href} 
              className={`text-[13px] font-medium relative py-1 transition-colors ${
                activeSection === id ? 'text-white' : 'text-white/60 hover:text-white group'
              }`}
            >
              {label}
              <span className={`absolute bottom-[-2px] left-0 h-[1.5px] rounded-[1px] bg-gradient-to-r from-[#0050ff] to-[#00d6ff] transition-all duration-300 ${
                activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a 
          href="#cta-section" 
          className="hidden md:flex items-center gap-[6px] text-[13px] font-semibold py-2 px-5 rounded-full bg-gradient-to-br from-[#0050ff] to-[#00d6ff] text-white transition-all shadow-[0_0_20px_rgba(0,80,255,0.2)] hover:shadow-[0_0_30px_rgba(0,80,255,0.4)] hover:-translate-y-[1px]"
        >
          <span>Enter the Game</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex md:hidden flex-col gap-[5px] p-1"
        >
          <span className={`w-[22px] h-[1.5px] bg-white rounded-[1px] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`w-[22px] h-[1.5px] bg-white rounded-[1px] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-[22px] h-[1.5px] bg-white rounded-[1px] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl p-6 border-b border-white/5 flex flex-col gap-5 md:hidden"
          >
            {navLinks.map(({ href, label, id }) => (
              <a 
                key={id} 
                href={href} 
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium ${activeSection === id ? 'text-[#00d6ff]' : 'text-white/60'}`}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
