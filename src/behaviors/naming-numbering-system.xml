<?xml version="1.0" encoding="UTF-8"?>
<behavior>
  <metadata>
    <id>naming-numbering-system</id>
    <title>Naming &amp; Numbering System</title>
    <description>Consistent naming format and sequential numbering. Auto-correct violations.</description>
    <enforcement>MANDATORY</enforcement>
    <version>1.0.0</version>
  </metadata>

  <imports>
    <import>./shared-patterns/enforcement-rules.md</import>
  </imports>

  <format_rules>
    <standard>&lt;CATEGORY&gt;-&lt;NUMBER&gt;-&lt;TITLE&gt;-&lt;DATE&gt;.md</standard>
    <categories case="sensitive">
      <category>EPIC</category>
      <category>STORY</category>
      <category>BUG</category>
    </categories>
    <numbers format="zero-padded">
      <example>001</example>
      <example>002</example>
      <example>003</example>
      <description>Sequential within category</description>
    </numbers>
    <titles format="lowercase, hyphen-separated">
      <description>Descriptive title with hyphens</description>
    </titles>
    <dates format="YYYY-MM-DD">
      <command>$(date +%Y-%m-%d)</command>
    </dates>
    <examples>
      <example>EPIC-001-virtual-team-enhancement-2025-08-26.md</example>
      <example>STORY-001-user-authentication-2025-08-26.md</example>
    </examples>
  </format_rules>

  <sequential_numbering>
    <sequences>EPIC/STORY/BUG global sequence across project</sequences>
    <directory_scanning>
      <scan>EPIC/STORY in stories/</scan>
      <scan>BUG in bugs/</scan>
    </directory_scanning>
  </sequential_numbering>

  <number_generation>
    <step order="1">Scan directories for pattern matches</step>
    <step order="2">Extract highest number using regex</step>
    <step order="3">Add 1, apply zero-padding (001 format)</step>
    <step order="4">Verify generated number doesn't exist</step>
  </number_generation>

  <validation>
    <pre_creation_checks>
      <check>Category in allowed list</check>
      <check>Number format (zero-padded)</check>
      <check>Title format (lowercase, hyphens)</check>
      <check>Date format (YYYY-MM-DD)</check>
    </pre_creation_checks>
    <auto_correction>
      <correction>Category case (story → STORY)</correction>
      <correction>Number padding (1 → 001)</correction>
      <correction>Title formatting (spaces → hyphens, lowercase)</correction>
      <correction>Date generation</correction>
    </auto_correction>
  </validation>

  <integration>
    <rule>Respect configured paths (story_path, bug_path)</rule>
    <rule>Generate compliant names before file creation</rule>
    <rule>Ensure uniqueness</rule>
    <rule>Apply consistent formatting</rule>
  </integration>
</behavior>
