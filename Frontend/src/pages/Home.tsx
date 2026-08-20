import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GsapTextSlide } from '../components/GsapTextSlide';

gsap.registerPlugin(ScrollTrigger);
import triremeBannerImg from '../assets/bannerimg/trireme.png';
import vedagroupBannerImg from '../assets/bannerimg/vedagroup.png';
import { 
  Mail, 
  CheckCircle2, 
  Globe, 
  Briefcase,
  Layers,
  ArrowRight,
  Code2,
  Cpu
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { CustomLoader } from '../components/CustomLoader';
import { BrandMarquee } from '../components/BrandMarquee';
import { Counter } from '../components/Counter';
import { ScrollReveal } from '../components/ScrollReveal';

// Import all frame images dynamically using Vite's import.meta.glob
const imageModules = import.meta.glob('../assets/videoimg/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;

// Sort the image URLs by frame number (e.g. 0001.jpg)
const imageUrls = Object.keys(imageModules)
  .sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)\.jpg/)?.[1] || '0', 10);
    const numB = parseInt(b.match(/(\d+)\.jpg/)?.[1] || '0', 10);
    return numA - numB;
  })
  .map((key) => imageModules[key]);

// ── Multilingual Greeting — cycles every 2.5s with smooth fade ────────────
const GREETINGS = [
  { text: "Hey,",       lang: "English",    color: "#ef4444" },
  { text: "Hola,",      lang: "Español",    color: "#f97316" },
  { text: "नमस्ते,",   lang: "हिन्दी",      color: "#fbbf24" },
  { text: "Bonjour,",   lang: "Français",   color: "#34d399" },
  { text: "こんにちは,", lang: "日本語",      color: "#60a5fa" },
  { text: "مرحباً,",    lang: "العربية",    color: "#a78bfa" },
  { text: "Ciao,",      lang: "Italiano",   color: "#f472b6" },
  { text: "Hallo,",     lang: "Deutsch",    color: "#2dd4bf" },
  { text: "안녕하세요,", lang: "한국어",      color: "#fb923c" },
  { text: "Olá,",       lang: "Português",  color: "#4ade80" },
  { text: "你好,",      lang: "中文",        color: "#f87171" },
  { text: "Привет,",    lang: "Русский",    color: "#818cf8" },
];

const MultilingualGreeting: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % GREETINGS.length);
        setVisible(true);
      }, 350); // fade out then swap
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const { text, lang, color } = GREETINGS[idx];

  return (
    <div className="gsap-hero-label flex items-center gap-2 h-7">
      <span
        style={{
          color,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0px)' : 'translateY(-8px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease, color 0.2s ease',
          display: 'inline-block',
          fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: 'monospace',
          textShadow: `0 0 20px ${color}60`,
        }}
      >
        {text}
      </span>
      <span
        style={{
          opacity: visible ? 0.45 : 0,
          transition: 'opacity 0.35s ease',
          fontSize: '0.65rem',
          color: '#71717a',
          letterSpacing: '0.1em',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          alignSelf: 'center',
          paddingTop: '2px',
        }}
      >
        {lang}
      </span>
    </div>
  );
};

// ── Cycling Status Pill Badge ──────────────────────────────────────────────
const BADGE_ITEMS = [
  { role: "Multi-Agent AI & Full Stack Dev",   tag: "Sagar Punia",       tagColor: "#e4e4e7" },
  { role: "Autonomous AI Research Engine",     tag: "LangGraph + LCEL",  tagColor: "#818cf8" },
  { role: "Lead Developer & Architect",         tag: "Production Ready",  tagColor: "#ef4444" },
  { role: "15+ Production Websites Built",      tag: "1.5+ Yrs Exp",      tagColor: "#fb923c" },
  { role: "10+ n8n Workflows Active",           tag: "Zero API Cost",     tagColor: "#34d399" },
  { role: "Available for AI & Full-Stack Roles",tag: "Open for Hire",     tagColor: "#4ade80" },
];

const CyclingStatusBadge: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % BADGE_ITEMS.length);
        setFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const current = BADGE_ITEMS[index];

  return (
    <div className="gsap-hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/80 border border-red-500/50 text-xs font-mono mb-6 w-fit backdrop-blur-md shadow-[0_0_25px_rgba(239,68,68,0.25)] hover:border-red-400 transition-all duration-300 select-none">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]"></span>
      </span>
      
      <span className="h-4 overflow-hidden flex items-center min-w-[210px] sm:min-w-[260px]">
        <span
          className="text-red-400 font-bold tracking-tight inline-block transition-all duration-300 ease-out"
          style={{
            opacity: fade ? 1 : 0,
            transform: fade ? 'translateY(0px)' : 'translateY(-6px)'
          }}
        >
          {current.role}
        </span>
      </span>

      <span className="text-zinc-600 font-light">|</span>

      <span className="h-4 overflow-hidden flex items-center">
        <span
          className="font-medium tracking-wide inline-block transition-all duration-300 ease-out"
          style={{
            color: current.tagColor,
            opacity: fade ? 1 : 0,
            transform: fade ? 'translateY(0px)' : 'translateY(6px)'
          }}
        >
          {current.tag}
        </span>
      </span>
    </div>
  );
};

export const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Card stack interaction states
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [deckHovered, setDeckHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll state
  const scrollFractionRef = useRef(0);
  const currentFractionRef = useRef(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const portalsRef = useRef<HTMLDivElement>(null);

  // GSAP entrance & scroll-trigger directional animation (Left/Right split)
  useEffect(() => {
    if (!loaded || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Smooth Step-by-Step Staggered Entrance Animation (Ek Ek Karke Aayenge)
      const entranceTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });

      entranceTl
        // Step 1: Badge comes down smoothly
        .fromTo(
          '.gsap-hero-badge',
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 }
        )
        // Step 2: "Hey, I'm a" label slides in from left
        .fromTo(
          '.gsap-hero-label',
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 },
          '-=0.3'
        )
        // Step 3: Title lines "Sagar" then "Punia" slide up smoothly one by one
        .fromTo(
          '.gsap-hero-title-line',
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.18, ease: 'power4.out' },
          '-=0.3'
        )
        // Step 4: Side pitch headline fades up
        .fromTo(
          '.gsap-hero-headline',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.4'
        )
        // Step 5: Sub-paragraph description fades up
        .fromTo(
          '.gsap-hero-para',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        // Step 6: CTA Buttons & Social Links stagger in smoothly
        .fromTo(
          '.gsap-hero-btn',
          { scale: 0.88, y: 15, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
          '-=0.3'
        )
        // Step 7: Stat cards stagger up one by one
        .fromTo(
          '.gsap-stat-card',
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' },
          '-=0.3'
        );

      // 2. Directional Scroll & Reverse Scroll Scrubbing
      // Left elements slide OUT to Left on scroll down, slide back IN from Left on scroll up
      gsap.fromTo(
        '.gsap-hero-left-content, .gsap-hero-badge',
        { x: 0, opacity: 1 },
        {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom-=100 top',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
          x: -150,
          opacity: 0,
          ease: 'none',
        }
      );

      // Right elements slide OUT to Right on scroll down, slide back IN from Right on scroll up
      gsap.fromTo(
        '.gsap-hero-right-content',
        { x: 0, opacity: 1 },
        {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom-=100 top',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
          x: 150,
          opacity: 0,
          ease: 'none',
        }
      );

      // Left stat cards slide OUT to Left on scroll down, slide back IN from Left on scroll up
      gsap.fromTo(
        '.gsap-stat-card-left',
        { x: 0, opacity: 1 },
        {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2.5,
            invalidateOnRefresh: true,
          },
          x: -200,
          opacity: 0,
          ease: 'power2.inOut',
        }
      );

      // Right stat cards slide OUT to Right on scroll down, slide back IN from Right on scroll up
      gsap.fromTo(
        '.gsap-stat-card-right',
        { x: 0, opacity: 1 },
        {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2.5,
            invalidateOnRefresh: true,
          },
          x: 200,
          opacity: 0,
          ease: 'power2.inOut',
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [loaded]);

  // GSAP ScrollTrigger for Section 5 (Explore Pages) & Section 6 (Contact Touchpoint)
  useEffect(() => {
    if (!loaded || !portalsRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header fade & down — buttery smooth
      gsap.fromTo(
        '.gsap-portals-header',
        { y: -30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: portalsRef.current,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 1.5,
          },
          y: 0,
          opacity: 1,
          ease: 'power2.inOut',
        }
      );

      // 2. Left Cards — smooth reverse scrub from left
      gsap.fromTo(
        '.gsap-portal-card-left',
        { x: -200, opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: portalsRef.current,
            start: 'top 85%',
            end: 'top 10%',
            scrub: 2.5,
            invalidateOnRefresh: true,
          },
          x: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          ease: 'power2.inOut',
        }
      );

      // 3. Right Cards — smooth reverse scrub from right
      gsap.fromTo(
        '.gsap-portal-card-right',
        { x: 200, opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: portalsRef.current,
            start: 'top 85%',
            end: 'top 10%',
            scrub: 2.5,
            invalidateOnRefresh: true,
          },
          x: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          ease: 'power2.inOut',
        }
      );

      // 4. Contact Touchpoint — smooth rise from bottom
      gsap.fromTo(
        '.gsap-contact-touchpoint',
        { y: 50, scale: 0.96, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.gsap-contact-touchpoint',
            start: 'top 92%',
            end: 'top 50%',
            scrub: 1.5,
          },
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power2.inOut',
        }
      );
    }, portalsRef);

    return () => ctx.revert();
  }, [loaded]);

  // Load all images on mount
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    if (imageUrls.length === 0) {
      setLoaded(true);
      return;
    }

    imageUrls.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / imageUrls.length) * 100));
        if (loadedCount === imageUrls.length) {
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / imageUrls.length) * 100));
        if (loadedCount === imageUrls.length) {
          setLoaded(true);
        }
      };
      imgs[index] = img;
    });

    setLoadedImages(imgs);
  }, []);

  // Update canvas size and draw frame
  const drawFrame = (fraction: number) => {
    const canvas = canvasRef.current;
    if (!canvas || loadedImages.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    }

    // Map fraction (0-1) to frame index
    const frameIndex = Math.min(
      loadedImages.length - 1,
      Math.max(0, Math.floor(fraction * (loadedImages.length - 1)))
    );

    const img = loadedImages[frameIndex];
    if (!img) return;

    // Aspect cover logic
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;
    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScrollTop <= 0 ? 0 : scrollTop / maxScrollTop;
      scrollFractionRef.current = scrollFraction;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation Loop (Lerp for smooth transition)
  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      if (loaded && loadedImages.length > 0) {
        const lerpFactor = 0.06;
        const diff = scrollFractionRef.current - currentFractionRef.current;
        
        if (Math.abs(diff) > 0.0001) {
          currentFractionRef.current += diff * lerpFactor;
          setScrollProgress(currentFractionRef.current);
        } else {
          currentFractionRef.current = scrollFractionRef.current;
          setScrollProgress(currentFractionRef.current);
        }

        drawFrame(currentFractionRef.current);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [loaded, loadedImages]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFractionRef.current);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [loaded, loadedImages]);

  // 3D Isometric Card Stack positioning
  const getCardTransform = (index: number) => {
    const baseRotateX = 35;
    const baseRotateY = 0;
    const baseRotateZ = -15;
    
    const startFraction = 0.15;
    const endFraction = 0.65;
    let progress = (scrollProgress - startFraction) / (endFraction - startFraction);
    progress = Math.min(1, Math.max(0, progress));
    
    const expansion = deckHovered ? 1.25 : progress;
    
    const baseTranslateY = (index - 2) * 45;
    const expandedTranslateY = (index - 2) * 115;
    const translateY = baseTranslateY + (expandedTranslateY - baseTranslateY) * expansion;
    
    const baseTranslateZ = (4 - index) * 15;
    const expandedTranslateZ = (4 - index) * 45;
    const translateZ = baseTranslateZ + (expandedTranslateZ - baseTranslateZ) * expansion;
    
    const isSelfHovered = hoveredCard === index;
    const liftZ = isSelfHovered ? 55 : 0;
    const liftY = isSelfHovered ? -20 : 0;
    
    const rotateZ = baseRotateZ + (index - 2) * 2.5 * expansion + (isSelfHovered ? -3 : 0);
    
    return `rotateX(${baseRotateX}deg) rotateY(${baseRotateY}deg) rotateZ(${rotateZ}deg) translateY(${translateY + liftY}px) translateZ(${translateZ + liftZ}px)`;
  };

  // Card Data Populated with Sagar's Main Projects
  const cardsData = [
    {
      id: 1,
      className: 'bg-zinc-950/90 text-white border-indigo-500/40 shadow-xl shadow-indigo-500/10',
      content: (
        <div className="p-5 h-full flex flex-col justify-between select-none font-sans">
          <div className="flex justify-between items-center text-[10px] text-indigo-400 font-mono tracking-wider">
            <span>AI AGENT SYSTEM</span>
            <span>01 / 05</span>
          </div>
          <div className="my-auto space-y-1">
            <span className="text-[9px] text-indigo-400 font-mono uppercase font-bold block">4-Stage Autonomous Pipeline</span>
            <h4 className="text-xl font-display font-extrabold tracking-tight uppercase text-white">Multi-Agent AI</h4>
            <p className="text-[10px] text-zinc-400 line-clamp-2">
              LangGraph + Tavily search, BeautifulSoup scraper, LCEL writer & Critic QA rubric grader.
            </p>
          </div>
          <div className="text-[9px] text-indigo-300/80 font-mono uppercase tracking-widest">
            LangGraph + FastAPI SSE + React
          </div>
        </div>
      )
    },
    {
      id: 2,
      className: 'bg-zinc-950/90 text-white border-zinc-800 shadow-xl',
      content: (
        <div className="p-5 h-full flex flex-col justify-between select-none font-sans">
          <div className="flex justify-between items-center text-[10px] text-orange-400 font-mono tracking-wider">
            <span>SAAS PLATFORM</span>
            <span>02 / 05</span>
          </div>
          <div className="my-auto space-y-1">
            <span className="text-[9px] text-emerald-400 font-mono uppercase font-bold block">150+ Gyms | 7,500+ Members</span>
            <h4 className="text-xl font-display font-extrabold tracking-tight uppercase text-white">GymFlow SaaS</h4>
            <p className="text-[10px] text-zinc-400 line-clamp-2">
              90% faster API via Redis (500ms → 50ms), custom WhatsApp integration saving 50k/yr.
            </p>
          </div>
          <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest">
            Full Stack React + Node + Redis
          </div>
        </div>
      )
    },
    {
      id: 3,
      className: 'bg-stone-900/90 text-stone-100 border-stone-800 shadow-xl',
      content: (
        <div className="relative w-full h-full rounded-2xl overflow-hidden text-stone-100 select-none">
          <img src={triremeBannerImg} className="absolute inset-0 w-full h-full object-cover opacity-35" alt="TRIREME B2B Platform" />
          <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 bg-gradient-to-b from-zinc-950/90 via-zinc-950/85 to-zinc-900/95">
            <div className="flex justify-between items-center text-[10px] text-amber-400 font-mono tracking-wider">
              <span>B2B MARKETPLACE</span>
              <span>03 / 05</span>
            </div>
            <div className="my-auto space-y-1">
              <span className="text-[9px] text-amber-400 uppercase font-mono block font-bold">Multi-Vendor Pharma</span>
              <h4 className="text-xl font-display font-extrabold tracking-tight uppercase text-white">TRIREME B2B</h4>
              <p className="text-[10px] text-zinc-400 line-clamp-2">
                Drug License & GST onboarding compliance with admin vendor approval & analytics.
              </p>
            </div>
            <div className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">
              Pharma Distributor Network
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      className: 'bg-gradient-to-br from-orange-600 to-amber-600 text-white border-orange-500 shadow-orange-600/20',
      content: (
        <div className="p-5 h-full flex flex-col justify-between select-none">
          <div className="flex justify-between items-center text-[10px] text-orange-200/80 font-mono tracking-wider">
            <span>AUTOMATION</span>
            <span>04 / 05</span>
          </div>
          <div className="my-auto">
            <span className="text-[9px] text-orange-200 uppercase font-mono block font-bold">10+ n8n Workflows</span>
            <h4 className="text-2xl font-display font-black tracking-tighter uppercase leading-tight">n8n & WebJS Bot</h4>
            <p className="text-[10px] text-orange-100/90 mt-0.5 line-clamp-2 font-mono">
              200+ WhatsApp msgs/day @ ₹0 API cost, lead pipelines & CRM sync.
            </p>
          </div>
          <div className="text-[9px] text-orange-200/70 font-mono uppercase tracking-widest">
            80% Manual Work Reduction
          </div>
        </div>
      )
    },
    {
      id: 5,
      className: 'bg-zinc-900/90 text-white border-zinc-700 shadow-xl',
      content: (
        <div className="relative w-full h-full rounded-2xl overflow-hidden text-white select-none">
          <img src={vedagroupBannerImg} className="absolute inset-0 w-full h-full object-cover opacity-35" alt="Veda Group & Client Sites" />
          <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 bg-gradient-to-b from-zinc-950/95 to-zinc-900/98">
            <div className="flex justify-between items-center text-[10px] text-emerald-400 font-mono tracking-wider">
              <span>CLIENT SITES</span>
              <span>05 / 05</span>
            </div>
            <div className="my-auto space-y-1">
              <span className="text-[9px] text-emerald-400 uppercase font-mono block font-bold">15+ Production Sites</span>
              <h4 className="text-xl font-display font-extrabold uppercase text-white">Client Portfolio</h4>
              <p className="text-[10px] text-zinc-400 line-clamp-2">
                Visawebs, Vedomin, Holistic Jeevandhara, Design Houzz & 10+ live sites.
              </p>
            </div>
            <div className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">
              End-To-End Deployment
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative bg-transparent text-white selection:bg-orange-500 selection:text-white min-h-screen font-sans">
      
      {/* Custom SAGAR PUNIA Loader Screen */}
      {!loaded && <CustomLoader progress={loadProgress} />}

      {/* Clear Sticky Interactive Canvas Video Sequence Background */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden z-0 pointer-events-none">
        <canvas ref={canvasRef} className="block w-full h-full object-cover opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* Main Content Overlay */}
      {loaded && (
        <div className="relative z-10 w-full">

          {/* Section 1: Executive Professional Hero Section */}
          <section ref={heroRef} className="min-h-screen flex flex-col justify-end px-6 md:px-16 pb-16 pt-36 max-w-7xl mx-auto">
            <div className="gsap-hero-scroll-container w-full">
              
              {/* Top Status & Role Badge */}
              <CyclingStatusBadge />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
                
                {/* Main Display Headline */}
                <div className="gsap-hero-left-content lg:col-span-8 space-y-2">
                  <MultilingualGreeting />
                  <h1 className="text-6xl sm:text-8xl md:text-[110px] font-sans font-black leading-[0.88] tracking-tighter text-white uppercase drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] overflow-hidden py-1">
                    <span className="gsap-hero-title-line block">Sagar</span>
                    <span className="gsap-hero-title-line block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-red-400">Punia</span>
                  </h1>
                </div>

                {/* Side Pitch & Action Buttons */}
                <div className="gsap-hero-right-content lg:col-span-4 max-w-sm lg:pb-2 space-y-4">
                  <h2 className="gsap-hero-headline text-xl sm:text-2xl font-heading font-bold text-amber-300 leading-snug drop-shadow-md">
                    Taking businesses from zero to online —{' '}
                    <GsapTextSlide
                      words={[
                        "from code to content.",
                        "from zero to scale.",
                        "from build to launch.",
                        "with 100% automation."
                      ]}
                      className="text-orange-400 font-extrabold border-b border-orange-500/40"
                    />
                  </h2>
                  <p className="gsap-hero-para text-xs text-zinc-300 leading-relaxed font-normal drop-shadow-sm">
                    1.5+ years building 15+ production websites, 3 React Native apps, and 10+ n8n automated workflows.
                  </p>

                  {/* Primary Action Buttons & Social Links */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      to="/projects"
                      className="gsap-hero-btn group px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-xs shadow-lg shadow-red-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>View All Projects</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      to="/about"
                      className="gsap-hero-btn px-5 py-3 rounded-full bg-black/60 border border-white/20 hover:border-red-400 text-xs text-white font-bold backdrop-blur-md hover:scale-105 transition-all cursor-pointer"
                    >
                      About Me
                    </Link>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gsap-hero-btn px-3.5 py-1.5 rounded-full bg-black/50 border border-white/15 hover:border-red-400 text-[11px] text-zinc-300 hover:text-white transition font-mono backdrop-blur-xs flex items-center gap-1"
                    >
                      <span>LinkedIn</span>
                      <span className="text-red-400">↗</span>
                    </a>
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gsap-hero-btn px-3.5 py-1.5 rounded-full bg-black/50 border border-white/15 hover:border-red-400 text-[11px] text-zinc-300 hover:text-white transition font-mono backdrop-blur-xs flex items-center gap-1"
                    >
                      <span>GitHub</span>
                      <span className="text-red-400">↗</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* High-End Glassmorphism Stats Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/15 pt-8 mt-12 w-full">
                {personalInfo.summaryStats.slice(0, 4).map((stat, i) => (
                  <div
                    key={i}
                    className={`gsap-stat-card ${i < 2 ? 'gsap-stat-card-left' : 'gsap-stat-card-right'} p-5 rounded-2xl bg-[#0c0c0e]/85 border border-zinc-800/80 backdrop-blur-md shadow-2xl hover:border-red-500/50 hover:bg-[#121216] transition-all duration-300 group`}
                  >
                    <div className="text-3xl sm:text-4xl font-black font-sans text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-orange-400 drop-shadow-md group-hover:scale-105 transition-transform origin-left">
                      <Counter value={stat.value} />
                    </div>
                    <div className="text-xs text-zinc-300 font-medium tracking-wide mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* Section 2: Brand Marquee Infinite Scroll Banner */}
          <section className="py-6">
            <BrandMarquee />
          </section>

          {/* Section 3: Space Transition */}
          <section className="h-[15vh] flex items-center justify-center px-6">
            <div className="w-1 h-12 bg-gradient-to-b from-orange-500 to-transparent animate-bounce" />
          </section>

          {/* Section 4: Interactive 3D Stacked Card Animation */}
          <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-20 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
              
              {/* Left Column */}
              <ScrollReveal direction="left" className="lg:col-span-5 flex flex-col gap-5">
                <span className="text-orange-400 text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Interactive Showcase
                </span>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold leading-tight tracking-tight text-white uppercase drop-shadow-md">
                  Featured<br />Projects Stack
                </h2>
                <p className="text-sm text-zinc-200 leading-relaxed font-normal">
                  Hover & scroll over the stack to inspect SaaS platforms (GymFlow), multi-vendor B2B marketplaces (TRIREME), React Native apps, and n8n WhatsApp automation workflows.
                </p>
                
                <div className="pt-2 space-y-2 text-xs font-mono text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>GymFlow SaaS: 150+ Gyms, 7.5k+ Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Redis Latency Reduction: 500ms → 50ms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Bot: 200+ Msgs/Day @ ₹0 API Cost</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-black font-heading font-bold text-xs hover:bg-orange-400 transition">
                    <span>View All Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/about" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/40 border border-white/20 text-white font-heading font-medium text-xs hover:bg-black/60 transition">
                    <span>About Me</span>
                  </Link>
                </div>
              </ScrollReveal>

              {/* Right Column: 3D Stacked Cards Animation */}
              <ScrollReveal direction="right" className="lg:col-span-7 flex justify-center items-center">
                <div 
                  className="relative w-full h-[520px] flex items-center justify-center cursor-pointer select-none"
                  style={{ perspective: '1200px' }}
                  onMouseEnter={() => setDeckHovered(true)}
                  onMouseLeave={() => {
                    setDeckHovered(false);
                    setHoveredCard(null);
                  }}
                >
                  <div className="relative w-[310px] md:w-[340px] h-[220px]" style={{ transformStyle: 'preserve-3d' }}>
                    {cardsData.map((card, idx) => (
                      <div
                        key={card.id}
                        className={`absolute inset-0 w-full h-full rounded-2xl border border-white/20 shadow-2xl transition-all duration-500 ease-out origin-center ${card.className}`}
                        style={{
                          transform: getCardTransform(idx),
                          zIndex: 5 - idx,
                        }}
                        onMouseEnter={() => setHoveredCard(idx)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        {card.content}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

            </div>
          </section>

          {/* Section 5: Transparent Interactive Portals with Directional GSAP Scroll Animations */}
          <section ref={portalsRef} className="py-24 px-6 md:px-16 max-w-7xl mx-auto space-y-12">
            <div className="gsap-portals-header text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-orange-500/40 text-orange-400 font-mono text-[11px] font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                <Layers className="w-3.5 h-3.5 text-orange-400" />
                <span>Explore Portfolio Pages</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                Detailed Work & <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">Capabilities</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-200 max-w-lg mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Explore dedicated sections for full career bio, production project showcases, experience timeline, and automation systems.
              </p>
            </div>

            {/* Split layout: Left cards | Right cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              
              {/* Left Column: 2 Cards */}
              <div className="space-y-6">
                {/* Card 1 */}
                <Link 
                  to="/about" 
                  className="gsap-portal-card-left relative group p-6 rounded-2xl bg-black/20 hover:bg-black/45 backdrop-blur-xs border border-white/20 hover:border-orange-400/80 transition-all duration-500 ease-out shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden block"
                >
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-orange-500/15 rounded-full blur-2xl group-hover:bg-orange-500/30 transition-all duration-500 pointer-events-none" />
                  <div>
                    <div className="p-3.5 rounded-xl bg-black/40 border border-orange-500/40 text-orange-400 w-fit mb-4 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-black transition-all duration-300 shadow-md">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-orange-400 transition-colors drop-shadow-md">
                      About Sagar
                    </h3>
                    <p className="text-xs text-zinc-200 leading-relaxed mb-6 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      Bio, Kurukshetra University BCA, ADCA diploma & complete skills matrix.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-orange-400 font-mono font-bold group-hover:text-orange-300">
                    <span>Read Bio</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>

                {/* Card 2 */}
                <Link 
                  to="/projects" 
                  className="gsap-portal-card-left relative group p-6 rounded-2xl bg-black/20 hover:bg-black/45 backdrop-blur-xs border border-white/20 hover:border-amber-400/80 transition-all duration-500 ease-out shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden block"
                >
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/15 rounded-full blur-2xl group-hover:bg-amber-500/30 transition-all duration-500 pointer-events-none" />
                  <div>
                    <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/40 text-amber-400 w-fit mb-4 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300 shadow-md">
                      <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-amber-400 transition-colors drop-shadow-md">
                      Projects Showcase
                    </h3>
                    <p className="text-xs text-zinc-200 leading-relaxed mb-6 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      GymFlow SaaS, TRIREME Marketplace, 3 Mobile Apps & 15+ Live Sites.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-amber-400 font-mono font-bold group-hover:text-amber-300">
                    <span>View Projects</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>
              </div>

              {/* Right Column: 2 Cards */}
              <div className="space-y-6">
                {/* Card 3 */}
                <Link 
                  to="/experience" 
                  className="gsap-portal-card-right relative group p-6 rounded-2xl bg-black/20 hover:bg-black/45 backdrop-blur-xs border border-white/20 hover:border-emerald-400/80 transition-all duration-500 ease-out shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden block"
                >
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all duration-500 pointer-events-none" />
                  <div>
                    <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/40 text-emerald-400 w-fit mb-4 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-black transition-all duration-300 shadow-md">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors drop-shadow-md">
                      Experience
                    </h3>
                    <p className="text-xs text-zinc-200 leading-relaxed mb-6 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      Trireme Life Science, InnovationSoch, CodeQuotient & Event Leadership.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-emerald-400 font-mono font-bold group-hover:text-emerald-300">
                    <span>View Timeline</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>

                {/* Card 4 */}
                <Link 
                  to="/automation" 
                  className="gsap-portal-card-right relative group p-6 rounded-2xl bg-black/20 hover:bg-black/45 backdrop-blur-xs border border-white/20 hover:border-cyan-400/80 transition-all duration-500 ease-out shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden block"
                >
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-500/15 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all duration-500 pointer-events-none" />
                  <div>
                    <div className="p-3.5 rounded-xl bg-black/40 border border-cyan-500/40 text-cyan-400 w-fit mb-4 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 shadow-md">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors drop-shadow-md">
                      Automation Engine
                    </h3>
                    <p className="text-xs text-zinc-200 leading-relaxed mb-6 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      10+ n8n Workflows, WebJS WhatsApp Bot & IndiaMART B2B optimization.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-cyan-400 font-mono font-bold group-hover:text-cyan-300">
                    <span>See Automation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>
              </div>

            </div>
          </section>

          {/* Section 6: Transparent Direct Contact Touchpoint */}
          <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
            <div className="gsap-contact-touchpoint relative p-8 md:p-12 rounded-3xl bg-black/40 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                <div className="lg:col-span-7 space-y-3">
                  <span className="text-orange-400 text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 drop-shadow-sm">
                    <Mail className="w-4 h-4" /> Get In Touch
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white drop-shadow-md">Have a Project or Role Requirement?</h2>
                  <p className="text-xs text-zinc-200 leading-relaxed drop-shadow-sm">
                    Available for full-time roles, full-stack web platforms, React Native mobile apps, and custom n8n automation workflows.
                  </p>
                </div>

                <div className="lg:col-span-5 flex flex-wrap items-center gap-3 lg:justify-end">
                  <Link to="/contact" className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-heading font-bold text-xs hover:scale-105 transition shadow-lg shadow-orange-500/25">
                    Contact Form
                  </Link>
                  <a href={`tel:${personalInfo.phone}`} className="px-5 py-3 rounded-full bg-black/60 border border-white/20 text-white font-mono text-xs hover:border-orange-400 hover:bg-black/80 transition backdrop-blur-md">
                    Call {personalInfo.phone}
                  </a>
                </div>

              </div>
            </div>
          </section>

        </div>
      )}
    </div>
  );
};
