# Design System Reference — Kishore V Portfolio

**Stack:** Next.js (App Router) · Tailwind CSS · Framer Motion
**Project root:** `portfolio/`
**Fonts:** Plus Jakarta Sans (headings/display) · IBM Plex Sans (body) · IBM Plex Mono (code/labels)

---

## Color Tokens

These are the canonical tokens. Always use CSS custom properties or their Tailwind equivalents — **never write raw hex values**.

| Token (CSS var) | Tailwind class | Value | Usage |
|----------------|----------------|-------|-------|
| `--bg-deep` | `bg-bg` | `#07060b` | Page background (deepest dark) |
| `--bg-surface` | `bg-surface` | `#0d0a16` | Section alternating bg |
| `--bg-card` | `bg-card` | `#12101c` | Card backgrounds |
| `--bg-card-hover` | `bg-card-hover` | `#1a1528` | Card hover state |
| `--accent-1` | `text-accent` / `bg-accent` | `#c8ff2e` | Electric lime — primary accent, CTAs |
| `--accent-2` | `text-accent-2` | `#2ec8ff` | Cyan — badges, tags, secondary |
| `--accent-3` | — | `#ff2ec8` | Hot pink — decorative gradients only |
| `--text-primary` | `text-text-1` | `#f0eef5` | Primary text, headings |
| `--text-secondary` | `text-text-2` | `#8a86a0` | Body text, supporting |
| `--text-muted` | `text-text-3` | `#46415e` | Captions, labels, decorative |
| `--accent-glow` | — | `rgba(200,255,46,0.12)` | Subtle accent background tint |
| `--border-color` | `border-border` | `rgba(200,255,46,0.06)` | All borders, dividers |
| `--border-hover` | `border-border-hover` | `rgba(200,255,46,0.12)` | Hover state borders |
| `--gradient-1` | — | `linear-gradient(135deg, accent-1, accent-2)` | Gradient text, accent highlights |

---

## Typography

| Role | Font | Weight | CSS class |
|------|------|--------|-----------|
| Hero headings | Plus Jakarta Sans | 800 | `font-display font-extrabold` |
| Section headings | Plus Jakarta Sans | 700–800 | `font-display font-bold/extrabold` |
| Section labels | IBM Plex Mono | 500 | `font-mono` |
| Body text | IBM Plex Sans | 300–400 | `font-body` / `font-body font-light` |
| Tags / badges | IBM Plex Mono | 500 | `font-mono text-[0.6rem] uppercase tracking-[0.15em]` |

---

## Component Patterns

### Signature Clip-Path Cut Corners
All buttons, cards, badges, and tags use cut-corner shapes:
- `clip-corners` — 12px corners (buttons, cards)
- `clip-corners-sm` — 8px corners (badges, tags)
- `clip-corners-lg` — 20px corners (large cards)

### Section Labels
Always use mono font, uppercase, with left accent line:
```html
<div class="inline-flex items-center gap-3 font-mono text-[0.68rem] font-medium tracking-[0.18em] uppercase text-accent">
  <span class="w-[30px] h-px bg-accent" />
  Section Name
</div>
```

### Gradient Text
Use the `.gradient-text` utility for accent-emphasized words (lime-to-cyan).

### Cards
- `bg-card border border-border clip-corners shadow-card`
- Hover: `hover:shadow-card-hover hover:border-accent/[0.12]`
- Mouse-follow glow via `--vx`/`--vy` CSS variables

### Buttons
- **Primary:** `bg-accent text-bg clip-corners` — lime background, dark text
- **Secondary:** `border border-text-3 text-text-1 clip-corners` — outlined

---

## Animation System

### Easing
- `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` — entrances
- `--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1)` — bouncy micro-interactions

### Durations
- Hover/transitions: 300–600ms
- Scroll reveals: 600–1000ms

### Scroll-Progress Engine
Elements get `--vp` (0 to 1) as they scroll into view. CSS `clamp()` drives all reveals:
```css
.reveal {
  --rv-p: clamp(0, (var(--vp, 0) - 0.02) * 5, 1);
  opacity: var(--rv-p);
  transform: translateY(calc((1 - var(--rv-p)) * 24px));
}
```

### Special Effects
- **Grain overlay:** fixed, 0.03 opacity texture
- **Custom cursor:** dot + ring, mix-blend-mode difference, expand on hover
- **Gradient orbs:** floating blurred circles in hero
- **3D perspective grid:** in hero background
- **Particle drift:** floating upward particles

---

## Design Principles

1. All colors via CSS custom properties — no hardcoded hex in components
2. Clip-path cut corners are the signature brand shape
3. Easing always `var(--ease-out-expo)` for entrances
4. Grain overlay always present at 0.03 opacity
5. Section rhythm — alternate between `bg-deep` and `gradient-mesh`
6. Section labels — mono font, uppercase, with left accent line
7. Gradient text — accent-1 to accent-2, only on emphasized words
8. Shadows — accent-tinted `rgba(200,255,46,...)`, not black
9. Borders — low-opacity accent-1, never solid lines
10. Motion — smooth, subtle, premium. Never flashy
11. Mobile — stack layouts, reduce headings, hide cursor, min 44px touch targets
