# Lean Workflow Executor

**PURPOSE:** Single module that reads assignment files and executes workflows. No complex behavioral enforcement needed - the workflow IS the behavior.

## Core Functions

### 1. Read Assignment
```yaml
function: read_assignment(type, id)
  input: "EPIC-001" or "STORY-002" or "TASK-003"
  output: Parsed assignment data with embedded config
  action: Load file, validate structure, return data
```

### 2. Execute Phase
```yaml
function: execute_phase(assignment, phase)
  phases:
    INIT: Capture initial information
    PLAN: Break down into smaller units (stories→tasks)
    EXECUTE: Perform the actual work
    ACCEPTANCE: Validate completion
    DONE: Archive and capture learnings
```

### 3. Role Assignment with Validation
```yaml
function: assign_role(task, required_capabilities)
  validation_chain:
    - icc:detect-work-type(task.content) → specialist_architect_type
    - icc:require-triage(@PM, @specialist_architect) → triage_complete
    - icc:validate-assignments(tasks) → capability_match_check
    - icc:require-approval(@PM, @specialist_architect) → approval_status
  logic:
    - Calculate capability match (must be >70%)
    - Enforce specialist preference (@AI-Architect not @Architect)
    - Block generic roles when specialists exist
    - Create dynamic specialist if needed
  governance: Architect-validated assignments only
```

### 4. Progress Tracking
```yaml
function: update_progress(item_type, item_id, status)
  updates:
    - Task status in story
    - Story status in epic
    - Overall progress metrics
  automatic_scoring: Based on completion
```

## Validation Command Chains

### Core Validation Commands
```yaml
icc:detect-work-type(content):
  patterns:
    ai_agentic: ["AI", "ML", "agentic", "behavioral", "automation", "intelligence"]
    infrastructure: ["deployment", "infrastructure", "system", "server", "cloud"]
    security: ["security", "authentication", "authorization", "encryption"]
    database: ["database", "SQL", "data", "schema", "migration"]
  output: specialist_architect_type (@AI-Architect, @System-Architect, etc.)

icc:require-triage(pm_role, specialist_architect):
  validation:
    - BLOCK until both roles complete joint triage
    - Validate work necessity and value
    - Confirm specialist requirements
    - Approve task breakdown approach
  output: triage_complete (true/false)

icc:validate-assignments(tasks):
  checks:
    - Capability match >70% for all assignments
    - Specialist preference (@AI-Architect not @Architect)
    - No generic roles when specialists exist
    - No meaningless busywork tasks
  output: validation_result (pass/fail with details)

icc:require-approval(pm_role, specialist_architect):
  requirement: Joint PM + Specialist Architect approval
  blocks: Assignment creation until approval received
  output: approval_status (approved/pending/rejected)
```

### Story/Bug Creation Chain
```yaml
MANDATORY VALIDATION CHAIN:
icc:detect-work-type(content) 
→ icc:require-triage(@PM, @detected_specialist_architect) 
→ icc:validate-assignments(tasks) 
→ icc:require-approval(@PM, @detected_specialist_architect)
→ icc:create-assignment(story.yaml)
```

## Workflow Execution Patterns

### Story Planning (PM executes) - WITH VALIDATION
```
1. Read story assignment file
2. Check embedded_config
3. **VALIDATION CHAIN EXECUTION:**
   - icc:detect-work-type(story.content) → specialist_architect
   - icc:require-triage(@PM, @specialist_architect) → BLOCK until complete
   - icc:validate-assignments(proposed_tasks) → capability validation
   - icc:require-approval(@PM, @specialist_architect) → BLOCK until approved
4. Create validated tasks:
   - Always start with knowledge task
   - Add type-specific tasks (validated by specialist architect)
   - Always end with knowledge task
5. Assign specialists to tasks (validated assignments only)
6. Update story file with validated tasks
```

### Task Execution (Specialist executes)
```
1. Read task assignment
2. Knowledge retrieval (automatic first step)
3. Decide if subtasks needed
4. Execute work
5. Update progress
6. Knowledge generation (automatic last step)
7. Mark complete
```

### Review Handling (Config-driven)
```
IF embedded_config.blocking_enabled == false:
  - Create follow-up task for findings
  - Continue execution
ELSE:
  - Block until findings resolved
  - Require re-review
```

## Scoring Integration

### Automatic Score Updates
```yaml
on_task_complete:
  task_type: "implementation"
  updates:
    - process_score: +1.0
    - quality_score: +1.0
    
on_story_complete:
  all_tasks: "done"
  updates:
    - process_bonus: +2.0
    - quality_bonus: +2.0
```

## Knowledge Management

### Retrieval Pattern
```yaml
before_work:
  - Search for similar items
  - Load relevant patterns
  - Apply learnings
  simple_and_automatic: No enforcement needed
```

### Generation Pattern
```yaml
after_work:
  - Capture approach
  - Document learnings
  - Store for future
  simple_and_automatic: Part of workflow
```

## Tool Usage

### Minimal Tool Set
- **Read**: Load assignment files
- **Write**: Update progress
- **Task**: Create follow-up tasks
- **Memory**: Store/retrieve knowledge
- **Git**: Commit when specified

### No Complex Chains
- No forced sequential thinking
- No penalty systems
- No monitoring loops
- Just read → execute → update

## Config Application

### During Planning
```yaml
read_config:
  - Load all settings
  - Embed in assignment
  - Shape task creation
  never_again: Config embedded, not re-read
```

### During Execution
```yaml
use_embedded:
  - Read from assignment file
  - Apply conditional logic
  - Drive behavior
  simple: No runtime lookups
```

## Error Handling

### Simple Patterns
```yaml
blocked:
  - Update status to blocked
  - Note blocker in task
  - Escalate to PM
  
failed:
  - Capture failure reason
  - Create bug if needed
  - Learn from failure
```

## Why This Works

1. **Structure Enforces Behavior**: Assignment files contain all needed information
2. **No Complex Logic**: Just read files and execute steps
3. **Config-Driven**: Embedded settings shape execution
4. **Natural Flow**: Knowledge→Work→Knowledge
5. **Automatic Scoring**: Completion triggers updates
6. **Simple Tools**: Basic operations only

## Usage Examples

### PM Creates Story
```
/create-story "Add user preferences"
- System creates story file
- PM runs /plan-story
- Tasks auto-generated with specialists assigned
```

### Specialist Executes Task
```
/execute-task TASK-002
- System loads task assignment
- Specialist does knowledge retrieval
- Work happens
- Knowledge captured
- Score updated
```

### Review Creates Follow-up
```
Review finds issue:
- Check embedded_config.blocking_enabled
- If false: Create TASK-XXX-fix-issue
- Continue execution
- No complex enforcement needed
```

## Validation Examples

### AI-Agentic Work Detection
```yaml
Input: "Update virtual team behavioral patterns"
icc:detect-work-type() → @AI-Architect required
Result: PM + @AI-Architect triage (not generic @Architect)
```

### Wrong Assignment Prevention
```yaml
Input: Task assigned to @System-Engineer for AI work
icc:validate-assignments() → FAIL (capability mismatch)
Correction: Reassign to @AI-Engineer with @AI-Architect approval
```

### Meaningless Task Prevention
```yaml
Input: "Test Role Switching" with no clear purpose
icc:require-triage() → BLOCK (no business value identified)
Result: Task rejected, require specific valuable work definition
```

### Specialist Preference Enforcement
```yaml
Input: Task assigned to generic @Architect
icc:validate-assignments() → FAIL (specialist exists)
Correction: Require @AI-Architect for AI-related architecture work
```

## Benefits

### Governance Without Complexity
- **Lightweight**: Uses command chains, not complex enforcement
- **Mandatory**: Cannot skip validation steps in chain
- **Traceable**: Clear audit trail of all validation decisions
- **Consistent**: Same validation pattern for all work types
- **Expert-Driven**: Specialist architects ensure proper expertise matching

### Problem Prevention
✅ **Zero wrong specialist assignments** through detection + validation
✅ **Mandatory PM + Specialist Architect collaboration** for all stories/bugs
✅ **No meaningless busywork** through triage value validation
✅ **Proper expertise matching** through capability validation + specialist preference

## Summary

This enhanced lean executor adds essential governance through validation command chains while maintaining simplicity. The validation system prevents systemic role assignment errors and ensures proper specialist expertise application for all work.