# Config Loader

**Purpose:** Load and merge configuration from hierarchy  
**Type:** Core System Component  
**Status:** ACTIVE

## Operation

**Hierarchy:** Embedded → Project → User → System Defaults  
**Dynamic Loading:** All configuration loaded from files, no hardcoded values  
**Caching:** 5 minute TTL, 1 hour for embedded configs  
**Key Settings:** autonomy_level, git_privacy, pm_always_active, blocking_enabled  

## Configuration Hierarchy

**Behavioral Pattern:** AI should ALWAYS load configuration dynamically through the hierarchy, never use hardcoded values

### 1. Embedded Config (Highest Priority)
- Extract `embedded_config:` section from assignment files
- Temporary overrides for specific assignments
- Override all other settings during assignment execution

### 2. Project Config 
- Load from `.claude/config.md` in project root
- Project-specific team standards and workflows
- Override user preferences for project consistency

### 3. User Global Config
- Load from `~/.claude/config.md` in user home
- Personal preferences and default settings
- User's preferred autonomy level and git settings

### 4. System Defaults (Fallback Only)
- Used ONLY when setting not found in hierarchy
- Defined in configuration commands (icc-load-config.md)
- Never hardcoded in behavioral modules

## Dynamic Loading Behavioral Pattern

**Configuration Loading Process:**
1. **Check Cache**: Look for valid cached configuration first
2. **Load Embedded**: Extract embedded_config from assignment file if provided
3. **Load Project**: Read `.claude/config.md` in project root if exists
4. **Load User Global**: Read `~/.claude/config.md` in user home if exists
5. **Apply Defaults**: Use system defaults ONLY for missing settings
6. **Merge Hierarchy**: Apply priority order (embedded > project > user > defaults)
7. **Cache Result**: Store merged configuration with appropriate TTL

**Configuration Parsing:**
- Parse YAML front matter between `---` markers
- Parse key:value pairs in markdown format
- Support nested configuration using dot notation
- Validate configuration types and values
- Handle malformed configuration gracefully

**Settings Retrieval:**
- Use `icc-get-setting.md` command for individual settings
- Support dot notation for nested values
- Apply type conversion and validation
- Return defaults only when setting not found in hierarchy

**Cache Management:**
- Standard configuration: 5-minute TTL
- Embedded configuration: 1-hour TTL (more stable)
- Invalidate cache on file changes
- Key based on file timestamps and content hash

## Integration Behavioral Patterns

**Git Operations Pattern:**
- Execute `icc-get-setting "git_privacy"` before commits
- Load git settings dynamically, never assume defaults
- Apply privacy mode based on loaded configuration

**Workflow Execution Pattern:**
- Execute `icc-get-setting "autonomy_level"` at workflow start
- Load workflow settings from configuration hierarchy
- Apply L1/L2/L3 behavior based on loaded setting

**Role Assignment Pattern:**
- Execute `icc-get-setting "role_validation"` before assignments
- Load team settings from configuration hierarchy
- Enforce validation based on loaded configuration

**Team Startup Pattern:**
- Execute `icc-get-setting "pm_always_active"` at initialization
- Load startup behavior from configuration hierarchy
- Activate PM role based on loaded setting

---
*Config loader for intelligent-claude-code system*