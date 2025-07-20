# Task Creation Mandates

**PURPOSE:** Mandatory behavioral requirements for ALL task creation in the virtual team system.

## MANDATORY TASK CREATION RULES

### Role in Title - ALWAYS
**Every task title MUST include the assigned role in square brackets**
- Format: "[Role] Task description"
- Examples:
  - "[Developer] Implement configuration loader"
  - "[AI-Architect] Design memory system architecture"
  - "[QA-Engineer] Create integration test suite"

### Subtasks - ALWAYS
**Every task MUST be decomposed into subtasks**
- Minimum 3 subtasks per task
- Maximum granularity for parallel execution
- Each subtask clearly scoped
- Subtasks enable progress tracking

### Parallelization - WHERE APPLICABLE
**Identify and mark parallel execution opportunities**
- Non-conflicting subtasks execute simultaneously
- File-independent work runs in parallel
- Up to 5 parallel subtasks per batch
- Sequential only when dependencies require

### Sequential Thinking - ALWAYS
**Use /icc:think-sequential for ALL complex problems**
- Break down into logical steps
- Question assumptions
- Revise thinking as needed
- Document thought progression

### UltraThinking - ALWAYS  
**Apply maximum depth analysis**
- Consider edge cases
- Explore alternative approaches
- Challenge initial solutions
- Think beyond immediate requirements

### Ultra-Experienced Specialists - ALWAYS
**Create specialists with 10+ years expertise**
- Never use generic roles for specialized work
- Create domain-specific specialists (e.g., @GraphQL-Developer)
- Apply maximum expertise level
- Include domain best practices

## ENFORCEMENT

These mandates are NON-NEGOTIABLE and apply to:
- ALL bug task decomposition
- ALL story task creation
- ALL epic planning
- ALL role assignments

## INTEGRATION COMMANDS

When creating tasks, use:
- `/icc:think-sequential` - For problem analysis
- `/icc:create-specialist` - For dynamic role creation
- `/icc:plan-tasks` - With role-in-title enforcement
- `/icc:parallelize-subtasks` - For execution planning