# Shared Learning Patterns

**MANDATORY:** MUST use learning patterns. Auto-correct violations.

**PURPOSE:** Complete learning, memory, and error handling patterns

## Core Learning Patterns

### Learning Storage Pattern
**Location:** memory/[topic]/[subtopic].md
**Structure:** Topic-based files with dated entries (newest first)
**Entry Format:** Date header, context, problem, solution, code examples
**Topics:** Organized by domain (authentication, errors, performance, etc.)

### Error Forgiveness Logic
**First Error:** No penalty + Learning created + Pattern stored
**Repeated Error:** 2x penalty + Reference existing learning
**Learning Application:** Memory patterns successfully applied

### Learning Application Detection
**Learning Patterns:**
- "Based on previous learning" → Process improvement applied
- "Applying lesson from" → Knowledge transfer successful
- "To prevent repeat of" → Error prevention active
- "Learning from [Learning-ID]" → Specific pattern referenced
- Pattern breaking (novel solution) → Innovation documented

### Memory-First Pattern
**Process:**
1. Embed relevant learnings directly in PRB during generation
2. No runtime memory lookups needed (all in PRB)
3. Execute work with embedded learning context
4. Store new patterns in version control (PRB retrospective)

### Error Processing Pattern
**First Error Detected:** Search memory for similar error → If not found: create learning entity, no penalty → If found: apply 2x penalty, reference existing learning

**Learning Creation Process:** Store learning with error type, task context, observations about what/why/how, and specific prevention steps

### Recovery Strategies
**Auto-Recoverable:**
- Test failures → Re-run with fixes
- Lint errors → Auto-format  
- Import errors → Add missing imports
- Type errors → Fix definitions

**Non-Recoverable:**
- Create fix task
- Log for manual review
- Continue with other work
- Escalate if critical

## Integration Patterns

### Memory Operations
Memory embedding and storage are handled during PRB lifecycle:
- **Embedding**: Relevant learnings copied into PRB context during generation
- **No Search**: All needed learnings are embedded, no runtime lookups
- **Storage**: New learnings stored in version-controlled memory/
- **Learning Capture**: Automatic during PRB completion
- **Learning Format**: Markdown files with YAML frontmatter
- **Details**: See memory-operations.md for version-controlled patterns

### Learning Application
**PRB-Embedded Process:** PRB already contains relevant learnings → No search needed during execution → Work with embedded context → Store new learnings post-execution

### Error Recovery
**Recovery Decision:** Determine if error is auto-recoverable → If yes: execute recovery strategy → If no: create fix task and continue other work

---
*Consolidated learning patterns for intelligent-claude-code system*