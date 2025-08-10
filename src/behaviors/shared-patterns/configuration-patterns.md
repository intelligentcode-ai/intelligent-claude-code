# Configuration Patterns

**MANDATORY:** Use configuration hierarchy. Auto-correct violations.

## Configuration Hierarchy
**Priority (Highest→Lowest):**
1. Embedded config (in PRBs)
2. Project config (./config.md - default, or .claude/config.md if user demands)
3. User global (~/.claude/config.md - system-wide only)
4. System defaults

## Settings Structure

### Git Settings
- git_privacy (true/false)
- branch_protection (true/false)
- default_branch (main/master/develop)
- require_pr_for_main (true/false)

### Autonomy Settings
- autonomy_level (L1/L2/L3)
- pm_always_active (true/false)
- blocking_enabled (true/false)

### Team Settings
- default_reviewer (@Role)
- specialist_creation (true/false)
- role_validation (true/false)

### PRB Settings
- prb_template_path (prb-templates/.claude/prb-templates)
- template_validation (true/false)
- complexity_override (true/false)

## Loading Process
1. Load configuration from hierarchy
2. Load system defaults
3. Merge user global (~/.claude/config.md - system-wide only)
4. Merge project (./config.md or .claude/config.md if explicitly configured)
5. Apply embedded overrides
6. Return merged settings

## Commands
- `/icc-get-setting [key]` - Get setting value
- `/icc-load-config` - Load all configs

## Configuration Management
- Standard: Dynamic loading from configuration hierarchy
- Embedded: Project-specific configuration overrides
- CLAUDE.md: Project context and behavioral settings

---
*Configuration patterns for consistent settings*