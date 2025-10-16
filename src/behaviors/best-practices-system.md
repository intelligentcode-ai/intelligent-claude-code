<?xml version="1.0" encoding="UTF-8"?>
<!--
BEST PRACTICES SYSTEM
Best practices integration and operations for consistent quality standards

Consolidated from:
- shared-patterns/best-practices-integration.md
- shared-patterns/best-practices-operations.md

Version: 1.0.0
Last Updated: 2025-10-16
-->

<best_practices_system>
  <metadata>
    <purpose>Best practices search, application, generation, and integration</purpose>
    <enforcement>MANDATORY - Auto-correct violations</enforcement>
    <scope>Quality standards, pattern recognition, and practice promotion</scope>
  </metadata>

  <!-- BEST PRACTICES INTEGRATION -->
  <best_practices_integration id="BP-INTEGRATION">
    <core_function>
      <description>Integrate project-specific best practices into AgentTask execution</description>
    </core_function>

    <search_paths>
      <hierarchy>best-practices/[category]/ → CLAUDE.md paths → standard locations</hierarchy>
      <categories>
        <category>architecture</category>
        <category>development</category>
        <category>security</category>
        <category>operations</category>
        <category>quality</category>
        <category>git</category>
        <category>collaboration</category>
      </categories>
    </search_paths>

    <integration_points>
      <loading_process>
        <step>Work type analysis</step>
        <step>Directory mapping</step>
        <step>Relevance scoring</step>
        <step>Context embedding</step>
      </loading_process>

      <agenttask_enhancement>
        <enhancement>Embed relevant practices</enhancement>
        <enhancement>Validation criteria</enhancement>
      </agenttask_enhancement>

      <pattern_generation>
        <trigger>Promote successful patterns (3+ uses) to best-practices</trigger>
      </pattern_generation>
    </integration_points>
  </best_practices_integration>

  <!-- BEST PRACTICES OPERATIONS -->
  <best_practices_operations id="BP-OPERATIONS">
    <structure>
      <directory>best-practices/[category]/[practice-name].md</directory>
      <categories>
        <category>architecture</category>
        <category>collaboration</category>
        <category>development</category>
        <category>git</category>
        <category>operations</category>
        <category>quality</category>
        <category>security</category>
      </categories>
    </structure>

    <file_format>
      <field>Type</field>
      <field>Applies To (AgentTask sizes)</field>
      <field>Keywords</field>
      <field>Description</field>
      <field>Implementation</field>
      <field>Quality Gates</field>
      <field>Examples</field>
    </file_format>

    <operations>
      <search_best_practices>
        <step sequence="1">Analyze work type</step>
        <step sequence="2">Map to directories</step>
        <step sequence="3">Find .md files</step>
        <step sequence="4">Parse content</step>
        <step sequence="5">Score relevance (keyword, size, technology, context)</step>
        <step sequence="6">Select top 2-3 (max 1000 tokens)</step>
        <step sequence="7">Return for AgentTask embedding</step>
      </search_best_practices>

      <generate_best_practice>
        <step sequence="1">Analyze memory pattern for reusability</step>
        <step sequence="2">Assign category</step>
        <step sequence="3">Create file with standard format</step>
        <step sequence="4">Populate Description, Implementation, Quality Gates, Examples</step>
        <step sequence="5">Generate .md file</step>
        <step sequence="6">Validate format</step>
      </generate_best_practice>

      <work_type_mapping>
        <mapping>
          <work_types>implement, create, build</work_types>
          <categories>development, quality</categories>
        </mapping>
        <mapping>
          <work_types>fix, update, modify</work_types>
          <categories>development, quality</categories>
        </mapping>
        <mapping>
          <work_types>architecture, design</work_types>
          <categories>architecture, development</categories>
        </mapping>
        <mapping>
          <work_types>security</work_types>
          <categories>security, development</categories>
        </mapping>
        <mapping>
          <work_types>deploy, configure, setup</work_types>
          <categories>operations, collaboration</categories>
        </mapping>
        <mapping>
          <work_types>git</work_types>
          <categories>git, collaboration</categories>
        </mapping>
        <mapping>
          <work_types>test, quality</work_types>
          <categories>quality, development</categories>
        </mapping>
        <mapping>
          <work_types>team, coordination</work_types>
          <categories>collaboration, operations</categories>
        </mapping>
      </work_type_mapping>
    </operations>

    <scoring>
      <relevance_scoring>
        <score_factor points="0-10">Keyword match</score_factor>
        <score_factor points="0-10">AgentTask size match</score_factor>
        <score_factor points="0-10">Technology alignment</score_factor>
        <score_factor points="0-10">Context alignment</score_factor>
      </relevance_scoring>

      <selection_process>
        <step>Calculate total</step>
        <step>Rank</step>
        <step>Token limit (1000)</step>
        <step>Threshold (6+)</step>
        <step>Diversity across categories</step>
      </selection_process>
    </scoring>

    <agenttask_integration>
      <embedding>Embed 2-3 most relevant practices with title, implementation points, quality gates</embedding>
      <token_limit>Apply token limit (1000 max)</token_limit>
    </agenttask_integration>

    <generation_triggers>
      <promote_to_best_practice>
        <trigger>3+ uses</trigger>
        <trigger>Quality impact</trigger>
        <trigger>Reusability</trigger>
        <trigger>Broad applicability</trigger>
      </promote_to_best_practice>

      <generation_process>
        <step>Monitor memory</step>
        <step>Evaluate impact</step>
        <step>Generate practice</step>
        <step>Store in category</step>
        <step>Update index</step>
      </generation_process>
    </generation_triggers>
  </best_practices_operations>

  <!-- INTEGRATION POINTS -->
  <integration_points>
    <with_agenttask_system>
      <integration>Load relevant practices during AgentTask generation</integration>
      <integration>Embed practices in AgentTask context</integration>
      <integration>Apply quality gates during execution</integration>
    </with_agenttask_system>

    <with_memory_system>
      <integration>Promote memory patterns to best practices</integration>
      <integration>Track pattern usage frequency</integration>
      <integration>Cross-reference memory and practices</integration>
    </with_memory_system>

    <with_learning_system>
      <integration>Capture successful patterns from execution</integration>
      <integration>Analyze pattern reusability</integration>
      <integration>Generate practices from proven patterns</integration>
    </with_learning_system>
  </integration_points>

  <!-- QUALITY STANDARDS -->
  <quality_standards>
    <practice_quality>
      <standard>Clear, actionable implementation guidance</standard>
      <standard>Measurable quality gates</standard>
      <standard>Concrete examples</standard>
      <standard>Technology-specific when applicable</standard>
      <standard>Size-appropriate (matches AgentTask complexity)</standard>
    </practice_quality>

    <selection_quality>
      <standard>High relevance scores (6+ threshold)</standard>
      <standard>Diverse category coverage</standard>
      <standard>Token budget compliance (1000 max)</standard>
      <standard>Context-appropriate selection</standard>
    </selection_quality>

    <generation_quality>
      <standard>Proven reusability (3+ uses)</standard>
      <standard>Demonstrable quality impact</standard>
      <standard>Broad applicability</standard>
      <standard>Standard format compliance</standard>
    </generation_quality>
  </quality_standards>
</best_practices_system>
