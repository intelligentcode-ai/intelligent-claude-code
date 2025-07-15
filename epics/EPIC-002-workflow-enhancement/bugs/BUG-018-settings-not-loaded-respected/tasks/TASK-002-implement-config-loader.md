# TASK-002 Implement Config Loader

**Task:** Build config.md loading mechanism  
**Assigned to:** @AI-Engineer  
**Status:** PLANNED  
**Priority:** critical_path  
**Dependencies:** [TASK-001]

## Implementation Requirements

### Config Loading Implementation
- Implement config.md file reader
- Parse YAML/Markdown settings format
- Validate settings against schema
- Cache loaded settings in memory

### Loading Locations
1. Project-specific: `.claude/config.md`
2. User global: `~/.claude/config.md`
3. Embedded config in assignment files

### Priority Order
1. Embedded config (highest priority)
2. Project config
3. User global config
4. System defaults

## Implementation Details

```pseudocode
FUNCTION loadConfiguration():
    configs = []
    
    // Load user global config
    IF exists("~/.claude/config.md"):
        configs.append(parseConfig("~/.claude/config.md"))
    
    // Load project config
    IF exists(".claude/config.md"):
        configs.append(parseConfig(".claude/config.md"))
    
    // Merge configs with priority
    finalConfig = mergeConfigs(configs)
    
    // Validate final config
    validateConfig(finalConfig)
    
    // Cache for performance
    cacheConfig(finalConfig)
    
    RETURN finalConfig
```

## Validation

- All settings loaded correctly
- Priority order respected
- Invalid settings rejected with warnings
- Cache working for performance