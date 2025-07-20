# Get Setting

Retrieve specific configuration setting value using $ARGUMENTS.

## Behavior
Retrieves individual configuration setting from the merged configuration
hierarchy with dot notation support for nested values. Provides default
value fallback and type validation.

## Arguments
**Format:** "SettingKey: setting.key.path | Default: default_value | Type: expected_type"
**Example:** "SettingKey: git_privacy | Default: false | Type: boolean"

## Core Actions
- Parse setting key and options from $ARGUMENTS
- Load current merged configuration (use cached if available)
- Navigate setting path using dot notation:
  - "git_privacy" → root level setting
  - "team.default_reviewer" → nested setting
  - "workflow.phases.validation" → deep nested setting
- Apply type conversion if specified
- Return setting value or default if not found
- Log setting access for debugging

## Setting Key Patterns

### Git Settings
- `git_privacy` → boolean (strip AI mentions from commits)
- `branch_protection` → boolean (enforce feature branch workflow)
- `default_branch` → string (main branch name)
- `require_pr_for_main` → boolean (require PR/MR for main)

### Autonomy Settings
- `autonomy_level` → string (L1/L2/L3 autonomy level)
- `pm_always_active` → boolean (auto-activate PM role)
- `blocking_enabled` → boolean (allow blocking behaviors)

### Team Settings
- `default_reviewer` → string (default peer reviewer role)
- `specialist_creation` → boolean (allow dynamic specialists)
- `role_validation` → boolean (enforce role validation)
- `capability_threshold` → number (minimum capability match)

### Workflow Settings
- `workflow.outer_template` → string (outer workflow file)
- `workflow.inner_template` → string (inner workflow file)
- `workflow.validation_required` → boolean (enforce validation)

## Type Conversion

### Boolean Types
- "true", "yes", "1" → true
- "false", "no", "0" → false
- Case insensitive conversion

### Number Types
- String to number conversion
- Validation for valid numbers
- Range checking if specified

### Array Types
- Comma-separated string to array
- JSON array parsing
- Element type validation

## Default Value Handling
- Return default if setting not found
- Type conversion applied to defaults
- Null handling for optional settings
- Warning log for missing settings

## Dot Notation Navigation
```yaml
# Configuration structure
team:
  settings:
    default_reviewer: "@AI-Architect"
    capability_threshold: 0.7

# Access patterns
"team.settings.default_reviewer" → "@AI-Architect"
"team.settings.capability_threshold" → 0.7
"team.settings.nonexistent" → default_value
```

## Caching Integration
- Use cached configuration when available
- Respect cache TTL (5 minutes standard, 1 hour embedded)
- Cache invalidation on configuration changes
- Performance optimization for frequent access

## Error Handling
- Invalid setting key → return default with warning
- Type conversion failure → return default with error log
- Missing configuration → return default with info log
- Malformed dot notation → return default with error

## Integration
- Used by all behavioral modules for setting access
- Referenced by workflow templates for dynamic behavior
- Integrated with configuration hierarchy system
- Supports runtime configuration queries
- Connected to validation systems for compliance checks

## Quality Standards
- Fast setting retrieval (<10ms)
- Consistent type handling
- Clear error messages
- Comprehensive default value support
- Audit trail for setting access