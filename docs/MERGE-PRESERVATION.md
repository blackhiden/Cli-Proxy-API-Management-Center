# Merge Preservation Guide

This document tracks fork-specific features and UI/UX customizations that must be preserved during upstream merges.

## UI/UX Beautification (2026-10-29)

**Status:** Fork-specific customization - Remove upon upstream merge if conflicts arise

### Changes Made

#### 1. Design System (`DESIGN.md`)
- Created comprehensive design system documentation
- **Action on merge conflict:** Remove file, use upstream design direction

#### 2. Typography System
**Files:** `index.html`, `src/styles/variables.scss`
- Added IBM Plex Sans and JetBrains Mono via Google Fonts
- Updated font stacks in variables.scss

**Action on merge conflict:**
- Prefer upstream font choices
- Remove Google Fonts links from index.html
- Revert variables.scss font-family definitions to upstream

#### 3. Enhanced Component Interactions
**File:** `src/styles/components.scss`
- Added button press effects (`transform: scale(0.96)`)
- Refined transitions with design tokens
- Enhanced hover states with shadows
- Improved disabled state handling
- Added reduced-motion support

**Action on merge conflict:**
- Accept upstream component styles entirely
- Do not attempt to merge custom press effects
- Upstream motion design takes precedence

#### 4. Login Page Redesign
**File:** `src/pages/LoginPage.module.scss`
- Enhanced brand panel with gradient and grid pattern
- Refined typography with `clamp()`
- Improved animations and transitions
- Updated border-radius values
- Added monospace font for connection box

**Action on merge conflict:**
- Accept upstream LoginPage styles entirely
- Remove custom gradient/grid pattern
- Revert to upstream typography and spacing

### Summary Documentation Files
- `UI_BEAUTIFICATION_SUMMARY.md` - Remove on any merge conflict
- `session.md` (UI beautification section) - Keep session history, mark as outdated

### Verification Before Removal

Before removing these customizations during a merge:
1. Verify upstream has design system documentation
2. Check if upstream improved button/input interactions
3. Test upstream login page aesthetics
4. Ensure no functional regressions from style reversion

### Rationale

These UI/UX customizations were applied using antislop design principles to create a distinctive "Technical Elegance" aesthetic. However, they are purely visual enhancements that do not affect functionality. If upstream has evolved their design system or made conflicting style changes, their design direction should take precedence as the canonical aesthetic.

**Preservation Priority:** LOW - Visual polish, not functional features

---

## Protected Features (High Priority - Always Preserve)

See `session.md` for documentation of protected features that must be preserved during merges:
- OAuth `noProxy` parameter
- Protected OAuth providers (Codex, Antigravity)
- OAuth result modal
- Update notification system
- Usage feature

These functional features have higher preservation priority than visual customizations.
