# Chunked File Writing

> Prevent timeout errors when writing large files by breaking content into manageable chunks

## Problem

Large file writes (150+ lines) frequently timeout, causing:
- Lost work and wasted time
- Need to regenerate content
- User frustration from repeated failures

## Solution: Chunked Writing Pattern

### Thresholds

| File Size | Strategy |
|-----------|----------|
| < 100 lines | Single Write - safe to write in one operation |
| 100-200 lines | Caution zone - consider splitting |
| > 200 lines | MUST chunk - split into sections |

### Chunking Strategy

1. **Plan sections first** - Before writing, identify logical sections
2. **Write skeleton** - Create file with headers/structure only (~50 lines)
3. **Fill sections** - Use Edit tool to add content section by section
4. **Verify after each** - Confirm each chunk succeeded before next

### Implementation Pattern

```
Step 1: Create skeleton (Write tool)
- File header/frontmatter
- Section headings only
- Placeholder comments marking where content goes

Step 2: Fill each section (Edit tool, one at a time)
- Replace placeholder with actual content
- Keep each edit under 80 lines
- Verify success before proceeding

Step 3: Final verification
- Read file to confirm complete
- Check line count matches expected
```

### Example: Writing a 250-line Resume

**Wrong approach:**
```
Write entire 250-line resume → TIMEOUT
```

**Correct approach:**
```
1. Write skeleton (~30 lines):
   - Header with name/contact
   - ## Summary (placeholder)
   - ## Experience (placeholder)
   - ## Skills (placeholder)

2. Edit to add Summary section (~40 lines)
3. Edit to add first job (~50 lines)
4. Edit to add second job (~50 lines)
5. Edit to add third job (~50 lines)
6. Edit to add Skills section (~30 lines)
```

### Section Size Guidelines

| Content Type | Target Lines Per Chunk |
|--------------|----------------------|
| Frontmatter/headers | 20-30 lines |
| Job entries | 40-60 lines each |
| Skills sections | 30-40 lines |
| Narrative paragraphs | 50-70 lines |

### Warning Signs to Chunk

Before writing, check:
- [ ] Is total content > 150 lines?
- [ ] Does content have natural sections?
- [ ] Is this a document type that's failed before?

If any are true → USE CHUNKING

### Recovery from Timeout

If a write times out:
1. Check what was actually written: `Read` the file
2. Identify missing sections
3. Use `Edit` to add remaining content in chunks
4. Never retry the full write

## Anti-patterns

**DON'T:**
- Write entire large file in one operation
- Assume "this time it will work"
- Use Write tool for content > 150 lines
- Retry the same failing approach

**DO:**
- Plan sections before writing
- Use skeleton + Edit pattern
- Keep each operation under 80 lines of new content
- Verify after each chunk

## Quick Reference

```
IF file_lines > 150:
    1. Write skeleton (headers only)
    2. FOR each section:
        Edit to add section content (< 80 lines)
        Verify success
    3. Final read to confirm
ELSE:
    Single Write is acceptable
```
