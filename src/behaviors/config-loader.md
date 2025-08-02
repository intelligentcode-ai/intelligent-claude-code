# Config Loader

**MANDATORY:** MUST use configuration hierarchy. Auto-correct violations.

**Purpose:** Load and merge configuration from hierarchy  
**Type:** Core System Component  
**Status:** ACTIVE

## Imports

@./shared-patterns/configuration-patterns.md
@./shared-patterns/autonomy-patterns.md

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
3. Merge user global config (~/.claude/config.md - system-wide only)
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

## Integration Patterns

### API Usage
- **Get Setting:** Load config → Check key exists → Return value or default
- **Check Autonomy:** Get autonomy_level → Apply L1/L2/L3 behaviors (see autonomy-patterns.md)
- **Apply Embedded:** Check PRB config → Merge with current → Return merged
- **Load Context:** Automatically loads CLAUDE.md from both locations
- **Settings Access:** Use /icc-get-setting command

### CLAUDE.md Integration
- Automatically loads during system initialization
- Checks both project root and .claude/ locations
- Merges with configuration hierarchy
- Enables context-aware behavioral decisions

---
*Config loader for intelligent-claude-code system*