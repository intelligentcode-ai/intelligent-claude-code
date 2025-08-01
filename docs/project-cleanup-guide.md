# Project Cleanup Guide

**Purpose:** Comprehensive guide for maintaining project cleanliness and organization  
**Type:** Maintenance Documentation  
**Status:** ACTIVE

## Overview

This guide provides systematic procedures for maintaining a clean, organized codebase by preventing file bloat, correcting naming violations, and implementing sustainable maintenance practices.

## Cleanup Procedures

### Daily Maintenance (2-3 minutes)

#### Quick File Audit
```bash
# Check root directory for violations
ls -la | grep -v "README.md\|LICENSE\|CHANGELOG.md\|Makefile\|.gitignore\|CLAUDE.md"

# Scan for new UPPERCASE violations
find . -name "*.md" -path "*/[A-Z]*" | head -10

# Check for underscore files
find . -name "*_*" -type f | head -5
```

#### Immediate Fixes
```yaml
Action Items:
  - Move any misplaced files to correct directories
  - Rename obvious violations (simple cases)
  - Remove obvious temporary files
  - Note complex issues for weekly cleanup
```

### Weekly Cleanup (15-20 minutes)

#### Comprehensive Directory Audit

**1. Root Directory Cleanup**
```bash
# List all files in root
ls -la /

# Check for violations
violations=$(ls -la / | grep -v -E "(README|LICENSE|CHANGELOG|Makefile|\.gitignore|CLAUDE)\.md|^d")
if [ ! -z "$violations" ]; then
  echo "Root directory violations found:"
  echo "$violations"
fi
```

**2. Naming Convention Sweep**
```bash
# Find all UPPERCASE violations
echo "=== UPPERCASE Violations ==="
find . -name "*.md" | grep -E '[A-Z]' | grep -v -E "(README|CHANGELOG|CONTRIBUTING|CLAUDE)\.md$" | head -20

# Find underscore violations  
echo "=== Underscore Violations ==="
find . -name "*_*" -type f | head -20

# Find CamelCase violations
echo "=== CamelCase Violations ==="
find . -name "*.md" | grep -E '([a-z][A-Z]|[A-Z][a-z])' | head -20
```

**3. Directory Organization Check**
```bash
# Check for misplaced files
echo "=== Files in Root (should be moved) ==="
find . -maxdepth 1 -name "*.md" | grep -v -E "(README|CHANGELOG|CONTRIBUTING|CLAUDE)\.md$"

# Check for files that should be consolidated
echo "=== Potential Duplicates ==="
find . -name "*report*" -o -name "*status*" -o -name "*summary*" | head -15
```

#### Systematic Corrections

**Priority 1: Root Directory Violations**
```yaml
Process:
  1. Identify all non-allowed files in root
  2. Determine correct location for each
  3. Move files to appropriate directories
  4. Update any references or links
  5. Verify no broken links created

Example Moves:
  PROJECT-CONTEXT.md → docs/project-context.md
  ANALYSIS-REPORT.md → analysis/analysis-report.md
  STATUS-UPDATE.md → (remove - display only)
  FIX-SUMMARY.md → knowledge/fix-summary.md
```

**Priority 2: UPPERCASE Violations**
```yaml
Process:
  1. List all UPPERCASE files (excluding exceptions)
  2. Determine appropriate lowercase names
  3. Check for content type and proper location
  4. Rename files with git mv if tracked
  5. Update references and imports

Example Renames:
  ARCHIVED.md → archived-summary.md
  VALIDATION-REPORT.md → validation-report.md
  BEHAVIORAL-PATTERNS.md → behavioral-patterns.md
```

**Priority 3: Underscore and Special Character Violations**
```yaml
Process:
  1. Find all files with underscores
  2. Convert underscores to hyphens
  3. Check for other special characters
  4. Apply consistent naming pattern
  5. Update references

Example Fixes:
  file_management_enforcer.md → file-management-enforcer.md
  test_results.md → test-results.md
  auto_corrections.log → auto-corrections.log
```

### Monthly Deep Cleanup (45-60 minutes)

#### Content Consolidation Assessment

**1. Duplicate Content Analysis**
```bash
# Find potentially duplicate files
echo "=== Similar Named Files ==="
find . -name "*.md" | sed 's/.*\///' | sort | uniq -d

# Find files with similar content patterns
echo "=== Files with 'report' in name ==="
find . -name "*report*" -type f

echo "=== Files with 'analysis' in name ==="
find . -name "*analysis*" -type f

echo "=== Files with 'guide' in name ==="
find . -name "*guide*" -type f
```

**2. Content Quality Review**
```yaml
Assessment Criteria:
  - Is content still relevant?
  - Can multiple files be merged?
  - Are files properly categorized?
  - Do files follow current standards?
  - Are references and links current?

Consolidation Rules:
  - Merge related reports into comprehensive documents
  - Combine multiple guides into single reference
  - Archive outdated analysis documents
  - Update deprecated references
```

**3. Structure Optimization**
```yaml
Directory Review:
  - Check for empty directories
  - Verify logical file grouping
  - Assess hierarchy effectiveness
  - Identify reorganization opportunities

File Organization:
  - Group related documentation
  - Separate concerns appropriately
  - Maintain clear content boundaries
  - Enhance discoverability
```

#### Advanced Cleanup Procedures

**1. Automated Scanning Script**
```bash
#!/bin/bash
# cleanup-scan.sh - Comprehensive project cleanup scanner

echo "=== PROJECT CLEANUP SCAN ==="
echo "Generated: $(date)"
echo

# Root directory violations
echo "ROOT DIRECTORY VIOLATIONS:"
find . -maxdepth 1 -type f | grep -v -E "(README|LICENSE|CHANGELOG|Makefile|\.gitignore|CLAUDE)" || echo "None found"
echo

# UPPERCASE violations
echo "UPPERCASE NAMING VIOLATIONS:"
find . -name "*.md" | grep -E '[A-Z]' | grep -v -E "(README|CHANGELOG|CONTRIBUTING|CLAUDE)\.md$" | head -20 || echo "None found"
echo

# Underscore violations
echo "UNDERSCORE VIOLATIONS:"
find . -name "*_*" -type f | head -20 || echo "None found"
echo

# CamelCase violations
echo "CAMELCASE VIOLATIONS:"
find . -name "*.md" | grep -E '([a-z][A-Z]|[A-Z][a-z])' | head -20 || echo "None found"
echo

# Potential duplicates
echo "POTENTIAL DUPLICATE PATTERNS:"
echo "Reports:"
find . -name "*report*" -type f | head -10
echo "Status files:"
find . -name "*status*" -type f | head -10
echo "Analysis files:"
find . -name "*analysis*" -type f | head -10
echo

# Directory health
echo "DIRECTORY HEALTH:"
echo "Empty directories:"
find . -type d -empty | head -10 || echo "None found"
echo "Large directories (>20 files):"
find . -type d -exec sh -c 'echo "$(find "$1" -maxdepth 1 -type f | wc -l) $1"' _ {} \; | sort -nr | head -10
echo

echo "=== SCAN COMPLETE ==="
```

**2. Semi-Automated Cleanup Script**
```bash
#!/bin/bash
# cleanup-fix.sh - Semi-automated cleanup with confirmation

echo "=== PROJECT CLEANUP FIXES ==="

# Function to confirm actions
confirm() {
    read -p "$1 (y/n): " -n 1 -r
    echo
    [[ $REPLY =~ ^[Yy]$ ]]
}

# Fix underscore violations
echo "Fixing underscore violations..."
for file in $(find . -name "*_*.md"); do
    new_name=$(echo "$file" | sed 's/_/-/g')
    if [ "$file" != "$new_name" ]; then
        if confirm "Rename $file → $new_name?"; then
            git mv "$file" "$new_name" 2>/dev/null || mv "$file" "$new_name"
            echo "Renamed: $file → $new_name"
        fi
    fi
done

# Move files from root (excluding allowed)
echo "Moving files from root directory..."
for file in $(find . -maxdepth 1 -name "*.md" | grep -v -E "(README|CHANGELOG|CONTRIBUTING|CLAUDE)\.md$"); do
    filename=$(basename "$file")
    if confirm "Move $file to docs/?"; then
        mkdir -p docs
        git mv "$file" "docs/$filename" 2>/dev/null || mv "$file" "docs/$filename"
        echo "Moved: $file → docs/$filename"
    fi
done

echo "=== CLEANUP COMPLETE ==="
echo "Review changes and commit if appropriate."
```

## Prevention Strategies

### Proactive File Management

#### Pre-Creation Checklist
```yaml
Before Creating Any File:
  - [ ] Can this enhance an existing file instead?
  - [ ] Is this file truly necessary for the project?
  - [ ] Does the name follow lowercase-hyphenated convention?
  - [ ] Is the target directory correct for this content type?
  - [ ] Have I checked for similar existing files?
```

#### Creation Decision Matrix
```yaml
Content Assessment:
  Status Update: → Display only (no file)
  Temporary Analysis: → Display only (no file)
  One-time Report: → Display only (no file)
  Reusable Documentation: → Create file
  Permanent Knowledge: → Create file
  Configuration Data: → Create file
  Behavioral Pattern: → Create file
```

#### Enhanced vs Creation Logic
```yaml
Enhancement Triggers (prefer existing):
  - Adding section to documentation
  - Extending behavioral patterns
  - Adding examples or clarifications
  - Updating configuration options
  - Including additional test cases

Creation Triggers (new file justified):
  - New distinct module or behavior
  - New work item (epic, story, bug, task)
  - Separate concern requiring isolation
  - New command or tool integration
  - Domain-specific knowledge capture
```

### Automated Prevention Mechanisms

#### Write Tool Integration
```yaml
Pre-Write Validation:
  1. Check if file already exists
  2. Validate naming conventions
  3. Verify directory placement
  4. Assess content necessity
  5. Suggest enhancement alternatives
  6. Block creation if non-compliant
```

#### Command-Level Prevention
```yaml
File-Creating Commands Must:
  - Import file-management-enforcer
  - Call pre-creation validation
  - Use validated file names
  - Follow directory placement rules
  - Clean up temporary files
  - Log creation decisions
```

#### Behavioral Reinforcement
```yaml
Scoring Integration:
  Positive Actions:
    - +0.5P for enhancing existing files
    - +1.0Q for proper organization
    - +0.5Q for naming compliance
    - +1.0P for cleanup activities

  Penalty Actions:
    - -1.0P for root directory violations
    - -2.0Q for UPPERCASE violations
    - -0.5P for poor naming choices
    - -1.0Q for unnecessary file creation
```

### Continuous Monitoring

#### Regular Health Checks
```yaml
Daily Monitoring:
  - Root directory file count
  - New naming violations
  - Misplaced file detection
  - Temporary file accumulation

Weekly Assessment:
  - Compliance trend analysis
  - Directory growth patterns
  - Content duplication detection
  - Structure optimization opportunities

Monthly Review:
  - Overall project health
  - Standards effectiveness
  - Process improvement needs
  - Tool enhancement requirements
```

#### Metrics and Reporting
```yaml
Key Performance Indicators:
  - Root directory file count (target: ≤6)
  - Naming compliance percentage (target: 100%)
  - Enhancement vs creation ratio (target: 75% enhancement)
  - Average files per directory (target: <20)
  - Cleanup frequency (target: weekly)

Quality Metrics:
  - File discoverability score
  - Navigation efficiency rating
  - Content consolidation ratio
  - Maintenance overhead index
  - Developer satisfaction rating
```

## Recovery Procedures

### Emergency Cleanup (Project Overwhelmed)

#### Assessment Phase
```yaml
Critical Issues Identification:
  1. Count total files in root directory
  2. Assess naming violation percentage
  3. Identify critical duplications
  4. Evaluate navigation difficulty
  5. Measure maintenance overhead

Severity Classification:
  - Critical: >20 files in root, >50% naming violations
  - High: 10-20 files in root, 25-50% violations
  - Medium: 5-10 files in root, 10-25% violations
  - Low: <5 files in root, <10% violations
```

#### Recovery Strategy by Severity

**Critical Recovery (2-3 hours)**
```yaml
Immediate Actions:
  1. Stop all new file creation
  2. Create backup of current state
  3. Move all non-essential files from root
  4. Fix most egregious naming violations
  5. Consolidate obvious duplicates
  6. Establish basic directory structure
  7. Update primary documentation

Phase 1 (First Hour):
  - Move all non-allowed files from root
  - Fix UPPERCASE violations in critical files
  - Create basic directory organization
  - Remove obvious temporary files

Phase 2 (Second Hour):
  - Rename remaining violations
  - Consolidate duplicate content
  - Fix broken references
  - Organize by content type

Phase 3 (Third Hour):
  - Validate all changes
  - Update documentation
  - Test functionality
  - Commit organized structure
```

**High Severity Recovery (1-2 hours)**
```yaml
Focused Actions:
  1. Address root directory issues
  2. Fix high-impact naming violations
  3. Consolidate related files
  4. Improve directory organization
  5. Update key documentation

Systematic Approach:
  - Prioritize by impact on usability
  - Fix violations in order of visibility
  - Consolidate before renaming
  - Verify references after changes
```

**Medium/Low Severity Maintenance (30-60 minutes)**
```yaml
Gradual Improvement:
  1. Address remaining violations
  2. Optimize file organization
  3. Enhance naming consistency
  4. Improve content discovery
  5. Refine structure efficiency

Continuous Improvement:
  - Regular weekly cleanup sessions
  - Incremental organization improvements
  - Proactive violation prevention
  - Tool and process refinement
```

### Post-Recovery Validation

#### Verification Checklist
```yaml
Structure Validation:
  - [ ] Root directory contains only allowed files
  - [ ] All files follow naming conventions
  - [ ] Directory structure is logical
  - [ ] No broken references exist
  - [ ] Git tracking is correct

Functionality Verification:
  - [ ] All imports resolve correctly
  - [ ] Documentation links work
  - [ ] Command references are valid
  - [ ] Workflow processes function
  - [ ] Search and navigation improved

Quality Assessment:
  - [ ] File discoverability improved
  - [ ] Content organization enhanced
  - [ ] Maintenance overhead reduced
  - [ ] Professional appearance achieved
  - [ ] Developer experience improved
```

#### Success Metrics Post-Recovery
```yaml
Immediate Improvements:
  - Root directory file count reduced to <6
  - Naming compliance increased to >90%
  - Directory organization score improved
  - Duplicate content eliminated
  - Navigation time reduced

Long-term Sustainability:
  - Prevention mechanisms implemented
  - Regular maintenance scheduled
  - Monitoring systems active
  - Team training completed
  - Standards documentation current
```

## Maintenance Schedule

### Recommended Cleanup Schedule

```yaml
Daily (2-3 minutes):
  - Quick root directory check
  - Scan for obvious violations
  - Remove temporary files
  - Note issues for weekly cleanup

Weekly (15-20 minutes):
  - Comprehensive violation scan
  - Fix naming and placement issues
  - Consolidate related content
  - Update organization as needed

Monthly (45-60 minutes):
  - Deep content review
  - Structure optimization
  - Standards refinement
  - Process improvement
  - Documentation updates

Quarterly (2-3 hours):
  - Complete project audit
  - Major reorganization if needed
  - Tool enhancement evaluation
  - Training and documentation review
  - Long-term strategy planning
```

### Integration with Development Workflow

```yaml
Pre-Commit:
  - Validate file names
  - Check directory placement
  - Verify cleanup completion
  - Ensure standard compliance

Code Review:
  - Include file management review
  - Check naming conventions
  - Validate organization choices
  - Approve cleanup activities

Release Process:
  - Complete cleanup validation
  - Verify professional appearance
  - Ensure navigation efficiency
  - Document any exceptions
```

## Conclusion

Effective project cleanup requires a combination of preventive measures, regular maintenance, systematic procedures, and automated enforcement. By following this guide, teams can maintain a clean, professional, and navigable codebase that enhances productivity and reduces maintenance overhead.

The key to success is consistency in application, regular monitoring, and continuous improvement of both standards and processes. A well-organized project is a productive project.

---
*Project cleanup guide for intelligent-claude-code system*