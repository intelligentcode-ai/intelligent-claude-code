# Violation Detection Patterns

**MANDATORY:** Real-time violation detection with immediate blocking and auto-correction guidance.

## Core Detection Logic

### Work Intent Detection
**IMPLEMENTATION INTENT:** implement, create, build, fix, update, modify, delete, install, deploy, configure, setup
**INFORMATION REQUEST:** Questions with what, how, why, should, can, will + @Role questions + status/analysis requests

### Tool-Specific Violations
**WRITE/EDIT VIOLATIONS:** File operations without active PRB context
**BASH VIOLATIONS:** State-changing commands without PRB authorization

## Error Messages

### Unmistakable Error Messages

**DIRECT_EXECUTION_BLOCKED:**
```
❌ DIRECT EXECUTION BLOCKED: Implementation work requires PRB

BLOCKED OPERATION: {operation_description}
REASON: No active PRB context detected

REQUIRED ACTION: Use @Role pattern to generate PRB first
Example: @AI-Engineer implement this feature

NOTE: Questions and information requests are always allowed
```

**TOOL_USE_VIOLATION:**
```
❌ TOOL USE BLOCKED: File/system operations require PRB context

Tool: {tool_name}
Operation: {operation_description}  

REQUIRED ACTION:
1. Generate PRB using @Role pattern: @{suggested_role} {work_description}
2. Execute the generated PRB with embedded context
```

**WORK_WITHOUT_PRB:**
```
❌ WORK ATTEMPT BLOCKED: Generate PRB using @Role pattern

CORRECTION GUIDE:
• For implementation: @Developer {task_description}
• For infrastructure: @DevOps-Engineer {task_description}  
• For AI/behavioral: @AI-Engineer {task_description}
• For database work: @Database-Engineer {task_description}
• For security: @Security-Engineer {task_description}
```

## Integration Points

- **PRB Enforcement**: Feeds into existing enforcement priorities
- **Tool Execution**: Pre-tool validation and context preservation
- **Memory System**: Pattern storage and continuous learning

---
*Violation detection patterns for comprehensive PRB framework enforcement*