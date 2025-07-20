# Config Loader

**Purpose:** Load and merge configuration from hierarchy  
**Type:** Core System Component  
**Status:** ACTIVE

## Operation

**Hierarchy:** Use `/icc-load-config` for Embedded → Project → User → Defaults hierarchy  
**Access:** Use `/icc-load-config` to load and merge configuration from hierarchy  
**Caching:** Use `/icc-load-config` with 5 minute TTL, 1 hour for embedded configs  
**Key Settings:** autonomy_level, git_privacy, pm_always_active, blocking_enabled accessed via `/icc-get-setting [setting_name]`  

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

**Configuration Loading:** Use `/icc-load-config` to read `~/.claude/config.md` (user global), read `.claude/config.md` (project specific), parse YAML front matter or key:value pairs, merge with system defaults, cache for 5 minutes

**Embedded Config:** Use `/icc-apply-config [assignment_file]` to extract `embedded_config:` from assignment files, override other settings temporarily, cache for 1 hour

**Configuration Access:** Use `/icc-get-setting [setting_name]` to retrieve merged configuration from hierarchy, access specific settings with fallback defaults, apply embedded configuration overrides

## Integration

**Behavioral Pattern:** Use `/icc-load-config` at behavior activation, `/icc-get-setting` before behavioral actions, `/icc-git-clean` when git privacy enabled, `/icc-apply-config` for embedded overrides

**System Integration:** Use `/icc-get-setting [git_privacy]` before commits, `/icc-get-setting [autonomy_level]` for workflow rules, `/icc-get-setting [role_validation]` for assignment enforcement, `/icc-get-setting [pm_always_active]` for team startup

---
*Config loader for intelligent-claude-code system*