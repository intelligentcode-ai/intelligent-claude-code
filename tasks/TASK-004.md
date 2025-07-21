# [Developer] Remove redundant validation commands

**ID:** TASK-004
**Bug:** BUG-117
**Status:** PLANNED
**Assigned:** @Developer
**Priority:** P0

## Description
Remove validation commands that duplicate functionality in role-assignment-validator.md and shared-patterns/validation-enforcement-patterns.md.

## Subtasks
- [ ] Delete validation commands that duplicate behavioral validation
- [ ] Keep only essential validation commands (directory, file, naming)
- [ ] Update imports to use validation behaviors directly
- [ ] Ensure validation chain continues to function
- [ ] Test role assignment validation still works

## Commands to Remove
- `src/commands/icc-validate-context.md` (duplicates role-assignment-validator.md)
- `src/commands/icc-validate-assignments.md` (duplicates role-assignment-validator.md)
- `src/commands/icc-validate-role-title.md` (duplicates task-creation-mandates.md)
- `src/commands/icc-enforce-validation.md` (duplicates autonomy-controller.md)

## Keep These
- `src/commands/icc-validate-directory.md` (unique directory validation)
- `src/commands/icc-validate-file.md` (unique file compliance)
- `src/commands/icc-validate-naming.md` (unique naming conventions)
- `src/commands/icc-detect-work-type.md` (used in validation chain)
- `src/commands/icc-require-triage.md` (used in validation chain)

## Acceptance Criteria
- Redundant validation commands removed
- Core validation chain still functions
- Work type detection and triage continue to work
- No broken validation workflows

## Technical Notes
- Validation chain: detect-work-type → require-triage → validate-assignments
- Most validation logic is in shared-patterns/validation-enforcement-patterns.md
- Keep commands that are part of the core workflow