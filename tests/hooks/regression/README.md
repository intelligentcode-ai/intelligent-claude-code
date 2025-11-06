# Regression Tests

This directory contains regression tests for known bugs to prevent future regressions and validate fixes.

## Purpose

Regression tests serve multiple purposes:
1. **Bug Documentation**: Clearly document known bugs with reproduction steps
2. **Fix Validation**: Validate that bug fixes work correctly
3. **Regression Prevention**: Ensure bugs don't reoccur in future versions
4. **Test-Driven Fixes**: Tests written before fixes provide clear success criteria

## Test Files

### test-known-bugs.js

Comprehensive regression tests for confirmed bugs across the hook system.

**Coverage:**
- **STORY-006**: Agent marker path consistency (6 tests)
  - Path normalization bugs causing marker file mismatches
  - Trailing slashes, relative paths, subdirectory issues
  - Environment variable inconsistencies

- **STORY-007**: Memory directory blocking (5 tests)
  - Memory files incorrectly routed to summaries/
  - Memory subdirectory write blocking
  - Fix validation and regression prevention

- **cd Command Bug**: Command blocking issues (4 tests)
  - cd command incorrectly treated as blocked
  - cd in command chains
  - Validation that cd is coordination-safe

- **Cross-Bug Validation**: Interaction testing (2 tests)
  - Multiple bugs compounding effects
  - Fix validation without breaking other functionality

**Total**: 17 regression tests

## Test Patterns

### Inverted Assertions

Some tests use **inverted assertions** to document bugs that are not yet fixed:

```javascript
// Documents the bug - will fail until fixed
assert.notStrictEqual(hash1, hash2,
  'Bug confirmed: trailing slash changes hash (WILL BE FIXED)');
```

After the bug is fixed, these assertions will be updated to normal assertions:

```javascript
// Validates the fix - should pass after fix
assert.strictEqual(hash1, hash2,
  'Paths normalized correctly regardless of trailing slash');
```

### Bug Status Tracking

Each test clearly indicates bug status:

- **NOT FIXED**: Bug exists, test documents it with inverted assertion
- **FIXED in repo**: Fix committed but not deployed to ~/.claude/hooks/
- **FIXED and deployed**: Fix is live, test validates it persists

### Test Output

Tests provide comprehensive diagnostic output:

```
[REGRESSION TEST: STORY-006]
Bug: Trailing slash in path produces different MD5 hash
Impact: Marker file created with hash A, lookup uses hash B
Status: NOT FIXED - path normalization needed in getProjectRoot()
  Path without slash: "/Users/test/project" → hash: ef8e68ef
  Path with slash:    "/Users/test/project/" → hash: 011ad9a1
```

## Running Regression Tests

### Run all tests:
```bash
bash tests/run-tests.sh
```

### Run regression tests only:
```bash
node tests/hooks/regression/test-known-bugs.js
```

### Expected Results

**Current Status** (as of creation):
- ✅ All 17 tests pass (including inverted assertions)
- ⚠️ STORY-006: 6 tests document unfixed bugs
- ⚠️ STORY-007: 5 tests validate fix (awaiting deployment)
- ⚠️ cd command: 4 tests document unfixed bug
- ✅ Cross-bug: 2 tests validate interaction scenarios

## Test Maintenance

### When a Bug is Fixed

1. **Update the test**: Change inverted assertion to normal assertion
2. **Update status comments**: Change "NOT FIXED" to "FIXED"
3. **Verify test passes**: Run test to confirm fix works
4. **Keep the test**: Keep test active to prevent regression

Example:

**Before fix:**
```javascript
assert.notStrictEqual(hash1, hash2,
  'Bug confirmed: trailing slash changes hash (WILL BE FIXED)');
```

**After fix:**
```javascript
assert.strictEqual(hash1, hash2,
  'Path normalization removes trailing slashes correctly');
```

### When a New Bug is Found

1. **Create test**: Add test that reproduces the bug
2. **Document clearly**: Include bug description, impact, and status
3. **Use inverted assertion**: Test passes while documenting the bug
4. **Link to story**: Reference the bug report (STORY-XXX or BUG-XXX)

## Integration with CI/CD

These regression tests should run:
- ✅ On every commit (via pre-commit hook or CI)
- ✅ Before every release
- ✅ After every deployment (to validate fixes)

Exit codes:
- **0**: All tests passed (including expected failures)
- **1**: Unexpected failures (potential regression)

## Bug History

### STORY-006: Agent Marker Path Consistency
**Discovered**: 2025-11-06
**Status**: NOT FIXED
**Impact**: CRITICAL - agents blocked intermittently
**Root Cause**: `getProjectRoot()` returns non-normalized paths
**Tests**: 6 tests with inverted assertions

### STORY-007: Memory Directory Blocking
**Discovered**: 2025-11-06
**Fixed**: v8.20.60 (2025-11-06)
**Status**: FIXED in repo, awaiting deployment
**Impact**: CRITICAL - learning system cannot store patterns
**Root Cause**: Directory routing missing memory/ pattern
**Tests**: 5 tests validating fix

### cd Command Blocking
**Discovered**: During testing
**Status**: NOT FIXED
**Impact**: MEDIUM - coordination commands unnecessarily blocked
**Root Cause**: cd not in coordination command whitelist
**Tests**: 4 tests documenting bug

## Best Practices

1. **Test First**: Write regression test when bug is found
2. **Document Clearly**: Each test explains what, why, and impact
3. **Inverted Assertions**: Use for unfixed bugs to keep tests passing
4. **Keep Tests Active**: Never delete regression tests after fixes
5. **Cross-Validation**: Test that fixes don't break other functionality

## Related Documentation

- [Main Test Framework](../README.md) - Overall test structure
- [Unit Tests](../unit/README.md) - Component-level testing
- [Integration Tests](../integration/README.md) - End-to-end workflows
- Bug reports in `/stories/` directory
