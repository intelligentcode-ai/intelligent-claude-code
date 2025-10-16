<?xml version="1.0" encoding="UTF-8"?>
<!--
VALIDATION SYSTEM
Complete validation patterns for AgentTask execution and quality assurance

Consolidated from:
- shared-patterns/context-validation.md
- shared-patterns/execution-validation.md
- shared-patterns/execution-summary.md
- shared-patterns/summary-validation-patterns.md
- shared-patterns/template-enforcement.md

Version: 1.0.0
Last Updated: 2025-10-16
-->

<validation_system>
  <metadata>
    <purpose>Comprehensive validation patterns for context, execution, summary, and template compliance</purpose>
    <enforcement>MANDATORY - Auto-correct violations</enforcement>
    <scope>AgentTask generation, execution, and completion validation</scope>
  </metadata>

  <!-- CONTEXT VALIDATION -->
  <context_validation id="CONTEXT-VALIDATION">
    <required_elements>
      <element name="system_nature">
        <description>CODE/AI-AGENTIC/HYBRID identification</description>
        <validation>Must be explicitly identified before AgentTask creation</validation>
      </element>
      <element name="project_root">
        <description>Absolute path with project boundaries</description>
        <validation>Must be absolute path, no relative paths allowed</validation>
      </element>
      <element name="configuration">
        <description>Actual values, no placeholders</description>
        <validation>All [PLACEHOLDER] patterns must be resolved</validation>
      </element>
      <element name="critical_files">
        <description>Relevant files with content samples</description>
        <validation>Required files identified with content context</validation>
      </element>
      <element name="user_requirements">
        <description>Clear intent and success criteria</description>
        <validation>Explicit requirements documented</validation>
      </element>
    </required_elements>

    <validation_rules>
      <rule id="no_placeholders">
        <pattern>All [PLACEHOLDER] patterns must be resolved</pattern>
        <enforcement>Block AgentTask creation if unresolved placeholders detected</enforcement>
      </rule>
      <rule id="project_boundaries">
        <pattern>Operations constrained to project root</pattern>
        <enforcement>Scope validation before execution</enforcement>
      </rule>
      <rule id="role_alignment">
        <pattern>Assignments match system nature (AI-AGENTIC → @AI-Engineer)</pattern>
        <enforcement>Two-factor role assignment validation</enforcement>
      </rule>
    </validation_rules>
  </context_validation>

  <!-- EXECUTION VALIDATION -->
  <execution_validation id="EXECUTION-VALIDATION">
    <agent_invocation_validation>
      <automatic_agent_selection>
        <mandatory_checks>
          <check>AgentTask work type analysis completed</check>
          <check>Appropriate agent specialization identified</check>
          <check>Dynamic specialist creation when technology expertise required</check>
          <check>Agent assignment documented in AgentTask context</check>
        </mandatory_checks>
      </automatic_agent_selection>

      <task_tool_execution_validation>
        <execution_isolation_checks>
          <check>Task tool invocation pattern followed correctly</check>
          <check>Complete AgentTask context passed to subagent</check>
          <check>No runtime configuration lookups attempted</check>
          <check>Self-contained execution environment verified</check>
          <check>Agent operates within defined project boundaries</check>
        </execution_isolation_checks>
      </task_tool_execution_validation>

      <agent_execution_monitoring>
        <during_execution>
          <monitor>Agent stays within assigned AgentTask scope</monitor>
          <monitor>Quality standards maintained throughout execution</monitor>
          <monitor>Progress tracking through execution checklist</monitor>
          <monitor>Context preservation without external dependencies</monitor>
        </during_execution>
      </agent_execution_monitoring>

      <post_execution_validation>
        <completion_verification>
          <verify>All AgentTask requirements satisfied by agent</verify>
          <verify>Agent execution quality standards met</verify>
          <verify>Learning patterns captured from agent execution</verify>
          <verify>Agent results properly integrated with main system</verify>
        </completion_verification>
      </post_execution_validation>
    </agent_invocation_validation>

    <detailed_validation_checklists>
      <functional_requirements>
        <item>All deliverables created/modified</item>
        <item>Acceptance criteria met</item>
        <item>Code changes correct</item>
        <item>Dependencies handled</item>
        <item>Edge cases addressed</item>
      </functional_requirements>

      <processual_requirements>
        <item>AgentTask template followed</item>
        <item>Role assignments complete</item>
        <item>Complexity appropriate</item>
        <item>Quality standards met</item>
        <item>Documentation updated</item>
      </processual_requirements>

      <review_validation>
        <item>SME identified</item>
        <item>Review executed</item>
        <item>Feedback addressed</item>
        <item>Approval received</item>
        <item>Quality gates passed</item>
      </review_validation>

      <success_criteria>
        <item>Acceptance validated</item>
        <item>Performance met</item>
        <item>Security satisfied</item>
        <item>Integration tested</item>
        <item>System stable</item>
      </success_criteria>

      <knowledge_capture>
        <item>Learnings documented</item>
        <item>Memory entities created</item>
        <item>Patterns captured</item>
        <item>Errors improved</item>
        <item>Metrics recorded</item>
      </knowledge_capture>

      <git_operations>
        <item>Changes staged</item>
        <item>Commits follow privacy</item>
        <item>Branches managed</item>
        <item>Changes pushed</item>
        <item>Status clean</item>
      </git_operations>

      <agenttask_lifecycle>
        <item>Git ops complete</item>
        <item>Log updated</item>
        <item>Dependencies notified</item>
        <item>Follow-ups created</item>
        <item>State validated</item>
      </agenttask_lifecycle>
    </detailed_validation_checklists>

    <scope_validation_process>
      <project_scope_validation>
        <step sequence="1">Identify project root directory</step>
        <step sequence="2">
          <action>Review each operation</action>
          <check>Installation path writes (block if writing to installation outside installation context)</check>
          <check>Project boundaries (block if outside project root)</check>
        </step>
        <step sequence="3">Allow valid operations within project boundaries</step>
      </project_scope_validation>
    </scope_validation_process>

    <evidence_collection>
      <search_validation>
        <evidence>Command executed - Documentation of search commands used</evidence>
        <evidence>Results found - Documented search results</evidence>
        <evidence>Zero remaining references - Confirmed or requires attention</evidence>
      </search_validation>

      <deliverables_verification>
        <evidence>Requirements met - All functional requirements satisfied</evidence>
        <evidence>Specifications complete - Implementation matches specifications</evidence>
        <evidence>Quality gates passed - All quality standards achieved</evidence>
      </deliverables_verification>

      <documentation_validation>
        <evidence>README updated - Main documentation reflects changes</evidence>
        <evidence>All documentation checked - Comprehensive documentation review</evidence>
        <evidence>Consistency maintained - All documentation remains consistent</evidence>
      </documentation_validation>
    </evidence_collection>
  </execution_validation>

  <!-- EXECUTION SUMMARY PATTERNS -->
  <execution_summary_patterns id="EXECUTION-SUMMARY">
    <required_sections>
      <section name="execution_checklist">
        <description>10-step execution status (✅/❌)</description>
        <validation>All steps must have definitive status</validation>
      </section>
      <section name="requirements_validation">
        <description>Functional requirements and success criteria met</description>
        <validation>Explicit validation of all requirements</validation>
      </section>
      <section name="files_modified">
        <description>Complete list of created/modified/deleted files</description>
        <validation>All file changes documented</validation>
      </section>
      <section name="git_operations">
        <description>Branch, commits, push status, privacy compliance</description>
        <validation>Complete git workflow transparency</validation>
      </section>
      <section name="memory_storage">
        <description>Learning patterns stored automatically</description>
        <validation>Relevant learnings captured</validation>
      </section>
      <section name="next_steps">
        <description>Clear guidance for follow-up actions</description>
        <validation>Actionable next steps provided</validation>
      </section>
    </required_sections>
  </execution_summary_patterns>

  <!-- SUMMARY VALIDATION PATTERNS -->
  <summary_validation_patterns id="SUMMARY-VALIDATION">
    <validation_rules>
      <summary_completeness_validation>
        <required_elements>
          <element>All 6 mandatory sections present</element>
          <element>Nine-step checklist with definitive status</element>
          <element>Functional requirements fully addressed</element>
          <element>Success criteria comprehensively validated</element>
          <element>File changes completely documented</element>
          <element>Git operations transparently reported</element>
          <element>Next steps clearly defined</element>
        </required_elements>
      </summary_completeness_validation>

      <status_indicator_requirements>
        <checklist_status_rules>
          <rule>✅ Only for fully completed items</rule>
          <rule>❌ For incomplete or failed items</rule>
          <rule>No partial status indicators allowed</rule>
          <rule>Evidence required for all ✅ claims</rule>
          <rule>Clear documentation required for all ❌ items</rule>
        </checklist_status_rules>
      </status_indicator_requirements>
    </validation_rules>

    <error_handling>
      <incomplete_execution_detection>
        <blocked_completion_patterns>
          <pattern>Any step showing ❌ status blocks AgentTask completion</pattern>
          <pattern>Missing checklist items trigger completion validation failure</pattern>
          <pattern>Partial implementations require clear documentation of remaining work</pattern>
          <pattern>Git operations failures prevent completion until resolved</pattern>
        </blocked_completion_patterns>
      </incomplete_execution_detection>

      <recovery_patterns>
        <when_execution_issues_detected>
          <step sequence="1">Document Issue: Specific details in summary</step>
          <step sequence="2">Assess Impact: Determine if blocking or non-blocking</step>
          <step sequence="3">Create Follow-up: Generate additional AgentTask if needed</step>
          <step sequence="4">Update Status: Reflect actual completion status</step>
          <step sequence="5">Provide Guidance: Clear steps for resolution</step>
        </when_execution_issues_detected>
      </recovery_patterns>
    </error_handling>

    <quality_standards>
      <summary_quality_requirements>
        <requirement>Professional tone without gamification elements</requirement>
        <requirement>Clear, factual reporting of completion status</requirement>
        <requirement>Specific details rather than generic confirmations</requirement>
        <requirement>Evidence-based validation rather than assumptions</requirement>
        <requirement>Transparent reporting of any issues or partial completions</requirement>
      </summary_quality_requirements>
    </quality_standards>
  </summary_validation_patterns>

  <!-- TEMPLATE ENFORCEMENT -->
  <template_enforcement id="TEMPLATE-ENFORCEMENT">
    <core_enforcement_rules>
      <template_requirements>
        <template_source>Only templates from hierarchy</template_source>
        <template_hierarchy>
          <template name="nano" points="0-2">nano-agenttask-template.yaml</template>
          <template name="tiny" points="3-5">tiny-agenttask-template.yaml</template>
          <template name="medium" points="6-15">medium-agenttask-template.yaml</template>
          <template name="large" points="16-30">large-agenttask-template.yaml</template>
          <template name="mega" points="30+">mega-agenttask-template.yaml</template>
        </template_hierarchy>
        <requirements>
          <requirement>Use templates from hierarchy</requirement>
          <requirement>Resolve all placeholders</requirement>
          <requirement>Embed configuration values</requirement>
        </requirements>
      </template_requirements>

      <placeholder_resolution>
        <common_placeholders>
          <placeholder name="FROM_CONFIG">Actual config values</placeholder>
          <placeholder name="PROJECT_ROOT">Absolute project path</placeholder>
          <placeholder name="CURRENT_DATE">System date</placeholder>
          <placeholder name="SYSTEM_NATURE">Project system type</placeholder>
        </common_placeholders>
        <resolution_rule>All placeholders MUST be resolved at generation time</resolution_rule>
      </placeholder_resolution>
    </core_enforcement_rules>

    <validation_messages>
      <message id="TEMPLATE_REQUIRED">AgentTask creation requires template from hierarchy</message>
      <message id="PLACEHOLDER_UNRESOLVED">Unresolved placeholder: {placeholder} - resolve during generation</message>
      <message id="RUNTIME_CONFIG_NEEDED">Runtime config lookup detected - embed values in AgentTask</message>
    </validation_messages>

    <integration_requirements>
      <with_agenttask_creation_system>
        <requirement>Block non-template AgentTask creation</requirement>
        <requirement>Enforce placeholder resolution before creation</requirement>
        <requirement>Validate template completeness</requirement>
        <requirement>Prevent runtime config dependencies</requirement>
      </with_agenttask_creation_system>

      <with_auto_trigger_system>
        <flow>Template-first flow: complexity → template → placeholder resolution</flow>
        <consistency>Follow template hierarchy for consistency</consistency>
      </with_auto_trigger_system>

      <with_execution_system>
        <requirement>AgentTasks execute with embedded configuration only</requirement>
        <requirement>Self-contained execution context</requirement>
        <requirement>All settings pre-resolved and embedded</requirement>
      </with_execution_system>
    </integration_requirements>
  </template_enforcement>

  <!-- INTEGRATION POINTS -->
  <integration_points>
    <pre_execution_validation>
      <gate>Context completeness verified</gate>
      <gate>Placeholders resolved</gate>
      <gate>Configuration embedded</gate>
      <gate>Agent assignment appropriate</gate>
    </pre_execution_validation>

    <execution_validation>
      <gate>Agent stays within scope</gate>
      <gate>Quality maintained</gate>
      <gate>Progress tracked</gate>
    </execution_validation>

    <post_execution_validation>
      <gate>Requirements validated</gate>
      <gate>Learning captured</gate>
      <gate>Memory stored</gate>
      <gate>Summary provided</gate>
    </post_execution_validation>
  </integration_points>
</validation_system>
