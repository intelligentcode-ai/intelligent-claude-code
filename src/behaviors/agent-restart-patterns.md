# Agent Restart Patterns

**MANDATORY:** Enable seamless agent restart with updated PRB context without manual intervention when adaptations occur.

**PURPOSE:** Behavioral patterns for smoothly transitioning agents from old to new PRB context after corrections or updates.

## Imports
@./prb-adaptation-behavior.md
@./dynamic-prb-updates.md
@./shared-patterns/enforcement-rules.md

## Core Principle: Seamless Context Transition

**CONTINUITY PRESERVATION:** Agent restart must maintain execution continuity while applying updated context without losing completed work.

**ZERO INTERVENTION:** Restart process must be fully automated without requiring manual user intervention or agent reconfiguration.

## Restart Trigger Patterns

### Context Update Triggers
**AUTOMATIC RESTART CONDITIONS:**
- **Major Context Changes**: Fundamental changes to PRB requirements or approach
- **Scope Modifications**: Significant expansion or contraction of work scope
- **Approach Corrections**: Changes to implementation strategy or technical approach
- **Dependency Updates**: Addition of new dependencies or removal of existing ones
- **Configuration Changes**: Updates to project configuration affecting execution

### Execution Error Triggers
**ERROR-BASED RESTARTS:**
- **Context Mismatch**: Agent context no longer matches updated PRB
- **Approach Conflicts**: Current agent approach conflicts with corrections
- **Missing Information**: Agent lacks information needed for corrected approach
- **Blocked Execution**: Agent cannot proceed due to context gaps
- **Requirement Violations**: Agent execution violates updated requirements

## Restart Process

### Pre-Restart Assessment
**CONTINUITY EVALUATION:**
1. **Work Progress Assessment**: Evaluate completed work compatibility with updates
2. **Context Diff Analysis**: Identify specific changes in PRB context
3. **Impact Assessment**: Determine restart scope (full vs partial)
4. **Preservation Strategy**: Identify work products to preserve through restart
5. **Transition Planning**: Plan smooth transition from old to new context

### Context Transition Mechanics
**CRITICAL STEPS:**
1. **Pause Current Execution**: Cleanly halt current agent operations
2. **Preserve Completed Work**: Save compatible completed work and progress
3. **Load Updated Context**: Provide agent with complete updated PRB context
4. **Context Validation**: Verify agent understands updated requirements
5. **Resume Execution**: Continue with updated context and preserved work

### Work Preservation Patterns
**PRESERVATION STRATEGIES:**
- **Compatible Work**: Preserve completed work that aligns with updated requirements
- **Partial Results**: Save intermediate results that remain valid
- **Configuration**: Maintain valid configuration changes through restart
- **Documentation**: Preserve relevant documentation and comments
- **Dependencies**: Keep installed dependencies that remain needed

## Restart Types

### Full Context Restart
**COMPLETE RENEWAL:**
- **Trigger Conditions**: Fundamental changes to PRB approach or requirements
- **Process**: Complete agent context replacement with updated PRB
- **Work Preservation**: Save only work explicitly compatible with new context
- **Communication**: Clear explanation of changes and restart rationale

### Partial Context Restart
**INCREMENTAL UPDATE:**
- **Trigger Conditions**: Additive changes or minor corrections to existing context
- **Process**: Update specific context sections while maintaining continuity
- **Work Preservation**: Preserve maximum amount of completed work
- **Communication**: Highlight specific changes and their implications

### Corrective Restart
**ERROR CORRECTION:**
- **Trigger Conditions**: Agent errors requiring context correction and restart
- **Process**: Fix context issues and restart with corrected information
- **Work Preservation**: Preserve work unaffected by the corrections
- **Communication**: Explain error and correction being applied

## Communication Patterns

### Restart Notification
**USER COMMUNICATION:**
- **Restart Announcement**: Clear notification that restart is occurring
- **Change Summary**: Concise summary of what changed and why
- **Preservation Report**: What work is being preserved through restart
- **Timeline Impact**: Any impact on expected completion timeline

### Agent Communication
**CONTEXT HANDOVER:**
- **Updated Context**: Complete updated PRB context provided to agent
- **Change Highlights**: Specific changes from previous context highlighted
- **Work Instructions**: Clear instructions on preserved vs new work
- **Continuation Guidance**: How to proceed with updated context

## Error Prevention

### Restart Loop Prevention
**LOOP DETECTION:**
- **Change Tracking**: Monitor frequency and nature of context changes
- **Stability Thresholds**: Prevent excessive restarts within time windows
- **User Confirmation**: Require confirmation for frequent restart scenarios
- **Pattern Recognition**: Identify and break problematic restart patterns

### Context Corruption Prevention
**INTEGRITY PROTECTION:**
- **Context Validation**: Verify updated context before restart
- **Backup Maintenance**: Maintain previous context for emergency rollback
- **Gradual Transition**: Apply complex changes incrementally when possible
- **Consistency Checks**: Ensure new context is internally consistent

## Integration Points

### With PRB Adaptation System
**ADAPTATION COORDINATION:**
- Restart patterns triggered automatically by adaptation system
- Updated PRB context seamlessly provided to restarting agents
- Work preservation coordinated with adaptation requirements
- Timeline adjustments communicated through both systems

### With Dynamic Updates
**UPDATE SYNCHRONIZATION:**
- Agent restarts synchronized with dynamic PRB updates
- Context changes applied atomically during restart process
- Update validation integrated with restart validation
- Rollback capabilities maintained through restart process

### With Error Detection
**ERROR HANDLING INTEGRATION:**
- Error detection patterns can trigger corrective restarts
- Agent errors inform restart strategy and context updates
- Error resolution coordinated with restart process
- Learning from restart scenarios improves error prevention

## Quality Assurance

### Restart Effectiveness
**SUCCESS METRICS:**
- **Continuity Preservation**: Amount of work preserved through restart
- **Context Accuracy**: Correctness of updated context application
- **Timeline Impact**: Minimal disruption to project timelines
- **User Satisfaction**: User acceptance of restart process and outcomes

### Process Reliability
**RELIABILITY MEASURES:**
- **Restart Success Rate**: Percentage of successful context transitions
- **Error Recovery**: Ability to recover from restart failures
- **Context Integrity**: Maintenance of context consistency through restart
- **Work Preservation**: Accuracy of work preservation decisions

## Performance Optimization

### Restart Efficiency
**OPTIMIZATION PATTERNS:**
- **Minimal Restart Scope**: Restart only components requiring updates
- **Fast Context Loading**: Efficient updated context provision
- **Work Preservation**: Maximize preserved work to minimize restart impact
- **Parallel Processing**: Handle multiple context updates efficiently

### Resource Management
**RESOURCE OPTIMIZATION:**
- **Memory Management**: Efficient context storage and transition
- **Processing Resources**: Minimize computational overhead of restarts
- **Storage Efficiency**: Optimize temporary storage during restart process
- **Network Resources**: Efficient communication during distributed restarts

## Learning Integration

### Restart Pattern Capture
**PATTERN STORAGE:**
- **Successful Restarts**: Store effective restart scenarios and approaches
- **Common Triggers**: Document frequent restart triggers and responses
- **Preservation Strategies**: Capture successful work preservation patterns
- **User Preferences**: Learn user preferences for restart communication

### Continuous Improvement
**IMPROVEMENT MECHANISMS:**
- **Restart Optimization**: Use captured patterns to improve restart efficiency
- **Trigger Refinement**: Improve restart trigger accuracy and timing
- **Communication Enhancement**: Enhance restart communication based on user feedback
- **Error Reduction**: Reduce restart-related errors through pattern analysis

---
*Agent restart behavioral patterns for intelligent-claude-code system*