import React, { useRef, useEffect, useState } from 'react';
import { GraduationCap, Rocket, Trophy } from 'lucide-react';
import triremeLogo from '../assets/brand/trireme.png';
import travelTradeLogo from '../assets/brand/traveltrade.png';
import cqstLogo from '../assets/brand/cqst.png';
import innovationSochLogo from '../assets/brand/innovationsoch.png';

interface TimelineEntry {
  year: string;
  role: string;
  company: string;
  type: string;
  logo: string | null;
  tagline: string;
  description: string;
  achievement: string;
  tech: string[];
  accent: string;
}

const timelineData: TimelineEntry[] = [
  {
    year: '2023 – 2026',
    role: 'BCA Computer Science',
    company: 'Kurukshetra University',
    type: 'Education',
    logo: null,
    tagline: 'Foundation',
    description: 'Built solid CS foundations — Data Structures, OOP, Database Systems, and Web Engineering. Completed ADCA Diploma alongside.',
    achievement: 'ADCA Diploma + BCA Degree',
    tech: ['JavaScript', 'HTML/CSS', 'Data Structures', 'DBMS'],
    accent: '#ef4444',
  },
  {
    year: '2025',
    role: 'Web Development Intern',
    company: 'CodeQuotient (CQST)',
    type: 'Internship',
    logo: cqstLogo,
    tagline: 'First Break',
    description: 'Cracked a competitive internship during 2nd year BCA. Fixed production React bugs, learned CI/CD workflows and team code reviews.',
    achievement: '2 Internships cracked in 2nd year',
    tech: ['React.js', 'Git', 'REST APIs', 'CI/CD'],
    accent: '#f97316',
  },
  {
    year: 'Jan 2025',
    role: 'Web Developer',
    company: 'InnovationSoch',
    type: 'Startup',
    logo: innovationSochLogo,
    tagline: 'Full Ownership',
    description: 'End-to-end development at a startup — built web apps from scratch, coded Python scrapers for automated lead generation pipelines.',
    achievement: 'Built Python automation scrapers',
    tech: ['Node.js', 'Firebase', 'Python', 'Selenium'],
    accent: '#eab308',
  },
  {
    year: '2025',
    role: 'Social Media & Growth Lead',
    company: 'Travel Trade',
    type: 'Freelance',
    logo: travelTradeLogo,
    tagline: 'Growth Engine',
    description: 'Combined code with content marketing. Scaled organic reach to 5-6 Lakh impressions with viral digital campaigns and video content.',
    achievement: '5-6L Impressions & 1K+ LinkedIn',
    tech: ['Digital Marketing', 'Canva', 'CapCut', 'Content Strategy'],
    accent: '#38bdf8',
  },
  {
    year: '2026 – Present',
    role: 'Full Stack Developer',
    company: 'Trireme Life Science',
    type: 'Full-Time',
    logo: triremeLogo,
    tagline: 'Lead Engineer',
    description: 'Lead Developer building B2B pharma marketplaces with vendor onboarding, JWT role-based auth, and Redis caching that slashed API latency by 90%.',
    achievement: '90% API Latency Reduction (500ms → 50ms)',
    tech: ['React', 'Node.js', 'MongoDB', 'Redis', 'JWT Auth'],
    accent: '#22c55e',
  },
  {
    year: 'Current',
    role: 'Lead Developer & SaaS Architect',
    company: 'GymFlow SaaS & n8n Automation',
    type: 'SaaS Product',
    logo: null,
    tagline: 'Scaling Impact',
    description: 'Built GymFlow SaaS powering 150+ gyms, 7,500+ members, ₹50L+ transactions. Custom WhatsApp bots saving ₹50K/yr and 10+ n8n automation workflows.',
    achievement: '150+ Gyms Scaled & ₹50K/yr Saved',
    tech: ['GymFlow SaaS', 'n8n Workflows', 'WhatsApp Bot', 'Redis', 'QR Engine'],
    accent: '#a855f7',
  },
];

const TimelineCard: React.FC<{ entry: TimelineEntry; index: number; isLast: boolean }> = ({ entry, index, isLast }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div ref={cardRef} className="relative flex items-start w-full group">

      {/* LEFT SIDE CONTENT (even index) */}
      <div className={`hidden md:flex w-1/2 ${isLeft ? 'justify-end pr-12' : ''}`}>
        {isLeft && (
          <div
            className={`max-w-md w-full transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <CardContent entry={entry} />
          </div>
        )}
      </div>

      {/* CENTER TIMELINE SPINE */}
      <div className="hidden md:flex flex-col items-center relative z-20">
        {/* Dot */}
        <div
          className={`w-5 h-5 rounded-full border-[3px] transition-all duration-500 ${
            isVisible ? 'scale-110' : 'scale-75 opacity-50'
          }`}
          style={{
            borderColor: entry.accent,
            backgroundColor: isVisible ? entry.accent : 'transparent',
            boxShadow: isVisible ? `0 0 16px ${entry.accent}60` : 'none',
          }}
        />
        {/* Connector line */}
        {!isLast && (
          <div className="w-px flex-1 min-h-[40px] bg-gradient-to-b from-zinc-700 to-zinc-800" />
        )}
      </div>

      {/* RIGHT SIDE CONTENT (odd index) */}
      <div className={`hidden md:flex w-1/2 ${!isLeft ? 'justify-start pl-12' : ''}`}>
        {!isLeft && (
          <div
            className={`max-w-md w-full transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <CardContent entry={entry} />
          </div>
        )}
      </div>

      {/* MOBILE VIEW (single column) */}
      <div className="md:hidden w-full flex items-start gap-4">
        {/* Mobile dot + line */}
        <div className="flex flex-col items-center pt-1">
          <div
            className={`w-4 h-4 rounded-full border-[3px] shrink-0 transition-all duration-500 ${
              isVisible ? 'scale-110' : 'scale-75 opacity-50'
            }`}
            style={{
              borderColor: entry.accent,
              backgroundColor: isVisible ? entry.accent : 'transparent',
              boxShadow: isVisible ? `0 0 12px ${entry.accent}60` : 'none',
            }}
          />
          {!isLast && <div className="w-px flex-1 min-h-[20px] bg-zinc-800" />}
        </div>

        {/* Mobile card */}
        <div
          className={`flex-1 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <CardContent entry={entry} />
        </div>
      </div>
    </div>
  );
};

const CardContent: React.FC<{ entry: TimelineEntry }> = ({ entry }) => (
  <div
    className="rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mb-8 group/card"
    style={{
      backgroundColor: `${entry.accent}06`,
      borderColor: `${entry.accent}20`,
    }}
  >
    {/* Year + Type Badge */}
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <span
        className="px-3 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border"
        style={{ color: entry.accent, borderColor: `${entry.accent}40`, backgroundColor: `${entry.accent}10` }}
      >
        {entry.year}
      </span>
      <span className="px-2 py-0.5 rounded-full bg-zinc-800/80 text-zinc-400 text-[10px] font-mono uppercase tracking-wider">
        {entry.type}
      </span>
    </div>

    {/* Company + Logo */}
    <div className="flex items-center gap-3 mb-2">
      {entry.logo ? (
        <div className="w-9 h-9 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-sm border border-zinc-200">
          <img src={entry.logo} alt={entry.company} className="max-h-full max-w-full object-contain" />
        </div>
      ) : (
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${entry.accent}15` }}
        >
          {entry.type === 'Education'
            ? <GraduationCap className="w-4.5 h-4.5" style={{ color: entry.accent }} />
            : <Rocket className="w-4.5 h-4.5" style={{ color: entry.accent }} />
          }
        </div>
      )}
      <div>
        <h4 className="text-lg font-display font-black text-white leading-tight group-hover/card:text-zinc-100">
          {entry.company}
        </h4>
        <p className="text-xs font-mono text-zinc-400">{entry.role}</p>
      </div>
    </div>

    {/* Tagline */}
    <span
      className="text-xs font-bold uppercase tracking-wider mb-2 block"
      style={{ color: entry.accent }}
    >
      {entry.tagline}
    </span>

    {/* Description */}
    <p className="text-sm text-zinc-300 leading-relaxed mb-3">
      {entry.description}
    </p>

    {/* Achievement */}
    <div className="flex items-center gap-2 p-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 mb-3">
      <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
      <span className="text-xs font-bold text-white">{entry.achievement}</span>
    </div>

    {/* Tech Tags */}
    <div className="flex flex-wrap gap-1.5">
      {entry.tech.map((t) => (
        <span
          key={t}
          className="px-2 py-0.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[10px] font-mono text-zinc-300 font-semibold"
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

export const CareerStoryRoadmap: React.FC = () => {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2">
          <Rocket className="w-3.5 h-3.5" /> Career Journey
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-4">
          The Road So Far
        </h2>
        <p className="text-zinc-500 text-sm font-mono mt-2 max-w-lg mx-auto">
          From student to full-stack SaaS architect — every milestone, every win.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        {/* Center vertical line (desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-red-500/30 via-zinc-800 to-purple-500/30 z-10" />

        {timelineData.map((entry, idx) => (
          <TimelineCard key={idx} entry={entry} index={idx} isLast={idx === timelineData.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default CareerStoryRoadmap;
