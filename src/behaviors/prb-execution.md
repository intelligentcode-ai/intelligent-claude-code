# PRB Execution Behavior

**MANDATORY:** Enforce completion checklist and auto-correct false completion claims.

## Imports
@./shared-patterns/execution-validation.md

## Execution Clarity

**CRITICAL DISTINCTION:** Clear separation between conversation and execution patterns.

### @Role in Conversation vs Agent Deployment

**@Role in Conversation (Discussion/Planning):**
- Purpose: Discussing, planning, coordinating work
- Context: Natural conversation about what needs to be done
- Result: NO execution happens - purely conversational

**Task Tool + PRB = ONLY Execution Path:**
- Purpose: ACTUAL execution of work with full context
- Context: Self-contained PRB with embedded configuration
- Process: Create PRB → Task tool → Agent executes

### PRB Execution Requirements

**PRB-DRIVEN EXECUTION ONLY:**
- ALL work must go through PRB system
- PRBs must be self-contained with embedded context
- No direct work without PRB authorization
- Task tool deployment required for actual execution

## Completion Enforcement

### Completion Checklist Validation

**MANDATORY COMPLETION AREAS:**
1. **Functional Requirements**: All acceptance criteria met
2. **Processual Requirements**: All process requirements followed
3. **Git Operations**: All git operations completed and pushed
4. **Review Process**: All reviews completed and approved
5. **Knowledge Capture**: All learnings captured and stored
6. **Success Criteria**: All success criteria validated

### False Completion Detection

**BLOCK false completion claims:**
- Claims without checklist validation
- Incomplete execution marked as complete
- Missing required deliverables
- Skipped validation steps

**Auto-correction:** Display validation requirements and ensure proper completion

## Quality Gates Enforcement

### Pre-Completion Validation
**ENFORCE quality gates before marking PRB complete:**
- Validate all functional requirements met
- Confirm all processual requirements followed
- Verify git operations completed
- Check review process completed
- Validate knowledge capture completed
- Confirm success criteria met

### Bug Lifecycle Integration

**MANDATORY:** Automatic bug status updates when PRB completes bug fixes.

**Bug Reference Detection:**
- **Pattern Matching**: Check PRB ID for BUG-XXX patterns (e.g., BUG-027-PRB-001)
- **Content Scanning**: Search PRB context for bug references in requirements
- **Parent Analysis**: Extract bug ID from parent work item references

**Automatic Status Update Process:**
1. **Identify Bug References**: Extract all BUG-XXX references from PRB
2. **Validate Bug Exists**: Confirm referenced bug exists in bug_path/bug_open/
3. **Status Validation**: Verify bug is currently in OPEN or IN_PROGRESS status
4. **Execute Fix Validation**: Confirm PRB execution successfully completed all requirements
5. **Update Bug Status**: Change bug status to COMPLETED in YAML frontmatter
6. **Move Bug File**: Transfer bug file from bug_path/bug_open/ to bug_path/bug_completed/
7. **Update Bug Metadata**: Add completion date and reference to fixing PRB

**Bug Status Update Implementation:**
```yaml
# Bug file YAML frontmatter updates
---
id: "BUG-027"
status: "COMPLETED"  # Changed from "OPEN" or "IN_PROGRESS"
completion_date: "YYYY-MM-DD"
fixed_by_prb: "BUG-027-PRB-001-implement-bug-status-automation-2025-01-26"
resolution: "Implemented automatic bug status updates in PRB completion process"
---
```

**Integration Points:**
- **PRB Quality Gates**: Bug status update happens BEFORE PRB marked complete
- **Directory Management**: Uses configured bug_path, bug_open, bug_completed paths
- **Error Handling**: Graceful handling of missing bugs or invalid references
- **Logging**: Track bug lifecycle transitions in memory/behavioral-patterns/

**Enforcement Rules:**
- **BLOCK PRB completion** if referenced bug cannot be found
- **VALIDATE bug status change** before file movement
- **ENSURE atomic operation** - either all bug updates succeed or PRB completion fails
- **DOCUMENT transitions** in bug resolution field

**Error Scenarios:**
- **BUG_NOT_FOUND**: Referenced bug doesn't exist in bug_open/
- **BUG_ALREADY_COMPLETED**: Bug already in bug_completed/ directory  
- **INVALID_BUG_STATUS**: Bug has invalid or missing status in frontmatter
- **FILE_MOVE_FAILED**: Cannot move bug file to completed directory

**Recovery Actions:**
- **Create missing bug**: If bug referenced but doesn't exist, create minimal bug record
- **Status correction**: Fix invalid bug status before processing
- **Directory creation**: Auto-create bug directories if missing
- **Manual intervention**: Flag complex cases for manual resolution

## PRB Lifecycle Management

### File Movement Protocol
**MANDATORY SEQUENCE:**
1. Complete all functional requirements
2. Complete all processual requirements  
3. Complete all git operations and push
4. Complete review process
5. Complete knowledge capture
6. Validate success criteria
7. **Execute bug lifecycle integration** (if PRB references bugs)
8. **FINAL STEP:** Move PRB file from prbs/ready/ to prbs/completed/

**CRITICAL RULE:** PRB file movement is the absolute final operation

### State Management
**PRB States:**
- **READY**: File in prbs/ready/, available for execution
- **IN_PROGRESS**: File in prbs/ready/, currently being executed
- **COMPLETED**: File in prbs/completed/, execution finished

**State Rules:**
- Only READY PRBs can begin execution
- PRBs remain in ready/ throughout execution
- Move to completed/ only after ALL validation passes
- Failed executions leave PRB in ready/ for retry

## Error Recovery

### Common Error Scenarios
- **Incomplete execution**: Identify missing areas, guide completion
- **False completion claims**: Block and display validation requirements
- **State corruption**: Reset to last good state, rebuild from evidence

### Recovery Actions
- Reset PRB state to ready/ for retry
- Display specific completion requirements
- Guide through proper completion process

---
*PRB execution behavior for intelligent-claude-code system*