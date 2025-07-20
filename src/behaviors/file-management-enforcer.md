# File Management Enforcer

**Purpose:** Prevent file bloat through intelligent file management validation  
**Type:** Core System Behavior  
**Status:** ACTIVE

## Imports

@./shared-patterns/validation-patterns.md
@./shared-patterns/organization-patterns.md

## Core File Management

### Creation Validation (Using Shared Patterns)
- Apply File Creation Decision Tree from validation-patterns.md
- Use Enhancement vs Creation Logic patterns
- Follow Directory Placement rules from organization-patterns.md
- Implement Naming Conventions enforcement

### File Commands
- Use `/icc-validate-file [file_path] [content_type]` before ALL file creation
- Use `/icc-cleanup-project` for regular monitoring and violation detection
- Apply enhancement-first approach over new file creation

## Organization Rules

### Directory Structure (Using Shared Patterns)
- Apply Directory Placement from organization-patterns.md:
  - Root: Only essential files (README.md, LICENSE, Makefile, etc.)
  - src/: Organized by component type (behaviors/, commands/, roles/)
  - docs/: All documentation except root README.md
  - epics/: Work item hierarchies only

### Naming Standards (Using Shared Patterns)
- Follow lowercase-hyphenated convention: `[domain]-[function]-[type].md`
- Exceptions: README.md (root only), LICENSE, CHANGELOG.md, CLAUDE.md, Makefile
- No underscores, spaces, or camelCase in filenames

## Validation Patterns

### Pre-Creation Checks (Using Shared Patterns)
- Apply Write Tool Hook from validation-patterns.md
- Use enhancement possibility checking before creation
- Follow naming rule validation and correction
- Implement directory placement enforcement

### Behavioral Integration (Using Shared Patterns)
- Scoring: +0.5P enhancement, -1.0P violations, +1.0Q organization, -2.0Q UPPERCASE
- Learning: Track patterns, identify trends, share prevention strategies
- Monitoring: Regular scans, violation reports, cleanup opportunities

## Benefits

✅ **Bloat Prevention** - Enhancement-first approach reduces file proliferation
✅ **Organization Enforcement** - Consistent directory structure and naming
✅ **Learning Integration** - Pattern tracking and violation prevention
✅ **Automated Cleanup** - Regular monitoring and violation detection

---
*File management enforcer for intelligent-claude-code system*