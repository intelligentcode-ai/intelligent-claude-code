# AgentTask Execution

**MANDATORY:** Execute AgentTasks via Task tool with complete embedded context. Auto-correct violations.

## Imports
@./shared-patterns/execution-summary.md

## Core Process
Direct execution via Task tool with complete embedded context.
In-memory operation, no file tracking.
Built-in validation, testing, documentation updates.
Comprehensive summary with automatic memory storage.

## Execution Pattern

### Task Tool Invocation
1. Generate AgentTask with embedded context in memory
2. Identify appropriate specialist agent for work type
3. Deploy AgentTask context to agent via Task tool
4. Agent executes with self-contained context
5. Agent provides comprehensive execution summary
6. Successful patterns automatically stored in memory/

### Context Requirements
Embedded in AgentTask: Complete project context from CLAUDE.md, configuration values (no runtime lookups), memory search results, best practices, all required file paths and content samples.

### Execution Isolation
Self-contained context, no external dependencies, all configuration pre-embedded, memory patterns included, project boundaries defined, quality standards embedded.

## Quality Standards
**Pre-Execution**: Context completeness verified, placeholders resolved, configuration embedded, agent assignment appropriate.
**Execution**: Agent stays within scope, quality maintained, progress tracked.
**Post-Execution**: Requirements validated, learning captured, memory stored, summary provided.

---
*Direct Task tool execution with in-memory AgentTasks and embedded context*