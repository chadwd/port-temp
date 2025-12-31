# Phase 7: Image Infrastructure - Discovery

**Date**: 2025-12-22
**Status**: Complete
**Depth**: Level 2 (Standard Research)

## Summary

Astro v5 has robust built-in image optimization using Sharp by default. For GitHub Pages static deployment, storing optimized images in the repo is the recommended approach. Astro's `<Image />` and `<Picture />` components provide automatic responsive image generation with minimal configuration.

## Key Findings

### 1. Astro v5 Built-in Image Optimization

**Current State (Astro v5.16.6):**
- Sharp is the default image service (no external integration needed)
- Squoosh was removed in v5.0
- Built-in `<Image />` and `<Picture />` components process images at build time for static sites
- Responsive images feature available in v5.10+

**Source**: [Astro v5 Image Docs](https://docs.astro.build/en/guides/images/), [Astro 5.0 Release](https://astro.build/blog/astro-5/)

### 2. Image Storage Strategy for GitHub Pages

**Recommendation: Store in Repository**

**Rationale:**
- GitHub Pages hosts static assets efficiently
- No external CDN dependencies or costs
- Simple deployment via GitHub Actions (already configured)
- Images processed/optimized at build time by Sharp
- Predictable paths, no CORS issues

**Location Patterns:**
- Static images: `public/images/` (copied as-is to output)
- Content images: `src/content/case-studies/images/` or `src/content/writing/images/` (processed by Astro)

**Trade-offs:**
- ✅ Simple, no external dependencies
- ✅ Version controlled with content
- ✅ Free hosting
- ✅ Automatic optimization via Sharp
- ⚠️ Repo size grows (but manageable for portfolio-scale)
- ⚠️ No separate CDN caching (GitHub Pages has CDN)

**External CDN Alternative (Not Recommended for v1.1):**
- Adds complexity (Cloudinary, ImageKit, etc.)
- Introduces external dependencies and potential costs
- Overkill for portfolio site scale
- Can migrate later if needed

**Sources**: [Deploy Astro to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/), [Astro Images Guide](https://docs.astro.build/en/guides/images/)

### 3. Responsive Image Patterns

**Astro v5.10+ Responsive Images Feature:**

**`<Image />` Component:**
- Automatic `srcset` and `sizes` generation
- Use `layout` prop for common patterns
- Best for single format images
- Minimal configuration required

```astro
<Image
  src={import('./image.jpg')}
  alt="Description"
  layout="responsive"
  width={800}
  height={600}
/>
```

**`<Picture />` Component:**
- Multiple format support (WebP, AVIF fallbacks)
- Art direction (different crops per breakpoint)
- Best for hero images and case study covers

```astro
<Picture
  src={import('./hero.jpg')}
  formats={['avif', 'webp', 'jpg']}
  alt="Description"
  widths={[400, 800, 1200]}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
/>
```

**Best Practices for 2025:**
- Use `layout` prop to enable responsive images
- Store images in `src/` for automatic optimization
- Include `width` and `height` to minimize CLS (Cumulative Layout Shift)
- Use WebP/AVIF formats for better compression
- Add descriptive `alt` text for accessibility
- Set `loading="lazy"` for below-fold images

**Sources**: [Experimental Responsive Images](https://5-0-0-beta.docs.astro.build/en/reference/experimental-flags/responsive-images/), [Optimize Images in Astro](https://uploadcare.com/blog/how-to-optimize-images-in-astro/), [Astro Picture Component Guide](https://rodneylab.com/astro-picture-component/)

### 4. Content Collections Integration

**Pattern for Case Studies and Writing:**

Images can be referenced in content collection frontmatter using the `image` helper:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const caseStudies = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    coverImage: image(), // Validates and imports image
    // ... other fields
  }),
});
```

**Usage in Templates:**
```astro
---
import { Image } from 'astro:assets';
const { coverImage } = entry.data;
---
<Image src={coverImage} alt={entry.data.title} />
```

**Source**: [AstroJS Responsive Images in Content Collections](https://www.friedrichkurz.me/posts/2025-08-01/)

## Recommendation

**Phase 7 Implementation Plan:**

1. **Store images in repository** at `src/content/case-studies/images/` and `src/content/writing/images/`
2. **Use Astro's built-in `<Image />` and `<Picture />` components** (no external integration needed)
3. **Enable responsive images** via `layout` prop for automatic srcset/sizes
4. **Update content collections schema** to support image fields
5. **Create reusable image components** for consistent usage patterns
6. **Optimize existing sample content** to use new image system

**No external dependencies required** - Astro v5 includes everything needed.

## Open Questions

- ✅ CDN strategy? → **Repo storage recommended for v1.1**
- ✅ Image optimization approach? → **Built-in Sharp (default)**
- ✅ Responsive image patterns? → **Use layout prop on Image/Picture components**

## Next Steps

Proceed to task breakdown for Phase 7 execution plan.

---

**Research Sources:**
- [Images - Astro Docs](https://docs.astro.build/en/guides/images/)
- [Astro 5.0 Release Notes](https://astro.build/blog/astro-5/)
- [Deploy Astro to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Experimental Responsive Images](https://5-0-0-beta.docs.astro.build/en/reference/experimental-flags/responsive-images/)
- [How to Optimize Images in Astro](https://uploadcare.com/blog/how-to-optimize-images-in-astro/)
- [Astro Picture Component Guide](https://rodneylab.com/astro-picture-component/)
- [Responsive Images in Content Collections](https://www.friedrichkurz.me/posts/2025-08-01/)
