---
name: layout-system
description: Use when someone asks to build a page layout, create a section structure, scaffold a landing page, add a hero section, features section, benefits section, stats section, testimonial section, CTA section, or build responsive page structure.
argument-hint: [section type, e.g. hero, features, pricing, full-page]
---

## What This Skill Does

Builds clean, responsive page structures and section layouts — hero, features, benefits, stats, testimonials, CTA, pricing, and more. This is the structure-focused skill. It does NOT add heavy animation (use `/motion-ui` for that) and does NOT polish existing code (use `/ui-refine` for that).

## Before You Start

1. Read `design-system-reference.md` for the canonical color palette and layout rules.
2. Read `globals.css` `@theme inline` block for current CSS token values.
3. Read `THREE-SKILL-FRONTEND-SYSTEM.md` in the project root for shared rules.
4. Scan existing components to understand folder structure, naming conventions, and patterns.
5. Determine the current stack and match it:
   - **Next.js + Tailwind**: generate React/Next.js components with Tailwind classes.
   - **Vanilla HTML/CSS/JS**: generate semantic HTML with well-structured CSS.

## Steps

1. Parse the argument `` to determine what section or page type to build.
2. If the argument is `full-page` or a page name, build the complete page layout with appropriate sections in logical order (e.g., hero → features → benefits → stats → testimonials → CTA).
3. If the argument is a specific section type, build only that section.
4. Apply these layout principles:
   - **Content hierarchy** — clear visual hierarchy with proper heading levels (h1 → h2 → h3)
   - **Responsive design** — mobile-first, with breakpoints for tablet and desktop
   - **Consistent spacing** — use the design system's spacing scale, not arbitrary values
   - **Readable typography** — appropriate font sizes, line heights, and contrast
   - **Semantic HTML** — use `<section>`, `<article>`, `<header>`, `<footer>`, etc.
5. Section-specific patterns:
   - **Hero:** large heading, subheading, CTA button(s), optional visual/image area. Full-width or contained.
   - **Features:** grid layout (2-col, 3-col, or 4-col depending on count), icon + title + description per card.
   - **Benefits:** alternating zigzag layout (text-left/image-right, then flipped), or grid.
   - **Stats:** horizontal row of stat items (number + label), centered.
   - **Testimonials:** card-based layout or single-quote with attribution. Support for multiple items.
   - **CTA:** centered content, strong heading, supporting text, prominent button(s).
   - **Pricing:** card grid (2-3 tiers), highlight recommended tier, feature lists per tier.
   - **Footer:** multi-column link layout, logo, social links, copyright.
6. Write the code directly into the appropriate project file(s).
7. Use only minimal existing motion if the project already has animations. Do NOT add new animations — that's `/motion-ui`'s job.

## Guardrails

- **No hardcoded colors** — all colors must use CSS custom properties (`var(--color-*)`) or Tailwind equivalents. Never write raw hex values.
- Use only design-system color tokens for all backgrounds, text, and borders
- Maintain consistent light-theme surfaces across sections — alternate `bg-bg-deep` and `bg-bg-surface`
- **No inline styles** — use Tailwind classes or CSS classes only
- **No new dependencies** without explicit user approval
- **Do not rewrite unrelated files** — only touch the requested section/page
- **Preserve existing conventions** — folder structure, naming, component patterns
- **Do not add animation** — if the user wants motion, tell them to use `/motion-ui`
- **No placeholder content without flagging it** — if using lorem ipsum or placeholder images, clearly mark them as placeholders
- Keep all generated code production-safe, modular, reusable, and responsive
