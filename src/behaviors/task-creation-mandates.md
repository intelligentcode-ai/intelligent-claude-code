# Task Creation Mandates

**MANDATORY:** MUST use role-in-title + complexity-appropriate subtasks. Auto-correct violations.

**PURPOSE:** Mandatory behavioral requirements for ALL task creation.

## Imports
@../workflow-templates/executable-workflow.md

## MANDATORY RULES

### Role in Title - ALWAYS
**Every task title MUST include role in square brackets**
- Format: "[Role] Task description"
- Examples: "[Developer] Implement auth", "[AI-Architect] Design memory system"

### Subtasks - COMPLEXITY-BASED
**Task breakdown based on complexity and nature of work**

#### Simple Tasks (0-1 subtasks)
- Single-file edits or small changes
- Configuration updates
- Documentation fixes
- Version bumps
- Examples: "Fix typo in README", "Update config value"

#### Standard Tasks (2-3 subtasks)
- Feature implementations spanning multiple files
- Bug fixes requiring investigation
- Refactoring operations
- Examples: "Add new API endpoint", "Fix login validation bug"

#### Complex Tasks (4+ subtasks)
- System-wide changes
- New feature modules
- Performance optimizations
- Security implementations
- Examples: "Implement OAuth2 system", "Refactor entire data layer"

**Subtask Guidelines:**
- Each subtask should be independently executable
- Clear progress tracking through subtask completion
- Avoid artificial breakdown just to meet a count
- Focus on logical work units

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
- Missing role in title → Add appropriate role
- Over-decomposed simple task → Consolidate subtasks
- Under-decomposed complex task → Expand breakdown
- Artificial subtasks → Remove and simplify

Apply to ALL task creation: bug decomposition, story creation, epic planning, role assignments.

## INTEGRATION

Use these commands:
- `/icc-think-sequential` - Problem analysis
- `/icc-create-specialist` - Dynamic role creation  
- `/icc-plan-tasks` - With role-in-title enforcement
- `/icc-parallelize-subtasks` - Execution planning