# Three-Skill Frontend System — Shared Rules

This document defines shared rules for the three portfolio skills: `/layout-system`, `/motion-ui`, and `/ui-refine`. Every skill reads this file before acting.

---

## The Three Skills & Their Jobs

| Skill | Job | When to use |
|-------|-----|-------------|
| `/layout-system` | Build structure — sections, grids, component scaffolding | Starting a new section or page |
| `/motion-ui` | Add animation — scroll triggers, stagger reveals, transitions | Section exists but needs motion |
| `/ui-refine` | Polish existing UI — spacing, type, hierarchy, responsiveness | Something looks off or unfinished |

**Skills do NOT overlap.** If `/layout-system` is building a section, it does not add animation. If `/motion-ui` is animating, it does not restructure layout. If `/ui-refine` is polishing, it does not rewrite structure or add animation.

---

## Always Do

1. **Read `design-system-reference.md` first** — it has the canonical color tokens, typography, spacing, animation rules, and file structure.
2. **Read `globals.css` in `d:/protfolio/portfolio/app/globals.css`** — this is the source of truth for CSS custom properties and utility classes.
3. **Read the target file(s) before touching them** — never propose or write changes to code you haven't read.
4. **Match the existing stack** — the portfolio uses Next.js App Router + Tailwind CSS + TypeScript. Don't introduce new frameworks.
5. **Use CSS custom properties** (`var(--accent)`, `var(--bg)`, etc.) or their Tailwind equivalents from `tailwind.config.ts`. Never write raw hex values.
6. **Mobile-first** — write for 375px first, then layer desktop with `md:` and `lg:` breakpoints.
7. **Respect `prefers-reduced-motion`** — any animation must have a reduced-motion fallback.

---

## Never Do

- Write raw hex, rgb, or rgba color values (use CSS vars or Tailwind tokens)
- Use inline styles (`style={{...}}`)
- Add new npm dependencies without explicit user approval
- Rewrite or touch files unrelated to the requested task
- Add animation when doing `/layout-system` or `/ui-refine`
- Restructure layout when doing `/motion-ui` or `/ui-refine`
- Use placeholder copy without flagging it as a placeholder
- Hardcode content that belongs in a data file

---

## Project-Specific Rules

- **Max content width:** `max-w-content` (1160px) — always wrap sections in `<div className="max-w-content mx-auto px-6">`
- **Section alternating bg:** alternate between `bg-bg` and `bg-surface` for visual rhythm
- **Font classes:** `font-syne` for headings, `font-dm` for body
- **Accent color is gold** (`var(--accent)` = `#c8a45e`) — not cyan, not blue
- **Card style:** `bg-card border border-border rounded-xl` with `bg-card-hover` on hover
- **Projects section is the visual priority** — it should always be the most polished section
- **Keep scroll fatigue low** — group related content, avoid very long vertical sections

---

## Handoff Between Skills

The typical workflow for a new section:

```
/layout-system [section]  →  builds structure with correct tokens and layout
       ↓
/motion-ui [section]      →  adds scroll-triggered animations and transitions
       ↓
/ui-refine [section]      →  final polish: spacing, type, hierarchy, mobile
```

Each skill picks up where the last left off without duplicating work.

---

## Files to Read (checklist for each skill)

Before writing any code, confirm you've read:

- [ ] `d:/protfolio/design-system-reference.md` — design tokens and layout rules
- [ ] `d:/protfolio/portfolio/app/globals.css` — CSS vars and utilities
- [ ] `d:/protfolio/portfolio/tailwind.config.ts` — Tailwind color/font extensions
- [ ] The target component file(s) — what already exists
- [ ] `d:/protfolio/portfolio/app/page.tsx` — how sections are assembled
