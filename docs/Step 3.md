/ui-refine all

Fix all design inconsistencies found in the portfolio audit.
Read every file listed before making any changes.

Files: all components in portfolio/components/ plus 
portfolio/app/globals.css and portfolio/tailwind.config.ts

─── CRITICAL FIX: Verify and restore design system tokens ───────────────────
The audit flagged that globals.css may have diverged from the dark gold design spec.

Check globals.css :root block. The correct values must be:
  --bg:          #08080a
  --surface:     #111115
  --card:        #16161b
  --border:      #222228
  --accent:      #c8a45e
  --accent-dim:  #8b7240
  --text-1:      #eeeef2
  --text-2:      #86869a
  --text-3:      #44444e

Check tailwind.config.ts colors block. The correct values must match above.

If either file has a light indigo theme (#FAFBFF background, #4F46E5 accent) 
instead of these dark gold values — restore them to the correct values above.
This is the highest priority fix in this pass.

─── FIX 1: Hardcoded color in globals.css:50 ────────────────────────────────
::selection rule has color: #ffffff hardcoded.
Fix: Replace with color: var(--bg) so it inverts correctly if theme changes.

─── FIX 2: Hardcoded color in Projects.tsx:172 ──────────────────────────────
text-white/50 is a raw Tailwind color modifier, not a design token.
Fix: Replace with text-text-3 (maps to var(--text-3)).

─── FIX 3: Tracking inconsistency in About.tsx:128 ─────────────────────────
The "Currently" eyebrow label uses tracking-[0.14em].
All other eyebrow labels across the site use tracking-[0.18em].
Fix: Change tracking-[0.14em] to tracking-[0.18em] on that element.

─── FIX 4: Section padding inconsistency in Certifications ──────────────────
Certifications uses py-12 md:py-14.
Every other section uses py-20 md:py-28 (or py-16 md:py-24 for compact sections).
The visual rhythm break between Projects → Certifications → Contact is noticeable.
Fix: Change Certifications to py-16 md:py-24 to match the compact section scale.

─── FIX 5: About stats mobile layout (About.tsx:117) ───────────────────────
grid-cols-3 md:grid-cols-1 puts 3 columns on mobile, making 
"AI Engineer @ BIZZZUP" unreadably narrow.
Fix: Change to grid-cols-1 sm:grid-cols-3 md:grid-cols-1 
so mobile stacks vertically and restores 3-col at sm breakpoint.

─── FIX 6: NestJS, Flask, N8N, Zapier, MCP missing from Skills ─────────────
These tools are used in both flagship projects (MERIDIAN, Salon) 
and in the stated job role, but do not appear anywhere in the skill tags.

Fix — add to the correct groups in Skills.tsx:
- AI & Automation group: add "N8N" and "Zapier" (level: intermediate), 
  "MCP" stays as learning
- Backend group: add "NestJS" (level: intermediate), "Flask" already there — verify
- Tools group: add any CI/CD or deployment tools if currently missing

─── FIX 7: Projects.tsx:347 terminal background ─────────────────────────────
bg-text-1 is used as a dark terminal background color.
This works now but is fragile — text-1 is a text color token, not a background token.
Fix: Replace with bg-[var(--surface)] or a direct bg-surface class.

─── FINAL AUDIT ─────────────────────────────────────────────────────────────
After all fixes, scan every file for:
1. Any remaining hardcoded hex/rgb values → replace with CSS custom properties
2. Any interactive element (a, button) missing min-h-[44px] → add it
3. Any section missing border-t border-border → add it
4. Any section label not using tracking-[0.18em] → fix it

Report every file changed and what was fixed.
