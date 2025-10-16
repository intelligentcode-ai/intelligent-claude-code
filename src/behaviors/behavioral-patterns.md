<?xml version="1.0" encoding="UTF-8"?>
<!--
BEHAVIORAL PATTERNS
Decision rules and autonomy patterns for consistent system behavior

Consolidated from:
- shared-patterns/behavioral-decision-matrix.md
- shared-patterns/autonomy-patterns.md
- shared-patterns/l3-autonomous-behavior.md
- shared-patterns/work-detection-patterns.md

Version: 1.0.0
Last Updated: 2025-10-16
-->

<behavioral_patterns>
  <metadata>
    <purpose>Decision rules, autonomy patterns, and work detection for consistent behavior</purpose>
    <enforcement>MANDATORY - Auto-correct violations</enforcement>
    <scope>Work detection, decision making, and autonomy-aware execution</scope>
  </metadata>

  <!-- BEHAVIORAL DECISION MATRIX -->
  <behavioral_decision_matrix id="DECISION-MATRIX">
    <decision_tree>
      <decision priority="1">Work Intent → AgentTask + Agent</decision>
      <decision priority="2">@Role + Work → AgentTask + Task Tool</decision>
      <decision priority="3">Information Only → Direct Response</decision>
      <decision priority="4">PM Role → Coordination Only</decision>
    </decision_tree>

    <pattern_recognition>
      <work_triggers>
        <trigger>Action verbs: implement, fix, create, deploy</trigger>
        <trigger>@Role work: "@Developer implement X"</trigger>
        <trigger>Continuation: testing after implementation</trigger>
      </work_triggers>

      <information_patterns>
        <pattern>Questions: what, how, why, status</pattern>
        <pattern>@Role consultation: "@PM what story next?"</pattern>
      </information_patterns>

      <context_evaluation>
        <simple>Single question, surface-level</simple>
        <complex>Multi-component, system-wide impact</complex>
      </context_evaluation>
    </pattern_recognition>

    <decision_flow>
      <step sequence="1">Check autonomy_level from config</step>
      <step sequence="2">Check if work intent present</step>
      <step sequence="3">Check if @Role assignment with work</step>
      <step sequence="4">Evaluate context complexity</step>
      <step sequence="5">Apply autonomy-aware response pattern</step>
    </decision_flow>

    <autonomy_integration>
      <l3_autonomous>Work detected → Execute immediately (no approval)</l3_autonomous>
      <l2_guided>Work detected → Architect review → Execute</l2_guided>
      <l1_manual>Work detected → Request approval → Wait → Execute</l1_manual>
    </autonomy_integration>
  </behavioral_decision_matrix>

  <!-- AUTONOMY PATTERNS -->
  <autonomy_patterns id="AUTONOMY-PATTERNS">
    <autonomy_levels>
      <level name="L1" mode="manual">
        <behavior>ALL actions need approval</behavior>
        <behavior>Full transparency</behavior>
        <use_case>Sensitive ops, debugging</use_case>
      </level>

      <level name="L2" mode="guided" default="true">
        <behavior>Technical decisions need architect approval</behavior>
        <behavior>Routine tasks auto-proceed</behavior>
        <use_case>Balance control/efficiency</use_case>
      </level>

      <level name="L3" mode="autonomous">
        <behavior>Full auto execution</behavior>
        <behavior>Continuous work discovery</behavior>
        <behavior>Stop only for critical issues</behavior>
      </level>
    </autonomy_levels>

    <l3_continuous_mode>
      <continuous_work_pattern>
        <step>Discover Tasks: Find PLANNED/IN_PROGRESS tasks, uncommitted changes, memory improvement opportunities</step>
        <step>Generate AgentTask: Create appropriate AgentTask for discovered work</step>
        <step>Execute Work: Complete the work using AgentTask framework</step>
        <step>Learn from Results: Capture learnings and patterns</step>
        <step>Continue to Next: Repeat cycle with next available work</step>
      </continuous_work_pattern>

      <auto_discover>
        <discovery>PLANNED/IN_PROGRESS tasks</discovery>
        <discovery>Uncommitted changes</discovery>
        <discovery>Memory improvement opportunities</discovery>
      </auto_discover>

      <still_needs_approval>
        <operation>Destructive ops (delete/drop)</operation>
        <operation>Credentials/secrets</operation>
        <operation>Production deploys</operation>
        <operation>Billing changes</operation>
      </still_needs_approval>
    </l3_continuous_mode>

    <configuration>
      <config_example>
        <json>
{
  "autonomy": {
    "level": "L3",
    "l3_settings": {
      "max_parallel": 5,
      "auto_discover": true,
      "continue_on_error": true
    }
  }
}
        </json>
      </config_example>

      <continue_on_error_clarification>
        <critical>continue_on_error applies to ICC PRINCIPLE VIOLATIONS, not deployment/production errors</critical>
        <controls>
          <control>PM behavioral compliance violations (attempting direct technical work, skipping memory search, etc.)</control>
          <control>NOT deployment failures, infrastructure errors, or production issues</control>
        </controls>
        <settings>
          <setting value="true" default="true">PM continues L3 work discovery after ICC violations, self-corrects and continues</setting>
          <setting value="false">PM stops L3 work discovery on ICC violations, requires manual intervention</setting>
        </settings>
        <use_cases>
          <use_case value="true">Learning environments, exploratory work, flexible projects</use_case>
          <use_case value="false">Production environments, strict governance, critical systems</use_case>
        </use_cases>
        <examples>
          <example>PM tries direct file edit (ICC violation) → true: logs, creates AgentTask, continues | false: stops, waits for correction</example>
          <example>Deployment fails (NOT ICC violation) → true/false: same behavior, agent handles deployment errors</example>
        </examples>
      </continue_on_error_clarification>
    </configuration>

    <integration>
      <agenttasks>L1=approval before, L2=architect review, L3=auto</agenttasks>
      <memory>L1=confirm storage, L2=oversight, L3=auto</memory>
      <git>L1=each command, L2=commits auto, L3=full auto</git>
    </integration>
  </autonomy_patterns>

  <!-- L3 AUTONOMOUS BEHAVIOR -->
  <l3_autonomous_behavior id="L3-AUTONOMOUS">
    <l3_decision_matrix>
      <execute_immediately>
        <operation>Create AgentTasks for detected work</operation>
        <operation>Assign specialists to AgentTasks</operation>
        <operation>Execute standard technical operations</operation>
        <operation>Store learnings in memory</operation>
        <operation>Search memory before questions</operation>
        <operation>Apply discovered patterns</operation>
        <operation>Fix detected issues</operation>
        <operation>Update documentation</operation>
        <operation>Version management</operation>
        <operation>Git operations (commit, push, PR, merge)</operation>
      </execute_immediately>

      <request_approval>
        <operation>Delete operations (file/directory deletion)</operation>
        <operation>Drop operations (database, table drops)</operation>
        <operation>Production deployments</operation>
        <operation>Billing/cost-affecting changes</operation>
        <operation>Credential/secret management</operation>
        <operation>Force operations (git push --force)</operation>
        <operation>Breaking changes to APIs</operation>
      </request_approval>
    </l3_decision_matrix>

    <behavioral_patterns>
      <work_detection mode="L3">
        <pattern>Detect work → Create AgentTask → Execute immediately</pattern>
        <wrong_l2>I found work that needs doing. Should I create an AgentTask?</wrong_l2>
        <correct_l3>Detected work. Creating AgentTask and executing now.</correct_l3>
      </work_detection>

      <technical_decisions mode="L3">
        <pattern>Analyze → Decide → Execute</pattern>
        <wrong_l2>Which approach should I use? Option 1 or Option 2?</wrong_l2>
        <correct_l3>Using Option 1 based on [analysis]. Executing now.</correct_l3>
      </technical_decisions>

      <error_recovery mode="L3">
        <pattern>Detect error → Apply fix → Continue</pattern>
        <wrong_l2>Error detected. Should I fix it?</wrong_l2>
        <correct_l3>Error detected. Applying fix and continuing.</correct_l3>
      </error_recovery>

      <story_selection mode="L3">
        <pattern>Analyze priority → Select story → Execute breakdown</pattern>
        <wrong_l2>Found 3 stories. Which should we work on?</wrong_l2>
        <correct_l3>Selected STORY-042 (highest priority). Breaking down now.</correct_l3>
      </story_selection>

      <memory_operations mode="L3">
        <pattern>Auto-search → Auto-apply → Auto-store</pattern>
        <wrong_l2>Should I search memory for similar patterns?</wrong_l2>
        <correct_l3>Searched memory. Applying pattern from Learning-23.</correct_l3>
      </memory_operations>
    </behavioral_patterns>

    <integration_points>
      <with_pm_role>
        <integration>PM creates AgentTasks autonomously when work detected</integration>
        <integration>No approval questions for standard operations</integration>
        <integration>Direct execution with status updates only</integration>
        <integration>Continuous work discovery active</integration>
      </with_pm_role>

      <with_memory_system>
        <integration>Auto-search memory before all operations</integration>
        <integration>Auto-store successful patterns</integration>
        <integration>Apply discovered patterns without asking</integration>
      </with_memory_system>

      <with_agenttask_system>
        <integration>Auto-create AgentTasks for detected work</integration>
        <integration>Auto-assign appropriate specialists</integration>
        <integration>Auto-execute via Task tool</integration>
        <integration>Sequential execution without approval</integration>
      </with_agenttask_system>

      <with_story_breakdown>
        <integration>Auto-select next story based on priority</integration>
        <integration>Auto-collaborate with architect</integration>
        <integration>Auto-create breakdown AgentTasks</integration>
        <integration>Auto-execute story workflow</integration>
      </with_story_breakdown>
    </integration_points>
  </l3_autonomous_behavior>

  <!-- WORK DETECTION PATTERNS -->
  <work_detection_patterns id="WORK-DETECTION">
    <work_pattern_recognition>
      <action_verbs_indicating_work>
        <category name="modification">fix, change, update, modify, adjust, correct, improve, enhance, optimize, refactor</category>
        <category name="creation">create, add, insert, generate, build, make, write, implement, develop</category>
        <category name="removal">delete, remove, clean, purge, clear, eliminate, drop</category>
        <category name="operations">deploy, install, configure, setup, run, execute, start, stop, restart</category>
        <category name="system">migrate, backup, restore, sync, merge, commit, push, pull</category>
      </action_verbs_indicating_work>

      <work_intent_detection>
        <common_work_phrases>
          <phrase>Let me [action]... → Create AgentTask for appropriate specialist</phrase>
          <phrase>I'll [action]... → Delegate to specialist agent</phrase>
          <phrase>Going to [action]... → Use AgentTask approach</phrase>
          <phrase>Need to [action]... → Create structured work item</phrase>
          <phrase>Should [action]... → Assign to domain specialist</phrase>
          <phrase>Will [action]... → Follow systematic process</phrase>
          <phrase>[Action] this/that... → Use structured approach</phrase>
          <phrase>Quick [action]... → Ensure thorough execution</phrase>
          <phrase>Simple [action]... → Apply professional standards</phrase>
        </common_work_phrases>
      </work_intent_detection>

      <context_analysis>
        <work_indicators>
          <indicator>File path mentions with action context → Agent execution recommended</indicator>
          <indicator>Code snippet references with modification intent → Professional review preferred</indicator>
          <indicator>Configuration discussions with implementation implications → Systematic approach beneficial</indicator>
          <indicator>Bug descriptions with immediate fix attempts → Thorough analysis ensures complete fixes</indicator>
          <indicator>Feature requests with direct implementation → Design review improves features</indicator>
        </work_indicators>
      </context_analysis>
    </work_pattern_recognition>

    <scoring_system>
      <work_detection_scoring>
        <score points="3">Action verb present</score>
        <score points="2">Target object specified</score>
        <score points="2">Implementation detail mentioned</score>
        <score points="1">File/system reference</score>
        <threshold>≥3 points = Create AgentTask</threshold>
      </work_detection_scoring>
    </scoring_system>

    <autonomy_aware_execution>
      <l3_autonomous threshold="≥3 points">
        <flow>Detect work → Create AgentTask → Execute immediately</flow>
        <behavior>No approval questions for standard operations</behavior>
        <behavior>Status updates only</behavior>
      </l3_autonomous>

      <l2_guided threshold="≥3 points">
        <flow>Detect work → Architect review → Create AgentTask → Execute</flow>
      </l2_guided>

      <l1_manual threshold="≥3 points">
        <flow>Detect work → Request approval → Create AgentTask → Execute</flow>
      </l1_manual>
    </autonomy_aware_execution>

    <information_vs_work_patterns>
      <information_requests>
        <pattern>Pure questions without work intent</pattern>
        <pattern>Status inquiries and reporting</pattern>
        <pattern>Information requests and explanations</pattern>
        <pattern>Planning discussions without implementation commitment</pattern>
        <pattern>@Role consultations (what/how/why patterns)</pattern>
        <response>Direct Response</response>
      </information_requests>

      <memory_first_approach>
        <step>Search memory before asking users</step>
        <step>Apply stored patterns when relevant</step>
        <step>Build knowledge base from interactions</step>
        <step>Prevent repeated questions</step>
      </memory_first_approach>
    </information_vs_work_patterns>
  </work_detection_patterns>

  <!-- INTEGRATION POINTS -->
  <integration_points>
    <with_agenttask_system>
      <integration>Work detection triggers AgentTask creation</integration>
      <integration>Autonomy level determines approval workflow</integration>
      <integration>Decision matrix guides execution pattern</integration>
    </with_agenttask_system>

    <with_memory_system>
      <integration>Memory-first approach before user queries</integration>
      <integration>Auto-store learnings in L3 mode</integration>
      <integration>Pattern application based on relevance</integration>
    </with_memory_system>

    <with_role_system>
      <integration>@Role + Work triggers AgentTask creation</integration>
      <integration>PM role operates in coordination mode only</integration>
      <integration>Specialist assignment based on work type</integration>
    </with_role_system>
  </integration_points>
</behavioral_patterns>
