# Handoff: Job Application Content Updates

**Date**: 2026-01-02
**Status**: In progress

## Goal

Update portfolio site content to align with Staff/Principal Designer job applications.

## Completed Changes

### About Page (`src/pages/about.astro`)

1. **Hero banner with Seattle image**
   - Full-width image at `/public/images/landscape-seattle.png`
   - "About Me" title overlaid with gradient
   - "Based in Seattle (Bellevue)" location text overlaid
   - Height: 280px with bottom-left text positioning

2. **Text styling unified**
   - All body text now uses `--text-lg` (18px)
   - All body text uses `--color-text` (primary color)
   - Consistent `--leading-relaxed` line height
   - Consistent `--space-4` spacing between paragraphs

3. **Content structure**
   - Removed "I am a Principal-level..." from header
   - Added it as lead paragraph in prose section
   - Removed "I do not optimize for screens..." paragraph (user deleted it)

4. **Other edits made earlier**
   - Location added: "Based in Seattle (Bellevue)"
   - Mentorship line updated: "working closely with junior, senior, lead, and managerial designers"

## Still To Do

User mentioned "a few content updates" for job applications. Potential remaining work:
- Homepage headline/intro updates
- Case study emphasis or reordering
- Any other copy changes for Staff/Principal positioning
- Writing section additions (was discussing before pivoting to urgent job prep)

## Files Modified

- `src/pages/about.astro` - Hero banner, text styling, content updates
- `public/images/landscape-seattle.png` - Added Seattle skyline image

## To Resume

Run `npm run dev` and check `/about` page. Ask user what other content updates are needed for job applications.

## Context

User is targeting Staff/Principal Designer roles and needed urgent content updates before applying. The writing section expansion (siloed vs peer designing article) was put on hold for this.
