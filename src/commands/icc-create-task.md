# Create Task

Create individual task with role assignment and validation using $ARGUMENTS.

## Behavior
Create properly formatted task with mandatory role validation, subtask
decomposition, and integration with the behavioral system. Enforces all
task creation mandates including role-in-title and minimum subtasks.

## Arguments
**Format:** "Title: [Role] Task description | Parent: STORY-XXX|BUG-XXX | Priority: P0|P1|P2|P3 | Role: @AssignedRole"
**Example:** "Title: [AI-Engineer] Implement behavioral pattern validation | Parent: STORY-005 | Priority: P1 | Role: @AI-Engineer"

## Role Restrictions
**@PM** role required for task creation as part of delegation and coordination responsibilities.

## Core Actions
- Parse task details from $ARGUMENTS
- Validate task title format: "[Role] Task description"
- Verify parent story/bug exists and is active
- Apply task creation mandates:
  - Role in title (mandatory)
  - Minimum 3 subtasks requirement
  - Parallelization opportunities identification
  - Sequential thinking application
  - Ultra-experienced specialist assignment
- Perform role assignment validation:
  - Use icc-validate-assignments for capability match
  - Require PM + Specialist Architect triage
  - Create dynamic specialist if needed
- Generate task file with proper structure
- Update parent story/bug with new task
- Apply priority inheritance from parent

## Task Creation Mandates (ALWAYS ENFORCED)

### Role in Title - MANDATORY
- Format: "[Role] Task description"
- Examples:
  - "[Developer] Implement configuration loader"
  - "[AI-Architect] Design memory system architecture"
  - "[QA-Engineer] Create integration test suite"

### Subtasks - MANDATORY
- Minimum 3 subtasks per task
- Maximum granularity for progress tracking
- Each subtask clearly scoped and actionable
- Enables parallel execution opportunities

### Parallelization - WHERE APPLICABLE
- Identify non-conflicting subtasks
- Mark parallel execution opportunities
- Consider file dependencies and conflicts
- Up to 5 parallel subtasks per batch

### Sequential Thinking - MANDATORY
- Use icc-think-sequential for complex analysis
- Break down problem into logical steps
- Question assumptions and revise thinking
- Document thought progression

### Ultra-Experienced Specialists - MANDATORY
- Create specialists with 10+ years expertise
- Never use generic roles for specialized work
- Apply maximum expertise level
- Include domain best practices

## Task File Structure
```markdown
# [Role] Task Description

**ID**: TASK-XXX
**Parent**: STORY-XXX or BUG-XXX
**Assigned To**: @Role
**Priority**: P0|P1|P2|P3
**Status**: PLANNED

## Description
Detailed task description and context

## Subtasks
1. [ ] Subtask 1 (sequential/parallel)
2. [ ] Subtask 2 (sequential/parallel)
3. [ ] Subtask 3 (sequential/parallel)

## Acceptance Criteria
- Specific completion criteria
- Quality standards
- Integration requirements

## Dependencies
- Required tasks or resources
- Blocking/parallel relationships

## Notes
- Additional context
- Implementation considerations
```

## Validation Chain Integration
1. **Work Type Detection**: icc-detect-work-type(task_content)
2. **Triage Requirement**: icc-require-triage(pm_role, specialist_architect)
3. **Assignment Validation**: icc-validate-assignments(task, proposed_role)
4. **Final Approval**: Joint PM + Specialist Architect approval

## Priority Inheritance
- Task priority inherits from parent story/bug
- Type adjustments applied:
  - blocking: highest within priority level
  - critical_path: high within priority level
  - parallel: normal within priority level
  - optional: lowest within priority level

## Quality Standards
- Zero tolerance for mandate violations
- Comprehensive validation before creation
- Clear task structure and acceptance criteria
- Proper integration with parent work item
- Audit trail for all decisions

## Integration
- Used by PM for task delegation
- Triggered during story/bug decomposition
- Integrates with validation command chain
- Supports workflow template execution
- Connected to learning system for pattern capture

## Error Prevention
- Validate title format before creation
- Ensure parent exists and is accessible
- Check role capability match
- Verify subtask requirements
- Confirm specialist architect approval