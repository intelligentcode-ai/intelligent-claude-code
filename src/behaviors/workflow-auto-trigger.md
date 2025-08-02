# Workflow Auto-Trigger Behavior

**MANDATORY:** MUST auto-detect work and trigger appropriate workflow. Auto-correct violations.

**PURPOSE:** Automatically detect work initiation and trigger correct workflow (outer/inner)

## Core Principle: Detection → Task Tool Invocation

Every work detection triggers a Task tool invocation with appropriate workflow context.

## Work Detection Patterns

| Trigger Type | Detection Pattern | Workflow | Auto-Action |
|-------------|------------------|----------|-------------|
| **PRB File** | *.prb.yaml, PRB-XXX | Direct PRB | Execute PRB directly, no workflow needed |
| **PRB Command** | /icc-create-prb, /icc-analyze-complexity | PRB Generation | Analyze complexity, generate PRB, execute |
| **File** | epic.yaml, story.yaml, bug.yaml | Outer | Create PRBs for tasks instead of Inner Workflow |
| **Task** | task.md, TASK-XXX | Direct PRB | Convert to appropriate PRB, execute directly |
| **Command** | /icc-create-task, /icc-start-story | Per command | Generate PRBs instead of workflow triggers |
| **Role** | @Role: or @Role (inline) | PRB Generation | Create Tiny/Medium PRB, direct execution |
| **Context** | Implementation intent without ID | PRB Generation | Analyze complexity, create appropriate PRB |

**Task Tool Pattern:** See @workflow-templates/executable-workflow.md

## PRB Type Determination

### PRB Selection Table

| Work Type | Trigger | PRB Type | Execution Mode |
|-----------|---------|----------|----------------|
| **Trivial** | Single line, config change | Nano PRB | Direct execution |
| **Simple** | Single file, <50 lines | Tiny PRB | Direct execution |
| **Standard** | Multi-file feature | Medium PRB | Direct execution (replaces Inner) |
| **Complex** | Story/Bug with subtasks | Large PRB | Generates sub-PRBs |
| **System** | Epic, architecture change | Mega PRB | Phased execution |

**Resolution:** Complexity analysis → Template selection → PRB generation → Direct execution

## Auto-Activation Flow

1. **Detect** → Work requirement or PRB file
2. **Analyze** → Calculate complexity score if needed
3. **Generate** → Create appropriate PRB from template
4. **Execute** → Direct PRB execution (no workflow needed)
5. **Complete** → Single-pass execution with all context

**PRB Execution:** Each PRB contains complete context, no workflow phases needed

## Integration Points

### With Workflow Enforcement
**Integration:** Auto-trigger respects phase gates → Launches at correct phase → Maintains phase consistency → Reports to enforcement system

### With L3 Autonomy
**L3 Mode:** Continuous work detection → Auto-launch without prompts → Chain workflow executions → Discover new work patterns

### With Learning System
**Learning:** Capture trigger patterns → Store successful launches → Learn from misdetections → Improve accuracy over time

## Trigger Priority Order

1. **PRB files** (*.prb.yaml, PRB-XXX references)
2. **PRB commands** (/icc-create-prb, /icc-analyze-complexity)
3. **Assignment files** (epic.yaml, story.yaml, bug.yaml → generate PRBs)
4. **Work references** (TASK-XXX → convert to PRB)
5. **@Role patterns** (→ generate appropriate PRB)
6. **Context inference** (→ analyze and create PRB)

**Conflict:** Use highest priority → Generate PRB → Execute directly

## Auto-Correction Patterns

| Violation | Detection | Correction |
|-----------|-----------|------------|
| **Missing PRB** | Direct @Role without PRB | STOP → Analyze complexity → Generate PRB |
| **Wrong Complexity** | Manual task too complex | STOP → Re-analyze → Generate larger PRB |
| **No Context** | Execution without PRB | Block → Create appropriate PRB → Execute |
| **Legacy Workflow** | Inner/Outer workflow attempt | Redirect → Convert to PRB → Direct execution |

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
- PRB file access (*.prb.yaml, PRB-XXX)
- PRB command execution (/icc-create-prb, /icc-analyze-complexity)
- Assignment files (epic.yaml, story.yaml, bug.yaml → generate PRBs)
- Work references (TASK-XXX → convert to PRB)
- Role mention patterns (@Role → generate appropriate PRB)

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