# AgentTask System

**MANDATORY:** In-memory AgentTask creation, execution, integration, and validation. Auto-correct violations.

## AgentTask Creation System

### Core Function
**Purpose**: Real-time work detection and ephemeral AgentTask creation
**Scope**: Main agent only - agents cannot create work items
**Requirements**: Template compliance, memory-first approach, complete context
**Execution**: In-memory AgentTask passed directly to Task tool

### Work Classification

<work_classification id="WORK-CLASSIFICATION">
  <executable_tasks points="0-15">
    <description>Nano/Tiny/Medium AgentTasks - passed directly to Task tool</description>
    <patterns>
      <pattern>nano (0-2 pts): Trivial one-line changes</pattern>
      <pattern>tiny (3-5 pts): Simple single-file tasks</pattern>
      <pattern>medium (6-15 pts): Multi-file features</pattern>
      <pattern>Create in-memory AgentTask from template</pattern>
      <pattern>Pass complete context directly to Task tool</pattern>
      <pattern>No file creation or storage required</pattern>
      <pattern>Focus on immediate execution and completion</pattern>
    </patterns>
  </executable_tasks>

  <story_work points="16+">
    <description>Work >15 points MUST become STORY in ./stories/</description>
    <patterns>
      <pattern>Create STORY file in ./stories/ directory</pattern>
      <pattern>PM + Architect breakdown into ≤15 point AgentTasks</pattern>
      <pattern>Each breakdown task follows executable pattern (nano/tiny/medium)</pattern>
      <pattern>NO AgentTasks >15 points allowed</pattern>
    </patterns>
  </story_work>

  <context_requirement>Complete embedding with resolved placeholders for all executable sizes</context_requirement>
</work_classification>

### In-Memory Pattern
**No File Storage**: Executable AgentTasks (0-15 points) exist only in memory
**Direct Deployment**: Template → Context embedding → Task tool invocation
**Ephemeral Nature**: AgentTask content passed as context, not stored as file
**File Operations**: Only for Stories (>15 points) written to ./stories/

### Creation Flow
**Process**: Work detection → Memory search → Template selection → Context embedding → Direct Task tool deployment
**Quality Gates**: Template compliance, complete context, resolved placeholders
**Execution**: In-memory AgentTask deployed via Task tool to appropriate agent
**Storage**: Only successful patterns and learnings captured in memory, not AgentTask files

## AgentTask Execution

### Core Process
**Pattern**: Direct execution via Task tool with complete embedded context
**Operation**: In-memory operation, no file tracking
**Validation**: Built-in validation, testing, documentation updates
**Summary**: Comprehensive summary with automatic memory storage

### Task Tool Invocation
1. Generate AgentTask with embedded context in memory
2. Identify appropriate specialist agent for work type
3. Deploy AgentTask context to agent via Task tool
4. Agent executes with self-contained context
5. Agent provides comprehensive execution summary
6. Successful patterns automatically stored in memory/

### Context Requirements

<context_requirements id="CONTEXT-REQUIREMENTS" mandatory="true">
  <requirement>Complete project context from CLAUDE.md</requirement>
  <requirement>Configuration values (no runtime lookups)</requirement>
  <requirement>Memory search results</requirement>
  <requirement>Best practices</requirement>
  <requirement>All required file paths and content samples</requirement>
</context_requirements>

### Execution Isolation
Self-contained context, no external dependencies, all configuration pre-embedded, memory patterns included, project boundaries defined, quality standards embedded

### Quality Standards
**Pre-Execution**: Context completeness verified, placeholders resolved, configuration embedded, agent assignment appropriate
**Execution**: Agent stays within scope, quality maintained, progress tracked
**Post-Execution**: Requirements validated, learning captured, memory stored, summary provided

## AgentTask System Integration

### Core Lifecycle
**Creation & Breakdown**: Auto-breakdown >15 points, template selection by complexity, zero placeholders, complete context, embedded config
**Execution**: All AgentTasks execute via agents, mandatory completion checklist, self-contained context
**Adaptation**: Real-time context modification, seamless agent restart, scope adjustment with template compliance

### Integration Points
**Template**: Load from hierarchy, complete placeholder resolution, automatic complexity selection, quality validation
**Process**: @PM + architect story breakdown, role assignment (two-factor), memory search, best practices
**Validation**: Template compliance, context completeness, execution readiness, completion verification
**Workflow**: Story → AgentTask → Execution → Completion with quality gates at each transition

### Error Handling
Wrong template → Recalculate, use correct. Missing context → Gather before proceeding. Size violations → Auto-breakdown. Execution failures → Adaptation patterns.

## Template Resolution & Validation

### Core Rules

<template_resolution id="TEMPLATE-RESOLUTION" mandatory="true">
  <main_agent_required>
    <description>Placeholder resolution requires full context</description>
    <requirements>
      <requirement>Config hierarchy</requirement>
      <requirement>Project root</requirement>
      <requirement>System nature analysis</requirement>
      <requirement>Critical files</requirement>
      <requirement>Memory search</requirement>
    </requirements>
    <constraint>AGENTS CANNOT resolve placeholders (isolated context)</constraint>
  </main_agent_required>

  <common_placeholders>
    <category name="config">
      <placeholder>[FROM_CONFIG]</placeholder>
      <placeholder>[GIT_PRIVACY]</placeholder>
      <placeholder>[BRANCH_PROTECTION]</placeholder>
    </category>

    <category name="context">
      <placeholder>[PROJECT_ROOT]</placeholder>
      <placeholder>[SYSTEM_NATURE]</placeholder>
      <placeholder>[CURRENT_DATE]</placeholder>
    </category>

    <category name="files">
      <placeholder>[CRITICAL_FILES]</placeholder>
      <placeholder>[MEMORY_SEARCH:topic]</placeholder>
      <placeholder>[PROJECT_OVERVIEW]</placeholder>
    </category>
  </common_placeholders>

  <template_source>
    <tier name="nano" points="0-2" status="executable"/>
    <tier name="tiny" points="3-5" status="executable"/>
    <tier name="medium" points="6-15" status="executable"/>
    <tier name="large" points="16-30" status="deprecated">DEPRECATED - create STORY instead</tier>
    <tier name="mega" points="30+" status="deprecated">DEPRECATED - create STORY instead</tier>
    <note>Use executable templates from hierarchy (nano/tiny/medium only)</note>
  </template_source>
</template_resolution>

### Resolution Standards
Before agent execution: Zero placeholders, absolute paths, actual config values, current dates, embedded search results, story content, role assignment, project context

### Validation Process
1. Scan for [.*] patterns
2. Replace all placeholders with actual values
3. Validate no unresolved patterns remain
4. Block creation if any placeholders remain

### Auto-Correction
Manual creation → Force template. Unresolved placeholders → Complete resolution. Wrong complexity → Recalculate. Runtime config → Embed values. Agent attempts → Block, redirect to main agent.

---
*Unified AgentTask system with in-memory execution and complete context embedding*
