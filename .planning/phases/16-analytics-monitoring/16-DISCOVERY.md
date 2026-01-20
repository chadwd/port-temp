# Phase 16: Analytics & Monitoring - Discovery

**Date**: 2026-01-01
**Status**: DEFERRED
**Decision**: Skip analytics integration; not a priority right now

## Research Summary

### Context
- Portfolio hosted on GitHub Pages (static)
- Goal: Career/hiring signals (traffic sources, which case studies get attention)
- Requirement: Privacy-first (no cookies, no consent banners)

### Options Evaluated

#### Plausible Analytics (Recommended)
- **Pricing**: $9/mo (10k pageviews)
- **Self-host**: Yes (open source)
- **Features**: Simple dashboard, referrer tracking, EU-hosted
- **Privacy**: No cookies, no personal data, GDPR compliant by design
- **Setup**: One `<script>` tag in BaseLayout
- **Website**: [plausible.io](https://plausible.io/)

#### Umami Analytics
- **Pricing**: $9/mo cloud or free self-host
- **Self-host**: Yes (open source, requires VPS)
- **Features**: Custom events, lightweight, developer-focused
- **Privacy**: No cookies, no personal data
- **Setup**: One `<script>` tag
- **Website**: [umami.is](https://umami.is/)

#### Fathom Analytics
- **Pricing**: $14/mo (100k pageviews)
- **Self-host**: No (SaaS only)
- **Features**: Great UX, EU/US intelligent routing
- **Privacy**: No cookies, GDPR compliant
- **Setup**: One `<script>` tag
- **Website**: [usefathom.com](https://usefathom.com/)

### Recommendation

**Plausible** is the best fit because:
1. Simplest setup and dashboard
2. Privacy-first by design (no consent banner needed)
3. EU-hosted aligns with GDPR
4. $9/mo is reasonable for professional portfolio
5. Shows exactly what you need: referrers, top pages, geographic data

### What You'd Learn

From any of these tools:
- **Traffic sources**: LinkedIn, Twitter, direct, search engines
- **Top pages**: Which case studies/articles get attention
- **Geographic data**: Country-level visitors
- **Referrers**: Company domains linking to your site

### Implementation (When Ready)

1. Sign up for Plausible ($9/mo)
2. Add site domain: `chaddunbar.com`
3. Add script to `BaseLayout.astro`:
   ```html
   <script defer data-domain="chaddunbar.com" src="https://plausible.io/js/script.js"></script>
   ```
4. Deploy and verify data appears

Total effort: ~15 minutes

### Revisit When

- Want to track which content resonates with visitors
- Curious about traffic patterns
- Preparing for job search and want hiring signals

### Sources

- [Plausible Analytics](https://plausible.io/)
- [Plausible Privacy Policy](https://plausible.io/data-policy)
- [Umami Analytics](https://umami.is/)
- [Fathom Analytics](https://usefathom.com/)
- [Best GDPR-Compliant Analytics Tools (PostHog)](https://posthog.com/blog/best-gdpr-compliant-analytics-tools)
