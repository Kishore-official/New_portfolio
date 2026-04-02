"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, Variants } from "motion/react";

interface SkillGroup {
  label: string;
  description: string;
  skills: string[];
}

const groups: SkillGroup[] = [
  {
    label: "Frontend",
    description: "Building responsive, interactive user interfaces with modern web standards.",
    skills: ["HTML", "CSS", "Bootstrap", "JavaScript", "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    label: "Backend",
    description: "Server-side logic and full-stack web application development.",
    skills: ["Python", "Django", "NestJS", "Flask"],
  },
  {
    label: "Database",
    description: "Relational and NoSQL database design, querying, and management.",
    skills: ["MySQL", "MongoDB", "PostgreSQL"],
  },
  {
    label: "DevOps & Tools",
    description: "Version control, containerization, and cloud deployment.",
    skills: ["Git", "GitHub", "Docker", "Google Cloud Run"],
  },
  {
    label: "AI & Automation",
    description: "Designing multi-agent systems, autonomous AI workflows, and end-to-end business process automation.",
    skills: ["CrewAI", "Google ADK", "LangChain", "N8N", "Zapier", "MCP"],
  },
  {
    label: "AI & Dev Tools",
    description: "Using AI-assisted development tools to build and ship full-stack applications faster and more effectively.",
    skills: ["Cursor", "Claude Code", "GitHub Copilot", "Prompt Engineering"],
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const tagStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.25 } },
};

const tagReveal: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

function SkillCard({ group, index, reducedMotion }: {
  group: SkillGroup;
  index: number;
  reducedMotion: boolean | null;
}) {
  return (
    <motion.div
      variants={reducedMotion ? {} : cardVariants}
      whileHover={reducedMotion ? {} : { y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      className="group bg-card border border-border clip-corners shadow-card hover:shadow-card-hover hover:border-accent/[0.12] transition-[border-color,box-shadow] duration-300 p-6 flex flex-col gap-5"
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-text-3">
              {String(index).padStart(2, "0")}
            </span>
            <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-accent">
              {group.label}
            </p>
          </div>
          <p className="font-body text-sm font-light text-text-2 leading-relaxed">
            {group.description}
          </p>
        </div>
        <span className="font-body text-xs text-text-3 shrink-0 tabular-nums mt-0.5">
          {group.skills.length}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Skill tags — staggered pop-in */}
      <motion.div
        variants={reducedMotion ? {} : tagStagger}
        className="flex flex-wrap gap-2"
      >
        {group.skills.map((skill) => (
          <motion.span
            key={skill}
            variants={reducedMotion ? {} : tagReveal}
            whileHover={reducedMotion ? {} : { scale: 1.08, borderColor: "rgba(126, 184, 218, 0.3)", transition: { duration: 0.15 } }}
            className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-accent bg-accent/[0.05] border border-accent/[0.1] clip-corners-sm px-3 py-1 hover:text-accent transition-colors duration-150 cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const reducedMotion = useReducedMotion();
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="relative bg-surface py-20 md:py-28 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-content mx-auto px-6 relative z-10">

        {/* Section header */}
        <motion.div
          ref={headerRef}
          variants={reducedMotion ? {} : headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 font-mono text-[0.68rem] font-medium tracking-[0.18em] uppercase text-accent mb-3">
            <span className="w-[30px] h-px bg-accent" />
            Skills
          </div>
          <h2 className="font-display font-extrabold text-[clamp(1.6rem,3vw,2.2rem)] text-text-1">
            Tools &amp; Technologies
          </h2>
        </motion.div>

        {/* Cards grid — staggered entrance */}
        <motion.div
          ref={gridRef}
          variants={reducedMotion ? {} : gridVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-4"
        >
          {groups.map((group, i) => (
            <SkillCard
              key={group.label}
              group={group}
              index={i + 1}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
