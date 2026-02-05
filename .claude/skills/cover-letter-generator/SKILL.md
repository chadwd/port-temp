---
name: cover-letter-generator
description: Generate tailored, high-impact cover letters from profile data and job analysis
location: user
---

# Cover Letter Generator

<purpose>
Generate tailored, one-page cover letters for job applications following the marketing document approach (not autobiography). Transform structured profile data into compelling narratives that demonstrate clear role fit and authentic motivation.

**Goal:** Produce cover letters that feel company-specific, map skills to role needs clearly, and can be read in under 90 seconds.

**Output:** Professional cover letters in markdown format, structured following the 6-paragraph framework.
</purpose>

<context>
@src/data/profile.yaml - Professional profile (single source of truth)
@src/data/schema.ts - Zod validation schema
@.planning/phases/20.1-cover-letter-skill/20.1-CONTEXT.md - Cover letter structure and guidelines

**Expected inputs:**
- Job posting link/URL (required for context)
- Job-analysis file path (e.g., `src/data/job-analysis/coinbase-senior-staff-product-designer-platform.md`)

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
- Identify cultural signals and company context
- Generate job-analysis file at src/data/job-analysis/[company]-[role].md

Then run: `/cover-letter-generator [job-link] [analysis-file-path]`

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

Example: /cover-letter-generator https://job-boards.greenhouse.io/coinbase/jobs/123 src/data/job-analysis/coinbase-senior-staff-product-designer-platform.md
```

**Load job-analysis file and extract:**
- **Role context:** Level, domain focus, company stage, team size
- **Required skills:** Top 5-7 skills/domains (already extracted by job-matcher)
- **Pain points:** Problem this role solves, team challenges, success metrics
- **Cultural signals:** Collaboration style, decision-making approach, values
- **Pre-scored content:** Job-matcher's recommended accomplishments with relevance scores
- **Company research:** Mission, product, differentiators, recent news

**Key advantage:** Job-matcher has already parsed the job posting and scored your profile content. This step leverages that analysis for faster, more accurate cover letter generation.

## Step 2: Analyze Job Description Following Context Guidelines

Following the workflow from `20.1-CONTEXT.md`:

**Break job description into two buckets:**
1. What the candidate will do (responsibilities)
2. What the company is looking for (qualifications)

**Rules:**
- Prioritize the first few bullets under responsibilities
- Highlight only skills the candidate genuinely has
- Note preferred or nice-to-have qualifications if applicable
- Ignore requirements the candidate does not meet
- Never disqualify the candidate for missing some requirements

**Output (internal reasoning):**
- A short, prioritized list of required skills and responsibilities

## Step 3: Build Skill-Matching Table

Create internal two-column table:

**Column 1:** Exact phrases from the job description
**Column 2:** How the candidate matches each phrase

**Rules:**
- Mirror the employer's language exactly
- Be specific and concrete
- Only the **top two** strongest matches will be used in the final letter

**Scoring methodology (reuse from job-matcher):**

### Weighted Scoring Algorithm

Use the proven scoring model from job-matcher (Phase 15.03):

**Tag Match (40% weight)**
- Direct alignment with job requirements (ai, design-systems, enterprise, leadership, etc.)
- Bonus for multiple tag alignment (+0.1 per additional matching tag)
- Higher weight for exact domain matches

**Domain Relevance (25% weight)**
- Industry alignment (enterprise vs consumer, B2B vs B2C)
- Product type (AI/ML, platforms, SaaS, blockchain)
- Product maturity (0-to-1 vs growth vs scale)
- Leadership scope (IC vs team lead vs org-wide)

**Recency (20% weight)**
- Weight accomplishments from last 3 years higher
- Most recent role gets highest weight
- Older experience relevant if directly applicable

**Impact Level (15% weight)**
- Organization-wide impact > team impact > individual contribution
- Quantified outcomes > directional improvements
- Strategic initiatives > tactical execution

**Score each accomplishment 0-100:**
- 90-100: Perfect fit (use these first)
- 75-89: Strong fit (excellent backup)
- 60-74: Moderate fit (use if needed for breadth)
- Below 60: Skip unless filling gap

## Step 4: Research the Company

**This step is mandatory** (from 20.1-CONTEXT.md).

If job-analysis file includes company research, use that. Otherwise, research directly.

**Answer the following:**
- What is the company's mission?
- What problem are they solving?
- What product or platform do they offer?
- What differentiates them from competitors?
- What values do they publicly emphasize?
- Any notable blog posts, interviews, or announcements?

**Then select:**
- One **values-driven reason** (why this company's mission resonates)
- One **product, industry, or direction-driven reason** (why this work excites you)

**If the candidate uses the product, prioritize that.**

## Step 5: Generate Cover Letter Using 6-Paragraph Structure

Follow the mandatory structure from `20.1-CONTEXT.md`:

### Paragraph 1: Identity and Intent

**Purpose:**
- Establish who the candidate is
- Clarify what role they want
- Signal alignment with the company

**Rules:**
- 1–2 sentences
- Mention the company by name
- Reference something specific about them

**Example approach:**
"I'm a [role level] with [X years] designing [domain] at [type of companies]. I'm writing to express my interest in the [Role Title] position at [Company], drawn by [specific company attribute from research]."

### Paragraph 2: Summary and Transition

**Purpose:**
- Summarize what the candidate brings
- Transition into skill evidence

**Rules:**
- One sentence summarizing impact
- One sentence setting up skills
- Use numbers or outcomes when possible
- Avoid buzzwords

**Example approach:**
"Over the past [X years], I've [major impact statement with number]. I'd like to highlight two experiences that demonstrate [relevant capability]."

### Paragraphs 3–4: Skill and Qualification Match

**Purpose:**
- Prove fit through evidence

**Process:**
- Select the top two skills from the matching table (highest scores)
- Assign each skill a story theme

**Approved Story Themes:**
- Leading people
- Taking initiative
- Solving challenging problems
- Working across disciplines
- Curiosity and learning
- Managing conflict
- Recovering from failure

**Structure per paragraph:**
- Name the theme implicitly (don't say "This demonstrates leadership")
- Describe the experience (use XYZ formula from profile)
- Show the outcome or impact

**Rules:**
- No bullet lists
- No resume repetition (expand beyond resume, add context)
- No unsupported claims (back with specific examples)

**Example approach:**
"At [Company], I [accomplished X by doing Z, measured by Y]. This resulted in [outcome that matters to new company]."

### Paragraph 5: Why This Company

**Purpose:**
- Demonstrate genuine interest

**Structure:**
- Weave together the two selected reasons from company research

**Template logic:**
- Value alignment plus personal relevance
- Product or direction plus career relevance

**If this section feels forced, the application is misaligned.**

**Example approach:**
"I'm drawn to [Company]'s [value/mission] because [personal connection]. Additionally, [product/direction reason] aligns with my interest in [career direction]."

### Paragraph 6: Conclusion

**Purpose:**
- Close with confidence

**Rules:**
- Be direct
- Express readiness
- Invite next steps
- No desperation

**Example approach:**
"I'd welcome the opportunity to discuss how my experience designing [domain] could contribute to [Company's specific goal]. Thank you for your consideration."

## Step 6: Apply Style Guidelines

Before presenting to user, verify the draft follows these guidelines from `20.1-CONTEXT.md`:

**Style:**
- Clear and concise
- Professional but human
- Confident, not arrogant
- Specific over clever
- Short sentences preferred

**Avoid (failure conditions):**
- Generic openings
- Company-agnostic statements
- Repeating resume bullets
- Overly long explanations
- Buzzwords without evidence

**Success criteria:**
- Feels tailored to one company only
- Clearly maps skills to role needs
- Explains why the candidate wants *this* job
- Can be read in under 90 seconds

## Step 7: Present Draft with Rationale

Present the cover letter draft to the user with clear explanation of content selection:

```
# Cover Letter Draft

[Company Name] - [Role Title]

---

[6-paragraph cover letter]

---

## Content Selection Rationale

**Top Skills Selected (from matching table):**
1. [Skill 1] - Score: [XX]/100
   - JD phrase: "[exact phrase from job description]"
   - Match: [how candidate matches]
   - Story theme: [theme used in paragraph 3]

2. [Skill 2] - Score: [XX]/100
   - JD phrase: "[exact phrase from job description]"
   - Match: [how candidate matches]
   - Story theme: [theme used in paragraph 4]

**Company Research:**
- Values-driven reason: [selected reason]
- Product/direction reason: [selected reason]

**Accomplishments Used:**
- [List of accomplishments from profile.yaml referenced in the letter]
- [Why each was selected based on scoring]

---

**Next Steps:**
1. Review the draft for accuracy and tone
2. Adjust any content that doesn't feel authentic
3. Verify company research is current
4. Confirm accomplishments are accurately represented
5. Approve for final output

Type "approved" to save, or provide feedback for revision.
```

## Step 8: Handle User Feedback and Finalize

**If user approves:**
- Proceed to save final output

**If user requests changes:**
- Ask for specific feedback:
  - Which sections need adjustment?
  - Are accomplishments accurately represented?
  - Does the tone feel authentic?
  - Is company research current and relevant?
- Revise based on feedback
- Re-present draft with changes highlighted
- Repeat until approval

**If user requests major changes (company research, different accomplishments, etc.):**
- Document the rationale for changes
- Regenerate affected sections
- Maintain 6-paragraph structure and style guidelines

## Step 9: Save Final Output

**File location:** `src/data/cover-letters/[company]-[role]-cover-letter.md`

**Naming convention:** Same as resumes (lowercase, hyphenated)
- Extract company name and role from job-analysis or user input
- Convert to lowercase, replace spaces with hyphens
- Example: `coinbase-senior-staff-product-designer-platform-cover-letter.md`

**File format:**

```markdown
---
company: [Company Name]
role: [Role Title]
job_posting_url: [URL]
created: [YYYY-MM-DD]
job_analysis_file: [path to job-analysis file used]
---

[Recipient Name]
[Company Name]
[Date]

Dear [Hiring Manager/Team],

[Paragraph 1: Identity and Intent]

[Paragraph 2: Summary and Transition]

[Paragraph 3: Skill Match #1]

[Paragraph 4: Skill Match #2]

[Paragraph 5: Why This Company]

[Paragraph 6: Conclusion]

Sincerely,
[Your Name]
```

**Confirmation message:**

```
✓ Cover letter saved to: src/data/cover-letters/[filename].md

**Summary:**
- Company: [Company Name]
- Role: [Role Title]
- Top skills highlighted: [Skill 1], [Skill 2]
- Accomplishments referenced: [count]
- Word count: [approximate count]

**Next steps:**
1. Review the file for final edits
2. Customize the recipient name if known
3. Update the date to when you'll submit
4. Save as PDF or paste into application system

**Related files:**
- Job analysis: [path]
- Resume: src/data/resumes/[company]-[role]-resume.md (if exists)
- CV: src/data/cv-[lastname].md (if needed)
```

</process>

<human_in_the_loop>

## Review and Approval Protocol

This skill follows the established human-in-the-loop pattern from Phase 18:

**Draft Presentation:**
- Present complete draft with rationale before saving
- Show content selection reasoning (scores, matching table)
- Explain why specific accomplishments were chosen
- Document company research sources

**User Control Points:**
1. **Content Selection** - User confirms accomplishments feel authentic
2. **Tone and Voice** - User verifies the letter sounds like them
3. **Company Research** - User validates research is current and accurate
4. **Story Themes** - User approves the narrative approach
5. **Final Output** - User explicitly approves before saving

**No Auto-Generation:**
- Never save cover letter without user review
- Never submit or send on user's behalf
- Always require explicit approval

**Revision Support:**
- Support multiple revision rounds
- Maintain structure while adapting content
- Preserve user's authentic voice

**Quality Gates:**
- Verify 6-paragraph structure followed
- Confirm style guidelines met
- Check success criteria (90-second read, tailored feel, clear skill mapping)
- Validate no failure conditions present (generic openings, company-agnostic statements, resume repetition)

</human_in_the_loop>

<examples>

## Example Invocations

**With both job posting and job-analysis:**
```
/cover-letter-generator https://job-boards.greenhouse.io/coinbase/jobs/123 src/data/job-analysis/coinbase-senior-staff-product-designer-platform.md
```

**With only job-analysis file:**
```
/cover-letter-generator src/data/job-analysis/aws-principal-ux-designer-applied-ai.md
```

**With only job posting (will prompt to run job-matcher first):**
```
/cover-letter-generator https://boards.greenhouse.io/stripe/jobs/456
```

</examples>

<anti_patterns>

## What NOT to Do

**Don't:**
- Generate generic, company-agnostic cover letters
- Repeat resume bullets verbatim
- Use buzzwords without evidence ("passionate", "detail-oriented", "team player")
- Make unsupported claims
- Write more than one page
- Skip company research
- Use formal, outdated language
- Prioritize being clever over being clear
- Auto-save without user review

**Do:**
- Tailor every letter to the specific company
- Expand beyond resume with context and narrative
- Use specific examples and outcomes
- Back every claim with evidence
- Keep to 6 paragraphs, ~300-400 words
- Research company thoroughly
- Write professionally but authentically
- Prioritize clarity and specificity
- Require explicit user approval

</anti_patterns>

