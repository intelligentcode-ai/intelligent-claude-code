# Cascading Archival Demonstration

## Test Scenario: Epic with Stories and Tasks

### Setup
```yaml
EPIC-TEST-001:
  status: COMPLETED
  phase: ARCHIVED
  stories:
    - STORY-TEST-001:
        status: COMPLETED
        phase: ARCHIVED
        tasks:
          - TASK-001: COMPLETED
          - TASK-002: COMPLETED
          - TASK-003: COMPLETED
    - STORY-TEST-002:
        status: COMPLETED
        phase: ARCHIVED
        tasks:
          - TASK-004: COMPLETED
          - TASK-005: COMPLETED
```

### Expected Behavior

When PM executes: `@PM archive-item EPIC-TEST-001`

The system will:
1. Archive EPIC-TEST-001 to `archives/completed/epics/2025/01/EPIC-TEST-001/`
2. Automatically cascade to STORY-TEST-001:
   - Archive to `archives/completed/stories/2025/01/STORY-TEST-001/`
   - Cascade to its tasks:
     - TASK-001 → `archives/tasks/2025/01/STORY-TEST-001/TASK-001.md`
     - TASK-002 → `archives/tasks/2025/01/STORY-TEST-001/TASK-002.md`
     - TASK-003 → `archives/tasks/2025/01/STORY-TEST-001/TASK-003.md`
3. Automatically cascade to STORY-TEST-002:
   - Archive to `archives/completed/stories/2025/01/STORY-TEST-002/`
   - Cascade to its tasks:
     - TASK-004 → `archives/tasks/2025/01/STORY-TEST-002/TASK-004.md`
     - TASK-005 → `archives/tasks/2025/01/STORY-TEST-002/TASK-005.md`

### Result
- 1 epic archived (git-tracked)
- 2 stories archived (git-tracked)
- 5 tasks archived (not git-tracked)
- All in a single command execution

## Important Notes

1. **Manual Trigger Required**: Simply marking items as COMPLETED + ARCHIVED does NOT trigger archival. The PM must run the archive command.

2. **Cascading is Automatic**: Once the archive command is run, cascading to child items happens automatically.

3. **Safety Preserved**: All items must be properly completed before archival proceeds.

4. **Selective Archival**: You can still archive individual stories without archiving the parent epic if needed.