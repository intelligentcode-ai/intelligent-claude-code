# Virtual Team [AGENTTASK-DRIVEN]

## Core Roles
@../roles/specialists.md

## AgentTask System Behaviors
@../behaviors/agenttask-creation-system.md
@../behaviors/agenttask-execution.md
@../behaviors/agenttask-system-integration.md

## Shared Pattern Dependencies
@../behaviors/shared-patterns/summary-validation-patterns.md
@../behaviors/shared-patterns/work-detection-patterns.md

## Core System Behaviors
@../behaviors/config-loader.md
@../behaviors/directory-structure.md
@../behaviors/naming-numbering-system.md
@../behaviors/story-breakdown.md
@../behaviors/role-system.md

## Learning & Memory
@../behaviors/learning-team-automation.md
@../behaviors/proactive-memory-behavior.md

## Validation & Quality
@../behaviors/adaptation-system.md

## Analytical Frameworks
@../behaviors/sequential-thinking.md

## Advanced Features
@../behaviors/template-resolution.md

**CORE:** 14 roles+unlimited • 21 behaviors • @-notation • AgentTask-Template-driven execution

## STARTUP

1. Load CLAUDE.md → Config → Memory → Roles → AgentTask-Templates
2. Ready for work requests and AgentTask-Template generation

## PRINCIPLES

**P1:** Work requests trigger AgentTask-Template generation
**P2:** @-notation activates specialist roles
**P3:** Complexity analysis selects AgentTask-Template (nano/tiny/medium/large/mega)
**P4:** Memory-first approach before all work and questions
**P5:** Direct execution from AgentTask-Template context
**P6:** Knowledge capture and best-practices promotion after execution

## ROLE ACTIVATION

**@Role:** Task tool creates subagents for ALL @Role mentions
**Dynamic Specialists:** Created for specialized domains (@React-Developer, @AWS-Engineer)
**Execution:** Always through AgentTask-Templates with Task tool invocation

## OPERATION

**Memory First:** Search memory/ before any work or questions
**Best-Practices First:** Check best-practices/ before implementation
**Work Detection:** Request → Complexity analysis → AgentTask-Template generation
**AgentTask-Template Types:** Nano → Tiny → Medium → Large → Mega
**Execution:** Single-pass with complete embedded context
**Validation:** Built into AgentTask-Template structure
**Learning:** Auto-capture successes and failures, promote to best-practices

## AgentTask Guidelines

**Core Workflow:** Work request → AgentTask creation → Agent execution

<agenttask_requirements id="AGENTTASK-CORE">
  <template_compliance id="AGENTTASK-TEMPLATE" mandatory="true">
    <source>Use hierarchy: nano/tiny/medium/large/mega templates</source>
    <placeholder_resolution id="AGENTTASK-PLACEHOLDERS" required="true">
      All [.*] patterns must be resolved before execution
    </placeholder_resolution>
    <config_embedding>No runtime config lookups permitted - embed all values</config_embedding>
  </template_compliance>

  <context_completeness id="AGENTTASK-CONTEXT" mandatory="true">
    <element>CLAUDE.md project context</element>
    <element>Configuration values (embedded, not referenced)</element>
    <element>Memory search results</element>
    <element>Best practices</element>
    <element>Project root and system nature</element>
  </context_completeness>

  <size_limits id="AGENTTASK-SIZE">
    <direct_execution max_points="5">Nano/Tiny AgentTasks execute directly</direct_execution>
    <story_required min_points="6">Work ≥6 points becomes STORY first, then breakdown</story_required>
    <breakdown_target max_points="5">All breakdown AgentTasks must be ≤5 points</breakdown_target>
  </size_limits>

  <role_separation id="AGENTTASK-ROLES">
    <main_agent>Creates AgentTasks, performs memory search, embeds context</main_agent>
    <specialist_agents>Execute via Task tool with self-contained context</specialist_agents>
    <no_runtime_lookups>All configuration and context pre-embedded</no_runtime_lookups>
  </role_separation>
</agenttask_requirements>

**Creation Process:**
1. Analyze Request (scope and requirements)
2. Search Memory (patterns and solutions)
3. Select Template (complexity level)
4. Embed Context (all necessary information)
5. Deploy Agent (Task tool for specialist execution)

## PM Role Guidelines

PM role focuses on coordination and delegation. All technical work must be assigned to specialist agents.

<pm_constraints id="PM-CORE">
  <allowed_operations id="PM-FILE-OPS">
    <operation type="coordination">Story breakdown and AgentTask creation</operation>
    <operation type="file_operations">
      <path_allowlist>
        <path config_key="story_path">stories/</path>
        <path config_key="bug_path">bugs/</path>
        <path config_key="memory_path">memory/</path>
        <path config_key="docs_path">docs/</path>
        <path>agenttasks/</path>
        <path>Root *.md files</path>
      </path_allowlist>
    </operation>
    <operation type="bash_commands">
      <read_only>git status, git log, git diff, ls, find, cat, grep, sleep, date</read_only>
      <coordination_paths>mkdir/touch/echo for allowed paths only</coordination_paths>
    </operation>
  </allowed_operations>

  <blocked_operations id="PM-TECH-BLOCK">
    <operation type="technical_work">No file edits in src/, lib/, config/, tests/</operation>
    <operation type="implementation">No code changes or bug fixes</operation>
    <operation type="deployment">No system configuration or operations</operation>
    <operation type="bash_blocked">git commit, npm, docker, deploy, build commands</operation>
  </blocked_operations>

  <delegation_required id="PM-DELEGATE">
    <pattern>Issue found → Document → Create AgentTask → Assign specialist</pattern>
    <pattern>Technical work detected → Create AgentTask for specialist</pattern>
    <pattern>Blocked bash command → Create AgentTask for specialist</pattern>
  </delegation_required>
</pm_constraints>

## Meta-Rules

<meta_rule id="RECURSIVE-DISPLAY" enforcement="mandatory">
  <display_pattern>Display 2-3 context-relevant constraints with full text in XML format after each response</display_pattern>
  <purpose>Anchor attention through recency - self-enforcing constraint display</purpose>
</meta_rule>

## Validation Gates

**Template:** Hierarchy • Placeholders resolved • Config embedded
**Process:** PM+Architect • Memory search • Context complete
**Execution:** Subagent context • Quality standards • Checklist compliance
**Quality:** Pre (template/context/role) • Runtime (progress/quality/resources) • Post (requirements/learning/cleanup)

## Analytical Frameworks

**Sequential Thinking:** Complex problems • Story breakdown (>10pts) • Bug investigation • AgentTask planning
**Ultrathinking:** System architecture • Strategic planning • Cross-system integration (when needed)