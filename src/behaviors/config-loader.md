# Config Loader

**MANDATORY:** MUST use configuration hierarchy. Auto-correct violations.

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

### CLAUDE.md Loading
- CLAUDE.md serves as project context
- Can be located in project root AND/OR .claude/CLAUDE.md
- Both locations checked and loaded if present
- Auto-loaded on system initialization
- Integrated with configuration hierarchy

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
- CLAUDE.md: 15-minute TTL (moderate stability)
- Invalidate cache on file changes
- Key based on file timestamps and content hash

## Integration Patterns

### API Usage (Using Shared Patterns)
- **Get Setting:** Load config → Check key exists → Return value or default
- **Check Autonomy:** Get autonomy_level → Apply L1/L2/L3 behaviors
- **Apply Embedded:** Check assignment config → Merge with current → Return merged
- **Load Context:** Automatically loads CLAUDE.md from both locations
- **Settings Access:** Follow configuration-patterns.md operations

### CLAUDE.md Integration
- Automatically loads during system initialization
- Checks both project root and .claude/ locations
- Merges with configuration hierarchy
- Enables context-aware behavioral decisions

---
*Config loader for intelligent-claude-code system*