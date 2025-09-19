# Shared Learning Patterns

**MANDATORY:** MUST use learning patterns. Auto-correct violations.

**PURPOSE:** Complete learning, memory, and AgentTask execution patterns

## Core Learning Patterns

### Learning Storage Pattern
**Location:** memory/[topic]/[subtopic].md
**Structure:** Topic-based files with dated entries (newest first)
**Entry Format:** Date header, context, problem, solution, code examples
**Topics:** Organized by domain (authentication, implementation, performance, etc.)

### AgentTask Learning Logic
**Learning Capture:** Pattern stored from successful AgentTask execution
**Learning Application:** Memory patterns successfully applied in AgentTask context
**Learning Reference:** Existing patterns referenced during AgentTask generation

### Learning Application Detection
**Learning Patterns:**
- "Based on previous learning" → Process improvement applied
- "Applying lesson from" → Knowledge transfer successful
- "To prevent repeat of" → Issue prevention active
- "Learning from [Learning-ID]" → Specific pattern referenced
- Pattern breaking (novel solution) → Innovation documented

### Memory-First Pattern
**Process:**
1. Embed relevant learnings directly in AgentTask during generation
2. No runtime memory lookups needed (all in AgentTask)
3. Execute work with embedded learning context
4. Store new patterns in version control (AgentTask retrospective)

### Learning Processing Pattern
**Pattern Recognition:** Identify successful patterns during AgentTask execution → Store learning entity with pattern details → Reference in future AgentTask contexts

**Learning Creation Process:** Store learning with pattern type, AgentTask context, observations about what/why/how, and application guidance

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
Memory embedding and storage are handled during AgentTask lifecycle:
- **Embedding**: Relevant learnings copied into AgentTask context during generation
- **No Search**: All needed learnings are embedded, no runtime lookups
- **Storage**: New learnings stored in version-controlled memory/
- **Learning Capture**: Automatic during AgentTask completion
- **Learning Format**: Markdown files with YAML frontmatter
- **Details**: See memory-operations.md for version-controlled patterns

### Learning Application
**AgentTask-Embedded Process:** AgentTask already contains relevant learnings → No search needed during execution → Work with embedded context → Store new learnings post-execution

### Issue Recovery
**Recovery Decision:** Determine if issue is auto-recoverable → If yes: execute recovery strategy → If no: create fix task and continue other work

---
*Consolidated learning patterns for intelligent-claude-code system*