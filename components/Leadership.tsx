"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const achievements = [
  {
    symbol: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="7.5" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="13.5" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 16c0-3.314 2.462-6 5.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 16c0-3.314 2.462-6 5.5-6S19 12.686 19 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Student Leader",
    detail: "Managed 10+ volunteers across campus initiatives",
    featured: false,
  },
  {
    symbol: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M4 16L13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13 4L16 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 7L7 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="16" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    title: "State-Level Cricket",
    detail: "Captain — led the team at state-level competitions",
    featured: true,
  },
  {
    symbol: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M14 4H6l5 6-5 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "I-MATH Club",
    detail: "Executive member — organized technical events at PSNACET",
    featured: false,
  },
  {
    symbol: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2.5 2.5" />
      </svg>
    ),
    title: "Rotary Club",
    detail: "Executive member — community and leadership programs",
    featured: false,
  },
];

export default function Leadership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();

  return (
    <section id="achievements" className="bg-surface py-20 md:py-28 px-6 bg-mesh">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-content mx-auto relative z-10" ref={ref}>

        <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-10 md:gap-14 items-start">

          {/* Left: heading block */}
          <motion.div
            initial={{ opacity: 0, x: reducedMotion ? 0 : -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 font-mono text-[0.68rem] font-medium tracking-[0.18em] uppercase text-accent mb-3">
              <span className="w-[30px] h-px bg-accent" />
              Achievements
            </div>
            <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.5vw,2rem)] text-text-1 leading-tight mb-4">
              Beyond the keyboard
            </h2>
            <p className="font-body text-sm font-light text-text-2 leading-relaxed">
              Leadership, sport, and community work that shaped how I think, collaborate, and perform under pressure.
            </p>
          </motion.div>

          {/* Right: 2×2 achievement cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 18, scale: reducedMotion ? 1 : 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: reducedMotion ? 0 : 0.1 + 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reducedMotion ? {} : { y: -5, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                className={`group clip-corners p-5 border transition-[border-color,box-shadow] duration-300 ${
                  a.featured
                    ? "bg-accent/[0.04] border-accent/[0.15] hover:border-accent/[0.25] shadow-card hover:shadow-card-hover"
                    : "bg-card border-border hover:border-accent/[0.12] shadow-card hover:shadow-card-hover"
                }`}
              >
                {/* Symbol */}
                <span
                  className={`inline-flex mb-3 ${
                    a.featured ? "text-accent" : "text-text-3 group-hover:text-accent transition-colors duration-200"
                  }`}
                >
                  {a.symbol}
                </span>

                <p className={`font-display font-bold text-sm leading-snug mb-1.5 ${
                  a.featured ? "text-accent" : "text-text-1"
                }`}>
                  {a.title}
                </p>
                <p className="font-body text-xs font-light text-text-2 leading-relaxed">
                  {a.detail}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
