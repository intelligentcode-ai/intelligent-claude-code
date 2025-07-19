# Archival Intelligence

**Purpose:** Command-driven workspace cleanup with cascading archival  
**Type:** Workspace Management Component  
**Status:** ACTIVE

## Operation

**Trigger:** Manual PM commands only  
**Cascading:** Epic → Stories → Tasks (automatic child archival)  
**Git Integration:** Git-tracked items use `git mv`, tasks use file operations  
**Structure:** Date-organized archives with summary files  

## Core Functions

**Detection:**
- Scan all epics for completed items
- Check status: COMPLETED and phase: ARCHIVED
- Verify all child items completed
- Ensure no active references

**Archival Process:**
- Create date-organized archive path (archives/completed/type/year/month/)
- Generate ARCHIVED.md summary
- Move main item using git mv or file operations
- Cascade to child items automatically
- Update .gitignore for task archives
- Commit archival changes

**Cascading Behavior:**
- Epic archival → automatically archive all child stories and tasks
- Story archival → automatically archive all child tasks
- Bug archival → automatically archive all child tasks

## Commands

**@PM archive-completed [--dry-run]**
- Archive all items with status:COMPLETED and phase:ARCHIVED
- Use --dry-run to preview without executing

**@PM archive-item ITEM-ID**
- Archive specific item by ID
- Prompts for confirmation if not completed

**@PM archive-status**
- Show archival candidates and metrics
- Display counts and readiness status

**@PM restore ITEM-ID**
- Restore previously archived item
- Reverse git operations and file moves

## Archive Structure

```
archives/
├── completed/              # Git-tracked
│   ├── epics/2025/01/EPIC-001-title/
│   │   ├── ARCHIVED.md
│   │   └── epic.yaml
│   ├── bugs/2025/01/BUG-001-title/
│   │   ├── ARCHIVED.md
│   │   └── bug.yaml
│   └── stories/2025/01/STORY-001-title/
│       ├── ARCHIVED.md
│       └── story.yaml
└── tasks/                  # Not git-tracked
    └── 2025/01/
        ├── EPIC-001/STORY-001/TASK-001.md
        └── BUG-001/TASK-001.md
```

## Implementation

**Readiness Check:**
- Item must be COMPLETED and ARCHIVED
- All child items must be COMPLETED
- No active references or dependencies

**Git Operations:**
- Use `git mv` for tracked files (epics, stories, bugs)
- Use file operations for tasks (not git-tracked)
- Ensure .gitignore includes task archives
- Commit all archival operations

**Error Handling:**
- Rollback via `git reset --hard HEAD`
- Restore moved files on failure
- Log errors and notify user

**Metrics:**
- Count archived items by type
- Track archival candidates
- Monitor errors and restorations

## Integration

**PM Command Extensions:**
- Extend PM role with archival commands
- Integrate with manual workflow
- Provide status and metrics

**Learning Capture:**
- Store archival success/failure patterns
- Track efficiency metrics
- Learn from errors for prevention

---
**ARCHIVAL:** Command-driven cleanup • Cascading hierarchy • Git-aware operations • Historical preservation