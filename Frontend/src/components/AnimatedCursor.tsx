import React, { useEffect, useRef, useState } from 'react';

export const AnimatedCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  // Animation coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const auraPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports hover/fine pointer (ignore touchscreens/phones)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Instant pinpoint dot update
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = !!target.closest(
          'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-cursor-hover], [data-cursor-interactive]'
        );
        setIsHovered(interactive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth Lerp loop for trailing outer ring & aura
    const render = () => {
      // Ring smooth lerp (factor 0.22)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

      // Ambient Aura smooth lerp (factor 0.12)
      auraPos.current.x += (mousePos.current.x - auraPos.current.x) * 0.12;
      auraPos.current.y += (mousePos.current.y - auraPos.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${auraPos.current.x}px, ${auraPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isPointerDevice) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* 1. Large Ambient Neon Glow Aura */}
      <div
        ref={auraRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
      >
        <div
          className={`w-36 h-36 rounded-full transition-all duration-500 blur-2xl ${
            isHovered
              ? 'bg-gradient-to-r from-red-500/25 to-orange-500/25 scale-125'
              : 'bg-red-500/10 scale-100'
          }`}
        />
      </div>

      {/* 2. Trailing Interactive Outer Ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
      >
        <div
          className={`rounded-full transition-all duration-300 ease-out flex items-center justify-center ${
            isHovered
              ? 'w-14 h-14 border-2 border-orange-400/90 bg-red-500/15 shadow-[0_0_25px_rgba(249,115,22,0.45)] backdrop-blur-[1.5px]'
              : isClicked
              ? 'w-7 h-7 border border-red-500 bg-red-500/30 scale-90'
              : 'w-10 h-10 border border-red-500/60 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.25)]'
          }`}
        >
          {/* Subtle spinning accent tick on hover */}
          {isHovered && (
            <div className="absolute inset-0 rounded-full border-t border-white/60 animate-spin" style={{ animationDuration: '3s' }} />
          )}
        </div>
      </div>

      {/* 3. High-Precision Pinpoint Center Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
      >
        <div
          className={`rounded-full transition-all duration-150 ease-out ${
            isHovered
              ? 'w-2 h-2 bg-orange-400 shadow-[0_0_10px_#f97316] scale-125'
              : isClicked
              ? 'w-3 h-3 bg-red-400 shadow-[0_0_14px_#ef4444] scale-90'
              : 'w-2.5 h-2.5 bg-red-500 shadow-[0_0_8px_#ef4444]'
          }`}
        />
      </div>

    </div>
  );
};

export default AnimatedCursor;
