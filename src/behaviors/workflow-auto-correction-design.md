# Workflow Auto-Correction Design

**MANDATORY:** MUST auto-correct skipped workflow steps. Auto-correct violations.

**PURPOSE:** Design for detecting and auto-correcting workflow violations

## Auto-Correction Architecture

### Core Detection Engine
```pseudocode
STRUCTURE WorkflowMonitor:
    activeWorkflows: Map<contextId, WorkflowState>
    violationHistory: Array<Violation>
    correctionPatterns: Map<violationType, CorrectionStrategy>
    
    FUNCTION monitorAction(action, context):
        workflow = identifyWorkflow(action, context)
        IF workflow:
            expectedStep = workflow.getExpectedStep()
            IF action != expectedStep:
                violation = createViolation(action, expectedStep)
                correction = selectCorrection(violation)
                executeCorrection(correction)
            END IF
        END IF
    END FUNCTION
END STRUCTURE
```

### Violation Types and Corrections

```pseudocode
VIOLATIONS = {
    SKIPPED_MEMORY_SEARCH: {
        pattern: "Executing task without memory consultation",
        detection: "No /icc-memory-search before task start",
        correction: {
            action: "AUTO_EXECUTE",
            command: "/icc-memory-search",
            params: "Extract keywords from task context",
            blocking: true
        }
    },
    
    SKIPPED_VALIDATION: {
        pattern: "Role assigned without capability check",
        detection: "Direct @Role activation without validation",
        correction: {
            action: "VALIDATION_CHAIN",
            steps: [
                "/icc-detect-work-type",
                "/icc-require-triage", 
                "/icc-validate-assignments",
                "/icc-require-approval"
            ],
            blocking: true
        }
    },
    
    SKIPPED_PLANNING: {
        pattern: "Task execution without planning",
        detection: "Direct execution without subtask check",
        correction: {
            action: "INJECT_PLANNING",
            command: "/icc-assess-complexity",
            conditional: "If complex, create subtasks",
            blocking: false
        }
    },
    
    SKIPPED_REVIEW: {
        pattern: "Completion without peer review",
        detection: "Status→complete without review",
        correction: {
            action: "FORCE_REVIEW",
            command: "/icc-assign-reviewer",
            params: "Find domain expert >70% match",
            blocking: true
        }
    },
    
    SKIPPED_LEARNING: {
        pattern: "No knowledge capture",
        detection: "Task complete without learning entity",
        correction: {
            action: "EXTRACT_LEARNING",
            command: "/icc-capture-learning",
            params: "Generate from task history",
            blocking: false
        }
    }
}
```

### Smart Correction Strategies

```pseudocode
FUNCTION selectCorrectionStrategy(violation, context):
    // Check if this is a repeat violation
    history = getViolationHistory(context.user, violation.type)
    
    IF history.count == 0:
        // First time - educational correction
        return {
            strategy: "EDUCATE_AND_CORRECT",
            message: "I noticed you skipped {step}. Let me handle that...",
            penalty: 0
        }
    ELSE IF history.count < 3:
        // Repeated - firm correction
        return {
            strategy: "ENFORCE_AND_WARN",
            message: "Workflow step {step} is mandatory. Auto-correcting...",
            penalty: -0.5
        }
    ELSE:
        // Chronic - strict enforcement
        return {
            strategy: "BLOCK_AND_ESCALATE",
            message: "Multiple violations detected. Escalating to PM...",
            penalty: -2.0,
            escalate: true
        }
    END IF
END FUNCTION
```

## Integration Patterns

### Hook-Based Integration
```pseudocode
HOOKS = {
    beforeRoleActivation: enforceRoleValidation,
    beforeTaskExecution: enforceMemorySearch,
    beforeStatusChange: enforceCompletionSteps,
    beforeGitOperation: enforceReviewCompletion,
    afterTaskComplete: enforceLearningCapture
}

FUNCTION installHooks():
    FOR EACH hook IN HOOKS:
        system.registerHook(hook.event, hook.handler)
    END FOR
END FUNCTION
```

### Context-Aware Corrections
```pseudocode
FUNCTION executeContextAwareCorrection(violation, context):
    // Adjust based on autonomy level
    autonomyLevel = getAutonomyLevel()
    
    IF autonomyLevel == "L3":
        // Full auto-correction without asking
        executeImmediately(violation.correction)
    ELSE IF autonomyLevel == "L2":
        // Notify and correct
        notify("Auto-correcting: " + violation.pattern)
        executeWithDelay(violation.correction, 1000ms)
    ELSE:
        // L1 - Ask permission
        IF requestPermission(violation.correction):
            execute(violation.correction)
        END IF
    END IF
END FUNCTION
```

## Learning from Corrections

```pseudocode
STRUCTURE CorrectionLearning:
    FUNCTION captureCorrection(violation, correction, outcome):
        learning = {
            type: "WorkflowCorrection",
            violation: violation.type,
            context: extractContext(violation),
            correction: correction.action,
            outcome: outcome,
            timestamp: now(),
            prevented_impact: estimateImpact(violation)
        }
        
        // Store for pattern analysis
        /icc-memory-store learning
        
        // Update correction patterns
        IF outcome.success:
            reinforcePattern(correction)
        ELSE:
            adjustPattern(correction, outcome.failure_reason)
        END IF
    END FUNCTION
END STRUCTURE
```

## Auto-Correction UI/UX

### Correction Notifications
```pseudocode
FUNCTION notifyCorrection(violation, correction):
    severity = violation.severity
    
    IF severity == "CRITICAL":
        // Blocking notification
        showModal({
            title: "Mandatory Step Enforced",
            message: "Executing required step: " + violation.step,
            type: "error",
            blocking: true
        })
    ELSE IF severity == "HIGH":
        // Prominent notification
        showToast({
            message: "Auto-correcting: " + correction.description,
            type: "warning",
            duration: 5000
        })
    ELSE:
        // Subtle notification
        logCorrection(correction)
    END IF
END FUNCTION
```

## Performance Optimization

```pseudocode
STRUCTURE CorrectionCache:
    recentCorrections: LRUCache<contextId, Correction>
    
    FUNCTION shouldCorrect(action, context):
        // Avoid correction loops
        recent = recentCorrections.get(context.id)
        IF recent AND recent.action == action:
            IF timeSince(recent.timestamp) < 30s:
                return false  // Prevent loop
            END IF
        END IF
        return true
    END FUNCTION
END STRUCTURE
```

## Configuration

```yaml
auto_correction:
  enabled: true
  mode: "strict"  # strict, standard, lenient
  
  thresholds:
    education_limit: 1  # Educate on first violation
    warning_limit: 3    # Warn up to 3 times
    escalation_after: 3 # Escalate chronic violators
    
  penalties:
    first_violation: 0
    repeat_violation: -0.5
    chronic_violation: -2.0
    
  learning:
    capture_all: true
    share_patterns: true
    update_frequency: "immediate"
```

## Benefits

✅ **Zero Workflow Violations**: 100% step compliance
✅ **Smart Corrections**: Context-aware responses
✅ **Educational**: Helps users learn workflow
✅ **Escalating Enforcement**: From gentle to strict
✅ **Performance Optimized**: No correction loops
✅ **Learning System**: Improves over time