'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    // Hide on touch devices
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
      glow.style.display = 'none';
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
      cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(0.8)`;
    };

    const handleMouseUp = () => {
      cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(1)`;
    };

    // Smooth cursor follow
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      cursor.style.transform = `translate(${pos.current.x - 10}px, ${pos.current.y - 10}px)`;
      glow.style.transform = `translate(${pos.current.x - 150}px, ${pos.current.y - 150}px)`;

      requestAnimationFrame(animate);
    };

    // Hover detection for interactive elements
    const handleElementHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-hover');
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    animate();

    // Run hover detection after a brief delay to catch all elements
    const timer = setTimeout(handleElementHover, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Small dot cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[99999] mix-blend-difference transition-[width,height,border] duration-300 ease-out border-2 border-white [.cursor-hover_&]:w-12 [.cursor-hover_&]:h-12 [.cursor-hover_&]:border-[#00d6ff] hidden md:block"
        style={{ willChange: 'transform' }}
      />
      {/* Large ambient glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[99998] opacity-[0.04] hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(0,214,255,0.6) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />
    </>
  );
}
