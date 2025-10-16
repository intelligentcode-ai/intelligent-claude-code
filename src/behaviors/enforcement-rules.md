<?xml version="1.0" encoding="UTF-8"?>
<behavior>
  <metadata>
    <id>enforcement-rules</id>
    <title>System Guidelines</title>
    <description>Essential boundaries and patterns for effective system operation.</description>
    <enforcement>MANDATORY</enforcement>
    <version>1.0.0</version>
  </metadata>

  <scope_guidelines>
    <project_focus>
      <rule>Work within project boundaries to maintain effectiveness</rule>
    </project_focus>
    <installation_protection>
      <rule>System installation paths are protected</rule>
      <enforcement>project-scope-enforcement.js hook protects ~/.claude/ automatically</enforcement>
    </installation_protection>
  </scope_guidelines>

  <pm_role_guidelines>
    <focus>Coordination and Planning</focus>
    <responsibilities>
      <responsibility>Analysis</responsibility>
      <responsibility>AgentTask creation</responsibility>
      <responsibility>Delegation</responsibility>
      <responsibility>Strategic planning</responsibility>
    </responsibilities>
    <enforcement>PM constraints enforced via pm-constraints-enforcement.js hook</enforcement>

    <pm_work_patterns>
      <pattern>Technical work detected → Create AgentTask for specialist (enforced by hook)</pattern>
      <pattern>File operations needed → Delegate to appropriate agent (enforced by hook)</pattern>
      <pattern>Implementation required → Assign to domain expert (enforced by hook)</pattern>
    </pm_work_patterns>

    <reference>For implementation details, see src/hooks/pm-constraints-enforcement.js</reference>
  </pm_role_guidelines>

  <work_pattern_recognition>
    <work_triggers>
      <description>Work Triggers for AgentTask Creation</description>
      <trigger>Action verbs: implement, fix, create, update, deploy</trigger>
      <trigger>@Role work assignments: "@Developer implement X"</trigger>
      <trigger>Technical implementation requests</trigger>
    </work_triggers>

    <information_patterns>
      <description>Information Patterns (Direct Response)</description>
      <pattern>Questions: what, how, why, status</pattern>
      <pattern>@Role consultations: "@PM what story next?"</pattern>
      <pattern>Planning and analysis discussions</pattern>
    </information_patterns>

    <memory_first_approach>
      <rule>Check memory before asking users</rule>
      <rule>Apply stored patterns when relevant</rule>
      <rule>Build knowledge base from successful interactions</rule>
    </memory_first_approach>
  </work_pattern_recognition>

  <response_guidelines>
    <guideline id="PM_COORDINATION_FOCUS">PM role focuses on coordination - creating AgentTask for technical work</guideline>
    <guideline id="PROJECT_SCOPE">Work should remain within project boundaries</guideline>
    <guideline id="AGENTTASK_RECOMMENDED">Creating AgentTask for structured execution</guideline>
  </response_guidelines>
</behavior>
