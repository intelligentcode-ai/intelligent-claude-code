# Config Loader

**MANDATORY:** Use configuration hierarchy. Auto-correct violations.

## Imports
@./shared-patterns/configuration-patterns.md
@./shared-patterns/autonomy-patterns.md
@./shared-patterns/mcp-configuration-patterns.md
@./shared-patterns/installation-path-detection.md

## Configuration Hierarchy
Embedded → Project → User → System defaults (5-minute TTL cache).

## CLAUDE.md Loading
Auto-loaded from project root AND/OR .claude/CLAUDE.md on initialization.
Integrated with configuration hierarchy.

## Loading Process
1. Check cache validity (5 min TTL)
2. Load system defaults
3. Merge installation global (installation_path/config.md)
4. Merge project config (./config.md or .claude/config.md)
5. Apply embedded overrides (from AgentTasks)
6. Return merged settings

## Settings Access
Use `icc-get-setting` command for individual settings with dot notation.
Persist autonomy_level and l3_settings changes to CLAUDE.md.

## Integration
- **Get Setting**: Load config → Return value or default
- **Check Autonomy**: Get autonomy_level → Apply L1/L2/L3 behaviors
- **Apply Embedded**: Merge AgentTask config with current settings
- **Load Context**: Auto-loads CLAUDE.md from both locations

---
*Config loader for intelligent-claude-code system*