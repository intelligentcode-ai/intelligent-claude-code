<?xml version="1.0" encoding="UTF-8"?>
<behavior>
  <metadata>
    <id>story-breakdown</id>
    <title>Story Breakdown Behavior</title>
    <description>@PM breaks down stories with architect collaboration. Auto-correct violations.</description>
    <enforcement>MANDATORY</enforcement>
    <version>1.0.0</version>
  </metadata>

  <imports>
    <import>./shared-patterns/template-loading.md</import>
    <import>./shared-patterns/context-validation.md</import>
    <import>./shared-patterns/behavioral-decision-matrix.md</import>
    <import>./shared-patterns/autonomy-patterns.md</import>
    <import>./shared-patterns/l3-autonomous-behavior.md</import>
  </imports>

  <pm_role_rules>
    <constraint>PM role = coordination only (stories/, bugs/, memory/, docs/, root *.md files)</constraint>
    <pattern>Technical work → Create AgentTask → Delegate to specialist</pattern>
    <pattern>Issue found → Document → AgentTask → Assign specialist</pattern>
  </pm_role_rules>

  <breakdown_flow>
    <autonomy_aware_execution>
      <l3_mode>Auto-select story → Auto-collaborate → Auto-create → Auto-execute</l3_mode>
      <l2_mode>Architect approval → Create → Execute with oversight</l2_mode>
      <l1_mode>Request approval at each step</l1_mode>
    </autonomy_aware_execution>

    <standard_breakdown_process>
      <step order="1">@PM reads story → Analyzes scope (AI-AGENTIC/CODE/HYBRID) + work type</step>
      <step order="2">Selects specialist architect → Two-factor analysis (scope + work type)</step>
      <step order="3">@PM + Architect collaborate → Role assignment with rationale</step>
      <step order="4">Creates AgentTasks → ≤5 points direct, ≥6 points story first</step>
      <step order="5">Story selection → L3: auto-select priority | L2: suggest with architect | L1: ask user</step>
    </standard_breakdown_process>
  </breakdown_flow>

  <two_factor_analysis>
    <scope>
      <type id="ai-agentic">Behavioral patterns</type>
      <type id="code">Implementation</type>
      <type id="hybrid">Both behavioral and implementation</type>
    </scope>
    <work_type>
      <type>infra</type>
      <type>security</type>
      <type>database</type>
      <type>implementation</type>
      <type>AI</type>
      <type>architecture</type>
    </work_type>
    <specialists>Always create domain architects (@React-Architect, @Database-Architect)</specialists>
  </two_factor_analysis>

  <work_complexity>
    <tier points="0-5">
      <name>Direct AgentTask</name>
      <template>nano/tiny template</template>
      <execution>Task tool execution</execution>
    </tier>
    <tier points="6+">
      <name>Story file</name>
      <breakdown>Breakdown into nano/tiny AgentTasks ≤5 points</breakdown>
      <storage>In-memory AgentTasks for breakdown (not files)</storage>
      <execution>Sequential execution via Task tool with full context</execution>
    </tier>
  </work_complexity>

  <tool_access>
    <pm_access>
      <allowed>
        <path>stories/</path>
        <path>bugs/</path>
        <path>memory/</path>
        <path>docs/</path>
        <path>agenttasks/</path>
        <path>summaries/</path>
        <path>root *.md</path>
        <path>icc.config.json</path>
        <path>icc.workflow.json</path>
      </allowed>
    </pm_access>
    <enforcement>pm-constraints-enforcement.js hook enforces automatically</enforcement>
    <violations>Tool blocked → Create AgentTask → Delegate to specialist</violations>
  </tool_access>
</behavior>
