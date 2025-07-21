# Workflow Enforcement Patterns

**MANDATORY:** MUST auto-execute workflow steps. Auto-correct violations.

**PURPOSE:** Enforcement mechanism that ensures workflow steps are never skipped

## Core Enforcement Architecture

### Step Tracking System
```pseudocode
STRUCTURE WorkflowState:
    workflowType: "outer" | "inner"
    currentStep: integer
    completedSteps: array of step_ids
    skippedSteps: array of step_ids
    context: assignment_context
END STRUCTURE

FUNCTION trackWorkflowExecution(action, context):
    state = getCurrentWorkflowState(context)
    expectedStep = getExpectedStep(state)
    
    IF action.step != expectedStep:
        // Step was skipped!
        autoExecuteSkippedSteps(state, expectedStep)
    END IF
    
    markStepComplete(state, action.step)
    saveWorkflowState(state)
END FUNCTION
```

### Auto-Execution Engine
```pseudocode
FUNCTION autoExecuteSkippedSteps(state, targetStep):
    skippedSteps = getSkippedSteps(state.currentStep, targetStep)
    
    FOR EACH step IN skippedSteps:
        logAutoCorrection("Executing skipped step", step)
        
        SWITCH step.id:
            CASE "search_memory":
                /icc-memory-search state.context.keywords
            CASE "validate_roles":
                /icc-validate-assignments state.context.task
            CASE "peer_review":
                /icc-assign-reviewer state.context.role
            CASE "capture_learning":
                /icc-capture-learning state.context.outcome
            DEFAULT:
                executeGenericStep(step)
        END SWITCH
        
        markStepComplete(state, step)
    END FOR
END FUNCTION
```

## Enforcement Triggers

### Pre-Action Enforcement
```pseudocode
FUNCTION beforeAction(action, context):
    // Check if we're in a workflow
    IF isWorkflowContext(context):
        state = getWorkflowState(context)
        
        // Ensure prerequisites are met
        prerequisites = getPrerequisites(action)
        FOR EACH prereq IN prerequisites:
            IF NOT isStepComplete(state, prereq):
                autoExecuteStep(prereq)
            END IF
        END FOR
    END IF
END FUNCTION
```

### Post-Action Enforcement
```pseudocode
FUNCTION afterAction(action, result, context):
    // Validate action completed required workflow step
    IF isWorkflowStep(action):
        validateStepCompletion(action, result)
        
        // Check if next steps can be auto-triggered
        IF shouldAutoProgress(context):
            nextStep = getNextStep(action)
            IF canAutoExecute(nextStep):
                scheduleStep(nextStep)
            END IF
        END IF
    END IF
END FUNCTION
```

## Skip Detection Patterns

### Pattern 1: Direct Task Execution
```pseudocode
// VIOLATION: Jumped straight to execution without planning
DETECTED: @Developer executing task without memory search
ACTION: Pause execution → Run Step 1 → Resume
```

### Pattern 2: Missing Validation
```pseudocode
// VIOLATION: Role assigned without validation
DETECTED: Task assigned to @Developer without /icc-validate-assignments
ACTION: Run validation chain → Create specialist if <70% → Continue
```

### Pattern 3: Skipped Review
```pseudocode
// VIOLATION: Committing without peer review
DETECTED: Git commit without review completion
ACTION: Find reviewer → Execute review → Then allow commit
```

### Pattern 4: No Learning Capture
```pseudocode
// VIOLATION: Task marked complete without learning
DETECTED: Status change to "completed" without knowledge generation
ACTION: Extract learning → Store entity → Then complete
```

## Integration Points

### With Lean Workflow Executor
```markdown
## Modified Core Behaviors

**Phase Execution:** 
- Before: "L1/L2 require approval, L3 proceeds"
- After: "ALL modes enforce step sequence via auto-execution"

**Validation Chain:**
- Before: "detect → triage → validate → approve"  
- After: "Auto-executes if any step skipped"
```

### With Role Assignment Validator
```markdown
## Enhanced Validation

**Assignment Detection:**
- Monitor all role activations
- Intercept direct assignments
- Force validation workflow
```

### With Learning Team Automation
```markdown
## Learning Enforcement

**Capture Triggers:**
- Task completion
- Error occurrence  
- Pattern discovery
- All auto-executed
```

## Configuration

### Enforcement Modes
```yaml
workflow_enforcement:
  mode: "strict"  # strict, flexible, or legacy
  auto_correction: true
  skip_penalties: true
  
skip_penalties:
  first_skip: "warning"
  repeated_skip: "-1.0P"
  
auto_execution:
  max_retries: 3
  timeout: 300s
```

### Monitoring
```pseudocode
FUNCTION monitorCompliance():
    violations = []
    
    // Check all active workflows
    FOR EACH workflow IN activeWorkflows:
        skipped = workflow.skippedSteps
        IF skipped.length > 0:
            violations.append({
                workflow: workflow.id,
                skipped: skipped,
                corrected: workflow.autoCorrected
            })
        END IF
    END FOR
    
    // Generate compliance report
    RETURN {
        total_workflows: activeWorkflows.length,
        violations: violations.length,
        auto_corrected: countAutoCorrected(violations),
        compliance_rate: calculateCompliance(violations)
    }
END FUNCTION
```

## Benefits

✅ **100% Compliance**: No workflow steps can be skipped
✅ **Automatic**: No manual intervention needed
✅ **Smart**: Knows which steps can be auto-executed
✅ **Tracked**: Full audit trail of corrections
✅ **Learning**: System improves from patterns