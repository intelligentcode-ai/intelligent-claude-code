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
1. Check memory before action: `/icc-memory-search [context]`
2. Apply existing learnings if found
3. Execute work with learning context
4. Store new patterns: `/icc-memory-store [entity]`

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

## Integration Commands

### Memory Operations
- `/icc-memory-search [query]` - Search before work
- `/icc-memory-store [entity]` - Store after work
- `/icc-learning-capture [outcome]` - Capture learning from outcome
- `/icc-learning-store [learning]` - Store structured learning

### Learning Application
**Memory-First Process:** Always search memory before action → Apply any relevant learnings found → Enhance action with learning context → Execute with learning awareness

### Error Recovery
**Recovery Decision:** Determine if error is auto-recoverable → If yes: execute recovery strategy → If no: create fix task and continue other work

---
*Consolidated learning patterns for intelligent-claude-code system*