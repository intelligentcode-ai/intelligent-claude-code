# Planning Support Feature

## Overview

The Planning Support feature enables interactive planning sessions between users and the virtual team (PM + Architect), creating AI-optimized artifacts that the L3 autonomous team can execute independently.

## Key Features

### Interactive Planning Sessions
- **Command**: `@PM plan` - Starts a dialogue-based planning session
- **Participants**: User + PM + Architect collaborate
- **Output**: Structured epics, stories, and tasks

### Artifact Structure
```
300_implementation/
├── epics/          # High-level features
├── stories/        # User-facing capabilities  
├── tasks/          # Technical implementations
├── architecture/   # Technical designs
└── backlog.md      # Prioritized work queue
```

### Priority System
- **P0**: Urgent - Immediate attention required
- **P1**: High - Next sprint/release
- **P2**: Medium - Future sprints
- **P3**: Low - Nice to have

### Autonomous Pickup
- L3 team continuously scans `backlog.md`
- Selects highest priority items marked "Ready"
- Auto-assigns based on capability matching
- Executes without user intervention

## Artifact Templates

### Epic Template
```markdown
# EPIC-[XXX]: [Feature Name]
**Status:** Planning/Ready/In Progress/Done
**Priority:** P[0-3]
**Owner:** @PM

## Business Value
[Why this matters]

## Success Metrics
- [Measurable outcomes]

## Stories
- [ ] STORY-001: [Title]
```

### Story Template
```markdown
# STORY-[XXX]: [User Story]
**Status:** Planning/Ready/In Progress/Done
**Priority:** P[0-3]
**Epic:** EPIC-[XXX]

## User Story
As a [role], I want [action], so that [benefit]

## Acceptance Criteria
- [ ] Given [context], when [action], then [result]

## DoD
- [ ] All tasks complete
- [ ] Tests passing
- [ ] Peer reviewed
```

## Workflow

1. **Start Planning**: `@PM plan`
2. **Dialogue**: User describes needs, team refines
3. **Create Artifacts**: Structured markdown files
4. **Set Priorities**: Collaborative prioritization
5. **Save**: Auto-saved to 300_implementation/
6. **L3 Pickup**: Team autonomously executes

## Commands

- `@PM plan` - Start new planning session
- `@PM plan feature` - Plan specific feature
- `@PM plan epic` - Create new epic
- `@PM plan review` - Review current plan
- `@PM plan next` - Show next priority item

## Best Practices

1. **Clear DoD**: Every artifact needs measurable completion criteria
2. **AI Context**: Include implementation hints for the virtual team
3. **Priority Focus**: Keep P0 items minimal and truly urgent
4. **Regular Reviews**: Update priorities as needs change
5. **Status Updates**: Team updates artifact status during execution