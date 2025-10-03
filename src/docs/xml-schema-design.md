# XML Schema Design for Critical Rules

## Overview

This document defines the XML schema structure for critical enforcement rules in the intelligent-claude-code virtual team system. The schema enables machine-parseable rule definitions with unique constraint IDs for automated validation.

## Schema Structure

### Root Element

```xml
<virtual_team_constraints version="1.0">
  <!-- All constraint categories -->
</virtual_team_constraints>
```

### PM Constraints Category

```xml
<pm_constraints id="PM-CORE">
  <description>PM role coordination and delegation requirements</description>

  <allowed_operations id="PM-FILE-OPS">
    <description>PM can modify coordination and documentation files</description>
    <paths>
      <path pattern="stories/*.md">Story creation and editing</path>
      <path pattern="bugs/*.md">Bug report creation and editing</path>
      <path pattern="*.md" scope="root">Root-level documentation files</path>
    </paths>
    <tools>
      <tool name="Read">Information gathering</tool>
      <tool name="LS">Directory listing</tool>
      <tool name="Glob">File pattern matching</tool>
      <tool name="Grep">Content search</tool>
    </tools>
  </allowed_operations>

  <blocked_operations id="PM-TECH-BLOCK">
    <description>PM cannot perform technical work</description>
    <paths>
      <path pattern="src/*">Source code modifications</path>
      <path pattern="config/*">System configuration</path>
      <path pattern="tests/*">Test files</path>
      <path pattern="lib/*">Library files</path>
    </paths>
    <operations>
      <operation>Code changes or implementation work</operation>
      <operation>System configuration or deployment</operation>
      <operation>Bug fixes or technical corrections</operation>
    </operations>
    <tools_blocked>
      <tool name="Write">Technical file creation</tool>
      <tool name="Edit">Technical file modification</tool>
      <tool name="Bash">System operations</tool>
    </tools_blocked>
  </blocked_operations>

  <delegation_required id="PM-DELEGATE">
    <description>PM must delegate technical work to specialists</description>
    <process>
      <step order="1">Issue found → Document in findings</step>
      <step order="2">Create AgentTask → Generate appropriate work item</step>
      <step order="3">Delegate work → Assign to specialist role</step>
      <step order="4">Never fix directly → PM does not perform technical work</step>
    </process>
    <bypass_patterns>
      <pattern>"Let me fix"</pattern>
      <pattern>"I'll update"</pattern>
      <pattern>"Going to change"</pattern>
      <pattern>"Need to modify"</pattern>
      <pattern>"Quick change"</pattern>
      <pattern>"Simple fix"</pattern>
    </bypass_patterns>
  </delegation_required>
</pm_constraints>
```

### AgentTask Requirements Category

```xml
<agenttask_requirements id="AGENTTASK-CORE">
  <description>AgentTask creation and validation requirements</description>

  <template_compliance id="AGENTTASK-TEMPLATE">
    <description>AgentTasks must use templates from hierarchy</description>
    <templates>
      <template name="nano-agenttask-template.yaml" complexity="0-2">Trivial changes</template>
      <template name="tiny-agenttask-template.yaml" complexity="3-5">Single-file tasks</template>
      <template name="medium-agenttask-template.yaml" complexity="6-15">Multi-file features</template>
      <template name="large-agenttask-template.yaml" complexity="16-30">Complex features</template>
      <template name="mega-agenttask-template.yaml" complexity="30+">System-wide changes</template>
    </templates>
    <validation>
      <rule>Only use templates from hierarchy</rule>
      <rule>Block non-template AgentTask creation</rule>
      <rule>Enforce template-first flow</rule>
    </validation>
  </template_compliance>

  <placeholder_resolution id="AGENTTASK-PLACEHOLDERS">
    <description>All placeholders must be resolved before agent execution</description>
    <placeholders>
      <placeholder pattern="[FROM_CONFIG]">Actual config values</placeholder>
      <placeholder pattern="[PROJECT_ROOT]">Absolute project path</placeholder>
      <placeholder pattern="[CURRENT_DATE]">System date YYYY-MM-DD</placeholder>
      <placeholder pattern="[SYSTEM_NATURE]">Project system type</placeholder>
      <placeholder pattern="[MEMORY_SEARCH:*]">Top memory entries</placeholder>
      <placeholder pattern="[USER_REQUEST]">Story content</placeholder>
      <placeholder pattern="[ROLE]">Role assignment</placeholder>
    </placeholders>
    <validation_checklist>
      <check>Zero placeholders - No [.*] patterns remain</check>
      <check>Absolute paths - All paths start with /</check>
      <check>Actual config values - Boolean/string values loaded</check>
      <check>Current dates - System date format YYYY-MM-DD</check>
      <check>Embedded search results - Memory/practice results included</check>
      <check>Story content - Actual requirements text</check>
      <check>Role assignment - Specific role assigned</check>
      <check>Project context - Real system nature determined</check>
    </validation_checklist>
    <blocking>
      <rule>Scan template for [.*] patterns</rule>
      <rule>Resolve all placeholders with actual values</rule>
      <rule>Validate no unresolved patterns remain</rule>
      <rule>Block creation if any placeholders remain</rule>
    </blocking>
  </placeholder_resolution>

  <context_completeness id="AGENTTASK-CONTEXT">
    <description>AgentTasks must contain complete self-contained context</description>
    <required_elements>
      <element>Configuration hierarchy values (embedded)</element>
      <element>Project root absolute path</element>
      <element>System nature (CODE-BASED/AI-AGENTIC/HYBRID)</element>
      <element>Critical file identification and samples</element>
      <element>Memory search results</element>
      <element>Best practices applicable to work type</element>
    </required_elements>
    <validation>
      <rule>No runtime configuration lookups</rule>
      <rule>Self-contained execution context</rule>
      <rule>All settings pre-resolved and embedded</rule>
    </validation>
  </context_completeness>

  <size_limits id="AGENTTASK-SIZE">
    <description>Work complexity determines creation approach</description>
    <thresholds>
      <threshold points="0-5" approach="direct">
        <description>Direct AgentTask creation with nano/tiny template</description>
        <workflow>No story creation needed - immediate execution via Task tool</workflow>
      </threshold>
      <threshold points="6+" approach="story_first">
        <description>MUST create Story file first in stories/ directory</description>
        <workflow>Story broken down into multiple nano/tiny AgentTasks ≤5 points each</workflow>
      </threshold>
    </thresholds>
    <maximum_size points="5">Maximum AgentTask size (tiny) - no exceptions</maximum_size>
  </size_limits>
</agenttask_requirements>
```

### Directory Structure Category

```xml
<directory_structure id="DIR-STRUCTURE">
  <description>File organization and path allowlists</description>

  <path_allowlist id="PATH-ALLOWLIST">
    <description>Coordination paths accessible to PM role</description>
    <directories>
      <directory path="stories/">User stories and requirements</directory>
      <directory path="stories/drafts/">Work-in-progress stories</directory>
      <directory path="bugs/">Bug reports</directory>
      <directory path="bugs/open/">Active bugs</directory>
      <directory path="bugs/completed/">Fixed bugs</directory>
      <directory path="summaries/">Summary and report files</directory>
      <directory path="root/*.md">Root-level markdown documentation</directory>
    </directories>
  </path_allowlist>

  <path_blocklist id="PATH-BLOCKLIST">
    <description>Technical paths blocked from PM role</description>
    <directories>
      <directory path="src/">Source code</directory>
      <directory path="config/">Configuration files</directory>
      <directory path="tests/">Test files</directory>
      <directory path="lib/">Library files</directory>
    </directories>
  </path_blocklist>

  <naming_standards id="NAMING-STD">
    <description>Consistent naming format and sequential numbering</description>
    <format>
      <pattern>&lt;CATEGORY&gt;-&lt;NUMBER&gt;-&lt;TITLE&gt;-&lt;DATE&gt;.md</pattern>
      <categories>EPIC, STORY, BUG (case sensitive)</categories>
      <numbers>Zero-padded (001, 002, 003), sequential within category</numbers>
      <titles>Lowercase, hyphen-separated, descriptive</titles>
      <dates>YYYY-MM-DD format using $(date +%Y-%m-%d)</dates>
    </format>
    <examples>
      <example>EPIC-001-virtual-team-enhancement-2025-08-26.md</example>
      <example>STORY-001-user-authentication-2025-08-26.md</example>
      <example>BUG-005-naming-format-inconsistency-2025-08-26.md</example>
    </examples>
    <validation>
      <rule>Category in allowed list (EPIC, STORY, BUG)</rule>
      <rule>Number format (zero-padded, sequential)</rule>
      <rule>Title format (lowercase, hyphens only)</rule>
      <rule>Date format (YYYY-MM-DD)</rule>
    </validation>
  </naming_standards>

  <summary_file_redirect id="SUMMARY-REDIRECT">
    <description>Summary files automatically redirected to summaries/ directory</description>
    <patterns>
      <pattern case="insensitive">SUMMARY*</pattern>
      <pattern case="insensitive">REPORT*</pattern>
      <pattern case="insensitive">VALIDATION*</pattern>
      <pattern case="insensitive">ANALYSIS*</pattern>
    </patterns>
    <behavior>
      <rule>Detect summary files in project root</rule>
      <rule>Block creation with suggested path: summaries/[filename]</rule>
      <rule>Auto-create summaries/ directory when needed</rule>
      <rule>Case-insensitive matching (SUMMARY.md, summary.md, Summary.md)</rule>
    </behavior>
  </summary_file_redirect>
</directory_structure>
```

### Role Assignment Category

```xml
<role_assignment id="ROLE-CORE">
  <description>Role selection and specialist creation rules</description>

  <two_factor_analysis id="ROLE-TWO-FACTOR">
    <description>Role assignment based on project scope and work type</description>
    <factor name="project_scope">
      <option value="AI-AGENTIC">Behavioral patterns, memory operations, AgentTask frameworks</option>
      <option value="CODE-BASED">Implementation, databases, APIs, infrastructure</option>
      <option value="HYBRID">Both code and behavioral patterns</option>
    </factor>
    <factor name="work_type">
      <option value="Infrastructure">deploy, CI/CD, container, docker, kubernetes, scaling</option>
      <option value="Security">security, vulnerability, compliance, authentication, authorization</option>
      <option value="Database">database, schema, migration, query, SQL, performance</option>
      <option value="Implementation">implement, feature, bug fix, refactor, code, function</option>
      <option value="AI_Behavioral">behavioral, memory, learning, agent, AgentTask, pattern</option>
      <option value="Architecture">design, architecture, pattern, structure, framework</option>
    </factor>
    <process>
      <step order="1">PM analyzes project scope (Factor 1)</step>
      <step order="2">PM analyzes work type (Factor 2)</step>
      <step order="3">PM selects specialist architect based on analysis</step>
      <step order="4">PM + Specialist Architect collaborate on role selection</step>
      <step order="5">Document two-factor rationale in AgentTask</step>
    </process>
  </two_factor_analysis>

  <specialist_creation id="ROLE-SPECIALIST">
    <description>Dynamic specialist creation for technology domains</description>
    <rules>
      <rule>Always create specialist architects for domain expertise</rule>
      <rule>Examples: @React-Architect, @Database-Architect, @Security-Architect, @AI-Architect</rule>
      <rule>Never use generic @Architect - precision required</rule>
      <rule>Unlimited specialist creation based on technology expertise needs</rule>
    </rules>
    <naming_pattern>@[Domain]-[RoleType]</naming_pattern>
    <examples>
      <example>@React-Developer</example>
      <example>@AWS-Engineer</example>
      <example>@ML-Specialist</example>
      <example>@Kubernetes-DevOps-Engineer</example>
    </examples>
  </specialist_creation>
</role_assignment>
```

### Meta-Rule Category

```xml
<meta_rules priority="critical">
  <meta_rule id="RECURSIVE-DISPLAY">
    <description>XML constraints must be recursively displayed for awareness</description>
    <trigger>When constraint violation detected or validation required</trigger>
    <behavior>
      <rule>Display relevant constraint XML to user</rule>
      <rule>Show constraint ID and description</rule>
      <rule>Provide actionable guidance for compliance</rule>
      <rule>Reference full schema for detailed requirements</rule>
    </behavior>
    <integration>
      <component>STORY-007 Hook Integration</component>
      <component>PreToolUse hook validation</component>
      <component>AgentTask validation</component>
      <component>PM role enforcement</component>
    </integration>
  </meta_rule>
</meta_rules>
```

## Schema Usage

### Validation Pattern

```xml
<!-- Example: PM attempting to modify src/ file -->
<validation_check>
  <constraint_id>PM-TECH-BLOCK</constraint_id>
  <operation>Write to src/hooks/pretooluse.js</operation>
  <result>BLOCKED</result>
  <reason>PM cannot modify technical files in src/ directory</reason>
  <guidance>Create AgentTask for @AI-Engineer to handle technical modifications</guidance>
</validation_check>
```

### Display Pattern

```xml
<!-- Example: Recursive display on violation -->
<constraint_display>
  <constraint_id>PM-TECH-BLOCK</constraint_id>
  <full_xml>
    <blocked_operations id="PM-TECH-BLOCK">
      <description>PM cannot perform technical work</description>
      <paths>
        <path pattern="src/*">Source code modifications</path>
        ...
      </paths>
    </blocked_operations>
  </full_xml>
  <action_required>Create AgentTask and delegate to specialist</action_required>
</constraint_display>
```

## Integration Notes for STORY-007

### Hook Integration Points

1. **PreToolUse Hook Validation**
   - Load XML constraints from schema
   - Parse constraint IDs for rule enforcement
   - Display constraint XML on violation
   - Provide actionable guidance

2. **PM Role Detection**
   - Check PM-CORE constraints
   - Validate against PM-FILE-OPS allowlist
   - Block using PM-TECH-BLOCK rules
   - Enforce PM-DELEGATE delegation pattern

3. **AgentTask Validation**
   - Verify AGENTTASK-TEMPLATE compliance
   - Validate AGENTTASK-PLACEHOLDERS resolution
   - Check AGENTTASK-CONTEXT completeness
   - Enforce AGENTTASK-SIZE limits

4. **Directory Structure Enforcement**
   - Apply PATH-ALLOWLIST for PM operations
   - Block using PATH-BLOCKLIST for technical paths
   - Enforce NAMING-STD for file creation
   - Apply SUMMARY-REDIRECT for summary files

5. **Role Assignment Validation**
   - Verify ROLE-TWO-FACTOR analysis documented
   - Validate ROLE-SPECIALIST creation when needed
   - Check role assignment appropriateness

### Meta-Rule Implementation

The RECURSIVE-DISPLAY meta-rule ensures that when any constraint is violated:
1. Full constraint XML is loaded from schema
2. Relevant constraint displayed to user
3. Actionable guidance provided
4. User understands exact rule and reason

This creates self-documenting enforcement where the schema itself provides the explanation.

## Schema Benefits

1. **Machine-Parseable**: Structured XML enables automated validation
2. **Self-Documenting**: Constraint display includes full context
3. **Unique IDs**: Traceable enforcement across system
4. **Hierarchical**: Nested rules reflect logical grouping
5. **Extensible**: New constraints easily added
6. **Integration-Ready**: Designed for STORY-007 hook implementation

## Version Control

- **Schema Version**: 1.0
- **Created**: 2025-10-03
- **Related**: STORY-006 (Hybrid XML conversion), STORY-007 (Hook integration)
