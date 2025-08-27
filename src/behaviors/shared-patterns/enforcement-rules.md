# Enforcement Rules

**MANDATORY:** Shared enforcement patterns and validation functions

## Subagent Scope Validation

### Scope Rules
- **Block:** Subagent working directory starting with ~/.claude/
- **Block:** File operations to ~/.claude/ (except installation)
- **Allow:** Project root working directories and project file operations

## Role System Enforcement

### Role-System Alignment
**DYNAMIC DECISION PROCESS**: Role assignments determined through PM + Architect collaboration:
- **Factor 1**: Project scope/system nature (AI-AGENTIC/CODE-BASED/HYBRID)
- **Factor 2**: Work type analysis (infrastructure, security, database, implementation, etc.)
- **Process**: PM analyzes → Creates specialist architect → Joint role assignment with rationale

### PM+Architect Collaboration
1. PM analyzes requirements
2. PM selects domain architect
3. Joint role assignment and document rationale in PRB
4. Validate technology expertise and specialist creation capability

## Detection Functions

### Work Pattern Detection
**MANDATORY:** Block work without active PRB context

**BLOCKING MECHANISM:**
- Detect work intent patterns
- Verify active PRB context exists
- Check execution scope (main vs subagent)
- BLOCK if main scope execution detected
- Provide mandatory PRB creation guidance

**BLOCKING CONDITIONS:**
- Work intent detected AND no active PRB context
- Direct execution attempt in main scope
- Tool usage (Edit/Write/Bash) without PRB authorization
- File operations outside PRB execution flow

### Work Intent Categories
**WORK PATTERNS (TRIGGER PRB):** implement, create, build, fix, update, modify, deploy, install, configure, delete, remove, file operations

**INFORMATION PATTERNS (ALLOW THROUGH):** show, display, read, list, check, analyze, explain, describe, find, search, status inquiries, What/How/Why/Should/Can questions

### @Role Pattern Classification
**@Role Work Assignments (TRIGGER PRB):** "@Role implement/fix/deploy/build [item]" → Direct assignments

**@Role Information Requests (NO PRB):** "@Role what/how/why/status [query]" → Consultations

## Query Classification

**MANDATORY:** Distinguish questions (ALLOW THROUGH) vs commands (TRIGGER PRB)

### Question Patterns (ALLOW THROUGH)
**QUESTION INDICATORS:** what/how/why/should/can/will + recommend/suggest/advise/status/progress/strategy/approach/plan/understand/learn

**CONVERSATIONAL PATTERNS (ALLOW THROUGH):** Planning discussions, status inquiries, knowledge sharing, architecture consultations, @Role advisory requests

**DETECTION LOGIC:** 
- Work intent + no active PRB + main scope → IMMEDIATE BLOCK
- Tool usage + no PRB authorization → BLOCK TOOL ACCESS
- Information request + no work context → ALLOW
- Compound pattern with work component → PRIORITIZE WORK, TRIGGER PRB

### Tool-Specific Violations
**BLOCKED TOOLS IN MAIN SCOPE:** Edit/MultiEdit/Write (file modification), Bash (system commands except read-only), Creation tools

**EXCEPTIONS:** Read operations, LS/Glob/Grep, non-modifying operations always allowed

### False Completion Detection
**Block completion claims without checklist validation**

## Error Messages

### Standard Errors
- `SUBAGENT_REQUIRED`: "❌ PRB execution requires subagent"
- `CREATION_BLOCKED`: "❌ Work items must be created by main agent"
- `ROLE_MISMATCH`: "❌ Role {role} invalid for {system_type}"
- `SCOPE_VIOLATION`: "❌ Operation outside project boundaries"
- `DIRECT_EXECUTION_BLOCKED`: "❌ All work requires PRB - use @Role pattern"
- `MAIN_SCOPE_EXECUTION_BLOCKED`: "❌ Work execution attempted in main scope without PRB"
- `TOOL_ACCESS_BLOCKED`: "❌ Tool usage requires active PRB execution context"

### Recovery Actions
| Error | Recovery |
|-------|----------|
| Missing PRB | Auto-generate with correct template |
| Wrong context | Redirect to appropriate context |
| Role mismatch | Trigger PM+Architect process |
| Scope violation | Constrain to project root |

---
*Shared enforcement patterns for intelligent-claude-code*