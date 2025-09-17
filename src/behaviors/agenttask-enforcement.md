# AgentTask Enforcement

Use AgentTask system with templates for all work. Block direct execution.

## Imports
@./shared-patterns/behavioral-decision-matrix.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/enforcement-rules.md
@./shared-patterns/main-scope-blocking.md
@./shared-patterns/continuation-work-patterns.md
@./shared-patterns/pm-role-enforcement.md

## Core Rules

Creation vs execution:
- Creation: Main agent (Stories/Bugs/EPICs/AgentTasks, templates, config)
- Execution: Subagent (AgentTask implementation, file ops, git)

Detection and blocking:
- Work intent: All action verbs including fix, change, update, modify, adjust, correct, improve, enhance, optimize, refactor, create, add, insert, generate, build, make, write, implement, develop, delete, remove, clean, purge, clear, eliminate, drop, deploy, install, configure, setup, run, execute, start, stop, restart, migrate, backup, restore, sync, merge, commit, push, pull
- Information request: Pure questions with what, how, why, should, can, will + @Role consultations without work commitment

Template enforcement:
- Manual AgentTask creation → Use template hierarchy
- Unresolved placeholders → Resolve all placeholders
- Runtime config lookup → Embed config values
- Wrong template source → Use template hierarchy only

Main scope work blocking:
- Block all work execution in main scope
- Direct file operations without AgentTask → Blocked
- System configuration without AgentTask → Blocked
- Code changes without AgentTask → Blocked
- Any implementation without AgentTask context → Blocked

Process:
- Main scope = AgentTask creation only
- Subagent = Work execution only
1. User Request → AgentTask Generation (main scope)
2. AgentTask → Task Tool → Agent Execution (subagent)

Required action: Generate AgentTask using @Role pattern first

## Tool-Level Blocking

Block file modification tools in main scope when work patterns detected.

Blocked tools in main scope:
- Edit, MultiEdit, Write tools for modifications
- Bash tool for system changes (read-only allowed)

Blocking conditions:
- Work intent detected
- Main scope context (not in active AgentTask)
- No AgentTask authorization

Recovery process:
1. Create AgentTask using @Role pattern
2. Deploy AgentTask via Task tool to authorized agent
3. Agent executes with full tool authorization

## Auto-Correction

| Violation | Action |
|-----------|--------|
| Manual AgentTask creation | Force template usage |
| Missing template sections | Load complete template |
| Unresolved placeholders | Resolve placeholders |
| Runtime config lookup | Embed config values |
| AgentTask exceeds 15 points | Auto-breakdown |
| Wrong role assignment | PM+Architect collaboration |

## Pattern Detection

@Role mentions → Generate AgentTask → Subagent execution
Work items → Convert to AgentTask → Execute
Direct work → Block → Generate AgentTask

## System Nature Validation

AI-AGENTIC: @AI-Engineer for behaviors, memory, AgentTasks
CODE-BASED: @Developer, @Backend-Tester for implementation
HYBRID: PM+Architect collaboration for role selection

## Quality Gates

Pre-Creation: Template compliance, context completeness, role assignment
Runtime: Execution monitoring, quality maintenance
Post-Execution: Completion verification, learning capture

---
*AgentTask enforcement with blocking, auto-correction, and execution controls*
