# Image Export Guidelines

**Portfolio Website Image Standards**

This document defines the standardized image export specifications for maintaining consistent aspect ratios and visual quality across the portfolio site.

## Quick Reference

| Use Case | Aspect Ratio | Export Size | Format | Location |
|----------|--------------|-------------|--------|----------|
| Hero Images | 16:9 | 1600×900px | PNG/JPG | Detail page tops |
| Card Images | 4:3 | 1200×900px | PNG/JPG | List views (cards) |
| Inline Images | Variable | Max 1200px wide | PNG/JPG | Case study content |

## Export Specifications

### 1. Hero Images (Detail Page Tops)

**Use:** Full-width images displayed at the top of case study and writing detail pages

**Specifications:**
- **Aspect Ratio:** 16:9 (wide cinematic format)
- **Export Size:** 1600×900px @ 72dpi
- **Format:** PNG (for UI screenshots, diagrams) or JPG (for photos, complex images)
- **Optimization:** Site automatically generates AVIF, WebP, and JPG variants

**Examples:**
- `src/content/case-studies/ds-bridge/images/DS Bridge Hero.png`
- `src/content/writing-01-source/writing-01-hero.png`

**Figma Export:**
```
1. Select frame/content
2. Add export setting: 1600w (height will auto-calculate to 900px for 16:9)
3. Format: PNG (for UI) or JPG at 90% quality
4. Export
```

**Frontmatter Usage:**
```yaml
coverImage: ./ds-bridge/images/hero-image-name.png
```

**Rendering:**
- Cards: Cropped to 4:3 using `object-fit: cover`
- Detail Pages: Full 16:9 aspect ratio preserved

---

### 2. Card Images (List View Thumbnails)

**Use:** Thumbnail images on /work, /writing, and homepage cards

**Specifications:**
- **Aspect Ratio:** 4:3 (balanced format for cards)
- **Export Size:** 1200×900px @ 72dpi
- **Format:** PNG (for UI screenshots, diagrams) or JPG (for photos, complex images)
- **Optimization:** Site automatically generates AVIF, WebP, and JPG variants

**CSS Behavior:**
- Container enforces 4:3 aspect ratio
- Images use `object-fit: cover` to fill container without distortion
- Images exported at 1200×900px will fit perfectly with no cropping

**Figma Export:**
```
1. Select frame/content
2. Add export setting: 1200w (height will auto-calculate to 900px for 4:3)
3. Format: PNG (for UI) or JPG at 90% quality
4. Export
```

**Rendering:**
- Cards display at 4:3 ratio with no letterboxing or cropping
- Lazy loading enabled below the fold for performance

---

### 3. Inline Content Images (Markdown)

**Use:** Screenshots, diagrams, component demos embedded in case study or article content

**Specifications:**
- **Aspect Ratio:** Variable (preserve natural aspect ratio)
- **Max Width:** 1200px
- **Height:** Variable based on content
- **Format:** PNG (for UI, screenshots, diagrams with text) or JPG (for photos)
- **Optimization:** Astro processes inline markdown images automatically

**Examples:**
- Component screenshots: Variable aspect ratio
- Workflow diagrams: Typically 16:10 or 16:9
- UI mockups: Match source aspect ratio
- Documentation screenshots: Variable

**Figma Export:**
```
1. Select content
2. Add export setting: 1200w (height auto-calculates based on natural ratio)
3. Format: PNG (preferred for clarity) or JPG at 90% quality
4. Export
```

**Markdown Usage:**
```markdown
![Descriptive alt text for accessibility](./case-study-name/images/image-name.png)
```

**CSS Behavior:**
- Natural aspect ratio always preserved
- `object-fit: contain` ensures no cropping or distortion
- Max width 100% of prose container (65ch ≈ 800px)
- Automatic margin spacing (2rem top/bottom)

---

## File Organization

### Directory Structure

```
src/content/
├── case-studies/
│   ├── ds-bridge.md
│   └── ds-bridge/
│       └── images/
│           ├── DS Bridge Hero.png         (1600×900 - hero)
│           ├── Agent Work Journal.png     (1200×variable - inline)
│           ├── Agent Knowledge.png        (1200×variable - inline)
│           └── GSale Component Demo.png   (1200×variable - inline)
│
└── writing/
    ├── designing-at-the-speed-of-thought.md
    └── writing-01-source/
        └── writing-01-hero.png            (1600×900 - hero)
```

### Naming Conventions

**Hero Images:**
- Use descriptive names: `ds-bridge-hero.png`, `writing-01-hero.png`
- Or project name + "Hero": `DS Bridge Hero.png`

**Inline Images:**
- Use descriptive names that match content: `Agent Work Journal.png`
- Avoid generic names: ~~`screenshot-1.png`~~
- Use Title Case with spaces for readability

**Source Files:**
- Keep source materials in `*-source/` directories outside content collections
- Example: `src/content/case-studies-source/`, `src/content/writing-01-source/`

---

## Optimization Pipeline

The site uses Astro's built-in image optimization with Sharp:

**Automatic Processing:**
1. **Format Generation:** AVIF → WebP → JPG (progressive fallback)
2. **Responsive Sizing:** Multiple widths generated (400, 800, 1200, 1600)
3. **Lazy Loading:** Below-fold images load on scroll
4. **Compression:** Automatic quality optimization

**Build Output Example:**
```
Original: DS Bridge Hero.png (239kB)
Generated:
  ├── hero.avif (22kB @ 1200w)
  ├── hero.webp (45kB @ 1200w)
  └── hero.jpg (125kB @ 1200w)
```

**No Manual Optimization Needed:**
- Export at specified sizes
- Site handles compression and format conversion
- Multiple sizes generated automatically for responsive design

---

## Quality Checklist

Before exporting from Figma:

- [ ] Correct aspect ratio (16:9 for heroes, 4:3 for cards, variable for inline)
- [ ] Correct export size (1600×900 or 1200×900 or 1200×variable)
- [ ] PNG for UI/diagrams with text, JPG for photos/complex images
- [ ] 72dpi resolution
- [ ] Descriptive filename (no generic names)
- [ ] Saved to correct directory (case-study-name/images/)

Before committing:

- [ ] Images display correctly on cards (no squishing/stretching)
- [ ] Hero images fill container at 16:9 on detail pages
- [ ] Inline images preserve natural aspect ratio in content
- [ ] All images have descriptive alt text in markdown
- [ ] Build succeeds with no image optimization errors

---

## Common Issues & Solutions

### Issue: Card image appears squished or stretched
**Solution:**
- Verify export is exactly 1200×900px (4:3 ratio)
- Check Figma frame constraints are set to "Scale" not "Hug"
- Re-export at correct dimensions

### Issue: Hero image has letterboxing on detail page
**Solution:**
- Verify export is exactly 1600×900px (16:9 ratio)
- Hero images should fill width with no vertical bars
- If intentional design includes padding, that's acceptable

### Issue: Inline image too large or too small
**Solution:**
- Inline images are max 1200px wide and scale down responsively
- If image has critical detail, consider exporting at 1200px wide
- For smaller diagrams, export at natural size (no need to upscale to 1200px)

### Issue: Image file size too large
**Solution:**
- Trust Astro's optimization pipeline (it will compress and convert)
- If source is >2MB, consider JPG format at 90% quality instead of PNG
- For screenshots with lots of text, PNG is still preferred for clarity

---

## Accessibility Requirements

All images must include descriptive alt text:

**Good Alt Text:**
```markdown
![Agent work journal showing session-based workflow guidance](./image.png)
![Component demonstration showing interactive GSale component](./image.png)
```

**Poor Alt Text:**
```markdown
![Screenshot](./image.png)  <!-- Too generic -->
![](./image.png)            <!-- Missing entirely -->
```

**Alt Text Guidelines:**
- Describe what the image shows, not just "screenshot of X"
- Include context for understanding (e.g., "workflow guidance", "component demo")
- Keep under 125 characters when possible
- For decorative images only: Use empty alt text `![]()`

---

## Version History

- **2025-12-30:** Initial guidelines created
  - Hero images: 1600×900 (16:9)
  - Card images: 1200×900 (4:3)
  - Inline images: Variable, max 1200px wide
  - CSS aspect-ratio and object-fit rules implemented

---

## Questions?

If you encounter issues not covered in this guide:
1. Check build output for image optimization errors
2. Verify export dimensions match specifications
3. Review CSS in `src/styles/global.css` (prose img rules)
4. Check component styles for `.card-image` rules

**Need to update these guidelines?** Edit `IMAGE-GUIDELINES.md` in the project root.
