# TASK-001: [Architect] Load Workflow Ordering Knowledge

## Overview
**Task ID:** TASK-001
**Title:** [Architect] Load Workflow Ordering Knowledge
**Status:** COMPLETED
**Assigned To:** @Architect
**Priority:** P0 (blocking)
**Type:** knowledge_loading

## Description
Search memory and documentation for workflow-based task ordering patterns and requirements.

## Subtasks
1. **Load inner workflow template**
   - Review phase sequence
   - Understand task execution order
   - Note validation requirements

2. **Load outer workflow template**
   - Review planning phases
   - Understand epic/story/bug workflow
   - Note task decomposition patterns

3. **Search for ordering violations**
   - Find examples of wrong task order
   - Identify common mistakes
   - Load best practices

## Acceptance Criteria
- [x] Inner workflow phases understood
- [x] Outer workflow phases understood
- [x] Task ordering requirements clear
- [x] Ready to analyze implementation

## Dependencies
- None (first task)

## Output
- Workflow ordering requirements
- Phase sequence documentation
- Best practices summary

## Completed Output

### Inner Workflow Phase Sequence (Task Execution)
1. **knowledge_retrieval** - Load patterns and context before starting
2. **task_planning** - Plan approach and create subtasks if needed
3. **task_execution** - Perform the actual work
4. **task_validation** - Self-validate and run automated checks
5. **peer_review** - Domain expert review (conditional)
6. **git_operations** - Commit and push changes
7. **task_completion** - Finalize and update status
8. **knowledge_generation** - Capture learnings and update scores

### Outer Workflow Phase Sequence (Epic/Story/Bug Planning)
1. **knowledge_retrieval** - Search for similar work and patterns
2. **epic_definition** - Define overarching features
3. **story_creation** - Break down into stories/bugs
4. **task_decomposition** - Create assignable tasks with validation
5. **git_operations** - Create feature branches
6. **acceptance_criteria** - Define completion requirements
7. **knowledge_generation** - Capture planning decisions

### Task-to-Workflow Phase Mapping
- **knowledge_loading** tasks → Inner workflow `knowledge_retrieval` phase
- **research** tasks → Inner workflow `task_planning` phase
- **implementation** tasks → Inner workflow `task_execution` phase
- **testing** tasks → Inner workflow `task_validation` phase
- **peer_review** tasks → Inner workflow `peer_review` phase
- **documentation** tasks → Inner workflow `task_execution` or `knowledge_generation`
- **git_operations** tasks → Inner workflow `git_operations` phase
- **deployment** tasks → Inner workflow `task_execution` phase
- **knowledge_creation** tasks → Inner workflow `knowledge_generation` phase

### Best Practices for Task Ordering

1. **Phase Prerequisites**
   - Cannot skip phases - must complete in sequence
   - Knowledge retrieval ALWAYS comes first
   - Git operations come AFTER validation/review
   - Knowledge generation ALWAYS comes last

2. **Task Type Ordering Within Stories/Bugs**
   - Start with knowledge_loading tasks
   - Follow with research/planning tasks
   - Core implementation tasks come next
   - Testing follows implementation
   - Documentation can parallel testing
   - Git operations after all validations
   - Knowledge creation tasks at the end

3. **Priority-Based Execution**
   - P0 → P1 → P2 → P3 (highest to lowest)
   - Within same priority: blocking → critical_path → parallel → optional
   - Security issues auto-escalate to P0
   - Customer bugs increase priority by 1 level

4. **Validation Requirements**
   - Pre-execution validation gates are mandatory
   - Cannot execute without proper role assignment
   - Peer reviews require domain expert SMEs
   - Capability match >70% for all assignments

5. **Git Workflow Integration**
   - Outer workflow: Creates branches per story/bug
   - Inner workflow: Creates commits per task
   - Commits only after validation passes
   - Learning capture before marking complete

### Common Ordering Violations to Avoid
1. Creating git_operations tasks before implementation
2. Placing peer_review tasks before testing
3. Starting implementation without knowledge_loading
4. Generating knowledge before completing work
5. Skipping validation phases
6. Executing tasks out of workflow phase order