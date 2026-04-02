# Portfolio Design Kit -- Bizzzup Style System

> Drop this file into your portfolio project root. Tell Claude/Cursor:
> "Read PORTFOLIO-DESIGN-KIT.md and apply this design system to my portfolio."

This file contains the complete design language, color system, animation patterns,
typography, component styles, and JavaScript behaviors extracted from the Bizzzup
AI Labs website. Everything here is production-tested and ready to apply.

---

## STACK COMPATIBILITY

This kit works with:
- **Vanilla HTML/CSS/JS** -- use CSS custom properties + @keyframes + IntersectionObserver
- **Next.js + Tailwind + Framer Motion** -- map CSS vars to Tailwind @theme, use motion.div patterns
- **Any React/Vue/Svelte framework** -- the tokens and animation principles are framework-agnostic

---

## 1. COLOR SYSTEM (Dark Theme -- Premium Cyberpunk-Neutral)

Paste this `:root` block into your global CSS or `globals.css`:

```css
:root {
  /* Backgrounds (layered depth -- darkest to lightest) */
  --bg-deep: #07060b;        /* base page background */
  --bg-surface: #0d0a16;     /* alternating section backgrounds */
  --bg-card: #12101c;        /* card surfaces */
  --bg-card-hover: #1a1528;  /* card hover state */

  /* Accents (neon-organic triad) */
  --accent-1: #c8ff2e;       /* primary -- electric lime (CTAs, links, active states) */
  --accent-2: #2ec8ff;       /* secondary -- cyan (badges, tags, secondary highlights) */
  --accent-3: #ff2ec8;       /* tertiary -- hot pink (decorative only, gradients) */
  --accent-glow: rgba(200, 255, 46, 0.12); /* subtle accent background tint */

  /* Text (cool neutrals) */
  --text-primary: #f0eef5;   /* headings and primary content */
  --text-secondary: #8a86a0; /* body text and supporting content */
  --text-muted: #46415e;     /* captions, labels, decorative-only */

  /* Gradients */
  --gradient-1: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%);
  --gradient-2: linear-gradient(135deg, #0f0d1a 0%, #130f20 50%, #0a0814 100%);
  --gradient-mesh: radial-gradient(ellipse at 20% 50%, rgba(200, 255, 46, 0.04) 0%, transparent 50%),
                   radial-gradient(ellipse at 80% 20%, rgba(46, 200, 255, 0.03) 0%, transparent 50%),
                   radial-gradient(ellipse at 50% 80%, rgba(255, 46, 200, 0.02) 0%, transparent 50%);

  /* Typography */
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'IBM Plex Sans', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  /* Easing */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=IBM+Plex+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Tailwind @theme equivalent (for globals.css):
```css
@theme inline {
  --color-bg-deep: #07060b;
  --color-bg-surface: #0d0a16;
  --color-bg-card: #12101c;
  --color-bg-card-hover: #1a1528;
  --color-accent-1: #c8ff2e;
  --color-accent-2: #2ec8ff;
  --color-accent-3: #ff2ec8;
  --color-accent-glow: rgba(200, 255, 46, 0.12);
  --color-text-primary: #f0eef5;
  --color-text-secondary: #8a86a0;
  --color-text-muted: #46415e;
  --color-border: rgba(200, 255, 46, 0.06);
  --color-border-hover: rgba(200, 255, 46, 0.12);
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'IBM Plex Sans', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
}
```

---

## 2. BASE GLOBAL STYLES

```css
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-1) var(--bg-deep);
}

body {
  font-family: var(--font-body);
  background: var(--bg-deep);
  color: var(--text-primary);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  line-height: 1.6;
}

::selection {
  background: rgba(200, 255, 46, 0.25);
  color: #fff;
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--bg-deep); }
::-webkit-scrollbar-thumb { background: var(--accent-1); border-radius: 3px; }

a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
button { font-family: inherit; cursor: pointer; border: none; background: none; }
```

---

## 3. GRAIN OVERLAY (Premium texture)

```css
.grain {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 128px 128px;
}
```
```html
<div class="grain"></div>
```

---

## 4. CUSTOM CURSOR

### CSS
```css
.cursor-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-1);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
  transition: transform 0.1s ease;
}

.cursor-ring {
  width: 40px;
  height: 40px;
  border: 1.5px solid var(--accent-1);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
}

.cursor-ring.hovering {
  width: 60px;
  height: 60px;
  border-color: var(--accent-2);
}

@media (max-width: 900px) {
  .cursor-dot, .cursor-ring { display: none; }
}
```

### HTML
```html
<div class="cursor-dot" id="cursorDot"></div>
<div class="cursor-ring" id="cursorRing"></div>
```

### JavaScript
```js
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = (mouseX - 4) + 'px';
  cursorDot.style.top = (mouseY - 4) + 'px';
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
});
```

---

## 5. TYPOGRAPHY HIERARCHY

```css
/* Hero headings */
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 9vw, 7.5rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.04em;
}

/* Section headings */
.section-heading {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.03em;
}

/* Feature titles */
.feature-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

/* Body text */
.body-text {
  font-size: 1.05rem;
  font-weight: 300;
  color: var(--text-secondary);
  line-height: 1.75;
}

/* Section labels (category tags above headings) */
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-1);
  margin-bottom: 1.5rem;
}

.section-label::before {
  content: '';
  width: 30px;
  height: 1px;
  background: var(--accent-1);
}

/* Gradient text (accent headings) */
.accent-text, .section-heading em {
  font-style: italic;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 6. SECTION LAYOUT PATTERNS

```css
.section {
  position: relative;
  padding: clamp(5rem, 10vw, 9rem) clamp(1.5rem, 4vw, 3rem);
}

.section-inner {
  max-width: 1300px;
  margin: 0 auto;
}

/* Section divider line */
.section-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(200, 255, 46, 0.1), transparent);
  max-width: 1300px;
  margin: 0 auto;
}

/* Background rhythm: alternate between bg-deep and gradient-mesh */
.section-alt {
  background: var(--gradient-mesh), var(--bg-deep);
}

.section-surface {
  background: var(--bg-surface);
}
```

---

## 7. BUTTON STYLES (Signature clip-path cut corners)

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2.2rem;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bg-deep);
  background: var(--accent-1);
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
  transition: all 0.4s var(--ease-out-expo);
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  background: #deff6a;
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(200, 255, 46, 0.3);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2.2rem;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-primary);
  border: 1px solid var(--text-muted);
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
  transition: all 0.4s var(--ease-out-expo);
}

.btn-secondary:hover {
  border-color: var(--accent-1);
  color: var(--accent-1);
  transform: translateY(-2px);
}
```

---

## 8. CARD STYLES

```css
.card {
  background: linear-gradient(145deg, var(--bg-card), var(--bg-card-hover));
  border: 1px solid rgba(200, 255, 46, 0.06);
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
  overflow: hidden;
  transition: transform 0.5s var(--ease-out-expo), border-color 0.4s;
}

.card:hover {
  border-color: rgba(200, 255, 46, 0.12);
  transform: translateY(-4px);
}

/* Card with mouse-follow glow */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--vx, 50%) var(--vy, 50%), rgba(200, 255, 46, 0.04), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;
  pointer-events: none;
}

.card:hover::before { opacity: 1; }
```

### Card mouse-follow glow JS:
```js
document.querySelectorAll('.card').forEach(container => {
  let cachedRect = container.getBoundingClientRect();
  const updateRect = () => { cachedRect = container.getBoundingClientRect(); };
  window.addEventListener('resize', updateRect, { passive: true });
  window.addEventListener('scroll', updateRect, { passive: true });
  container.addEventListener('mousemove', (e) => {
    const x = ((e.clientX - cachedRect.left) / cachedRect.width) * 100;
    const y = ((e.clientY - cachedRect.top) / cachedRect.height) * 100;
    container.style.setProperty('--vx', x + '%');
    container.style.setProperty('--vy', y + '%');
  });
});
```

---

## 9. BADGE / TAG STYLES

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1.2rem;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-1);
  background: rgba(200, 255, 46, 0.06);
  border: 1px solid rgba(200, 255, 46, 0.12);
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
}

.badge-dot {
  width: 5px;
  height: 5px;
  background: var(--accent-1);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(200, 255, 46, 0.6);
  animation: pulse-dot 1.5s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.6); opacity: 0.5; }
}

.tag {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-1);
  background: rgba(200, 255, 46, 0.05);
  border: 1px solid rgba(200, 255, 46, 0.1);
  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
}
```

---

## 10. NAVIGATION (Sticky, glass-blur on scroll)

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 clamp(1.5rem, 4vw, 3rem);
  transition: all 0.5s var(--ease-out-expo);
}

.nav.scrolled {
  background: rgba(7, 6, 11, 0.85);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-bottom: 1px solid rgba(200, 255, 46, 0.06);
}

.nav-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

/* Nav link underline animation */
.nav-links a {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: color 0.3s;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--accent-1);
  transition: width 0.4s var(--ease-out-expo);
}

.nav-links a:hover { color: var(--text-primary); }
.nav-links a:hover::after { width: 100%; }
```

### Sticky nav JS:
```js
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });
```

---

## 11. ANIMATION SYSTEM

### A. Scroll-Progress Engine (Core -- drives everything)

The scroll engine sets a `--vp` CSS custom property (0 to 1) on elements as they scroll into view.
All reveal animations consume `--vp` via CSS `clamp()` math. No classes toggled, no JS animation frames
for individual elements. Pure CSS-driven, buttery smooth.

```js
function computeVP(el) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const start = vh;
  const end = vh * 0.25;
  const progress = (start - rect.top) / (start - end);
  return Math.min(1, Math.max(0, progress));
}

let ticking = false;
const scrollDrivenEls = document.querySelectorAll(
  '.reveal, .stagger-cards, .desc-reveal, [data-stagger]'
);

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    scrollDrivenEls.forEach(el => {
      const vp = computeVP(el);
      el.style.setProperty('--vp', vp.toFixed(4));
    });
    ticking = false;
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });
onScroll();
```

### B. Reveal Animation (fade-in + slide-up, scroll-driven)

```css
.reveal {
  --rv-p: clamp(0, (var(--vp, 0) - 0.02) * 5, 1);
  opacity: var(--rv-p);
  transform: translateY(calc((1 - var(--rv-p)) * 24px));
}

.reveal-delay-1 { --rv-p: clamp(0, (var(--vp, 0) - 0.08) * 5, 1); }
.reveal-delay-2 { --rv-p: clamp(0, (var(--vp, 0) - 0.15) * 5, 1); }
.reveal-delay-3 { --rv-p: clamp(0, (var(--vp, 0) - 0.22) * 5, 1); }
.reveal-delay-4 { --rv-p: clamp(0, (var(--vp, 0) - 0.29) * 5, 1); }
.reveal-delay-5 { --rv-p: clamp(0, (var(--vp, 0) - 0.36) * 5, 1); }
```

### C. Staggered Card Entrance (scroll-driven)

```css
.stagger-cards > * {
  --card-t: calc(var(--card-i, 0) * 0.1);
  --card-p: clamp(0, (var(--vp, 0) - var(--card-t)) * 6, 1);
  opacity: var(--card-p);
  transform: translateY(calc((1 - var(--card-p)) * 18px));
}

.stagger-cards > *:nth-child(1) { --card-i: 0; }
.stagger-cards > *:nth-child(2) { --card-i: 1; }
.stagger-cards > *:nth-child(3) { --card-i: 2; }
.stagger-cards > *:nth-child(4) { --card-i: 3; }
.stagger-cards > *:nth-child(5) { --card-i: 4; }
```

### D. Staggered Word Reveal (scroll-driven, per-word animation)

```css
[data-stagger] .sw {
  display: inline-block;
  padding-right: 0.05em;
  --sw-t: calc(var(--i, 0) * 0.04);
  --sw-p: clamp(0, (var(--vp, 0) - var(--sw-t)) * 8, 1);
  opacity: var(--sw-p);
  transform: translateY(calc((1 - var(--sw-p)) * 14px));
}

[data-stagger] .sw em,
[data-stagger] .sw .accent-text {
  background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-style: italic;
}
```

Word-splitting JS (add `data-stagger` attribute to any heading):
```js
document.querySelectorAll('[data-stagger]').forEach(el => {
  const fragment = document.createDocumentFragment();
  let wordIndex = 0;

  el.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split(/(\s+)/).forEach(part => {
        if (/^\s*$/.test(part)) {
          if (part) fragment.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.className = 'sw';
          span.style.setProperty('--i', wordIndex++);
          span.textContent = part;
          fragment.appendChild(span);
        }
      });
    } else if (node.nodeName === 'BR') {
      fragment.appendChild(document.createElement('br'));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          child.textContent.split(/(\s+)/).forEach(part => {
            if (/^\s*$/.test(part)) {
              if (part) fragment.appendChild(document.createTextNode(part));
            } else {
              const sw = document.createElement('span');
              sw.className = 'sw';
              sw.style.setProperty('--i', wordIndex++);
              const innerEl = document.createElement(node.tagName.toLowerCase());
              Array.from(node.attributes).forEach(attr => innerEl.setAttribute(attr.name, attr.value));
              innerEl.textContent = part;
              sw.appendChild(innerEl);
              fragment.appendChild(sw);
            }
          });
        }
      });
    }
  });

  el.textContent = '';
  el.appendChild(fragment);
});
```

### E. Hero Character-by-Character Reveal

```css
.hero-title .hc {
  display: inline-block;
  opacity: 0;
  transform: translateY(40px) scale(0.4) rotate(calc(var(--r, 0) * 1deg));
  filter: blur(8px);
  animation: hero-char-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) calc(0.5s + var(--i, 0) * 0.035s) forwards,
             hero-char-glow 3s ease-in-out calc(2s + var(--i, 0) * 0.05s) 1;
}

@keyframes hero-char-in {
  40% {
    opacity: 1;
    filter: blur(2px);
    transform: translateY(-8px) scale(1.08) rotate(0deg);
  }
  70% {
    filter: blur(0px);
    transform: translateY(2px) scale(0.98) rotate(0deg);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0) scale(1) rotate(0deg);
  }
}

@keyframes hero-char-glow {
  0%, 100% { text-shadow: none; }
  50% { text-shadow: 0 0 20px rgba(200, 255, 46, 0.3), 0 0 40px rgba(46, 200, 255, 0.15); }
}

/* Glowing sweep after text assembles */
.hero-title::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(200, 255, 46, 0.12), rgba(46, 200, 255, 0.08), transparent);
  animation: hero-sweep 1.8s ease-in-out 1.8s forwards;
  opacity: 0;
  pointer-events: none;
}

@keyframes hero-sweep {
  0% { left: -60%; opacity: 0; }
  10% { opacity: 1; }
  100% { left: 120%; opacity: 0; }
}
```

Character-splitting JS (add `data-hero-chars` to hero heading):
```js
(function() {
  const hero = document.querySelector('[data-hero-chars]');
  if (!hero) return;
  let charIndex = 0;

  function splitChars(node, frag) {
    if (node.nodeType === Node.TEXT_NODE) {
      for (const ch of node.textContent) {
        if (/\s/.test(ch)) {
          frag.appendChild(document.createTextNode(' '));
        } else {
          const span = document.createElement('span');
          span.className = 'hc';
          span.textContent = ch;
          span.style.setProperty('--i', charIndex);
          span.style.setProperty('--r', (Math.random() * 16 - 8).toFixed(1));
          charIndex++;
          frag.appendChild(span);
        }
      }
    } else if (node.nodeName === 'BR') {
      frag.appendChild(document.createElement('br'));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(child => splitChars(child, frag));
    }
  }

  const frag = document.createDocumentFragment();
  Array.from(hero.childNodes).forEach(child => splitChars(child, frag));
  hero.textContent = '';
  hero.appendChild(frag);
})();
```

### F. Generic hero entrance (staggered fade-in-up, time-based)

```css
@keyframes hero-reveal {
  to { opacity: 1; transform: translateY(0); }
}

/* Apply to hero children with increasing delays */
.hero-badge {
  opacity: 0;
  transform: translateY(20px);
  animation: hero-reveal 1s var(--ease-out-expo) 0.3s forwards;
}

.hero-subtitle {
  opacity: 0;
  transform: translateY(16px);
  animation: hero-reveal 1s var(--ease-out-expo) 0.6s forwards;
}

.hero-actions {
  opacity: 0;
  transform: translateY(14px);
  animation: hero-reveal 1s var(--ease-out-expo) 0.8s forwards;
}
```

### G. Rotating Text Swap

```css
.text-rotate {
  display: inline-block;
  position: relative;
  vertical-align: bottom;
  overflow: hidden;
}

.text-rotate .tr-current,
.text-rotate .tr-next {
  display: inline-block;
  transition: transform 0.55s var(--ease-out-expo), opacity 0.55s var(--ease-out-expo);
  white-space: nowrap;
}

.text-rotate .tr-next {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transform: translateY(110%);
}

.text-rotate.swapping .tr-current {
  opacity: 0;
  transform: translateY(-110%);
}

.text-rotate.swapping .tr-next {
  opacity: 1;
  transform: translateY(0);
}

.text-rotate.accent .tr-current,
.text-rotate.accent .tr-next {
  background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-rotate::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent-1);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease-out-expo);
}

.text-rotate.swapping::after { transform: scaleX(1); }
```

Usage HTML:
```html
<span class="text-rotate accent" data-rotate="Developer, Designer, Creator">
  <span class="tr-current">Developer</span>
  <span class="tr-next">Designer</span>
</span>
```

JS:
```js
document.querySelectorAll('.text-rotate[data-rotate]').forEach(el => {
  const words = el.dataset.rotate.split(',').map(w => w.trim());
  if (words.length < 2) return;
  let currentIndex = 0;
  const currentSpan = el.querySelector('.tr-current');
  const nextSpan = el.querySelector('.tr-next');
  if (!currentSpan || !nextSpan) return;

  setInterval(() => {
    const nextIndex = (currentIndex + 1) % words.length;
    nextSpan.textContent = words[nextIndex];
    el.classList.add('swapping');

    setTimeout(() => {
      el.classList.remove('swapping');
      currentSpan.textContent = words[nextIndex];
      nextSpan.textContent = words[(nextIndex + 1) % words.length];
      nextSpan.style.transform = 'translateY(110%)';
      nextSpan.style.opacity = '0';
      void nextSpan.offsetHeight;
      nextSpan.style.transform = '';
      nextSpan.style.opacity = '';
      currentIndex = nextIndex;
    }, 600);
  }, 2800);
});
```

### H. Stat Count-Up Animation

```js
const statValues = document.querySelectorAll('.stat-value');
if (statValues.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.dataset.counted) return;
        el.dataset.counted = 'true';

        const text = el.textContent.trim();
        const match = text.match(/^([\d.]+)(.*)$/);
        if (!match) return;

        const target = parseFloat(match[1]);
        const suffix = match[2];
        const isDecimal = text.includes('.');
        const duration = 1800;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;
          el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        el.textContent = (isDecimal ? '0.0' : '0') + suffix;
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => observer.observe(el));
}
```

### I. Hero Background Effects

```css
/* Floating gradient orbs */
.hero-gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.35;
  animation: float-orb 20s ease-in-out infinite;
}

.hero-gradient-orb:nth-child(1) {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(200, 255, 46, 0.3), transparent 70%);
  top: -15%; left: -10%;
}

.hero-gradient-orb:nth-child(2) {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(255, 46, 200, 0.2), transparent 70%);
  bottom: -20%; right: -5%;
  animation-delay: -7s;
}

.hero-gradient-orb:nth-child(3) {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(46, 200, 255, 0.2), transparent 70%);
  top: 40%; left: 50%;
  animation-delay: -14s;
}

@keyframes float-orb {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -40px) scale(1.05); }
  50% { transform: translate(-20px, 20px) scale(0.95); }
  75% { transform: translate(15px, 30px) scale(1.02); }
}

/* 3D Perspective Grid */
.hero-grid::before {
  content: '';
  position: absolute;
  width: 200%; height: 200%;
  top: 50%; left: 50%;
  transform: translate(-50%, -15%) rotateX(65deg);
  background-image:
    linear-gradient(rgba(200, 255, 46, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200, 255, 46, 0.06) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse 55% 45% at 50% 50%, black 20%, transparent 70%);
  animation: grid-scroll 20s linear infinite;
}

@keyframes grid-scroll {
  0% { background-position: 0 0; }
  100% { background-position: 0 80px; }
}

/* Floating particles */
.particle {
  position: absolute;
  width: 2px; height: 2px;
  background: var(--accent-1);
  border-radius: 50%;
  opacity: 0;
  animation: particle-drift 8s linear infinite;
}

@keyframes particle-drift {
  0% { opacity: 0; transform: translateY(0) scale(0); }
  10% { opacity: 0.6; transform: scale(1); }
  90% { opacity: 0.2; }
  100% { opacity: 0; transform: translateY(-100vh) scale(0); }
}

/* Pulsing dots */
@keyframes dot-pulse {
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 0.7; transform: scale(1.5); }
}

/* 3D shape float */
@keyframes shape-float {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -20px; }
}
```

Particle generation JS:
```js
(function() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = (60 + Math.random() * 40) + '%';
    p.style.animationDuration = (5 + Math.random() * 8) + 's';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.width = p.style.height = (1 + Math.random() * 2.5) + 'px';
    container.appendChild(p);
  }
})();
```

### J. Parallax Mouse Tracking (hero shapes)

```js
const heroShapes = document.querySelectorAll('.hero-shapes .shape-3d');
const heroDots = document.querySelectorAll('.hero-shapes .hero-dot');
let parallaxTicking = false;

document.addEventListener('mousemove', (e) => {
  if (parallaxTicking) return;
  parallaxTicking = true;
  requestAnimationFrame(() => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    heroShapes.forEach((shape, i) => {
      const depth = (i + 1) * 10;
      shape.style.translate = `${x * depth}px ${y * depth}px`;
    });
    heroDots.forEach((dot, i) => {
      const depth = (i + 1) * 4;
      dot.style.translate = `${x * depth}px ${y * depth}px`;
    });
    parallaxTicking = false;
  });
});
```

---

## 12. ACCESSIBILITY: REDUCED MOTION

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .hero-title .hc {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
    animation: none !important;
  }
  .reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3,
  .reveal-delay-4, .reveal-delay-5 {
    opacity: 1 !important;
    transform: none !important;
  }
  [data-stagger] .sw {
    opacity: 1 !important;
    transform: none !important;
  }
  .stagger-cards > * {
    opacity: 1 !important;
    transform: none !important;
  }
  .desc-reveal {
    opacity: 1 !important;
    transform: none !important;
  }
  .particle, .hero-dot { display: none !important; }
}
```

---

## 13. RESPONSIVE BREAKPOINTS

```css
@media (max-width: 1024px) {
  /* Switch grids to single column, center content */
}

@media (max-width: 900px) {
  /* Hide desktop nav, show mobile toggle */
  /* Stack feature rows vertically */
  /* Hide custom cursor */
  .cursor-dot, .cursor-ring { display: none; }
  .shape-3d { opacity: 0.5; }
}

@media (max-width: 500px) {
  /* Full-width buttons */
  /* Reduced section padding */
  .section { padding: clamp(3.5rem, 8vw, 7rem) clamp(1rem, 3vw, 2rem); }
}
```

---

## 14. DESIGN PRINCIPLES (for Claude/Cursor instructions)

When applying this system, follow these rules:

1. **All colors via CSS custom properties** -- no hardcoded hex in components
2. **clip-path cut corners** are the signature brand shape -- use on buttons, cards, badges, tags
3. **Easing** -- always `var(--ease-out-expo)` for entrances, `var(--ease-out-back)` for bouncy micro-interactions
4. **Duration** -- 300-600ms for hover/transitions, 600-1000ms for scroll reveals
5. **Scroll animations** -- use the `--vp` scroll-progress pattern with CSS `clamp()`, not class toggling
6. **Grain overlay** -- always present at 0.03 opacity
7. **Section rhythm** -- alternate between `bg-deep` and `gradient-mesh + bg-deep`
8. **Section labels** -- always mono font, uppercase, with left accent line
9. **Gradient text** -- accent-1 to accent-2, only on emphasized words in headings
10. **Shadows** -- always accent-tinted (`rgba(200, 255, 46, ...)`) not black
11. **Borders** -- always use low-opacity accent-1, never solid lines
12. **Motion** -- smooth, subtle, premium. Never flashy or aggressive
13. **Mobile** -- stack layouts, reduce headings proportionally, hide cursor, min 44px touch targets

---

## 15. HOW TO USE THIS FILE

### Option A: Tell Claude directly
```
Read PORTFOLIO-DESIGN-KIT.md and apply this exact design system --
colors, typography, animations, and component patterns -- to my portfolio.
Use the CSS custom properties, scroll-progress animation engine, and
clip-path signature shapes throughout.
```

### Option B: Add as a Cursor rule
Copy this file to `.cursor/rules/` in your portfolio project so Claude
automatically references it for every edit.

### Option C: Cherry-pick
Copy only the sections you need (e.g., just the color system + buttons + reveal animations)
into your portfolio's CSS and JS files.
