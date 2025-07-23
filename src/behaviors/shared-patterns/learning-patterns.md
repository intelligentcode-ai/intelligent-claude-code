# Shared Learning Patterns

**MANDATORY:** MUST use learning patterns. Auto-correct violations.

**PURPOSE:** Complete learning, memory, and error handling patterns

## Core Learning Patterns

### Learning Storage Pattern
**Naming:** Learning-[ErrorType]-[YYYY-MM-DD]
**Location:** ~/.claude/memory/entities/Learning/[YYYY]/[MM]/
**Structure:** Learning entities include ID, type, creation timestamp, context information, observations array, prevention steps, and relevance score

### Error Forgiveness Logic
**First Error:** No penalty + Learning created + Pattern stored
**Repeated Error:** 2x penalty + Reference existing learning
**Learning Application:** +0.5P/Q bonus for references

### Learning Application Detection
**Bonus Triggers:**
- "Based on previous learning" → +0.5P (Process bonus)
- "Applying lesson from" → +0.5P (Application bonus)
- "To prevent repeat of" → +0.5Q (Quality bonus)
- "Learning from [Learning-ID]" → +0.5P (Specific reference)
- Pattern breaking (novel solution) → +1.0P/Q (Innovation bonus)

### Memory-First Pattern
**Process:**
1. Check memory before action (built into workflow steps)
2. Apply existing learnings if found
3. Execute work with learning context
4. Store new patterns (handled by workflow retrospective)

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
Memory search and storage are handled automatically by the workflow:
- **Search**: Built into workflow steps using SearchMemory pattern (outer step 1, inner step 2)
- **Storage**: Handled by retrospective phases using StoreInMemory pattern (outer step 7, inner step 8)
- **Learning Capture**: Automatic during task/story retrospectives
- **Learning Storage**: Workflow creates learning entities directly via memory-operations.md
- **Details**: See memory-operations.md for complete file-based memory patterns

### Learning Application
**Memory-First Process:** Always search memory before action → Apply any relevant learnings found → Enhance action with learning context → Execute with learning awareness

### Error Recovery
**Recovery Decision:** Determine if error is auto-recoverable → If yes: execute recovery strategy → If no: create fix task and continue other work

---
*Consolidated learning patterns for intelligent-claude-code system*