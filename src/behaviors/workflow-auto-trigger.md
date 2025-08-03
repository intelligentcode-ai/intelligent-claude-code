# PRB Auto-Trigger Behavior

**MANDATORY:** MUST auto-detect work and generate appropriate PRB. Auto-correct violations.

**PURPOSE:** Automatically detect work requests and generate PRBs for execution

## Core Principle: Detection → Memory Search FIRST → PRB Generation → Direct Execution

Every work detection triggers memory search first, then PRB generation with appropriate complexity template and embedded memory context.

## Work Detection Patterns

| Trigger Type | Detection Pattern | Action |
|-------------|------------------|--------|
| **PRB File** | *.prb.yaml, PRB-XXX | Execute existing PRB |
| **Work Request** | Any implementation request | Analyze → Generate PRB |
| **@Role** | @Role mention | Generate appropriate PRB |
| **Commands** | /icc-create-prb | Generate PRB with options |

**CRITICAL:** All work detection MUST search memory FIRST using memory/[topic]/[subtopic].md structure

## Workflow Type Determination

### Workflow Selection Table

| Work Type | Trigger | Workflow | Context Loading |
|-----------|---------|----------|----------------|
| **Story/Bug** | STORY-XXX, BUG-XXX, story.yaml, bug.yaml | Outer | Parent loads once |
| **Epic** | EPIC-XXX, epic.yaml | Outer | Parent loads once |
| **Task** | TASK-XXX, task.md, single action | Inner | Passed from parent |
| **Ambiguous** | No explicit ID | Inner (default) | Passed from parent |

**Resolution:** ID match → File search → Scope check → Default to inner

## Auto-Generation Flow

1. **Detect** → Work requirement
2. **Search Memory FIRST** → /icc-search-memory for relevant patterns in memory/[topic]/[subtopic].md
3. **Analyze** → Calculate complexity score with memory context
4. **Select** → Choose PRB template using hierarchy (project → .claude → ~/.claude)
5. **Embed** → Include top 2-3 relevant memory entries in PRB context
6. **Generate** → Create PRB with complete context
7. **Execute** → Direct execution

**Memory-First Enforcement:** NO PRB generation without memory search first
**Memory Embedding:** Top 2-3 entries embedded directly in PRB, no runtime lookups needed

## Integration Points

### With Workflow Enforcement
**Integration:** Auto-trigger respects phase gates → Launches at correct phase → Maintains phase consistency → Reports to enforcement system

### With L3 Autonomy
**L3 Mode:** Continuous work detection → Auto-launch without prompts → Chain workflow executions → Discover new work patterns

### With Learning System
**Memory-First Learning:** Search memory/workflow/patterns before triggering → Apply existing trigger patterns → Store successful launches → Learn from misdetections → Improve accuracy over time
**Memory Structure:** Store in memory/workflow/[subtopic].md following memory/[topic]/[subtopic].md format

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
| **Missing Memory Search** | PRB generation without memory check | STOP → Search memory/[topic]/[subtopic].md first → Embed patterns → Generate PRB |
| **Missing PRB** | Direct work without PRB | STOP → Search memory → Generate appropriate PRB → Execute |
| **Wrong Template** | Incorrect complexity template | STOP → Re-analyze complexity → Select correct template → Regenerate |
| **Bypass Attempt** | Direct execution without PRB | Block → Search memory → Generate PRB → Execute through PRB |
| **Memory Skip** | PRB creation skipping memory patterns | STOP → Search memory/[topic]/ → Embed top 2-3 entries → Continue |

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