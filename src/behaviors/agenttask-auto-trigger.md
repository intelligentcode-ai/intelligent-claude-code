# AgentTask Auto-Trigger

Auto-detect work and generate AgentTask using templates.

## Imports
@./sequential-thinking.md
@./shared-patterns/behavioral-decision-matrix.md
@./shared-patterns/template-loading.md
@./shared-patterns/memory-operations.md
@./naming-numbering-system.md

## Core Rules

**Work Detection**: Implementation intent triggers AgentTask generation
**Size Limits**: ≤15 points (nano/tiny/medium), larger work becomes STORY first
**Context**: Memory-first approach with embedded patterns

## Generation Process

**Flow**: Work detection → Memory search → Template selection → Context embedding → Agent execution
**Requirements**: Complete context, memory patterns, resolved placeholders
**Templates**: nano (0-2 pts), tiny (3-5 pts), medium (6-15 pts)
**Execution**: Pass to Task tool directly (NO file writes)

## Integration Points

**Deduplication**: Check existing stories/AgentTasks before creation
**Memory Integration**: Embed relevant patterns in AgentTask context
**Context Loading**: Complete project context with configuration values
**Story Creation**: Work >15 points written to ./stories/ for breakdown

---
*AgentTask auto-trigger with breakdown enforcement and 15-point maximum*