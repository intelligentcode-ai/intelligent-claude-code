# Naming Convention Reference

**Purpose:** Quick reference guide for file and directory naming standards  
**Type:** Reference Documentation  
**Status:** ACTIVE

## Quick Reference

### Primary Rule: lowercase-hyphenated

**All files must use lowercase letters with hyphens between words.**

```
✓ CORRECT: file-management-enforcer.md
✗ WRONG:   FileManagementEnforcer.md
✗ WRONG:   file_management_enforcer.md
✗ WRONG:   FILE-MANAGEMENT-ENFORCER.md
```

## File Naming Patterns

### By File Type

#### Behavioral Modules (`/src/behaviors/`)
```yaml
Pattern: [domain]-[function]-[type].md

Examples:
  ✓ file-management-enforcer.md
  ✓ role-assignment-validator.md
  ✓ learning-team-automation.md
  ✓ git-privacy-enforcer.md
  ✓ autonomy-controller.md
```

#### Commands (`/src/commands/`)
```yaml
Pattern: icc-[action]-[target].md

Examples:
  ✓ icc-create-story.md
  ✓ icc-validate-work-type.md
  ✓ icc-archive-completed.md
  ✓ icc-system-status.md
  ✓ icc-activate-role.md
```

#### Documentation (`/docs/`)
```yaml
Pattern: [topic]-[document-type].md

Examples:
  ✓ file-management-standards.md
  ✓ naming-convention-reference.md
  ✓ workflow-integration-guide.md
  ✓ behavioral-patterns-guide.md
  ✓ installation-guide.md
```

#### Knowledge Files (`/knowledge/`)
```yaml
Pattern: [topic]-[type]-[date?].md

Examples:
  ✓ file-bloat-prevention-learnings.md
  ✓ naming-violations-patterns.md
  ✓ role-collaboration-insights-2025-01-20.md
  ✓ workflow-optimization-findings.md
```

#### Analysis Files (`/analysis/`)
```yaml
Pattern: [subject]-[analysis-type]-[report?].md

Examples:
  ✓ file-creation-patterns-report.md
  ✓ naming-violation-analysis.md
  ✓ behavior-effectiveness-study.md
  ✓ compliance-assessment-results.md
```

#### Design Documents (`/design/`)
```yaml
Pattern: [component]-[design-type]-[spec?].md

Examples:
  ✓ file-management-behavior-spec.md
  ✓ naming-convention-specification.md
  ✓ validation-system-design.md
  ✓ cleanup-process-architecture.md
```

## Work Item ID Patterns

### Standard Format: `TYPE-NUMBER`

```yaml
Format Rules:
  - TYPE: Always UPPERCASE (EPIC, STORY, BUG, TASK)
  - NUMBER: Three-digit minimum (001, 002, etc.)
  - Used in directory names with description

Examples:
  ✓ EPIC-001
  ✓ STORY-042
  ✓ BUG-084
  ✓ TASK-007
  
Directory Examples:
  ✓ /epics/EPIC-001-authentication/
  ✓ /bugs/BUG-084-file-bloat-prevention/
  ✓ /stories/STORY-015-task-numbering/
```

## Directory Naming

### Standard: lowercase-hyphenated

```yaml
Examples:
  ✓ /src/behaviors/
  ✓ /docs/guides/
  ✓ /epics/EPIC-001-authentication/
  ✓ /analysis/file-patterns/
  ✓ /design/behavior-specs/
  
Violations:
  ✗ /src/Behaviors/
  ✗ /docs/GUIDES/
  ✗ /TestResults/
  ✗ /Working_Files/
  ✗ /temp_analysis/
```

## Exception List

### Allowed UPPERCASE Files (Root Directory Only)

```yaml
Traditional Standards:
  ✓ README.md        # Industry standard
  ✓ LICENSE          # Legal convention
  ✓ CHANGELOG.md     # Version tracking
  ✓ CONTRIBUTING.md  # Open source convention
  ✓ CLAUDE.md        # System configuration
  ✓ Makefile         # Build tool convention

Everything Else:
  ✗ Any other UPPERCASE files are violations
```

## Validation Rules

### Character Set Validation

```regex
Files:       ^[a-z0-9-]+\.md$
Directories: ^[a-z0-9-]+$
Work IDs:    ^(EPIC|STORY|BUG|TASK)-\d{3,}$
Commands:    ^icc-[a-z-]+\.md$
```

### Length Guidelines

```yaml
Recommended:
  - 2-5 words typical
  - Maximum 7 words
  - Be descriptive but concise
  - Avoid abbreviations unless standard

Examples:
  ✓ file-management-enforcer.md (3 words)
  ✓ role-assignment-validator.md (3 words)
  ✗ very-long-extremely-detailed-comprehensive-file-management-system-enforcer.md (too long)
  ✗ fme.md (too abbreviated)
```

## Common Violations and Fixes

### UPPERCASE Violations

```yaml
❌ Before → ✅ After

ARCHIVED.md → archived-summary.md
PROJECT-CONTEXT.md → project-context.md
FIX-REPORT.md → bug-fix-analysis.md
STATUS-UPDATE.md → (don't create - display only)
ANALYSIS-RESULTS.md → analysis-results.md
VALIDATION-REPORT.md → validation-report.md
```

### CamelCase Violations

```yaml
❌ Before → ✅ After

FileManagementBehavior.md → file-management-behavior.md
RoleActivationSystem.md → role-activation-system.md
TaskCreationMandates.md → task-creation-mandates.md
ValidationSystemDesign.md → validation-system-design.md
WorkflowIntegrationGuide.md → workflow-integration-guide.md
```

### Underscore Violations

```yaml
❌ Before → ✅ After

file_management_enforcer.md → file-management-enforcer.md
auto_corrections.log → auto-corrections.log
test_results_summary.md → test-results-summary.md
role_assignment_validator.md → role-assignment-validator.md
naming_convention_guide.md → naming-convention-reference.md
```

### Space and Special Character Violations

```yaml
❌ Before → ✅ After

file management.md → file-management.md
role assignment (final).md → role-assignment-final.md
behavior&validation.md → behavior-validation.md
test@results.md → test-results.md
analysis#1.md → analysis-report-001.md
```

### Poor Naming Examples

```yaml
❌ Vague Names → ✅ Descriptive Names

temp.md → work-in-progress-analysis.md
data.yaml → configuration-data.yaml
new-file.md → [specific-purpose].md
stuff.md → [specific-content].md
doc.md → [specific-documentation].md
info.md → [specific-information].md
notes.md → [specific-topic]-notes.md
```

## Automated Correction Rules

### Simple Transformations

```yaml
Automatic Fixes:
  UPPERCASE → lowercase
  underscores → hyphens
  spaces → hyphens
  remove special chars (except hyphens and dots)
  
Examples:
  FILE_MANAGEMENT.md → file-management.md
  Role Assignment.md → role-assignment.md
  test&validation.md → test-validation.md
```

### Context-Based Corrections

```yaml
Context Rules:
  README.md in subdirs → overview.md or remove
  ARCHIVED.md → archived-summary.md
  temp* → [purpose]-temp.md or remove
  test* → [specific-test]-results.md
  data* → [specific-data]-config.md
```

## Validation Checklist

### Pre-Creation Validation

```yaml
File Name Check:
  - [ ] All lowercase letters?
  - [ ] Hyphens between words?
  - [ ] No underscores or spaces?
  - [ ] Descriptive and clear?
  - [ ] Follows type pattern?
  - [ ] Not in exception list (unless root)?

Directory Check:
  - [ ] Lowercase-hyphenated?
  - [ ] Includes ID if work item?
  - [ ] Proper hierarchy level?
  - [ ] No special characters?
```

### Post-Creation Review

```yaml
Compliance Verification:
  - [ ] Name follows standards?
  - [ ] Location appropriate?
  - [ ] No violations introduced?
  - [ ] References updated?
  - [ ] Git tracking correct?
```

## Quick Fix Commands

### Finding Violations

```bash
# Find UPPERCASE files (excluding exceptions)
find . -name "*.md" | grep -E '[A-Z]' | grep -v -E "(README|CHANGELOG|CONTRIBUTING|CLAUDE)\.md$"

# Find underscore violations
find . -name "*_*" -type f

# Find files in wrong locations
find . -maxdepth 1 -name "*.md" | grep -v -E "(README|CHANGELOG|CONTRIBUTING|CLAUDE)\.md$"

# Find CamelCase files
find . -name "*.md" | grep -E '([a-z][A-Z]|[A-Z][a-z])'
```

### Batch Corrections

```bash
# Convert UPPERCASE to lowercase (manual verification required)
for file in $(find . -name "*.md" | grep -E '[A-Z]' | grep -v -E "(README|CHANGELOG|CONTRIBUTING|CLAUDE)\.md$"); do
  new_name=$(echo "$file" | tr '[:upper:]' '[:lower:]')
  echo "Rename: $file → $new_name"
done

# Convert underscores to hyphens
for file in $(find . -name "*_*.md"); do
  new_name=$(echo "$file" | sed 's/_/-/g')
  echo "Rename: $file → $new_name"
done
```

## Integration Points

### Write Tool Integration

The naming validator should be called before any file creation:

```yaml
Validation Flow:
  1. Parse proposed filename
  2. Check against validation rules
  3. Apply automatic corrections
  4. Suggest improvements if needed
  5. Block creation if non-compliant
```

### Command Updates

All commands that create files must:

```yaml
Requirements:
  - Use naming validator
  - Apply corrections automatically
  - Follow directory placement rules
  - Generate compliant names
```

### Review Process

Include naming compliance in all reviews:

```yaml
Review Checklist:
  - File names follow standards
  - Directory placement correct
  - No violations introduced
  - Cleanup completed
```

---
*Naming convention reference for intelligent-claude-code system*