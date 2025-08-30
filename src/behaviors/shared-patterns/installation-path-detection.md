# Installation Path Detection

**MANDATORY:** Detect actual installation location dynamically. Never hardcode paths.

## Installation Scopes

**User Scope:** ~/.claude/ (global for user)
**Project Scope:** {project_root}/.claude/ (project-specific)
**Custom Scope:** Any configured directory

## Detection Order

**MANDATORY:** Search for installation location in priority order:
1. **Project Scope**: Check if .claude/ exists in project root
2. **Environment Variable**: Check CLAUDE_INSTALL_PATH environment variable
3. **User Scope**: Check if ~/.claude/ exists
4. **Error**: If none found, report installation not detected

## Path Resolution Functions

### get_install_path()
**Purpose:** Returns actual installation directory
**Implementation:**
- Cache result for session (5-minute TTL)
- Search in detection order
- Return absolute path to installation base

**Detection Logic:**
```bash
if [ -d "$PROJECT_ROOT/.claude" ]; then
    INSTALL_PATH="$PROJECT_ROOT/.claude"
elif [ -n "$CLAUDE_INSTALL_PATH" ]; then
    INSTALL_PATH="$CLAUDE_INSTALL_PATH"
elif [ -d "$HOME/.claude" ]; then
    INSTALL_PATH="$HOME/.claude"
else
    ERROR: "No installation found"
fi
```

### get_template_path()
**Purpose:** Returns template directory
**Implementation:** `{get_install_path()}/prb-templates/`

### get_behavior_path() 
**Purpose:** Returns behaviors directory
**Implementation:** `{get_install_path()}/behaviors/`

### get_config_path()
**Purpose:** Returns global config file path
**Implementation:** `{get_install_path()}/config.md`

### get_roles_path()
**Purpose:** Returns roles directory
**Implementation:** `{get_install_path()}/roles/`

### get_commands_path()
**Purpose:** Returns commands directory  
**Implementation:** `{get_install_path()}/commands/`

## Usage Pattern

**FORBIDDEN PATTERN:**
```
~/.claude/prb-templates/
~/.claude/behaviors/
~/.claude/config.md
```

**REQUIRED PATTERN:**
```
{get_install_path()}/prb-templates/
{get_install_path()}/behaviors/
{get_install_path()}/config.md
```

## Cache Management

**Installation Path Cache:**
- **TTL:** 5 minutes (installation location rarely changes)
- **Cache Key:** Based on project root + environment variables
- **Invalidation:** File system changes, environment changes
- **Storage:** Session-based, not persistent

## Integration Requirements

**MANDATORY:** All behaviors and commands MUST:
1. **Import this pattern** - Add @./installation-path-detection.md import
2. **Use dynamic path resolution** - Never hardcode installation paths
3. **Cache path results** - Store resolved paths for session reuse
4. **Handle missing installation** - Graceful error handling when not found

## Error Handling

### Installation Not Found
**ERROR MESSAGE:** "❌ Installation not detected. Expected locations: {project_root}/.claude/, $CLAUDE_INSTALL_PATH, ~/.claude/"
**RECOVERY:** Prompt user to run installation or set CLAUDE_INSTALL_PATH

### Path Resolution Failure
**ERROR MESSAGE:** "❌ Path resolution failed for {component}: {path}"
**RECOVERY:** Verify installation integrity, check file permissions

### Cache Issues
**WARNING MESSAGE:** "⚠️ Path cache unavailable, using direct resolution"
**IMPACT:** Performance degradation, no functional impact

## Project Scope Detection

### Project Installation Markers
**DETECTION PATTERNS:**
- `.claude/` directory exists in project root
- `.claude/behaviors/` contains behavioral patterns
- `.claude/prb-templates/` contains PRB templates
- `.claude/config.md` contains project-specific configuration

### Project vs User Scope Implications

**PROJECT SCOPE BENEFITS:**
- Project-specific configuration
- Version-controlled behavioral patterns
- Team-shared PRB templates
- Isolated from user global settings

**USER SCOPE BENEFITS:**
- Cross-project behavioral consistency
- Personal configuration persistence
- Simplified single-location management
- Traditional installation approach

## Environment Variable Support

### CLAUDE_INSTALL_PATH Configuration
**Purpose:** Allow custom installation locations
**Usage:** `export CLAUDE_INSTALL_PATH="/path/to/custom/claude/install"`
**Validation:** Path must exist and contain required structure
**Priority:** Second in detection order (after project scope)

## Backward Compatibility

### Legacy Path Handling
**TRANSITION SUPPORT:**
- Detect hardcoded ~/.claude/ usage
- Issue deprecation warnings
- Provide migration guidance
- Continue functioning during transition period

**MIGRATION PATH:**
1. **Detection Phase:** Identify hardcoded paths in logs
2. **Warning Phase:** Issue warnings but continue working
3. **Enforcement Phase:** Block hardcoded path usage
4. **Cleanup Phase:** Remove deprecated pattern support

## Implementation Integration

### With Configuration System
**INTEGRATION:** Configuration loading uses dynamic paths:
- User config: `{get_install_path()}/config.md`
- Template hierarchy includes: `{get_install_path()}/prb-templates/`

### With Template Loading
**INTEGRATION:** Template hierarchy search includes:
- Project templates: `{project_root}/{prb_template_path}/`  
- Project .claude templates: `{project_root}/.claude/prb-templates/`
- Installation templates: `{get_install_path()}/prb-templates/`

### With Behavior Loading
**INTEGRATION:** Behavior loading uses:
- Installation behaviors: `{get_install_path()}/behaviors/`
- Dynamic import resolution for shared patterns

### With Command Execution
**INTEGRATION:** Commands resolve installation-relative paths:
- Command definitions: `{get_install_path()}/commands/`
- Configuration access: `{get_install_path()}/config.md`

## Security Considerations

### Path Validation
**MANDATORY:** All resolved paths must be validated:
- **Existence Check:** Verify path exists before use
- **Permission Check:** Ensure read/write permissions as needed
- **Boundary Check:** Paths must be within expected installation scope
- **Injection Prevention:** Sanitize all path components

### Project Scope Security
**PROJECT INSTALLATION ISOLATION:**
- Project scope installations cannot access user scope
- User scope installations cannot modify project scope
- Cross-scope contamination prevention
- Explicit environment variable override only

---
*Installation path detection for dynamic path resolution across all installation scopes*