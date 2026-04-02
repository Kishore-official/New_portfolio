"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, Variants } from "motion/react";
import ParticleCloud from "./3d/ParticleCloud";

const terminalLines = [
  { key: "role",     value: "AI Engineer @ BIZZZUP" },
  { key: "focus",    value: "RAG · LLM · Automation" },
  { key: "stack",    value: "Next.js · Python · NestJS" },
  { key: "location", value: "Chennai, India" },
  { key: "status",   value: "open to roles", highlight: true },
];

// ── Typewriter cycling line ────────────────────────────────────────────────────

const phrases = [
  "Currently building: RAG pipeline for document retrieval",
  "Last shipped: LLM integration with multi-turn context",
  "Automating: CRM workflows with N8N + Zapier",
  "Exploring: MCP server development & agentic systems",
];

function TypewriterLine({ reducedMotion }: { reducedMotion: boolean | null }) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reducedMotion) return;

    const phrase = phrases[phraseIdx];
    let charIdx = 0;
    setDisplayed("");
    setVisible(true);

    let holdTimer: ReturnType<typeof setTimeout>;
    let switchTimer: ReturnType<typeof setTimeout>;

    const typeInterval = setInterval(() => {
      charIdx++;
      setDisplayed(phrase.slice(0, charIdx));
      if (charIdx >= phrase.length) {
        clearInterval(typeInterval);
        holdTimer = setTimeout(() => {
          setVisible(false);
          switchTimer = setTimeout(() => {
            setPhraseIdx((i) => (i + 1) % phrases.length);
          }, 350);
        }, 2000);
      }
    }, 38);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(holdTimer);
      clearTimeout(switchTimer);
    };
  }, [phraseIdx, reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="flex items-center gap-1.5 font-mono text-xs text-text-2 mb-6">
        <span className="text-text-3 select-none shrink-0">&gt;</span>
        <span>{phrases[0]}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-0 font-mono text-xs mb-6 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-text-3 select-none shrink-0 mr-1.5">&gt;</span>
      <span className="text-text-2">{displayed}</span>
      <span className="text-accent animate-pulse ml-px">▋</span>
    </div>
  );
}

// ── fade helper ──────────────────────────────────────────────────────────────

function makeFade(delay = 0, reducedMotion: boolean | null) {
  return {
    initial: { opacity: 0, y: reducedMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.65,
      delay: reducedMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  };
}

// Words with their line-break and accent metadata
const headlineWords = [
  { text: "Building",     accent: false, br: false },
  { text: "intelligent",  accent: false, br: true  },
  { text: "systems",      accent: false, br: false },
  { text: "that",         accent: false, br: true  },
  { text: "actually",     accent: true,  br: false },
  { text: "think.",       accent: true,  br: false },
];

export default function Hero() {
  const reducedMotion = useReducedMotion();

  const headlineContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.04,
        delayChildren:   reducedMotion ? 0 : 0.2,
      },
    },
  };

  const wordVariant: Variants = {
    hidden:  { opacity: 0, y: reducedMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-12 lg:pt-24 lg:pb-16 overflow-hidden hero-grid"
    >
      {/* ── Floating gradient orbs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-gradient-orb" />
        <div className="hero-gradient-orb" />
        <div className="hero-gradient-orb" />
      </div>

      {/* ── Radial vignette ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, var(--bg-deep) 100%)",
        }}
      />

      {/* ── Floating availability badge ── */}
      <div className="absolute top-24 right-6 lg:right-10 z-10">
        <div className="flex items-center gap-2 bg-card border border-border shadow-card px-3 py-1.5 clip-corners-sm">
          <span className="w-[5px] h-[5px] rounded-full bg-accent shadow-[0_0_8px_rgba(200,255,46,0.6)] animate-pulse" />
          <span className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em]">
            Available for hire
          </span>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-content mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-center">

          {/* Left: text content */}
          <div>
            {/* Section label */}
            <motion.div {...makeFade(0.1, reducedMotion)} className="mb-8">
              <div className="inline-flex items-center gap-2.5 bg-accent/[0.06] border border-accent/[0.12] clip-corners-sm px-4 py-1.5 mb-4">
                <span className="block w-[5px] h-[5px] rounded-full bg-accent shadow-[0_0_8px_rgba(200,255,46,0.6)]" />
                <span className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-accent">
                  AI Engineer @ BIZZZUP
                </span>
              </div>
              <div className="h-px w-48 bg-gradient-to-r from-accent/60 via-accent/20 to-transparent" />
            </motion.div>

            {/* ── Headline: word-by-word stagger ── */}
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="visible"
              className="font-display font-extrabold text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.98] tracking-[-0.04em] text-text-1 mb-6"
            >
              {headlineWords.map((word, i) => (
                <span key={i}>
                  <motion.span
                    variants={wordVariant}
                    className={`inline-block${word.accent ? " gradient-text" : ""}`}
                  >
                    {word.text}
                  </motion.span>
                  {!word.br && i < headlineWords.length - 1 && (
                    <span className="inline-block w-[0.28em]" />
                  )}
                  {word.br && <br />}
                </span>
              ))}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...makeFade(0.35, reducedMotion)}
              className="font-body text-[1.05rem] font-light text-text-2 max-w-lg leading-[1.75] mb-5"
            >
              I&apos;m Kishore V — an AI Engineer at BIZZZUP, based in Chennai, India.
              I build RAG pipelines, LLM integrations, automation workflows with N8N and Zapier,
              and CRM management systems — leveraging AI tools like Claude to optimize workflows,
              improve efficiency, and deliver high-quality solutions.
            </motion.p>

            {/* Typewriter cycling line */}
            <motion.div {...makeFade(0.42, reducedMotion)}>
              <TypewriterLine reducedMotion={reducedMotion} />
            </motion.div>

            {/* CTAs — clip-path signature buttons */}
            <motion.div {...makeFade(0.5, reducedMotion)} className="flex flex-wrap gap-4 mb-8">
              <motion.a
                href="#projects"
                className="font-display text-[0.8rem] font-bold uppercase tracking-[0.1em] bg-accent text-bg px-7 py-3.5 clip-corners hover:bg-[#deff6a] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(200,255,46,0.3)] transition-all duration-400"
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                whileHover={reducedMotion ? {} : { scale: 1.02, transition: { duration: 0.15 } }}
                whileTap={reducedMotion ? {} : { scale: 0.98, transition: { duration: 0.15 } }}
              >
                View Work
              </motion.a>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[0.8rem] font-bold uppercase tracking-[0.1em] border border-text-3 text-text-1 px-7 py-3.5 clip-corners hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-400"
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              >
                Download Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div {...makeFade(0.65, reducedMotion)} className="flex items-center gap-8 flex-wrap">
              <span className="font-body text-xs text-text-3 uppercase tracking-[0.12em]">
                Find me on
              </span>
              <a
                href="https://github.com/Kishore-official"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-text-2 hover:text-accent transition-colors min-h-[44px] inline-flex items-center"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/kishore-v2"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-text-2 hover:text-accent transition-colors min-h-[44px] inline-flex items-center"
              >
                LinkedIn
              </a>
              <a
                href="mailto:arunkishore757@gmail.com"
                className="font-body text-xs text-text-2 hover:text-accent transition-colors min-h-[44px] inline-flex items-center"
              >
                Email
              </a>
            </motion.div>
          </div>

          {/* ── Right: terminal card (desktop only) ── */}
          <motion.aside
            initial={{ opacity: 0, x: reducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: reducedMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
            className="hidden lg:flex flex-col gap-3"
          >
            {/* Terminal window */}
            <div className="bg-card border border-border clip-corners-lg overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface">
                <span className="w-2.5 h-2.5 rounded-full bg-text-3/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-text-3/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-text-3/30" />
                <span className="font-mono text-[10px] text-text-3 ml-2 tracking-wide">
                  kishore@bizzzup ~ %
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 flex flex-col gap-2">
                {terminalLines.map((line) => (
                  <div key={line.key} className="flex items-center gap-2 font-mono text-[13px]">
                    <span className="text-accent select-none shrink-0">›</span>
                    <span className="text-text-2 shrink-0 min-w-[56px]">{line.key}</span>
                    <span className="text-text-3 shrink-0">:</span>
                    <span className={line.highlight ? "text-accent" : "text-text-2"}>
                      {line.value}
                    </span>
                    {line.highlight && (
                      <span className="w-[5px] h-[5px] rounded-full bg-accent shadow-[0_0_8px_rgba(200,255,46,0.6)] animate-pulse ml-1 shrink-0" />
                    )}
                  </div>
                ))}

                {/* Blinking cursor */}
                <div className="flex items-center gap-2 font-mono text-[13px] mt-1">
                  <span className="text-accent select-none shrink-0">›</span>
                  <span className="inline-block w-[7px] h-[14px] bg-accent/70 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.aside>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-3">
          scroll
        </span>
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-accent/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
