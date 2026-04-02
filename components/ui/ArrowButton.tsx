"use client";

import { motion } from "motion/react";

export function ArrowButton({
  direction,
  onClick,
  reducedMotion,
}: {
  direction: "left" | "right";
  onClick: () => void;
  reducedMotion: boolean | null;
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={reducedMotion ? {} : { scale: 1.05, backgroundColor: "var(--surface)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-card border border-border shadow-card hover:border-accent/40 hover:text-accent items-center justify-center text-text-2 ${
        direction === "left" ? "left-2" : "right-2"
      }`}
    >
      {direction === "left" ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </motion.button>
  );
}
