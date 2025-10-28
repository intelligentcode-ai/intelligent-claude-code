# AgentTask System Integration

**MANDATORY:** Unified AgentTask system with breakdown, validation, execution, and adaptation patterns.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/context-validation.md
@./shared-patterns/execution-validation.md
@./shared-patterns/behavioral-decision-matrix.md
@./shared-patterns/memory-operations.md

## Core AgentTask Lifecycle

### Creation & Breakdown
**SIZE LIMIT:** Maximum 15 points (medium) for executable AgentTasks
**TEMPLATE SELECTION:** Nano (0-2), Tiny (3-5), Medium (6-15) only
**LARGE WORK:** >15 points becomes STORY in ./stories/ for breakdown
**VALIDATION:** Zero placeholders, complete context, embedded config
**NO FILE WRITES:** AgentTask context passed directly to Task tool

### Execution Patterns
**DIRECT TASK TOOL:** AgentTask context passed to Task tool immediately (no file writes)
**SUBAGENT REQUIRED:** All AgentTasks execute via specialized agents
**COMPLETION CHECKLIST:** Mandatory validation before marking complete
**CONTEXT PRESERVATION:** Self-contained execution with no external dependencies

### Adaptation & Updates
**DYNAMIC UPDATES:** Real-time AgentTask context modification when corrections provided
**AGENT RESTART:** Seamless transition with updated context
**SCOPE ADJUSTMENT:** Modify AgentTask scope while maintaining template compliance

## Integration Components

### Template Integration
- Load from template hierarchy
- Complete placeholder resolution required
- Automatic complexity-based selection
- Quality validation before creation

### Process Integration
- @PM story breakdown with architect collaboration
- Role assignment via two-factor analysis
- Memory search and pattern application
- Best practice integration

### Validation Integration
- Template compliance checking
- Context completeness verification
- Execution readiness validation
- Completion verification

### Workflow Integration
- Story → AgentTask → Execution → Completion
- Multi-AgentTask coordination for large stories
- Cross-system dependency management
- Quality gates at each transition

## Error Handling

### Auto-Correction
- Wrong template → Recalculate complexity, use correct template (nano/tiny/medium only)
- Missing context → Gather required context before proceeding
- Size violations (>15 pts) → Create STORY in ./stories/ for breakdown
- Execution failures → Adaptation patterns with context updates

### Recovery Patterns
- Template resolution failures → Manual intervention with guidance
- Context gathering failures → Systematic analysis for missing elements
- Execution interruptions → Agent restart with preserved context
- Validation failures → Blocking until compliance achieved

## Quality Gates

### Pre-Creation
- Requirements clarity and completeness
- Complexity calculation and template selection
- Context gathering and validation
- Memory search for applicable patterns

### Pre-Execution
- Template compliance verification
- Placeholder resolution completeness
- Context embedding validation
- Subagent readiness confirmation

### Post-Execution
- Completion checklist validation
- Quality standard compliance
- Learning capture and storage
- Documentation and cleanup

---
*Unified AgentTask system integration patterns*