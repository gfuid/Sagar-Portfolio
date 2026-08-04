import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Code2, 
  Layers, 
  Cpu, 
  ArrowRight,
  BookOpen,
  BookmarkCheck,
  Globe,
  Smartphone,
  Share2,
  Award,
  ExternalLink,
  Check,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Heart,
  MessageCircle,
  Camera,
  Dumbbell,
  MapPin,
  Play,
  Flame,
  Disc,
  Radio,
  ChevronLeft,
  ChevronRight,
  Grid,
  Bookmark,
  Pin
} from 'lucide-react';
import { personalInfo, education, certifications } from '../data/portfolioData';
import { Moon3D } from '../components/Moon3D';
import GithubContributionsCard from '../components/GithubContributionsCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { Counter } from '../components/Counter';
import { InstagramIcon } from '../components/SocialIcons';
import travelMountainsImg from '../assets/brand/travel_mountains.png';
import travelWorkcationImg from '../assets/brand/travel_workcation.png';

// Real Instagram Profile Assets
import instaDpImg from '../assets/insta_real_dp.jpg';
import instaPost1 from '../assets/insta_real_post_1.jpg';
import instaPost2 from '../assets/insta_real_post_2.jpg';
import instaPost3 from '../assets/insta_real_post_3.jpg';
import instaPost4 from '../assets/insta_real_post_4.jpg';

import hlCover1 from '../assets/hl_cover_1.jpg';
import hlCover2 from '../assets/hl_cover_2.jpg';
import hlCover3 from '../assets/hl_cover_3.jpg';
import hlCover4 from '../assets/hl_cover_4.jpg';
import hlCover5 from '../assets/hl_cover_5.jpg';
import hlCover6 from '../assets/hl_cover_6.jpg';
import hlCover7 from '../assets/hl_cover_7.jpg';
import hlCover8 from '../assets/hl_cover_8.jpg';
import hlCover9 from '../assets/hl_cover_9.jpg';
import hlCover10 from '../assets/hl_cover_10.jpg';
import hlCover11 from '../assets/hl_cover_11.jpg';
import hlCover12 from '../assets/hl_cover_12.jpg';
import hlCover13 from '../assets/hl_cover_13.jpg';
import hlCover14 from '../assets/hl_cover_14.jpg';
import hlCover15 from '../assets/hl_cover_15.jpg';
import hlCover16 from '../assets/hl_cover_16.jpg';

// Highlights Array matching actual profile screenshots
const realInstaHighlights = [
  { id: 1, name: 'Hampta Pass ...', cover: hlCover1 },
  { id: 2, name: 'chandratal 💖', cover: hlCover2 },
  { id: 3, name: 'Manali 🏔️', cover: hlCover3 },
  { id: 4, name: 'COLLEGE 🍇', cover: hlCover4 },
  { id: 5, name: 'Mathren 🌲🌳', cover: hlCover5 },
  { id: 6, name: 'Mumbai 💖', cover: hlCover6 },
  { id: 7, name: 'KURUKSHETRA', cover: hlCover7 },
  { id: 8, name: 'Haridwar ✨', cover: hlCover8 },
  { id: 9, name: 'KASHMIR ❄️...', cover: hlCover9 },
  { id: 10, name: 'SHIV KHORI 💖', cover: hlCover10 },
  { id: 11, name: 'MAA VAISHNO...', cover: hlCover11 },
  { id: 12, name: 'CHAMBAL FO...', cover: hlCover12 },
  { id: 13, name: 'SRK 🤪', cover: hlCover13 },
  { id: 14, name: 'Khatu Shyam', cover: hlCover14 },
  { id: 15, name: 'UJJAIN', cover: hlCover15 },
  { id: 16, name: 'friends 💖🖤', cover: hlCover16 },
];

// ── Animated Split-Letter Heading ─────────────────────────────────────────
const word1 = 'About'.split('');
const word2 = 'Us'.split('');

const AnimatedHeading: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <h1
      className="text-4xl sm:text-7xl md:text-8xl font-sans tracking-tight leading-none cursor-default select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* "About" — thin weight letters */}
      <span className="inline-block mr-4">
        {word1.map((letter, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              fontWeight: 300,
              color: hovered ? '#f97316' : '#ffffff',
              transform: hovered ? `translateY(-8px) rotate(${(i % 2 === 0 ? -1 : 1) * 2}deg)` : 'translateY(0px) rotate(0deg)',
              transition: `color 0.3s ease ${i * 0.04}s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.04}s`,
              textShadow: hovered ? `0 0 30px rgba(249,115,22,0.7)` : 'none',
            }}
          >
            {letter}
          </span>
        ))}
      </span>

      {/* "Us" — extrabold letters */}
      <span className="inline-block">
        {word2.map((letter, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              fontWeight: 900,
              color: hovered ? '#ffffff' : '#ffffff',
              transform: hovered
                ? `translateY(-12px) scale(1.08)`
                : 'translateY(0px) scale(1)',
              transition: `transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${(word1.length + i) * 0.04 + 0.05}s`,
              textShadow: hovered ? '0 0 40px rgba(255,255,255,0.4)' : 'none',
            }}
          >
            {letter}
          </span>
        ))}
      </span>

      {/* Animated underline stroke */}
      <div
        style={{
          height: '3px',
          marginTop: '6px',
          background: 'linear-gradient(90deg, #f97316, #fb923c, #ffffff)',
          borderRadius: '999px',
          transformOrigin: 'left',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1) 0.1s',
        }}
      />
    </h1>
  );
};

// ── Typewriter Role Line ───────────────────────────────────────────────────
const ROLES = ['Full Stack Developer', 'Automation Engineer', 'Digital Growth Lead', 'BCA @ Kurukshetra Uni'];
const TypewriterRole: React.FC = () => {
  const [roleIdx, setRoleIdx] = React.useState(0);
  const [displayed, setDisplayed] = React.useState('');
  const [deleting, setDeleting] = React.useState(false);
  const [blink, setBlink] = React.useState(true);

  React.useEffect(() => {
    const target = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  React.useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 font-mono text-xs text-orange-400 uppercase tracking-widest">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
      <span>{displayed}</span>
      <span style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.1s' }} className="text-orange-300">|</span>
    </div>
  );
};

// ── Interactive Skill Tags ─────────────────────────────────────────────────
const SKILLS = [
  { label: 'React', color: '#61dafb' },
  { label: 'TypeScript', color: '#3178c6' },
  { label: 'Node.js', color: '#68a063' },
  { label: 'n8n', color: '#f97316' },
  { label: 'Python', color: '#fbbf24' },
  { label: 'Three.js', color: '#ffffff' },
  { label: 'Next.js', color: '#aaaaaa' },
  { label: 'Tailwind', color: '#38bdf8' },
  { label: 'MongoDB', color: '#4db33d' },
  { label: 'AWS', color: '#ff9900' },
];

const SkillTag: React.FC<{ label: string; color: string; delay: number }> = ({ label, color, delay }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderColor: hov ? color : '#3f3f46',
        color: hov ? color : '#a1a1aa',
        background: hov ? `${color}15` : 'transparent',
        transform: hov ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
        boxShadow: hov ? `0 4px 20px ${color}35` : 'none',
        transition: `all 0.25s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
      }}
      className="px-3 py-1 rounded-full border text-[11px] font-mono cursor-default select-none"
    >
      {label}
    </span>
  );
};

// ── Animated Stat Counter ──────────────────────────────────────────────────
const StatCounter: React.FC<{ value: string; label: string; color: string }> = ({ value, label, color }) => {
  return (
    <div className="text-center">
      <div className="text-2xl font-black font-mono" style={{ color }}>
        <Counter value={value} />
      </div>
      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">{label}</div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#020204] text-white selection:bg-orange-500 selection:text-black font-sans">
      
      {/* SECTION 1: ASTRON ASTRONOMICAL HERO TOP (Photorealistic 360 Three.js Moon) */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Rich Interactive Content */}
          <ScrollReveal direction="left" className="lg:col-span-6 space-y-7">

            {/* Typewriter role line */}
            <TypewriterRole />

            {/* Animated Heading */}
            <div className="space-y-4">
              <div className="overflow-hidden">
                <AnimatedHeading />
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed font-normal max-w-md">
                Digital Growth Engineer &amp; Lead Developer at Binary Boss. BCA student at Kurukshetra University with 1.5+ years of real-world experience building 15+ production websites and 10+ automation workflows.
              </p>
            </div>

            {/* Live Stat Counters */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 px-2 hover:border-orange-500/60 transition-all hover:bg-orange-500/5">
                <StatCounter value="15+" label="Websites" color="#f97316" />
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 px-2 hover:border-emerald-500/60 transition-all hover:bg-emerald-500/5">
                <StatCounter value="10+" label="Automations" color="#10b981" />
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 px-2 hover:border-blue-500/60 transition-all hover:bg-blue-500/5">
                <StatCounter value="3" label="Mobile Apps" color="#60a5fa" />
              </div>
            </div>

            {/* Interactive Skill Tags */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Tech Stack · Hover to Explore</div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((s, i) => (
                  <SkillTag key={s.label} label={s.label} color={s.color} delay={i * 20} />
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-full bg-[#121318] border border-zinc-700 hover:border-orange-500 text-white font-mono text-xs hover:bg-orange-500 hover:text-black transition-all flex items-center gap-2 cursor-pointer shadow-xl"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto justify-center px-5 py-3.5 rounded-full bg-black/80 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-600 transition flex items-center gap-1.5"
              >
                <span>GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
              </a>
            </div>

          </ScrollReveal>

          {/* Right Column: Three.js 3D Rotating Moon Model (smaller) */}
          <ScrollReveal direction="right" className="lg:col-span-6 flex justify-center items-center">
            <div className="w-full max-w-[420px]">
              <Moon3D />
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* SECTION 2: "WHO WE ARE" CARD BLOCK (Exact ASTRON middle design layout) */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto mb-24">
        <div className="rounded-3xl bg-[#08090d] border border-zinc-800/90 overflow-hidden shadow-2xl p-8 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Visual: Night Sky Stargazing Photography & Live Stats */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1000&q=80" 
                  alt="Night Sky Telescope" 
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 space-y-3">
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-mono border border-orange-500/30 uppercase font-bold inline-block">
                    Binary Boss Lead Dev
                  </span>
                  <h4 className="text-xl font-heading font-extrabold text-white">Full-Stack Execution</h4>
                  <div className="space-y-1 text-xs font-mono text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">API Speedup:</span>
                      <span className="text-emerald-400 font-bold">500ms → 50ms (90%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">WhatsApp Bot:</span>
                      <span className="text-orange-400 font-bold">200+ msgs/day @ ₹0 Cost</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content: "Who We Are" Header & Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1">
                <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest block font-bold">Who We Are</span>
                <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight">
                  A Dedicated Developer <br />
                  <span className="font-extrabold text-white">Building High-Scale Products</span>
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
                {personalInfo.about}
              </p>

              {/* Bullet Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-mono text-zinc-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>150+ Gyms & 7.5k+ Members SaaS</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>GST & Drug License B2B Platform</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>90% Latency Cut (500ms → 50ms)</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>10+ n8n Automated Workflows</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/projects"
                  className="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-700 hover:border-orange-500 text-xs font-mono text-white transition inline-flex items-center gap-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 text-orange-400" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: MINIMALIST HIGH-CONTRAST STATS GRID (ASTRON Style) */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto mb-24">
        <div className="space-y-4">
          <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest block font-bold">About Us</span>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-zinc-800/80 pt-8">
            
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight">
                Software Engineering <br />
                <span className="font-extrabold text-white">For Everyone</span>
              </h2>
              <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                Proven track record across full-stack web platforms, cross-platform mobile apps, and enterprise workflow automation.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <div className="text-4xl sm:text-6xl font-sans font-extrabold text-white tracking-tight">
                  <Counter value="1.5+" />
                </div>
                <div className="text-xs font-mono text-zinc-300">Years of Experience</div>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-6xl font-sans font-extrabold text-white tracking-tight">
                  <Counter value="15+" />
                </div>
                <div className="text-xs font-mono text-zinc-300">Production Sites Built</div>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-6xl font-sans font-extrabold text-white tracking-tight">
                  <Counter value="3" />
                </div>
                <div className="text-xs font-mono text-zinc-300">React Native Apps</div>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-6xl font-sans font-extrabold text-white tracking-tight">
                  <Counter value="10+" />
                </div>
                <div className="text-xs font-mono text-zinc-300">n8n Workflows</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: HIGH-END UI/UX ACADEMIC QUALIFICATIONS & PROFESSIONAL CERTIFICATIONS CARDS */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto mb-24 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-orange-400 font-mono text-xs uppercase tracking-widest font-bold">Credentials & Mastery</span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight uppercase">
            Academic & Professional Qualifications
          </h2>
          <p className="text-xs text-zinc-300 font-light">
            Formal university computer science degree paired with industry-verified technical certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Card 1: Academic Qualifications Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#08090d] border border-zinc-800/90 shadow-2xl relative overflow-hidden space-y-8 group hover:border-amber-500/50 transition-all duration-500">
            {/* Ambient Corner Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-lg">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-extrabold text-white">Academic Qualifications</h3>
                  <p className="text-xs font-mono text-zinc-400">Formal Computer Science Degree & Diplomas</p>
                </div>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-mono border border-amber-500/30 font-bold shadow-md">
                BCA 2023–2026
              </span>
            </div>

            {/* Academic Items Timeline Cards */}
            <div className="space-y-6 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-zinc-800">
              {education.map((edu, idx) => (
                <div key={idx} className="relative pl-11 group/item">
                  {/* Glowing Node Point */}
                  <div className="absolute left-2 top-2.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-amber-400 group-hover/item:scale-125 group-hover/item:bg-amber-400 transition-all shadow-[0_0_10px_rgba(245,158,11,0.6)]" />

                  <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 group-hover/item:border-amber-500/60 group-hover/item:bg-zinc-900 transition-all space-y-3 shadow-xl">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        {edu.period}
                      </span>
                      <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Official Degree</span>
                    </div>
                    
                    <h4 className="text-lg font-heading font-extrabold text-white group-hover/item:text-amber-300 transition">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-zinc-300 font-medium">{edu.institution}</p>

                    {edu.details && (
                      <ul className="text-xs text-zinc-300 space-y-1.5 pt-3 font-mono border-t border-zinc-800/80 mt-2">
                        {edu.details.map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Professional Certifications Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#08090d] border border-zinc-800/90 shadow-2xl relative overflow-hidden space-y-8 group hover:border-emerald-500/50 transition-all duration-500">
            {/* Ambient Corner Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-extrabold text-white">Professional Certifications</h3>
                  <p className="text-xs font-mono text-zinc-400">Industry-Verified Technical Mastery</p>
                </div>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-mono border border-emerald-500/30 font-bold shadow-md">
                {certifications.length} Verified Credentials
              </span>
            </div>

            {/* Certifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/60 hover:bg-zinc-900 transition-all duration-300 space-y-3 group/cert shadow-xl"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover/cert:scale-110 transition-transform">
                      <BookmarkCheck className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED
                    </span>
                  </div>

                  <div>
                    <h5 className="text-sm font-heading font-extrabold text-white group-hover/cert:text-emerald-300 transition leading-snug">
                      {cert.title}
                    </h5>
                    <p className="text-[11px] text-zinc-300 font-mono mt-1">
                      Issuer: <span className="text-white font-semibold">{cert.issuer}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: LIVE GITHUB CONTRIBUTIONS */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-orange-400 font-mono text-xs font-bold uppercase tracking-widest">Live Activity</span>
            <h2 className="text-3xl font-heading font-extrabold text-white">Consistent Code Contributions</h2>
            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              Continuous development output with verified GitHub commits, SaaS architecture work, and client feature deployments.
            </p>
          </div>
          <div className="lg:col-span-6 flex justify-center">
            <GithubContributionsCard />
          </div>
        </div>
      </section>

      {/* SECTION 6: FULL TECHNICAL SKILLS MATRIX */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto mb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#08090d] border border-zinc-800 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-orange-400 font-mono text-xs font-bold uppercase tracking-widest">Skill Inventory</span>
            <h2 className="text-3xl font-heading font-extrabold text-white uppercase">Technical Capabilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <h4 className="text-white font-heading font-bold text-sm flex items-center gap-2 text-red-400">
                <Code2 className="w-4 h-4" /> Frontend Development
              </h4>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.frontend.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">{s}</span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <h4 className="text-white font-heading font-bold text-sm flex items-center gap-2 text-amber-400">
                <Layers className="w-4 h-4" /> Backend & Database
              </h4>
              <div className="flex flex-wrap gap-2">
                {[...personalInfo.skills.backend, ...personalInfo.skills.database].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">{s}</span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <h4 className="text-white font-heading font-bold text-sm flex items-center gap-2 text-emerald-400">
                <Cpu className="w-4 h-4" /> Automation & Scraping
              </h4>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.automation.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">{s}</span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <h4 className="text-white font-heading font-bold text-sm flex items-center gap-2 text-cyan-400">
                <Smartphone className="w-4 h-4" /> Mobile Development
              </h4>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.mobile.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">{s}</span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <h4 className="text-white font-heading font-bold text-sm flex items-center gap-2 text-purple-400">
                <Share2 className="w-4 h-4" /> Marketing & Design
              </h4>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.marketingAndDesign.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">{s}</span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <h4 className="text-white font-heading font-bold text-sm flex items-center gap-2 text-rose-400">
                <Globe className="w-4 h-4" /> DevOps & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.devopsAndTools.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">{s}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6.5: PERSONAL LIFE, HOBBIES & TRAVEL DIARIES */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto mb-24">
        <div className="space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-orange-400 font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <Compass className="w-4 h-4 text-orange-500 animate-spin" style={{ animationDuration: '10s' }} />
              Off The Grid • Personal Life & Hobbies
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              Personal Hobbies & Lifestyle 🏔️🎧🏋️
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Away from work and screen time — these are the mountain roadtrips, fitness routines, music playlists, and outdoor exploration that define my personal life.
            </p>
          </div>

          {/* APPLE/AWWWARDS STYLE INTERACTIVE BENTO GRID HUB */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Bento Tile 1: Mountain Roadtrips (Large 7-Col Hero Tile) */}
            <div className="md:col-span-7 relative rounded-[2.5rem] overflow-hidden border border-zinc-800/90 hover:border-orange-500/60 transition-all duration-500 group shadow-2xl h-[420px] flex flex-col justify-between p-8 bg-zinc-950">
              {/* Background Photography */}
              <img 
                src={travelMountainsImg} 
                alt="Mountain Pass Roadtrip with Friends" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30 pointer-events-none" />

              {/* Top Bar */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-orange-400 border border-orange-500/30 flex items-center gap-2 font-bold shadow-lg">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" /> HIMACHAL MOUNTAIN PASS • 13,058 FT
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-mono text-[11px] font-bold border border-orange-500/40 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" /> FRIENDS ROADTRIP
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 space-y-4 max-w-xl">
                <div className="space-y-1">
                  <span className="text-orange-400 font-mono text-xs font-bold uppercase tracking-widest block">Squad Trips & Freedom</span>
                  <h3 className="text-3xl sm:text-4xl font-heading font-black text-white group-hover:text-orange-300 transition-colors">
                    Roadtrips & Travel with Friends
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  Passionate about mountain roadtrips with friends, group highway drives across Himachal & Spiti passes, chasing golden hour sunsets, and making lifelong memories with the gang.
                </p>
                <div className="flex flex-wrap gap-2 font-mono text-xs pt-1">
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 font-bold">#HimachalPasses</span>
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 border border-zinc-700">#RoadtripWithFriends</span>
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 border border-zinc-700">#SquadTrips</span>
                </div>
              </div>
            </div>

            {/* Bento Tile 2: Cyber Music Player Widget (5-Col Tile) */}
            <div className="md:col-span-5 relative rounded-[2.5rem] p-8 border border-zinc-800/90 hover:border-purple-500/60 transition-all duration-500 group shadow-2xl bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 flex flex-col justify-between h-[420px]">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">CYBER AUDIO PLAYER</span>
                </div>
                <Disc className="w-7 h-7 text-purple-400 group-hover:rotate-180 transition-transform duration-700" />
              </div>

              {/* Central Vinyl & Equalizer */}
              <div className="my-2 p-5 rounded-3xl bg-zinc-950/90 border border-zinc-800/90 space-y-4 shadow-inner">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold shrink-0">
                      🎧
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-white truncate max-w-[180px]">Synthwave Roadtrip Mix</div>
                      <div className="text-[11px] font-mono text-zinc-400">Midnight Driving Beats</div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-full bg-purple-500 text-black group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/40">
                    <Play className="w-4 h-4 fill-black" />
                  </div>
                </div>

                {/* Animated Audio Equalizer Bars */}
                <div className="flex items-end justify-between gap-1.5 h-10 px-2 pt-2">
                  <div className="w-2 bg-purple-500 rounded-full animate-bounce h-9" style={{ animationDuration: '0.8s' }} />
                  <div className="w-2 bg-pink-500 rounded-full animate-bounce h-5" style={{ animationDuration: '1.2s' }} />
                  <div className="w-2 bg-purple-400 rounded-full animate-bounce h-10" style={{ animationDuration: '0.6s' }} />
                  <div className="w-2 bg-indigo-500 rounded-full animate-bounce h-6" style={{ animationDuration: '1.0s' }} />
                  <div className="w-2 bg-purple-500 rounded-full animate-bounce h-8" style={{ animationDuration: '0.7s' }} />
                  <div className="w-2 bg-pink-400 rounded-full animate-bounce h-4" style={{ animationDuration: '0.9s' }} />
                  <div className="w-2 bg-purple-300 rounded-full animate-bounce h-7" style={{ animationDuration: '1.1s' }} />
                  <div className="w-2 bg-purple-500 rounded-full animate-bounce h-5" style={{ animationDuration: '0.85s' }} />
                </div>
              </div>

              {/* Bottom Track info */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>02:45</span>
                  <span className="text-purple-400 font-bold">STEREO 320 KBPS</span>
                  <span>04:12</span>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-[65%] rounded-full shadow-md shadow-purple-500/50" />
                </div>
              </div>

            </div>

            {/* Bento Tile 3: Cyber Fitness & Gym Ring HUD (5-Col Tile) */}
            <div className="md:col-span-5 relative rounded-[2.5rem] p-8 border border-zinc-800/90 hover:border-emerald-500/60 transition-all duration-500 group shadow-2xl bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 flex flex-col justify-between h-[380px]">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">FITNESS & DISCIPLINE</span>
                </div>
                <Dumbbell className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>

              {/* Central Ring & Stats HUD */}
              <div className="my-2 p-5 rounded-3xl bg-zinc-950/90 border border-zinc-800/90 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Weekly Workout Streak:</span>
                  <span className="text-emerald-400 font-bold text-sm">6 Days / Wk 🔥</span>
                </div>

                <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 h-full w-[88%] rounded-full shadow-lg shadow-emerald-500/50" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-1">
                  <div className="bg-zinc-900/90 p-3 rounded-2xl border border-zinc-800 text-center">
                    <span className="text-[10px] text-zinc-400 block uppercase">ACTIVE BURN</span>
                    <span className="text-base font-extrabold text-white">650+ kcal</span>
                  </div>
                  <div className="bg-zinc-900/90 p-3 rounded-2xl border border-zinc-800 text-center">
                    <span className="text-[10px] text-zinc-400 block uppercase">STRENGTH</span>
                    <span className="text-base font-extrabold text-white">Heavy Lifts</span>
                  </div>
                </div>
              </div>

              {/* Bottom Tags */}
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">#GymDiscipline</span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 border border-zinc-700">#ActiveLifestyle</span>
              </div>

            </div>

            {/* Bento Tile 4: Viewfinder Photography & Exploration (7-Col Tile) */}
            <div className="md:col-span-7 relative rounded-[2.5rem] overflow-hidden border border-zinc-800/90 hover:border-pink-500/60 transition-all duration-500 group shadow-2xl h-[380px] flex flex-col justify-between p-8 bg-zinc-950">
              
              {/* Background Photo */}
              <img 
                src={travelWorkcationImg} 
                alt="Exploration & Cafes" 
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/30 pointer-events-none" />

              {/* Viewfinder LCD Bar */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-pink-400 border border-pink-500/30 flex items-center gap-2 font-bold shadow-lg">
                  <Camera className="w-3.5 h-3.5 text-pink-400" /> REC 🔴 4K 60FPS VIEW
                </span>
                <span className="text-xs font-mono text-zinc-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  32.2432° N, 77.1892° E
                </span>
              </div>

              {/* Viewfinder Reticle Overlay */}
              <div className="relative z-10 my-auto text-center pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity">
                <div className="inline-block border border-pink-500/60 p-4 rounded-2xl bg-black/30 backdrop-blur-xs">
                  <div className="text-xs font-mono text-pink-300 font-bold">[ + EXPLORE & PHOTOGRAPHY + ]</div>
                </div>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 space-y-3">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white group-hover:text-pink-300 transition-colors">
                    Exploring & Outdoor Life
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mt-1">
                    Discovering hidden mountain cafes, aesthetic scenery photography, exploring local cultures & scenic towns.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold">#OutdoorExploration</span>
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 border border-zinc-700">#Wanderlust</span>
                </div>
              </div>

            </div>

          </div>

          {/* INSTAGRAM TRAVEL & LIFESTYLE GALLERY FEED — REAL PROFILE REPLICA (@your___sagar) */}
          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-zinc-950/90 border border-zinc-800/90 shadow-2xl space-y-10">
            
            {/* 1. Instagram Profile Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-800/80 pb-8">
              
              {/* Profile Avatar & Identity */}
              <div className="flex items-start sm:items-center gap-6">
                
                {/* Real DP Avatar with Instagram Gradient Ring */}
                <div className="relative group shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 shadow-xl group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={instaDpImg} 
                      alt="SAGAR | DEVELOPER" 
                      className="w-full h-full rounded-full object-cover border-2 border-zinc-950"
                    />
                  </div>
                  <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-zinc-950 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                </div>

                {/* Profile Information & Bio */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-heading font-black text-white tracking-tight">your___sagar</h3>
                    <InstagramIcon className="w-5 h-5 text-pink-500" />
                    <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 font-mono text-xs font-bold border border-zinc-700">DEVELOPER</span>
                  </div>

                  {/* Profile Stats Row */}
                  <div className="flex items-center gap-6 text-xs sm:text-sm font-mono text-zinc-300">
                    <div><strong className="text-white font-bold">25</strong> posts</div>
                    <div><strong className="text-white font-bold">93</strong> followers</div>
                    <div><strong className="text-white font-bold">250</strong> following</div>
                  </div>

                  {/* Real Bio Text */}
                  <div className="text-xs sm:text-sm text-zinc-300 font-sans space-y-1 pt-1 leading-relaxed">
                    <div className="font-bold text-white text-sm">SAGAR | DEVELOPER</div>
                    <div className="text-zinc-400 font-mono text-xs">Software company</div>
                    <div className="text-zinc-300">Software Developer <span className="text-blue-400 font-medium">@triremelifesciences</span></div>
                    <div className="text-zinc-300">Building scalable web & mobile solutions</div>
                    <div className="flex items-center gap-1 text-orange-400 font-medium">📱 Living to travel</div>
                    <div className="text-zinc-400 font-mono text-xs">📍 Panipat | 🌐 www.linkedin.com/in/sagar-punia-539078272</div>
                  </div>
                </div>
              </div>

              {/* Follow Button */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white text-xs font-mono font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-xl self-start md:self-center"
              >
                <InstagramIcon className="w-4 h-4" /> Follow @your___sagar
              </a>

            </div>

            {/* 2. REAL INSTAGRAM HIGHLIGHTS STORIES CAROUSEL (WITH NAV ARROWS) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" /> INSTAGRAM HIGHLIGHTS (16)
                </span>
                
                {/* Scroll Arrow Buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      const track = document.getElementById('insta-highlights-track');
                      if (track) track.scrollBy({ left: -250, behavior: 'smooth' });
                    }}
                    className="p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      const track = document.getElementById('insta-highlights-track');
                      if (track) track.scrollBy({ left: 250, behavior: 'smooth' });
                    }}
                    className="p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Highlights Scrollable Track */}
              <div className="relative group">
                <div 
                  id="insta-highlights-track" 
                  className="flex items-center gap-5 overflow-x-auto scrollbar-none py-3 px-1 scroll-smooth"
                >
                  {realInstaHighlights.map((hl) => (
                    <div key={hl.id} className="flex flex-col items-center gap-2 shrink-0 group/item cursor-pointer">
                      {/* Circle Story Cover */}
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 group-hover/item:scale-110 transition-transform duration-300 shadow-lg shrink-0">
                        <img 
                          src={hl.cover} 
                          alt={hl.name} 
                          className="w-full h-full rounded-full object-cover border-2 border-zinc-950"
                        />
                      </div>
                      {/* Highlight Title Label */}
                      <span className="text-[11px] font-mono text-zinc-300 truncate max-w-[84px] text-center font-medium group-hover/item:text-pink-400 transition-colors">
                        {hl.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Feed Navigation Tab Bar */}
            <div className="flex items-center justify-center gap-10 border-t border-b border-zinc-800/80 py-3 text-xs font-mono">
              <span className="text-white font-bold flex items-center gap-2 border-b-2 border-white pb-1">
                <Grid className="w-4 h-4 text-white" /> PINNED POSTS
              </span>
              <span className="text-zinc-400 flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Pin className="w-4 h-4 text-zinc-400" /> REELS
              </span>
              <span className="text-zinc-400 flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Bookmark className="w-4 h-4 text-zinc-400" /> SAVED
              </span>
            </div>

            {/* 4. REAL 4 PINNED INSTAGRAM POSTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Photo 1: Beach Walk */}
              <div className="group relative rounded-3xl overflow-hidden border border-zinc-800/90 bg-zinc-950 aspect-[4/5] shadow-2xl hover:border-cyan-500/50 transition-all duration-500">
                <img 
                  src={instaPost1} 
                  alt="Beach Walk Photo" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30 flex items-center gap-1 font-bold">
                  <MapPin className="w-3 h-3 text-cyan-400" /> Goa / Beach Coast
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-2 text-white">
                  <p className="text-xs font-medium leading-snug">Coastal beach walk & ocean sunsets 🌊🌅</p>
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-300">
                    <span className="flex items-center gap-1 text-pink-400 font-bold"><Heart className="w-3.5 h-3.5 fill-pink-400" /> 1,420</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-zinc-400" /> 98</span>
                  </div>
                </div>
              </div>

              {/* Photo 2: Snow Mountain Open Arms */}
              <div className="group relative rounded-3xl overflow-hidden border border-zinc-800/90 bg-zinc-950 aspect-[4/5] shadow-2xl hover:border-purple-500/50 transition-all duration-500">
                <img 
                  src={instaPost2} 
                  alt="Snow Mountain Open Arms" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-purple-300 border border-purple-500/30 flex items-center gap-1 font-bold">
                  <MapPin className="w-3 h-3 text-purple-400" /> Himachal Snow Peak
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-2 text-white">
                  <p className="text-xs font-medium leading-snug">Living to travel & chasing snowy peaks 🏔️✨</p>
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-300">
                    <span className="flex items-center gap-1 text-pink-400 font-bold"><Heart className="w-3.5 h-3.5 fill-pink-400" /> 1,890</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-zinc-400" /> 134</span>
                  </div>
                </div>
              </div>

              {/* Photo 3: Taj Mahal Palace Mumbai */}
              <div className="group relative rounded-3xl overflow-hidden border border-zinc-800/90 bg-zinc-950 aspect-[4/5] shadow-2xl hover:border-amber-500/50 transition-all duration-500">
                <img 
                  src={instaPost3} 
                  alt="Taj Mahal Palace Mumbai" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-amber-300 border border-amber-500/30 flex items-center gap-1 font-bold">
                  <MapPin className="w-3 h-3 text-amber-400" /> Taj Palace, Mumbai
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-2 text-white">
                  <p className="text-xs font-medium leading-snug">Iconic Taj Mahal Palace, Mumbai 🏢💖</p>
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-300">
                    <span className="flex items-center gap-1 text-pink-400 font-bold"><Heart className="w-3.5 h-3.5 fill-pink-400" /> 2,150</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-zinc-400" /> 165</span>
                  </div>
                </div>
              </div>

              {/* Photo 4: Chandratal Lake */}
              <div className="group relative rounded-3xl overflow-hidden border border-zinc-800/90 bg-zinc-950 aspect-[4/5] shadow-2xl hover:border-emerald-500/50 transition-all duration-500">
                <img 
                  src={instaPost4} 
                  alt="Chandratal Lake" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-bold">
                  <MapPin className="w-3 h-3 text-emerald-400" /> Chandratal Lake, HP
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-2 text-white">
                  <p className="text-xs font-medium leading-snug">Chandratal Lake tranquility 🏔️💙</p>
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-300">
                    <span className="flex items-center gap-1 text-pink-400 font-bold"><Heart className="w-3.5 h-3.5 fill-pink-400" /> 1,640</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-zinc-400" /> 112</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: STARRY SKY CTA BANNER (Exact "Let's Explore With Us" Banner from reference photo) */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl h-[280px] sm:h-[320px] flex items-center justify-center text-center p-8">
          <img 
            src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80" 
            alt="Starry Sky Banner" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50 pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 className="text-4xl sm:text-6xl font-sans font-extralight tracking-tight text-white">
              Let's Explore <span className="font-extrabold text-white">With Us</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-200 font-normal leading-relaxed max-w-md mx-auto">
              Ready to take your project from zero to scale? Available for full-stack applications, mobile apps, and custom n8n automations.
            </p>
            
            <div className="pt-3 flex justify-center">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full bg-white text-black font-mono font-bold text-xs hover:bg-orange-400 hover:text-black transition-all shadow-2xl hover:scale-105 cursor-pointer"
              >
                Join Us Now
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
