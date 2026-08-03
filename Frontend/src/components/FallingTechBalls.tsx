import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, CheckCircle2, Zap } from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  glowColor: string;
  baseColor: string;
  accentColor: string;
  svgIcon: string;
  experience: string;
  highlight: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

interface TechBall {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  name: string;
  category: string;
  glowColor: string;
  baseColor: string;
  accentColor: string;
  experience: string;
  highlight: string;
  img: HTMLImageElement | null;
}

export const FallingTechBalls: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const selectedTechRef = useRef<TechItem | null>(null);

  useEffect(() => {
    selectedTechRef.current = selectedTech;
  }, [selectedTech]);

  const techItems: TechItem[] = [
    {
      name: 'React.js',
      category: 'Frontend & UI',
      glowColor: 'rgba(0, 216, 255, 0.7)',
      baseColor: '#0e7490',
      accentColor: '#61dafb',
      svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348"><circle cx="0" cy="0" r="2.05" fill="%2361dafb"/><g stroke="%2361dafb" stroke-width="1.2" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,
      experience: '1.5+ Years Production Exp',
      highlight: 'Built GymFlow SaaS dashboard powering 150+ gyms & TRIREME B2B platform.'
    },
    {
      name: 'Next.js',
      category: 'Full Stack Framework',
      glowColor: 'rgba(255, 255, 255, 0.7)',
      baseColor: '#18181b',
      accentColor: '#ffffff',
      svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" fill="none"><circle cx="90" cy="90" r="90" fill="%2318181b"/><path d="M149.508 157.52L69.142 54H54V125.97H66.637V69.756L137.288 161.406C141.674 160.301 145.767 159.006 149.508 157.52Z" fill="white"/><rect x="115" y="54" width="13" height="72" fill="white"/></svg>`,
      experience: 'SEO & Server Components',
      highlight: 'Engineered high-performance SSR client platforms like Design Houzz.'
    },
    {
      name: 'TypeScript',
      category: 'Type-Safe Code',
      glowColor: 'rgba(49, 120, 198, 0.7)',
      baseColor: '#1e3a8a',
      accentColor: '#3178c6',
      svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%233178c6"/><text x="50" y="68" font-family="sans-serif" font-weight="extrabold" font-size="50" fill="white" text-anchor="middle">TS</text></svg>`,
      experience: 'Strict Type Systems',
      highlight: 'Zero-runtime bug architectures for complex state machines.'
    },
    {
      name: 'Node.js',
      category: 'Backend Engine',
      glowColor: 'rgba(104, 160, 99, 0.7)',
      baseColor: '#14532d',
      accentColor: '#22c55e',
      svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 274"><path fill="%2322c55e" d="M127.8 0L0 73.8v126.3l127.8 73.8 127.8-73.8V73.8L127.8 0z"/><path fill="white" d="M178 123.5c-4.4-2.5-9.6-3.8-15.5-3.8-15.3 0-25 8.7-25 22.3 0 13.1 8.7 19.8 21.8 23.3 11 3 13.9 5.7 13.9 10.3 0 5-4.4 8.2-11.4 8.2-8.3 0-14.8-4.2-18.7-11.1l-13.4 9.1c6.5 11 18 16.9 32.1 16.9 17.5 0 27.6-9.1 27.6-23.7 0-12.7-8-19.6-21.7-23.1-10.9-2.8-14-5.3-14-10 0-4.6 4-7.5 10.2-7.5 7.1 0 12.7 3.4 16.1 8.9l18-9.8z"/></svg>`,
      experience: 'REST APIs & Microservices',
      highlight: 'Handled 2,000+ concurrent user transactions with custom WebJS engines.'
    },
    {
      name: 'Tailwind CSS',
      category: 'Styling & Design',
      glowColor: 'rgba(56, 189, 248, 0.7)',
      baseColor: '#0369a1',
      accentColor: '#38bdf8',
      svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"><path fill="%2338bdf8" d="M25 15c-6.6 0-10.8 3.3-12.5 10 2.5-3.3 5.8-4.6 10-3.8 3.2.7 5.5 3 8 5.6C34.4 30.9 39.5 36 50 36c6.6 0 10.8-3.3 12.5-10-2.5 3.3-5.8 4.6-10 3.8-3.2-.7-5.5-3-8-5.6C40.6 20.1 35.5 15 25 15zm25 15c-6.6 0-10.8 3.3-12.5 10 2.5-3.3 5.8-4.6 10-3.8 3.2.7 5.5 3 8 5.6C69.4 45.9 74.5 51 85 51c6.6 0 10.8-3.3 12.5-10-2.5 3.3-5.8 4.6-10 3.8-3.2-.7-5.5-3-8-5.6C75.6 35.1 70.5 30 60 30z"/></svg>`,
      experience: 'Custom Design Systems',
      highlight: 'Crafted modern glassmorphism & responsive layouts across 15+ websites.'
    },
    {
      name: 'MongoDB',
      category: 'NoSQL Database',
      glowColor: 'rgba(71, 162, 72, 0.7)',
      baseColor: '#166534',
      accentColor: '#47a248',
      svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="%2347A248" d="M32 2C32 2 16 20 16 38c0 9 7 16 16 16s16-7 16-16C48 20 32 2 32 2zm1 47V15c5 5 11 15 11 23 0 6-5 11-11 11z"/></svg>`,
      experience: 'Schema Optimization',
      highlight: 'Reduced storage footprint by 70% (90MB → 25MB) with index tuning.'
    },
    {
      name: 'Redis',
      category: 'In-Memory Cache',
      glowColor: 'rgba(220, 56, 45, 0.7)',
      baseColor: '#991b1b',
      accentColor: '#ef4444',
      svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="90" height="90" x="5" y="5" rx="18" fill="%23ef4444"/><text x="50" y="60" font-family="sans-serif" font-weight="extrabold" font-size="28" fill="white" text-anchor="middle">Redis</text></svg>`,
      experience: 'High Speed Caching',
      highlight: 'Reduced API latency by 90% (from 500ms down to 50ms).'
    },
    {
      name: 'Python',
      category: 'Automation & Scraping',
      glowColor: 'rgba(255, 212, 59, 0.7)',
      baseColor: '#854d0e',
      accentColor: '#eab308',
      svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%233776AB" d="M49 2c-15 0-14 6-14 6v7h14v2h-20s-9 0-9 13 8 13 8 13h5v-7s0-8 8-8h14s8 0 8-8V8s1-6-14-6zm-7 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/><path fill="%23FFD43B" d="M51 98c15 0 14-6 14-6v-7H51v-2h20s9 0 9-13-8-13-8-13h-5v7s0 8-8 8H45s-8 0-8 8v14s-1 6 14 6zm7-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>`,
      experience: 'Scraping & Lead Generation',
      highlight: 'Automated data extraction pipelines using BeautifulSoup & Selenium.'
    },
    {
      name: 'n8n Workflows',
      category: 'Workflow Automation',
      glowColor: 'rgba(234, 75, 113, 0.7)',
      baseColor: '#831843',
      accentColor: '#f43f5e',
      svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23f43f5e"/><text x="50" y="62" font-family="sans-serif" font-weight="black" font-size="34" fill="white" text-anchor="middle">n8n</text></svg>`,
      experience: '10+ Production Pipelines',
      highlight: 'Reduced manual marketing follow-up time by 80% with automated drip sequences.'
    },
    {
      name: 'JavaScript',
      category: 'Core Language',
      glowColor: 'rgba(247, 223, 30, 0.7)',
      baseColor: '#713f12',
      accentColor: '#facc15',
      svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%23facc15"/><text x="75" y="80" font-family="sans-serif" font-weight="extrabold" font-size="55" fill="black" text-anchor="middle">JS</text></svg>`,
      experience: 'ES6+ & Async Patterns',
      highlight: 'Deep understanding of event loops, promises, and DOM manipulation.'
    },
    {
      name: 'Git & GitHub',
      category: 'Version Control',
      glowColor: 'rgba(240, 80, 50, 0.7)',
      baseColor: '#7c2d12',
      accentColor: '#f97316',
      svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23f97316"/><text x="50" y="62" font-family="sans-serif" font-weight="extrabold" font-size="36" fill="white" text-anchor="middle">Git</text></svg>`,
      experience: 'CI/CD & Code Reviews',
      highlight: 'Maintained strict branching workflows and CI/CD automated deployments.'
    },
    {
      name: 'WhatsApp Bot API',
      category: 'Communication Automation',
      glowColor: 'rgba(34, 197, 94, 0.7)',
      baseColor: '#064e3b',
      accentColor: '#10b981',
      svgIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%2310b981"/><path d="M35 65l10-5 15 5-5-15 5-10-15 5-10-5 5 15z" fill="white"/></svg>`,
      experience: 'Zero API Cost Messaging',
      highlight: 'Saved ₹50,000/year in SMS costs with 99.9% uptime WebJS auto-responder.'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 360;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize 3D glossy tech balls
    const balls: TechBall[] = techItems.map((item, idx) => {
      const img = new Image();
      img.src = item.svgIcon;

      // Calculate initial position in floating cloud
      const cols = 6;
      const row = Math.floor(idx / cols);
      const col = idx % cols;
      const spacingX = canvas.width / (cols + 1);
      const spacingY = 90;

      const baseR = Math.min(Math.max(canvas.width / 24, 34), 46);

      return {
        x: spacingX * (col + 1) + (Math.random() * 20 - 10),
        y: 80 + row * spacingY + (Math.random() * 20 - 10),
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: baseR,
        baseRadius: baseR,
        name: item.name,
        category: item.category,
        glowColor: item.glowColor,
        baseColor: item.baseColor,
        accentColor: item.accentColor,
        experience: item.experience,
        highlight: item.highlight,
        img,
      };
    });

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

    // Click handler to trigger particle burst and select tech item
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      balls.forEach((ball) => {
        const dx = clickX - ball.x;
        const dy = clickY - ball.y;
        const dist = Math.hypot(dx, dy);

        if (dist <= ball.radius) {
          // Set active selected tech item
          const selectedObj = techItems.find(t => t.name === ball.name);
          if (selectedObj) {
            setSelectedTech(selectedObj);
          }

          // Spawn particle explosion
          for (let p = 0; p < 24; p++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 2;
            particles.push({
              x: ball.x,
              y: ball.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() * 4 + 2,
              color: ball.accentColor,
              alpha: 1,
              life: 1,
            });
          }
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    // Render 3D glossy cartoon sphere
    const drawGlossy3DSphere = (ball: TechBall) => {
      ctx.save();

      const r = ball.radius;

      // 1. Dynamic Outer Neon Glow
      const glowGrad = ctx.createRadialGradient(
        ball.x, ball.y, r * 0.7,
        ball.x, ball.y, r * 1.5
      );
      glowGrad.addColorStop(0, ball.glowColor);
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, r * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // 2. 3D Glossy Sphere Body Gradient
      const sphereGrad = ctx.createRadialGradient(
        ball.x - r * 0.35, ball.y - r * 0.35, r * 0.1,
        ball.x, ball.y, r
      );
      sphereGrad.addColorStop(0, '#ffffff');
      sphereGrad.addColorStop(0.25, ball.accentColor);
      sphereGrad.addColorStop(0.7, ball.baseColor);
      sphereGrad.addColorStop(1, '#09090b');

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, r, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.shadowColor = ball.accentColor;
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 3. Top Specular Glass Highlight Crescent
      ctx.beginPath();
      ctx.ellipse(
        ball.x - r * 0.2,
        ball.y - r * 0.4,
        r * 0.45,
        r * 0.2,
        -Math.PI / 6,
        0,
        Math.PI * 2
      );
      const highlightGrad = ctx.createLinearGradient(
        ball.x - r * 0.2, ball.y - r * 0.6,
        ball.x - r * 0.2, ball.y - r * 0.2
      );
      highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      highlightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = highlightGrad;
      ctx.fill();

      // 4. Center Icon
      if (ball.img && ball.img.complete) {
        const iconSize = r * 0.9;
        ctx.drawImage(
          ball.img,
          ball.x - iconSize / 2,
          ball.y - iconSize / 2 - 2,
          iconSize,
          iconSize
        );
      }

      // 5. Tech Name Label inside cartoon pill
      ctx.font = `bold ${Math.max(10, Math.round(r * 0.25))}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0,0,0,0.9)';
      ctx.shadowBlur = 4;
      ctx.fillText(ball.name, ball.x, ball.y + r * 0.65);
      ctx.shadowBlur = 0;

      ctx.restore();
    };

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update & Draw Particles
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;
        p.life -= 0.03;

        if (p.alpha <= 0) {
          particles.splice(index, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Update & Physics for Balls
      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];

        // Gently buoyancy anti-gravity float
        ball.vy -= 0.02;

        // Apply mouse magnetic repulsion force
        const dx = mouseX - ball.x;
        const dy = mouseY - ball.y;
        const dist = Math.hypot(dx, dy);
        const hoverDist = 120;

        if (dist < hoverDist && dist > 0) {
          const force = (hoverDist - dist) / hoverDist;
          ball.vx -= (dx / dist) * force * 1.5;
          ball.vy -= (dy / dist) * force * 1.5;
          ball.radius = Math.min(ball.baseRadius * 1.25, ball.baseRadius + 12);
        } else {
          ball.radius += (ball.baseRadius - ball.radius) * 0.1;
        }

        // Dampening velocity
        ball.vx *= 0.96;
        ball.vy *= 0.96;

        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall Bouncing Boundaries
        if (ball.x - ball.radius < 10) {
          ball.x = 10 + ball.radius;
          ball.vx *= -0.7;
        }
        if (ball.x + ball.radius > canvas.width - 10) {
          ball.x = canvas.width - 10 - ball.radius;
          ball.vx *= -0.7;
        }
        if (ball.y - ball.radius < 10) {
          ball.y = 10 + ball.radius;
          ball.vy *= -0.7;
        }
        if (ball.y + ball.radius > canvas.height - 10) {
          ball.y = canvas.height - 10 - ball.radius;
          ball.vy *= -0.7;
        }

        // Inter-ball collisions
        for (let j = i + 1; j < balls.length; j++) {
          const b2 = balls[j];
          const bdx = b2.x - ball.x;
          const bdy = b2.y - ball.y;
          const bdist = Math.hypot(bdx, bdy);
          const minDist = ball.radius + b2.radius;

          if (bdist < minDist && bdist > 0) {
            const overlap = minDist - bdist;
            const nx = bdx / bdist;
            const ny = bdy / bdist;

            ball.x -= nx * overlap * 0.5;
            ball.y -= ny * overlap * 0.5;
            b2.x += nx * overlap * 0.5;
            b2.y += ny * overlap * 0.5;

            const kx = ball.vx - b2.vx;
            const ky = ball.vy - b2.vy;
            const p = 2 * (nx * kx + ny * ky) / 2;

            ball.vx -= p * nx * 0.8;
            ball.vy -= p * ny * 0.8;
            b2.vx += p * nx * 0.8;
            b2.vy += p * ny * 0.8;
          }
        }

        // Draw 3D Glossy Ball
        drawGlossy3DSphere(ball);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full rounded-[2.5rem] bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-4 sm:p-6 shadow-2xl overflow-hidden group">
      
      {/* Glossy Header Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2 px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <h3 className="text-base sm:text-lg font-display font-black text-white tracking-wide">
            Interactive 3D Tech Arsenal
          </h3>
        </div>

        <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" /> Click or hover any 3D ball to inspect proficiency
        </span>
      </div>

      {/* 3D Glossy Canvas */}
      <div className="relative w-full h-[360px] cursor-pointer">
        <canvas ref={canvasRef} className="w-full h-full block rounded-2xl" />
      </div>

      {/* Selected Skill Popup Card */}
      {selectedTech && (
        <div className="mt-4 p-5 rounded-2xl bg-zinc-900/95 border border-zinc-700/80 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: selectedTech.accentColor, boxShadow: `0 0 10px ${selectedTech.accentColor}` }} 
              />
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                {selectedTech.category}
              </span>
            </div>
            
            <h4 className="text-xl font-display font-black text-white flex items-center gap-2">
              <span>{selectedTech.name}</span>
              <span className="text-xs font-mono font-normal text-red-400 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30">
                {selectedTech.experience}
              </span>
            </h4>

            <p className="text-xs text-zinc-300 flex items-center gap-2 pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{selectedTech.highlight}</span>
            </p>
          </div>

          <button
            onClick={() => setSelectedTech(null)}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 transition-colors shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

    </div>
  );
};

export default FallingTechBalls;
