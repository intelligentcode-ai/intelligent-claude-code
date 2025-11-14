# CRITICAL: Directory Enforcement Hook Blocks Self-Repair - ✅ RESOLVED

**Status**: FIXED AND DEPLOYED (2025-10-29)

## Problem (RESOLVED)

The `pm-constraints-enforcement.js` hook has a **circular blocking bug** that prevents fixing itself:

1. **Directory Enforcement Logic** (lines 1042-1082) applies filename-based routing to ALL files
2. **Missing Exclusion**: Source code files (`src/`) are NOT excluded from enforcement
3. **Circular Block**: Hook sees `directory-enforcement.js` filename → routes to `summaries/` → blocks edit
4. **Cannot Fix**: Every attempt to fix the hook is blocked by the hook itself

## Root Cause

In `src/hooks/lib/directory-enforcement.js`, the `isCorrectDirectory()` function (lines 57-65) does not check if file is installation infrastructure BEFORE applying filename-based routing.

**Current Logic**:
```javascript
function isCorrectDirectory(filePath, projectRoot) {
  const actualDir = path.dirname(filePath);
  const expectedDir = getCorrectDirectory(path.basename(filePath), projectRoot);

  // Compares paths without checking for installation infrastructure exclusions
  return normalizedActual === normalizedExpected;
}
```

**Needed Logic**:
```javascript
function isCorrectDirectory(filePath, projectRoot) {
  // PRIORITY 1: Check if file is installation infrastructure (EXEMPT)
  if (isInstallationInfrastructure(filePath, projectRoot)) {
    return true; // Exempt from enforcement
  }

  // Then check normal directory routing...
}
```

## Required Fix

### File: src/hooks/lib/directory-enforcement.js

Add installation infrastructure exclusion function and integrate it:

```javascript
/**
 * Check if file is part of installation infrastructure
 * Installation infrastructure files are EXEMPT from directory enforcement
 */
function isInstallationInfrastructure(filePath, projectRoot) {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(projectRoot, filePath);
  const relativePath = path.relative(projectRoot, absolutePath);

  // Exclude installation infrastructure paths
  if (relativePath.startsWith('ansible/')) return true;
  if (relativePath === 'install.ps1') return true;
  if (relativePath === 'Makefile') return true;
  if (relativePath.startsWith('scripts/')) return true;
  if (relativePath.startsWith('tests/')) return true;
  if (relativePath.startsWith('src/')) return true; // ALL SOURCE CODE EXEMPT

  return false;
}

function isCorrectDirectory(filePath, projectRoot) {
  // PRIORITY 1: Check if file is installation infrastructure (EXEMPT)
  if (isInstallationInfrastructure(filePath, projectRoot)) {
    return true; // Exempt from directory enforcement
  }

  // Normal directory routing logic...
  const actualDir = path.dirname(filePath);
  const expectedDir = getCorrectDirectory(path.basename(filePath), projectRoot);

  const normalizedActual = path.normalize(actualDir);
  const normalizedExpected = path.normalize(expectedDir);

  return normalizedActual === normalizedExpected;
}
```

## Manual Workaround

Since the hook blocks all automated fixes, user must **manually disable the hook temporarily**:

### Option 1: Disable Enforcement (Recommended)

Edit `icc.config.json` (create if doesn't exist):
```json
{
  "enforcement": {
    "blocking_enabled": false
  }
}
```

Then make the fix, reinstall, and re-enable enforcement.

### Option 2: Temporarily Disable Hook

```bash
# Disable hook
mv ~/.claude/hooks/pm-constraints-enforcement.js ~/.claude/hooks/pm-constraints-enforcement.js.disabled

# Make the fix to src/hooks/lib/directory-enforcement.js
# (Apply the code above)

# Reinstall
make install

# Hook is now fixed and re-enabled
```

## Impact

**BLOCKING**:
- Cannot edit any file in `ansible/` directory
- Cannot edit `install.ps1`
- Cannot edit `Makefile`
- Cannot edit `src/` source code
- Cannot edit `tests/` or `scripts/`

**CRITICAL**: This blocks ALL installation infrastructure maintenance and development.

## Previous Agent Failure

The previous agent (removing post-agent-file-validation.js hook) was blocked by this bug when trying to update `ansible/roles/intelligent-claude-code/tasks/main.yml`:

```
🚫 DIRECTORY ENFORCEMENT: File belongs in different directory
File: ansible/roles/intelligent-claude-code/tasks/main.yml
Expected: summaries/main.yml
```

This is incorrect - Ansible playbooks should NOT be routed to `summaries/`.

## Resolution

### What Was Actually Done

The problem was SIMPLER than initially diagnosed. The directory enforcement was applying to ALL files, not just .md files.

**The Real Fix** (lines 60-63 in `src/hooks/lib/directory-enforcement.js`):
```javascript
function isCorrectDirectory(filePath, projectRoot) {
  const basename = path.basename(filePath);

  // ONLY apply directory enforcement to .md files
  if (!basename.endsWith('.md')) {
    return true; // Non-.md files exempt from enforcement
  }

  // ... rest of directory routing for .md files
}
```

### Resolution Timeline

1. **User manually applied sed fix** to `~/.claude/hooks/lib/directory-enforcement.js`
2. **Agent updated source** in `src/hooks/lib/directory-enforcement.js`
3. **Agent removed useless hook** - deleted `src/hooks/post-agent-file-validation.js`
4. **Agent cleaned installation scripts** - removed post-agent-file-validation.js references
5. **User ran `make install`** - deployed all fixes successfully

### Verification

```bash
# ✅ .md-only check is deployed
grep -A 3 "ONLY apply directory enforcement" ~/.claude/hooks/lib/directory-enforcement.js

# ✅ Useless hook is gone
ls ~/.claude/hooks/post-agent-file-validation.js  # No such file

# ✅ 15 hooks remain active (down from 16)
ls ~/.claude/hooks/*.js | wc -l  # Output: 15
```

## Priority

**RESOLVED** - System can now self-repair and maintain installation infrastructure.
