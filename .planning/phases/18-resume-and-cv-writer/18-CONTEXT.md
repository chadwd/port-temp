# Phase 18: Resume and CV Writer - Context

**Gathered:** 2026-01-19
**Status:** Ready for planning

<vision>
## How This Should Work

A templated document generation system that intelligently selects relevant content from profile.yaml to create professional resumes and CVs. The system generates an initial draft following modern resume standards (Google XYZ formula, ATS-optimized formatting, quantified achievements), then allows manual review and adjustment before final output.

The user invokes a Claude skill (similar to existing skills like Job Matcher), provides context about the target role or purpose, and receives a well-formatted document. The system knows which accomplishments are most relevant based on the context, but the user retains control to swap items or adjust emphasis before finalizing.

The skill generates compliant drafts that follow professional standards automatically, but also provides guidance on where accomplishments could be strengthened with better metrics or clearer impact statements - a learning-oriented approach that improves both the document and the user's understanding of what makes strong resume content.

</vision>

<essential>
## What Must Be Nailed

- **Smart content selection logic** - The system must intelligently determine which accomplishments from profile.yaml are most relevant for a given role or context. This is the core value - if the selection is smart, the rest is formatting.

- **Modern resume standards compliance** - Output must automatically follow 2026 resume best practices:
  - Google XYZ Formula (Accomplished X as measured by Y by doing Z)
  - ATS-optimized formatting (single column, clean structure, standard fonts)
  - Quantified achievements with metrics (percentages, dollar amounts, timeframes)
  - Professional structure (header, summary, experience, skills, education)

- **Manual override capability** - User can review the initial generation and adjust which accomplishments are included or how they're emphasized before final output

</essential>

<boundaries>
## What's Out of Scope

- **PDF generation and styling** - Phase 18 generates markdown and plain text only. PDF conversion with professional styling can be added in a future phase if needed.

- **Cover letter generation** - Focus on resume/CV only. Cover letters are a separate use case that could be another phase.

- **LinkedIn profile sync** - Not syncing to LinkedIn or other platforms. This phase is purely about document generation.

- **Multi-language support** - English only for now. Internationalization can come later if there's a need.

</boundaries>

<specifics>
## Specific Ideas

**Skill invocation pattern**: Should work like existing Claude skills - user runs something like `/generate-resume [context]` and gets output, similar to the Job Matcher or Profile Updater patterns.

**Two-phase approach**:
- **Phase 18-01: Resume Generator** - Focus on 1-2 page job application resumes (tactical, achievement-focused, tailored to specific roles)
- **Phase 18-02: CV Generator** - Comprehensive CV format (full career history, publications, speaking, teaching)

Both phases share the same underlying intelligence and profile data, but use different templates and selection logic.

**Output formats**:
- Markdown (source format) - human-readable, version controlled, easily edited
- Plain text (ATS-friendly) - clean text optimized for applicant tracking systems

**Reference materials**: The system should be informed by the professional standards documented in:
- `src/data/resume-guidelines/modern-resume-architecture.md`
- `src/data/resume-guidelines/modern-resume-standards-2026.md`
- `src/data/resume-guidelines/strategic-framework-resume.md`

These documents contain current best practices including:
- The Google XYZ formula for achievement-based bullets
- ATS optimization requirements (single column, no graphics, standard fonts)
- Strategic positioning and tailoring principles
- Professional formatting standards for 2026

</specifics>

<notes>
## Additional Context

**Integration with existing phases**: This phase builds on the professional data infrastructure from Phases 15-17:
- Phase 15: Metadata schema and profile.yaml structure
- Phase 16: Profile data system with single source of truth
- Phase 17: Impact schema foundation (Accomplishment/Measure/Method)

The resume/CV writer leverages all this structured data to generate professional documents on demand.

**Philosophy**: The system should generate high-quality output that follows professional standards automatically, but also educate the user by highlighting where accomplishments could be strengthened. This creates a virtuous cycle - better source data leads to better resumes, and insights from resume generation lead to better source data.

**Template-based with intelligence**: Unlike generic resume builders, this system has access to rich structured data about the user's career. The templates should be smart enough to select and format content appropriately, not just fill in blanks.

</notes>

---

*Phase: 18-resume-and-cv-writer*
*Context gathered: 2026-01-19*
