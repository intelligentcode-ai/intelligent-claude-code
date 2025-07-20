# Config Loader

**Purpose:** Load and merge configuration from hierarchy  
**Type:** Core System Component  
**Status:** ACTIVE

## Imports

@./shared-patterns/configuration-patterns.md

## Operation

### Configuration Management (Using Shared Patterns)
- Apply Configuration Hierarchy from configuration-patterns.md
- Use Loading Pattern for merging configs
- Implement Cache Pattern with standard TTLs
- Follow Settings Structure for available options  

## Configuration Details

### Dynamic Loading (Using Shared Patterns)
- Configuration Hierarchy defined in configuration-patterns.md
- Priority: Embedded → Project → User → Defaults
- All settings loaded dynamically, never hardcoded
- System defaults used as fallback only

## Implementation Details

### Loading Process (Using Shared Patterns)
- Apply Loading Pattern from configuration-patterns.md
- Check cache validity before loading
- Merge configs in priority order
- Cache results with appropriate TTL

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

## Integration Patterns

### API Usage (Using Shared Patterns)
- Use getSetting(key, default) from configuration-patterns.md
- Apply checkAutonomy() for L1/L2/L3 behavior
- Use applyEmbeddedConfig() for assignment overrides
- Follow Common Operations patterns for all settings access

---
*Config loader for intelligent-claude-code system*