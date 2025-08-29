# PRB Enforcement

**MANDATORY:** Use PRB system with templates for all work. Block direct execution.

## Imports
@./shared-patterns/behavioral-decision-matrix.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/enforcement-rules.md

## Core Rules

### Creation vs Execution
**CREATION:** Main agent (Stories/Bugs/EPICs/PRBs, templates, config)
**EXECUTION:** Subagent (PRB implementation, file ops, git)

### Detection & Blocking
**WORK INTENT:** implement, create, build, fix, update, modify, delete, install, deploy, configure, setup
**INFORMATION REQUEST:** Questions with what, how, why, should, can, will + @Role questions

### Template Enforcement (ZERO TOLERANCE)
- Manual PRB creation → BLOCK → "Use src/prb-templates/"
- Unresolved placeholders → BLOCK → "Resolve all placeholders"
- Runtime config lookup → BLOCK → "Embed config values"
- Wrong template source → BLOCK → "Use src/prb-templates/ only"

### Direct Execution Blocking

#### Main Scope Execution Prevention
**MANDATORY:** ALL work execution must follow PRB+agent pattern. Direct main scope execution is BLOCKED.

```
❌ MAIN SCOPE EXECUTION BLOCKED: All work requires PRB+agent execution
VIOLATION: Detected work intent without active PRB context
REQUIRED ACTION: Use @Role pattern to generate PRB first

Examples:
- @AI-Engineer implement this feature
- @Developer fix this bug  
- @DevOps-Engineer deploy the application
- @Database-Engineer optimize queries

Process: User Request → PRB Generation → Agent Execution
```

#### Comprehensive Blocking Patterns
**BLOCK ALL:** Main scope implementation attempts
- Direct file creation/modification without PRB
- Direct system configuration without PRB
- Direct deployment operations without PRB
- Direct code changes without PRB

**ERROR MESSAGING:**
```
❌ ARCHITECTURE VIOLATION: Main scope work execution forbidden
SYSTEM DESIGN: Work requests → PRB creation → Subagent execution
CORRECTIVE ACTION: Generate PRB using @Role pattern before proceeding
BLOCKING REASON: Maintains architectural integrity and execution traceability
```

#### Implementation Commitment Detection
**TRIGGER BLOCKING FOR:**
- Action verbs indicating work commitment (implement, create, build, fix, deploy)
- File operation requests (create file, modify file, configure system)
- @Role assignments with work context (@Role implement/fix/deploy)
- System modification requests (install, update, configure, setup)

**ALLOW THROUGH:**
- Pure information requests (show, explain, describe, analyze)
- Status inquiries (what's the status, how is progress)
- Planning discussions without implementation commitment
- Architecture consultations without immediate execution

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

**BLOCKING MECHANISM:**
```
❌ TOOL ACCESS BLOCKED: Work execution requires PRB authorization
VIOLATION: Attempted [Edit/Write/MultiEdit] without active PRB context
DETECTED INTENT: [work pattern detected]
REQUIRED ACTION: Generate PRB first using @Role pattern

Examples:
- User: "Fix the authentication bug" → Block Edit tool → Generate PRB
- User: "Create a new configuration file" → Block Write tool → Generate PRB
- User: "Update the documentation" → Block MultiEdit tool → Generate PRB

Process: Work Request → PRB Generation → Tool Authorization → Subagent Execution
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