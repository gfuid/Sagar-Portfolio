import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  GraduationCap, 
  Code2, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  BookmarkCheck,
  Globe,
  Smartphone,
  Share2
} from 'lucide-react';
import { personalInfo, education, certifications } from '../data/portfolioData';
import { InfrastructureMap } from '../components/InfrastructureMap';
import GithubContributionsCard from '../components/GithubContributionsCard';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-zinc-950 text-white selection:bg-red-500 selection:text-white font-sans">
      
      {/* Header Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <User className="w-4 h-4" /> About Sagar Punia
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              Digital Growth Engineer & Full Stack Developer
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              BCA student at Kurukshetra University with 1.5+ years of real-world experience building 15+ production websites, 3 React Native mobile apps, and 10+ n8n automation workflows. Lead Developer at Binary Boss.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 1: DETAILED BIO & GITHUB CONTRIBUTIONS HEATMAP */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
              <h2 className="text-2xl font-heading font-bold text-white tracking-tight">My Journey & Approach</h2>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {personalInfo.about}
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                Whether it's reducing API latency by 90% (500ms to 50ms using Redis caching), building zero-cost WhatsApp auto-responders handling 200+ messages daily, or setting up multi-vendor B2B marketplaces with GST and Drug License compliance — I focus on end-to-end execution that generates real business impact.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-mono border border-red-500/30">
                  Lead Developer @ Binary Boss
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                  1.5+ Years Experience
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono border border-amber-500/30">
                  BCA 2023–2026
                </span>
              </div>
            </div>
          </div>

          {/* GITHUB CONTRIBUTIONS CARD MATCHING IMAGE 2 */}
          <div className="lg:col-span-6 flex justify-center">
            <GithubContributionsCard />
          </div>

        </div>
      </section>

      {/* SECTION 2: NEW ANIMATED INFRASTRUCTURE MAP (From Domain to Deployed) */}
      <section className="py-6">
        <InfrastructureMap />
      </section>

      {/* SECTION 3: ACADEMICS & CERTIFICATIONS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Education */}
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <h3 className="text-xl font-heading font-bold text-white">Academic Qualifications</h3>
            </div>
            
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-amber-400">
                    <span>{edu.period}</span>
                  </div>
                  <h4 className="text-base font-heading font-bold text-white">{edu.degree}</h4>
                  <p className="text-xs text-zinc-400">{edu.institution}</p>
                  {edu.details && (
                    <ul className="text-xs text-zinc-400 space-y-1 pt-1 font-mono">
                      {edu.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-6">
            <div className="flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-heading font-bold text-white">Professional Certifications</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <h5 className="text-xs font-heading font-bold text-white">{cert.title}</h5>
                    <p className="text-[10px] text-zinc-500 font-mono">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: FULL TECHNICAL SKILLS MATRIX */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6">
        <div className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest">Skill Inventory</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">Comprehensive Technical Stack</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <h4 className="text-white font-heading font-bold text-sm flex items-center gap-2 text-red-400">
                <Code2 className="w-4 h-4" /> Frontend Development
              </h4>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.frontend.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-800 text-xs text-zinc-200 font-mono">{s}</span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <h4 className="text-white font-heading font-bold text-sm flex items-center gap-2 text-amber-400">
                <Layers className="w-4 h-4" /> Backend & Database
              </h4>
              <div className="flex flex-wrap gap-2">
                {[...personalInfo.skills.backend, ...personalInfo.skills.database].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-800 text-xs text-zinc-200 font-mono">{s}</span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <h4 className="text-white font-heading font-bold text-sm flex items-center gap-2 text-emerald-400">
                <Cpu className="w-4 h-4" /> Automation & Scraping
              </h4>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.automation.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-800 text-xs text-zinc-200 font-mono">{s}</span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <h4 className="text-white font-heading font-bold text-sm flex items-center gap-2 text-cyan-400">
                <Smartphone className="w-4 h-4" /> Mobile Development
              </h4>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.mobile.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-800 text-xs text-zinc-200 font-mono">{s}</span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <h4 className="text-white font-heading font-bold text-sm flex items-center gap-2 text-purple-400">
                <Share2 className="w-4 h-4" /> Marketing & Design
              </h4>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.marketingAndDesign.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-800 text-xs text-zinc-200 font-mono">{s}</span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <h4 className="text-white font-heading font-bold text-sm flex items-center gap-2 text-rose-400">
                <Globe className="w-4 h-4" /> DevOps & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.devopsAndTools.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-800 text-xs text-zinc-200 font-mono">{s}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 text-center">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-red-950/40 border border-red-500/30 space-y-4">
          <h3 className="text-2xl font-heading font-bold text-white">Interested in collaborating or hiring?</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Available for full-time roles, web platform architecture, mobile app projects, and n8n workflow automation.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-heading font-bold text-xs hover:scale-105 transition">
            <span>Get In Touch Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
