# Cleanup Project

Clean up project-wide issues using $ARGUMENTS.

## Arguments
`Scope: structure|files|references|all | Mode: safe|aggressive | DryRun: true|false | Backup: true|false`

## Behavior
- Parse scope/mode from $ARGUMENTS, create backup if requested
- Structure: Fix directories, naming, hierarchy, parent-child refs
- Files: Remove obsolete/duplicate/temp files, fix malformed
- References: Fix broken links, orphans, circular deps, ID mismatches
- Apply fixes based on mode (safe preserves, aggressive removes)
- Generate cleanup report with statistics

## Errors
- Invalid scope → "Unknown cleanup scope"
- No issues → "Project is clean"
- Fix failed → "Error applying fixes, backup available"
- Access denied → "Cannot modify files"