# Get Setting

Retrieve configuration setting using $ARGUMENTS with hierarchy support.

## Behavior

Gets setting value from configuration hierarchy with dot notation support.

## Arguments

**Format:** "setting_key | default_value"

**Example:** "git_privacy | false"

## Core Actions

1. Parse setting key and optional default from $ARGUMENTS
2. Search configuration hierarchy:
   - Embedded configs (highest priority)
   - Project config (config.md in project root)
   - User config (~/.claude/config.md - read-only)
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