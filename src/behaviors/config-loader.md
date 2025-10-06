# Config Loader

**MANDATORY:** Use configuration hierarchy. Auto-correct violations.

## Imports
@./shared-patterns/configuration-patterns.md
@./shared-patterns/autonomy-patterns.md
@./shared-patterns/mcp-configuration-patterns.md
@./shared-patterns/installation-path-detection.md

## Configuration Hierarchy
Embedded → Project → User → System defaults (5-minute TTL cache).

## Configuration Files
**Primary**: `icc.config.json` (runtime/autonomy/git/team settings)
**Workflow**: `icc.workflow.json` (version/changelog/PR requirements)
**Context**: `CLAUDE.md` (project documentation and behavioral context)

## Loading Process
1. Check cache validity (5 min TTL)
2. Load system defaults (`icc.config.default.json`, `icc.workflow.default.json`)
3. Merge installation global (installation_path/icc.config.json)
4. Merge project config (./.claude/icc.config.json or ./icc.config.json)
5. Apply embedded overrides (from AgentTasks)
6. Return merged settings

## Settings Access
Use `icc-get-setting` command with dot notation (e.g., `autonomy.level`, `git.privacy`).
See `docs/configuration-guide.md` for complete setting paths and descriptions.

**Example Usage**:
```bash
icc-get-setting autonomy.level          # Returns: "L3"
icc-get-setting git.privacy             # Returns: false
icc-get-setting workflow.tiny.version_bump  # Returns: true
```

## Integration
- **Get Setting**: Load config → Return value or default
- **Check Autonomy**: Get autonomy.level → Apply L1/L2/L3 behaviors
- **Apply Embedded**: Merge AgentTask config with current settings
- **Load Context**: Auto-loads CLAUDE.md from project root AND/OR .claude/CLAUDE.md

---
*Config loader for intelligent-claude-code system*