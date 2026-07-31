import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GsapTextSlideProps {
  words: string[];
  interval?: number;
  className?: string;
}

export const GsapTextSlide: React.FC<GsapTextSlideProps> = ({
  words,
  interval = 2.5,
  className = '',
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current || words.length <= 1) return;

    const items = containerRef.current.querySelectorAll('.gsap-slide-item');
    if (items.length <= 1) return;

    // Reset initial transforms: first item visible, rest hidden below
    gsap.set(items, { yPercent: 100, opacity: 0 });
    gsap.set(items[0], { yPercent: 0, opacity: 1 });

    const timeline = gsap.timeline({ repeat: -1 });

    for (let i = 0; i < items.length; i++) {
      const current = items[i];
      const next = items[(i + 1) % items.length];

      // Hold item visible for interval
      timeline.to({}, { duration: interval });

      // Ultra-smooth GSAP transition between current and next item
      timeline.to(current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.inOut',
      })
      .to(
        next,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.inOut',
        },
        '<'
      );
    }

    return () => {
      timeline.kill();
    };
  }, [words, interval]);

  return (
    <span
      ref={containerRef}
      className={`inline-grid relative overflow-hidden align-bottom ${className}`}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          className="gsap-slide-item col-start-1 row-start-1 whitespace-nowrap inline-block pointer-events-none"
        >
          {word}
        </span>
      ))}
    </span>
  );
};
