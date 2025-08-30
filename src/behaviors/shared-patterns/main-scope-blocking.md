# Main Scope Blocking

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