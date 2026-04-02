"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const stats = [
  { value: "5+",  label: "Projects Shipped" },
  { value: "AI",  label: "Engineer @ BIZZZUP" },
  { value: "RAG", label: "& Automation" },
];

const timeline = [
  {
    role: "AI Engineer",
    org: "BIZZZUP",
    period: "Jul 2025 – Present",
    active: true,
  },
  {
    role: "ML Intern",
    org: "BIZZZUP",
    period: "Jan 2025 – Jul 2025",
    active: false,
  },
  {
    role: "CS Graduate",
    org: "B.E. Computer Science",
    period: "2024",
    active: false,
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" className="relative py-24 md:py-28 px-6 overflow-hidden section-alt">
      {/* Section divider top */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-content mx-auto relative z-10" ref={ref}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 font-mono text-[0.68rem] font-medium tracking-[0.18em] uppercase text-accent mb-8"
        >
          <span className="w-[30px] h-px bg-accent" />
          About
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10 items-start">

          {/* ── Col 1: Bio ── */}
          <motion.div
            initial={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-1"
          >
            <h2 className="font-display font-extrabold text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-text-1 mb-6">
              Build systems that
              <br />
              <span className="gradient-text">think, learn, automate.</span>
            </h2>
            <p className="font-body text-sm font-light text-text-2 leading-relaxed">
              I&apos;m an AI Engineer at BIZZZUP and a 2024 Computer Science graduate.
              I design and ship RAG pipelines, LLM integrations, CRM management systems,
              and end-to-end automation workflows using N8N, Zapier, and MCP — leveraging
              AI tools like Claude to optimize workflows and deliver high-quality solutions,
              backed by a strong full-stack foundation with React, NestJS, Flask, and Python.
            </p>
            <p className="font-body text-sm font-light text-text-2 leading-relaxed mt-4">
              Off the screen, I&apos;m a state-level cricket captain — which means
              I know how to lead under pressure, coordinate a team, and stay calm
              when the build breaks at 2 AM.
            </p>
          </motion.div>

          {/* ── Col 2: Experience timeline ── */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: reducedMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-1"
          >
            <div className="inline-flex items-center gap-3 font-mono text-[0.68rem] font-medium tracking-[0.18em] uppercase text-accent mb-5">
              <span className="w-[30px] h-px bg-accent" />
              Experience
            </div>

            <div className="relative flex flex-col gap-0">
              {/* Vertical line — animated height */}
              <motion.div
                className="absolute left-[5px] top-2 bottom-2 w-px bg-border origin-top"
                initial={{ scaleY: reducedMotion ? 1 : 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.8, delay: reducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
              />

              {timeline.map((entry, i) => (
                <motion.div
                  key={entry.role}
                  className="relative pl-7 pb-8 last:pb-0"
                  initial={{ opacity: 0, x: reducedMotion ? 0 : -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Dot */}
                  <motion.span
                    className={`absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 ${
                      entry.active
                        ? "bg-accent border-accent shadow-[0_0_8px_rgba(200,255,46,0.4)]"
                        : "bg-surface border-text-3"
                    }`}
                    initial={{ scale: reducedMotion ? 1 : 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.3 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
                  />

                  <p className="font-display font-semibold text-sm text-text-1 leading-snug">
                    {entry.role}
                  </p>
                  <p className="font-body text-xs text-accent mt-0.5">{entry.org}</p>
                  <p className="font-body text-xs text-text-3 mt-1">{entry.period}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Col 3: Stats + availability ── */}
          <motion.div
            initial={{ opacity: 0, x: reducedMotion ? 0 : 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: reducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-1 flex flex-col gap-4"
          >
            {/* Stat chips — staggered entrance */}
            <div className="grid grid-cols-1 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 16, scale: reducedMotion ? 1 : 0.95 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={reducedMotion ? {} : { x: 4, borderColor: "rgba(200, 255, 46, 0.2)", transition: { duration: 0.2 } }}
                  className="bg-card border border-border shadow-card clip-corners p-4 border-l-2 border-l-accent transition-[border-color] duration-200"
                >
                  <p className="font-display font-bold text-2xl gradient-text mb-1">{s.value}</p>
                  <p className="font-body text-xs text-text-2 leading-tight">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Availability card */}
            <div className="bg-card border border-border shadow-card clip-corners p-5">
              <div className="inline-flex items-center gap-3 font-mono text-[0.68rem] font-medium tracking-[0.18em] uppercase text-text-3 mb-3">
                <span className="w-[30px] h-px bg-text-3" />
                Currently
              </div>
              <p className="font-body text-sm text-text-1">
                Open to{" "}
                <span className="text-accent">AI engineering &amp; full-stack</span>{" "}
                roles — currently working as AI Engineer at BIZZZUP.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="block w-[5px] h-[5px] rounded-full bg-accent shadow-[0_0_8px_rgba(200,255,46,0.6)]" />
                <span className="font-body text-xs text-text-2">
                  Chennai, India · Remote-friendly
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
