# Parallelize Subtasks

Analyze $ARGUMENTS to identify parallelization opportunities and execution planning for subtasks.

## Behavioral Sequence
1. Parse $ARGUMENTS to extract:
   - Task description and scope
   - Existing subtasks or work breakdown
   - Dependencies and constraints
   - Resource requirements and conflicts
2. Analyze subtask dependencies:
   - Identify prerequisite relationships
   - Map file and resource conflicts
   - Detect schema or API dependencies
   - Note shared component dependencies
3. Categorize subtasks by execution type:
   - **Sequential**: Must complete before others start
   - **Blocking**: Prevents other work until done
   - **Critical Path**: Affects overall timeline
   - **Parallel**: Can run simultaneously
   - **Optional**: Can be skipped if needed
4. Identify parallelization opportunities:
   - Group non-conflicting subtasks
   - Find file-independent work
   - Separate read vs write operations
   - Isolate different technology stacks
5. Plan execution batches:
   - Batch 1: Blocking and prerequisite tasks
   - Batch 2-N: Parallel groups (max 5 per batch)
   - Final: Integration and cleanup tasks
   - Optional: Nice-to-have improvements
6. Validate parallel execution safety:
   - Check for file conflicts (same files being modified)
   - Verify no schema conflicts (database changes)
   - Ensure no API conflicts (same endpoints)
   - Confirm resource availability
7. Generate execution plan:
   - Sequential phase: Prerequisites and blockers
   - Parallel phases: Non-conflicting groups
   - Integration phase: Merge and validation
   - Testing phase: Comprehensive validation
8. Mark subtasks with execution indicators:
   - [SEQUENTIAL] - Must run in order
   - [PARALLEL-A] - Can run with batch A
   - [PARALLEL-B] - Can run with batch B
   - [BLOCKING] - Blocks other work
   - [OPTIONAL] - Can be deferred

## Arguments
**Format:** Task with subtasks requiring execution planning
**Examples:**
- "Implement user authentication: setup database, create API endpoints, build UI components, write tests"
- "Refactor payment system: extract service layer, update database schema, migrate existing data, update client code"
- "Add monitoring: setup infrastructure, instrument code, create dashboards, configure alerts"

## Core Actions
- Analyze subtask dependencies and conflicts
- Identify safe parallelization opportunities
- Group subtasks into execution batches
- Plan sequential vs parallel execution phases
- Validate execution safety and resource conflicts

## Parallelization Rules
- **File Conflicts**: Same files = sequential execution required
- **Schema Changes**: Database modifications = sequential with dependencies
- **API Changes**: Same endpoints = sequential execution required
- **Independent Work**: Different files/services = parallel execution safe
- **Max Parallel**: Maximum 5 subtasks per parallel batch

## Execution Categories
- **Sequential**: Database schema → API changes → UI updates → Integration tests
- **Parallel Safe**: Documentation + Unit tests + Logging + Monitoring setup
- **Blocking**: Environment setup → Core infrastructure → Shared dependencies
- **Critical Path**: User-facing features → Performance requirements → Security validations

## Conflict Detection
- **File Level**: Check which files each subtask modifies
- **Schema Level**: Identify database changes and migrations
- **API Level**: Detect endpoint modifications and version changes
- **Resource Level**: Check for shared tools and infrastructure needs

## Batch Planning Examples
```yaml
Sequential Phase:
  - [BLOCKING] Setup development environment
  - [SEQUENTIAL] Create database schema
  - [SEQUENTIAL] Define API contracts

Parallel Phase A:
  - [PARALLEL-A] Implement authentication endpoints
  - [PARALLEL-A] Create user interface components
  - [PARALLEL-A] Write unit tests for models
  - [PARALLEL-A] Add logging infrastructure
  - [PARALLEL-A] Create API documentation

Parallel Phase B:
  - [PARALLEL-B] Implement authorization middleware
  - [PARALLEL-B] Add form validation
  - [PARALLEL-B] Write integration tests
  - [PARALLEL-B] Setup monitoring dashboards

Integration Phase:
  - [SEQUENTIAL] Merge all components
  - [SEQUENTIAL] Run full test suite
  - [SEQUENTIAL] Performance validation
```

## Integration Points
- Used during task decomposition phase
- Feeds into PM delegation strategy
- Guides role assignment and coordination
- Optimizes team execution efficiency

## Quality Standards
- Identify minimum 70% of parallelizable work
- Validate all conflict detection
- Provide clear execution sequence
- Include integration and testing phases
- Account for resource constraints

## Error Handling
- No subtasks provided: "Error: No subtasks found to analyze for parallelization"
- All tasks conflicting: "Note: All subtasks have dependencies - purely sequential execution required"
- Unclear dependencies: "Warning: Some dependencies unclear - conservative sequential approach recommended"
- Resource conflicts: "Warning: Resource conflicts detected - adjusting parallel batches"
- Complex dependencies: "Note: Complex dependency graph - breaking into smaller sequential phases"