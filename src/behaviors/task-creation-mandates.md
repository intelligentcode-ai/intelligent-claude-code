# PRB Creation Mandates

**MANDATORY:** MUST use memory-first + role-in-title + complexity-based templates. Auto-correct violations.

**PURPOSE:** Mandatory behavioral requirements for ALL PRB creation with memory-first enforcement.

## Imports
@../workflow-templates/executable-workflow.md

## MANDATORY RULES

### Memory Search First - ALWAYS
**Every PRB creation MUST begin with memory search**
- Search memory/[topic]/[subtopic].md for similar work patterns (e.g., memory/authentication/oauth2-patterns.md)
- Apply existing learnings and patterns to current PRB
- Embed top 2-3 relevant memory entries directly in PRB context
- Use /icc-search-memory before any PRB generation
- NO PRB generation without memory search first

### Role in Title - ALWAYS
**Every PRB title MUST include role in square brackets**
- Format: "[Role] Description"
- Examples: "[Developer] Fix auth", "[AI-Engineer] Add ML"

### Complexity-Based Templates
**Auto-selected by score using template hierarchy:**
- **Nano (0-2):** Trivial (typos, configs)
- **Tiny (3-5):** Single-file (<50 lines)
- **Medium (6-15):** Multi-file features
- **Large (16-30):** Complex w/ coordination
- **Mega (30+):** System-wide changes

**Scoring factors:** Files + Lines + External APIs + Security + Coordination
**Template Loading:** Use hierarchy: project → .claude → ~/.claude

### Parallelization - WHERE APPLICABLE
**Identify and mark parallel execution opportunities**
- Non-conflicting subtasks execute simultaneously
- File-independent work runs parallel
- Up to 5 parallel subtasks per batch

### Sequential Thinking - ALWAYS
**Use /icc-think-sequential for ALL complex problems**
- Break down into logical steps
- Question assumptions and revise thinking
- Document thought progression

### UltraThinking - ALWAYS  
**Apply maximum depth analysis**
- Consider edge cases and alternatives
- Explore multiple approaches
- Challenge initial solutions
- Think beyond immediate requirements

### Ultra-Experienced Specialists - ALWAYS
**Create specialists with 10+ years expertise**
- Never use generic roles for specialized work
- Create domain-specific specialists (@GraphQL-Developer)
- Apply maximum expertise level and best practices

## ENFORCEMENT

**Role-in-Title:** NON-NEGOTIABLE for ALL tasks
**Subtask Count:** Based on task complexity assessment
- Simple tasks: May have 0-1 subtasks
- Standard tasks: Typically 2-3 subtasks
- Complex tasks: 4 or more subtasks as needed

**Auto-Correction Patterns:**
- Missing memory search → STOP → Search memory/[topic]/[subtopic].md first → Embed patterns → Resume
- Missing role in title → Add based on work type
- Wrong template → Re-analyze complexity
- No specialist → Create if <70% match
- Missing SME → Pre-assign reviewer

Apply to ALL PRB creation: work requests, role assignments, complexity analysis.

## INTEGRATION

Use these commands:
- `/icc-search-memory` - MANDATORY memory search before PRB creation
- `/icc-think-sequential` - Problem analysis with memory context
- `/icc-create-specialist` - Dynamic role creation
- `/icc-analyze-complexity` - Determine appropriate template
- `/icc-create-prb` - Generate PRB with embedded memory