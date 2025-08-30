# PRB Enforcement

**MANDATORY:** Use PRB system with templates for all work. Block direct execution.

## Imports
@./shared-patterns/behavioral-decision-matrix.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/enforcement-rules.md
@./shared-patterns/main-scope-blocking.md
@./shared-patterns/continuation-work-patterns.md

## Core Rules

### Creation vs Execution
**CREATION:** Main agent (Stories/Bugs/EPICs/PRBs, templates, config)
**EXECUTION:** Subagent (PRB implementation, file ops, git)

### Detection & Blocking
**WORK INTENT (ULTRA-STRICT):** ALL action verbs including fix, change, update, modify, adjust, correct, improve, enhance, optimize, refactor, create, add, insert, generate, build, make, write, implement, develop, delete, remove, clean, purge, clear, eliminate, drop, deploy, install, configure, setup, run, execute, start, stop, restart, migrate, backup, restore, sync, merge, commit, push, pull

**INFORMATION REQUEST:** Pure questions with what, how, why, should, can, will + @Role consultations WITHOUT work commitment

### Template Enforcement (ZERO TOLERANCE)
- Manual PRB creation → BLOCK → "Use template hierarchy"
- Unresolved placeholders → BLOCK → "Resolve all placeholders"
- Runtime config lookup → BLOCK → "Embed config values"
- Wrong template source → BLOCK → "Use template hierarchy only"

### Direct Execution Blocking

#### Main Scope Execution Prevention (NUCLEAR ENFORCEMENT)
**MANDATORY:** ZERO TOLERANCE for main scope work execution. ALL work execution must follow PRB+agent pattern.

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

#### Comprehensive Blocking Patterns (ULTRA-AGGRESSIVE)
**BLOCK EVERYTHING:** Main scope work attempts including:
- Direct file creation/modification/deletion without PRB
- Direct system configuration/installation without PRB
- Direct deployment/service operations without PRB
- Direct code changes/fixes/improvements without PRB
- Direct bug fixes/adjustments/corrections without PRB
- Direct cleanup/optimization/refactoring without PRB
- ANY action verb + target object combination

**ULTRA-STRICT ERROR MESSAGING:**
```
⛔ ARCHITECTURAL PROTECTION ENGAGED ⛔
VIOLATION: Main scope work execution attempt detected
SYSTEM RULE: ZERO TOLERANCE for direct work execution

BLOCKED PATTERN: [detected work pattern]
ARCHITECTURAL INTEGRITY: PRB+Agent pattern is NON-NEGOTIABLE

RECOVERY PROCESS:
1. Generate PRB using @Role pattern
2. Deploy via Task tool to authorized agent
3. Agent executes with full tool authorization

BLOCKING REASON: Maintains absolute architectural integrity and execution traceability
```

#### Implementation Commitment Detection (COMPREHENSIVE)
**TRIGGER IMMEDIATE BLOCKING FOR:**
- ANY action verbs indicating work commitment (ALL verbs from ultra-strict list)
- File operation requests (create, modify, delete, move, copy file)
- @Role assignments with work context (@Role implement/fix/deploy/update/change)
- System modification requests (install, update, configure, setup, restart)
- Subtle work indicators ("Let me fix...", "I'll update...", "Going to change...")
- Quick fix attempts ("Just need to...", "Quick adjustment...", "Simple change...")

**ALLOW THROUGH ONLY:**
- Pure information requests without work implications (show, explain, describe, analyze)
- Status inquiries with no action intent (what's the status, how is progress)
- Planning discussions explicitly without implementation commitment
- @Role consultations (what/how/why patterns) without work assignment

### Tool-Level Main Scope Blocking

**MANDATORY:** Block file modification tools (Edit/Write/MultiEdit) in main scope when work patterns are detected.

#### Blocked Tools for Work Intent
**BLOCKED TOOLS IN MAIN SCOPE:**
- `Edit` tool for file modifications
- `MultiEdit` tool for multi-file changes
- `Write` tool for file creation
- `Bash` tool for system modifications (except read-only operations)

**BLOCKING CONDITIONS:**
- Work intent detected (implement, create, build, fix, update, modify, delete, install, deploy, configure, setup)
- Main scope execution context (not in active PRB subagent)
- File modification attempt without PRB authorization

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

#### Tool Authorization Context
**AUTHORIZED TOOL USAGE:**
- Read operations (Read, LS, Glob, Grep) - always allowed
- Non-modifying system operations (status checks, information gathering)
- Configuration loading and validation
- Memory search operations

**UNAUTHORIZED TOOL USAGE:**
- File modifications without PRB context
- System changes without PRB authorization
- Direct implementation attempts in main scope
- Bypassing PRB workflow through tool usage

#### Automatic PRB Generation Trigger
**WHEN TOOLS BLOCKED:** Immediately trigger automatic PRB generation
1. **Detect Blocked Tool Usage:** Work intent + tool request in main scope
2. **Capture Work Context:** Extract user intent and requirements
3. **Auto-Generate PRB:** Create appropriate PRB with complete context
4. **Execute via Subagent:** Deploy PRB through Task tool to authorized agent
5. **Complete Work:** Agent executes with full tool authorization

## Auto-Correction
| Violation | Action |
|-----------|--------|
| Manual PRB creation | Force template usage |
| Missing template sections | Load complete template |
| Unresolved placeholders | Resolve all placeholders |
| Runtime config lookup | Embed config values |
| PRB >15 points | Auto-breakdown |
| Wrong role assignment | PM+Architect collaboration |

## Pattern Detection
**@Role mentions** → Generate PRB → Subagent execution
**Work items (STORY-XXX, BUG-XXX)** → Convert to PRB → Execute
**Direct work** → Block → Generate PRB

## System Nature Validation
**AI-AGENTIC:** @AI-Engineer for behaviors, memory, PRBs
**CODE-BASED:** @Developer, @Backend-Tester for implementation
**Mismatch:** Enforce PM+Architect collaboration

## Execution Precision Controls

### Proportional Response Rules
**MANDATORY:** Response complexity must match request complexity. Prevent overshooting user intent.

#### Simple Request Detection
**SIMPLE REQUEST INDICATORS:**
- Single action verbs (fix, show, create, update)
- Specific target mentioned (fix this bug, show status)
- No additional scope implied
- Direct, focused intent

#### Simple Response Requirements
**FOR SIMPLE REQUESTS:**
- Perform ONLY the requested action
- Do NOT expand scope automatically
- Do NOT add unrequested features
- Do NOT include related improvements unless explicitly asked

#### Scope Expansion Blocking
**BLOCK AUTOMATIC SCOPE EXPANSION:**
- "While I'm at it, I'll also..."
- "This would be a good time to..."
- "I notice we could also..."
- "Let me also improve..."

**BLOCKING PATTERN:**
```
❌ SCOPE EXPANSION BLOCKED: Performing only requested actions
USER REQUEST: [specific action]
SYSTEM RESPONSE: [exact match to request only]
BLOCKED ADDITIONS: [list any prevented scope expansion]
```

#### Proportional Complexity Matching
**REQUEST-RESPONSE ALIGNMENT:**
- **Single file change** → Single file modification only
- **Simple bug fix** → Fix the specific bug only
- **Show information** → Display requested information only
- **Status inquiry** → Current status only, no recommendations

## File Generation Control

### Automatic File Generation Prevention
**MANDATORY:** Block all automatic file generation. Files created ONLY on explicit user request.

#### Blocked Automatic Generation Patterns
**BLOCK ALL AUTOMATIC:**
- Summary file creation
- Temporary file generation
- Documentation files without explicit request
- Report files without user direction
- Analysis output files
- Configuration backups without request

**BLOCKING MECHANISM:**
```
❌ FILE GENERATION BLOCKED: Automatic file creation forbidden
USER REQUEST: [analyze request for file creation intent]
ALLOWED: Read, analyze, display information only
BLOCKED: Creating files without explicit "create file" request
```

#### File Creation Intent Detection
**EXPLICIT FILE CREATION REQUESTS (ALLOW):**
- "Create a file..."
- "Write to file..."
- "Generate a [filename]..."
- "Save this to..."
- Direct file creation commands with specific names

**AUTOMATIC GENERATION (BLOCK):**
- Summary generation without file request
- Temporary file creation for analysis
- Documentation generation as side effect
- Report creation without explicit instruction

## Quality Gates
**Pre-Creation:** Template compliance, context completeness, role assignment
**Runtime:** Execution monitoring, quality maintenance, adaptation handling
**Post-Execution:** Completion verification, quality assessment, learning capture

---
*Core PRB enforcement with blocking, auto-correction, and execution precision controls*