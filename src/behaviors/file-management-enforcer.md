# File Management Enforcer

**Purpose:** Prevent file bloat through intelligent file management validation  
**Type:** Core System Behavior  
**Status:** ACTIVE

## Core Behavioral Rules

### File Creation Decision Tree

**Before creating any file, validate through these steps:**

1. **Enhancement Check:** Can this enhance an existing file? If yes, enhance rather than create new.
2. **Necessity Check:** Is this file truly necessary? If no, provide display-only output.
3. **Naming Check:** Does it follow lowercase-hyphenated conventions? If no, apply naming rules.
4. **Location Check:** Is it in the correct directory? If no, determine proper location.

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

### Pre-Write Validation

**File Creation Validation:** Use `/icc-validate-file [filepath] [content]` for comprehensive pre-write validation including existence checks, necessity validation, naming corrections, and directory placement

### Naming Validation

**Naming Convention Enforcement:** Use `/icc-validate-naming [filename]` for lowercase-hyphenated rule enforcement and exception handling

### Directory Validation

**Directory Placement Validation:** Use `/icc-validate-directory [filepath]` for proper directory routing and placement verification

## Integration Points

### Write Tool Hook

**All Write tool usage must call validation first:**
- Run pre-write validation before any file creation
- Block file creation if validation fails
- Use validated and corrected filepath
- Enhance existing files when appropriate rather than creating new ones

### Command Integration
**Commands creating files MUST:**
1. Import file-management-enforcer
2. Call preWriteValidation before Write
3. Use corrected filenames
4. Follow directory placement

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

### Project Cleanliness Check

**Project Cleanup:** Use `/icc-cleanup-files` for comprehensive project cleanliness validation and violation detection

### Automated Cleanup

**Automated File Cleanup:** Use `/icc-cleanup-project` for automated cleanup of violations with detailed reporting

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