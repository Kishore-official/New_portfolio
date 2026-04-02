"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const certs = [
  {
    title: "Python Full Stack Developer Training",
    issuer: "Login360 Technologies",
    year: "2024",
    type: "Training",
    featured: false,
  },
  {
    title: "Tech Test'20 Coding Contest",
    issuer: "PSNACET",
    year: "2020",
    type: "Competition",
    featured: false,
  },
  {
    title: "HCIA-Cloud Computing V4.0",
    issuer: "Huawei · PSNACET",
    year: "2023",
    type: "Certification",
    featured: true,
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic Education",
    year: "2026",
    type: "Certification",
    featured: false,
  },
  {
    title: "AI Impact Summit Buildathon",
    issuer: "GUVI",
    year: "2025",
    type: "Competition",
    featured: false,
    url: "https://www.guvi.in/share-certificate/dI1oxFg257p6973P21",
  },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();

  return (
    <section id="certifications" className="py-20 md:py-28 px-6 bg-[var(--bg-deep)] section-alt">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-content mx-auto relative z-10" ref={ref}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-3 font-mono text-[0.68rem] font-medium tracking-[0.18em] uppercase text-accent mb-3"
        >
          <span className="w-[30px] h-px bg-accent" />
          Certifications
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-[clamp(1.6rem,3vw,2.2rem)] text-text-1 mb-10"
        >
          Credentials &amp; Training
        </motion.h2>

        {/* cert cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {certs.map((c, i) => {
            const inner = (
              <>
                <p className={`font-display font-semibold text-sm leading-snug ${
                  c.featured ? "text-accent" : "text-text-1"
                }`}>
                  {c.title}
                </p>
                <div className="flex items-center justify-between gap-2 mt-auto pt-1">
                  <p className="font-body text-xs text-text-2 truncate">{c.issuer}</p>
                  <span className="font-mono text-[11px] text-text-3 shrink-0 tabular-nums">{c.year}</span>
                </div>
                {"url" in c && (
                  <span className="font-mono text-[10px] text-accent/60 mt-1">View credential ↗</span>
                )}
              </>
            );

            const cardClass = `relative bg-card border clip-corners px-5 py-4 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col gap-2 ${
              c.featured
                ? "border-l-2 border-l-accent border-border hover:border-accent/[0.15]"
                : "border-border hover:border-accent/[0.1]"
            }`;

            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 16, scale: reducedMotion ? 1 : 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reducedMotion ? {} : { y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              >
                {"url" in c ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    {inner}
                  </a>
                ) : (
                  <div className={cardClass}>{inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
