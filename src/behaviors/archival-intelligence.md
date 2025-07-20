# Archival Intelligence

**Purpose:** Command-driven workspace cleanup with cascading archival

## Imports
@./shared-patterns/organization-patterns.md
@./shared-patterns/git-patterns.md

## Core Operations

**Commands:** `/icc-archive-completed [--dry-run|item_id]` • PM commands: `@PM archive-*`
**Detection:** Scan COMPLETED+ARCHIVED items → Check children complete → Apply cascading logic
**Structure:** `archives/completed/type/year/month/` with ARCHIVED.md summaries
**Git Integration:** Use `git mv` for tracked files, file operations for tasks

## Integration
- PM role extensions with status/metrics
- Manual workflow with rollback support  
- Learning capture for patterns

## Benefits
✅ Command-driven cleanup ✅ Cascading hierarchy ✅ Git-aware operations ✅ Historical preservation