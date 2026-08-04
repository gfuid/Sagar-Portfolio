import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Globe, ArrowRight } from 'lucide-react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4';

const InstagramIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export const LiquidGlassHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  const opacityRef = useRef(0);
  const fadeAnimRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  // Helper to animate opacity smoothly via RAF (500ms)
  const animateOpacity = useCallback((targetOpacity: number, duration = 500, onComplete?: () => void) => {
    if (fadeAnimRef.current !== null) {
      cancelAnimationFrame(fadeAnimRef.current);
      fadeAnimRef.current = null;
    }

    const startOpacity = opacityRef.current;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startOpacity + (targetOpacity - startOpacity) * easeProgress;

      opacityRef.current = current;
      setVideoOpacity(current);

      if (progress < 1) {
        fadeAnimRef.current = requestAnimationFrame(step);
      } else {
        opacityRef.current = targetOpacity;
        setVideoOpacity(targetOpacity);
        fadeAnimRef.current = null;
        if (onComplete) onComplete();
      }
    };

    fadeAnimRef.current = requestAnimationFrame(step);
  }, []);

  // Handle Video Time Updates for 500ms fade-out before video ends
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const remaining = video.duration - video.currentTime;

    // Trigger fade-out 0.55s before end
    if (remaining <= 0.55 && !fadingOutRef.current) {
      fadingOutRef.current = true;
      animateOpacity(0, 500);
    }
  }, [animateOpacity]);

  // Handle Video Ended
  const handleEnded = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    opacityRef.current = 0;
    setVideoOpacity(0);

    setTimeout(() => {
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOutRef.current = false;
        animateOpacity(1, 500);
      }
    }, 100);
  }, [animateOpacity]);

  // Video initial load / play
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedData = () => {
      video.play().catch(() => {});
      animateOpacity(1, 500);
    };

    if (video.readyState >= 2) {
      onLoadedData();
    } else {
      video.addEventListener('loadeddata', onLoadedData);
    }

    return () => {
      if (video) video.removeEventListener('loadeddata', onLoadedData);
      if (fadeAnimRef.current !== null) cancelAnimationFrame(fadeAnimRef.current);
    };
  }, [animateOpacity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-between select-none">
      {/* ─── Background Video ─── */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%] pointer-events-none"
        style={{ opacity: videoOpacity }}
      />

      {/* ─── Hero Content Area ─── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-12 text-center">
        {/* Heading */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight whitespace-nowrap"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Built for the curious
        </h1>

        {/* Input Bar & Subtitle Container */}
        <div className="max-w-xl w-full space-y-4">
          {/* Email Input Bar */}
          <form onSubmit={handleSubmit} className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full bg-transparent text-white placeholder:text-white/40 text-base outline-none border-none"
            />
            <button
              type="submit"
              aria-label="Submit Email"
              className="bg-white rounded-full p-3 text-black hover:scale-105 transition-transform shrink-0 cursor-pointer"
            >
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Subtitle */}
          <p className="text-white text-sm leading-relaxed px-4">
            Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
          </p>

          {/* Manifesto Button */}
          <div className="pt-2">
            <button
              type="button"
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer inline-block"
            >
              Read the Manifesto
            </button>
          </div>
        </div>
      </main>

      {/* ─── Social Icons Footer ─── */}
      <footer className="relative z-10 flex justify-center gap-4 pb-12">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <TwitterIcon />
        </a>
        <a
          href="https://asme.dev"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Website"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <Globe size={20} />
        </a>
      </footer>
    </div>
  );
};

export default LiquidGlassHero;
