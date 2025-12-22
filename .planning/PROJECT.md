# Portfolio Website

## Vision

A clean, fast, content-first portfolio website for a senior/principal product designer focused on AI and blockchain innovation. The site should feel calm, confident, and minimal — no flashy animations, no decorative elements for their own sake. It needs to serve two reading modes: quick scanning for busy hiring managers and industry experts, and deeper reading for those who want to understand the work.

The design itself should embody the designer's sensibility: systems thinking, quiet authority, engineered precision. The content is the hero. The site should feel like great product design — invisible infrastructure that makes the work shine.

## Problem

Existing portfolio solutions (Webflow, templates) introduce unnecessary complexity, ongoing costs, and third-party dependencies. The goal is full control over a portfolio that's simple to maintain, easy to extend with new case studies and writing, and performs excellently. Moving away from Webflow to something owned and operated.

## Success Criteria

How we know this worked:

- [ ] Calm, confident, minimal, editorial feel achieved
- [ ] Fast load times and strong Lighthouse scores (90+ across all metrics)
- [ ] Accessible and keyboard friendly (WCAG AA)
- [ ] Clear information hierarchy — scannable in seconds
- [ ] Strong typography and whitespace
- [ ] Simple to extend with new case studies and posts via markdown
- [ ] Content is the hero, not effects
- [ ] Case studies support confidentiality levels (public, partial, NDA)
- [ ] Adaptive light/dark mode respects system preference
- [ ] Successfully deployed to GitHub Pages with custom domain

## Scope

### Building

**Pages:**
- Home — introduction + featured case studies
- Case Studies — deep dives into specific projects (markdown-driven)
- About — bio, background, design philosophy
- Writing — essays and process notes (markdown-driven)
- Contact — way to reach out

**Features:**
- Adaptive light/dark mode (system-aware)
- Markdown-based content management with image support
- Case study confidentiality levels (public | partial | nda)
- Responsive design
- Strong typography system
- Placeholder color palette (easy to adjust)

**Technical:**
- Astro framework
- Static site generation
- GitHub Pages hosting
- Custom domain support (GoDaddy)

### Not Building

- Analytics or visitor tracking (v1)
- Interactive prototypes or embedded demos (v1)
- CMS dashboard — content via markdown files
- Comments or social features
- Newsletter signup

## Context

This is a greenfield project. The designer has partial case study content ready and will complete it as the site is built. Currently has a domain through GoDaddy. Previously worked in Webflow but wants to move away from it for more control and lower long-term costs.

The portfolio needs to position a senior/principal product designer with expertise in AI and blockchain innovation. The audience is hiring managers and industry experts who need to quickly assess competence and depth.

## Design Direction

**Color Palette Personality** (placeholder to be refined):

The palette should evoke:
- Calm authority, depth, long-term thinking
- Systems thinker energy — reliable, structured, quietly powerful
- Engineered, not decorated
- Curiosity, AI, innovation, pushing edges
- Grounded, direct, no fluff
- Mentorship, empathy, approachability

Think: deep neutrals, subtle warmth, restrained accent. Not cold or corporate. Not trendy or flashy.

**Typography:**
- Editorial quality
- Strong hierarchy
- Generous whitespace
- Easy to read at length

**Layout:**
- Content-first
- Clear information hierarchy
- Generous breathing room
- Scannable structure with depth available

## Constraints

- **Hosting**: GitHub Pages (free, controlled)
- **Domain**: Existing GoDaddy domain to connect
- **Content**: Markdown files with frontmatter and image support
- **Performance**: Lighthouse 90+ target
- **Accessibility**: WCAG AA compliance

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Astro | Fast, markdown-first, minimal JS, perfect for content sites |
| Hosting | GitHub Pages | Free, controlled, no vendor lock-in |
| Content format | Markdown + frontmatter | Easy to write, version controlled, portable |
| Color mode | Adaptive (system-aware) | Respects user preference, modern expectation |
| CMS | None (files) | Maximum control, no dependencies, works with git |
| Confidentiality | Frontmatter field | Simple metadata, renders as visual indicator |

## Open Questions

Things to figure out during execution:

- [ ] Exact color palette values (will start with placeholder)
- [ ] Specific typography choices (font families)
- [ ] Case study template structure and sections
- [ ] Image hosting strategy (repo vs external)
- [ ] Contact form approach (or just email link?)

---
*Initialized: 2025-12-22*
