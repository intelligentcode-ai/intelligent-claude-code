<!--
Configuration System Behaviors
Consolidated from: config-loader.md, configuration-patterns.md, mcp-configuration-patterns.md
Purpose: Configuration hierarchy, loading, and MCP integration patterns
-->

<config_system id="CONFIG-SYSTEM" enforcement="mandatory">

  <!-- Configuration Hierarchy -->
  <hierarchy id="CONFIG-HIERARCHY">
    <priority_order>
      <level priority="1">Embedded config (in AgentTasks)</level>
      <level priority="2">Project config (./icc.config.json or ./.claude/icc.config.json)</level>
      <level priority="3">Installation global (installation_path/icc.config.json - installation-wide only)</level>
      <level priority="4">System defaults (icc.config.default.json, icc.workflow.default.json)</level>
    </priority_order>

    <cache>
      <ttl>5 minutes</ttl>
      <validation>Check cache validity before loading</validation>
    </cache>
  </hierarchy>

  <!-- Configuration Files -->
  <config_files id="CONFIG-FILES">
    <primary file="icc.config.json">
      <description>Runtime and behavioral settings</description>
      <categories>
        <category>Git settings</category>
        <category>Autonomy settings</category>
        <category>Team settings</category>
        <category>AgentTask settings</category>
      </categories>
    </primary>

    <workflow file="icc.workflow.json">
      <description>AgentTask size-specific workflow requirements</description>
      <tiers>nano, tiny, medium, large, mega</tiers>
    </workflow>

    <context file="CLAUDE.md">
      <description>Project documentation and behavioral context (NOT configuration)</description>
      <location>Project root and/or .claude/CLAUDE.md</location>
    </context>
  </config_files>

  <!-- Loading Process -->
  <loading_process id="CONFIG-LOADING">
    <step order="1">Check cache validity (5 min TTL)</step>
    <step order="2">Load system defaults (icc.config.default.json, icc.workflow.default.json)</step>
    <step order="3">Merge installation global (installation_path/icc.config.json)</step>
    <step order="4">Merge project config (./.claude/icc.config.json or ./icc.config.json)</step>
    <step order="5">Apply embedded overrides (from AgentTasks)</step>
    <step order="6">Return merged settings</step>
  </loading_process>

  <!-- Settings Structure -->
  <settings_structure id="CONFIG-SETTINGS">

    <!-- Git Settings -->
    <git_settings namespace="git.*">
      <setting key="git.privacy" type="boolean">
        <description>AI mention stripping (enforced by git-privacy-enforcement.js hook)</description>
        <enforcement>Automatic via hook - no manual action required</enforcement>
      </setting>
      <setting key="git.privacy_patterns" type="array">
        <description>Patterns to filter from commit messages</description>
      </setting>
      <setting key="git.branch_protection" type="boolean">
        <description>Enable main branch protection</description>
      </setting>
      <setting key="git.default_branch" type="string">
        <description>Default branch name (main/master/develop)</description>
      </setting>
      <setting key="git.require_pr_for_main" type="boolean">
        <description>Require pull requests for main branch changes</description>
      </setting>
    </git_settings>

    <!-- Autonomy Settings -->
    <autonomy_settings namespace="autonomy.*">
      <setting key="autonomy.level" type="enum">
        <values>L1, L2, L3</values>
        <description>Autonomy level (L1=Manual, L2=Guided, L3=Autonomous)</description>
      </setting>
      <setting key="autonomy.pm_always_active" type="boolean">
        <description>Always activate PM role</description>
      </setting>
      <setting key="autonomy.blocking_enabled" type="boolean">
        <description>Enable enforcement blocking</description>
      </setting>
      <setting key="autonomy.l3_settings.*" type="object">
        <description>L3-specific configuration</description>
      </setting>
    </autonomy_settings>

    <!-- Team Settings -->
    <team_settings namespace="team.*">
      <setting key="team.default_reviewer" type="string">
        <description>Default reviewer @Role</description>
      </setting>
      <setting key="team.specialist_creation" type="boolean">
        <description>Allow dynamic specialist creation</description>
      </setting>
      <setting key="team.role_validation" type="boolean">
        <description>Validate role assignments</description>
      </setting>
    </team_settings>

    <!-- AgentTask Settings -->
    <agenttask_settings namespace="agenttask.*">
      <setting key="agenttask.template_path" type="string">
        <description>Template directory path</description>
        <default>agenttask-templates</default>
      </setting>
      <setting key="agenttask.template_validation" type="boolean">
        <description>Enable template validation</description>
      </setting>
      <setting key="agenttask.complexity_override" type="boolean">
        <description>Allow complexity calculation override</description>
      </setting>
    </agenttask_settings>

  </settings_structure>

  <!-- System Defaults -->
  <system_defaults id="CONFIG-DEFAULTS">
    <professional_standards>
      <description>Defined in icc.config.default.json and icc.workflow.default.json</description>

      <git_defaults>
        <standard key="git.privacy" value="true">Enable AI mention stripping (MANDATORY)</standard>
        <standard key="git.privacy_patterns">["AI", "Claude", "agent", "Generated with Claude Code", "Co-Authored-By: Claude"]</standard>
        <standard key="git.branch_protection" value="true">Enable main branch protection</standard>
        <standard key="git.require_pr_for_main" value="true">Require PRs for main branch</standard>
      </git_defaults>

      <autonomy_defaults>
        <standard key="autonomy.level" value="L2">Balanced control and efficiency</standard>
        <standard key="autonomy.pm_always_active" value="true">Always activate PM role</standard>
        <standard key="autonomy.blocking_enabled" value="true">Enable enforcement blocking</standard>
      </autonomy_defaults>

      <team_defaults>
        <standard key="team.specialist_creation" value="true">Allow dynamic specialists</standard>
        <standard key="team.role_validation" value="true">Validate role assignments</standard>
      </team_defaults>

      <workflow_defaults>
        <note>See icc.workflow.default.json for complete nano/tiny/medium/large/mega settings</note>
        <categories>Version bumping, changelog, PR, merge requirements per AgentTask size</categories>
      </workflow_defaults>
    </professional_standards>
  </system_defaults>

  <!-- Settings Access -->
  <settings_access id="CONFIG-ACCESS">
    <command name="icc-get-setting">
      <usage>icc-get-setting [key]</usage>
      <notation>Dot notation (e.g., autonomy.level, git.privacy)</notation>
      <examples>
        <example>icc-get-setting autonomy.level → Returns: "L3"</example>
        <example>icc-get-setting git.privacy → Returns: false</example>
        <example>icc-get-setting workflow.tiny.version_bump → Returns: true</example>
      </examples>
    </command>

    <documentation>
      <reference>docs/configuration-guide.md</reference>
      <content>Complete setting paths and descriptions</content>
    </documentation>
  </settings_access>

  <!-- MCP Configuration Patterns -->
  <mcp_integration id="MCP-CONFIG">

    <configuration_schema>
      <example>
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
      </example>
    </configuration_schema>

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

  </mcp_integration>

  <!-- Configuration Integration Points -->
  <integration id="CONFIG-INTEGRATION">
    <get_setting>
      <flow>Load config → Return value or default</flow>
    </get_setting>

    <check_autonomy>
      <flow>Get autonomy.level → Apply L1/L2/L3 behaviors</flow>
    </check_autonomy>

    <apply_embedded>
      <flow>Merge AgentTask config with current settings</flow>
    </apply_embedded>

    <load_context>
      <flow>Auto-loads CLAUDE.md from project root AND/OR .claude/CLAUDE.md</flow>
    </load_context>
  </integration>

  <!-- Configuration Management -->
  <management id="CONFIG-MANAGEMENT">
    <json_files>
      <purpose>Runtime configuration in icc.config.json and icc.workflow.json</purpose>
    </json_files>

    <embedded>
      <purpose>Project-specific configuration overrides in AgentTasks</purpose>
    </embedded>

    <claude_md>
      <purpose>Project context and behavioral documentation (NOT configuration)</purpose>
      <note>CLAUDE.md is for documentation, not configuration values</note>
    </claude_md>
  </management>

</config_system>
