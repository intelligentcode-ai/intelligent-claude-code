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

**Detection:** Use `/icc-archive-scan` to scan epics for completed items, check status COMPLETED and phase ARCHIVED, verify child items completed, ensure no active references

**Archival Process:** Use `/icc-archive-item [item_id]` to create date-organized archive path, generate archived-summary.md, move items using git mv or file operations, cascade to child items, update .gitignore, commit changes

**Cascading Behavior:** Use `/icc-archive-cascade [parent_item]` for Epic → archive all child stories and tasks, Story → archive all child tasks, Bug → archive all child tasks

## Commands

**Archival Operations:** Use `/icc-archive-completed` command for comprehensive workspace cleanup  
**Item Management:** Use `/icc-archive-item [ITEM-ID]` for specific item archival  
**Status Monitoring:** Use `/icc-archive-status` for archival candidates and metrics  
**Recovery:** Use `/icc-restore [ITEM-ID]` for restoring archived items

## Archive Structure

```
archives/
├── completed/              # Git-tracked
│   ├── epics/2025/01/EPIC-001-title/
│   │   ├── archived-summary.md
│   │   └── epic.yaml
│   ├── bugs/2025/01/BUG-001-title/
│   │   ├── archived-summary.md
│   │   └── bug.yaml
│   └── stories/2025/01/STORY-001-title/
│       ├── archived-summary.md
│       └── story.yaml
└── tasks/                  # Not git-tracked
    └── 2025/01/
        ├── EPIC-001/STORY-001/TASK-001.md
        └── BUG-001/TASK-001.md
```

## Implementation

**Readiness Check:** Use `/icc-archive-check-ready [item_id]` to verify item is COMPLETED and ARCHIVED, all child items COMPLETED, no active references or dependencies

**Git Operations:** Use `/icc-git-archive [item_type] [item_path]` to handle git mv for tracked files, file operations for tasks, .gitignore updates, commit archival operations

**Error Handling:** Use `/icc-archive-rollback [operation_id]` to rollback via git reset, restore moved files on failure, log errors and notify user

**Metrics:** Use `/icc-archive-metrics` to count archived items by type, track archival candidates, monitor errors and restorations

## Integration

**PM Command Extensions:**
- Extend PM role with archival commands
- Integrate with manual workflow
- Provide status and metrics

**Learning Capture:** Use `/icc-learning-capture [archival_operation]` to store success/failure patterns, track efficiency metrics, learn from errors for prevention

---
**ARCHIVAL:** Command-driven cleanup • Cascading hierarchy • Git-aware operations • Historical preservation