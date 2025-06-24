# Project Management Behaviors

## Overview

An integrated project and issue tracking system that enables autonomous task execution with multi-persona coordination.

## Directory Structure

```
tasks/                    # Configurable via CLAUDE_PM_TASK_DIR
├── pending/              # New task files
├── in-progress/          # Tasks being worked on
├── done/                 # Completed tasks (user verified)
├── _tracking/            # Current tracking files
│   ├── _progress.md      # Current task progress
│   ├── _implemented.md   # Awaiting user verification
│   └── _changes.md       # Change history log
└── _archive/             # Historical data
    └── YYYY-MM/          # Monthly archives
```

## Task File Format

### User Input (Simple)
Users write simple markdown files with just a title and description:

```markdown
# Fix login with special characters

Users can't login when their password has @ or # symbols. 
This is affecting multiple customers.
```

### PM Processing (Automated)
The Project Manager persona analyzes user input and creates enriched tasks:

```markdown
---
priority: high            # PM determines based on impact
area: backend            # PM identifies affected area
type: bug                # PM categorizes the issue
effort: 4                # PM estimates realistic effort (AI-honest)
personas:                # PM selects required specialists
  - backend
  - security
  - tester
dependencies: []         # PM checks for blockers
---

# Fix login with special characters

## Summary
[PM generated] Fix authentication failure when passwords contain special characters (@ and #).

## Context
[PM generated] Multiple users report login failures with special character passwords, 
indicating potential encoding or validation issues in authentication flow.

## Requirements
[PM generated based on analysis]
- [ ] Investigate password encoding in auth module
- [ ] Test special character handling
- [ ] Fix validation/encoding issue
- [ ] Add test cases for special characters

## Acceptance Criteria
[PM generated]
- [ ] Passwords with @, #, and other special chars work
- [ ] No security vulnerabilities introduced
- [ ] Existing passwords still function
- [ ] Comprehensive test coverage added

## Technical Notes
[PM generated] Check for URL encoding issues, SQL escaping, 
or validation regex that might reject valid characters.
```

### Why PM Estimates Effort
In an AI-agentic system, the PM persona must estimate effort because:
1. **Honesty**: AI knows its own capabilities better than humans
2. **Consistency**: Uniform estimation methodology
3. **Learning**: Can adjust based on actual completion times
4. **Transparency**: Users see realistic AI effort estimates

## Project Manager Workflow

### 1. Task Discovery
When activated with "continue the project" or similar:
```
1. Scan pending/ directory for new tasks
2. Read _progress.md to check current status
3. Analyze task priorities and dependencies
4. Select next task based on:
   - Priority level
   - Dependency satisfaction
   - Resource availability
```

### 2. Task Execution
```
1. Move task file to in-progress/
2. Create/update _progress.md with task details
3. Analyze task requirements
4. Activate required personas:
   - "Activating Backend persona for API implementation"
   - Pass task context to persona
5. Monitor execution and update progress
6. Handle blockers and failures
```

### 3. Progress Tracking

**_progress.md format**:
```markdown
# Current Task Progress

**Task**: TASK-002 - User Authentication System
**Started**: 2024-01-15 09:00
**Progress**: 65%
**Status**: In Progress

## Steps Completed
- [x] Design authentication flow
- [x] Create database schema
- [x] Implement JWT tokens
- [ ] Add OAuth providers
- [ ] Write integration tests

## Active Personas
- Backend: Implementing auth endpoints
- Security: Reviewing auth implementation

## Current Focus
Working on OAuth2 integration with Google provider

## Blockers
- [ ] Waiting for OAuth client credentials (blocked since 14:30)
```

### 4. Task Completion
```
1. When all requirements met:
   - Update _implemented.md with task entry
   - Move task details to _changes.md
   - Clear _progress.md
2. Wait for user verification
3. After verification:
   - Move task to done/
   - Archive tracking data
```

### 5. Change History

**_changes.md format**:
```markdown
# Project Change History

## 2024-01-15

[09:00] STARTED: TASK-002 - User Authentication System
- Priority: High
- Assigned personas: Backend, Security, Tester
- Estimated effort: 8 hours

[11:30] DECISION: Use JWT for stateless authentication
- Rationale: Better scalability, standard practice
- Alternative considered: Session-based auth

[14:30] BLOCKED: OAuth implementation
- Issue: Missing client credentials
- Impact: Cannot test OAuth flow

[16:00] COMPLETED: TASK-002 - User Authentication System  
- Actual effort: 7 hours
- Personas used: Backend, Security, Tester
- Key changes: Added /auth endpoints, JWT middleware
```

## Configuration

```bash
# ===== PROJECT MANAGEMENT =====
CLAUDE_PM_ENABLED=true            # Enable project management system
CLAUDE_PM_TASK_DIR=tasks          # Task directory name
CLAUDE_PM_AUTO_EXECUTE=true       # Auto-execute tasks
CLAUDE_PM_MAX_PARALLEL=1          # Max parallel tasks
CLAUDE_PM_ARCHIVE_DAYS=30         # Days before archiving
CLAUDE_PM_DEFAULT_PRIORITY=medium # Default task priority

# ===== PM PERSONA SETTINGS =====
CLAUDE_PERSONA_PROJECT_MANAGER=true  # Enable PM persona
CLAUDE_PM_STATUS_FREQUENCY=task      # Status updates: task|step|none
CLAUDE_PM_RISK_ASSESSMENT=true       # Enable risk analysis
```

## Natural Language Commands

### Project Management
- "Continue with the project" → Resume work on tasks
- "What's the project status?" → Show current progress
- "Show me pending tasks" → List tasks in pending/
- "Focus on [area] tasks" → Prioritize specific area
- "Pause current task" → Save progress and stop

### Task Control
- "Skip this task" → Move to next priority
- "This is blocked by [issue]" → Log blocker
- "Mark task complete" → Move to verification
- "Reject this implementation" → Revert and retry

### Reporting
- "Generate project report" → Summary of progress
- "Show completed tasks" → List done/ contents
- "What changed today?" → Today's entries from _changes.md

## Integration with Other Systems

### Git Integration
- Creates feature branches per task (when enabled)
- Commits with task ID references
- Links changes to tasks in _changes.md

### Documentation
- Automatically updates docs for completed tasks
- Generates release notes from _changes.md
- Maintains project README with task status

### Testing
- Activates Tester persona for verification
- Runs tests before marking complete
- Documents test results in task

## Best Practices

1. **Task Granularity**: Keep tasks under 8 hours
2. **Clear Criteria**: Specific, measurable acceptance criteria
3. **Dependencies**: Explicitly list blocking tasks
4. **Regular Reviews**: Check _implemented.md daily
5. **Context Preservation**: Detailed notes in _changes.md

## Failure Handling

When a task fails:
1. Log failure in _changes.md with details
2. Create retry strategy or new approach
3. Update task with lessons learned
4. Optionally create new tasks for fixes

## Resumability

System maintains state across sessions:
- _progress.md shows exact status
- Task files preserve full context
- _changes.md provides history
- Can resume with "continue the project"