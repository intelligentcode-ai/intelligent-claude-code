# Agent Error Detection Behavioral Patterns

**MANDATORY:** Monitor agent execution for errors and trigger adaptation mechanisms. Auto-detect when agents go off-track during PRB execution.

**PURPOSE:** Implement comprehensive error detection patterns to identify when agents make mistakes during PRB execution and trigger appropriate adaptation responses.

## Imports
@./shared-patterns/error-monitoring-patterns.md
@./shared-patterns/enforcement-rules.md
@./prb-enforcement.md

## Core Principle: Proactive Error Detection

**DETECTION PHILOSOPHY:** Monitor agent behavior continuously during PRB execution, identify deviations from requirements, and trigger adaptation mechanisms before errors compound.

**CRITICAL:** Error detection operates in parallel with normal execution - it does NOT disrupt successful work flows, but intervenes when problems are detected.

## Error Classification System

### Technical Execution Errors
**DETECTION PATTERNS:**
- **Tool Usage Errors**: Incorrect tool calls, invalid parameters, permission failures
- **File Operation Failures**: Write/edit operations to wrong paths, missing files, permission denials
- **Git Operation Errors**: Branch conflicts, merge issues, credential failures, policy violations
- **Syntax/Format Errors**: Invalid YAML, malformed markdown, broken configuration files
- **Path Resolution Errors**: Incorrect absolute/relative paths, missing directories

**ERROR INDICATORS:**
```markdown
TECHNICAL ERROR SIGNALS:
☐ Tool execution failures or unexpected responses
☐ File operations outside project boundaries
☐ Git commands failing or producing warnings
☐ Configuration syntax errors or validation failures
☐ Missing required files or dependencies
☐ Permission or access control violations
```

### Requirement Deviation Errors
**DETECTION PATTERNS:**
- **Scope Creep**: Agent working beyond PRB requirements
- **Requirement Misunderstanding**: Implementing wrong functionality
- **Context Loss**: Agent losing track of PRB objectives
- **Priority Inversion**: Working on low-priority items while high-priority remain
- **Feature Drift**: Adding functionality not specified in requirements

**ERROR INDICATORS:**
```markdown
REQUIREMENT DEVIATION SIGNALS:
☐ Work output doesn't match PRB success criteria
☐ Agent mentions work not listed in PRB requirements
☐ Implementation differs significantly from specified approach
☐ Agent asks questions about requirements already defined in PRB
☐ Work scope expands beyond PRB boundaries
☐ Agent skips required validation steps
```

### Behavioral Pattern Violations
**DETECTION PATTERNS:**
- **Process Violations**: Skipping required steps, bypassing validation
- **Template Violations**: Manual creation instead of template usage
- **Configuration Violations**: Ignoring project settings, using wrong branches
- **Documentation Violations**: Skipping required documentation, missing CHANGELOG entries
- **Version Management Violations**: No version bumps, incorrect semantic versioning

**ERROR INDICATORS:**
```markdown
BEHAVIORAL VIOLATION SIGNALS:
☐ Agent attempts manual PRB creation without templates
☐ Skipping mandatory documentation requirements
☐ Bypassing version management or git workflow
☐ Ignoring project configuration settings
☐ Attempting work without proper PRB context
☐ Violating role assignment rules or scope boundaries
```

## Real-Time Monitoring Patterns

### Execution Monitoring
**CONTINUOUS MONITORING LOGIC:**
1. **Tool Call Analysis**: Monitor all tool calls for appropriateness and success
2. **Output Validation**: Check agent outputs against PRB requirements
3. **Progress Tracking**: Verify agent is making progress on correct items
4. **Context Adherence**: Ensure agent stays within PRB scope and context
5. **Process Compliance**: Validate adherence to required behavioral patterns

### Error Detection Triggers
**IMMEDIATE DETECTION TRIGGERS:**
- Agent mentions work not in PRB requirements
- Tool calls fail repeatedly or produce unexpected results
- Agent asks for information already provided in PRB context
- Work output doesn't align with specified success criteria
- Agent attempts to bypass mandatory validation steps
- Configuration or template violations detected

### Adaptive Response Triggers
**RESPONSE ESCALATION LEVELS:**
1. **Level 1 - Gentle Correction**: Remind agent of requirements, provide clarification
2. **Level 2 - Process Redirect**: Guide agent back to correct workflow or approach
3. **Level 3 - Context Refresh**: Re-provide PRB context and success criteria
4. **Level 4 - Execution Pause**: Pause execution for human intervention
5. **Level 5 - Agent Replacement**: Replace current agent with fresh context

## Integration with Existing Systems

### PRB Enforcement Integration
**ENHANCED ENFORCEMENT PATTERNS:**
- Error detection operates alongside existing PRB enforcement
- Behavioral violations trigger both enforcement rules AND error detection
- Error patterns enhance existing blocking mechanisms
- Detection patterns inform enforcement rule improvements

### Memory System Integration
**ERROR PATTERN LEARNING:**
- Store successful error detection patterns in memory/behavioral-patterns/
- Capture agent error types and successful interventions
- Learn from repeated error patterns for proactive prevention
- Track agent performance patterns for role assignment optimization

### Adaptation Mechanism Triggers
**WHEN TO TRIGGER ADAPTATION:**
- Multiple technical errors indicate agent capability mismatch
- Requirement deviations suggest context clarity issues
- Behavioral violations indicate enforcement pattern gaps
- Repeated identical errors indicate systemic issues

## Validation and Quality Assurance

### Error Detection Quality
**DETECTION ACCURACY VALIDATION:**
- False positive rate monitoring (detecting errors where none exist)
- False negative rate monitoring (missing actual errors)
- Response time tracking (how quickly errors are detected)
- Intervention effectiveness (do corrections actually help)

### Agent Performance Monitoring
**AGENT EFFECTIVENESS METRICS:**
- Error frequency by agent type and complexity level
- Success rate after error correction interventions
- Time to completion with and without error interventions
- User satisfaction with error detection and correction

## Error Response Patterns

### Automated Corrections
**AUTO-CORRECTABLE ERRORS:**
- Syntax errors in configuration files
- Path resolution corrections
- Template format standardization
- Git workflow corrections
- Documentation format fixes

**AUTO-CORRECTION PROCESS:**
1. **Detect Error**: Identify correctable error pattern
2. **Apply Fix**: Execute automatic correction
3. **Validate Result**: Confirm correction successful
4. **Continue Execution**: Resume normal agent operation
5. **Log Pattern**: Store successful correction pattern

### Human Intervention Triggers
**ESCALATION CONDITIONS:**
- Agent repeatedly makes same error after corrections
- Complex requirement misunderstandings that need clarification
- Technical errors that require external resources or permissions
- Scope changes that need human approval
- Critical errors that could damage system or data

### Context Refresh Patterns
**CONTEXT REFRESH TRIGGERS:**
- Agent asks questions answered in PRB
- Agent works on items not in requirements
- Agent loses track of success criteria
- Agent attempts unauthorized scope expansion

**REFRESH PROCESS:**
1. **Pause Execution**: Temporarily halt agent work
2. **Re-provide Context**: Send complete PRB context again
3. **Clarify Requirements**: Emphasize specific requirements causing confusion
4. **Reset Focus**: Guide agent back to current task
5. **Resume Execution**: Allow agent to continue with refreshed context

## Implementation Guidelines

### Behavioral Pattern Integration
- Error detection patterns import from shared-patterns/error-monitoring-patterns.md
- Integration with existing enforcement-rules.md patterns
- Coordination with prb-enforcement.md for comprehensive coverage
- Memory integration for continuous learning and improvement

### Performance Considerations
- Error detection operates with minimal overhead
- Monitoring does not slow down successful execution
- Detection patterns optimized for early error identification
- Response patterns minimize disruption to working agents

---
*Agent error detection behavioral patterns for intelligent-claude-code system*