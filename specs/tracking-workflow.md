# Tracking System Workflow & Directory Structure

## Directory Structure

```
intelligent-claude-code/
├── _tracking/                 # Main tracking directory
│   ├── _progress.md          # Current active task progress
│   ├── _implemented.md       # Completed tasks checklist
│   └── _changes.md           # Chronological change log
│
├── _archive/                 # Historical tracking data
│   ├── 2025/
│   │   ├── 01-january/
│   │   │   ├── week-1/
│   │   │   │   ├── progress-2025-01-07.md
│   │   │   │   └── changes-2025-01-07.md
│   │   │   └── week-2/
│   │   └── 02-february/
│   └── completed-tasks/      # Archived completed task details
│       └── TASK-XXX/
│           ├── summary.md
│           ├── implementation-notes.md
│           └── artifacts/
│
├── _personas/                # Persona-specific work areas
│   ├── architect/
│   ├── developer/
│   └── tester/
│
└── src/                      # Main project source code

```

## File Movement Workflow

### 1. Task Initiation
```
Action: New task requested by user
Files Updated:
- _progress.md → Update with new task details
- _changes.md → Add [STARTED] entry
```

### 2. During Implementation
```
Action: Working on task
Files Updated:
- _progress.md → Update percentage, current focus, steps
- _changes.md → Add [CHANGED], [DECISION], [BLOCKED] entries as needed
```

### 3. Task Completion
```
Action: Task finished
Files Updated:
- _implemented.md → Add new task entry with full details
- _changes.md → Add [COMPLETED] entry
- _progress.md → Clear for next task
Archival:
- Create snapshot of _progress.md → _archive/YYYY/MM-month/week-X/
```

### 4. Weekly Archival Process
```
Every Sunday at end of week:
1. Copy _changes.md → _archive/YYYY/MM-month/week-X/changes-YYYY-MM-DD.md
2. Create weekly summary from _changes.md metrics
3. Reset weekly metrics in _changes.md
4. Keep main files for ongoing reference
```

### 5. Monthly Consolidation
```
End of each month:
1. Generate monthly report from all weekly archives
2. Update _implemented.md summary statistics
3. Archive completed task details to _archive/completed-tasks/
```

## Workflow Rules

### Progress Tracking Rules
1. **One Active Task:** Only one task should be in _progress.md at a time
2. **Real-time Updates:** Update progress percentage at least every 25%
3. **Blocker Protocol:** Any blocker must be logged in both _progress.md and _changes.md

### Implementation Documentation Rules
1. **Immediate Entry:** Add to _implemented.md within 1 hour of task completion
2. **User Verification:** Flag tasks for user verification, track confirmation
3. **File References:** Always use absolute paths for modified files

### Change Log Rules
1. **Chronological Order:** Newest entries at the top of each day's section
2. **Timestamp Everything:** Use 24-hour format [YYYY-MM-DD HH:MM]
3. **Decision Documentation:** All architectural decisions must include rationale

## Automation Opportunities

### Suggested Automations
1. **Progress Calculator:** Auto-calculate percentage from checked steps
2. **Time Tracking:** Auto-calculate duration from STARTED to COMPLETED
3. **File Change Detection:** Auto-log modified files in change entries
4. **Weekly Reports:** Auto-generate summary from change log
5. **Verification Reminders:** Alert when tasks pending verification > 3 days

### Integration Points
- Git hooks for automatic change detection
- Task ID generation system
- Persona assignment based on task type
- Metrics dashboard generation

## Template Usage

### Quick Task Start
```markdown
## In _progress.md:
**Task:** [Copy from user request]
**Started:** 2025-01-24 14:30
**Percentage Complete:** 0%

## In _changes.md:
#### [14:30] [STARTED] [Task name]
- **Task ID:** TASK-[auto-increment]
- **Description:** [User request summary]
```

### Quick Task Complete
```markdown
## In _implemented.md:
### Task ID: TASK-XXX
- **Summary:** [One-line summary]
- **Implementation Date:** 2025-01-24
[Fill remaining template fields]

## In _changes.md:
#### [16:45] [COMPLETED] [Task name]
- **Duration:** 2h 15m
- **Outcome:** [What was delivered]
```

---
*Workflow Version: 1.0*
*Created: 2025-01-24*