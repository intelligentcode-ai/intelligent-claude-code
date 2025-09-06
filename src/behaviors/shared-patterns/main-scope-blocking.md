# Main Scope Blocking

**MANDATORY:** ZERO TOLERANCE for main scope work execution. ALL work MUST use PRB+agent pattern.

## Imports

@./work-detection-patterns.md
@./pm-role-blocking-patterns.md

## NUCLEAR BLOCKING MESSAGES

### Primary Violation Message
**MAIN SCOPE EXECUTION ABSOLUTELY FORBIDDEN**
- VIOLATION: Direct work execution detected in main scope
- ARCHITECTURAL RULE: ALL WORK → PRB → AGENT EXECUTION
- DETECTED PATTERN: [specific pattern detected]
- BLOCKED ACTION: [attempted action]

**MANDATORY PROCESS:**
1. User Request → PRB Generation (main scope)
2. PRB → Task Tool → Agent Execution (subagent)
3. NO EXCEPTIONS, NO SHORTCUTS, NO COMPROMISES

**REQUIRED ACTION:** Generate PRB using @Role pattern FIRST

### Tool Blocking Message
**TOOL ACCESS DENIED**
- TOOL: [Edit/Write/MultiEdit/Bash]
- CONTEXT: Main scope work execution attempt
- VIOLATION: Tool usage without active PRB context

**ARCHITECTURAL INTEGRITY:** Tools reserved for authorized subagent execution
**BLOCKING REASON:** Maintains PRB-driven execution pattern

**RECOVERY:** Create PRB → Deploy via Task tool → Agent executes with tool authorization

### Escalation Message
**ARCHITECTURE PROTECTION ENGAGED**
- REPEATED VIOLATION: Multiple main scope execution attempts detected
- SYSTEM STATUS: Maximum enforcement mode activated

**THIS IS NOT NEGOTIABLE:**
- Main scope = PRB creation ONLY
- Subagent = Work execution ONLY
- No exceptions, no workarounds, no compromises

**COMPLIANCE REQUIRED:** Follow PRB+Agent pattern without deviation

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
