import React, { useEffect } from 'react';
import { 
  ChevronRight, 
  Workflow, 
  CheckCircle2, 
  Cpu, 
  Zap 
} from 'lucide-react';
import { ScrollVideo } from '../components/ScrollVideo';
import { NovaReveal } from '../components/NovaReveal';
import { automationWorkflows } from '../data/portfolioData';
import type { AutomationWorkflow } from '../data/portfolioData';

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4';

const SAGAR_PORTRAIT_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85';

const SERVICES = ['/ n8n WORKFLOW ENGINE', '/ WEBJS WHATSAPP BOT', '/ B2B LEAD PIPELINES'];

const CAPABILITIES = [
  {
    index: '01',
    title: 'n8n Production Pipelines',
    body: '10+ production workflows deployed for lead ingestion, CRM sync, and instant notification routing.',
  },
  {
    index: '02',
    title: 'Zero-Cost WebJS WhatsApp Bot',
    body: 'Automated 200+ daily messages with zero official API costs, saving ₹50,000+ per year.',
  },
  {
    index: '03',
    title: 'B2B IndiaMART Intake Engine',
    body: 'Automated lead extraction, validation, and CRM integration reducing manual effort by 80%.',
  },
];

export const AutomationPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Automation Suite — Sagar Punia | Digital Growth Engineer';
  }, []);

  return (
    <div
      tabIndex={0}
      className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-orange-500 selection:text-black font-['Inter',system-ui,sans-serif] focus:outline-none overflow-x-hidden"
    >
      {/* Scroll-scrubbed background video */}
      <ScrollVideo videoUrl={HERO_VIDEO_URL} />

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Main hero and capabilities container */}
        <main className="flex-1 flex flex-col">
          {/* Section One — Hero */}
          <section className="min-h-screen supports-[height:100svh]:min-h-[100svh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 md:pb-16 px-5 sm:px-8 md:px-12">
            {/* Top row */}
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              {/* Left — service list */}
              <div className="flex flex-col gap-2">
                {SERVICES.map((service, i) => (
                  <NovaReveal key={service} delay={150 + i * 120}>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-white font-bold drop-shadow-lg flex items-center gap-2 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-zinc-800 w-fit">
                      <Cpu className="w-3.5 h-3.5 text-orange-400" />
                      {service}
                    </p>
                  </NovaReveal>
                ))}
              </div>

              {/* Right — intro */}
              <NovaReveal delay={300} className="max-w-md sm:text-right">
                <div className="bg-zinc-950/80 backdrop-blur-md p-5 rounded-2xl border border-zinc-800 shadow-2xl">
                  <p className="text-base sm:text-lg leading-relaxed text-white font-medium drop-shadow-md">
                    Designing custom automation pipelines that bring speed, precision, and 80% work reduction to your business operations.
                  </p>
                </div>
              </NovaReveal>
            </div>

            {/* Bottom row */}
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mt-auto pt-16">
              {/* Left Column */}
              <div className="flex flex-col items-start">
                <NovaReveal delay={150}>
                  <div className="border-l-2 border-orange-500 bg-zinc-950/90 px-4 py-2 backdrop-blur-md mb-5 inline-block rounded-r-md border border-zinc-800 shadow-xl">
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white font-bold flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-orange-400" /> 10+ Workflows Active in Production
                    </span>
                  </div>
                </NovaReveal>

                <NovaReveal delay={280}>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">
                    Clear. Precise.
                    <br />
                    Automated.
                  </h1>
                </NovaReveal>
              </div>

              {/* Right — glass contact card */}
              <NovaReveal delay={420}>
                <div className="flex items-center gap-4 rounded-2xl bg-zinc-950/90 p-4 backdrop-blur-md border border-zinc-800 shadow-2xl">
                  <img
                    src={SAGAR_PORTRAIT_URL}
                    alt="Sagar Punia — Digital Growth Engineer"
                    className="h-24 w-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col gap-1.5 pr-2">
                    <span className="text-sm font-bold text-white">Consult with Sagar</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-orange-400 font-bold">
                      Automation Engineer
                    </span>
                    <a
                      href="/contact"
                      className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-xs font-bold text-black hover:from-orange-600 hover:to-amber-600 transition-colors duration-300 cursor-pointer shadow-lg"
                    >
                      Build Workflow
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              </NovaReveal>
            </div>
          </section>

          {/* Mid spacer (aria-hidden) for video scroll scrub length */}
          <div className="h-[80vh]" aria-hidden="true" />

          {/* Section Two — Capability & Metrics */}
          <section className="min-h-screen supports-[height:100svh]:min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-12 md:pb-16 px-5 sm:px-8 md:px-12">
            {/* Top row */}
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              {/* Left badge */}
              <NovaReveal delay={120}>
                <div className="border-l-2 border-orange-500 bg-zinc-950/90 px-4 py-2 backdrop-blur-md inline-block rounded-r-md border border-zinc-800 shadow-xl">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white font-bold">
                    Workflow Architecture
                  </span>
                </div>
              </NovaReveal>

              {/* Right copy */}
              <NovaReveal delay={220} className="max-w-sm sm:text-right">
                <div className="bg-zinc-950/80 backdrop-blur-md p-5 rounded-2xl border border-zinc-800 shadow-2xl">
                  <p className="text-base sm:text-lg leading-relaxed text-white font-medium drop-shadow-md">
                    Our systems don't just execute — they interpret, route, and deliver instant signals to your team.
                  </p>
                </div>
              </NovaReveal>
            </div>

            {/* Bottom area */}
            <div className="flex-1 flex flex-col justify-end gap-12 md:flex-row md:items-end md:justify-between md:gap-16 mt-auto pt-16">
              {/* Left column */}
              <div className="max-w-xl">
                <NovaReveal delay={180}>
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">
                    Automate to scale
                    <br />
                    brilliantly.
                  </h2>
                </NovaReveal>

                <NovaReveal delay={320}>
                  <div className="mt-6 max-w-md bg-zinc-950/80 backdrop-blur-md p-5 rounded-2xl border border-zinc-800 shadow-2xl">
                    <p className="text-sm sm:text-base text-white font-medium leading-relaxed drop-shadow-md">
                      From lead intake to automated CRM sync, Sagar turns complex business processes into self-running pipelines — saving money and removing manual friction.
                    </p>
                  </div>
                </NovaReveal>

                <NovaReveal delay={420}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="#workflows"
                      className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-xs sm:text-sm font-bold text-black hover:from-orange-600 hover:to-amber-600 transition-colors duration-300 inline-flex items-center gap-1.5 cursor-pointer shadow-xl"
                    >
                      View Pipelines
                      <ChevronRight size={14} />
                    </a>
                    <a
                      href="/contact"
                      className="rounded-full border border-zinc-700 bg-zinc-950/90 backdrop-blur-md px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-zinc-900 transition-colors duration-300 cursor-pointer shadow-xl"
                    >
                      Request Custom Automation
                    </a>
                  </div>
                </NovaReveal>
              </div>

              {/* Right — Frosted capability panel */}
              <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/90 backdrop-blur-md px-5 sm:px-6 shadow-2xl">
                {CAPABILITIES.map((cap, i) => (
                  <NovaReveal key={cap.index} delay={300 + i * 110}>
                    <div
                      className={`flex gap-5 py-5 group cursor-pointer ${
                        i !== CAPABILITIES.length - 1 ? 'border-b border-zinc-800' : ''
                      }`}
                    >
                      <span className="font-mono text-[11px] tracking-[0.15em] text-orange-400 pt-0.5 font-bold">
                        {cap.index}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors">{cap.title}</h3>
                          <ChevronRight
                            size={16}
                            className="text-zinc-500 group-hover:translate-x-0.5 group-hover:text-white transition-all duration-300"
                          />
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-300 font-normal">{cap.body}</p>
                      </div>
                    </div>
                  </NovaReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Section Three — Live Production Workflows Grid */}
          <section id="workflows" className="pt-24 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-12">
            <NovaReveal delay={100} className="space-y-3">
              <span className="text-orange-500 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Workflow className="w-4 h-4" /> Production Workflows
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
                Deployed Automation Engines
              </h2>
              <p className="text-zinc-300 text-sm max-w-2xl font-medium">
                Real-world n8n and WebJS systems active in production, saving hours of operational overhead daily.
              </p>
            </NovaReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {automationWorkflows.map((flow: AutomationWorkflow, idx: number) => (
                <NovaReveal key={idx} delay={150 + idx * 100}>
                  <div className="p-8 rounded-[2.5rem] bg-zinc-950/90 border border-zinc-800 backdrop-blur-xl hover:border-orange-500/60 hover:bg-zinc-900/90 transition-all duration-300 space-y-6 shadow-2xl group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 shrink-0 group-hover:scale-105 transition-transform">
                          <Workflow className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-display font-black text-white group-hover:text-orange-400 transition-colors">{flow.title}</h3>
                          <span className="text-xs font-mono text-orange-400 font-bold block mt-0.5">{flow.tagline}</span>
                        </div>
                      </div>
                      {flow.impactBadge && (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono font-bold border border-emerald-500/40 shrink-0 shadow-md">
                          {flow.impactBadge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
                      {flow.description}
                    </p>

                    {/* Step By Step Features List */}
                    <div className="p-4.5 rounded-2xl bg-black/90 border border-zinc-800 space-y-2.5">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                        PIPELINE CAPABILITIES
                      </span>
                      <ul className="space-y-2 text-xs font-mono text-zinc-200">
                        {flow.features.map((feat: string, i: number) => (
                          <li key={i} className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                            <span className="text-zinc-200 font-medium">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </NovaReveal>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AutomationPage;
