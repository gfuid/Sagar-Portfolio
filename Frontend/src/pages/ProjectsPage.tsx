import React, { useState } from 'react';
import { 
  FolderGit2, 
  Search, 
  Sparkles, 
  Smartphone, 
  Globe, 
  Layers,
  Monitor,
  Code2,
  Cpu,
  Bot
} from 'lucide-react';
import { clientWebsites } from '../data/portfolioData';
import { ScrollReveal } from '../components/ScrollReveal';

// Import project-specific banner mockups from src/assets/bannerimg/
import multiagentBannerImg from '../assets/bannerimg/multiagent.png';
import triremeBannerImg from '../assets/bannerimg/trireme.png';
import vedagroupBannerImg from '../assets/bannerimg/vedagroup.png';
import vedominBannerImg from '../assets/bannerimg/vedomin.png';
import holisticBannerImg from '../assets/bannerimg/holistic.png';
import sakshamBannerImg from '../assets/bannerimg/saksham.png';
import designbuzzBannerImg from '../assets/bannerimg/desinbuzz.png';
import digitalpharmaBannerImg from '../assets/bannerimg/digitalpharma.png';

interface ShowcaseProject {
  index: string;
  categoryKey: 'AI & Multi-Agent' | 'Frontend Projects' | 'Full Stack & SaaS' | 'Mobile Apps' | 'Automation & n8n' | 'Client Websites';
  title: string;
  role: string;
  roleColor: string;
  frontendStack: string;
  backendStack: string;
  description: string;
  desktopImg: string;
  mobileImg: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { label: 'All', icon: Layers },
    { label: 'AI & Multi-Agent', icon: Bot },
    { label: 'Full Stack & SaaS', icon: Sparkles },
    { label: 'Frontend Projects', icon: Code2 },
    { label: 'Mobile Apps', icon: Smartphone },
    { label: 'Automation & n8n', icon: Cpu },
    { label: 'Client Websites', icon: Globe },
  ];

  // Comprehensive Showcase Projects populated with all Frontend Client sites
  const showcaseProjects: ShowcaseProject[] = [
    // --- AI & MULTI-AGENT SYSTEMS ---
    {
      index: '<01>',
      categoryKey: 'AI & Multi-Agent',
      title: 'Autonomous Multi-Agent AI Research System',
      role: 'AI Systems Architect & Full Stack Dev',
      roleColor: 'text-indigo-400',
      frontendStack: 'React.js, Vite, Tailwind CSS, FastAPI SSE Stream, Multi-Agent Topology UI',
      backendStack: 'Python, LangChain, LangGraph, FastAPI, Tavily Search API, BeautifulSoup, LCEL Runnables',
      description:
        'Decomposed complex technical research into a 4-step autonomous pipeline: 1) Search Agent discovers real-time credible sources via Tavily, 2) Reader Agent executes deep web scraping via BeautifulSoup, 3) Writer Pipeline synthesizes findings into structured executive reports with LCEL, and 4) Critic QA Chain delivers automated rubric evaluation & scoring.',
      desktopImg: multiagentBannerImg,
      mobileImg: multiagentBannerImg,
      liveUrl: 'https://lnkd.in/gN4fw5gm',
      githubUrl: 'https://lnkd.in/gzAHtRCH',
    },

    // --- FULL STACK & SAAS ---
    {
      index: '<02>',
      categoryKey: 'Full Stack & SaaS',
      title: 'GymFlow — SaaS Gym Management Platform',
      role: 'Full Stack Developer',
      roleColor: 'text-emerald-400',
      frontendStack: 'React.js, TypeScript, Tailwind CSS, Vite',
      backendStack: 'Node.js, Express, MongoDB, Redis Caching, Custom WhatsApp API',
      description:
        'Built a high-performance React dashboard powering 150+ gyms and 7,500+ members. Implemented Redis caching reducing API latency by 90% (from 500ms to 50ms) and built a zero-cost WhatsApp automated messaging system that handles over 2,000 daily transaction alerts.',
      desktopImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      mobileImg: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    },
    {
      index: '<03>',
      categoryKey: 'Full Stack & SaaS',
      title: 'TRIREME — Multi-Vendor B2B Pharma Marketplace',
      role: 'Lead Architect & Full Stack Dev',
      roleColor: 'text-red-400',
      frontendStack: 'React.js, JavaScript (ES6+), Tailwind CSS, Context API',
      backendStack: 'Node.js, Express, MongoDB, JWT Authentication, GST & Drug License Validator',
      description:
        'Engineered a scalable B2B marketplace for pharmaceutical distributors enabling multi-tier vendors to launch digital storefronts with automated compliance onboarding (GST & Drug License validation). Built robust role-based access control (RBAC) and vendor approval workflows.',
      desktopImg: triremeBannerImg,
      mobileImg: triremeBannerImg,
      liveUrl: 'https://triremegroup.in/',
    },

    // --- FRONTEND PROJECTS (INCLUDES ALL CLIENT WEBSITES) ---
    {
      index: '<04>',
      categoryKey: 'Frontend Projects',
      title: 'Veda Group — Corporate Business Group Web Platform',
      role: 'Frontend Architect',
      roleColor: 'text-amber-400',
      frontendStack: 'React.js, Tailwind CSS, JavaScript (ES6+)',
      backendStack: 'Vite Production Build, SEO Engine, Mobile Responsive',
      description:
        'Engineered the official corporate web platform for Veda Group (vedagroup.co.in) featuring responsive company showcase, business verticals, strategic initiatives, and lead inquiry routing.',
      desktopImg: vedagroupBannerImg,
      mobileImg: vedagroupBannerImg,
      liveUrl: 'https://www.vedagroup.co.in/',
    },
    {
      index: '<05>',
      categoryKey: 'Frontend Projects',
      title: 'Vedomin Life Sciences — Pharma Web Application',
      role: 'Frontend Web Developer',
      roleColor: 'text-cyan-400',
      frontendStack: 'React.js, Tailwind CSS, JavaScript (ES6+)',
      backendStack: 'Vite Build, REST APIs Integration',
      description:
        'Designed and deployed a responsive pharmaceutical web application for Vedomin Life Sciences featuring interactive product catalogs, fast load times, and custom inquiry web forms.',
      desktopImg: vedominBannerImg,
      mobileImg: vedominBannerImg,
      liveUrl: 'https://vedominelifesciences.com/',
    },
    {
      index: '<06>',
      categoryKey: 'Frontend Projects',
      title: 'Holistic Jeevandhara Foundation — NGO Web Portal',
      role: 'Frontend Developer',
      roleColor: 'text-emerald-400',
      frontendStack: 'React.js, CSS Modules, HTML5, JavaScript',
      backendStack: 'REST API, Webhook Donation Form Integration',
      description:
        'Built an impactful web portal for Holistic Jeevandhara Foundation with donation workflows, program showcases, volunteer registration forms, and social media integration.',
      desktopImg: holisticBannerImg,
      mobileImg: holisticBannerImg,
      liveUrl: 'https://holisticjeevandharafoundation.in/',
    },
    {
      index: '<07>',
      categoryKey: 'Frontend Projects',
      title: 'Saksham Apple Veda — Ayurvedic Business Web App',
      role: 'UI/UX & Frontend Dev',
      roleColor: 'text-rose-400',
      frontendStack: 'React.js, Tailwind CSS, Context API',
      backendStack: 'Vite Static Hosting, SEO Meta Engine',
      description:
        'Crafted an e-commerce-style showcase web app for Saksham Apple Veda highlighting organic Ayurvedic products with smooth product sliders and WhatsApp inquiry routing.',
      desktopImg: sakshamBannerImg,
      mobileImg: sakshamBannerImg,
      liveUrl: 'https://sakshamappleveda.com/',
    },
    {
      index: '<08>',
      categoryKey: 'Frontend Projects',
      title: 'Design Houzz / DesignBuzz — Modern Interior Showcase',
      role: 'Frontend Architect',
      roleColor: 'text-indigo-400',
      frontendStack: 'Next.js 14, TypeScript, Tailwind CSS, Lucide Icons',
      backendStack: 'Vite Build, SEO Image Optimization Engine',
      description:
        'Crafted a modern interior design showcase web portal featuring interactive gallery views, smooth micro-animations, fast image lazy loading, and contact inquiry integration.',
      desktopImg: designbuzzBannerImg,
      mobileImg: designbuzzBannerImg,
      liveUrl: 'https://designhouzz23.com/',
    },
    {
      index: '<09>',
      categoryKey: 'Frontend Projects',
      title: 'Movie Matching AI Recommendation App',
      role: 'Frontend Architect',
      roleColor: 'text-cyan-400',
      frontendStack: 'Next.js, TypeScript, Tailwind CSS, Framer Motion',
      backendStack: 'MongoDB, OpenAI API, TMDB API',
      description:
        'Built an AI-powered movie discovery platform adhering to strict UI performance and SEO standards. Integrated OpenAI API for mood-based recommendation algorithms alongside TMDB API synchronization.',
      desktopImg: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
      mobileImg: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?auto=format&fit=crop&w=600&q=80',
    },
    {
      index: '<10>',
      categoryKey: 'Frontend Projects',
      title: 'Digital PharmaPreneur — Digital Learning Web App',
      role: 'Frontend Developer',
      roleColor: 'text-purple-400',
      frontendStack: 'React.js, Tailwind CSS, HTML5 Video Player',
      backendStack: 'REST API, Course Analytics Engine',
      description:
        'Developed an interactive digital learning platform for pharma professionals featuring video module player, downloadable resources, and enrollment tracking.',
      desktopImg: digitalpharmaBannerImg,
      mobileImg: digitalpharmaBannerImg,
      liveUrl: 'https://digitalpharmapreneur.com/',
    },

    // --- MOBILE APPS ---
    {
      index: '<11>',
      categoryKey: 'Mobile Apps',
      title: 'Gym Management React Native Mobile App',
      role: 'Mobile App Developer',
      roleColor: 'text-emerald-400',
      frontendStack: 'React Native, Expo, NativeWind, TypeScript',
      backendStack: 'Node.js, REST APIs, QR Scanner Engine, Firebase Push Alerts',
      description:
        'Designed and published a cross-platform mobile application for gym owners to track real-time revenue and member check-ins on the go. Integrated instant camera-based QR code scanning for attendance logging.',
      desktopImg: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80',
      mobileImg: 'https://images.unsplash.com/photo-1510519138161-58441d829316?auto=format&fit=crop&w=600&q=80',
    },
    {
      index: '<12>',
      categoryKey: 'Mobile Apps',
      title: 'Expense Tracker & Budget Mobile App',
      role: 'Mobile Developer',
      roleColor: 'text-rose-400',
      frontendStack: 'React Native, Expo, Victory Charts, JavaScript',
      backendStack: 'AsyncStorage, Offline Cache, Firebase Sync',
      description:
        'Personal finance mobile app providing category-wise spending insights, budget alerts, and visual analytics charts to help users manage daily expenses effortlessly.',
      desktopImg: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      mobileImg: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    },

    // --- AUTOMATION & N8N ---
    {
      index: '<13>',
      categoryKey: 'Automation & n8n',
      title: 'n8n WhatsApp WebJS Bot & Lead Automation',
      role: 'Automation Engineer',
      roleColor: 'text-emerald-400',
      frontendStack: 'n8n Workflow Nodes, Webhook Engine',
      backendStack: 'Node.js, WebJS WhatsApp Library, Python Lead Scraper',
      description:
        'Automated lead capture, validation, and instant WhatsApp alerts. Built a zero-cost open-source WhatsApp auto-responder handling 200+ customer messages daily at ₹0 API cost.',
      desktopImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      mobileImg: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const filteredProjects = showcaseProjects.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.categoryKey === selectedCategory;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(query) ||
      p.frontendStack.toLowerCase().includes(query) ||
      p.backendStack.toLowerCase().includes(query) ||
      p.role.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 bg-zinc-950 text-white selection:bg-red-500 selection:text-white font-sans">
      
      {/* Header Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <FolderGit2 className="w-4 h-4" /> Production Portfolio Showcase
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight leading-tight">
              Featured Work & Full-Stack Projects
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Explore my production web platforms, SaaS ecosystems, React Native mobile applications, n8n automations, and client web builds.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Tabs & Search Bar */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-heading font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-500/25 scale-105'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search tech or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-red-500 transition"
            />
          </div>

        </div>
      </section>

      {/* MAIN CATEGORIZED PROJECT SHOWCASE LIST */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => (
            <ScrollReveal
              key={idx}
              direction={idx % 2 === 0 ? 'left' : 'right'}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center p-5 sm:p-12 rounded-2xl sm:rounded-[2.5rem] bg-[#0c0c0e] border border-zinc-800/90 shadow-2xl hover:border-red-500/40 transition-all duration-500"
            >
              {/* LEFT COLUMN: METADATA & DETAILED DESCRIPTION */}
              <div className="lg:col-span-6 space-y-6">
                {/* Index Callout */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-black text-red-500 tracking-wider">
                    {project.index}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border"
                    style={{
                      borderColor: `${project.roleColor}40`,
                      backgroundColor: `${project.roleColor}10`,
                      color: project.roleColor,
                    }}
                  >
                    {project.role}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                    <span className="text-zinc-500 uppercase tracking-widest text-[10px] block">Frontend Architecture</span>
                    <span className="text-zinc-200 font-semibold">{project.frontendStack}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                    <span className="text-zinc-500 uppercase tracking-widest text-[10px] block">Backend & Systems</span>
                    <span className="text-zinc-200 font-semibold">{project.backendStack}</span>
                  </div>
                </div>

                {/* Action Buttons: Live URL & GitHub */}
                {(project.liveUrl || project.githubUrl) && (
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-mono text-xs font-bold hover:scale-105 transition shadow-lg shadow-red-500/25 cursor-pointer"
                      >
                        <span>Live Demo</span>
                        <span className="text-sm">↗</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-zinc-200 hover:text-white hover:border-zinc-500 font-mono text-xs font-bold hover:scale-105 transition shadow-lg cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: DUAL DEVICE MOCKUP SHOWCASE (LAPTOP & MOBILE FRAMES) */}
              <div className="lg:col-span-6 flex flex-col gap-6 items-center">
                {/* Laptop Device Frame */}
                <div className="relative w-full max-w-lg bg-zinc-900 rounded-2xl p-3 border border-zinc-700/60 shadow-2xl group overflow-hidden">
                  <div className="flex items-center gap-1.5 pb-2 px-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                      <Monitor className="w-3 h-3" /> Desktop Web View
                    </span>
                  </div>
                  <div className="relative h-56 sm:h-64 rounded-lg overflow-hidden bg-black">
                    <img
                      src={project.desktopImg}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>
                </div>

                {/* Smartphone Device Frame */}
                <div className="relative w-48 sm:w-56 bg-zinc-900 rounded-[2rem] p-2.5 border-2 border-zinc-700/60 shadow-2xl group overflow-hidden -mt-10 sm:-mt-12 ml-auto">
                  <div className="w-16 h-3 bg-zinc-800 rounded-full mx-auto mb-2" />
                  <div className="relative h-64 sm:h-72 rounded-[1.5rem] overflow-hidden bg-black">
                    <img
                      src={project.mobileImg}
                      alt={`${project.title} Mobile`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))
        ) : (
          <div className="p-12 text-center text-zinc-500 font-mono text-sm">
            No projects found matching category or query.
          </div>
        )}
      </section>

      {/* Additional Client Websites Overview Grid */}
      {(selectedCategory === 'All' || selectedCategory === 'Client Websites') && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-24 space-y-6">
          <h2 className="text-xl font-heading font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
            <Globe className="w-5 h-5" /> Quick Client Web Directory
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientWebsites.map((site, idx) => {
              const Content = (
                <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-between gap-3 hover:border-red-500/50 transition-colors w-full h-full">
                  <div>
                    <h4 className="text-sm font-heading font-bold text-white flex items-center gap-1.5">
                      <span>{site.name}</span>
                      {site.liveUrl && <span className="text-red-400 text-xs">↗</span>}
                    </h4>
                    <p className="text-[11px] font-mono text-zinc-400">{site.type}</p>
                  </div>
                  {site.tech && (
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-emerald-400 shrink-0">
                      {site.tech}
                    </span>
                  )}
                </div>
              );

              return site.liveUrl ? (
                <a
                  key={idx}
                  href={site.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:scale-[1.02] transition-transform"
                >
                  {Content}
                </a>
              ) : (
                <div key={idx}>{Content}</div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
};

export default ProjectsPage;
