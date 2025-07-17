# Correct Hierarchy Example

This example demonstrates the proper terminology and structure:

## Hierarchy
```
EPIC-003 (User Authentication System)
├── STORY-001 (User Registration Flow)
├── STORY-002 (Login and Session Management)
│   ├── TASK-001 (Research authentication patterns) - @Security-Engineer
│   ├── TASK-002 (Implement login endpoint) - @Backend-Developer
│   │   ├── SUBTASK-001 (Setup authentication middleware) ✓
│   │   ├── SUBTASK-002 (Implement input validation) ✓
│   │   ├── SUBTASK-003 (Create password verification logic) ⟳
│   │   ├── SUBTASK-004 (Implement JWT token generation)
│   │   ├── SUBTASK-005 (Add error handling and logging)
│   │   └── SUBTASK-006 (Write unit tests)
│   ├── TASK-003 (Create session management) - @Backend-Developer
│   ├── TASK-004 (Security review) - @Security-Engineer
│   ├── TASK-005 (Write integration tests) - @QA-Engineer
│   ├── TASK-006 (Update API documentation) - @Technical-Writer
│   ├── TASK-007 (Create deployment plan) - @DevOps-Engineer
│   └── TASK-008 (Generate knowledge artifacts) - @Backend-Developer
├── STORY-003 (Password Reset Flow)
└── BUG-001 (Fix Session Timeout Issue)
    ├── TASK-001 (Investigate session validation logic) ✓
    ├── TASK-002 (Fix session validation check) ⟳
    ├── TASK-003 (Add regression tests)
    ├── TASK-004 (Security review the fix)
    └── TASK-005 (Deploy hotfix to production)
```

## Key Points

### 1. Creation Responsibility
- **PM/Architect/RE/User** create EPICS, STORIES, and BUGS
- **PM** breaks stories/bugs into TASKS
- **Specialists** optionally break tasks into SUBTASKS

### 2. Task Types
Tasks are diverse and include:
- Knowledge Loading/Research
- Implementation
- Peer Review
- Documentation
- Testing
- Deployment
- Git Operations
- Knowledge Creation

### 3. Completion Flow
- All SUBTASKS done → TASK done
- All TASKS done → STORY/BUG done
- All STORIES/BUGS done → EPIC done

### 4. Workflow Integration
- **Outer Workflow**: Epic → Story/Bug → Task planning
- **Inner Workflow**: Task execution (with optional subtasks)
- Settings drive task creation and behavior
- Continuous learning and scoring integrated

### 5. File Structure
```
/epics/
  └── EPIC-003-user-auth/
      ├── epic.yaml
      └── stories/
          ├── STORY-002-login-session/
          │   ├── story.yaml
          │   └── tasks/
          │       └── TASK-002-implement-login/
          │           └── task.yaml
          └── BUG-001-session-timeout/
              ├── bug.yaml
              └── tasks/
```

This structure properly reflects the hierarchy and responsibilities defined in the system.