# Archival Process for Completed Work

## Overview

This document defines the archival process for completed bugs and stories to maintain a clean working directory while preserving historical reference.

## Archival Rules

### 1. Task Archival (Completed Tasks)
- **Completed tasks** are moved OUT of version control
- **Incomplete tasks** remain in version control for future work
- Archive location: `archives/tasks/[EPIC-ID]/[BUG/STORY-ID]/`
- These archived tasks are added to `.gitignore`

### 2. Bug/Story Archival (Completed Items)
- **Completed bugs/stories** are moved to `archives/completed/`
- Remain IN version control for reference
- Structure: `archives/completed/[EPIC-ID]/[BUG/STORY-ID]/`
- Include all documentation, test results, and learnings

### 3. Never Version Control
- `.claude/` directory and all contents
- `test-results/` that are work-in-progress
- Any temporary or generated files

## Archive Structure

```
archives/
├── completed/              # In version control
│   ├── EPIC-001/
│   │   ├── BUG-001/       # Complete bug with all docs
│   │   └── STORY-001/     # Complete story with all docs
│   └── EPIC-002/
│       └── BUG-018/       # Will be moved here when complete
└── tasks/                  # NOT in version control (.gitignore)
    ├── EPIC-001/
    │   ├── BUG-001/       # Completed task files
    │   └── STORY-001/     # Completed task files
    └── EPIC-002/
        └── BUG-018/       # Will contain completed tasks

.gitignore entries:
archives/tasks/
.claude/
```

## Archival Process Steps

### When Completing a Bug/Story:

1. **Identify Completed Tasks**
   ```bash
   # Find all COMPLETED tasks
   grep -r "Status: COMPLETED" epics/*/bugs/*/tasks/
   grep -r "Status: COMPLETED" epics/*/stories/*/tasks/
   ```

2. **Archive Completed Tasks**
   ```bash
   # Move completed tasks out of version control
   mkdir -p archives/tasks/EPIC-XXX/BUG-XXX/
   mv epics/*/bugs/*/tasks/*COMPLETED*.md archives/tasks/EPIC-XXX/BUG-XXX/
   ```

3. **Archive Completed Bug/Story**
   ```bash
   # Move to completed archive (stays in version control)
   mkdir -p archives/completed/EPIC-XXX/
   mv epics/*/bugs/BUG-XXX archives/completed/EPIC-XXX/
   ```

4. **Update .gitignore**
   ```bash
   # Ensure these patterns exist
   echo "archives/tasks/" >> .gitignore
   echo ".claude/" >> .gitignore
   ```

5. **Commit Archival**
   ```bash
   git add archives/completed/
   git add .gitignore
   git commit -m "Archive completed BUG-XXX"
   ```

## Benefits

1. **Clean Working Directory**: Only active work visible
2. **Historical Reference**: Completed work preserved in `archives/completed/`
3. **No Task Clutter**: Completed tasks don't clutter version control
4. **Clear Status**: Easy to see what's active vs. archived

## Restoration Process

If you need to reference archived work:

### For Completed Bugs/Stories (in version control):
```bash
# Already available in archives/completed/
ls archives/completed/EPIC-XXX/BUG-XXX/
```

### For Archived Tasks (not in version control):
```bash
# Local reference only
ls archives/tasks/EPIC-XXX/BUG-XXX/
```

## Implementation Checklist

- [ ] Create `archives/completed/` directory
- [ ] Create `archives/tasks/` directory
- [ ] Update `.gitignore` with exclusions
- [ ] Document process in team guides
- [ ] Create helper scripts for archival