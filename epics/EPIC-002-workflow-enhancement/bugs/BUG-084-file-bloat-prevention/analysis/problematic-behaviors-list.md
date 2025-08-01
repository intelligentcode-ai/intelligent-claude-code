# Problematic File Creation Behaviors

## Critical Issues

### 1. UPPERCASE File Naming Violations

**Commands Creating UPPERCASE Files:**
- `icc-create-epic.md` → Creates `README.md` 
- `icc-create-bug.md` → Creates `README.md`
- `archival-intelligence.md` → Creates `ARCHIVED.md`

**Impact:** Violates lowercase-hyphenated naming standard

### 2. Unnecessary File Creation

**Redundant Documentation Files:**
- Epic creation adds README.md when epic.yaml contains all needed info
- Bug creation adds README.md when bug.yaml is sufficient
- No value added by these extra files

**Impact:** File proliferation without benefit

### 3. Root Directory Pollution

**Current Violations:**
- `PROJECT-CONTEXT.md` in root (should be in /docs/)
- `auto_corrections.log` in root (should be in /logs/ or .gitignored)
- No enforcement preventing root file creation

**Impact:** Cluttered root directory

## Behavioral Gaps

### 4. Missing Pre-Creation Checks

**No Validation For:**
- Existing file checks before creation
- Naming convention enforcement
- Directory placement validation
- Duplicate content prevention

**Commands Affected:** All creation commands

### 5. No Cleanup Behaviors

**Missing Cleanup For:**
- Temporary files
- Obsolete files
- Completed work artifacts
- Log files

**Impact:** Accumulation of unnecessary files

### 6. Ambiguous Report Generation

**Commands With Unclear Output:**
- `icc-system-status.md` - "Generate loading status report"
- `icc-lazy-loading-status.md` - "Compile comprehensive validation report"
- `icc-verify-behaviors.md` - "Generate task summary"

**Issue:** Language suggests file creation but only displays output

## Role-Specific Issues

### 7. PM Role File Creation

**@PM Specific:**
- Archive commands create ARCHIVED.md files
- No guidance on report file organization
- Status commands may imply file creation

### 8. Developer Role Gaps

**@Developer/@AI-Engineer:**
- No guidance on working file organization
- Missing temporary file handling
- No cleanup responsibilities defined

## Workflow Integration Issues

### 9. No File Management in Workflows

**Missing From Workflows:**
- File organization phase
- Cleanup phase  
- Naming validation gates
- Directory structure enforcement

### 10. Peer Review Gaps

**Not Checked in Reviews:**
- File naming conventions
- Directory organization
- Unnecessary file creation
- Cleanup completion

## Command Language Issues

### 11. Misleading Terminology

**Problematic Phrases:**
- "Generate report" (should be "Display report")
- "Create summary" (should be "Show summary")
- "Compile analysis" (should be "Present analysis")

**Commands Affected:** Most status/report commands

### 12. Missing Explicit Guidance

**Commands Lacking Clarity:**
- No "DO NOT create files" warnings
- No "Display only" clarifications
- Ambiguous action verbs

## Summary of Problematic Behaviors

1. **File Creation:** 3 commands create UPPERCASE files
2. **Unnecessary Files:** 2 commands create redundant READMEs
3. **Root Pollution:** No prevention mechanisms
4. **Missing Checks:** Zero pre-creation validation
5. **No Cleanup:** No automated cleanup behaviors
6. **Ambiguous Language:** 10+ commands with unclear output
7. **Role Gaps:** No role-specific file guidance
8. **Workflow Gaps:** File management not integrated
9. **Review Gaps:** File standards not reviewed
10. **Language Issues:** Misleading command descriptions

These behaviors collectively contribute to file bloat and require systematic updates to prevent future issues.

---
*Problematic behaviors documented by @System-Engineer*