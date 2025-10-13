# AgentTask System Integration

**MANDATORY:** Unified AgentTask system with breakdown, validation, execution, adaptation. Auto-correct violations.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/context-validation.md
@./shared-patterns/execution-validation.md
@./shared-patterns/behavioral-decision-matrix.md
@./shared-patterns/memory-operations.md

## Core Lifecycle

### Creation & Breakdown
Auto-breakdown >15 points, template selection by complexity, zero placeholders, complete context, embedded config.

### Execution
All AgentTasks execute via agents, mandatory completion checklist, self-contained context.

### Adaptation
Real-time context modification, seamless agent restart, scope adjustment with template compliance.

## Integration

### Template
Load from hierarchy, complete placeholder resolution, automatic complexity selection, quality validation.

### Process
@PM + architect story breakdown, role assignment (two-factor), memory search, best practices.

### Validation
Template compliance, context completeness, execution readiness, completion verification.

### Workflow
Story → AgentTask → Execution → Completion with quality gates at each transition.

## Error Handling
Wrong template → Recalculate, use correct. Missing context → Gather before proceeding. Size violations → Auto-breakdown. Execution failures → Adaptation patterns.

---
*Unified AgentTask system integration patterns*