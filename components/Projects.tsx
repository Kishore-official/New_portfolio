"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion, type Variants } from "motion/react";
import { ProjectModal } from "./ui/ProjectModal";
import { CardVisual } from "./ui/CardVisual";
import type { Project } from "./ui/project-types";
import TiltCard from "./3d/TiltCard";

// ── Project Data ───────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    title: "MERIDIAN — E-Commerce Platform",
    shortDesc:
      "Enterprise-grade marketplace with 4 frontend apps, 111+ API endpoints, JWT auth with 7 roles, BullMQ job queues, and multi-country support.",
    stack: ["NestJS", "Next.js", "PostgreSQL", "Redis", "Docker", "TypeORM"],
    github: "https://github.com/Kishore-official/E-commerce.git",
    live: "https://ecommerce-api-895210689446.europe-west2.run.app",
    tag: "Full Stack",
    image: "/projects/ecommerce-1.jpg",
    details: {
      overview:
        "Enterprise-grade global e-commerce marketplace built as a TypeScript monorepo with 4 frontend apps (storefront, vendor portal, admin panel, API), a NestJS modular monolith backend, and production-ready infrastructure — designed for launch in Saudi Arabia with multi-country schema from day one.",
      highlights: [
        "12 bounded-context domain modules with ~111 REST API endpoints and Swagger documentation",
        "9 explicit state machines governing every status field — products, orders, payments, and shipments",
        "JWT authentication with 7 RBAC roles: super_admin, admin, moderator, ops, vendor, vendor_staff, customer",
        "BullMQ job queues (9 queues) + OpenSearch full-text search architected to support 1M+ products",
        "Port/Adapter pattern for payment (HyperPay/Stripe-ready) and shipping (Aramex/DHL-ready) integrations",
        "~400 unit tests and ~109 E2E tests with full HTTP flow coverage via Jest + supertest",
      ],
      stats: [
        { label: "API Endpoints", value: "~111" },
        { label: "Frontend Routes", value: "48" },
        { label: "DB Entities", value: "30" },
        { label: "Tests", value: "~509" },
      ],
    },
  },
  {
    title: "Salon Management System",
    shortDesc:
      "Multi-branch salon platform managing 7 locations, 600+ customers, and 1000+ bills with POS billing, inventory, and analytics.",
    stack: ["React", "Flask", "MongoDB", "Google Cloud", "Ant Design", "Python"],
    github: "https://github.com/Kishore-official",
    live: "https://saloon-management-system-895210689446.europe-west2.run.app",
    tag: "Full Stack",
    image: "/projects/saloon-1.jpg",
    details: {
      overview:
        "A comprehensive multi-branch salon and spa management platform handling everything from point-of-sale billing and inventory to staff management and business analytics — deployed on Google Cloud Run with a React frontend and Flask + MongoDB backend.",
      highlights: [
        "Multi-branch POS supporting cash, card, UPI, and wallet payments with PDF invoice and GST generation",
        "Real-time inventory tracking with automatic stock reduction on sale and low-stock alerts (≤5 units)",
        "Role-based access control — Owner, Manager, Staff — with JWT authentication and bcrypt password hashing",
        "Appointment scheduling with calendar view, staff assignment, and status tracking",
        "Analytics dashboard with revenue trends, staff performance metrics, and customer lifecycle segmentation",
        "Referral program, membership plans, prepaid package balances, and discount approval workflows",
      ],
      stats: [
        { label: "Branches", value: "7" },
        { label: "Customers", value: "600+" },
        { label: "Bills", value: "1,000+" },
        { label: "DB Collections", value: "30+" },
      ],
    },
  },
  {
    title: "RAG Application",
    shortDesc:
      "Retrieval-Augmented Generation app for intelligent document querying over custom knowledge bases using LangChain and semantic search.",
    stack: ["Python", "LangChain", "RAG", "LLM", "Vector DB"],
    github: "https://github.com/Kishore-official/crop-yield-prediction.git",
    tag: "AI / RAG",
    details: {
      overview:
        "A Retrieval-Augmented Generation application that enables intelligent document querying over custom knowledge bases. Users can ask natural language questions and receive context-aware answers grounded in their own documents using LangChain and semantic vector search.",
      highlights: [
        "Document ingestion and chunking pipeline for indexing custom knowledge bases",
        "Vector embedding storage with semantic similarity search (top-k retrieval, k=4)",
        "LangChain RetrievalQA chain for context-aware, grounded question answering",
        "Configurable LLM backend with prompt engineering for accurate responses",
        "Supports multiple document formats as knowledge base data sources",
      ],
    },
    filename: "rag_pipeline.py",
    codeLines: [
      { text: "retriever = vectorstore.as_retriever(", type: "base" },
      { text: '  search_kwargs={"k": 4}', type: "string" },
      { text: ")", type: "base" },
      { text: "", type: "base" },
      { text: "chain = RetrievalQA.from_chain_type(", type: "keyword" },
      { text: "  llm=llm,", type: "base" },
      { text: "  retriever=retriever", type: "base" },
      { text: ")", type: "base" },
      { text: "", type: "base" },
      { text: "result = chain.run(user_query)", type: "keyword" },
      { text: "", type: "base" },
      { text: "# Output:", type: "comment" },
      { text: '# "Based on the document..."', type: "comment" },
    ],
  },
  {
    title: "N8N Automation Workflows",
    shortDesc:
      "End-to-end business process automation connecting REST APIs, triggering event-driven actions, and integrating third-party services.",
    stack: ["N8N", "Zapier", "REST APIs", "MCP", "Automation"],
    github: "https://github.com/Kishore-official",
    tag: "Automation",
    details: {
      overview:
        "End-to-end business process automation using N8N and Zapier to connect REST APIs, trigger event-driven actions, and integrate third-party services — reducing manual work and enabling AI-powered data pipelines.",
      highlights: [
        "Multi-step automation workflows with webhook triggers and HTTP request nodes",
        "CRM sync automation connecting and reconciling multiple data sources",
        "OpenAI integration for AI-powered data summarization within workflows",
        "Event-driven architecture with conditional branching and error handling",
        "MCP (Model Context Protocol) integrations for AI agent-driven automation",
      ],
    },
    filename: "crm-sync.json",
    codeLines: [
      { text: "// workflow: crm-sync.json", type: "comment" },
      { text: '{ "nodes": [', type: "base" },
      { text: '  { "type": "webhook",', type: "string" },
      { text: '    "name": "CRM Trigger" },', type: "keyword" },
      { text: '  { "type": "httpRequest",', type: "string" },
      { text: '    "name": "Fetch Records" },', type: "base" },
      { text: '  { "type": "openAi",', type: "string" },
      { text: '    "name": "Summarize" }', type: "keyword" },
      { text: "] }", type: "base" },
    ],
  },
  {
    title: "Bizzzup — Company Portfolio Website",
    shortDesc:
      "High-performance business website with multi-agent architecture storytelling, project showcase, built-in chatbot, and conversion-driven sections.",
    stack: ["Next.js", "TypeScript", "CSS", "Google Cloud Run"],
    github: "https://github.com/Kishore-official",
    live: "https://bizzzup-site-895210689446.asia-south1.run.app/",
    tag: "Full Stack",
    image: "/projects/bizzzup-1.png",
    details: {
      overview:
        "A modern, high-performance company portfolio website for Bizzzup AI Labs — built with Next.js App Router and TypeScript. Features clear storytelling, strong visual design, and conversion-driven sections including hero, solutions, project showcase with detail modals, testimonials, team, stats, blog, and a built-in chatbot API route.",
      highlights: [
        "Structured, reusable section components with responsive behavior hooks",
        "Interactive project and blog detail modals with smooth animations",
        "Contact API endpoint for inquiries and chat endpoint for AI assistant experience",
        "SEO-ready with sitemap, robots.txt, Open Graph image, and metadata support",
        "Animation utility layer for premium, smooth UX transitions",
        "Deployed on Google Cloud Run for scalable, production-grade hosting",
      ],
      stats: [
        { label: "Sections", value: "8+" },
        { label: "API Routes", value: "2" },
        { label: "Components", value: "20+" },
        { label: "SEO Score", value: "95+" },
      ],
    },
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────────

const wrap = (i: number, len: number) => ((i % len) + len) % len;

// ── Motion Easing ───────────────────────────────────────────────────────────────

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Staggered Content Variants (active card interior) ───────────────────────────

const contentStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const contentReveal: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE_PREMIUM },
  },
};

const pillStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

const pillReveal: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_PREMIUM },
  },
};

// ── Visual area subtle motion on active slide ───────────────────────────────────

const visualReveal: Variants = {
  inactive: { scale: 1.04, opacity: 0.7 },
  active: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
};

// ── Projects Section ────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const sliderRef = useRef(null);
  const sliderInView = useInView(sliderRef, { once: true, margin: "-60px" });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ── Responsive detection ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Navigation ──
  const navigate = useCallback((dir: -1 | 1) => {
    setActiveIndex((prev) => wrap(prev + dir, projects.length));
  }, []);

  // ── Keyboard support ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (selectedProject) return;
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate, selectedProject]);

  // ── Touch swipe ──
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      navigate(dx > 0 ? 1 : -1);
    }
  };

  // ── Compute card offset from active ──
  const getCardOffset = (index: number) => {
    let offset = index - activeIndex;
    if (offset > projects.length / 2) offset -= projects.length;
    if (offset < -projects.length / 2) offset += projects.length;
    return offset;
  };

  const slideOffset = isMobile ? 260 : 390;
  const noMotion = !!reducedMotion;

  return (
    <>
      <section
        id="projects"
        className="bg-[var(--bg-deep)] py-20 md:py-28 overflow-hidden section-alt"
      >
        {/* ── Section header ── */}
        <div ref={headerRef} className="max-w-content mx-auto px-6 mb-10 md:mb-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <motion.p
                initial={{ opacity: 0, y: noMotion ? 0 : 12 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                className="inline-flex items-center gap-3 font-mono text-[0.68rem] font-medium tracking-[0.18em] uppercase text-accent mb-3"
              >
                <span className="w-[30px] h-px bg-accent" />
                Projects
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: noMotion ? 0 : 16 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: noMotion ? 0 : 0.08, ease: EASE_PREMIUM }}
                className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-text-1"
              >
                Things I&apos;ve Built
              </motion.h2>
            </div>
            <motion.a
              href="https://github.com/Kishore-official"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: noMotion ? 0 : 0.2 }}
              className="hidden md:inline-flex items-center gap-1.5 font-body text-xs text-text-2 hover:text-accent transition-colors min-h-[44px]"
            >
              View all on GitHub →
            </motion.a>
          </div>
        </div>

        {/* ── Slider Stage ── */}
        <motion.div
          ref={sliderRef}
          initial={{ opacity: 0, y: noMotion ? 0 : 30 }}
          animate={sliderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.12, ease: EASE_PREMIUM }}
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Card stage — fixed height container for absolute positioning */}
          <div className="relative flex items-center justify-center h-[500px] md:h-[550px] select-none">

            {/* Edge vignettes — mask side card hard cutoff */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-20 md:w-32 z-[15] bg-gradient-to-r from-bg via-bg/60 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-20 md:w-32 z-[15] bg-gradient-to-l from-bg via-bg/60 to-transparent" />

            {projects.map((project, i) => {
              const offset = getCardOffset(i);
              const isActive = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;

              return (
                <motion.div
                  key={project.title}
                  className={`absolute ${
                    isActive || isAdjacent ? "cursor-pointer" : "pointer-events-none"
                  }`}
                  animate={{
                    x: offset * slideOffset,
                    y: isActive ? 0 : isAdjacent ? 18 : 30,
                    scale: isActive ? 1 : isAdjacent ? 0.78 : 0.65,
                    opacity: isActive ? 1 : isAdjacent ? (isMobile ? 0 : 0.6) : 0,
                    zIndex: isActive ? 10 : isAdjacent ? 5 : 1,
                    rotateY: noMotion ? 0 : isActive ? 0 : offset * -4,
                    filter: isActive
                      ? "blur(0px) brightness(1)"
                      : isAdjacent
                        ? "blur(3px) brightness(0.55)"
                        : "blur(8px) brightness(0.4)",
                  }}
                  transition={
                    noMotion
                      ? { duration: 0 }
                      : {
                          x:       { duration: 0.6, ease: EASE_PREMIUM },
                          y:       { duration: 0.7, ease: EASE_PREMIUM },
                          scale:   { duration: 0.7, ease: EASE_PREMIUM },
                          opacity: { duration: 0.5, ease: EASE_PREMIUM },
                          filter:  { duration: 0.45, ease: "easeOut" },
                          rotateY: { duration: 0.7, ease: EASE_PREMIUM },
                        }
                  }
                  onClick={() => {
                    if (isActive) setSelectedProject(project);
                    else if (isAdjacent) navigate(offset > 0 ? 1 : -1);
                  }}
                  style={{ willChange: "transform, opacity, filter", perspective: 1200 }}
                >
                  {/* ── Slider Card ── */}
                  <TiltCard glare={isActive} className={isActive ? "" : "pointer-events-none"}>
                  <div
                    className={`w-[min(300px,85vw)] h-[470px] md:w-[400px] md:h-[520px] bg-card border rounded-2xl overflow-hidden flex flex-col transition-[border-color,box-shadow] duration-300 ${
                      isActive
                        ? "border-accent/25 active-card-glow"
                        : "border-border/40 shadow-none"
                    }`}
                  >
                    {/* Visual — top 55% with subtle motion */}
                    <motion.div
                      className="h-[55%] shrink-0 overflow-hidden rounded-t-2xl"
                      key={`visual-${i}-${activeIndex}`}
                      variants={noMotion ? undefined : visualReveal}
                      initial={isActive ? "inactive" : false}
                      animate={isActive ? "active" : "inactive"}
                    >
                      <CardVisual project={project} isHovered={isActive} />
                    </motion.div>

                    {/* Content — bottom 45% with stagger animation */}
                    {isActive ? (
                      <motion.div
                        key={`content-active-${activeIndex}`}
                        className="flex-1 p-5 md:p-6 flex flex-col gap-2.5 min-h-0"
                        variants={noMotion ? undefined : contentStagger}
                        initial="hidden"
                        animate="visible"
                      >
                        {/* Tag */}
                        <motion.span
                          variants={noMotion ? undefined : contentReveal}
                          className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent border border-accent/[0.12] bg-accent/[0.06] px-2.5 py-0.5 clip-corners-sm self-start"
                        >
                          {project.tag}
                        </motion.span>

                        {/* Title — white for hierarchy, tag is already ice-blue */}
                        <motion.h3
                          variants={noMotion ? undefined : contentReveal}
                          className="font-display font-bold text-lg md:text-xl leading-snug text-text-1"
                        >
                          {project.title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                          variants={noMotion ? undefined : contentReveal}
                          className="font-body text-sm text-text-2 leading-normal line-clamp-2 flex-1"
                        >
                          {project.shortDesc}
                        </motion.p>

                        {/* Stack pills — each pill individually staggered */}
                        <motion.div
                          variants={noMotion ? undefined : pillStagger}
                          className="flex flex-wrap gap-1.5"
                        >
                          {project.stack.slice(0, 4).map((s) => (
                            <motion.span
                              key={s}
                              variants={noMotion ? undefined : pillReveal}
                              className="font-body text-[11px] text-text-2 border border-border hover:border-accent/30 hover:text-accent rounded-md px-2 py-0.5 transition-colors duration-150 cursor-default"
                            >
                              {s}
                            </motion.span>
                          ))}
                          {project.stack.length > 4 && (
                            <motion.span
                              variants={noMotion ? undefined : pillReveal}
                              className="font-body text-[11px] text-text-3 px-1 py-0.5"
                            >
                              +{project.stack.length - 4}
                            </motion.span>
                          )}
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                          variants={noMotion ? undefined : contentReveal}
                          className="flex gap-2 mt-auto pt-1"
                        >
                          <span className="flex-1 flex items-center justify-center gap-1.5 font-body text-xs font-medium text-text-2 border border-border/60 hover:border-accent/40 hover:text-accent rounded-lg min-h-[40px] transition-colors duration-150">
                            View Details →
                          </span>
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 flex items-center justify-center gap-1.5 font-body text-xs font-medium text-accent border border-accent/25 bg-accent/5 hover:bg-accent/10 rounded-lg min-h-[40px] transition-colors duration-150"
                            >
                              Live Demo →
                            </a>
                          )}
                        </motion.div>
                      </motion.div>
                    ) : (
                      /* Non-active cards — dimmed content, reduced contrast */
                      <div className="flex-1 p-5 md:p-6 flex flex-col gap-2.5 min-h-0 opacity-70">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-3 border border-text-3/20 bg-text-3/5 px-2.5 py-0.5 clip-corners-sm self-start">
                          {project.tag}
                        </span>
                        <h3 className="font-display font-bold text-lg md:text-xl leading-snug text-text-2">
                          {project.title}
                        </h3>
                        <p className="font-body text-sm text-text-3 leading-normal line-clamp-2 flex-1">
                          {project.shortDesc}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.slice(0, 3).map((s) => (
                            <span
                              key={s}
                              className="font-body text-[11px] text-text-3 border border-border/50 rounded-md px-2 py-0.5"
                            >
                              {s}
                            </span>
                          ))}
                          {project.stack.length > 3 && (
                            <span className="font-body text-[11px] text-text-3/60 px-1 py-0.5">
                              +{project.stack.length - 3}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2 mt-auto pt-1">
                          <span className="flex-1 flex items-center justify-center gap-1.5 font-body text-xs font-medium text-text-3 border border-border/40 rounded-lg min-h-[40px]">
                            View Details →
                          </span>
                          {project.live && (
                            <span className="flex-1 flex items-center justify-center gap-1.5 font-body text-xs font-medium text-text-3/60 border border-text-3/15 rounded-lg min-h-[40px]">
                              Live Demo →
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

          {/* ── Navigation Arrows — with hover scale ── */}
          <motion.button
            onClick={() => navigate(-1)}
            aria-label="Previous project"
            whileHover={noMotion ? {} : { scale: 1.12, borderColor: "var(--accent)" }}
            whileTap={noMotion ? {} : { scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-card/90 backdrop-blur-sm border border-border hover:text-accent flex items-center justify-center text-text-2 transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
          <motion.button
            onClick={() => navigate(1)}
            aria-label="Next project"
            whileHover={noMotion ? {} : { scale: 1.12, borderColor: "var(--accent)" }}
            whileTap={noMotion ? {} : { scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-card/90 backdrop-blur-sm border border-border hover:text-accent flex items-center justify-center text-text-2 transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>

        {/* ── Slide Indicators ── */}
        <div className="max-w-content mx-auto px-6 mt-6">
          <div className="flex items-center justify-center gap-4">
            {/* Dot track */}
            <div className="flex items-center gap-2 py-3">
              {projects.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to project ${i + 1}`}
                  animate={{
                    width: i === activeIndex ? 32 : 6,
                    backgroundColor: i === activeIndex ? "var(--accent)" : "var(--border)",
                  }}
                  whileHover={noMotion ? {} : { backgroundColor: i === activeIndex ? "var(--accent)" : "var(--text-3)" }}
                  transition={noMotion ? { duration: 0 } : { duration: 0.35, ease: EASE_PREMIUM }}
                  className="h-1.5 rounded-full"
                />
              ))}
            </div>

            {/* Position counter */}
            <span className="font-body text-xs text-text-3 tabular-nums">
              {activeIndex + 1} / {projects.length}
            </span>
          </div>
        </div>
      </section>

      {/* ── Project Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>
    </>
  );
}
