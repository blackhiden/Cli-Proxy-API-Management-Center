# Design System

## Aesthetic Direction: Technical Elegance

The CLI Proxy API Management Center uses a **Technical Elegance** aesthetic: refined minimalism with distinctive technical character. Not generic dashboard, not playful consumer app—a professional tool that feels crafted and confident.

## Typography

### Display & UI: IBM Plex Sans
- **Why**: Technical heritage (from IBM's design language) with refined proportions and excellent readability. Distinctive without being loud.
- **Usage**: All headings, body text, UI elements, navigation
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Character**: Geometric but warm, technical but approachable

### Code & Data: JetBrains Mono
- **Why**: Purpose-built for developers, excellent ligatures, clear distinction between similar characters
- **Usage**: Code blocks, monospaced data, configuration values
- **Weights**: 400 (regular), 500 (medium)

### Fallbacks
- Sans: `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
- Mono: `'SF Mono', 'Cascadia Mono', Consolas, 'Liberation Mono', monospace`

## Color Palette

### Base (Warm Gray)
- Retained from existing theme
- Page background: `#faf9f5` (light) / `#151412` (dark)
- Card surface: `#f0eee8` (light) / `#1d1b18` (dark)
- Primary action: `#8b8680`

### Semantic Colors
- **Success/Flow**: `#10b981` (emerald) - reserved exclusively for live traffic, success states
- **Warning**: `#d97706` (amber)
- **Error**: `#c65746` (terra cotta)
- **Info**: Primary gray

### Visualization
- Success: `#10b981` (light) / `#0fae78` (dark adjusted)
- Failure: `#c65746` (light) / `#cf4b3a` (dark adjusted)

## Motion Philosophy

**Purpose over decoration**: Every animation guides attention to a moment, never runs on a loop for its own sake.

### Easing
- **Primary**: `cubic-bezier(0.23, 1, 0.32, 1)` (strong ease-out, physics-based)
- **Usage**: UI transitions, micro-interactions, reveals

### Duration
- **Press**: `160ms` (immediate feedback)
- **Hover**: `200ms` (comfortable response)
- **Reveal**: `300ms` (attention-guiding)
- **Page**: `400ms` (spatial transition)

### Dial Setting: **2/5 (Refined Motion)**
- Hero sections use staggered reveals
- Key interactions have purposeful transitions
- Data visualizations animate on mount
- No endless loops, no gratuitous bounces
- Respects `prefers-reduced-motion`

## Visual Details

### Surfaces
- **Flat by default**: Most elements sit on the page plane
- **Elevation for hierarchy**: Modals, dropdowns, floating actions use shadow
- **Border treatment**: 1px solid borders, strategic use of dashed borders for meta information

### Glass Effect (Dose Cap: 1-2 elements)
- **Current usage**: Header and modals
- **Blur**: `12px`
- **Opacity**: `82%`
- **Disabled**: Mobile, reduced-motion, reduced-transparency

### Shadows (Elevation Markers)
- **Default**: `0 1px 2px 0 rgb(0 0 0 / 0.08)`
- **Large**: `0 10px 18px -3px rgb(0 0 0 / 0.1)`
- **Floating**: `0 12px 26px rgba(0, 0, 0, 0.14)`

### Radius (Hierarchy Tool)
- **Small**: `4px` (badges, chips)
- **Medium**: `8px` (cards, inputs)
- **Large**: `12px` (major panels)
- **Full**: `9999px` (pills, dots - used sparingly)

### Backgrounds
- **Ambient layer**: Subtle radial gradient wash (emerald tint) on hero sections
- **Grid overlay**: Technical character, 72px grid with low opacity, masked edges
- **No**: Harsh gradients, rainbow schemes, blurred orbs everywhere

## Component Patterns

### Cards
- Flat surface with 1px border
- Subtle hover: lift 2px + border color shift + shadow increase
- Press: scale 0.98 (whole card clickable)

### Buttons
- Primary: Solid fill, primary color
- Ghost: Transparent with border
- Press: Transform scale 0.96
- Disabled: Reduced opacity, no interaction

### Data Visualization
- Clean lines, no chart junk
- Strategic use of emerald for "live" data
- Muted colors for inactive/background data
- Animated reveals on mount (purpose: guide attention to fresh data)

### Empty States
- Clear reason ("No auth files configured yet")
- Single action ("Upload your first credential")
- No generic illustrations, no "No data available" with nothing else

## Forbidden Patterns (Antislop Compliance)

### Never Use
- ❌ Blue-purple gradients as primary treatment
- ❌ Generic fonts (Inter, Roboto, Arial) without purpose
- ❌ Emoji in headings and navigation
- ❌ Pill-shaped everything (only where it makes sense)
- ❌ Glass effect on every surface
- ❌ Glow on cards, buttons, badges simultaneously
- ❌ Endless pulse/bounce animations
- ❌ Background grid as the only visual distinction
- ❌ Generic "Lorem ipsum" or "John Doe" placeholders
- ❌ Decorative comment separators (`// ========`)

### Always Do
- ✅ Typography from this design system
- ✅ Motion with clear purpose
- ✅ Real data or honest placeholders
- ✅ Strategic accent usage (one key moment)
- ✅ Empty states with cause + action
- ✅ Accessible keyboard navigation
- ✅ Respect reduced-motion preferences

## Accessibility

- WCAG AA contrast minimum (4.5:1 for body text, 3:1 for large text)
- All interactive elements keyboard accessible
- Focus indicators visible and distinctive
- Motion respects `prefers-reduced-motion`
- Semantic HTML structure
- ARIA labels where needed

## Implementation Notes

- CSS variables enable theme switching without code changes
- SCSS modules for component-scoped styles
- Global typography loaded in index.html
- Motion utilities in `src/hooks/motion.ts`
- All animations can be disabled via media query

---

**Last Updated**: 2026-10-29  
**Status**: Active, guiding all UI work
