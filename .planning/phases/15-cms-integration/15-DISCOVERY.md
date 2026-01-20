# Phase 15: CMS Integration - Discovery

**Date**: 2026-01-01
**Status**: DEFERRED
**Decision**: Skip CMS integration; current markdown workflow is sufficient

## Research Summary

### Context
- Portfolio has ~8 content files (4 case studies, 4 writing articles)
- Single author (Chad) who is comfortable with Git
- Hosted on GitHub Pages (static only, no SSR)
- Content stored as markdown with Zod schema validation

### Goal Explored
Add CMS for easier content editing without touching code/Git directly.

### Git-Based CMS Options Evaluated

#### Keystatic
- **Pros**: TypeScript schemas (matches Zod setup), GitHub sync automated, local-first
- **Cons**: Requires SSR/hybrid mode for admin UI - conflicts with static GitHub Pages
- **Workaround**: Local-only mode (conditional integration), but then no remote editing
- **Sources**:
  - [Astro Keystatic Docs](https://docs.astro.build/en/guides/cms/keystatic/)
  - [GitHub Pages Discussion](https://github.com/Thinkmill/keystatic/discussions/826)
  - [Dual-Deploy Setup](https://github.com/Thinkmill/keystatic/discussions/1361)

#### TinaCMS
- **Pros**: Visual editing, excellent Astro docs, active community
- **Cons**: Requires TinaCMS Cloud for production editing (free tier available)
- **Workaround**: Local-only works, but defeats purpose of CMS
- **Sources**:
  - [TinaCMS Astro Docs](https://tina.io/docs/frameworks/astro/)

#### Decap CMS (formerly Netlify CMS)
- **Status**: Development stalled, Netlify dropped support
- **Not recommended** for new projects

### Key Finding

**Git-based CMS options fundamentally conflict with static GitHub Pages hosting.**

All require one of:
1. **SSR/hybrid hosting** (Vercel, Netlify) - Keystatic full mode
2. **External cloud service** - TinaCMS Cloud
3. **Local-only editing** - Same workflow as now, just with a UI

### Decision Rationale

Given:
- Small content volume (8 files)
- Single technical author comfortable with Git
- GitHub Pages hosting (static only)
- "Just exploring options" - no urgent pain point

**Conclusion**: Adding CMS introduces complexity without proportional benefit. Current markdown workflow is working well.

### Revisit When

- Switching to Vercel/Netlify hosting
- Non-technical editors need to contribute
- Content volume grows significantly (20+ files)
- Remote editing becomes a real need

### Alternatives Considered

| Option | Effort | Benefit | Why Not |
|--------|--------|---------|---------|
| Keystatic local-only | Low | Local admin UI | Still need Git to publish |
| TinaCMS Cloud | Medium | Full remote editing | External dependency, overkill |
| Switch to Vercel | Medium | Enables full CMS | Changes hosting infrastructure |
| Keep markdown | None | Working fine | N/A - chosen |
