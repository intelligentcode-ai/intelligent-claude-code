# Simple Workflow Executor

**MANDATORY:** MUST follow simple numbered steps. Auto-correct violations.

**PURPOSE:** Replace complex YAML workflows with simple, numbered steps that auto-execute

## Outer Workflow (Planning) - Simple Steps

### Step 1: Search Memory First
- Search for similar epics/stories/bugs
- Find past solutions and patterns
- Note what worked and what didn't

### Step 2: Define the Work
- PM + Architect + Requirements-Engineer define scope
- Set clear objectives and success criteria
- Identify constraints and risks

### Step 3: Break Down Into Tasks
- Create stories for features, bugs for issues
- Each story/bug gets 3-10 tasks
- Tasks must have [Role] in title

### Step 4: Validate Role Assignments
- Run /icc-detect-work-type for each task
- Require PM + Architect approval
- Ensure >70% capability match
- Create specialists if needed

### Step 5: Create Git Branch
- Create feature/story branch
- Format: story/STORY-XXX-title

### Step 6: Track Progress
- Update task statuses
- Monitor completion
- Handle blockers

### Step 7: Store Learning
- Document decisions made
- Capture what worked
- Note improvements for next time

## Inner Workflow (Execution) - Simple Steps

### Step 1: Load Task Context
- Search memory for similar tasks
- Review story objectives
- Check dependencies

### Step 2: Plan the Work
- Simple tasks: Direct execution
- Complex tasks: Create 3+ subtasks
- Apply specialist expertise

### Step 3: Execute Task
- Follow proven patterns
- Handle edge cases
- Track progress ([P0], [P1], etc.)

### Step 4: Self-Check Quality
- Verify objectives met
- Run tests and linting
- Check for regressions

### Step 5: Get Peer Review
- Find domain expert (>70% match)
- Address feedback
- Create follow-up tasks if needed

### Step 6: Commit and Push
- Format: "TASK-XXX: Summary"
- Include all deliverables
- Strip AI mentions if privacy mode

### Step 7: Capture Learning
- Document approach taken
- Note challenges and solutions
- Update role scores

## Auto-Execution Pattern

```pseudocode
FUNCTION executeWorkflow(workflowType, context):
    steps = getSimpleSteps(workflowType)
    currentStep = 1
    
    WHILE currentStep <= steps.length:
        step = steps[currentStep]
        
        // Auto-detect if step was skipped
        IF stepNotExecuted(step):
            autoExecuteStep(step, context)
        END IF
        
        // Validate step completion
        IF NOT validateStepComplete(step):
            IF canAutoCorrect(step):
                autoCorrectStep(step)
            ELSE:
                createBlocker(step)
            END IF
        END IF
        
        currentStep = currentStep + 1
    END WHILE
    
    RETURN workflowComplete
END FUNCTION
```

## Integration with Lean Workflow Executor

### Detection Hooks
- Monitor all role actions
- Detect workflow type from context
- Track step completion

### Auto-Correction Triggers
- Missing memory search → Auto-execute Step 1
- Missing role validation → Auto-execute Step 4
- Missing peer review → Auto-execute Step 5
- Missing learning capture → Auto-execute Step 7

### Configuration Support
```yaml
workflow_mode: "simple"  # or "yaml" for legacy
auto_correction: true
blocking_enabled: true
```

## Benefits

✅ **Simple**: Just numbered steps, no YAML complexity
✅ **Clear**: Anyone can understand the flow
✅ **Enforced**: Auto-correction ensures compliance
✅ **Flexible**: Steps adjust to context
✅ **Fast**: No parsing overhead