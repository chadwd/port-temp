# CLAUDE.md - AI Collaboration Guide

> Essential context for AI coding assistants working on this portfolio project

## 1. Project Overview

**What this is:**
Content-first portfolio website for a senior product designer specializing in AI and blockchain innovation.

**Stack:**
- Astro 5.16 (static site generation)
- TypeScript
- GitHub Pages deployment

**Key principles:**
- Performance first: Lighthouse 100/100 across all metrics
- Accessibility: WCAG AA compliance
- Markdown-driven content with schema validation
- Simple, scalable patterns for adding content

## 2. Tech Stack

**Framework:**
- Astro 5.16 - Static site generation, zero JavaScript by default
- Routes in `src/pages/` generate static HTML at build time
- Content collections for type-safe markdown content

**Language:**
- TypeScript for all .astro and .ts files
- Strict type checking required

**Styling:**
- CSS custom properties (design tokens in `src/styles/global.css`)
- Scoped styles in `.astro` component files
- No Tailwind, no CSS-in-JS, no utility classes
- Semantic CSS only

**Content:**
- Markdown files with frontmatter validation via Zod schemas
- Collections: `case-studies`, `writing`
- Schema defined in `src/content/config.ts`

**Deployment:**
- GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- Automatic deployment on push to main branch
- Live at: https://chaddunbar.com

**Images:**
- ALL images stored in `/public/images/`
- No image optimization libraries
- Standard `<img>` tags with lazy loading
- Absolute paths required: `/images/case-studies/project-name/hero.png`

## 3. Project Structure

```
src/
├── components/        # Reusable Astro components
│   ├── Header.astro
│   ├── Footer.astro
│   ├── CaseStudyCard.astro
│   └── HeroImage.astro
├── content/          # Markdown collections (case-studies, writing)
│   ├── config.ts         # Zod schemas for frontmatter validation
│   ├── case-studies/
│   │   ├── ds-bridge.md
│   │   └── new-car-pricing.md
│   └── writing/
│       ├── chatgpt-2025.md
│       └── first-principles.md
├── layouts/          # Page layouts
│   └── BaseLayout.astro
├── pages/            # Routes (generate static HTML)
│   ├── index.astro
│   ├── about.astro
│   ├── work.astro
│   ├── writing/
│   └── contact.astro
├── scripts/          # Client-side TypeScript
│   └── imageViewer.ts
└── styles/           # Global CSS
    └── global.css

public/images/        # ALL images (organized by collection/slug)
├── case-studies/
│   ├── ds-bridge/
│   │   ├── hero.png
│   │   ├── image-01.png
│   │   └── image-02.png
│   └── new-car-pricing/
│       └── hero.png
└── writing/
    ├── chatgpt-2025/
    └── designing-at-the-speed-of-thought/
        └── hero.png
```

## 4. Key Files

**`src/content/config.ts`** - Content collection schemas
- Defines frontmatter structure for case studies and writing
- Uses Zod for runtime validation
- Images as `z.string()` (NOT `image()` helper - we use /public paths)

**`src/styles/global.css`** - Design tokens
- CSS custom properties for colors, typography, spacing
- Adaptive light/dark mode via `prefers-color-scheme`
- Warm neutral palette with slate blue accent

**`astro.config.mjs`** - Astro configuration
- Site URL, base path, integrations
- GitHub Pages deployment settings

**`.github/workflows/deploy.yml`** - Deployment workflow
- Runs on push to main
- Builds with `withastro/action@v3`
- Deploys to GitHub Pages

## 5. Content Management

### Adding Case Studies

**Step-by-step workflow:**

```bash
# 1. Create markdown file
src/content/case-studies/project-name.md

# 2. Create image directory
mkdir public/images/case-studies/project-name

# 3. Add images
public/images/case-studies/project-name/hero.png        # 1600×900 (16:9)
public/images/case-studies/project-name/image-01.png   # Inline images

# 4. Reference in markdown
---
coverImage: /images/case-studies/project-name/hero.png
---
![Description](/images/case-studies/project-name/image-01.png)
```

### Schema (`src/content/config.ts`)

**Collections:**
- `case-studies` - Portfolio case studies
- `writing` - Blog posts and articles

**Case studies fields:**
- `title` (string, required) - Project title
- `description` (string, required) - Brief description
- `date` (date, required) - Publication date
- `featured` (boolean, default: false) - Show on homepage
- `confidentiality` (enum, default: "public") - "public" | "partial" | "nda"
- `tags` (array of strings, optional) - Tags in Title Case
- `coverImage` (z.string(), optional) - Path to hero image

**Writing fields:**
- `title` (string, required)
- `description` (string, required)
- `date` (date, required)
- `tags` (array of strings, optional)
- `coverImage` (z.string(), optional)

**CRITICAL - Images:**
- Images use `z.string()` NOT `image()` helper
- This is intentional - we use /public paths, not imported assets
- All image references must be absolute paths from /public

### Image Workflow (CRITICAL)

**Location:**
- ALL images in `/public/images/{collection}/{slug}/`
- NOT in src/content/ or anywhere else

**Path format:**
- Use absolute paths: `/images/case-studies/my-project/hero.png`
- NOT relative paths: `./images/...` or `../images/...`
- Relative paths don't work with Astro content collections

**Naming convention:**
- `hero.png` - Cover/hero images
- `image-01.png`, `image-02.png`, `image-03.png` - Inline images
- Sequential numbering for clarity

**No optimization pipeline:**
- Standard `<img>` tags only
- No `<Picture>` component
- No image imports in frontmatter
- Just simple paths to /public files

## 6. Design System

### Colors (`src/styles/global.css`)

**Adaptive theming:**
- Light/dark mode via `prefers-color-scheme`
- Warm neutral palette with slate blue accent
- CSS custom properties for all colors

**Primary colors:**
- `--color-text` - Primary text color
- `--color-text-muted` - Secondary/muted text
- `--color-accent` - Slate blue accent (#475569)
- `--color-surface` - Card/surface background
- `--color-surface-hover` - Hover state for surfaces
- `--color-border` - Border color
- `--color-background` - Page background

### Typography

**Font stack:**
```css
font-family: 'Inter', -apple-system, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif
```

**Type scale:**
- Fluid sizing with `clamp()` for responsive typography
- Editorial hierarchy with generous whitespace
- Sizes: `--text-xs` through `--text-6xl`

**Line heights:**
- `--leading-tight` - Headings
- `--leading-normal` - Body text
- `--leading-relaxed` - Long-form content

### Layout

**Responsive approach:**
- Mobile-first design
- Single breakpoint: 768px for tablet/desktop
- Fluid spacing and typography

**Content width:**
- `--max-width-content` - Max width for readable text
- Generous whitespace
- Content-first design philosophy

## 7. Code Conventions

### Components

**Astro components (`.astro` files):**
- Components in `src/components/`
- TypeScript interfaces defined inline in frontmatter
- Props typing required for all components
- No JSX - use Astro template syntax

**Example:**
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
    /* Scoped styles */
  }
</style>
```

### Styling

**Rules:**
- Scoped styles in `<style>` tags within `.astro` files
- Global tokens in `src/styles/global.css`
- No inline styles
- No utility classes - semantic CSS only
- Use CSS custom properties for consistency

**Example:**
```astro
<style>
  .card {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    padding: var(--space-6);
  }
</style>
```

### Content Collections

**Schema location:**
- All schemas in `src/content/config.ts`

**Markdown files:**
- Content in `src/content/{collection}/`
- Filename becomes slug (e.g., `my-project.md` → `/work/my-project`)

**Images:**
- ALWAYS use absolute paths from /public
- Reference: `/images/case-studies/slug/hero.png`
- NOT relative paths: `./images/...`

## 8. Common Tasks

### Add a new case study

```bash
# 1. Create markdown file
touch src/content/case-studies/project-name.md

# 2. Add frontmatter
cat > src/content/case-studies/project-name.md << 'EOF'
---
title: "Project Title"
description: "Brief description"
date: 2024-12-01
featured: true
confidentiality: "public"
tags: ["Design Systems", "AI Tools"]
coverImage: /images/case-studies/project-name/hero.png
---

## Overview

Project description here...

![Screenshot description](/images/case-studies/project-name/image-01.png)
EOF

# 3. Create image directory
mkdir -p public/images/case-studies/project-name

# 4. Add images
# - hero.png (1600×900, 16:9)
# - image-01.png, image-02.png, etc. (max 1200px wide)
```

### Modify design tokens

Edit `src/styles/global.css` `:root` variables:

```css
:root {
  --color-accent: #475569;  /* Change accent color */
  --space-6: 1.5rem;        /* Adjust spacing */
}
```

### Add a new page

```bash
# Create page file (becomes route automatically)
touch src/pages/new-page.astro

# Use BaseLayout for consistency
cat > src/pages/new-page.astro << 'EOF'
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Page Title" description="Page description">
  <div class="container">
    <h1>Page Title</h1>
  </div>
</BaseLayout>
EOF
```

### Update navigation

Edit `src/components/Header.astro` to add/modify navigation links:

```astro
<nav>
  <a href="/work">Work</a>
  <a href="/writing">Writing</a>
  <a href="/new-page">New Page</a>
</nav>
```

## 9. Testing & Verification

### Build check

**REQUIRED before committing:**
```bash
npm run build  # Must succeed with no errors
```

**What it checks:**
- TypeScript compilation
- Content collection schema validation
- Image path resolution
- All routes generate correctly

### Development

```bash
npm run dev    # Local server at http://localhost:4321
```

**Features:**
- Hot module reload
- Fast refresh for content changes
- TypeScript errors shown in terminal

### Type checking

```bash
npm run astro check  # Must pass
```

**Checks:**
- TypeScript types
- Astro component props
- Content collection schemas

## 10. Performance & Accessibility

### Requirements (MUST MAINTAIN)

**Lighthouse scores:**
- Performance: 100/100
- Accessibility: 100/100
- Best Practices: 100/100
- SEO: 100/100

**Accessibility:**
- WCAG AA compliance
- Full keyboard navigation
- Screen reader compatible
- Focus indicators on all interactive elements
- Color contrast ratios: 4.5:1 (normal text), 3:1 (large text)

**Performance:**
- Fast page loads (< 1 second)
- No runtime JavaScript framework overhead
- Static HTML generation
- Lazy loading for below-fold images

### Key Features

**View Transitions API:**
- Smooth page navigation with fade animations
- `transition:animate="fade"` on shared elements
- Reduced motion support via `prefers-reduced-motion`

**Image viewer modal:**
- Click any inline image to open full-screen viewer
- Keyboard accessible (ESC to close, Tab navigation)
- Implemented in `src/scripts/imageViewer.ts`

**Reduced motion:**
- Respects `prefers-reduced-motion` media query
- Disables animations when user prefers reduced motion

## 11. Deployment

### Automatic (GitHub Pages)

**Workflow:**
1. Push to `main` branch
2. GitHub Actions runs `.github/workflows/deploy.yml`
3. Astro build executes
4. Deploys to https://chaddunbar.com

**Custom domain:**
- DNS A records point to GitHub Pages IPs
- `CNAME` file in `public/` directory
- SSL certificate auto-provisioned by GitHub

**Build time:**
- Typically 1-2 minutes
- First build may take longer (Sharp installation)

### Manual deployment

```bash
npm run build  # Output to dist/ directory

# Preview production build locally
npm run preview
```

## 12. For AI Assistants

### When adding content

**Images - CRITICAL:**
- Images MUST go in `/public/images/{collection}/{slug}/`
- Use absolute paths (`/images/...`) NOT relative (`./images/...`)
- Follow naming: `hero.png`, `image-01.png`, `image-02.png`
- Verify paths work: `/images/case-studies/my-project/hero.png`

**Workflow:**
1. Create image directory first: `mkdir -p public/images/case-studies/slug`
2. Add images with correct naming
3. Create markdown file with frontmatter
4. Reference images with absolute paths

### When modifying code

**Best practices:**
- Maintain TypeScript typing on all components
- Keep components simple - avoid over-engineering
- Preserve accessibility features (ARIA labels, keyboard nav)
- Test builds before committing: `npm run build`

**Common pitfalls:**
- Don't use relative image paths in markdown
- Don't import images in frontmatter (use string paths)
- Don't add utility CSS classes (use semantic CSS)
- Don't skip type checking

### When troubleshooting

**Common issues:**

1. **Build fails with "Could not find image"**
   - Check image path is absolute: `/images/...`
   - Verify file exists in `/public/images/...`
   - Check filename matches exactly (case-sensitive)

2. **Schema validation errors**
   - Verify frontmatter matches schema in `src/content/config.ts`
   - Check date format: `YYYY-MM-DD`
   - Ensure required fields present

3. **TypeScript errors**
   - Run `npm run astro check` for detailed errors
   - Verify component Props interfaces
   - Check imports and exports

**Debug commands:**
```bash
npm run astro check     # Type checking
npm run build           # Full build test
ls public/images/       # Verify image exists
```

### Project Philosophy

**Core principles:**
- Content is the hero - design serves the content
- Minimal, editorial aesthetic - no flashy effects
- Performance and accessibility first - non-negotiable
- Simple to extend via markdown - no complex workflows
- No unnecessary complexity - keep it maintainable

**When in doubt:**
- Choose simplicity over features
- Prioritize accessibility
- Test the build
- Follow existing patterns
