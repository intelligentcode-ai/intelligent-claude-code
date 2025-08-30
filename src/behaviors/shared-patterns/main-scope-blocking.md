# Main Scope Blocking

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
- "[Action] this/that..." → BLOCKED
- "Quick/Simple [action]..." → BLOCKED

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
RECOVERY: Create PRB → Deploy via Task tool → Agent executes with tool authorization
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