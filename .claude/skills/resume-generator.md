---
name: resume-generator
description: Generate tailored, ATS-optimized resumes from profile data for specific job applications
location: user
---

# Resume Generator

<purpose>
Generate tactical, 1-2 page resumes for job applications following 2026 professional standards. Transform structured profile data into targeted, achievement-focused resumes that pass ATS screening and grab recruiter attention in the critical 6-second scan.

**Goal:** Produce tailored resumes that follow modern standards (Google XYZ formula, ATS-optimized formatting, quantified achievements) with smart content selection based on job context.

**Output:** Professional resumes in markdown and plain text formats, optimized for both automated parsing and human review.
</purpose>

<context>
@src/data/profile.yaml - Professional profile (single source of truth)
@src/data/schema.ts - Zod validation schema
@src/data/resume-guidelines/modern-resume-standards-2026.md - 2026 resume best practices
@src/data/resume-guidelines/modern-resume-architecture.md - Strategic positioning framework
@src/data/resume-guidelines/strategic-framework-resume.md - Executive positioning model

**Expected inputs:**
- Job posting link/URL (required for context)
- Job-analysis file path (e.g., `src/data/job-analysis/coinbase-staff-product-designer.md`)

**Workflow:** User provides job posting link AND job-analysis file path. If job-analysis doesn't exist yet, offer to run `/job-matcher` first to create it.
</context>

<process>

## Step 1: Validate Inputs and Load Job Analysis

**Check what user provided:**

**Scenario A: Both job posting link AND job-analysis file provided**
- Verify job-analysis file exists at provided path
- Proceed to load analysis

**Scenario B: Only job posting link provided (no job-analysis)**
```
⚠️ Job analysis file not provided.

For best results, run `/job-matcher [job-posting-link]` first to:
- Extract key requirements and pain points
- Score your profile content for relevance
- Generate job-analysis file at src/data/job-analysis/[company]-[role].md

Then run: `/resume-generator [job-link] [analysis-file-path]`

Continue without job-analysis? (will parse job posting directly, less optimized)
```

**Scenario C: Only job-analysis file provided (no job posting link)**
- Verify file exists at path
- Read job-analysis file (contains original job posting link)
- Proceed to load analysis

**Scenario D: Neither provided**
```
❌ Missing required inputs

Please provide at least ONE of:
1. Job posting link/URL, OR
2. Job-analysis file path (from /job-matcher output)

Recommended: Both for best results

Example: /resume-generator https://job-boards.greenhouse.io/coinbase/jobs/123 src/data/job-analysis/coinbase-staff-product-designer.md
```

**Load job-analysis file and extract:**
- **Role context:** Level, domain focus, company stage, team size
- **Required skills:** Top 5-7 skills/domains (already extracted by job-matcher)
- **Pain points:** Problem this role solves, team challenges, success metrics
- **Cultural signals:** Collaboration style, decision-making approach, values
- **Pre-scored content:** Job-matcher's recommended accomplishments with relevance scores

**Key advantage:** Job-matcher has already parsed the job posting and scored your profile content. This step leverages that analysis for faster, more accurate resume generation.

## Step 2: Score Profile Content for Relevance

Read `src/data/profile.yaml` and evaluate both `impact_statements` and `accomplishments` sections against job requirements.

**Weighted Scoring Algorithm:**

Use the proven scoring model from job-matcher (Phase 15.03):

### Tag Match (40% weight)
- Direct alignment with job requirements (ai, design-systems, enterprise, leadership, etc.)
- Bonus for multiple tag alignment (+0.1 per additional matching tag)
- Higher weight for exact domain matches

### Domain Relevance (25% weight)
- Industry alignment (enterprise vs consumer, B2B vs B2C)
- Product type (AI/ML, platforms, SaaS, blockchain)
- Product maturity (0-to-1 vs growth vs scale)
- Leadership scope (IC vs team lead vs org-wide)

### Recency (20% weight)
- 2025-2024: Full weight (1.0x)
- 2023-2020: Reduced weight (0.8x)
- 2019-2015: Legacy weight (0.6x)
- Pre-2015: Historical weight (0.4x, use only if highly relevant)

### Impact Magnitude (15% weight)
- Headline tier: 1.0x (top accomplishments)
- Featured tier: 0.8x (strong accomplishments)
- Legacy tier: 0.6x (earlier career highlights)
- Quantified outcomes: +0.2x bonus
- Clear XYZ format: +0.1x bonus

**Final Score:** Weighted average (0-100 scale)

## Step 3: Select Top 7-10 Impact Statements

Sort all statements by final relevance score and select top candidates with these balancing criteria:

**Diversity Requirements:**
- Cover multiple requirement areas (don't stack 5 AI examples if they also need leadership)
- Mix leadership, technical, and business outcomes
- Ensure breadth across skill domains

**Tier Prioritization:**
- Prioritize headline/featured tier for "top fold" impact
- Include 1-2 legacy accomplishments if highly relevant and well-quantified
- Lead with their biggest pain point

**Quality Standards:**
- Prefer quantified outcomes (percentages, dollars, timeframes)
- Ensure clear XYZ formula structure
- Select statements that directly address extracted job requirements

**Output Balancing:**
- 7-10 total statements for 1-page resume (early career)
- 10-15 total statements for 2-page resume (10+ years experience)
- Recent/relevant roles get 4-6 bullets each
- Older roles get 2-3 bullets each (or combine into "Additional Experience")

## Step 4: Structure Experience Section

Group selected accomplishments by employer/role in reverse chronological order (most recent first).

**For each role:**

### Company, Role Title, Date Range
- Format: "Company Name - Role Title | Month Year - Month Year (or Present)"
- Omit roles older than 10-15 years unless highly relevant
- Consider "Additional Professional Experience" section for earlier roles without full details

### Achievement Bullets (Google XYZ Formula)
Use the proven XYZ structure: "Accomplished [X] as measured by [Y] by doing [Z]"

**XYZ Quality Checklist:**
- **X (Accomplished):** Start with action verb, focus on outcome not duty
- **Y (Measured by):** Quantify with percentages, dollars, time, or clear observable outcomes
- **Z (By doing):** Specify tools, frameworks, methods, approaches used

**Examples of Strong XYZ Bullets:**
- "Reduced design-to-development cycle from 20-45 days to 2-4 days by directing Project N.E.X.T., an AI-assisted workflow using Figma MCP and Claude Code"
- "Achieved 88.7% dealer retention and onboarded 210 new rooftops by leading UX for New Car Pricing, a CEO-level enterprise platform initiative"
- "Delivered 155 UX initiatives (116 CapEx) with high reliability, the highest output on the UX team, by maintaining dev-ready clarity across multiple product lines"

## Step 5: Build Professional Summary

Create a power-packed 2-3 sentence value proposition that leads with impact.

**Structure:**
1. **Professional identity:** Level + specialization + years
2. **Value proposition:** Top 3 skills aligned to job requirements
3. **Proof point:** 1-2 quantified achievements that address their biggest pain

**Example for AI product role:**
"Principal-level product designer with 15+ years building complex enterprise and platform products. Specialize in AI-assisted workflows, design systems architecture, and B2B SaaS. Reduced design-to-dev cycle 90% (20 days to 2 days) while maintaining 88.7% retention on CEO-level platform serving 200+ enterprise clients."

**Avoid:**
- Generic phrases: "results-driven professional", "team player", "passionate about design"
- Vague claims: "extensive experience", "proven track record"
- Soft skills without evidence: "excellent communicator", "detail-oriented"

## Step 6: Select Skills and Tech Stack

**Contextual approach, NOT simple lists:**

Group skills by category relevant to the role:
- Design Tools (Figma, FigJam, etc.)
- Technical Skills (HTML, CSS, prototyping tools)
- AI/Technical (Claude Code, Figma MCP, prompt engineering)
- Domains (Enterprise workflows, design systems, B2B SaaS)
- Methods (JTBD, usability testing, WCAG compliance)

**Proficiency levels where relevant:**
- Advanced in [tool] (if it's critical to the role)
- Proficient in [tool] (if it's required but not primary)

**Source from profile.yaml:**
- Pull from `skills` section
- Cross-reference with job requirements
- Include only what's relevant to THIS role

## Step 7: Generate Resume Using Modern Template

Build the resume following 2026 professional standards from modern-resume-architecture.md.

### Resume Structure

#### 1. Header (Magazine Cover Approach)

**Format:**
```
CHAD DUNBAR
Principal Product Designer, AI Workflows

Seattle, WA | 555-123-4567 | email@example.com | linkedin.com/in/your-name
```

**Guidelines:**
- Name in large, prominent font (18-24pt for visual hierarchy)
- Target role title immediately below name
- City, State only (NO street address for privacy)
- Single line contact: Phone | Email | LinkedIn (customized URL)
- Portfolio link if highly relevant to role

#### 2. Professional Summary (Replaces Old Objective)

**Format:**
2-3 sentence value proposition that leads with impact, not generic phrases.

**Structure:**
- Sentence 1: Professional identity (level + domain + years)
- Sentence 2: Top 3 skills aligned to job requirements
- Sentence 3: Quantified proof point addressing their biggest pain

**Example:**
"Principal-level product designer with 15+ years building complex enterprise and platform products. Specialize in AI-assisted workflows, design systems architecture, and B2B SaaS. Reduced design-to-dev cycle 90% (20 days to 2 days) while maintaining 88.7% retention on CEO-level platform serving 200+ enterprise clients."

#### 3. Professional Experience (Highlight Reel)

**Format for each role:**
```
Company Name - Role Title | Month Year - Month Year (or Present)
Department or Team Context (if relevant)

• [XYZ achievement bullet 1]
• [XYZ achievement bullet 2]
• [XYZ achievement bullet 3]
• [XYZ achievement bullet 4-6 for recent/relevant roles]
```

**Guidelines:**
- Reverse chronological order (most recent first)
- Recent/relevant roles: 4-6 bullets each
- Older roles: 2-3 bullets each
- Focus on last 10-15 years of relevant experience
- Use bullet points, not paragraphs
- Each bullet follows Google XYZ formula
- Lead with quantified outcomes (numbers in first 8 words when possible)

**Date Range Strategy:**
- Current role: "January 2017 - Present"
- Past roles: "Month Year - Month Year"
- Roles 10-15+ years old: Consider "Additional Professional Experience" section without dates

#### 4. Skills / Tech Stack

**Format:**
```
**Design Tools:** Figma, FigJam, [other tools]
**Technical Skills:** HTML, CSS, SCSS, [other skills]
**AI & Technical:** Claude Code, Figma MCP, prompt engineering
**Domains:** Enterprise workflows, design systems, B2B SaaS
**Methods:** JTBD, usability testing, WCAG compliance
```

**Guidelines:**
- Group by category (NOT flat alphabetical list)
- Specify proficiency for critical tools ("Advanced in Excel")
- Include only what's relevant to THIS role
- Contextual presentation, not just keyword list

#### 5. Education

**Format:**
```
B.S. in Graphic Design - Robert Morris University
[Honors if Summa/Magna Cum Laude]
```

**Placement:**
- Bottom of resume for professionals with 3+ years experience
- Top of resume only if graduated within last 3 years
- Omit graduation dates if 3+ years ago (avoid age bias)
- Include honors if Summa/Magna/Cum Laude
- Relevant coursework only if directly applicable to role

**Guidelines:**
- Institution, Degree, Honors (if applicable)
- No GPA unless recent graduate with 3.7+
- No dates for experienced professionals
- List only relevant degrees (skip unrelated A.A.S. unless it adds context)

### Output Formatting Rules (ATS-Critical)

#### Layout Standards
- **Single column only** (NO multi-column layouts - ATS cannot parse them)
- **Left-aligned text** (standard parsing for digital systems)
- **Consistent spacing** between sections
- **1-2 pages maximum** (2 pages is norm for 10+ years experience)

#### Typography Standards
- **Standard fonts only:** Arial, Calibri, or Cambria
- **11pt minimum** for body text (10pt acceptable for contact info)
- **No graphics, photos, charts, or visual elements** (confuses ATS)
- **No bars or dots** for skill proficiency (use text: "Advanced in...")

#### File Format
- **PDF or .docx** both acceptable (PDF maintains visual integrity)
- **File naming:** `[FirstName]-[LastName]-[RoleTitle]-Resume.pdf`
- Example: `Chad-Dunbar-Staff-Product-Designer-Resume.pdf`

### Keyword Integration

**Natural peppering, NOT stuffing:**
- Integrate keywords from job description throughout experience bullets
- Use exact terminology from posting (e.g., "stakeholder management" if they use that phrase)
- Don't repeat keywords artificially
- NEVER use white text or keyword borders (instant rejection)
- Let XYZ achievements naturally incorporate required skills

**Example:**
Job requires "design systems governance" → Bullet includes "...by establishing design system governance workflow adopted by 3-person team"

## Step 8: Generate Plain Text Version

Create ATS-optimized plain text version following same structure:

**Formatting adjustments:**
- Remove all bold/italic/formatting
- Use ALL CAPS for name only
- Use simple dashes or asterisks for bullets
- Maintain single column, left-aligned
- Clean, consistent spacing
- No special characters that could confuse parsers

**Save both files:**
- `resumes/[company]-[role-slug]-resume.md` (Markdown source)
- `resumes/[company]-[role-slug]-resume.txt` (ATS-friendly plain text)

## Step 9: Present for Human Review

**Output includes:**

1. **Generated resume** (markdown and plain text)
2. **Content selection rationale** (which statements were chosen and why)
3. **Relevance scores** for selected accomplishments
4. **Gaps identified** (requirements not covered by profile)
5. **Suggested edits** (optional improvements to consider)

**User review checklist:**
- Does this accurately represent my experience?
- Are the selected accomplishments the best matches for THIS role?
- Is the emphasis right (leadership vs technical vs business)?
- Any statements I want to swap in/out?
- Voice and tone feel authentic to me?
- Ready to submit or needs manual edits?

</process>

<output>
Resume generated in two formats:

**1. Markdown (.md)**
- Source format, human-readable
- Version controlled, easily edited
- Preserves structure and formatting

**2. Plain Text (.txt)**
- ATS-friendly, single column
- Clean formatting for applicant tracking systems
- No complex formatting that could confuse parsers

Both formats saved to `resumes/[company-name]-[role-slug]-resume.[md|txt]`
</output>

<anti_patterns>

## Patterns to Avoid

### 1. Generic Resumes
❌ One-size-fits-all resume sent to every application
✅ Tailored content addressing specific job requirements and pain points

### 2. Duty Lists Without Achievements
❌ "Responsible for managing design system"
✅ "Accelerated design system adoption by 40% through token standardization"

### 3. ATS-Unfriendly Formatting
❌ Multi-column layouts, graphics, charts, photos, unusual fonts
✅ Single column, standard fonts (Arial/Calibri at 11pt), clean structure

### 4. Vague Metrics
❌ "Improved efficiency significantly"
✅ "Reduced design-to-dev cycle from 20-45 days to 2-4 days"

### 5. Passive Language
❌ "Contributed to improved metrics"
✅ "Delivered 12% retention increase"

### 6. Resume-Speak and Jargon
❌ "Leveraged synergistic cross-functional collaboration to optimize stakeholder engagement"
✅ "Led 3 product teams to ship unified checkout in 8 weeks"

### 7. Missing Quantification
❌ "Led design projects successfully"
✅ "Led 5 design projects delivering $1.2M in revenue impact"

### 8. Outdated Elements
❌ "References available upon request", full street address, graduation dates for 3+ year graduates
✅ City/State only, no references line, strategic date omission

</anti_patterns>

<human_in_the_loop>

**CRITICAL:** This skill generates DRAFT resumes for human review and approval.

**User controls:**
- Review and approve content selection before final output
- Override automated scoring with manual statement selection
- Adjust emphasis and positioning of accomplishments
- Edit final output for voice and tone
- Decide when to apply and submit

**No auto-submission:** This skill NEVER sends applications or emails on your behalf. It produces documents for your review and use.

The output is a professional starting point. You own the final version and all application decisions.

</human_in_the_loop>
