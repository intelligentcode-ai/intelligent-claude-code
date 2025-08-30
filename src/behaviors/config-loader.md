# Config Loader

**MANDATORY:** MUST use configuration hierarchy. Auto-correct violations.

**Purpose:** Load and merge configuration from hierarchy  
**Type:** Core System Component  
**Status:** ACTIVE

## Imports

@./shared-patterns/configuration-patterns.md
@./shared-patterns/autonomy-patterns.md
@./shared-patterns/mcp-configuration-patterns.md
@./shared-patterns/installation-path-detection.md

## Operation

### Configuration Management
- Apply configuration hierarchy: Embedded → Project → User → Defaults
- Merge configs in priority order
- Implement cache with 5-minute TTL
- Support all setting types (git, autonomy, team)  

## Configuration Details

### Dynamic Loading
- Priority: Embedded → Project → User → Defaults
- All settings loaded dynamically, never hardcoded
- System defaults used as fallback only
- Check cache before loading (5 min TTL)

### CLAUDE.md Loading
- CLAUDE.md serves as project context
- Can be located in project root AND/OR .claude/CLAUDE.md
- Both locations checked and loaded if present
- Auto-loaded on system initialization
- Integrated with configuration hierarchy

## Implementation Details

### Loading Process
1. Check cache validity (5 min TTL)
2. Load system defaults
3. Merge user global config ({get_install_path()}/config.md - installation-wide only)
4. Merge project config (./config.md default, or .claude/config.md if user configured)
5. Apply embedded overrides (from PRBs)
6. Return merged settings

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
- CLAUDE.md: 15-minute TTL (moderate stability)
- Invalidate cache on file changes
- Key based on file timestamps and content hash

**Configuration Persistence:**
- Persist autonomy_level and l3_settings changes to CLAUDE.md
- Update CLAUDE.md while preserving existing content and formatting
- Use YAML frontmatter or dedicated configuration section
- Validate configuration before writing to prevent corruption
- Create backup before modification for rollback capability
- Invalidate cache after successful persistence

## Integration Patterns

### API Usage
- **Get Setting:** Load config → Check key exists → Return value or default
- **Check Autonomy:** Get autonomy_level → Apply L1/L2/L3 behaviors (see autonomy-patterns.md)
- **Apply Embedded:** Check PRB config → Merge with current → Return merged
- **Load Context:** Automatically loads CLAUDE.md from both locations
- **Settings Access:** Natural configuration queries through behavioral patterns

### CLAUDE.md Integration
- Automatically loads during system initialization
- Checks both project root and .claude/ locations
- Merges with configuration hierarchy
- Enables context-aware behavioral decisions

### Autonomy Level Persistence
- Read autonomy_level from CLAUDE.md on system initialization
- Persist autonomy_level changes back to CLAUDE.md for session preservation
- Support autonomy configuration in CLAUDE.md format:
  ```yaml
  autonomy_level: L2
  l3_settings:
    max_parallel: 5
    auto_discover: true
    continue_on_error: true
  ```
- Automatically create autonomy configuration section if missing
- Preserve user preferences across sessions and system restarts

## MCP Configuration Loading

### MCP Integration Support
- Check for mcp_integrations section in CLAUDE.md during configuration loading
- Validate MCP configuration schema against defined patterns
- Store MCP settings in configuration hierarchy with standard caching
- Make MCP configuration available to behaviors via standard configuration access

### MCP Configuration Processing
**Integration with Standard Loading:**
1. **Parse MCP Section:** Extract mcp_integrations from CLAUDE.md YAML frontmatter
2. **Schema Validation:** Validate against mcp-configuration-patterns.md schema
3. **Provider Verification:** Check if configured MCP providers are available
4. **Configuration Storage:** Store in configuration cache with standard TTL
5. **Access Enablement:** Make available via icc-get-setting command with dot notation

**Configuration Access Examples:**
- `icc-get-setting mcp_integrations.memory.enabled`
- `icc-get-setting mcp_integrations.issue_tracking.provider`
- `icc-get-setting mcp_integrations.documentation.config.base_path`

---
*Config loader for intelligent-claude-code system*