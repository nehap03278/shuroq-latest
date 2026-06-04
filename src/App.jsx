import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import awsLogo from "./assets/aws-logo.svg";
import openaiLogo from "./assets/openai-logo.svg";

import heroBg from "./assets/hero-bg.png";
import LOGO from "./assets/logo.png";

// ─── Brand palette ────────────────────────────────────────────────────────────
// BG #F4F7FC | Card #FFFFFF | Navy #1B2D4F | Sky #3B82C4
// LightBlue #E8F0FB | Amber #F5A623 | Teal #0EA5C9
// Border #D6E4F7 | Muted #6B84A3


const WA_NUM = "918983140094";
const LINKEDIN_URL = "https://www.linkedin.com/company/shuroq/";
const INSTAGRAM_URL = "https://www.instagram.com/shuroq_technologies?igsh=MjRzbDF4NWNnZGtl";

function buildWALink(msg) {
  return `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;
}

function buildMailLink({ name, email, service, message } = {}) {
  const subject = "Contact Shuroq";
  const bodyLines = [];
  if (name) bodyLines.push(`Name: ${name}`);
  if (email) bodyLines.push(`Email: ${email}`);
  if (service) bodyLines.push(`Service: ${service}`);
  if (message) bodyLines.push(`Message: ${message}`);
  bodyLines.push("\nHi Shuroq team,\n");
  bodyLines.push("I would like to discuss a project and learn how you can help. Please get back to me at your earliest convenience.");
  const body = bodyLines.join("\n");
  return `mailto:contact@shuroq.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function submitLead({ name, email, service, message }) {
  const text = `*New Enquiry via Shuroq Website*\n\nName: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`;
  window.open(buildWALink(text), "_blank");
}


const NAV_LINKS = ["Home","About","Services","Technologies","Portfolio"];

function SvgIcon({ name, size=24, color="currentColor", sw=1.8 }) {
  const s = { fill:"none", stroke:color, strokeWidth:sw, strokeLinecap:"round", strokeLinejoin:"round" };
  const icons = {
    ai:         <><rect x="9" y="9" width="6" height="6" {...s}/><path d="M9 9V5M15 9V5M9 15v4M15 15v4M5 9h4M5 15h4M15 9h4M15 15h4" {...s}/><rect x="7" y="3" width="4" height="2" rx="1" {...s}/><rect x="13" y="3" width="4" height="2" rx="1" {...s}/><rect x="7" y="19" width="4" height="2" rx="1" {...s}/><rect x="13" y="19" width="4" height="2" rx="1" {...s}/><rect x="3" y="7" width="2" height="4" rx="1" {...s}/><rect x="3" y="13" width="2" height="4" rx="1" {...s}/><rect x="19" y="7" width="2" height="4" rx="1" {...s}/><rect x="19" y="13" width="2" height="4" rx="1" {...s}/></>,
    mobile:     <><rect x="5" y="2" width="14" height="20" rx="2" {...s}/><line x1="12" y1="18" x2="12.01" y2="18" {...s}/></>,
    apple:      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.029 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill={color}/>,
    cloud:      <><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" {...s}/></>,
    globe:      <><circle cx="12" cy="12" r="10" {...s}/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" {...s}/></>,
    shop:       <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" {...s}/><line x1="3" y1="6" x2="21" y2="6" {...s}/><path d="M16 10a4 4 0 0 1-8 0" {...s}/></>,
    chat:       <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" {...s}/></>,
    gear:       <><circle cx="12" cy="12" r="3" {...s}/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" {...s}/></>,
    flask:      <><path d="M9 3h6M9 3v6l-5 9a1 1 0 0 0 .9 1.5h10.2A1 1 0 0 0 21 18l-5-9V3" {...s}/><line x1="6.5" y1="14" x2="17.5" y2="14" {...s}/></>,
    building:   <><path d="M3 21h18M5 21V7l8-4 8 4v14M9 21v-4h6v4M9 9h.01M15 9h.01M12 9h.01M9 13h.01M15 13h.01M12 13h.01" {...s}/></>,
    lightning:  <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" {...s}/></>,
    layers:     <><polygon points="12 2 2 7 12 12 22 7 12 2" {...s}/><polyline points="2 17 12 22 22 17" {...s}/><polyline points="2 12 12 17 22 12" {...s}/></>,
    lightbulb:  <><line x1="9" y1="18" x2="15" y2="18" {...s}/><line x1="10" y1="22" x2="14" y2="22" {...s}/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" {...s}/></>,
    dollar:     <><line x1="12" y1="1" x2="12" y2="23" {...s}/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" {...s}/></>,
    lock:       <><rect x="3" y="11" width="18" height="11" rx="2" {...s}/><path d="M7 11V7a5 5 0 0 1 10 0v4" {...s}/></>,
    email:      <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" {...s}/><polyline points="22,6 12,13 2,6" {...s}/></>,
    whatsapp:   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill={color}/>,
    phone:      <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.1 11.7 19.79 19.79 0 0 1 1.04 3a2 2 0 0 1 2.08-1.86h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" {...s}/></>,
    clock:      <><circle cx="12" cy="12" r="10" {...s}/><polyline points="12 6 12 12 16 14" {...s}/></>,
    pin:        <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" {...s}/><circle cx="12" cy="10" r="3" {...s}/></>,
    briefcase:  <><rect x="2" y="7" width="20" height="14" rx="2" {...s}/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" {...s}/></>,
    users:      <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" {...s}/><circle cx="9" cy="7" r="4" {...s}/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" {...s}/></>,
    rocket:     <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" {...s}/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" {...s}/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" {...s}/></>,
    headset:    <><path d="M3 18v-6a9 9 0 0 1 18 0v6" {...s}/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" {...s}/></>,
    shield:     <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" {...s}/></>,
    link:       <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" {...s}/></>,
    brain:      <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z" {...s}/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z" {...s}/></>,
    camera:     <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" {...s}/><circle cx="12" cy="13" r="4" {...s}/></>,
    check:      <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" {...s}/><polyline points="22 4 12 14.01 9 11.01" {...s}/></>,
    close:      <><line x1="18" y1="6" x2="6" y2="18" {...s}/><line x1="6" y1="6" x2="18" y2="18" {...s}/></>,
    zap:        <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" {...s}/></>,
    bot:        <><rect x="3" y="11" width="18" height="10" rx="2" {...s}/><circle cx="12" cy="5" r="2" {...s}/><path d="M12 7v4M8 15h.01M16 15h.01M12 15h.01" {...s}/></>,
    analytics:  <><line x1="18" y1="20" x2="18" y2="4" {...s}/><line x1="12" y1="20" x2="12" y2="10" {...s}/><line x1="6" y1="20" x2="6" y2="16" {...s}/></>,
    eye:        <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" {...s}/><circle cx="12" cy="12" r="3" {...s}/></>,
    target:     <><circle cx="12" cy="12" r="10" {...s}/><circle cx="12" cy="12" r="6" {...s}/><circle cx="12" cy="12" r="2" {...s}/></>,
    code:       <><polyline points="16 18 22 12 16 6" {...s}/><polyline points="8 6 2 12 8 18" {...s}/></>,
    server:     <><rect x="2" y="2" width="20" height="8" rx="2" {...s}/><rect x="2" y="14" width="20" height="8" rx="2" {...s}/><line x1="6" y1="6" x2="6.01" y2="6" {...s}/><line x1="6" y1="18" x2="6.01" y2="18" {...s}/></>,
  };
  if (name.startsWith("http"))
    return <img src={name} width={size} height={size} style={{objectFit:"contain",display:"block"}} alt=""/>;
  const ic = icons[name];
  if (!ic) return null;
  const isFilled = name === "whatsapp" || name === "apple";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={isFilled ? color : "none"} stroke={isFilled ? "none" : color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {ic}
    </svg>
  );
}

const SLIDES = [
  { title:"AI Application Development", sub:"LLM-powered automation, intelligent dashboards & recommendation engines.", icon:"ai", grad:"linear-gradient(135deg,#EAF3FF 0%,#F4F9FF 100%)", accent:"#3B82C4" },
  { title:"Android App Development", sub:"Native & cross-platform apps engineered for performance and delight.", icon:"mobile", grad:"linear-gradient(135deg,#EDFDF5 0%,#F4FDF9 100%)", accent:"#10B981" },
  { title:"iOS App Development", sub:"Premium iOS experiences crafted to Apple's exacting standards.", icon:"https://cdn.simpleicons.org/apple/EF4444", grad:"linear-gradient(135deg,#FFF1F1 0%,#FFF7F7 100%)", accent:"#EF4444" },
  { title:"DevOps Services", sub:"CI/CD pipelines, Kubernetes orchestration & cloud infrastructure ops.", icon:"cloud", grad:"linear-gradient(135deg,#F5F2FF 0%,#FAF8FF 100%)", accent:"#7C3AED" },
  { title:"Web Application Development", sub:"Scalable full-stack platforms with modern React & cloud-native architecture.", icon:"globe", grad:"linear-gradient(135deg,#FFFAED 0%,#FFFDF5 100%)", accent:"#F5A623" },
  { title:"E-Commerce Development", sub:"High-converting storefronts with smart discovery & seamless checkout.", icon:"shop", grad:"linear-gradient(135deg,#FFF0FB 0%,#FFF7FD 100%)", accent:"#EC4899" },
  { title:"Chatbot Development", sub:"Conversational AI that engages, qualifies and converts at scale.", icon:"chat", grad:"linear-gradient(135deg,#EDFCFA 0%,#F4FDFB 100%)", accent:"#0EA5C9" },
  { title:"Automation Solutions", sub:"Workflow engines & RPA eliminating repetitive work at enterprise scale.", icon:"gear", grad:"linear-gradient(135deg,#F0FFF4 0%,#F7FFF9 100%)", accent:"#10B981" },
];

// ── Updated services list (AI Marketplace removed per requirements) ─────────
const SERVICES = [
  {
    icon:"ai", title:"AI Application Development", accent:"#3B82C4",
    desc:"Custom LLM-powered apps, computer vision, and predictive systems built for real business impact.",
    detail:{
      overview:"We design and build AI-native applications that embed intelligence into every layer of the product — from intelligent data pipelines and ML model serving to autonomous agents and AI dashboards.",
      technologies:["Python","TensorFlow","PyTorch","OpenAI API","LangChain","FastAPI","AWS SageMaker","Docker"],
      useCases:["Intelligent document processing systems","AI-powered recommendation engines","Predictive analytics dashboards","Computer vision inspection tools"],
      projects:[{name:"InsightOS",desc:"Enterprise NLP analytics — 70% reduction in manual reporting time"},{name:"VisionQA",desc:"Defect detection system with 99.2% accuracy for manufacturing client"}],
      benefits:["Automate repetitive cognitive tasks","Reduce operational costs by 40-70%","Make data-driven decisions in real time","Scale intelligence across your organisation"],
      approach:"Discovery → Data audit → Model selection → MVP → Iterative improvement → Production deployment"
    }
  },
  {
    icon:"mobile", title:"Android App Development", accent:"#10B981",
    desc:"Native and cross-platform Android apps engineered for performance and seamless UX.",
    detail:{
      overview:"We build high-performance Android applications using both native Kotlin and cross-platform Flutter — delivering enterprise-grade features, beautiful UIs, and rock-solid stability.",
      technologies:["Kotlin","Flutter","Jetpack Compose","Firebase","Retrofit","Room DB","Google Play","CI/CD"],
      useCases:["Consumer-facing commerce apps","Field workforce management apps","Healthcare patient portals","Real-time logistics tracking"],
      projects:[{name:"PulseTrack",desc:"Health & fitness app — 4.8★ on Play Store, 100K+ installs"},{name:"FieldOps",desc:"Offline-first field management app for 500+ enterprise users"}],
      benefits:["60% faster delivery with Flutter","Offline-capable architecture","Secure biometric authentication","Seamless Google ecosystem integration"],
      approach:"UX wireframing → Architecture design → Sprint-based development → QA → Play Store launch"
    }
  },
  {
    icon:"https://cdn.simpleicons.org/apple/EF4444", title:"iOS App Development", accent:"#EF4444",
    desc:"Premium iOS applications crafted to Apple's exacting design and engineering standards.",
    detail:{
      overview:"Our iOS team builds Swift-native and Flutter cross-platform applications that feel right at home on Apple devices — following Human Interface Guidelines and App Store best practices.",
      technologies:["Swift","SwiftUI","Flutter","Xcode","Core Data","CloudKit","ARKit","App Store Connect"],
      useCases:["Premium consumer lifestyle apps","Enterprise B2B tools","AR-enabled shopping experiences","Healthcare & wellness platforms"],
      projects:[{name:"LuxeShop iOS",desc:"Fashion app with AR try-on — 4.9★ App Store rating"},{name:"MedFlow",desc:"Patient management app — HIPAA-compliant, launched to 200+ clinics"}],
      benefits:["Native performance & feel","Deep Apple ecosystem integration","Strict privacy & security standards","Optimised for all iOS device sizes"],
      approach:"Design system creation → Swift development → TestFlight beta → App Store submission"
    }
  },
  {
    icon:"globe", title:"Web Application Development", accent:"#3B82C4",
    desc:"Scalable full-stack platforms with modern React, Node.js, and cloud-native architecture.",
    detail:{
      overview:"From SaaS platforms to enterprise portals, we engineer web applications that handle millions of users — built with component-driven frontends, microservices backends, and cloud-native deployment.",
      technologies:["React","Next.js","Node.js","TypeScript","PostgreSQL","Redis","AWS","Kubernetes"],
      useCases:["SaaS product dashboards","Internal enterprise portals","Multi-tenant platforms","Real-time collaborative tools"],
      projects:[{name:"FlowDesk",desc:"No-code workflow SaaS — adopted by 500+ teams globally"},{name:"PortalX",desc:"Enterprise HR portal handling 10K daily active users"}],
      benefits:["Sub-second page loads","99.9% uptime SLA","Horizontal scalability","SEO-optimised architecture"],
      approach:"Architecture blueprint → API design → Frontend + backend sprints → Load testing → Deployment"
    }
  },
  {
    icon:"lightning", title:"Static Website Development", accent:"#F5A623",
    desc:"Lightning-fast, SEO-optimised sites with conversion-focused design and zero bloat.",
    detail:{
      overview:"We build performance-first static websites using modern SSG frameworks — delivering perfect Lighthouse scores, outstanding Core Web Vitals, and conversion-optimised design.",
      technologies:["Next.js","Gatsby","Astro","TailwindCSS","Contentful","Netlify","Vercel","Cloudflare CDN"],
      useCases:["Corporate landing pages","Product marketing sites","Portfolio & personal brands","Documentation sites"],
      projects:[{name:"NovaBuild.com",desc:"Corporate site — 100/100 Lighthouse, 3x lead improvement"},{name:"Doctify Landing",desc:"Medical SaaS landing page — 28% conversion rate"}],
      benefits:["100/100 Google PageSpeed","Zero server maintenance","Global CDN delivery","Superior SEO rankings"],
      approach:"Design system → Content strategy → Development → CMS setup → SEO audit → Launch"
    }
  },
  {
    icon:"chat", title:"Chatbot Development", accent:"#0EA5C9",
    desc:"Conversational AI that engages, qualifies, and converts users at scale.",
    detail:{
      overview:"We build intelligent chatbots and virtual assistants powered by LLMs — from simple FAQ bots to fully contextual AI agents that integrate with your CRM, calendar, and support systems.",
      technologies:["OpenAI GPT-4","LangChain","Dialogflow","WhatsApp API","Telegram Bot API","React","Node.js","MongoDB"],
      useCases:["24/7 customer support automation","Lead qualification bots","HR onboarding assistants","E-commerce shopping assistants"],
      projects:[{name:"SupportBot Pro",desc:"Deflected 60% of support tickets — saved client $40K/month"},{name:"LeadQual AI",desc:"Increased qualified leads by 3x for real estate platform"}],
      benefits:["24/7 instant customer response","3x more qualified leads","Integrate with WhatsApp, Slack, Web","Continuous learning & improvement"],
      approach:"Use-case mapping → Conversation design → Bot training → Integration → Analytics setup"
    }
  },
  {
    icon:"shop", title:"E-Commerce Development", accent:"#EC4899",
    desc:"High-converting storefronts with smart product discovery and seamless checkout flows.",
    detail:{
      overview:"We engineer e-commerce platforms — from custom-built solutions to Shopify/WooCommerce customisations — with AI-powered recommendation engines, smart search, and frictionless checkout.",
      technologies:["Next.js","Shopify","WooCommerce","Stripe","Algolia","Elasticsearch","Redis","AWS"],
      useCases:["D2C brand storefronts","B2B wholesale platforms","Subscription commerce","Multi-vendor marketplaces"],
      projects:[{name:"LuxeShop",desc:"Fashion storefront — £2M/month GMV, 4.1% conversion rate"},{name:"FreshBox",desc:"Subscription grocery — 85% recurring order retention"}],
      benefits:["AI product recommendations","Lightning-fast search","One-click checkout","Inventory & order automation"],
      approach:"Platform selection → UX design → Payment integration → Performance optimisation → Launch"
    }
  },
  {
    icon:"gear", title:"Automation Solutions", accent:"#10B981",
    desc:"Workflow engines and RPA that eliminate repetitive work at enterprise scale.",
    detail:{
      overview:"We build intelligent automation systems using RPA, APIs, and AI — connecting your tools, automating repetitive processes, and giving your team time to focus on high-value work.",
      technologies:["Python","Zapier","Make (Integromat)","UiPath","Power Automate","Selenium","REST APIs","Webhooks"],
      useCases:["Invoice & document processing","HR onboarding workflows","Data sync across CRMs","Automated reporting pipelines"],
      projects:[{name:"InvoiceFlow",desc:"Automated AP processing — 90% time saved for finance team"},{name:"ReportBot",desc:"Daily automated analytics reports across 15 data sources"}],
      benefits:["80-90% reduction in manual work","Zero human error on routine tasks","Real-time cross-system sync","Scale without headcount"],
      approach:"Process audit → Automation blueprint → Build → Test → Deploy → Monitor & optimise"
    }
  },
  {
    icon:"flask", title:"Software Testing & Integration", accent:"#7C3AED",
    desc:"Unit, integration, E2E, and performance testing for bulletproof software.",
    detail:{
      overview:"We provide comprehensive QA services — from manual exploratory testing to full automated test suites — ensuring your software performs flawlessly under real-world conditions.",
      technologies:["Jest","Cypress","Playwright","Selenium","k6","JMeter","Postman","GitHub Actions"],
      useCases:["Pre-launch regression testing","API contract testing","Performance & load testing","Security penetration testing"],
      projects:[{name:"FinApp QA",desc:"Caught 140 bugs before launch — zero P0 issues in production"},{name:"LoadTest Suite",desc:"Stress-tested to 50K concurrent users for fintech client"}],
      benefits:["Ship with confidence","Catch bugs before users do","Automated CI/CD quality gates","Compliance-ready audit trails"],
      approach:"Test strategy → Framework setup → Automated suite build → CI integration → Ongoing maintenance"
    }
  },
  {
    icon:"server", title:"Enterprise Application Development", accent:"#1B2D4F",
    desc:"Mission-critical enterprise platforms built for security, scale, and compliance.",
    detail:{
      overview:"We architect and build complex enterprise applications — ERP systems, internal platforms, and multi-stakeholder portals — with strict security, role-based access, and audit logging built in.",
      technologies:["Java Spring Boot","Node.js","React","PostgreSQL","Azure","AWS","Docker","Kubernetes"],
      useCases:["ERP and CRM integrations","Internal HR and finance portals","Compliance management systems","Multi-region enterprise SaaS"],
      projects:[{name:"CorpSuite",desc:"8-module enterprise platform — 2,000 daily users across 3 regions"},{name:"ComplianceOS",desc:"SOC 2-compliant audit management for financial services firm"}],
      benefits:["SOC 2 / ISO 27001 alignment","Enterprise SSO & RBAC","99.99% uptime architecture","On-premise or cloud deployment"],
      approach:"Enterprise architecture review → Security design → Phased delivery → UAT → Hypercare support"
    }
  },
  {
    icon:"cloud", title:"DevOps Services", accent:"#6366F1",
    desc:"CI/CD pipelines, Docker, Kubernetes, cloud automation and monitoring solutions.",
    detail:{
      overview:"We set up and optimise your entire DevOps lifecycle — from infrastructure as code and container orchestration to observability stacks and cost-optimised cloud architecture.",
      technologies:["Kubernetes","Docker","Terraform","GitHub Actions","ArgoCD","Prometheus","Grafana","AWS/Azure/GCP"],
      useCases:["CI/CD pipeline setup & optimisation","Kubernetes cluster management","Infrastructure as code migration","Cloud cost optimisation"],
      projects:[{name:"CloudPilot",desc:"Reduced cloud costs by 38% through right-sizing & automation"},{name:"ZeroDowntime",desc:"Zero-downtime deployment pipeline for 50-microservice platform"}],
      benefits:["Deploy 10x faster","99.9%+ uptime guarantee","50%+ infrastructure cost savings","Full observability & alerting"],
      approach:"Infrastructure audit → IaC migration → CI/CD setup → Observability → Ongoing ops support"
    }
  },
];

const TECHS = [
  {name:"React",logo:"https://cdn.simpleicons.org/react/61DAFB"},
  {name:"Node.js",logo:"https://cdn.simpleicons.org/nodedotjs/339933"},
  {name:"Flutter",logo:"https://cdn.simpleicons.org/flutter/02569B"},
  {name:"Swift",logo:"https://cdn.simpleicons.org/swift/F05138"},
  {name:"Android",logo:"https://cdn.simpleicons.org/android/3DDC84"},
  {name:"AWS",logo:awsLogo},
  {name:"Docker",logo:"https://cdn.simpleicons.org/docker/2496ED"},
  {name:"Kubernetes",logo:"https://cdn.simpleicons.org/kubernetes/326CE5"},
  {name:"Terraform",logo:"https://cdn.simpleicons.org/terraform/7B42BC"},
  {name:"Python",logo:"https://cdn.simpleicons.org/python/3776AB"},
  {name:"OpenAI",logo:openaiLogo},
  {name:"Firebase",logo:"https://cdn.simpleicons.org/firebase/FFCA28"},
  {name:"MongoDB",logo:"https://cdn.simpleicons.org/mongodb/47A248"},
  {name:"PostgreSQL",logo:"https://cdn.simpleicons.org/postgresql/336791"},
  {name:"Next.js",logo:"https://cdn.simpleicons.org/nextdotjs/000000"},
  {name:"TypeScript",logo:"https://cdn.simpleicons.org/typescript/3178C6"},
  {name:"GraphQL",logo:"https://cdn.simpleicons.org/graphql/E10098"},
  {name:"Grafana",logo:"https://cdn.simpleicons.org/grafana/F46800"},
];

const PORTFOLIO = [
  {cat:"AI Platform",title:"InsightOS",desc:"Enterprise analytics with natural-language querying and live data pipelines.",accent:"#3B82C4",icon:"analytics"},
  {cat:"Mobile App",title:"PulseTrack",desc:"Cross-platform health & fitness app with AI coaching and biometric sync.",accent:"#0EA5C9",icon:"mobile"},
  {cat:"E-Commerce",title:"LuxeShop",desc:"Premium fashion storefront with AR try-on and smart personalisation engine.",accent:"#EC4899",icon:"shop"},
  {cat:"SaaS Platform",title:"FlowDesk",desc:"No-code workflow automation SaaS deployed by 500+ teams worldwide.",accent:"#10B981",icon:"gear"},
  {cat:"DevOps",title:"CloudPilot",desc:"Kubernetes cost-optimisation and observability platform for cloud-native teams.",accent:"#7C3AED",icon:"cloud"},
  {cat:"Web App",title:"PortalX",desc:"Enterprise HR portal handling 10,000 daily active users across 5 countries.",accent:"#F5A623",icon:"globe"},
];

const TESTIMONIALS = [
  {name:"Aisha Rahman",role:"CTO, FinSpark",text:"Shuroq delivered an AI integration that cut our processing time by 70%. Their engineering culture is genuinely world-class.",initials:"AR"},
  {name:"Marcus Chen",role:"Founder, NovaBuild",text:"The web platform went live in 8 weeks and now processes $2M monthly. Incredible velocity without sacrificing quality.",initials:"MC"},
  {name:"Sarah Okonkwo",role:"VP Product, MedFlow",text:"From design to deployment, every detail was handled with precision. Our iOS app launched with a 4.9★ App Store rating.",initials:"SO"},
];

const WHY_POINTS = [
  {icon:"ai",title:"AI-Driven Development",pct:95,desc:"Intelligence baked into every layer"},
  {icon:"lightning",title:"Fast Delivery",pct:90,desc:"From concept to production in weeks"},
  {icon:"layers",title:"Scalable Architecture",pct:98,desc:"Built to grow without friction"},
  {icon:"lightbulb",title:"Innovation Focus",pct:93,desc:"Ahead of the technology curve"},
  {icon:"dollar",title:"Startup-Friendly Pricing",pct:88,desc:"Enterprise quality, accessible rates"},
  {icon:"lock",title:"Enterprise Security",pct:97,desc:"SOC-grade standards as a baseline"},
];

const SUPPORT_OPTIONS = [
  {label:"💼 Sales Support",route:"sales@shuroq.com",tag:"Sales"},
  {label:"👥 HR Enquiries",route:"hr-team@shuroq.com",tag:"HR"},
  {label:"🚀 Project Consultation",route:"contact@shuroq.com",tag:"Project"},
  {label:"🌐 Website Development",route:"contact@shuroq.com",tag:"Web Dev"},
  {label:"📱 Mobile App Development",route:"contact@shuroq.com",tag:"Mobile"},
  {label:"🎧 Client Support",route:"contact@shuroq.com",tag:"Support"},
];

// ── Utilities ─────────────────────────────────────────────────────────────────
function useIntersection(opts = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1, ...opts });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useIntersection();
  useEffect(() => {
    if (!visible) return;
    let n = 0; const step = Math.max(1, Math.ceil(target / 55));
    const id = setInterval(() => { n = Math.min(n + step, target); setCount(n); if (n >= target) clearInterval(id); }, 22);
    return () => clearInterval(id);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function SectionLabel({ text }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, justifyContent:"center" }}>
      <div style={{ height:2, width:30, background:"linear-gradient(90deg,transparent,#F5A623)", borderRadius:2 }}/>
      <span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:11, color:"#F5A623", letterSpacing:3.5 }}>{text}</span>
      <div style={{ height:2, width:30, background:"linear-gradient(90deg,#F5A623,transparent)", borderRadius:2 }}/>
    </div>
  );
}

// ── Particle Canvas ───────────────────────────────────────────────────────────
function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = canvas.offsetWidth, H = canvas.height = canvas.offsetHeight;
    const pts = Array.from({length:60},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.6+.4}));
    let raf;
    function draw(){
      ctx.clearRect(0,0,W,H);
      pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(59,130,196,0.15)";ctx.fill();});
      ctx.globalAlpha=0.045;
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.hypot(dx,dy);if(d<120){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle="#3B82C4";ctx.lineWidth=.7;ctx.stroke();}}
      ctx.globalAlpha=1;raf=requestAnimationFrame(draw);
    }
    draw();
    const onResize=()=>{W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;};
    window.addEventListener("resize",onResize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",onResize);};
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>;
}

// ── AI Engineering Background SVG ─────────────────────────────────────────────
function AIBackground() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.045}} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
      {/* Neural network nodes */}
      {[[180,200],[340,150],[500,240],[660,180],[820,260],[980,140],[1140,220],[1300,170]].map(([x,y],i)=>(
        <circle key={`n${i}`} cx={x} cy={y} r="6" fill="#3B82C4"/>
      ))}
      {/* Second layer */}
      {[[260,380],[440,340],[600,400],[760,350],[920,420],[1080,360],[1240,400]].map(([x,y],i)=>(
        <circle key={`n2${i}`} cx={x} cy={y} r="5" fill="#0EA5C9"/>
      ))}
      {/* Third layer */}
      {[[320,550],[520,500],[720,560],[900,520],[1100,570]].map(([x,y],i)=>(
        <circle key={`n3${i}`} cx={x} cy={y} r="7" fill="#F5A623" opacity="0.7"/>
      ))}
      {/* Connections */}
      {[[180,200,260,380],[340,150,260,380],[340,150,440,340],[500,240,440,340],[500,240,600,400],[660,180,600,400],[660,180,760,350],[820,260,760,350],[820,260,920,420],[980,140,920,420],[980,140,1080,360],[1140,220,1080,360],[1140,220,1240,400],[1300,170,1240,400]].map(([x1,y1,x2,y2],i)=>(
        <line key={`c${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3B82C4" strokeWidth="1"/>
      ))}
      {[[260,380,320,550],[440,340,320,550],[440,340,520,500],[600,400,520,500],[760,350,720,560],[920,420,900,520],[1080,360,1100,570],[1240,400,1100,570]].map(([x1,y1,x2,y2],i)=>(
        <line key={`c2${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0EA5C9" strokeWidth="1"/>
      ))}
      {/* Grid lines */}
      <rect x="50" y="600" width="200" height="120" rx="8" fill="none" stroke="#3B82C4" strokeWidth="1"/>
      <rect x="280" y="620" width="150" height="100" rx="8" fill="none" stroke="#0EA5C9" strokeWidth="1"/>
      <rect x="1100" y="580" width="180" height="140" rx="8" fill="none" stroke="#F5A623" strokeWidth="1" opacity="0.6"/>
    </svg>
  );
}

// ── Service Modal ─────────────────────────────────────────────────────────────
function ServiceModal({ svc, onClose, lang }) {
  const d = svc.detail;
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:500,background:"rgba(27,45,79,0.55)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",animation:"fadeInOverlay .25s ease"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:22,width:"100%",maxWidth:720,maxHeight:"88vh",overflowY:"auto",boxShadow:"0 24px 80px rgba(27,45,79,0.22)",animation:"slideUpModal .3s ease",position:"relative"}}>
        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${svc.accent}18,#EAF2FD)`,borderRadius:"22px 22px 0 0",padding:"28px 32px 24px"}}>
          <button onClick={onClose} style={{position:"absolute",top:18,right:18,background:"rgba(255,255,255,0.8)",border:"1px solid #D6E4F7",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(6px)",color:"#1B2D4F",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.background="#fff"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.8)"}>✕</button>
          <div style={{marginBottom:12,display:"flex"}}><SvgIcon name={svc.icon} size={42} color={svc.accent} sw={1.5}/></div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:"1.6rem",color:"#1B2D4F",marginBottom:8}}>{svc.title}</h2>
          <p style={{fontFamily:"'Nunito',sans-serif",color:"#6B84A3",fontSize:14.5,fontWeight:600,lineHeight:1.75}}>{d.overview}</p>
        </div>
        <div style={{padding:"24px 32px 32px"}}>
          {/* Technologies */}
          <div style={{marginBottom:22}}>
            <h3 style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:12,letterSpacing:2,color:svc.accent,marginBottom:10}}>TECHNOLOGIES</h3>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {d.technologies.map(t=><span key={t} style={{background:`${svc.accent}12`,border:`1px solid ${svc.accent}33`,borderRadius:8,padding:"5px 12px",fontFamily:"'Nunito',sans-serif",fontSize:12,fontWeight:800,color:svc.accent}}>{t}</span>)}
            </div>
          </div>
          {/* Use Cases & Projects — 2 col */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:22}}>
            <div>
              <h3 style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:12,letterSpacing:2,color:"#1B2D4F",marginBottom:10}}>SAMPLE USE CASES</h3>
              {d.useCases.map((u,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:8}}>
                  <span style={{color:svc.accent,fontSize:14,marginTop:1}}>→</span>
                  <span style={{fontFamily:"'Nunito',sans-serif",fontSize:13,color:"#6B84A3",fontWeight:600,lineHeight:1.5}}>{u}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:12,letterSpacing:2,color:"#1B2D4F",marginBottom:10}}>{tx(lang,"services","mPrj")}</h3>
              {d.projects.map((p,i)=>(
                <div key={i} style={{background:"#F8FAFD",border:"1px solid #E8F0FB",borderRadius:10,padding:"10px 14px",marginBottom:10}}>
                  <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,color:"#1B2D4F",marginBottom:3}}>{p.name}</div>
                  <div style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#6B84A3",fontWeight:600}}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Benefits */}
          <div style={{marginBottom:22}}>
            <h3 style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:12,letterSpacing:2,color:"#1B2D4F",marginBottom:10}}>{tx(lang,"services","mBen")}</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {d.benefits.map((b,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:svc.accent,flexShrink:0}}/>
                  <span style={{fontFamily:"'Nunito',sans-serif",fontSize:13,color:"#1B2D4F",fontWeight:600}}>{b}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Approach */}
          <div style={{background:`${svc.accent}08`,border:`1px solid ${svc.accent}22`,borderRadius:12,padding:"14px 18px",marginBottom:22}}>
            <h3 style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:12,letterSpacing:2,color:svc.accent,marginBottom:6}}>{tx(lang,"services","mApp")}</h3>
            <p style={{fontFamily:"'Nunito',sans-serif",fontSize:13,color:"#6B84A3",fontWeight:600}}>{d.approach}</p>
          </div>
          <button onClick={()=>{onClose();document.getElementById("contact")?.scrollIntoView({behavior:"smooth"});}} style={{width:"100%",background:`linear-gradient(135deg,${svc.accent},#0EA5C9)`,border:"none",borderRadius:11,color:"#fff",fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:15,padding:"14px",cursor:"pointer",boxShadow:`0 6px 20px ${svc.accent}44`,transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
            {tx(lang,"services","mQuote")} {tx(lang,"services",`s${SERVICES.indexOf(svc)}t`)} →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── i18n — Translations ───────────────────────────────────────────────────────
const LANGS = [
  { code:"ar", name:"العربية",   flag:"🇸🇦", dir:"rtl" },
  { code:"bn", name:"বাংলা",     flag:"🇧🇩", dir:"ltr" },
  { code:"de", name:"Deutsch",   flag:"🇩🇪", dir:"ltr" },
  { code:"en", name:"English",   flag:"🇬🇧", dir:"ltr" },
  { code:"es", name:"Español",   flag:"🇪🇸", dir:"ltr" },
  { code:"fr", name:"Français",  flag:"🇫🇷", dir:"ltr" },
  { code:"hi", name:"हिन्दी",    flag:"🇮🇳", dir:"ltr" },
  { code:"it", name:"Italiano",  flag:"🇮🇹", dir:"ltr" },
  { code:"ja", name:"日本語",     flag:"🇯🇵", dir:"ltr" },
  { code:"kn", name:"ಕನ್ನಡ",     flag:"🇮🇳", dir:"ltr" },
  { code:"ml", name:"മലയാളം",   flag:"🇮🇳", dir:"ltr" },
  { code:"pt", name:"Português", flag:"🇧🇷", dir:"ltr" },
  { code:"ru", name:"Русский",   flag:"🇷🇺", dir:"ltr" },
  { code:"ta", name:"தமிழ்",     flag:"🇮🇳", dir:"ltr" },
  { code:"te", name:"తెలుగు",    flag:"🇮🇳", dir:"ltr" },
  { code:"ur", name:"اردو",      flag:"🇵🇰", dir:"rtl" },
  { code:"zh", name:"中文",       flag:"🇨🇳", dir:"ltr" },
];

const T = {
  en: {
    nav:{ home:"Home", about:"About", services:"Services", technologies:"Technologies", portfolio:"Portfolio", contact:"Contact", cta:"Contact Us" },
    hero:{ badge:"AI-FIRST ENGINEERING COMPANY", h1a:"Building", h1b:"Digital Solutions That Drive Business Growth", sub:"AI Applications · Mobile Apps · DevOps · Web Solutions · Automation\nWe engineer intelligent software that scales with your ambition.", cta1:"Get Started →", cta2:"Explore Services", stat1:"Projects Delivered", stat2:"AI Accuracy", stat3:"Support", stat4:"Client Rating", 
    //New: Cycling words translations
    w0:"AI-Powered", w1:"Scalable", w2:"Modern", w3:"Innovative"},
    about:{ label:"ABOUT US", h2a:"Where Technology", h2b:"Vision", p1:"Shuroq — meaning \"Sunrise\" in Arabic — embodies our belief that every great product begins with a bold new dawn. We are an AI-first engineering company building the digital infrastructure of tomorrow.", p2:"From stealth startups to enterprise clients, we engineer software that scales, performs, and inspires — obsessing over every detail.", caps:"Core Capabilities" },
    services:{ label:"WHAT WE BUILD", h2a:"Our", h2b:"Services", sub:"End-to-end digital solutions — from AI platforms to mobile apps and cloud infrastructure.", learnMore:"Learn more" },
    whyUs:{ label:"WHY SHUROQ", h2a:"Why Choose", h2b:"Us" },
    tech:{ label:"OUR STACK", h2a:"Technologies We", h2b:"Master" },
    portfolio:{ label:"OUR WORK", h2a:"Featured", h2b:"Projects" },
    testimonials:{ label:"TESTIMONIALS", h2a:"What Our", h2b:"Clients", h2c:"Say" },
    contact:{ label:"GET IN TOUCH", h2a:"Start Your", h2b:"Project", sub:"Ready to build something extraordinary? Your message goes directly to our WhatsApp.", email:"Email", whatsapp:"WhatsApp", response:"Response Time", within:"Within 24 hours", dashboard:"Live Dashboard", name:"NAME", emailL:"EMAIL", service:"SERVICE", servicePH:"Select a service...", message:"MESSAGE", msgPH:"Tell us about your project...", send:"Send via WhatsApp", hint:"Send via WhatsApp or email us at contact@shuroq.com", successH:"Opening WhatsApp!", successP:"Your message is ready on WhatsApp. We'll reply within 24 hours." },
    footer:{ tagline:"AI-first engineering company building intelligent, scalable, and beautiful software for the next generation of businesses.", company:"Company", services:"Services", connect:"Connect With Us", copyright:"© 2025 Shuroq. All rights reserved.", tag:"Tech Redefined ✦" },
  },
  ar: {
    nav:{ home:"الرئيسية", about:"من نحن", services:"خدماتنا", technologies:"التقنيات", portfolio:"أعمالنا", contact:"تواصل", cta:"تواصل معنا" },
    hero:{ badge:"شركة هندسة برمجيات بالذكاء الاصطناعي", h1a:"بناء", h1b:"حلول رقمية تدفع نمو الأعمال" , sub:"تطبيقات الذكاء الاصطناعي · تطبيقات الجوال · DevOps · حلول الويب · الأتمتة\nنبني برمجيات ذكية ترقى مع طموحاتك.", cta1:"ابدأ الآن ←", cta2:"استكشف خدماتنا", stat1:"مشروع مُنجز", stat2:"دقة الذكاء الاصطناعي", stat3:"دعم", stat4:"تقييم العملاء" ,
      //NEW: Arabic translations
    w0:"المدعومة بالذكاء الاصطناعي", w1:"قابلة للتوسع",w2:"حديثة",w3:"مبتكرة"},
    about:{ label:"من نحن", h2a:"حيث التكنولوجيا", h2b:"تلتقي بالرؤية", p1:"شروق — تجسيداً لاعتقادنا بأن كل منتج عظيم يبدأ بفجر جديد جريء. نحن شركة هندسة برمجيات تعتمد الذكاء الاصطناعي أولاً.", p2:"من الشركات الناشئة إلى عملاء المؤسسات، نهندس برمجيات تتوسع وتُبهر.", caps:"القدرات الجوهرية" },
    services:{ label:"ما نبنيه", h2a:"", h2b:"خدماتنا", sub:"حلول رقمية شاملة — من منصات الذكاء الاصطناعي إلى تطبيقات الجوال والبنية السحابية.", learnMore:"اعرف المزيد" },
    whyUs:{ label:"لماذا شروق", h2a:"لماذا تختارنا", h2b:"" },
    tech:{ label:"مكدسنا التقني", h2a:"التقنيات التي", h2b:"نتقنها" },
    portfolio:{ label:"أعمالنا", h2a:"مشاريع", h2b:"مميزة" },
    testimonials:{ label:"آراء العملاء", h2a:"ما يقوله", h2b:"عملاؤنا", h2c:"" },
    contact:{ label:"تواصل معنا", h2a:"ابدأ", h2b:"مشروعك", sub:"هل أنت مستعد لبناء شيء استثنائي؟ رسالتك ستصل مباشرة إلى واتساب.", email:"البريد الإلكتروني", whatsapp:"واتساب", response:"وقت الاستجابة", within:"خلال 24 ساعة", dashboard:"لوحة مباشرة", name:"الاسم", emailL:"البريد الإلكتروني", service:"الخدمة", servicePH:"اختر خدمة...", message:"الرسالة", msgPH:"أخبرنا عن مشروعك...", send:"أرسل عبر واتساب", hint:"أرسل عبر واتساب أو راسلنا على contact@shuroq.com", successH:"!فتح واتساب", successP:"رسالتك جاهزة. سنرد خلال 24 ساعة." },
    footer:{ tagline:"شركة هندسة برمجيات تعتمد الذكاء الاصطناعي لبناء برمجيات ذكية وقابلة للتوسع للجيل القادم من الأعمال.", company:"الشركة", services:"الخدمات", connect:"تواصل معنا", copyright:"© 2025 شروق. جميع الحقوق محفوظة.", tag:"إعادة تعريف التقنية ✦" },
  },
  fr: {
    nav:{ home:"Accueil", about:"À Propos", services:"Services", technologies:"Technologies", portfolio:"Portfolio", contact:"Contact", cta:"Nous Contacter" },
    hero:{ badge:"ENTREPRISE D'INGÉNIERIE IA-FIRST", h1a:"Construire", h1b:"des Solutions Numériques qui Stimulent la Croissance", sub:"Applications IA · Apps Mobiles · DevOps · Solutions Web · Automatisation\nNous développons des logiciels intelligents qui grandissent avec votre ambition.", cta1:"Commencer →", cta2:"Explorer nos Services", stat1:"Projets Livrés", stat2:"Précision IA", stat3:"Support", stat4:"Note Clients",
      //NEW: French translations
    w0:"Alimentées par l'IA",w1:"Scalables",w2:"Modernes",w3:"Innovantes"},
    about:{ label:"À PROPOS", h2a:"Là où la Technologie", h2b:"Rencontre la Vision", p1:"Shuroq — signifiant « Lever du Soleil » en arabe — incarne notre conviction que chaque grand produit commence par un nouveau départ audacieux.", p2:"Des startups aux entreprises, nous développons des logiciels qui évoluent, performent et inspirent.", caps:"Compétences Clés" },
    services:{ label:"CE QUE NOUS CRÉONS", h2a:"Nos", h2b:"Services", sub:"Solutions numériques de bout en bout — des plateformes IA aux applications mobiles et à l'infrastructure cloud.", learnMore:"En savoir plus" },
    whyUs:{ label:"POURQUOI SHUROQ", h2a:"Pourquoi Nous", h2b:"Choisir" },
    tech:{ label:"NOTRE STACK", h2a:"Technologies que Nous", h2b:"Maîtrisons" },
    portfolio:{ label:"NOS TRAVAUX", h2a:"Projets", h2b:"Phares" },
    testimonials:{ label:"TÉMOIGNAGES", h2a:"Ce que disent", h2b:"nos Clients", h2c:"" },
    contact:{ label:"NOUS CONTACTER", h2a:"Démarrez Votre", h2b:"Projet", sub:"Prêt à construire quelque chose d'extraordinaire ? Votre message va directement sur WhatsApp.", email:"Email", whatsapp:"WhatsApp", response:"Temps de Réponse", within:"Sous 24 heures", dashboard:"Tableau de Bord", name:"NOM", emailL:"EMAIL", service:"SERVICE", servicePH:"Sélectionner un service...", message:"MESSAGE", msgPH:"Parlez-nous de votre projet...", send:"Envoyer via WhatsApp", hint:"Envoyez via WhatsApp ou par email à contact@shuroq.com", successH:"Ouverture de WhatsApp !", successP:"Votre message est prêt. Nous répondrons sous 24h." },
    footer:{ tagline:"Entreprise d'ingénierie IA-first construisant des logiciels intelligents pour la prochaine génération d'entreprises.", company:"Entreprise", services:"Services", connect:"Nous Rejoindre", copyright:"© 2025 Shuroq. Tous droits réservés.", tag:"La Tech Redéfinie ✦" },
  },
  de: {
    nav:{ home:"Startseite", about:"Über Uns", services:"Leistungen", technologies:"Technologien", portfolio:"Portfolio", contact:"Kontakt", cta:"Kontaktieren" },
    hero:{ badge:"KI-FIRST ENGINEERING UNTERNEHMEN", h1a:"Bauen", h1b:"Digitale Lösungen, die Geschäftswachstum fördern", sub:"KI-Apps · Mobile Apps · DevOps · Web-Lösungen · Automatisierung\nWir entwickeln intelligente Software, die mit Ihrem Ehrgeiz wächst.", cta1:"Loslegen →", cta2:"Leistungen entdecken", stat1:"Projekte geliefert", stat2:"KI-Genauigkeit", stat3:"Support", stat4:"Kundenbewertung",
      //NEW: Deutsch Translations
    w0:"KI-gesteuert", w1:"Skalierbar", w2:"Modern", w3:"Innovativ"},
    about:{ label:"ÜBER UNS", h2a:"Wo Technologie", h2b:"auf Vision trifft", p1:"Shuroq — auf Arabisch „Sonnenaufgang\" — verkörpert unsere Überzeugung, dass jedes große Produkt mit einem kühnen neuen Beginn beginnt.", p2:"Von Startups bis zu Enterprise-Kunden entwickeln wir Software, die skaliert, performt und begeistert.", caps:"Kernkompetenzen" },
    services:{ label:"WAS WIR BAUEN", h2a:"Unsere", h2b:"Leistungen", sub:"End-to-End-Digitallösungen — von KI-Plattformen bis hin zu mobilen Apps und Cloud-Infrastruktur.", learnMore:"Mehr erfahren" },
    whyUs:{ label:"WARUM SHUROQ", h2a:"Warum Uns", h2b:"wählen" },
    tech:{ label:"UNSER STACK", h2a:"Technologien die wir", h2b:"beherrschen" },
    portfolio:{ label:"UNSERE ARBEIT", h2a:"Ausgewählte", h2b:"Projekte" },
    testimonials:{ label:"REFERENZEN", h2a:"Was unsere", h2b:"Kunden", h2c:"sagen" },
    contact:{ label:"KONTAKT", h2a:"Starten Sie Ihr", h2b:"Projekt", sub:"Bereit, etwas Außergewöhnliches zu bauen? Ihre Nachricht geht direkt an unseren WhatsApp.", email:"E-Mail", whatsapp:"WhatsApp", response:"Reaktionszeit", within:"Innerhalb 24 Stunden", dashboard:"Live-Dashboard", name:"NAME", emailL:"E-MAIL", service:"LEISTUNG", servicePH:"Leistung auswählen...", message:"NACHRICHT", msgPH:"Erzählen Sie uns von Ihrem Projekt...", send:"Via WhatsApp senden", hint:"Via WhatsApp senden oder per E-Mail an contact@shuroq.com", successH:"WhatsApp wird geöffnet!", successP:"Ihre Nachricht ist bereit. Wir antworten innerhalb von 24h." },
    footer:{ tagline:"KI-first Engineering-Unternehmen, das intelligente, skalierbare Software für die nächste Generation von Unternehmen entwickelt.", company:"Unternehmen", services:"Leistungen", connect:"Kontakt aufnehmen", copyright:"© 2025 Shuroq. Alle Rechte vorbehalten.", tag:"Tech neu definiert ✦" },
  },
  es: {
    nav:{ home:"Inicio", about:"Nosotros", services:"Servicios", technologies:"Tecnologías", portfolio:"Portafolio", contact:"Contacto", cta:"Contáctanos" },
    hero:{ badge:"EMPRESA DE INGENIERÍA IA-FIRST", h1a:"Construir", h1b:"Soluciones Digitales que Impulsan el Crecimiento Empresarial", sub:"Apps IA · Apps Móviles · DevOps · Soluciones Web · Automatización\nDesarrollamos software inteligente que crece con tu ambición.", cta1:"Comenzar →", cta2:"Explorar Servicios", stat1:"Proyectos Entregados", stat2:"Precisión IA", stat3:"Soporte", stat4:"Calificación Clientes",
      //NEW Espanol Translations
    w0:"Impulsado por IA",w1:"Escalable",w2:"Moderno",w3:"Innovador"},
    about:{ label:"SOBRE NOSOTROS", h2a:"Donde la Tecnología", h2b:"se une a la Visión", p1:"Shuroq — que significa \"Amanecer\" en árabe — encarna nuestra creencia de que todo gran producto comienza con un nuevo amanecer audaz.", p2:"Desde startups hasta clientes empresariales, desarrollamos software que escala, rinde e inspira.", caps:"Capacidades Clave" },
    services:{ label:"QUÉ CONSTRUIMOS", h2a:"Nuestros", h2b:"Servicios", sub:"Soluciones digitales de extremo a extremo — desde plataformas de IA hasta apps móviles e infraestructura en la nube.", learnMore:"Saber más" },
    whyUs:{ label:"POR QUÉ SHUROQ", h2a:"Por Qué", h2b:"Elegirnos" },
    tech:{ label:"NUESTRO STACK", h2a:"Tecnologías que", h2b:"Dominamos" },
    portfolio:{ label:"NUESTRO TRABAJO", h2a:"Proyectos", h2b:"Destacados" },
    testimonials:{ label:"TESTIMONIOS", h2a:"Lo que dicen", h2b:"nuestros Clientes", h2c:"" },
    contact:{ label:"CONTÁCTANOS", h2a:"Inicia Tu", h2b:"Proyecto", sub:"¿Listo para construir algo extraordinario? Tu mensaje va directamente a nuestro WhatsApp.", email:"Email", whatsapp:"WhatsApp", response:"Tiempo de Respuesta", within:"Dentro de 24 horas", dashboard:"Panel en Vivo", name:"NOMBRE", emailL:"EMAIL", service:"SERVICIO", servicePH:"Seleccionar servicio...", message:"MENSAJE", msgPH:"Cuéntanos sobre tu proyecto...", send:"Enviar por WhatsApp", hint:"Envía por WhatsApp o escríbenos a contact@shuroq.com", successH:"¡Abriendo WhatsApp!", successP:"Tu mensaje está listo. Responderemos en 24 horas." },
    footer:{ tagline:"Empresa de ingeniería IA-first construyendo software inteligente y escalable para la próxima generación de negocios.", company:"Empresa", services:"Servicios", connect:"Conectar", copyright:"© 2025 Shuroq. Todos los derechos reservados.", tag:"Tecnología Redefinida ✦" },
  },
  it:{ 
    nav:{ home:"Home", about:"Chi Siamo", services:"Servizi", technologies:"Tecnologie", portfolio:"Portfolio", contact:"Contatti", cta:"Contattaci" }, 
    hero:{ badge:"AZIENDA DI INGEGNERIA AI-FIRST", h1a:"Costruire", h1b:"Soluzioni Digitali che Guidano la Crescita Aziendale", sub:"App IA · App Mobili · DevOps · Soluzioni Web · Automazione\nSviluppiamo software intelligente che cresce con la tua ambizione.", cta1:"Inizia →", cta2:"Scopri i Servizi", stat1:"Progetti Consegnati", stat2:"Precisione IA", stat3:"Supporto", stat4:"Valutazione Clienti",
      //NEW Italino Translations
    w0:"Alimentato da IA",w1:"Scalabile",w2:"Moderno",w3:"Innovativo"}, 
    about:{ label:"CHI SIAMO", h2a:"Dove la Tecnologia", h2b:"incontra la Visione", p1:"Shuroq — che significa \"Alba\" in arabo — incarna la nostra convinzione che ogni grande prodotto inizi con un nuovo audace inizio.", p2:"Dalle startup alle aziende enterprise, sviluppiamo software che scala, performa e ispira.", caps:"Competenze Chiave" }, 
    services:{ label:"COSA COSTRUIAMO", h2a:"I Nostri", h2b:"Servizi", sub:"Soluzioni digitali end-to-end — dalle piattaforme IA alle app mobili e infrastrutture cloud.", learnMore:"Scopri di più" }, 
    whyUs:{ label:"PERCHÉ SHUROQ", h2a:"Perché", h2b:"Sceglierci" }, 
    tech:{ label:"IL NOSTRO STACK", h2a:"Tecnologie che", h2b:"Padroneggiamo" }, 
    portfolio:{ label:"IL NOSTRO LAVORO", h2a:"Progetti", h2b:"in Evidenza" }, 
    testimonials:{ label:"TESTIMONIANZE", h2a:"Cosa dicono i", h2b:"nostri Clienti", h2c:"" }, 
    contact:{ label:"CONTATTACI", h2a:"Avvia il Tuo", h2b:"Progetto", sub:"Pronto a costruire qualcosa di straordinario? Il tuo messaggio va direttamente al nostro WhatsApp.", 
    email:"Email", whatsapp:"WhatsApp", response:"Tempo di Risposta", within:"Entro 24 ore", 
    dashboard:"Dashboard Live", name:"NOME", emailL:"EMAIL", service:"SERVIZIO", servicePH:"Seleziona un servizio...", 
    message:"MESSAGGIO", msgPH:"Raccontaci del tuo progetto...", send:"Invia via WhatsApp", hint:"Invia via WhatsApp o scrivici a contact@shuroq.com", 
    successH:"Apertura WhatsApp!", successP:"Il tuo messaggio è pronto. Risponderemo entro 24 ore." }, 
    footer:{ tagline:"Azienda di ingegneria AI-first che costruisce software intelligente per la prossima generazione di business.", 
    company:"Azienda", services:"Servizi", connect:"Connettiti", copyright:"© 2025 Shuroq. Tutti i diritti riservati.", 
    tag:"La Tech Ridefinita ✦" } 
  },
  pt:{ 
    nav:{ home:"Início", about:"Sobre Nós", services:"Serviços", technologies:"Tecnologias", portfolio:"Portfólio", contact:"Contato", cta:"Fale Conosco" }, 
    hero:{ badge:"EMPRESA DE ENGENHARIA IA-FIRST", h1a:"Construir", h1b:"Soluções Digitais que Impulsionam o Crescimento dos Negócios", sub:"Apps IA · Apps Mobile · DevOps · Soluções Web · Automação\nDesenvolvermos software inteligente que cresce com sua ambição.", cta1:"Começar →", cta2:"Explorar Serviços", stat1:"Projetos Entregues", stat2:"Precisão IA", stat3:"Suporte", stat4:"Avaliação Clientes",
      //NEW Portugese Translations
    w0:"Alimentado por IA",w1:"Escalável",w2:"Moderno",w3:"Inovador"}, 
    about:{ label:"SOBRE NÓS", h2a:"Onde a Tecnologia", h2b:"encontra a Visão", p1:"Shuroq — significando \"Nascer do Sol\" em árabe — incorpora nossa crença de que todo grande produto começa com um novo começo ousado.", p2:"De startups a clientes enterprise, desenvolvemos software que escala, performa e inspira.", caps:"Competências Principais" }, 
    services:{ label:"O QUE CONSTRUÍMOS", h2a:"Nossos", h2b:"Serviços", sub:"Soluções digitais end-to-end — de plataformas de IA a apps mobile e infraestrutura em nuvem.", learnMore:"Saiba mais" }, 
    whyUs:{ label:"POR QUE SHUROQ", h2a:"Por Que Nos", h2b:"Escolher" }, 
    tech:{ label:"NOSSA STACK", h2a:"Tecnologias que", h2b:"Dominamos" }, 
    portfolio:{ label:"NOSSO TRABALHO", h2a:"Projetos", h2b:"em Destaque" }, 
    testimonials:{ label:"DEPOIMENTOS", h2a:"O que nossos", h2b:"Clientes", h2c:"dizem" }, 
    contact:{ label:"ENTRE EM CONTATO", h2a:"Inicie Seu", h2b:"Projeto", sub:"Pronto para construir algo extraordinário? Sua mensagem vai direto para nosso WhatsApp.", email:"Email", whatsapp:"WhatsApp", response:"Tempo de Resposta", within:"Em até 24 horas", dashboard:"Painel ao Vivo", name:"NOME", emailL:"EMAIL", service:"SERVIÇO", servicePH:"Selecione um serviço...", message:"MENSAGEM", msgPH:"Fale-nos sobre seu projeto...", send:"Enviar via WhatsApp", hint:"Envie via WhatsApp ou por email para contact@shuroq.com", successH:"Abrindo WhatsApp!", successP:"Sua mensagem está pronta. Responderemos em 24h." }, 
    footer:{ tagline:"Empresa de engenharia IA-first construindo software inteligente para a próxima geração de negócios.", company:"Empresa", services:"Serviços", connect:"Conectar", copyright:"© 2025 Shuroq. Todos os direitos reservados.", tag:"Tech Redefinida ✦" } 
  },
  hi:{ 
    nav:{ home:"होम", about:"हमारे बारे में", services:"सेवाएं", technologies:"तकनीक", portfolio:"पोर्टफोलियो", contact:"संपर्क", cta:"संपर्क करें" }, 
    hero:{ badge:"AI-फर्स्ट इंजीनियरिंग कंपनी", h1a:"निर्माण करना", h1b:"डिजिटल समाधान जो व्यावसायिक वृद्धि को बढ़ावा देते हैं", sub:"AI ऐप्स · मोबाइल ऐप्स · DevOps · वेब सॉल्यूशन · ऑटोमेशन\nहम ऐसे बुद्धिमान सॉफ़्टवेयर बनाते हैं जो आपकी महत्वाकांक्षा के साथ बढ़ता है।", cta1:"शुरू करें →", cta2:"सेवाएं देखें", stat1:"परियोजनाएं पूर्ण", stat2:"AI सटीकता", stat3:"सहायता", stat4:"क्लाइंट रेटिंग",
      //NEW Hindi Translations
    w0:"AI-संचालित", w1:"स्केलेबल", w2:"आधुनिक",w3:"नवोन्मेषी"}, 
    about:{ label:"हमारे बारे में", h2a:"जहाँ प्रौद्योगिकी", h2b:"दृष्टि से मिलती है", p1:"शुरूक — अरबी में 'सूर्योदय' का अर्थ है। हम एक AI-फर्स्ट इंजीनियरिंग कंपनी हैं जो कल की डिजिटल बुनियाद बना रही है।", p2:"स्टार्टअप से लेकर एंटरप्राइज क्लाइंट तक, हम ऐसा सॉफ़्टवेयर बनाते हैं जो स्केल करता है।", caps:"मुख्य क्षमताएं" }, 
    services:{ label:"हम क्या बनाते हैं", h2a:"हमारी", h2b:"सेवाएं", sub:"AI प्लेटफ़ॉर्म से लेकर मोबाइल ऐप्स और क्लाउड इंफ्रास्ट्रक्चर तक।", learnMore:"और जानें" }, 
    whyUs:{ label:"क्यों शुरूक", h2a:"हमें क्यों", h2b:"चुनें" }, 
    tech:{ label:"हमारा स्टैक", h2a:"तकनीकें जो हम", h2b:"में माहिर हैं" }, 
    portfolio:{ label:"हमारा काम", h2a:"चुनिंदा", h2b:"परियोजनाएं" }, 
    testimonials:{ label:"प्रशंसापत्र", h2a:"हमारे", h2b:"क्लाइंट", h2c:"क्या कहते हैं" }, 
    contact:{ label:"संपर्क करें", h2a:"अपना", h2b:"प्रोजेक्ट शुरू करें", sub:"कुछ असाधारण बनाने के लिए तैयार हैं? आपका संदेश सीधे WhatsApp पर जाएगा।", email:"ईमेल", whatsapp:"WhatsApp", response:"प्रतिक्रिया समय", within:"24 घंटे के भीतर", dashboard:"लाइव डैशबोर्ड", name:"नाम", emailL:"ईमेल", service:"सेवा", servicePH:"सेवा चुनें...", message:"संदेश", msgPH:"अपने प्रोजेक्ट के बारे में बताएं...", send:"WhatsApp पर भेजें", hint:"WhatsApp पर भेजें या contact@shuroq.com पर ईमेल करें", successH:"WhatsApp खुल रहा है!", successP:"आपका संदेश तैयार है। हम 24 घंटे में जवाब देंगे।" }, 
    footer:{ tagline:"AI-फर्स्ट इंजीनियरिंग कंपनी जो अगली पीढ़ी के व्यवसायों के लिए बुद्धिमान सॉफ़्टवेयर बना रही है।", company:"कंपनी", services:"सेवाएं", connect:"जुड़ें", copyright:"© 2025 शुरूक. सर्वाधिकार सुरक्षित.", tag:"टेक रिडिफाइंड ✦" } 
  },
  ur:{ 
    nav:{ home:"ہوم", about:"ہمارے بارے میں", services:"خدمات", technologies:"ٹیکنالوجیز", portfolio:"پورٹ فولیو", contact:"رابطہ", cta:"رابطہ کریں" }, 
    hero:{ badge:"AI-فرسٹ انجینئرنگ کمپنی", h1a:"تیاری", h1b:"ڈیجیٹل حل جو کاروباری ترقی کو بڑھاتے ہیں", sub:"AI ایپس · موبائل ایپس · DevOps · ویب سلوشنز · آٹومیشن\nہم ذہین سافٹ ویئر بناتے ہیں جو آپ کے عزائم کے ساتھ بڑھتا ہے۔", cta1:"شروع کریں ←", cta2:"خدمات دیکھیں", stat1:"مکمل پروجیکٹس", stat2:"AI درستگی", stat3:"سپورٹ", stat4:"کلائنٹ ریٹنگ", 
      //NEW Translations
    w0:"AI سے چلنے والا", w1:"قابل توسیع", w2:"جدید", w3:"اختراعی"}, 
    about:{ label:"ہمارے بارے میں", h2a:"جہاں ٹیکنالوجی", h2b:"وژن سے ملتی ہے", p1:"شروق — عربی میں 'سورج طلوع' کا مطلب ہے۔ ہم ایک AI-فرسٹ انجینئرنگ کمپنی ہیں۔", p2:"اسٹارٹ اپس سے لے کر انٹرپرائز کلائنٹس تک، ہم ایسا سافٹ ویئر بناتے ہیں جو اسکیل کرتا ہے۔", caps:"بنیادی صلاحیتیں" }, 
    services:{ label:"ہم کیا بناتے ہیں", h2a:"ہماری", h2b:"خدمات", sub:"AI پلیٹ فارمز سے موبائل ایپس اور کلاؤڈ انفراسٹرکچر تک۔", learnMore:"مزید جانیں" }, 
    whyUs:{ label:"کیوں شروق", h2a:"ہمیں کیوں", h2b:"چنیں" }, 
    tech:{ label:"ہمارا اسٹیک", h2a:"ٹیکنالوجیز جن میں ہم", h2b:"ماہر ہیں" }, 
    portfolio:{ label:"ہمارا کام", h2a:"منتخب", h2b:"پروجیکٹس" }, 
    testimonials:{ label:"تاثرات", h2a:"ہمارے", h2b:"کلائنٹس", h2c:"کیا کہتے ہیں" }, 
    contact:{ label:"رابطہ کریں", h2a:"اپنا", h2b:"پروجیکٹ شروع کریں", sub:"کچھ غیر معمولی بنانے کے لیے تیار ہیں؟ آپ کا پیغام براہ راست WhatsApp پر جائے گا۔", email:"ای میل", whatsapp:"واٹس ایپ", response:"جواب دینے کا وقت", within:"24 گھنٹوں کے اندر", dashboard:"لائیو ڈیش بورڈ", name:"نام", emailL:"ای میل", service:"خدمت", servicePH:"خدمت منتخب کریں...", message:"پیغام", msgPH:"اپنے پروجیکٹ کے بارے میں بتائیں...", send:"WhatsApp پر بھیجیں", hint:"WhatsApp پر بھیجیں یا contact@shuroq.com پر ای میل کریں", successH:"!واٹس ایپ کھل رہا ہے", successP:"آپ کا پیغام تیار ہے۔ ہم 24 گھنٹوں میں جواب دیں گے۔" }, 
    footer:{ tagline:"AI-فرسٹ انجینئرنگ کمپنی جو اگلی نسل کے کاروبار کے لیے ذہین سافٹ ویئر بنا رہی ہے۔", company:"کمپنی", services:"خدمات", connect:"جڑیں", copyright:"© 2025 شروق. جملہ حقوق محفوظ ہیں۔", tag:"ٹیک ری ڈیفائنڈ ✦" } 
  },
  te:{ 
    nav:{ home:"హోమ్", about:"మా గురించి", services:"సేవలు", technologies:"సాంకేతికతలు", portfolio:"పోర్ట్‌ఫోలియో", contact:"సంప్రదించండి", cta:"సంప్రదించండి" }, 
    hero:{ badge:"AI-ఫస్ట్ ఇంజినీరింగ్ కంపెనీ", h1a:"నిర్మాణం", h1b:"ব్యాపార వృద్ధిని ప్రోత్సహించే డిజిటల్ సమాధానాలు", sub:"AI యాప్‌లు · మొబైల్ యాప్‌లు · DevOps · వెబ్ పరిష్కారాలు · ఆటోమేషన్", cta1:"ప్రారంభించండి →", cta2:"సేవలు అన్వేషించండి", stat1:"డెలివరీ చేసిన ప్రాజెక్టులు", stat2:"AI ఖచ్చితత్వం", stat3:"మద్దతు", stat4:"క్లయింట్ రేటింగ్",
      //New Translations
      w0:"AI-చోదిత", w1:"స్కేలేబుల్", w2:"ఆధునిక", w3:"ఆవిష్కారక"}, 
    about:{ label:"మా గురించి", h2a:"సాంకేతికత", h2b:"దృష్టితో కలుసుకుంటుంది", p1:"శురూక్ — అరబిక్‌లో 'సూర్యోదయం' అని అర్థం. మేము AI-ఫస్ట్ ఇంజినీరింగ్ కంపెనీ.", p2:"స్టార్టప్‌ల నుండి ఎంటర్‌ప్రైజ్ క్లయింట్‌ల వరకు, స్కేల్ అవుతుంది.", caps:"ముఖ్య సామర్థ్యాలు" }, 
    services:{ label:"మేము ఏమి నిర్మిస్తాము", h2a:"మా", h2b:"సేవలు", sub:"AI ప్లాట్‌ఫారమ్‌ల నుండి మొబైల్ యాప్‌లు మరియు క్లౌడ్ అవస్థాపన వరకు.", learnMore:"మరింత తెలుసుకోండి" }, 
    whyUs:{ label:"ఎందుకు శురూక్", h2a:"మమ్మల్ని", h2b:"ఎందుకు ఎంచుకోవాలి" }, 
    tech:{ label:"మా స్టాక్", h2a:"మేము నిష్ణాతులైన", h2b:"సాంకేతికతలు" }, 
    portfolio:{ label:"మా పని", h2a:"ప్రముఖ", h2b:"ప్రాజెక్టులు" }, 
    testimonials:{ label:"సాక్ష్యాలు", h2a:"మా క్లయింట్‌లు", h2b:"ఏమి చెప్తున్నారు", h2c:"" }, 
    contact:{ label:"సంప్రదించండి", h2a:"మీ ప్రాజెక్ట్", h2b:"ప్రారంభించండి", sub:"అసాధారణమైనది నిర్మించడానికి సిద్ధంగా ఉన్నారా?", email:"ఇమెయిల్", whatsapp:"WhatsApp", response:"స్పందన సమయం", within:"24 గంటల లోపు", dashboard:"లైవ్ డాష్‌బోర్డ్", name:"పేరు", emailL:"ఇమెయిల్", service:"సేవ", servicePH:"సేవ ఎంచుకోండి...", message:"సందేశం", msgPH:"మీ ప్రాజెక్ట్ గురించి చెప్పండి...", send:"WhatsApp ద్వారా పంపండి", hint:"WhatsApp ద్వారా పంపండి లేదా contact@shuroq.com కి ఇమెయిల్ చేయండి", successH:"WhatsApp తెరుచుకుంటోంది!", successP:"మీ సందేశం సిద్ధంగా ఉంది. మేము 24 గంటల్లో స్పందిస్తాము." }, 
    footer:{ tagline:"AI-ఫస్ట్ ఇంజినీరింగ్ కంపెనీ తదుపరి తరం వ్యాపారాల కోసం సాఫ్ట్‌వేర్ నిర్మిస్తోంది.", company:"కంపెనీ", services:"సేవలు", connect:"కనెక్ట్ అవ్వండి", copyright:"© 2025 శురూక్. అన్ని హక్కులు రిజర్వు చేయబడ్డాయి.", tag:"టెక్ రీడిఫైన్డ్ ✦" } 
  },
  ta:{ 
    nav:{ home:"முகப்பு", about:"எங்களை பற்றி", services:"சேவைகள்", technologies:"தொழில்நுட்பங்கள்", portfolio:"போர்ட்ஃபோலியோ", contact:"தொடர்பு", cta:"தொடர்பு கொள்ளுங்கள்" }, 
    hero:{ badge:"AI-ஃபர்ஸ்ட் இன்ஜினியரிங் நிறுவனம்", h1a:"கட்டுதல்", h1b:"வணிக வளர்ச்சியை உயர்த்தும் டிஜிட்டல் தீர்வுகள்", sub:"AI ஆப்கள் · மொபைல் ஆப்கள் · DevOps · வெப் தீர்வுகள் · ஆட்டோமேஷன்", cta1:"தொடங்குங்கள் →", cta2:"சேவைகளை ஆராயுங்கள்", stat1:"திட்டங்கள் முடிக்கப்பட்டன", stat2:"AI துல்லியம்", stat3:"ஆதரவு", stat4:"வாடிக்கையாளர் மதிப்பீடு",
     //New Translation
    w0:"AI-சக்தி வாய்ந்த", w1:"அளவிடக்கூடிய", w2:"நவீனம்", w3:"உদ்ভাவனம்"}, 
    about:{ label:"எங்களை பற்றி", h2a:"தொழில்நுட்பம்", h2b:"தொலைநோக்குடன் சந்திக்கும் இடம்", p1:"ஷுரூக் — அரபியில் 'சூரிய உதயம்' என்று பொருள். நாங்கள் AI-ஃபர்ஸ்ட் இன்ஜினியரிங் நிறுவனம்.", p2:"ஸ்டார்ட்-அப்கள் முதல் நிறுவன வாடிக்கையாளர்கள் வரை, சிறந்த மென்பொருளை வடிவமைக்கிறோம்.", caps:"முக்கிய திறன்கள்" }, 
    services:{ label:"நாங்கள் எதை உருவாக்குகிறோம்", h2a:"எங்கள்", h2b:"சேவைகள்", sub:"AI தளங்கள் முதல் மொபைல் ஆப்கள் மற்றும் கிளவுட் உள்கட்டமைப்பு வரை.", learnMore:"மேலும் அறிய" }, 
    whyUs:{ label:"ஏன் ஷுரூக்", h2a:"எங்களை ஏன்", h2b:"தேர்வு செய்யவேண்டும்" }, 
    tech:{ label:"எங்கள் ஸ்டாக்", h2a:"நாங்கள் தேர்ச்சி பெற்ற", h2b:"தொழில்நுட்பங்கள்" }, 
    portfolio:{ label:"எங்கள் வேலை", h2a:"சிறப்பு", h2b:"திட்டங்கள்" }, 
    testimonials:{ label:"சான்றுகள்", h2a:"வாடிக்கையாளர்கள்", h2b:"என்ன சொல்கிறார்கள்", h2c:"" }, 
    contact:{ label:"தொடர்பு கொள்ளுங்கள்", h2a:"உங்கள் திட்டத்தை", h2b:"தொடங்குங்கள்", sub:"அசாதாரணமான ஒன்றை உருவாக்க தயாரா?", email:"மின்னஞ்சல்", whatsapp:"WhatsApp", response:"பதில் நேரம்", within:"24 மணி நேரத்திற்குள்", dashboard:"நேரடி டாஷ்போர்டு", name:"பெயர்", emailL:"மின்னஞ்சல்", service:"சேவை", servicePH:"சேவையை தேர்ந்தெடுக்கவும்...", message:"செய்தி", msgPH:"உங்கள் திட்டத்தை பற்றி சொல்லுங்கள்...", send:"WhatsApp வழியாக அனுப்பவும்", hint:"WhatsApp வழியாக அனுப்பவும் அல்லது contact@shuroq.com க்கு மின்னஞ்சல் அனுப்பவும்", successH:"WhatsApp திறக்கிறது!", successP:"உங்கள் செய்தி தயாராக உள்ளது. 24 மணி நேரத்தில் பதிலளிப்போம்." }, footer:{ tagline:"AI-ஃபர்ஸ்ட் இன்ஜினியரிங் நிறுவனம் அடுத்த தலைமுறை வணிகங்களுக்கு மென்பொருளை உருவாக்குகிறது.", company:"நிறுவனம்", services:"சேவைகள்", connect:"இணைக்கவும்", copyright:"© 2025 ஷுரூக். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.", tag:"டெக் ரீடிஃபைண்ட் ✦" } 
  },
  kn:{ 
    nav:{ home:"ಮುಖ್ಯಪುಟ", about:"ನಮ್ಮ ಬಗ್ಗೆ", services:"ಸೇವೆಗಳು", technologies:"ತಂತ್ರಜ್ಞಾನಗಳು", portfolio:"ಪೋರ್ಟ್‌ಫೋಲಿಯೊ", contact:"ಸಂಪರ್ಕ", cta:"ಸಂಪರ್ಕಿಸಿ" }, 
    hero:{ badge:"AI-ಫರ್ಸ್ಟ್ ಎಂಜಿನಿಯರಿಂಗ್ ಕಂಪನಿ", h1a:"ನಿರ್ಮಾಣ", h1b:"ವ್ಯಾಪಾರ ಬೆಳವಣಿಗೆಯನ್ನು ಪ್ರೋತ್ಸಾಹಿಸುವ ಡಿಜಿಟಲ್ ಪರಿಹಾರಗಳು", sub:"AI ಅಪ್ಲಿಕೇಶನ್‌ಗಳು · ಮೊಬೈಲ್ ಅಪ್ಲಿಕೇಶನ್‌ಗಳು · DevOps · ವೆಬ್ ಪರಿಹಾರಗಳು", cta1:"ಪ್ರಾರಂಭಿಸಿ →", cta2:"ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ", stat1:"ನಿರ್ವಹಿಸಿದ ಯೋಜನೆಗಳು", stat2:"AI ನಿಖರತೆ", stat3:"ಬೆಂಬಲ", stat4:"ಕ್ಲೈಂಟ್ ರೇಟಿಂಗ್",
      //New Translation
    w0:"AI ಚಾಲಿತ", w1:"ಸ್ಕೇಲೆಬಲ್", w2:"ಆಧುನಿಕ", w3:"ಸೃಜನಶೀಲ"}, 
    about:{ label:"ನಮ್ಮ ಬಗ್ಗೆ", h2a:"ತಂತ್ರಜ್ಞಾನ", h2b:"ದೃಷ್ಟಿಕೋನದ ಮಿಲನ", p1:"ಶುರೂಕ್ — ಅರಬಿಕ್‌ನಲ್ಲಿ 'ಸೂರ್ಯೋದಯ'. ನಾವು AI-ಫರ್ಸ್ಟ್ ಎಂಜಿನಿಯರಿಂಗ್ ಕಂಪನಿ.", p2:"ಸ್ಟಾರ್ಟ್‌ಅಪ್‌ಗಳಿಂದ ಎಂಟರ್‌ಪ್ರೈಸ್ ಕ್ಲೈಂಟ್‌ಗಳವರೆಗೆ.", caps:"ಮುಖ್ಯ ಸಾಮರ್ಥ್ಯಗಳು" }, 
    services:{ label:"ನಾವು ಏನನ್ನು ನಿರ್ಮಿಸುತ್ತೇವೆ", h2a:"ನಮ್ಮ", h2b:"ಸೇವೆಗಳು", sub:"AI ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳಿಂದ ಮೊಬೈಲ್ ಅಪ್ಲಿಕೇಶನ್‌ಗಳ ವರೆಗೆ.", learnMore:"ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ" }, 
    whyUs:{ label:"ಏಕೆ ಶುರೂಕ್", h2a:"ನಮ್ಮನ್ನು ಏಕೆ", h2b:"ಆರಿಸಿಕೊಳ್ಳಬೇಕು" }, 
    tech:{ label:"ನಮ್ಮ ಸ್ಟಾಕ್", h2a:"ನಾವು ಪರಿಣತರಾಗಿರುವ", h2b:"ತಂತ್ರಜ್ಞಾನಗಳು" }, 
    portfolio:{ label:"ನಮ್ಮ ಕೆಲಸ", h2a:"ವೈಶಿಷ್ಟ್ಯದ", h2b:"ಯೋಜನೆಗಳು" }, 
    testimonials:{ label:"ಪ್ರಶಂಸಾಪತ್ರಗಳು", h2a:"ನಮ್ಮ ಕ್ಲೈಂಟ್‌ಗಳು", h2b:"ಏನು ಹೇಳುತ್ತಾರೆ", h2c:"" }, 
    contact:{ label:"ಸಂಪರ್ಕಿಸಿ", h2a:"ನಿಮ್ಮ ಯೋಜನೆ", h2b:"ಪ್ರಾರಂಭಿಸಿ", sub:"ಅಸಾಧಾರಣವಾದದ್ದನ್ನು ನಿರ್ಮಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?", email:"ಇಮೇಲ್", whatsapp:"WhatsApp", response:"ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ", within:"24 ಗಂಟೆಗಳ ಒಳಗೆ", dashboard:"ಲೈವ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", name:"ಹೆಸರು", emailL:"ಇಮೇಲ್", service:"ಸೇವೆ", servicePH:"ಸೇವೆ ಆಯ್ಕೆಮಾಡಿ...", message:"ಸಂದೇಶ", msgPH:"ನಿಮ್ಮ ಯೋಜನೆಯ ಬಗ್ಗೆ ಹೇಳಿ...", send:"WhatsApp ಮೂಲಕ ಕಳಿಸಿ", hint:"WhatsApp ಮೂಲಕ ಕಳಿಸಿ ಅಥವಾ contact@shuroq.com ಗೆ ಇಮೇಲ್ ಮಾಡಿ", successH:"WhatsApp ತೆರೆಯುತ್ತಿದೆ!", successP:"ನಿಮ್ಮ ಸಂದೇಶ ಸಿದ್ಧವಾಗಿದೆ. ನಾವು 24 ಗಂಟೆಗಳಲ್ಲಿ ಉತ್ತರಿಸುತ್ತೇವೆ." }, 
    footer:{ tagline:"AI-ಫರ್ಸ್ಟ್ ಎಂಜಿನಿಯರಿಂಗ್ ಕಂಪನಿ ಮುಂದಿನ ತಲೆಮಾರಿನ ವ್ಯಾಪಾರಗಳಿಗೆ ಸಾಫ್ಟ್‌ವೇರ್ ನಿರ್ಮಿಸುತ್ತಿದೆ.", company:"ಕಂಪನಿ", services:"ಸೇವೆಗಳು", connect:"ಸಂಪರ್ಕಿಸಿ", copyright:"© 2025 ಶುರೂಕ್. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.", tag:"ಟೆಕ್ ರೀಡಿಫೈನ್ಡ್ ✦" } 
  },
  ml:{ 
    nav:{ home:"ഹോം", about:"ഞങ്ങളെക്കുറിച്ച്", services:"സേവനങ്ങൾ", technologies:"സാങ്കേതികത", portfolio:"പോർട്ട്‌ഫോളിയോ", contact:"ബന്ധപ്പെടുക", cta:"ബന്ധപ്പെടുക" }, 
    hero:{ badge:"AI-ഫസ്റ്റ് എഞ്ചിനീയറിംഗ് കമ്പനി", h1a:"നിർമ്മാണം", h1b:"ബിസിനസ് വളർച്ചയെ ത്വരിതപ്പെടുത്തുന്ന ഡിജിറ്റൽ സമാധാനങ്ങൾ", sub:"AI ആപ്പുകൾ · മൊബൈൽ ആപ്പുകൾ · DevOps · വെബ് പരിഹാരങ്ങൾ", cta1:"ആരംഭിക്കൂ →", cta2:"സേവനങ്ങൾ കാണൂ", stat1:"പ്രോജക്ടുകൾ പൂർത്തിയാക്കി", stat2:"AI കൃത്യത", stat3:"പിന്തുണ", stat4:"ക്ലൈന്റ് റേറ്റിംഗ്",
      //NEW Translation 
    w0:"AI-നിർദ്ദേശ", w1:"സ്കെയിലബിൾ", w2:"ആധുനിക", w3:"ആധുനിക"}, 
   about:{ label:"ഞങ്ങളെക്കുറിച്ച്", h2a:"സാങ്കേതികത", h2b:"കാഴ്ചപ്പാടുമായി കൂടിക്കലരുന്നിടം", p1:"ഷുരൂക് — അറബിയിൽ 'സൂര്യോദയം'. ഞങ്ങൾ ഒരു AI-ഫസ്റ്റ് എഞ്ചിനീയറിംഗ് കമ്പനിയാണ്.", p2:"സ്റ്റാർട്ടപ്പുകൾ മുതൽ എന്റർപ്രൈസ് ക്ലൈന്റുകൾ വരെ.", caps:"പ്രധാന കഴിവുകൾ" }, services:{ label:"ഞങ്ങൾ എന്ത് നിർമ്മിക്കുന്നു", h2a:"ഞങ്ങളുടെ", h2b:"സേവനങ്ങൾ", sub:"AI പ്ലാറ്റ്‌ഫോമുകൾ മുതൽ മൊബൈൽ ആപ്പുകൾ വരെ.", learnMore:"കൂടുതൽ അറിയൂ" }, 
   whyUs:{ label:"എന്തുകൊണ്ട് ഷുരൂക്", h2a:"ഞങ്ങളെ എന്തുകൊണ്ട്", h2b:"തിരഞ്ഞെടുക്കണം" }, 
   tech:{ label:"ഞങ്ങളുടെ സ്റ്റാക്ക്", h2a:"ഞങ്ങൾ വൈദഗ്ദ്ധ്യം നേടിയ", h2b:"സാങ്കേതികതകൾ" }, 
   portfolio:{ label:"ഞങ്ങളുടെ ജോലി", h2a:"ഫീച്ചർ ചെയ്ത", h2b:"പ്രോജക്ടുകൾ" }, 
   testimonials:{ label:"സാക്ഷ്യങ്ങൾ", h2a:"ഞങ്ങളുടെ ക്ലൈന്റുകൾ", h2b:"എന്ത് പറയുന്നു", h2c:"" }, 
   contact:{ label:"ബന്ധപ്പെടുക", h2a:"നിങ്ങളുടെ പ്രോജക്ട്", h2b:"ആരംഭിക്കൂ", sub:"അസാധാരണമായ എന്തെങ്കിലും നിർമ്മിക്കാൻ തയ്യാറാണോ?", email:"ഇമെയിൽ", whatsapp:"WhatsApp", response:"പ്രതികരണ സമയം", within:"24 മണിക്കൂറിനുള്ളിൽ", dashboard:"ലൈവ് ഡാഷ്‌ബോർഡ്", name:"പേര്", emailL:"ഇമെയിൽ", service:"സേവനം", servicePH:"ഒരു സേവനം തിരഞ്ഞെടുക്കൂ...", message:"സന്ദേശം", msgPH:"നിങ്ങളുടെ പ്രോജക്ടിനെക്കുറിച്ച് പറയൂ...", send:"WhatsApp വഴി അയയ്‌ക്കൂ", hint:"WhatsApp വഴി അയയ്‌ക്കൂ അല്ലെങ്കിൽ contact@shuroq.com ൽ ഇമെയിൽ ചെയ്യൂ", successH:"WhatsApp തുറക്കുന്നു!", successP:"നിങ്ങളുടെ സന്ദേശം തയ്യാറാണ്. 24 മണിക്കൂറിൽ മറുപടി നൽകും." }, 
   footer:{ tagline:"AI-ഫസ്റ്റ് എഞ്ചിനീയറിംഗ് കമ്പനി അടുത്ത തലമുറ ബിസിനസ്സുകൾക്ക് സോഫ്‌റ്റ്‌വെയർ നിർമ്മിക്കുന്നു.", company:"കമ്പനി", services:"സേവനങ്ങൾ", connect:"ബന്ധപ്പെടൂ", copyright:"© 2025 ഷുരൂക്. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.", tag:"ടെക് റീഡിഫൈൻഡ് ✦" } 
  },
  bn:{ 
    nav:{ home:"হোম", about:"আমাদের সম্পর্কে", services:"সেবাসমূহ", technologies:"প্রযুক্তি", portfolio:"পোর্টফোলিও", contact:"যোগাযোগ", cta:"যোগাযোগ করুন" }, 
    hero:{ badge:"AI-ফার্স্ট ইঞ্জিনিয়ারিং কোম্পানি", h1a:"নির্মাণ", h1b:"ব্যবসায়িক বৃদ্ধি চালিত করে এমন ডিজিটাল সমাধান", sub:"AI অ্যাপ · মোবাইল অ্যাপ · DevOps · ওয়েব সমাধান · অটোমেশন", cta1:"শুরু করুন →", cta2:"সেবা অন্বেষণ করুন", stat1:"প্রকল্প সম্পন্ন", stat2:"AI নির্ভুলতা", stat3:"সহায়তা", stat4:"ক্লায়েন্ট রেটিং",
      //New Translations
    w0:"AI-চালিত", w1:"স্কেলেবল", w2:"আধুনিক", w3:"উদ্ভাবনী"}, 
    about:{ label:"আমাদের সম্পর্কে", h2a:"যেখানে প্রযুক্তি", h2b:"দৃষ্টিভঙ্গির সাথে মিলিত হয়", p1:"শুরূক — আরবিতে 'সূর্যোদয়' অর্থ। আমরা একটি AI-ফার্স্ট ইঞ্জিনিয়ারিং কোম্পানি।", p2:"স্টার্টআপ থেকে এন্টারপ্রাইজ ক্লায়েন্ট পর্যন্ত, আমরা সফটওয়্যার তৈরি করি।", caps:"মূল সক্ষমতা" }, 
    services:{ label:"আমরা কী তৈরি করি", h2a:"আমাদের", h2b:"সেবাসমূহ", sub:"AI প্ল্যাটফর্ম থেকে মোবাইল অ্যাপ ও ক্লাউড অবকাঠামো পর্যন্ত।", learnMore:"আরও জানুন" }, 
    whyUs:{ label:"কেন শুরূক", h2a:"আমাদের কেন", h2b:"বেছে নেবেন" }, 
    tech:{ label:"আমাদের স্ট্যাক", h2a:"আমরা যে প্রযুক্তিতে", h2b:"দক্ষ" }, 
    portfolio:{ label:"আমাদের কাজ", h2a:"বিশেষ", h2b:"প্রকল্পসমূহ" }, 
    testimonials:{ label:"প্রশংসাপত্র", h2a:"আমাদের ক্লায়েন্টরা", h2b:"কী বলছেন", h2c:"" }, 
    contact:{ label:"যোগাযোগ করুন", h2a:"আপনার প্রকল্প", h2b:"শুরু করুন", sub:"অসাধারণ কিছু তৈরি করতে প্রস্তুত?", email:"ইমেইল", whatsapp:"WhatsApp", response:"প্রতিক্রিয়া সময়", within:"২৪ ঘন্টার মধ্যে", dashboard:"লাইভ ড্যাশবোর্ড", name:"নাম", emailL:"ইমেইল", service:"সেবা", servicePH:"একটি সেবা নির্বাচন করুন...", message:"বার্তা", msgPH:"আপনার প্রকল্প সম্পর্কে বলুন...", send:"WhatsApp এ পাঠান", hint:"WhatsApp-এ পাঠান অথবা contact@shuroq.com এ ইমেইল করুন", successH:"WhatsApp খুলছে!", successP:"আপনার বার্তা প্রস্তুত। ২৪ ঘন্টার মধ্যে উত্তর দেব।" }, 
    footer:{ tagline:"AI-ফার্স্ট ইঞ্জিনিয়ারিং কোম্পানি পরবর্তী প্রজন্মের ব্যবসার জন্য সফটওয্যার তৈরি করছে।", company:"কোম্পানি", services:"সেবাসমূহ", connect:"সংযুক্ত হন", copyright:"© ২০২৫ শুরূক. সর্বস্বত্ব সংরক্ষিত।", tag:"টেক রিডিফাইন্ড ✦" } 
  },
  zh:{ 
    nav:{ home:"首页", about:"关于我们", services:"服务", technologies:"技术", portfolio:"作品集", contact:"联系", cta:"联系我们" }, 
    hero:{ badge:"AI优先工程公司", h1a:"构建", h1b:"驱动业务增长的数字解决方案", sub:"AI应用 · 移动应用 · DevOps · Web解决方案 · 自动化\n我们构建随您雄心壮志成长的智能软件。", cta1:"开始 →", cta2:"探索服务", stat1:"交付项目", stat2:"AI准确率", stat3:"支持", stat4:"客户评分",
      //New Translation
      w0:"AI驱动",w1:"可扩展",w2:"现代化",w3:"创新"}, 
      about:{ label:"关于我们", h2a:"科技与", h2b:"愿景相遇之处", p1:"Shuroq——阿拉伯语意为\"日出\"——体现了我们的信念：每一个伟大的产品都始于勇敢的新开始。我们是一家AI优先工程公司。", p2:"从初创企业到企业客户，我们构建能够扩展、高效运行并激发灵感的软件。", caps:"核心能力" }, 
      services:{ label:"我们构建什么", h2a:"我们的", h2b:"服务", sub:"端到端数字解决方案——从AI平台到移动应用和云基础设施。", learnMore:"了解更多" }, 
      whyUs:{ label:"为何选择Shuroq", h2a:"为何", h2b:"选择我们" }, 
      tech:{ label:"我们的技术栈", h2a:"我们精通的", h2b:"技术" }, 
      portfolio:{ label:"我们的工作", h2a:"精选", h2b:"项目" }, 
      testimonials:{ label:"客户评价", h2a:"客户们", h2b:"怎么说", h2c:"" }, contact:{ label:"联系我们", h2a:"启动您的", h2b:"项目", sub:"准备好构建非凡之作了吗？您的消息将直接发送到我们的WhatsApp。", email:"邮箱", whatsapp:"WhatsApp", response:"响应时间", within:"24小时内", dashboard:"实时仪表板", name:"姓名", emailL:"邮箱", service:"服务", servicePH:"选择服务...", message:"消息", msgPH:"请告诉我们您的项目...", send:"通过WhatsApp发送", hint:"通过WhatsApp发送或发送邮件至 contact@shuroq.com", successH:"正在打开WhatsApp！", successP:"您的消息已就绪。我们将在24小时内回复。" }, 
      footer:{ tagline:"AI优先工程公司，为下一代企业构建智能、可扩展的精美软件。", company:"公司", services:"服务", connect:"联系我们", copyright:"© 2025 Shuroq. 保留所有权利。", tag:"科技重新定义 ✦" } 
    },
  ja:{ 
    nav:{ home:"ホーム", about:"会社概要", services:"サービス", technologies:"テクノロジー", portfolio:"ポートフォリオ", contact:"お問い合わせ", cta:"お問い合わせ" }, 
    hero:{ badge:"AIファーストエンジニアリング企業", h1a:"構築する", h1b:"ビジネス成長を促進するデジタルソリューション", sub:"AIアプリ · モバイルアプリ · DevOps · Webソリューション · 自動化\n私たちはあなたの野望とともに成長するインテリジェントなソフトウェアを構築します。", cta1:"始める →", cta2:"サービスを見る", stat1:"納品プロジェクト", stat2:"AI精度", stat3:"サポート", stat4:"クライアント評価",
      //New Translation
      w0:"AI駆動", w1:"スケーラブルな", w2:"モダンな", w3:"革新的な"}, 
    about:{ label:"会社概要", h2a:"テクノロジーが", h2b:"ビジョンと出会う場所", p1:"Shuroq（シュルーク）——アラビア語で「日の出」を意味します。私たちはAIファーストのエンジニアリング企業です。", p2:"スタートアップから大企業まで、スケールし、高パフォーマンスで、インスピレーションを与えるソフトウェアを構築します。", caps:"コアコンピテンシー" }, 
    services:{ label:"私たちが構築するもの", h2a:"私たちの", h2b:"サービス", sub:"AIプラットフォームからモバイルアプリ、クラウドインフラまでのエンドツーエンドのデジタルソリューション。", learnMore:"詳細を見る" }, 
    whyUs:{ label:"なぜShuroqか", h2a:"私たちを選ぶ", h2b:"理由" }, 
    tech:{ label:"私たちのスタック", h2a:"私たちが精通する", h2b:"テクノロジー" }, 
    portfolio:{ label:"私たちの実績", h2a:"注目の", h2b:"プロジェクト" }, 
    testimonials:{ label:"お客様の声", h2a:"クライアントの", h2b:"声", h2c:"" }, 
    contact:{ label:"お問い合わせ", h2a:"プロジェクトを", h2b:"始めましょう", sub:"素晴らしいものを作る準備はできていますか？メッセージは直接WhatsAppに届きます。", email:"メール", whatsapp:"WhatsApp", response:"応答時間", within:"24時間以内", dashboard:"ライブダッシュボード", name:"お名前", emailL:"メール", service:"サービス", servicePH:"サービスを選択...", message:"メッセージ", msgPH:"プロジェクトについて教えてください...", send:"WhatsAppで送る", hint:"WhatsAppで送るか contact@shuroq.com にメールでご連絡ください", successH:"WhatsAppを開いています！", successP:"メッセージの準備ができました。24時間以内に返信します。" }, 
    footer:{ tagline:"AIファーストのエンジニアリング企業として、次世代ビジネスのためのインテリジェントなソフトウェアを構築しています。", company:"会社", services:"サービス", connect:"つながる", copyright:"© 2025 Shuroq. 全著作権所有。", tag:"テックを再定義 ✦" } 
  },
  ru:{ 
    nav:{ home:"Главная", about:"О нас", services:"Услуги", technologies:"Технологии", portfolio:"Портфолио", contact:"Контакты", cta:"Связаться" }, 
    hero:{ badge:"ИНЖИНИРИНГОВАЯ КОМПАНИЯ AI-FIRST", h1a:"Создание", h1b:"Цифровые решения, которые ускоряют рост вашего бизнеса", sub:"ИИ-приложения · Мобильные приложения · DevOps · Веб-решения · Автоматизация\nМы создаём интеллектуальное ПО, которое растёт вместе с вашими амбициями.", cta1:"Начать →", cta2:"Смотреть услуги", stat1:"Проектов выполнено", stat2:"Точность ИИ", stat3:"Поддержка", stat4:"Рейтинг клиентов",
      //New Translation
     w0:"ИИ-приводимый", w1:"Масштабируемый", w2:"Современный",w3:"Инновационный"},
    about:{ label:"О НАС", h2a:"Где технологии", h2b:"встречаются с видением", p1:"Shuroq — в переводе с арабского «Восход солнца» — воплощает нашу убеждённость в том, что каждый великий продукт начинается с нового смелого рассвета.", p2:"От стартапов до корпоративных клиентов — мы разрабатываем ПО, которое масштабируется.", caps:"Ключевые компетенции" }, 
    services:{ label:"ЧТО МЫ СОЗДАЁМ", h2a:"Наши", h2b:"Услуги", sub:"Комплексные цифровые решения — от ИИ-платформ до мобильных приложений и облачной инфраструктуры.", learnMore:"Узнать больше" }, 
    whyUs:{ label:"ПОЧЕМУ SHUROQ", h2a:"Почему выбирают", h2b:"нас" }, 
    tech:{ label:"НАШ СТЕК", h2a:"Технологии которыми", h2b:"мы владеем" }, 
    portfolio:{ label:"НАШИ РАБОТЫ", h2a:"Избранные", h2b:"Проекты" }, 
    testimonials:{ label:"ОТЗЫВЫ", h2a:"Что говорят", h2b:"наши клиенты", h2c:"" }, 
    contact:{ label:"СВЯЗАТЬСЯ С НАМИ", h2a:"Начните свой", h2b:"Проект", sub:"Готовы создать что-то выдающееся? Ваше сообщение придёт прямо в WhatsApp.", email:"Email", whatsapp:"WhatsApp", response:"Время ответа", within:"В течение 24 часов", dashboard:"Панель в реальном времени", name:"ИМЯ", emailL:"EMAIL", service:"УСЛУГА", servicePH:"Выбрать услугу...", message:"СООБЩЕНИЕ", msgPH:"Расскажите о вашем проекте...", send:"Отправить через WhatsApp", hint:"Отправьте через WhatsApp или напишите на contact@shuroq.com", successH:"Открывается WhatsApp!", successP:"Ваше сообщение готово. Мы ответим в течение 24 часов." }, 
    footer:{ tagline:"Инжиниринговая компания AI-first, создающая интеллектуальное масштабируемое ПО для бизнеса следующего поколения.", company:"Компания", services:"Услуги", connect:"Связаться", copyright:"© 2025 Shuroq. Все права защищены.", tag:"Технологии переосмыслены ✦" } },
};

// fallback to English for any missing keys
function t(lang, section, key) {
  return T[lang]?.[section]?.[key] ?? T.en[section]?.[key] ?? key;
}
// ── Extended translations (TX) ───────────────────────────────────────────────
const TX = {
  en:{
    services:{s0t:"AI Application Development",s0d:"Custom LLM-powered apps, computer vision, and predictive systems built for real business impact.",s1t:"Android App Development",s1d:"Native and cross-platform Android apps engineered for performance and seamless UX.",s2t:"iOS App Development",s2d:"Premium iOS applications crafted to Apple's exacting design and engineering standards.",s3t:"Web Application Development",s3d:"Scalable full-stack platforms with modern React, Node.js, and cloud-native architecture.",s4t:"Static Website Development",s4d:"Lightning-fast, SEO-optimised sites with conversion-focused design and zero bloat.",s5t:"Chatbot Development",s5d:"Conversational AI that engages, qualifies, and converts users at scale.",s6t:"E-Commerce Development",s6d:"High-converting storefronts with smart product discovery and seamless checkout flows.",s7t:"Automation Solutions",s7d:"Workflow engines and RPA that eliminate repetitive work at enterprise scale.",s8t:"Software Testing & Integration",s8d:"Unit, integration, E2E, and performance testing for bulletproof software.",s9t:"Enterprise Application Development",s9d:"Mission-critical enterprise platforms built for security, scale, and compliance.",s10t:"DevOps Services",s10d:"CI/CD pipelines, Docker, Kubernetes, cloud automation and monitoring solutions.",mPrj:"DEMO PROJECTS",mBen:"BUSINESS BENEFITS",mApp:"DEVELOPMENT APPROACH",mQuote:"Get a Quote for"},
    whyUs:{p0t:"AI-Driven Development",p0d:"Intelligence baked into every layer",p1t:"Fast Delivery",p1d:"From concept to production in weeks",p2t:"Scalable Architecture",p2d:"Built to grow without friction",p3t:"Innovation Focus",p3d:"Ahead of the technology curve",p4t:"Startup-Friendly Pricing",p4d:"Enterprise quality, accessible rates",p5t:"Enterprise Security",p5d:"SOC-grade standards as a baseline"},
    stats:{s0:"Projects Delivered",s1:"Happy Clients",s2:"Technologies",s3:"Avg Rating"},
    pfol:{p0c:"AI Platform",p0d:"Enterprise analytics with natural-language querying and live data pipelines.",p1c:"Mobile App",p1d:"Cross-platform health & fitness app with AI coaching and biometric sync.",p2c:"E-Commerce",p2d:"Premium fashion storefront with AR try-on and smart personalisation engine.",p3c:"SaaS Platform",p3d:"No-code workflow automation SaaS deployed by 500+ teams worldwide.",p4c:"DevOps",p4d:"Kubernetes cost-optimisation and observability platform for cloud-native teams.",p5c:"Web App",p5d:"Enterprise HR portal handling 10,000 daily active users across 5 countries."},
    sup:{greet:"How can Shuroq help you today?",o0:"💼 Sales Support",o1:"👥 HR Enquiries",o2:"🚀 Project Consultation",o3:"🌐 Website Development",o4:"📱 Mobile App Development",o5:"🎧 Client Support"},
  },
  ar:{
    services:{s0t:"تطوير تطبيقات الذكاء الاصطناعي",s0d:"تطبيقات مخصصة مدعومة بنماذج اللغة الكبيرة ورؤية الحاسوب والأنظمة التنبؤية.",s1t:"تطوير تطبيقات أندرويد",s1d:"تطبيقات أندرويد أصيلة ومتعددة المنصات مصممة للأداء العالي وتجربة مستخدم سلسة.",s2t:"تطوير تطبيقات iOS",s2d:"تطبيقات iOS متميزة مصممة وفق معايير أبل الصارمة.",s3t:"تطوير تطبيقات الويب",s3d:"منصات full-stack قابلة للتوسع باستخدام React وNode.js والبنية السحابية.",s4t:"تطوير المواقع الثابتة",s4d:"مواقع سريعة ومحسّنة لمحركات البحث مع تصميم يركز على التحويل.",s5t:"تطوير روبوتات المحادثة",s5d:"ذكاء اصطناعي للمحادثة يشارك المستخدمين ويحولهم على نطاق واسع.",s6t:"تطوير التجارة الإلكترونية",s6d:"متاجر عالية التحويل مع اكتشاف المنتجات الذكي وإتمام الشراء بسلاسة.",s7t:"حلول الأتمتة",s7d:"محركات سير العمل وRPA التي تزيل العمل المتكرر على مستوى المؤسسة.",s8t:"اختبار البرمجيات والتكامل",s8d:"اختبارات الوحدة والتكامل والأداء لبرمجيات محكمة.",s9t:"تطوير تطبيقات المؤسسات",s9d:"منصات مؤسسية حيوية مبنية للأمان والتوسع والامتثال.",s10t:"خدمات DevOps",s10d:"خطوط CI/CD وDocker وKubernetes وأتمتة السحابة والمراقبة.",mPrj:"مشاريع تجريبية",mBen:"فوائد العمل",mApp:"نهج التطوير",mQuote:"احصل على عرض لـ"},
    whyUs:{p0t:"تطوير مدفوع بالذكاء الاصطناعي",p0d:"الذكاء مدمج في كل طبقة",p1t:"تسليم سريع",p1d:"من الفكرة إلى الإنتاج في أسابيع",p2t:"بنية قابلة للتوسع",p2d:"مبنية للنمو دون احتكاك",p3t:"التركيز على الابتكار",p3d:"في طليعة منحنى التكنولوجيا",p4t:"أسعار مناسبة للشركات الناشئة",p4d:"جودة المؤسسات بأسعار متاحة",p5t:"أمان على مستوى المؤسسة",p5d:"معايير SOC كخط أساس"},
    stats:{s0:"مشروع منجز",s1:"عملاء سعداء",s2:"تقنيات",s3:"متوسط التقييم"},
    pfol:{p0c:"منصة ذكاء اصطناعي",p0d:"تحليلات مؤسسية مع استعلام باللغة الطبيعية وخطوط بيانات مباشرة.",p1c:"تطبيق جوال",p1d:"تطبيق صحة ولياقة متعدد المنصات مع تدريب ذكاء اصطناعي.",p2c:"تجارة إلكترونية",p2d:"متجر أزياء متميز مع تجربة AR وتخصيص ذكي.",p3c:"منصة SaaS",p3d:"أتمتة سير العمل بدون كود مستخدمة من قبل 500+ فريق.",p4c:"DevOps",p4d:"منصة تحسين تكاليف Kubernetes للفرق السحابية.",p5c:"تطبيق ويب",p5d:"بوابة موارد بشرية للمؤسسات تخدم 10,000 مستخدم يومياً."},
    sup:{greet:"كيف يمكن لشروق مساعدتك اليوم؟",o0:"💼 دعم المبيعات",o1:"👥 استفسارات الموارد البشرية",o2:"🚀 استشارة المشروع",o3:"🌐 تطوير المواقع",o4:"📱 تطوير تطبيقات الجوال",o5:"🎧 دعم العملاء"},
  },
  fr:{
    services:{s0t:"Développement d'Applications IA",s0d:"Applications LLM sur mesure, vision par ordinateur et systèmes prédictifs pour un impact business réel.",s1t:"Développement Apps Android",s1d:"Applications Android natives et cross-platform pour performance et UX fluide.",s2t:"Développement Apps iOS",s2d:"Applications iOS premium selon les standards exigeants d'Apple.",s3t:"Développement Applications Web",s3d:"Plateformes full-stack scalables avec React, Node.js et architecture cloud-native.",s4t:"Développement Sites Statiques",s4d:"Sites ultra-rapides et SEO-optimisés avec design orienté conversion.",s5t:"Développement de Chatbots",s5d:"IA conversationnelle qui engage, qualifie et convertit à grande échelle.",s6t:"Développement E-Commerce",s6d:"Boutiques à fort taux de conversion avec découverte intelligente et paiement fluide.",s7t:"Solutions d'Automatisation",s7d:"Moteurs de workflow et RPA éliminant le travail répétitif.",s8t:"Tests Logiciels & Intégration",s8d:"Tests unitaires, d'intégration, E2E et performance pour un logiciel sans failles.",s9t:"Développement Applications Enterprise",s9d:"Plateformes enterprise critiques pour la sécurité, l'échelle et la conformité.",s10t:"Services DevOps",s10d:"Pipelines CI/CD, Docker, Kubernetes, automatisation cloud et monitoring.",mPrj:"PROJETS DÉMO",mBen:"AVANTAGES MÉTIER",mApp:"APPROCHE DE DÉVELOPPEMENT",mQuote:"Obtenir un Devis pour"},
    whyUs:{p0t:"Développement Piloté par l'IA",p0d:"Intelligence intégrée à chaque couche",p1t:"Livraison Rapide",p1d:"Du concept à la production en semaines",p2t:"Architecture Scalable",p2d:"Conçue pour croître sans friction",p3t:"Focus Innovation",p3d:"En avance sur la courbe technologique",p4t:"Tarifs Startup-Friendly",p4d:"Qualité enterprise, tarifs accessibles",p5t:"Sécurité Enterprise",p5d:"Standards SOC comme base de référence"},
    stats:{s0:"Projets Livrés",s1:"Clients Satisfaits",s2:"Technologies",s3:"Note Moy."},
    pfol:{p0c:"Plateforme IA",p0d:"Analytique enterprise avec requêtes en langage naturel et pipelines de données en direct.",p1c:"App Mobile",p1d:"App santé & fitness cross-platform avec coaching IA et synchronisation biométrique.",p2c:"E-Commerce",p2d:"Boutique de mode premium avec essayage AR et moteur de personnalisation intelligent.",p3c:"SaaS Platform",p3d:"SaaS d'automatisation no-code déployé par 500+ équipes dans le monde.",p4c:"DevOps",p4d:"Plateforme d'optimisation des coûts Kubernetes pour équipes cloud-native.",p5c:"App Web",p5d:"Portail RH enterprise gérant 10 000 utilisateurs actifs dans 5 pays."},
    sup:{greet:"Comment Shuroq peut-il vous aider aujourd'hui ?",o0:"💼 Support Commercial",o1:"👥 Ressources Humaines",o2:"🚀 Consultation Projet",o3:"🌐 Développement Web",o4:"📱 Apps Mobiles",o5:"🎧 Support Client"},
  },
  de:{
    services:{s0t:"KI-Anwendungsentwicklung",s0d:"Maßgeschneiderte LLM-Apps, Computer Vision und Vorhersagesysteme für echten Geschäftsnutzen.",s1t:"Android-App-Entwicklung",s1d:"Native und Cross-Platform-Android-Apps für Performance und nahtlose UX.",s2t:"iOS-App-Entwicklung",s2d:"Premium-iOS-Anwendungen nach Apples hohen Design- und Engineering-Standards.",s3t:"Web-Anwendungsentwicklung",s3d:"Skalierbare Full-Stack-Plattformen mit React, Node.js und Cloud-nativer Architektur.",s4t:"Statische Website-Entwicklung",s4d:"Blitzschnelle, SEO-optimierte Websites mit konversionsorientierten Designs.",s5t:"Chatbot-Entwicklung",s5d:"Konversationelle KI, die Nutzer einbindet, qualifiziert und konvertiert.",s6t:"E-Commerce-Entwicklung",s6d:"Hochkonvertierende Shops mit intelligenter Produktsuche und reibungslosem Checkout.",s7t:"Automatisierungslösungen",s7d:"Workflow-Engines und RPA, die repetitive Arbeit im Enterprise-Maßstab eliminieren.",s8t:"Software-Tests & Integration",s8d:"Unit-, Integrations-, E2E- und Performance-Tests für ausfallsichere Software.",s9t:"Enterprise-Anwendungsentwicklung",s9d:"Geschäftskritische Enterprise-Plattformen für Sicherheit, Skalierung und Compliance.",s10t:"DevOps-Dienste",s10d:"CI/CD-Pipelines, Docker, Kubernetes, Cloud-Automatisierung und Monitoring.",mPrj:"DEMO-PROJEKTE",mBen:"GESCHÄFTLICHE VORTEILE",mApp:"ENTWICKLUNGSANSATZ",mQuote:"Angebot für"},
    whyUs:{p0t:"KI-gesteuertes Engineering",p0d:"Intelligenz in jeder Schicht verankert",p1t:"Schnelle Lieferung",p1d:"Vom Konzept zur Produktion in Wochen",p2t:"Skalierbare Architektur",p2d:"Gebaut für reibungsloses Wachstum",p3t:"Innovationsfokus",p3d:"Immer einen Schritt voraus",p4t:"Startup-freundliche Preise",p4d:"Enterprise-Qualität, zugängliche Preise",p5t:"Enterprise-Sicherheit",p5d:"SOC-Standards als Grundlage"},
    stats:{s0:"Gelieferte Projekte",s1:"Zufriedene Kunden",s2:"Technologien",s3:"Ø Bewertung"},
    pfol:{p0c:"KI-Plattform",p0d:"Enterprise-Analyse mit natürlichsprachigen Abfragen und Live-Datenpipelines.",p1c:"Mobile App",p1d:"Cross-Platform Gesundheits-App mit KI-Coaching und biometrischer Synchronisation.",p2c:"E-Commerce",p2d:"Premium-Modeshop mit AR-Anprobe und intelligentem Personalisierungs-Engine.",p3c:"SaaS-Plattform",p3d:"No-Code-Workflow-Automatisierung, eingesetzt von 500+ Teams weltweit.",p4c:"DevOps",p4d:"Kubernetes-Kostenoptimierung und Observability-Plattform für Cloud-native Teams.",p5c:"Web-App",p5d:"Enterprise-HR-Portal mit 10.000 täglichen Nutzern in 5 Ländern."},
    sup:{greet:"Wie kann Shuroq Ihnen heute helfen?",o0:"💼 Vertriebssupport",o1:"👥 HR-Anfragen",o2:"🚀 Projektberatung",o3:"🌐 Website-Entwicklung",o4:"📱 Mobile App-Entwicklung",o5:"🎧 Kundensupport"},
  },
  es:{
    services:{s0t:"Desarrollo de Aplicaciones IA",s0d:"Apps con LLM, visión por computadora y sistemas predictivos para impacto empresarial real.",s1t:"Desarrollo de Apps Android",s1d:"Apps Android nativas y multiplataforma para rendimiento y UX fluida.",s2t:"Desarrollo de Apps iOS",s2d:"Aplicaciones iOS premium según los exigentes estándares de Apple.",s3t:"Desarrollo de Aplicaciones Web",s3d:"Plataformas full-stack escalables con React, Node.js y arquitectura cloud-native.",s4t:"Desarrollo de Sitios Estáticos",s4d:"Sitios ultrarrápidos y optimizados para SEO con diseño orientado a conversión.",s5t:"Desarrollo de Chatbots",s5d:"IA conversacional que capta, califica y convierte usuarios a escala.",s6t:"Desarrollo E-Commerce",s6d:"Tiendas de alta conversión con descubrimiento inteligente y checkout fluido.",s7t:"Soluciones de Automatización",s7d:"Motores de flujo de trabajo y RPA que eliminan el trabajo repetitivo.",s8t:"Testing de Software e Integración",s8d:"Pruebas unitarias, integración, E2E y rendimiento para software robusto.",s9t:"Desarrollo de Aplicaciones Enterprise",s9d:"Plataformas empresariales críticas para seguridad, escala y cumplimiento.",s10t:"Servicios DevOps",s10d:"Pipelines CI/CD, Docker, Kubernetes, automatización cloud y monitoreo.",mPrj:"PROYECTOS DEMO",mBen:"BENEFICIOS EMPRESARIALES",mApp:"ENFOQUE DE DESARROLLO",mQuote:"Solicitar Cotización para"},
    whyUs:{p0t:"Desarrollo Impulsado por IA",p0d:"Inteligencia integrada en cada capa",p1t:"Entrega Rápida",p1d:"Del concepto a producción en semanas",p2t:"Arquitectura Escalable",p2d:"Construida para crecer sin fricción",p3t:"Enfoque en Innovación",p3d:"Por delante de la curva tecnológica",p4t:"Precios para Startups",p4d:"Calidad enterprise, precios accesibles",p5t:"Seguridad Enterprise",p5d:"Estándares SOC como base"},
    stats:{s0:"Proyectos Entregados",s1:"Clientes Satisfechos",s2:"Tecnologías",s3:"Calif. Prom."},
    pfol:{p0c:"Plataforma IA",p0d:"Analítica empresarial con consultas en lenguaje natural y pipelines de datos en vivo.",p1c:"App Móvil",p1d:"App de salud y fitness multiplataforma con coaching IA y sincronización biométrica.",p2c:"E-Commerce",p2d:"Tienda de moda premium con prueba AR y motor de personalización inteligente.",p3c:"Plataforma SaaS",p3d:"SaaS de automatización no-code usado por 500+ equipos en el mundo.",p4c:"DevOps",p4d:"Plataforma de optimización de costos Kubernetes para equipos cloud-native.",p5c:"App Web",p5d:"Portal de RRHH empresarial con 10,000 usuarios activos diarios en 5 países."},
    sup:{greet:"¿Cómo puede Shuroq ayudarte hoy?",o0:"💼 Soporte de Ventas",o1:"👥 Consultas de RRHH",o2:"🚀 Consulta de Proyecto",o3:"🌐 Desarrollo Web",o4:"📱 Desarrollo de Apps Móviles",o5:"🎧 Soporte al Cliente"},
  },
  it:{
    services:{s0t:"Sviluppo Applicazioni IA",s0d:"App personalizzate con LLM, visione artificiale e sistemi predittivi per impatto aziendale reale.",s1t:"Sviluppo App Android",s1d:"App Android native e cross-platform per performance e UX fluida.",s2t:"Sviluppo App iOS",s2d:"Applicazioni iOS premium secondo gli esigenti standard Apple.",s3t:"Sviluppo Applicazioni Web",s3d:"Piattaforme full-stack scalabili con React, Node.js e architettura cloud-native.",s4t:"Sviluppo Siti Statici",s4d:"Siti velocissimi e ottimizzati SEO con design orientato alla conversione.",s5t:"Sviluppo Chatbot",s5d:"IA conversazionale che coinvolge, qualifica e converte su larga scala.",s6t:"Sviluppo E-Commerce",s6d:"Negozi ad alta conversione con scoperta prodotti intelligente e checkout fluido.",s7t:"Soluzioni di Automazione",s7d:"Motori di workflow e RPA che eliminano il lavoro ripetitivo.",s8t:"Test Software e Integrazione",s8d:"Test unitari, integrazione, E2E e performance per software a prova di errore.",s9t:"Sviluppo Applicazioni Enterprise",s9d:"Piattaforme enterprise mission-critical per sicurezza, scala e conformità.",s10t:"Servizi DevOps",s10d:"Pipeline CI/CD, Docker, Kubernetes, automazione cloud e monitoraggio.",mPrj:"PROGETTI DEMO",mBen:"VANTAGGI AZIENDALI",mApp:"APPROCCIO DI SVILUPPO",mQuote:"Richiedi Preventivo per"},
    whyUs:{p0t:"Sviluppo Guidato dall'IA",p0d:"Intelligenza integrata in ogni strato",p1t:"Consegna Rapida",p1d:"Dal concetto alla produzione in settimane",p2t:"Architettura Scalabile",p2d:"Costruita per crescere senza attrito",p3t:"Focus sull'Innovazione",p3d:"Avanti rispetto alla curva tecnologica",p4t:"Prezzi per Startup",p4d:"Qualità enterprise, prezzi accessibili",p5t:"Sicurezza Enterprise",p5d:"Standard SOC come linea di base"},
    stats:{s0:"Progetti Consegnati",s1:"Clienti Soddisfatti",s2:"Tecnologie",s3:"Val. Media"},
    pfol:{p0c:"Piattaforma IA",p0d:"Analytics enterprise con query in linguaggio naturale e pipeline di dati live.",p1c:"App Mobile",p1d:"App salute & fitness cross-platform con coaching IA e sincronizzazione biometrica.",p2c:"E-Commerce",p2d:"Negozio di moda premium con prova AR e motore di personalizzazione intelligente.",p3c:"Piattaforma SaaS",p3d:"SaaS di automazione no-code usato da 500+ team nel mondo.",p4c:"DevOps",p4d:"Piattaforma di ottimizzazione costi Kubernetes per team cloud-native.",p5c:"App Web",p5d:"Portale HR enterprise con 10.000 utenti attivi in 5 paesi."},
    sup:{greet:"Come possiamo aiutarti oggi?",o0:"💼 Supporto Vendite",o1:"👥 Risorse Umane",o2:"🚀 Consulenza Progetto",o3:"🌐 Sviluppo Web",o4:"📱 Sviluppo App Mobile",o5:"🎧 Supporto Clienti"},
  },
  pt:{
    services:{s0t:"Desenvolvimento de Apps IA",s0d:"Apps com LLM, visão computacional e sistemas preditivos para impacto empresarial real.",s1t:"Desenvolvimento Apps Android",s1d:"Apps Android nativas e multiplataforma para performance e UX fluida.",s2t:"Desenvolvimento Apps iOS",s2d:"Apps iOS premium segundo os rigorosos padrões da Apple.",s3t:"Desenvolvimento Apps Web",s3d:"Plataformas full-stack escaláveis com React, Node.js e cloud-native.",s4t:"Desenvolvimento Sites Estáticos",s4d:"Sites ultra-rápidos e otimizados para SEO com design orientado à conversão.",s5t:"Desenvolvimento de Chatbots",s5d:"IA conversacional que engaja, qualifica e converte usuários em escala.",s6t:"Desenvolvimento E-Commerce",s6d:"Lojas de alta conversão com descoberta de produtos e checkout fluido.",s7t:"Soluções de Automação",s7d:"Motores de workflow e RPA que eliminam trabalho repetitivo.",s8t:"Testes de Software e Integração",s8d:"Testes unitários, integração, E2E e performance para software robusto.",s9t:"Desenvolvimento Apps Enterprise",s9d:"Plataformas enterprise críticas para segurança, escala e conformidade.",s10t:"Serviços DevOps",s10d:"Pipelines CI/CD, Docker, Kubernetes, automação cloud e monitoramento.",mPrj:"PROJETOS DEMO",mBen:"BENEFÍCIOS EMPRESARIAIS",mApp:"ABORDAGEM DE DESENVOLVIMENTO",mQuote:"Solicitar Orçamento para"},
    whyUs:{p0t:"Desenvolvimento com IA",p0d:"Inteligência integrada em cada camada",p1t:"Entrega Rápida",p1d:"Do conceito à produção em semanas",p2t:"Arquitetura Escalável",p2d:"Construída para crescer sem fricção",p3t:"Foco em Inovação",p3d:"À frente da curva tecnológica",p4t:"Preços para Startups",p4d:"Qualidade enterprise, preços acessíveis",p5t:"Segurança Enterprise",p5d:"Padrões SOC como linha de base"},
    stats:{s0:"Projetos Entregues",s1:"Clientes Felizes",s2:"Tecnologias",s3:"Avaliação Méd."},
    pfol:{p0c:"Plataforma IA",p0d:"Analytics enterprise com consultas em linguagem natural e pipelines ao vivo.",p1c:"App Mobile",p1d:"App de saúde e fitness multiplataforma com coaching IA.",p2c:"E-Commerce",p2d:"Loja de moda premium com prova AR e personalização inteligente.",p3c:"Plataforma SaaS",p3d:"SaaS de automação no-code usado por 500+ equipes.",p4c:"DevOps",p4d:"Plataforma de otimização Kubernetes para equipes cloud-native.",p5c:"App Web",p5d:"Portal de RH enterprise com 10.000 usuários em 5 países."},
    sup:{greet:"Como a Shuroq pode ajudá-lo hoje?",o0:"💼 Suporte de Vendas",o1:"👥 Consultas de RH",o2:"🚀 Consultoria de Projeto",o3:"🌐 Desenvolvimento Web",o4:"📱 Apps Móveis",o5:"🎧 Suporte ao Cliente"},
  },
  hi:{
    services:{s0t:"AI एप्लिकेशन डेवलपमेंट",s0d:"कस्टम LLM-पावर्ड ऐप्स, कंप्यूटर विज़न और प्रेडिक्टिव सिस्टम।",s1t:"Android ऐप डेवलपमेंट",s1d:"परफॉर्मेंस और बेहतरीन UX के लिए नेटिव और क्रॉस-प्लेटफ़ॉर्म Android ऐप्स।",s2t:"iOS ऐप डेवलपमेंट",s2d:"Apple के उच्च मानकों पर बने प्रीमियम iOS एप्लिकेशन।",s3t:"वेब एप्लिकेशन डेवलपमेंट",s3d:"React, Node.js और क्लाउड-नेटिव आर्किटेक्चर के साथ स्केलेबल प्लेटफ़ॉर्म।",s4t:"स्टैटिक वेबसाइट डेवलपमेंट",s4d:"तेज़, SEO-अनुकूलित साइट्स।",s5t:"चैटबॉट डेवलपमेंट",s5d:"कन्वर्सेशनल AI जो उपयोगकर्ताओं को एंगेज और कन्वर्ट करता है।",s6t:"ई-कॉमर्स डेवलपमेंट",s6d:"हाई-कन्वर्टिंग स्टोर्स जिनमें स्मार्ट प्रोडक्ट डिस्कवरी है।",s7t:"ऑटोमेशन सॉल्यूशन्स",s7d:"वर्कफ़्लो इंजन और RPA जो बार-बार के काम को समाप्त करते हैं।",s8t:"सॉफ़्टवेयर टेस्टिंग और इंटीग्रेशन",s8d:"यूनिट, इंटीग्रेशन, E2E और परफॉर्मेंस टेस्टिंग।",s9t:"एंटरप्राइज़ एप्लिकेशन डेवलपमेंट",s9d:"सुरक्षा, स्केल और अनुपालन के लिए मिशन-क्रिटिकल प्लेटफ़ॉर्म।",s10t:"DevOps सेवाएं",s10d:"CI/CD पाइपलाइन, Docker, Kubernetes, क्लाउड ऑटोमेशन।",mPrj:"डेमो प्रोजेक्ट्स",mBen:"बिज़नेस लाभ",mApp:"डेवलपमेंट अप्रोच",mQuote:"कोटेशन पाएं"},
    whyUs:{p0t:"AI-चालित डेवलपमेंट",p0d:"हर परत में इंटेलिजेंस",p1t:"तेज़ डिलीवरी",p1d:"कुछ हफ़्तों में कॉन्सेप्ट से प्रोडक्शन",p2t:"स्केलेबल आर्किटेक्चर",p2d:"बिना रुकावट के बढ़ने के लिए",p3t:"इनोवेशन फ़ोकस",p3d:"टेक्नोलॉजी के अग्रदूत",p4t:"स्टार्टअप-फ़्रेंडली मूल्य",p4d:"एंटरप्राइज़ क्वालिटी, किफ़ायती दाम",p5t:"एंटरप्राइज़ सुरक्षा",p5d:"SOC-ग्रेड मानक आधार के रूप में"},
    stats:{s0:"पूर्ण परियोजनाएं",s1:"खुश क्लाइंट",s2:"तकनीकें",s3:"औसत रेटिंग"},
    pfol:{p0c:"AI प्लेटफ़ॉर्म",p0d:"प्राकृतिक भाषा क्वेरी के साथ एंटरप्राइज़ एनालिटिक्स।",p1c:"मोबाइल ऐप",p1d:"AI कोचिंग के साथ हेल्थ & फिटनेस ऐप।",p2c:"ई-कॉमर्स",p2d:"AR ट्राई-ऑन के साथ प्रीमियम फैशन स्टोर।",p3c:"SaaS प्लेटफ़ॉर्म",p3d:"500+ टीमों द्वारा इस्तेमाल नो-कोड ऑटोमेशन।",p4c:"DevOps",p4d:"क्लाउड-नेटिव टीमों के लिए Kubernetes कॉस्ट-ऑप्टिमाइज़ेशन।",p5c:"वेब ऐप",p5d:"5 देशों में 10,000 दैनिक सक्रिय उपयोगकर्ताओं वाला HR पोर्टल।"},
    sup:{greet:"शुरूक आज आपकी कैसे मदद कर सकता है?",o0:"💼 सेल्स सपोर्ट",o1:"👥 HR पूछताछ",o2:"🚀 प्रोजेक्ट कंसल्टेशन",o3:"🌐 वेबसाइट डेवलपमेंट",o4:"📱 मोबाइल ऐप डेवलपमेंट",o5:"🎧 क्लाइंट सपोर्ट"},
  },
  ur:{
    services:{s0t:"AI ایپلیکیشن ڈویلپمنٹ",s0d:"کسٹم LLM-پاورڈ ایپس، کمپیوٹر ویژن اور پیشن گوئی کے نظام۔",s1t:"Android ایپ ڈویلپمنٹ",s1d:"بہترین کارکردگی اور UX کے لیے Android ایپس۔",s2t:"iOS ایپ ڈویلپمنٹ",s2d:"ایپل کے اعلیٰ معیار کے مطابق iOS ایپلیکیشنز۔",s3t:"ویب ایپلیکیشن ڈویلپمنٹ",s3d:"React اور Node.js کے ساتھ اسکیل ایبل پلیٹ فارمز۔",s4t:"اسٹیٹک ویب سائٹ ڈویلپمنٹ",s4d:"تیز، SEO-آپٹیمائزڈ سائٹس۔",s5t:"چیٹ بوٹ ڈویلپمنٹ",s5d:"صارفین کو مشغول اور تبدیل کرنے والا AI۔",s6t:"ای-کامرس ڈویلپمنٹ",s6d:"ہائی-کنورٹنگ اسٹورز جن میں سمارٹ ڈسکوری ہے۔",s7t:"آٹومیشن سولیوشنز",s7d:"ورک فلو انجن اور RPA جو دہرائے جانے والے کام ختم کرتے ہیں۔",s8t:"سافٹ ویئر ٹیسٹنگ اور انٹیگریشن",s8d:"یونٹ، انٹیگریشن، E2E اور پرفارمنس ٹیسٹنگ۔",s9t:"انٹرپرائز ایپلیکیشن ڈویلپمنٹ",s9d:"سیکیورٹی اور تعمیل کے لیے مشن-کریٹیکل پلیٹ فارمز۔",s10t:"DevOps سروسز",s10d:"CI/CD پائپ لائنز، Docker، Kubernetes، کلاؤڈ آٹومیشن۔",mPrj:"ڈیمو پروجیکٹس",mBen:"کاروباری فوائد",mApp:"ڈویلپمنٹ اپروچ",mQuote:"کوٹیشن حاصل کریں"},
    whyUs:{p0t:"AI سے چلنے والی ڈویلپمنٹ",p0d:"ہر تہہ میں ذہانت",p1t:"تیز ڈیلیوری",p1d:"تصور سے پروڈکشن تک ہفتوں میں",p2t:"قابل توسیع آرکیٹیکچر",p2d:"بغیر رکاوٹ کے بڑھنے کے لیے",p3t:"جدت پر توجہ",p3d:"ٹیکنالوجی میں پیش قدم",p4t:"اسٹارٹ اپ کے لیے قیمتیں",p4d:"انٹرپرائز معیار، سستی قیمتیں",p5t:"انٹرپرائز سیکیورٹی",p5d:"SOC-گریڈ معیار بطور بنیاد"},
    stats:{s0:"مکمل پروجیکٹس",s1:"خوش کلائنٹس",s2:"ٹیکنالوجیز",s3:"اوسط ریٹنگ"},
    pfol:{p0c:"AI پلیٹ فارم",p0d:"قدرتی زبان کے استفسار کے ساتھ enterprise تجزیات۔",p1c:"موبائل ایپ",p1d:"AI کوچنگ کے ساتھ health & fitness ایپ۔",p2c:"ای-کامرس",p2d:"AR ٹرائی-آن کے ساتھ fashion اسٹور۔",p3c:"SaaS پلیٹ فارم",p3d:"500+ ٹیموں کے استعمال شدہ no-code آٹومیشن۔",p4c:"DevOps",p4d:"کلاؤڈ ٹیموں کے لیے Kubernetes کاسٹ آپٹمائزیشن۔",p5c:"ویب ایپ",p5d:"5 ممالک میں 10,000 روزانہ صارفین والا HR پورٹل۔"},
    sup:{greet:"شروق آج آپ کی کیسے مدد کر سکتا ہے؟",o0:"💼 سیلز سپورٹ",o1:"👥 HR انکوائری",o2:"🚀 پروجیکٹ مشاورت",o3:"🌐 ویب سائٹ ڈویلپمنٹ",o4:"📱 موبائل ایپ ڈویلپمنٹ",o5:"🎧 کلائنٹ سپورٹ"},
  },
  te:{
    services:{s0t:"AI అప్లికేషన్ డెవలప్‌మెంట్",s0d:"కస్టమ్ LLM-పవర్డ్ యాప్‌లు, కంప్యూటర్ విజన్ మరియు ప్రెడిక్టివ్ సిస్టమ్‌లు.",s1t:"Android యాప్ డెవలప్‌మెంట్",s1d:"పెర్ఫార్మెన్స్ మరియు అద్భుతమైన UX కోసం Android యాప్‌లు.",s2t:"iOS యాప్ డెవలప్‌మెంట్",s2d:"Apple ప్రమాణాల ప్రకారం ప్రీమియమ్ iOS అప్లికేషన్‌లు.",s3t:"వెబ్ అప్లికేషన్ డెవలప్‌మెంట్",s3d:"React మరియు Node.js తో స్కేలబుల్ ప్లాట్‌ఫారమ్‌లు.",s4t:"స్టాటిక్ వెబ్‌సైట్ డెవలప్‌మెంట్",s4d:"వేగంగా, SEO-ఆప్టిమైజ్డ్ సైట్‌లు.",s5t:"చాట్‌బాట్ డెవలప్‌మెంట్",s5d:"వినియోగదారులను ఎంగేజ్ మరియు కన్వర్ట్ చేసే AI.",s6t:"ఇ-కామర్స్ డెవలప్‌మెంట్",s6d:"స్మార్ట్ ప్రొడక్ట్ డిస్కవరీతో హై-కన్వర్టింగ్ స్టోర్‌లు.",s7t:"ఆటోమేషన్ సొల్యూషన్‌లు",s7d:"ఎంటర్‌ప్రైజ్ స్కేల్‌లో రిపిటేటివ్ వర్క్ తొలగించే ఇంజిన్‌లు.",s8t:"సాఫ్ట్‌వేర్ టెస్టింగ్ & ఇంటిగ్రేషన్",s8d:"యూనిట్, ఇంటిగ్రేషన్, E2E టెస్టింగ్.",s9t:"ఎంటర్‌ప్రైజ్ అప్లికేషన్ డెవలప్‌మెంట్",s9d:"సెక్యూరిటీ మరియు కంప్లయన్స్ కోసం మిషన్-క్రిటికల్ ప్లాట్‌ఫారమ్‌లు.",s10t:"DevOps సేవలు",s10d:"CI/CD పైప్‌లైన్‌లు, Docker, Kubernetes, క్లౌడ్ ఆటోమేషన్.",mPrj:"డెమో ప్రాజెక్ట్‌లు",mBen:"వ్యాపార ప్రయోజనాలు",mApp:"డెవలప్‌మెంట్ అప్రోచ్",mQuote:"కోటేషన్ పొందండి"},
    whyUs:{p0t:"AI-చోదిత డెవలప్‌మెంట్",p0d:"ప్రతి పొరలో ఇంటెలిజెన్స్",p1t:"వేగవంతమైన డెలివరీ",p1d:"వారాల్లో కాన్సెప్ట్ నుండి ప్రొడక్షన్",p2t:"స్కేలబుల్ ఆర్కిటెక్చర్",p2d:"ఘర్షణ లేకుండా పెరగడానికి",p3t:"ఇన్నోవేషన్ ఫోకస్",p3d:"టెక్నాలజీ కర్వ్‌కు ముందు",p4t:"స్టార్టప్-ఫ్రెండ్లీ ధర",p4d:"ఎంటర్‌ప్రైజ్ నాణ్యత, అందుబాటు ధరలు",p5t:"ఎంటర్‌ప్రైజ్ సెక్యూరిటీ",p5d:"SOC-గ్రేడ్ ప్రమాణాలు"},
    stats:{s0:"డెలివర్ అయిన ప్రాజెక్ట్‌లు",s1:"సంతోషంగా ఉన్న క్లయింట్‌లు",s2:"టెక్నాలజీలు",s3:"సగటు రేటింగ్"},
    pfol:{p0c:"AI ప్లాట్‌ఫారమ్",p0d:"నేచురల్-లాంగ్వేజ్ క్వెరీతో ఎంటర్‌ప్రైజ్ అనలిటిక్స్.",p1c:"మొబైల్ యాప్",p1d:"AI కోచింగ్‌తో హెల్త్ & ఫిట్‌నెస్ యాప్.",p2c:"ఇ-కామర్స్",p2d:"AR ట్రై-ఆన్‌తో ప్రీమియమ్ ఫ్యాషన్ స్టోర్.",p3c:"SaaS ప్లాట్‌ఫారమ్",p3d:"500+ టీమ్‌లు వాడే నో-కోడ్ ఆటోమేషన్.",p4c:"DevOps",p4d:"Kubernetes కాస్ట్-ఆప్టిమైజేషన్ ప్లాట్‌ఫారమ్.",p5c:"వెబ్ యాప్",p5d:"5 దేశాల్లో 10,000 రోజువారీ యూజర్‌లతో HR పోర్టల్."},
    sup:{greet:"శురూక్ ఈరోజు మీకు ఎలా సహాయపడగలదు?",o0:"💼 సేల్స్ సపోర్ట్",o1:"👥 HR విచారణలు",o2:"🚀 ప్రాజెక్ట్ కన్సల్టేషన్",o3:"🌐 వెబ్‌సైట్ డెవలప్‌మెంట్",o4:"📱 మొబైల్ యాప్ డెవలప్‌మెంట్",o5:"🎧 క్లయింట్ సపోర్ట్"},
  },
  ta:{
    services:{s0t:"AI பயன்பாட்டு மேம்பாடு",s0d:"தனிப்பயன் LLM ஆப்கள், கணினி பார்வை மற்றும் முன்கணிப்பு அமைப்புகள்.",s1t:"Android ஆப் மேம்பாடு",s1d:"செயல்திறன் மற்றும் UX க்காக Android ஆப்கள்.",s2t:"iOS ஆப் மேம்பாடு",s2d:"Apple தரத்திற்கு ஏற்ப iOS பயன்பாடுகள்.",s3t:"வலை பயன்பாட்டு மேம்பாடு",s3d:"React மற்றும் Node.js உடன் scalable தளங்கள்.",s4t:"நிலையான வலைத்தளம்",s4d:"வேகமான, SEO-மேம்படுத்தப்பட்ட தளங்கள்.",s5t:"சாட்போட் மேம்பாடு",s5d:"பயனர்களை ஈர்க்கும் மற்றும் மாற்றும் உரையாடல் AI.",s6t:"மின்வணிக மேம்பாடு",s6d:"திறமையான பொருள் கண்டுபிடிப்புடன் store.",s7t:"ஆட்டோமேஷன் தீர்வுகள்",s7d:"மீண்டும் மீண்டும் செய்யும் பணியை நீக்கும் engines.",s8t:"மென்பொருள் சோதனை & ஒருங்கிணைப்பு",s8d:"Unit, integration, E2E மற்றும் performance சோதனை.",s9t:"நிறுவன பயன்பாட்டு மேம்பாடு",s9d:"பாதுகாப்பு மற்றும் இணக்கத்திற்காக தளங்கள்.",s10t:"DevOps சேவைகள்",s10d:"CI/CD pipelines, Docker, Kubernetes, cloud automation.",mPrj:"டெமோ திட்டங்கள்",mBen:"வணிக நலன்கள்",mApp:"மேம்பாட்டு அணுகுமுறை",mQuote:"மேற்கோள் பெறுங்கள்"},
    whyUs:{p0t:"AI-இயக்கப்பட்ட மேம்பாடு",p0d:"ஒவ்வொரு அடுக்கிலும் நுண்ணறிவு",p1t:"விரைவான டெலிவரி",p1d:"வாரங்களில் concept முதல் production வரை",p2t:"அளவிடக்கூடிய கட்டமைப்பு",p2d:"உராய்வின்றி வளர கட்டப்பட்டது",p3t:"புதுமை கவனம்",p3d:"தொழில்நுட்ப வளைவுக்கு முன்",p4t:"Startup-நட்பு விலை",p4d:"Enterprise தரம், எளிய விலைகள்",p5t:"Enterprise பாதுகாப்பு",p5d:"SOC-தரமான தரநிலைகள்"},
    stats:{s0:"திட்டங்கள் முடிந்தன",s1:"மகிழ்ச்சியான வாடிக்கையாளர்கள்",s2:"தொழில்நுட்பங்கள்",s3:"சராசரி மதிப்பீடு"},
    pfol:{p0c:"AI தளம்",p0d:"இயற்கை மொழி query உடன் enterprise analytics.",p1c:"மொபைல் ஆப்",p1d:"AI coaching உடன் health & fitness app.",p2c:"மின்வணிகம்",p2d:"AR try-on உடன் fashion store.",p3c:"SaaS தளம்",p3d:"500+ குழுக்களால் பயன்படுத்தப்படும் no-code automation.",p4c:"DevOps",p4d:"Cloud-native குழுக்களுக்கான Kubernetes optimization.",p5c:"வலை ஆப்",p5d:"5 நாடுகளில் 10,000 தினசரி பயனர்களுடன் HR portal."},
    sup:{greet:"Shuroq இன்று உங்களுக்கு எப்படி உதவலாம்?",o0:"💼 விற்பனை ஆதரவு",o1:"👥 HR விசாரணைகள்",o2:"🚀 திட்ட ஆலோசனை",o3:"🌐 வலைத்தளம் மேம்பாடு",o4:"📱 மொபைல் ஆப் மேம்பாடு",o5:"🎧 வாடிக்கையாளர் ஆதரவு"},
  },
  kn:{
    services:{s0t:"AI ಅಪ್ಲಿಕೇಶನ್ ಡೆವಲಪ್‌ಮೆಂಟ್",s0d:"ಕಸ್ಟಮ್ LLM ಅಪ್ಲಿಕೇಶನ್‌ಗಳು, ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ಮತ್ತು ಊಹಾ ವ್ಯವಸ್ಥೆಗಳು.",s1t:"Android ಅಪ್ ಡೆವಲಪ್‌ಮೆಂಟ್",s1d:"ಕಾರ್ಯಕ್ಷಮತೆ ಮತ್ತು UX ಗಾಗಿ Android ಅಪ್‌ಗಳು.",s2t:"iOS ಅಪ್ ಡೆವಲಪ್‌ಮೆಂಟ್",s2d:"Apple ಮಾನದಂಡಗಳ ಪ್ರಕಾರ iOS ಅಪ್ಲಿಕೇಶನ್‌ಗಳು.",s3t:"ವೆಬ್ ಅಪ್ಲಿಕೇಶನ್ ಡೆವಲಪ್‌ಮೆಂಟ್",s3d:"React ಮತ್ತು Node.js ನೊಂದಿಗೆ ಸ್ಕೇಲೆಬಲ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳು.",s4t:"ಸ್ಟ್ಯಾಟಿಕ್ ವೆಬ್‌ಸೈಟ್",s4d:"ವೇಗದ, SEO-ಆಪ್ಟಿಮೈಸ್ಡ್ ಸೈಟ್‌ಗಳು.",s5t:"ಚಾಟ್‌ಬಾಟ್ ಡೆವಲಪ್‌ಮೆಂಟ್",s5d:"ಬಳಕೆದಾರರನ್ನು ತೊಡಗಿಸುವ ಸಂಭಾಷಣಾ AI.",s6t:"ಇ-ಕಾಮರ್ಸ್ ಡೆವಲಪ್‌ಮೆಂಟ್",s6d:"ಸ್ಮಾರ್ಟ್ ಡಿಸ್ಕವರಿ ಮತ್ತು ಸರಾಗ ಚೆಕ್‌ಔಟ್‌ನೊಂದಿಗೆ ಸ್ಟೋರ್‌ಗಳು.",s7t:"ಆಟೊಮೇಷನ್ ಸೊಲ್ಯೂಷನ್‌ಗಳು",s7d:"ಪುನರಾವರ್ತಿತ ಕೆಲಸ ತೆಗೆದುಹಾಕುವ engines.",s8t:"ಸಾಫ್ಟ್‌ವೇರ್ ಟೆಸ್ಟಿಂಗ್ & ಇಂಟಿಗ್ರೇಶನ್",s8d:"Unit, integration, E2E ಮತ್ತು performance ಟೆಸ್ಟಿಂಗ್.",s9t:"ಎಂಟರ್‌ಪ್ರೈಸ್ ಅಪ್ಲಿಕೇಶನ್ ಡೆವಲಪ್‌ಮೆಂಟ್",s9d:"ಭದ್ರತೆ ಮತ್ತು ಅನುಪಾಲನೆಗಾಗಿ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳು.",s10t:"DevOps ಸೇವೆಗಳು",s10d:"CI/CD, Docker, Kubernetes, ಕ್ಲೌಡ್ ಆಟೊಮೇಷನ್.",mPrj:"ಡೆಮೊ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು",mBen:"ವ್ಯಾಪಾರ ಲಾಭಗಳು",mApp:"ಡೆವಲಪ್‌ಮೆಂಟ್ ಅಪ್ರೋಚ್",mQuote:"ಕೋಟೇಶನ್ ಪಡೆಯಿರಿ"},
    whyUs:{p0t:"AI-ಚಾಲಿತ ಅಭಿವೃದ್ಧಿ",p0d:"ಪ್ರತಿ ಪದರದಲ್ಲೂ ಬುದ್ಧಿವಂತಿಕೆ",p1t:"ವೇಗದ ಡೆಲಿವರಿ",p1d:"ವಾರಗಳಲ್ಲಿ ಕಾನ್ಸೆಪ್ಟ್‌ನಿಂದ ಉತ್ಪಾದನೆಗೆ",p2t:"ಸ್ಕೇಲೆಬಲ್ ಆರ್ಕಿಟೆಕ್ಚರ್",p2d:"ಘರ್ಷಣೆ ಇಲ್ಲದೆ ಬೆಳೆಯಲು",p3t:"ನಾವೀನ್ಯತೆ ಗಮನ",p3d:"ತಂತ್ರಜ್ಞಾನ ವಕ್ರರೇಖೆಗೆ ಮುಂದೆ",p4t:"Startup-ಸ್ನೇಹಿ ಬೆಲೆ",p4d:"Enterprise ಗುಣಮಟ್ಟ, ಅಗ್ಗದ ದರ",p5t:"Enterprise ಭದ್ರತೆ",p5d:"SOC-ಗ್ರೇಡ್ ಮಾನದಂಡಗಳು"},
    stats:{s0:"ಡೆಲಿವರ್ ಆದ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು",s1:"ಸಂತೋಷ ಕ್ಲೈಂಟ್‌ಗಳು",s2:"ತಂತ್ರಜ್ಞಾನಗಳು",s3:"ಸರಾಸರಿ ರೇಟಿಂಗ್"},
    pfol:{p0c:"AI ಪ್ಲಾಟ್‌ಫಾರ್ಮ್",p0d:"ನೈಸರ್ಗಿಕ ಭಾಷೆಯ query ನೊಂದಿಗೆ enterprise ವಿಶ್ಲೇಷಣೆ.",p1c:"ಮೊಬೈಲ್ ಅಪ್",p1d:"AI ಕೋಚಿಂಗ್‌ನೊಂದಿಗೆ health & fitness ಅಪ್.",p2c:"ಇ-ಕಾಮರ್ಸ್",p2d:"AR ಟ್ರೈ-ಆನ್‌ನೊಂದಿಗೆ fashion store.",p3c:"SaaS ಪ್ಲಾಟ್‌ಫಾರ್ಮ್",p3d:"500+ ಟೀಮ್‌ಗಳು ಬಳಸುವ no-code automation.",p4c:"DevOps",p4d:"Kubernetes cost-optimization ಪ್ಲಾಟ್‌ಫಾರ್ಮ್.",p5c:"ವೆಬ್ ಅಪ್",p5d:"5 ದೇಶಗಳಲ್ಲಿ 10,000 ಬಳಕೆದಾರರ HR portal."},
    sup:{greet:"ಶುರೂಕ್ ಇಂದು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",o0:"💼 ಸೇಲ್ಸ್ ಸಪೋರ್ಟ್",o1:"👥 HR ವಿಚಾರಣೆಗಳು",o2:"🚀 ಪ್ರಾಜೆಕ್ಟ್ ಕನ್ಸಲ್ಟೇಶನ್",o3:"🌐 ವೆಬ್‌ಸೈಟ್ ಡೆವಲಪ್‌ಮೆಂಟ್",o4:"📱 ಮೊಬೈಲ್ ಅಪ್ ಡೆವಲಪ್‌ಮೆಂಟ್",o5:"🎧 ಕ್ಲೈಂಟ್ ಸಪೋರ್ಟ್"},
  },
  ml:{
    services:{s0t:"AI ആപ്ലിക്കേഷൻ ഡെവലപ്‌മെൻ്റ്",s0d:"കസ്റ്റം LLM ആപ്പുകൾ, കംപ്യൂട്ടർ വിഷൻ, പ്രവചന സംവിധാനങ്ങൾ.",s1t:"Android ആപ്പ് ഡെവലപ്‌മെൻ്റ്",s1d:"ഉയർന്ന പ്രകടനത്തിനും UX-നുമായി Android ആപ്പുകൾ.",s2t:"iOS ആപ്പ് ഡെവലപ്‌മെൻ്റ്",s2d:"Apple മാനദണ്ഡങ്ങൾക്കനുസൃതം iOS ആപ്ലിക്കേഷനുകൾ.",s3t:"വെബ് ആപ്ലിക്കേഷൻ ഡെവലപ്‌മെൻ്റ്",s3d:"React, Node.js ഉള്ള scalable പ്ലാറ്റ്ഫോമുകൾ.",s4t:"സ്റ്റാറ്റിക് വെബ്സൈറ്റ്",s4d:"വേഗമേറിയ, SEO-ഒപ്റ്റിമൈസ്ഡ് സൈറ്റുകൾ.",s5t:"ചാറ്റ്ബോട്ട് ഡെവലപ്‌മെൻ്റ്",s5d:"ഉപഭോക്താക്കളെ ഇടപഴകുകയും പരിവർത്തനം ചെയ്യുകയും ചെയ്യുന്ന AI.",s6t:"ഇ-കൊമേഴ്‌സ് ഡെവലപ്‌മെൻ്റ്",s6d:"സ്മാർട്ട് ഡിസ്‌കവറിയും സീംലെസ് ചെക്ക്ഔട്ടുമുള്ള സ്‌റ്റോറുകൾ.",s7t:"ഓട്ടോമേഷൻ സൊലൂഷൻസ്",s7d:"ആവർത്തിക്കുന്ന ജോലി ഇല്ലാതാക്കുന്ന workflow engines.",s8t:"സോഫ്‌റ്റ്‌വേർ ടെസ്റ്റിംഗ്",s8d:"Unit, integration, E2E, performance ടെസ്റ്റിംഗ്.",s9t:"എൻ്റർപ്രൈസ് ആപ്ലിക്കേഷൻ ഡെവലപ്‌മെൻ്റ്",s9d:"സുരക്ഷ, കംപ്ലയൻസ് ലക്ഷ്യത്തോടെ mission-critical platforms.",s10t:"DevOps സേവനങ്ങൾ",s10d:"CI/CD pipelines, Docker, Kubernetes, cloud automation.",mPrj:"ഡെമോ പ്രോജക്ടുകൾ",mBen:"ബിസിനസ് നേട്ടങ്ങൾ",mApp:"ഡെവലപ്‌മെൻ്റ് രീതി",mQuote:"ഉദ്ധരണി നേടൂ"},
    whyUs:{p0t:"AI-നിർദ്ദേശ വികസനം",p0d:"ഓരോ പാളിയിലും ബുദ്ധി",p1t:"വേഗമേറിയ ഡെലിവറി",p1d:"ആഴ്ചകളിൽ ആശയം മുതൽ ഉൽപ്പാദനം",p2t:"സ്‌കേലബിൾ ആർക്കിടെക്ചർ",p2d:"ഘർഷണം കൂടാതെ വളരാൻ",p3t:"ഇന്നൊവേഷൻ ഫോക്കസ്",p3d:"ടെക്‌നോളജി കർവ്വിന് മുൻപ്",p4t:"Startup-ഫ്രണ്ട്‌ലി വില",p4d:"Enterprise ഗുണനിലവാരം, ലളിതമായ വിലകൾ",p5t:"Enterprise സുരക്ഷ",p5d:"SOC-ഗ്രേഡ് മാനദണ്ഡങ്ങൾ"},
    stats:{s0:"പൂർത്തിയായ പ്രോജക്ടുകൾ",s1:"സന്തുഷ്ട ക്ലൈൻ്റുകൾ",s2:"ടെക്‌നോളജികൾ",s3:"ശരാശരി റേറ്റിംഗ്"},
    pfol:{p0c:"AI പ്ലാറ്റ്‌ഫോം",p0d:"Natural language query ഉള്ള enterprise analytics.",p1c:"മൊബൈൽ ആപ്പ്",p1d:"AI coaching ഉള്ള health & fitness ആപ്പ്.",p2c:"ഇ-കൊമേഴ്‌സ്",p2d:"AR try-on ഉള്ള fashion store.",p3c:"SaaS പ്ലാറ്റ്‌ഫോം",p3d:"500+ ടീമുകൾ ഉപയോഗിക്കുന്ന no-code automation.",p4c:"DevOps",p4d:"Kubernetes cost-optimization platform.",p5c:"വെബ് ആപ്പ്",p5d:"5 രാജ്യങ്ങളിൽ 10,000 ഉപഭോക്താക്കളുള്ള HR portal."},
    sup:{greet:"Shuroq ഇന്ന് നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?",o0:"💼 സേൽസ് സപ്പോർട്ട്",o1:"👥 HR അന്വേഷണങ്ങൾ",o2:"🚀 പ്രോജക്ട് കൺസൾട്ടേഷൻ",o3:"🌐 വെബ്‌സൈറ്റ് ഡെവലപ്‌മെൻ്റ്",o4:"📱 മൊബൈൽ ആപ്പ് ഡെവലപ്‌മെൻ്റ്",o5:"🎧 ക്ലൈൻ്റ് സപ്പോർട്ട്"},
  },
  bn:{
    services:{s0t:"AI অ্যাপ্লিকেশন ডেভেলপমেন্ট",s0d:"কাস্টম LLM অ্যাপ, কম্পিউটার ভিশন এবং প্রেডিক্টিভ সিস্টেম।",s1t:"Android অ্যাপ ডেভেলপমেন্ট",s1d:"পারফরম্যান্স এবং UX-এর জন্য Android অ্যাপ।",s2t:"iOS অ্যাপ ডেভেলপমেন্ট",s2d:"Apple মানদণ্ড অনুসারে iOS অ্যাপ্লিকেশন।",s3t:"ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট",s3d:"React ও Node.js সহ স্কেলেবল প্ল্যাটফর্ম।",s4t:"স্ট্যাটিক ওয়েবসাইট",s4d:"দ্রুত, SEO-অপ্টিমাইজড সাইট।",s5t:"চ্যাটবট ডেভেলপমেন্ট",s5d:"ব্যবহারকারীদের এনগেজ ও কনভার্ট করা AI।",s6t:"ই-কমার্স ডেভেলপমেন্ট",s6d:"স্মার্ট পণ্য আবিষ্কার ও সহজ চেকআউট।",s7t:"অটোমেশন সলিউশন",s7d:"পুনরাবৃত্তিমূলক কাজ দূর করে এমন workflow engines.",s8t:"সফটওয়্যার টেস্টিং ও ইন্টিগ্রেশন",s8d:"Unit, integration, E2E ও performance টেস্টিং।",s9t:"এন্টারপ্রাইজ অ্যাপ্লিকেশন",s9d:"নিরাপত্তা ও কমপ্লায়েন্সের জন্য প্ল্যাটফর্ম।",s10t:"DevOps সেবাসমূহ",s10d:"CI/CD পাইপলাইন, Docker, Kubernetes, ক্লাউড অটোমেশন।",mPrj:"ডেমো প্রকল্প",mBen:"ব্যবসায়িক সুবিধা",mApp:"ডেভেলপমেন্ট পদ্ধতি",mQuote:"কোটেশন নিন"},
    whyUs:{p0t:"AI-চালিত উন্নয়ন",p0d:"প্রতিটি স্তরে বুদ্ধিমত্তা",p1t:"দ্রুত ডেলিভারি",p1d:"সপ্তাহের মধ্যে ধারণা থেকে উৎপাদনে",p2t:"স্কেলেবল আর্কিটেকচার",p2d:"ঘর্ষণ ছাড়াই বৃদ্ধির জন্য",p3t:"উদ্ভাবন ফোকাস",p3d:"প্রযুক্তির অগ্রভাগে",p4t:"স্টার্টআপ-বান্ধব মূল্য",p4d:"এন্টারপ্রাইজ মান, সাশ্রয়ী মূল্য",p5t:"এন্টারপ্রাইজ নিরাপত্তা",p5d:"SOC-গ্রেড মানদণ্ড"},
    stats:{s0:"সম্পন্ন প্রকল্প",s1:"সুখী ক্লায়েন্ট",s2:"প্রযুক্তি",s3:"গড় রেটিং"},
    pfol:{p0c:"AI প্ল্যাটফর্ম",p0d:"প্রাকৃতিক ভাষা query সহ enterprise analytics।",p1c:"মোবাইল অ্যাপ",p1d:"AI coaching সহ health & fitness অ্যাপ।",p2c:"ই-কমার্স",p2d:"AR try-on সহ fashion store।",p3c:"SaaS প্ল্যাটফর্ম",p3d:"500+ দলের ব্যবহৃত no-code automation।",p4c:"DevOps",p4d:"Kubernetes cost-optimization platform।",p5c:"ওয়েব অ্যাপ",p5d:"5 দেশে 10,000 দৈনিক সক্রিয় ব্যবহারকারীর HR portal।"},
    sup:{greet:"Shuroq আজ আপনাকে কীভাবে সাহায্য করতে পারে?",o0:"💼 বিক্রয় সহায়তা",o1:"👥 HR অনুসন্ধান",o2:"🚀 প্রকল্প পরামর্শ",o3:"🌐 ওয়েবসাইট ডেভেলপমেন্ট",o4:"📱 মোবাইল অ্যাপ ডেভেলপমেন্ট",o5:"🎧 ক্লায়েন্ট সহায়তা"},
  },
  zh:{
    services:{s0t:"AI应用开发",s0d:"定制化LLM应用、计算机视觉和预测系统，为企业创造实际价值。",s1t:"Android应用开发",s1d:"为性能和流畅UX设计的原生与跨平台Android应用。",s2t:"iOS应用开发",s2d:"符合Apple严格标准的iOS应用。",s3t:"Web应用开发",s3d:"基于React、Node.js和云原生架构的可扩展平台。",s4t:"静态网站开发",s4d:"极速、SEO优化的网站，专注转化率。",s5t:"聊天机器人开发",s5d:"大规模吸引、鉴定和转化用户的对话式AI。",s6t:"电商开发",s6d:"高转化率店铺，智能产品发现和流畅结账。",s7t:"自动化解决方案",s7d:"消除重复工作的工作流引擎和RPA。",s8t:"软件测试与集成",s8d:"单元、集成、E2E和性能测试。",s9t:"企业应用开发",s9d:"为安全、规模和合规构建的企业平台。",s10t:"DevOps服务",s10d:"CI/CD流水线、Docker、Kubernetes、云自动化和监控。",mPrj:"演示项目",mBen:"业务效益",mApp:"开发方法",mQuote:"获取报价："},
    whyUs:{p0t:"AI驱动开发",p0d:"每一层都融入智能",p1t:"快速交付",p1d:"从概念到生产仅需数周",p2t:"可扩展架构",p2d:"无摩擦地持续增长",p3t:"创新聚焦",p3d:"始终走在技术前沿",p4t:"初创友好定价",p4d:"企业级质量，亲民价格",p5t:"企业级安全",p5d:"以SOC标准为基线"},
    stats:{s0:"交付项目",s1:"满意客户",s2:"技术栈",s3:"平均评分"},
    pfol:{p0c:"AI平台",p0d:"支持自然语言查询的企业分析平台。",p1c:"移动应用",p1d:"集AI训练的跨平台健康健身应用。",p2c:"电商",p2d:"带AR试穿和智能个性化的时尚旗舰店。",p3c:"SaaS平台",p3d:"全球500+团队使用的无代码工作流自动化。",p4c:"DevOps",p4d:"云原生团队的Kubernetes成本优化平台。",p5c:"Web应用",p5d:"覆盖5国、日活10,000用户的企业HR门户。"},
    sup:{greet:"Shuroq今天能帮您做什么？",o0:"💼 销售支持",o1:"👥 人力资源",o2:"🚀 项目咨询",o3:"🌐 网站开发",o4:"📱 移动应用开发",o5:"🎧 客户支持"},
  },
  ja:{
    services:{s0t:"AIアプリケーション開発",s0d:"カスタムLLMアプリ、コンピュータビジョン、予測システムでビジネス価値を創出。",s1t:"Androidアプリ開発",s1d:"パフォーマンスと快適UXのためのAndroidアプリ。",s2t:"iOSアプリ開発",s2d:"Appleの高いデザイン標準に沿ったiOSアプリ。",s3t:"Webアプリケーション開発",s3d:"React、Node.js、クラウドネイティブ設計によるスケーラブルなプラットフォーム。",s4t:"静的ウェブサイト開発",s4d:"超高速でSEO最適化されたコンバージョン重視のサイト。",s5t:"チャットボット開発",s5d:"ユーザーを引き付け、絞り込み、コンバートする会話型AI。",s6t:"ECサイト開発",s6d:"スマート商品発見とシームレス決済を備えた高コンバージョンのストア。",s7t:"自動化ソリューション",s7d:"企業規模で繰り返し業務をなくすワークフローエンジン。",s8t:"ソフトウェアテスト＆統合",s8d:"ユニット、統合、E2E、パフォーマンステスト。",s9t:"エンタープライズアプリ開発",s9d:"セキュリティ、スケール、コンプライアンスのための基幹プラットフォーム。",s10t:"DevOpsサービス",s10d:"CI/CDパイプライン、Docker、Kubernetes、クラウド自動化と監視。",mPrj:"デモプロジェクト",mBen:"ビジネスメリット",mApp:"開発アプローチ",mQuote:"お見積り："},
    whyUs:{p0t:"AI駆動の開発",p0d:"あらゆる層にインテリジェンスを",p1t:"スピーディな納品",p1d:"コンセプトから本番まで数週間",p2t:"スケーラブルな設計",p2d:"摩擦なく成長できる",p3t:"イノベーション重視",p3d:"テクノロジーの最前線に",p4t:"スタートアップ向け価格",p4d:"エンタープライズ品質を手頃な価格で",p5t:"エンタープライズセキュリティ",p5d:"SOCグレードの基準をベースラインとして"},
    stats:{s0:"納品プロジェクト",s1:"満足のクライアント",s2:"テクノロジー",s3:"平均評価"},
    pfol:{p0c:"AIプラットフォーム",p0d:"自然言語クエリを持つエンタープライズ分析基盤。",p1c:"モバイルアプリ",p1d:"AIコーチングを備えたヘルス＆フィットネスアプリ。",p2c:"EC",p2d:"AR試着とスマートなパーソナライゼーションを持つファッションストア。",p3c:"SaaSプラットフォーム",p3d:"世界500以上のチームが導入するノーコードSaaS。",p4c:"DevOps",p4d:"クラウドネイティブ向けKubernetesコスト最適化。",p5c:"Webアプリ",p5d:"5カ国1万ユーザーのエンタープライズHRポータル。"},
    sup:{greet:"Shuroqは今日あなたをどのようにサポートできますか？",o0:"💼 営業サポート",o1:"👥 人事担当",o2:"🚀 プロジェクト相談",o3:"🌐 ウェブ開発",o4:"📱 モバイルアプリ開発",o5:"🎧 カスタマーサポート"},
  },
  ru:{
    services:{s0t:"Разработка ИИ-приложений",s0d:"Приложения на базе LLM, компьютерное зрение и прогностические системы.",s1t:"Разработка Android-приложений",s1d:"Нативные и кроссплатформенные Android-приложения для высокой производительности.",s2t:"Разработка iOS-приложений",s2d:"Премиальные iOS-приложения по строгим стандартам Apple.",s3t:"Разработка веб-приложений",s3d:"Масштабируемые full-stack платформы с React, Node.js и cloud-native архитектурой.",s4t:"Разработка статических сайтов",s4d:"Молниеносные, SEO-оптимизированные сайты, ориентированные на конверсию.",s5t:"Разработка чат-ботов",s5d:"Разговорный ИИ, который вовлекает, квалифицирует и конвертирует пользователей.",s6t:"Разработка интернет-магазинов",s6d:"Высококонверсионные магазины с умным поиском товаров и удобной оплатой.",s7t:"Решения по автоматизации",s7d:"Движки workflow и RPA, устраняющие рутинный труд.",s8t:"Тестирование ПО и интеграция",s8d:"Unit, integration, E2E и performance-тестирование.",s9t:"Разработка корпоративных приложений",s9d:"Критически важные корпоративные платформы для безопасности и соответствия.",s10t:"Услуги DevOps",s10d:"Пайплайны CI/CD, Docker, Kubernetes, облачная автоматизация и мониторинг.",mPrj:"ДЕМО-ПРОЕКТЫ",mBen:"ПРЕИМУЩЕСТВА ДЛЯ БИЗНЕСА",mApp:"ПОДХОД К РАЗРАБОТКЕ",mQuote:"Получить предложение для"},
    whyUs:{p0t:"Разработка на основе ИИ",p0d:"Интеллект встроен в каждый слой",p1t:"Быстрая доставка",p1d:"От концепции до продакшна за недели",p2t:"Масштабируемая архитектура",p2d:"Создана для роста без трений",p3t:"Фокус на инновациях",p3d:"Впереди технологической кривой",p4t:"Цены для стартапов",p4d:"Корпоративное качество, доступные цены",p5t:"Корпоративная безопасность",p5d:"Стандарты SOC как базовый уровень"},
    stats:{s0:"Проектов выполнено",s1:"Довольных клиентов",s2:"Технологии",s3:"Ср. рейтинг"},
    pfol:{p0c:"ИИ-платформа",p0d:"Корпоративная аналитика с запросами на естественном языке.",p1c:"Мобильное приложение",p1d:"Кроссплатформенное приложение здоровья с ИИ-коучингом.",p2c:"Интернет-магазин",p2d:"Премиальный магазин fashion с AR-примеркой.",p3c:"SaaS-платформа",p3d:"No-code автоматизация workflow для 500+ команд.",p4c:"DevOps",p4d:"Платформа оптимизации затрат Kubernetes.",p5c:"Веб-приложение",p5d:"Корпоративный HR-портал с 10 000 пользователями в 5 странах."},
    sup:{greet:"Как Shuroq может помочь вам сегодня?",o0:"💼 Поддержка продаж",o1:"👥 HR-запросы",o2:"🚀 Консультация по проекту",o3:"🌐 Разработка веб-сайтов",o4:"📱 Разработка мобильных приложений",o5:"🎧 Поддержка клиентов"},
  },
};
function tx(lang, sec, key) {
  return TX[lang]?.[sec]?.[key] ?? TX.en[sec]?.[key] ?? key;
}


// Language context — React Context guarantees all consumers re-render on change
const LangContext = createContext(["en", () => {}]);
function useLang() { return useContext(LangContext); }

// ── Language Switcher Component ───────────────────────────────────────────────
function LangSwitcher({ compact = false }) {
  const [lang, setLang] = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGS.find(l => l.code === lang) || LANGS[0];
  const isRTL = current.dir === "rtl";

  useEffect(() => {
    // Apply RTL to document when Arabic/Urdu selected
    document.documentElement.dir = current.dir;
    document.documentElement.lang = lang;
  }, [lang, current.dir]);

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const choose = (code) => { setLang(code); setOpen(false); };

  return (
    <div ref={ref} style={{ position:"relative", zIndex:300, flexShrink:0 }}>
      {/* Trigger */}
      <button onClick={() => setOpen(o => !o)}
        style={{ display:"flex", alignItems:"center", gap:compact?4:6, background:"#F4F7FC", border:"1.5px solid #D6E4F7", borderRadius:9, padding:compact?"7px 9px":"8px 13px", cursor:"pointer", fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:compact?12:13, color:"#1B2D4F", transition:"all .2s", whiteSpace:"nowrap" }}
        onMouseEnter={e=>{e.currentTarget.style.borderColor="#3B82C4";e.currentTarget.style.background="#EAF2FD";}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="#D6E4F7";e.currentTarget.style.background="#F4F7FC";}}>
        <span style={{fontSize:compact?14:16}}>{current.flag}</span>
        {!compact && <span>{current.name}</span>}
        <svg width="10" height="10" viewBox="0 0 10 10" style={{opacity:.5,transform:open?"rotate(180deg)":"none",transition:"transform .25s",marginLeft:2}}>
          <path d="M2 3.5L5 6.5L8 3.5" stroke="#1B2D4F" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 8px)", right:0, background:"#fff", border:"1.5px solid #D6E4F7", borderRadius:14, boxShadow:"0 12px 40px rgba(27,45,79,0.14)", minWidth:188, maxHeight:360, overflowY:"auto", animation:"slideUp .2s ease", zIndex:400 }}>
          {LANGS.map(l => (
            <button key={l.code} onClick={() => choose(l.code)}
              style={{ display:"flex", alignItems:"center", gap:10, width:"100%", background:l.code===lang?"#EAF2FD":"transparent", border:"none", borderBottom:"1px solid #F0F4FA", padding:"11px 16px", cursor:"pointer", fontFamily:"'Nunito',sans-serif", fontWeight:l.code===lang?800:600, fontSize:13.5, color:l.code===lang?"#3B82C4":"#1B2D4F", textAlign:"left", transition:"background .15s", direction:"ltr" }}
              onMouseEnter={e=>{if(l.code!==lang)e.currentTarget.style.background="#F4F7FC";}}
              onMouseLeave={e=>{if(l.code!==lang)e.currentTarget.style.background="transparent";}}>
              <span style={{fontSize:20,lineHeight:1}}>{l.flag}</span>
              <span style={{flex:1}}>{l.name}</span>
              {l.code===lang && <span style={{color:"#3B82C4",fontSize:14}}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ active }) {
  const [lang] = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  const go = id => { setOpen(false); document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" }); };
  const navKeys = ["home","about","services","technologies","portfolio"];
  const navLabels = navKeys.map(k => t(lang,"nav",k));

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background:scrolled?"rgba(255,255,255,0.97)":"rgba(255,255,255,0.9)", backdropFilter:"blur(20px)", borderBottom:"1px solid #E8F0FB", boxShadow:scrolled?"0 2px 24px rgba(59,130,196,0.10)":"none", transition:"all .35s ease" }}>
      <div style={{ maxWidth:1240, margin:"0 auto", padding:"0 5vw", display:"flex", alignItems:"center", justifyContent:"space-between", height:92 }}>
        {/* Logo — seamlessly blended, no visible border */}
        <div onClick={()=>go("Home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", lineHeight:0, flexShrink:0 }}>
          <img src={LOGO} alt="Shuroq" style={{ height:"clamp(44px,6vw,56px)", width:"auto", objectFit:"contain", display:"block" }}/>
        </div>
        <div className="nd" style={{ display:"flex", alignItems:"center", gap:24 }}>
          {navKeys.map((k, i) => (
            <button key={k} onClick={() => go(NAV_LINKS[i])} style={{ background:"none", border:"none", cursor:"pointer", color:active===NAV_LINKS[i].toLowerCase()?"#3B82C4":"#1B2D4F", fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:16, padding:"4px 0", position:"relative", transition:"color .25s" }}>
              {navLabels[i]}
              <span style={{ position:"absolute", bottom:-2, left:0, right:0, height:2, background:"linear-gradient(90deg,#F5A623,#3B82C4)", borderRadius:2, transform:active===NAV_LINKS[i].toLowerCase()?"scaleX(1)":"scaleX(0)", transformOrigin:"left", transition:"transform .3s ease" }}/>
            </button>
          ))}
          {/* Single CTA */}
          <button onClick={() => go("Contact")} style={{ background:"linear-gradient(135deg,#3B82C4,#0EA5C9)", border:"none", borderRadius:10, color:"#fff", fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:15, padding:"9px 24px", cursor:"pointer", boxShadow:"0 4px 16px rgba(59,130,196,0.32)", transition:"transform .2s,box-shadow .2s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 7px 22px rgba(59,130,196,0.42)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 16px rgba(59,130,196,0.32)";}}>
            {t(lang,"nav","cta")}
          </button>
          {/* Language Switcher */}
          <LangSwitcher/>
        </div>
        <div className="nh" style={{ display:"none", alignItems:"center", gap:10 }}>
          <LangSwitcher compact/>
          <button onClick={() => setOpen(!open)} style={{ background:"none", border:"none", color:"#1B2D4F", fontSize:24, cursor:"pointer" }}>{open?"✕":"☰"}</button>
        </div>
      </div>
      {open && (
        <div style={{ background:"#fff", padding:"16px 5vw", borderTop:"1px solid #E8F0FB" }}>
          {navKeys.map((k,i) => <button key={k} onClick={() => go(NAV_LINKS[i])} style={{ display:"block", width:"100%", background:"none", border:"none", color:"#1B2D4F", fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:16, textAlign:"left", padding:"12px 0", cursor:"pointer", borderBottom:"1px solid #EEF3FA" }}>{navLabels[i]}</button>)}
          <button onClick={() => go("Contact")} style={{ marginTop:12, width:"100%", background:"linear-gradient(135deg,#3B82C4,#0EA5C9)", border:"none", borderRadius:10, color:"#fff", fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:15, padding:"13px", cursor:"pointer" }}>{t(lang,"nav","cta")}</button>
        </div>
      )}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [lang] = useLang();
  const words = [t(lang, "hero", "w0"),
    t(lang, "hero", "w1"),
    t(lang, "hero", "w2"),
    t(lang, "hero", "w3")];
  const [wi, setWi] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => { const id = setInterval(() => { setFade(false); setTimeout(() => { setWi(i => (i+1)%words.length); setFade(true); }, 350); }, 2800); return () => clearInterval(id); }, [words.length]);

  return (
    <section id="home" className="homeHero" style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", background:"#F4F7FC" }}>
      {/* Futuristic background image */}
  <img
    className="homeHeroImage"
    src={heroBg}
    alt=""
    aria-hidden="true"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "right center",
      transform: "scaleX(-1)",
      pointerEvents: "none",
      zIndex: 0,
    }}
  />
      <div className="homeHeroOverlay" style={{ position:"absolute", inset:0, background:"radial-gradient(circle at center,rgba(244,247,252,0.78) 0%,rgba(244,247,252,0.62) 38%,rgba(244,247,252,0.34) 72%,rgba(244,247,252,0.16) 100%)", zIndex:0, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", left:0, right:0, bottom:0, height:180, background:"linear-gradient(180deg,rgba(244,247,252,0),#F4F7FC 88%)", zIndex:0, pointerEvents:"none" }}/>
      <ParticleField/>
      <AIBackground/>
      <div style={{ position:"absolute", top:"-8%", right:"-4%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(59,130,196,0.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"8%", left:"-6%", width:450, height:450, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,166,35,0.06) 0%,transparent 70%)", pointerEvents:"none" }}/>
      {/* Floating AI feature pills */}
      <div className="heroFloat" style={{ position:"absolute", top:"20%", right:"3%", display:"flex", flexDirection:"column", gap:12, pointerEvents:"none" }}>
        {[{e:"ai",l:"AI Engine"},{e:"cloud",l:"Cloud Native"},{e:"code",l:"API-First"},{e:"shield",l:"Secure by Design"}].map((v,i) => (
          <div key={v.l} style={{ background:"rgba(255,255,255,0.85)", backdropFilter:"blur(12px)", border:"1px solid #D6E4F7", borderRadius:12, padding:"10px 16px", display:"flex", alignItems:"center", gap:8, boxShadow:"0 4px 16px rgba(59,130,196,0.1)", animation:`floatIcon ${3+i*.6}s ease-in-out infinite`, animationDelay:`${i*.9}s` }}>
            <SvgIcon name={v.e} size={18} color="#3B82C4"/>
            <span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:12, color:"#1B2D4F" }}>{v.l}</span>
          </div>
        ))}
      </div>
      <div className="homeHeroContent" style={{ position:"relative", zIndex:1, textAlign:"center", padding:"150px 5vw 80px", maxWidth:1160, width:"100%", margin:"0 auto" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.72)", backdropFilter:"blur(14px)", border:"1px solid rgba(59,130,196,0.24)", borderRadius:40, padding:"7px 20px", marginBottom:24, boxShadow:"0 8px 30px rgba(59,130,196,0.08)" }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#0EA5C9", display:"inline-block", animation:"pulse 2s infinite" }}/>
          <span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:11.5, color:"#3B82C4", letterSpacing:2.2 }}>{t(lang,"hero","badge")}</span>
        </div>
        <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(2.25rem,5.2vw,4.75rem)", fontWeight:900, color:"#1B2D4F", lineHeight:1.08, margin:"0 auto 10px", maxWidth:820, textShadow:"0 2px 18px rgba(255,255,255,0.75)" }}>
          {t(lang,"hero","h1a")}{" "}
          <span style={{ background:"linear-gradient(135deg,#F5A623 0%,#3B82C4 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", opacity:fade?1:0, transition:"opacity .35s ease", display:"inline-block" }}>{words[wi]}</span>
          <br/>{t(lang,"hero","h1b")}
        </h1>
        <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"clamp(.98rem,1.6vw,1.15rem)", fontWeight:700, color:"#526F91", lineHeight:1.85, maxWidth:640, margin:"20px auto 38px", textShadow:"0 1px 16px rgba(255,255,255,0.9)" }}>
          {t(lang,"hero","sub").split('\n')[0]}<br/>
          {t(lang,"hero","sub").split('\n')[1]}
        </p>
        <div className="homeHeroActions" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
            style={{ background:"linear-gradient(135deg,#3B82C4,#0EA5C9)", border:"none", borderRadius:11, color:"#fff", fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:15, padding:"14px 38px", cursor:"pointer", boxShadow:"0 6px 24px rgba(59,130,196,0.34)", transition:"transform .2s,box-shadow .2s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 30px rgba(59,130,196,0.45)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 6px 24px rgba(59,130,196,0.34)";}}>
            {t(lang,"hero","cta1")}
          </button>
          <button onClick={() => document.getElementById("services")?.scrollIntoView({behavior:"smooth"})}
            style={{ background:"#fff", border:"1.5px solid #D6E4F7", borderRadius:11, color:"#1B2D4F", fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:15, padding:"14px 38px", cursor:"pointer", boxShadow:"0 2px 12px rgba(59,130,196,0.09)", transition:"all .25s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#3B82C4";e.currentTarget.style.color="#3B82C4";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#D6E4F7";e.currentTarget.style.color="#1B2D4F";}}>
            {t(lang,"hero","cta2")}
          </button>
        </div>
        <div className="homeHeroStats" style={{ display:"flex", gap:14, justifyContent:"center", marginTop:50, flexWrap:"wrap" }}>
          {[["50+",t(lang,"hero","stat1")],["98%",t(lang,"hero","stat2")],["24/7",t(lang,"hero","stat3")],["4.9★",t(lang,"hero","stat4")]].map(([v,l]) => (
            <div key={l} style={{ background:"rgba(255,255,255,0.72)", backdropFilter:"blur(16px)", border:"1px solid rgba(214,228,247,0.9)", borderRadius:14, padding:"14px 20px", boxShadow:"0 8px 26px rgba(59,130,196,0.11)" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"#3B82C4" }}>{v}</div>
              <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700, color:"#6B84A3", letterSpacing:1.1, marginTop:3 }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Slideshow ─────────────────────────────────────────────────────────────────
function TrustSection() {
  const [ref, visible] = useIntersection();
  const pillars = [
    {icon:"◎", title:"Reliable Delivery", accent:"#3B82C4", desc:"Clear milestones, predictable timelines, and consistent communication throughout every stage of development."},
    {icon:"◇", title:"Quality Engineering", accent:"#0EA5C9", desc:"Built with modern technologies, rigorous testing, and scalable architecture designed for future growth."},
    {icon:"↗", title:"Long-Term Partnership", accent:"#F5A623", desc:"We remain invested beyond launch with ongoing support, optimization, and strategic guidance."},
  ];
  const highlights = [
    "Transparent Project Management",
    "Security-First Development",
    "Agile & Iterative Delivery",
    "Scalable Cloud Architecture",
    "Post-Launch Support",
  ];

  return (
    <section style={{ background:"#fff", padding:"96px 5vw 92px", position:"relative", overflow:"hidden" }}>
      <AIBackground/>
      <div ref={ref} style={{ maxWidth:1160, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", maxWidth:820, margin:"0 auto 44px", opacity:visible?1:0, transform:visible?"none":"translateY(18px)", transition:"all .7s ease" }}>
          <SectionLabel text="WHY TEAMS TRUST US"/>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3.8vw,3rem)", fontWeight:900, color:"#1B2D4F", lineHeight:1.18, marginBottom:18 }}>
            Trusted to Build What <span style={{ background:"linear-gradient(135deg,#F5A623,#3B82C4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Businesses Depend On</span>
          </h2>
          <p style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:"clamp(14.5px,1.5vw,16.5px)", lineHeight:1.8, fontWeight:700, margin:"0 auto", maxWidth:760 }}>
            From AI-powered applications to scalable web and mobile platforms, we deliver solutions engineered for performance, security, and long-term growth.
          </p>
        </div>

        <div className="trustPillars" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18, marginBottom:28 }}>
          {pillars.map((p,i)=>(
            <div key={p.title}
              style={{ background:"linear-gradient(180deg,#FFFFFF 0%,#F8FAFD 100%)", border:"1.5px solid #E8F0FB", borderRadius:16, padding:"26px 24px", minHeight:238, boxShadow:"0 8px 28px rgba(59,130,196,0.07)", opacity:visible?1:0, transform:visible?"none":"translateY(22px)", transition:`opacity .65s ease ${i*90}ms,transform .65s ease ${i*90}ms,border-color .25s,box-shadow .25s` }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=p.accent;e.currentTarget.style.boxShadow=`0 14px 38px ${p.accent}24`;e.currentTarget.style.transform="translateY(-5px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#E8F0FB";e.currentTarget.style.boxShadow="0 8px 28px rgba(59,130,196,0.07)";e.currentTarget.style.transform="none";}}>
              <div style={{ width:48, height:48, borderRadius:14, background:`linear-gradient(135deg,${p.accent}18,#EAF2FD)`, border:`1px solid ${p.accent}35`, display:"flex", alignItems:"center", justifyContent:"center", color:p.accent, fontFamily:"'Nunito',sans-serif", fontSize:24, fontWeight:900, marginBottom:18, boxShadow:`0 8px 22px ${p.accent}16` }}>
                {p.icon}
              </div>
              <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:17, color:"#1B2D4F", marginBottom:10, lineHeight:2.3 }}>{p.title}</h3>
              <p style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:13.8, lineHeight:1.75, fontWeight:650 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background:"linear-gradient(135deg,#1B2D4F,#24456F)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:18, padding:"18px", boxShadow:"0 14px 44px rgba(27,45,79,0.18)", opacity:visible?1:0, transform:visible?"none":"translateY(18px)", transition:"all .7s ease .22s" }}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:9.5, justifyContent:"center" }}>
            {highlights.map((h,i)=>(
              <span key={h} style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.14)", borderRadius:999, padding:"9px 14px", color:"#fff", fontFamily:"'Nunito',sans-serif", fontSize:12.5, fontWeight:850, letterSpacing:.2 }}>
                <span style={{ color:i%2?"#0EA5C9":"#F5A623", fontWeight:900 }}>✓</span>{h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Slideshow() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const total = SLIDES.length;
  const next = useCallback(() => setCur(c => (c+1)%total), [total]);
  const prev = useCallback(() => setCur(c => (c-1+total)%total), [total]);
  useEffect(() => { if (paused) return; const id = setInterval(next, 4200); return () => clearInterval(id); }, [paused, next]);

  const onMouseDown = e => { setDragging(true); dragStart.current = e.clientX; setPaused(true); };
  const onMouseUp   = e => { if (dragging) { const dx = e.clientX - dragStart.current; if (dx < -40) next(); else if (dx > 40) prev(); setDragging(false); setPaused(false); } };
  const onTouchStart = e => { dragStart.current = e.touches[0].clientX; setPaused(true); };
  const onTouchEnd   = e => { const dx = e.changedTouches[0].clientX - dragStart.current; if (dx < -40) next(); else if (dx > 40) prev(); setPaused(false); };
  const s = SLIDES[cur];

  return (
    <section style={{ background:"#F4F7FC", padding:"0 5vw 80px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", paddingTop:80, marginBottom:40 }}>
          <SectionLabel text="OUR SOLUTIONS"/>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900, color:"#1B2D4F" }}>
            What We <span style={{ background:"linear-gradient(135deg,#F5A623,#3B82C4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Deliver</span>
          </h2>
        </div>
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); setDragging(false); }}
          onMouseDown={onMouseDown} onMouseUp={onMouseUp} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
          style={{ position:"relative", borderRadius:24, overflow:"hidden", boxShadow:"0 8px 40px rgba(59,130,196,0.12)", cursor:dragging?"grabbing":"grab", userSelect:"none" }}>
          <div style={{ background:s.grad, minHeight:320, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"48px 56px", flexWrap:"wrap", gap:32, transition:"background .5s ease" }}>
            <div style={{ flex:1, minWidth:260 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.75)", border:`1px solid ${s.accent}33`, borderRadius:40, padding:"6px 16px", marginBottom:20 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:s.accent, display:"inline-block" }}/>
                <span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:11, color:s.accent, letterSpacing:2 }}>SHUROQ SERVICES</span>
              </div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.5rem,3vw,2.2rem)", fontWeight:900, color:"#1B2D4F", marginBottom:16, lineHeight:1.2 }}>{s.title}</h3>
              <p style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:15.5, fontWeight:600, lineHeight:1.75, maxWidth:460, marginBottom:28 }}>{s.sub}</p>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
                style={{ background:`linear-gradient(135deg,${s.accent},#0EA5C9)`, border:"none", borderRadius:10, color:"#fff", fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:14, padding:"12px 28px", cursor:"pointer", boxShadow:`0 4px 16px ${s.accent}44`, transition:"transform .2s" }}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                Get a Quote →
              </button>
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", flex:"0 0 200px" }}>
              <div style={{ width:150, height:150, borderRadius:"50%", background:`radial-gradient(circle,${s.accent}22 0%,${s.accent}08 100%)`, border:`2px solid ${s.accent}33`, display:"flex", alignItems:"center", justifyContent:"center", animation:"floatIcon 4s ease-in-out infinite", boxShadow:`0 12px 40px ${s.accent}22` }}>
                <SvgIcon name={s.icon} size={66} color={s.accent} sw={1.2}/>
              </div>
            </div>
          </div>
          {["prev","next"].map(dir => (
            <button key={dir} onClick={dir==="prev"?prev:next}
              style={{ position:"absolute", top:"50%", [dir==="prev"?"left":"right"]:16, transform:"translateY(-50%)", background:"rgba(255,255,255,0.88)", border:"1px solid #D6E4F7", borderRadius:"50%", width:42, height:42, cursor:"pointer", fontSize:18, boxShadow:"0 2px 12px rgba(59,130,196,0.15)", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s", backdropFilter:"blur(8px)", color:"#1B2D4F" }}
              onMouseEnter={e=>{e.currentTarget.style.background="#3B82C4";e.currentTarget.style.color="#fff";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.88)";e.currentTarget.style.color="#1B2D4F";}}>
              {dir==="prev"?"‹":"›"}
            </button>
          ))}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"rgba(59,130,196,0.1)" }}>
            <div style={{ height:"100%", background:`linear-gradient(90deg,${s.accent},#0EA5C9)`, width:`${((cur+1)/total)*100}%`, transition:"width .4s ease" }}/>
          </div>
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:20 }}>
          {SLIDES.map((sl,i) => <button key={i} onClick={()=>setCur(i)} style={{ width:i===cur?28:8, height:8, borderRadius:4, background:i===cur?sl.accent:"#D6E4F7", border:"none", cursor:"pointer", transition:"all .35s ease" }}/>)}
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  const [lang] = useLang();
  const [ref, visible] = useIntersection();
  const capabilities = [
    {icon:"ai",label:"AI Engineering",color:"#3B82C4"},{icon:"cloud",label:"Cloud Infra",color:"#0EA5C9"},
    {icon:"mobile",label:"Mobile Apps",color:"#10B981"},{icon:"gear",label:"DevOps",color:"#7C3AED"},
    {icon:"chat",label:"Chatbots",color:"#F5A623"},{icon:"code",label:"API Design",color:"#EC4899"},
    {icon:"brain",label:"ML Models",color:"#3B82C4"},{icon:"shield",label:"Security",color:"#EF4444"},
  ];
  return (
    <section id="about" style={{ background:"#fff", padding:"100px 5vw" }}>
      <div ref={ref} style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="ag" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
          <div style={{ opacity:visible?1:0, transform:visible?"none":"translateX(-28px)", transition:"all .8s ease" }}>
            <SectionLabel text={t(lang,"about","label")}/>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900, color:"#1B2D4F", lineHeight:1.2, marginBottom:20, textAlign:"left" }}>
              {t(lang,"about","h2a")}<br/><span style={{ background:"linear-gradient(135deg,#F5A623,#3B82C4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{t(lang,"about","h2b")}</span>
            </h2>
            <p style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:15.5, lineHeight:1.85, fontWeight:600, marginBottom:16 }}>
              {t(lang,"about","p1")}
            </p>
            <p style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:15.5, lineHeight:1.85, fontWeight:600, marginBottom:28 }}>
              {t(lang,"about","p2")}
            </p>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {["Innovation-First","AI-Native","Startup-Friendly","Enterprise-Grade"].map(t => (
                <span key={t} style={{ background:"#E8F0FB", border:"1px solid #D6E4F7", borderRadius:8, color:"#3B82C4", fontFamily:"'Nunito',sans-serif", fontSize:12, fontWeight:800, letterSpacing:.8, padding:"6px 14px" }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, opacity:visible?1:0, transform:visible?"none":"translateX(28px)", transition:"all .8s ease .15s" }}>
            {[{icon:"eye",title:"Vision",desc:"Global benchmark for AI-native software engineering."},{icon:"target",title:"Mission",desc:"Empower businesses with intelligent, scalable software."},{icon:"brain",title:"AI-First",desc:"Intelligence at the core of every solution."},{icon:"rocket",title:"Speed",desc:"From concept to production in weeks."}].map(c => (
              <div key={c.title} style={{ background:"#F8FAFD", border:"1.5px solid #E8F0FB", borderRadius:14, padding:"22px 18px", transition:"all .3s", cursor:"default" }}
                onMouseEnter={e=>{e.currentTarget.style.background="#EAF2FD";e.currentTarget.style.borderColor="#3B82C4";e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(59,130,196,0.13)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="#F8FAFD";e.currentTarget.style.borderColor="#E8F0FB";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <div style={{ marginBottom:10, display:"flex" }}><SvgIcon name={c.icon} size={28} color="#3B82C4" sw={1.6}/></div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, color:"#1B2D4F", fontSize:15, marginBottom:6 }}>{c.title}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:13, lineHeight:1.65, fontWeight:600 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop:56, paddingTop:44, borderTop:"1.5px solid #E8F0FB" }}>
          <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, color:"#1B2D4F", fontSize:15, letterSpacing:1.5, textAlign:"center", marginBottom:28, textTransform:"uppercase" }}>{t(lang,"about","caps")}</h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:14 }}>
            {capabilities.map((v, i) => {
              const [hov, setHov] = useState(false);
              return (
                <div key={v.label} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                  style={{ background:"#fff", border:`1.5px solid ${hov?v.color+"66":"#E8F0FB"}`, borderRadius:14, padding:"18px 12px", textAlign:"center", transition:"all .3s", boxShadow:hov?`0 8px 24px ${v.color}22`:"0 2px 8px rgba(59,130,196,0.05)", transform:hov?"translateY(-4px)":"none", animation:`floatIcon ${3+i*.4}s ease-in-out infinite`, animationDelay:`${i*.5}s` }}>
                  <div style={{ marginBottom:8, display:"flex", justifyContent:"center" }}><SvgIcon name={v.icon} size={28} color={v.color} sw={1.6}/></div>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:12, color:"#1B2D4F", lineHeight:1.3 }}>{v.label}</div>
                  <div style={{ width:24, height:3, background:v.color, borderRadius:2, margin:"8px auto 0" }}/>
                </div>
              );
            })}
          </div>
        </div>
        <div className="sg" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18, marginTop:52, paddingTop:44, borderTop:"1.5px solid #E8F0FB" }}>
          {[{k:"s0",v:50,s:"+"},{k:"s1",v:40,s:"+"},{k:"s2",v:18,s:"+"},{k:"s3",v:49,s:"/50"}].map((st,_i) => (
            <div key={st.k} style={{ textAlign:"center", background:"#F8FAFD", borderRadius:14, padding:"22px 12px", border:"1px solid #E8F0FB" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"2rem", fontWeight:900, background:"linear-gradient(135deg,#F5A623,#3B82C4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                <Counter target={st.v} suffix={st.s}/>
              </div>
              <div style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:11, fontWeight:700, letterSpacing:1, marginTop:7 }}>{tx(lang,"stats",st.k).toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────
function Services() {
  const [lang] = useLang();
  const [ref, visible] = useIntersection();
  const [modalSvc, setModalSvc] = useState(null);
  return (
    <section id="services" style={{ background:"#F4F7FC", padding:"100px 5vw" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <SectionLabel text={t(lang,"services","label")}/>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900, color:"#1B2D4F" }}>
            {t(lang,"services","h2a")} <span style={{ background:"linear-gradient(135deg,#F5A623,#3B82C4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{t(lang,"services","h2b")}</span>
          </h2>
          <p style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:15, fontWeight:600, maxWidth:500, margin:"14px auto 0" }}>{t(lang,"services","sub")}</p>
        </div>
        <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:18 }}>
          {SERVICES.map((s,i) => <ServiceCard key={s.title} svc={s} idx={i} delay={i*48} visible={visible} onLearnMore={()=>setModalSvc(s)} lang={lang}/>)}
        </div>
      </div>
      {modalSvc && <ServiceModal svc={modalSvc} lang={lang} onClose={()=>setModalSvc(null)}/>}
    </section>
  );
}

function ServiceCard({svc,idx,delay,visible,onLearnMore,lang}){
  const [h,setH]=useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ background:"#fff", border:`1.5px solid ${h?svc.accent||"#3B82C4":"#E8F0FB"}`, borderRadius:16, padding:"26px 22px", opacity:visible?1:0, transform:visible?(h?"translateY(-5px)":"none"):"translateY(20px)", transition:`opacity .6s ease ${delay}ms,transform .3s ease,border-color .25s,box-shadow .3s`, boxShadow:h?`0 10px 30px rgba(59,130,196,0.13)`:"0 2px 8px rgba(59,130,196,0.05)", cursor:"default" }}>
      <div style={{ marginBottom:12, display:"flex" }}><SvgIcon name={svc.icon} size={32} color={svc.accent||"#3B82C4"} sw={1.5}/></div>
      <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:16, color:"#1B2D4F", marginBottom:8, lineHeight:1.3 }}>{tx(lang,"services",`s${idx}t`)}</h3>
      <p style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:13.5, lineHeight:1.72, fontWeight:600, marginBottom:16 }}>{tx(lang,"services",`s${idx}d`)}</p>
      <button onClick={onLearnMore}
        style={{ background:h?"linear-gradient(135deg,#3B82C4,#0EA5C9)":"none", border:h?"none":"none", color:h?"#fff":"#6B84A3", fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:13, cursor:"pointer", padding:h?"8px 18px":"0", borderRadius:8, display:"flex", alignItems:"center", gap:5, transition:"all .25s" }}>
        {t(lang,"services","learnMore")} <span style={{ display:"inline-block", transition:"transform .2s", transform:h?"translateX(3px)":"none" }}>→</span>
      </button>
    </div>
  );
}

// ── Why Choose Us ─────────────────────────────────────────────────────────────
function WhyUs(){
  const [lang] = useLang();
  const [ref,visible]=useIntersection();
  return (
    <section style={{ background:"#fff", padding:"100px 5vw" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <SectionLabel text={t(lang,"whyUs","label")}/>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900, color:"#1B2D4F" }}>
            {t(lang,"whyUs","h2a")} <span style={{ background:"linear-gradient(135deg,#F5A623,#3B82C4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{t(lang,"whyUs","h2b")}</span>
          </h2>
        </div>
        <div ref={ref} className="wg" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:22 }}>
          {WHY_POINTS.map((_p,i)=>(
            <div key={i} style={{ opacity:visible?1:0, transform:visible?"none":"translateY(16px)", transition:`all .6s ease ${i*80}ms`, background:"#F8FAFD", border:"1.5px solid #E8F0FB", borderRadius:14, padding:"22px 24px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <SvgIcon name={_p.icon} size={22} color="#3B82C4" sw={1.8}/>
                <span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, color:"#1B2D4F", fontSize:15 }}>{tx(lang,"whyUs",`p${i}t`)}</span>
                <span style={{ marginLeft:"auto", fontFamily:"'Nunito',sans-serif", color:"#3B82C4", fontWeight:900, fontSize:14 }}>{_p.pct}%</span>
              </div>
              <div style={{ height:6, background:"#E8F0FB", borderRadius:3, overflow:"hidden", marginBottom:10 }}>
                <div style={{ height:"100%", width:visible?`${_p.pct}%`:"0%", background:"linear-gradient(90deg,#F5A623,#3B82C4)", borderRadius:3, transition:`width 1.2s ease ${i*100+200}ms` }}/>
              </div>
              <p style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:13, fontWeight:600 }}>{tx(lang,"whyUs",`p${i}d`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Technologies ──────────────────────────────────────────────────────────────
function Technologies(){
  const [lang] = useLang();
  return (
    <section id="technologies" className="tech-section">
      <div style={{ textAlign:"center", marginBottom:44, padding:"0 5vw" }}>
        <SectionLabel text={t(lang,"tech","label")}/>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:900, color:"#1B2D4F" }}>
          {t(lang,"tech","h2a")} <span style={{ background:"linear-gradient(135deg,#F5A623,#3B82C4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{t(lang,"tech","h2b")}</span>
        </h2>
      </div>
      <div style={{ overflow:"hidden" }}>
        <div style={{ display:"flex", gap:13, width:"max-content", animation:"marqueeLeft 35s linear infinite" }}>
          {[...TECHS,...TECHS].map((t,i)=>(
            <div key={i} style={{ background:"#fff", border:"1.5px solid #D6E4F7", borderRadius:10, padding:"11px 26px", whiteSpace:"nowrap", fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:14, color:"#1B2D4F", flexShrink:0, boxShadow:"0 2px 8px rgba(59,130,196,0.06)", display:"flex", alignItems:"center", gap:8 }}>
              <img src={t.logo} alt={t.name} style={{ width:20, height:20, objectFit:"contain", flexShrink:0 }} loading="lazy"/>
              {t.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Portfolio ─────────────────────────────────────────────────────────────────
function Portfolio(){
  const [lang] = useLang();
  const [ref,visible]=useIntersection();
  return (
    <section id="portfolio" style={{ background:"#fff", padding:"100px 5vw" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <SectionLabel text={t(lang,"portfolio","label")}/>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900, color:"#1B2D4F" }}>
            {t(lang,"portfolio","h2a")} <span style={{ background:"linear-gradient(135deg,#F5A623,#3B82C4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{t(lang,"portfolio","h2b")}</span>
          </h2>
        </div>
        <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:20 }}>
          {PORTFOLIO.map((p,i)=><ProjectCard key={p.title} proj={p} idx={i} lang={lang} delay={i*70} visible={visible}/>)}
        </div>
      </div>
    </section>
  );
}
function ProjectCard({proj,idx,lang,delay,visible}){
  const [h,setH]=useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ borderRadius:16, overflow:"hidden", opacity:visible?1:0, transform:visible?(h?"translateY(-6px)":"none"):"translateY(24px)", transition:`opacity .7s ease ${delay}ms,transform .3s ease,box-shadow .3s`, boxShadow:h?"0 14px 40px rgba(59,130,196,0.14)":"0 2px 12px rgba(59,130,196,0.06)", border:`1.5px solid ${h?proj.accent+"55":"#E8F0FB"}` }}>
      <div style={{ height:180, background:`linear-gradient(135deg,${proj.accent}18 0%,#EAF2FD 100%)`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:`${proj.accent}22`, border:`2px solid ${proj.accent}44`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s", transform:h?"scale(1.12)":"scale(1)" }}><SvgIcon name={proj.icon} size={32} color={proj.accent} sw={1.5}/></div>
        <div style={{ position:"absolute", top:12, left:12, background:"#fff", border:`1px solid ${proj.accent}44`, borderRadius:7, padding:"4px 10px", fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:800, color:proj.accent, letterSpacing:.8 }}>{tx(lang,"pfol",`p${idx}c`).toUpperCase()}</div>
      </div>
      <div style={{ background:"#fff", padding:"18px 20px 22px" }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:19, color:"#1B2D4F", marginBottom:7 }}>{proj.title}</h3>
        <p style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:13.5, lineHeight:1.65, fontWeight:600 }}>{tx(lang,"pfol",`p${idx}d`)}</p>
      </div>
    </div>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials(){
  const [lang] = useLang();
  const [idx,setIdx]=useState(0);
  useEffect(()=>{const id=setInterval(()=>setIdx(i=>(i+1)%TESTIMONIALS.length),4500);return()=>clearInterval(id);},[]);
  const testimonial=TESTIMONIALS[idx];
  return (
    <section style={{ background:"#F4F7FC", padding:"100px 5vw" }}>
      <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center" }}>
        <SectionLabel text={t(lang,"testimonials","label")}/>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:900, color:"#1B2D4F", marginBottom:44 }}>
          {t(lang,"testimonials","h2a")} <span style={{ background:"linear-gradient(135deg,#F5A623,#3B82C4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{t(lang,"testimonials","h2b")}</span> {t(lang,"testimonials","h2c")}
        </h2>
        <div style={{ background:"#fff", border:"1.5px solid #D6E4F7", borderRadius:20, padding:"36px 44px", boxShadow:"0 4px 24px rgba(59,130,196,0.09)", minHeight:210 }}>
          <div style={{ fontSize:44, color:"#3B82C4", lineHeight:1, marginBottom:14, fontFamily:"Georgia,serif", opacity:.3 }}>"</div>
          <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.08rem", color:"#1B2D4F", lineHeight:1.9, fontStyle:"italic", marginBottom:24 }}>{testimonial.text}</p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
            <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,#F5A623,#3B82C4)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:14, color:"#fff" }}>{testimonial.initials}</div>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, color:"#1B2D4F", fontSize:15 }}>{testimonial.name}</div>
              <div style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:12, fontWeight:600 }}>{testimonial.role}</div>
            </div>
          </div>
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:22 }}>
          {TESTIMONIALS.map((_,i)=><button key={i} onClick={()=>setIdx(i)} style={{ width:i===idx?28:8, height:8, borderRadius:4, background:i===idx?"#3B82C4":"#D6E4F7", border:"none", cursor:"pointer", transition:"all .3s" }}/>)}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact(){
  const [lang] = useLang();
  const [form,setForm]=useState({name:"",email:"",service:"",message:""});
  const [sent,setSent]=useState(false);
  const [focused,setFocused]=useState({});
  const [ref,visible]=useIntersection();
  const inp=f=>({ width:"100%", background:"#F8FAFD", border:`1.5px solid ${focused[f]?"#3B82C4":"#D6E4F7"}`, borderRadius:10, padding:"13px 15px", color:"#1B2D4F", fontFamily:"'Nunito',sans-serif", fontSize:14, fontWeight:600, outline:"none", boxSizing:"border-box", transition:"border-color .25s" });

  const submit = e => {
    e.preventDefault();
    submitLead({ name:form.name, email:form.email, service:form.service, message:form.message });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({name:"",email:"",service:"",message:""});
  };

  const sendEmail = e => {
    e.preventDefault();
    window.open(buildMailLink(form), "_blank");
  };

  return (
    <section id="contact" style={{ background:"#fff", padding:"100px 5vw" }}>
      <div ref={ref} style={{ maxWidth:940, margin:"0 auto", opacity:visible?1:0, transform:visible?"none":"translateY(22px)", transition:"all .8s ease" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <SectionLabel text={t(lang,"contact","label")}/>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900, color:"#1B2D4F" }}>
            {t(lang,"contact","h2a")} <span style={{ background:"linear-gradient(135deg,#F5A623,#3B82C4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{t(lang,"contact","h2b")}</span>
          </h2>
          <p style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:15, fontWeight:600, marginTop:10 }}>{t(lang,"contact","sub")}</p>
        </div>
        <div className="cg" style={{ display:"grid", gridTemplateColumns:"1fr 1.7fr", gap:44, alignItems:"start" }}>
          <div>
            {[
              {icon:"email",   label:t(lang,"contact","email"),    val:"contact@shuroq.com"},
              {icon:"phone",   label:"WHATSAPP / PHONE",             val:"+91 8983140094"},
              {icon:"clock",   label:t(lang,"contact","response"), val:t(lang,"contact","within")},
              {icon:"pin",     label:"OUR OFFICE",                 val:"Level 1, Phase 2, N-Heights, Awfis,\nPlot No 38, Siddiq Nagar,\nGachibowli, Hyderabad,\nTelangana 500081"},
            ].map(item=>(
              <div key={item.label} style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom:22 }}>
                <div style={{ width:42, height:42, background:"#E8F0FB", border:"1px solid #D6E4F7", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><SvgIcon name={item.icon} size={18} color="#3B82C4" sw={1.8}/></div>
                <div>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, color:"#6B84A3", fontSize:11, letterSpacing:1.5 }}>{item.label.toUpperCase()}</div>
                  <div style={{ fontFamily:"'Nunito',sans-serif", color:"#1B2D4F", fontSize:14, fontWeight:700, marginTop:2, whiteSpace:"pre-line" }}>{item.val}</div>
                </div>
              </div>
            ))}
            <div style={{ background:"linear-gradient(135deg,#EAF2FD,#F4F7FC)", border:"1.5px solid #D6E4F7", borderRadius:16, padding:"22px 20px" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, color:"#1B2D4F", fontSize:17, marginBottom:4 }}>{t(lang,"contact","dashboard")}</div>
              <div style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:13, fontWeight:600, marginBottom:16 }}>AI · Analytics · Automation</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {[["98%","Accuracy"],["24/7","Support"]].map(([v,l])=>(
                  <div key={l}>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:26, color:"#3B82C4" }}>{v}</div>
                    <div style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:12, fontWeight:700 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background:"#F8FAFD", border:"1.5px solid #E8F0FB", borderRadius:18, padding:"34px 30px" }}>
            {sent ? (
              <div style={{ textAlign:"center", padding:"28px 0" }}>
                <div style={{ marginBottom:14, display:"flex", justifyContent:"center" }}><SvgIcon name="check" size={52} color="#10B981" sw={1.5}/></div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"#3B82C4", marginBottom:8 }}>{t(lang,"contact","successH")}</h3>
                <p style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:14, fontWeight:600 }}>{t(lang,"contact","successP")}</p>
              </div>
            ) : (
              <div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                  <div><label style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, color:"#6B84A3", letterSpacing:1.2, fontWeight:800 }}>{t(lang,"contact","name")}</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} onFocus={()=>setFocused({...focused,name:true})} onBlur={()=>setFocused({...focused,name:false})} placeholder="John Doe" style={{...inp("name"),marginTop:6}}/></div>
                  <div><label style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, color:"#6B84A3", letterSpacing:1.2, fontWeight:800 }}>{t(lang,"contact","emailL")}</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} onFocus={()=>setFocused({...focused,email:true})} onBlur={()=>setFocused({...focused,email:false})} placeholder="you@company.com" style={{...inp("email"),marginTop:6}}/></div>
                </div>
                <div style={{ marginBottom:14 }}><label style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, color:"#6B84A3", letterSpacing:1.2, fontWeight:800 }}>{t(lang,"contact","service")}</label><select value={form.service} onChange={e=>setForm({...form,service:e.target.value})} onFocus={()=>setFocused({...focused,service:true})} onBlur={()=>setFocused({...focused,service:false})} style={{...inp("service"),marginTop:6}}><option value="">{t(lang,"contact","servicePH")}</option>{SERVICES.map(s=><option key={s.title} value={s.title}>{s.title}</option>)}</select></div>
                <div style={{ marginBottom:22 }}><label style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, color:"#6B84A3", letterSpacing:1.2, fontWeight:800 }}>{t(lang,"contact","message")}</label><textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} onFocus={()=>setFocused({...focused,message:true})} onBlur={()=>setFocused({...focused,message:false})} rows={4} placeholder={t(lang,"contact","msgPH")} style={{...inp("message"),marginTop:6,resize:"vertical"}}/></div>
                <div className="contactActions">
                  <button onClick={submit} style={{ width:"100%", background:"linear-gradient(135deg,#3B82C4,#0EA5C9)", border:"none", borderRadius:10, color:"#fff", fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:15, padding:"15px", cursor:"pointer", boxShadow:"0 6px 20px rgba(59,130,196,0.28)", transition:"transform .2s", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
                    onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                    <span>{t(lang,"contact","send")}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </button>
                  <button type="button" onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=contact@shuroq.com&su=Contact%20Shuroq', '_blank')} style={{ width:"100%", background:"linear-gradient(135deg,#3B82C4,#0EA5C9)", border:"none", borderRadius:10, color:"#fff", fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:15, padding:"15px", cursor:"pointer", boxShadow:"0 6px 20px rgba(59,130,196,0.28)", transition:"transform .2s", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 26px rgba(59,130,196,0.34)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 6px 20px rgba(59,130,196,0.28)";}}>
                    <span>Email</span>
                    <SvgIcon name="email" size={18} color="#fff" sw={1.8}/>
                  </button>
                </div>
                <p style={{ fontFamily:"'Nunito',sans-serif", color:"#6B84A3", fontSize:12, fontWeight:600, textAlign:"center", marginTop:10 }}>{t(lang,"contact","hint")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer(){
  const [lang] = useLang();
  return (
    <footer style={{ background:"#1B2D4F", padding:"60px 5vw 28px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="fg" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:36, marginBottom:44 }}>
          <div>
            {/* Footer logo — natural render on subtle pill so it reads on dark navy */}
            <div style={{ marginBottom:18, display:"inline-block", background:"rgba(255,255,255,0.96)", borderRadius:12, padding:"8px 16px", lineHeight:0 }}>
              <img src={LOGO} alt="Shuroq" style={{ height:"clamp(44px,6vw,56px)", width:"auto", objectFit:"contain", display:"block" }}/>
            </div>
            <p style={{ fontFamily:"'Nunito',sans-serif", color:"rgba(255,255,255,0.45)", fontSize:13.5, lineHeight:1.78, maxWidth:270, fontWeight:600 }}>{t(lang,"footer","tagline")}</p>
            {/* Social links */}
            <div style={{display:"flex",gap:10,marginTop:20}}>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{width:38,height:38,borderRadius:"50%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="#0077B5";e.currentTarget.style.borderColor="#0077B5";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.1)";e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" title="Instagram" style={{width:38,height:38,borderRadius:"50%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",fontSize:16,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="linear-gradient(135deg,#f09433,#dc2743)";e.currentTarget.style.borderColor="#dc2743";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.1)";e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";}}>
                <SvgIcon name="camera" size={16} color="#fff" sw={1.8}/>
              </a>
              <a href={`https://wa.me/${WA_NUM}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" style={{width:38,height:38,borderRadius:"50%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="#25D366";e.currentTarget.style.borderColor="#25D366";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.1)";e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";}}>
                <SvgIcon name="whatsapp" size={16} color="#fff" sw={1.8}/>
              </a>
              <a href="mailto:contact@shuroq.com" title="Email" style={{width:38,height:38,borderRadius:"50%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="#3B82C4";e.currentTarget.style.borderColor="#3B82C4";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.1)";e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";}}>
                <SvgIcon name="email" size={16} color="#fff" sw={1.8}/>
              </a>
              <a href="tel:+918983140094" title="Call" style={{width:38,height:38,borderRadius:"50%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="#0EA5C9";e.currentTarget.style.borderColor="#0EA5C9";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.1)";e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";}}>
                <SvgIcon name="phone" size={16} color="#fff" sw={1.8}/>
              </a>
            </div>
          </div>
          {[{label:t(lang,"footer","company"),links:[[t(lang,"nav","about"),"#about"],[t(lang,"nav","services"),"#services"],[t(lang,"nav","portfolio"),"#portfolio"],[t(lang,"nav","contact"),"#contact"]]},{label:t(lang,"footer","services"),links:[["AI Development","#services"],["Mobile Apps","#services"],["Web Development","#services"],["DevOps","#services"]]},{label:t(lang,"footer","connect"),links:[["LinkedIn",LINKEDIN_URL,true],["Instagram",INSTAGRAM_URL,true],["WhatsApp",`https://wa.me/${WA_NUM}`,true],["Email","mailto:contact@shuroq.com",true],["Call Support","tel:+918983140094",true]]}].map(col=>(
            <div key={col.label}>
              <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, color:"#fff", fontSize:12.5, letterSpacing:2, marginBottom:18 }}>{col.label.toUpperCase()}</div>
              {col.links.map(([label,href,external])=>(
                <div key={label} style={{ marginBottom:10 }}>
                  {external ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Nunito',sans-serif", color:"rgba(255,255,255,0.42)", fontSize:13.5, cursor:"pointer", fontWeight:600, transition:"color .2s", textDecoration:"none", display:"block" }} onMouseEnter={e=>e.currentTarget.style.color="#F5A623"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.42)"}>{label}</a>
                  ) : (
                    <span onClick={()=>document.querySelector(href)?.scrollIntoView({behavior:"smooth"})} style={{ fontFamily:"'Nunito',sans-serif", color:"rgba(255,255,255,0.42)", fontSize:13.5, cursor:"pointer", fontWeight:600, transition:"color .2s" }} onMouseEnter={e=>e.target.style.color="#F5A623"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.42)"}>{label}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:22, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <span style={{ fontFamily:"'Nunito',sans-serif", color:"rgba(255,255,255,0.28)", fontSize:13, fontWeight:600 }}>{t(lang,"footer","copyright")}</span>
          <span style={{ fontFamily:"'Nunito',sans-serif", color:"rgba(255,255,255,0.28)", fontSize:13, fontWeight:600 }}>{t(lang,"footer","tag")}</span>
        </div>
      </div>
    </footer>
  );
}

// ── Floating Social + Support Icons ──────────────────────────────────────────
function FloatingActions(){
  const [expanded,setExpanded]=useState(false);
  const buttons = [
    {icon:"whatsapp",label:"WhatsApp",color:"#25D366",action:()=>window.open(`https://wa.me/${WA_NUM}`,"_blank")},
    {icon:"phone",label:"Call",color:"#3B82C4",action:()=>window.open("tel:+918983140094")},
    {icon:"camera",label:"Instagram",color:"#E1306C",action:()=>window.open(INSTAGRAM_URL,"_blank")},
    {icon:"briefcase",label:"LinkedIn",color:"#0077B5",action:()=>window.open(LINKEDIN_URL,"_blank")},
    {icon:"headset",label:"Support",color:"#7C3AED",action:()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})},
  ];
  return (
    <div style={{ position:"fixed", right:20, bottom:100, zIndex:300, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:10 }}>
      {expanded && buttons.map((b,i)=>(
        <div key={b.label} onClick={()=>{b.action();setExpanded(false);}}
          style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(255,255,255,0.96)", backdropFilter:"blur(16px)", border:"1px solid #D6E4F7", borderRadius:40, padding:"8px 16px 8px 10px", cursor:"pointer", boxShadow:"0 4px 20px rgba(59,130,196,0.16)", animation:"slideInRight .3s ease", animationDelay:`${i*50}ms`, animationFillMode:"both", transition:"transform .2s,box-shadow .2s" }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateX(-3px)";e.currentTarget.style.boxShadow="0 6px 24px rgba(59,130,196,0.22)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 20px rgba(59,130,196,0.16)";}}>
          <div style={{ width:32,height:32,borderRadius:"50%",background:b.color,display:"flex",alignItems:"center",justifyContent:"center" }}><SvgIcon name={b.icon} size={16} color="#fff" sw={1.8}/></div>
          <span style={{ fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,color:"#1B2D4F",whiteSpace:"nowrap" }}>{b.label}</span>
        </div>
      ))}
      <button onClick={()=>setExpanded(!expanded)}
        style={{ width:50,height:50,borderRadius:"50%",background:"linear-gradient(135deg,#3B82C4,#0EA5C9)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:"0 4px 20px rgba(59,130,196,0.4)",transition:"transform .3s,box-shadow .3s",transform:expanded?"rotate(45deg)":"none" }}
        onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 28px rgba(59,130,196,0.55)"}
        onMouseLeave={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(59,130,196,0.4)"}>
        <SvgIcon name={expanded?"close":"zap"} size={20} color="#fff" sw={2}/>
      </button>
    </div>
  );
}

// ── Smart Support Assistant ───────────────────────────────────────────────────
function SupportAssistant(){
  const [lang] = useLang();
  const [open,setOpen]=useState(false);
  const [minimized,setMinimized]=useState(false);
  const [step,setStep]=useState("options");
  const [selected,setSelected]=useState(null);
  const [form,setForm]=useState({name:"",email:"",requirement:""});
  const [focused,setFocused]=useState({});
  const bottomRef=useRef(null);

  useEffect(()=>{ if(open&&!minimized) bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[step,open,minimized]);

  const selectOption = opt => { setSelected(opt); setStep("form"); };

  const sendEnquiry = () => {
    const text = `*Shuroq Enquiry — ${selected.tag}*\n\nName: ${form.name}\nEmail: ${form.email}\nRoute: ${selected.route}\nRequirement: ${form.requirement}`;
    window.open(buildWALink(text), "_blank");
    setStep("done");
  };

  const reset = () => { setStep("options"); setSelected(null); setForm({name:"",email:"",requirement:""}); };

  const inp = f => ({ width:"100%", background:"#F8FAFD", border:`1.5px solid ${focused[f]?"#3B82C4":"#D6E4F7"}`, borderRadius:8, padding:"10px 12px", color:"#1B2D4F", fontFamily:"'Nunito',sans-serif", fontSize:13, fontWeight:600, outline:"none", boxSizing:"border-box", transition:"border-color .25s" });

  return (
    <>
      <button onClick={()=>{ setOpen(!open); setMinimized(false); }}
        style={{ position:"fixed", right:20, bottom:36, zIndex:300, width:50, height:50, borderRadius:"50%", background:"linear-gradient(135deg,#F5A623,#E8873A)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, boxShadow:"0 4px 20px rgba(245,166,35,0.45)", transition:"transform .3s,box-shadow .3s" }}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
        <SvgIcon name={open?"close":"bot"} size={22} color="#fff" sw={1.8}/>
      </button>

      {open&&!minimized&&(
        <div style={{ position:"fixed", right:20, bottom:100, zIndex:299, width:340, background:"#fff", borderRadius:20, boxShadow:"0 12px 48px rgba(59,130,196,0.18)", border:"1px solid #D6E4F7", overflow:"hidden", animation:"slideUp .3s ease" }}>
          <div style={{ background:"linear-gradient(135deg,#3B82C4,#0EA5C9)", padding:"16px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center" }}><SvgIcon name="bot" size={18} color="#fff" sw={1.8}/></div>
              <div>
                <div style={{ fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:14,color:"#fff" }}>Shuroq Assistant</div>
                <div style={{ fontFamily:"'Nunito',sans-serif",fontSize:11,color:"rgba(255,255,255,0.75)" }}>Smart Support · Not Live Chat</div>
              </div>
            </div>
            <button onClick={()=>setMinimized(true)} style={{ background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,color:"#fff",fontSize:14,cursor:"pointer",padding:"4px 8px" }}>−</button>
          </div>

          <div style={{ padding:"16px 16px 0" }}>
            {step === "options" && (
              <>
                <p style={{ fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:700,color:"#1B2D4F",marginBottom:12 }}>👋 {tx(lang,"sup","greet")}</p>
                <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                  {SUPPORT_OPTIONS.map((opt,oi)=>(
                    <button key={oi} onClick={()=>selectOption(opt)}
                      style={{ background:"#F4F7FC",border:"1.5px solid #E8F0FB",borderRadius:10,padding:"10px 14px",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,color:"#1B2D4F",cursor:"pointer",textAlign:"left",transition:"all .2s" }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor="#3B82C4";e.currentTarget.style.background="#EAF2FD";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="#E8F0FB";e.currentTarget.style.background="#F4F7FC";}}>
                      {tx(lang,"sup",`o${oi}`)}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === "form" && selected && (
              <>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14 }}>
                  <button onClick={()=>setStep("options")} style={{ background:"none",border:"none",color:"#3B82C4",cursor:"pointer",fontSize:18,lineHeight:1 }}>←</button>
                  <span style={{ fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,color:"#1B2D4F" }}>{selected.label}</span>
                </div>
                <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                  <div>
                    <label style={{ fontFamily:"'Nunito',sans-serif",fontSize:10,color:"#6B84A3",letterSpacing:1.2,fontWeight:800 }}>{t(lang,"contact","name")}</label>
                    <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} onFocus={()=>setFocused({...focused,name:true})} onBlur={()=>setFocused({...focused,name:false})} placeholder="John Doe" style={{...inp("name"),marginTop:5}}/>
                  </div>
                  <div>
                    <label style={{ fontFamily:"'Nunito',sans-serif",fontSize:10,color:"#6B84A3",letterSpacing:1.2,fontWeight:800 }}>{t(lang,"contact","emailL")}</label>
                    <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} onFocus={()=>setFocused({...focused,email:true})} onBlur={()=>setFocused({...focused,email:false})} placeholder="you@company.com" style={{...inp("email"),marginTop:5}}/>
                  </div>
                  <div>
                    <label style={{ fontFamily:"'Nunito',sans-serif",fontSize:10,color:"#6B84A3",letterSpacing:1.2,fontWeight:800 }}>{t(lang,"contact","message")}</label>
                    <textarea value={form.requirement} onChange={e=>setForm({...form,requirement:e.target.value})} onFocus={()=>setFocused({...focused,requirement:true})} onBlur={()=>setFocused({...focused,requirement:false})} rows={3} placeholder="Briefly describe your need..." style={{...inp("requirement"),marginTop:5,resize:"none"}}/>
                  </div>
                </div>
                <button onClick={sendEnquiry} style={{ width:"100%",marginTop:12,background:"linear-gradient(135deg,#3B82C4,#0EA5C9)",border:"none",borderRadius:10,color:"#fff",fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:14,padding:"12px",cursor:"pointer",boxShadow:"0 4px 14px rgba(59,130,196,0.28)",display:"flex",alignItems:"center",justifyContent:"center",gap:6 }}>
                  {t(lang,"contact","send")} 💬
                </button>
                <p style={{ fontFamily:"'Nunito',sans-serif",color:"#6B84A3",fontSize:11,fontWeight:600,textAlign:"center",marginTop:8 }}>Routes to: {selected.route}</p>
              </>
            )}

            {step === "done" && (
              <div style={{ textAlign:"center",padding:"20px 0" }}>
                <div style={{ marginBottom:12, display:"flex", justifyContent:"center" }}><SvgIcon name="check" size={44} color="#10B981" sw={1.5}/></div>
                <h4 style={{ fontFamily:"'Playfair Display',serif",fontSize:18,color:"#3B82C4",marginBottom:8 }}>{t(lang,"contact","successH")}</h4>
                <p style={{ fontFamily:"'Nunito',sans-serif",color:"#6B84A3",fontSize:13,fontWeight:600,marginBottom:14 }}>WhatsApp opened. We'll respond within 24 hours.</p>
                <button onClick={reset} style={{ background:"#E8F0FB",border:"none",borderRadius:8,padding:"9px 18px",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,color:"#3B82C4",cursor:"pointer" }}>← New Enquiry</button>
              </div>
            )}
          </div>
          <div ref={bottomRef} style={{ height:16 }}/>
        </div>
      )}

      {open&&minimized&&(
        <div onClick={()=>setMinimized(false)} style={{ position:"fixed",right:82,bottom:36,zIndex:299,background:"#fff",border:"1px solid #D6E4F7",borderRadius:12,padding:"8px 14px",cursor:"pointer",boxShadow:"0 4px 16px rgba(59,130,196,0.15)",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,color:"#3B82C4" }}>
          Shuroq Assistant ↑
        </div>
      )}
    </>
  );
}

// ── LangProvider ──────────────────────────────────────────────────────────────
function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  return <LangContext.Provider value={[lang, setLang]}>{children}</LangContext.Provider>;
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App(){
  const [active,setActive]=useState("home");
  useEffect(()=>{
    const ids=NAV_LINKS.map(l=>l.toLowerCase());
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);}),{threshold:0.3});
    ids.forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el);});
    return()=>obs.disconnect();
  },[]);
  return (
    <LangProvider>
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;600;700;800;900&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{background:#F4F7FC;color:#1B2D4F;overflow-x:hidden;-webkit-font-smoothing:antialiased;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='240' height='240' fill='%23F4F7FC'/%3E%3Ccircle cx='60' cy='60' r='52' fill='%23F5A623' fill-opacity='0.12'/%3E%3Ccircle cx='180' cy='140' r='68' fill='%233B82C4' fill-opacity='0.08'/%3E%3Ccircle cx='120' cy='100' r='24' fill='%230EA5C9' fill-opacity='0.14'/%3E%3C/svg%3E");background-size:240px 240px;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#F4F7FC;}
        ::-webkit-scrollbar-thumb{background:linear-gradient(#F5A623,#3B82C4);border-radius:3px;}
        @keyframes marqueeLeft{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
        @keyframes floatIcon{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideInRight{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeInOverlay{from{opacity:0}to{opacity:1}}
        @keyframes slideUpModal{from{opacity:0;transform:translateY(30px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        .tech-section{background:#F4F7FC;padding:80px 0;overflow:hidden;}
        .tech-marquee{display:flex;width:100%;overflow:hidden;}
        .tech-track{display:flex;gap:18px;flex:0 0 max-content;padding-right:18px;animation:marquee 36s linear infinite;}
        .tech-card{width:188px;height:58px;background:#fff;border:1.5px solid #D6E4F7;border-radius:10px;box-shadow:0 2px 8px rgba(59,130,196,0.06);display:flex;align-items:center;justify-content:center;gap:10px;padding:0 18px;overflow:hidden;}
        .tech-icon-wrap{width:28px;height:28px;flex:0 0 28px;display:flex;align-items:center;justify-content:center;}
        .tech-icon{width:26px;height:26px;display:block;object-fit:contain;}
        .tech-name{font-family:'Nunito',sans-serif;font-weight:800;font-size:14px;line-height:1;color:#1B2D4F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center;min-width:0;}
        .homeHeroImage{object-position:right center;}
        @media(max-width:1100px){
          .homeHeroImage{width:100%!important;height:100%!important;object-fit:cover!important;object-position:right center!important;opacity:.9!important;}
          .homeHeroOverlay{background:radial-gradient(circle at center,rgba(244,247,252,0.82) 0%,rgba(244,247,252,0.66) 42%,rgba(244,247,252,0.38) 72%,rgba(244,247,252,0.18) 100%)!important;}
        }
        @media(max-width:768px){
          .nd{display:none!important}
          .nh{display:flex!important}
          .ag,.wg,.cg,.fg,.trustPillars{grid-template-columns:1fr!important}
          .sg{grid-template-columns:1fr 1fr!important}
          .heroFloat{display:none!important}
          .homeHero{min-height:760px!important;align-items:center!important;}
          .homeHeroImage{inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:right center!important;opacity:.82!important;transform:scaleX(-1)!important;}
          .homeHeroOverlay{background:radial-gradient(circle at center,rgba(244,247,252,0.9) 0%,rgba(244,247,252,0.72) 42%,rgba(244,247,252,0.42) 74%,rgba(244,247,252,0.2) 100%)!important;}
          .homeHeroContent{padding:150px 5vw 70px!important;text-align:center!important;}
          .homeHeroContent h1{font-size:clamp(2.05rem,10vw,3.1rem)!important;max-width:100%!important;}
          .homeHeroContent p{max-width:100%!important;margin:18px 0 30px!important;}
          .homeHeroActions,.homeHeroStats{justify-content:center!important;}
          .tech-section{padding:64px 0;}
          .tech-track{gap:14px;padding-right:14px;animation-duration:30s;}
          .tech-card{width:174px;height:56px;padding:0 16px;}
          .tech-icon-wrap{width:26px;height:26px;flex-basis:26px;}
          .tech-icon{width:24px;height:24px;}
          .tech-name{font-size:13.5px;}
          .contactActions{grid-template-columns:1fr!important;}
        }
        @media(max-width:430px){
          .homeHero{min-height:740px!important;}
          .homeHeroImage{object-position:right center!important;opacity:.78!important;}
          .homeHeroContent{padding-top:138px!important;}
          .homeHeroActions button{width:100%;justify-content:center;}
          .homeHeroStats{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px!important;}
          .homeHeroStats > div{padding:12px 10px!important;text-align:center;}
        }
        .contactActions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}
        [dir="rtl"] .nd,[dir="rtl"] .nh,[dir="rtl"] nav > div{flex-direction:row-reverse}
        [dir="rtl"] body{font-family:'Nunito',sans-serif}
      `}</style>
      <Navbar active={active}/>
      <Hero/>
      <TrustSection/>
      <Slideshow/>
      <About/>
      <Services/>
      <WhyUs/>
      <Technologies/>
      <Portfolio/>
      <Testimonials/>
      <Contact/>
      <Footer/>
      <FloatingActions/>
      <SupportAssistant/>
    </>
    </LangProvider>
  );
}
