---
phase: 12-ui-ux-refinements
plan: 02
status: complete
---

# Phase 12 Plan 2: Homepage Hero Spacing & Page Consistency

**Tightened homepage hero and unified page title structure across Work, Writing, About, and Contact for cohesive navigation experience**

## Accomplishments

- Reduced homepage hero vertical spacing from `var(--space-24)` (96px) to `var(--space-16)` (64px) for more focused entry point
- Standardized page title structure across Work, Writing, and About pages with consistent header elements
- Fixed Contact page title positioning to match other pages
- Converted mobile theme toggle to floating action button (FAB) at bottom-right of screen
- Resolved View Transitions positioning conflict by separating mobile and desktop theme toggle components

## Files Created/Modified

- `src/pages/index.astro` - Reduced hero padding-block from --space-24 to --space-16
- `src/pages/about.astro` - Extracted h1 into dedicated `.about-header` matching Work/Writing pattern, added intro paragraph
- `src/pages/contact.astro` - Added `.contact-header` structure matching other pages for visual consistency
- `src/components/ThemeToggle.astro` - Removed mobile-specific styles, now desktop-only component
- `src/components/ThemeToggleMobile.astro` - NEW: Mobile-only FAB component with fixed positioning at bottom-right
- `src/components/Header.astro` - Updated mobile breakpoint to 768px, hides desktop toggle on mobile
- `src/layouts/BaseLayout.astro` - Added ThemeToggleMobile component as direct child of body element

## Decisions Made

**Homepage spacing:** Chose `var(--space-16)` (64px) over more aggressive reduction to maintain minimal aesthetic while achieving tighter feel. 33% reduction balances focus with breathing room.

**Page title standardization:** Standardized on Work/Writing pattern (header + intro + content) rather than About's embedded pattern. Creates predictable navigation experience.

**Mobile theme toggle architecture:** Separated mobile FAB from desktop toggle as distinct components rather than responsive styles on single component. This prevents View Transitions animation context from interfering with `position: fixed`, ensuring FAB positions correctly relative to viewport.

**Mobile breakpoint consistency:** Changed from 640px to 768px across Header and theme toggle components for unified responsive behavior.

## Issues Encountered

**Mobile FAB positioning conflict:** Initial attempts to use `position: fixed` with `!important` flags failed because Astro's View Transitions API creates transform/animation contexts that establish new containing blocks. `position: fixed` elements inside these contexts position relative to the containing block, not the viewport.

**Resolution:** Created separate `ThemeToggleMobile.astro` component and placed it as direct child of `<body>` in BaseLayout, outside Header component and View Transitions animation scope. This ensures FAB positions correctly at bottom-right of device screen (20px from bottom, 20px from right).

## Next Step

Ready for next plan in Phase 12 (if additional refinements needed) or phase completion checkpoint.
