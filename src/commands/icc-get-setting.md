# Get Setting

Retrieve configuration setting using $ARGUMENTS with hierarchy support.

## Imports

## Behavior

Gets setting value from configuration hierarchy with dot notation support.

## Usage
`/icc-get-setting <setting_key> [default_value]`

**Arguments:**
- `setting_key` - Configuration key to retrieve (required)
- `default_value` - Optional: Default if not found

**Examples:**
- Get git privacy setting: /icc-get-setting git_privacy
- Get autonomy level with default: /icc-get-setting autonomy_level L2
- Get default reviewer setting: /icc-get-setting team.default_reviewer @Architect

## Core Actions

1. Parse setting key and optional default from $ARGUMENTS
2. Search configuration hierarchy:
   - Embedded configs (highest priority)
   - Project config (./icc.config.json or ./.claude/icc.config.json)
   - User config (~/.claude/icc.config.json)
   - System defaults (icc.config.default.json)
3. Support dot notation for nested values
4. Validate critical settings (git_privacy MUST be boolean)
5. Return first found value or default
6. Cache result for performance

## Dot Notation Support

**Examples:**
- "git_privacy" → boolean value (CRITICAL for git operations)
- "privacy_patterns" → array of AI mention patterns
- "team.default_reviewer" → role value
- "l3_settings.max_parallel" → numeric value

## Error Handling

- **Invalid key**: "Setting key cannot be empty"
- **Config error**: "Configuration hierarchy corrupted"
