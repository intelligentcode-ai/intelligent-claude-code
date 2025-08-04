# PRB Execution Behavior

**MANDATORY:** ALL PRB execution MUST use Task tool subagent creation. Parent is COORDINATOR ONLY.

**PURPOSE:** Enforce proper PRB execution lifecycle with mandatory subagent coordination

## Imports
@../shared-patterns/learning-patterns.md
@../shared-patterns/template-loading.md
@../shared-patterns/memory-operations.md

## ABSOLUTE RULE: PARENT NEVER EXECUTES WORK DIRECTLY

**CRITICAL ENFORCEMENT:** Parent agent role is LIMITED to coordination, monitoring, and validation. ALL actual work execution MUST be performed by subagents created via Task tool.

### Mandatory Subagent Creation Protocol

**REQUIRED FOR ALL PRBs:**
```xml
<invoke name="Task">
<parameter name="taskDescription">[Complete work description with context]</parameter>
<parameter name="projectContext">[Full project context and requirements]</parameter>
</invoke>
```

**PARENT COORDINATION RESPONSIBILITIES ONLY:**
- Load complete context once
- Create subagent via Task tool invocation  
- Monitor subagent execution progress
- Validate completion against success criteria
- Update PRB status and lifecycle
- Capture learnings for memory storage
- Coordinate with reviewers if required

**ABSOLUTE PROHIBITIONS FOR PARENT:**
- File creation or modification
- Code implementation
- Git operations execution
- System configuration changes
- Direct problem solving
- Task completion activities

## PRB Execution Lifecycle States

### State Progression Requirements
- **INITIALIZED**: PRB loaded, context gathered, subagent creation pending
- **SUBAGENT_CREATED**: Task tool invocation completed, subagent active
- **IN_PROGRESS**: Subagent actively executing work
- **PENDING_REVIEW**: Subagent completed work, awaiting review (if required)
- **PENDING_VALIDATION**: Review passed, awaiting success criteria validation
- **PENDING_KNOWLEDGE**: Validation complete, awaiting knowledge capture
- **PENDING_GIT**: Knowledge captured, awaiting git operations completion
- **PENDING_LIFECYCLE**: Git operations complete, awaiting PRB file movement
- **COMPLETE**: All checklist items validated, PRB moved to completed/

### State Transition Guards
**MANDATORY VALIDATION:** Each state transition MUST validate:
- Previous state completion via subagent
- Parent coordinator-only role maintained
- Subagent execution evidence present
- No direct parent execution detected

## Mandatory Execution Checklist

**CRITICAL:** Every PRB has 6 mandatory sections. ALL must be executed by subagent with parent coordination.

### Section-by-Section Execution Requirements
```markdown
MANDATORY PRB SECTION EXECUTION (via subagent):
☐ 1. Complete Context Section - Subagent validates all file references and settings
☐ 2. Requirements Section - Subagent implements EVERY functional/processual/technical requirement
☐ 3. Git Operations Section - Subagent executes EVERY git command as specified
☐ 4. Knowledge Management Section - Subagent captures ALL learnings in specified paths
☐ 5. Review Process Section - Subagent coordinates with ALL reviewers for completion
☐ 6. Implementation Samples Section - Subagent applies samples correctly with examples

PARENT COORDINATION CHECKLIST:
☐ Task tool subagent created successfully
☐ Complete context passed to subagent
☐ Subagent execution monitored continuously
☐ Progress validated against requirements
☐ Completion verified through subagent results
☐ PRB status updated appropriately
☐ Learning capture coordinated but executed by subagent
☐ No direct parent execution attempted

EXECUTION TRACKING (parent coordination):
☐ Each section assigned to subagent
☐ Each requirement executed by subagent (parent monitors only)
☐ Each completion verified through subagent evidence
☐ Each result documented by subagent
☐ Move to next section only after subagent completion verification
```

### Settings Compliance Verification
```markdown
SETTINGS ENFORCEMENT CHECKLIST (subagent execution):
☐ git_privacy setting verified and applied by subagent to ALL git operations
☐ branch_protection rules followed by subagent for branch creation/merging
☐ default_branch setting used by subagent for all git operations
☐ autonomy_level behaviors applied by subagent throughout execution
☐ memory_integration enabled and learnings stored by subagent
☐ All other configuration settings from CLAUDE.md applied by subagent

PARENT COORDINATION VERIFICATION:
☐ Settings passed correctly to subagent
☐ Subagent compliance monitored
☐ Violations detected and corrected
☐ No direct parent execution of settings
```

## Subagent Creation Requirements

### Model Requirements by Complexity
- **Nano/Tiny PRBs:** claude-3-sonnet
- **Medium+ PRBs:** claude-3-haiku-plus or claude-3-sonnet
- **Large/Mega PRBs:** claude-3-sonnet (required for orchestration)

### Task Description Requirements
**MUST INCLUDE:**
- Complete work description and context
- All functional requirements
- All processual requirements
- All technical requirements
- Success criteria
- Quality standards
- Git operation requirements
- Knowledge capture requirements

### Project Context Requirements
**MUST INCLUDE:**
- System nature identification
- Project root absolute path
- All configuration values (no placeholders)
- Critical file references with samples
- User requirements clearly stated
- Embedded memory entries from search
- All relevant project standards and patterns

## Execution Monitoring Protocol

### Parent Coordination Activities
**ALLOWED PARENT ACTIVITIES:**
- Monitor subagent progress and status
- Validate subagent results against requirements
- Coordinate with reviewers on subagent's behalf
- Update PRB status based on subagent completion
- Capture learnings from subagent execution
- Facilitate communication between subagent and stakeholders

**PROHIBITED PARENT ACTIVITIES:**
- Any direct file operations
- Any code implementation
- Any git command execution
- Any system configuration changes
- Any direct problem solving
- Any task completion work

### Subagent Validation Requirements
**PARENT MUST VERIFY:**
- Subagent understands complete requirements
- Subagent has appropriate model capability
- Subagent execution aligns with PRB specifications
- Subagent completes all mandatory sections
- Subagent results meet quality standards
- Subagent follows all configuration settings

## Completion Enforcement Mechanisms

### Subagent Completion Validation
**PARENT VALIDATES (but does not execute):**
- All functional requirements implemented by subagent
- All processual requirements followed by subagent
- All git operations completed by subagent
- All reviews coordinated and completed through subagent
- All knowledge capture completed by subagent
- All success criteria met by subagent

### False Completion Detection
**TRIGGERS FOR PARENT MONITORING:**
- "PRB COMPLETE" without subagent evidence
- "Task finished" without subagent validation
- "Work done" without subagent review
- Status change without subagent state verification

**PARENT RESPONSE ACTIONS:**
- VALIDATE subagent completion evidence
- REQUEST missing subagent validation
- COORDINATE additional subagent work if needed
- UPDATE PRB status only after subagent validation
- NEVER complete work directly to "fix" completion

## Integration Points

### With PRB Enforcement System
- Validates subagent creation is mandatory for all PRBs
- Monitors that parent maintains coordinator-only role
- Prevents any direct parent execution during PRB lifecycle
- Enforces subagent-based execution patterns

### With Learning System
- Captures subagent coordination patterns through parent observation
- Stores successful subagent management techniques
- Learns from subagent execution effectiveness
- Applies learning bonuses for referencing stored coordination patterns

### With Review System
- Coordinates reviews through subagent execution
- Ensures reviewer feedback is processed by subagent
- Validates review completion through subagent evidence
- Maintains parent coordinator role during review process

### With Git Operations
- Ensures all git operations are executed by subagent
- Validates git command compliance through subagent
- Monitors clean working state through subagent results
- Enforces branch management through subagent execution

## Quality Gate Enforcement

### Subagent Quality Validation
```
EnforceQualityGates(prb_id, subagent_id):
  functional_complete = ValidateSubagentFunctionalRequirements(subagent_id)
  processual_complete = ValidateSubagentProcessualRequirements(subagent_id)
  git_complete = ValidateSubagentGitOperations(subagent_id)
  review_complete = ValidateSubagentReviewCompletion(subagent_id)
  knowledge_complete = ValidateSubagentKnowledgeCapture(subagent_id)
  success_complete = ValidateSubagentSuccessCriteria(subagent_id)
  
  # Parent coordinates but subagent executes final PRB move
  if ALL([functional_complete, processual_complete, git_complete, 
         review_complete, knowledge_complete, success_complete]):
    lifecycle_complete = CoordinateSubagentPRBMove(prb_id, subagent_id)
  
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

### Parent Coordination Validation
```
ValidateParentCoordination(prb_id):
  subagent_created = ValidateTaskToolInvocation(prb_id)
  context_passed = ValidateCompleteContextTransfer(prb_id)
  monitoring_active = ValidateActiveMonitoring(prb_id)
  no_direct_execution = ValidateNoParentExecution(prb_id)
  coordination_effective = ValidateEffectiveCoordination(prb_id)
  
  return ALL([
    subagent_created,
    context_passed,
    monitoring_active,
    no_direct_execution,
    coordination_effective
  ])
```

## Error Recovery and Learning

### Subagent Failure Recovery
**IF SUBAGENT FAILS:**
1. **Parent analyzes** failure cause (coordination only)
2. **Parent creates new subagent** with improved context/instructions
3. **Parent transfers** remaining work to new subagent
4. **Parent captures** failure learnings for memory storage
5. **Parent NEVER** completes work directly to "fix" failure

### Parent Violation Recovery
**IF PARENT ATTEMPTS DIRECT EXECUTION:**
1. **IMMEDIATE BLOCK** of parent execution attempt
2. **FORCE SUBAGENT CREATION** for blocked work
3. **TRANSFER BLOCKED WORK** to subagent
4. **LOG VIOLATION** for learning and pattern improvement
5. **ESCALATE** if violations persist

### Learning Capture Protocol
**PARENT COORDINATES LEARNING STORAGE:**
- Subagent coordination effectiveness patterns
- Successful subagent management techniques
- Task tool invocation optimization approaches
- Quality validation methods through subagent evidence
- Review coordination strategies via subagent execution

## Monitoring and Metrics

### Subagent Execution Metrics
- Subagent creation compliance rate: Target 100%
- Parent coordinator-only adherence: Target 100%
- Subagent completion success rate: Target >95%
- Quality gate pass rates through subagent: Target >90%

### Coordination Effectiveness Metrics
- Parent-subagent coordination efficiency
- Context transfer completeness to subagent
- Monitoring effectiveness during subagent execution
- Completion validation accuracy through subagent evidence

## Implementation Commands

### Subagent Coordination Commands
- `/icc-create-subagent [prb_id]` - Create Task tool subagent for PRB
- `/icc-validate-subagent-execution [prb_id]` - Validate subagent is executing work
- `/icc-monitor-subagent-progress [prb_id]` - Monitor subagent progress
- `/icc-coordinate-subagent-completion [prb_id]` - Coordinate subagent completion validation

**SUCCESS DEFINITION:**
PRB execution system successfully ensures ALL work is performed by subagents through Task tool invocation, with parent maintaining absolute coordinator-only role throughout entire PRB lifecycle, resulting in consistent high-quality execution and proper virtual team coordination.