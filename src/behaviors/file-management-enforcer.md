# File Management Enforcer

**Purpose:** Prevent file bloat through intelligent file management validation  
**Type:** Core System Behavior  
**Status:** ACTIVE

## Core Behavioral Rules

### File Creation Decision Tree

**Before creating any file, validate through command:** Use `/icc-validate-file [file_path] [content_type]` to check enhancement possibility, validate necessity, apply naming conventions, and ensure proper directory placement.

### Enhancement vs Creation Logic

**Enhancement Triggers (prefer existing):**
- Adding section to existing documentation
- Extending behavioral patterns  
- Adding examples or clarifications
- Updating configuration options
- Adding test cases to existing suite

**Creation Triggers (new file justified):**
- New distinct module or behavior
- New work item (epic, story, bug, task)
- Separate concern requiring isolation
- New command or tool integration
- Domain-specific knowledge capture

## File Organization Rules

### Directory Placement
```yaml
root/:
  allowed: [README.md, LICENSE, CHANGELOG.md, Makefile, .gitignore]
  forbidden: [status reports, analysis files, working documents]

src/:
  behaviors/: Behavioral modules only
  commands/: Command definitions only
  roles/: Role specifications only
  modes/: Mode configurations only
  
docs/: All documentation except root README.md
epics/: Work item hierarchies only
knowledge/: Learning and pattern captures
analysis/: Research and analysis outputs
design/: Design documents and specifications
```

### Naming Conventions

**Primary Standard: lowercase-hyphenated**
```
Pattern: [domain]-[function]-[type].md
Rules:
  - All lowercase letters
  - Words separated by hyphens
  - No underscores, spaces, or camelCase
  - No UPPERCASE except work item IDs
  
Examples:
  ✓ file-management-enforcer.md
  ✓ role-assignment-validator.md
  ✗ FileManagementEnforcer.md
  ✗ FILE-MANAGEMENT-ENFORCER.md
```

**Exception List (UPPERCASE allowed):**
- README.md (root only)
- LICENSE
- CHANGELOG.md
- CONTRIBUTING.md
- CLAUDE.md
- Makefile

## Pre-Creation Validation

### Validation Steps

**Before any file write:** Use `/icc-validate-file [file_path] [content_type]` to check enhancement possibility, validate necessity, apply naming rules, ensure directory placement, and consider display-only alternatives

## Integration Points

### Write Tool Hook

**All Write tool usage must validate first:** Use `/icc-validate-file` before any file creation to block invalid files, get corrected filepath, and enhance existing files when appropriate

### Command Integration
**Commands creating files MUST:** Use `/icc-validate-file` to import file-management-enforcer, run pre-write validation, get corrected filenames, and follow directory placement

### Behavioral Reinforcement

**Scoring Integration:**
- +0.5P for enhancing existing files
- -1.0P for root directory violations
- +1.0Q for proper organization
- -2.0Q for UPPERCASE violations

**Learning Capture:**
- Track file creation patterns
- Identify violation trends
- Share prevention strategies

## Cleanup Behaviors

### Project Cleanliness

**Regular Monitoring:** Use `/icc-cleanup-project` to scan for naming violations, identify misplaced files, detect duplicate content, track cleanup opportunities, and report violation trends

## Error Prevention

### Common Violation Fixes
```yaml
README.md in subdirectories: → overview.md or remove
ARCHIVED.md: → archived-summary.md
UPPERCASE reports: → lowercase-hyphenated.md
Temporary files: → display-only output
Root pollution: → move to appropriate directory
```

### Proactive Monitoring
- Regular cleanliness checks
- Violation trend analysis
- Prevention pattern sharing
- Continuous improvement

---
*File management enforcer for intelligent-claude-code system*