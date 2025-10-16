<?xml version="1.0" encoding="UTF-8"?>
<behavior>
  <metadata>
    <id>role-system</id>
    <title>Role System</title>
    <description>Role management with assignment matrix and dynamic specialists. Auto-correct violations.</description>
    <enforcement>MANDATORY</enforcement>
    <version>1.0.0</version>
  </metadata>

  <imports>
    <import>./shared-patterns/enforcement-rules.md</import>
    <import>./shared-patterns/behavioral-decision-matrix.md</import>
    <import>./shared-patterns/autonomy-patterns.md</import>
    <import>./shared-patterns/l3-autonomous-behavior.md</import>
  </imports>

  <core_framework>
    <core_roles count="14">
      <description>@PM, @Architect, @Developer, @System-Engineer, @DevOps-Engineer, @Database-Engineer, @Security-Engineer, @AI-Engineer, @Web-Designer, @QA-Engineer, @Backend-Tester, @Requirements-Engineer, @User-Role</description>
    </core_roles>

    <dynamic_specialists>
      <rule>Create specialists for ANY technology domain when expertise needed</rule>
      <naming_pattern>@[Domain]-[RoleType] (e.g., @React-Developer, @AWS-Engineer)</naming_pattern>
      <creation_trigger>Always create when PM + Architect determine technology expertise required</creation_trigger>
    </dynamic_specialists>
  </core_framework>

  <role_assignment>
    <two_factor_analysis mandatory="true">
      <factor id="1">
        <options>
          <option>AI-AGENTIC (behavioral patterns)</option>
          <option>CODE (implementation)</option>
          <option>HYBRID (both)</option>
        </options>
      </factor>
      <factor id="2">
        <options>
          <option>Implementation</option>
          <option>Infrastructure</option>
          <option>Security</option>
          <option>Database</option>
          <option>AI/Behavioral</option>
        </options>
      </factor>
    </two_factor_analysis>

    <assignment_process>
      <step order="1">PM analyzes requirements, identifies technology domains</step>
      <step order="2">Create domain-specific architect (@React-Architect, @Security-Architect)</step>
      <step order="3">PM + Specialist Architect collaborate</step>
      <step order="4">Apply two-factor matrix with documented rationale</step>
      <step order="5">Generate dynamic specialists as needed</step>
    </assignment_process>
  </role_assignment>

  <role_behaviors>
    <autonomy_aware_activation>
      <pm_role>
        <pattern>Checks autonomy_level from config → Applies L1/L2/L3 patterns</pattern>
      </pm_role>
      <l3_autonomous>
        <pattern>Work detection → AgentTask creation → Auto-execution</pattern>
      </l3_autonomous>
      <l2_guided>
        <pattern>Architect collaboration → Approval workflows → Execution</pattern>
      </l2_guided>
      <l1_manual>
        <pattern>Request approval → Wait for confirmation → Execute</pattern>
      </l1_manual>
    </autonomy_aware_activation>

    <pm_role_behaviors>
      <constraint>PM role = coordination only. All technical work delegated to specialists.</constraint>
      <enforcement>pm-constraints-enforcement.js hook enforces allowlist/blocklist automatically</enforcement>
      <reference>For detailed PM constraints, see hook implementation and virtual-team.md XML</reference>
    </pm_role_behaviors>

    <standard_role_behavior>
      <trigger>When @Role mentioned for work</trigger>
      <actions>
        <action>Adopt role patterns</action>
        <action>Apply domain expertise</action>
        <action>Follow quality requirements</action>
        <action>Use appropriate tools</action>
      </actions>
    </standard_role_behavior>
  </role_behaviors>

  <specialist_creation_guidance id="SPECIALIST-SELECTION">
    <technology_analysis mandatory="true">
      <detect_context>
        <signal>package.json → Node.js/JavaScript ecosystem</signal>
        <signal>requirements.txt → Python ecosystem</signal>
        <signal>*.jsx/*.tsx → React framework</signal>
        <signal>terraform/*.tf → Infrastructure as Code</signal>
        <signal>Dockerfile → Container technology</signal>
        <signal>kubernetes/*.yaml → Kubernetes orchestration</signal>
      </detect_context>

      <create_specialist>
        <pattern>Node.js work → @Node-Developer (NOT @Developer)</pattern>
        <pattern>React UI → @React-Frontend-Developer (NOT @Developer)</pattern>
        <pattern>AWS infra → @AWS-Infrastructure-Engineer (NOT @System-Engineer)</pattern>
        <pattern>Database work → @Database-Engineer (NOT @Developer)</pattern>
        <pattern>Python ML → @Python-ML-Engineer (NOT @Developer)</pattern>
        <pattern>Kubernetes ops → @K8s-DevOps-Engineer (NOT @DevOps-Engineer)</pattern>
      </create_specialist>

      <rationale>
        <benefit>10+ years domain expertise in technology</benefit>
        <benefit>Context-aware implementation patterns</benefit>
        <benefit>Technology-specific best practices</benefit>
        <benefit>Reduced learning curve and errors</benefit>
      </rationale>
    </technology_analysis>

    <hook_integration>
      <mechanical_check>agent-marker.js detects generic @Developer usage</mechanical_check>
      <behavioral_guide>This pattern guides technology detection and specialist creation rationale</behavioral_guide>
      <limitation>Hook suggests specialists, behavioral pattern guides selection reasoning</limitation>
    </hook_integration>
  </specialist_creation_guidance>
</behavior>
