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
**If PRB references a bug:**
- Extract bug ID from PRB context
- Mark referenced bug as complete
- Update bug status in bug lifecycle system

## PRB Lifecycle Management

### File Movement Protocol
**MANDATORY SEQUENCE:**
1. Complete all functional requirements
2. Complete all processual requirements  
3. Complete all git operations and push
4. Complete review process
5. Complete knowledge capture
6. Validate success criteria
7. **FINAL STEP:** Move PRB file from prbs/ready/ to prbs/completed/

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