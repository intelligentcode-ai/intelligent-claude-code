# Critical Issue: Hook Blocks Legitimate Installation File Edits

## Problem

The pm-constraints-enforcement.js hook incorrectly blocks edits to legitimate installation system files like `ansible/roles/intelligent-claude-code/tasks/main.yml` and `install.ps1`.

## Root Cause

1. **Directory-enforcement applied too broadly**: Line 1046 in pm-constraints-enforcement.js calls `isCorrectDirectory(filePath, projectRoot)` for ALL files
2. **Default routing rule too aggressive**: directory-enforcement.js defaults ALL non-matched files to `summaries/`
3. **Installation files caught in default rule**: Files like `main.yml` and `install.ps1` don't match any specific pattern, so they're incorrectly routed to `summaries/`

## Current Workaround

User manually applied fix to local installation:
```bash
sed -i 's/if (!isCorrectDirectory/if (filePath.endsWith(".md") \&\& !isCorrectDirectory/' ~/.claude/hooks/pm-constraints-enforcement.js
```

This restricts directory-enforcement to ONLY .md files (as originally intended).

## Required Fixes

### Fix 1: Update pm-constraints-enforcement.js (src/hooks/)
**File**: `src/hooks/pm-constraints-enforcement.js`
**Line**: ~1046
**Change**:
```javascript
// BEFORE (wrong - applies to ALL files):
if (!isCorrectDirectory(filePath, projectRoot)) {

// AFTER (correct - only .md files):
if (filePath.endsWith('.md') && !isCorrectDirectory(filePath, projectRoot)) {
```

### Fix 2: Update directory-enforcement.js (src/hooks/lib/)
**File**: `src/hooks/lib/directory-enforcement.js`
**Function**: `isCorrectDirectory()`
**Add safety check**: Return true for non-.md files

```javascript
function isCorrectDirectory(filePath, projectRoot) {
  // ONLY enforce directory routing for .md files
  if (!filePath.endsWith('.md')) {
    return true; // Non-markdown files pass validation
  }

  const actualDir = path.dirname(filePath);
  const expectedDir = getCorrectDirectory(path.basename(filePath), projectRoot);

  const normalizedActual = path.normalize(actualDir);
  const normalizedExpected = path.normalize(expectedDir);

  return normalizedActual === normalizedExpected;
}
```

## Files to Edit

After these fixes are applied, we can proceed with:

1. **ansible/roles/intelligent-claude-code/tasks/main.yml**: Remove 2 references to post-agent-file-validation.js
2. **install.ps1**: Remove 1 reference to post-agent-file-validation.js

## Validation

After fixes:
```bash
# Should return NO results:
grep -n "post-agent-file-validation" ansible/roles/intelligent-claude-code/tasks/main.yml
grep -n "post-agent-file-validation" install.ps1

# Verify installations work without hook blocking:
make install
```

## Root Cause Analysis

The directory-enforcement system was designed to ensure .md files (stories, bugs, summaries) are placed in correct directories. However, it was incorrectly applied to ALL file types, causing legitimate installation system files to be blocked.

**Design Intent**: Only .md files should be subject to directory routing rules
**Implementation Bug**: ALL files are checked, causing false positives

## Priority

**CRITICAL** - This blocks core development work on the installation system itself.
