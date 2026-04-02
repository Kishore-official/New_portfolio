Read every component file in the portfolio before responding. Do not skip any file.

Files to read:
- portfolio/app/layout.tsx
- portfolio/app/page.tsx
- portfolio/app/globals.css
- portfolio/tailwind.config.ts
- portfolio/components/Navbar.tsx
- portfolio/components/Hero.tsx
- portfolio/components/About.tsx
- portfolio/components/Skills.tsx
- portfolio/components/Projects.tsx
- Any other components in portfolio/components/

After reading all files, produce a structured audit report in this exact format:

---

## PORTFOLIO AUDIT REPORT

### SECTION SCORES (score each 1–10 across 5 dimensions)

| Section   | Design | Animation | Code Quality | Mobile | Content | Total /50 |
|-----------|--------|-----------|--------------|--------|---------|-----------|
| Navbar    |        |           |              |        |         |           |
| Hero      |        |           |              |        |         |           |
| About     |        |           |              |        |         |           |
| Skills    |        |           |              |        |         |           |
| Projects  |        |           |              |        |         |           |
| [Missing] | —      | —         | —            | —      | —       | NOT BUILT |

For each score below 7, write one sentence explaining why.

---

### WHAT TO CUT (features that add complexity but not value)
List every feature, animation, prop, or block of code that should be removed.
Format: Component → what to cut → reason

---

### CRITICAL FIXES (broken or incorrect things)
List anything that is broken, visually wrong, or technically incorrect.
Format: Component:LineNumber → issue → fix

---

### DESIGN INCONSISTENCIES
List any places where the design system is violated:
- Hardcoded hex values instead of CSS custom properties
- Font inconsistencies (wrong font family or weight)
- Spacing that breaks the scale
- Color tokens used incorrectly

---

### ANIMATION AUDIT
- List animations that feel too heavy, too fast, or purposeless
- List sections that have no animation but need one
- Flag any missing prefers-reduced-motion handling

---

### CODE QUALITY FLAGS
- Duplicate logic that should be extracted
- Props or state that are unused
- Components that are too large (over 200 lines doing too much)
- Missing TypeScript types or loose `any` types

---

### OVERALL PORTFOLIO SCORE: [X/100]

### TOP 5 HIGHEST IMPACT IMPROVEMENTS (ranked by impact):
1.
2.
3.
4.
5.

---

Be direct and specific. Do not give generic advice. Reference actual line numbers and component names.
