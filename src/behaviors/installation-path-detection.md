<?xml version="1.0" encoding="UTF-8"?>
<behavior>
  <metadata>
    <id>installation-path-detection</id>
    <title>Installation Path Detection</title>
    <description>Detect and validate intelligent-claude-code installation paths.</description>
    <enforcement>MANDATORY</enforcement>
    <version>1.0.0</version>
  </metadata>

  <path_detection_logic>
    <installation_detection_hierarchy priority="highest-to-lowest">
      <level priority="1">
        <name>Development Context</name>
        <description>If current project IS the intelligent-claude-code repository, use project_root/</description>
      </level>
      <level priority="2">
        <name>Project Scope</name>
        <path>project_root/.claude/</path>
        <description>Project-specific installation</description>
      </level>
      <level priority="3">
        <name>Environment Variable</name>
        <variable>CLAUDE_INSTALL_PATH</variable>
      </level>
      <level priority="4">
        <name>User Global</name>
        <path>~/.claude/</path>
        <description>User-wide installation</description>
      </level>
    </installation_detection_hierarchy>
    <selection_priority>First valid path found wins</selection_priority>
  </path_detection_logic>

  <detection_process>
    <path_validation_steps>
      <step order="1">Check Development Context: If project has src/agenttask-templates/ and src/behaviors/ and VERSION file, use project_root/ (highest priority)</step>
      <step order="2">Check Project Claude: Verify project_root/.claude/ exists and valid</step>
      <step order="3">Environment Variable: Check CLAUDE_INSTALL_PATH environment variable</step>
      <step order="4">User Global: Fall back to ~/.claude/ if others unavailable</step>
      <step order="5">Validation: Confirm installation completeness at detected path</step>
      <step order="6">Cache Result: Store detected path for performance</step>
    </path_validation_steps>

    <installation_completeness_check>
      <development_context>
        <required>
          <component>src/agenttask-templates/ directory with template files</component>
          <component>src/behaviors/ directory with behavioral patterns</component>
          <component>src/config.md file with system configuration</component>
          <component>src/agents/ directory with agent definitions</component>
          <component>src/commands/ directory with command definitions</component>
        </required>
      </development_context>

      <installation_context>
        <required>
          <component>agenttask-templates/ directory with template files</component>
          <component>behaviors/ directory with behavioral patterns</component>
          <component>config.md file with system configuration</component>
          <component>agents/ directory with agent definitions</component>
          <component>commands/ directory with command definitions</component>
        </required>
      </installation_context>

      <validation_process>
        <step order="1">Context Detection: Determine if development or installation context</step>
        <step order="2">Directory Check: Verify all required directories exist for detected context</step>
        <step order="3">File Check: Confirm essential files present in correct locations</step>
        <step order="4">Content Check: Validate file formats and structure</step>
        <step order="5">Completeness Score: Calculate installation completeness percentage</step>
      </validation_process>
    </installation_completeness_check>
  </detection_process>

  <component_path_resolution>
    <template_path_resolution>
      <hierarchy>
        <path priority="1">project_root/agenttask_template_path</path>
        <path priority="2" context="development">detected_path/src/agenttask-templates/</path>
        <path priority="3" context="installation">detected_path/agenttask-templates/</path>
      </hierarchy>
      <note>Development context has HIGHEST priority to ensure templates are loaded from THIS project when working on intelligent-claude-code itself</note>
    </template_path_resolution>

    <behavior_path_resolution>
      <path context="development">detected_path/src/behaviors/</path>
      <path context="installation">detected_path/behaviors/</path>
      <description>System behaviors loaded from installation path</description>
    </behavior_path_resolution>

    <configuration_path_resolution>
      <hierarchy>
        <path priority="1">project_root/config.md</path>
        <path priority="2">project_root/.claude/config.md</path>
        <path priority="3" context="development">detected_path/src/config.md</path>
        <path priority="4" context="installation">detected_path/config.md</path>
      </hierarchy>
    </configuration_path_resolution>

    <command_path_resolution>
      <path>detected_path/src/commands/</path>
      <config_access>detected_path/src/config.md</config_access>
    </command_path_resolution>
  </component_path_resolution>

  <caching_strategy>
    <performance_optimization>
      <cache_implementation>
        <cache_key>Based on project root + environment variables</cache_key>
        <cache_duration>15 minutes (moderate stability)</cache_duration>
        <invalidation>On environment changes or installation updates</invalidation>
        <storage>In-memory cache with timestamp validation</storage>
      </cache_implementation>
      <cache_benefits>
        <benefit>Reduced filesystem operations</benefit>
        <benefit>Faster path resolution</benefit>
        <benefit>Improved system responsiveness</benefit>
      </cache_benefits>
    </performance_optimization>
  </caching_strategy>

  <error_handling>
    <missing_installation>
      <error_message>Installation not detected. Expected locations: project_root/.claude/, $CLAUDE_INSTALL_PATH, ~/.claude/</error_message>
      <recovery>Provide installation guidance</recovery>
    </missing_installation>
    <invalid_path>
      <error_message>Path resolution failed for component: path</error_message>
      <recovery>Fall back to next hierarchy level</recovery>
    </invalid_path>
    <performance_degradation>
      <impact>Performance degradation, no functional impact</impact>
      <recovery>Continue with slower path resolution</recovery>
    </performance_degradation>
  </error_handling>

  <integration_points>
    <template_loading>
      <capability>Provides installation template path for hierarchy</capability>
      <capability>Template hierarchy includes installation templates</capability>
    </template_loading>
    <configuration_system>
      <capability>Installation config provides system defaults</capability>
      <capability>Project templates from configured path</capability>
      <capability>Installation templates from detected installation path</capability>
    </configuration_system>
    <behavior_system>
      <capability>Installation behaviors loaded from detected path</capability>
    </behavior_system>
    <command_system>
      <capability>Command definitions from installation path</capability>
      <capability>Configuration access for command functionality</capability>
    </command_system>
  </integration_points>

  <migration_support>
    <legacy_path_support>
      <compatibility>Support existing ~/.claude/ installations</compatibility>
      <migration>Graceful migration path for new structure</migration>
      <transition>Continue functioning during transition period</transition>
    </legacy_path_support>
  </migration_support>

  <installation_verification>
    <health_check>
      <verification>Path detection successful</verification>
      <verification>Component completeness verified</verification>
      <verification>Cache performance optimal</verification>
      <verification>Configuration hierarchy functional</verification>
    </health_check>
  </installation_verification>
</behavior>
