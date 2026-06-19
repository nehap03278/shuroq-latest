// Constants - Contact Info
export const WA_NUM = "918983140094";
export const LINKEDIN_URL = "https://www.linkedin.com/company/shuroq/";
export const INSTAGRAM_URL = "https://www.instagram.com/shuroq_technologies?igsh=MjRzbDF4NWNnZGtl";

// Navigation links
export const NAV_LINKS = ["Home", "About", "Services", "Technologies", "Portfolio"];

// Slides data
export const SLIDES = [
  { title: "AI Application Development", sub: "LLM-powered automation, intelligent dashboards & recommendation engines.", icon: "ai", grad: "linear-gradient(135deg,#EAF3FF 0%,#F4F9FF 100%)", accent: "#3B82C4" },
  { title: "Android App Development", sub: "Native & cross-platform apps engineered for performance and delight.", icon: "mobile", grad: "linear-gradient(135deg,#EDFDF5 0%,#F4FDF9 100%)", accent: "#10B981" },
  { title: "iOS App Development", sub: "Premium iOS experiences crafted to Apple's exacting standards.", icon: "https://cdn.simpleicons.org/apple/EF4444", grad: "linear-gradient(135deg,#FFF1F1 0%,#FFF7F7 100%)", accent: "#EF4444" },
  { title: "DevOps Services", sub: "CI/CD pipelines, Kubernetes orchestration & cloud infrastructure ops.", icon: "cloud", grad: "linear-gradient(135deg,#F5F2FF 0%,#FAF8FF 100%)", accent: "#7C3AED" },
  { title: "Web Application Development", sub: "Scalable full-stack platforms with modern React & cloud-native architecture.", icon: "globe", grad: "linear-gradient(135deg,#FFFAED 0%,#FFFDF5 100%)", accent: "#F5A623" },
  { title: "E-Commerce Development", sub: "High-converting storefronts with smart discovery & seamless checkout.", icon: "shop", grad: "linear-gradient(135deg,#FFF0FB 0%,#FFF7FD 100%)", accent: "#EC4899" },
  { title: "Chatbot Development", sub: "Conversational AI that engages, qualifies and converts at scale.", icon: "chat", grad: "linear-gradient(135deg,#EDFCFA 0%,#F4FDFB 100%)", accent: "#0EA5C9" },
  { title: "Automation Solutions", sub: "Workflow engines & RPA eliminating repetitive work at enterprise scale.", icon: "gear", grad: "linear-gradient(135deg,#F0FFF4 0%,#F7FFF9 100%)", accent: "#10B981" },
];

// Services - Full details
export const SERVICES = [
  {
    icon: "ai", title: "AI Application Development", accent: "#3B82C4",
    desc: "Custom LLM-powered apps, computer vision, and predictive systems built for real business impact.",
    detail: {
      overview: "We design and build AI-native applications that embed intelligence into every layer of the product — from intelligent data pipelines and ML model serving to autonomous agents and AI dashboards.",
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "LangChain", "FastAPI", "AWS SageMaker", "Docker"],
      useCases: ["Intelligent document processing systems", "AI-powered recommendation engines", "Predictive analytics dashboards", "Computer vision inspection tools"],
      projects: [{ name: "InsightOS", desc: "Enterprise NLP analytics — 70% reduction in manual reporting time" }, { name: "VisionQA", desc: "Defect detection system with 99.2% accuracy for manufacturing client" }],
      benefits: ["Automate repetitive cognitive tasks", "Reduce operational costs by 40-70%", "Make data-driven decisions in real time", "Scale intelligence across your organisation"],
      approach: "Discovery → Data audit → Model selection → MVP → Iterative improvement → Production deployment"
    }
  },
  {
    icon: "mobile", title: "Android App Development", accent: "#10B981",
    desc: "Native and cross-platform Android apps engineered for performance and seamless UX.",
    detail: {
      overview: "We build high-performance Android applications using both native Kotlin and cross-platform Flutter — delivering enterprise-grade features, beautiful UIs, and rock-solid stability.",
      technologies: ["Kotlin", "Flutter", "Jetpack Compose", "Firebase", "Retrofit", "Room DB", "Google Play", "CI/CD"],
      useCases: ["Consumer-facing commerce apps", "Field workforce management apps", "Healthcare patient portals", "Real-time logistics tracking"],
      projects: [{ name: "PulseTrack", desc: "Health & fitness app — 4.8★ on Play Store, 100K+ installs" }, { name: "FieldOps", desc: "Offline-first field management app for 500+ enterprise users" }],
      benefits: ["60% faster delivery with Flutter", "Offline-capable architecture", "Secure biometric authentication", "Seamless Google ecosystem integration"],
      approach: "UX wireframing → Architecture design → Sprint-based development → QA → Play Store launch"
    }
  },
  {
    icon: "https://cdn.simpleicons.org/apple/EF4444", title: "iOS App Development", accent: "#EF4444",
    desc: "Premium iOS applications crafted to Apple's exacting design and engineering standards.",
    detail: {
      overview: "Our iOS team builds Swift-native and Flutter cross-platform applications that feel right at home on Apple devices — following Human Interface Guidelines and App Store best practices.",
      technologies: ["Swift", "SwiftUI", "Flutter", "Xcode", "Core Data", "CloudKit", "ARKit", "App Store Connect"],
      useCases: ["Premium consumer lifestyle apps", "Enterprise B2B tools", "AR-enabled shopping experiences", "Healthcare & wellness platforms"],
      projects: [{ name: "LuxeShop iOS", desc: "Fashion app with AR try-on — 4.9★ App Store rating" }, { name: "MedFlow", desc: "Patient management app — HIPAA-compliant, launched to 200+ clinics" }],
      benefits: ["Native performance & feel", "Deep Apple ecosystem integration", "Strict privacy & security standards", "Optimised for all iOS device sizes"],
      approach: "Design system creation → Swift development → TestFlight beta → App Store submission"
    }
  },
  {
    icon: "globe", title: "Web Application Development", accent: "#3B82C4",
    desc: "Scalable full-stack platforms with modern React, Node.js, and cloud-native architecture.",
    detail: {
      overview: "From SaaS platforms to enterprise portals, we engineer web applications that handle millions of users — built with component-driven frontends, microservices backends, and cloud-native deployment.",
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS", "Kubernetes"],
      useCases: ["SaaS product dashboards", "Internal enterprise portals", "Multi-tenant platforms", "Real-time collaborative tools"],
      projects: [{ name: "FlowDesk", desc: "No-code workflow SaaS — adopted by 500+ teams globally" }, { name: "PortalX", desc: "Enterprise HR portal handling 10K daily active users" }],
      benefits: ["Sub-second page loads", "99.9% uptime SLA", "Horizontal scalability", "SEO-optimised architecture"],
      approach: "Architecture blueprint → API design → Frontend + backend sprints → Load testing → Deployment"
    }
  },
  {
    icon: "lightning", title: "Static Website Development", accent: "#F5A623",
    desc: "Lightning-fast, SEO-optimised sites with conversion-focused design and zero bloat.",
    detail: {
      overview: "We build performance-first static websites using modern SSG frameworks — delivering perfect Lighthouse scores, outstanding Core Web Vitals, and conversion-optimised design.",
      technologies: ["Next.js", "Gatsby", "Astro", "TailwindCSS", "Contentful", "Netlify", "Vercel", "Cloudflare CDN"],
      useCases: ["Corporate landing pages", "Product marketing sites", "Portfolio & personal brands", "Documentation sites"],
      projects: [{ name: "NovaBuild.com", desc: "Corporate site — 100/100 Lighthouse, 3x lead improvement" }, { name: "Doctify Landing", desc: "Medical SaaS landing page — 28% conversion rate" }],
      benefits: ["100/100 Google PageSpeed", "Zero server maintenance", "Global CDN delivery", "Superior SEO rankings"],
      approach: "Design system → Content strategy → Development → CMS setup → SEO audit → Launch"
    }
  },
  {
    icon: "chat", title: "Chatbot Development", accent: "#0EA5C9",
    desc: "Conversational AI that engages, qualifies, and converts users at scale.",
    detail: {
      overview: "We build intelligent chatbots and virtual assistants powered by LLMs — from simple FAQ bots to fully contextual AI agents that integrate with your CRM, calendar, and support systems.",
      technologies: ["OpenAI GPT-4", "LangChain", "Dialogflow", "WhatsApp API", "Telegram Bot API", "React", "Node.js", "MongoDB"],
      useCases: ["24/7 customer support automation", "Lead qualification bots", "HR onboarding assistants", "E-commerce shopping assistants"],
      projects: [{ name: "SupportBot Pro", desc: "Deflected 60% of support tickets — saved client $40K/month" }, { name: "LeadQual AI", desc: "Increased qualified leads by 3x for real estate platform" }],
      benefits: ["24/7 instant customer response", "3x more qualified leads", "Integrate with WhatsApp, Slack, Web", "Continuous learning & improvement"],
      approach: "Use-case mapping → Conversation design → Bot training → Integration → Analytics setup"
    }
  },
  {
    icon: "shop", title: "E-Commerce Development", accent: "#EC4899",
    desc: "High-converting storefronts with smart product discovery and seamless checkout flows.",
    detail: {
      overview: "We engineer e-commerce platforms — from custom-built solutions to Shopify/WooCommerce customisations — with AI-powered recommendation engines, smart search, and frictionless checkout.",
      technologies: ["Next.js", "Shopify", "WooCommerce", "Stripe", "Algolia", "Elasticsearch", "Redis", "AWS"],
      useCases: ["D2C brand storefronts", "B2B wholesale platforms", "Subscription commerce", "Multi-vendor marketplaces"],
      projects: [{ name: "LuxeShop", desc: "Fashion storefront — £2M/month GMV, 4.1% conversion rate" }, { name: "FreshBox", desc: "Subscription grocery — 85% recurring order retention" }],
      benefits: ["AI product recommendations", "Lightning-fast search", "One-click checkout", "Inventory & order automation"],
      approach: "Platform selection → UX design → Payment integration → Performance optimisation → Launch"
    }
  },
  {
    icon: "gear", title: "Automation Solutions", accent: "#10B981",
    desc: "Workflow engines and RPA that eliminate repetitive work at enterprise scale.",
    detail: {
      overview: "We build intelligent automation systems using RPA, APIs, and AI — connecting your tools, automating repetitive processes, and giving your team time to focus on high-value work.",
      technologies: ["Python", "Zapier", "Make (Integromat)", "UiPath", "Power Automate", "Selenium", "REST APIs", "Webhooks"],
      useCases: ["Invoice & document processing", "HR onboarding workflows", "Data sync across CRMs", "Automated reporting pipelines"],
      projects: [{ name: "InvoiceFlow", desc: "Automated AP processing — 90% time saved for finance team" }, { name: "ReportBot", desc: "Daily automated analytics reports across 15 data sources" }],
      benefits: ["80-90% reduction in manual work", "Zero human error on routine tasks", "Real-time cross-system sync", "Scale without headcount"],
      approach: "Process audit → Automation blueprint → Build → Test → Deploy → Monitor & optimise"
    }
  },
  {
    icon: "flask", title: "Software Testing & Integration", accent: "#7C3AED",
    desc: "Unit, integration, E2E, and performance testing for bulletproof software.",
    detail: {
      overview: "We provide comprehensive QA services — from manual exploratory testing to full automated test suites — ensuring your software performs flawlessly under real-world conditions.",
      technologies: ["Jest", "Cypress", "Playwright", "Selenium", "k6", "JMeter", "Postman", "GitHub Actions"],
      useCases: ["Pre-launch regression testing", "API contract testing", "Performance & load testing", "Security penetration testing"],
      projects: [{ name: "FinApp QA", desc: "Caught 140 bugs before launch — zero P0 issues in production" }, { name: "LoadTest Suite", desc: "Stress-tested to 50K concurrent users for fintech client" }],
      benefits: ["Ship with confidence", "Catch bugs before users do", "Automated CI/CD quality gates", "Compliance-ready audit trails"],
      approach: "Test strategy → Framework setup → Automated suite build → CI integration → Ongoing maintenance"
    }
  },
  {
    icon: "server", title: "Enterprise Application Development", accent: "#1B2D4F",
    desc: "Mission-critical enterprise platforms built for security, scale, and compliance.",
    detail: {
      overview: "We architect and build complex enterprise applications — ERP systems, internal platforms, and multi-stakeholder portals — with strict security, role-based access, and audit logging built in.",
      technologies: ["Java Spring Boot", "Node.js", "React", "PostgreSQL", "Azure", "AWS", "Docker", "Kubernetes"],
      useCases: ["ERP and CRM integrations", "Internal HR and finance portals", "Compliance management systems", "Multi-region enterprise SaaS"],
      projects: [{ name: "CorpSuite", desc: "8-module enterprise platform — 2,000 daily users across 3 regions" }, { name: "ComplianceOS", desc: "SOC 2-compliant audit management for financial services firm" }],
      benefits: ["SOC 2 / ISO 27001 alignment", "Enterprise SSO & RBAC", "99.99% uptime architecture", "On-premise or cloud deployment"],
      approach: "Enterprise architecture review → Security design → Phased delivery → UAT → Hypercare support"
    }
  },
  {
    icon: "cloud", title: "DevOps Services", accent: "#6366F1",
    desc: "CI/CD pipelines, Docker, Kubernetes, cloud automation and monitoring solutions.",
    detail: {
      overview: "We set up and optimise your entire DevOps lifecycle — from infrastructure as code and container orchestration to observability stacks and cost-optimised cloud architecture.",
      technologies: ["Kubernetes", "Docker", "Terraform", "GitHub Actions", "ArgoCD", "Prometheus", "Grafana", "AWS/Azure/GCP"],
      useCases: ["CI/CD pipeline setup & optimisation", "Kubernetes cluster management", "Infrastructure as code migration", "Cloud cost optimisation"],
      projects: [{ name: "CloudPilot", desc: "Reduced cloud costs by 38% through right-sizing & automation" }, { name: "ZeroDowntime", desc: "Zero-downtime deployment pipeline for 50-microservice platform" }],
      benefits: ["Deploy 10x faster", "99.9%+ uptime guarantee", "50%+ infrastructure cost savings", "Full observability & alerting"],
      approach: "Infrastructure audit → IaC migration → CI/CD setup → Observability → Ongoing ops support"
    }
  },
];

// Technologies
export const TECHS = [
  { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Flutter", logo: "https://cdn.simpleicons.org/flutter/02569B" },
  { name: "Swift", logo: "https://cdn.simpleicons.org/swift/F05138" },
  { name: "Android", logo: "https://cdn.simpleicons.org/android/3DDC84" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Kubernetes", logo: "https://cdn.simpleicons.org/kubernetes/326CE5" },
  { name: "Terraform", logo: "https://cdn.simpleicons.org/terraform/7B42BC" },
  { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Firebase", logo: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/336791" },
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "GraphQL", logo: "https://cdn.simpleicons.org/graphql/E10098" },
  { name: "Grafana", logo: "https://cdn.simpleicons.org/grafana/F46800" },
];

// Portfolio
export const PORTFOLIO = [
  { cat: "AI Platform", title: "InsightOS", desc: "Enterprise analytics with natural-language querying and live data pipelines.", accent: "#3B82C4", icon: "analytics" },
  { cat: "Mobile App", title: "PulseTrack", desc: "Cross-platform health & fitness app with AI coaching and biometric sync.", accent: "#0EA5C9", icon: "mobile" },
  { cat: "E-Commerce", title: "LuxeShop", desc: "Premium fashion storefront with AR try-on and smart personalisation engine.", accent: "#EC4899", icon: "shop" },
  { cat: "SaaS Platform", title: "FlowDesk", desc: "No-code workflow automation SaaS deployed by 500+ teams worldwide.", accent: "#10B981", icon: "gear" },
  { cat: "DevOps", title: "CloudPilot", desc: "Kubernetes cost-optimisation and observability platform for cloud-native teams.", accent: "#7C3AED", icon: "cloud" },
  { cat: "Web App", title: "PortalX", desc: "Enterprise HR portal handling 10,000 daily active users across 5 countries.", accent: "#F5A623", icon: "globe" },
];

// Testimonials
export const TESTIMONIALS = [
  { name: "Aisha Rahman", role: "CTO, FinSpark", text: "Shuroq delivered an AI integration that cut our processing time by 70%. Their engineering culture is genuinely world-class.", initials: "AR" },
  { name: "Marcus Chen", role: "Founder, NovaBuild", text: "The web platform went live in 8 weeks and now processes $2M monthly. Incredible velocity without sacrificing quality.", initials: "MC" },
  { name: "Sarah Okonkwo", role: "VP Product, MedFlow", text: "From design to deployment, every detail was handled with precision. Our iOS app launched with a 4.9★ App Store rating.", initials: "SO" },
];

// Why Us Points
export const WHY_POINTS = [
  { icon: "ai", title: "AI-Driven Development", pct: 95, desc: "Intelligence baked into every layer" },
  { icon: "lightning", title: "Fast Delivery", pct: 90, desc: "From concept to production in weeks" },
  { icon: "layers", title: "Scalable Architecture", pct: 98, desc: "Built to grow without friction" },
  { icon: "lightbulb", title: "Innovation Focus", pct: 93, desc: "Ahead of the technology curve" },
  { icon: "dollar", title: "Startup-Friendly Pricing", pct: 88, desc: "Enterprise quality, accessible rates" },
  { icon: "lock", title: "Enterprise Security", pct: 97, desc: "SOC-grade standards as a baseline" },
];

// Support Options
export const SUPPORT_OPTIONS = [
  { label: "Sales Support", icon: "briefcase", accent: "#3B82C4", route: "sales@shuroq.com", tag: "Sales" },
  { label: "HR Enquiries", icon: "users", accent: "#10B981", route: "hr-team@shuroq.com", tag: "HR" },
  { label: "Project Consultation", icon: "rocket", accent: "#F5A623", route: "contact@shuroq.com", tag: "Project" },
  { label: "Website Development", icon: "globe", accent: "#0EA5C9", route: "contact@shuroq.com", tag: "Web Dev" },
  { label: "Mobile App Dev", icon: "mobile", accent: "#EC4899", route: "contact@shuroq.com", tag: "Mobile" },
  { label: "Client Support", icon: "headset", accent: "#7C3AED", route: "contact@shuroq.com", tag: "Support" },
];

// Languages
export const LANGS = [
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "it", name: "Italiano", flag: "🇮🇹", dir: "ltr" },
  { code: "ja", name: "日本語", flag: "🇯🇵", dir: "ltr" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳", dir: "ltr" },
  { code: "ml", name: "മലയാളം", flag: "🇮🇳", dir: "ltr" },
  { code: "pt", name: "Português", flag: "🇧🇷", dir: "ltr" },
  { code: "ru", name: "Русский", flag: "🇷🇺", dir: "ltr" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳", dir: "ltr" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳", dir: "ltr" },
  { code: "ur", name: "اردو", flag: "🇵🇰", dir: "rtl" },
  { code: "zh", name: "中文", flag: "🇨🇳", dir: "ltr" },
];
