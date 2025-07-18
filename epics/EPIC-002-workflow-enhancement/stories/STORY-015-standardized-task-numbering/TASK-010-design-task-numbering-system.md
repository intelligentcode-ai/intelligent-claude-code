# TASK-010: Design standardized task numbering system

## Task Metadata
- **ID**: TASK-010
- **Title**: Design standardized task numbering system
- **Assigned To**: @AI-Architect
- **Type**: design
- **Priority**: blocking
- **Status**: in_progress
- **Story**: STORY-015
- **Dependencies**: ["TASK-001", "TASK-002"]

## Task Scope
Design a comprehensive task numbering system for the intelligent-claude-code virtual team that implements the 5-stage workflow with standardized numbering patterns. This design must enable automatic review task generation, maintain backwards compatibility, and ensure project scope visibility in all tasks.

## Task Numbering Schema Design

### 1. Task Number Structure

#### Format: `TASK-NNN`
- **NNN**: 3-digit task number (001-999)
- Maintains compatibility with existing TASK-XXX pattern
- Clear semantic ranges for different task types

#### Number Range Allocation
```yaml
task_number_ranges:
  # Process Tasks (001-009)
  process_tasks:
    001: "knowledge_retrieval"      # Always first - gather existing knowledge
    002: "settings_retrieval"        # Configuration and settings check
    003: "memory_search"            # Search memory for patterns/learnings
    004: "context_gathering"        # Gather additional context
    005: "prerequisite_check"       # Verify prerequisites met
    006-009: "reserved_process"     # Future process tasks
    
  # Core Work Tasks (010-994)
  core_tasks:
    010-099: "architecture_design"  # Design and architecture tasks
    100-199: "implementation"       # Core implementation tasks
    200-299: "additional_impl"      # Additional implementation
    300-399: "testing"             # Test implementation
    400-499: "integration"         # Integration tasks
    500-599: "validation"          # Validation and verification
    600-699: "optimization"        # Performance and optimization
    700-799: "migration"           # Data/system migration
    800-894: "specialized"         # Domain-specific tasks
    895-994: "contingency"         # Buffer for unexpected tasks
    
  # Wrap-up Tasks (995-999)
  wrap_up_tasks:
    995: "documentation"           # Update all documentation
    996: "deployment"             # Deploy changes (if applicable)
    997: "testing_final"          # Final test suite run
    998: "git_operations"         # Commit, push, PR/MR
    999: "knowledge_generation"    # Capture learnings
```

### 2. Automatic Review Task Generation Rules

#### Review Task Numbering Pattern
```yaml
review_generation_rules:
  # For any creation/update task, immediate next number is review
  pattern: "TASK-NNN → TASK-(NNN+1)"
  
  triggers:
    - type: "implementation"
      review_type: "code_review"
      reviewer: "@{Domain}-Architect"  # Domain expert architect
      
    - type: "design"
      review_type: "design_review"
      reviewer: "@{Specialist}-Architect"
      
    - type: "documentation"
      review_type: "doc_review"
      reviewer: "@Requirements-Engineer"
      
    - type: "testing"
      review_type: "test_review"
      reviewer: "@QA-Engineer"
      
  exceptions:
    - "review"           # Reviews don't need reviews
    - "knowledge_*"      # Knowledge tasks don't need reviews
    - "git_operations"   # Git ops don't need reviews
    - "deployment"       # Deployment validated by testing
```

#### Review Task Creation Logic
```pseudocode
FUNCTION createReviewTask(originalTask):
    // Skip if task doesn't need review
    IF originalTask.type IN review_exceptions:
        RETURN null
    
    reviewTask = {
        id: formatTaskId(parseInt(originalTask.id) + 1),
        title: generateReviewTitle(originalTask),
        assigned_to: determineReviewer(originalTask),
        type: "peer_review",
        priority: originalTask.priority,
        dependencies: [originalTask.id],
        review_of: originalTask.id,
        project_scope: originalTask.project_scope
    }
    
    RETURN reviewTask

FUNCTION determineReviewer(task):
    // Domain-specific review assignment
    IF task.assigned_to == "@AI-Engineer":
        RETURN "@AI-Architect"
    ELSE IF task.assigned_to == "@Developer":
        RETURN "@System-Architect"
    ELSE IF task.assigned_to == "@DevOps-Engineer":
        RETURN "@System-Architect"
    ELSE IF task.assigned_to == "@Database-Engineer":
        RETURN "@Data-Architect"
    ELSE IF task.assigned_to == "@Security-Engineer":
        RETURN "@Security-Architect"
    ELSE IF task.assigned_to == "@Web-Designer":
        RETURN "@Frontend-Architect"
    ELSE:
        // Default to specialist architect for domain
        RETURN "@" + extractDomain(task) + "-Architect"
```

### 3. Configuration Structure

#### Task Management Configuration
```yaml
# Addition to config.md
task_management:
  numbering_system:
    enabled: true
    enforce_ranges: true
    auto_review_generation: true
    
  number_ranges:
    process_start: 1
    process_end: 9
    core_start: 10
    core_end: 994
    wrapup_start: 995
    wrapup_end: 999
    
  review_rules:
    auto_generate: true
    skip_types: ["review", "knowledge_retrieval", "knowledge_generation", "git_operations"]
    reviewer_mapping:
      "AI-Engineer": "AI-Architect"
      "Developer": "System-Architect"
      "DevOps-Engineer": "System-Architect"
      "Database-Engineer": "Data-Architect"
      "Security-Engineer": "Security-Architect"
      "Web-Designer": "Frontend-Architect"
      
  project_scope:
    mandatory: true
    inherit_from_parent: true
    validation_required: true
```

#### Task Number Allocator
```pseudocode
CLASS TaskNumberAllocator:
    usedNumbers: Set<number>
    
    FUNCTION initialize(existingTasks):
        FOR task IN existingTasks:
            usedNumbers.add(extractNumber(task.id))
    
    FUNCTION allocateNumber(taskType):
        range = getNumberRange(taskType)
        
        FOR num IN range.start TO range.end:
            IF num NOT IN usedNumbers:
                usedNumbers.add(num)
                RETURN formatTaskId(num)
        
        THROW "No available numbers in range for " + taskType
    
    FUNCTION getNumberRange(taskType):
        ranges = loadTaskNumberRanges()
        
        IF taskType IN ["knowledge_retrieval", "settings_retrieval", "memory_search"]:
            RETURN ranges.process_tasks
        ELSE IF taskType IN ["documentation", "deployment", "testing_final", "git_operations", "knowledge_generation"]:
            RETURN ranges.wrap_up_tasks
        ELSE:
            RETURN ranges.core_tasks
    
    FUNCTION formatTaskId(number):
        RETURN "TASK-" + number.toString().padStart(3, '0')
```

### 4. Integration Approach

#### Integration Points
```yaml
integration_points:
  lean_workflow_executor:
    - Hook into task creation
    - Validate number allocation
    - Trigger review generation
    
  task_file_generator:
    - Include task number in file name
    - Add review link if applicable
    - Validate project scope presence
    
  planning_commands:
    - /icc-plan-tasks uses allocator
    - /icc-add-task enforces numbering
    - Automatic review task creation
    
  validation_chains:
    - icc:validate-task-number
    - icc:ensure-review-task
    - icc:check-project-scope
```

#### Workflow Integration
```pseudocode
// Enhancement to lean-workflow-executor.md
FUNCTION createTaskWithNumbering(taskData, parentItem):
    allocator = new TaskNumberAllocator(parentItem.tasks)
    
    // Allocate task number
    taskNumber = allocator.allocateNumber(taskData.type)
    taskData.id = taskNumber
    
    // Ensure project scope
    IF NOT taskData.project_scope:
        taskData.project_scope = parentItem.project_scope
    
    // Create main task
    mainTask = createTask(taskData)
    tasks = [mainTask]
    
    // Auto-generate review if needed
    IF shouldGenerateReview(mainTask):
        reviewTask = createReviewTask(mainTask)
        tasks.append(reviewTask)
    
    RETURN tasks
```

### 5. Migration Strategy

#### Phase 1: Soft Migration (Non-Breaking)
```yaml
soft_migration:
  duration: "2 weeks"
  approach: "parallel_systems"
  
  steps:
    1. "Deploy new numbering system alongside existing"
    2. "New tasks use standardized numbers"
    3. "Existing tasks maintain current IDs"
    4. "Validation accepts both patterns"
    5. "Gradual adoption via new work items"
```

#### Phase 2: Full Migration
```yaml
full_migration:
  duration: "1 week"
  approach: "automated_conversion"
  
  steps:
    1. "Archive completed items with old numbering"
    2. "Convert active items to new numbering"
    3. "Update all references and dependencies"
    4. "Validate system integrity"
    5. "Remove legacy number support"
```

#### Migration Tools
```pseudocode
FUNCTION migrateTaskNumbering(story):
    oldToNew = {}
    allocator = new TaskNumberAllocator([])
    
    // Sort tasks by creation order
    sortedTasks = story.tasks.sort((a, b) => a.created - b.created)
    
    // Allocate new numbers
    FOR task IN sortedTasks:
        newNumber = allocator.allocateNumber(task.type)
        oldToNew[task.id] = newNumber
        task.id = newNumber
    
    // Update dependencies
    FOR task IN story.tasks:
        FOR i, dep IN task.dependencies:
            IF dep IN oldToNew:
                task.dependencies[i] = oldToNew[dep]
    
    // Update review references
    FOR task IN story.tasks:
        IF task.review_of AND task.review_of IN oldToNew:
            task.review_of = oldToNew[task.review_of]
    
    RETURN story
```

### 6. Validation and Enforcement

#### Validation Rules
```pseudocode
FUNCTION validateTaskNumbering(task):
    errors = []
    
    // Check number format
    IF NOT task.id.match(/^TASK-\d{3}$/):
        errors.push("Invalid task ID format")
    
    // Check range compliance
    number = parseInt(task.id.substring(5))
    expectedRange = getExpectedRange(task.type)
    
    IF number < expectedRange.start OR number > expectedRange.end:
        errors.push("Task number outside expected range for type: " + task.type)
    
    // Check review task presence
    IF needsReview(task):
        reviewNumber = number + 1
        reviewTask = findTaskById("TASK-" + reviewNumber.toString().padStart(3, '0'))
        IF NOT reviewTask OR reviewTask.type != "peer_review":
            errors.push("Missing review task for " + task.id)
    
    // Check project scope
    IF NOT task.project_scope:
        errors.push("Missing project scope")
    
    RETURN errors
```

## Design Benefits

1. **Clear Organization**: Semantic number ranges indicate task purpose
2. **Automatic Review**: No manual review task creation needed
3. **Backwards Compatible**: Works with existing TASK-XXX pattern
4. **Project Visibility**: Scope mandatory in all tasks
5. **Workflow Alignment**: Numbers reflect 5-stage workflow
6. **Conflict Prevention**: Allocator prevents number collisions
7. **Migration Support**: Phased approach minimizes disruption

## Implementation Recommendations

1. Start with configuration schema in `config.md`
2. Implement `TaskNumberAllocator` class
3. Integrate with planning commands first
4. Add validation to lean-workflow-executor
5. Enable auto-review generation
6. Deploy with soft migration enabled
7. Monitor and adjust ranges as needed

## Success Metrics

- All new tasks follow numbering pattern
- 100% of implementation tasks have reviews
- Zero number conflicts
- Project scope present in all tasks
- Smooth migration of existing items