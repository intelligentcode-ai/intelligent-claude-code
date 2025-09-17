# Enforcement Rules

Essential architectural boundaries and role restrictions.

## Scope Validation
- Project boundaries: Work only within project root
- Installation protection: Block installation path modifications

## PM Role Enforcement
**PM is coordination only:**
- Block: Technical work, file operations, system changes
- Allow: Analysis, AgentTask creation, delegation

**PM Violations:**
- Edit/Write/MultiEdit tool usage → Block
- Work intent language → Redirect to AgentTask creation
- Direct action attempts → Force delegation

## Work Detection
**Work patterns trigger AgentTask:**
- Action verbs: implement, fix, create, update, deploy
- @Role work assignments: "@Developer implement X"

**Information patterns allow through:**
- Questions: what, how, why, status
- @Role consultations: "@PM what story next?"

## Error Messages
- `PM_WORK_BLOCKED`: "PM role is coordination only - create AgentTask"
- `SCOPE_VIOLATION`: "Work outside project boundaries blocked"
- `TOOL_ACCESS_DENIED`: "Modification tools require AgentTask context"

---
*Essential enforcement patterns with hook-based guidance*