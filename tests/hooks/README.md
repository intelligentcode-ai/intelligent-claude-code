# Hook System Tests

Test suite for intelligent-claude-code hook system.

## Running Tests

```bash
# Run all tests
make test

# Run specific test categories
make test-unit
make test-integration

# Run tests directly
bash tests/run-tests.sh
```

## Test Structure

- **unit/**: Unit tests for individual functions
- **integration/**: Full workflow tests
- **regression/**: Tests for known bugs
- **fixtures/**: Mock data and helpers

## Writing Tests

Use Node.js assert for simple tests:
```javascript
const assert = require('assert');
const { functionToTest } = require('../../src/hooks/lib/module');

console.log('Testing functionToTest...');
assert.strictEqual(functionToTest('input'), 'expected');
console.log('✓ Test passed');
```

## Coverage

Target: >80% code coverage for hooks
