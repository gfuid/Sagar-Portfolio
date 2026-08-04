import React, { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { ScrollVideo } from '../components/ScrollVideo';
import { NovaReveal } from '../components/NovaReveal';

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4';

const MITHA_PORTRAIT_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85';

const SERVICES = ['/ AI AUTOMATION', '/ AI INTEGRATION', '/ AI AGENT DEVELOPMENT'];



const CAPABILITIES = [
  {
    index: '01',
    title: 'Real-time vision',
    body: 'Reads context as it happens and surfaces what matters before you ask.',
  },
  {
    index: '02',
    title: 'Layered insight',
    body: 'Moves from rough outline to sharp output without losing the thread.',
  },
  {
    index: '03',
    title: 'Adaptive speed',
    body: 'Learns your cadence and tightens every pass as you work.',
  },
];

export const NovaAIPage: React.FC = () => {
  useEffect(() => {
    document.title = 'NOVA_AI — Today AI Aligns With Bold Dreams';
  }, []);

  return (
    <div
      tabIndex={0}
      className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 selection:text-white font-['Inter',system-ui,sans-serif] focus:outline-none"
    >
      {/* Scroll-scrubbed background video */}
      <ScrollVideo videoUrl={HERO_VIDEO_URL} />

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* main content */}
        <main className="flex-1 flex flex-col">
          {/* Section One — Hero */}
          <section className="min-h-screen supports-[height:100svh]:min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-12 md:pb-16 px-5 sm:px-8 md:px-12">
            {/* Top row */}
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              {/* Left — service list */}
              <div className="flex flex-col gap-2">
                {SERVICES.map((service, i) => (
                  <NovaReveal key={service} delay={150 + i * 120}>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                      {service}
                    </p>
                  </NovaReveal>
                ))}
              </div>

              {/* Right — intro */}
              <NovaReveal delay={300} className="max-w-xs sm:text-right">
                <p className="text-lg sm:text-xl leading-relaxed text-white drop-shadow-md font-normal">
                  We design automation that brings clarity, precision, and efficiency to the way your company operates.
                </p>
              </NovaReveal>
            </div>

            {/* Bottom row */}
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mt-auto pt-16">
              {/* Left Column */}
              <div className="flex flex-col items-start">
                <NovaReveal delay={150}>
                  <div className="border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md mb-5 inline-block">
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white">
                      We Automate 100+ Businesses
                    </span>
                  </div>
                </NovaReveal>

                <NovaReveal delay={280}>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg">
                    Clear. Precise.
                    <br />
                    Automated.
                  </h1>
                </NovaReveal>
              </div>

              {/* Right — glass contact card */}
              <NovaReveal delay={420}>
                <div className="flex items-center gap-4 rounded-xl bg-white/15 p-3 backdrop-blur-md border border-white/15">
                  <img
                    src={MITHA_PORTRAIT_URL}
                    alt="Mitha, co-founder of NovaAI"
                    className="h-24 w-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col gap-1.5 pr-2">
                    <span className="text-sm font-medium text-white">Talk with Mitha</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                      Co-founder of NovaAI
                    </span>
                    <button
                      type="button"
                      className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black hover:bg-white/85 transition-colors duration-300 cursor-pointer"
                    >
                      Book 15-mins call
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </NovaReveal>
            </div>
          </section>

          {/* Mid spacer (aria-hidden) for video scroll scrub length */}
          <div className="h-[80vh]" aria-hidden="true" />

          {/* Section Two — Capability */}
          <section className="min-h-screen supports-[height:100svh]:min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-12 md:pb-16 px-5 sm:px-8 md:px-12">
            {/* Top row */}
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              {/* Left badge */}
              <NovaReveal delay={120}>
                <div className="border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md inline-block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white">
                    Insight On Demand
                  </span>
                </div>
              </NovaReveal>

              {/* Right copy */}
              <NovaReveal delay={220} className="max-w-sm sm:text-right">
                <p className="text-lg sm:text-xl leading-relaxed text-white drop-shadow-md font-normal">
                  Our AI doesn't just respond — it interprets, sharpens, and delivers the signal you need.
                </p>
              </NovaReveal>
            </div>

            {/* Bottom area */}
            <div className="flex-1 flex flex-col justify-end gap-12 md:flex-row md:items-end md:justify-between md:gap-16 mt-auto pt-16">
              {/* Left column */}
              <div className="max-w-xl">
                <NovaReveal delay={180}>
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg">
                    Learn to see
                    <br />
                    brilliantly.
                  </h2>
                </NovaReveal>

                <NovaReveal delay={320}>
                  <p className="mt-6 max-w-md text-sm sm:text-base text-white/80 drop-shadow-md font-normal leading-relaxed">
                    From the first sketch to the final render, Nova turns raw intent into decisions your team can act on
                    — quietly, precisely, at speed.
                  </p>
                </NovaReveal>

                <NovaReveal delay={420}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-medium text-black hover:bg-white/85 transition-colors duration-300 inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      Run the demo
                      <ChevronRight size={14} />
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm text-white hover:bg-white/20 transition-colors duration-300 cursor-pointer"
                    >
                      Free consultation
                    </button>
                  </div>
                </NovaReveal>
              </div>

              {/* Right — Frosted capability panel */}
              <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 sm:px-6">
                {CAPABILITIES.map((cap, i) => (
                  <NovaReveal key={cap.index} delay={300 + i * 110}>
                    <div
                      className={`flex gap-5 py-5 group cursor-pointer ${
                        i !== CAPABILITIES.length - 1 ? 'border-b border-white/15' : ''
                      }`}
                    >
                      <span className="font-mono text-[11px] tracking-[0.15em] text-white/55 pt-0.5">
                        {cap.index}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base sm:text-lg font-medium text-white">{cap.title}</h3>
                          <ChevronRight
                            size={16}
                            className="text-white/40 group-hover:translate-x-0.5 group-hover:text-white transition-all duration-300"
                          />
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/70 font-normal">{cap.body}</p>
                      </div>
                    </div>
                  </NovaReveal>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default NovaAIPage;
