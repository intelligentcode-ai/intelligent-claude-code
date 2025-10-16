# Configuration System

**MANDATORY:** Configuration hierarchy, loading, and MCP integration patterns. Auto-correct violations.

## Purpose
Consolidated configuration system behaviors from config-loader.md, configuration-patterns.md, and mcp-configuration-patterns.md

## Configuration Hierarchy

**Priority Order** (highest to lowest):
1. Embedded config (in AgentTasks)
2. Project config (./icc.config.json or ./.claude/icc.config.json)
3. Installation global (installation_path/icc.config.json - installation-wide only)
4. System defaults (icc.config.default.json, icc.workflow.default.json)

**Cache**: 5 minutes TTL with validation check before loading

## Configuration Files

### Primary Configuration (icc.config.json)
Runtime and behavioral settings with 4 major categories: Git settings, Autonomy settings, Team settings, AgentTask settings

### Workflow Configuration (icc.workflow.json)
AgentTask size-specific workflow requirements for tiers: nano, tiny, medium, large, mega

### Context File (CLAUDE.md)
Project documentation and behavioral context (NOT configuration). Located in project root and/or .claude/CLAUDE.md

## Loading Process
1. Check cache validity (5 min TTL)
2. Load system defaults (icc.config.default.json, icc.workflow.default.json)
3. Merge installation global (installation_path/icc.config.json)
4. Merge project config (./.claude/icc.config.json or ./icc.config.json)
5. Apply embedded overrides (from AgentTasks)
6. Return merged settings

## Settings Structure

### Git Settings (git.*)
- **git.privacy** (boolean): AI mention stripping (enforced by git-privacy-enforcement.js hook). Enforcement: Automatic via hook - no manual action required
- **git.privacy_patterns** (array): Patterns to filter from commit messages
- **git.branch_protection** (boolean): Enable main branch protection
- **git.default_branch** (string): Default branch name (main/master/develop)
- **git.require_pr_for_main** (boolean): Require pull requests for main branch changes

### Autonomy Settings (autonomy.*)
- **autonomy.level** (enum: L1/L2/L3): Autonomy level (L1=Manual, L2=Guided, L3=Autonomous)
- **autonomy.pm_always_active** (boolean): Always activate PM role
- **autonomy.blocking_enabled** (boolean): Enable enforcement blocking
- **autonomy.l3_settings.\*** (object): L3-specific configuration

### Team Settings (team.*)
- **team.default_reviewer** (@Role): Default reviewer role
- **team.specialist_creation** (boolean): Allow dynamic specialist creation
- **team.role_validation** (boolean): Validate role assignments

### AgentTask Settings (agenttask.*)
- **agenttask.template_path** (string): Template directory path (default: agenttask-templates)
- **agenttask.template_validation** (boolean): Enable template validation
- **agenttask.complexity_override** (boolean): Allow complexity calculation override

## System Defaults
Defined in icc.config.default.json and icc.workflow.default.json

### Professional Default Values

**Git Defaults** (Professional Security Standards):
- **git.privacy**: true (Enable AI mention stripping - MANDATORY)
- **git.privacy_patterns**: ["AI", "Claude", "agent", "Generated with Claude Code", "Co-Authored-By: Claude"]
- **git.branch_protection**: true (Enable main branch protection)
- **git.require_pr_for_main**: true (Require PRs for main branch)

**Autonomy Defaults** (Professional Team Standards):
- **autonomy.level**: L2 (Balanced control and efficiency)
- **autonomy.pm_always_active**: true (Always activate PM role)
- **autonomy.blocking_enabled**: true (Enable enforcement blocking)

**Team Defaults** (Professional Collaboration):
- **team.specialist_creation**: true (Allow dynamic specialists)
- **team.role_validation**: true (Validate role assignments)

**Workflow Defaults**: See icc.workflow.default.json for complete nano/tiny/medium/large/mega settings. Categories: Version bumping, changelog, PR, merge requirements per AgentTask size

## Settings Access

**Command**: `icc-get-setting [key]`
**Notation**: Dot notation (e.g., autonomy.level, git.privacy)

**Examples**:
- icc-get-setting autonomy.level → Returns: "L3"
- icc-get-setting git.privacy → Returns: false
- icc-get-setting workflow.tiny.version_bump → Returns: true

**Documentation**: See docs/configuration-guide.md for complete setting paths and descriptions

## MCP Configuration Patterns

### Configuration Schema

<mcp_configuration id="MCP-CONFIG">
  <schema>
    mcp_integrations:
      memory:
        provider: "mcp__memory"
        enabled: true
        fallback: "file-based"
        config: {}
      issue_tracking:
        provider: "mcp__github"
        enabled: true
        fallback: "file-based"
        project: "owner/repo"
        config: {}
      documentation:
        provider: "user-custom-mcp"
        enabled: true
        fallback: "file-based"
        config:
          base_path: "docs/"
  </schema>

  <detection_pattern enforcement="mandatory">
    <rule>All behaviors MUST check for MCP configuration before operations</rule>

    <provider_selection>
      <step order="1">Check if mcp_integrations.[operation].enabled = true</step>
      <step order="2">If enabled AND provider exists:
        - Try specified MCP provider
        - If provider available: Use MCP provider with config
        - Else: Log degradation warning, use file-based fallback
      </step>
      <step order="3">Otherwise: Use file-based default</step>
    </provider_selection>
  </detection_pattern>

  <fallback_hierarchy enforcement="mandatory">
    <rule>All MCP operations MUST have file-based fallbacks</rule>

    <priority_order>
      <level priority="1">Try Primary: Configured MCP provider</level>
      <level priority="2">Use Fallback: File-based operations</level>
      <level priority="3">Log Degradation: Warning for visibility</level>
    </priority_order>
  </fallback_hierarchy>

  <error_handling>
    <error_messages>
      <message code="MCP_UNAVAILABLE">MCP provider not available</message>
      <message code="MCP_AUTH_FAILED">Authentication failed</message>
      <message code="MCP_TIMEOUT">Operation timeout</message>
      <message code="MCP_CONFIG_INVALID">Invalid configuration</message>
    </error_messages>

    <operations>
      <category name="Memory">store, search, retrieve, list</category>
      <category name="Issues">create, update, search, sync</category>
      <category name="Docs">create, update, delete, list</category>
    </operations>

    <response_format>
      <field>success (boolean)</field>
      <field>data (object)</field>
      <field>error (string)</field>
      <field>fallback_required (boolean)</field>
    </response_format>
  </error_handling>

  <integration_routes>
    <route>StoreInMemory/SearchMemory → memory provider</route>
    <route>story/bug creation → issue provider</route>
    <route>doc generation → doc provider</route>
  </integration_routes>

  <backward_compatibility>
    <rule>File-based operations remain default</rule>
    <rule>MCP is opt-in only</rule>
    <rule>Existing projects unaffected</rule>
  </backward_compatibility>
</mcp_configuration>

## Configuration Integration Points
**Get Setting**: Load config → Return value or default
**Check Autonomy**: Get autonomy.level → Apply L1/L2/L3 behaviors
**Apply Embedded**: Merge AgentTask config with current settings
**Load Context**: Auto-loads CLAUDE.md from project root AND/OR .claude/CLAUDE.md

## Configuration Management
**JSON Files**: Runtime configuration in icc.config.json and icc.workflow.json
**Embedded**: Project-specific configuration overrides in AgentTasks
**CLAUDE.md**: Project context and behavioral documentation (NOT configuration). CLAUDE.md is for documentation, not configuration values

---
*Configuration system with hierarchy, loading, and MCP integration*
