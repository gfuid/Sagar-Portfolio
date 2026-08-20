import React, { useState, useMemo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { 
  Building2, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Trophy,
  GraduationCap,
  Award,
  Search,
  Sparkles,
  Layers,
  Zap,
  Star,
  Code2,
  Cpu,
  Grid,
  ListFilter,
  X,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { 
  experiences, 
  education, 
  certifications, 
  achievements 
} from '../data/portfolioData';
import type { 
  ExperienceItem, 
  EducationItem, 
  CertificationItem, 
  AchievementItem 
} from '../data/portfolioData';
import FallingTechBalls from '../components/FallingTechBalls';
import Counter from '../components/Counter';
import { BrandMarquee } from '../components/BrandMarquee';
import { CareerStoryRoadmap } from '../components/CareerStoryRoadmap';
import { ScrollReveal } from '../components/ScrollReveal';
import triremeLogo from '../assets/brand/trireme.png';
import travelTradeLogo from '../assets/brand/traveltrade.png';
import cqstLogo from '../assets/brand/cqst.png';
import innovationSochLogo from '../assets/brand/innovationsoch.png';
import visawebsLogo from '../assets/brand/visawebs.png';

const companyLogos: Record<string, string> = {
  'Visawebs': visawebsLogo,
  'Trireme Life Science': triremeLogo,
  'Travel Trade (Freelance)': travelTradeLogo,
  'Travel Trade': travelTradeLogo,
  'CodeQuotient': cqstLogo,
  'CQST': cqstLogo,
  'InnovationSoch (Startup)': innovationSochLogo,
  'InnovationSoch': innovationSochLogo,
};

export const ExperiencePage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedTechGroup, setSelectedTechGroup] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBalls, setShowBalls] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('timeline');
  const [activeModalExpIndex, setActiveModalExpIndex] = useState<number | null>(null);

  const filterTypes = ['All', 'Full-Time', 'Startup', 'Internship', 'Freelance'];

  const techGroups = [
    { label: 'All', key: 'All' },
    { label: 'AI & Multi-Agent', keywords: ['langchain', 'langgraph', 'python', 'rag', 'mcp', 'agent', 'fastapi', 'openai', 'lcel'] },
    { label: 'React / Frontend', keywords: ['react', 'tailwind', 'ui/ux', 'frontend'] },
    { label: 'Node / Backend', keywords: ['node', 'express', 'rest api', 'jwt', 'backend', 'b2b'] },
    { label: 'Database & Cache', keywords: ['mongodb', 'redis', 'firebase', 'schema'] },
    { label: 'Automation & Python', keywords: ['n8n', 'python', 'selenium', 'scraping', 'webjs', 'whatsapp'] },
    { label: 'Marketing & Digital', keywords: ['marketing', 'digital', 'canva', 'capcut', 'content', 'seo'] },
  ];

  // Filtered experiences
  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp: ExperienceItem) => {
      // Type match
      const matchesType = selectedType === 'All' || exp.type.toLowerCase() === selectedType.toLowerCase();

      // Tech Group match
      let matchesTechGroup = true;
      if (selectedTechGroup !== 'All') {
        const groupObj = techGroups.find(g => g.key === selectedTechGroup || g.label === selectedTechGroup);
        if (groupObj && groupObj.keywords) {
          const combinedStr = `${exp.role} ${exp.company} ${exp.bullets.join(' ')} ${exp.skills.join(' ')}`.toLowerCase();
          matchesTechGroup = groupObj.keywords.some(kw => combinedStr.includes(kw));
        }
      }

      // Search Query match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        exp.role.toLowerCase().includes(q) ||
        exp.company.toLowerCase().includes(q) ||
        exp.bullets.some(b => b.toLowerCase().includes(q)) ||
        exp.skills.some(s => s.toLowerCase().includes(q));

      return matchesType && matchesTechGroup && matchesSearch;
    });
  }, [selectedType, selectedTechGroup, searchQuery]);

  // GSAP ScrollTrigger Card Stacking Effect ("Ek ke upar ek aane wala animation")
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewMode !== 'timeline') return;

    const ctx = gsap.context(() => {
      const cards = timelineContainerRef.current?.querySelectorAll('.gsap-stacked-card');
      if (!cards || cards.length === 0) return;

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Last card doesn't need to shrink

        const targetCard = card as HTMLElement;
        const innerContent = targetCard.querySelector('.gsap-card-inner') as HTMLElement;

        ScrollTrigger.create({
          trigger: targetCard,
          start: 'top top+=110',
          end: 'bottom top+=110',
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (innerContent) {
              gsap.to(innerContent, {
                scale: 1 - p * 0.06,
                opacity: 1 - p * 0.25,
                filter: `brightness(${1 - p * 0.4})`,
                transformOrigin: 'top center',
                duration: 0.1,
                overwrite: 'auto',
              });
            }
          },
        });
      });
    }, timelineContainerRef);

    return () => ctx.revert();
  }, [filteredExperiences, viewMode]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalExpIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeExp = activeModalExpIndex !== null ? experiences[activeModalExpIndex] : null;

  const navigateModal = (dir: 'prev' | 'next') => {
    if (activeModalExpIndex === null) return;
    if (dir === 'prev') {
      setActiveModalExpIndex((activeModalExpIndex - 1 + experiences.length) % experiences.length);
    } else {
      setActiveModalExpIndex((activeModalExpIndex + 1) % experiences.length);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-zinc-950 text-white selection:bg-red-500 selection:text-white font-sans">
      
      {/* 🚀 CYBER HERO HEADER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 relative overflow-hidden shadow-2xl">
          
          {/* Neon Backdrop Glows */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-8">
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-inner">
                <Flame className="w-4 h-4 text-red-500 animate-pulse" /> Engineering Leadership & Career Odyssey
              </span>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowBalls(!showBalls)}
                  className="px-4 py-1.5 rounded-full bg-zinc-800/90 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono border border-zinc-700 transition-all flex items-center gap-2 shadow-md hover:border-red-500/50"
                >
                  <Cpu className="w-3.5 h-3.5 text-red-400" />
                  {showBalls ? 'Hide Skill Physics Canvas' : 'Interactive Skill Balls'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-[1.1]">
                Professional Experience <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">
                  & High-Impact Engineering
                </span>
              </h1>

              <p className="text-zinc-300 text-base sm:text-xl max-w-3xl leading-relaxed font-light">
                1.5+ years spent engineering full-stack platforms, multi-vendor B2B architectures, Redis caching engines, React Native mobile apps, and zero-cost n8n workflow automations.
              </p>
            </div>

            {/* 📊 LIVE ANIMATED COUNTER STATS BAR */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-6 border-t border-zinc-800/80">
              
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/90 hover:border-red-500/40 transition-all group">
                <div className="text-2xl sm:text-3xl font-black text-white font-mono flex items-center gap-0.5">
                  <Counter value="1.5+" duration={2000} />
                  <span className="text-red-500 text-sm font-bold">Yrs</span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-1 group-hover:text-zinc-200 transition-colors">
                  Full-Stack Experience
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/90 hover:border-red-500/40 transition-all group">
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  <Counter value="15+" duration={2200} />
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-1 group-hover:text-zinc-200 transition-colors">
                  Production Platforms
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/90 hover:border-emerald-500/40 transition-all group">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                  <Counter value="150+" duration={2400} />
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-1 group-hover:text-zinc-200 transition-colors">
                  Gyms Scaled on SaaS
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/90 hover:border-orange-500/40 transition-all group">
                <div className="text-2xl sm:text-3xl font-black text-orange-400 font-mono">
                  <Counter value="90%" duration={2000} />
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-1 group-hover:text-zinc-200 transition-colors">
                  Latency Drop (500→50ms)
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/90 hover:border-amber-500/40 transition-all group">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                  <Counter value="10+" duration={2500} />
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-1 group-hover:text-zinc-200 transition-colors">
                  n8n Workflows Deployed
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/90 hover:border-cyan-500/40 transition-all group">
                <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
                  <Counter value="5-6L" duration={2200} />
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-1 group-hover:text-zinc-200 transition-colors">
                  Organic Audience Reach
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* INTERACTIVE SKILL BALLS PHYSICS SIMULATION */}
        {showBalls && (
          <div className="mt-8 transition-all">
            <FallingTechBalls />
          </div>
        )}
      </section>

      {/* 🛣️ INTERACTIVE STORY-DRIVEN CAREER ROADMAP HIGHWAY */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-14">
        <CareerStoryRoadmap />
      </section>

      {/* 🏢 TRUSTED CLIENT & BRAND MARQUEE SECTION */}
      <section className="mb-14">
        <BrandMarquee />
      </section>

      {/* 🎛️ DUAL FILTER & VIEW MODE CONTROLS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-10">
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-5">
          
          {/* Row 1: Role Type Filters + View Mode Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
            
            {/* Employment Type Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mr-2">
                <Layers className="w-4 h-4 text-red-500" /> Role Type:
              </span>
              {filterTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                    selectedType === type
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 border border-red-400 font-bold'
                      : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* View Mode Switcher (Grid vs Timeline) */}
            <div className="flex items-center gap-2 self-end lg:self-auto bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
                  viewMode === 'timeline'
                    ? 'bg-red-500 text-white font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" /> Cyber Timeline
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-red-500 text-white font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" /> Matrix Cards
              </button>
            </div>

          </div>

          {/* Row 2: Tech Group Filter Pills + Live Search Box */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Tech Group Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mr-2">
                <Code2 className="w-4 h-4 text-orange-400" /> Tech Stack:
              </span>
              {techGroups.map((group) => (
                <button
                  key={group.label}
                  onClick={() => setSelectedTechGroup(group.label)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    selectedTechGroup === group.label
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 font-bold'
                      : 'bg-zinc-950/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search company, tech, impact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

          </div>

        </div>
      </section>

      {/* 🚀 WORK EXPERIENCE DISPLAY SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-20">
        
        <div className="flex items-center justify-between mb-8 border-b border-zinc-800/80 pb-4">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white flex items-center gap-3">
            <Zap className="w-6 h-6 text-red-500" /> Engineering Experience Timeline
          </h2>
          <span className="text-xs font-mono text-zinc-400">
            Showing {filteredExperiences.length} of {experiences.length} positions
          </span>
        </div>

        {filteredExperiences.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No experiences match your filters</h3>
            <p className="text-xs text-zinc-400 font-mono">Try clearing your tech group or search query.</p>
            <button 
              onClick={() => { setSelectedType('All'); setSelectedTechGroup('All'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-red-500 text-white text-xs font-mono font-bold hover:bg-red-600 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'timeline' ? (
          
          /* ⚡ VIEW 1: CYBER TIMELINE VIEW (GSAP STACKED CARDS) */
          <div ref={timelineContainerRef} className="relative border-l-2 border-gradient-to-b from-red-500 via-orange-500 to-zinc-800 pl-6 sm:pl-10 space-y-12 ml-4 sm:ml-8 pb-16">
            
            {filteredExperiences.map((exp: ExperienceItem, idx: number) => {
              const isPresent = exp.period.includes('Present');
              const origIndex = experiences.findIndex(e => e.company === exp.company && e.role === exp.role);

              return (
                <ScrollReveal 
                  key={idx} 
                  direction={idx % 2 === 0 ? 'left' : 'right'}
                  className="sticky gsap-stacked-card group transition-all"
                  style={{ top: `${105 + idx * 18}px`, zIndex: idx + 10 }}
                >
                  
                  {/* Glowing Timeline Marker Node */}
                  <div className={`absolute -left-[31px] sm:-left-[47px] top-6 w-6 h-6 rounded-full bg-zinc-950 border-2 transition-all flex items-center justify-center z-20 ${
                    isPresent ? 'border-red-500 shadow-lg shadow-red-500/50 bg-red-950/60' : 'border-red-500/60 group-hover:border-red-500 group-hover:bg-red-500'
                  }`}>
                    <div className={`w-2 h-2 rounded-full transition-colors ${
                      isPresent ? 'bg-red-400 animate-ping' : 'bg-red-400 group-hover:bg-black'
                    }`} />
                  </div>

                  {/* Card Container (Animated by GSAP ScrollTrigger) */}
                  <div className="gsap-card-inner p-6 sm:p-8 rounded-[2rem] bg-zinc-900 border border-zinc-800/90 hover:border-red-500/60 transition-all duration-300 space-y-6 shadow-2xl relative overflow-hidden group">
                    
                    {/* Hover Glow Accent */}
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all pointer-events-none" />

                    {/* Top Bar Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 font-mono text-xs font-bold uppercase border border-red-500/30 inline-block">
                            {exp.role}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono text-[11px] border border-zinc-700">
                            {exp.type}
                          </span>
                          {isPresent && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/30 font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Current Role
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-display font-black text-white flex items-center gap-2.5 pt-1">
                          {companyLogos[exp.company] ? (
                            <div className="h-8 w-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
                              <img src={companyLogos[exp.company]} alt={exp.company} className="max-h-full max-w-full object-contain" />
                            </div>
                          ) : (
                            <Building2 className="w-6 h-6 text-red-500 shrink-0" />
                          )}
                          <span>{exp.company}</span>
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 bg-zinc-950/70 px-4 py-2 rounded-xl border border-zinc-800">
                        <span className="flex items-center gap-1.5 text-zinc-300 font-bold">
                          <Calendar className="w-3.5 h-3.5 text-red-400" />
                          <span>{exp.period}</span>
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{exp.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Key Responsibilities */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-red-500" /> Key Impact & Technical Deliverables
                      </h4>
                      <ul className="space-y-2.5">
                        {exp.bullets.map((bullet: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed group/item">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/item:text-red-400 transition-colors" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Pills + Action Button */}
                    <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill: string) => (
                          <span 
                            key={skill}
                            className="px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800/90 hover:border-red-500/40 text-xs font-mono text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
                          >
                            <Code2 className="w-3 h-3 text-red-400" />
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Deep Dive Spec Sheet Modal Trigger */}
                      <button
                        onClick={() => setActiveModalExpIndex(origIndex >= 0 ? origIndex : 0)}
                        className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-red-500/10 text-xs font-mono text-red-400 hover:text-red-300 border border-red-500/30 transition-all flex items-center justify-center gap-1.5 shrink-0 group/btn"
                      >
                        <span>Deep Dive Spec Sheet</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>

                    </div>

                  </div>

                </ScrollReveal>
              );
            })}

          </div>

        ) : (

          /* 🎛️ VIEW 2: MATRIX CYBER CARDS GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredExperiences.map((exp: ExperienceItem, idx: number) => {
              const origIndex = experiences.findIndex(e => e.company === exp.company && e.role === exp.role);

              return (
                <div 
                  key={idx}
                  className="p-6 sm:p-8 rounded-[2rem] bg-gradient-to-b from-zinc-900 to-zinc-900/70 border border-zinc-800 hover:border-red-500/60 hover:bg-zinc-900 transition-all duration-300 space-y-6 shadow-xl flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    
                    <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 font-mono text-xs font-bold uppercase border border-red-500/30">
                        {exp.role}
                      </span>
                      <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-red-400" /> {exp.period}
                      </span>
                    </div>

                    <h3 className="text-2xl font-display font-black text-white flex items-center gap-2">
                      {companyLogos[exp.company] ? (
                        <div className="h-7 w-7 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
                          <img src={companyLogos[exp.company]} alt={exp.company} className="max-h-full max-w-full object-contain" />
                        </div>
                      ) : (
                        <Building2 className="w-5 h-5 text-red-500" />
                      )}
                      <span>{exp.company}</span>
                    </h3>

                    <p className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" /> {exp.location} • {exp.type}
                    </p>

                    <ul className="space-y-2 pt-2">
                      {exp.bullets.slice(0, 2).map((bullet: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((skill: string) => (
                        <span key={skill} className="px-2.5 py-0.5 rounded-md bg-zinc-950 text-[11px] font-mono text-zinc-300 border border-zinc-800">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveModalExpIndex(origIndex >= 0 ? origIndex : 0)}
                      className="w-full py-2.5 rounded-xl bg-zinc-950 hover:bg-red-500 text-zinc-300 hover:text-white text-xs font-mono font-bold border border-zinc-800 hover:border-red-500 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Inspect Full Architecture</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        )}

      </section>

      {/* 🏆 STANDOUT CAREER MILESTONES & ACHIEVEMENTS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-20">
        <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 relative overflow-hidden shadow-2xl">
          
          <div className="mb-8 space-y-2">
            <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Key Milestones & Trophies
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
              Career Achievements & Recognition
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((item: AchievementItem, idx: number) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-red-500/50 hover:bg-zinc-950 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 font-mono text-[11px] font-bold uppercase border border-red-500/20">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {item.highlight}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 🎓 EDUCATION & CERTIFICATIONS CYBER DASHBOARD */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Academic Education */}
          <div className="p-8 rounded-[2.5rem] bg-zinc-900/80 border border-zinc-800 space-y-6 shadow-xl">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-display font-black text-white">Academic Degrees</h3>
                <p className="text-xs font-mono text-zinc-400">Formal computer application degrees</p>
              </div>
            </div>

            <div className="space-y-6">
              {education.map((edu: EducationItem, idx: number) => (
                <div key={idx} className="space-y-2 border-l-2 border-red-500/40 pl-4 relative">
                  <span className="text-xs font-mono text-red-400 font-bold">{edu.period}</span>
                  <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                  <p className="text-xs text-zinc-400 font-mono">{edu.institution}</p>
                  {edu.details && (
                    <ul className="mt-2 space-y-1">
                      {edu.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-xs text-zinc-300 leading-relaxed">
                          • {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Badges */}
          <div className="p-8 rounded-[2.5rem] bg-zinc-900/80 border border-zinc-800 space-y-6 shadow-xl">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-display font-black text-white">Certifications & Credentials</h3>
                <p className="text-xs font-mono text-zinc-400">Specialized automation & growth certifications</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {certifications.map((cert: CertificationItem, idx: number) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/40 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] font-mono text-zinc-400">{cert.issuer}</p>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 🔍 INTERACTIVE EXPERIENCE DEEP DIVE MODAL DRAWER */}
      {activeExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] bg-zinc-900 border border-zinc-700 shadow-2xl p-6 sm:p-10 space-y-6 text-white">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 font-mono text-xs font-bold uppercase border border-red-500/30">
                    {activeExp.role}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono text-[11px] border border-zinc-700">
                    {activeExp.type}
                  </span>
                </div>
                <h3 className="text-3xl font-display font-black text-white flex items-center gap-2.5 pt-1">
                  {companyLogos[activeExp.company] ? (
                    <div className="h-9 w-9 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
                      <img src={companyLogos[activeExp.company]} alt={activeExp.company} className="max-h-full max-w-full object-contain" />
                    </div>
                  ) : (
                    <Building2 className="w-7 h-7 text-red-500 shrink-0" />
                  )}
                  <span>{activeExp.company}</span>
                </h3>
              </div>

              <button
                onClick={() => setActiveModalExpIndex(null)}
                className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Meta Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-xs font-mono">
              <div>
                <span className="text-zinc-500 block">Period:</span>
                <span className="text-zinc-200 font-bold">{activeExp.period}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Location:</span>
                <span className="text-zinc-200 font-bold">{activeExp.location}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Scope:</span>
                <span className="text-red-400 font-bold">{activeExp.type}</span>
              </div>
            </div>

            {/* Full Impact & Bullet Points */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Trophy className="w-4 h-4 text-red-500" /> Engineering Deliverables & Key Impact
              </h4>
              <ul className="space-y-3">
                {activeExp.bullets.map((bullet: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-200 leading-relaxed bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Skills Stack */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                Technologies & Skill Stack:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeExp.skills.map((skill: string) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 font-bold flex items-center gap-1.5"
                  >
                    <Code2 className="w-3.5 h-3.5 text-red-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <button
                onClick={() => navigateModal('prev')}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Role
              </button>

              <button
                onClick={() => setActiveModalExpIndex(null)}
                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-mono font-bold transition-colors"
              >
                Close Spec Sheet
              </button>

              <button
                onClick={() => navigateModal('next')}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors"
              >
                Next Role <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ExperiencePage;

