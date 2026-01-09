# Dual-Context Configuration Loading

## Overview
Configuration loading pattern that supports both production (installed) and development (repository) contexts without environment variables or conditional logic.

## Problem Statement

Hook systems and plugin architectures often need to work in two different contexts:
1. **Production/Installed Context**: Hooks installed at `~/.claude/hooks/` loading config from `~/.claude/`
2. **Development/Repository Context**: Hooks in `src/hooks/` loading config from repository root

Using a single hardcoded path breaks one context or the other, requiring environment variables or complex detection logic.

## Core Principle

**FALLBACK APPROACH**: Try the production path first, then fallback to the development path if not found.

This ensures:
- Production deployments work without modification
- Development/testing works without environment variables
- Documentation examples run as-written
- Regression tests continue functioning
- No conditional logic based on environment detection

## Implementation Pattern

### Basic Fallback Pattern

```javascript
// Try production location first, then development location
let configPath = path.join(__dirname, '../..', 'config.json');
let config = loadConfig(configPath);

if (!config) {
  // Fallback to development/repo location
  configPath = path.join(__dirname, '../../..', 'config.json');
  config = loadConfig(configPath);
}

if (!config) {
  // Enhanced error reporting shows both searched paths
  console.error('Config not found. Searched:');
  console.error('  - ' + path.join(__dirname, '../..', 'config.json'));
  console.error('  - ' + path.join(__dirname, '../../..', 'config.json'));

  // Fallback to defaults
  config = getDefaults();
}
```

### Path Resolution Examples

**Production Context** (`~/.claude/hooks/lib/config-loader.js`):
- `__dirname` = `~/.claude/hooks/lib`
- `../..` = `~/.claude/` ✅ (found)
- `../../..` = `~/` (not checked, already found)

**Development Context** (`src/hooks/lib/config-loader.js`):
- `__dirname` = `repo/src/hooks/lib`
- `../..` = `repo/src/` ❌ (not found)
- `../../..` = `repo/` ✅ (found on fallback)

## Real-World Example

### Before: Single Path (Broken)

```javascript
// Works ONLY in production, breaks in development
const configPath = path.join(__dirname, '../..', 'icc.config.default.json');
const config = loadJsonConfig(configPath);
```

**Result**:
- ✅ Production: Loads from `~/.claude/icc.config.default.json`
- ❌ Development: Fails - `src/icc.config.default.json` doesn't exist
- ❌ Documentation: Examples fail
- ❌ Tests: Regression tests broken

### After: Dual-Context Fallback (Working)

```javascript
// Try production location first
let configPath = path.join(__dirname, '../..', 'icc.config.default.json');
let config = loadJsonConfig(configPath);

if (!config) {
  // Fallback to development location
  configPath = path.join(__dirname, '../../..', 'icc.config.default.json');
  config = loadJsonConfig(configPath);
}

if (!config) {
  console.error('[config-loader] Config not found. Searched:');
  console.error('[config-loader]   - ' + path.join(__dirname, '../..', 'icc.config.default.json'));
  console.error('[config-loader]   - ' + path.join(__dirname, '../../..', 'icc.config.default.json'));
  config = getHardcodedDefaults();
}
```

**Result**:
- ✅ Production: Loads from `~/.claude/icc.config.default.json`
- ✅ Development: Loads from `repo-root/icc.config.default.json`
- ✅ Documentation: Examples work as-written
- ✅ Tests: All regression tests pass

## Benefits

### No Environment Variables Required
- No `NODE_ENV` checks
- No `INSTALLED_MODE` flags
- No custom environment setup
- Works out of the box in both contexts

### Simplified Testing
- Tests run directly: `node src/hooks/agent-infrastructure-protection.js`
- No test-specific configuration
- Documentation examples copy-pasteable
- Regression tests don't need special setup

### Production Ready
- Installed hooks work without modification
- No performance penalty (checks are fast)
- Clear error messages aid debugging
- Graceful fallback to defaults

### Maintainability
- Single codebase for both contexts
- No conditional logic to maintain
- Clear path resolution order
- Self-documenting through comments

## Common Use Cases

### Hook Systems
- Production: Hooks in `~/.claude/hooks/`
- Development: Hooks in `repo/src/hooks/`
- Config in different locations relative to hook files

### Plugin Architectures
- Production: Plugins in `~/.app/plugins/`
- Development: Plugins in `repo/src/plugins/`
- Shared config loading logic

### CLI Tools
- Production: Installed to `/usr/local/bin/`
- Development: Run from `./src/cli/`
- Configuration in user home or repo root

### Testing Frameworks
- Production: Installed test runners
- Development: Local test execution
- Test fixtures in different locations

## Error Handling Best Practices

### Enhanced Error Messages
Always show ALL searched paths when config not found:

```javascript
if (!config) {
  console.error('[loader] Configuration not found');
  console.error('[loader] Searched paths:');
  console.error('[loader]   1. ' + productionPath);
  console.error('[loader]   2. ' + developmentPath);
  console.error('[loader] Falling back to defaults');
  config = getDefaults();
}
```

### Graceful Degradation
Provide sensible defaults as final fallback:

```javascript
function getDefaults() {
  return {
    // Minimal working configuration
    enabled: true,
    logLevel: 'error'
  };
}
```

### Debug Logging
Log which path succeeded (at debug level):

```javascript
if (config) {
  if (process.env.DEBUG) {
    console.debug('[loader] Config loaded from: ' + configPath);
  }
}
```

## Anti-Patterns to Avoid

### ❌ Environment-Based Logic
```javascript
// Don't do this
const configPath = process.env.NODE_ENV === 'production'
  ? path.join(__dirname, '../..', 'config.json')
  : path.join(__dirname, '../../..', 'config.json');
```

**Why**: Requires environment setup, brittle, hard to test

### ❌ Complex Detection Logic
```javascript
// Don't do this
const isInstalled = fs.existsSync(path.join(__dirname, '../..', '.installed'));
const configPath = isInstalled
  ? path.join(__dirname, '../..', 'config.json')
  : path.join(__dirname, '../../..', 'config.json');
```

**Why**: Requires marker files, complex, error-prone

### ❌ Silent Failures
```javascript
// Don't do this
let config = loadJsonConfig(configPath) || {};
```

**Why**: No indication of failure, hard to debug, loses 140+ settings silently

## Integration with Existing Systems

### Works With
- ✅ npm/yarn package installations
- ✅ Ansible/Chef deployments
- ✅ Docker containers
- ✅ CI/CD pipelines
- ✅ Local development
- ✅ Documentation generation
- ✅ Test suites

### Doesn't Require
- ❌ Environment variables
- ❌ Build-time configuration
- ❌ Conditional compilation
- ❌ Symlinks or aliases
- ❌ Path mapping
- ❌ Custom loaders

## Quality Gates

### Validation Checklist

Before deploying dual-context config loading:

- [ ] Production path points to installed location
- [ ] Development path points to repository root
- [ ] Both paths tested manually
- [ ] Error messages show both searched paths
- [ ] Graceful fallback to defaults implemented
- [ ] Debug logging available (if needed)
- [ ] Documentation updated with both contexts
- [ ] Tests cover both scenarios

### Testing Requirements

**Test in production context:**
```bash
$ node ~/.claude/hooks/lib/config-loader.js
✓ Config loaded successfully
```

**Test in development context:**
```bash
$ node src/hooks/lib/config-loader.js
✓ Config loaded successfully
```

**Test hook execution in production:**
```bash
$ node ~/.claude/hooks/agent-infrastructure-protection.js < test-input.json
✓ Hook runs correctly
```

**Test hook execution in development:**
```bash
$ node src/hooks/agent-infrastructure-protection.js < test-input.json
✓ Hook runs correctly
```

## Related Patterns

- **Configuration Hierarchy**: Combines with user/project/default config layers
- **Graceful Degradation**: Provides defaults when config unavailable
- **Path Resolution**: Systematic approach to finding resources
- **Error Reporting**: Enhanced messages aid debugging

## Success Metrics

- Zero environment variables required
- 100% test pass rate in both contexts
- Documentation examples work without modification
- Clear error messages when config missing
- No production issues from path resolution

## References

- Implemented in: `src/hooks/lib/config-loader.js`
- PR: https://github.com/intelligentcode-ai/intelligent-claude-code/pull/239
- Issue: Hook enforcement failures in other projects
- Commits: 1a38567, 490e159
