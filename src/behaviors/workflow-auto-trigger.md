# Workflow Auto-Trigger Behavior

**MANDATORY:** MUST auto-detect work and trigger appropriate workflow. Auto-correct violations.

**PURPOSE:** Automatically detect work initiation and trigger correct workflow (outer/inner)

## Core Principle: Detection → Task Tool Invocation

Every work detection triggers a Task tool invocation with appropriate workflow context.

## Work Detection Patterns

| Trigger Type | Detection Pattern | Workflow | Auto-Action |
|-------------|------------------|----------|-------------|
| **File** | epic.yaml, story.yaml, bug.yaml, task.md | Outer/Inner | Create Task tool invocation with file context |
| **Command** | /icc-create-task, /icc-start-story, /icc-fix-bug | Per command | Extract ID, launch appropriate workflow |
| **Role** | @Role: or @Role (inline) | Inner | Convert to Task tool, block direct execution |
| **Reference** | STORY-XXX, BUG-XXX, TASK-XXX | Outer/Inner | Search for file, launch with context |
| **Context** | Implementation intent without ID | Inner | Assign appropriate role, launch workflow |

**Task Tool Pattern:** See @workflow-templates/executable-workflow.md

## Workflow Type Determination

### Workflow Selection Table

| Work Type | Trigger | Workflow | Context Loading |
|-----------|---------|----------|----------------|
| **Story/Bug** | STORY-XXX, BUG-XXX, story.yaml, bug.yaml | Outer | Parent loads once |
| **Epic** | EPIC-XXX, epic.yaml | Outer | Parent loads once |
| **Task** | TASK-XXX, task.md, single action | Inner | Passed from parent |
| **Ambiguous** | No explicit ID | Inner (default) | Passed from parent |

**Resolution:** ID match → File search → Scope check → Default to inner

## Auto-Activation Flow

1. **Detect** → File type, command, or intent
2. **Load** → Assignment content and configuration
3. **Create** → Task tool invocation with context
4. **Launch** → Appropriate workflow (outer/inner)
5. **Execute** → Through workflow phases

**Context:** Parent loads PROJECT-CONTEXT.md and settings ONCE, passes to all subagents

## Integration Points

### With Workflow Enforcement
**Integration:** Auto-trigger respects phase gates → Launches at correct phase → Maintains phase consistency → Reports to enforcement system

### With L3 Autonomy
**L3 Mode:** Continuous work detection → Auto-launch without prompts → Chain workflow executions → Discover new work patterns

### With Learning System
**Learning:** Capture trigger patterns → Store successful launches → Learn from misdetections → Improve accuracy over time

## Trigger Priority Order

1. **Assignment files** (epic.yaml, story.yaml, bug.yaml)
2. **Commands** (/icc-start-story, /icc-execute-task)
3. **ID references** (STORY-XXX, TASK-XXX)
4. **@Role patterns**
5. **Context inference**

**Conflict:** Use highest priority → Log all → Learn patterns

## Auto-Correction Patterns

| Violation | Detection | Correction |
|-----------|-----------|------------|
| **Missing Workflow** | Direct @Role without Task tool | STOP → Create Task invocation → Launch workflow |
| **Phase Skip** | Implementation before planning | STOP → Store work → Start from phase 1 |
| **Bypass Attempt** | Direct edit without workflow | Block → Identify work type → Launch workflow |
| **Wrong Workflow** | Inner when outer needed | Redirect → Load story/bug → Launch outer |

## Configuration Integration

### Settings Integration
**Auto-Load:** Detect autonomy_level → Apply L1/L2/L3 → Respect blocking/pm_always_active
**Runtime:** Monitor changes → Adjust sensitivity → Maintain consistency

## Continuous Detection (L3)

### Work Discovery Engine
**L3 Autonomous Behavior:**
1. Scan project for PLANNED/IN_PROGRESS tasks
2. Check git for uncommitted changes
3. Identify incomplete stories/bugs
4. Auto-launch workflows for each item
5. Execute up to 5 parallel tasks

### Chain Execution & Monitoring
**Continuous Flow:** Complete workflow → Scan for next → Launch immediately → Continue until empty
**Tracking:** Phase progress, success rates, stuck detection, learning capture

## Critical Trigger Points

### MUST Trigger
- Any assignment file access (epic.yaml, story.yaml, bug.yaml, task.md)
- Work-related command execution (/icc-start-story, /icc-execute-task)
- Role mention patterns (@Role: or inline @Role)
- Explicit work references (STORY-XXX, BUG-XXX, TASK-XXX)

### MUST NOT Trigger
- Documentation reading (viewing .md files without work intent)
- Pure discussion without implementation intent
- System maintenance (config updates, installations)
- Non-work commands (/icc-help, /icc-status)

### MUST Track
- All trigger detections with timestamps
- Workflow launch success/failure rates
- Misdetection patterns for learning improvement
- Bypass attempts with corrective actions taken

## Critical References

- **Workflow Execution:** @workflow-templates/executable-workflow.md
- **Phase Enforcement:** @behaviors/workflow-enforcement.md  
- **Task Tool XML:** See executable-workflow.md for invocation examples
- **Context Loading:** Parent loads once via /icc-load-project-context

---
*Workflow auto-trigger behavior - optimized for AI execution*