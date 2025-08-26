# PRB Adaptation Behavior

**MANDATORY:** Adapt existing PRBs when users provide corrections or new information during execution.

**PURPOSE:** Main agent behavioral patterns for detecting adaptation needs and dynamically updating PRB context to ensure seamless execution continuation.

## Imports
@./user-correction-integration.md
@./dynamic-prb-updates.md  
@./agent-restart-patterns.md
@./shared-patterns/error-monitoring-patterns.md

## Core Principle: Dynamic PRB Adaptation

**ADAPTATION TRIGGERS:** System must automatically detect when PRB context requires updating based on user corrections, new information, or execution errors.

**CRITICAL:** PRB adaptation operates in main agent context only - subagents cannot modify PRB context.

## Adaptation Detection Patterns

### User Correction Detection
**IMMEDIATE ADAPTATION TRIGGERS:**
- User provides corrections during PRB execution
- User adds new requirements or clarifications
- User identifies errors in current PRB approach
- User provides missing context or dependencies
- User changes scope or priorities mid-execution

**Detection Patterns:**
- **Correction Language**: "Actually, that's wrong...", "I need to correct...", "The real requirement is..."
- **Scope Changes**: "Also include...", "Don't forget...", "We also need..."
- **Error Identification**: "That won't work because...", "The issue is...", "You missed..."
- **Context Addition**: "I should mention...", "Important detail:", "By the way..."
- **Priority Shifts**: "More important is...", "Actually, let's focus on...", "First priority is..."

### Execution Error Detection
**AUTOMATIC ADAPTATION TRIGGERS:**
- Agent reports inability to proceed with current context
- Agent identifies missing dependencies or blockers
- Agent encounters requirements conflicts or ambiguities
- Agent execution fails due to inadequate context
- Agent requests clarification beyond PRB scope

**Error Response Patterns:**
- **Context Refresh**: Re-provide updated PRB context to agent
- **Scope Adjustment**: Modify PRB requirements to address new constraints
- **Dependency Resolution**: Add missing dependencies to PRB context
- **Requirement Clarification**: Enhance PRB with additional specificity

## Adaptation Process

### Real-Time PRB Modification
**CRITICAL STEPS:**
1. **Detect Adaptation Need**: Monitor user corrections and execution errors
2. **Pause Current Execution**: Temporarily halt subagent work if active
3. **Gather Updated Context**: Collect new information and corrections
4. **Modify PRB Content**: Update PRB sections with new context
5. **Validate Updated PRB**: Ensure PRB remains coherent and actionable
6. **Restart Execution**: Continue with updated context

### Context Preservation
**MANDATORY PRESERVATION:**
- Original user intent and core requirements
- Completed work and progress made
- Configuration settings and project constraints
- Integration points and dependencies
- Quality standards and validation criteria

### Incremental Update Patterns
**UPDATE TYPES:**
- **Additive**: Add new requirements without changing existing ones
- **Corrective**: Fix incorrect assumptions or approaches
- **Scope Adjustment**: Expand or contract work boundaries
- **Priority Reordering**: Change sequence or importance of tasks
- **Context Enhancement**: Provide additional background or constraints

## Integration Points

### With PRB Enforcement System
**ADAPTATION COMPLIANCE:**
- Adapted PRBs must maintain template compliance
- All placeholders remain resolved in updated context
- Configuration embedding preserved through updates
- Template structure maintained during modifications

### With Agent Restart Patterns
**SEAMLESS CONTINUATION:**
- Agent receives updated PRB without manual intervention
- Previous work context preserved where relevant
- Clear indication of what changed and why
- Smooth transition from old to new context

### With Memory System
**PATTERN CAPTURE:**
- Store successful adaptation patterns for reuse
- Document common correction types and responses
- Track adaptation effectiveness and outcomes
- Learn from failed adaptations to improve process

## Error Handling

### Adaptation Failures
**FAILURE SCENARIOS:**
- **CONFLICTING_CORRECTIONS**: User corrections create logical conflicts
- **SCOPE_EXPLOSION**: Adaptations exceed PRB complexity limits
- **CONTEXT_FRAGMENTATION**: Updates break PRB coherence
- **TEMPLATE_VIOLATION**: Adaptations violate template structure

**FALLBACK ACTIONS:**
- Request user clarification for conflicting corrections
- Break down oversized adaptations into multiple PRBs
- Regenerate PRB entirely if context becomes fragmented
- Escalate template violations for manual resolution

### Quality Assurance
**VALIDATION CHECKS:**
- Updated PRB remains logically coherent
- New requirements don't conflict with existing work
- Complexity stays within manageable bounds
- All original quality standards maintained
- Configuration compliance preserved

## Behavioral Patterns

### Proactive Adaptation
**ANTICIPATE NEEDS:**
- Monitor execution for potential adaptation triggers
- Identify likely correction points before they occur
- Prepare common adaptation patterns for quick application
- Pre-validate potential modifications for feasibility

### Reactive Adaptation
**RESPOND TO CORRECTIONS:**
- Immediately acknowledge user corrections
- Quickly assess impact on current PRB context
- Efficiently update PRB sections with new information
- Smoothly transition agents to updated context

### Communication Patterns
**USER FEEDBACK:**
- Clearly explain what will be adapted and why
- Confirm understanding of corrections before applying
- Provide transparency into adaptation process
- Report successful adaptation and continuation

## Success Metrics

### Adaptation Effectiveness
- **Adaptation Speed**: Time from correction to updated execution
- **Context Preservation**: Amount of existing work maintained
- **Agent Continuity**: Seamless transition without restart issues
- **User Satisfaction**: Corrections properly addressed

### Quality Measures
- **PRB Coherence**: Updated PRBs remain logically consistent
- **Template Compliance**: Adaptations maintain required structure
- **Execution Success**: Adapted PRBs complete successfully
- **Learning Capture**: Adaptation patterns stored for reuse

---
*PRB adaptation behavioral patterns for intelligent-claude-code system*