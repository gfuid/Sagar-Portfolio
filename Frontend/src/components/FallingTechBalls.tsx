import React, { useEffect, useRef } from 'react';

interface TechItem {
  name: string;
  glowColor: string;
  accentColor: string;
  svgIcon: string;
}

interface TechBall {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  name: string;
  glowColor: string;
  accentColor: string;
  img: HTMLImageElement | null;
}

export const FallingTechBalls: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 400;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Vector SVG icons for 3D sphere center
    const techItems: TechItem[] = [
      {
        name: 'React.js',
        glowColor: 'rgba(0, 216, 255, 0.6)',
        accentColor: '#00d8ff',
        svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348"><circle cx="0" cy="0" r="2.05" fill="%2361dafb"/><g stroke="%2361dafb" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,
      },
      {
        name: 'Next.js',
        glowColor: 'rgba(255, 255, 255, 0.6)',
        accentColor: '#ffffff',
        svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" fill="none"><circle cx="90" cy="90" r="90" fill="black"/><path d="M149.508 157.52L69.142 54H54V125.97H66.637V69.756L137.288 161.406C141.674 160.301 145.767 159.006 149.508 157.52Z" fill="white"/><rect x="115" y="54" width="13" height="72" fill="white"/></svg>`,
      },
      {
        name: 'TypeScript',
        glowColor: 'rgba(49, 120, 198, 0.6)',
        accentColor: '#3178c6',
        svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%233178c6"/><text x="50" y="68" font-family="sans-serif" font-weight="bold" font-size="50" fill="white" text-anchor="middle">TS</text></svg>`,
      },
      {
        name: 'Node.js',
        glowColor: 'rgba(104, 160, 99, 0.6)',
        accentColor: '#68a063',
        svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 274"><path fill="%2368A063" d="M127.8 0L0 73.8v126.3l127.8 73.8 127.8-73.8V73.8L127.8 0z"/><path fill="white" d="M178 123.5c-4.4-2.5-9.6-3.8-15.5-3.8-15.3 0-25 8.7-25 22.3 0 13.1 8.7 19.8 21.8 23.3 11 3 13.9 5.7 13.9 10.3 0 5-4.4 8.2-11.4 8.2-8.3 0-14.8-4.2-18.7-11.1l-13.4 9.1c6.5 11 18 16.9 32.1 16.9 17.5 0 27.6-9.1 27.6-23.7 0-12.7-8-19.6-21.7-23.1-10.9-2.8-14-5.3-14-10 0-4.6 4-7.5 10.2-7.5 7.1 0 12.7 3.4 16.1 8.9l18-9.8z"/></svg>`,
      },
      {
        name: 'Tailwind',
        glowColor: 'rgba(56, 189, 248, 0.6)',
        accentColor: '#38bdf8',
        svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"><path fill="%2338bdf8" d="M25 15c-6.6 0-10.8 3.3-12.5 10 2.5-3.3 5.8-4.6 10-3.8 3.2.7 5.5 3 8 5.6C34.4 30.9 39.5 36 50 36c6.6 0 10.8-3.3 12.5-10-2.5 3.3-5.8 4.6-10 3.8-3.2-.7-5.5-3-8-5.6C40.6 20.1 35.5 15 25 15zm25 15c-6.6 0-10.8 3.3-12.5 10 2.5-3.3 5.8-4.6 10-3.8 3.2.7 5.5 3 8 5.6C69.4 45.9 74.5 51 85 51c6.6 0 10.8-3.3 12.5-10-2.5 3.3-5.8 4.6-10 3.8-3.2-.7-5.5-3-8-5.6C75.6 35.1 70.5 30 60 30z"/></svg>`,
      },
      {
        name: 'MongoDB',
        glowColor: 'rgba(71, 162, 72, 0.6)',
        accentColor: '#47a248',
        svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="%2347A248" d="M32 2C32 2 16 20 16 38c0 9 7 16 16 16s16-7 16-16C48 20 32 2 32 2zm1 47V15c5 5 11 15 11 23 0 6-5 11-11 11z"/></svg>`,
      },
      {
        name: 'Redis',
        glowColor: 'rgba(220, 56, 45, 0.6)',
        accentColor: '#dc382d',
        svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="90" height="90" x="5" y="5" rx="15" fill="%23dc382d"/><text x="50" y="60" font-family="sans-serif" font-weight="bold" font-size="32" fill="white" text-anchor="middle">Redis</text></svg>`,
      },
      {
        name: 'Python',
        glowColor: 'rgba(55, 118, 171, 0.6)',
        accentColor: '#3776ab',
        svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%233776AB" d="M49 2c-15 0-14 6-14 6v7h14v2h-20s-9 0-9 13 8 13 8 13h5v-7s0-8 8-8h14s8 0 8-8V8s1-6-14-6zm-7 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/><path fill="%23FFD43B" d="M51 98c15 0 14-6 14-6v-7H51v-2h20s9 0 9-13-8-13-8-13h-5v7s0 8-8 8H45s-8 0-8 8v14s-1 6 14 6zm7-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>`,
      },
      {
        name: 'n8n',
        glowColor: 'rgba(234, 75, 113, 0.6)',
        accentColor: '#ea4b71',
        svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23ea4b71"/><text x="50" y="62" font-family="sans-serif" font-weight="black" font-size="36" fill="white" text-anchor="middle">n8n</text></svg>`,
      },
      {
        name: 'HTML5',
        glowColor: 'rgba(227, 79, 38, 0.6)',
        accentColor: '#e34f26',
        svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23E34F26" d="M71 460L30 0h452l-41 460L256 512"/><path fill="%23EF652A" d="M256 472l144-40 34-388H256"/><path fill="%23fff" d="M108 216h148v60H171l6 65 79 22v62l-143-39zm-6-114h308l-5 60H107z"/></svg>`,
      },
      {
        name: 'CSS3',
        glowColor: 'rgba(21, 114, 182, 0.6)',
        accentColor: '#1572b6',
        svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%231572B6" d="M71 460L30 0h452l-41 460L256 512"/><path fill="%2333A9DC" d="M256 472l144-40 34-388H256"/><path fill="%23fff" d="M108 216h148v60H171l6 65 79 22v62l-143-39zm-6-114h308l-5 60H107z"/></svg>`,
      },
      {
        name: 'JavaScript',
        glowColor: 'rgba(247, 223, 30, 0.6)',
        accentColor: '#f7df1e',
        svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 630"><rect width="630" height="630" fill="%23f7df1e"/><path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.4-38.1-25.4-17.3 0-28.3 11-28.3 25.4 0 17.76 11 24.96 35.9 35.5l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.9-60.9z"/></svg>`,
      },
      {
        name: 'Git',
        glowColor: 'rgba(240, 80, 50, 0.6)',
        accentColor: '#f05032',
        svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23f05032"/><text x="50" y="60" font-family="sans-serif" font-weight="bold" font-size="34" fill="white" text-anchor="middle">Git</text></svg>`,
      },
      {
        name: 'Postman',
        glowColor: 'rgba(255, 108, 55, 0.6)',
        accentColor: '#ff6c37',
        svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23ff6c37"/><text x="50" y="62" font-family="sans-serif" font-weight="bold" font-size="28" fill="white" text-anchor="middle">API</text></svg>`,
      },
    ];

    const balls: TechBall[] = techItems.map((item, idx) => {
      const img = new Image();
      img.src = item.svgIcon;

      return {
        x: Math.random() * (canvas.width - 140) + 70,
        y: -70 - idx * 50,
        vx: (Math.random() - 0.5) * 4.5,
        vy: Math.random() * 2 + 1,
        radius: 40, // 40px radius for generous 3D sphere volume
        name: item.name,
        glowColor: item.glowColor,
        accentColor: item.accentColor,
        img: img,
      };
    });

    const gravity = 0.4;
    const bounce = 0.68;
    const friction = 0.985;

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const draw3DSphere = (b: TechBall) => {
      ctx.save();
      ctx.translate(b.x, b.y);

      const r = b.radius;

      // 1. REALISTIC 3D DROP SHADOW
      ctx.beginPath();
      ctx.ellipse(0, r + 4, r * 0.85, r * 0.25, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.filter = 'blur(6px)';
      ctx.fill();
      ctx.filter = 'none';

      // 2. OUTER CHROME / METALLIC BEVEL RING
      const chromeGrad = ctx.createLinearGradient(-r, -r, r, r);
      chromeGrad.addColorStop(0, '#555566');
      chromeGrad.addColorStop(0.3, '#ffffff');
      chromeGrad.addColorStop(0.5, '#22222b');
      chromeGrad.addColorStop(0.8, '#888899');
      chromeGrad.addColorStop(1, '#111116');

      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = chromeGrad;
      ctx.shadowColor = b.glowColor;
      ctx.shadowBlur = 18;
      ctx.fill();

      // 3. INNER VOLUMETRIC GLASS BASE & SPHERICAL SHADING
      const innerR = r - 3;
      const sphereGrad = ctx.createRadialGradient(
        -innerR * 0.35,
        -innerR * 0.35,
        innerR * 0.1,
        0,
        0,
        innerR
      );
      sphereGrad.addColorStop(0, '#2a2b36');
      sphereGrad.addColorStop(0.4, '#12131a');
      sphereGrad.addColorStop(0.8, '#08080d');
      sphereGrad.addColorStop(1, '#020204');

      ctx.beginPath();
      ctx.arc(0, 0, innerR, 0, Math.PI * 2);
      ctx.shadowBlur = 0;
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // 4. INNER BRAND COLOR VOLUMETRIC GLOW
      const brandGlowGrad = ctx.createRadialGradient(
        0,
        innerR * 0.4,
        0,
        0,
        0,
        innerR
      );
      brandGlowGrad.addColorStop(0, b.glowColor);
      brandGlowGrad.addColorStop(0.7, 'rgba(0,0,0,0)');

      ctx.beginPath();
      ctx.arc(0, 0, innerR, 0, Math.PI * 2);
      ctx.fillStyle = brandGlowGrad;
      ctx.fill();

      // 5. UPRIGHT TECH LOGO ICON
      if (b.img && b.img.complete) {
        const iconSize = innerR * 0.95;
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 8;
        ctx.drawImage(
          b.img,
          -iconSize / 2,
          -iconSize / 2 - 5,
          iconSize,
          iconSize
        );
      }

      // 6. UPRIGHT SKILL NAME TAG WITH BRAND ACCENT
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 10px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(b.name, 0, innerR * 0.52);

      // 7. PHOTOREALISTIC TOP SPECULAR GLARE REFLECTION (CURVED 3D LIGHT CRESCENT)
      const glareGrad = ctx.createLinearGradient(
        0,
        -innerR,
        0,
        -innerR * 0.1
      );
      glareGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      glareGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
      glareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.ellipse(
        0,
        -innerR * 0.5,
        innerR * 0.6,
        innerR * 0.25,
        0,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = glareGrad;
      ctx.fill();

      // 8. SECONDARY BOTTOM AMBIENT LIGHT REFLECTION
      const bottomGlint = ctx.createRadialGradient(
        0,
        innerR * 0.7,
        0,
        0,
        innerR * 0.7,
        innerR * 0.3
      );
      bottomGlint.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      bottomGlint.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(0, 0, innerR, 0, Math.PI * 2);
      ctx.fillStyle = bottomGlint;
      ctx.fill();

      ctx.restore();
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Physics update loop
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];

        b.vy += gravity;
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= friction;
        b.vy *= friction;

        // Ground bounce collision
        if (b.y + b.radius > canvas.height - 16) {
          b.y = canvas.height - 16 - b.radius;
          b.vy = -b.vy * bounce;
          b.vx *= 0.95;
        }

        // Left / Right Wall Bounce
        if (b.x - b.radius < 16) {
          b.x = 16 + b.radius;
          b.vx = -b.vx * bounce;
        } else if (b.x + b.radius > canvas.width - 16) {
          b.x = canvas.width - 16 - b.radius;
          b.vx = -b.vx * bounce;
        }

        // Mouse push physics
        const dxMouse = b.x - mouseX;
        const dyMouse = b.y - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < b.radius + 70 && distMouse > 0) {
          const force = (b.radius + 70 - distMouse) / 70;
          b.vx += (dxMouse / distMouse) * force * 5.5;
          b.vy += (dyMouse / distMouse) * force * 5.5;
        }

        // Ball to ball elastic collisions
        for (let j = i + 1; j < balls.length; j++) {
          const b2 = balls[j];
          const dx = b2.x - b.x;
          const dy = b2.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = b.radius + b2.radius;

          if (dist < minDist && dist > 0) {
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            b.x -= nx * overlap * 0.5;
            b.y -= ny * overlap * 0.5;
            b2.x += nx * overlap * 0.5;
            b2.y += ny * overlap * 0.5;

            const kx = b.vx - b2.vx;
            const ky = b.vy - b2.vy;
            const p = 2 * (nx * kx + ny * ky) / 2;

            b.vx -= p * nx * bounce;
            b.vy -= p * ny * bounce;
            b2.vx += p * nx * bounce;
            b2.vy += p * ny * bounce;
          }
        }

        draw3DSphere(b);
      }

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-[2.5rem] bg-[#070709] border border-zinc-800/90 overflow-hidden shadow-2xl my-6 select-none">
      {/* Top Banner Indicator */}
      <div className="absolute top-5 left-6 z-10 pointer-events-none flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
        <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase font-bold">
          PHOTOREALISTIC 3D GLASS TECH SPHERES (INTERACTIVE PHYSICS)
        </span>
      </div>

      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};

export default FallingTechBalls;
