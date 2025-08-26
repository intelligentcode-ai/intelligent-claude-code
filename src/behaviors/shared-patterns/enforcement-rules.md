# Enforcement Rules

**PURPOSE:** Shared enforcement patterns and validation functions

## Subagent Scope Validation

**Subagent Scope Validation Process:**

1. **Check Working Directory:**
   - When subagent working directory starts with ~/.claude/
   - Block execution and show error: "❌ Cannot use ~/.claude/ as working directory"

2. **Check File Operations:**
   - Review each file path in subagent context
   - When file path starts with ~/.claude/ and operation is not installation
   - Block execution and show error: "❌ References forbidden ~/.claude/ path"

3. **Allow Valid Operations:**
   - Subagents with project root working directories proceed
   - Subagents with valid file operations within project scope proceed

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

**Work Pattern Detection Process:**

**WORK INTENT INDICATORS:**
- **Action Verbs:** implement, create, build, fix, update, modify, delete, install, deploy, configure, setup
- **Direct Instructions:** "make this change", "add this feature", "edit the file", "update the config"
- **File Operations:** "create file X", "edit file Y", "delete file Z"
- **System Changes:** "install package", "configure service", "deploy application"
- **Code Modifications:** "add function", "fix bug", "refactor code", "optimize performance"

**INFORMATION REQUEST INDICATORS:**
- **Query Verbs:** show, display, read, list, check, analyze, explain, describe, find, search
- **Status Requests:** "what's the status", "show me the current", "check the logs"
- **Analysis Requests:** "analyze the code", "explain this function", "review the architecture"

**ENHANCED QUESTION INDICATORS:**
- **Role Questions:** "@PM what...", "@Architect should...", "@Role can...", "@Role how..."
- **Planning Questions:** "what story next", "what should we work on", "which approach"
- **Design Questions:** "should we use", "what pattern", "which architecture"
- **Status Questions:** "what's the status", "how are we doing", "what's next"

**Detection Steps:**
1. **Scan Text:** Review input text for work vs information vs question patterns
2. **Priority Check:** Questions take priority over work indicators
3. **Classify Intent:** Determine if request is work, information, question, or mixed
4. **Check PRB Context:** Verify active PRB exists for work requests only
5. **Block or Allow:** Block work without PRB, allow information requests and questions

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

**VIOLATION DETECTION LOGIC:**
```
validate_tool_use(tool, operation, target):
    if not has_active_prb() and is_work_operation(operation):
        return "BLOCK_NO_PRB_CONTEXT"
    
    if has_active_prb() and not prb_authorizes(operation, target):
        return "BLOCK_OUTSIDE_PRB_SCOPE"
    
    if is_information_request(operation):
        return "ALLOW_INFORMATION"
    
    return "ALLOW_AUTHORIZED_WORK"
```

### False Completion Detection

**False Completion Detection Process:**

**Completion Triggers:**
- Text contains "PRB COMPLETE"
- Text contains "Task finished"
- Text contains "Work done"
- Text contains "Completed"

**Validation Steps:**
1. **Detect Completion Claims:** Scan for completion trigger phrases
2. **Check Validation Status:** Review completion checklist validation
3. **Block Invalid Claims:** When checklist incomplete, block completion

### Documentation Compliance Detection

**Documentation Compliance Detection Process:**

**BLOCKED Documentation Skipping Patterns:**
- "No documentation needed" → BLOCK → Must follow template requirements
- "Self-documenting code" → BLOCK → Template requires explicit documentation
- "Skip CHANGELOG" → BLOCK → CHANGELOG entry mandatory per template
- "Internal change, no docs" → BLOCK → All changes require documentation per template
- "Documentation not affected" → BLOCK → Template determines documentation requirements
- "Too technical for user docs" → BLOCK → Technical documentation still required
- "Code speaks for itself" → BLOCK → Template documentation sections are mandatory
- "No version bump needed" → BLOCK → Version management required per template
- "Skip versioning" → BLOCK → Version bump mandatory per template

**Detection Steps:**
1. **Scan for Documentation Bypass Patterns:** Check text for documentation skipping language
2. **Validate Template Requirements:** Ensure all template documentation sections are addressed
3. **Block Documentation Skipping:** When bypass patterns detected, block with template enforcement message
4. **Enforce Documentation Completion:** Require explicit validation of version bump, CHANGELOG, and README updates

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
| Version bump missing | Execute version bump per template |
| CHANGELOG omitted | Create CHANGELOG entry per template |
| README updates skipped | Update README per template requirements |

---
*Shared enforcement patterns extracted from prb-enforcement.md*