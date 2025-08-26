# Enforcement Rules

**PURPOSE:** Shared enforcement patterns and validation functions

## Subagent Scope Validation

**Subagent Scope Validation Rules:**
- **Block**: Working directories starting with ~/.claude/
- **Block**: File operations to ~/.claude/ (except installation)
- **Allow**: Project root working directories
- **Allow**: File operations within project scope
- **Error Messages**: Clear scope violation messages

## Role System Enforcement

### Role-System Alignment
| System Type | Valid Roles | Invalid Roles |
|-------------|------------|---------------|
| AI-AGENTIC | @AI-Engineer, @PM | @Database-Engineer for behaviors |
| CODE-BASED | @Developer, @Backend-Tester | @AI-Engineer for code impl |
| HYBRID | Joint assessment required | Single role decision |

### PM+Architect Collaboration
1. PM analyzes requirements
2. PM selects domain architect
3. Joint role assignment
4. Document rationale in PRB
5. Validate technology expertise assessment and unlimited specialist creation capability

## Detection Functions

### Real-Time Violation Detection

**UNIVERSAL PRE-TOOL VALIDATION:**
Every tool use MUST pass through violation detection before execution:

```
MANDATORY VALIDATION SEQUENCE:
1. Parse user request for work intent indicators and question patterns
2. Check current context for active PRB
3. If question patterns detected (@Role questions, planning queries) → ALLOW EXECUTION
4. If work intent detected AND no PRB context → IMMEDIATE BLOCK
5. If information request → Allow execution
6. If PRB context exists → Validate scope and proceed
```

### Work Pattern Detection

**Work Pattern Detection:**

**WORK INDICATORS:**
- **Action Verbs**: implement, create, build, fix, update, modify, delete, install, deploy, configure, setup
- **Direct Instructions**: "make this change", "add this feature", "edit the file", "update the config"
- **File Operations**: "create file X", "edit file Y", "delete file Z"
- **System Changes**: "install package", "configure service", "deploy application"
- **Code Modifications**: "add function", "fix bug", "refactor code", "optimize performance"

**INFORMATION INDICATORS:**
- **Query Verbs**: show, display, read, list, check, analyze, explain, describe, find, search
- **Status Requests**: "what's the status", "show me the current", "check the logs"
- **Analysis Requests**: "analyze the code", "explain this function", "review the architecture"

**QUESTION INDICATORS:**
- **Role Questions**: "@PM what...", "@Architect should...", "@Role can...", "@Role how..."
- **Planning Questions**: "what story next", "what should we work on", "which approach"
- **Design Questions**: "should we use", "what pattern", "which architecture"
- **Status Questions**: "what's the status", "how are we doing", "what's next"

**DETECTION PRIORITY:** Questions > Information > Work (Questions always allowed)

### Tool-Specific Violation Detection

**WRITE/EDIT TOOL VIOLATIONS:**
- Using Write/Edit tools without active PRB context
- Creating/modifying files outside PRB scope
- Configuration changes without PRB authorization
- Any file operations for implementation purposes

**BASH TOOL VIOLATIONS:**
- State-changing commands without PRB context (install, mkdir, rm, git operations)
- System configuration changes without PRB
- Any bash operations that modify system state

**VIOLATION DETECTION RESULTS:**
- **BLOCK_NO_PRB_CONTEXT**: Work operation without active PRB
- **BLOCK_OUTSIDE_PRB_SCOPE**: Operation outside PRB authorization
- **ALLOW_INFORMATION**: Information requests always allowed
- **ALLOW_AUTHORIZED_WORK**: Work within PRB scope permitted

### False Completion Detection

**False Completion Detection:**
- **Trigger Phrases**: "PRB COMPLETE", "Task finished", "Work done", "Completed"
- **Validation Required**: Must verify completion checklist before allowing completion claims
- **Block Invalid Claims**: Incomplete checklists block completion

### Documentation Compliance Detection

**Documentation Compliance Detection:**

**BLOCKED Bypass Patterns:**
- "No documentation needed", "Self-documenting code", "Skip CHANGELOG"
- "Internal change, no docs", "Documentation not affected"
- "Too technical for user docs", "Code speaks for itself"
- "No version bump needed", "Skip versioning"

**ENFORCEMENT**: Template documentation requirements are mandatory - no exceptions

## Error Messages

### Unmistakable Violation Error Messages

**DIRECT_EXECUTION_BLOCKED:**
```
❌ DIRECT EXECUTION BLOCKED: All work requires PRB

This request attempts to perform work without an active PRB context.
Every implementation, modification, or system change requires PRB framework.

REQUIRED ACTION: Use @Role pattern to generate PRB first
Example: @AI-Engineer implement this feature

BLOCKED OPERATION: {operation_description}
REASON: No active PRB context detected
```

**TOOL_USE_VIOLATION:**
```
❌ TOOL USE BLOCKED: File/system operations require PRB context

Tool: {tool_name}
Operation: {operation_description}
Target: {target}

VIOLATION: Attempting to use {tool_name} without active PRB context
REQUIREMENT: All file and system modifications require PRB authorization

REQUIRED ACTION:
1. Generate PRB: @{suggested_role} {work_description}
2. Execute the generated PRB with embedded context
```

**WORK_WITHOUT_PRB:**
```
❌ WORK ATTEMPT BLOCKED: Generate PRB using @Role pattern

Detected Work Intent: {work_indicators}
Current Context: No active PRB

CORRECTION GUIDE:
• For implementation: @Developer {task_description}
• For infrastructure: @DevOps-Engineer {task_description}
• For AI/behavioral: @AI-Engineer {task_description}
• For database work: @Database-Engineer {task_description}
```

### Standard System Errors
- `SUBAGENT_REQUIRED`: "❌ PRB execution requires subagent"
- `CREATION_BLOCKED`: "❌ Work items must be created by main agent"
- `ROLE_MISMATCH`: "❌ Role {role} invalid for {system_type}"
- `SCOPE_VIOLATION`: "❌ Operation outside project boundaries"
- `INCOMPLETE_PRB`: "❌ PRB missing required sections"

### Documentation Compliance Errors
- `DOCUMENTATION_SKIPPED`: "❌ Template documentation requirements are MANDATORY - no skipping allowed"
- `VERSION_BUMP_MISSING`: "❌ Version bump required per template documentation section"
- `CHANGELOG_OMITTED`: "❌ CHANGELOG entry required per template - no exceptions"
- `README_UPDATES_SKIPPED`: "❌ README updates required for user-facing changes per template"
- `DOCUMENTATION_BYPASS_BLOCKED`: "❌ No bypass language allowed for template documentation requirements"

### Recovery Actions
| Error | Recovery |
|-------|----------|
| Missing PRB | Auto-generate with correct template |
| Wrong context | Redirect to appropriate context |
| Role mismatch | Trigger PM+Architect process |
| Scope violation | Constrain to project root |
| Documentation skipped | Enforce template documentation requirements |

---
*Shared enforcement patterns extracted from prb-enforcement.md*