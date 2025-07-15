# Lean Workflow Executor

**PURPOSE:** Single module that reads assignment files and executes workflows. No complex behavioral enforcement needed - the workflow IS the behavior.

## Imports

@./config-loader.md
@./git-privacy-enforcer.md
@./role-detection-engine.md
@./autonomy-controller.md
@./role-activation-system.md
@./pm-command-system.md
@./learning-team-automation.md

## Core Functions

### 0. Initialize System (NEW)
```yaml
function: initialize_system()
  actions:
    - Load configuration via ConfigLoader
    - Initialize AutonomyController
    - Apply autonomy level settings
    - Check pm_always_active flag
    - Set blocking behavior mode
    - Cache settings for session
    - Initialize PM command processor
    - Initialize learning enforcement system
  integration: 
    - SettingsAPI.getSettings()
    - AutonomyController.initialize()
    - PMCommandProcessor.initialize()
    - initializeLearningEnforcement()
```

### 0.1. Process PM Commands (NEW)
```pseudocode
FUNCTION processUserMessage(message):
    // Check for PM commands first
    IF message.startsWith("@PM"):
        processor = PMCommandProcessor()
        result = processor.processCommand(message)
        IF result != null:
            RETURN result
    
    // Continue with normal processing
    RETURN processNormalMessage(message)
```

### 1. Read Assignment
```yaml
function: read_assignment(type, id)
  input: "EPIC-001" or "STORY-002" or "TASK-003"
  output: Parsed assignment data with embedded config
  action: 
    - Load file, validate structure
    - Apply embedded config if present
    - Return data with active config
  integration: SettingsAPI.applyEmbeddedConfig(content)
```

### 2. Execute Phase
```yaml
function: execute_phase(assignment, phase)
  autonomy_check:
    - Apply autonomy level before each phase
    - Get approval if required by L1/L2
    - Continue autonomously in L3
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
  detection:
    - Use RoleDetectionEngine to parse assignments
    - Extract all @Role mentions from task
    - Validate each detected role
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

### Git Operations Integration
```pseudocode
FUNCTION executeGitOperations(task, phase):
    settings = SettingsAPI.getSettings()
    interceptor = GitOperationInterceptor()
    
    FOR step IN phase.steps:
        IF step.action == "commit":
            message = generateCommitMessage(task, step.template)
            interceptor.interceptCommit(message, task.files)
            
        ELSE IF step.action == "push":
            validateBranchProtection(settings)
            executePush()
            
        ELSE IF step.action == "create_pr":
            title = generatePRTitle(task)
            description = generatePRDescription(task)
            interceptor.interceptPullRequest(title, description)
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

## Role Detection Integration

### Automatic Role Detection
```pseudocode
FUNCTION processTaskAssignment(task):
    engine = RoleDetectionEngine()
    validator = RoleValidator()
    controller = RoleActivationController()
    
    // Detect all role assignments
    detectedRoles = engine.detectRoleAssignments(task.content)
    
    FOR roleAssignment IN detectedRoles:
        // Validate assignment
        validation = validator.validateRoleAssignment(
            roleAssignment.role,
            task
        )
        
        IF NOT validation.valid:
            handleInvalidAssignment(roleAssignment, validation)
        ELSE:
            // Use RoleActivationController for role switching
            controller.activateRole(roleAssignment.role)
```

### Dynamic Specialist Creation
```pseudocode
FUNCTION handleSpecialistNeed(task, requiredDomain):
    settings = SettingsAPI.getSettings()
    controller = RoleActivationController()
    
    IF settings.specialist_creation:
        // Determine base role
        baseRole = determineBaseRole(task.type)
        specialistName = requiredDomain + "-" + baseRole
        
        // Create specialist if not exists
        IF NOT roleExists(specialistName):
            createDynamicSpecialist(specialistName)
        
        // Activate specialist using RoleActivationController
        controller.activateRole(specialistName)
        
        // Assign specialist
        assignRole(specialistName, task)
```

## Configuration-Driven Behaviors

### Git Privacy Enforcement
```pseudocode
FUNCTION enforceGitPrivacy(operation, content):
    settings = SettingsAPI.getSettings()
    enforcer = GitPrivacyEnforcer()
    RETURN enforcer.enforceGitPrivacy(content, settings)
```

### Autonomy Level Application
```pseudocode
FUNCTION applyAutonomyLevel(action):
    controller = AutonomyController()
    RETURN controller.applyAutonomyLevel(action)
```

### PM Activation
```pseudocode
FUNCTION checkPMActivation():
    settings = SettingsAPI.getSettings()
    IF settings.pm_always_active == true:
        controller = RoleActivationController()
        controller.activateRole("PM")
        initializeTaskManagement()
        initializePMCommands()

FUNCTION initializePMCommands():
    processor = PMCommandProcessor()
    processor.initialize()
    // Register command handlers
    registerCommandHandler("@PM init", processor.executeInit)
    registerCommandHandler("@PM refresh", processor.executeRefresh)
    registerCommandHandler("@PM reset", processor.executeReset)
    registerCommandHandler("@PM status", processor.executeStatus)
```

### Blocking Behavior Control
```pseudocode
FUNCTION handleBlockingEvent(event):
    settings = SettingsAPI.getSettings()
    IF settings.blocking_enabled == false:
        logEvent(event)
        createFollowUpTask(event)
        RETURN continueExecution()
    ELSE:
        RETURN blockUntilResolved(event)
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

## Priority System Implementation

### Priority Level Definitions
```yaml
epic_priorities:
  P0: 0    # CRITICAL - System-breaking issues, security vulnerabilities
  P1: 1    # HIGH - Major features, important bugs
  P2: 2    # MEDIUM - Standard features, minor bugs
  P3: 3    # LOW - Nice-to-have features, documentation

task_priorities:
  blocking: 0       # Must complete before other tasks
  critical_path: 1  # On critical path, affects timeline
  parallel: 2       # Can run simultaneously
  optional: 3       # Can be skipped if needed
```

### Priority Calculation Functions
```yaml
calculatePriority(item, parent):
  base_priority = parent ? parent.priority : item.priority
  
  # Severity adjustments
  if item.severity == "CRITICAL": return 0
  if item.severity == "HIGH": return MAX(base_priority, 1)
  if item.severity == "MEDIUM": return MAX(base_priority, 2)
  if item.severity == "LOW": return MAX(base_priority, 3)
  
  # Type adjustments
  if item.type == "security": return 0
  if item.type == "architecture": return MAX(base_priority - 1, 0)
  
  return base_priority

sortByPriority(items):
  return items.sort((a, b) => {
    # Primary sort: Priority level (P0 first)
    if a.priority != b.priority:
      return a.priority - b.priority
    
    # Secondary sort: Task type (blocking first)
    if a.task_priority != b.task_priority:
      return a.task_priority - b.task_priority
    
    # Tertiary sort: Creation time (FIFO)
    return a.created_time - b.created_time
  })
```

### Priority Inheritance Logic
```yaml
inheritPriority(story, epic):
  story.priority = MAX(epic.priority, story.severity_priority)
  
  # Security escalation
  if story.type == "security" || story.title.includes("security"):
    story.priority = 0
  
  # Customer bug escalation
  if story.type == "customer_bug":
    story.priority = MAX(story.priority - 1, 0)
  
  return story.priority

applyTaskPriority(task, story):
  task.priority = story.priority
  
  # Task type adjustments
  if task.type == "blocking":
    task.task_priority = 0
  elif task.type == "critical_path":
    task.task_priority = 1
  elif task.type == "parallel":
    task.task_priority = 2
  else:
    task.task_priority = 3
  
  return task
```

### Execution Order Fix
```yaml
# BROKEN (old system): Last item = highest priority
getNextItem_BROKEN(items):
  return items[items.length - 1]  # WRONG: Returns P3 before P0

# CORRECT (new system): P0 → P1 → P2 → P3
getNextItem_CORRECT(items):
  sorted_items = sortByPriority(items)
  return sorted_items[0]  # CORRECT: Returns P0 first

executeInPriorityOrder(items):
  sorted_items = sortByPriority(items)
  for item in sorted_items:
    if item.status == "ready":
      return executeItem(item)
  return null
```

### Dynamic Priority Adjustment
```yaml
escalatePriority(item, reason):
  old_priority = item.priority
  
  if reason == "security_issue":
    item.priority = 0
  elif reason == "customer_escalation":
    item.priority = MAX(item.priority - 1, 0)
  elif reason == "blocking_dependency":
    item.task_priority = 0
  elif reason == "system_failure":
    item.priority = 0
  
  if item.priority != old_priority:
    logPriorityChange(item, old_priority, item.priority, reason)
    notifyTeam(item, "priority_escalated")
  
  return item.priority
```

## Error Handling

### Error Processing with Learning
```pseudocode
FUNCTION handleError(error, context):
    // Process through learning system first
    processErrorForLearning(error)
    
    // Continue with standard error handling
    SWITCH error.type:
        CASE "blocked":
            updateStatus("blocked")
            noteBlocker(error.blocker)
            escalateToPM()
            
        CASE "failed":
            captureFailureReason(error)
            IF needsBug(error):
                createBug(error)
            learnFromFailure(error)
            
        CASE "priority_conflict":
            useTaskTypeResolution()
            logConflict(error)
            defaultToCreationTime()
```

### Learning Integration
```yaml
error_forgiveness:
  first_occurrence:
    - No penalty applied
    - Learning entity created
    - Pattern extracted
    - Memory integration
    
  repeated_error:
    - Double penalty applied
    - Previous learning referenced
    - Escalation triggered
    - Pattern reinforcement

learning_detection:
  patterns:
    - "based on previous learning"
    - "applying lesson from"
    - "to prevent repeat of"
  bonuses:
    - +0.5P for process improvement
    - +0.5Q for quality improvement
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
icc:create-story "Add user preferences"
- System creates story file
- PM runs icc:plan-story
- Tasks auto-generated with specialists assigned
```

### Specialist Executes Task
```
icc:execute-task TASK-002
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