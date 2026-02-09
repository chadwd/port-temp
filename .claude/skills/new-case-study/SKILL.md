---
name: new-case-study
description: Scaffold a new case study with correct directory structure and markdown template
location: user
---

# New Case Study Scaffolding

<purpose>
Create the correct directory structure and markdown file for a new portfolio case study. Ensures proper image paths, frontmatter schema compliance, and consistent naming conventions.

**Goal:** Eliminate the friction of remembering directory structures and frontmatter requirements when adding new case studies.
</purpose>

<context>
@src/content/config.ts - Zod schema for case study frontmatter
</context>

<process>

## Step 1: Parse Arguments

**Required:** Project slug (kebab-case identifier)
- Example: `new-car-pricing`, `ds-bridge`, `design-system-v2`

**If no slug provided:**
```
Usage: /new-case-study [project-slug]

Example: /new-case-study new-car-pricing

The slug becomes:
- Directory: public/images/case-studies/new-car-pricing/
- File: src/content/case-studies/new-car-pricing.md
- URL: /work/new-car-pricing
```

## Step 2: Create Image Directory

Create the image directory structure:
```
public/images/case-studies/[slug]/
```

This is where all images for the case study will live:
- `hero.png` - Cover image (1600×900, 16:9 ratio)
- `image-01.png`, `image-02.png`, etc. - Inline images

## Step 3: Create Markdown File with Template

Create `src/content/case-studies/[slug].md` with schema-compliant frontmatter:

```markdown
---
title: "[Project Title - Edit This]"
description: "[Brief description of the project - Edit This]"
date: [TODAY'S DATE in YYYY-MM-DD format]
featured: false
confidentiality: "public"
tags: []
coverImage: /images/case-studies/[slug]/hero.png
---

## Overview

[Project overview and context]

## Problem

[The problem this project solved]

## Solution

[Your approach and solution]

## Results

[Outcomes and impact]

---

*[Add inline images using absolute paths:]*
*`![Description](/images/case-studies/[slug]/image-01.png)`*
```

## Step 4: Report What Was Created

Confirm the scaffolding is complete:

```
✓ Case study scaffolded: [slug]

Created:
  📁 public/images/case-studies/[slug]/
  📄 src/content/case-studies/[slug].md

Next steps:
  1. Add hero.png to public/images/case-studies/[slug]/ (1600×900)
  2. Edit src/content/case-studies/[slug].md:
     - Update title and description
     - Set featured: true if this should appear on homepage
     - Add tags in Title Case: ["Design Systems", "AI Tools"]
     - Write your case study content
  3. Add inline images as image-01.png, image-02.png, etc.
  4. Run `npm run build` to verify everything works

URL will be: /work/[slug]
```

</process>

<output>

After running this skill:

**Files created:**
- `public/images/case-studies/[slug]/` - Empty directory for images
- `src/content/case-studies/[slug].md` - Markdown with template frontmatter

**User actions required:**
- Add images to the directory
- Edit the markdown content
- Update frontmatter (title, description, tags, featured)

</output>

<validation>

**Frontmatter must include:**
- `title` (string, required)
- `description` (string, required)
- `date` (YYYY-MM-DD format, required)
- `coverImage` (absolute path starting with `/images/`)

**Image paths must be:**
- Absolute: `/images/case-studies/slug/hero.png`
- NOT relative: `./images/...` or `../images/...`

</validation>

<anti_patterns>

**DON'T:**
- Use relative image paths
- Skip creating the image directory
- Forget the frontmatter schema requirements
- Use spaces or underscores in slug (use kebab-case)

**DO:**
- Always use kebab-case for slugs
- Create image directory before markdown file
- Include all required frontmatter fields
- Use absolute paths for all images

</anti_patterns>
