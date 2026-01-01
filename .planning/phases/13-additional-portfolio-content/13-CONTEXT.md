# Phase 13: Additional Portfolio Content - Context

**Gathered:** 2025-12-31
**Status:** Ready for planning

<vision>
## How This Should Work

This phase is about integrating 2 complete case studies into the portfolio, following the same format and structure as DS-Bridge. I'll handle all content creation with ChatGPT - writing the markdown, crafting the narrative, and preparing the images.

The focus is on **clean integration workflow**. Once I hand you the markdown files and images, you ensure they're properly integrated: images are placed in the correct directories, referenced correctly in the markdown, and display as intended on the live site.

This is a content integration phase, not a content creation phase. You're the technical integrator, making sure my ChatGPT-generated content works seamlessly within the existing portfolio structure.

</vision>

<essential>
## What Must Be Nailed

- **Clean integration workflow** - The process of adding new case studies must be friction-free. I provide markdown + images, you handle the technical integration without asking me to figure out file paths, image references, or directory structures.
- **Follow DS-Bridge pattern exactly** - Use the same directory structure, image naming conventions, and markdown format as the existing DS-Bridge case study. Consistency is critical.
- **Correct image placement and references** - All images must be properly linked, positioned correctly in the markdown where I indicate, and display as intended on both desktop and mobile.

</essential>

<boundaries>
## What's Out of Scope

- **Content writing and editing** - I'm handling all case study content with ChatGPT. You won't write, edit, or enhance the markdown content.
- **Image creation or editing** - I'll provide ready-to-use images. You won't create, edit, or optimize images beyond what's technically required for the site to function.
- **UI or UX fixes or improvements** - This phase is purely about content integration. No design system changes, no template modifications, no UX refinements.

</boundaries>

<specifics>
## Specific Ideas

- Follow the DS-Bridge directory structure exactly:
  - `src/content/case-studies/[slug].md` for markdown files
  - `public/images/case-studies/[slug]/` for image directories
  - `hero.png`, `image-01.png`, `image-02.png`, etc. for image naming

- Validate all image paths are correct (absolute paths from /public)
- Ensure frontmatter matches schema (title, description, date, tags, coverImage, etc.)
- Test that images display correctly on both list view (cards) and detail pages
- Verify markdown renders properly with inline images positioned where indicated

</specifics>

<notes>
## Additional Context

This phase extends the portfolio from 1 case study (DS-Bridge) to 3 total case studies. The goal is to demonstrate range and depth of work while maintaining consistent quality and presentation.

The user will create content with ChatGPT separately and then provide complete, ready-to-integrate markdown files with images. The workflow should feel like "drop in files, verify everything works, done."

No content creation work required from Claude - this is purely technical integration and validation.

</notes>

---

*Phase: 13-additional-portfolio-content*
*Context gathered: 2025-12-31*
