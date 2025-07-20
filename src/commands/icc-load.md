# Load

Force-load virtual team behavioral patterns using $ARGUMENTS.

## Arguments
`[--force] [--validate] [--verbose] [--modules:specific,modules]`

## Behavior
- Parse options from $ARGUMENTS
- Load configuration hierarchy: ~/.claude/CLAUDE.md → config.md → project config
- Follow import chains: modes/virtual-team.md, roles/specialists.md, behaviors/*.md
- Initialize: workflow executor, memory, role system, command chains
- Validate all imports resolve and patterns load correctly
- Check enforcement validation: self-correcting patterns active
- Display loading progress if --verbose, summary otherwise

## Errors
- Import failed → "Cannot resolve import: [path]"
- Pattern invalid → "Invalid behavioral pattern: [module]"
- Config missing → "Configuration file not found"
- Module error → "Module load failed: [name]"
- Enforcement inactive → "⚠️ Self-correcting enforcement not active"