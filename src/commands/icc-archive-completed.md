# Archive Completed

Archive completed work items using $ARGUMENTS as options.

## Behavioral Sequence
1. Verify current role is @PM:
   - If not @PM, respond "Error: Archival operations require @PM role. Current role: [current_role]"
2. Parse $ARGUMENTS for options:
   - --dry-run: Preview without executing
   - --force: Archive items without confirmation
   - --type: Filter by type (epic/story/bug)
   - --older-than: Archive items older than X days
   - ITEM-ID: Archive specific item by ID
3. If specific ITEM-ID provided:
   - Validate item exists and format (EPIC-XXX, STORY-XXX, BUG-XXX)
   - Check item status and phase
   - If not COMPLETED+ARCHIVED, prompt for confirmation
4. Scan for archival candidates:
   - Search all epics: `find epics/ -name "*.yaml" -type f`
   - Load each item and check criteria:
     * status: "COMPLETED"
     * phase: "ARCHIVED"
     * All child items completed (for epics/stories)
   - Apply filters (--type, --older-than) if specified
5. Display archival plan:
   ```
   📁 Archival Plan:
   Epics: [X] ready ([list of IDs])
   Stories: [Y] ready ([list of IDs])
   Bugs: [Z] ready ([list of IDs])
   Tasks: [A] ready (cascading from parents)
   ```
6. If --dry-run flag, display plan and exit without executing
7. Confirm archival unless --force flag:
   - Display: "Archive [X] items? (y/N)"
   - Wait for confirmation
   - If not confirmed, exit with "Archival cancelled"
8. Execute cascading archival for each item:

   **Epic Archival:**
   - Create archive path: `archives/completed/epics/[YEAR]/[MONTH]/[EPIC-ID]-[title-slug]/`
   - Move epic.yaml using: `git mv epics/[EPIC-ID]/epic.yaml [archive_path]/`
   - Automatically cascade to all child stories and bugs
   - Generate ARCHIVED.md summary with epic metrics

   **Story Archival:**
   - Create archive path: `archives/completed/stories/[YEAR]/[MONTH]/[STORY-ID]-[title-slug]/`
   - Move story.yaml using: `git mv epics/[EPIC-ID]/stories/[STORY-ID]/story.yaml [archive_path]/`
   - Automatically cascade to all child tasks
   - Generate ARCHIVED.md summary with story metrics

   **Bug Archival:**
   - Create archive path: `archives/completed/bugs/[YEAR]/[MONTH]/[BUG-ID]-[title-slug]/`
   - Move bug.yaml using: `git mv epics/[EPIC-ID]/bugs/[BUG-ID]/bug.yaml [archive_path]/`
   - Automatically cascade to all child tasks
   - Generate ARCHIVED.md summary with bug resolution details

   **Task Archival (Cascading):**
   - Create archive path: `archives/tasks/[YEAR]/[MONTH]/[PARENT-ID]/`
   - Move task files using file operations (tasks not git-tracked)
   - Update .gitignore to include task archives

9. Generate ARCHIVED.md summary for each item:
   ```markdown
   # ARCHIVED: [ITEM-ID] - [Title]
   
   **Archived Date**: [current_date]
   **Original Location**: [original_path]
   **Completion Date**: [completion_date]
   **Total Duration**: [X] days
   
   ## Summary
   [Item description and outcomes]
   
   ## Metrics
   - Estimated Hours: [X]
   - Actual Hours: [Y]
   - Tasks Completed: [Z]
   - Success Rate: [%]
   
   ## Key Learnings
   [Captured learnings and insights]
   
   ## Files Archived
   - [list of archived files]
   ```

10. Update parent references:
    - Remove archived items from parent arrays
    - Update progress metrics
    - Maintain referential integrity
11. Commit archival operations:
    - Create comprehensive commit: "chore: Archive completed items - [list of IDs]"
    - Include all git mv operations and summary files
12. Display archival results:
    "✅ Archival completed successfully"
    "📁 Archived [X] epics, [Y] stories, [Z] bugs, [A] tasks"
    "📊 Total: [B] files moved, [C] summaries generated"
    "🗃️ Archive location: archives/completed/"
13. Update activity log and PM scores (+1.0P for successful archival)

## Error Handling
- Not PM role: "Error: Archival operations require @PM role"
- Invalid item ID: "Error: Item ID must be EPIC-XXX, STORY-XXX, or BUG-XXX format"
- Item not found: "Error: Item [ITEM-ID] not found"
- Item not ready: "Error: Item [ITEM-ID] not ready for archival (status: [status], phase: [phase])"
- Child items incomplete: "Error: Cannot archive [ITEM-ID] - child items not completed"
- Git operation failed: "Error: Git archival failed: [specific error]"
- File system error: "Error: Could not create archive directory: [specific error]"
- Permission denied: "Error: Insufficient permissions for archival operations"

## Archive Structure
```
archives/
├── completed/              # Git-tracked archives
│   ├── epics/2025/01/EPIC-001-user-auth/
│   │   ├── ARCHIVED.md
│   │   └── epic.yaml
│   ├── stories/2025/01/STORY-001-login-page/
│   │   ├── ARCHIVED.md
│   │   └── story.yaml
│   └── bugs/2025/01/BUG-001-timeout-issue/
│       ├── ARCHIVED.md
│       └── bug.yaml
└── tasks/                  # Not git-tracked
    └── 2025/01/
        ├── EPIC-001/STORY-001/TASK-001.md
        └── BUG-001/TASK-001.md
```

## Readiness Criteria
- **Epic**: status=COMPLETED, phase=ARCHIVED, all stories/bugs completed
- **Story**: status=COMPLETED, phase=ARCHIVED, all tasks completed
- **Bug**: status=RESOLVED, phase=ARCHIVED, all tasks completed
- **Task**: Automatically cascades from parent archival

## Recovery Operations
- Use `git log --follow` to track archived items
- Restore with reverse git operations if needed
- ARCHIVED.md contains all restoration information

## Command Chaining
- Archival results can trigger cleanup operations
- Success metrics feed into reporting systems
- Archive summaries support historical analysis