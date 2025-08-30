# Get Setting

Retrieve configuration setting using $ARGUMENTS with hierarchy support.

## Imports

@../behaviors/shared-patterns/installation-path-detection.md

## Behavior

Gets setting value from configuration hierarchy with dot notation support.

## Usage
`/icc-get-setting <setting_key> [default_value]`

**Arguments:**
- `setting_key` - Configuration key to retrieve (required)
- `default_value` - Optional: Default if not found

**Examples:**
```
/icc-get-setting git_privacy
/icc-get-setting autonomy_level L2
/icc-get-setting team.default_reviewer @Architect
```

## Core Actions

1. Parse setting key and optional default from $ARGUMENTS
2. Search configuration hierarchy:
   - Embedded configs (highest priority)
   - Project config (.claude/config.md)
   - Installation config ({get_install_path()}/config.md)
   - System defaults
3. Support dot notation for nested values
4. Return first found value or default
5. Cache result for performance

## Dot Notation Support

**Examples:**
- "git_privacy" → boolean value
- "team.default_reviewer" → role value
- "l3_settings.max_parallel" → numeric value

## Error Handling

- **Invalid key**: "Setting key cannot be empty"
- **Config error**: "Configuration hierarchy corrupted"