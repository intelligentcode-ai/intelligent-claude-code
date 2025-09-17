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
**Size Limits**: ≤5 points (nano/tiny), larger work becomes STORY/BUG first
**Context**: Memory-first approach with embedded patterns

## Generation Process

**Flow**: Work detection → Memory search → Template selection → Context embedding → Agent execution
**Requirements**: Complete context, memory patterns, resolved placeholders
**Templates**: nano (0-2 pts), tiny (3-5 pts) only

## Integration Points

**Deduplication**: Check existing AgentTasks before creation
**Memory Integration**: Embed relevant patterns in AgentTask context
**Context Loading**: Complete project context with configuration values

---
*AgentTask auto-trigger with breakdown enforcement and nano/tiny restrictions*