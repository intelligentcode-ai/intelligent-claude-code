# AI Assignment Validation Test

## Scenario: AI Work Assigned to Wrong Role

### Input Task
```yaml
title: "Update virtual team behavioral patterns"
description: "Enhance the AI behavioral framework in modes/ directory for better autonomous operation"
type: implementation
assigned_to: @System-Engineer
```

### Validation Execution

```pseudocode
// Step 1: Initialize validator
validator = new RoleAssignmentValidator()

// Step 2: Detect work type
task = {
    title: "Update virtual team behavioral patterns",
    description: "Enhance the AI behavioral framework in modes/ directory for better autonomous operation",
    type: "implementation",
    assigned_to: "@System-Engineer"
}

workType = validator.detectWorkType(task)
// Result: "ai_agentic" (matches: AI, behavioral, framework, modes/, autonomous)

// Step 3: Check if System-Engineer is blocked for AI work
isBlocked = validator.isBlockedAssignment("System-Engineer", "ai_agentic")
// Result: true (System-Engineer is in blocked_roles for ai_agentic)

// Step 4: Calculate capability match
capabilityMatch = validator.calculateCapabilityMatch("System-Engineer", task, "ai_agentic")
// Result: 0.15 (very low - System-Engineer has infrastructure capabilities, not AI)

// Step 5: Find optimal role
optimalRole = validator.findOptimalRole(task, "ai_agentic")
// Result: {
//     role: "AI-Engineer",
//     match: 0.95,
//     reason: "Preferred specialist for ai_agentic"
// }

// Step 6: Create validation result
validation = validator.validateAssignment(task, "System-Engineer", [])
// Result: {
//     valid: false,
//     issues: [
//         {
//             type: "blocked_assignment",
//             role: "System-Engineer",
//             reason: "Role explicitly blocked for this work type"
//         },
//         {
//             type: "capability_mismatch",
//             role: "System-Engineer",
//             match: 0.15,
//             reason: "Role capabilities don't match task requirements"
//         }
//     ],
//     suggestions: [
//         {
//             current: "System-Engineer",
//             suggested: "AI-Engineer",
//             match: 0.95,
//             reason: "Preferred specialist for ai_agentic"
//         }
//     ],
//     requiredActions: [
//         {
//             action: "architect_review",
//             architect: "AI-Architect",
//             reason: "Specialist work requires architect validation"
//         }
//     ]
// }
```

### Validation Chain in Lean Workflow

```pseudocode
// In lean-workflow-executor.md planStory() function

FUNCTION planStory(story):
    storyData = {
        title: "Enhance virtual team AI capabilities",
        description: "Update behavioral patterns and command chains in modes/",
        tasks: [
            {
                title: "Update virtual team behavioral patterns",
                assigned_to: "@System-Engineer"  // WRONG
            }
        ]
    }
    
    // Execute validation chain
    workType = "ai_agentic"  // Detected from patterns
    
    // 1. Require triage - BLOCKS here
    IF NOT hasTriageApproval(story, "PM", "AI-Architect"):
        BLOCK("Triage required with AI-Architect for AI-agentic work")
        // User must complete: @PM and @AI-Architect joint triage
    
    // 2. Validate assignments - FAILS here  
    validation = validator.validateAssignment(task, "@System-Engineer", tasks)
    
    IF NOT validation.valid:
        // System-Engineer blocked for AI work
        // Auto-reassign to suggested role
        task.assigned_to = "AI-Engineer"  // From suggestions
        
        logInfo("Reassigned from System-Engineer to AI-Engineer for AI work")
    
    // 3. Require approval - BLOCKS again
    IF NOT hasJointApproval(story, "PM", "AI-Architect"):
        BLOCK("Joint approval required from PM and AI-Architect")
        // User must complete: @PM and @AI-Architect approval
    
    // 4. Create validated tasks
    createTaskFile({
        ...task,
        assigned_to: "AI-Engineer",  // Corrected assignment
        approved_by: ["PM", "AI-Architect"]
    })
```

## Expected Outcome

### Before Validation
- ❌ @System-Engineer assigned to AI behavioral work
- ❌ No architect review for specialist domain
- ❌ Generic roles doing specialist work

### After Validation
- ✅ @AI-Engineer assigned to AI behavioral work
- ✅ @AI-Architect review required and enforced
- ✅ Specialist roles for specialist domains
- ✅ Clear validation chain with blocking points

## Benefits Demonstrated

1. **Pattern Detection Works**: "behavioral", "modes/", "AI" correctly identified as AI work
2. **Role Blocking Enforced**: System-Engineer explicitly blocked from AI assignments
3. **Capability Matching**: Low score (0.15) triggers reassignment
4. **Helpful Suggestions**: AI-Engineer suggested with high match score (0.95)
5. **Architect Governance**: AI-Architect review required, not generic Architect
6. **Validation Chain**: Clear blocking points ensure proper review before work begins

## Summary

The role assignment validator successfully prevents wrong specialist assignments by:
- Detecting work type through keyword patterns
- Blocking inappropriate role assignments
- Suggesting optimal alternatives
- Requiring specialist architect review
- Integrating seamlessly with the lean workflow

This ensures that AI work is always assigned to AI specialists, with proper AI-Architect oversight.