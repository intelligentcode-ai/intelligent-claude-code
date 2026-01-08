# Test Framework Documentation

**Status**: Minimal coverage
**Last Updated**: 2026-01-07

## Overview

The project uses a lightweight Node-based test setup for hook validation. Coverage is intentionally small and focused on the remaining production hooks and their shared libraries.

## Running Tests

```bash
make test-hooks
```

Or run the script directly:

```bash
bash tests/run-tests.sh
```

## Current Focus Areas

- `git-enforcement.js`
- `agent-infrastructure-protection.js`
- `summary-file-enforcement.js`

## Notes

- There is no coverage reporting.
- Integration/regression tests are currently optional and may be added as needed.
- Add new tests alongside hook changes to keep behavior stable.

