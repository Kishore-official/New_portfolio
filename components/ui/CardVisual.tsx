"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { CodeLine, Project } from "./project-types";

const syntaxClass: Record<NonNullable<CodeLine["type"]>, string> = {
  keyword: "text-accent",
  string:  "text-accent-2",
  comment: "text-text-3",
  base:    "text-text-2",
};

export function CardVisual({
  project,
  isHovered,
}: {
  project: Project;
  isHovered: boolean;
}) {
  if (project.image) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-surface flex items-center justify-center">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-contain object-center"
          sizes="(max-width: 768px) 280px, 360px"
        />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-surface to-surface/0 pointer-events-none" />
      </div>
    );
  }

  return (
    <motion.div
      className="relative w-full h-full bg-surface flex flex-col overflow-hidden"
      animate={{ filter: isHovered ? "brightness(1.1)" : "brightness(1)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Scanline overlay */}
      <div className="scanlines pointer-events-none absolute inset-0 z-10" />

      {/* Terminal title bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border shrink-0 relative z-20">
        <span className="w-2 h-2 rounded-full bg-text-3" />
        <span className="w-2 h-2 rounded-full bg-text-3" />
        <span className="w-2 h-2 rounded-full bg-text-3" />
        {project.filename && (
          <span className="font-mono text-[10px] text-text-3 ml-2 tracking-wide">
            {project.filename}
          </span>
        )}
      </div>

      {/* Code lines */}
      <div className="flex-1 px-3 py-3 overflow-hidden relative z-20">
        {project.codeLines?.map((line, i) => (
          <div key={i} className="flex gap-2 leading-relaxed">
            <span className="font-mono text-[11px] text-text-3/50 select-none w-4 shrink-0 tabular-nums text-right">
              {line.text !== "" ? i + 1 : ""}
            </span>
            <span className={`font-mono text-[11px] whitespace-pre ${syntaxClass[line.type ?? "base"]}`}>
              {line.text}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
