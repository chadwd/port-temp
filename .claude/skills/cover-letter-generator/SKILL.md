---
name: cover-letter-generator
description: Generate tailored, high-impact cover letters from profile data and job analysis
location: user
---

# Cover Letter Generator

<purpose>
Generate tailored cover letters that function as **the closing argument of your marketing case** — the final piece that makes the hiring manager feel they've already found their person. Where the resume proves you *can* do the work and the job analysis builds the positioning strategy, the cover letter makes the emotional and strategic case for *why you will* deliver for them specifically.

**Goal:** Produce cover letters that answer the employer's unspoken question: *"Will this person actually solve our problems, or just fill a seat?"* Lead with authentic personal stake in their mission, promise specific outcomes mapped to their pain points, and position yourself as someone already thinking about what success looks like in this role — not just a qualified candidate shopping for a job.

**Character target:** 1,500-2,400 characters (including spaces)

**Output:** Professional cover letters in markdown format, optimized for confident Senior/Staff/Principal positioning. Each letter should feel like a value proposition with a personal signature, not a formal application document.
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
- **Value positioning strategy:** Value thesis and 3 positioning themes (the marketing case from job-matcher)
- **Role context:** Level, domain focus, company stage, team size
- **Required skills:** Top 5-7 skills/domains (already extracted by job-matcher)
- **Pain points:** Problem this role solves, team challenges, success metrics
- **Cultural signals:** Collaboration style, decision-making approach, values
- **Pre-scored content:** Job-matcher's recommended accomplishments with relevance scores
- **Company research:** Mission, product, differentiators, recent news

**Key advantage:** Job-matcher has already built the value positioning strategy — the value thesis and positioning themes. The cover letter's job is to translate that strategy into a persuasive narrative. The resume *proves* the case with evidence; the cover letter *makes* the case with conviction and forward commitment.

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

## Step 5: Generate Cover Letter Using 3-Paragraph Forward-Looking Structure

**Structure (Optimized for Senior/Staff/Principal roles):**

This 3-paragraph structure builds the marketing case as a narrative arc: *why you care* → *what you bring* → *what you'll deliver*. Each paragraph reinforces the value positioning themes from job-matcher while reading as an authentic, personal letter — not a sales pitch.

**The marketing arc:**
1. **Hook** — Establish personal stake so they know you're not just applying everywhere (differentiator)
2. **Proof** — State your capabilities as identity, not claims, aligned to their needs (value thesis in human form)
3. **Close** — Promise specific outcomes mapped to their pain points (the ask: hire me because I will do THIS)

### Paragraph 1: Personal Stake + Mission Alignment (The Hook)

**Purpose:**
- Open the marketing case with authenticity — show this isn't a mass application
- Demonstrate you're not job-shopping—you care about THIS specific problem
- Lead with why you want to help them, not why they should hire you
- **Marketing role:** This paragraph earns the reader's attention and trust. Without it, paragraphs 2-3 read as generic pitching.

**Rules:**
- Start with the role you're applying for
- Reference their exact mission/vision language (from company research)
- Show specific, authentic personal stake (user of product, policy advocacy, domain passion)
- No generic "I'm excited about..." statements

**Strong example:**
"I'm applying for the [Role Title] role because I want to help [Company] [their specific mission in their words]. I care about the mission in a practical way. [Specific evidence of personal stake: active user since X, supported Y policy, built Z in personal time]. I want this technology built [values that align with company culture]."

**What makes this work:**
- Specific dates/actions prove authenticity ("active crypto user since 2023" not "interested in crypto")
- Company-specific language ("onchain platform" not "blockchain products")
- Values alignment with evidence ("pro-innovation policy support" shows understanding of regulatory challenges)

### Paragraph 2: Capability Statements + Systems Thinking (The Proof)

**Purpose:**
- Establish core capabilities as statements of identity, not claims to prove
- Show how you think about the work (systems-minded, developer empathy, quality bars)
- Position yourself at the right level (staff/principal language)
- **Marketing role:** This paragraph delivers the value thesis from job-matcher in first person. It should reinforce positioning themes 1 and 2, stated as *who you are*, not what you've done.

**Rules:**
- Lead with level and mindset: "[level]-level, [thinking-style] product designer"
- List capabilities as "I build/align/ship" not "I have experience in"
- Emphasize WHAT you do and HOW you think, not where you've worked
- Include dev-ready/implementation language for platform roles
- Use directional public metrics only (never hard private KPIs in cover letters)

**Strong example:**
"I'm a [level]-level, systems-minded product designer with [X]+ years across [accurate domain] products, deep web and mobile shipping experience, and platform design systems leadership. I build reusable patterns, tokens, and component rules that reduce fragmentation. I align product vision and design intent with engineering implementation through clear states, acceptance criteria, and dev-ready specs. I also ship reliably on high-stakes work by turning ambiguity into phased plans that Product and Engineering can execute, and by protecting usability, edge cases, and customer trust."

**What makes this work:**
- "Systems-minded" (not "I have systems thinking skills")
- "I build/align/ship" (active identity statements)
- Developer empathy language ("dev-ready specs", "engineering implementation")
- Outcome-oriented framing (reduce fragmentation, protect trust)

### Paragraph 3: Forward-Looking Value Commitment + Specific Outcomes (The Close)

**Purpose:**
- Promise what you'll deliver if hired (not what you've done before)
- Map your capabilities directly to their pain points
- Show you've already thought about what success looks like in this role
- **Marketing role:** This is the closing argument — the moment you convert interest into action. Use positioning theme 3 (unique differentiator) to lead, then map specific outcomes to their pain points. The reader should finish thinking "this person has already started solving our problems."

**Rules:**
- Start with relevant innovation/edge you bring ("I also push practical AI workflows...")
- Specificity matters: name tools, techniques, or approaches
- Use "If we work together, I will take responsibility for..." structure
- List 3-4 specific outcomes that matter to THIS role/team
- End with confidence and invitation to talk

**Strong example:**
"I also push practical AI workflows that speed delivery without cutting corners. I've been building AI-assisted design-to-code workflows ([specific tools]) to reduce handoff confusion and shorten cycle time, while treating AI as a quality multiplier with guardrails. If we work together, I will take responsibility for outcomes that matter in [Team/Domain]: [Outcome 1 matching their pain point], [Outcome 2 matching their pain point], [Outcome 3 matching their pain point], and [Outcome 4 if relevant]. Thank you for your time and consideration. I would love to talk."

**What makes this work:**
- Forward-looking commitment ("I will take responsibility for...")
- Specific outcomes mapped to job description pain points
- Confident close ("I would love to talk" not "I hope to hear from you")
- Shows you've already thought about what you'd own

**Mapping outcomes to their pain points:**

From job-analysis, extract their top 3-4 pain points and map to outcomes you'll own:

| Their Pain Point | Your Outcome Commitment |
|-----------------|-------------------------|
| Cross-product fragmentation | "reducing UX drift across surfaces" |
| Complexity gap (novice vs expert users) | "improving trust in complex flows" |
| Speed + quality balance | "increasing velocity through better design-to-dev clarity" |
| Strategic design leadership | "mentoring designers to level up systems thinking and craft" |

These should be SPECIFIC to the role, not generic ("deliver great experiences").

## Step 6: Apply Style Guidelines and Character Count

Before presenting to user, verify the draft meets these criteria:

**Character target:** 1,500-2,400 characters (including spaces)
- Use character count, not word count
- This is the length hiring managers actually read
- Tighter = more impact per word

**Style:**
- Clear and concise (prefer short sentences)
- Professional but human
- Confident, not arrogant (lead with "I will" not "I hope")
- Specific over clever (name tools, metrics, outcomes)
- Active voice and identity statements ("I build" not "I have experience building")

**Critical Rules - Metrics:**
- **NEVER use private KPIs from profile.yaml private_metrics section in cover letters**
- Use only directional "public" language from accomplishments (e.g., "high volume of work" not "155 tasks")
- Save hard numbers for interviews
- Exception: If a metric is already public-facing or in published case studies, it's fair game

**Avoid (failure conditions):**
- Generic openings ("I am excited to apply...")
- Company-agnostic statements (could work for any company)
- Repeating resume bullets verbatim
- Backward-looking only (no forward commitment)
- Buzzwords without evidence ("passionate", "detail-oriented")
- Private metrics (88.7% retention, 155 tasks, 200% growth, etc.)

**Success criteria:**
- Shows authentic personal stake in mission (not generic interest)
- Promises specific outcomes, not just past accomplishments
- Uses company's exact language for mission/products
- Feels like you're already thinking about solving their problems
- Reinforces all 3 positioning themes from job-matcher's value positioning strategy
- The reader finishes thinking "this person will deliver for us" — not just "this person is qualified"
- Can be read in 60-90 seconds
- Within 1,500-2,400 character range

## Step 7: Present Draft with Rationale

Present the cover letter draft to the user with clear explanation of content selection:

```
# Cover Letter Draft

[Company Name] - [Role Title]

---

[6-paragraph cover letter]

---

## Content Selection Rationale

**Value Positioning Strategy (from job-matcher):**
- Value thesis: [thesis statement used to guide the letter]
- Theme 1 → covered in: [which paragraph]
- Theme 2 → covered in: [which paragraph]
- Theme 3 → covered in: [which paragraph]

**Top Skills Selected (from matching table):**
1. [Skill 1] - Score: [XX]/100
   - JD phrase: "[exact phrase from job description]"
   - Match: [how candidate matches]
   - Positioning theme reinforced: [Theme 1/2/3]

2. [Skill 2] - Score: [XX]/100
   - JD phrase: "[exact phrase from job description]"
   - Match: [how candidate matches]
   - Positioning theme reinforced: [Theme 1/2/3]

**Company Research:**
- Values-driven reason: [selected reason]
- Product/direction reason: [selected reason]

**Accomplishments Used:**
- [List of accomplishments from profile.yaml referenced in the letter]
- [Why each was selected and which positioning theme it supports]

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
- Treat the cover letter as the closing argument of your marketing case (job-matcher builds the strategy, resume proves the evidence, cover letter makes the ask)
- Tailor every letter to the specific company
- Show authentic personal stake in mission (user of product, policy support, domain passion)
- Lead with forward-looking value commitments ("I will take responsibility for...")
- Use capability statements as identity ("I build" not "I have experience")
- Map promised outcomes to their specific pain points using positioning themes from job-matcher
- Ensure all 3 positioning themes are reinforced across the 3 paragraphs
- Keep to 1,500-2,400 characters
- Use only public/directional metrics (never private KPIs)
- Research company thoroughly for exact language
- Write professionally but authentically
- Require explicit user approval

</anti_patterns>

