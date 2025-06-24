# Task Format Quick Reference

## Template

```markdown
---
priority: critical|high|medium|low
area: frontend|backend|infrastructure|docs|design|testing|devops
type: feature|bug|enhancement|refactor|research|maintenance
status: backlog|todo|in-progress|review|blocked|done
estimated_effort: 1h|2h|4h|1d|2d|3d|1w|2w|1m
dependencies: [task-ids]
target_personas: [personas]
tags: [tags]
---

# Task Title

## Summary
Brief description

## Context
Background information

## Requirements
Detailed requirements

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Technical Details
Technical specifications

## Notes
Additional notes

## Related Links
- [Link](url)
```

## Common Patterns

### Feature Task
- Priority: Usually medium/high
- Include user stories in Context
- Detailed technical specs
- Clear acceptance criteria

### Bug Task
- Priority: Based on impact
- Steps to reproduce in Context
- Root cause in Technical Details
- Regression test in criteria

### Enhancement Task
- Priority: Usually medium/low
- Current vs desired state
- Performance metrics
- Backward compatibility notes

### Refactor Task
- Priority: Usually medium
- Code quality metrics
- No functional changes
- Test coverage requirements

### Research Task
- Priority: Usually low
- Research questions in Requirements
- Deliverables in criteria
- Time-boxed effort