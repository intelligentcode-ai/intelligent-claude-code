# Shared Configuration Patterns

**PURPOSE:** Common configuration loading and management patterns

## Core Configuration Patterns

### Configuration Hierarchy
**Priority Order (Highest to Lowest):**
1. Embedded config (in assignment files)
2. Project config (.claude/config.md)
3. User global (~/.claude/config.md)
4. System defaults

### Settings Structure
```yaml
# Git Settings
git_privacy: true|false
branch_protection: true|false
default_branch: "main"
require_pr_for_main: true|false

# Autonomy Settings
autonomy_level: "L1"|"L2"|"L3"
pm_always_active: true|false
blocking_enabled: true|false

# Team Settings
default_reviewer: "@Role"
specialist_creation: true|false
role_validation: true|false
```

### Loading Pattern
**Process:**
1. Check cache validity (5 min TTL)
2. Load system defaults
3. Merge user global config
4. Merge project config
5. Apply embedded overrides
6. Return merged settings

### Common Operations

### getSetting(key, default)
```
settings = loadMergedConfig()
IF settings.has(key):
  RETURN settings[key]
RETURN default
```

### applyEmbeddedConfig(assignment)
```
IF assignment.has("embedded_config"):
  tempSettings = deepCopy(currentSettings)
  merge(tempSettings, assignment.embedded_config)
  RETURN tempSettings
RETURN currentSettings
```

### checkAutonomy()
```
level = getSetting("autonomy_level", "L2")
SWITCH level:
  CASE "L1": requireUserApproval()
  CASE "L2": requireArchitectApproval()
  CASE "L3": proceedAutonomously()
```

## Configuration Commands

### Load Configuration
`/icc-load-config` - Load and merge all configs

### Get Setting
`/icc-get-setting [key]` - Get specific setting value

### Update Setting
`/icc-update-setting [key] [value]` - Update project config

## Cache Management

### Cache Pattern
```
cacheKey = "config-[project_path]"
IF cache.age > 5_MINUTES:
  cache.invalidate()
  reloadConfig()
RETURN cache.value
```

### Embedded Config Cache
```
embeddedCacheKey = "embedded-[file_hash]"
cacheDuration = 1_HOUR
```

---
*Shared configuration patterns for consistent settings management*