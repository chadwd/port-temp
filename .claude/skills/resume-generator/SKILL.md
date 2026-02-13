---
name: resume-generator
description: Generate tailored, ATS-optimized resumes from profile data for specific job applications
location: user
---

# Resume Generator

<purpose>
Generate strategic, 1-2 page resumes that function as **precision marketing documents** — not just career summaries. Transform structured profile data into targeted narratives that show the employer exactly how your past work solves their current problems. Every section should answer the hiring manager's core question: "What will this person do for us?"

**Goal:** Produce tailored resumes that combine modern standards (Google XYZ formula, ATS-optimized formatting, quantified achievements) with a marketing-driven positioning strategy. Content selection isn't just about relevance scoring — it's about building a compelling case that your specific experience is the solution to the employer's specific pain points. The resume should read as a value proposition, not a work history.

**Output:** Professional resumes in markdown format, optimized for both automated parsing and human review, where every bullet demonstrates transferable value to the target role.
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
1. **Professional identity:** Level + specialization + years + unique differentiator
2. **Value proposition:** Top 3 skills aligned to job requirements (use **bold** for emphasis)
3. **Proof point:** Directional achievement that addresses their biggest pain (defensible, not audit-bait)

**Example for AI/dev-tool role:**
"Sr product designer with 15+ years building complex enterprise and platform products, grounded in front-end development. Specialize in **AI-assisted workflows**, **developer tools**, and **design systems architecture** across multi-surface experiences. Reduced design-to-development cycles from months to days while maintaining high retention, serving 16,000+ dealers nationwide."

**Key elements:**
- "grounded in front-end development" = unique differentiator
- Bold on specializations = scannable for 6-second review
- "months to days" = directional (defensible) vs exact percentages (audit risk)
- "16,000+ dealers" = scale indicator without over-promising

**Avoid:**
- Generic phrases: "results-driven professional", "team player", "passionate about design"
- Vague claims: "extensive experience", "proven track record"
- Soft skills without evidence: "excellent communicator", "detail-oriented"
- Hard metrics that invite audit: "reduced cycle time by 73%" → use "from months to days"

## Step 6: Build Skills & Tech Stack Section

**Placement:** Skills come BEFORE Experience to front-load technical fit for the 6-second scan.

**Format:** Inline bold labels with grouped skills, NOT separate section headers.

**Example:**
```markdown
## Skills & Tech Stack

* **AI + Developer Tools:** Claude Code (power user), Figma MCP, AI-assisted design-to-code workflows, prompt patterns, trust UX for uncertainty
* **Design:** Figma (advanced), FigJam, prototyping, information architecture, interaction design, usability testing, WCAG/accessibility
* **Front-End / CLI:** HTML, CSS, SCSS, JS, Git, npm, command-line workflows
* **Design Systems:** Component architecture, governance, documentation, contribution workflows
```

**Guidelines:**
- 3-5 category groups maximum
- Group by role-relevance, not generic categories
- Add proficiency inline: "Figma (advanced)", "Claude Code (power user)"
- Include technical skills that differentiate for the specific role
- Cross-reference with job requirements—include what THEY asked for

**Source from profile.yaml:**
- Pull from `skills` section
- Cross-reference with job analysis requirements
- Reorder/rename categories based on role focus
- Include only what's relevant to THIS role

## Step 7: Generate Resume Using Modern Template

Build the resume following 2026 professional standards from modern-resume-architecture.md.

### Resume Structure

#### Section Order (Critical)

The order matters for 6-second scan optimization:

1. **Header** (Name + Contact)
2. **Target Role** (Explicit role + company)
3. **Professional Summary** (2-3 sentences)
4. **Skills & Tech Stack** (Front-load technical fit)
5. **Domain Expertise** (If role-relevant, e.g., fintech, blockchain)
6. **Professional Experience** (Reverse chronological)
7. **Education & Certifications** (Bottom)

#### 1. Header (Magazine Cover Approach)

**Format:**
```markdown
# **Chad Dunbar**

Bellevue, WA (Seattle Metro)
email@example.com • linkedin.com/in/your-name • portfolio.com • github.com/username
```

**Guidelines:**
- Name as H1 with bold for visual weight
- City, State with metro area context if helpful (e.g., "Bellevue, WA (Seattle Metro)")
- Use bullet (•) separators, NOT pipes
- Include hyperlinks in markdown format: `[linkedin.com/in/name](url)`
- Include GitHub when relevant to dev-tool or technical roles
- NO phone number in markdown (add for PDF/print versions only)

#### 2. Target Role (Explicit Alignment)

**Format:**
```markdown
## Target Role

**Sr Product Designer, [Company Name] (Focus Area)**
```

**Guidelines:**
- Explicitly state the role you're applying for
- Include company name for tailored applications
- Add focus area in parentheses if it differentiates (e.g., "Design Systems & High-Velocity Delivery")
- Match the job posting's title exactly—don't inflate or adjust level

**Title Honesty Rule:**
- If applying for "Senior," use "Senior" not "Staff" or "Principal"
- Your current title goes in Experience section; Target Role matches the job posting
- This signals you read the posting and are applying intentionally

#### 3. Professional Summary (Replaces Old Objective)

**Format:**
2-3 sentence value proposition that leads with impact, not generic phrases.

**Structure:**
- Sentence 1: Professional identity (level + domain + years) + unique differentiator
- Sentence 2: Top 3 skills aligned to job requirements (use **bold** for emphasis)
- Sentence 3: Quantified proof point addressing their biggest pain (use directional language for defensibility)

**Example:**
"Sr product designer with 15+ years building complex enterprise and platform products, grounded in front-end development. Specialize in **AI-assisted workflows**, **developer tools**, and **design systems architecture** across multi-surface experiences. Reduced design-to-development cycles from months to days while maintaining high retention, serving 16,000+ dealers nationwide."

**Key improvements:**
- Added "grounded in front-end development" as unique differentiator
- Used bold for key specializations (scannable)
- "months to days" is directional (defensible) vs exact numbers (audit risk)
- "16,000+ dealers" gives scale without over-promising

#### 4. Skills & Tech Stack (BEFORE Experience)

**Placement:** Skills come BEFORE Experience to front-load technical fit for the 6-second scan.

**Format:**
```markdown
## Skills & Tech Stack

* **AI + Developer Tools:** Claude Code (power user), Figma MCP, AI-assisted design-to-code workflows, prompt patterns, trust UX for uncertainty
* **Design:** Figma (advanced), FigJam, prototyping, information architecture, interaction design, usability testing, WCAG/accessibility
* **Front-End / CLI:** HTML, CSS, SCSS, JS, Git, npm, command-line workflows
* **Design Systems:** Component architecture, governance, documentation, contribution workflows
```

**Guidelines:**
- Use inline bold labels (NOT separate section headers)
- Group by role-relevance, not generic categories
- Add proficiency notes inline: "Figma (advanced)", "Claude Code (power user)"
- Include technical skills that differentiate (Git, npm, CLI for dev-tool roles)
- 3-5 category groups maximum

#### 5. Domain Expertise (When Role-Relevant)

**Format:**
```markdown
## Domain Expertise

**Fintech & Web3:** Hands-on experience with trading platforms, decentralized protocols, and wallet-based workflows, providing real user empathy for financial and crypto-native products.
```

**Guidelines:**
- Include ONLY if the role requires domain knowledge you have
- Position before Experience to surface fit early
- Be honest about depth: "hands-on experience" vs "professional product design"
- One paragraph, not bullet list

#### 6. Professional Experience (Highlight Reel)

**Format for each role:**
```markdown
### Company Name - Role Title | **Mon Year – Present**

#### **Theme/Focus Area 1**

* [XYZ achievement bullet 1]
* [XYZ achievement bullet 2]
* [XYZ achievement bullet 3]

#### **Theme/Focus Area 2**

* [XYZ achievement bullet 1]
* [XYZ achievement bullet 2]
```

**Guidelines:**
- Use H3 for company/role, H4 for thematic groups within a role
- Group accomplishments by theme (e.g., "Design Systems & Velocity", "Enterprise Product Delivery")
- 3-4 thematic groups for current/primary role
- 8-12 total bullets for current role (not 13-15)
- 2-3 bullets for older roles (no thematic grouping needed)
- Date format: "Jan 2017 – Present" (abbreviated month, en-dash)

**Thematic Grouping Examples:**
- Design Systems & Velocity
- Enterprise Product Delivery
- Cross-Functional Leadership
- Trust-Centered AI UX

**Metric Softening Guidelines:**
Use directional language for public resumes; save hard numbers for interviews:

| Private Metric | Public/Resume Version |
|----------------|----------------------|
| "88.7% retention" | "retention over target" or "high retention" |
| "210 new rooftops" | "successful multi-location adoption" |
| "155 UX initiatives" | "highest team output and velocity" |
| "3 promoted in 12 months" | "3 to Sr and Lead opportunities within 12 months" |

**Why soften?** Hard numbers invite audit. Directional language is defensible. Save specifics for interviews where you can provide context.

#### 7. Education & Certifications

**Format:**
```markdown
## Education & Certifications

B.S., Graphic Design - Robert Morris University | Summa Cum Laude (4.0 GPA)
A.A.S. in Paraprofessional Accounting - Del Mar College | Cum Laude
Accounting Technician Certification
```

**Guidelines:**
- Include ALL degrees when they add context (accounting = analytical thinking for data roles)
- Include certifications if role-relevant
- Honors: Summa/Magna/Cum Laude with GPA if 3.7+
- No graduation dates for experienced professionals
- Single line per credential, pipe separator for honors

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
- **No bars or dots** for skill proficiency (use inline text: "Figma (advanced)")

#### Markdown Conventions
- H1 (`#`) for name only
- H2 (`##`) for major sections (Target Role, Summary, Skills, Experience, Education)
- H3 (`###`) for company/role headers
- H4 (`####`) for thematic groups within a role
- Bold (`**`) for emphasis on key terms, labels, dates
- Bullet (`*`) for accomplishment lists
- Bullet separator (`•`) for contact info line

#### File Format
- **PDF or .docx** for submission (PDF maintains visual integrity)
- **Markdown (.md)** as source format for version control and editing
- **File naming:** `[company]-[role-slug]-resume.pdf`
- Example: `trm-labs-senior-product-designer-resume.pdf`

### Keyword Integration

**Natural peppering, NOT stuffing:**
- Integrate keywords from job description throughout experience bullets
- Use exact terminology from posting (e.g., "stakeholder management" if they use that phrase)
- Don't repeat keywords artificially
- NEVER use white text or keyword borders (instant rejection)
- Let XYZ achievements naturally incorporate required skills

**Example:**
Job requires "design systems governance" → Bullet includes "...by establishing design system governance workflow adopted by 3-person team"

## Step 8: Present for Human Review

**Output includes:**

1. **Generated resume** (markdown format)
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
Resume generated in markdown format:

**Markdown (.md)**
- Source format, human-readable
- Version controlled, easily edited
- Preserves structure and formatting
- ATS-friendly when following single-column layout guidelines

Saved to `src/data/resumes/[company-name]-[role-slug]-resume.md`
</output>

<anti_patterns>

## Patterns to Avoid

### 1. Generic Resumes
❌ One-size-fits-all resume sent to every application
✅ Tailored content addressing specific job requirements and pain points

### 2. Duty Lists Without Achievements
❌ "Responsible for managing design system"
✅ "Established design system operations with clear ownership and contribution models"

### 3. ATS-Unfriendly Formatting
❌ Multi-column layouts, graphics, charts, photos, unusual fonts
✅ Single column, standard fonts (Arial/Calibri at 11pt), clean structure

### 4. Over-Precise Metrics (Audit Bait)
❌ "Reduced cycle time by 73% (from 20-45 days to 2-4 days)"
✅ "Reduced design-to-development cycles from months to days"

Hard percentages invite verification. Use directional language ("months to days", "over target", "highest on team") for public resumes. Save precise numbers for interviews.

### 5. Passive Language
❌ "Contributed to improved metrics"
✅ "Spearheaded design execution with highest team output and velocity"

### 6. Resume-Speak and Jargon
❌ "Leveraged synergistic cross-functional collaboration to optimize stakeholder engagement"
✅ "Led 3 product teams to ship unified checkout in 8 weeks"

### 7. Title Inflation
❌ Applying for "Senior" role but using "Staff" or "Principal" as target title
✅ Match target role title to job posting exactly; your actual title goes in Experience

### 8. Skills Buried at Bottom
❌ Skills section after Experience (recruiter may never scroll that far)
✅ Skills section BEFORE Experience to front-load technical fit for 6-second scan

### 9. Flat Accomplishment Lists
❌ 13+ bullets under one role without thematic organization
✅ Group bullets under H4 thematic headers (e.g., "Design Systems & Velocity", "Enterprise Delivery")

### 10. Outdated Elements
❌ "References available upon request", full street address, graduation dates for 3+ year graduates
✅ City/State only, no references line, strategic date omission, include ALL degrees that add context

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
