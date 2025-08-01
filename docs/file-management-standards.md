# File Management Standards

**Purpose:** Comprehensive standards for file creation, naming, and organization  
**Type:** Project Documentation  
**Status:** ACTIVE

## Overview

This document establishes comprehensive file management standards for the intelligent-claude-code system to prevent file bloat, maintain organization, and ensure professional codebase standards.

## File Creation Rules

### Decision Tree for File Creation

**ALWAYS evaluate before creating any file:**

```
1. Can this enhance an existing file?
   YES → Enhance existing file (preferred approach)
   NO → Continue to step 2

2. Is this file truly necessary?
   NO → Use display-only output instead
   YES → Continue to step 3

3. Does it follow naming conventions?
   NO → Apply naming rules and corrections
   YES → Continue to step 4

4. Is it in the correct directory?
   NO → Determine and use proper location
   YES → Create file with validation
```

### Required Validations Before File Creation

#### 1. Existence Check
```yaml
Search Criteria:
  - Similar files in target directory
  - Related files in parent directories
  - Duplicate content verification
  - Cross-reference existing documentation

Actions:
  - If similar file exists: Enhance instead of create
  - If duplicate content: Consolidate into existing
  - If related content: Add section to existing file
```

#### 2. Necessity Validation
```yaml
Content Assessment:
  - Is this display-only information?
  - Is this temporary or permanent?
  - Does this provide ongoing value?
  - Can this be incorporated elsewhere?

Decision Matrix:
  - Status updates: Display only (no file)
  - Temporary analysis: Display only (no file)
  - Reusable documentation: Create file
  - Permanent knowledge: Create file
  - One-time reports: Display only (no file)
```

#### 3. Directory Organization
```yaml
Content Routing:
  - Behavioral patterns → /src/behaviors/
  - Commands → /src/commands/
  - Documentation → /docs/
  - Work items → /epics/EPIC-XXX/
  - Knowledge capture → /knowledge/
  - Analysis reports → /analysis/ (within work item)
  - Design documents → /design/ (within work item)
```

## Naming Conventions

### Primary Standard: lowercase-hyphenated

**Applies to ALL files except specific exceptions:**

```yaml
Format Rules:
  - All lowercase letters
  - Words separated by hyphens
  - No underscores, spaces, or camelCase
  - No special characters except hyphens
  - Clear, descriptive names
  - 2-5 words typical (maximum 7)

Pattern: [domain]-[function]-[type].md
```

**Examples:**
```
✓ file-management-standards.md
✓ role-assignment-validator.md
✓ git-privacy-enforcer.md
✓ workflow-integration-guide.md

✗ FileManagementStandards.md
✗ file_management_standards.md
✗ FILE-MANAGEMENT-STANDARDS.md
✗ fileManagementStandards.md
```

### Work Item ID Standard

**Format:** `TYPE-NUMBER`
```yaml
Rules:
  - TYPE: Always UPPERCASE (EPIC, STORY, BUG, TASK)
  - NUMBER: Three-digit minimum (001, 002, etc.)
  - Used in directory names with description

Examples:
  ✓ EPIC-001
  ✓ STORY-042
  ✓ BUG-084
  ✓ BUG-084-file-bloat-prevention (directory)
  
  ✗ epic-001
  ✗ Bug-084
  ✗ EPIC_001
```

### Exception List: Traditional UPPERCASE

**ONLY these files may use UPPERCASE (in root directory only):**
```
README.md       - Industry standard
LICENSE         - Legal convention
CHANGELOG.md    - Version tracking standard
CONTRIBUTING.md - Open source convention
CLAUDE.md       - System configuration file
Makefile        - Build tool convention
```

**All other UPPERCASE files are violations and must be corrected.**

### Naming Patterns by File Type

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
- icc-archive-completed.md
- icc-system-status.md
```

#### Documentation (/docs/)
```
Pattern: [topic]-[document-type].md
Examples:
- file-management-standards.md
- naming-convention-reference.md
- workflow-integration-guide.md
- behavioral-patterns-guide.md
```

#### Knowledge Files (/knowledge/)
```
Pattern: [topic]-[learning-type]-[date].md
Examples:
- file-bloat-prevention-learnings-2025-01-20.md
- naming-violations-patterns.md
- organization-improvement-insights.md
```

## Folder Organization Requirements

### Directory Structure Standards

```yaml
root/:
  allowed_files:
    - README.md
    - LICENSE
    - CHANGELOG.md
    - Makefile
    - .gitignore
    - PROJECT-CONTEXT.md (temporary, should move to docs/)
  forbidden_content:
    - Status reports
    - Analysis files
    - Working documents
    - Context files
    - Temporary documents

src/:
  behaviors/: Behavioral modules only
  commands/: Command definitions only
  roles/: Role specifications only
  modes/: Mode configurations only
  config.md: System configuration

docs/:
  guides/: How-to documentation
  architecture/: System design docs
  api/: Command/behavior reference
  features/: Feature documentation

epics/:
  EPIC-XXX-[description]/: 
    epic.yaml: Epic definition
    stories/: Story subdirectories
    bugs/: Bug subdirectories
    knowledge/: Epic-level learnings

work-items/:
  tasks/: Task definitions
  knowledge/: Work-specific learnings
  analysis/: Research outputs
  design/: Design documents
```

### Directory Naming Rules

```yaml
Standards:
  - Always lowercase-hyphenated
  - Include ID for work items
  - Descriptive but concise
  - Logical hierarchy
  - No special characters

Examples:
  ✓ /src/behaviors/
  ✓ /docs/guides/
  ✓ /epics/EPIC-001-authentication/
  ✓ /bugs/BUG-084-file-bloat-prevention/
  
  ✗ /src/Behaviors/
  ✗ /docs/GUIDES/
  ✗ /TestResults/
  ✗ /Working_Files/
```

## Common Violations and Corrections

### UPPERCASE Violations
```yaml
Before: ARCHIVED.md
After:  archived-summary.md (move to appropriate directory)

Before: PROJECT-CONTEXT.md
After:  project-context.md (move to /docs/)

Before: FIX-REPORT.md
After:  bug-fix-analysis.md (move to /analysis/)

Before: README.md (in subdirectories)
After:  Remove or consolidate into parent documentation
```

### CamelCase Violations
```yaml
Before: FileManagementBehavior.md
After:  file-management-behavior.md

Before: RoleActivationSystem.md
After:  role-activation-system.md

Before: TaskCreationMandates.md
After:  task-creation-mandates.md
```

### Underscore Violations
```yaml
Before: file_management_enforcer.md
After:  file-management-enforcer.md

Before: auto_corrections.log
After:  auto-corrections.log

Before: test_results_summary.md
After:  test-results-summary.md
```

### Poor Naming Examples
```yaml
Before: temp.md
After:  [specific-purpose-description].md

Before: data.yaml
After:  configuration-data.yaml

Before: new-file.md
After:  [specific-purpose-description].md

Before: stuff.md
After:  [specific-content-description].md
```

## Cleanup Guide

### Project Maintenance Procedures

#### Weekly Cleanup Tasks
```yaml
1. Root Directory Audit:
   - Check for unauthorized files
   - Move misplaced documents
   - Remove temporary files
   - Verify only allowed files remain

2. Naming Convention Review:
   - Scan for UPPERCASE violations
   - Check camelCase files
   - Fix underscore usage
   - Correct poor naming

3. Directory Organization:
   - Verify proper file placement
   - Consolidate duplicate content
   - Move misplaced files
   - Clean empty directories
```

#### Monthly Deep Cleanup
```yaml
1. Content Consolidation:
   - Merge similar documents
   - Remove outdated files
   - Update cross-references
   - Archive completed work

2. Structure Optimization:
   - Review directory efficiency
   - Simplify complex hierarchies
   - Improve logical grouping
   - Enhance discoverability

3. Quality Assessment:
   - Check documentation currency
   - Validate file relevance
   - Remove dead content
   - Update standards compliance
```

### Prevention Strategies

#### Proactive Measures
```yaml
1. Pre-Creation Validation:
   - Always check if file is necessary
   - Search for existing similar content
   - Validate naming conventions
   - Confirm proper directory placement

2. Creation Guidelines:
   - Prefer enhancing existing files
   - Use descriptive, clear names
   - Follow established patterns
   - Document file purpose

3. Review Integration:
   - Include file management in peer reviews
   - Check naming convention compliance
   - Validate directory placement
   - Ensure cleanup completion
```

#### Automated Prevention
```yaml
1. Write Tool Integration:
   - Pre-write validation hooks
   - Naming convention checks
   - Directory placement validation
   - Enhancement opportunity detection

2. Command Updates:
   - Remove UPPERCASE generation
   - Apply naming validators
   - Use proper directory routing
   - Include cleanup procedures

3. Continuous Monitoring:
   - Regular compliance scans
   - Violation detection alerts
   - Trend analysis reporting
   - Improvement recommendations
```

### Cleanup Commands and Procedures

#### Manual Cleanup Steps
```bash
# 1. Audit root directory
ls -la / | grep -v "README.md\|LICENSE\|CHANGELOG.md\|Makefile\|.gitignore"

# 2. Find UPPERCASE violations
find . -name "*.md" | grep -E '[A-Z]' | grep -v "README.md\|LICENSE\|CHANGELOG.md"

# 3. Find underscore violations
find . -name "*_*" -type f

# 4. Check for misplaced files
find . -maxdepth 1 -name "*.md" | grep -v "README.md\|CHANGELOG.md"
```

#### Systematic Cleanup Process
```yaml
1. Assessment Phase:
   - Generate violation report
   - Categorize issues by type
   - Prioritize by impact
   - Plan correction sequence

2. Correction Phase:
   - Fix naming violations
   - Move misplaced files
   - Consolidate duplicates
   - Remove unnecessary files

3. Verification Phase:
   - Re-run compliance checks
   - Validate file functionality
   - Update references
   - Document changes

4. Prevention Phase:
   - Update validation rules
   - Enhance detection patterns
   - Share learnings
   - Monitor compliance
```

## Implementation Guidelines

### Integration with Development Workflow

#### Pre-Commit Checks
```yaml
File Creation Review:
  - [ ] File necessity validated?
  - [ ] Existing enhancement considered?
  - [ ] Naming conventions followed?
  - [ ] Correct directory placement?
  - [ ] Cleanup completed?
```

#### Peer Review Checklist
```yaml
File Management Review:
  - [ ] No unnecessary files created?
  - [ ] All names follow lowercase-hyphenated?
  - [ ] Proper directory organization?
  - [ ] Existing files enhanced when possible?
  - [ ] UPPERCASE violations corrected?
  - [ ] Temporary files removed?
```

### Scoring and Reinforcement

#### Performance Scoring
```yaml
Positive Actions:
  - +0.5P for enhancing existing files
  - +1.0Q for proper organization
  - +0.5Q for naming compliance
  - +1.0P for cleanup activities

Penalty Actions:
  - -1.0P for root directory violations
  - -2.0Q for UPPERCASE violations
  - -0.5P for poor naming
  - -1.0Q for creating unnecessary files
```

#### Learning Integration
```yaml
Pattern Capture:
  - Track file creation decisions
  - Monitor violation trends
  - Share prevention strategies
  - Document success patterns

Continuous Improvement:
  - Regular compliance assessment
  - Update standards based on learnings
  - Refine validation rules
  - Enhance automation
```

## Success Metrics

### Quantitative Targets
```yaml
Compliance Goals:
  - 90% reduction in root directory files
  - 100% lowercase naming compliance
  - 75% enhancement vs new creation ratio
  - 0 UPPERCASE violations
  - 95% proper directory placement

Quality Indicators:
  - File discoverability improvement
  - Reduced duplicate content
  - Faster navigation times
  - Lower maintenance overhead
```

### Qualitative Benefits
```yaml
Organization Benefits:
  - Cleaner project structure
  - Professional appearance
  - Easier navigation
  - Reduced confusion
  - Better maintainability

Development Benefits:
  - Faster file location
  - Predictable patterns
  - Self-documenting structure
  - Reduced cognitive load
  - Enhanced productivity
```

## Conclusion

These file management standards provide comprehensive guidance for maintaining a clean, organized, and professional codebase. By following these rules and procedures, the intelligent-claude-code system will remain maintainable, navigable, and professional while preventing the file bloat that can make projects unusable.

Regular adherence to these standards, combined with proactive cleanup and continuous improvement, ensures a sustainable and high-quality development environment for all team members.

---
*File management standards for intelligent-claude-code system*