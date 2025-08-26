# Violation Detection Patterns

**MANDATORY:** Real-time violation detection with immediate blocking and auto-correction guidance.

**PURPOSE:** Detect and prevent PRB framework violations before any tool execution occurs.

## Core Detection Logic

### Pre-Tool-Use Validation (MANDATORY)

**CRITICAL:** Every tool use MUST be validated before execution.

```
UNIVERSAL PRE-TOOL VALIDATION SEQUENCE:
1. Parse user request for work intent indicators
2. Check current context for active PRB
3. If work intent detected AND no PRB context → IMMEDIATE BLOCK
4. If information request → Allow execution
5. If PRB context exists → Validate scope and proceed
```

### Work Intent Detection Patterns

**IMPLEMENTATION INTENT INDICATORS:**
- **Action Verbs**: implement, create, build, fix, update, modify, delete, install, deploy, configure, setup
- **Direct Instructions**: "make this change", "add this feature", "edit the file", "update the config"  
- **File Operations**: "create file X", "edit file Y", "delete file Z"
- **System Changes**: "install package", "configure service", "deploy application"
- **Code Modifications**: "add function", "fix bug", "refactor code", "optimize performance"

**INFORMATION REQUEST INDICATORS:**
- **Query Verbs**: show, display, read, list, check, analyze, explain, describe, find, search
- **Status Requests**: "what's the status", "show me the current", "check the logs"
- **Analysis Requests**: "analyze the code", "explain this function", "review the architecture"
- **Documentation Requests**: "show documentation", "list available commands", "explain the process"

### Tool-Specific Violation Patterns

**WRITE TOOL VIOLATIONS:**
- Using Write tool without active PRB context
- Creating new files without PRB authorization
- Writing configuration changes without PRB scope
- Any Write operation for implementation purposes

**EDIT/MULTIEDIT VIOLATIONS:**
- Modifying existing files without PRB context
- Making code changes outside PRB scope
- Editing configuration without PRB authorization
- Any modification for implementation purposes

**BASH VIOLATIONS:**
- State-changing bash commands without PRB context
- Installation commands outside PRB scope
- System configuration changes without PRB
- Git operations without PRB authorization
- File system modifications without PRB context

## Violation Detection Functions

### Universal Request Analysis

**REQUEST_ANALYSIS_PROCESS:**
```
analyze_request(user_input):
    # Step 1: Extract intent patterns
    work_indicators = extract_work_patterns(user_input)
    info_indicators = extract_info_patterns(user_input) 
    tool_operations = detect_tool_usage_intent(user_input)
    
    # Step 2: Classify request type
    if work_indicators and not info_indicators:
        return "WORK_REQUEST"
    elif info_indicators and not work_indicators:
        return "INFORMATION_REQUEST"
    elif work_indicators and info_indicators:
        return "MIXED_REQUEST"  # Requires careful analysis
    else:
        return "UNCLEAR_REQUEST"  # Default to safe blocking
        
    # Step 3: Check PRB context
    prb_context = check_active_prb_context()
    
    # Step 4: Make blocking decision
    if request_type == "WORK_REQUEST" and not prb_context:
        return "BLOCK_EXECUTION"
    elif request_type == "INFORMATION_REQUEST":
        return "ALLOW_EXECUTION"
    elif request_type == "MIXED_REQUEST":
        return "EVALUATE_COMPONENTS"  # Separate work from info
    else:
        return "BLOCK_EXECUTION"  # Safe default
```

### Tool-Specific Detection

**WRITE_TOOL_VALIDATION:**
```
validate_write_operation(file_path, content, context):
    # Check for PRB context
    if not has_active_prb():
        return block_with_error("WRITE_WITHOUT_PRB")
    
    # Check if file creation is implementation work
    if is_implementation_content(content):
        if not prb_allows_file_creation(file_path):
            return block_with_error("FILE_OUTSIDE_PRB_SCOPE")
    
    # Check for configuration changes
    if is_configuration_file(file_path):
        if not prb_allows_config_changes():
            return block_with_error("CONFIG_CHANGE_WITHOUT_PRB")
    
    return "ALLOW_OPERATION"
```

**EDIT_TOOL_VALIDATION:**
```
validate_edit_operation(file_path, changes, context):
    # Check for PRB context
    if not has_active_prb():
        return block_with_error("EDIT_WITHOUT_PRB")
    
    # Check if changes are implementation work
    if contains_implementation_changes(changes):
        if not prb_covers_file(file_path):
            return block_with_error("EDIT_OUTSIDE_PRB_SCOPE")
    
    # Check for critical file modifications
    if is_critical_system_file(file_path):
        if not prb_allows_system_changes():
            return block_with_error("SYSTEM_FILE_CHANGE_WITHOUT_PRB")
    
    return "ALLOW_OPERATION"
```

**BASH_TOOL_VALIDATION:**
```
validate_bash_operation(command, context):
    # Check for state-changing operations
    state_changing_commands = [
        "npm install", "pip install", "apt install",
        "mkdir", "rm", "mv", "cp",
        "git add", "git commit", "git push",
        "systemctl", "service", "docker",
        "chmod", "chown", "ln"
    ]
    
    if any(cmd in command for cmd in state_changing_commands):
        if not has_active_prb():
            return block_with_error("STATE_CHANGE_WITHOUT_PRB")
        
        if not prb_allows_system_operations():
            return block_with_error("SYSTEM_OP_OUTSIDE_PRB_SCOPE")
    
    # Allow read-only operations
    readonly_commands = [
        "ls", "cat", "grep", "find", "ps",
        "git status", "git log", "git diff",
        "npm list", "pip list"
    ]
    
    if any(cmd in command for cmd in readonly_commands):
        return "ALLOW_OPERATION"
    
    # Default to blocking for safety
    return block_with_error("UNKNOWN_COMMAND_WITHOUT_PRB")
```

## Real-Time Monitoring System

### Request Interception Pipeline

**MANDATORY PIPELINE:** Every request must pass through violation detection before tool execution.

**PIPELINE_STAGES:**
1. **Request Parse**: Extract user intent and tool usage patterns
2. **Context Check**: Verify active PRB context exists for work requests
3. **Scope Validation**: Ensure requested operations fall within PRB scope
4. **Tool Authorization**: Validate tool usage against PRB permissions
5. **Safety Check**: Final safety validation before tool execution

### Context State Management

**PRB_CONTEXT_TRACKING:**
```
PRB Context State:
- active_prb_id: Currently executing PRB identifier
- prb_scope: Authorized files, directories, and operations
- prb_permissions: Allowed tools and system operations
- work_boundaries: Defined limits of current PRB work
- completion_criteria: Success criteria for PRB completion
```

**CONTEXT_VALIDATION:**
```
validate_prb_context(operation, target):
    if not active_prb_id:
        return "NO_PRB_CONTEXT"
    
    if target not in prb_scope.authorized_files:
        return "OUTSIDE_PRB_SCOPE"
    
    if operation not in prb_permissions.allowed_operations:
        return "UNAUTHORIZED_OPERATION"
    
    if violates_work_boundaries(operation, target):
        return "BOUNDARY_VIOLATION"
    
    return "AUTHORIZED"
```

## Error Messages and Auto-Correction

### Unmistakable Error Messages

**DIRECT_EXECUTION_BLOCKED:**
```
❌ DIRECT EXECUTION BLOCKED: All work requires PRB

This request attempts to perform work without an active PRB context.
Every implementation, modification, or system change requires PRB framework.

REQUIRED ACTION: Use @Role pattern to generate PRB first
Example: @AI-Engineer implement this feature
Then execute the generated PRB

BLOCKED OPERATION: {operation_description}
REASON: No active PRB context detected
```

**TOOL_USE_VIOLATION:**
```
❌ TOOL USE BLOCKED: File/system operations require PRB context

Tool: {tool_name}
Operation: {operation_description}  
File/Target: {target}

VIOLATION: Attempting to use {tool_name} without active PRB context
REQUIREMENT: All file and system modifications require PRB authorization

REQUIRED ACTION:
1. Generate PRB using @Role pattern: @{suggested_role} {work_description}
2. Execute the generated PRB with embedded context
3. All operations will then be authorized within PRB scope
```

**SCOPE_VIOLATION:**
```
❌ PRB SCOPE VIOLATION: Operation outside authorized boundaries

Active PRB: {active_prb_id}
Authorized Scope: {prb_scope}
Attempted Operation: {operation}
Target: {target}

VIOLATION: Current PRB does not authorize this operation
REQUIREMENT: Operations must fall within PRB-defined scope

REQUIRED ACTION:
1. Complete current PRB: {active_prb_id}
2. Generate new PRB for this work: @{suggested_role} {work_description}
3. Execute new PRB with proper authorization
```

**WORK_WITHOUT_PRB:**
```
❌ WORK ATTEMPT BLOCKED: Generate PRB using @Role pattern

Detected Work Intent: {work_indicators}
Implementation Language: {detected_patterns}
Current Context: No active PRB

BLOCKING REASON: System detected implementation intent without PRB framework
SAFETY MECHANISM: All work requires PRB generation before execution

CORRECTION GUIDE:
• For implementation: @Developer {task_description}
• For infrastructure: @DevOps-Engineer {task_description}  
• For AI/behavioral: @AI-Engineer {task_description}
• For database work: @Database-Engineer {task_description}
• For security: @Security-Engineer {task_description}

The system will generate appropriate PRB and execute with full context.
```

### Auto-Correction Workflows

**VIOLATION_CORRECTION_PROCESS:**
```
correct_violation(violation_type, context):
    # Step 1: Stop current execution
    halt_tool_execution()
    
    # Step 2: Display unmistakable error
    display_error_message(violation_type, context)
    
    # Step 3: Provide specific guidance
    suggest_role = determine_appropriate_role(context.work_type)
    suggest_pattern = generate_role_pattern(suggest_role, context.work_description)
    
    # Step 4: Preserve context for PRB generation
    store_work_context(context)
    
    # Step 5: Guide to correct workflow
    display_correction_guidance(suggest_pattern)
    
    # Step 6: Track violation for learning
    log_violation_pattern(violation_type, context)
```

**ROLE_SUGGESTION_LOGIC:**
```
determine_appropriate_role(work_context):
    work_type = analyze_work_type(work_context)
    
    role_mapping = {
        "file_operations": "@Developer",
        "system_config": "@System-Engineer", 
        "deployment": "@DevOps-Engineer",
        "database": "@Database-Engineer",
        "security": "@Security-Engineer",
        "ai_behavioral": "@AI-Engineer",
        "testing": "@QA-Engineer",
        "architecture": "@Architect",
        "documentation": "@Requirements-Engineer"
    }
    
    return role_mapping.get(work_type, "@Developer")  # Default to Developer
```

## Violation Pattern Learning

### Pattern Capture and Storage

**VIOLATION_TRACKING:**
```
violation_entry = {
    "timestamp": current_timestamp(),
    "violation_type": violation_type,
    "user_request": original_request,
    "detected_patterns": work_patterns,
    "tool_attempted": attempted_tool,
    "context": execution_context,
    "correction_applied": correction_action,
    "user_response": user_correction_taken
}

store_violation_pattern(violation_entry, "memory/process-violations/")
```

**LEARNING_IMPROVEMENT:**
```
analyze_violation_patterns():
    # Load recent violations
    violations = load_violations_from_memory()
    
    # Identify common patterns
    common_violations = identify_frequent_patterns(violations)
    
    # Improve detection accuracy
    update_detection_patterns(common_violations)
    
    # Enhance error messages
    refine_error_messages(user_feedback)
    
    # Update role suggestions
    optimize_role_mapping(successful_corrections)
```

### Pattern Storage Location

**MEMORY STRUCTURE:**
- `memory/process-violations/violation-patterns.md` - Common violation patterns and detection
- `memory/process-violations/auto-correction-effectiveness.md` - Correction success rates
- `memory/process-violations/user-response-patterns.md` - How users respond to blocks
- `memory/process-violations/detection-accuracy.md` - False positive/negative analysis

## Integration Points

### With PRB Enforcement System
- **Violation Detection**: Feeds into existing PRB enforcement priorities
- **Auto-Correction**: Integrates with existing auto-correction patterns
- **Error Messages**: Enhances existing unmistakable error message system
- **Pattern Learning**: Contributes to existing learning system

### With Tool Execution System
- **Pre-Tool Validation**: Intercepts tool calls before execution
- **Context Preservation**: Maintains PRB context across tool operations
- **Permission System**: Validates tool usage against PRB authorizations
- **Safety Mechanisms**: Provides final safety checks before tool execution

### With Memory System
- **Pattern Storage**: Stores violation patterns for continuous learning
- **Success Tracking**: Monitors correction effectiveness
- **User Behavior**: Analyzes user responses to violation blocking
- **Detection Improvement**: Uses stored patterns to refine detection accuracy

---
*Violation detection patterns for comprehensive PRB framework enforcement*