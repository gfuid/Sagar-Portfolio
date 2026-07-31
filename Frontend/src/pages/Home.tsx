import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GsapTextSlide } from '../components/GsapTextSlide';

gsap.registerPlugin(ScrollTrigger);
import jacketImg from '../assets/jacket.png';
import headphonesImg from '../assets/headphones.png';
import bottleImg from '../assets/bottle.png';
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

  // GSAP entrance & scroll-trigger directional animation (Left/Right split)
  useEffect(() => {
    if (!loaded || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance Animation (Left & Right Split Come-In)
      const entranceTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      entranceTl
        .fromTo(
          '.gsap-hero-badge',
          { x: -70, y: -20, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 0.9 }
        )
        .fromTo(
          '.gsap-hero-left-content',
          { x: -120, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
          '-=0.5'
        )
        .fromTo(
          '.gsap-hero-right-content',
          { x: 120, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
          '-=0.9'
        )
        .fromTo(
          '.gsap-stat-card',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.8 },
          '-=0.7'
        );

      // 2. Directional Scroll & Reverse Scroll Scrubbing
      // Left elements slide OUT to Left on scroll down, slide back IN from Left on scroll up
      gsap.to('.gsap-hero-left-content, .gsap-hero-badge', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top+=20 top',
          end: 'bottom-=100 top',
          scrub: 1,
        },
        x: -180,
        opacity: 0,
        ease: 'none',
      });

      // Right elements slide OUT to Right on scroll down, slide back IN from Right on scroll up
      gsap.to('.gsap-hero-right-content', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top+=20 top',
          end: 'bottom-=100 top',
          scrub: 1,
        },
        x: 180,
        opacity: 0,
        ease: 'none',
      });

      // Stat cards slide DOWN on scroll down, slide back UP on scroll up
      gsap.to('.gsap-stat-card', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top+=100 top',
          end: 'bottom-=50 top',
          scrub: 1,
        },
        y: 80,
        opacity: 0,
        ease: 'none',
      });
    }, heroRef);

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
        const lerpFactor = 0.1;
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
      className: 'bg-zinc-950/90 text-white border-zinc-800 shadow-xl',
      content: (
        <div className="p-5 h-full flex flex-col justify-between select-none font-sans">
          <div className="flex justify-between items-center text-[10px] text-orange-400 font-mono tracking-wider">
            <span>SAAS PLATFORM</span>
            <span>01 / 05</span>
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
      id: 2,
      className: 'bg-stone-900/90 text-stone-100 border-stone-800 shadow-xl',
      content: (
        <div className="relative w-full h-full rounded-2xl overflow-hidden text-stone-100 select-none">
          <img src={jacketImg} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" alt="" />
          <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 bg-gradient-to-b from-zinc-950/90 via-zinc-950/85 to-zinc-900/95">
            <div className="flex justify-between items-center text-[10px] text-amber-400 font-mono tracking-wider">
              <span>B2B MARKETPLACE</span>
              <span>02 / 05</span>
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
      id: 3,
      className: 'bg-zinc-950/90 text-white border-zinc-800 shadow-xl',
      content: (
        <div className="relative w-full h-full rounded-2xl overflow-hidden text-white select-none">
          <img src={headphonesImg} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" alt="" />
          <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 bg-gradient-to-b from-zinc-950/90 to-zinc-900/95">
            <div className="flex justify-between items-center text-[10px] text-orange-400 font-mono tracking-wider">
              <span>MOBILE APPS</span>
              <span>03 / 05</span>
            </div>
            <div className="my-auto space-y-1">
              <span className="text-[9px] text-orange-400 uppercase font-mono block font-bold">React Native (3 Apps)</span>
              <h4 className="text-xl font-display font-extrabold uppercase text-white">Mobile Suite</h4>
              <p className="text-[10px] text-zinc-400 line-clamp-2">
                Gym Owner App + Expense Tracker + Worldwide Weather Checker App.
              </p>
            </div>
            <div className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">
              Cross-Platform Mobile Dev
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
          <img src={bottleImg} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" alt="" />
          <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 bg-gradient-to-b from-zinc-950/95 to-zinc-900/98">
            <div className="flex justify-between items-center text-[10px] text-emerald-400 font-mono tracking-wider">
              <span>CLIENT SITES</span>
              <span>05 / 05</span>
            </div>
            <div className="my-auto space-y-1">
              <span className="text-[9px] text-emerald-400 uppercase font-mono block font-bold">15+ Production Sites</span>
              <h4 className="text-xl font-display font-extrabold uppercase text-white">Client Portfolio</h4>
              <p className="text-[10px] text-zinc-400 line-clamp-2">
                Vedomin, Holistic Jeevandhara, VedAgro, Design Houzz & 10+ live sites.
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
              <div className="gsap-hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 border border-red-500/40 text-xs font-mono mb-6 w-fit backdrop-blur-md shadow-[0_0_20px_rgba(225,29,72,0.2)]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <GsapTextSlide
                  words={[
                    "Full Stack & Automation Developer",
                    "Lead Dev @ Binary Boss",
                    "15+ Production Sites Built",
                    "n8n Automation Architect"
                  ]}
                  className="text-red-400 font-bold"
                />
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-300">Binary Boss</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
                
                {/* Main Display Headline */}
                <div className="gsap-hero-left-content lg:col-span-8 space-y-2">
                  <span className="gsap-hero-label text-red-400 text-sm sm:text-base font-semibold tracking-widest block uppercase font-mono drop-shadow-md">
                    Hey, I'm a
                  </span>
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
                    className="gsap-stat-card p-5 rounded-2xl bg-[#0c0c0e]/85 border border-zinc-800/80 backdrop-blur-md shadow-2xl hover:border-red-500/50 hover:bg-[#121216] transition-all duration-300 group"
                  >
                    <div className="text-3xl sm:text-4xl font-black font-sans text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-orange-400 drop-shadow-md group-hover:scale-105 transition-transform origin-left">
                      {stat.value}
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
              <div className="lg:col-span-5 flex flex-col gap-5">
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
              </div>

              {/* Right Column: 3D Stacked Cards Animation */}
              <div className="lg:col-span-7 flex justify-center items-center">
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
              </div>

            </div>
          </section>

          {/* Section 5: Translucent Separate Page Portals Teaser */}
          <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-orange-400 font-mono text-xs font-bold uppercase tracking-widest">Explore Portfolio Pages</span>
              <h2 className="text-3xl font-display font-extrabold text-white drop-shadow-md">Detailed Work & Capabilities</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <Link to="/about" className="p-6 rounded-2xl bg-black/30 border border-white/20 hover:border-orange-500/60 hover:bg-black/50 transition group">
                <Code2 className="w-8 h-8 text-orange-400 mb-3 group-hover:scale-110 transition" />
                <h3 className="text-lg font-display font-bold text-white mb-1">About Sagar</h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-3">Bio, Kurukshetra University BCA, ADCA diploma & complete skills matrix.</p>
                <span className="text-xs text-orange-400 font-mono font-bold inline-flex items-center gap-1">Read Bio →</span>
              </Link>

              <Link to="/projects" className="p-6 rounded-2xl bg-black/30 border border-white/20 hover:border-orange-500/60 hover:bg-black/50 transition group">
                <Globe className="w-8 h-8 text-amber-400 mb-3 group-hover:scale-110 transition" />
                <h3 className="text-lg font-display font-bold text-white mb-1">Projects Showcase</h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-3">GymFlow SaaS, TRIREME Marketplace, 3 Mobile Apps & 15+ Live Sites.</p>
                <span className="text-xs text-amber-400 font-mono font-bold inline-flex items-center gap-1">View Projects →</span>
              </Link>

              <Link to="/experience" className="p-6 rounded-2xl bg-black/30 border border-white/20 hover:border-orange-500/60 hover:bg-black/50 transition group">
                <Briefcase className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition" />
                <h3 className="text-lg font-display font-bold text-white mb-1">Experience</h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-3">Trireme Life Science, InnovationSoch, CodeQuotient & Event Leadership.</p>
                <span className="text-xs text-emerald-400 font-mono font-bold inline-flex items-center gap-1">View Timeline →</span>
              </Link>

              <Link to="/automation" className="p-6 rounded-2xl bg-black/30 border border-white/20 hover:border-orange-500/60 hover:bg-black/50 transition group">
                <Cpu className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition" />
                <h3 className="text-lg font-display font-bold text-white mb-1">Automation Engine</h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-3">10+ n8n Workflows, WebJS WhatsApp Bot & IndiaMART B2B optimization.</p>
                <span className="text-xs text-cyan-400 font-mono font-bold inline-flex items-center gap-1">See Automation →</span>
              </Link>

            </div>
          </section>

          {/* Section 6: Translucent Direct Contact Touchpoint */}
          <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
            <div className="p-8 md:p-12 rounded-3xl bg-black/40 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-3">
                  <span className="text-orange-400 text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Get In Touch
                  </span>
                  <h2 className="text-3xl font-display font-extrabold text-white drop-shadow-md">Have a Project or Role Requirement?</h2>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    Available for full-time roles, full-stack web platforms, React Native mobile apps, and custom n8n automation workflows.
                  </p>
                </div>

                <div className="lg:col-span-5 flex flex-wrap items-center gap-3 lg:justify-end">
                  <Link to="/contact" className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-heading font-bold text-xs hover:scale-105 transition">
                    Contact Form
                  </Link>
                  <a href={`tel:${personalInfo.phone}`} className="px-5 py-3 rounded-full bg-black/50 border border-white/20 text-white font-mono text-xs hover:bg-black/70 transition">
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
