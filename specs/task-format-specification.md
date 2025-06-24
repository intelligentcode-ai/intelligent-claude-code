# Task File Format Specification

## Overview

This document defines a markdown-based task file format that is human-readable and machine-parseable. Each task is stored as a separate `.md` file with a standardized structure.

## File Naming Convention

Tasks should be named using the pattern: `[YYYY-MM-DD]-[type]-[brief-description].md`

Example: `2024-01-15-feature-user-authentication.md`

## Task File Structure

```markdown
---
# Metadata Section (YAML Front Matter)
priority: critical|high|medium|low
area: frontend|backend|infrastructure|docs|design|testing|devops
type: feature|bug|enhancement|refactor|research|maintenance
status: backlog|todo|in-progress|review|blocked|done
estimated_effort: 1h|2h|4h|1d|2d|3d|1w|2w|1m
actual_effort: 2h  # Optional, filled when completed
dependencies:
  - task-id-1
  - task-id-2
target_personas:
  - developer
  - end-user
  - admin
tags:
  - performance
  - security
  - ux
assignee: username  # Optional
created: 2024-01-15
due_date: 2024-01-30  # Optional
completion_date: 2024-01-28  # Optional
---

# Task Title

## Summary
Brief one-paragraph description of the task.

## Context
Detailed background information and why this task is needed.

## Requirements
Detailed requirements and specifications.

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Details
Any technical specifications, API changes, database schema updates, etc.

## Notes
Additional notes, considerations, or references.

## Related Links
- [Related Issue #123](https://github.com/repo/issues/123)
- [Design Document](https://docs.example.com/design)
```

## Field Definitions

### Priority
- **critical**: Blocks other work or causes significant user impact
- **high**: Important for current sprint/milestone
- **medium**: Should be addressed soon but not urgent
- **low**: Nice to have, can be deferred

### Area
- **frontend**: User interface, client-side code
- **backend**: Server-side logic, APIs
- **infrastructure**: DevOps, deployment, monitoring
- **docs**: Documentation updates
- **design**: UI/UX design work
- **testing**: Test creation or testing infrastructure
- **devops**: CI/CD, deployment processes

### Type
- **feature**: New functionality
- **bug**: Defect fix
- **enhancement**: Improvement to existing functionality
- **refactor**: Code restructuring without changing behavior
- **research**: Investigation or spike
- **maintenance**: Routine updates, dependency updates

### Estimated Effort
- Use units: h (hours), d (days), w (weeks), m (months)
- Examples: 2h, 1d, 3d, 1w, 2w, 1m

## Parsing Guidelines

1. YAML front matter between `---` markers contains metadata
2. First `#` heading after front matter is the task title
3. Sections are identified by `##` headings
4. Acceptance criteria use markdown checkboxes `- [ ]`
5. Status can be tracked by checking/unchecking criteria