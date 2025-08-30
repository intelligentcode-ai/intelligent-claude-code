# Enforcement Rules

**MANDATORY:** Shared enforcement patterns and validation functions

## Imports

@./installation-path-detection.md

## Subagent Scope Validation

### Scope Rules
- **Block:** Subagent working directory starting with {get_install_path()}/
- **Block:** File operations to {get_install_path()}/ (except installation)
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

### Work Intent Categories (ULTRA-COMPREHENSIVE)
**WORK PATTERNS (TRIGGER PRB IMMEDIATELY):** ALL action verbs including fix, change, update, modify, adjust, correct, improve, enhance, optimize, refactor, create, add, insert, generate, build, make, write, implement, develop, delete, remove, clean, purge, clear, eliminate, drop, deploy, install, configure, setup, run, execute, start, stop, restart, migrate, backup, restore, sync, merge, commit, push, pull, move, copy, rename, edit, append, replace

**SUBTLE WORK PATTERNS (ALSO BLOCKED):** "Let me...", "I'll...", "Going to...", "Need to...", "Should...", "Will...", "Quick...", "Simple...", "Just..."

**INFORMATION PATTERNS (ALLOW THROUGH):** Pure show, display, read, list, check, analyze, explain, describe, find, search, status inquiries, What/How/Why/Should/Can questions WITHOUT work commitment or action implications

### @Role Pattern Classification
**@Role Work Assignments (TRIGGER PRB):** "@Role implement/fix/deploy/build [item]" → Direct assignments

**@Role Information Requests (NO PRB):** "@Role what/how/why/status [query]" → Consultations

## Query Classification

**MANDATORY:** Distinguish questions (ALLOW THROUGH) vs commands (TRIGGER PRB)

### Question Patterns (ALLOW THROUGH)
**QUESTION INDICATORS:** what/how/why/should/can/will + recommend/suggest/advise/status/progress/strategy/approach/plan/understand/learn

**CONVERSATIONAL PATTERNS (ALLOW THROUGH):** Planning discussions, status inquiries, knowledge sharing, architecture consultations, @Role advisory requests

**ULTRA-STRICT DETECTION LOGIC:** 
- ANY work intent + no active PRB + main scope → NUCLEAR BLOCK IMMEDIATELY
- ANY tool usage for modification + no PRB authorization → ABSOLUTE TOOL DENIAL
- Pure information request + zero work context → ALLOW CAUTIOUSLY
- ANY compound pattern with work component → PRIORITIZE WORK, FORCE PRB GENERATION
- Subtle work indicators detected → TREAT AS FULL WORK REQUEST

### Tool-Specific Violations
**BLOCKED TOOLS IN MAIN SCOPE:** Edit/MultiEdit/Write (file modification), Bash (system commands except read-only), Creation tools

**EXCEPTIONS:** Read operations, LS/Glob/Grep, non-modifying operations always allowed

### False Completion Detection
**Block completion claims without checklist validation**

## Error Messages

### Nuclear Error Messages
- `SUBAGENT_REQUIRED`: "🚫 PRB execution MUST use subagent - main scope FORBIDDEN"
- `CREATION_BLOCKED`: "⛔ Work items MUST be created by main agent - NO EXCEPTIONS"
- `ROLE_MISMATCH`: "❌ Role {role} INVALID for {system_type} - ARCHITECTURAL VIOLATION"
- `SCOPE_VIOLATION`: "🔒 Operation outside project boundaries - ABSOLUTELY FORBIDDEN"
- `DIRECT_EXECUTION_BLOCKED`: "🚫 ALL work REQUIRES PRB - use @Role pattern - NO SHORTCUTS"
- `MAIN_SCOPE_EXECUTION_BLOCKED`: "⛔ Main scope work execution ABSOLUTELY FORBIDDEN - PRB+Agent MANDATORY"
- `TOOL_ACCESS_BLOCKED`: "🔒 Tool usage REQUIRES active PRB execution context - NO EXCEPTIONS"
- `WORK_PATTERN_DETECTED`: "🚫 Work pattern detected in main scope - PRB GENERATION REQUIRED"
- `ARCHITECTURAL_VIOLATION`: "⛔ ARCHITECTURAL INTEGRITY COMPROMISED - PRB+Agent pattern NON-NEGOTIABLE"

### Recovery Actions
| Error | Recovery |
|-------|----------|
| Missing PRB | Auto-generate with correct template |
| Wrong context | Redirect to appropriate context |
| Role mismatch | Trigger PM+Architect process |
| Scope violation | Constrain to project root |

---
*Shared enforcement patterns for intelligent-claude-code*