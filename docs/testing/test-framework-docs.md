# Test Framework Documentation

**Status**: Foundation Complete (~10% coverage)
**Created**: 2025-11-06
**Last Updated**: 2025-11-06

## Overview

The intelligent-claude-code project has a **basic test infrastructure** for validating the hook system. As of November 2025, we have:

- **55 unit tests** across 3 test files
- **Test infrastructure** with mock utilities and fixtures
- **Basic test runner** with Make integration
- **~10% coverage** - only 3 of 31+ hook libraries tested

**Current State**: Foundation exists but coverage is incomplete. Most hooks remain untested.

---

## Test Infrastructure

### Directory Structure

```
tests/
├── run-tests.sh                    # Simple test runner script
├── hooks/
│   ├── README.md                   # Test infrastructure overview
│   ├── unit/                       # Unit tests (55 tests, 3 files)
│   │   ├── test-hook-helpers.js           (13 tests)
│   │   ├── test-marker-detection.js       (12 tests)
│   │   └── test-command-validation.js     (30 tests)
│   ├── integration/                # Integration tests (EMPTY - not started)
│   ├── regression/                 # Regression tests (EMPTY - not started)
│   └── fixtures/                   # Test utilities and mock data
│       ├── mock-hook-inputs.js     # Mock hookInput generator
│       ├── mock-marker-files.js    # Mock agent marker files
│       ├── test-helpers.js         # Test runner utilities
│       └── test-scenarios.js       # Command validation scenarios
```

### Test Runner

The test runner (`tests/run-tests.sh`) is a simple bash script:

```bash
#!/bin/bash
set -e

echo "🧪 Running intelligent-claude-code hook tests..."

# Run unit tests
echo "📦 Unit tests..."
if [ -d "tests/hooks/unit" ] && [ "$(ls -A tests/hooks/unit/*.js 2>/dev/null)" ]; then
  node tests/hooks/unit/*.js
else
  echo "No unit tests found yet"
fi

# Run integration tests (not started)
# Run regression tests (not started)

echo "✅ All tests passed!"
```

**Limitations**:
- Basic Node.js execution (no test framework like Jest/Mocha)
- No coverage reporting
- No parallel execution
- No watch mode

---

## Running Tests

### Make Targets

```bash
# Run all tests
make test-hooks

# Run unit tests only
make test-unit

# Run integration tests (not started yet)
make test-integration
```

### Direct Execution

```bash
# Run all unit tests
bash tests/run-tests.sh

# Run individual test files
node tests/hooks/unit/test-hook-helpers.js
node tests/hooks/unit/test-marker-detection.js
node tests/hooks/unit/test-command-validation.js
```

---

## Current Test Coverage

### What's Tested (3 libraries, 55 tests)

#### 1. hook-helpers.js (13 tests)
**File**: `tests/hooks/unit/test-hook-helpers.js`

Tests for project root detection and response helpers:

```javascript
// Project root detection tests
'getProjectRoot() uses CLAUDE_PROJECT_DIR when set'
'getProjectRoot() falls back to hook input cwd'
'getProjectRoot() falls back to process.cwd()'
'getProjectRoot() handles null input'

// Path normalization bug documentation (STORY-006)
'BUG: Trailing slash produces different hash'
'BUG: Relative path produces different hash'
'BUG: Subdirectory path produces different hash'

// Response helpers
'allowResponse() returns correct structure'
'allowResponseSuppressed() returns correct structure'
'blockResponse() returns correct structure'
'blockResponse() handles empty message'
```

**Note**: Bug documentation tests expose STORY-006 path normalization bug.

#### 2. marker-detection.js (12 tests)
**File**: `tests/hooks/unit/test-marker-detection.js`

Tests for agent marker system:

```javascript
// Hash generation
'generateProjectHash produces consistent hash for same input'
'generateProjectHash produces different hashes for different inputs'

// Agent context detection
'isAgentContext returns false when no marker file exists'
'isAgentContext returns true when marker file exists with agent_count > 0'
'isAgentContext returns false when marker file exists with agent_count = 0'
'isAgentContext handles corrupted marker file gracefully'

// PM role detection
'isPMRole returns true when no agent context'
'isPMRole returns false when agent context exists'

// Path handling
'getMarkerDir returns correct path'
```

#### 3. command-validation.js (30 tests)
**File**: `tests/hooks/unit/test-command-validation.js`

Tests for bash command parsing and validation:

```javascript
// Command extraction (10 tests)
'extracts simple command'
'extracts commands from pipe'
'extracts commands from && chain'
'handles quoted strings'
'handles environment variables'
// ... more extraction tests

// Command validation (12 tests)
'allows git status'
'allows read-only commands'
'blocks npm commands'
'blocks docker commands'
'blocks terraform commands'
// ... more validation tests

// Coordination commands (6 tests)
'allows git status'
'blocks npm commands'
// ... more coordination tests

// Modification detection (5 tests)
'detects rm ~/.claude/ command'
'allows rm in project directory'
// ... more modification tests
```

---

## Coverage Gaps (90% Untested)

### Hook Libraries Without Tests (28 libraries)

The following hook libraries have **ZERO test coverage**:

#### Core Routing Hooks
- `agent-marker.js` - Agent marker creation/cleanup
- `main-scope-enforcement.js` - Main scope routing logic
- `directory-routing.js` - Directory-based routing decisions

#### Feature Enforcement Hooks
- `memory-directory-blocking.js` - Memory directory protection
- `tool-blacklist.js` - Tool blacklisting logic
- `git-privacy.js` - AI mention stripping

#### Utility Libraries (13+ libraries)
- `path-utils.js` - Path operations
- `config-loader.js` - Configuration loading
- `message-formatting.js` - Error message formatting
- `reminder-system.js` - Educational reminder system
- ... and many more

#### Integration Workflows
- No end-to-end workflow tests
- No agent lifecycle tests
- No cross-hook integration tests

### Missing Test Types

#### Integration Tests (STORY-010 Phase 2)
**Status**: NOT STARTED

Planned integration tests:
- Agent marker workflow (create → lookup → cleanup)
- Directory routing decisions (end-to-end)
- Git privacy enforcement workflow
- Tool blacklisting workflow

#### Regression Tests (STORY-010 Phase 2)
**Status**: NOT STARTED

Planned regression tests:
- STORY-006: Agent marker path consistency bug
- STORY-007: Memory directory blocking
- cd command blocking bug
- Other discovered issues

---

## Writing New Tests

### Test Pattern

Unit tests follow this pattern:

```javascript
#!/usr/bin/env node
const assert = require('assert');
const { runTestSuite } = require('../fixtures/test-helpers');
const { createMockHookInput } = require('../fixtures/mock-hook-inputs');
const { functionToTest } = require('~/.claude/hooks/lib/your-library.js');

const tests = {
  'test case description': () => {
    const mockInput = createMockHookInput({ cwd: '/test/path' });
    const result = functionToTest(mockInput);
    assert.strictEqual(result, expectedValue, 'Assertion message');
  },

  'another test case': () => {
    // Test implementation
  }
};

const success = runTestSuite('Library Name Tests', tests);
process.exit(success ? 0 : 1);
```

### Mock Utilities

#### Mock HookInput
**File**: `tests/hooks/fixtures/mock-hook-inputs.js`

```javascript
const { createMockHookInput } = require('../fixtures/mock-hook-inputs');

// Basic mock
const input = createMockHookInput({ cwd: '/test/path' });

// Task tool mock
const taskInput = createTaskToolInput('developer');

// Write tool mock
const writeInput = createWriteToolInput('/path/to/file.md', 'content');

// Bash tool mock
const bashInput = createBashToolInput('git status');
```

#### Mock Marker Files
**File**: `tests/hooks/fixtures/mock-marker-files.js`

```javascript
const { createMockMarker, getMarkerFileName } = require('../fixtures/mock-marker-files');

// Create mock marker
const marker = createMockMarker('session-id', '/project/root', 2);

// Get marker filename
const filename = getMarkerFileName('session-id', '/project/root');
```

#### Test Helpers
**File**: `tests/hooks/fixtures/test-helpers.js`

```javascript
const { runTestSuite } = require('../fixtures/test-helpers');

// Run test suite with automatic pass/fail reporting
const success = runTestSuite('Suite Name', tests);
```

### Example: Adding New Test File

```javascript
#!/usr/bin/env node
/**
 * Unit Tests: tool-blacklist.js
 * Tests tool blacklisting logic
 */

const assert = require('assert');
const { runTestSuite } = require('../fixtures/test-helpers');
const { createMockHookInput } = require('../fixtures/mock-hook-inputs');
const { isToolBlacklisted } = require('~/.claude/hooks/lib/tool-blacklist.js');

const tests = {
  'blocks MultiEdit in main scope': () => {
    const input = createMockHookInput({ tool_name: 'MultiEdit' });
    const result = isToolBlacklisted(input, false); // Not agent context
    assert.strictEqual(result, true, 'MultiEdit should be blocked in main scope');
  },

  'allows MultiEdit in agent context': () => {
    const input = createMockHookInput({ tool_name: 'MultiEdit' });
    const result = isToolBlacklisted(input, true); // Agent context
    assert.strictEqual(result, false, 'MultiEdit should be allowed in agent context');
  }
};

const success = runTestSuite('Tool Blacklist Tests', tests);
process.exit(success ? 0 : 1);
```

---

## Test Roadmap

### Phase 1: Test Infrastructure (COMPLETED - STORY-009)
**Status**: ✅ COMPLETE

- [x] Test directory structure
- [x] Test runner script (`run-tests.sh`)
- [x] Mock utilities (hookInput, marker files)
- [x] Test helper functions
- [x] Makefile integration
- [x] Unit tests for 3 libraries (55 tests)
- [x] Basic test documentation

### Phase 2: Integration & Regression Tests (PLANNED - STORY-010)
**Status**: ❌ NOT STARTED
**Complexity**: 12 points (medium)

**AgentTask Breakdown**:
1. **Agent marker workflow test** (4 points)
   - Full agent execution cycle
   - Marker creation → lookup → cleanup
   - Concurrent agent handling

2. **Directory routing integration test** (3 points)
   - All routing rules end-to-end
   - Edge cases and error suggestions

3. **Regression tests** (5 points)
   - STORY-006: Path consistency test
   - STORY-007: Memory directory test
   - cd command blocking test
   - Document test cases

### Phase 3: Comprehensive Coverage (NOT PLANNED)
**Status**: ❌ NOT PLANNED
**Estimated Effort**: 30+ points (large story)

**Scope**:
- Unit tests for remaining 28 hook libraries
- Full workflow integration tests
- Performance tests
- Error handling tests
- Edge case coverage

---

## Known Issues & Limitations

### Test Infrastructure Limitations
1. **No Test Framework**: Using raw Node.js assertions (no Jest/Mocha)
2. **No Coverage Reporting**: Can't measure actual coverage percentage
3. **No Parallel Execution**: Tests run sequentially
4. **Limited Mocking**: Basic mocks only, no sophisticated mocking framework
5. **Manual Cleanup**: Test cleanup is manual, not automatic

### Coverage Gaps
1. **10% Coverage**: Only 3 of 31+ libraries tested
2. **No Integration Tests**: Workflow testing doesn't exist
3. **No Regression Tests**: Known bugs lack regression protection
4. **No Performance Tests**: No performance benchmarking
5. **No Error Path Testing**: Happy path only, error handling untested

### Known Bugs Without Tests
1. **Path Normalization Bug** (STORY-006): Tests document but don't fix
2. **Memory Directory Blocking**: No regression tests yet
3. **cd Command Handling**: Known issue without test coverage

---

## Best Practices

### Test Writing Guidelines

1. **One Test, One Assertion**: Keep tests focused
   ```javascript
   // Good
   'extracts simple command': () => {
     const result = extractCommandsFromBash('git status');
     assert.deepStrictEqual(result, ['git'], 'Should extract git');
   }

   // Avoid
   'extracts various commands': () => {
     // Multiple unrelated assertions
   }
   ```

2. **Clear Test Names**: Describe what's being tested
   ```javascript
   // Good
   'blocks npm commands in main scope'

   // Avoid
   'test npm'
   ```

3. **Use Mock Utilities**: Leverage existing fixtures
   ```javascript
   const input = createMockHookInput({ tool_name: 'Write' });
   ```

4. **Test Edge Cases**: Don't just test happy paths
   ```javascript
   'handles corrupted marker file gracefully'
   'handles empty command'
   'handles null input'
   ```

5. **Document Bug Tests**: Mark bug documentation clearly
   ```javascript
   'BUG: Trailing slash produces different hash': () => {
     console.log('\n    [BUG DOCUMENTATION] Testing STORY-006 bug:');
     // Test implementation
   }
   ```

### Running Tests During Development

```bash
# Quick test run
make test-unit

# Watch mode (manual - no built-in watch)
while true; do clear; make test-unit; sleep 2; done

# Test specific file
node tests/hooks/unit/test-hook-helpers.js
```

---

## Contributing Tests

### Adding Unit Tests

1. **Create test file** in `tests/hooks/unit/`
2. **Follow naming convention**: `test-[library-name].js`
3. **Use test pattern** (see "Writing New Tests")
4. **Add to run-tests.sh** (automatic glob matching)
5. **Run tests**: `make test-unit`

### Adding Integration Tests

1. **Wait for STORY-010**: Integration test structure not defined yet
2. **Follow AgentTask breakdown**: See STORY-010 for planned tests
3. **Create in** `tests/hooks/integration/`

### Adding Regression Tests

1. **Wait for STORY-010**: Regression test structure not defined yet
2. **Document bug first**: Create failing test before fix
3. **Verify fix**: Test should pass after bug fix
4. **Create in** `tests/hooks/regression/`

---

## Honest Assessment

### What Works
- ✅ Test infrastructure exists and is functional
- ✅ Mock utilities are helpful and reusable
- ✅ Test runner is simple but effective
- ✅ 55 tests provide basic validation for 3 libraries
- ✅ Foundation ready for expansion

### What's Missing
- ❌ 90% of hook libraries have ZERO test coverage
- ❌ No integration tests for workflows
- ❌ No regression tests for known bugs
- ❌ No test framework (Jest/Mocha) for better DX
- ❌ No coverage reporting or metrics
- ❌ No CI/CD integration for automated testing

### Path Forward

**Short Term** (STORY-010):
- Complete integration tests (4 tests)
- Add regression tests for known bugs (3 tests)
- Document integration test patterns

**Medium Term** (Future Story):
- Add unit tests for remaining 28 libraries
- Introduce proper test framework (Jest)
- Add coverage reporting
- CI/CD integration

**Long Term** (Future Story):
- Performance testing
- Load testing for concurrent agents
- Security testing
- End-to-end workflow testing

---

## References

- **STORY-008**: Parent story - Comprehensive Test Suite Roadmap
- **STORY-009**: Phase 1 - Test Infrastructure (COMPLETED)
- **STORY-010**: Phase 2 - Integration & Regression Tests (NOT STARTED)
- **Test Files**: `tests/hooks/unit/*.js`
- **Mock Utilities**: `tests/hooks/fixtures/*.js`
- **Test Runner**: `tests/run-tests.sh`
- **Makefile**: Test targets in `Makefile`

---

**Last Updated**: 2025-11-06
**Maintainer**: @Requirements-Engineer
**Status**: Foundation Complete, Expansion Needed
