---
name: cv-generator
description: Generate comprehensive CVs from profile data for career documentation, speaking engagements, and senior-level applications
location: user
---

# CV Generator

<purpose>
Generate comprehensive curriculum vitae for academic and senior professional contexts (career documentation, speaking engagements, board positions, consulting opportunities). Transform structured profile data into detailed multi-page CVs that demonstrate full career trajectory and domain expertise.

**Goal:** Produce complete, chronological career documentation following CV standards with emphasis on comprehensiveness rather than tactical targeting.

**Output:** Professional CVs in markdown and plain text formats optimized for complete career documentation (typically 3-6 pages).

**Key Difference from Resume:** CV is comprehensive and chronological (includes ALL career history), not selective and targeted (filtered for specific job). CVs document full professional journey rather than tactical positioning.
</purpose>

<context>
@src/data/profile.yaml - Professional profile (single source of truth)
@src/data/schema.ts - Zod validation schema
@src/data/resume-guidelines/modern-resume-standards-2026.md - Formatting standards (apply to CV header/contact)
@.claude/skills/resume-generator.md - Shared patterns and XYZ formula

**Expected inputs:**
- Optional CV context (e.g., "Executive CV for board positions", "Academic CV for speaking circuit", "Comprehensive career documentation")
- Context influences emphasis and ordering, NOT content filtering
- Default: comprehensive career documentation with all roles and accomplishments

**Workflow:** User provides optional context string. CV generator includes ALL career data organized appropriately for the specified context (or general documentation if no context provided).
</context>

<process>

## Step 1: Parse CV Context

**Accept optional context string:**
- Examples: "Executive CV for board positions", "Academic CV for speaking circuit", "Comprehensive career documentation"
- Context influences section emphasis and ordering, NOT content filtering
- Default (no context): Balanced comprehensive documentation

**Context affects:**
- Section ordering (publications first for academic, leadership first for executive)
- Optional positioning statement in header
- Emphasis in professional summary (if included)

**Context does NOT affect:**
- Content inclusion (still comprehensive - include ALL career history)
- Date ranges (no 10-15 year limits)
- Accomplishment filtering (include all headline/featured tier)

## Step 2: Load Profile Data

Read `src/data/profile.yaml` and extract:

**Professional Experience:**
- ALL roles (complete career history)
- Company, title, date ranges, location
- Team size, budget, reporting structure
- Role descriptions and scope

**Impact Statements:**
- Headline tier (most significant achievements)
- Featured tier (notable accomplishments)
- Legacy tier (historically significant work)
- Organize by role/timeframe

**Additional CV Sections (if present in profile):**
- Publications & articles
- Speaking engagements & conferences
- Teaching & mentoring experience
- Board positions & advisory roles
- Awards & recognition
- Patents & intellectual property
- Professional affiliations
- Certifications & continuing education

**Skills & Expertise:**
- Domain expertise areas
- Technical proficiencies
- Methodologies and frameworks
- Tools and platforms

## Step 3: Organize Content by Category and Chronology

**Unlike resume tactical filtering, CV includes everything organized by:**

### Professional Experience Section
- ALL roles in reverse chronological order (no cutoff date)
- Group by employer/company if multiple roles
- Full date ranges (Month Year - Month Year format)
- Complete scope for each role:
  - Team size and structure
  - Budget responsibility (if applicable)
  - Reporting relationships
  - Key responsibilities and domain focus

### Impact Statements Organization
- Include ALL headline and featured tier accomplishments
- Group by role/timeframe
- Maintain Google XYZ formula for clarity (Accomplished X measured by Y by doing Z)
- Legacy tier: include if historically significant or space permits
- Recent roles: 5-8 bullets; historical roles: 3-5 bullets acceptable

### Additional Sections (CV-Specific)
Organize each category chronologically (reverse):

**Publications & Articles:**
- Format: Title, Publication/Platform, Date
- Include links where available
- Group by category if extensive (peer-reviewed, articles, blog posts)

**Speaking Engagements & Conferences:**
- Format: Event, Topic/Title, Date, Location
- Include audience size or conference prominence if notable
- Keynotes separate from panels/workshops if applicable

**Teaching & Mentoring:**
- Formal teaching roles
- Workshop/training delivery
- Mentorship programs
- Advisory/consultation work

**Board Positions & Advisory Roles:**
- Organization name, role, dates
- Brief description of organization and your contribution
- Focus areas or committee involvement

**Awards & Recognition:**
- Award name, granting organization, year
- Brief context if not self-explanatory

**Patents & Intellectual Property:**
- Patent number (if granted), title, year
- Patent pending status if applicable

**Professional Affiliations:**
- Organization name, membership type, dates
- Leadership roles within organizations

**Certifications & Continuing Education:**
- Certification name, granting body, year
- Relevant continuing education (major programs only)

## Step 4: Emphasize Based on Context

**If context provided, reorganize section priority:**

**Executive/Board CV:**
- Professional Summary first (3-4 sentence positioning)
- Key Accomplishments highlight section (top 10-15 achievements)
- Professional Experience (leadership roles emphasized)
- Board positions & advisory roles (elevated prominence)
- Publications/Speaking (if relevant to board work)
- Education & affiliations

**Academic/Speaking Circuit CV:**
- Professional Summary (academic/thought leadership angle)
- Publications & Writing (elevated to top)
- Speaking Engagements (elevated prominence)
- Professional Experience (research/teaching roles emphasized)
- Teaching & Mentoring (elevated)
- Education & certifications
- Professional affiliations

**Comprehensive Documentation (default):**
- Professional Experience first
- Key Accomplishments (optional highlight)
- Publications, Speaking, Teaching (equal weight)
- Education & certifications
- Skills & expertise
- Professional affiliations

**Important:** Reorganization changes priority, not content. All sections still included.

</process>

<output>

## CV Output Formats

Generate two file versions:

### 1. Markdown Format (.md)
**Purpose:** Source documentation, easy editing
**Filename:** `cv-[lastname]-[context-slug].md` (e.g., `cv-dunbar-executive.md`)

**Structure:**
```markdown
# Full Name

**Professional Title/Positioning**
City, State | Phone | Email | LinkedIn | Portfolio

[Optional: 3-4 sentence positioning statement if context provided]

---

## Professional Summary

[Optional: Include if context suggests. 3-4 sentences highlighting career trajectory and expertise.]

## Professional Experience

### Company Name
**Title** | Month Year - Month Year | Location
*Team size: X | Budget: $Y | Reporting: Title*

Brief role description covering scope and domain focus.

- [XYZ bullet: Accomplished X measured by Y by doing Z]
- [XYZ bullet: Accomplished X measured by Y by doing Z]
- [XYZ bullet: Accomplished X measured by Y by doing Z]
...

### Previous Company Name
**Title** | Month Year - Month Year | Location

[Continue for ALL roles in reverse chronological order]

---

## Key Accomplishments (Optional Highlight Section)

Top 10-15 headline achievements across career:
- [Achievement 1 - Company, Year]
- [Achievement 2 - Company, Year]
...

---

## Publications & Writing

- **"Article Title"** - Publication Name, Month Year. [Link]
- **"Article Title"** - Platform, Month Year. [Link]

---

## Speaking & Presentations

- **Event Name** - "Talk Title", Month Year, Location (Audience: X attendees)
- **Conference Name** - Panel: "Topic", Month Year, Location

---

## Education & Certifications

**Degree Name**
Institution Name, Year

**Certification Name**
Granting Body, Year

---

## Skills & Expertise

**Domain Expertise:** [Areas]
**Technical Proficiencies:** [Technologies/Platforms]
**Methodologies:** [Frameworks/Approaches]

---

## Professional Affiliations

- Organization Name - Member/Role, Year - Present
- Organization Name - Leadership Role, Year - Year

---

*Last Updated: [Date]*
```

### 2. Plain Text Format (.txt)
**Purpose:** Clean multi-page format for submission systems
**Filename:** `cv-[lastname]-[context-slug].txt`

**Formatting:**
- Plain text, no markdown syntax
- Clear section headers (all caps or underscores)
- Consistent indentation
- Readable in any text editor
- Multi-page format (3-6 pages typical)

**Example plain text structure:**
```
FULL NAME
Professional Title/Positioning
City, State | Phone | Email | LinkedIn | Portfolio

[Optional positioning statement]

--------------------------------------------------

PROFESSIONAL SUMMARY

[3-4 sentence summary if context suggests]

--------------------------------------------------

PROFESSIONAL EXPERIENCE

Company Name
Title | Month Year - Month Year | Location
Team size: X | Budget: $Y | Reporting: Title

[Role description]

  - [XYZ accomplishment bullet]
  - [XYZ accomplishment bullet]

[Continue for all roles]

--------------------------------------------------

PUBLICATIONS & WRITING

  - "Article Title" - Publication, Month Year [Link]
  - "Article Title" - Platform, Month Year [Link]

[Continue for all sections]
```

## Output Delivery

After generating both formats, present:

1. File paths created
2. Page count estimate (based on content volume)
3. Brief summary of included sections
4. Reminder: Review for completeness before use

**Example output message:**
```
✓ CV Generated

Files created:
- cv-dunbar-executive.md (markdown source)
- cv-dunbar-executive.txt (plain text for submission)

Estimated length: 4-5 pages
Sections included: Professional Experience (12 roles), Publications (8), Speaking (6), Education, Skills, Affiliations

Next step: Review cv-dunbar-executive.md for completeness before use.
```

</output>

<anti_patterns>

**Don't apply resume tactics to CV:**
- ❌ Selective filtering to fit page count (CV is comprehensive)
- ❌ 10-15 year experience limit (include full career history)
- ❌ Tactical job-matching content selection (include everything)
- ❌ Focus on "above-the-fold" real estate (multi-page is expected)

**Don't over-design:**
- ❌ Visual complexity (headers, graphics, columns)
- ❌ Fancy formatting (stick to clean, readable markdown/plain text)
- ❌ Multiple font sizes/colors (professional simplicity)
- ❌ Tables or complex layouts (plain text must work)

**Don't confuse CV with resume:**
- ❌ 1-2 page constraint (CV is 3-6 pages)
- ❌ Targeted positioning (CV is comprehensive)
- ❌ Job-specific keyword optimization (CV is documentation)
- ❌ Tactical ordering for specific role (chronological is standard)

**Don't skip sections:**
- ❌ Omitting older experience (include full chronology)
- ❌ Filtering out legacy accomplishments (include if significant)
- ❌ Skipping CV-specific sections (publications, speaking, teaching)
- ❌ Removing academic or community work (comprehensive means complete)

</anti_patterns>

<human_in_the_loop>

## Review Checkpoint

Before finalizing CV output, pause for review:

```
CV draft ready for review.

Context: [Executive/Academic/Comprehensive]
Total roles included: [X]
Accomplishments included: [Y]
Publications: [Z]
Speaking engagements: [A]

Content concerns to check:
- Completeness: Any missing roles or accomplishments?
- Emphasis: Sections ordered appropriately for context?
- Dates: All chronology accurate and complete?
- Contact: Information current and appropriate?

Type "approved" to generate final files, or provide feedback for adjustments.
```

**Common adjustments:**
- Reorder sections for different context
- Add positioning statement
- Include/exclude optional summary
- Adjust emphasis on certain accomplishments
- Verify date ranges and role details

After approval, generate final markdown and plain text files.

</human_in_the_loop>
