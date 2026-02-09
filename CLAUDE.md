# CLAUDE.md - AI Collaboration Guide

> Essential context for AI assistants working on this project

## 1. Project Overview

This repository contains two integrated systems:

**1. Portfolio Website**
A content-first portfolio for a senior product designer, built with Astro and deployed to GitHub Pages.

**2. Career Toolkit**
A structured profile data system with Claude Code skills for generating tailored resumes, CVs, and job application materials.

**Shared principles:**
- Content is the source of truth (markdown, YAML)
- Schema-validated data structures
- Simple, maintainable patterns
- Performance and accessibility first

## 2. Tech Stack

**Framework:** Astro 5.16 (static site generation, zero JS by default)
**Language:** TypeScript (strict mode)
**Styling:** CSS custom properties, scoped styles, semantic CSS only (no Tailwind/utility classes)
**Content:** Markdown with Zod schema validation
**Deployment:** GitHub Pages via GitHub Actions
**Live site:** https://chaddunbar.com

## 3. Project Structure

```
src/
├── components/           # Reusable Astro components
├── content/              # Portfolio content (markdown collections)
│   ├── config.ts         # Zod schemas for case-studies, writing
│   ├── case-studies/     # Portfolio case studies
│   └── writing/          # Blog posts and articles
├── data/                 # Career toolkit data
│   ├── profile.yaml      # Single source of truth for career data
│   ├── schema.ts         # Zod validation for profile
│   ├── index.ts          # Helper functions for profile access
│   ├── sources/          # Raw source documents (reviews, impact docs)
│   ├── job-post/         # Job postings organized by company
│   ├── job-analysis/     # Job match analysis outputs
│   ├── resumes/          # Generated resumes (md + txt)
│   └── resume-guidelines/ # Resume best practices documentation
├── layouts/              # Page layouts (BaseLayout.astro)
├── pages/                # Routes (index, about, work, writing, contact)
├── scripts/              # Client-side TypeScript
└── styles/               # Global CSS (design tokens)

.claude/
├── settings.json         # Claude Code project settings (includes hooks)
└── skills/               # Claude Code skills
    ├── job-matcher/      # Match profile to job postings
    ├── resume-generator/ # Generate tailored resumes
    ├── cv-generator/     # Generate comprehensive CVs
    ├── profile-updater/  # Extract accomplishments from source docs
    └── new-case-study/   # Scaffold new case study with correct structure

public/images/            # All images (organized by collection/slug)
```

## 4. Portfolio Website

### Content Collections

Content lives in `src/content/` with schemas in `src/content/config.ts`.

**Collections:**
- `case-studies` - Portfolio case studies
- `writing` - Blog posts and articles

**Schema fields (case studies):**
- `title`, `description`, `date` (required)
- `featured` (boolean, default: false)
- `confidentiality` ("public" | "partial" | "nda")
- `tags` (array, Title Case)
- `coverImage` (string path to /public)

### Image Workflow (Critical)

**Location:** ALL images in `/public/images/{collection}/{slug}/`

**Path format:** Absolute paths only
- Correct: `/images/case-studies/my-project/hero.png`
- Wrong: `./images/...` or `../images/...`

**Naming:**
- `hero.png` - Cover images (1600×900, 16:9)
- `image-01.png`, `image-02.png` - Inline images

**Schema note:** Images use `z.string()` NOT `image()` helper (we use /public paths, not imported assets).

### Adding Content

```bash
# Case study
mkdir -p public/images/case-studies/project-name
# Add hero.png and inline images
touch src/content/case-studies/project-name.md
# Add frontmatter matching schema
```

### Design System

Design tokens in `src/styles/global.css`:
- Adaptive light/dark mode via `prefers-color-scheme`
- Warm neutral palette with slate blue accent
- Fluid typography with `clamp()`
- Single breakpoint: 768px

## 5. Career Toolkit

### Profile Data

The career toolkit uses `src/data/profile.yaml` as the single source of truth for all career-related content.

**Key sections:**
- `identity`, `contact` - Personal info
- `summary` - Professional summary (staff, short variants)
- `strengths`, `skills` - Capability statements
- `experience` - Work history with accomplishments
- `education` - Degrees and honors
- `private_metrics` - Internal reference only (not for resumes)

**Schema:** Defined in `src/data/schema.ts`, validated via Zod.

**Helper functions:** `src/data/index.ts` provides:
- `getProfile()` - Load validated profile
- `getAllImpactStatements()` - Flattened statements
- `getImpactStatementsByTag(tag)` - Filter by tag
- `getAllAccomplishments()` - Flattened with company context

### XYZ Accomplishment Format

All accomplishments use the Google XYZ formula:
```yaml
- accomplished: "[X - what was achieved, action verb first]"
  measured_by: "[Y - how success was measured, quantified]"
  by_doing: "[Z - specific approach, tools, or process]"
```

**Public vs Private metrics:**
- Public (in accomplishments): Directional language, defensible without audit
- Private (in private_metrics): Actual KPIs with hard numbers for interview prep

### Claude Code Skills

Skills are invoked via `/skill-name` in Claude Code.

**`/job-matcher [job-posting]`**
Analyze job posting, score profile accomplishments for relevance, generate match analysis with recommended positioning.
- Output: `src/data/job-analysis/[company]-[role].md`

**`/resume-generator [job-link] [analysis-file]`**
Generate tailored 1-2 page resume from profile data and job analysis.
- Output: `src/data/resumes/[company]-[role]-resume.[md|txt]`

**`/cv-generator [optional-context]`**
Generate comprehensive multi-page CV for career documentation.
- Output: `src/data/cv-[lastname]-[context].md`

**`/profile-updater [source-doc-path]`**
Extract accomplishments from source documents in XYZ format for profile updates.
- Output: Proposal for human review (never auto-edits profile)

**`/new-case-study [project-slug]`**
Scaffold a new case study with correct directory structure, image folder, and markdown template.
- Creates: `public/images/case-studies/[slug]/` and `src/content/case-studies/[slug].md`

### Job Application Workflow

1. **Get job posting** - Save to `src/data/job-post/[Company]/[role].md`
2. **Run `/job-matcher`** - Creates analysis file with scored matches
3. **Run `/resume-generator`** - Creates tailored resume using analysis
4. **Review and edit** - All outputs require human approval

## 6. Code Conventions

### Astro Components

```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description } = Astro.props;
---

<div class="component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>

<style>
  .component {
    background-color: var(--color-surface);
  }
</style>
```

### Styling Rules

- Scoped styles in `<style>` tags within `.astro` files
- Global tokens in `src/styles/global.css`
- No inline styles, no utility classes
- Use CSS custom properties for consistency

### Content Files

- Markdown files in `src/content/{collection}/`
- Filename becomes slug (e.g., `my-project.md` → `/work/my-project`)
- All frontmatter validated against Zod schemas

## 7. Testing & Verification

**Required before committing:**
```bash
npm run build      # Must succeed with no errors
npm run astro check # TypeScript validation
```

**Development:**
```bash
npm run dev        # Local server at http://localhost:4321
```

## 8. Performance & Accessibility

**Requirements (non-negotiable):**
- Lighthouse: 100/100 across all metrics
- WCAG AA compliance
- Full keyboard navigation
- Color contrast: 4.5:1 (normal), 3:1 (large)

**Features:**
- View Transitions API for smooth navigation
- Image viewer modal (keyboard accessible)
- `prefers-reduced-motion` support

## 9. Deployment

**Automatic:** Push to `main` triggers GitHub Actions deployment.

**Manual:**
```bash
npm run build   # Output to dist/
npm run preview # Preview production build
```

## 10. For AI Assistants

### Quick Reference

| Task | Location / Command |
|------|----------|
| Add case study | `/new-case-study [slug]` (scaffolds structure) |
| Add blog post | `src/content/writing/` |
| Update profile | `src/data/profile.yaml` (auto-validated by hook) |
| Run job matcher | `/job-matcher [posting]` |
| Generate resume | `/resume-generator [link] [analysis]` |
| Generate CV | `/cv-generator [context]` |

### Common Pitfalls

- **Images:** Use absolute paths (`/images/...`), not relative
- **Schema:** All frontmatter must match `config.ts` schemas
- **Profile edits:** Run build after editing to validate
- **Skills:** These propose changes for human review, never auto-commit

### Troubleshooting

**Build fails with "Could not find image"**
- Check path is absolute: `/images/...`
- Verify file exists in `/public/images/...`

**Schema validation errors**
- Check frontmatter matches schema in `src/content/config.ts` or `src/data/schema.ts`
- Date format: `YYYY-MM-DD`

**TypeScript errors**
- Run `npm run astro check` for details
- Check Props interfaces and imports

### Large File Writing

When writing files > 150 lines, use chunked writing to prevent timeouts:

1. **Write skeleton first** - Headers/structure only (~50 lines)
2. **Fill sections with Edit** - Add content section by section (< 80 lines each)
3. **Verify after each chunk** - Confirm success before proceeding

| File Size | Strategy |
|-----------|----------|
| < 100 lines | Single Write - safe |
| 100-200 lines | Consider chunking |
| > 200 lines | MUST chunk |

### Philosophy

- Content is the hero - design serves content
- Minimal, editorial aesthetic
- Performance and accessibility first
- Simple patterns, easy to extend
- When in doubt: simplify
