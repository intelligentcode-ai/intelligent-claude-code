# Configuration Patterns

**MANDATORY:** Use configuration hierarchy. Auto-correct violations.

## Imports

@./installation-path-detection.md

## Configuration Hierarchy
**Priority (Highest→Lowest):**
1. Embedded config (in AgentTasks)
2. Project config (./icc.config.json or ./.claude/icc.config.json)
3. Installation global ({get_install_path()}/icc.config.json - installation-wide only)
4. System defaults (icc.config.default.json, icc.workflow.default.json)

## Configuration Files

### Primary Configuration (icc.config.json)
**Runtime and behavioral settings**

### Workflow Configuration (icc.workflow.json)
**AgentTask size-specific workflow requirements**

See `docs/configuration-guide.md` for complete documentation.

## Settings Structure

### Git Settings (git.*)
- git.privacy (true/false) - AI mention stripping (enforced by git-privacy-enforcement.js hook)
- git.privacy_patterns (array) - Patterns to filter
- git.branch_protection (true/false)
- git.default_branch (main/master/develop)
- git.require_pr_for_main (true/false)

**Git Privacy Enforcement**: Automatic via hook - no manual action required

### Autonomy Settings (autonomy.*)
- autonomy.level (L1/L2/L3)
- autonomy.pm_always_active (true/false)
- autonomy.blocking_enabled (true/false)
- autonomy.l3_settings.* (L3-specific configuration)

### Team Settings (team.*)
- team.default_reviewer (@Role)
- team.specialist_creation (true/false)
- team.role_validation (true/false)

### AgentTask Settings (agenttask.*)
- agenttask.template_path (default: agenttask-templates)
- agenttask.template_validation (true/false)
- agenttask.complexity_override (true/false)

## System Defaults (Professional Standards)

Defined in `icc.config.default.json` and `icc.workflow.default.json`.

### Professional Default Values

**Git Settings (Professional Security Standards):**
- **git.privacy**: Enable AI mention stripping from commits (MANDATORY validation)
- **git.privacy_patterns**: ["AI", "Claude", "agent", "Generated with Claude Code", "Co-Authored-By: Claude"]
- **git.branch_protection**: Enable main branch protection
- **git.require_pr_for_main**: Require pull requests for main branch changes

**Autonomy Settings (Professional Team Standards):**
- **autonomy.level**: Use L2 for balanced control and efficiency
- **autonomy.pm_always_active**: Always activate PM role
- **autonomy.blocking_enabled**: Enable enforcement blocking

**Team Settings (Professional Collaboration):**
- **team.specialist_creation**: Allow dynamic specialist creation
- **team.role_validation**: Validate role assignments

**Workflow Settings (Size-Based Requirements):**
- See `icc.workflow.default.json` for complete nano/tiny/medium/large/mega settings
- Version bumping, changelog, PR, and merge requirements per AgentTask size

## Loading Process
1. Load configuration from hierarchy
2. Load system defaults (icc.config.default.json, icc.workflow.default.json)
3. Merge installation global ({get_install_path()}/icc.config.json - installation-wide only)
4. Merge project (./icc.config.json or ./.claude/icc.config.json)
5. Apply embedded overrides
6. Return merged settings

## Commands
- `/icc-get-setting [key]` - Get setting value with dot notation

## Configuration Management
- **JSON Files**: Runtime configuration in icc.config.json and icc.workflow.json
- **Embedded**: Project-specific configuration overrides in AgentTasks
- **CLAUDE.md**: Project context and behavioral documentation (NOT configuration)

---
*Configuration patterns for consistent settings*