import React from 'react';
import { 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  BookmarkCheck,
  Trophy,
  BookOpen
} from 'lucide-react';
import { achievements, education, certifications } from '../data/portfolioData';

export const AchievementsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-zinc-950 text-white selection:bg-orange-500 selection:text-black">
      
      {/* Header Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <span className="text-orange-500 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Award className="w-4 h-4" /> Milestone Recognition
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Achievements, Education & Certifications
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Hackathon leadership, early internships in 2nd year, BCA academic pursuits at Kurukshetra University, and Simplilearn professional certifications.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 1: ACHIEVEMENTS GRID */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 space-y-8">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-orange-500" />
          <h2 className="text-2xl font-extrabold text-white">Key Achievements & Milestones</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-orange-500/50 transition duration-300 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono border border-orange-500/30 font-bold">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {item.highlight}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: EDUCATION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 space-y-8">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-amber-400" />
          <h2 className="text-2xl font-extrabold text-white">Academic Qualifications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span className="text-amber-400 font-semibold">{edu.period}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
              <p className="text-sm text-zinc-300 font-medium">{edu.institution}</p>
              
              {edu.details && (
                <ul className="pt-2 space-y-1 text-xs text-zinc-400">
                  {edu.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: CERTIFICATIONS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 space-y-8">
        <div className="flex items-center gap-2">
          <BookmarkCheck className="w-5 h-5 text-emerald-400" />
          <h2 className="text-2xl font-extrabold text-white">Professional Certifications</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/40 transition flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                <p className="text-xs text-zinc-400 font-mono">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
