# Review Findings Handler

**CORE:** Process review findings•Respect config settings•Create follow-up tasks or block•Scope control

## Overview

Handles review findings based on embedded configuration, preventing scope creep and ensuring proper action based on severity and blocking settings.

## Review Findings Workflow

### Finding Classification
```pseudocode
FUNCTION classifyFinding(finding, originalCriteria):
    // Prevent scope creep - must relate to original criteria
    IF NOT relatedToOriginalCriteria(finding, originalCriteria):
        RETURN {
            type: "OUT_OF_SCOPE",
            action: "CREATE_ENHANCEMENT_TASK",
            severity: "enhancement"
        }
    
    // Classify based on impact
    IF finding.prevents_acceptance_criteria:
        RETURN {type: "CRITICAL", severity: "critical"}
    ELIF finding.security_vulnerability:
        RETURN {type: "CRITICAL", severity: "critical"}
    ELIF finding.breaks_functionality:
        RETURN {type: "CRITICAL", severity: "critical"}
    ELIF finding.improves_quality:
        RETURN {type: "ENHANCEMENT", severity: "enhancement"}
    ELSE:
        RETURN {type: "MINOR", severity: "minor"}
END FUNCTION
```

### Action Determination
```pseudocode
FUNCTION determineAction(finding, embeddedConfig):
    severity = finding.severity
    blockingEnabled = embeddedConfig.violation_handling.blocking
    
    SWITCH severity:
        CASE "critical":
            IF blockingEnabled:
                RETURN {
                    action: "BLOCK_AND_REFINE",
                    phase_transition: "INIT",
                    reason: finding.description
                }
            ELSE:
                RETURN {
                    action: "CREATE_FOLLOWUP_TASK",
                    priority: "P0",
                    task_type: "bug",
                    parent_task: currentTaskId
                }
        
        CASE "enhancement":
            RETURN {
                action: "CREATE_FOLLOWUP_TASK",
                priority: "P2",
                task_type: "enhancement",
                parent_task: currentTaskId
            }
        
        CASE "minor":
            RETURN {
                action: "DOCUMENT_ONLY",
                location: "known_issues.md",
                priority: "P3"
            }
END FUNCTION
```

### Follow-up Task Creation
```pseudocode
FUNCTION createFollowUpTask(finding, parentTask, priority):
    newTaskId = generateTaskId()
    
    followUpTask = {
        task: {
            id: newTaskId,
            title: "Address review finding: " + finding.title,
            type: finding.severity == "critical" ? "bug" : "enhancement",
            parent_task: parentTask.id,
            created_from: "review_finding",
            priority: priority
        },
        
        problem_description: finding.description,
        
        acceptance_criteria: [
            {
                description: "Original finding addressed",
                validation_method: "peer_review"
            },
            {
                description: "No regression in parent task functionality",
                validation_method: "automated_test"
            }
        ],
        
        // Inherit config from parent
        embedded_config: parentTask.embedded_config,
        
        // Link to parent
        relationships: {
            parent: parentTask.id,
            blocks: finding.severity == "critical" ? [parentTask.id] : [],
            related_to: [parentTask.id]
        }
    }
    
    // Save to tasks/active/
    saveTaskFile(followUpTask)
    
    RETURN newTaskId
END FUNCTION
```

### Scope Control
```pseudocode
FUNCTION enforeceScopeControl(reviewFindings, originalTask):
    scopedFindings = []
    outOfScopeFindings = []
    
    FOR finding IN reviewFindings:
        // Check if finding relates to original acceptance criteria
        isInScope = false
        
        FOR criteria IN originalTask.acceptance_criteria:
            IF finding.affects(criteria) OR finding.prevents(criteria):
                isInScope = true
                BREAK
        
        IF isInScope:
            scopedFindings.append(finding)
        ELSE:
            // Out of scope - force to enhancement
            finding.severity = "enhancement"
            finding.note = "Out of scope for current task"
            outOfScopeFindings.append(finding)
    
    RETURN {
        in_scope: scopedFindings,
        out_of_scope: outOfScopeFindings
    }
END FUNCTION
```

### Integration with Task Workflow
```pseudocode
FUNCTION processReviewSubtask(reviewSubtask, assignmentFile):
    findings = reviewSubtask.findings
    config = assignmentFile.embedded_config
    
    // Enforce scope control
    scopedResults = enforeceScopeControl(findings, assignmentFile)
    
    // Process in-scope findings
    actions = []
    blockingActions = []
    
    FOR finding IN scopedResults.in_scope:
        classified = classifyFinding(finding, assignmentFile.acceptance_criteria)
        action = determineAction(classified, config)
        
        IF action.action == "BLOCK_AND_REFINE":
            blockingActions.append(action)
        ELSE:
            actions.append(action)
    
    // Process out-of-scope as enhancements
    FOR finding IN scopedResults.out_of_scope:
        action = {
            action: "CREATE_FOLLOWUP_TASK",
            priority: "P3",
            task_type: "enhancement",
            note: "Identified during review but out of scope"
        }
        actions.append(action)
    
    // Execute actions
    IF blockingActions.length > 0:
        // Must return to REFINE
        updateTaskPhase(assignmentFile, "INIT")
        addRefinementNotes(assignmentFile, blockingActions)
        RETURN "BLOCKED_RETURN_TO_REFINE"
    ELSE:
        // Create follow-up tasks
        createdTasks = []
        FOR action IN actions:
            IF action.action == "CREATE_FOLLOWUP_TASK":
                taskId = createFollowUpTask(action, assignmentFile, action.priority)
                createdTasks.append(taskId)
        
        RETURN {
            status: "CONTINUE",
            follow_up_tasks: createdTasks
        }
END FUNCTION
```

## Example Scenarios

### Scenario 1: Critical Finding with blocking=false
```yaml
finding:
  description: "Missing input validation on API endpoint"
  severity: "critical"
  
embedded_config:
  violation_handling:
    blocking: false
    
result:
  action: "CREATE_FOLLOWUP_TASK"
  new_task: "TASK-002-fix-input-validation"
  priority: "P0"
  parent_continues: true
```

### Scenario 2: Enhancement Finding
```yaml
finding:
  description: "Could add caching for better performance"
  severity: "enhancement"
  
result:
  action: "CREATE_FOLLOWUP_TASK"
  new_task: "TASK-003-add-caching"
  priority: "P2"
```

### Scenario 3: Out of Scope Finding
```yaml
finding:
  description: "Should refactor unrelated module"
  relates_to_criteria: false
  
result:
  classification: "OUT_OF_SCOPE"
  action: "CREATE_FOLLOWUP_TASK"
  new_task: "TASK-004-refactor-module"
  priority: "P3"
  note: "Identified during review but out of scope"
```

## Benefits

1. **Respects Configuration**: Blocking behavior follows config.md settings
2. **Prevents Scope Creep**: Out-of-scope findings become separate tasks
3. **Clear Actions**: Every finding has a defined action path
4. **Traceability**: Follow-up tasks linked to parent
5. **No Lost Findings**: Everything tracked as tasks or documentation