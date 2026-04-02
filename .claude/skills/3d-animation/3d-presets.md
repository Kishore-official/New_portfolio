# 3D Winter Presets Library — Game of Thrones Cinematic Edition

Reference file for the `/3d-animation` skill. Each preset defines a complete winter 3D effect.

---

## Preset: `snowfall`

**Best for:** Hero section
**Vibe:** Cinematic winter — snow drifting through frozen night air

**Configuration:**
- Particle count: 800 (desktop) / 450 (tablet) / 200 (mobile)
- Snowflake sizes: 3 layers
  - Large (5%): size 4-6px, `--snow-close` (#F0F6FA), slow fall, strong drift
  - Medium (30%): size 2-3px, `--snow-particle` (#D4E8F5), normal fall
  - Small (65%): size 1-1.5px, `--snow-distant` (#8AACCC), fast fall, faint
- Distribution: rectangular volume above viewport, width 120% of screen
- Depth: 3 Z-layers (near, mid, far) — parallax effect

**Animation:**
- Gravity: each snowflake falls at 0.3–0.8 units/sec (varied per flake)
- Drift: sine-wave horizontal sway (amplitude 0.5–1.5, period 3–8 sec, randomized)
- Rotation: each snowflake slowly rotates (0.001–0.005 rad/frame)
- Wind gusts: every 10–20 seconds, brief horizontal acceleration (0.5–1.0 units)
- Respawn: when a flake exits bottom, reset to top with new random X position

**Interactivity:**
- Mouse X: influences wind direction (subtle, 0.3 factor)
- Mouse Y: slight parallax shift on depth layers
- Scroll: snow density increases slightly as user scrolls (more immersive deeper in page)

**Implementation notes:**
- Use `THREE.Points` with `THREE.BufferGeometry`
- Store per-particle data: position, velocity, size, opacity, drift-phase, drift-amplitude
- Custom shader or `THREE.PointsMaterial` with `size`, `sizeAttenuation: true`
- Use `THREE.AdditiveBlending` for soft overlapping snowflake glow
- Add `<fog>` at `['#1A2838', 8, 25]` for atmospheric depth

---

## Preset: `blizzard`

**Best for:** Hero section (intense variant)
**Vibe:** White Walker approach — harsh, dramatic, wind-swept

**Configuration:**
- Particle count: 1500 (desktop) / 800 (tablet) / 350 (mobile)
- Two particle systems:
  - Snow (80%): sizes 1-4px, `--snow-particle` / `--snow-distant`
  - Wind streaks (20%): elongated particles (aspect 1:8), `--snow-close`, very fast
- Distribution: particles enter from top-right, exit bottom-left (diagonal wind)

**Animation:**
- Base wind: constant diagonal drift (-2, -1, 0) direction
- Turbulence: Perlin noise displacement on particle positions
- Speed: 2-5x faster than regular snowfall
- Wind streaks: move 3x faster than snow, fade in/out over 0.5 sec

**Interactivity:**
- Mouse: "eye of the storm" — particles avoid a radius around cursor
- Scroll: blizzard intensifies as user scrolls down first fold

**Implementation notes:**
- Use two separate `THREE.Points` systems (snow + wind)
- Wind streaks: elongated via custom vertex shader stretching points along velocity vector
- Higher particle count — optimize with `frustumCulled: false` and buffer reuse
- Consider `THREE.InstancedMesh` for wind streak geometry if needed
- More aggressive `<fog>` for white-out depth effect: `['#1A2838', 5, 18]`

---

## Preset: `ice-crystals`

**Best for:** About, Skills, or background sections
**Vibe:** Floating frozen geometry — ambient, architectural, magical

**Configuration:**
- Count: 10–18 shapes (desktop), 6–10 (mobile)
- Shapes: mix of
  - `OctahedronGeometry` (60%) — natural ice crystal shape
  - `TetrahedronGeometry` (25%) — sharp ice shards
  - `IcosahedronGeometry` (15%) — complex crystal
- Size: 0.2–1.0 units, randomized
- Colors: wireframe `--ice-crystal` (#B8DAF0) at 20% opacity, edge glow `--accent`
- Distribution: scattered across viewport, different Z depths (-5 to -15)

**Animation:**
- Slow independent rotation per crystal (random axis, 0.001–0.003 rad/frame)
- Float: gentle Y-axis bob (amplitude 0.2, period 4–8 sec)
- Shimmer: opacity oscillation (0.1–0.25 range, slow sine wave)
- Occasional "catch light": random crystal briefly glows brighter (1-2 sec, random interval 8-15 sec)

**Interactivity:**
- Mouse proximity: nearest crystals rotate slightly faster and glow brighter
- Scroll: crystals parallax at different rates based on Z-depth

**Implementation notes:**
- Use `<Float>` wrapper from `@react-three/drei` for each crystal
- `MeshStandardMaterial` with `transparent: true, opacity: 0.15, wireframe: true, color: '#B8DAF0'`
- Add `<pointLight>` near each crystal with very low intensity (#7EB8DA, intensity 0.05)
- Randomize initial rotation and float offset to avoid sync
- This is the lightest winter preset — safe to combine with snowfall

---

## Preset: `winter-fog`

**Best for:** Full-page background, any section
**Vibe:** Frozen atmospheric depth — mist rolling through the scene

**Configuration:**
- Particle count: 300 (desktop) / 150 (tablet) / 80 (mobile)
- Particle size: 8–20px (large, soft fog particles)
- Distribution: rectangular volume, depth 15–30 units
- Colors: `--fog-color` (#1A2838) at 8-15% opacity
- Plus sparse snow: 100 tiny (1px) snowflakes using `--snow-distant`

**Animation:**
- Fog: very slow drift (0.02–0.05 units/sec), random direction per particle
- Fog opacity pulse: each particle slowly breathes (opacity 0.05–0.15, period 6–12 sec)
- Snow: gentle fall, minimal drift — background ambiance only
- Entire system: imperceptible rotation (0.0002 rad/frame Y-axis)

**Interactivity:**
- Mouse: fog particles nearest cursor gently disperse (push away 0.1 factor)
- Scroll: fog density shifts slightly — denser at top, thinner below

**Implementation notes:**
- Fog particles: use `THREE.Points` with large `size` and `THREE.AdditiveBlending`
- Texture: use a soft radial gradient circle texture for each fog particle
  ```tsx
  // Generate fog texture programmatically
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 64
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, 'rgba(26,40,56,0.15)')
  gradient.addColorStop(1, 'rgba(26,40,56,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)
  ```
- Separate snow system rendered on top of fog
- Lightweight enough to run as a persistent full-page background

---

## Preset: `frost-card`

**Best for:** Projects section
**Vibe:** Interactive ice-rimmed cards with frost glow

**Configuration:**
- Apply to each project card individually
- Tilt range: max 12deg on both axes
- Perspective: 1000px
- Frost rim: ice-blue glow border that intensifies on hover side
- Shadow: cold-tinted, shifts with tilt direction

**Animation:**
- Smooth spring tilt (damping 0.12, stiffness 0.06)
- Return to flat on mouse leave (spring animation)
- Frost rim: gradient glow follows mouse position around card edges
- Subtle scale: 1.015x on hover
- Ice shimmer: barely visible sparkle particles on card surface (optional, 20-30 particles)

**Interactivity:**
- Mouse position over card determines tilt X/Y
- Touch: touch position for mobile tilt
- Frost glow: radial gradient follows pointer position, tinted `--accent-glow`
- Edge frost: border-glow intensifies on the side nearest to cursor

**Implementation notes:**
- CSS transforms, NOT Three.js canvas (lightweight)
- `transform: perspective(1000px) rotateX(Xdeg) rotateY(Ydeg)`
- Frost glow: `box-shadow: 0 0 20px rgba(126,184,218,0.08), inset 0 0 30px rgba(126,184,218,0.03)`
- Frost rim: absolutely positioned div with conic-gradient following mouse angle
- Works alongside separate 3D snow scenes

```tsx
// Frost card core logic
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  setTilt({ x: y * -12, y: x * 12 })

  // Frost glow follows cursor
  setFrostPosition({
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100
  })
}
```

**Frost rim CSS:**
```css
.frost-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--frost-angle),
    transparent 0%,
    rgba(126,184,218,0.15) 10%,
    transparent 20%
  );
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: 1px;
  pointer-events: none;
}
```

---

## Preset: `aurora`

**Best for:** Hero section (alternative), Contact section
**Vibe:** Northern Lights — ethereal, magical, otherworldly

**Configuration:**
- 3–5 ribbon meshes (curtain geometry)
- Colors: `--aurora-blue` (#4A9ECC) primary, `--aurora-green` (#4ACC8A) secondary at 40% intensity
- Position: upper portion of viewport, gently curving downward
- Opacity: 0.04–0.08 (extremely subtle — atmospheric, not a screensaver)

**Animation:**
- Vertex displacement: sine waves along ribbon length (multiple frequencies)
- Color shift: slow oscillation between blue-dominant and green-tinted
- Opacity breathing: overall intensity pulses (period 8–15 sec)
- Movement: entire aurora slowly drifts horizontally

**Interactivity:**
- Mouse: slight parallax on aurora ribbons (0.02 factor — barely there)
- Scroll: aurora fades in/out based on section visibility

**Implementation notes:**
- Use `PlaneGeometry` with many X segments (64+), few Y segments (2-3)
- Custom shader: vertex displacement + color gradient along UV
- `THREE.AdditiveBlending` + `transparent: true` + very low opacity
- This effect is the most cinematic but must stay extremely subtle
- Can be combined with `snowfall` for the ultimate winter hero

---

## Combining Winter Presets

**Recommended combinations:**

| Combo Name | Hero | Projects | Background | Total Canvases |
|-----------|------|----------|------------|----------------|
| **The North** | `snowfall` | `frost-card` | `winter-fog` | 2 (frost-card is CSS) |
| **White Walker** | `blizzard` | `frost-card` | none | 1 (blizzard is heavy enough) |
| **Northern Lights** | `aurora` + `snowfall` | `frost-card` | `ice-crystals` | 3 (max) |
| **Subtle Winter** | `snowfall` (light) | `frost-card` | none | 1 + CSS |

**Not allowed:**
- `blizzard` + `aurora` together (too heavy)
- More than 2 Three.js canvas instances + fog
- Any winter 3D on Navbar or Footer
- `blizzard` on mobile (use `snowfall` with reduced count instead)

**Performance priority:**
1. Hero gets the most particles/detail
2. Background fog is the most subtle/lightweight
3. Total snow particles across all scenes: max 2000 desktop, 800 mobile
4. Always test on mobile before finalizing
