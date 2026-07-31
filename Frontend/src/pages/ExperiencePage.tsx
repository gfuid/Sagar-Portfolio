import React from 'react';
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Trophy
} from 'lucide-react';
import { experiences } from '../data/portfolioData';
import type { ExperienceItem } from '../data/portfolioData';
import FallingTechBalls from '../components/FallingTechBalls';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-zinc-950 text-white selection:bg-red-500 selection:text-white font-sans">
      
      {/* Header Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Career Journey
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight leading-tight">
              Professional Experience
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              1.5+ years leading full-stack web platforms, multi-vendor B2B architecture, React Native mobile apps, and n8n workflow automation.
            </p>
          </div>
        </div>

        {/* INTERACTIVE FALLING TECH SKILL BALLS SIMULATION MATCHING IMAGE 3 */}
        <FallingTechBalls />
      </section>

      {/* Timeline Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative border-l-2 border-red-500/30 pl-6 sm:pl-10 space-y-12 ml-4 sm:ml-8">
          
          {experiences.map((exp: ExperienceItem, idx: number) => (
            <div key={idx} className="relative group">
              
              {/* Glowing Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-zinc-950 border-2 border-red-500 group-hover:bg-red-500 transition-colors flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-red-400 group-hover:bg-black transition-colors" />
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-[2rem] bg-zinc-900/70 border border-zinc-800 hover:border-red-500/50 hover:bg-zinc-900 transition-all duration-300 space-y-6 shadow-xl">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 font-mono text-xs font-bold uppercase border border-red-500/30 inline-block mb-1">
                      {exp.role} ({exp.type})
                    </span>
                    <h3 className="text-2xl font-display font-black text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-red-500" />
                      <span>{exp.company}</span>
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-red-500" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Achievements Bullet List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-2">
                    <Trophy className="w-3.5 h-3.5" /> Key Impact & Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-zinc-800 flex flex-wrap gap-2">
                  {exp.skills.map((skill: string) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}

        </div>
      </section>

    </div>
  );
};

export default ExperiencePage;
