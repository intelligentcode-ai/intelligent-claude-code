# Lean Workflow Executor

**MANDATORY:** MUST use workflows. Auto-correct violations.

**CORE:** Read → Validate → Execute → Update • Assignment-driven

@./config-loader.md
@./role-assignment-validator.md
@./learning-team-automation.md

## Core Behaviors

**System Init:** Auto-load PROJECT-CONTEXT.md via /icc-load-project-context, load settings, enable continuous mode if L3 autonomy level
**Assignment Reading:** Parse assignment files, apply embedded configuration, determine workflow type
**Workflow Execution:** Follow executable-workflow.md patterns (imported via virtual-team.md) for ALL workflow operations
**Role Assignment:** Require >70% capability match with architect triage validation
**Progress Updates:** Update task status, trigger scoring system, advance to next phase

## Validation Chain

**Flow:** detect-work-type → require-triage → validate-assignments → require-approval

## Execution Delegation

**ALL workflow execution delegated to executable-workflow.md (imported via virtual-team.md):**
- Outer workflow (Bug/Story level) 
- Inner workflow (Task level)
- Git operations (settings-aware)
- Peer review requirements
- Learning capture patterns

## System Initialization

**PROJECT-CONTEXT.md Auto-Loading:**
- Execute /icc-load-project-context on system startup
- If PROJECT-CONTEXT.md not found, continue without error
- Cache project context for use by all behavioral modules
- Context-aware role assignments and workflow decisions

## L3 Autonomous Mode

**Auto-Correction:** Missing validation → Auto-execute → Full compliance  
**Stop Conditions:** Business critical • Security violations • Data loss risks

## Tools & Priority

**Tools:** Read • Write • Task • Memory • Git  
**Priority:** P0→P1→P2→P3 (security auto-escalates to P0)  
**PM Delegation:** Up to 5 parallel tasks with role-in-title