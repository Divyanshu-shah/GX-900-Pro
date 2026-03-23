'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import HeroSection from './components/HeroSection';
import ScrollExperience from './components/ScrollExperience';
import EngineeringSection from './components/EngineeringSection';
import AudioSection from './components/AudioSection';
import PerformanceSection from './components/PerformanceSection';
import CtaSection from './components/CtaSection';
import SpecsSection from './components/SpecsSection';
import Footer from './components/Footer';
import ParticleNetwork from './components/ParticleNetwork';
import CustomCursor from './components/CustomCursor';
import SectionDivider from './components/SectionDivider';

// Scroll Progress component
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setProgress(Math.min(100, Math.max(0, (currentScroll / docHeight) * 100)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-16 left-0 h-[2px] z-[9999] bg-gradient-to-r from-[#0050ff] via-[#00d6ff] to-[#8b5cf6] shadow-[0_0_10px_rgba(0,214,255,0.4)] transition-all duration-75"
      style={{ width: `${progress}%` }}
    />
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen">
      <Preloader isLoading={loading} />
      <CustomCursor />
      <Navbar />
      <ScrollProgress />
      <ParticleNetwork />

      <HeroSection />
      <ScrollExperience />

      <SectionDivider accent="#0050ff" />
      <EngineeringSection />

      <SectionDivider accent="#00d6ff" />
      <AudioSection />

      <SectionDivider accent="#8b5cf6" />
      <PerformanceSection />

      <SectionDivider accent="#0050ff" />
      <CtaSection />

      <SpecsSection />
      <Footer />
    </main>
  );
}
