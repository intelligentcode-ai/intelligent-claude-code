# Pattern Configuration System Usage Guide

The pattern configuration system provides fine-grained control over what tools and patterns are allowed or blocked for each intent type in the intelligent-claude-code system.

## Overview

The system consists of two main components:
1. **Configuration File** (`config/intent-patterns.json`) - Defines rules and patterns
2. **Config Loader** (`lib/config-loader.js`) - Loads, validates, and applies configuration

## Intent Types

The system classifies user actions into four intent categories:

- **research**: Reading, searching, analyzing (ALLOWED in main scope)
- **qa**: Answering questions, explaining (ALLOWED in main scope)  
- **planning**: Creating PRBs, architectural discussions (ALLOWED in main scope)
- **work**: Implementing, fixing, modifying code (BLOCKED in main scope)

## Configuration Structure

```json
{
  "version": "1.0.0",
  "intents": {
    "research": {
      "allowed_tools": ["Read", "Grep", "Glob", "WebSearch", "WebFetch", "Bash"],
      "blocked_tools": ["Edit", "Write", "MultiEdit", "NotebookEdit"],
      "parameter_patterns": {
        "allowed": ["^/.*\\.(md|txt|json|yaml|yml)$"],
        "blocked": ["\\b(rm|delete|drop)\\b"]
      },
      "path_patterns": {
        "allowed": ["^/.*/(src|docs|config)/.*$"],
        "blocked": ["^/.*\\.env$", "^/.*/\\.git/.*$"]
      },
      "context_requires": ["read_only_operation"],
      "enforcement": "allow"
    }
  },
  "defaults": {
    "enforcement": "warn",
    "unknown_intent": "research"
  },
  "overrides": {
    "debug_mode": false,
    "strict_mode": true
  }
}
```

## API Usage

### Basic Integration

```javascript
const { validateAction, requiresPrbContext, getEnforcementAction } = require('./intent-classifier');

// Validate an action
const result = await validateAction('Edit', { file_path: '/src/main.js' }, 'fix the bug');
console.log('Decision:', result.decision); // 'allow', 'warn', 'block', 'require_prb'
console.log('Intent:', result.intent);     // 'research', 'qa', 'planning', 'work'
console.log('Violations:', result.violations);

// Check if PRB context is required
const needsPrb = await requiresPrbContext('Edit', { file_path: '/src/main.js' });

// Get enforcement action for an intent
const enforcement = await getEnforcementAction('work');
```

### Configuration Loading

```javascript
const configLoader = require('./config-loader');

// Load complete configuration
const config = await configLoader.loadConfig();

// Get configuration for specific intent
const researchConfig = await configLoader.getIntentConfig('research');

// Check specific patterns
const toolAllowed = await configLoader.isToolAllowed('research', 'Read');
const paramAllowed = await configLoader.isParameterAllowed('research', '/path/file.md');
const pathAllowed = await configLoader.isPathAllowed('research', '/project/src/main.js');
```

## Pattern Matching

### Tool Patterns
Tools are matched exactly against the `allowed_tools` and `blocked_tools` arrays:
- **Explicit Allow**: Tool appears in `allowed_tools`
- **Explicit Block**: Tool appears in `blocked_tools` (takes precedence)
- **Default**: If not in either list, defaults to blocked

### Parameter Patterns
Parameters are matched using regular expressions:
- **Blocked First**: Check `parameter_patterns.blocked` patterns first
- **Then Allowed**: Check `parameter_patterns.allowed` patterns
- **Allow List**: If allowed patterns exist, parameter must match one
- **No Patterns**: If no patterns defined, all parameters allowed

### Path Patterns
File paths are matched using regular expressions:
- **Blocked First**: Check `path_patterns.blocked` patterns first
- **Then Allowed**: Check `path_patterns.allowed` patterns
- **Allow List**: If allowed patterns exist, path must match one
- **No Patterns**: If no patterns defined, all paths allowed

## Environment Variable Overrides

The system supports environment variable overrides:

```bash
# Enable debug mode (relaxed enforcement)
export HOOK_DEBUG_MODE=true

# Enable strict mode (stricter enforcement) 
export HOOK_STRICT_MODE=true

# Override default enforcement
export HOOK_DEFAULT_ENFORCEMENT=block
```

## Enforcement Actions

The system supports four enforcement levels:

- **allow**: Action permitted regardless of violations
- **warn**: Action permitted but warnings logged
- **block**: Action completely blocked
- **require_prb_context**: Action requires PRB+agent execution

## Example Scenarios

### Research Intent
```javascript
// ALLOWED: Reading documentation
validateAction('Read', { file_path: '/docs/README.md' }, 'show documentation');
// Result: { decision: 'allow', intent: 'research' }

// BLOCKED: Destructive bash command
validateAction('Bash', { command: 'rm -rf /' }, 'delete files');
// Result: { decision: 'warn', intent: 'research', violations: {...} }
```

### Work Intent
```javascript
// BLOCKED: Editing source code (requires PRB)
validateAction('Edit', { file_path: '/src/main.js' }, 'fix the bug');
// Result: { decision: 'require_prb', intent: 'work' }

// BLOCKED: All work tools blocked in main scope
validateAction('Write', { file_path: '/src/new.js' }, 'create new file');
// Result: { decision: 'require_prb', intent: 'work' }
```

### Planning Intent
```javascript
// ALLOWED: Creating PRB files
validateAction('Write', { file_path: '/prbs/ready/feature.prb.yaml' }, 'create PRB');
// Result: { decision: 'allow', intent: 'planning' }

// BLOCKED: Editing source during planning
validateAction('Edit', { file_path: '/src/main.js' }, 'plan the changes');
// Result: { decision: 'warn', intent: 'planning', violations: {...} }
```

## Customization

### Adding New Patterns

To add new patterns to the configuration:

1. Edit `config/intent-patterns.json`
2. Add patterns to the appropriate intent section
3. Use regular expressions for flexible matching
4. Test patterns with the validation API

### Creating Custom Intents

While the four base intents are fixed, you can customize their behavior:

1. Modify tool allowances
2. Add new parameter patterns  
3. Update path restrictions
4. Change enforcement levels

### Hot Reloading

The configuration system supports hot reloading:
- File changes are automatically detected
- Cache is cleared when configuration changes
- No restart required for configuration updates

## Testing

The system includes comprehensive tests:

```bash
# Run configuration tests
node config-loader.test.js

# Run intent classifier tests  
node intent-classifier.test.js
```

## Performance

The configuration system is optimized for performance:
- **Caching**: Configuration cached with TTL (5 minutes default)
- **Lazy Loading**: Configuration loaded on first access
- **Pattern Compilation**: Regular expressions compiled once and reused
- **Minimal Overhead**: Validation typically completes in <5ms

## Security Considerations

The pattern configuration system includes security features:
- **Path Restrictions**: Block access to sensitive files (.env, .git, etc.)
- **Command Filtering**: Block destructive bash commands
- **Parameter Validation**: Prevent malicious parameter injection
- **Principle of Least Privilege**: Default to blocking unknown patterns

## Troubleshooting

### Common Issues

1. **Configuration Not Loading**
   - Check file exists: `config/intent-patterns.json`
   - Verify JSON syntax is valid
   - Check file permissions

2. **Pattern Not Matching**
   - Test regex patterns individually
   - Check for case sensitivity
   - Verify escape sequences

3. **Unexpected Enforcement**
   - Check environment variable overrides
   - Verify intent classification is correct
   - Review pattern precedence (blocked → allowed)

### Debug Mode

Enable debug mode for detailed logging:

```bash
export HOOK_DEBUG_MODE=true
```

This provides:
- Pattern matching details
- Configuration loading information
- Violation analysis
- Performance metrics