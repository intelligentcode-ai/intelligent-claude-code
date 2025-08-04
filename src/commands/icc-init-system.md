# Init System

Initialize the intelligent-claude-code virtual team system with configuration loading and role activation.

## Behavior
System bootstrap operation that loads configuration, initializes memory, activates roles,
and prepares the virtual team for work. Can be run by any role or automatically on startup.

## Arguments
**Format:** "autonomy_level | pm_active" (optional parameters)
**Example:** "L3 | true" or "" (empty for defaults)
**Defaults:** Uses configuration hierarchy (embedded → project → user → system)

## Core Actions
1. **Load Configuration**: Apply configuration hierarchy (embedded → project → user → system defaults)
2. **Initialize Memory System**: Bootstrap file-based memory system in configured memory_path (default: memory/)
3. **Load Role Definitions**: Initialize 14 core roles and dynamic specialist capabilities from ~/.claude/
4. **Activate Lean Workflow**: Enable assignment-driven workflow executor
5. **Initialize Scoring System**: Activate badges.md achievement tracking
6. **Setup Learning System**: Enable error forgiveness and pattern capture
7. **Configure Tools**: Initialize Context7, GitHub CLI, Brave Search with fallbacks
8. **Create Project Directories**: Ensure memory/, prbs/, stories/ exist in PROJECT ROOT (configurable paths)
9. **Validate System**: Verify all components operational and ready
10. **Apply Autonomy Level**: Set L1/L2/L3 mode based on configuration
11. **Auto-Activate PM**: If pm_always_active=true, activate @PM role
12. **Validate Enforcement**: Check self-correcting patterns are active

## Autonomy Levels
- **L1 (Manual)**: User approval required for ALL actions
- **L2 (Architect)**: Architect approval for technical decisions, auto-proceed for routine
- **L3 (Autonomous)**: Full autonomous execution, only stops for critical issues

## System Validation Checklist
- ✅ Configuration loaded and applied
- ✅ Memory system operational  
- ✅ Role definitions loaded
- ✅ Lean workflow executor active
- ✅ Scoring system operational
- ✅ Learning system active
- ✅ Tool integrations configured
- ✅ Assignment file processing ready
- ✅ Enforcement validation active

## Error Handling
- **CONFIG_LOAD_FAILED**: "❌ Error: Failed to load configuration. Check ~/.claude/config.md"
- **MEMORY_INIT_FAILED**: "⚠️ Warning: Memory system unavailable. Check memory/ directory (or configured memory_path)"
- **ROLE_LOAD_FAILED**: "❌ Error: Failed to load role definitions. Check ~/.claude/specialists.md"
- **WORKFLOW_INIT_FAILED**: "❌ Error: Workflow executor failed to initialize"
- **TOOL_INIT_FAILED**: "⚠️ Warning: Some tools unavailable. Using fallbacks"
- **INVALID_AUTONOMY**: "❌ Error: Autonomy level must be L1, L2, or L3"
- **SYSTEM_BUSY**: "⏳ System busy. Current operation must complete first"
- **ENFORCEMENT_FAILED**: "⚠️ Warning: Self-correcting enforcement inactive"
- **PROJECT_BOUNDARY_VIOLATION**: "❌ Error: Attempted to modify ~/.claude/ during execution"
- **DIRECTORY_CREATION_FAILED**: "❌ Error: Cannot create project directories. Check permissions"
