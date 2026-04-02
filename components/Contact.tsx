"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, Variants } from "motion/react";

const links = [
  {
    label: "Email",
    handle: "arunkishore757@gmail.com",
    href: "mailto:arunkishore757@gmail.com",
    external: true,
  },
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/kishore-v2",
    href: "https://www.linkedin.com/in/kishore-v2",
    external: true,
  },
  {
    label: "GitHub",
    handle: "github.com/Kishore-official",
    href: "https://github.com/Kishore-official",
    external: true,
  },
];

const headingWords = ["Let's", "build", "something."];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();

  const labelVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  const headingContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.07,
        delayChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };

  const wordVariant: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const subtextVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: reducedMotion ? 0 : 0.38, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 14 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        delay: reducedMotion ? 0 : 0.55 + 0.08 * i,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section id="contact" className="bg-surface py-20 md:py-28 px-6 bg-mesh">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-content mx-auto relative z-10" ref={ref}>

        {/* Section label */}
        <motion.div
          variants={labelVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="inline-flex items-center gap-3 font-mono text-[0.68rem] font-medium tracking-[0.18em] uppercase text-accent mb-4"
        >
          <span className="w-[30px] h-px bg-accent" />
          Contact
        </motion.div>

        {/* Heading — word-by-word stagger */}
        <motion.h2
          variants={headingContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-text-1 mb-5 flex flex-wrap gap-x-[0.3em]"
        >
          {headingWords.map((word) => (
            <motion.span key={word} variants={wordVariant} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={subtextVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-body text-base font-light text-text-2 leading-relaxed max-w-lg mb-14"
        >
          I&apos;m currently open to AI engineering and full-stack roles. If
          you&apos;re building something interesting, I&apos;d like to hear
          about it.
        </motion.p>

        {/* Link rows */}
        <div className="flex flex-col divide-y divide-border border-t border-b border-border">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              variants={linkVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              whileHover={reducedMotion ? {} : { x: 6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="group flex items-center justify-between gap-6 py-5 transition-colors duration-200 hover:bg-accent/[0.02] rounded-lg px-2 -mx-2"
            >
              {/* Platform label */}
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-3 w-24 shrink-0">
                {l.label}
              </span>

              {/* Handle */}
              <span className="font-display font-semibold text-base md:text-lg text-text-1 group-hover:text-accent group-hover:translate-x-2 transition-all duration-200 flex-1 truncate inline-block">
                {l.handle}
              </span>

              {/* Arrow */}
              <span className="text-text-3 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 text-base shrink-0 inline-block">
                →
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
