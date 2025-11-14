# Bug Analysis: Hook Incorrectly Enforces Directory Rules on External Projects

## Executive Summary

**Critical Bug Found**: The pm-constraints-enforcement.js hook applies directory enforcement rules to ALL file operations, regardless of whether they're in the intelligent-claude-code project or external projects.

## Test Results

### What Happened
```bash
$ cat test-hook-monitoring.json | node ~/.claude/hooks/pm-constraints-enforcement.js

Output:
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Wrong directory for filename pattern\n\nFile \"all.yml\" should be in a different directory based on its filename pattern.\n\nCurrent path: /Users/karsten/Work/Engineering/ansible/deployments/kubernetes/applications/monitoring/group_vars/all.yml\nSuggested path: /Users/karsten/Work/Engineering/ansible/deployments/summaries/all.yml"
  }
}
```

### The Bug

**File being edited**: `/Users/karsten/Work/Engineering/ansible/deployments/kubernetes/applications/monitoring/group_vars/all.yml`

**Hook's decision**: DENY - "File should be in summaries/"

**Why this is wrong**:
1. This file is in an EXTERNAL Ansible project
2. It has NOTHING to do with intelligent-claude-code
3. The directory enforcement rules ONLY apply to intelligent-claude-code project files
4. `all.yml` is a standard Ansible group_vars file - NOT a summary file

### Root Cause

The hook in `src/hooks/lib/directory-enforcement.js` applies directory routing rules WITHOUT checking if the file is within the intelligent-claude-code project scope:

```javascript
// From directory-enforcement.js (line 95-105)
function determineCorrectDirectory(filename, projectRoot) {
  // STORY/EPIC/BUG files
  if (/^(STORY|EPIC|BUG)-\d+/.test(filename)) {
    return path.join(projectRoot, 'stories');
  }

  // AGENTTASK files
  if (/^AGENTTASK-\d+/.test(filename)) {
    return path.join(projectRoot, 'agenttasks');
  }

  // Root files
  const rootFiles = ['CLAUDE.md', 'VERSION', 'CHANGELOG.md', 'Makefile', 'install.sh', 'install.ps1'];
  if (rootFiles.includes(filename)) {
    return projectRoot;
  }

  // Documentation files
  if (/\.(md|txt)$/.test(filename) && !filename.includes('AGENTTASK')) {
    return path.join(projectRoot, 'docs');
  }

  // DEFAULT: Everything else goes to summaries/
  return path.join(projectRoot, 'summaries');  // ← BUG: Applied to ALL files!
}
```

**The problem**: The function defaults EVERY file to `summaries/` without checking if it's actually in the project scope.

### Missing Scope Check

The hook needs to check if the file path is within the project boundaries BEFORE applying directory enforcement:

```javascript
// MISSING CHECK:
const isInProject = filePath.startsWith(projectRoot);
if (!isInProject) {
  // External file - no directory enforcement
  return { pass: true };
}
```

## Impact

**Severity**: CRITICAL

**Affected Operations**:
- Any Edit operations on external project files
- Monitoring configurations (Ansible, Kubernetes, etc.)
- Any work outside intelligent-claude-code project

**User Experience**:
- Hook blocks legitimate external file operations
- Confusing error messages about "summaries/" for unrelated files
- Breaks multi-project workflows

## Verification Test

The test successfully exposed the bug:

1. ✅ Created test-hook-monitoring.json with external file path
2. ✅ Ran hook directly with test input
3. ✅ Captured hook's incorrect DENY decision
4. ✅ Identified missing project scope validation

## Fix Required

**Location**: `/Users/karsten/.claude/hooks/lib/directory-enforcement.js`

**Required Change**: Add project scope validation before applying directory routing rules

**Implementation**:
```javascript
// Add at start of validateDirectory function
const isInProject = filePath.startsWith(projectRoot);
if (!isInProject) {
  // External file - no directory enforcement needed
  return {
    pass: true,
    reason: 'External file - no project directory constraints apply'
  };
}

// Then proceed with existing directory enforcement logic...
```

## Related Files

- `/Users/karsten/.claude/hooks/pm-constraints-enforcement.js` - Main hook entry point
- `/Users/karsten/.claude/hooks/lib/directory-enforcement.js` - Directory validation logic (BUG HERE)
- `/Users/karsten/Nextcloud_Altlandsberg/Work/Development/intelligentcode-ai/intelligent-claude-code/test-hook-monitoring.json` - Test case that exposed bug

## Recommendations

1. **Immediate Fix**: Add project scope validation to directory-enforcement.js
2. **Testing**: Expand test suite to include external file operations
3. **Documentation**: Clarify that directory enforcement ONLY applies within project scope
4. **Review**: Audit other hooks for similar scope validation issues

## Test Case for Regression Prevention

```json
{
  "description": "External file operations should not trigger directory enforcement",
  "input": {
    "tool_name": "Edit",
    "tool_input": {
      "file_path": "/external/project/some-file.yml"
    }
  },
  "expected": {
    "permissionDecision": "allow",
    "reason": "External file - no project directory constraints apply"
  }
}
```

---

**Date**: 2025-10-28
**Discovered By**: Direct hook testing with monitoring context input
**Status**: Bug confirmed, fix required in directory-enforcement.js
