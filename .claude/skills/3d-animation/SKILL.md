---
name: 3d-animation
description: Use when someone asks to add 3D winter effects, snowfall, ice particles, frozen geometry, aurora borealis, blizzard atmosphere, or Game of Thrones style immersive 3D backgrounds.
argument-hint: <section> (e.g., hero, projects, about, skills, background)
disable-model-invocation: true
---

## What This Skill Does

Adds cinematic winter 3D effects to portfolio sections using Three.js and React Three Fiber — snowfall systems, ice crystal geometry, aurora borealis, frozen fog, and blizzard atmospheres. Inspired by the cold, immersive world of Game of Thrones. Every effect uses the Winterfell ice-blue palette.

## Before You Start

**Always read these files first:**
1. `design-system-reference.md` — full design system tokens
2. `portfolio/app/globals.css` — CSS custom properties (source of truth)
3. `THREE-SKILL-FRONTEND-SYSTEM.md` — shared frontend skill rules
4. This skill's `3d-presets.md` — winter preset library and 3D color palette

**Check dependencies:**
```bash
cd portfolio && cat package.json | grep -E "three|fiber|drei"
```
If missing, install:
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

## 3D Winter Color Palette

All 3D effects use these colors — sourced from the Winterfell palette in `globals.css`.

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#7EB8DA` | Primary ice particles, crystal edges, aurora core |
| `--accent-dim` | `#4A7A96` | Secondary particles, distant snowflakes |
| `--frost-highlight` | `#A8D4F0` | Bright ice crystals, closest particles |
| `--snow-particle` | `#D4E8F5` | Primary snowflake color |
| `--snow-distant` | `#8AACCC` | Far/small snowflakes |
| `--snow-close` | `#F0F6FA` | Close/large snowflakes (brightest) |
| `--ice-crystal` | `#B8DAF0` | Ice crystal geometry highlights |
| `--aurora-blue` | `#4A9ECC` | Northern lights blue streak |
| `--aurora-green` | `#4ACC8A` | Northern lights green (very subtle) |
| `--bg` | `#080B12` | Canvas clear color (frozen midnight) |
| `--fog-color` | `#1A2838` | Depth fog, volumetric haze |
| `--border` | `#1C2636` | Wireframe lines, ice grid |

**Extended 3D palette:**
- Bright ice: `#C0E0F8` — closest ice crystals, bright snowflake peaks
- Deep frost: `#2C4A60` — far-away particles, deep depth layers
- Blizzard white: `#E0ECF4` — blizzard wind streaks
- Frost mist: `rgba(126,184,218,0.06)` — ambient frozen atmosphere

**Rules:**
- No warm colors in 3D — no gold, amber, red, orange
- Primary palette: ice blue, frost white, steel gray, deep navy
- Only exception: aurora-green at very low opacity (<8%)
- Use opacity and size to create depth (closer = brighter + larger, farther = dimmer + smaller)
- Snow should feel natural — varied sizes, speeds, and drift patterns
- Glow effects use `--accent-glow` intensity — subtle frost shimmer, never neon

## Steps

### Step 1: Identify Target Section

Parse `<section>` to determine which section:
- `hero` → Hero section — flagship winter effect
- `projects` → Projects section
- `about` or `skills` → About/Skills section
- `background` → Full-page ambient winter atmosphere
- If no argument, ask the user which section

### Step 2: Auto-Select Winter Preset

Based on the section, pick the best preset from `3d-presets.md`:

| Section | Recommended Preset | Why |
|---------|-------------------|-----|
| **Hero** | `snowfall` or `blizzard` | Immersive first impression — snow fills the viewport |
| **Projects** | `frost-card` | Interactive ice-tilt cards with frost rim glow |
| **About/Skills** | `ice-crystals` | Floating ice geometry, subtle and ambient |
| **Background** | `winter-fog` | Lightweight frozen atmosphere across the page |

**Combination for full cinematic effect:**
- Hero: `snowfall` + Background: `winter-fog` + Projects: `frost-card`
- This creates a fully immersive winter world

Read the full preset specification from `3d-presets.md` before implementing.

### Step 3: Create the 3D Component

Create the component in `portfolio/components/3d/`:

**File naming:** `[PresetName].tsx` (e.g., `Snowfall.tsx`, `IceCrystals.tsx`)

**Component structure:**
```tsx
'use client'

import dynamic from 'next/dynamic'

// Lazy load the canvas — no SSR
const Scene = dynamic(() => import('./[Name]Scene'), { ssr: false })

export default function [Name]() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <Scene />
    </div>
  )
}
```

**Scene component (separate file for code-splitting):**
```tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'

export default function [Name]Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent' }}
    >
      {/* Winter fog */}
      <fog attach="fog" args={['#1A2838', 8, 30]} />

      {/* Cool ambient light — no warm tones */}
      <ambientLight intensity={0.15} color="#7EB8DA" />

      {/* 3D winter content here */}
      <Preload all />
    </Canvas>
  )
}
```

**Key implementation rules:**
- Always split into wrapper + scene (for dynamic import)
- Use `dpr={[1, 1.5]}` to cap pixel ratio
- Set `antialias: false` for particle-heavy snow scenes
- Use `alpha: true` for transparent canvas overlay
- Add `<fog>` for depth — creates frozen atmosphere automatically
- All colors from the winter palette above — never random values
- Ambient light should be cool-tinted (#7EB8DA), never warm white

### Step 4: Add Winter Interactivity

Based on the preset, add immersive interactions:

- **Wind effect:** Mouse X position influences snow drift direction
- **Breath ripple:** Mouse proximity creates a "warm breath" disturbance in snow
- **Scroll depth:** Snow intensity/speed changes with scroll position
- **Frost on hover:** Cards or UI elements accumulate frost glow on pointer proximity

```tsx
// Wind-influenced snow pattern
import { useFrame, useThree } from '@react-three/fiber'

function WindSnow({ particles }) {
  const { pointer } = useThree()
  const windRef = useRef({ x: 0, z: 0 })

  useFrame((_, delta) => {
    // Mouse influences wind direction
    windRef.current.x += (pointer.x * 0.3 - windRef.current.x) * 0.02
    windRef.current.z += (pointer.y * 0.1 - windRef.current.z) * 0.02

    // Apply wind to each snow particle position
    const positions = particles.current.geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += windRef.current.x * delta     // X drift
      positions[i + 1] -= (0.5 + Math.random() * 0.5) * delta  // Y fall
      positions[i + 2] += windRef.current.z * delta  // Z drift

      // Reset snowflake when it falls below view
      if (positions[i + 1] < -5) {
        positions[i + 1] = 8 + Math.random() * 4
        positions[i] = (Math.random() - 0.5) * 20
      }
    }
    particles.current.geometry.attributes.position.needsUpdate = true
  })
}
```

### Step 5: Optimize for All Devices

**Responsive snow particle counts:**
```tsx
function useSnowCount(preset: 'light' | 'medium' | 'blizzard') {
  const [count, setCount] = useState(500)

  useEffect(() => {
    const width = window.innerWidth
    const base = preset === 'blizzard' ? 1500 : preset === 'medium' ? 800 : 500
    if (width < 640) setCount(Math.floor(base * 0.3))       // mobile
    else if (width < 1024) setCount(Math.floor(base * 0.6)) // tablet
    else setCount(base)                                       // desktop
  }, [preset])

  return count
}
```

**Performance checklist:**
- [ ] `next/dynamic` with `{ ssr: false }` — prevents SSR crash
- [ ] `dpr={[1, 1.5]}` — caps device pixel ratio
- [ ] Reduced snow count on mobile (<640px) — 30% of desktop
- [ ] `useFrame` with delta time — frame-rate independent snow physics
- [ ] Cleanup: dispose geometries and materials on unmount
- [ ] `frameloop="demand"` for static ice crystal scenes (not snowfall)
- [ ] Respect `prefers-reduced-motion` — reduce snow to gentle drift or pause

```tsx
// Reduced motion: slow gentle drift instead of full snow
const prefersReduced = useRef(false)
useEffect(() => {
  prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
}, [])
// In useFrame: if (prefersReduced.current) speed *= 0.1
```

**WebGL fallback:**
```tsx
function WebGLCheck({ children, fallback }) {
  const [supported, setSupported] = useState(true)
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setSupported(!!gl)
    } catch { setSupported(false) }
  }, [])
  return supported ? children : (fallback || null)
}
```

### Step 6: Integrate into Section

```tsx
import Snowfall from '@/components/3d/Snowfall'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Winter 3D background */}
      <Snowfall />

      {/* Content layer — always on top */}
      <div className="relative z-10">
        {/* hero content */}
      </div>
    </section>
  )
}
```

**Integration rules:**
- 3D wrapper: `absolute inset-0 -z-10 pointer-events-none`
- Content wrapper: `relative z-10`
- Section: `relative overflow-hidden`
- Canvas never intercepts pointer events on content
- For `frost-card` preset: pointer events ARE enabled on individual cards

### Step 7: Final Verification

- [ ] Snow renders behind content, text fully readable
- [ ] No z-index conflicts — buttons/links clickable
- [ ] Snow falls naturally — not too fast, not too uniform
- [ ] Wind drift responds to mouse (subtle, not dramatic)
- [ ] Smooth on desktop (60fps target with snow)
- [ ] Acceptable on mobile (30fps minimum, reduced snow count)
- [ ] No console errors (WebGL, SSR hydration)
- [ ] `prefers-reduced-motion` respected
- [ ] All colors are cold — no warm leak from old palette
- [ ] Fog creates atmospheric depth fade
- [ ] Memory: no leaks on navigation

## Guardrails

- **No 3D on Navbar or Footer** — too heavy, bad UX
- **Max 2-3 active winter scenes per page** — more tanks performance
- **3D always behind content** — never blocks text, buttons, or links
- **No warm colors in 3D** — no gold, amber, red, orange. Ice blue/frost/white only
- **No excessive glow** — frost glow should be barely visible, ethereal
- **Always lazy load** — `next/dynamic` with `ssr: false`
- **Always cleanup** — dispose Three.js objects on unmount
- **No inline styles** — use Tailwind or CSS classes
- **Respect reduced motion** — reduced snow or pause
- **WebGL fallback** — show static frost gradient background if unsupported
- **Cap DPR** — never render at full retina resolution for snow scenes
- **Snow physics** — snowflakes must vary in size, speed, and drift. Uniform snow looks fake
