---
name: motion-ui
description: Use when someone asks to animate a section, add scroll-based motion, create staggered text reveals, build premium animated transitions, or build visually compelling animated landing page sections.
argument-hint: [section type, e.g. hero, features, pricing]
---

## What This Skill Does

Builds animated, visually compelling UI sections with scroll-based motion, staggered reveals, fade-ins, slide-ups, and premium transitions. This is the animation-focused skill — use `/layout-system` for structure-only work and `/ui-refine` for polishing existing UI.

## Before You Start

1. Read `design-system-reference.md` for the canonical color palette and motion rules.
2. Read `globals.css` `@theme inline` block for current CSS token values.
3. Read `THREE-SKILL-FRONTEND-SYSTEM.md` in the project root for shared rules.
4. Scan existing components in the project to understand current folder structure, naming conventions, and patterns.
5. Determine the current stack:
   - If the project uses **Next.js + Tailwind + Framer Motion**: generate React components with Tailwind classes and Framer Motion animations.
   - If the project uses **vanilla HTML/CSS/JS**: generate semantic HTML with CSS animations and vanilla JS for scroll-triggered effects.
   - Always match the existing stack. Do not introduce a new framework unless explicitly requested.

## Steps

1. Parse the argument `` to determine what section or page type to build (e.g., hero, features, pricing, testimonials, stats, CTA).
2. If the argument is ambiguous, ask the user to clarify what they want animated and the general content/purpose.
3. Design the section with these animation principles:
   - **Smooth and subtle** — no jarring, flashy, or aggressive motion
   - **Premium feel** — animations should feel intentional and polished
   - **Performance-friendly** — use `will-change`, GPU-accelerated properties (`transform`, `opacity`), avoid layout thrashing
   - **Accessible** — respect `prefers-reduced-motion` media query
4. Apply animation patterns appropriate to the section type:
   - **Hero sections:** staggered text reveal, fade-in with upward slide, subtle background motion
   - **Feature cards:** scroll-triggered staggered entrance, hover lift/glow
   - **Stats/numbers:** count-up animation on scroll, fade-in
   - **Testimonials:** carousel transitions, fade/slide between items
   - **CTA sections:** attention-drawing subtle pulse or glow, entrance animation
   - **General sections:** scroll-triggered fade-in-up with stagger between child elements
5. Write the code directly into the appropriate project file(s), following existing conventions.
6. If using Framer Motion, use these patterns:
   - `motion.div` with `initial`, `whileInView`, `viewport={{ once: true }}`
   - `variants` with `staggerChildren` for staggered reveals
   - `useScroll` + `useTransform` for parallax or scroll-linked effects
   - Keep animation durations between 0.4s–0.8s, easing `[0.25, 0.1, 0.25, 1]` or similar cubic-bezier
7. If using vanilla CSS/JS:
   - Use `IntersectionObserver` for scroll-triggered animations
   - Define `@keyframes` in CSS, trigger via class toggling
   - Use CSS custom properties from `:root` for consistent theming

## Guardrails

- **No hardcoded colors** — all colors must use CSS custom properties (`var(--color-*)`) or Tailwind equivalents (`bg-accent-1`, `text-text-primary`, `border-border`). Never write raw hex, rgb, or rgba values.
- Ensure animation colors match the design system tokens
- No bright glows or neon effects on light backgrounds — use subtle accent-based motion at low opacity
- **No inline styles** — use Tailwind classes or CSS classes only
- **No new dependencies** without explicit user approval
- **Do not rewrite unrelated files** — only touch the requested section
- **Preserve existing conventions** — folder structure, naming, component patterns
- **No looping or distracting animations** unless explicitly requested
- **Always include `prefers-reduced-motion`** — disable or reduce animations for users who prefer it
- Keep all generated code production-safe, clean, and reusable
