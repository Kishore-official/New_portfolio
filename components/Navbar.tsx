"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const links = [
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-[clamp(1.5rem,4vw,3rem)] transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(7,6,11,0.85)] backdrop-blur-[20px] backdrop-saturate-[1.4] border-b border-border shadow-card"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto h-20 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="w-2 h-2 bg-accent clip-corners-sm transition-transform duration-300 group-hover:rotate-45" />
          <span className="font-display font-extrabold text-base tracking-tight text-text-1 group-hover:text-accent transition-colors duration-200">
            Kishore V
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative font-display text-[0.75rem] font-semibold text-text-2 uppercase tracking-[0.12em] hover:text-text-1 transition-colors duration-300 pb-1
                         after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-accent
                         after:transition-[width] after:duration-400 hover:after:w-full"
              style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-xs font-bold uppercase tracking-[0.1em] bg-accent text-bg px-5 py-2.5 clip-corners hover:bg-[#deff6a] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(200,255,46,0.3)] transition-all duration-400"
            style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
          >
            Resume
          </a>
        </nav>

        {/* Mobile hamburger — 44px touch target */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 min-h-[44px] min-w-[44px] items-center"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`block h-[1.5px] w-5 bg-text-2 transition-transform duration-200 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-[1.5px] w-5 bg-text-2 transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-[1.5px] w-5 bg-text-2 transition-transform duration-200 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>

      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-card border-b border-border shadow-card px-4 py-4 flex flex-col gap-1"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-body text-sm text-text-2 hover:text-text-1 hover:bg-surface rounded-lg transition-all min-h-[44px] flex items-center px-3"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-xs font-bold uppercase tracking-[0.1em] bg-accent text-bg px-4 py-3 text-center clip-corners hover:bg-[#deff6a] transition-colors mt-3"
          >
            Resume
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
