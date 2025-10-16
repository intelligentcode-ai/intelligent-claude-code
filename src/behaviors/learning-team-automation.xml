<?xml version="1.0" encoding="UTF-8"?>
<behavior>
  <metadata>
    <id>learning-team-automation</id>
    <title>Learning Team Automation</title>
    <description>Use learnings and auto-correct violations.</description>
    <enforcement>MANDATORY</enforcement>
    <version>1.0.0</version>
  </metadata>

  <imports>
    <import>./shared-patterns/memory-operations.md</import>
    <import>./shared-patterns/learning-patterns.md</import>
    <import>./shared-patterns/best-practices-operations.md</import>
  </imports>

  <core_learning_process>
    <description>Active learning tracking with proactive memory generation during all operations</description>

    <learning_capture>
      <storage>Store successful AgentTask patterns in memory/[topic]/[subtopic].md</storage>
      <types>
        <type>Process improvements</type>
        <type>Knowledge transfers</type>
        <type>Issue prevention</type>
      </types>
    </learning_capture>

    <best_practices_generation>
      <trigger>3+ uses</trigger>
      <trigger>Broad applicability</trigger>
      <storage>best-practices/[category]/[practice-name].md</storage>
    </best_practices_generation>

    <proactive_triggers>
      <trigger>Information requests (check memory first)</trigger>
      <trigger>Configuration/path discoveries</trigger>
      <trigger>Problem resolution patterns</trigger>
      <trigger>Repeated questions (2+ times)</trigger>
      <trigger>Tool integration successes</trigger>
      <trigger>Workflow completions</trigger>
    </proactive_triggers>

    <security_aware_storage>
      <rule>Store location methods, not credentials</rule>
      <rule>Store processes, not values</rule>
      <rule>NEVER store actual tokens, passwords, keys</rule>
    </security_aware_storage>
  </core_learning_process>

  <agenttask_integration>
    <pattern>Memory-first generation → Automatic storage on completion → Pattern extraction</pattern>

    <automatic_storage_process>
      <step order="1">Scan execution for patterns worth capturing</step>
      <step order="2">Determine topic (work type, technology domain, problem category)</step>
      <step order="3">Extract reusable patterns (approaches, solutions, configurations)</step>
      <step order="4">Apply security validation before storage</step>
      <step order="5">Store using StoreInMemory with AgentTask context</step>
    </automatic_storage_process>

    <auto_application>
      <flow>Query intent → Memory search → Relevance scoring → Apply high-relevance memories → Store new learnings</flow>
    </auto_application>
  </agenttask_integration>
</behavior>
