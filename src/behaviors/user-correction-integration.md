# User Correction Integration

**MANDATORY:** Detect and process user corrections during PRB execution to enable real-time adaptation.

**PURPOSE:** Behavioral patterns for recognizing when users provide corrections, new information, or clarifications that require PRB context updates.

## Imports
@./shared-patterns/error-monitoring-patterns.md
@./dynamic-prb-updates.md

## Core Principle: Active Correction Monitoring

**CONTINUOUS MONITORING:** System must actively scan user input during PRB execution for correction indicators and adaptation triggers.

**INTEGRATION FOCUS:** Seamlessly integrate user corrections into ongoing PRB execution without disrupting workflow.

## Correction Detection Patterns

### Language Pattern Recognition
**CORRECTION INDICATORS:**
- **Direct Corrections**: "Actually, that's wrong", "I made a mistake", "Let me correct that"
- **Clarifications**: "What I meant was", "To be more specific", "Let me clarify" 
- **Additions**: "Also include", "Don't forget", "We also need", "One more thing"
- **Changes**: "Instead of that", "Change it to", "The real requirement is"
- **Refinements**: "More specifically", "To be precise", "The exact need is"

### Context Enhancement Patterns
**INFORMATION ADDITIONS:**
- **Missing Details**: "I should have mentioned", "Important detail", "Key constraint"
- **Dependencies**: "This depends on", "We need to consider", "Don't forget about"
- **Constraints**: "There's a limitation", "We can't do", "The restriction is"
- **Priorities**: "More important is", "First priority", "Critical requirement"
- **Background**: "For context", "The reason is", "Background information"

### Scope Modification Patterns  
**SCOPE CHANGES:**
- **Expansion**: "Also do this", "Include as well", "Add to scope"
- **Contraction**: "Skip that part", "Not needed", "Remove from scope"
- **Reordering**: "Do this first", "Priority change", "Different sequence"
- **Focus Shifts**: "Main goal is", "Key objective", "Primary target"

## Processing Mechanisms

### Real-Time Input Analysis
**PROCESSING STEPS:**
1. **Parse User Input**: Analyze incoming text for correction patterns
2. **Classify Correction Type**: Determine if correction, addition, change, or refinement
3. **Extract New Information**: Identify specific details being corrected or added
4. **Assess Impact**: Determine which PRB sections require updates
5. **Trigger Adaptation**: Initiate dynamic PRB update process

### Context Integration
**INTEGRATION PATTERNS:**
- **Merge Strategy**: Combine new information with existing PRB context
- **Conflict Resolution**: Handle contradictions between old and new information
- **Coherence Maintenance**: Ensure updated context remains logically consistent
- **Completeness Validation**: Verify all correction aspects addressed

### Priority Assessment
**CORRECTION URGENCY:**
- **CRITICAL**: Corrections that make current approach impossible
- **HIGH**: Changes that significantly impact implementation strategy  
- **MEDIUM**: Additions that enhance but don't fundamentally change approach
- **LOW**: Clarifications that provide context but don't change implementation

## Integration Workflows

### During Active Execution
**EXECUTION PAUSE PATTERNS:**
1. **Detect Correction**: Identify user correction requiring PRB update
2. **Assess Continuity**: Determine if current work can continue or must pause
3. **Pause if Needed**: Temporarily halt subagent execution for context update
4. **Process Correction**: Apply user corrections to PRB context
5. **Resume Execution**: Continue with updated context

### Pre-Execution Corrections
**PREPARATION PHASE:**
1. **Correction Detection**: Identify corrections before PRB execution starts
2. **Context Update**: Modify PRB with correction information
3. **Validation**: Ensure updated PRB maintains coherence and completeness
4. **Proceed**: Begin execution with corrected context

## Error Prevention

### Misinterpretation Prevention
**VALIDATION PATTERNS:**
- **Confirmation Requests**: "Did you mean..." confirmations for ambiguous corrections
- **Impact Assessment**: "This change would affect..." explanations
- **Scope Verification**: "So the updated scope is..." clarifications
- **Priority Validation**: "New priority order is..." confirmations

### Overcorrection Prevention
**BALANCE PATTERNS:**
- **Core Preservation**: Maintain original user intent despite corrections
- **Incremental Updates**: Apply corrections incrementally rather than wholesale changes
- **Stability Maintenance**: Preserve stable PRB elements during updates
- **Change Boundaries**: Limit correction impact to affected areas only

## Communication Protocols

### Correction Acknowledgment
**ACKNOWLEDGMENT PATTERNS:**
- **Immediate Recognition**: "I understand the correction..."
- **Impact Description**: "This will change the approach to..."
- **Timeline Update**: "Updated timeline/scope is..."
- **Continuation Plan**: "Continuing with corrected approach..."

### Clarification Requests
**CLARIFICATION PATTERNS:**
- **Ambiguity Resolution**: "To clarify, do you mean..." 
- **Scope Boundaries**: "Should this change also affect..."
- **Priority Confirmation**: "Is this more important than..."
- **Implementation Verification**: "Should I implement this by..."

## Learning Integration

### Correction Pattern Capture
**PATTERN STORAGE:**
- **Common Corrections**: Store frequently occurring correction types
- **Domain Patterns**: Track corrections specific to technology domains
- **User Preferences**: Learn individual user correction patterns
- **Context Triggers**: Identify situations that often require corrections

### Improvement Mechanisms
**CONTINUOUS IMPROVEMENT:**
- **Prediction Enhancement**: Use correction patterns to anticipate needs
- **Question Quality**: Improve initial questions to reduce corrections
- **Context Completeness**: Enhance initial context gathering to minimize gaps
- **Communication Clarity**: Improve explanations to reduce misunderstandings

## Quality Assurance

### Correction Processing Accuracy
**VALIDATION MEASURES:**
- **Correction Completeness**: All user corrections properly captured
- **Context Coherence**: Updated context remains logically consistent
- **Implementation Alignment**: Corrections properly reflected in execution approach
- **User Satisfaction**: Corrections addressed to user's satisfaction

### Integration Effectiveness
**SUCCESS METRICS:**
- **Correction Response Time**: Speed of correction processing and integration
- **Execution Continuity**: Smoothness of transition after corrections
- **Context Quality**: Completeness and accuracy of updated context
- **Outcome Success**: Corrected execution meets updated requirements

---
*User correction integration behavioral patterns for intelligent-claude-code system*