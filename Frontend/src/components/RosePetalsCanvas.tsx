import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  curve: number;
}

export const RosePetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Deep red, crimson, and vibrant rose petal palette
    const colors = [
      '#e60039',
      '#cc0033',
      '#b3002d',
      '#990026',
      '#ff1a53',
      '#d9043d',
    ];

    const petalCount = 45;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 14 + 8,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        curve: Math.random() * 0.5 + 0.5,
      });
    }

    const drawPetal = (ctx: CanvasRenderingContext2D, petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate((petal.rotation * Math.PI) / 180);
      ctx.globalAlpha = petal.opacity;

      ctx.beginPath();
      // Draw organic petal shape
      const s = petal.size;
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.8, -s * 0.7, s * 1.1, s * 0.4, 0, s);
      ctx.bezierCurveTo(-s * 1.1, s * 0.4, -s * 0.8, -s * 0.7, 0, -s);

      // Create radial gradient for soft depth
      const grad = ctx.createRadialGradient(0, 0, s * 0.1, 0, 0, s);
      grad.addColorStop(0, '#ff4d79');
      grad.addColorStop(0.6, petal.color);
      grad.addColorStop(1, '#4a0011');

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(230, 0, 57, 0.4)';
      ctx.shadowBlur = 8;
      ctx.fill();

      ctx.restore();
    };

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Drift physics with gentle sine wave sway
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + i) * 0.4;
        p.rotation += p.rotationSpeed;

        // Reset when out of screen bounds
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = canvas.width + 20;
        }

        drawPetal(ctx, p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full"
    />
  );
};

export default RosePetalsCanvas;
