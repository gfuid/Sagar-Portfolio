import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Global Lenis smooth-scroll provider.
 * Hooks into GSAP ScrollTrigger so every scroll-driven animation
 * on every page gets buttery-smooth interpolation for free.
 */
export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Create Lenis instance with premium feel
    const lenis = new Lenis({
      duration: 1.4,            // scroll interpolation duration (seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      touchMultiplier: 1.5,     // faster touch scrolling on mobile
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position → GSAP ScrollTrigger on every frame
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis via GSAP's ticker (guarantees perfect RAF sync)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // GSAP provides time in seconds, Lenis needs ms
    };
    gsap.ticker.add(tickerCallback);

    // Disable Lenis's own internal RAF since we're using GSAP's ticker
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
