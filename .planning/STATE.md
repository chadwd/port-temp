# Project State

## Project Summary

**Building:** Content-first portfolio website for senior/principal product designer focused on AI and blockchain innovation. Calm, confident, minimal aesthetic with Astro + GitHub Pages.

**Core requirements:**
- Calm, confident, minimal, editorial feel
- Fast load times (Lighthouse 90+)
- Accessible and keyboard friendly (WCAG AA)
- Clear information hierarchy
- Case studies with confidentiality levels (public | partial | nda)
- Adaptive light/dark mode
- Simple to extend via markdown

**Constraints:**
- Astro framework
- GitHub Pages hosting
- Custom domain via GoDaddy
- Markdown files for content

## Current Position

Phase: 20.1 of 20 (Cover Letter Skill)
Plan: 1 of 1 complete
Status: Phase complete
Last activity: 2026-02-05 - Completed 20.1-01-PLAN.md

Progress: ████░░░░░░ 40%

Last completed: v1.3 Professional Data Infrastructure (shipped 2026-01-20)
- Phase 15 (Metadata Schema & Agents): 3/3 plans complete ✓
- Phase 16 (Profile Data System): DEFERRED
- Phase 17 (Impact Schema Foundation): DEFERRED
- Phase 18 (Resume and CV Writer): 2/2 plans complete ✓

## Performance Metrics

**v1.0 Stats (completed):**
- Total plans completed: 8
- Average duration: ~8 min
- Total execution time: ~52 min

**By Phase (v1.0):**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Foundation | 1 | ~5 min | ~5 min |
| 2. Design System | 1 | ~5 min | ~5 min |
| 3. Core Pages | 2 | ~5 min | ~2.5 min |
| 4. Case Studies | 2 | ~7 min | ~3.5 min |
| 5. Writing | 1 | ~4 min | ~4 min |
| 6. Deployment | 1 | ~26 min | ~26 min |

**v1.1 Stats (completed):**
- Total plans completed: 9
- Average duration: ~varies by phase
- Total execution time: 9 days
- Timeline: 2025-12-22 to 2025-12-31

**By Phase (v1.1):**

| Phase | Plans | Completed | Total Time |
|-------|-------|-----------|------------|
| 7. Image Infrastructure | 2 | 2025-12-22 | 1 day |
| 8. Brand Identity | 1 | 2025-12-27 | 1 day |
| 9. Real Content | 2 | 2025-12-30 | 1 day |
| 10. UX Polish | 2 | 2025-12-30 | 1 day |
| 11. Documentation | 2 | 2025-12-31 | 1 day |

*Milestone complete*

## Accumulated Context

### Decisions Made

| Phase | Decision | Rationale |
|-------|----------|-----------|
| Init | Astro framework | Fast, markdown-first, minimal JS |
| Init | GitHub Pages hosting | Free, controlled, no vendor lock-in |
| Init | Markdown + frontmatter | Easy to write, version controlled, portable |
| Init | Adaptive color mode | Respects user preference |
| 1 | Minimal template + manual setup | Full control over structure |
| 1 | Content collections upfront | Schema ready for Phase 4-5 |
| 2 | Slate blue accent (#334155) | Professional, not corporate, fits "systems thinker" |
| 2 | System fonts only | Performance priority, can add custom later |
| 2 | Warm color palette | Grounded feel, not cold/corporate |
| 3 | Simple mobile nav (stacked) | Minimal approach, can enhance later |
| 3 | Text wordmark "Portfolio" | Can update to name when content added |
| 3 | mailto for contact | Static site friendly, no external deps |
| 3 | Three-section About layout | Background, Philosophy, Approach |
| 4 | Subtle confidentiality badges | Professional look, not alarming |
| 4 | CaseStudyCard component | Reusable across homepage and /work |
| 4 | Entire card clickable | Better UX than title-only links |
| 4 | Subtle hover animation | Editorial feel, translateY -2px |
| 5 | Writing mirrors case studies | Consistent UX, same patterns |
| 5 | Recent posts (no featured flag) | Simpler than case studies |
| 5 | Inline card styling | No dedicated WritingCard component needed |
| 6 | HTTP during cert provisioning | GitHub auto-provisions SSL, takes 10-30 min |
| 6 | withastro/action@v3 only | Handles build + upload, no separate artifact step |
| 7 | image() helper for schema | Type-safe imports, not z.string() |
| 7 | Images in collection subdirs | src/content/[collection]/images/ for organization |
| 7 | Optional coverImage field | Backward compat with existing content |
| 7 | Astro built-in Image/Picture | No external deps, Sharp optimization default |
| 7 | Lazy loading for cards | Below-fold optimization, loading="lazy" default |
| 7 | AVIF/WebP/JPG support | Progressive enhancement via HeroImage component |
| 8 | Professional favicons | Used custom-designed CD logo from generator (not placeholder) |
| 8 | Web manifest included | PWA support with maskable icons for installability |
| 8 | "Chad Dunbar" wordmark | Full name vs initials for clarity and brand recognition |
| 9 | Hero images on cards | Display coverImage above title on all list view cards |
| 9 | Hero images on detail pages | HeroImage component between header and content |
| 9 | Title Case tag convention | All tags use Title Case (e.g., "Design Systems", "AI Tools") |
| 9 | Tag taxonomy categories | Technology, Practice, Tools, Domain, Approach, Leadership, Philosophy |
| 9 | Inline images in case studies | 6 images in ds-bridge positioned by content sections |
| 9 | Descriptive alt text | All images include accessibility-focused alt descriptions |
| 10 | 404 message style | "You found the void" - minimal, editorial tone |
| 10 | Border radius tokens | Added --radius-sm/md to design system for consistency |
| 10 | Modal overlay opacity | 90% dark overlay for strong image focus |
| 10 | Tight 404 spacing | Compact vertical rhythm for focused error page |
| 10 | View Transitions mode | Default fade for consistent page navigation UX |
| 10 | Reduced motion support | Respect prefers-reduced-motion for accessibility |
| 10 | Image viewer lifecycle | Reinitialize on astro:page-load for View Transitions compatibility |
| 12 | 640px mobile breakpoint | Better tablet support vs 480px |
| 12 | Focus-visible implementation | Keyboard-only focus outlines, not mouse clicks |
| 12 | Backdrop blur on header | 8px blur with rgba for subtle depth |
| 12 | Touch target padding | --space-3 (12px) for 44px+ WCAG AAA compliance |
| 13 | Hyphen naming convention | Front-end files use hyphens, back-end/scripts use underscores |
| 13 | Keep template placeholder | gsale-peer-design.md preserved as working template |
| 14 | Right-aligned ContentNav | Editorial feel, less intrusive than full-width |
| 14 | sortOrder precedence | Manual curation via sortOrder takes priority over date |
| 14 | Loop behavior | Modulo-based wrap from last to first item |
| 14.1 | ContactCTA component | Reusable component vs duplicated code across pages |
| 14.1 | Dual resume files | Keep original filename + resume.pdf for URL stability |
| 15 | CMS deferred | Git-based CMS conflicts with GitHub Pages static hosting |
| 16 | Analytics deferred | Plausible recommended when ready (~15 min setup) |
| 15.02 | Skill structure | Used purpose/process/examples/anti_patterns/human_in_the_loop sections |
| 15.02 | Quality tiers | Three levels (Strong/Needs Review/Weak) for actionable assessment |
| 15.02 | Output format | Copy-paste ready YAML with validation summary and next steps |
| 15.03 | YAML frontmatter for skills | name/description/location fields enable /skill-name invocation |
| 15.03 | Section-by-section file creation | Write header, Edit for each section to prevent token overload |
| 15.03 | Job analysis output location | src/data/job-analysis/[company]-[role].md for organized storage |
| 15.03 | Weighted scoring algorithm | Tag match 40%, domain 25%, recency 20%, impact 15% for relevance ranking |
| 18.01 | Resume tactical filtering | 10-15 year experience window, job-matched content selection for 1-2 pages |
| 18.02 | CV comprehensive structure | All career history included, chronological completeness for 3-6 page documentation |
| 18.02 | CV context-aware emphasis | Section ordering adapts to context (executive/academic) without filtering content |
| 18.02 | CV multi-section template | Publications, speaking, teaching, board positions, awards, patents, affiliations |
| 20.1 | Cover letter 6-paragraph structure | Marketing document (not autobiography): Identity, Summary, Skills x2, Why Company, Conclusion |
| 20.1 | Cover letter scoring | Reused job-matcher weighted algorithm, top 2 skills only, story themes for narrative |
| 20.1 | Cover letter style | One page, 300-400 words, 90-second read, employer language, specific over clever |
| 20.1 | Cover letter integration | Job-analysis file provides pre-scored accomplishments and company research |

### Deferred Issues

None yet.

### Blockers/Concerns Carried Forward

None - clean slate for v1.3.

### Roadmap Evolution

- Milestone v1.0 shipped 2025-12-22: MVP delivery, 6 phases (Phases 1-6)
- Milestone v1.1 shipped 2025-12-31: Content & Polish, 5 phases (Phases 7-11)
- Milestone v1.2 shipped 2026-01-01: Content & Polish Expansion, 5 phases (Phases 12-14.1)
- Phase 14.1 inserted after Phase 14: Copy improvements and resume PDF (URGENT)
- Milestone v1.3 shipped 2026-01-20: Professional Data Infrastructure, 2 phases (Phases 15, 18)
  - Phases 16-17 deferred (infrastructure already sufficient)
- Milestone v1.4 created 2026-01-20: Improvements, 2 phases (Phases 19-20)
  - Focus 1: Profile data enhancement (expand career history, strengthen metrics)
  - Focus 2: Strategic job application packages (3-5 target roles)
- Phase 20.1 inserted before Phase 20: Cover Letter Skill (URGENT - required to complete Phase 20)

## Project Alignment

Last checked: 2025-12-31 (v1.1 milestone complete)
Status: ✓ Aligned
Assessment: Milestone v1.1 complete - all deliverables shipped, Lighthouse 100/100 maintained.
Drift notes: None

## Session Continuity

Last session: 2026-02-05
Stopped at: Completed 20.1-01-PLAN.md (Phase 20.1 complete - cover letter generator skill operational)
Resume file: None - phase complete
Next action: /gsd:plan-phase 20 (Strategic Job Application Package - now has all required skills)
