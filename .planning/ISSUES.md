# Project Issues Log

Enhancements discovered during execution. Not critical - address in future phases.

## Open Enhancements

### ISS-002: Add logo/brand identity

- **Discovered:** Post-MVP review (2025-12-22)
- **Type:** UX / Branding
- **Description:** Replace text wordmark "Portfolio" with actual logo or designer's name/brand. Needs logo file, favicon, and any other brand assets.
- **Impact:** Medium (brand identity important for professional portfolio)
- **Effort:** Quick (once assets provided)
- **Suggested phase:** v1.1

### ISS-003: UX improvements and polish

- **Discovered:** Post-MVP review (2025-12-22)
- **Type:** UX
- **Description:** General UX polish pass - smooth scrolling, page transitions, loading states, error states, 404 page, improved accessibility features, keyboard navigation enhancements.
- **Impact:** Medium (improves overall experience)
- **Effort:** Medium
- **Suggested phase:** v1.1

### ISS-004: Real case study content

- **Discovered:** Post-MVP review (2025-12-22)
- **Type:** Content
- **Description:** Replace sample case study with at least 1 real project. Includes writing content, gathering images, and ensuring confidentiality level is correct.
- **Impact:** High (real content needed for portfolio to be useful)
- **Effort:** Medium (content writing takes time)
- **Suggested phase:** v1.1

### ISS-005: Real writing content

- **Discovered:** Post-MVP review (2025-12-22)
- **Type:** Content
- **Description:** Replace sample essay with at least 1 real article/post. Publish something that demonstrates thought leadership or process insights.
- **Impact:** High (real content needed for portfolio to be useful)
- **Effort:** Medium (content writing takes time)
- **Suggested phase:** v1.1

### ISS-006: GitHub README.md

- **Discovered:** Post-MVP review (2025-12-22)
- **Type:** Documentation
- **Description:** Create comprehensive README.md for the repository explaining the project, how to run it locally, how to add content, deployment process, and tech stack.
- **Impact:** Medium (helps collaborators or future maintainers)
- **Effort:** Quick
- **Suggested phase:** v1.1

### ISS-007: CLAUDE.md documentation

- **Discovered:** Post-MVP review (2025-12-22)
- **Type:** Documentation
- **Description:** Create CLAUDE.md file documenting the project structure, architecture decisions, content management approach, and development workflows for AI assistant collaboration.
- **Impact:** Low (nice to have for AI-assisted maintenance)
- **Effort:** Quick
- **Suggested phase:** v1.1

## Closed Enhancements

### ISS-001: Image usage and optimization strategy ✓

- **Discovered:** Post-MVP review (2025-12-22)
- **Resolved:** Phase 7 (2025-12-22)
- **Type:** Performance / UX
- **Description:** Image infrastructure established with Astro's built-in optimization (Sharp), repo-based storage, responsive image components (ResponsiveImage, HeroImage), and AVIF/WebP/JPG format support.
- **Solution:**
  - Content collections schema updated with image() helper
  - Images stored in src/content/[collection]/images/
  - ResponsiveImage and HeroImage components created
  - CaseStudyCard integrated with cover image support
  - Lazy loading enabled by default
- **Deliverables:** Phase 7 Plans 07-01, 07-02

---

**Note for next milestone planning:**
Use `/gsd:discuss-milestone` or `/gsd:new-milestone` to define v1.1 scope based on these issues.
