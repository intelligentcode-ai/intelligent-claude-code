# icc:archive-completed

Archive all completed work items with cascading hierarchy and git-aware operations.

## Usage
```
/icc:archive-completed
/icc:archive-completed --dry-run
```

## Parameters
- `--dry-run`: Preview what would be archived without executing

## Implementation
Follows archival-intelligence.md command-driven archival system:

1. **Completion Detection**: Scan all epics for completed items
2. **Readiness Check**: Verify all tasks/stories/bugs are complete
3. **Cascading Archival**: Epic→Stories→Tasks automatic hierarchy
4. **Git Operations**: Use git mv for tracked files
5. **Archive Structure**: Organized by type and date
6. **Summary Generation**: Create ARCHIVED.md summaries

## Expected Output
```
📦 Archival Process

🔍 Scanning for completed items...
✅ Found 3 items ready for archival:
   - EPIC-001: User Management (3 stories, 8 tasks)
   - STORY-005: Login System (5 tasks)
   - BUG-002: Session Timeout (2 tasks)

📁 Archiving with cascading:
   ✅ EPIC-001 → archives/completed/epics/2025/07/
      ├── STORY-001 → archived with epic
      ├── STORY-002 → archived with epic
      └── 8 tasks → archives/tasks/2025/07/EPIC-001/
   
   ✅ STORY-005 → archives/completed/stories/2025/07/
      └── 5 tasks → archives/tasks/2025/07/STORY-005/

🔧 Git operations:
   ✅ git mv epics/EPIC-001 archives/completed/epics/2025/07/
   ✅ Updated .gitignore for task archives
   ✅ Committed archival changes

📊 Summary:
   - 1 epic archived (cascaded 2 stories)
   - 1 story archived  
   - 13 tasks archived
   - Git history preserved
```

## Integration
- Implements archival-intelligence.md patterns
- Respects git_privacy settings for commit messages
- Creates hierarchical archive structure
- Maintains git history for completed work