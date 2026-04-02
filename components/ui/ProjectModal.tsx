"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import type { Project } from "./project-types";

export function ProjectModal({
  project,
  onClose,
  reducedMotion,
}: {
  project: Project;
  onClose: () => void;
  reducedMotion: boolean | null;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[var(--bg-deep)]/85 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96, y: reducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.96, y: reducedMotion ? 0 : 8 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-card border border-border clip-corners-lg shadow-card max-w-2xl w-full max-h-[88vh] overflow-y-auto scrollbar-hide"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-lg leading-none text-text-2 hover:text-text-1 border border-border hover:border-accent/[0.2] clip-corners transition-colors duration-150 z-10 bg-card"
        >
          ×
        </button>

        <div className="p-6 md:p-8 flex flex-col gap-6">
          {/* Header */}
          <div>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent border border-accent/[0.12] bg-accent/[0.06] px-2.5 py-0.5 clip-corners-sm">
              {project.tag}
            </span>
            <h2 className="font-display font-bold text-xl md:text-2xl text-text-1 mt-3 pr-8 leading-snug">
              {project.title}
            </h2>
          </div>

          {/* Overview */}
          <p className="font-body text-sm font-light text-text-2 leading-relaxed">
            {project.details.overview}
          </p>

          {/* Stats */}
          {project.details.stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {project.details.stats.map((stat) => (
                <div key={stat.label} className="bg-surface border border-border clip-corners p-3 text-center">
                  <span className="font-display font-bold text-lg text-text-1 tabular-nums">{stat.value}</span>
                  <p className="font-body text-xs text-text-2 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Highlights */}
          <div>
            <div className="inline-flex items-center gap-3 font-mono text-[0.6rem] font-medium tracking-[0.16em] uppercase text-text-3 mb-3">
              <span className="w-[20px] h-px bg-text-3" />
              Highlights
            </div>
            <ul className="flex flex-col gap-2.5">
              {project.details.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-accent shrink-0 mt-[1px] leading-5">—</span>
                  <span className="font-body text-sm font-light text-text-2 leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <div className="inline-flex items-center gap-3 font-mono text-[0.6rem] font-medium tracking-[0.16em] uppercase text-text-3 mb-3">
              <span className="w-[20px] h-px bg-text-3" />
              Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-text-2 border border-border clip-corners-sm px-3 py-1">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="section-divider" />

          {/* Links */}
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 font-body text-sm text-text-2 border border-border hover:border-accent/[0.2] hover:text-accent clip-corners min-h-[44px] inline-flex items-center justify-center transition-colors duration-150"
            >
              GitHub ↗
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 font-body text-sm text-accent border border-accent/[0.12] bg-accent/[0.06] hover:bg-accent/[0.1] clip-corners min-h-[44px] inline-flex items-center justify-center transition-colors duration-150"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
