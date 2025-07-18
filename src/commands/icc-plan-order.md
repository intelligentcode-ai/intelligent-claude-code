# IccPlanOrder Command

**Command:** `/icc-plan-order`  
**Purpose:** Stage 2 (PLANNING) - Joint PM + Specialist Architect planning of execution order  
**Status:** ACTIVE  
**Required Roles:** @PM AND @Specialist-Architect (auto-detected)

## Command Overview

This command enables joint planning of execution order by PM and the appropriate Specialist Architect. It transitions work items from DEFINING to PLANNING phase and establishes priorities, dependencies, and execution order WITHOUT creating tasks.

## Command Syntax

```bash
/icc-plan-order <ITEM-ID> [options]

# Examples:
/icc-plan-order STORY-001
/icc-plan-order BUG-042 --priority P0
/icc-plan-order EPIC-003 --plan-children
```

## Options

- `--priority <P0|P1|P2|P3>` - Set priority level
- `--depends-on <ITEM-ID>` - Define dependency
- `--blocks <ITEM-ID>` - Mark as blocking another item
- `--complexity <1-10>` - Estimate complexity
- `--effort <hours|days>` - Estimate effort
- `--plan-children` - Plan all children (for epics)

## Implementation

```pseudocode
COMMAND iccPlanOrder(itemId, options):
    // Load work item
    item = loadWorkItem(itemId)
    IF NOT item:
        RETURN error("Work item not found: " + itemId)
    
    // Verify current phase
    IF item.phase != "DEFINING":
        RETURN error("Item must be in DEFINING phase. Current: " + item.phase)
    
    // Detect work type and required architect
    workType = detectWorkType(item)
    requiredArchitect = getRequiredArchitect(workType)
    
    // Verify roles
    IF NOT hasRole("PM"):
        RETURN error("This command requires @PM role")
    
    IF NOT hasRole(requiredArchitect):
        RETURN error("This command requires @" + requiredArchitect + " role")
    
    // Initialize planning data
    planningData = {
        priority: options.priority || item.priority || "P2",
        dependencies: [],
        blocks: [],
        complexity: options.complexity,
        effort: options.effort,
        execution_order: null,
        approvals: {
            pm: null,
            architect: null
        }
    }
    
    // Handle dependencies
    IF options.dependsOn:
        validateDependency(options.dependsOn)
        planningData.dependencies.append(options.dependsOn)
    
    // Handle blocking relationships
    IF options.blocks:
        validateBlockingRelationship(options.blocks)
        planningData.blocks.append(options.blocks)
    
    // Handle epic planning
    IF item.type == "epic" AND options.planChildren:
        RETURN planEpicChildren(item, planningData)
    
    // Interactive planning session
    RETURN startPlanningSession(item, planningData, requiredArchitect)

FUNCTION detectWorkType(item):
    // Analyze content for work type patterns
    content = item.title + " " + item.description + " " + item.acceptance_criteria
    
    patterns = {
        "ai_agentic": ["AI", "ML", "agentic", "behavioral", "automation", "intelligence"],
        "infrastructure": ["deployment", "infrastructure", "kubernetes", "docker", "cloud"],
        "security": ["security", "authentication", "authorization", "encryption"],
        "database": ["database", "SQL", "schema", "migration", "query"],
        "frontend": ["UI", "UX", "React", "frontend", "component", "responsive"]
    }
    
    FOR type, keywords IN patterns:
        matchCount = 0
        FOR keyword IN keywords:
            IF content.toLowerCase().contains(keyword.toLowerCase()):
                matchCount++
        
        IF matchCount >= 2:
            RETURN type
    
    RETURN "general"

FUNCTION getRequiredArchitect(workType):
    architectMap = {
        "ai_agentic": "AI-Architect",
        "infrastructure": "System-Architect",
        "security": "Security-Architect",
        "database": "Data-Architect",
        "frontend": "Frontend-Architect",
        "general": "Architect"
    }
    
    RETURN architectMap[workType] || "Architect"

FUNCTION startPlanningSession(item, planningData, requiredArchitect):
    output = []
    output.append("🎯 **Planning Session Started**")
    output.append("Work Item: " + item.id + " - " + item.title)
    output.append("Required Participants: @PM + @" + requiredArchitect)
    output.append("")
    
    // Display current planning data
    output.append("**Current Planning:**")
    output.append("- Priority: " + planningData.priority)
    output.append("- Dependencies: " + (planningData.dependencies.join(", ") || "None"))
    output.append("- Blocks: " + (planningData.blocks.join(", ") || "None"))
    output.append("- Complexity: " + (planningData.complexity || "Not set"))
    output.append("- Effort: " + (planningData.effort || "Not set"))
    output.append("")
    
    // Planning questions for joint decision
    output.append("**Planning Decisions Required:**")
    output.append("1. Confirm priority level (current: " + planningData.priority + ")")
    output.append("2. Identify all dependencies")
    output.append("3. Determine execution order relative to other items")
    output.append("4. Estimate complexity (1-10)")
    output.append("5. Estimate effort (hours/days)")
    output.append("")
    
    // Architect-specific considerations
    output.append("**" + requiredArchitect + " Considerations:**")
    SWITCH workType:
        CASE "ai_agentic":
            output.append("- Model selection and training requirements")
            output.append("- Integration with existing AI systems")
            output.append("- Performance and scalability needs")
        CASE "infrastructure":
            output.append("- Deployment architecture")
            output.append("- Resource requirements")
            output.append("- Monitoring and scaling needs")
        CASE "security":
            output.append("- Security implications")
            output.append("- Compliance requirements")
            output.append("- Risk assessment")
        DEFAULT:
            output.append("- Technical architecture")
            output.append("- Integration points")
            output.append("- Quality requirements")
    
    output.append("")
    output.append("**Next Steps:**")
    output.append("1. PM and " + requiredArchitect + " discuss and agree on plan")
    output.append("2. Use `/icc-approve-plan " + item.id + "` to approve")
    output.append("3. Both must approve before proceeding to PLANNING phase")
    
    // Save planning session data
    item.planning_session = {
        started_at: getCurrentTime(),
        planning_data: planningData,
        required_architect: requiredArchitect,
        work_type: workType
    }
    
    saveWorkItem(item)
    
    RETURN output.join("\n")

FUNCTION planEpicChildren(epic, planningData):
    output = []
    output.append("🎯 **Epic Planning Session**")
    output.append("Epic: " + epic.id + " - " + epic.title)
    output.append("")
    
    // Get all children
    stories = getStoriesForEpic(epic)
    bugs = getBugsForEpic(epic)
    
    output.append("**Children to Plan:**")
    output.append("- Stories: " + stories.length)
    output.append("- Bugs: " + bugs.length)
    output.append("")
    
    // Suggest execution order
    output.append("**Suggested Execution Order:**")
    
    // Bugs first (typically)
    priority = 1
    FOR bug IN bugs:
        IF bug.severity == "CRITICAL":
            output.append(priority + ". " + bug.id + " (P0 - Critical Bug)")
            priority++
    
    FOR bug IN bugs:
        IF bug.severity != "CRITICAL":
            output.append(priority + ". " + bug.id + " (Bug)")
            priority++
    
    // Then stories by dependency
    FOR story IN stories:
        output.append(priority + ". " + story.id + " (Story)")
        priority++
    
    output.append("")
    output.append("Use `/icc-plan-order <ITEM-ID>` for each child item")
    
    RETURN output.join("\n")

FUNCTION validateDependency(dependencyId):
    dep = loadWorkItem(dependencyId)
    IF NOT dep:
        THROW "Dependency not found: " + dependencyId
    
    // Check for circular dependencies
    IF wouldCreateCircularDependency(itemId, dependencyId):
        THROW "Would create circular dependency"

FUNCTION validateBlockingRelationship(blockedId):
    blocked = loadWorkItem(blockedId)
    IF NOT blocked:
        THROW "Blocked item not found: " + blockedId
```

## Approval Sub-Command

```pseudocode
COMMAND iccApprovePlan(itemId):
    item = loadWorkItem(itemId)
    
    IF NOT item.planning_session:
        RETURN error("No active planning session for " + itemId)
    
    session = item.planning_session
    currentRole = getCurrentRole()
    
    // Record approval
    IF currentRole == "PM":
        session.planning_data.approvals.pm = {
            approved_by: "@PM",
            approved_at: getCurrentTime()
        }
    ELSE IF currentRole == session.required_architect:
        session.planning_data.approvals.architect = {
            approved_by: "@" + currentRole,
            approved_at: getCurrentTime()
        }
    ELSE:
        RETURN error("Only @PM and @" + session.required_architect + " can approve")
    
    // Check if both approved
    IF session.planning_data.approvals.pm AND session.planning_data.approvals.architect:
        // Transition to PLANNING phase
        item.phase = "PLANNING"
        item.planning = session.planning_data
        item.planning_completed_at = getCurrentTime()
        delete item.planning_session
        
        saveWorkItem(item)
        
        output = []
        output.append("✅ **Planning Approved!**")
        output.append("PM: " + session.planning_data.approvals.pm.approved_at)
        output.append(session.required_architect + ": " + session.planning_data.approvals.architect.approved_at)
        output.append("")
        output.append("Item transitioned to PLANNING phase")
        output.append("Ready for task breakdown with `/icc-break-down`")
        
        RETURN output.join("\n")
    ELSE:
        // Waiting for other approval
        waiting = []
        IF NOT session.planning_data.approvals.pm:
            waiting.append("@PM")
        IF NOT session.planning_data.approvals.architect:
            waiting.append("@" + session.required_architect)
        
        saveWorkItem(item)
        
        RETURN "✓ Your approval recorded. Waiting for: " + waiting.join(", ")
```

## Integration Points

### Work Item Structure Enhancement
```yaml
work_item:
  planning_session:  # Temporary during planning
    started_at: timestamp
    planning_data: object
    required_architect: string
    work_type: string
    
  planning:  # Permanent after approval
    priority: "P0"|"P1"|"P2"|"P3"
    dependencies: [ITEM-ID]
    blocks: [ITEM-ID]
    complexity: 1-10
    effort: string
    execution_order: number
    approvals:
      pm: {approved_by, approved_at}
      architect: {approved_by, approved_at}
```

### Phase Validation
- Only works on items in DEFINING phase
- Transitions to PLANNING phase after dual approval
- Blocks task creation until planning approved

### Role Requirements
- BOTH @PM and detected @Specialist-Architect required
- Work type detection determines which architect
- Joint approval mechanism enforced

## Usage Examples

```bash
# Basic planning
/icc-plan-order STORY-001

# With priority setting
/icc-plan-order BUG-042 --priority P0

# With dependencies
/icc-plan-order STORY-002 --depends-on STORY-001 --priority P1

# Epic planning
/icc-plan-order EPIC-003 --plan-children

# Approval (both roles must execute)
@PM: /icc-approve-plan STORY-001
@AI-Architect: /icc-approve-plan STORY-001
```

## Error Handling

```yaml
errors:
  - "Work item not found"
  - "Item must be in DEFINING phase"
  - "Requires @PM role"
  - "Requires @[Architect] role"
  - "Would create circular dependency"
  - "No active planning session"
  - "Already approved by this role"
```

## Benefits

1. **Joint Decision Making**: PM and Architect collaborate on planning
2. **Work Type Awareness**: Automatically involves correct specialist
3. **Dependency Management**: Clear execution order and blocking relationships
4. **Phase Control**: Enforces workflow progression
5. **No Premature Tasks**: Planning separate from task creation

---
*Stage 2 command for 5-stage epic workflow*