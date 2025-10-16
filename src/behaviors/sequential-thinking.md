<?xml version="1.0" encoding="UTF-8"?>
<behavior>
  <metadata>
    <id>sequential-thinking</id>
    <title>Sequential Thinking Behavior</title>
    <description>Structured analytical thinking for complex problems. Auto-correct violations.</description>
    <enforcement>MANDATORY</enforcement>
    <version>1.0.0</version>
  </metadata>

  <imports>
    <import>./shared-patterns/behavioral-decision-matrix.md</import>
    <import>./shared-patterns/context-validation.md</import>
    <import>./shared-patterns/memory-operations.md</import>
  </imports>

  <purpose>
    <description>Structured analytical frameworks for problem decomposition, multi-factor analysis, and systematic reasoning</description>
  </purpose>

  <triggers>
    <apply_liberally>
      <context>Multi-step reasoning</context>
      <context>Request analysis</context>
      <context>Story breakdown (&gt;10 points)</context>
      <context>Bug investigation</context>
      <context>AgentTask planning</context>
      <context>Architecture evaluation</context>
      <context>Risk assessment</context>
      <context>Integration analysis</context>
    </apply_liberally>
  </triggers>

  <mcp_integration>
    <tool>mcp__sequential-thinking__sequentialthinking</tool>
    <project_context mandatory="true">
      <requirement>Systematic reasoning with project scope</requirement>
      <requirement>Multi-factor analysis within AI-AGENTIC system context</requirement>
      <requirement>Risk assessment for behavioral patterns</requirement>
      <requirement>Solution comparison with project constraints</requirement>
      <requirement>ALWAYS include system nature, project root, work boundaries</requirement>
    </project_context>
  </mcp_integration>

  <framework_patterns>
    <problem_analysis steps="6">
      <step order="1">Problem definition</step>
      <step order="2">Context analysis</step>
      <step order="3">Factor identification</step>
      <step order="4">Impact assessment</step>
      <step order="5">Decision framework</step>
      <step order="6">Implementation planning</step>
    </problem_analysis>

    <story_breakdown threshold="10 points">
      <step order="1">Requirements analysis</step>
      <step order="2">Dependency mapping</step>
      <step order="3">Complexity assessment</step>
      <step order="4">Logical grouping</step>
      <step order="5">Sequential ordering</step>
      <step order="6">AgentTask generation</step>
    </story_breakdown>

    <bug_investigation>
      <step order="1">Symptom documentation</step>
      <step order="2">Context gathering</step>
      <step order="3">Root cause analysis</step>
      <step order="4">Impact assessment</step>
      <step order="5">Solution evaluation</step>
      <step order="6">Implementation planning</step>
    </bug_investigation>
  </framework_patterns>

  <integration>
    <system id="agenttask-creation">
      <component>Context assembly</component>
      <component>Complexity calculation</component>
      <component>Template selection</component>
      <component>Placeholder resolution</component>
      <component>Validation</component>
    </system>
    <system id="memory">
      <storage>Store successful frameworks</storage>
      <storage>Decision records</storage>
      <storage>Improved approaches</storage>
      <storage>Recurring patterns</storage>
    </system>
    <system id="role-system">
      <usage>PM analysis</usage>
      <usage>Architect decisions</usage>
      <usage>Specialist assessment</usage>
      <usage>Risk evaluation</usage>
    </system>
  </integration>

  <activation_rules>
    <automatic>
      <trigger>Multi-step reasoning</trigger>
      <trigger>User request analysis</trigger>
      <trigger>All AgentTask creation</trigger>
      <trigger>Complex stories</trigger>
      <trigger>Bug investigation</trigger>
      <trigger>Architecture decisions</trigger>
      <trigger>Risk assessments</trigger>
    </automatic>
    <analysis_depth>
      <simple steps="3">Simple problems</simple>
      <medium steps="6">Medium complexity</medium>
      <complex>Full MCP integration</complex>
    </analysis_depth>
  </activation_rules>
</behavior>
