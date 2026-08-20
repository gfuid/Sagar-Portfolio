export interface WebProject {
  title: string;
  category: string;
  badge?: string;
  tagline: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface MobileApp {
  title: string;
  tech: string;
  description: string;
  features: string[];
}

export interface ClientWebsite {
  name: string;
  type: string;
  tech?: string;
  liveUrl?: string;
}

export interface AutomationWorkflow {
  title: string;
  tagline: string;
  description: string;
  impactBadge?: string;
  features: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-Time' | 'Startup' | 'Internship' | 'Freelance';
  bullets: string[];
  skills: string[];
}

export interface AchievementItem {
  title: string;
  description: string;
  highlight: string;
  category: 'Hackathon' | 'Career' | 'Leadership' | 'Social';
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
}

export const personalInfo = {
  name: "Sagar Punia",
  roleTitle: "AI Systems Engineer | Full Stack Developer | Automation Architect",
  location: "Panipat, Haryana, India",
  phone: "+91-8307967782",
  email: "sagarpunia163@gmail.com",
  linkedin: "https://linkedin.com/in/sagar-punia",
  linkedinDisplay: "linkedin.com/in/sagar-punia",
  github: "https://github.com/gfuid",
  githubDisplay: "github.com/gfuid",
  about: "BCA student with 1.5+ years of real-world experience across multi-agent AI systems, full-stack web applications, mobile apps, and enterprise automation. Built autonomous multi-agent pipelines with LangGraph & LangChain, 15+ production websites, 3 mobile apps, and 10+ n8n workflows. Lead Developer at Binary Boss.",
  summaryStats: [
    { value: "1.5+", label: "Years Experience" },
    { value: "4-Stage", label: "Multi-Agent AI Engine" },
    { value: "15+", label: "Production Websites" },
    { value: "3", label: "Mobile Apps Built" },
    { value: "10+", label: "n8n Workflows Active" },
    { value: "150+", label: "Gyms Powered on SaaS" }
  ],
  skills: {
    aiAndAgents: ["LangChain", "LangGraph", "Python", "RAG (Retrieval-Augmented Gen)", "MCP (Model Context Protocol)", "Multi-Agent Systems", "FastAPI (SSE)", "OpenAI & Groq API", "Tavily Search API", "LCEL Pipelines", "Prompt Engineering"],
    frontend: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3", "JavaScript (ES6+)"],
    backend: ["Node.js", "Express.js", "Python", "FastAPI", "REST APIs", "Redis Caching", "JWT Auth", "Role-Based Access"],
    database: ["MongoDB", "Firebase", "Schema Optimization"],
    mobile: ["React Native", "Mobile UI/UX"],
    automation: ["n8n Workflows", "WebJS WhatsApp Bot", "Python Scraping", "BeautifulSoup", "Selenium", "CRM Sync"],
    marketingAndDesign: ["SEO Optimization", "Google Ads", "IndiaMART / B2B Portals", "Canva", "CapCut", "Filmora", "VN Editor"],
    devopsAndTools: ["Git & GitHub", "Docker", "CI/CD Deployment", "Postman", "Linux", "VS Code"]
  }
};

export const experiences: ExperienceItem[] = [
  {
    role: "Full Stack & Web Developer",
    company: "Visawebs",
    location: "Panipat / Ireland (Remote)",
    period: "2026 – Present",
    type: "Full-Time",
    bullets: [
      "Developing and maintaining international education abroad, work permit & Irish immigration portals for global students and professionals.",
      "Building responsive lead capture intake workflows, university search portals, and CRM automation pipelines connecting 500+ university partners.",
      "Optimizing web performance, SEO engine structure, and automated consultation booking systems."
    ],
    skills: ["React.js", "Node.js", "Python", "Automation", "SEO Engine", "CRM Sync"]
  },
  {
    role: "Full Stack Developer",
    company: "Trireme Life Science",
    location: "Panipat",
    period: "2026 – Present",
    type: "Full-Time",
    bullets: [
      "Built scalable B2B pharma platforms with admin dashboards for multi-vendor management.",
      "Implemented Redis caching reducing API latency (from 500ms to 50ms) and built JWT + Role-Based Authentication systems.",
      "Optimized MongoDB schemas for high-traffic product catalogs and marketplace integrations."
    ],
    skills: ["React.js", "Node.js", "MongoDB", "Redis", "JWT", "B2B Architecture"]
  },
  {
    role: "Web Developer",
    company: "InnovationSoch (Startup)",
    location: "Remote / Onsite",
    period: "Jan 2025",
    type: "Startup",
    bullets: [
      "Built production-ready web applications end-to-end: UI/UX, backend, hosting, deployment.",
      "Developed SEO-optimized UIs with React.js and Tailwind CSS; backend with Node.js, REST APIs, Firebase.",
      "Web scraping and data extraction using Python (BeautifulSoup, Selenium) for automated lead generation."
    ],
    skills: ["React.js", "Tailwind CSS", "Node.js", "Firebase", "Python", "Selenium", "Web Scraping"]
  },
  {
    role: "Web Development Intern",
    company: "CodeQuotient",
    location: "Onsite",
    period: "2025 (45 Days)",
    type: "Internship",
    bullets: [
      "Developed React SPA features and resolved critical backend API bugs.",
      "Followed standard Git workflow, collaborative code reviews, and CI/CD deployment processes."
    ],
    skills: ["React.js", "REST API Debugging", "Git Workflow", "CI/CD", "Code Review"]
  },
  {
    role: "Social Media Manager",
    company: "Travel Trade (Freelance)",
    location: "Freelance",
    period: "2025 (6 Months)",
    type: "Freelance",
    bullets: [
      "Managed social media accounts and created engagement-focused content strategies.",
      "Generated qualified leads through digital marketing campaigns and daily content posting.",
      "Leveraged visual editing tools: Canva, CapCut, Filmora, VN Editor for video content creation."
    ],
    skills: ["Digital Marketing", "Lead Generation", "Canva", "CapCut", "Video Editing", "Content Strategy"]
  }
];

export const webProjects: WebProject[] = [
  {
    title: "Autonomous Multi-Agent AI Research System",
    category: "AI & Multi-Agent Systems",
    badge: "Flagship AI Project",
    tagline: "4-step collaborative research engine combining autonomous ReAct agents, deep web scraping, and rubric-based QA evaluation.",
    highlights: [
      "Step 1 Search Agent: Discovers recent, authoritative web sources using Tavily Search API with dynamic query decomposition.",
      "Step 2 Reader Agent: Autonomously selects optimal sources and deep-scrapes high-density article content via BeautifulSoup.",
      "Step 3 Writer Pipeline: Deterministic LCEL / Runnable chain synthesizes findings into structured, cited executive reports.",
      "Step 4 Critic Pipeline: Automated rubric grading evaluating report completeness, factuality, depth, and revision feedback.",
      "Full-stack architecture with FastAPI backend (SSE streaming) and React + Vite glassmorphic studio interface."
    ],
    metrics: [
      { label: "Architecture", value: "4-Agent Pipeline" },
      { label: "Evaluation", value: "Critic QA Rubric" },
      { label: "Data Sourcing", value: "Tavily + Scraper" },
      { label: "Streaming", value: "FastAPI SSE" }
    ],
    tech: ["Python", "LangChain", "LangGraph", "FastAPI", "React.js", "OpenAI / Groq", "Tavily API", "BeautifulSoup", "LCEL"],
    liveUrl: "https://lnkd.in/gN4fw5gm",
    githubUrl: "https://lnkd.in/gzAHtRCH",
    featured: true
  },
  {
    title: "GymFlow — SaaS Gym Management Platform",
    category: "SaaS & Web App",
    badge: "2 Live Deployments",
    tagline: "Full SaaS platform powering 150+ gyms, 7,500+ members, and 50L+ in processed transactions.",
    highlights: [
      "Features: Member CRUD, CSV import/export, QR attendance tracking, E-commerce store, Admin dashboard.",
      "90% faster API performance (500ms → 50ms latency) achieved through Redis caching implementation.",
      "70% database storage reduction (90MB → 25MB) through schema & index optimization.",
      "Custom WhatsApp integration saving ₹50,000/year in SMS costs with 99.9% uptime and 2000+ concurrent user stability."
    ],
    metrics: [
      { label: "Gyms Onboarded", value: "150+" },
      { label: "Active Members", value: "7,500+" },
      { label: "Transactions", value: "₹50L+" },
      { label: "API Speedup", value: "90% Faster" }
    ],
    tech: ["React.js", "Node.js", "Redis", "MongoDB", "QR Code Engine", "Custom WhatsApp API"],
    featured: true
  },
  {
    title: "TRIREME — Multi-Vendor B2B Pharma Marketplace",
    category: "B2B E-Commerce",
    badge: "2 Live Deployments",
    tagline: "High-scale B2B marketplace for pharma distributors with compliance verification & custom online storefronts.",
    highlights: [
      "B2B platform for pharma distributors featuring automated online store creation and compliance onboarding (Drug License & GST validation).",
      "Comprehensive Admin Dashboard equipped with vendor approval workflows, platform analytics, and bulk product management.",
      "Role-based access control for multi-tier vendor permission levels."
    ],
    metrics: [
      { label: "Platform Type", value: "B2B Marketplace" },
      { label: "Compliance", value: "Drug License & GST" }
    ],
    tech: ["React.js", "Node.js", "Express", "MongoDB", "JWT Auth", "Tailwind CSS"],
    featured: true
  }
];

export const clientWebsites: ClientWebsite[] = [
  { name: "Veda Group", type: "Corporate / Business Group Portal", tech: "React + Tailwind", liveUrl: "https://www.vedagroup.co.in/" },
  { name: "Vedomin Life Sciences", type: "Pharma Business Website", tech: "React + Tailwind", liveUrl: "https://vedominelifesciences.com/" },
  { name: "Trireme Group", type: "Pharma B2B Platform", tech: "Full Stack", liveUrl: "https://triremegroup.in/" },
  { name: "Holistic Jeevandhara Foundation", type: "NGO / Foundation Portal", tech: "React.js", liveUrl: "https://holisticjeevandharafoundation.in/" },
  { name: "Saksham Apple Veda", type: "Ayurvedic Business Site", tech: "React + Tailwind", liveUrl: "https://sakshamappleveda.com/" },
  { name: "Digital PharmaPreneur", type: "Digital Learning Platform", tech: "React.js", liveUrl: "https://digitalpharmapreneur.com/" },
  { name: "Design Houzz", type: "Interior Design Showcase", tech: "Next.js + TypeScript", liveUrl: "https://designhouzz23.com/" },
  { name: "Travel Trade", type: "Media & Growth Platform", tech: "Web & Growth", liveUrl: "https://travel-trade.co.in/" },
  { name: "InnovationSoch", type: "Full Stack Startup", tech: "React + Node + Python", liveUrl: "https://innovationsoch.com/" },
  { name: "Agil Exports", type: "Global Export Business", tech: "Web Dev & UI", liveUrl: "https://agileexports.com/" },
  { name: "Supplix", type: "Business Solutions Platform", tech: "React.js" }
];

export const mobileApps: MobileApp[] = [
  {
    title: "Gym Management App",
    tech: "React Native",
    description: "Complete mobile application built for gym owners to manage memberships and track real-time revenue on the go.",
    features: [
      "Member management & subscription tracking",
      "QR-based instant attendance scanner",
      "Real-time revenue & payment reminder alerts"
    ]
  },
  {
    title: "Expense Tracker App",
    tech: "React Native",
    description: "Personal finance management mobile application providing category-wise spending insights and visual analytics.",
    features: [
      "Add/delete expense logs with customizable categories",
      "Monthly spending summaries & budget tracking",
      "Visual charts and graphs for spending breakdown"
    ]
  },
  {
    title: "Worldwide Weather Checker App",
    tech: "React Native",
    description: "Real-time global weather tracking app utilizing live weather API data for instant climate forecasts.",
    features: [
      "Search any city globally with auto-suggestions",
      "Displays real-time temperature, humidity, & wind speed",
      "7-day detailed weather forecasting UI"
    ]
  }
];

export const automationWorkflows: AutomationWorkflow[] = [
  {
    title: "Lead Generation Automation Pipeline",
    tagline: "Web Form → Database → Instant Alert Dispatch",
    description: "Automated capture system that collects lead submissions from web forms, validates & parses payload, stores in database, and immediately fires WhatsApp + email notifications to sales reps.",
    impactBadge: "Instant Response Rate",
    features: [
      "Webhook integration with custom web forms",
      "Automated payload validation & DB record creation",
      "Instant WhatsApp & Email alert triggers"
    ]
  },
  {
    title: "Marketing Automation Pipeline",
    tagline: "Multi-Step Lead Nurturing & Follow-up",
    description: "Orchestrated n8n pipeline that handles multi-tier email/message drip sequences based on user actions, dramatically eliminating manual follow-up overhead.",
    impactBadge: "80% Reduction in Manual Work",
    features: [
      "Behavioral event tracking & sequence branching",
      "Scheduled follow-up reminders & email drip triggers",
      "Saved 80% of manual follow-up time"
    ]
  },
  {
    title: "WhatsApp Auto-Reply System (WebJS)",
    tagline: "Custom Open-Source WhatsApp Bot Engine",
    description: "Built a zero-cost custom WebJS-based WhatsApp auto-responder capable of handling customer FAQs, keyword matching, and automated routing.",
    impactBadge: "200+ Messages/Day @ ₹0 API Cost",
    features: [
      "Handles 200+ customer messages daily seamlessly",
      "Zero recurring API subscription cost (WebJS library)",
      "Keyword matching & interactive auto-responses"
    ]
  },
  {
    title: "CRM Sync Workflow",
    tagline: "Google Sheets ↔ WhatsApp ↔ Email Platform",
    description: "Real-time bi-directional data synchronizer ensuring all customer interaction logs across Google Sheets, WhatsApp, and email platforms stay updated.",
    impactBadge: "100% Data Synchronization",
    features: [
      "Automated Google Sheets row read/write",
      "Real-time status updates across messaging platforms",
      "Error handling & failure alert retries"
    ]
  }
];

export const digitalMarketingAndB2B = {
  marketing: [
    {
      title: "Social Media Management",
      details: "Managed 3 active accounts (Travel Trade + 2 client businesses). Planned content calendars, daily strategic posting, and community engagement tracking."
    },
    {
      title: "AI-Powered Content Creation",
      details: "Leveraged generative AI tools for high-converting caption generation, trend-driven hashtag strategies, and innovative post ideation."
    },
    {
      title: "Video Editing & Production",
      details: "Hands-on expertise in CapCut, Filmora, and VN Editor to produce high-engagement Instagram Reels, promotional brand videos, and before/after showcases."
    },
    {
      title: "Graphic & Ad Design",
      details: "Utilized Canva for crafting social media graphics, posters, banners, and digital ad creative assets."
    }
  ],
  b2bMarketplaces: {
    platforms: ["IndiaMART", "TradeIndia", "ExportIndia"],
    capabilities: [
      "Full product lifecycle & catalog management (CRUD operations).",
      "Product listing optimization to boost search rank & inquiry volume.",
      "Lead generation & keyword strategy for maximum business visibility.",
      "Inquiry-to-conversion analytics and performance monitoring."
    ]
  }
};

export const managementLeadership = [
  {
    title: "College Farewell Management Lead",
    description: "Led the organizing committee for the college farewell event, handling venue arrangements, budget allocation, event scheduling, and cross-team coordination."
  },
  {
    title: "Festival & Event Management",
    description: "Organized multiple college cultural festivals and technical events, fostering team collaboration and smooth execution."
  },
  {
    title: "Group Travel Planning & Execution",
    description: "Successfully planned and executed group trips to Mumbai, Kashmir, and other destinations — managing budget, itineraries, and accommodation logistics."
  }
];

export const achievements: AchievementItem[] = [
  {
    title: "Hackathon Lead — 10-Hour Full MVP",
    highlight: "Fastest MVP Execution",
    description: "Led team to build a complete full-stack e-commerce platform (frontend + backend + database) in just 10 hours during a high-stakes hackathon.",
    category: "Hackathon"
  },
  {
    title: "Early Career Breakthrough",
    highlight: "2 Internships in 2nd Year",
    description: "Cracked 2 competitive developer internships (CodeQuotient & InnovationSoch) while still in the 2nd year of BCA.",
    category: "Career"
  },
  {
    title: "Promoted to Lead Developer",
    highlight: "Binary Boss Hackathon",
    description: "Appointed as Lead Developer at Binary Boss following stellar performance in hackathons and technical execution.",
    category: "Leadership"
  },
  {
    title: "LinkedIn Organic Growth",
    highlight: "1K+ Followers & 5-6L Reach",
    description: "Built a personal brand with over 1,000 professional followers and post engagements reaching 5-6 lakh impressions organically.",
    category: "Social"
  }
];

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Arya P.G. College, Kurukshetra University",
    period: "2023 – 2026",
    details: [
      "Relevant Coursework: Data Structures & Algorithms, Web Development, Object-Oriented Programming (OOP), Database Management Systems (DBMS)."
    ]
  },
  {
    degree: "Advanced Diploma in Computer Applications (ADCA)",
    institution: "Accredited Institution",
    period: "Completed",
    details: [
      "Core training in computer software fundamentals, office applications, and programming principles."
    ]
  }
];

export const certifications: CertificationItem[] = [
  { title: "n8n Automation Certification", issuer: "Simplilearn" },
  { title: "Digital Marketing Certification", issuer: "Simplilearn" },
  { title: "Google Ads Certification", issuer: "Simplilearn" },
  { title: "Search Engine Optimization (SEO)", issuer: "Simplilearn" },
  { title: "Project Management Certification", issuer: "Professional Body" }
];
