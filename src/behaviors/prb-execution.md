# PRB Execution Behavior

**MANDATORY:** MUST enforce completion checklist. Auto-correct false completion claims.

**PURPOSE:** Enforce proper PRB execution lifecycle with mandatory completion validation

## Imports
@./shared-patterns/learning-patterns.md
@./shared-patterns/template-loading.md

## Execution State Tracking

### PRB Lifecycle States
- **INITIALIZED**: PRB loaded, context gathered
- **IN_PROGRESS**: Active execution of requirements
- **PENDING_REVIEW**: Work complete, awaiting review
- **PENDING_VALIDATION**: Review passed, awaiting success criteria validation
- **PENDING_KNOWLEDGE**: Validation complete, awaiting knowledge capture
- **PENDING_GIT**: Knowledge captured, awaiting git operations
- **COMPLETE**: All checklist items validated

### State Transition Guards
Each state transition MUST validate previous state completion before proceeding.

## Mandatory Completion Checklist

### Functional Requirements Validation
```markdown
## Functional Requirements ✓
[ ] All specified deliverables created/modified
[ ] All functional acceptance criteria met
[ ] All code changes implement requirements correctly
[ ] All dependencies properly handled
[ ] All edge cases addressed
```

### Processual Requirements Validation
```markdown
## Processual Requirements ✓
[ ] PRB template requirements followed
[ ] Role assignments completed
[ ] Complexity level appropriate
[ ] Quality standards met
[ ] Documentation updated if required
```

### Review Validation
```markdown
## Review Completion ✓
[ ] Assigned reviewer identified
[ ] Review executed by qualified specialist
[ ] All review feedback addressed
[ ] Review approval received
[ ] Quality gates passed
```

### Success Criteria Validation
```markdown
## Success Criteria ✓
[ ] All acceptance criteria validated
[ ] Performance requirements met
[ ] Security requirements satisfied
[ ] Integration tests pass
[ ] System remains stable
```

### Knowledge Capture Validation
```markdown
## Knowledge Capture ✓
[ ] Learnings identified and documented
[ ] Memory entities created/updated
[ ] Patterns captured for future use
[ ] Error handling improved
[ ] Success metrics recorded
```

### Git Operations Validation
```markdown
## Git Operations ✓
[ ] All changes staged properly
[ ] Commit messages follow privacy requirements
[ ] Branch operations completed
[ ] No uncommitted work remains
[ ] Git status clean
```

### PRB Lifecycle Validation
```markdown
## PRB Lifecycle ✓
[ ] PRB file moved to completed/
[ ] Execution log updated
[ ] Dependencies notified
[ ] Follow-up tasks created if needed
[ ] System state clean
```

## Completion Enforcement Mechanisms

### False Completion Detection
**TRIGGERS:**
- "PRB COMPLETE" without all checklist items
- "Task finished" without validation
- "Work done" without review
- Status change without state verification

**ACTIONS:**
- BLOCK completion claim immediately
- Display missing checklist items
- Reset to appropriate execution state
- Require explicit validation of each item

### Validation Requirements
**EACH CHECKLIST ITEM:**
- Must be explicitly verified
- Cannot be assumed or skipped
- Requires evidence of completion
- Must pass quality gates

**NO SHORTCUTS:**
- Cannot mark complete without all items
- Cannot skip reviews for "simple" work
- Cannot bypass git operations
- Cannot avoid knowledge capture

### Auto-Correction Patterns
**INCOMPLETE CLAIM DETECTED:**
```
❌ PRB COMPLETION BLOCKED
Reason: Missing required validation items
Missing: [list of unchecked items]
Action: Complete missing items before claiming PRB complete
Current State: [current_state]
Required State: COMPLETE
```

**ENFORCED VALIDATION:**
- Each checklist item must be explicitly marked ✓
- Evidence must be provided for each item
- Quality gates must pass before proceeding
- No assumptions or shortcuts allowed

## Integration Points

### With PRB Enforcement
- Blocks direct work without PRB
- Validates PRB state throughout execution
- Prevents premature completion claims
- Enforces sequential state transitions

### With Learning System
- Captures completion enforcement patterns
- Learns from false completion attempts
- Improves validation accuracy over time
- Stores enforcement effectiveness data

### With Git Operations
- Validates git operations completion
- Ensures commit message compliance
- Verifies clean working state
- Enforces branch management requirements

### With Review System
- Mandates review completion
- Validates reviewer qualifications
- Ensures feedback incorporation
- Blocks completion without review approval

## Implementation Patterns

### State Validation Function
```
ValidatePRBState(prb_id, target_state):
  current_state = GetPRBState(prb_id)
  checklist = LoadCompletionChecklist(prb_id)
  
  for required_state in StateTransitionPath(current_state, target_state):
    items = GetChecklistItems(required_state)
    for item in items:
      if not ValidateItem(item):
        BLOCK_TRANSITION()
        DISPLAY_MISSING_ITEMS()
        return VALIDATION_FAILED
  
  return VALIDATION_PASSED
```

### Completion Claim Interceptor
```
InterceptCompletionClaim(claim_text):
  if DetectCompletionPattern(claim_text):
    prb_id = ExtractPRBId(claim_text)
    validation = ValidatePRBState(prb_id, "COMPLETE")
    if validation == VALIDATION_FAILED:
      BLOCK_COMPLETION()
      DISPLAY_CHECKLIST()
      RESET_TO_APPROPRIATE_STATE()
    else:
      ALLOW_COMPLETION()
```

### Quality Gate Enforcement
```
EnforceQualityGates(prb_id):
  functional_complete = ValidateFunctionalRequirements(prb_id)
  processual_complete = ValidateProcessualRequirements(prb_id)
  git_complete = ValidateGitOperations(prb_id)
  review_complete = ValidateReviewCompletion(prb_id)
  knowledge_complete = ValidateKnowledgeCapture(prb_id)
  success_complete = ValidateSuccessCriteria(prb_id)
  lifecycle_complete = ValidatePRBLifecycle(prb_id)
  
  return ALL([
    functional_complete,
    processual_complete,
    git_complete,
    review_complete,
    knowledge_complete,
    success_complete,
    lifecycle_complete
  ])
```

## Error Recovery

### Incomplete Execution Recovery
- Identify missing checklist items
- Reset to appropriate execution state
- Provide clear guidance for completion
- Track patterns for prevention

### False Completion Recovery
- Immediately block completion claim
- Display validation requirements
- Guide through missing steps
- Ensure proper completion

### State Corruption Recovery
- Detect inconsistent PRB states
- Reset to last known good state
- Rebuild state from execution evidence
- Prevent future corruption

## Monitoring and Metrics

### Completion Quality Metrics
- Checklist compliance rate
- False completion detection rate
- Average time to proper completion
- Quality gate pass rates

### Enforcement Effectiveness
- Blocked false completions
- Improved completion accuracy
- Reduced rework incidents
- Enhanced delivery quality

---
*PRB execution behavior with mandatory completion enforcement*