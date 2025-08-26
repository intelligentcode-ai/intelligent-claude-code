# Enforcement Rules

**MANDATORY:** Shared enforcement patterns and validation functions

## Subagent Scope Validation

### Scope Rules
- **Block:** Subagent working directory starting with ~/.claude/
- **Block:** File operations to ~/.claude/ (except installation)
- **Allow:** Project root working directories and project file operations

## Role System Enforcement

### Role-System Alignment
**DYNAMIC DECISION PROCESS**: Role assignments determined through PM + Architect collaboration using two-factor analysis:
- **Factor 1**: Project scope/system nature (AI-AGENTIC/CODE-BASED/HYBRID)
- **Factor 2**: Work type analysis (infrastructure, security, database, implementation, etc.)
- **Process**: PM analyzes requirements → Creates specialist architect → Joint role assignment with documented rationale

### PM+Architect Collaboration
1. PM analyzes requirements
2. PM selects domain architect
3. Joint role assignment and document rationale in PRB
4. Validate technology expertise and specialist creation capability

## Detection Functions

### Work Pattern Detection
**MANDATORY:** Block work without active PRB context

**Work Intent Indicators:**
- Action verbs: implement, create, build, fix, update, modify, delete, install, deploy, configure, setup
- File operations, system changes, code modifications

**Information Request Indicators:**
- Query verbs: show, display, read, list, check, analyze, explain, describe, find, search
- @Role questions, planning queries, status requests

**Detection Logic:** Work intent + no PRB = IMMEDIATE BLOCK

### Tool-Specific Violations
- **Write/Edit:** Block without active PRB context
- **Bash:** Block state-changing commands without PRB context

### False Completion Detection
**Block completion claims without checklist validation**

## Error Messages

### Standard Errors
- `SUBAGENT_REQUIRED`: "❌ PRB execution requires subagent"
- `CREATION_BLOCKED`: "❌ Work items must be created by main agent"
- `ROLE_MISMATCH`: "❌ Role {role} invalid for {system_type}"
- `SCOPE_VIOLATION`: "❌ Operation outside project boundaries"
- `DIRECT_EXECUTION_BLOCKED`: "❌ All work requires PRB - use @Role pattern"

### Recovery Actions
| Error | Recovery |
|-------|----------|
| Missing PRB | Auto-generate with correct template |
| Wrong context | Redirect to appropriate context |
| Role mismatch | Trigger PM+Architect process |
| Scope violation | Constrain to project root |

---
*Shared enforcement patterns for intelligent-claude-code*