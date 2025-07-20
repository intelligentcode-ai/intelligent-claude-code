# Config Loader

**Purpose:** Load and merge configuration from hierarchy  
**Type:** Core System Component  
**Status:** ACTIVE

## Operation

**Hierarchy:** Embedded → Project → User → Defaults  
**Merging:** Settings merged from all levels with hierarchy priority  
**Caching:** 5 minute TTL, 1 hour for embedded configs  
**Key Settings:** autonomy_level, git_privacy, pm_always_active, blocking_enabled  

## Core Settings

```yaml
# Git Settings
git_privacy: false          # Strip AI/Claude mentions from commits
branch_protection: true     # Force feature branch workflow
default_branch: "main"      # Default branch name
require_pr_for_main: true   # Require PR/MR for main branch

# Autonomy Settings
autonomy_level: "L2"        # System autonomy level (L1/L2/L3)
pm_always_active: false    # Auto-activate PM role on startup
blocking_enabled: true      # Allow blocking behaviors

# Team Settings
default_reviewer: "@AI-Architect"  # Default peer reviewer
specialist_creation: true   # Allow dynamic specialist creation
role_validation: true       # Enforce role assignment validation
```

## Implementation

**Configuration Loading:**
- Read `~/.claude/config.md` (user global)
- Read `.claude/config.md` (project specific)
- Parse YAML front matter or key:value pairs
- Merge with system defaults
- Cache for 5 minutes

**Embedded Config:**
- Extract `embedded_config:` from assignment files
- Override other settings temporarily
- Cache for 1 hour

**Settings Access:**
- Retrieve merged configuration
- Get specific setting with dot notation
- Apply embedded overrides

## Integration

**System Integration:**
- Git Operations: Check `git_privacy` before commits
- Workflow Execution: Apply `autonomy_level` rules
- Role Assignment: Enforce `role_validation` settings
- Team Startup: Check `pm_always_active` flag

---
*Config loader for intelligent-claude-code system*