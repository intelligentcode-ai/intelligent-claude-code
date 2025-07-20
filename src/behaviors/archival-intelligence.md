# Archival Intelligence

**Purpose:** Command-driven workspace cleanup with cascading archival  
**Type:** Workspace Management Component  
**Status:** ACTIVE

@./file-management-enforcer.md

## Operation

**Trigger:** Manual PM commands only  
**Cascading:** Epic → Stories → Tasks (automatic child archival)  
**Git Integration:** Git-tracked items use `git mv`, tasks use file operations  
**Structure:** Date-organized archives with summary files  

## Core Functions

**Detection:** Use `/icc-archive-completed --scan` to scan epics for completed items, check COMPLETED status and ARCHIVED phase, verify child completion, and ensure no active references

**Archival Process:** Use `/icc-archive-completed [item_id]` to create archive paths, generate summaries, move items with git operations, cascade to children, update .gitignore, and commit changes

**Cascading Behavior:** Use `/icc-archive-completed [epic_id]` for automatic Epic → Stories → Tasks archival, `/icc-archive-completed [story_id]` for Story → Tasks, and `/icc-archive-completed [bug_id]` for Bug → Tasks

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