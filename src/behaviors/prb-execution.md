# PRB Execution Behavior

**MANDATORY:** MUST enforce completion checklist. Auto-correct false completion claims.

**PURPOSE:** Enforce proper PRB execution lifecycle with mandatory completion validation

## Imports
@./shared-patterns/learning-patterns.md
@./shared-patterns/template-loading.md

## MANDATORY EXECUTION CHECKLIST

**CRITICAL:** Every PRB has 6 mandatory sections. ALL must be executed without exception.

### Section-by-Section Execution Requirements
```markdown
MANDATORY PRB SECTION EXECUTION:
☐ 1. Complete Context Section - ALL file references validated, settings loaded
☐ 2. Requirements Section - EVERY functional/processual/technical requirement met
☐ 3. Git Operations Section - EVERY command executed exactly as specified
☐ 4. Knowledge Management Section - ALL learnings captured in specified paths
☐ 5. Review Process Section - ALL reviewers complete their reviews
☐ 6. Implementation Samples Section - Applied correctly with examples

CRITICAL SETTINGS ENFORCEMENT:
☐ git_privacy: true → NO "Generated with Claude Code", NO "Co-Authored-By: Claude"
☐ branch_protection: true → Follow branch protection rules exactly
☐ autonomy_level → Apply L1/L2/L3 behaviors as configured
☐ memory_integration: true → Store ALL learnings as specified

EXECUTION TRACKING:
☐ Each section read and understood
☐ Each requirement executed exactly as specified (no interpretation)
☐ Each completion verified against specification
☐ Each result documented in execution log
☐ Move to next section only after verification

PROJECT SCOPE VALIDATION (MANDATORY BEFORE EXECUTION):
☐ All file operations validated within project root
☐ No write operations to ~/.claude/ during normal execution
☐ Task tool invocations constrained to project boundaries
☐ Memory operations restricted to ./memory/ directory
☐ Configuration changes limited to project-local only

SYSTEMATIC VALIDATION (MANDATORY BEFORE COMPLETION):
☐ Comprehensive project search executed and documented
☐ All deliverables verified with evidence
☐ Documentation completeness validated
☐ Zero remaining references confirmed
☐ Validation log complete with all evidence
☐ All validation functions executed successfully

SKIP NOTHING. EXECUTE EVERYTHING. VALIDATE SYSTEMATICALLY.
```

### Settings Compliance Verification
```markdown
SETTINGS ENFORCEMENT CHECKLIST:
☐ git_privacy setting verified and applied to ALL git operations
☐ branch_protection rules followed for branch creation/merging
☐ default_branch setting used for all git operations
☐ autonomy_level behaviors applied throughout execution
☐ memory_integration enabled and learnings stored
☐ All other configuration settings from CLAUDE.md applied

CRITICAL: Settings are NOT suggestions - they are MANDATORY requirements.
```

## Execution State Tracking

### PRB Lifecycle States
- **INITIALIZED**: PRB loaded, context gathered
- **IN_PROGRESS**: Active execution of requirements
- **PENDING_REVIEW**: Work complete, awaiting review
- **PENDING_VALIDATION**: Review passed, awaiting success criteria validation
- **PENDING_KNOWLEDGE**: Validation complete, awaiting knowledge capture
- **PENDING_GIT**: Knowledge captured, awaiting git operations
- **PENDING_LIFECYCLE**: Git operations complete, awaiting PRB file move
- **COMPLETE**: All checklist items validated, PRB moved to completed/

### State Transition Guards
Each state transition MUST validate previous state completion before proceeding.

## Project Scope Validation

**MANDATORY:** All PRB execution MUST validate project scope boundaries before any file operations.

### Pre-Execution Scope Validation

```markdown
PROJECT SCOPE VALIDATION CHECKLIST:
☐ Current project root identified and validated
☐ All file operations constrained to project directory
☐ No write operations to ~/.claude/ (except installation/explicit global config)
☐ Memory operations directed to ./memory/ not ~/.claude/memory/
☐ Task tool working directories within project boundaries
☐ Configuration changes limited to project-local scope
```

### Scope Violation Detection

**CRITICAL VIOLATIONS:**
- Write operations to ~/.claude/ during normal execution
- Memory storage outside project ./memory/ directory
- Task tool invocations with external working directories
- File operations outside current project root
- Global configuration modifications without explicit user request

**VALIDATION FUNCTION:**
```
ExecuteProjectScopeValidation(prb_context):
  project_root = prb_context.complete_context.project_root
  
  # Validate all planned file operations
  FOR each operation IN prb_context.file_operations:
    IF operation.type == "write" AND operation.path.startswith("~/.claude/"):
      IF NOT operation.context == "installation" AND NOT operation.context == "explicit_global_config":
        BLOCK_PRB_EXECUTION()
        RETURN SCOPE_VIOLATION_ERROR("Write to ~/.claude/ forbidden during normal execution")
    
    IF NOT operation.path.startswith(project_root):
      BLOCK_PRB_EXECUTION()
      RETURN PROJECT_BOUNDARY_ERROR("Operation outside project boundaries")
  
  # Validate Task tool invocations
  FOR each task IN prb_context.task_invocations:
    IF task.working_directory AND task.working_directory.startswith("~/.claude/"):
      BLOCK_PRB_EXECUTION() 
      RETURN TASK_SCOPE_ERROR("Task working directory cannot be ~/.claude/")
  
  RETURN VALIDATION_PASSED
```

### Scope Enforcement Actions

**WHEN SCOPE VIOLATIONS DETECTED:**
1. **BLOCK PRB EXECUTION** immediately
2. **DISPLAY CLEAR ERROR MESSAGE** explaining the violation
3. **REDIRECT TO PROJECT BOUNDARIES** with guidance
4. **LOG VIOLATION ATTEMPT** for monitoring
5. **REQUIRE SCOPE CORRECTION** before proceeding

**ERROR MESSAGES:**
- "❌ PRB BLOCKED: Scope violation detected - write operations to ~/.claude/ forbidden"
- "❌ PRB BLOCKED: File operations must remain within project root {project_root}"
- "❌ PRB BLOCKED: Task tool cannot use ~/.claude/ as working directory"
- "❌ PRB BLOCKED: Memory operations must use ./memory/ directory"

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
[ ] Changes pushed to remote repository
[ ] No uncommitted work remains
[ ] Git status clean
```

### PRB Lifecycle Validation
```markdown
## PRB Lifecycle ✓
[ ] All git operations completed and pushed
[ ] Execution log updated with final status
[ ] Dependencies notified of completion
[ ] Follow-up tasks created if needed
[ ] System state clean and validated
[ ] PRB file moved to completed/ (FINAL STEP)
```

**CRITICAL:** PRB file move MUST be the absolute final step after all other operations complete successfully. This prevents PRBs from remaining in ready/ after execution and ensures clean lifecycle management.

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

## SYSTEMATIC END-TO-END VALIDATION

**MANDATORY:** Before marking ANY PRB complete, MUST execute systematic validation with evidence collection.

### Pre-Completion Validation Protocol

**STEP 1: Comprehensive Project Search**
```bash
# Search for ALL terms being removed/changed
grep -r "SEARCH_TERMS" /project/root/
rg "PATTERN" --type-add 'docs:*.md' --type docs .
find . -name "*.md" -exec grep -l "TERMS" {} \;
```

**STEP 2: Deliverable Verification**
- Check EVERY deliverable listed in functional_requirements
- Validate EVERY specification is implemented  
- Confirm ALL quality gates pass
- Document verification commands and results

**STEP 3: Documentation Completeness**
- Verify ALL files requiring updates are updated
- Check README.md, docs/, and ALL project documentation
- Search entire project for outdated references
- Ensure consistency across entire codebase

### Evidence Collection Requirements

**MANDATORY EVIDENCE FOR EACH PRB:**
```markdown
## SYSTEMATIC VALIDATION LOG
### Search Validation
- Command: grep -r "badges\|P:X\.X\|Q:X\.X" .
- Results: [DOCUMENTED RESULTS]
- Zero remaining references: ✓/❌

### Deliverable Verification  
- Functional requirements check: ✓/❌
- All specifications implemented: ✓/❌
- Quality gates passed: ✓/❌

### Documentation Validation
- README.md updated: ✓/❌
- All docs/ files checked: ✓/❌
- Project-wide consistency: ✓/❌

### Evidence Summary
- Total files searched: [NUMBER]
- References found and addressed: [NUMBER]
- Validation commands executed: [LIST]
```

### Validation Enforcement

**BLOCKING CONDITIONS:**
- Cannot mark PRB complete without validation log
- Cannot claim completion with remaining references found
- Cannot skip systematic search documentation
- Cannot assume scope without explicit verification

**VALIDATION FAILURE RECOVERY:**
```
❌ SYSTEMATIC VALIDATION FAILED
Missing Evidence: [specific items]
Remaining References: [found items]
Required Actions: [specific fixes needed]
Status: PRB remains IN_PROGRESS until validation passes
```

### Automated Validation Functions

**Search Validation Function:**
1. Execute comprehensive project search for specified terms
2. Document all findings with file locations and line numbers
3. Verify zero remaining references or document why exceptions are valid
4. Store results in PRB execution log

**Deliverable Verification Function:**
1. Parse PRB functional_requirements section
2. Check each deliverable exists and meets specifications
3. Validate all quality gates with concrete evidence
4. Document verification results with proof

**Documentation Completeness Function:**
1. Identify all documentation files in project
2. Search each file for terms being updated/removed
3. Verify consistency across all documentation
4. Confirm README.md and primary docs are updated

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
  
  # PRB file move MUST be the absolute final step
  if ALL([functional_complete, processual_complete, git_complete, 
         review_complete, knowledge_complete, success_complete]):
    lifecycle_complete = MovePRBToCompleted(prb_id)
  
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

## PRB Lifecycle Management

### PRB File Movement Protocol
**MANDATORY SEQUENCE:**
1. Complete all functional requirements
2. Complete all processual requirements  
3. Complete all git operations and push
4. Complete review process
5. Complete knowledge capture
6. Validate success criteria
7. **FINAL STEP:** Move PRB file from prbs/ready/ to prbs/completed/

**CRITICAL RULE:** PRB file movement is the absolute final operation. If ANY prior step fails, PRB remains in ready/ for retry.

### Lifecycle State Management
```
PRB_READY: File in prbs/ready/, available for execution
PRB_IN_PROGRESS: File in prbs/ready/, currently being executed
PRB_COMPLETED: File in prbs/completed/, execution finished
```

**State Validation:**
- Only PRBs in READY state can begin execution
- PRBs remain in ready/ throughout entire execution
- Move to completed/ only occurs after ALL validation passes
- Failed executions leave PRB in ready/ for retry

### Automatic Cleanup Prevention
**PREVENTS:**
- PRBs stuck in ready/ after successful execution
- Lost PRBs due to premature file moves
- Incomplete executions marked as complete
- State inconsistencies in PRB management

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