# Load Config

Load and merge configuration from hierarchical sources using $ARGUMENTS.

## Behavior
Load configuration from embedded config (assignment files), project config, user global config, and system defaults. Apply configuration hierarchy with proper precedence and caching.

## Arguments
**Format:** "scope:embedded|project|user|system | source:file_path | refresh:true|false"
**Example:** "scope:project | source:config.md | refresh:false"
**Example:** "scope:embedded | source:story.yaml | refresh:true"
**Example:** "scope:user | source:~/.claude/config.md | refresh:false"

## Core Actions
1. **Parse Configuration Scope**: Extract scope, source file, and refresh flag from $ARGUMENTS
2. **Load Configuration Hierarchy**: 
   - Embedded config (highest priority) - from assignment files
   - Project config - config.md in project root (configurable location)
   - User global config - ~/.claude/config.md (read-only)
   - System defaults (lowest priority)
3. **Merge Configuration**: Apply hierarchy with proper precedence
4. **Cache Management**: Cache for 5 minutes (1 hour for embedded configs)
5. **Validation**: Ensure configuration values are valid
6. **Apply Settings**: Update active configuration state

## Configuration Hierarchy (Highest to Lowest Priority)
1. **Embedded Config** - Settings within assignment files (epic.yaml, story.yaml)
2. **Project Config** - config.md in project root (configurable location)
3. **User Global** - ~/.claude/config.md for user preferences (read-only)
4. **System Defaults** - Built-in fallback values

## Supported Settings
```yaml
# Git Settings
git_privacy: true|false
branch_protection: true|false
default_branch: "main"|"master"|"develop"
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

## Caching Strategy
- **Standard Settings**: 5 minute TTL for performance
- **Embedded Configs**: 1 hour TTL (assignment file configs)
- **Force Refresh**: refresh:true bypasses cache
- **Memory Efficient**: LRU eviction for cache management

## Configuration Loading Process
1. Check cache (unless refresh:true)
2. Load from specified scope or all scopes
3. Parse YAML front matter or key:value pairs
4. Merge with lower priority configs
5. Validate configuration values
6. Update cache with new configuration
7. Apply to active system state

## Error Handling
- **File Not Found**: "Warning: Config file not found, using defaults"
- **Parse Error**: "Error: Invalid YAML in config file: {file}"
- **Invalid Setting**: "Error: Unknown setting '{key}' in config"
- **Permission Error**: "Error: Cannot read config file: {file}"
- **Cache Error**: "Warning: Cache write failed, config loaded successfully"
