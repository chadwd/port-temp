# Roadmap: Portfolio Website

## Milestones

- ✅ **v1.0 MVP** - Phases 1-6 (shipped 2025-12-22)
- ✅ **v1.1 Content & Polish** - Phases 7-11 (shipped 2025-12-31)
- ✅ **v1.2 Content & Polish Expansion** - Phases 12-14.1 (shipped 2026-01-01)
- 🚧 **v1.3 Professional Data Infrastructure** - Phases 15-17 (in progress)

## Completed Milestones

- ✅ [v1.0 MVP](milestones/v1.0-MVP.md) (Phases 1-6) - SHIPPED 2025-12-22
- ✅ [v1.1 Content & Polish](milestones/v1.1-Content-&-Polish.md) (Phases 7-11) - SHIPPED 2025-12-31

## Overview

Build a content-first portfolio site from foundation to deployment. Start with Astro project setup and design tokens, then build core pages and content systems (case studies, writing), and finish with GitHub Pages deployment and custom domain connection.

## Domain Expertise

None

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-6) - SHIPPED 2025-12-22</summary>

- [x] **Phase 1: Foundation** - Astro project setup, configuration, base structure
- [x] **Phase 2: Design System** - Typography, colors, spacing, adaptive light/dark mode
- [x] **Phase 3: Core Pages** - Home, About, Contact layouts and components
- [x] **Phase 4: Case Studies** - Markdown-driven case study system with confidentiality levels
- [x] **Phase 5: Writing** - Blog/essays section with markdown content
- [x] **Phase 6: Deployment** - GitHub Pages hosting, custom domain configuration

## Phase Details

### Phase 1: Foundation
**Goal**: Working Astro project with proper structure, ready for development
**Depends on**: Nothing (first phase)
**Research**: Unlikely (Astro setup is well-documented, standard patterns)
**Plans**: 1 plan

Plans:
- [x] 01-01: Astro project setup, directory structure, GitHub Pages config

### Phase 2: Design System
**Goal**: Complete design token system with typography, colors, spacing, and adaptive theming
**Depends on**: Phase 1
**Research**: Unlikely (CSS custom properties, internal styling decisions)
**Plans**: 1 plan

Plans:
- [x] 02-01: Color palette, typography system, utility classes

### Phase 3: Core Pages
**Goal**: Home, About, and Contact pages with layouts and base components
**Depends on**: Phase 2
**Research**: Unlikely (Astro layouts and components, established patterns)
**Plans**: 2 plans

Plans:
- [x] 03-01: Header, Footer, navigation components
- [x] 03-02: Home, About, Contact pages

### Phase 4: Case Studies
**Goal**: Fully functional case study system with markdown content, frontmatter schema, and confidentiality indicators
**Depends on**: Phase 3
**Research**: Unlikely (Astro content collections, markdown processing)
**Plans**: 2 plans

Plans:
- [x] 04-01: Case study list page, dynamic detail pages, confidentiality badges
- [x] 04-02: CaseStudyCard component, homepage featured work, grid layouts

### Phase 5: Writing
**Goal**: Blog/essays section following same markdown patterns as case studies
**Depends on**: Phase 4
**Research**: Unlikely (mirrors case study patterns)
**Plans**: 1 plan

Plans:
- [x] 05-01: Writing list page, article detail pages, sample post, homepage integration

### Phase 6: Deployment
**Goal**: Live site on GitHub Pages with custom domain from GoDaddy
**Depends on**: Phase 5
**Research**: Likely (deployment config, DNS setup)
**Research topics**: Astro GitHub Pages adapter, GitHub Actions workflow, GoDaddy DNS configuration for GitHub Pages
**Plans**: 1 plan

Plans:
- [x] 06-01: GitHub Actions workflow, custom domain setup, DNS configuration

</details>

<details>
<summary>✅ v1.1 Content & Polish (Phases 7-11) - SHIPPED 2025-12-31</summary>

**Milestone Goal:** Transform MVP into production-ready portfolio with real content, brand identity, image support, UX polish, and comprehensive documentation.

- [x] **Phase 7: Image Infrastructure** (2/2 plans) - completed 2025-12-22
- [x] **Phase 8: Brand Identity** (1/1 plan) - completed 2025-12-27
- [x] **Phase 9: Real Content** (2/2 plans) - completed 2025-12-30
- [x] **Phase 10: UX Polish** (2/2 plans) - completed 2025-12-30
- [x] **Phase 11: Documentation** (2/2 plans) - completed 2025-12-31

See [v1.1 milestone archive](milestones/v1.1-Content-&-Polish.md) for full details.

</details>

<details>
<summary>✅ v1.2 Content & Polish Expansion (Phases 12-14.1) - SHIPPED 2026-01-01</summary>

**Milestone Goal:** Refine UI/UX foundation, expand portfolio content to 3 case studies and 3 articles, add CMS research and deferred analytics planning.

- [x] **Phase 12: UI/UX Refinements** (1/1 plan) - completed 2025-12-31
- [x] **Phase 13: Additional Portfolio Content** (1/1 plan) - completed 2026-01-01
- [x] **Phase 14: Enhanced Writing Content** (1/1 plan) - completed 2026-01-01
- [x] **Phase 14.1: Copy Improvements and Resume** (1/1 plan) - completed 2026-01-01
- [ ] **Phase 15: CMS Integration** - DEFERRED (GitHub Pages incompatibility)
- [ ] **Phase 16: Analytics & Monitoring** - DEFERRED (not a priority)

See [v1.2 milestone archive](milestones/v1.2-Content-&-Polish-Expansion.md) for full details.

</details>

### 🚧 v1.3 Professional Data Infrastructure (In Progress)

**Milestone Goal:** Build centralized professional metadata system and agent toolkit for maintaining single source of truth across resumes, CVs, portfolios, and AI assistants.

#### Phase 15: Metadata Schema & Agents

**Goal**: Professional metadata schema + agents for data maintenance and job application support
**Depends on**: v1.2 complete
**Research**: Unlikely (internal schema/skill design)
**Plans**: 3 plans

Plans:
- [x] 15-01: Schema design - profile.yaml, Zod validation, helper functions (completed 2026-01-19)
- [x] 15-02: Profile Updater Agent - source ingestion, XYZ extraction, validation skill (completed 2026-01-20)
- [ ] 15-03: Job Matcher Agent - extract relevant accomplishments for job applications

#### Phase 15.03: Job Matcher Agent

**Goal**: Given a job posting, extract the most relevant accomplishments from profile.yaml that demonstrate immediate value for that role
**Depends on**: Phase 15.02
**Research**: Unlikely (follows skill patterns from 15.02)
**Plans**: 1 plan

Plans:
- [ ] 15.03-01: Job Matcher skill - job posting analysis, relevance scoring, tailored output

#### Phase 16: Profile Data System

**Goal**: Implement markdown/YAML data storage for metadata with single source of truth
**Depends on**: Phase 15
**Research**: Unlikely (follows existing markdown patterns from v1.1-v1.2)
**Plans**: TBD

Plans:
- [ ] 16-01: TBD (run /gsd:plan-phase 16 to break down)

#### Phase 17: Impact Schema Foundation

**Goal**: Design impact statement structure (Accomplishment/Measure/Method) with validation for future extraction and reuse
**Depends on**: Phase 16
**Research**: Unlikely (internal schema design)
**Plans**: TBD

Plans:
- [ ] 17-01: TBD (run /gsd:plan-phase 17 to break down)

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation | v1.0 | 1/1 | Complete | 2025-12-22 |
| 2. Design System | v1.0 | 1/1 | Complete | 2025-12-22 |
| 3. Core Pages | v1.0 | 2/2 | Complete | 2025-12-22 |
| 4. Case Studies | v1.0 | 2/2 | Complete | 2025-12-22 |
| 5. Writing | v1.0 | 1/1 | Complete | 2025-12-22 |
| 6. Deployment | v1.0 | 1/1 | Complete | 2025-12-22 |
| 7. Image Infrastructure | v1.1 | 2/2 | Complete | 2025-12-22 |
| 8. Brand Identity | v1.1 | 1/1 | Complete | 2025-12-27 |
| 9. Real Content | v1.1 | 2/2 | Complete | 2025-12-30 |
| 10. UX Polish | v1.1 | 2/2 | Complete | 2025-12-30 |
| 11. Documentation | v1.1 | 2/2 | Complete | 2025-12-31 |
| 12. UI/UX Refinements | v1.2 | 1/1 | Complete | 2025-12-31 |
| 13. Additional Portfolio Content | v1.2 | 1/1 | Complete | 2026-01-01 |
| 14. Enhanced Writing Content | v1.2 | 1/1 | Complete | 2026-01-01 |
| 14.1 Copy Improvements & Resume | v1.2 | 1/1 | Complete | 2026-01-01 |
| 15. CMS Integration | v1.2 | - | Deferred | - |
| 16. Analytics & Monitoring | v1.2 | - | Deferred | - |
| 15. Metadata Schema & Agents | v1.3 | 2/3 | In progress | - |
| 15.03. Job Matcher Agent | v1.3 | 0/1 | Not started | - |
| 16. Profile Data System | v1.3 | 0/? | Not started | - |
| 17. Impact Schema Foundation | v1.3 | 0/? | Not started | - |
