---
name: agenttask-execute
description: Execute AgentTasks following the complete workflow. Use when a subagent receives an AgentTask to execute, ensuring all workflow steps are completed including git operations and documentation.
---

# AgentTask Execution Skill

Execute AgentTasks following the complete mandatory workflow.

## When to Use

- Subagent receives an AgentTask to execute
- Ensuring all workflow steps are completed
- Validating execution before marking complete

## Execution Flow

1. **AgentTask received** via Task tool
2. **Read context**, constraints, and success criteria
3. **Execute changes** within scope
4. **Produce completion summary** and required artifacts

## Mandatory Workflow Steps

**CRITICAL**: ALL workflow steps MUST be completed:

1. **Knowledge Search**: Memory patterns and best practices reviewed
2. **Implementation**: All code changes completed and validated
3. **Review**: Self-review checklist completed with all items checked
4. **Version Management**: Version bumped according to requirements
5. **Documentation**: CHANGELOG entry created, affected docs updated
6. **Git Commit**: Changes committed with privacy-filtered messages
7. **Git Push**: Changes pushed to remote repository

## Blocking Patterns (FORBIDDEN)

These patterns will BLOCK AgentTask completion:
- "No git operations needed" → Git workflow is mandatory
- "Skip CHANGELOG" → Documentation updates required
- "No version change needed" → Version management mandatory
- "Simple change, no review" → Review process mandatory
- "Self-documenting code" → Documentation requirements apply
- "Direct commit to main" → Branch protection must be followed

## Execution Validation

Before claiming AgentTask completion, validate:
- [ ] Step 1-7 execution checklist items verified
- [ ] No blocking patterns detected in execution
- [ ] Git operations completed per branch protection settings
- [ ] Documentation requirements satisfied per template
- [ ] Success criteria from AgentTask satisfied

## Quality Expectations

- Follow project standards and naming rules
- Validate against success criteria
- Record learnings to memory when appropriate
- Produce concise completion summary

## Completion Summary Format

```
AgentTask: [ID]
Status: Complete

Changes:
- [file1]: [description]
- [file2]: [description]

Validation:
- [x] Success criterion 1
- [x] Success criterion 2

Git:
- Branch: [branch-name]
- Commit: [commit-hash]
```
