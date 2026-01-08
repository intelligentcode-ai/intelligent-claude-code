# Hook System Tests

Minimal test suite for the remaining production hooks and shared libraries.

## Running Tests

```bash
# Run all hook tests
make test-hooks

# Unit tests only
make test-unit

# Integration tests (if present)
make test-integration

# Direct script
bash tests/run-tests.sh
```

## Structure

- **unit/**: Library and helper tests
- **integration/**: Hook-level tests (if present)
- **regression/**: Targeted regressions (summary validation)
- **fixtures/**: Mock data and helpers

