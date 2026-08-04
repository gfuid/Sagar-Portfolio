import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollVideoProps {
  videoUrl: string;
  posterUrl?: string;
}

export const ScrollVideo: React.FC<ScrollVideoProps> = ({ videoUrl, posterUrl }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const smoothedRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Calculate scroll progress (0 to 1)
  const getScrollProgress = useCallback(() => {
    const docEl = document.documentElement;
    const scrollTop = window.scrollY || window.pageYOffset || docEl.scrollTop || 0;
    const scrollHeight = Math.max(docEl.scrollHeight - window.innerHeight, 1);
    return Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }

    // 60 FPS Silky Smooth RAF Loop with hardware-accelerated Parallax Easing
    const loop = () => {
      const targetProgress = getScrollProgress();

      // Lerp factor (0.07) for continuous butter-smooth motion
      smoothedRef.current += (targetProgress - smoothedRef.current) * 0.07;
      const s = smoothedRef.current;

      if (containerRef.current) {
        // Hardware accelerated 3D transform (translateY & scale)
        const translateY = s * 70; // Smooth downward shift as user scrolls
        const scale = 1.05 + s * 0.06; // Subtle zoom depth
        containerRef.current.style.transform = `translate3d(0, -${translateY}px, 0) scale(${scale})`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [getScrollProgress]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{ transformOrigin: 'center center' }}
      >
        {posterUrl && (
          <img
            src={posterUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: videoLoaded ? 0 : 1, transition: 'opacity 0.6s ease' }}
          />
        )}

        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Soft Dark Vignette Overlay for High Contrast Visuals */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80 pointer-events-none" />
      </div>
    </div>
  );
};

export default ScrollVideo;
