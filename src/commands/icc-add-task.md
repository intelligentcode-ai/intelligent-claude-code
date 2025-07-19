# Add Task

Add task to story or bug using $ARGUMENTS as task definition.

## Behavioral Sequence
1. Verify current role is not @PM:
   - If @PM role active, respond "Error: Task addition requires specialist role, not @PM"
   - PM delegates via Task tool, doesn't create tasks directly
2. Parse $ARGUMENTS to extract:
   - Parent ID (STORY-XXX or BUG-XXX format)
   - Task title (required)
   - Task type (implementation/testing/documentation/review/research)
   - Priority level (blocking/critical_path/parallel/optional)
   - Estimated hours
   - Dependencies on other tasks
3. Validate parent exists and workflow phase allows task addition:
   - Locate parent file: `epics/*/stories/[STORY-ID]/story.yaml` or `epics/*/bugs/[BUG-ID]/bug.yaml`
   - If not found, respond "Error: Parent [PARENT-ID] not found"
   - Load parent file and verify phase is EXECUTE or IN_PROGRESS
   - Check workflow_phase is "git_operations" or later in outer workflow
   - If workflow phase too early, respond "Error: Cannot add tasks during [workflow_phase] phase"
   - Tasks can only be added after initial planning is complete
4. Execute work type validation:
   - Run `icc-validate-work-type "[task_description]"`
   - Ensure current specialist role has >70% capability match
   - If mismatch, respond "Error: Task requires different specialist. Suggested: @[RecommendedRole]"
5. Generate next TASK-XXX ID:
   - Scan existing tasks in parent directory
   - Find highest existing TASK number
   - Assign next sequential ID (e.g., TASK-005, TASK-006)
6. Validate dependencies:
   - Check all dependency task IDs exist
   - Ensure no circular dependencies
   - Verify dependency tasks are not completed (would indicate wrong sequencing)
7. Create task file in parent directory:
   - Path: `epics/[EPIC-ID]/stories|bugs/[PARENT-ID]/tasks/[TASK-ID].md`
   - Content format:
   ```markdown
   # [TASK-ID]: [Task Title]
   
   **Parent**: [STORY-ID or BUG-ID]
   **Assigned To**: @[CurrentRole]
   **Type**: [implementation|testing|documentation|review|research]
   **Priority**: [blocking|critical_path|parallel|optional]
   **Estimated Hours**: [X]
   **Dependencies**: [TASK-XXX, TASK-XXX]
   **Workflow Type**: inner
   **Workflow Phase**: knowledge_retrieval
   **Added During**: EXECUTION (additional work discovered)
   
   ## Description
   [Detailed task description]
   
   ## Acceptance Criteria
   - [ ] [Criterion 1]
   - [ ] [Criterion 2]
   
   ## Context
   Discovered during execution of [related task/work]
   
   ## Status
   - Status: PLANNED
   - Created: [current_date]
   - Created By: @[CurrentRole]
   - Started: null
   - Completed: null
   ```
8. Auto-create review task for implementation work:
   - If task type is "implementation", create corresponding review task
   - Review task assigned to appropriate domain expert (not task creator)
   - Use `icc-validate-work-type` to find correct reviewer
9. Update parent item:
   - Add task ID to tasks array in parent YAML
   - Update estimated_hours (add new task estimate)
   - Increment task count
   - Update last_modified timestamp
10. Update dependency graph:
    - Add new task to existing dependency visualization
    - Identify new critical path if dependencies affect it
    - Flag any parallel execution opportunities
11. Display success message:
    "✅ Task [TASK-ID] added to [PARENT-ID]: [title]"
    "🔗 Dependencies: [list or 'none']"
    "🎯 Priority: [priority] ([X] hours estimated)"
    if auto-review created: "🔍 Auto-created review task: [REVIEW-TASK-ID]"
12. Log activity and update specialist scores (+0.5P for task planning)

## Error Handling
- PM role detected: "Error: @PM delegates tasks via Task tool, doesn't create directly"
- Invalid parent ID: "Error: Parent ID must be STORY-XXX or BUG-XXX format"
- Parent not found: "Error: Parent [PARENT-ID] not found"
- Wrong phase: "Error: Cannot add tasks during [phase] phase. Parent must be in EXECUTE phase."
- Capability mismatch: "Error: Current role lacks capability for this task. Switch to @[SuggestedRole]"
- Circular dependency: "Error: Circular dependency detected: [task_chain]"
- Missing dependency: "Error: Dependency [TASK-ID] not found in parent"
- File creation failed: "Error: Could not create task file: [specific error]"
- Invalid task type: "Error: Task type must be: implementation, testing, documentation, review, research"

## Task Type Guidelines
- **Implementation**: Code development, feature building, bug fixing
- **Testing**: Unit tests, integration tests, QA validation
- **Documentation**: Code comments, user docs, technical specs
- **Review**: Peer review, code review, design review
- **Research**: Investigation, analysis, exploration

## Priority Rules
- **Blocking**: Must complete before other tasks can start
- **Critical Path**: On critical path, affects delivery timeline
- **Parallel**: Can run simultaneously with other tasks
- **Optional**: Can be skipped if time/scope constraints

## Auto-Review Creation Logic
```
Implementation Task → Review Task:
- AI implementation → @AI-Engineer review
- Infrastructure work → @System-Engineer review
- Frontend code → @Web-Designer review
- Security changes → @Security-Engineer review
- Database work → @Database-Engineer review
```

## Command Chaining
- If --execute flag present, immediately start working on the task
- Task addition updates parent progress tracking
- New tasks available for PM delegation workflow