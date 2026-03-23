'use client';

import { motion } from 'framer-motion';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: '#hero' },
      { label: 'Engineering', href: '#engineering' },
      { label: 'Audio', href: '#audio' },
      { label: 'Specs', href: '#specs' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '#' },
      { label: 'Warranty', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Downloads', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
];

const socials = [
  { label: 'Twitter', icon: '𝕏', href: '#' },
  { label: 'Discord', icon: '⊡', href: '#' },
  { label: 'YouTube', icon: '▶', href: '#' },
  { label: 'Instagram', icon: '◎', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-10 px-6 lg:px-20 bg-[#050505] border-t border-white/[0.04] z-10 overflow-hidden">
      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#0050ff]/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[120px] pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(0,80,255,0.06)_0%,transparent_70%)]" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Top area: brand + newsletter */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-[320px]"
          >
            <a href="#" className="flex items-center gap-2 font-bold text-xl mb-4 group">
              <span className="text-xl drop-shadow-[0_0_8px_rgba(0,214,255,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(0,214,255,0.6)] transition-all">⚡</span>
              <span className="group-hover:text-[#00d6ff] transition-colors duration-300">GX-900 Pro</span>
            </a>
            <p className="text-[13px] text-white/35 leading-relaxed mb-6">
              Next-generation gaming audio. Engineered for precision. Designed for immersion.
            </p>

            {/* Newsletter */}
            <div className="relative group">
              <div className="flex items-stretch rounded-full border border-white/[0.06] group-focus-within:border-[#0050ff]/30 transition-colors duration-300 overflow-hidden bg-white/[0.02]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent px-5 py-3 text-[13px] text-white placeholder-white/25 outline-none min-w-0"
                />
                <button className="px-5 py-3 text-[12px] font-semibold uppercase tracking-[1px] bg-gradient-to-r from-[#0050ff] to-[#00d6ff] text-white hover:opacity-90 transition-opacity shrink-0">
                  Subscribe
                </button>
              </div>
              <span className="block text-[10px] text-white/20 mt-2 ml-5">Stay updated with product launches</span>
            </div>
          </motion.div>

          {/* Links */}
          <div className="flex flex-wrap gap-16">
            {footerLinks.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col gap-3"
              >
                <h4 className="text-[11px] font-bold uppercase tracking-[3px] text-white/50 mb-1">
                  {group.title}
                </h4>
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[13px] text-white/30 hover:text-white transition-colors duration-200 relative group/link w-fit"
                  >
                    {link.label}
                    <span className="absolute -bottom-[2px] left-0 h-[1px] w-0 bg-[#00d6ff]/50 group-hover/link:w-full transition-all duration-300" />
                  </a>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-8" />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-between items-center gap-4"
        >
          <p className="text-[11px] text-white/25 tracking-wide">
            &copy; 2026 GX Audio. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-full border border-white/[0.06] flex items-center justify-center text-[14px] text-white/35 hover:text-[#00d6ff] hover:border-[#00d6ff]/30 hover:bg-[#00d6ff]/[0.04] hover:shadow-[0_0_20px_rgba(0,214,255,0.15)] transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
