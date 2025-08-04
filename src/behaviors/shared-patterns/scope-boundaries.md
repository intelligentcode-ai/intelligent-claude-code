# Scope Boundaries

**MANDATORY:** Respect project execution boundaries. Auto-correct violations.

**PURPOSE:** Define clear boundaries between installation scope and execution scope

## Core Principles

### Installation Scope
**Location:** ~/.claude/ (user's home directory)
**Purpose:** System-wide installation of intelligent-claude-code
**Contents:**
- System templates (prb-templates/)
- User global configuration (config.md)
- Role definitions (specialists.md)
- Behavioral patterns (behaviors/)
- Command definitions (commands/)

**Operations Allowed:**
- READ: Always allowed during execution
- WRITE: Only during installation/update via Ansible

### Execution Scope
**Location:** Project directory (current working directory)
**Purpose:** Project-specific operations and data
**Contents:**
- Project configuration (config.md or CLAUDE.md)
- Memory storage (configurable, default: memory/)
- PRBs (configurable, default: prbs/)
- Stories (configurable, default: stories/)
- Project-specific templates (if overridden)

**Operations Allowed:**
- READ: All project files
- WRITE: Only within project directory
- CREATE: Directories as needed within project

## Configuration Precedence

### Directory Configuration
All project directories are configurable via settings:
```yaml
# In project config.md or CLAUDE.md
memory_path: "memory/"          # Default
prb_path: "prbs/"              # Default
story_path: "stories/"         # Default
config_path: "config.md"       # Default
```

### Path Resolution
1. Check configuration for custom path
2. Use default if not configured
3. All paths relative to project root
4. Never use absolute paths outside project

## Boundary Enforcement

### Read Operations
- **~/.claude/**: ✅ Allowed (system files)
- **Project directory**: ✅ Allowed
- **Other locations**: ❌ Blocked

### Write Operations
- **~/.claude/**: ❌ NEVER during execution
- **Project directory**: ✅ Always allowed
- **Other locations**: ❌ Blocked

### Directory Creation
- **Project directories**: ✅ Auto-create as needed
- **~/.claude/**: ❌ Never create during execution
- **Configured paths**: ✅ Create within project only

## Common Patterns

### Correct Memory Storage
```bash
# ✅ CORRECT - Uses configured path
memory_path=$(get_setting "memory_path" "memory/")
mkdir -p "${memory_path}/entities/Learning/2025/01/"

# ❌ WRONG - Hardcoded path
mkdir -p .claude/memory/entities/Learning/2025/01/
```

### Correct Configuration Loading
```bash
# ✅ CORRECT - Respects hierarchy
1. Check embedded config
2. Check project config (configurable location)
3. Read ~/.claude/config.md (read-only)
4. Use system defaults

# ❌ WRONG - Writing to user config
echo "setting: value" >> ~/.claude/config.md
```

### Correct Template Loading
```bash
# ✅ CORRECT - Project override supported
1. Check project prb_template_path
2. Check project/.claude/prb-templates/
3. Check ~/.claude/prb-templates/

# ❌ WRONG - Only checking system location
template=~/.claude/prb-templates/nano.yaml
```

## Error Messages

### Boundary Violations
- **WRITE_TO_HOME**: "❌ Cannot write to ~/.claude/ during execution"
- **CREATE_OUTSIDE_PROJECT**: "❌ Cannot create directories outside project"
- **ABSOLUTE_PATH_OUTSIDE**: "❌ Absolute paths must be within project"
- **MISSING_CONFIG**: "⚠️ Using default path, no configuration found"

## Migration Guide

### From Legacy Structure
Old: `.claude/memory/` → New: `memory/` (configurable)
Old: `.claude/prbs/` → New: `prbs/` (configurable)
Old: `.claude/config.md` → New: `config.md` (project root)

### Configuration Migration
```yaml
# Add to project config.md or CLAUDE.md
memory_path: "knowledge/"     # Custom memory location
prb_path: "requirements/"     # Custom PRB location
story_path: "user-stories/"   # Custom story location
```

## Best Practices

1. **Always use configuration**: Never hardcode paths
2. **Check before create**: Verify paths are within project
3. **Fail gracefully**: Provide clear error messages
4. **Document custom paths**: In project README or CLAUDE.md
5. **Test boundaries**: Verify operations stay in project

---
*Scope boundary patterns for intelligent-claude-code system*