# Load Config

Load configuration from the hierarchy using $ARGUMENTS.

## Behavior
Load and merge configuration from all hierarchy levels: embedded config,
project config, user global config, and system defaults. Apply configuration
merging rules and cache results for performance.

## Arguments
**Format:** "Source: config_source | Refresh: true|false | Context: assignment_file_path"
**Example:** "Source: hierarchy | Refresh: true | Context: epics/EPIC-001/story.yaml"

## Core Actions
- Parse configuration source and options from $ARGUMENTS
- Load configuration from hierarchy levels:
  1. **Embedded Config**: Extract from assignment file (if Context provided)
  2. **Project Config**: Load from `.claude/config.md`
  3. **User Global**: Load from `~/.claude/config.md`
  4. **System Defaults**: Load built-in defaults
- Apply configuration merging with priority order:
  - Embedded (highest priority) overrides Project
  - Project overrides User Global
  - User Global overrides System Defaults
- Cache merged configuration for 5 minutes (1 hour for embedded)
- Return final configuration object

## Configuration Sources

### Hierarchy (Complete Loading)
- Load all levels and merge with priority
- Apply caching for performance
- Most common usage pattern

### Project Only
- Load project-specific settings
- Skip user global and embedded
- Used for project validation

### User Global Only
- Load user preferences
- Skip project and embedded
- Used for user defaults

### Embedded Only
- Extract from specific assignment file
- Temporary overrides only
- Used for assignment-specific behavior

## Configuration Hierarchy

### System Defaults (FALLBACK ONLY - Applied when setting not found)
**BEHAVIORAL RULE:** These defaults are used ONLY when a setting is not found in any configuration file. Always prefer user/project configuration over these fallbacks.

```yaml
# Git Settings Defaults
git_privacy: false                    # No privacy by default
branch_protection: true               # Enforce feature branches
default_branch: "main"                # Standard main branch
require_pr_for_main: true             # Require PR workflow

# Autonomy Settings Defaults  
autonomy_level: "L2"                  # Balanced autonomy
pm_always_active: false               # Manual PM activation
blocking_enabled: true                # Allow blocking behaviors

# Team Settings Defaults
default_reviewer: "@AI-Architect"     # Fallback reviewer
specialist_creation: true             # Enable dynamic specialists
role_validation: true                 # Enforce role validation
```

**IMPORTANT:** These are NOT hardcoded values - they are fallback values used only when configuration is missing from all other sources.

### User Global (`~/.claude/config.md`)
- Personal preferences
- Default autonomy level
- Preferred git settings
- Default reviewer assignments

### Project Config (`.claude/config.md`)
- Project-specific overrides
- Team standards
- Repository-specific settings
- Workflow customizations

### Embedded Config (in assignment files)
- Assignment-specific overrides
- Temporary behavior changes
- Context-aware settings
- Highest priority settings

## Caching Strategy
- **Standard Config**: 5-minute TTL
- **Embedded Config**: 1-hour TTL (more stable)
- **Cache Key**: Based on file timestamps and content hash
- **Cache Invalidation**: Automatic on file changes

## Configuration Merging
- **Deep Merge**: Nested objects merged recursively
- **Array Override**: Arrays replaced, not merged
- **Null Values**: Remove keys when set to null
- **Type Safety**: Validate types during merge

## Integration
- Used by all behavioral modules during initialization
- Referenced by workflow templates for embedded config
- Integrated with settings API for runtime access
- Supports dynamic configuration changes
- Connected to validation systems for config compliance

## Quality Standards
- Fast configuration loading (<50ms for cached)
- Consistent merge behavior across all components
- Clear priority documentation
- Error handling for malformed config
- Validation of configuration values