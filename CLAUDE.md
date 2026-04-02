# Portfolio — Kishore V

This is the personal portfolio website for **Kishore V**, a fresher Full Stack Developer based in Chennai, India.

## Project State

| Path | Description |
|------|-------------|
| `app/globals.css` | CSS custom properties — source of truth for tokens |
| `tailwind.config.ts` | Tailwind color/font extensions |
| `components/` | Navbar, Hero, About, Skills, Projects |
| `public/Resume.pdf` | Kishore's resume |
| `docs/design-system-reference.md` | Full design system — colors, typography, spacing, layout |
| `docs/THREE-SKILL-FRONTEND-SYSTEM.md` | Shared rules for layout-system / motion-ui / ui-refine skills |
| `docs/PORTFOLIO-DESIGN-KIT.md` | Portfolio design kit reference |
| `legacy/` | Legacy vanilla HTML/CSS/JS portfolio (kept as reference) |
| `everything-claude-code/` | Claude Code reference toolkit (unrelated to portfolio) |

**Active stack:** Next.js (App Router) + Tailwind CSS + TypeScript
**Skills available:** `/layout-system` · `/motion-ui` · `/ui-refine` · `/color-system` · `/3d-animation` · `/skill-builder`

## Skill Workflow

```
/layout-system [section]  →  build section structure
/motion-ui [section]      →  add scroll animations
/ui-refine [section]      →  polish spacing, type, mobile
/color-system [style]     →  research trends + apply premium palette
/3d-animation [section]   →  add Three.js 3D effects (particles, geometry, tilt cards)
```

Always read `docs/design-system-reference.md` and `app/globals.css` before touching any component.

---

## Candidate Profile

**Name:** Kishore V
**Role:** Frontend / Full Stack Developer
**Location:** Chennai, India

**Contact:**
- Email: arunkishore757@gmail.com
- LinkedIn: https://www.linkedin.com/in/kishore-v2
- GitHub: https://github.com/Kishore-official

---

## Skills

| Category | Technologies |
|----------|-------------|
| Frontend | HTML, CSS, Bootstrap, JavaScript, React |
| Backend | Python, Django |
| Database | MySQL |
| Tools | GitHub, Visual Studio, MySQL Workbench |

---

## Projects

### 1. Restaurant Website
- Responsive restaurant website: menus, specials, location
- Stack: HTML, CSS, Bootstrap, JavaScript
- GitHub: https://github.com/Kishore-official/-Restaurant-.git

### 2. E-commerce Web Application
- Full-stack e-commerce with frontend + backend
- Stack: HTML, CSS, Bootstrap, JavaScript, Python, Django, MySQL
- GitHub: https://github.com/Kishore-official/E-commerce.git

### 3. Crop Yield Prediction
- AI-driven web app: uses historical yield data, weather patterns, soil health, geographic info
- Goal: help farmers make better planning decisions
- Stack: Python, ML concepts, web app integration
- GitHub: https://github.com/Kishore-official/crop-yield-prediction.git

---

## Achievements & Leadership

- Student leader managing 10 volunteers
- State-level cricket player and team captain
- Executive member of I-MATH Club
- Executive member of Rotary Club

---

## Certifications

- Python Full Stack Developer Training — Login360 Technologies
- Tech Test'20 Coding Contest — PSNACET
- HCIA-Cloud Computing V4.0 — PSNACET
- Claude Code in Action — Anthropic Education
- AI Impact Summit Buildathon — GUVI

---

## Design System

> Full reference: `design-system-reference.md`

### Colors (CSS custom properties) — Winterfell palette (GoT Winter Theme)
```
--bg:              #080B12   page background (frozen midnight)
--surface:         #0D1117   section alternating bg (dark ice)
--card:            #121924   card backgrounds (frozen steel)
--border:          #1C2636   borders, dividers (frost line)
--accent:          #7EB8DA   ICE BLUE — primary accent, CTAs
--accent-dim:      #4A7A96   dimmed accent / secondary (deep ice)
--text-1:          #E8EDF3   primary text (frost white)
--text-2:          #7A8BA0   muted / captions (steel mist)
--text-3:          #3A4A5C   placeholder / disabled (dark frost)
--accent-glow:     rgba(126,184,218,0.10)  frost glow
--accent-border:   rgba(126,184,218,0.18)  ice highlights
--frost-highlight: #A8D4F0   bright frost moments
--snow-white:      #F0F4F8   snow highlights
--shadow-color:    rgba(8,11,18,0.50)      frozen shadows
--hover-lift:      #162030   card hover bg
--fog-color:       #1A2838   volumetric fog / depth
```

### Typography
- **Headings:** Syne (800 hero, 700 section, 600 sub)
- **Body / tags:** DM Sans (400 body, 500 medium)

### Aesthetic Rules — Cinematic Winter (Game of Thrones)
- Dark frozen theme, ice-blue accent (#7EB8DA) — no gold, no warm tones
- No raw hex values in code — use `var(--accent)` or Tailwind equivalents
- Frost glow only — no excessive bloom, no neon
- Cinematic atmosphere: snowfall, ice crystals, frozen fog via `/3d-animation`
- Generous whitespace, strong visual hierarchy
- Subtle scroll-triggered reveal (`.reveal` class or Framer Motion)
- Cards: `bg-card border border-border rounded-xl` + frost glow on hover
- Immersive winter feel: every section should feel cold, commanding, premium

---

## Sections Required (in order)

1. **Navbar** — name/logo left, links right, sticky, blur on scroll
2. **Hero** — sharp headline, short subtext, 2 CTA buttons (View Work / Download Resume)
3. **About** — short bio paragraph, not a wall of text
4. **Skills** — grouped by category (Frontend, Backend, Database, Tools), not badge soup
5. **Projects** — visual highlight, asymmetric or featured layout, 3 cards max
6. **Leadership & Achievements** — brief list or icon cards
7. **Certifications** — compact cards
8. **Contact** — email + social links, simple form optional
9. **Footer** — minimal

---

## Portfolio Design Constraints

- Do NOT use generic template look
- Do NOT use too many gradients or random glowing effects
- Do NOT use weak filler copy
- Make projects section the visual highlight
- Mobile responsive is mandatory
- Avoid very long vertical scroll — group related info, use compact layouts
- Projects: use asymmetric grid OR featured-project layout (one large + two small)

---

## Workflow Notes

- When building sections: implement mobile-first, then desktop
- Prefer `cn()` utility (clsx/tailwind-merge) for conditional classes
- Use Framer Motion `variants` pattern for reusable animations
- Keep components in `components/sections/` and shared UI in `components/ui/`
