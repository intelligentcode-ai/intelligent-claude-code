<?xml version="1.0" encoding="UTF-8"?>
<behavior>
  <metadata>
    <id>adaptation-system</id>
    <title>Adaptation System</title>
    <description>Dynamic AgentTask adaptation and seamless agent restart. Auto-correct violations.</description>
    <enforcement>MANDATORY</enforcement>
    <version>1.0.0</version>
  </metadata>

  <imports>
    <import>./shared-patterns/learning-patterns.md</import>
    <import>./shared-patterns/best-practices-integration.md</import>
    <import>./shared-patterns/context-validation.md</import>
  </imports>

  <core_principles>
    <principle>Real-time AgentTask context modification when corrections provided</principle>
    <principle>Maintain template compliance during updates</principle>
    <principle>Seamless agent restart with updated context, no manual intervention</principle>
  </core_principles>

  <triggers>
    <user_corrections>
      <pattern>Actually...</pattern>
      <pattern>I meant...</pattern>
      <pattern>The correct approach is...</pattern>
      <pattern>Change to...</pattern>
      <pattern>Use [X] instead...</pattern>
    </user_corrections>
    <new_information>
      <type>Additional requirements</type>
      <type>Technical constraints</type>
      <type>Resource changes</type>
      <type>Timeline adjustments</type>
      <type>Scope modifications</type>
    </new_information>
    <error_recovery>
      <type>Technical failures</type>
      <type>Resource access problems</type>
      <type>Integration complications</type>
      <type>Quality violations</type>
    </error_recovery>
  </triggers>

  <adaptation_process>
    <detection_and_analysis>
      <step order="1">Identify correction/update signals</step>
      <step order="2">Assess impact on current AgentTask</step>
      <step order="3">Determine extent of required changes</step>
      <step order="4">Validate changes maintain AgentTask integrity</step>
    </detection_and_analysis>

    <context_update>
      <step order="1">Preserve template structure</step>
      <step order="2">Modify affected context areas</step>
      <step order="3">Ensure no conflicts introduced</step>
      <step order="4">Record adaptation rationale</step>
    </context_update>

    <agent_transition>
      <step order="1">Package updated AgentTask context</step>
      <step order="2">Seamless restart with updated context</step>
      <step order="3">Maintain relevant progress</step>
      <step order="4">Resume work automatically</step>
    </agent_transition>
  </adaptation_process>

  <integration>
    <system id="agenttask">
      <capability>Maintain template structure</capability>
      <capability>Preserve complexity scoring</capability>
      <capability>Support breakdown when scope expands</capability>
    </system>
    <system id="role-system">
      <capability>Role reassignment</capability>
      <capability>Specialist creation</capability>
      <capability>Architect consultation for major changes</capability>
    </system>
    <system id="memory">
      <capability>Store successful patterns</capability>
      <capability>Learn from corrections</capability>
      <capability>Apply proven transition strategies</capability>
    </system>
  </integration>
</behavior>
