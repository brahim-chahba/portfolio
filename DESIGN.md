# Brahim Chahba Portfolio Design System

## 1. Product Intent

### Core Goal
Build a minimalist, high-credibility engineering portfolio that feels premium, calm, and intentional.

### Positioning
- Profile: Fourth-year engineering student (ENSAH), focused on AI, backend systems, and cloud delivery.
- Audience: Recruiters, internship hiring managers, freelance clients, technical mentors.
- Promise: Practical execution, real projects, clear technical thinking, strong learning velocity.

### Communication Style
- Confident, direct, and concrete.
- No overclaiming seniority.
- No generic startup buzzwords.

## 2. Visual Direction

### Design Language
- Editorial minimalism with engineering structure.
- Flat surfaces, strict lines, restrained accent usage.
- High typographic contrast, low visual noise.

### Visual Rules
- Backgrounds stay neutral and quiet.
- Borders are structural, not decorative.
- Motion is subtle and purposeful.
- Avoid loud gradients, heavy shadows, neon effects.

## 3. Color Tokens

- Canvas: `#F3F4F0`
- Canvas Soft: `#ECEFE9`
- Surface: `#FFFFFF`
- Ink: `#192028`
- Ink Soft: `#36414C`
- Ink Muted: `#67737D`
- Border: `#DDE3E0`
- Border Strong: `#C9D2CE`
- Accent: `#2F5B69`
- Accent Soft: `#E2EBED`

Project tints:
- Project A: `#D8E6EC`
- Project B: `#DFE8DF`
- Project C: `#E8E0D3`

Usage constraints:
- Accent appears only in focus/interaction states and controlled highlights.
- No multi-color palettes.
- No hard black text (`#000000`).

## 4. Typography System

- Display: `Instrument Serif`
- Body/UI: `Plus Jakarta Sans`
- Mono: `JetBrains Mono`

Rules:
- Hero and section titles use display font at medium weight with tight spacing.
- Body copy uses comfortable rhythm and max width (`55ch-65ch`).
- Labels and metadata use mono, uppercase, and restrained tracking.
- Never use Inter/Roboto/Open Sans/system-default styling as primary look.

## 5. Layout Architecture

### Page Flow
1. Hero
2. Work (Projects)
3. Services (Capabilities)
4. Experience
5. Technical Stack
6. Certifications
7. About
8. Contact

### Spatial System
- Max content container: `1160px-1220px`.
- Section spacing: `clamp(5rem, 8.8vw, 8.6rem)`.
- Consistent vertical rhythm across every section.
- Keep asymmetry on desktop and strict single-column collapse on mobile.

### Responsiveness
- Breakpoints: `1140`, `1024`, `760`, `620`, `390`.
- No horizontal overflow.
- Touch targets remain comfortable.

## 6. Component Standards

### Navigation
- Sticky top bar with subtle scroll state.
- Minimal link styling with understated active indicator.
- Mobile menu remains clean and readable.

### Buttons
- Primary: ink fill with white text.
- Secondary links: mono, uppercase, low-contrast.
- Press feedback: micro-scale/translation only.

### Cards and Rows
- Flat surfaces with crisp 1px borders.
- Rounded corners used sparingly.
- Hover shifts must stay under 2px.

### Lists and Metadata
- Mono uppercase labels for years/tags/status.
- Tight but readable spacing.
- No noisy icon clutter.

## 7. Motion Principles

- Reveal animation: opacity + translateY only.
- Duration target: `~540ms`.
- Easing target: smooth ease-out curve.
- Respect `prefers-reduced-motion`.
- No perpetual decorative loops unless they communicate value.

## 8. LightRays Integration Strategy

### Purpose
Introduce one creative hero animation layer that feels premium without breaking minimalism.

### Placement
- Hero visual area, behind portrait.
- Localized surface, not full-page takeover.

### Behavior
- Interactive ray influence with low visual aggression.
- Blend mode and opacity tuned to preserve text legibility.
- Must degrade cleanly under reduced motion.

### Requested Source Command and Usage
```bash
npx shadcn@latest add @react-bits/LightRays-JS-CSS
```

```jsx
<div style={{ width: "1080px", height: "1080px", position: "relative" }}>
  <LightRays
    raysOrigin="top-center"
    raysColor="#ffdf00"
    raysSpeed={1}
    lightSpread={1}
    rayLength={2.7}
    pulsating={false}
    fadeDistance={1}
    saturation={1}
    followMouse
    mouseInfluence={0.25}
    noiseAmount={0}
    distortion={0}
  />
</div>
```

## 9. Content Strategy

### Hero
- Clear role line.
- Practical value proposition.
- Immediate CTA to work.
- Trust signals (projects/focus/availability).

### Projects
Each project must communicate:
- Problem context.
- Implementation summary.
- Core stack.
- Delivery proof (repo/demo/status).

### Services
Three explicit tracks:
1. AI feature delivery.
2. Backend/API systems.
3. Cloud/data pipelines.

### Experience, Stack, Certifications
- Split into distinct sections.
- Avoid dumping all proof into a single block.
- Keep scanability high and cognitive load low.

### About
- Short profile narrative.
- Concrete facts (location, education, focus, availability).

### Contact
- Low-friction routes: email, phone, LinkedIn, resume.
- Clear collaboration intent.

## 10. Quality Bar Checklist

### First 5 seconds
- Is role/value instantly clear?
- Is there an obvious primary CTA?
- Does visual quality feel intentional?

### 30-second skim
- Are projects credible and concrete?
- Is technical focus obvious?
- Can visitor quickly find contact paths?

### Full pass
- Does hierarchy hold across desktop/mobile?
- Is spacing consistent everywhere?
- Are animation and hover states coherent?
- Is copy realistic and non-generic?

## 11. Anti-Patterns (Banned)

- Neon glow aesthetics.
- Over-saturated gradients.
- Generic equal-width feature rows everywhere.
- Over-animated UI that competes with content.
- Overclaim language ("expert", "world-class", "10x").
- Dead links or placeholders presented as real proof.
- Emoji-heavy or gimmicky UI copy.
