# PRB Enforcement

**MANDATORY:** Use PRB system with templates for all work. Block direct execution.

## Imports
@./shared-patterns/behavioral-decision-matrix.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/enforcement-rules.md
@./shared-patterns/main-scope-blocking.md
@./shared-patterns/continuation-work-patterns.md
@./shared-patterns/pm-role-enforcement.md

## Core Rules

### Creation vs Execution
**CREATION:** Main agent (Stories/Bugs/EPICs/PRBs, templates, config)
**EXECUTION:** Subagent (PRB implementation, file ops, git)

### Detection & Blocking
**WORK INTENT (ULTRA-STRICT):** ALL action verbs including fix, change, update, modify, adjust, correct, improve, enhance, optimize, refactor, create, add, insert, generate, build, make, write, implement, develop, delete, remove, clean, purge, clear, eliminate, drop, deploy, install, configure, setup, run, execute, start, stop, restart, migrate, backup, restore, sync, merge, commit, push, pull

**INFORMATION REQUEST:** Pure questions with what, how, why, should, can, will + @Role consultations WITHOUT work commitment

### Template Enforcement
- Manual PRB creation → BLOCKED → "Use template hierarchy"
- Unresolved placeholders → BLOCKED → "Resolve all placeholders" 
- Runtime config lookup → BLOCKED → "Embed config values"
- Wrong template source → BLOCKED → "Use template hierarchy only"

### Main Scope Work Blocking

#### Main Scope Execution Prevention (NUCLEAR ENFORCEMENT)
**MANDATORY:** ZERO TOLERANCE for main scope work execution. ALL work execution must follow PRB+agent pattern.

**BLOCKED ACTIONS:** All work execution in main scope including:
- Direct file operations without PRB
- System configuration without PRB
- Code changes without PRB
- Any implementation without PRB context

**ERROR MESSAGE:**
```
🚫 MAIN SCOPE EXECUTION ABSOLUTELY FORBIDDEN 🚫
VIOLATION: Direct work execution detected in main scope
ARCHITECTURAL RULE: ALL WORK → PRB → AGENT EXECUTION

DETECTED PATTERN: [specific pattern detected]
BLOCKED ACTION: [attempted action]

THIS IS NOT NEGOTIABLE:
- Main scope = PRB creation ONLY
- Subagent = Work execution ONLY
- No exceptions, no workarounds, no compromises

MANDATORY PROCESS:
1. User Request → PRB Generation (main scope)
2. PRB → Task Tool → Agent Execution (subagent)

REQUIRED ACTION: Generate PRB using @Role pattern FIRST
```

### Tool-Level Main Scope Blocking

**MANDATORY:** Block file modification tools (Edit/Write/MultiEdit) in main scope when work patterns are detected.

#### Blocked Tools for Work Intent
**BLOCKED TOOLS IN MAIN SCOPE:**
- Edit, MultiEdit, Write tools for modifications
- Bash tool for system changes (read-only allowed)

**BLOCKING CONDITIONS:**
- Work intent detected
- Main scope context (not in active PRB)
- No PRB authorization

**NUCLEAR TOOL BLOCKING:**
```
⛔ TOOL ACCESS ABSOLUTELY DENIED ⛔
TOOL: [Edit/Write/MultiEdit/Bash]
CONTEXT: Main scope work execution attempt
VIOLATION: Tool usage without active PRB context

ARCHITECTURAL RULE: Tools reserved EXCLUSIVELY for authorized subagent execution
BLOCKING REASON: Maintains PRB-driven execution pattern

DETECTED PATTERN: [work pattern detected]
BLOCKED ACTION: [attempted action]

MANDATORY RECOVERY PROCESS:
1. Create PRB using @Role pattern
2. Deploy PRB via Task tool to authorized agent
3. Agent executes with FULL tool authorization

NO EXCEPTIONS - NO SHORTCUTS - NO COMPROMISES
```

## Auto-Correction Patterns

| Violation | Action |
|-----------|--------|
| Manual PRB creation | Force template usage |
| Missing template sections | Load complete template |
| Unresolved placeholders | Resolve placeholders |
| Runtime config lookup | Embed config values |
| PRB exceeds 15 points | Auto-breakdown |
| Wrong role assignment | PM+Architect collaboration |

## Pattern Detection Rules

**@Role mentions** → Generate PRB → Subagent execution
**Work items** → Convert to PRB → Execute
**Direct work** → Block → Generate PRB

## System Nature Validation

**AI-AGENTIC:** @AI-Engineer for behaviors, memory, PRBs
**CODE-BASED:** @Developer, @Backend-Tester for implementation
**HYBRID:** PM+Architect collaboration for role selection

## Quality Gates

**Pre-Creation:** Template compliance, context completeness, role assignment
**Runtime:** Execution monitoring, quality maintenance
**Post-Execution:** Completion verification, learning capture

---
*Core PRB enforcement with blocking, auto-correction, and execution precision controls*
