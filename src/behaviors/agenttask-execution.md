# AgentTask Execution

Execute AgentTasks with complete context through specialized agents using direct Task tool invocation.

## Imports
@./shared-patterns/execution-summary.md

## Core Process

**Direct Execution**: Deploy via Task tool to specialist agents with complete embedded context
**In-Memory Operation**: AgentTasks exist in memory during execution, no file tracking required
**Quality**: Built-in validation, testing, documentation updates
**Completion**: Comprehensive summary with automatic memory storage

## Execution Pattern

### Task Tool Invocation
**MANDATORY PROCESS:**
1. **AgentTask Creation**: Generate complete AgentTask with embedded context in memory
2. **Agent Selection**: Identify appropriate specialist agent for work type
3. **Task Tool Deployment**: Deploy AgentTask context directly to agent via Task tool
4. **Isolated Execution**: Agent executes with self-contained context
5. **Summary Generation**: Agent provides comprehensive execution summary
6. **Memory Storage**: Successful patterns automatically stored in memory/

### Context Requirements
**EMBEDDED IN AGENTTASK:**
- Complete project context from CLAUDE.md
- Configuration values (no runtime lookups)
- Memory search results for relevant patterns
- Best practices applicable to work type
- All required file paths and content samples

### Execution Isolation
**AGENT EXECUTION ENVIRONMENT:**
- Self-contained context (no external dependencies)
- All configuration pre-embedded
- Memory patterns included in AgentTask
- Project boundaries clearly defined
- Quality standards embedded

## Requirements

**Context**: Complete project context, embedded configuration, memory patterns
**Workflow**: Version management, git privacy, documentation per workflow settings
**Memory**: Automatic storage of successful patterns and solutions
**No File Tracking**: AgentTasks operate in memory, no file lifecycle management

## Quality Standards

### Pre-Execution Validation
- AgentTask context completeness verified
- All placeholders resolved
- Configuration values embedded
- Agent assignment appropriate

### Execution Monitoring
- Agent stays within defined scope
- Quality standards maintained
- Progress tracked through execution checklist

### Post-Execution
- Requirements satisfaction validated
- Learning patterns captured
- Memory storage completed
- Summary provided to user

---
*Direct Task tool execution with in-memory AgentTasks and embedded context*