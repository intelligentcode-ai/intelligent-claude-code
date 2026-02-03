---
name: icc-get-setting
description: Retrieve configuration values using dot notation. Use when needing config values like git.privacy, autonomy.level, paths.*, team.default_reviewer, or any other ICC configuration setting.
---

# ICC Get Setting

Retrieve configuration settings from the ICC configuration hierarchy.

## When to Use

- Need to check a configuration value before taking action
- Validating git privacy settings before commits
- Checking paths for file placement
- Retrieving team settings

## Usage

```
/icc-get-setting <setting_key> [default_value]
```

**Arguments:**
- `setting_key` - Configuration key to retrieve (required)
- `default_value` - Fallback if not found (optional)

**Examples:**
```
/icc-get-setting git.privacy
/icc-get-setting autonomy.level L2
/icc-get-setting team.default_reviewer @Architect
/icc-get-setting paths.memory
```

## Configuration Hierarchy

Settings are resolved in order (highest priority first):

1. **Embedded configs** - AgentTask overrides
2. **Project config** - `./icc.config.json` or `./.claude/icc.config.json`
3. **User config** - `~/.claude/icc.config.json`
4. **System defaults** - `icc.config.default.json`

## Common Settings

| Key | Type | Description |
|-----|------|-------------|
| `git.privacy` | boolean | Strip AI mentions from commits |
| `autonomy.level` | string | L1/L2/L3 autonomy mode |
| `paths.memory` | string | Memory storage directory |
| `paths.stories` | string | Stories directory |
| `paths.summaries` | string | Summaries directory |
| `team.default_reviewer` | string | Default reviewer role |

## Dot Notation

Supports nested values:
- `git.privacy` → boolean value
- `paths.memory` → directory path
- `team.default_reviewer` → role string

## Output

Returns the resolved value or default:
```
git.privacy = true
```

## Error Handling

- **Empty key**: "Setting key cannot be empty"
- **Not found**: Returns default or "Setting not found"
