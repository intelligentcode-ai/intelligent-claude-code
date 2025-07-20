# Naming Convention Specification

**Purpose:** Enforce consistent naming standards across all system files  
**Type:** System Standard  
**Status:** SPECIFIED

## Naming Convention Hierarchy

### Primary Standard: lowercase-hyphenated

**Applies to:**
- All behavioral modules: `file-management-enforcer.md`
- All commands: `icc-create-story.md`
- All documentation: `naming-convention-guide.md`
- All knowledge files: `file-bloat-learnings.md`
- All analysis files: `pattern-analysis-report.md`
- All design documents: `behavior-design-spec.md`

**Format Rules:**
```
- All lowercase letters
- Words separated by hyphens
- No underscores, spaces, or camelCase
- No special characters except hyphens
- Clear, descriptive names
- 2-5 words typical (max 7)
```

**Examples:**
```
✓ file-management-enforcer.md
✓ role-assignment-validator.md
✓ git-privacy-enforcer.md
✗ FileManagementEnforcer.md
✗ file_management_enforcer.md
✗ FILE-MANAGEMENT-ENFORCER.md
```

### Secondary Standard: Work Item IDs

**Format:** `TYPE-NUMBER`
- TYPE: Always UPPERCASE (EPIC, STORY, BUG, TASK)
- NUMBER: Three-digit minimum (001, 002, etc.)
- Used in directory names with description

**Examples:**
```
✓ EPIC-001
✓ STORY-042
✓ BUG-084
✓ BUG-084-file-bloat-prevention (directory)
✗ epic-001
✗ Bug-084
✗ EPIC_001
```

### Exception List: Traditional UPPERCASE

**ONLY these files may use UPPERCASE:**
```
README.md       - Industry standard
LICENSE         - Legal convention
CHANGELOG.md    - Version tracking standard
CONTRIBUTING.md - Open source convention
CLAUDE.md       - System configuration file
Makefile        - Build tool convention
```

**All other UPPERCASE files are violations.**

## Detailed Naming Patterns

### By File Type

#### Behavioral Modules (/src/behaviors/)
```
Pattern: [domain]-[function]-[type].md
Examples:
- file-management-enforcer.md
- role-activation-system.md
- learning-team-automation.md
- git-privacy-enforcer.md
```

#### Commands (/src/commands/)
```
Pattern: icc-[action]-[target].md
Examples:
- icc-create-story.md
- icc-detect-work-type.md
- icc-archive-completed.md
- icc-system-status.md
```

#### Documentation (/docs/)
```
Pattern: [topic]-[document-type].md
Examples:
- file-management-guide.md
- naming-convention-reference.md
- workflow-integration-guide.md
- behavioral-patterns-guide.md
```

#### Knowledge Files (/knowledge/)
```
Pattern: [topic]-[learning-type]-[date].md
Examples:
- file-bloat-prevention-2025-01-20.md
- naming-violations-learnings.md
- organization-patterns-insights.md
```

#### Work Items
```
Epics:    /epics/EPIC-XXX-[description]/epic.yaml
Stories:  /epics/../stories/STORY-XXX-[description]/story.yaml
Bugs:     /epics/../bugs/BUG-XXX-[description]/bug.yaml
Tasks:    /epics/../tasks/TASK-XXX-[description].md
```

### By Directory

#### Directory Naming Rules
```
- Always lowercase-hyphenated
- Include ID for work items
- Descriptive but concise
- Logical hierarchy
```

**Examples:**
```
✓ /src/behaviors/
✓ /docs/guides/
✓ /epics/EPIC-001-authentication/
✓ /bugs/BUG-084-file-bloat-prevention/
✗ /src/Behaviors/
✗ /docs/GUIDES/
✗ /TestResults/
```

## Validation Rules

### Automated Validation

1. **Character Set Validation**
   ```regex
   ^[a-z0-9-]+\.md$  # For files
   ^[a-z0-9-]+$      # For directories
   ```

2. **Work Item ID Validation**
   ```regex
   ^(EPIC|STORY|BUG|TASK)-\d{3,}$
   ```

3. **Command Name Validation**
   ```regex
   ^icc-[a-z-]+\.md$
   ```

### Manual Review Checks

**File Name Review:**
- [ ] All lowercase (except IDs)?
- [ ] Hyphens between words?
- [ ] Descriptive and clear?
- [ ] Follows type pattern?
- [ ] No UPPERCASE violations?

**Directory Review:**
- [ ] Lowercase-hyphenated?
- [ ] Includes ID if work item?
- [ ] Proper hierarchy?
- [ ] No special characters?

## Common Violations and Fixes

### UPPERCASE Violations
```
Before: ARCHIVED.md
After:  archived-summary.md

Before: PROJECT-CONTEXT.md
After:  project-context.md (move to /docs/)

Before: FIX-REPORT.md
After:  bug-fix-analysis.md

Before: README.md (in subdirectories)
After:  Remove or consolidate into parent docs
```

### CamelCase Violations
```
Before: FileManagementBehavior.md
After:  file-management-behavior.md

Before: RoleActivationSystem.md
After:  role-activation-system.md

Before: TaskCreationMandates.md
After:  task-creation-mandates.md
```

### Underscore Violations
```
Before: file_management_enforcer.md
After:  file-management-enforcer.md

Before: auto_corrections.log
After:  auto-corrections.log

Before: test_results_summary.md
After:  test-results-summary.md
```

### Poor Naming
```
Before: temp.md
After:  work-in-progress-analysis.md

Before: data.yaml
After:  configuration-data.yaml

Before: new-file.md
After:  [specific-purpose-description].md
```

## Enforcement Mechanisms

### Pre-Creation Checks
```markdown
1. Parse proposed filename
2. Check against validation regex
3. Suggest corrections if invalid
4. Block creation if non-compliant
```

### Automated Correction
```markdown
For simple violations:
- UPPERCASE → lowercase
- Underscores → hyphens
- Spaces → hyphens
- Remove special characters
```

### Integration Points

**Write Tool Hook:**
- Validate filename before write
- Auto-correct simple issues
- Block invalid names
- Suggest alternatives

**Command Updates:**
- Fix hardcoded UPPERCASE names
- Use naming validator
- Apply conventions

**Review Process:**
- Check all new files
- Validate renames
- Enforce standards

## Migration Strategy

### Phase 1: Stop New Violations
1. Implement validator
2. Update commands
3. Block violations

### Phase 2: Fix Existing
1. Rename UPPERCASE files
2. Fix underscore names
3. Improve poor names

### Phase 3: Maintain Standards
1. Regular audits
2. Update validation
3. Track compliance

## Benefits

**Consistency:**
- Uniform appearance
- Professional codebase
- Easy scanning

**Searchability:**
- Predictable patterns
- Grep-friendly
- Clear organization

**Maintainability:**
- Self-documenting
- Logical structure
- Reduced confusion

---
*Naming convention specification for intelligent-claude-code*