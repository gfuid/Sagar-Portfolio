import React, { useEffect, useRef, useState } from 'react';

interface CounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  className = '',
  duration = 1800,
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Extract numerical target, decimals, prefix and suffix from raw string (e.g., "1.5+", "150+", "3", "5-6L")
    const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const targetNum = parseFloat(match[2]);
    const suffix = match[3];
    const hasDecimal = match[2].includes('.');
    const decimalPlaces = hasDecimal ? (match[2].split('.')[1]?.length || 1) : 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Ease out cubic for fast start & smooth slowdown
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentNum = easeProgress * targetNum;

            const formattedNum = hasDecimal
              ? currentNum.toFixed(decimalPlaces)
              : Math.floor(currentNum).toString();

            setDisplayValue(`${prefix}${formattedNum}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {displayValue}
    </span>
  );
};

export default Counter;
