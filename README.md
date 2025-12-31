# Portfolio Website

> Content-first portfolio site built with Astro

[![Astro](https://img.shields.io/badge/Astro-5.16-BC52EE?logo=astro)](https://astro.build)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-222?logo=github)](https://chaddunbar.com)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-success?logo=lighthouse)](#performance)

## Overview

A clean, fast, markdown-driven portfolio for a senior product designer focused on AI and blockchain innovation. Built with performance and accessibility as first-class concerns.

**Key Features:**
- **Content collections** - Markdown-driven case studies and writing with schema validation
- **Adaptive theming** - Respects system light/dark mode preference
- **100/100 Lighthouse scores** - Performance, Accessibility, Best Practices, SEO
- **WCAG AA accessibility** - Full keyboard navigation, screen reader support, reduced motion
- **Simple image workflow** - All images in `/public`, one consistent pattern
- **View Transitions** - Smooth page navigation with fade animations

**Tech Stack:**
- Astro 5.16 (static site generation)
- TypeScript
- GitHub Pages hosting
- Custom domain (chaddunbar.com)

## Quick Start

```bash
# Prerequisites: Node.js 18+
npm install
npm run dev
# Open http://localhost:4321
```

## Development

```bash
# Start dev server with hot reload
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run astro check
```

**Note:** Site uses Astro's built-in image optimization (Sharp). First build may take longer while dependencies install.

## Project Structure

```
src/
├── components/      # Reusable components (Header, Footer, CaseStudyCard, etc.)
├── content/         # Markdown content collections
│   ├── case-studies/    # Portfolio case studies
│   │   ├── ds-bridge.md
│   │   └── new-car-pricing.md
│   └── writing/         # Blog posts and articles
│       ├── chatgpt-2025.md
│       ├── first-principles.md
│       └── ...
├── layouts/         # Page layouts (BaseLayout)
├── pages/           # Route pages (index, about, work, writing, contact, 404)
├── scripts/         # Client-side scripts (imageViewer.ts)
└── styles/          # Global CSS (design system tokens, typography)

public/              # Static assets
├── images/          # All images organized by collection
│   ├── case-studies/{slug}/
│   │   ├── hero.png
│   │   ├── image-01.png
│   │   └── ...
│   └── writing/{slug}/
│       └── hero.png
├── favicon.ico
└── manifest.webmanifest

.github/workflows/   # GitHub Actions for deployment
astro.config.mjs     # Astro configuration
src/content/config.ts # Content collection schemas
```

## Content Management

### Adding Case Studies

1. **Create image directory:**
   ```bash
   mkdir public/images/case-studies/my-project
   ```

2. **Add images:**
   - `hero.png` - Cover image (1600×900, 16:9 aspect ratio)
   - `image-01.png`, `image-02.png`, etc. - Inline images (max 1200px wide)

3. **Create markdown file:**
   ```bash
   src/content/case-studies/my-project.md
   ```

4. **Add frontmatter:**
   ```yaml
   ---
   title: "Project Title"
   description: "Brief description"
   date: 2024-12-01
   featured: true
   confidentiality: "public"  # or "partial" or "nda"
   tags: ["Design Systems", "AI Tools"]  # Use Title Case
   coverImage: /images/case-studies/my-project/hero.png
   ---
   ```

5. **Write content and reference inline images:**
   ```markdown
   ## Overview

   Project description here...

   ![Screenshot description](/images/case-studies/my-project/image-01.png)
   ```

**Case Study Schema:**
- `title` (string, required) - Project title
- `description` (string, required) - Brief description
- `date` (date, required) - Publication date
- `featured` (boolean, default: false) - Show on homepage
- `confidentiality` (enum, default: "public") - "public" | "partial" | "nda"
- `tags` (array of strings, optional) - Tags in Title Case
- `coverImage` (string, optional) - Path to hero image

### Adding Writing

Same pattern as case studies, but in `src/content/writing/`:

1. Create image directory: `public/images/writing/my-article/`
2. Add images: `hero.png`, inline images
3. Create markdown: `src/content/writing/my-article.md`
4. Reference images: `/images/writing/my-article/hero.png`

**Writing Schema:**
- `title` (string, required)
- `description` (string, required)
- `date` (date, required)
- `tags` (array of strings, optional)
- `coverImage` (string, optional)

### Image Guidelines

**Hero Images (coverImage):**
- Dimensions: 1600×900 (16:9 aspect ratio)
- Format: PNG or JPG
- Display: Full width on detail pages, cropped to 4:3 on cards
- Naming: `hero.png`

**Inline Images:**
- Max width: 1200px
- Variable aspect ratio
- Format: PNG or JPG
- Naming: `image-01.png`, `image-02.png`, etc.

**All images:**
- Location: `/public/images/{collection}/{slug}/`
- Reference: `/images/{collection}/{slug}/{filename}`
- Click to open full-screen modal viewer
- Keyboard accessible (ESC to close, Tab navigation)

## Deployment

### GitHub Pages (Automatic)

Push to `main` branch triggers automatic deployment:

1. GitHub Actions workflow runs (`.github/workflows/deploy.yml`)
2. Astro build executes (`withastro/action@v3`)
3. Deploys to https://chaddunbar.com
4. SSL certificate auto-provisioned by GitHub (HTTPS enforced)

**Custom Domain (GoDaddy):**
- DNS A records point to GitHub Pages IPs
- `CNAME` file in `public/` directory
- Certificate provisioned automatically (10-30 minutes on first setup)

### Manual Deployment

```bash
npm run build
# Output in dist/ directory
```

## Design System

### Color Tokens

**Adaptive light/dark mode:**
- Respects `prefers-color-scheme` media query
- Warm neutral palette with slate blue accent
- CSS custom properties in `src/styles/global.css`

**Primary colors:**
- `--color-text` - Primary text color
- `--color-text-muted` - Secondary/muted text
- `--color-accent` - Slate blue accent (#475569)
- `--color-surface` - Card/surface background
- `--color-border` - Border color

### Typography

**Font stack:**
```css
font-family: 'Inter', -apple-system, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif
```

**Type scale:**
- Fluid sizing with `clamp()` for responsive typography
- Editorial hierarchy with generous whitespace
- Sizes: `--text-xs` through `--text-6xl`

### Components

**Reusable patterns:**
- `CaseStudyCard` - Card component for case study lists
- `Header` / `Footer` - Site-wide navigation
- `HeroImage` - Hero images with lazy loading
- `ImageViewer` - Full-screen modal for inline images

**Responsive:**
- Mobile-first approach
- Breakpoint: 768px for tablet/desktop

## Performance

### Lighthouse Scores (Production)

All categories: **100/100**
- ✅ Performance: 100
- ✅ Accessibility: 100
- ✅ Best Practices: 100
- ✅ SEO: 100

### Optimizations

**Static site generation:**
- No runtime JavaScript framework
- Pre-rendered HTML at build time
- Fast initial page load

**Images:**
- Lazy loading for below-fold images
- Responsive sizing with aspect ratio preservation
- Progressive enhancement (modern browsers get best experience)

**Navigation:**
- View Transitions API for smooth page navigation
- Default fade animation (200ms)
- Reduced motion support (`prefers-reduced-motion`)

**Accessibility:**
- WCAG AA compliant
- Full keyboard navigation
- Screen reader support with ARIA labels
- Focus indicators on all interactive elements
- Color contrast ratios: 4.5:1 (normal text), 3:1 (large text)

## Contributing

For documentation updates or bug fixes, please ensure:

- ✅ Lighthouse scores remain 100/100
- ✅ WCAG AA accessibility maintained
- ✅ Image paths follow `/public/images/{collection}/{slug}/` pattern
- ✅ Type checking passes: `npm run astro check`

## License

Private portfolio project. All content © Chad Dunbar.
