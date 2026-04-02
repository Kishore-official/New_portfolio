---
name: color-system
description: Use when someone asks to update portfolio colors, refresh the color palette, apply the winter theme, change the cinematic atmosphere, or adjust the Game of Thrones / winter / frost / ice color styling.
disable-model-invocation: true
argument-hint: [mood keyword, e.g. "deep winter", "ice storm", "night's watch", "frost dawn"]
---

## What This Skill Does

Applies and evolves a **cinematic winter palette** inspired by Game of Thrones — deep frozen blues, steel grays, frost whites, and icy accents over a cold, immersive dark atmosphere. The palette is designed to feel like the North: harsh, beautiful, and commanding.

The **ice-blue accent (#7EB8DA)** is the anchor — it replaces gold as the primary accent for this theme. It can be complemented with frost-white highlights and steel-blue secondaries, but never replaced.

## Before You Start

Read these files to understand the current state:

1. `portfolio/app/globals.css` — current CSS custom properties (source of truth)
2. `portfolio/tailwind.config.ts` — Tailwind color/font extensions
3. `design-system-reference.md` — full design system documentation
4. This skill's `color-theory.md` — winter palette archetypes and rules

## The Winter Palette — "Winterfell"

### Core Tokens

```
--bg:            #080B12   page background (frozen midnight)
--surface:       #0D1117   section alternating bg (dark ice)
--card:          #121924   card backgrounds (frozen steel)
--border:        #1C2636   borders, dividers (frost line)
--accent:        #7EB8DA   ICE BLUE — primary accent, CTAs, highlights
--accent-dim:    #4A7A96   dimmed accent / secondary (deep ice)
--text-1:        #E8EDF3   primary text (frost white)
--text-2:        #7A8BA0   muted / captions (steel mist)
--text-3:        #3A4A5C   placeholder / disabled (dark frost)
```

### Extended Tokens

```
--accent-glow:    rgba(126,184,218,0.10)   hover/focus frost glow
--accent-border:  rgba(126,184,218,0.18)   featured card ice border
--frost-highlight: #A8D4F0                  bright frost — headings, hero text sparkle
--ice-deep:       #2C5A78                   deep ice — far backgrounds, depth layers
--snow-white:     #F0F4F8                   snow — pure highlight moments
--shadow-color:   rgba(8,11,18,0.50)        deep frozen shadow
--hover-lift:     #162030                   card hover bg (warmer frost)
--gradient-start: #0D1117                   gradient — dark ice
--gradient-end:   #121924                   gradient — frozen steel
--frost-mist:     rgba(126,184,218,0.04)    subtle atmospheric mist overlay
--breath:         rgba(168,212,240,0.06)    "cold breath" — ambient section overlays
```

### Winter Atmosphere Colors (for 3D/effects)

```
--snow-particle:    #D4E8F5   primary snowflake color
--snow-distant:     #8AACCC   distant/small snowflakes
--snow-close:       #F0F6FA   close/large snowflakes (brightest)
--ice-crystal:      #B8DAF0   ice crystal geometry highlights
--aurora-blue:      #4A9ECC   northern lights blue streak
--aurora-green:     #4ACC8A   northern lights green (subtle, secondary)
--fog-color:        #1A2838   volumetric fog / depth fade
```

## Steps

### Step 1: Backup Current Palette

1. Read `portfolio/app/globals.css`
2. Extract all color-related custom properties
3. Save to `portfolio/color-backups/backup-[YYYY-MM-DD].css` with timestamp
4. Confirm backup created

### Step 2: Analyze Current State

- List all current tokens and hex values
- Identify which tokens need updating vs. which are new
- Check for hardcoded hex values in `.tsx` components
- Flag any component-level color overrides

Present a "Current State" summary.

### Step 3: Research Winter Design Trends

Use web search for inspiration:

**Search queries:**
- "cinematic dark winter UI design 2025 2026"
- "Game of Thrones inspired website design dark ice theme"
- "premium dark blue frost web design portfolio"
- "winter atmospheric web design snow effects"
- If `` provided, also search: " winter dark UI design"

**Extract:**
- How top cinematic/editorial sites handle cold-tone palettes
- Ice/frost gradient techniques
- Snow/particle overlay color strategies
- Dark-mode readability with blue-tinted backgrounds
- Atmospheric depth techniques (fog, mist, layering)

Summarize in 3-5 bullets.

### Step 4: Generate Palette

Use the core Winterfell palette above as the base. Adjust based on research findings:

**Rules for winter palette:**
- Ice-blue (#7EB8DA) is sacred — always the primary accent
- `--accent-dim` must be a deeper, desaturated ice blue
- Backgrounds use navy-black with blue undertones, never warm blacks
- Text must feel like frost — cool whites and silver-grays
- All shadows are cold-tinted (navy/blue base), never warm
- Gradients: dark-to-darker within the same blue-black family
- No warm tones — no gold, amber, orange, or red (exception: very subtle warm breath effects)
- Contrast must meet WCAG AA (4.5:1 text-1 on bg)

### Step 5: Present to User

```
## Recommended Palette: [Name] (Winter Series)

**Inspiration:** [what research informed this]
**Mood:** [2-3 word description, e.g. "frozen midnight", "ice fortress"]

| Token           | Current        | Recommended    | Why                          |
|-----------------|----------------|----------------|------------------------------|
| --bg            | #060810        | #XXXXXX        | [reason]                     |
| --surface       | #0c1120        | #XXXXXX        | [reason]                     |
| ...             | ...            | ...            | ...                          |

**Atmosphere:** [description of frost mist, depth fog, snow overlay strategy]
**Gradients:** [ice gradients description]
**Shadows:** [cold shadow strategy]
```

Ask: "Apply this winter palette? Or adjust the frost level?"

### Step 6: Apply Changes

Once approved:

1. **Update `portfolio/app/globals.css`:**
   - Replace all color custom property values
   - Add new winter-specific tokens (frost, snow, aurora)
   - Add comment: `/* Winterfell Palette — Applied [date] */`

2. **Update `portfolio/tailwind.config.ts`:**
   - Update color extensions to match new CSS properties
   - Add winter-specific color aliases (frost, ice, snow, aurora)

3. **Update `design-system-reference.md`:**
   - Replace Colors section with winter palette
   - Update aesthetic rules for winter theme

4. **Scan and fix components:**
   - Search for old accent colors (gold hex values)
   - Replace with new ice-blue equivalents
   - Update any warm-tone references

### Step 7: Verify

1. List all modified files
2. Run dev server check
3. Remind user to visually verify the winter atmosphere
4. Suggest running `/3d-animation hero` next for snow effects
5. Suggest `/ui-refine` for any sections that need contrast adjustment

## Component Color Rules — Winter Edition

| Component         | Background       | Text          | Border           | Accent usage           |
|-------------------|------------------|---------------|------------------|------------------------|
| Navbar            | --bg / frost blur| --text-1      | --border         | Active link (ice glow) |
| Hero              | --bg + snow      | --snow-white   | none             | CTA buttons (ice-blue) |
| Cards             | --card           | --text-1      | --border         | Hover frost glow       |
| Section headers   | transparent      | --frost-highlight | --accent      | Ice underline          |
| Muted text        | transparent      | --text-2      | none             | none                   |
| Badges/tags       | --accent/10%     | --accent      | --accent-dim     | Frost tint background  |
| Buttons (primary) | --accent         | --bg          | none             | Full ice-blue bg       |
| Buttons (outline) | transparent      | --accent      | --accent-border  | Frost border + text    |
| Section dividers  | --frost-mist     | n/a           | --border         | Atmospheric separator  |

## Notes

- **Never replace ice-blue (#7EB8DA) as the primary accent.**
- The winter theme is a complete departure from gold — if reverting, use the backup.
- Frost-mist overlays (`--frost-mist`, `--breath`) add atmospheric depth between sections.
- The palette is designed to pair with snowfall 3D effects from `/3d-animation`.
- After applying, run `/3d-animation hero` to add snow, then `/ui-refine` for polish.
- Keep backups in `portfolio/color-backups/` — one file per update, dated.
