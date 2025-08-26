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
- **Query Verbs**: show, display, read, list, check, analyze, explain, describe, find, search, what, how, why, should, can, will
- **Question Patterns**: "what is...", "how does...", "why should...", "what should...", "can we...", "will this..."
- **Status Requests**: "what's the status", "show me the current", "check the logs", "what's next"
- **Analysis Requests**: "analyze the code", "explain this function", "review the architecture"
- **Documentation Requests**: "show documentation", "list available commands", "explain the process"
- **Role Questions**: "@PM what...", "@Architect should...", "@Role can...", "@Role how...", "@Role why..."
- **Planning Questions**: "what story next", "what should we work on", "which approach", "what do you think"
- **Design Questions**: "should we use", "what pattern", "which architecture", "how should we"
- **Consultation Questions**: "would you recommend", "do you suggest", "what's the best"

### Question Detection Patterns

**ENHANCED QUESTION RECOGNITION:**
- **Question Words**: what, how, why, should, can, will, would, which patterns
- **Role Questions**: @Role followed by question indicators
- **Implementation Directives**: Direct commands to perform work (not questions about work)
- **Planning Questions**: Questions about work direction and decisions

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

## Request Analysis Patterns

### Universal Request Classification

**REQUEST CLASSIFICATION LOGIC:**
1. **Question Priority**: Questions always take precedence over work indicators
2. **Intent Detection**: Distinguish between information requests, planning questions, and work directives  
3. **Context Validation**: Check PRB context only for actual work requests
4. **Default Allow**: Information requests and questions allowed without PRB

**CLASSIFICATION TYPES:**
- **WORK_REQUEST**: Implementation directives requiring PRB context
- **INFORMATION_REQUEST**: Status, analysis, documentation requests
- **PLANNING_QUESTION**: Questions about work direction and strategy
- **MIXED_REQUEST**: Requires component separation

### Tool-Specific Validation Patterns

**WRITE/EDIT TOOL VALIDATION:**
- Block file creation/modification without active PRB context
- Validate operations against PRB scope and authorization
- Allow documentation and information operations
- Block configuration changes outside PRB scope

**BASH TOOL VALIDATION:**
- **State-Changing Commands**: npm/pip install, mkdir, rm, git operations, system services
- **Read-Only Commands**: ls, cat, grep, find, git status/log/diff
- **Default Blocking**: Unknown commands blocked for safety without PRB
- **PRB Authorization**: System operations require PRB permission

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

**PRB CONTEXT ELEMENTS:**
- **Active PRB ID**: Currently executing PRB identifier
- **Authorized Scope**: Permitted files, directories, and operations
- **Tool Permissions**: Allowed tools and system operations
- **Work Boundaries**: Defined limits of current PRB work
- **Completion Criteria**: Success criteria for PRB completion

**CONTEXT VALIDATION RESULTS:**
- **NO_PRB_CONTEXT**: No active PRB for work operations
- **OUTSIDE_PRB_SCOPE**: Target not in authorized scope
- **UNAUTHORIZED_OPERATION**: Operation not permitted
- **BOUNDARY_VIOLATION**: Violates defined work boundaries
- **AUTHORIZED**: Operation permitted within PRB context

## Error Messages and Auto-Correction

### Non-Blocking Scenarios (DO NOT BLOCK)

**ALLOWED INTERACTIONS - NO PRB REQUIRED:**
- **Q&A with Roles**: "@PM what story next?", "@Architect should we use X?"
- **Information Requests**: "What is...", "How does...", "Show me..."
- **Status Queries**: "What's the current status?", "How are we doing?"
- **Planning Questions**: "What should we work on?", "Which approach?"
- **Design Consultation**: "Would you recommend...?", "What's the best...?"
- **Analysis Requests**: "Explain this code", "Review this architecture"

**RECOGNITION PATTERNS:**
- Questions starting with what, how, why, should, can, will, would
- @Role followed by question words
- Requests ending with question marks
- Consultation and advice-seeking language

### Unmistakable Error Messages

**DIRECT_EXECUTION_BLOCKED:**
```
❌ DIRECT EXECUTION BLOCKED: Implementation work requires PRB

This request attempts to perform implementation work without an active PRB context.
Implementation, modification, and system changes require PRB framework.

BLOCKED OPERATION: {operation_description}
REASON: No active PRB context detected

REQUIRED ACTION: Use @Role pattern to generate PRB first
Example: @AI-Engineer implement this feature
Then execute the generated PRB

NOTE: Questions and information requests are always allowed:
• "@PM what story next?" → Allowed
• "What is the current status?" → Allowed  
• "How does this component work?" → Allowed
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

### Auto-Correction Patterns

**VIOLATION CORRECTION PROCESS:**
1. **Stop Execution**: Halt current tool execution immediately
2. **Display Error**: Show unmistakable violation error message
3. **Suggest Role**: Recommend appropriate @Role for the work type
4. **Preserve Context**: Store work context for PRB generation
5. **Guide Workflow**: Provide correct @Role pattern guidance
6. **Track Learning**: Log violation pattern for system improvement

**ROLE SUGGESTION MAPPING:**
- **File Operations**: @Developer
- **System Config**: @System-Engineer
- **Deployment**: @DevOps-Engineer
- **Database**: @Database-Engineer
- **Security**: @Security-Engineer
- **AI/Behavioral**: @AI-Engineer
- **Testing**: @QA-Engineer
- **Architecture**: @Architect
- **Documentation**: @Requirements-Engineer

## Violation Pattern Learning

### Pattern Learning

**VIOLATION TRACKING ELEMENTS:**
- **Timestamp**: When violation occurred
- **Violation Type**: Category of violation detected
- **User Request**: Original request that triggered violation
- **Detected Patterns**: Work patterns that indicated violation
- **Tool Attempted**: Which tool was blocked
- **Context**: Execution context at time of violation
- **Correction Applied**: What correction guidance was provided
- **User Response**: Whether user followed correction guidance

**LEARNING IMPROVEMENT AREAS:**
- **Common Patterns**: Identify frequently occurring violations
- **Detection Accuracy**: Reduce false positives and negatives
- **Error Messages**: Improve clarity and actionability
- **Role Suggestions**: Optimize role recommendations for work types

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