# Commands, Skills, and Hooks: When to Use What

> A practical guide to Claude Code's three extension mechanisms

## The Three Mechanisms

### 1. Slash Commands (`/command`)

**What:** Simple text expansion - replaces `/command` with a prompt template.

**When to use:**
- Quick shortcuts that inject context or instructions
- Boilerplate prompts you use repeatedly
- Simple context injection without logic

**Limitation:** No logic, no file I/O, just text substitution.

**Example use cases:**
- `/commit` - Expands to commit message instructions
- `/review` - Injects code review checklist
- `/explain` - Adds "explain this code" prompt structure

**Structure:** Simple markdown file in `.claude/commands/`

```markdown
---
description: Short description shown in command list
---

The prompt text that gets injected when you type /command-name
```

---

### 2. Skills (`/skill-name` via SKILL.md)

**What:** Rich prompts with dynamic context, multi-step processes, and structured output formats.

**When to use:**
- Multi-step workflows
- Processes that need to read/write files
- Tasks with structured output formats
- Workflows with examples and anti-patterns

**Power features:**
- Reference files with `@path/to/file` for dynamic context
- Define step-by-step processes
- Include examples and anti-patterns
- Specify output formats

**Example use cases:**
- `/job-matcher` - Reads profile, scores against job posting, writes analysis
- `/resume-generator` - Multi-step resume generation with templates
- `/new-case-study` - Scaffolds new content with correct structure

**Structure:** SKILL.md file in `.claude/skills/skill-name/`

```markdown
---
name: skill-name
description: What this skill does
---

<purpose>
What problem this skill solves
</purpose>

<context>
@path/to/file.yaml - Description of this file
@another/file.ts - Why this file matters
</context>

<process>
## Step 1: First step
What to do...

## Step 2: Second step
What to do next...
</process>

<output>
Expected output format...
</output>
```

---

### 3. Hooks (Automatic Triggers)

**What:** Shell commands that run automatically on events (before/after tool use, session start, etc.).

**When to use:**
- Validation that should happen without asking
- Automation (linting, building, formatting)
- Notifications
- Policy enforcement
- Blocking dangerous operations

**Hook types:**
| Type | When It Fires |
|------|---------------|
| `PreToolUse` | Before a tool runs (can block) |
| `PostToolUse` | After a tool completes |
| `Stop` | When Claude finishes responding |
| `SessionStart` | When a new session begins |
| `UserPromptSubmit` | When user sends a message |

**Example use cases:**
- Run `npm run build` after editing schema-validated files
- Lint code after writing new files
- Block commits to protected branches
- Send notification when long task completes

**Structure:** JSON in `.claude/settings.json` or `.claude/settings.local.json`

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": {
          "tool": ["Write", "Edit"],
          "path": "src/data/profile.yaml"
        },
        "command": "npm run build 2>&1 | head -20"
      }
    ]
  }
}
```

---

## Decision Framework

```
┌─────────────────────────────────────────────────────────┐
│   Should it happen AUTOMATICALLY without user asking?   │
└─────────────────────────────────────────────────────────┘
                          │
              ┌───────────┴───────────┐
              │                       │
             YES                      NO
              │                       │
              ▼                       ▼
           HOOK              ┌────────────────────────┐
                             │  Just injecting text/  │
                             │  context into prompt?  │
                             └────────────────────────┘
                                        │
                            ┌───────────┴───────────┐
                            │                       │
                           YES                      NO
                            │                       │
                            ▼                       ▼
                     SLASH COMMAND               SKILL
                     (simple text)        (multi-step workflow)
```

### Quick Decision Questions

1. **"Should this run without me asking?"** → Hook
2. **"Is this just a prompt template?"** → Slash Command
3. **"Does this need to read files, follow steps, produce structured output?"** → Skill

---

## Comparison Table

| Aspect | Slash Command | Skill | Hook |
|--------|---------------|-------|------|
| **Invocation** | User types `/command` | User types `/skill` | Automatic on event |
| **File I/O** | No | Yes | Via shell command |
| **Logic/Steps** | No | Yes | Via shell script |
| **Dynamic context** | No | Yes (`@file`) | No |
| **Output format** | Just text | Structured | Shell output |
| **Can block actions** | No | No | Yes (PreToolUse) |
| **Location** | `.claude/commands/` | `.claude/skills/name/SKILL.md` | `.claude/settings.json` |

---

## Common Patterns

### Pattern 1: Scaffolding Skill

When you have a repeatable structure to create (new component, new page, new content):

```markdown
<process>
## Step 1: Create directory structure
mkdir -p path/to/new-thing

## Step 2: Create file with template
Write file with frontmatter/boilerplate

## Step 3: Report what was created
List files created for user verification
</process>
```

### Pattern 2: Analysis Skill

When you need to read data, process it, and produce a report:

```markdown
<context>
@src/data/source.yaml - Data to analyze
</context>

<process>
## Step 1: Load and parse data
## Step 2: Apply scoring/analysis logic
## Step 3: Generate structured output
## Step 4: Write to output location
</process>

<output>
Structured format for the analysis report...
</output>
```

### Pattern 3: Validation Hook

When edits to certain files should trigger validation:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": {
          "tool": ["Write", "Edit"],
          "path": "**/*.yaml"
        },
        "command": "npm run validate"
      }
    ]
  }
}
```

### Pattern 4: Guard Hook

When certain actions should be blocked or warned:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": {
          "tool": "Bash",
          "command": "git push.*--force"
        },
        "command": "echo 'BLOCKED: Force push requires explicit approval' && exit 1"
      }
    ]
  }
}
```

---

## Anti-Patterns to Avoid

### 1. Skill for Simple Text Injection
**Wrong:** Creating a SKILL.md just to inject a prompt template
**Right:** Use a slash command instead

### 2. Skill for Internal Guidance
**Wrong:** Creating a skill with instructions for how Claude should behave
**Right:** Put behavioral guidance in CLAUDE.md

### 3. Manual Validation That Should Be Automatic
**Wrong:** Telling user to run `npm run build` after every edit
**Right:** Use a PostToolUse hook to run it automatically

### 4. Hook for Interactive Workflows
**Wrong:** Using hooks for multi-step processes that need user input
**Right:** Use a skill that can pause for user decisions

---

## Real Examples from This Project

### Correctly Used: Skills

| Skill | Why It's a Skill |
|-------|------------------|
| `/job-matcher` | Reads files, scores content, writes analysis - multi-step |
| `/resume-generator` | Reads analysis + profile, generates formatted output |
| `/cv-generator` | Comprehensive document generation with structure |
| `/profile-updater` | Extracts from source docs, validates, proposes changes |
| `/new-case-study` | Scaffolds directories and files with templates |

### Correctly Used: Hook

| Hook | Why It's a Hook |
|------|-----------------|
| Build validation on profile.yaml | Should happen automatically after edits |

### Correctly Avoided: Slash Commands

This project doesn't have simple text injection needs - all workflows are multi-step, so skills are appropriate.

---

## Quick Reference Card

```
SLASH COMMAND = Simple prompt injection
  └─ Location: .claude/commands/name.md
  └─ Use for: Boilerplate prompts, quick context

SKILL = Multi-step workflow with file access
  └─ Location: .claude/skills/name/SKILL.md
  └─ Use for: Processes, generation, analysis

HOOK = Automatic trigger on events
  └─ Location: .claude/settings.json → hooks
  └─ Use for: Validation, automation, blocking
```

---

## Further Reading

- Claude Code documentation: `/help` in Claude Code
- Skills format: Check existing skills in `.claude/skills/`
- Hooks reference: Claude Code settings documentation
