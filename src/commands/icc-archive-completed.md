# Archive Completed

Archive all completed work items with cascading hierarchy and git-aware operations

## Usage
```bash
icc-archive-completed [--dry-run] [--force] [--type <type>]
```

## Parameters
- `--dry-run`: Preview what would be archived without executing
- `--force`: Archive items even if dependencies exist
- `--type <type>`: Archive only specific type (epic, story, bug)

## Implementation
Scans all epics for completed items with status "COMPLETED" and phase "ARCHIVED". Verifies all child items are complete. Executes cascading archival with Epic→Stories→Tasks hierarchy. Uses git mv for tracked files and organizes archives by type and date. Creates ARCHIVED.md summaries with completion metadata.

## Expected Output
```bash
📦 Archival Process

🔍 Scanning for completed items...
✅ Found 3 items ready for archival:
   - EPIC-001: User Management (3 stories, 8 tasks)
   - STORY-005: Login System (5 tasks)
   - BUG-002: Session Timeout (2 tasks)

📁 Archiving with cascading:
   ✅ EPIC-001 → archives/completed/epics/2025/07/
   ✅ STORY-005 → archives/completed/stories/2025/07/
   ✅ BUG-002 → archives/completed/bugs/2025/07/

🔧 Git operations:
   ✅ git mv operations completed
   ✅ Updated .gitignore for task archives
   ✅ Committed archival changes

📊 Summary:
   - 1 epic archived (cascaded 2 stories)
   - 1 story archived  
   - 1 bug archived
   - Git history preserved
```

## Archive Structure
- **Completed Items**: archives/completed/ (git-tracked)
- **Tasks**: archives/tasks/ (gitignored)
- **Organization**: By type, year, month
- **Summaries**: ARCHIVED.md with metadata

## Integration
- Implements archival-intelligence.md patterns
- Respects git_privacy settings for commit messages
- Creates hierarchical archive structure
- Maintains git history for completed work