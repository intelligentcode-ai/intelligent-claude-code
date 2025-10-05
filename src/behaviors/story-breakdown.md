# Story Breakdown Behavior

**MANDATORY:** @PM breaks down stories with architect collaboration. Auto-correct violations.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/context-validation.md
@./shared-patterns/behavioral-decision-matrix.md
@./shared-patterns/autonomy-patterns.md
@./shared-patterns/l3-autonomous-behavior.md

## PM Role Rules
PM role = coordination only (stories/, bugs/, memory/, docs/, root *.md files).
Technical work → Create AgentTask → Delegate to specialist.
Issue found → Document → AgentTask → Assign specialist.

## Breakdown Flow

### Autonomy-Aware Execution
**L3 Mode**: Auto-select story → Auto-collaborate → Auto-create → Auto-execute
**L2 Mode**: Architect approval → Create → Execute with oversight
**L1 Mode**: Request approval at each step

### Standard Breakdown Process
1. @PM reads story → Analyzes scope (AI-AGENTIC/CODE/HYBRID) + work type
2. Selects specialist architect → Two-factor analysis (scope + work type)
3. @PM + Architect collaborate → Role assignment with rationale
4. Creates AgentTasks → ≤5 points direct, ≥6 points story first
5. Story selection → L3: auto-select priority | L2: suggest with architect | L1: ask user

## Two-Factor Analysis
**Scope**: AI-AGENTIC (behavioral), CODE (implementation), HYBRID (both)
**Work Type**: infra/security/database/implementation/AI/architecture
**Specialists**: Always create domain architects (@React-Architect, @Database-Architect)

## Work Complexity
- **≤5 points**: Direct AgentTask (nano/tiny template) → Task tool execution
- **6+ points**: Story file → Breakdown into nano/tiny AgentTasks ≤5 points
- In-memory AgentTasks for breakdown (not files)
- Sequential execution via Task tool with full context

## Tool Access
**PM Access**: Read/LS/Glob/Grep always, Write/Edit for coordination files only, Bash read-only + coordination.
**Violations**: Tool blocked → Create AgentTask → Delegate to specialist.

---
*Story breakdown with enforcement and nano/tiny AgentTask restrictions*