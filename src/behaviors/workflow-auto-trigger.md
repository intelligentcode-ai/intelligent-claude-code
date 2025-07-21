# Workflow Auto-Trigger Behavior

**MANDATORY:** MUST auto-detect work and trigger appropriate workflow. Auto-correct violations.

**PURPOSE:** Automatically detect work initiation and trigger correct workflow (outer/inner)

## Core Principle: Detection → Task Tool Invocation

Every work detection triggers a Task tool invocation with appropriate workflow context.

## Work Detection Patterns

### Assignment File Detection
**File Types:** epic.yaml, story.yaml, bug.yaml, task files (.md)
**Auto-Trigger Example:**
When user says: "Let's work on BUG-115"
System detects: BUG reference → Search for bug.yaml → Launch outer workflow

**Task Tool Invocation:**
```xml
<invoke name="Task">
  <parameter name="description">[PM] Plan BUG-115 resolution approach</parameter>
  <parameter name="prompt">You are @PM. Load and analyze BUG-115 requirements.
  Context: [PROJECT-CONTEXT passed from parent]
  Settings: [All settings passed from parent]
  Workflow: OUTER (Story/Bug level)</parameter>
</invoke>
```

### Command Pattern Detection
**Commands:** /icc-create-task, /icc-start-story, /icc-fix-bug
**Auto-Trigger Example:**
When user types: "/icc-fix-bug BUG-115"
System detects: Bug fix command → Extract BUG-115 → Launch outer workflow

### Role Mention Detection
**Pattern:** @Role: or @Role (inline) detected
**Auto-Trigger Example:**
When user says: "@Developer implement the login feature"
System detects: Role mention → Convert to Task tool → Launch inner workflow

**Task Tool Invocation:**
```xml
<invoke name="Task">
  <parameter name="description">[Developer] Implement the login feature</parameter>
  <parameter name="prompt">You are @Developer. Implement the login feature.
  Context: [PROJECT-CONTEXT passed from parent]
  Settings: [All settings passed from parent]
  Workflow: INNER (Task level)</parameter>
</invoke>
```

## Workflow Type Determination

### Outer Workflow Triggers (Story/Bug Level)
**Detection Pattern:**
1. User mentions STORY-XXX or BUG-XXX
2. System searches for corresponding .yaml file
3. If found: Launch outer workflow
4. Parent loads PROJECT-CONTEXT.md and all settings ONCE
5. Pass context and settings to all subagents

**Real Examples:**
- "Fix BUG-115" → Outer workflow
- "Implement STORY-002" → Outer workflow
- "Create tasks for the authentication epic" → Outer workflow

### Inner Workflow Triggers (Task Level)
**Detection Pattern:**
1. User mentions TASK-XXX or single implementation request
2. System identifies single-task scope
3. Launch inner workflow with pre-loaded context
4. Context and settings passed from parent

**Real Examples:**
- "Execute TASK-003" → Inner workflow
- "@Developer fix the login bug" → Inner workflow
- "Update the configuration file" → Inner workflow

### Ambiguous Work Detection
**Resolution Pattern:**
1. Search for explicit work IDs (STORY/BUG/TASK)
2. Check scope: Multiple tasks = Outer, Single task = Inner
3. Default to inner workflow for direct implementation
4. Always pass parent context to avoid redundant loading

## Auto-Activation Mechanisms

### File-Based Activation
**Real Behavior:**
When user opens story.yaml:
1. System detects file type from extension
2. Reads assignment configuration
3. Creates Task tool invocation with PM role
4. Includes file content in prompt context
5. Launches outer workflow automatically

### Command-Based Activation
**Real Behavior:**
When user types /icc-execute-task TASK-003:
1. System parses command and extracts TASK-003
2. Loads task file content
3. Creates Task tool invocation with assigned role
4. Passes task requirements in prompt
5. Launches inner workflow automatically

### Context-Based Activation
**Real Behavior:**
When user says "Let's implement the auth system":
1. System detects implementation intent
2. Checks for related assignment files
3. If none found, creates inner workflow
4. Assigns appropriate role (@Developer or specialist)
5. Launches with implementation context

## Integration Points

### With Workflow Enforcement
**Integration:** Auto-trigger respects phase gates → Launches at correct phase → Maintains phase consistency → Reports to enforcement system

### With L3 Autonomy
**L3 Mode:** Continuous work detection → Auto-launch without prompts → Chain workflow executions → Discover new work patterns

### With Learning System
**Learning:** Capture trigger patterns → Store successful launches → Learn from misdetections → Improve accuracy over time

## Trigger Priority Order

### Priority Hierarchy
1. **Explicit assignment files** (epic.yaml, story.yaml, bug.yaml)
2. **Direct commands** (/icc-start-story, /icc-execute-task)
3. **Work ID references** (STORY-XXX, TASK-XXX mentions)
4. **Role invocations** (@Role patterns)
5. **Context inference** (work-related discussions)

### Conflict Resolution
**Multiple Triggers:** Use highest priority trigger → Ignore lower priority → Log all detected triggers → Learn from patterns

## Auto-Correction Patterns

### Missing Workflow Detection
**Real Correction Example:**
User: "@Developer implement login"
System detects: Direct role mention without workflow
Auto-correction:
1. STOP the direct execution
2. Create Task tool invocation
3. Launch inner workflow
4. Execute through proper phases

### Wrong Workflow Detection
**Real Correction Example:**
User starts implementing without planning phase
System detects: Phase skip attempt
Auto-correction:
1. STOP implementation
2. Store attempted work
3. Launch workflow from phase 1
4. Apply work after validation

### Bypass Attempt Detection
**Real Correction Example:**
User tries direct file edit without workflow
System detects: Workflow bypass
Auto-correction:
1. Block the edit operation
2. Identify work type from edit intent
3. Launch appropriate workflow
4. Guide through proper phases

## Configuration Integration

### Settings Recognition
**Auto-Load:** Detect autonomy_level setting → Apply L1/L2/L3 behaviors → Respect blocking_enabled → Honor pm_always_active

### Dynamic Adjustment
**Runtime:** Monitor setting changes → Adjust trigger sensitivity → Update automation level → Maintain consistency

## Continuous Detection (L3)

### Work Discovery Engine
**L3 Autonomous Behavior:**
1. Scan project for PLANNED/IN_PROGRESS tasks
2. Check git for uncommitted changes
3. Identify incomplete stories/bugs
4. Auto-launch workflows for each item
5. Execute up to 5 parallel tasks

**Real L3 Example:**
System finds: TASK-003 (PLANNED), TASK-004 (PLANNED)
Auto-action: Launch 2 parallel inner workflows
Continue: Until all work COMPLETED

### Chain Execution
**Continuous Flow:**
1. Complete TASK-003 workflow
2. Immediately scan for next work
3. Find TASK-004 ready
4. Launch without user prompt
5. Continue until task queue empty

### Progress Tracking
**Real-time Monitoring:**
- Active workflows: Track phases and progress
- Completion rates: Log success/failure
- Stuck detection: Alert if phase exceeds time
- Learning capture: Store patterns for improvement

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

## Real-World Examples

### Example 1: Bug Fix Request
**User Input:** "Can you fix BUG-115?"
**Auto-Trigger Action:**
1. Detect BUG-115 reference
2. Search for bug.yaml file
3. Create PM Task tool invocation
4. Launch outer workflow
5. Pass bug context to PM

### Example 2: Direct Implementation
**User Input:** "Update the login validation"
**Auto-Trigger Action:**
1. Detect implementation intent
2. No specific ID found
3. Create Developer Task tool invocation
4. Launch inner workflow
5. Execute through phases

### Example 3: L3 Autonomous Work
**System Scan:** Finds 3 PLANNED tasks
**Auto-Trigger Action:**
1. Sort by priority (P0 first)
2. Launch parallel workflows (up to 5)
3. Monitor progress
4. Chain to next tasks
5. Continue until queue empty

---
*Workflow auto-trigger behavior for intelligent-claude-code system - NO PSEUDO-CODE, only real behavioral patterns*