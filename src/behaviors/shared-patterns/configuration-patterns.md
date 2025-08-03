# Shared Configuration Patterns

**MANDATORY:** MUST use configuration hierarchy. Auto-correct violations.

**PURPOSE:** Common configuration loading and management patterns

## Core Configuration Patterns

### Configuration Hierarchy
**Priority Order (Highest to Lowest):**
1. Embedded config (in assignment files)
2. Project config (.claude/config.md - **within project scope**)
3. User global (~/.claude/config.md - **read-only during execution**)
4. System defaults

**Scope Boundaries:**
- **Installation**: System files placed in ~/.claude/ for global access
- **Execution**: Operations confined to project directory (./ and .claude/)
- **Configuration**: Read from ~/.claude/, execute within project boundaries

### Settings Structure
**Git Settings:** git_privacy (true/false), branch_protection (true/false), default_branch (main/master/develop), require_pr_for_main (true/false)

**Autonomy Settings:** autonomy_level (L1/L2/L3), pm_always_active (true/false), blocking_enabled (true/false)

**Team Settings:** default_reviewer (@Role), specialist_creation (true/false), role_validation (true/false)

### Loading Pattern
**Process:**
1. Check cache validity (5 min TTL)
2. Load system defaults
3. Merge user global config
4. Merge project config
5. Apply embedded overrides
6. Return merged settings

### Common Operations

### getSetting Function
**Process:** Load merged configuration → Check if key exists → Return value if found → Return default if not found

### applyEmbeddedConfig Function  
**Process:** Check if assignment has embedded config → If yes: copy current settings, merge with embedded config, return merged → If no: return current settings unchanged

### checkAutonomy Function
**Process:** Get autonomy level setting (default L2) → L1: require user approval → L2: require architect approval → L3: proceed autonomously

## Configuration Commands

### Load Configuration
`/icc-load-config` - Load and merge all configs

### Get Setting
`/icc-get-setting [key]` - Get specific setting value

### Update Setting
`/icc-update-setting [key] [value]` - Update project config

## Cache Management

### Cache Pattern
**Process:** Create cache key from project path → Check if cache age exceeds 5 minutes → If expired: invalidate cache and reload configuration → Return cached value

### Embedded Config Cache
**Process:** Create cache key from file hash → Cache duration set to 1 hour for stability

---
*Shared configuration patterns for consistent settings management*