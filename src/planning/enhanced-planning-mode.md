# Enhanced Planning Mode

**CORE:** Structured workflow•File-based assignments•Explicit criteria•Phase enforcement•External integration ready

## Overview

Enhanced planning mode transforms AI behavioral enforcement into deterministic file-based workflows while maintaining natural language interaction and learning capabilities.

## Phase-Based Workflow [MANDATORY]

### INIT Phase
**TRIGGER:** User request or refinement
**ACTIONS:**
1. Capture problem description
2. Identify task type (feature/bug/enhancement)
3. Create initial assignment file
4. Determine epic association

### PLAN Phase
**TRIGGER:** Assignment file in INIT state
**ACTIONS:**
1. Read and process config.md [MANDATORY FIRST]
   ```bash
   # Read config and embed into assignment
   config_path=$(find . -name "config.md" | grep -E "(\.claude/|src/)" | head -1)
   if [ -f "$config_path" ]; then
       echo "Loading: $config_path"
       # Process ALL settings into assignment structure
   else
       echo "WARNING: No config.md found, using defaults"
   fi
   ```
2. @PM + @Architect consultation [MANDATORY]
3. Define acceptance criteria
4. Calculate role capability matches
5. Create subtask breakdown based on config settings
   - If blocking_enabled=false: Review findings create follow-up tasks
   - If blocking_enabled=true: Review findings block execution
6. Define git operations with config applied
   - If git_privacy=true: Strip AI/Claude mentions from commits
   - Enforce branch protection and validation settings
7. Embed ALL config into assignment file structure
   ```yaml
   embedded_config:
     # ALL settings from config.md embedded here
     blocking_enabled: false  # Determines review workflow
     git_privacy: true       # Enforces commit sanitization
     # ... all other settings
   ```
8. Transition to EXECUTE

### EXECUTE Phase
**TRIGGER:** Assignment file in PLAN state with complete criteria
**ACTIONS:**
1. Assigned roles read subtasks
2. Execute subtasks in sequence/parallel
3. Update progress in assignment file
4. Handle blocked/back-to outcomes
5. Complete all subtasks

### ACCEPTANCE Phase
**TRIGGER:** All subtasks completed
**ACTIONS:**
1. Validate acceptance criteria
2. Run automated validations
3. User review and feedback
4. Either back to INIT or proceed to DONE

### DONE Phase
**TRIGGER:** All acceptance criteria passed
**ACTIONS:**
1. Execute git completion operations
2. Archive task to completed/
3. Capture learnings
4. Update scores and metrics

## Slash Commands

### icc:plan-task
**PURPOSE:** Create new task with structured planning
**USAGE:** icc:plan-task "description" [--type feature|bug] [--epic EPIC-XXX]
**EXECUTION:**
1. Create assignment file from template
2. Enter INIT phase
3. Trigger planning workflow

### icc:execute-task
**PURPOSE:** Execute assigned task following assignment file
**USAGE:** icc:execute-task TASK-XXX
**EXECUTION:**
1. Load assignment file
2. Validate phase = EXECUTE
3. Begin subtask execution

### /accept-task
**PURPOSE:** Run acceptance validation
**USAGE:** /accept-task TASK-XXX
**EXECUTION:**
1. Check all subtasks complete
2. Run acceptance criteria validation
3. Present results to user

### /task-status
**PURPOSE:** Show current task status and progress
**USAGE:** /task-status [TASK-XXX | --all]
**EXECUTION:**
1. Display phase, progress, blockers
2. Show acceptance criteria status

## Assignment File Management

### File Naming Convention
```
tasks/active/TASK-XXX-brief-description/
├── assignment.yaml     # Main task definition with embedded config
├── phase              # Current phase marker
├── progress.yaml      # Execution progress
└── artifacts/         # Generated outputs
```

### State Tracking
- Phase tracked in both file and assignment.yaml
- Progress updated in real-time
- Git operations logged
- Config state embedded at planning time

### Workflow Enforcement Through Structure
The assignment file structure itself enforces compliance:

```yaml
# ENFORCEMENT SECTION - Config drives behavior
embedded_config:
  blocking_enabled: false    # Reviews create tasks, not blocks
  git_privacy: true         # Commits auto-sanitized
  
# WORKFLOW SECTION - Self-enforcing steps
workflow:
  review_findings:
    if_blocking_false:
      action: "CREATE_FOLLOWUP_TASK"
      template: "TASK-XXX-fix-[finding]"
    if_blocking_true:
      action: "BLOCK_AND_RETURN"
      
  git_operations:
    if_privacy_true:
      forbidden_terms: ["Claude", "AI", "anthropic", "🤖"]
      commit_filter: "sanitize_before_commit"
    validation: 
      - "scan_credentials"
      - "validate_paths"
      
  execution_rules:
    - "Read embedded_config, not config.md"
    - "Follow workflow section explicitly"
    - "No behavioral interpretation needed"
```

## Role Assignment Protocol

### Capability Matching [MANDATORY]
```pseudocode
FUNCTION assignRole(task, requiredCapabilities):
    FOR each availableRole:
        match = calculateCapabilityMatch(role, requiredCapabilities)
        IF match < 70%:
            HALT
            specialist = createSpecialist(requiredCapabilities)
            RETURN specialist
        ELSE:
            RETURN role WITH match percentage
```

### Peer Review Assignment
- Domain expertise required
- Create specialists if needed
- Document in assignment file

## Integration Readiness

### JIRA Integration (Future)
```yaml
jira_mapping:
  task -> Issue
  subtask -> Subtask
  phase -> Status
  acceptance_criteria -> Custom field
```

### CI/CD Integration (Future)
```yaml
pipeline_gates:
  pr_merge_check: "all_acceptance_criteria_passed"
  deployment_gate: "phase == DONE"
```

## Quality Enforcement

### Mandatory Validations
- Capability match > 70% or specialist created
- All acceptance criteria explicitly defined
- Peer review by domain expert
- Git operations specified

### Blocking Conditions
- Incomplete assignment file → BLOCK execution
- Failed acceptance criteria → BLOCK completion
- Missing peer review → BLOCK merge

## Learning Integration

### Capture Points
- Task completion outcomes
- Blocked subtask reasons
- Time estimates vs actuals
- Pattern recognition

### Memory Storage
```
Entity: "TaskExecution-TASK-XXX"
Observations:
- Approach taken
- Challenges faced
- Solutions found
- Reusable patterns
```

## Workflow as Enforcement Examples

### Example 1: Review Findings with blocking_enabled=false
```yaml
# In assignment file - workflow drives behavior
workflow:
  review_findings:
    if_blocking_false:
      action: "CREATE_FOLLOWUP_TASK"
      
# During execution:
# 1. Review finds issues
# 2. Check workflow.review_findings.if_blocking_false
# 3. Action says CREATE_FOLLOWUP_TASK
# 4. Create new task file, continue execution
# No complex behavioral logic needed!
```

### Example 2: Git Privacy Enforcement
```yaml
# In assignment file
embedded_config:
  git_privacy: true
  
workflow:
  git_operations:
    if_privacy_true:
      forbidden_terms: ["Claude", "AI"]
      sanitization_command: "sed -E 's/(Claude|AI)//gi'"
      
# During commit:
# 1. Check workflow.git_operations.if_privacy_true
# 2. Run sanitization_command on commit message
# 3. Proceed with sanitized commit
# Workflow enforces privacy automatically!
```

### Example 3: Timestamp Generation
```yaml
execution:
  timestamp_command: "date '+%Y-%m-%d %H:%M:%S'"
  
# Usage:
# timestamp=$(eval $execution.timestamp_command)
# No hardcoded dates, workflow provides command!
```

## Migration Path

### From Current System
1. Enhance existing planning mode
2. Add assignment file generation with embedded config
3. Workflow structure replaces behavioral prompts
4. Gradual rollout by task type

### Backwards Compatibility
- Behavioral system remains for non-task interactions
- File-based tasks use workflow enforcement
- Hybrid operation supported