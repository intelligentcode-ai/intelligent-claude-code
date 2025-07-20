# Plan Tasks

Decompose stories/bugs into specialist-assignable tasks using $ARGUMENTS.

## Behavior
PM-only operation that breaks down stories/bugs into granular tasks with role assignments, validation chains, and priority inheritance.

## Role Restriction
**Required**: @PM | **Error**: "Error: Task planning requires @PM role activation"

## Arguments
**Format:** "source:STORY-XXX|BUG-XXX | approach:waterfall|agile | detail_level:high|medium"
**Example:** "source:STORY-001 | approach:agile | detail_level:high"

## Core Actions
1. Parse planning request and load story/bug context
2. Apply task creation mandates (role-in-title, subtasks, parallelization)
3. Break into specialist-assignable work items with role matching
4. Execute validation chain for all assignments
5. Generate task files and update progress tracking

## Task Creation Mandates (ALWAYS ENFORCED)

### Role in Title - MANDATORY
**Format**: "[Role] Task description"
**Examples**: "[AI-Engineer] Implement validation" | "[Security-Engineer] Review auth"

### Subtasks - MANDATORY  
**Minimum**: 3 subtasks per task for granularity and parallel execution

### Parallelization Analysis
Identify non-conflicting subtasks for simultaneous execution (up to 5 per batch)

### Sequential Thinking & UltraThinking - ALWAYS
Use /icc:think-sequential for complex analysis with maximum depth

### Ultra-Experienced Specialists - ALWAYS
10+ years expertise, domain-specific specialists (e.g., @GraphQL-Developer)

## Task Decomposition Strategy

### Common Task Types
Knowledge Loading, Implementation, Testing, Review, Documentation, Integration, Deployment, Knowledge Creation

### Task Sequencing
- **Dependencies**: True prerequisites vs preferences
- **Critical Path**: Timeline-affecting tasks
- **Parallel**: Non-conflicting work groups
- **Priority**: Story/bug priority + task type adjustments

## Role Assignment Validation (MANDATORY)

### Validation Chain (BLOCKING)
1. `icc:detect-work-type(task_content)`
2. `icc:require-triage(pm_role, specialist_architect)`
3. `icc:validate-assignments(task, proposed_role)`
4. `icc:require-approval(pm_role, specialist_architect)`

### Assignment Rules
- **AI-agentic** → @AI-Architect/@AI-Engineer ONLY
- **Infrastructure** → Specialized DevOps roles ONLY
- **Security** → @Security-Engineer MANDATORY
- **Generic roles** → BLOCKED for specialist work
- **Capability** → >70% match required

## Priority Inheritance
Story priority + task type adjustment → Execution: P0→P1→P2→P3 (blocking→critical_path→parallel→optional)

## Task File Structure
```markdown
# [Role] Task Title
**ID**: TASK-XXX | **Parent**: STORY/BUG-XXX | **Assigned**: @Role
**Priority**: P0-blocking | **Status**: PLANNED

## Objective
Clear accomplishment statement

## Subtasks (Min 3) 
1. [ ] Action 1 | 2. [ ] Action 2 | 3. [ ] Action 3

## Parallel Execution
**Sequential**: 1-3 (dependencies) | **Parallel**: 4-5 (no conflicts)

## Acceptance Criteria
- [ ] Criterion 1 | 2 | 3

## Dependencies
**Requires**: [TASK-XXX] | **Blocks**: [TASK-YYY]
```

## Parallelization Analysis
Check file/schema/resource/dependency conflicts. Optimal: 3-5 parallel task groups

## Error Handling
- **Not PM**: "Error: Requires @PM role"
- **Invalid Source**: "Error: Need valid STORY/BUG-XXX"
- **Validation Failed**: "Error: Assignment validation failed"
- **Missing Approval**: "Error: Architect approval required"
- **Low Capability**: "Error: <70% capability match"
