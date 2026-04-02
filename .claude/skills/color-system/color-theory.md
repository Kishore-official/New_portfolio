# Color Theory Reference — Cinematic Winter Theme

## Ice Blue (#7EB8DA) as Anchor Accent

Ice blue communicates clarity, intelligence, precision, and calm authority. Inspired by the cold steel of Valyrian swords and the frozen expanses beyond the Wall.

It works best when:
- Set against deep navy-black backgrounds (frozen midnight)
- Paired with frost-white highlights for maximum impact
- Used sparingly for CTAs, active states, and key highlights
- Dimmed variants create depth and hierarchy without warmth

### Ice Blue Derivative Scale

```
--accent:          #7EB8DA   100% — primary buttons, active states, hero highlights
--accent-dim:      #4A7A96    60% — secondary accents, subtle borders, muted links
--frost-highlight: #A8D4F0   130% — bright frost moments, heading sparkle
--ice-deep:        #2C5A78    40% — deep background accents, far depth layers
--accent-muted:    rgba(126,184,218,0.12)  — badge backgrounds, frost tints
--accent-glow:     rgba(126,184,218,0.10)  — hover/focus frost glow
--accent-border:   rgba(126,184,218,0.18)  — featured card ice borders
```

## Winter Palette Archetypes

### 1. Winterfell (Primary — Recommended)
Best for: the main cinematic winter experience

```
bg:      #080B12 (frozen midnight — deep navy-black)
surface: #0D1117 (dark ice — GitHub-dark inspired)
card:    #121924 (frozen steel — card surfaces)
border:  #1C2636 (frost line — subtle ice borders)
text-1:  #E8EDF3 (frost white — primary text)
text-2:  #7A8BA0 (steel mist — muted captions)
text-3:  #3A4A5C (dark frost — disabled/placeholder)
accent:  #7EB8DA (ice blue)
```

**Mood:** The courtyard of Winterfell at dusk — cold stone, frozen breath, steel sky.

### 2. Beyond the Wall (Deeper, Harsher)
Best for: more extreme cold atmosphere

```
bg:      #050810 (abyssal black-blue)
surface: #0A0E18 (frozen void)
card:    #0F1520 (ice cavern)
border:  #182030 (frost edge)
text-1:  #DCE4EE (pale frost)
text-2:  #6878A0 (winter steel)
text-3:  #2E3C52 (deep shadow)
accent:  #6AAEC8 (colder ice)
```

**Mood:** The endless winter beyond the Wall — brutal, vast, otherworldly.

### 3. Castle Black (Military Precision)
Best for: maximum contrast, bold statements

```
bg:      #06080C (the blackest night)
surface: #0C1018 (Night's Watch black)
card:    #141C28 (steel plate)
border:  #202C3C (chain mail)
text-1:  #F0F4F8 (snow white)
text-2:  #8494B0 (moonlit steel)
text-3:  #3C4C62 (shadow)
accent:  #88C4E0 (ice-bright)
```

**Mood:** Castle Black under moonlight — severe, disciplined, stark contrast.

### 4. Frost Dawn (Lighter Winter)
Best for: sections that need more breathing room

```
bg:      #0E1420 (twilight blue)
surface: #141C2A (deep dusk)
card:    #1A2436 (winter dusk)
border:  #243044 (steel-blue border)
text-1:  #EAF0F6 (morning frost)
text-2:  #8898B0 (fog)
text-3:  #445468 (deep mist)
accent:  #90CCE8 (dawn ice)
```

**Mood:** The first light after a winter night — still cold, but with pale blue hope.

## Contrast Requirements (WCAG AA)

| Combination         | Min Ratio | Target |
|---------------------|-----------|--------|
| text-1 on bg        | 4.5:1     | 10:1+  |
| text-2 on bg        | 4.5:1     | 5:1    |
| accent on bg        | 3:1       | 5:1    |
| accent on card      | 3:1       | 4.5:1  |
| text-1 on card      | 4.5:1     | 8:1+   |
| frost-highlight     | 3:1       | 6:1    |

## Shadow Strategy — Winter

- **Standard:** `0 4px 24px rgba(8,11,18,0.50)` — deep frozen shadow
- **Frost glow:** `0 0 20px rgba(126,184,218,0.08)` — subtle ice glow on hover
- **Elevated cards:** `0 8px 32px rgba(8,11,18,0.60), 0 0 1px rgba(126,184,218,0.10)` — frost-rimmed elevation
- **Never:** Warm shadows, orange/gold tinted, or pure black

## Gradient Rules — Winter

- Ice gradients: `--bg` → `--surface` (subtle depth between sections)
- Frost shimmer: `transparent → rgba(126,184,218,0.04) → transparent` (horizontal mist bands)
- Aurora hint: `rgba(74,158,204,0.05) → rgba(74,204,138,0.03)` (very subtle, hero only)
- **Never:** Warm gradients, rainbow effects, or more than 2 colors per gradient
- Background gradients: same blue-black hue family, vary lightness by 2-4%

## Atmospheric Effects

### Frost Mist (CSS-level)
Semi-transparent overlays between sections that create depth:
```css
.frost-mist::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, var(--frost-mist), transparent 70%);
  pointer-events: none;
}
```

### Cold Breath (Ambient Overlay)
Subtle animated opacity pulse on section backgrounds:
```css
.cold-breath {
  background: var(--breath);
  animation: breathe 8s ease-in-out infinite;
}
@keyframes breathe {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
```

## Anti-Patterns — Winter Theme

- No warm tones (gold, amber, orange, red) — breaks the winter immersion
- No pure black (#000000) — always add blue undertone for frozen depth
- No bright/saturated blues — keep ice blue muted and sophisticated
- No green accents (except subtle aurora hints at <5% opacity)
- No white backgrounds — snow-white is for text highlights only
- No warm shadows — all shadows must be cold-tinted
- No excessive glow — frost glow should be barely visible, not neon
- Keep the palette cold but readable — frozen doesn't mean illegible
