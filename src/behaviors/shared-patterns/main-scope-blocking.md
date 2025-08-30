# Main Scope Blocking

<<<<<<< HEAD
**MANDATORY:** Block all work execution in main scope. Enforce PRB+agent pattern.

## Core Blocking Rules

### Main Scope Work Prevention
**NUCLEAR ENFORCEMENT:** ZERO TOLERANCE for main scope work execution.

**BLOCKED ACTIONS:** All work execution in main scope:
- Direct file operations without PRB
- System configuration without PRB 
- Code changes without PRB
- Any implementation without PRB context

**ERROR MESSAGE:**
```
MAIN SCOPE EXECUTION BLOCKED
ARCHITECTURAL RULE: ALL WORK → PRB → AGENT EXECUTION
REQUIRED ACTION: Generate PRB using @Role pattern first
```

### Work Pattern Detection
**WORK INTENT TRIGGERS (IMMEDIATE BLOCKING):**
- Action verbs: implement, create, build, fix, update, modify, deploy, install, configure, delete, remove
- File operations: create file, modify file, delete file, move file
- System changes: install package, configure service, setup environment
- @Role assignments with work: "@Developer implement X", "@DevOps deploy Y"

**INFORMATION PATTERNS (ALLOW THROUGH):**
- Query verbs: show, display, read, list, check, analyze, examine, explain, describe
- Status inquiries: what's the status, how is progress, current state
- Planning discussions: should we, what if, how about, what's the approach
- @Role consultations: "@Role what would you recommend"

### Tool Access Control

**BLOCKED TOOLS IN MAIN SCOPE:**
- Edit, MultiEdit, Write tools for modifications
- Bash tool for system changes (read-only allowed)

**BLOCKING CONDITIONS:**
- Work intent detected AND main scope context AND no PRB authorization

**AUTHORIZED TOOLS (ALWAYS ALLOWED):**
- Read operations (Read, LS, Glob, Grep)
- Configuration loading and memory search
- Non-modifying system operations

### Detection Logic

**WORK DETECTION PROCESS:**
1. **Parse User Input**: Extract verbs and context patterns
2. **Intent Classification**: Work vs information vs planning
3. **Context Check**: Main scope vs subagent execution context  
4. **PRB Authorization**: Check for active PRB execution context
5. **Block or Allow**: Apply blocking rules with appropriate messaging

### Automatic PRB Generation

**WHEN WORK BLOCKED:** Automatically trigger PRB generation
1. **Capture Requirements**: Extract user intent and work context
2. **Generate PRB**: Create appropriate PRB with complete context
3. **Deploy Agent**: Execute via Task tool with authorized agent
4. **Complete Work**: Agent performs work with full tool access

### Implementation Commitment Detection

**SUBTLE WORK INDICATORS (ALSO BLOCKED):**
- "Let me fix..." patterns
- "I'll update..." commitments  
- "Going to change..." statements
- "Just need to..." quick fix attempts
- "Simple change..." minimization patterns

### Scope Validation

**PROJECT BOUNDARY ENFORCEMENT:**
- All work must be within project root and subdirectories
- Block operations outside project scope
- Validate project context before any work authorization

**ERROR EXAMPLES:**
```
SCOPE VIOLATION: Operation outside project boundaries
DETECTED PATH: /external/path/
PROJECT ROOT: /Users/user/project/
REQUIRED: All operations within project scope only
```

## Integration Points

### With PRB Enforcement
- Provides core blocking mechanism for PRB enforcement behavior
- Ensures architectural integrity through consistent blocking

### With Work Detection
- Implements work pattern recognition and blocking logic
- Differentiates between work intent and information requests

### With Tool Authorization
- Controls tool access based on execution context
- Prevents unauthorized tool usage in main scope

### With Error Recovery
- Triggers automatic PRB generation when work is blocked
- Provides clear recovery path through @Role patterns

## Error Messages

**MAIN_SCOPE_WORK_BLOCKED**: "MAIN SCOPE EXECUTION BLOCKED: ALL WORK → PRB → AGENT EXECUTION"
**TOOL_ACCESS_DENIED**: "TOOL ACCESS DENIED: Work tools reserved for authorized agents"
**SCOPE_VIOLATION**: "SCOPE VIOLATION: Operation outside project boundaries"
**PRB_REQUIRED**: "PRB REQUIRED: Generate PRB using @Role pattern first"

---
*Main scope blocking patterns for architectural integrity*
=======
**MANDATORY:** ZERO TOLERANCE for main scope work execution. ALL work MUST use PRB+agent pattern.

## ABSOLUTE BLOCKING RULES

### ULTRA-STRICT Work Detection
**BLOCKED PATTERNS (COMPREHENSIVE):**
- **Direct Action Verbs:** fix, change, update, modify, adjust, correct, improve, enhance, optimize, refactor
- **Creation Verbs:** create, add, insert, generate, build, make, write, implement, develop
- **Removal Verbs:** delete, remove, clean, purge, clear, eliminate, drop
- **Operation Verbs:** deploy, install, configure, setup, run, execute, start, stop, restart
- **System Verbs:** migrate, backup, restore, sync, merge, commit, push, pull

### ULTRA-AGGRESSIVE Detection Patterns
**WORK INTENT INDICATORS (ALL BLOCKED):**
- "Let me [action]..." → BLOCKED
- "I'll [action]..." → BLOCKED
- "Going to [action]..." → BLOCKED
- "Need to [action]..." → BLOCKED
- "Should [action]..." → BLOCKED
- "Will [action]..." → BLOCKED
- "[Action] this/that..." → BLOCKED
- "Quick [action]..." → BLOCKED
- "Simple [action]..." → BLOCKED

### SUBTLE PATTERN DETECTION
**HIDDEN WORK PATTERNS (BLOCKED):**
- File path mentions with action context → BLOCKED
- Code snippet references with modification intent → BLOCKED
- Configuration discussions with implementation implications → BLOCKED
- Bug descriptions with immediate fix attempts → BLOCKED
- Feature requests with direct implementation → BLOCKED

## NUCLEAR BLOCKING MESSAGES

### Primary Violation Message
```
🚫 MAIN SCOPE EXECUTION ABSOLUTELY FORBIDDEN 🚫
VIOLATION: Direct work execution detected in main scope
ARCHITECTURAL RULE: ALL WORK → PRB → AGENT EXECUTION

DETECTED PATTERN: [specific pattern detected]
BLOCKED ACTION: [attempted action]

MANDATORY PROCESS:
1. User Request → PRB Generation (main scope)
2. PRB → Task Tool → Agent Execution (subagent)
3. NO EXCEPTIONS, NO SHORTCUTS, NO COMPROMISES

REQUIRED ACTION: Generate PRB using @Role pattern FIRST
```

### Tool Blocking Message
```
⛔ TOOL ACCESS DENIED ⛔
TOOL: [Edit/Write/MultiEdit/Bash]
CONTEXT: Main scope work execution attempt
VIOLATION: Tool usage without active PRB context

ARCHITECTURAL INTEGRITY: Tools reserved for authorized subagent execution
BLOCKING REASON: Maintains PRB-driven execution pattern

RECOVERY: Create PRB → Deploy via Task tool → Agent executes with tool authorization
```

### Escalation Message
```
🔒 ARCHITECTURE PROTECTION ENGAGED 🔒
REPEATED VIOLATION: Multiple main scope execution attempts detected
SYSTEM STATUS: Maximum enforcement mode activated

THIS IS NOT NEGOTIABLE:
- Main scope = PRB creation ONLY
- Subagent = Work execution ONLY
- No exceptions, no workarounds, no compromises

COMPLIANCE REQUIRED: Follow PRB+Agent pattern without deviation
```

## COMPREHENSIVE WORK CATEGORIES

### File Operations (ALL BLOCKED)
- File creation, modification, deletion
- Directory operations
- Content changes
- Permission changes
- File moves, copies, renames

### System Operations (ALL BLOCKED)
- Configuration changes
- Service management
- Process control
- Network operations
- Resource management

### Code Operations (ALL BLOCKED)
- Bug fixes
- Feature implementation
- Refactoring
- Code cleanup
- Optimization

### Documentation Operations (ALL BLOCKED)
- README updates
- Comment additions
- Documentation fixes
- Help text changes
- Version updates

## DETECTION TRIGGERS

### Context Analysis
**IMMEDIATE BLOCKING:**
- Work intent + main scope context = BLOCK
- Tool usage + no PRB authorization = BLOCK
- Action verb + target object = BLOCK
- Implementation language + specific task = BLOCK

### Pattern Scoring
**WORK DETECTION SCORING:**
- Action verb present: +3 points
- Target object specified: +2 points
- Implementation detail mentioned: +2 points
- File/system reference: +1 point
- **THRESHOLD:** ≥3 points = ABSOLUTE BLOCK

### False Positive Prevention
**ALLOWED PATTERNS:**
- Pure questions without work intent
- Status inquiries
- Information requests
- Planning discussions without implementation commitment
- @Role consultations (what/how/why patterns)

## ENFORCEMENT MECHANISMS

### Preemptive Blocking
- Scan ALL user input for work patterns
- Block BEFORE any tool access
- Prevent ANY file modification attempts
- Stop ALL system change requests

### Error Recovery
1. **Detect Violation** → Show nuclear blocking message
2. **Capture Intent** → Extract user work requirements
3. **Force PRB Creation** → Generate appropriate PRB automatically
4. **Deploy Agent** → Execute via Task tool with full context
5. **Complete Work** → Agent performs authorized execution

### Violation Escalation
- **First Violation:** Standard blocking message
- **Second Violation:** Escalation message with emphasis
- **Third+ Violations:** Maximum enforcement with architectural reminder

---
*Zero tolerance main scope blocking with nuclear enforcement*
>>>>>>> origin/main
