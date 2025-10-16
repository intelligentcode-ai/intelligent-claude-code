<?xml version="1.0" encoding="UTF-8"?>
<behavior>
  <metadata>
    <id>directory-structure</id>
    <title>Directory Structure Behavior</title>
    <description>Configurable directory structure. Auto-create missing directories.</description>
    <enforcement>MANDATORY</enforcement>
    <version>1.0.0</version>
  </metadata>

  <imports>
    <import>./shared-patterns/configuration-patterns.md</import>
  </imports>

  <default_structure>
    <description>Project Root directory structure with configurable paths</description>
    <directories>
      <directory path="stories/" config_key="story_path">
        <subdirectory path="drafts/">Draft stories</subdirectory>
      </directory>
      <directory path="bugs/" config_key="bug_path">
        <subdirectory path="open/">Open bugs</subdirectory>
        <subdirectory path="completed/">Completed bugs</subdirectory>
      </directory>
      <directory path="memory/" config_key="memory_path">Memory topics</directory>
      <directory path="docs/" config_key="docs_path">Documentation</directory>
      <directory path="src/" config_key="src_path">Source code</directory>
      <directory path="tests/" config_key="test_path">Test files</directory>
      <directory path="config/" config_key="config_path">Configuration</directory>
    </directories>
  </default_structure>

  <configuration_override>
    <rule>All paths configurable via config settings</rule>
    <settings>
      <setting>story_path</setting>
      <setting>bug_path</setting>
      <setting>memory_path</setting>
      <setting>docs_path</setting>
      <setting>src_path</setting>
      <setting>test_path</setting>
      <setting>config_path</setting>
    </settings>
  </configuration_override>

  <behavioral_rules>
    <rule>Missing directories created automatically</rule>
    <rule>Preserves existing content</rule>
    <rule>All paths relative to project root</rule>
  </behavioral_rules>

  <path_resolution>
    <step order="1">Check configuration for custom paths</step>
    <step order="2">Use defaults if not configured</step>
    <step order="3">Create if missing</step>
  </path_resolution>

  <integration>
    <system id="story-breakdown">
      <rule>Stories from story_path</rule>
      <rule>Drafts from story_path/drafts</rule>
    </system>
    <system id="bug-lifecycle">
      <rule>Open bugs in bug_path/open</rule>
      <rule>Completed in bug_path/completed</rule>
    </system>
    <system id="memory-system">
      <rule>Topics stored in memory_path/[topic]/</rule>
    </system>
  </integration>
</behavior>
