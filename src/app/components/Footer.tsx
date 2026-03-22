'use client';

export default function Footer() {
  return (
    <footer className="pt-20 pb-10 px-6 lg:px-20 bg-[#050505] border-t border-white/5 relative z-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-wrap justify-between gap-12 mb-16">
          <div className="flex items-center gap-2 font-bold text-[18px]">
            <span className="drop-shadow-[0_0_8px_rgba(0,214,255,0.4)]">⚡</span>
            <span>GX-900 Pro</span>
          </div>
          
          <div className="flex flex-wrap gap-16">
            <div className="flex flex-col gap-3">
              <h4 className="text-[12px] font-semibold uppercase tracking-[2px] text-white/60 mb-1">Product</h4>
              <a href="#" className="text-[14px] text-white/35 hover:text-white transition-colors">Overview</a>
              <a href="#specs" className="text-[14px] text-white/35 hover:text-white transition-colors">Specs</a>
              <a href="#" className="text-[14px] text-white/35 hover:text-white transition-colors">Compare</a>
              <a href="#" className="text-[14px] text-white/35 hover:text-white transition-colors">Reviews</a>
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className="text-[12px] font-semibold uppercase tracking-[2px] text-white/60 mb-1">Support</h4>
              <a href="#" className="text-[14px] text-white/35 hover:text-white transition-colors">FAQ</a>
              <a href="#" className="text-[14px] text-white/35 hover:text-white transition-colors">Warranty</a>
              <a href="#" className="text-[14px] text-white/35 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-[14px] text-white/35 hover:text-white transition-colors">Downloads</a>
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className="text-[12px] font-semibold uppercase tracking-[2px] text-white/60 mb-1">Company</h4>
              <a href="#" className="text-[14px] text-white/35 hover:text-white transition-colors">About</a>
              <a href="#" className="text-[14px] text-white/35 hover:text-white transition-colors">Careers</a>
              <a href="#" className="text-[14px] text-white/35 hover:text-white transition-colors">Press</a>
              <a href="#" className="text-[14px] text-white/35 hover:text-white transition-colors">Blog</a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-[12px] text-white/35">
            &copy; 2026 GX Audio. All rights reserved.
          </p>
          
          <div className="flex gap-5">
            <a href="#" aria-label="Twitter" className="text-[16px] text-white/35 hover:text-[#00d6ff] hover:drop-shadow-[0_0_8px_rgba(0,214,255,0.4)] transition-all">𝕏</a>
            <a href="#" aria-label="Discord" className="text-[16px] text-white/35 hover:text-[#00d6ff] hover:drop-shadow-[0_0_8px_rgba(0,214,255,0.4)] transition-all">⊡</a>
            <a href="#" aria-label="YouTube" className="text-[16px] text-white/35 hover:text-[#00d6ff] hover:drop-shadow-[0_0_8px_rgba(0,214,255,0.4)] transition-all">▶</a>
            <a href="#" aria-label="Instagram" className="text-[16px] text-white/35 hover:text-[#00d6ff] hover:drop-shadow-[0_0_8px_rgba(0,214,255,0.4)] transition-all">◎</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
