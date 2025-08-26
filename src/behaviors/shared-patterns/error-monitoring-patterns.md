# Error Monitoring Patterns

**MANDATORY:** Shared error detection and classification functions for behavioral enforcement and agent monitoring.

**PURPOSE:** Provide reusable error monitoring patterns that can be integrated across all behavioral components for consistent error detection and response.

## Core Error Detection Functions

### Error Classification Function
**Purpose:** Categorize detected errors into actionable types for appropriate response

**Error Categories:**
```markdown
ERROR_TYPE_MAPPING:
- TECHNICAL_ERROR: Tool failures, file operations, permissions, syntax
- REQUIREMENT_DEVIATION: Scope creep, wrong functionality, context loss
- BEHAVIORAL_VIOLATION: Process skips, template bypasses, configuration ignores
- CONTEXT_LOSS: Questions about defined requirements, scope confusion
- PROGRESS_STALL: No meaningful progress, repetitive failed attempts
- CRITICAL_VIOLATION: Security issues, data integrity risks, system damage
```

**Classification Logic:**
1. **Scan Error Signals**: Check agent output against error indicator patterns
2. **Determine Primary Category**: Classify error into primary type
3. **Assess Severity Level**: Rate error impact (LOW, MEDIUM, HIGH, CRITICAL)
4. **Identify Root Cause**: Determine underlying cause (capability, clarity, complexity)
5. **Select Response Strategy**: Choose appropriate intervention approach

### Error Severity Assessment
**Purpose:** Rate error impact to determine appropriate response urgency

**Severity Levels:**
- **LOW**: Minor issues that don't affect core functionality
- **MEDIUM**: Issues that slow progress or reduce quality
- **HIGH**: Issues that prevent task completion or cause significant problems
- **CRITICAL**: Issues that risk system integrity, security, or data loss

**Assessment Criteria:**
```markdown
SEVERITY_ASSESSMENT_CRITERIA:
LOW:
  ☐ Minor formatting issues
  ☐ Non-essential documentation gaps
  ☐ Style guide deviations
  
MEDIUM:
  ☐ Tool usage inefficiencies
  ☐ Minor requirement misunderstandings
  ☐ Process step skips that can be corrected
  
HIGH:
  ☐ Wrong functionality implementation
  ☐ File operations to incorrect locations
  ☐ Git workflow violations
  ☐ Configuration setting ignores
  
CRITICAL:
  ☐ Operations outside project boundaries
  ☐ Security policy violations
  ☐ Data deletion or corruption risks
  ☐ System integrity threats
```

## Detection Pattern Library

### Technical Error Detection
**Pattern Name:** `TECHNICAL_ERROR_DETECTION`
**Purpose:** Identify tool failures, permission issues, and technical execution problems

**Detection Indicators:**
```markdown
TECHNICAL_ERROR_SIGNALS:
- Tool call failures: "Error executing command", "Permission denied", "File not found"
- Invalid parameters: "Invalid option", "Unknown argument", "Syntax error"
- Network/connectivity: "Connection refused", "Timeout", "DNS resolution failed"
- Resource constraints: "Disk full", "Memory exhausted", "Process limit exceeded"
- Dependency issues: "Module not found", "Version conflict", "Missing dependency"
```

**Detection Logic:**
1. **Monitor Tool Responses**: Check all tool outputs for error keywords
2. **Validate Parameters**: Ensure tool calls use valid parameters and paths
3. **Check Resource Access**: Verify agent has required permissions and resources
4. **Track Failure Patterns**: Identify recurring technical issues

### Requirement Deviation Detection
**Pattern Name:** `REQUIREMENT_DEVIATION_DETECTION`
**Purpose:** Identify when agents work beyond or contrary to PRB requirements

**Detection Indicators:**
```markdown
REQUIREMENT_DEVIATION_SIGNALS:
- Scope expansion: Agent mentions work not listed in PRB requirements
- Wrong focus: Working on items not in current success criteria
- Context questions: Asking about information already provided in PRB
- Feature addition: Adding functionality not specified in requirements
- Priority inversion: Working on optional items before required ones
```

**Detection Logic:**
1. **Parse Agent Output**: Extract work items mentioned by agent
2. **Compare Against PRB**: Check if work items match PRB requirements
3. **Validate Success Criteria**: Ensure agent progress aligns with defined success criteria
4. **Check Context Usage**: Verify agent is using provided context appropriately

### Behavioral Violation Detection
**Pattern Name:** `BEHAVIORAL_VIOLATION_DETECTION`
**Purpose:** Identify violations of established behavioral patterns and processes

**Detection Indicators:**
```markdown
BEHAVIORAL_VIOLATION_SIGNALS:
- Template bypass: Manual creation instead of required template usage
- Process skips: Bypassing validation steps or required reviews
- Configuration ignores: Using wrong settings, branches, or paths
- Documentation skips: Missing CHANGELOG entries, README updates
- Version skips: No version bumps when required
```

**Detection Logic:**
1. **Monitor Process Compliance**: Check adherence to required behavioral patterns
2. **Validate Template Usage**: Ensure templates are used correctly
3. **Check Configuration Adherence**: Verify project settings are followed
4. **Audit Documentation**: Confirm required documentation is created/updated

## Response Pattern Library

### Automatic Correction Patterns
**Pattern Name:** `AUTO_CORRECTION_RESPONSES`
**Purpose:** Automatically fix common, predictable errors without human intervention

**Auto-Correctable Error Types:**
- **Syntax Errors**: Fix malformed YAML, JSON, or markdown formatting
- **Path Corrections**: Fix relative/absolute path issues
- **Template Formatting**: Standardize template structure and required sections
- **Git Workflow**: Correct branch naming, commit message formatting
- **Configuration Values**: Apply correct project settings when wrong ones used

**Auto-Correction Process:**
```markdown
AUTO_CORRECTION_WORKFLOW:
1. DETECT_ERROR: Identify error pattern eligible for auto-correction
2. VALIDATE_FIX: Ensure correction won't cause additional problems
3. APPLY_CORRECTION: Execute automatic fix
4. VERIFY_RESULT: Confirm correction was successful
5. CONTINUE_EXECUTION: Resume normal agent operation
6. LOG_PATTERN: Store successful correction for future reference
```

### Human Intervention Patterns
**Pattern Name:** `HUMAN_INTERVENTION_RESPONSES`
**Purpose:** Escalate errors that require human judgment or additional information

**Escalation Triggers:**
- **Complex Requirement Issues**: Requirements need clarification or modification
- **Resource/Permission Issues**: Agent needs access to external resources
- **Repeated Error Patterns**: Same error occurs multiple times after correction
- **Critical System Risks**: Potential for data loss or security compromise
- **Scope Change Requests**: Work requirements need human approval to modify

**Escalation Process:**
```markdown
HUMAN_INTERVENTION_WORKFLOW:
1. PAUSE_EXECUTION: Temporarily halt agent work
2. DOCUMENT_ISSUE: Create clear description of problem and context
3. PROVIDE_RECOMMENDATIONS: Suggest potential solutions or approaches
4. REQUEST_INPUT: Ask human for guidance, clarification, or approval
5. AWAIT_RESPONSE: Wait for human intervention and guidance
6. RESUME_WITH_GUIDANCE: Continue execution with human-provided direction
```

### Context Refresh Patterns
**Pattern Name:** `CONTEXT_REFRESH_RESPONSES`
**Purpose:** Re-provide PRB context when agents lose track of requirements

**Context Loss Indicators:**
- Agent asks questions already answered in PRB
- Agent works on items not in current requirements
- Agent requests clarification on provided context
- Agent attempts unauthorized scope changes

**Context Refresh Process:**
```markdown
CONTEXT_REFRESH_WORKFLOW:
1. IDENTIFY_CONTEXT_LOSS: Detect agent confusion or context deviation
2. PAUSE_CURRENT_WORK: Stop current task execution
3. RE_PROVIDE_CONTEXT: Send complete PRB context again
4. HIGHLIGHT_SPECIFICS: Emphasize specific requirements causing confusion
5. CONFIRM_UNDERSTANDING: Verify agent understands refreshed context
6. RESUME_EXECUTION: Allow agent to continue with clear context
```

## Integration Patterns

### With PRB Enforcement System
**Integration Points:**
- Error detection enhances existing enforcement blocking mechanisms
- Behavioral violations trigger both enforcement rules AND error responses
- Error patterns inform improvements to enforcement rule effectiveness
- Shared error classification across enforcement and monitoring systems

### With Memory System Integration
**Learning Integration:**
- Store successful error detection patterns in memory/behavioral-patterns/
- Capture effective correction strategies for repeated use
- Track agent performance patterns to optimize role assignments
- Learn from error patterns to improve proactive prevention

### With Adaptation Mechanisms
**Adaptation Triggers:**
- Multiple technical errors suggest agent capability mismatch → role reassignment
- Requirement deviations suggest context clarity issues → PRB enhancement
- Behavioral violations suggest enforcement gaps → pattern improvement
- Critical errors suggest systemic issues → escalate for system modification

## Quality Assurance Patterns

### Detection Accuracy Monitoring
**Accuracy Metrics:**
- **False Positive Rate**: Errors detected where none exist
- **False Negative Rate**: Actual errors missed by detection
- **Detection Speed**: Time from error occurrence to detection
- **Correction Success Rate**: Percentage of errors successfully resolved

### Performance Impact Assessment
**Performance Considerations:**
- Error monitoring operates with minimal execution overhead
- Detection patterns optimized for early identification
- Response patterns minimize disruption to successful workflows
- Monitoring data collected for continuous improvement

---
*Shared error monitoring patterns for intelligent-claude-code behavioral system*