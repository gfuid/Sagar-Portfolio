import React from 'react';
import { 
  Cpu, 
  Workflow, 
  CheckCircle2
} from 'lucide-react';
import { automationWorkflows } from '../data/portfolioData';
import type { AutomationWorkflow } from '../data/portfolioData';

export const AutomationPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-zinc-950 text-white selection:bg-orange-500 selection:text-black font-sans">
      
      {/* Header Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-orange-500 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Workflow Engine
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight leading-tight">
              n8n & WebJS Automation
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              10+ automated n8n workflows, zero-API-cost WhatsApp WebJS auto-responders handling 200+ daily messages, and IndiaMART B2B lead generation pipelines reducing manual work by 80%.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-6 rounded-[2rem] bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="text-3xl font-black font-mono text-orange-400">10+</div>
            <div className="text-xs font-heading font-bold text-white uppercase">n8n Workflows</div>
            <p className="text-[11px] text-zinc-400">Production automation pipelines deployed</p>
          </div>

          <div className="p-6 rounded-[2rem] bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="text-3xl font-black font-mono text-emerald-400">200+</div>
            <div className="text-xs font-heading font-bold text-white uppercase">Daily Messages</div>
            <p className="text-[11px] text-zinc-400">Handled via WebJS Bot @ ₹0 API cost</p>
          </div>

          <div className="p-6 rounded-[2rem] bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="text-3xl font-black font-mono text-amber-400">80%</div>
            <div className="text-xs font-heading font-bold text-white uppercase">Work Reduction</div>
            <p className="text-[11px] text-zinc-400">Automated lead routing & CRM sync</p>
          </div>

          <div className="p-6 rounded-[2rem] bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="text-3xl font-black font-mono text-cyan-400">₹50,000</div>
            <div className="text-xs font-heading font-bold text-white uppercase">Yearly Savings</div>
            <p className="text-[11px] text-zinc-400">By replacing paid official Cloud APIs</p>
          </div>

        </div>
      </section>

      {/* Featured Automation Workflows Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-orange-500 font-mono text-xs font-bold uppercase tracking-widest">Workflow Architecture</span>
          <h2 className="text-3xl font-display font-extrabold text-white">Production Automation Suite</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {automationWorkflows.map((flow: AutomationWorkflow, idx: number) => (
            <div 
              key={idx}
              className="p-8 rounded-[2.5rem] bg-zinc-900/70 border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-900 transition-all duration-300 space-y-6 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                    <Workflow className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-white">{flow.title}</h3>
                    <span className="text-[11px] font-mono text-orange-400">{flow.tagline}</span>
                  </div>
                </div>
                {flow.impactBadge && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                    {flow.impactBadge}
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {flow.description}
              </p>

              {/* Step By Step Features List */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">PIPELINE CAPABILITIES</span>
                <ul className="space-y-1.5 text-xs font-mono text-zinc-300">
                  {flow.features.map((feat: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
