# Phase 15: Metadata Schema Design - Context

**Gathered:** 2026-01-19
**Status:** Ready for planning (15.02 revision)

<vision>
## How This Should Work

Phase 15 evolved beyond its original scope. 15.01 is complete (profile.yaml and schema built). The remaining work splits into two distinct agents:

**15.02: Profile Updater Agent**
When new source materials come in (performance reviews, project summaries, career docs), this agent processes them and proposes updates to profile.yaml. It extracts accomplishments in XYZ format (Accomplished X, Measured by Y, By doing Z), validates data completeness, and flags gaps. Human always approves changes - agent proposes, never auto-edits.

**15.03: Job Matcher Agent** (future phase)
Given a job posting, this agent pulls the most relevant accomplishments from profile.yaml that demonstrate immediate value for that specific role. Contextual retrieval for job applications.

</vision>

<essential>
## What Must Be Nailed

For the Profile Updater Agent (15.02):

- **XYZ extraction accuracy** - Get the accomplishment → metric → method structure right every time
- **Human-in-the-loop** - Always show changes for approval, never auto-commit to YAML
- **Aggressive gap detection** - Flag missing metrics, weak statements, nulls, and incomplete data. If something's missing, request it.
- **Self-validation** - Agent validates its own output against the schema; no nulls, no weak statements slip through

</essential>

<boundaries>
## What's Out of Scope

- **Job matching** - That's 15.03, this agent focuses only on keeping profile.yaml accurate
- **PDF/document generation** - Output formatting for resumes/LinkedIn is a separate concern
- **External API integrations** - Works only with local files, no LinkedIn scraping or API calls
- **Auto-editing** - All changes require human review and approval

</boundaries>

<specifics>
## Specific Ideas

No specific requirements - open to whatever approach works best for:
- Interactive vs batch processing
- Output formatting (diff-style, proposal format, etc.)
- Question flow when information is incomplete

</specifics>

<notes>
## Additional Context

**Background:** 15.01 encountered some issues during execution but successfully delivered profile.yaml and schema. The original 15.02 plan was a "validation agent" but the vision has expanded to a full **source ingestion and data maintenance pipeline**.

**Key insight:** The validation capabilities from the original 15.02 plan become embedded within the Profile Updater Agent - it validates as part of its workflow, not as a standalone tool.

**Future phases:**
- 15.03: Job Matcher Agent (extract relevant accomplishments for job applications)

</notes>

---

*Phase: 15-metadata-schema-design*
*Context gathered: 2026-01-19*
