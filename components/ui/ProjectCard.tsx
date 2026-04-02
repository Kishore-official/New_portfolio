"use client";

import { useState } from "react";
import { motion, Variants } from "motion/react";
import { CardVisual } from "./CardVisual";
import type { Project } from "./project-types";

export const cardEntrance: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function ProjectCard({
  project,
  reducedMotion,
  onClick,
}: {
  project: Project;
  reducedMotion: boolean | null;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={reducedMotion ? {} : cardEntrance}
      whileHover={reducedMotion ? {} : { y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="shrink-0 w-[280px] h-[420px] md:w-[360px] md:h-[500px] bg-card border border-border clip-corners-lg shadow-card hover:shadow-card-hover hover:border-accent/[0.12] transition-colors duration-300 flex flex-col overflow-hidden group cursor-pointer"
    >
      {/* Visual — top 62% */}
      <div className="h-[62%] shrink-0 overflow-hidden">
        <CardVisual project={project} isHovered={isHovered} />
      </div>

      {/* Content — bottom 38% */}
      <div className="flex-1 p-5 flex flex-col gap-2 min-h-0">

        {/* Tag */}
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent border border-accent/[0.12] bg-accent/[0.06] px-2.5 py-0.5 clip-corners-sm self-start">
          {project.tag}
        </span>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-text-1 leading-snug group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm font-light text-text-2 leading-relaxed line-clamp-2 flex-1">
          {project.shortDesc}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((s) => (
            <span
              key={s}
              className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-text-2 border border-border hover:border-accent/[0.12] clip-corners-sm px-2 py-0.5 transition-colors duration-150 cursor-default"
            >
              {s}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="font-body text-[11px] text-text-3 px-1 py-0.5">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {/* GitHub / Live links */}
        <div className="flex gap-2 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group/btn flex-1 flex items-center justify-center gap-1.5 font-body text-xs font-medium text-text-2 border border-border hover:border-accent/[0.2] hover:text-accent clip-corners min-h-[44px] transition-colors duration-150"
          >
            GitHub
            <span className="inline-block transition-transform duration-150 group-hover/btn:translate-x-[3px]">
              →
            </span>
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/live flex-1 flex items-center justify-center gap-1.5 font-body text-xs font-medium text-accent border border-accent/[0.12] bg-accent/[0.06] hover:bg-accent/[0.1] clip-corners min-h-[44px] transition-colors duration-150"
            >
              Live
              <span className="inline-block transition-transform duration-150 group-hover/live:translate-x-[3px]">
                →
              </span>
            </a>
          )}
        </div>

      </div>
    </motion.div>
  );
}
