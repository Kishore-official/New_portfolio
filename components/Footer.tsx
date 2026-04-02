"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();

  return (
    <footer className="bg-[var(--bg-deep)] px-6 pt-0 pb-8" ref={ref}>

      {/* Gradient separator — accent-tinted */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
      >

        {/* Identity line */}
        <p className="font-body text-xs text-text-3">
          Kishore V · AI Engineer · Chennai, India
        </p>

        {/* Links + copyright */}
        <div className="flex items-center gap-5">
          <motion.a
            href="https://github.com/Kishore-official"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reducedMotion ? {} : { y: -2 }}
            transition={{ duration: 0.2 }}
            className="font-body text-xs text-text-3 hover:text-accent transition-colors min-h-[44px] inline-flex items-center"
          >
            GitHub
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/kishore-v2"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reducedMotion ? {} : { y: -2 }}
            transition={{ duration: 0.2 }}
            className="font-body text-xs text-text-3 hover:text-accent transition-colors min-h-[44px] inline-flex items-center"
          >
            LinkedIn
          </motion.a>
          <motion.a
            href="mailto:arunkishore757@gmail.com"
            whileHover={reducedMotion ? {} : { y: -2 }}
            transition={{ duration: 0.2 }}
            className="font-body text-xs text-text-3 hover:text-accent transition-colors min-h-[44px] inline-flex items-center"
          >
            Email
          </motion.a>
          <span className="w-px h-3 bg-border" />
          <span className="font-body text-xs text-text-3">© 2026 Kishore V</span>
        </div>

      </motion.div>
    </footer>
  );
}
