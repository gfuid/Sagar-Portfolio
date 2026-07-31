import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Server, 
  Cpu, 
  Lock, 
  Layout, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Activity, 
  TrendingUp,
  Check
} from 'lucide-react';

export const InfrastructureMap: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const steps = [
    {
      number: '01',
      title: 'Domain & DNS Setup',
      desc: 'The foundation of your online presence and multi-vendor catalog.',
      icon: Globe,
      centerTitle: 'Domain Registered',
      centerSubtitle: 'yourdomain.com',
      status: 'Active',
      statusColor: 'text-emerald-400',
    },
    {
      number: '02',
      title: 'Full Stack API & Redis',
      desc: 'Node.js backend with Redis caching reducing latency by 90% (500ms → 50ms).',
      icon: Server,
      centerTitle: 'A Record & Redis',
      centerSubtitle: '@ → 203.0.113.10 (50ms)',
      status: 'Resolved',
      statusColor: 'text-emerald-400',
    },
    {
      number: '03',
      title: 'n8n Automation Engine',
      desc: 'Automates lead sync, WhatsApp WebJS bot (200+ msgs/day), and CRM pipelines.',
      icon: Cpu,
      centerTitle: 'CNAME Automation',
      centerSubtitle: 'bot → whatsapp.n8n.workflow',
      status: 'Active',
      statusColor: 'text-emerald-400',
    },
    {
      number: '04',
      title: 'SSL & Role Security',
      desc: 'JWT authentication, role-based access, GST & Drug License verification.',
      icon: Lock,
      centerTitle: 'SSL & Security',
      centerSubtitle: 'Encrypted Connections',
      status: 'Active',
      statusColor: 'text-emerald-400',
    },
  ];

  // SEQUENTIAL STEP-BY-STEP STEPPER LOOP (0 -> 1 -> 2 -> 3 -> 4 -> repeat)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5); // 5 steps including final website delivered node
    }, 2200);

    return () => clearInterval(interval);
  }, [isHovered]);

  const currentStepData = steps[Math.min(activeStep, steps.length - 1)];

  return (
    <div className="w-full bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden select-none">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Top Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-7 space-y-3">
            <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              SEQUENTIAL PIPELINE ANIMATION (STEP-BY-STEP)
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white leading-tight">
              From Domain<br />to Deployed
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed font-normal">
              How Sagar connects your business idea to live production through DNS routing, high-speed APIs, and automated n8n protocols.
            </p>

            {/* LIVE STEP TRACKER HEADER BADGE */}
            <div className="pt-2 flex items-center gap-3">
              <div className="px-4 py-2 rounded-full bg-[#0c0c10] border border-red-500/40 text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(225,29,72,0.2)]">
                <span className="text-red-400 font-bold">
                  {activeStep < 4 ? `STEP 0${activeStep + 1} / 04` : 'FINAL STEP'}
                </span>
                <span className="text-zinc-600">|</span>
                <span className="text-white font-medium">
                  {activeStep < 4 ? currentStepData.centerTitle : 'DEPLOYED TO LIVE WEBSITE'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Status Glassmorphism Card */}
          <div className="md:col-span-5 p-6 rounded-3xl bg-[#0c0c10]/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(225,29,72,0.2)]">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-heading font-bold text-white">yourdomain.com</h4>
                <p className="text-[11px] font-mono text-zinc-400">Registered & Protected</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${activeStep >= 0 ? 'text-emerald-400' : 'text-zinc-600'}`} />
                <span className={activeStep >= 0 ? 'text-white' : 'text-zinc-500'}>Domain Registered & Configured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${activeStep >= 1 ? 'text-emerald-400' : 'text-zinc-600'}`} />
                <span className={activeStep >= 1 ? 'text-white' : 'text-zinc-500'}>Redis API Latency Optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${activeStep >= 2 ? 'text-emerald-400' : 'text-zinc-600'}`} />
                <span className={activeStep >= 2 ? 'text-white' : 'text-zinc-500'}>Propagation Global & n8n Active</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${activeStep >= 3 ? 'text-emerald-400' : 'text-zinc-600'}`} />
                <span className={activeStep >= 3 ? 'text-white' : 'text-zinc-500'}>Connection Established</span>
              </div>
            </div>
          </div>

        </div>

        {/* Step-By-Step Interactive Flowchart Pipeline */}
        <div 
          className="relative py-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Central Vertical Timeline Track Wire */}
          <div className="absolute left-1/2 top-10 bottom-24 w-1.5 bg-zinc-800 -translate-x-1/2 rounded-full hidden md:block overflow-hidden">
            {/* Glowing Laser Progress Fill */}
            <div 
              className="w-full bg-gradient-to-b from-red-600 via-rose-500 to-orange-400 shadow-[0_0_20px_rgba(225,29,72,0.9)] rounded-full transition-all duration-700 ease-out"
              style={{
                height: `${((activeStep + 1) / 5) * 100}%`,
              }}
            />
          </div>

          {/* TRAVELING SIGNAL DATA PACKET DOT (FLOWS STEP BY STEP) */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 shadow-[0_0_20px_rgba(239,68,68,1)] border-2 border-white z-30 transition-all duration-700 ease-out hidden md:block"
            style={{
              top: `${10 + activeStep * 22}%`,
            }}
          />

          <div className="space-y-16">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;
              const isActive = activeStep === idx;
              const isCompleted = activeStep > idx;

              return (
                <div 
                  key={step.number}
                  className={`relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center transition-all duration-500 ${
                    isActive ? 'scale-105 z-20' : 'opacity-85'
                  }`}
                  onMouseEnter={() => setActiveStep(idx)}
                >
                  
                  {/* Left Side Label (Odd index on Desktop) with Slide Animation */}
                  <div 
                    className={`md:col-span-4 ${
                      isEven ? 'md:text-right md:pr-4' : 'md:order-3 md:text-left md:pl-4'
                    } space-y-1 transition-transform duration-500 ${
                      isActive ? (isEven ? 'translate-x-2' : '-translate-x-2') : ''
                    }`}
                  >
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold">
                      <span className={isActive ? 'text-red-400 font-extrabold' : isCompleted ? 'text-emerald-400' : 'text-zinc-500'}>
                        {step.number} •
                      </span>
                      <span className={isActive ? 'text-white' : isCompleted ? 'text-zinc-200' : 'text-zinc-400'}>
                        {step.title}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed max-w-xs inline-block font-light">
                      {step.desc}
                    </p>
                  </div>

                  {/* Center Node Glassmorphism Box with Slide & Neon Glow */}
                  <div className="md:col-span-4 md:order-2 flex justify-center">
                    <div className={`w-full max-w-sm p-5 rounded-3xl backdrop-blur-xl transition-all duration-500 shadow-2xl flex items-center gap-4 cursor-pointer relative ${
                      isActive 
                        ? 'bg-[#141422]/95 border-2 border-red-500 shadow-[0_0_35px_rgba(225,29,72,0.5)] scale-105' 
                        : isCompleted
                        ? 'bg-[#0a120c]/90 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : 'bg-[#0c0c10]/80 border border-white/10 hover:border-white/20'
                    }`}>
                      
                      {/* Node Icon */}
                      <div className={`p-3.5 rounded-2xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-red-500/25 border border-red-500/60 text-white shadow-[0_0_20px_rgba(225,29,72,0.6)]' 
                          : isCompleted
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                          : 'bg-white/5 border border-white/10 text-zinc-400'
                      }`}>
                        {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-heading font-bold text-white">{step.centerTitle}</h4>
                        <p className="text-[11px] font-mono text-zinc-400">{step.centerSubtitle}</p>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono pt-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? 'bg-red-500 animate-ping' : isCompleted ? 'bg-emerald-400' : 'bg-zinc-600'
                          }`} />
                          <span className={isCompleted ? 'text-emerald-400 font-bold' : step.statusColor}>
                            {isCompleted ? 'Completed' : step.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side Spacer */}
                  <div className={`hidden md:block md:col-span-4 ${isEven ? 'md:order-3' : 'md:order-1'}`} />

                </div>
              );
            })}
          </div>

          {/* Final Terminal Node: Your Website Delivered */}
          <div className="mt-16 flex flex-col items-center justify-center text-center space-y-3">
            <div className={`relative p-5 rounded-full text-white shadow-2xl transition-all duration-500 cursor-pointer ${
              activeStep === 4 
                ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-emerald-500/60 ring-8 ring-emerald-500/30 scale-125' 
                : 'bg-gradient-to-br from-red-600 to-orange-500 shadow-red-500/50 ring-4 ring-red-500/30'
            }`}>
              <Layout className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-heading font-extrabold text-white">Your Website</h3>
              <p className="text-xs font-mono text-red-400">Delivered Securely & Scalable</p>
            </div>
          </div>

        </div>

        {/* Bottom 4 Feature Cards with Glassmorphism */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-white/10 pt-10">
          
          <div className="p-5 rounded-2xl bg-[#0c0c10]/80 border border-white/10 backdrop-blur-md space-y-2 hover:border-red-500/40 transition-colors">
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4" /> Secure
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              End-to-end encryption, JWT authentication, and GST compliance protect users and data.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c0c10]/80 border border-white/10 backdrop-blur-md space-y-2 hover:border-red-500/40 transition-colors">
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold">
              <Zap className="w-4 h-4" /> Fast
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              Optimized Redis caching ensures 90% latency speedup and quick global delivery.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c0c10]/80 border border-white/10 backdrop-blur-md space-y-2 hover:border-red-500/40 transition-colors">
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold">
              <Activity className="w-4 h-4" /> Reliable
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              10+ automated n8n workflows and WebJS WhatsApp bots ensuring 99.9% uptime.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c0c10]/80 border border-white/10 backdrop-blur-md space-y-2 hover:border-red-500/40 transition-colors">
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold">
              <TrendingUp className="w-4 h-4" /> Scalable
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              Built to grow effortlessly with your traffic, multi-vendor networks & business needs.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default InfrastructureMap;
