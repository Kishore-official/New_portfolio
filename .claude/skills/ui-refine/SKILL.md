---
name: ui-refine
description: Use when someone asks to polish UI, improve spacing, fix typography, refine alignment, improve visual hierarchy, enhance responsiveness, make UI look more premium, or clean up an existing design.
argument-hint: [section, component, or file to refine]
---

## What This Skill Does

Improves and polishes existing UI code — spacing, typography, hierarchy, alignment, responsiveness, and overall premium feel. This is the refinement skill. It does NOT build new sections from scratch (use `/layout-system`) and does NOT add animation (use `/motion-ui`).

## Before You Start

1. Read the target file(s) that the user wants to refine. **Never propose changes to code you haven't read.**
2. Read `design-system-reference.md` for the canonical color palette.
3. Read `globals.css` `@theme inline` block for current CSS token values.
4. Read `THREE-SKILL-FRONTEND-SYSTEM.md` in the project root for shared rules.
5. Understand the existing visual language before making changes — don't impose a new style.

## Steps

1. Parse the argument `` to determine what to refine — could be a section name, component name, or file path.
2. Read the target code thoroughly.
3. Analyze the current code for these refinement areas:
   - **Spacing** — inconsistent padding/margin, cramped or too-loose sections, spacing that doesn't follow the design scale
   - **Typography** — font size hierarchy issues, poor line height, inconsistent font weights, low contrast text
   - **Visual hierarchy** — unclear what's most important, competing elements, weak CTA prominence
   - **Alignment** — misaligned elements, inconsistent gutters, off-center content
   - **Responsiveness** — broken layouts on mobile/tablet, missing breakpoints, overflow issues
   - **Polish** — missing hover states, sharp corners where rounds are expected, inconsistent border/shadow usage
4. Make focused, minimal edits. Fix what's actually wrong — don't rewrite the entire component.
5. Edit files in place. Do not create copies or backups.
6. After editing, briefly explain what you changed and why (2-3 sentences max).

## Refinement Principles

- **Less is more** — subtle improvements compound into a premium feel
- **Consistency over creativity** — match the existing design system, don't introduce new patterns
- **Hierarchy drives polish** — the most important thing on the page should be visually obvious
- **Whitespace is a feature** — generous spacing feels premium, cramped spacing feels cheap
- **Typography carries 80% of the design** — getting font sizes, weights, and line heights right has the biggest impact

## Guardrails

- **No hardcoded colors** — replace any hardcoded hex/rgb/rgba values with CSS custom properties or Tailwind equivalents
- Fix inconsistent color usage across sections — replace with design system tokens
- Remove any local `const tokens = {...}` objects — use CSS variables directly
- Improve contrast and palette harmony using the design system reference
- **No inline styles** — use Tailwind classes or CSS classes only
- **No new dependencies** without explicit user approval
- **Do not rewrite unrelated files** — only touch what was requested
- **Preserve existing functionality** — refinement must not break anything
- **Do not add animation** — if the user wants motion, tell them to use `/motion-ui`
- **Do not restructure layout** — if the layout itself needs redesigning, tell them to use `/layout-system`
- **Minimal changes** — avoid large structural rewrites unless explicitly requested
- **Preserve existing conventions** — folder structure, naming, component patterns
- Keep all edits production-safe and clean
