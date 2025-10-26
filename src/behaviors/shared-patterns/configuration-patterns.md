# Configuration Patterns

**MANDATORY:** Use configuration hierarchy. Auto-correct violations.

## Imports

@./installation-path-detection.md

## Configuration Hierarchy
**Priority (Highest→Lowest):**
1. Embedded config (in AgentTasks)
2. Project config (./config.md - default, or .claude/config.md if user demands)
3. Installation global ({get_install_path()}/config.md - installation-wide only)
4. System defaults

## Settings Structure

### Git Settings
- git_privacy (true/false) - MANDATORY validation before git operations
- branch_protection (true/false)
- default_branch (main/master/develop)
- require_pr_for_main (true/false)
- privacy_patterns (array) - AI mention patterns to filter

### Autonomy Settings
- autonomy_level (L1/L2/L3)
- pm_always_active (true/false)
- blocking_enabled (true/false)

### Team Settings
- default_reviewer (@Role)
- specialist_creation (true/false)
- role_validation (true/false)

### AgentTask Settings
- agenttask_template_path (default: agenttask-templates)
- template_validation (true/false)
- complexity_override (true/false)

## System Defaults (Professional Standards)

### Professional Default Values

**Git Settings (Professional Security Standards):**
- **git_privacy**: Enable AI mention stripping from commits (MANDATORY validation)
- **privacy_patterns**: ["AI", "Claude", "agent", "Generated with Claude Code", "Co-Authored-By: Claude"]
- **branch_protection**: Enable main branch protection
- **require_pr_for_main**: Require pull requests for main branch changes

**Autonomy Settings (Professional Team Standards):**
- **autonomy_level**: Use L2 for balanced control and efficiency
- **pm_always_active**: Always activate PM role
- **blocking_enabled**: Enable enforcement blocking

**Team Settings (Professional Collaboration):**
- **specialist_creation**: Allow dynamic specialist creation
- **role_validation**: Validate role assignments

## Loading Process
1. Load configuration from hierarchy
2. Load system defaults (professional standards above)
3. Merge installation global ({get_install_path()}/config.md - installation-wide only)
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