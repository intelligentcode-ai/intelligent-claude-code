# [AI-Architect] Analyze and document critical dependencies before removal

**ID:** TASK-001
**Bug:** BUG-117
**Status:** PLANNED
**Assigned:** @AI-Architect
**Priority:** P0

## Description
Before removing any files, analyze and document all critical dependencies to ensure safe removal without breaking functionality.

## Subtasks
- [ ] Map all import chains from executable-workflow.md to understand core dependencies
- [ ] Identify behaviors that provide unique functionality not in executable-workflow.md
- [ ] Document which commands are thin wrappers vs. having unique logic
- [ ] Create dependency graph showing what can be safely removed
- [ ] Validate that core behaviors (lean-workflow-executor, config-loader, etc.) are preserved

## Acceptance Criteria
- Complete dependency analysis document created
- All unique functionality identified and marked for preservation
- Clear removal order established to avoid breaking imports
- Risk assessment for each removal completed

## Technical Notes
- Focus on executable-workflow.md as the new core
- Preserve behaviors that orchestrate or enhance the workflow
- Document any hidden dependencies in shared patterns