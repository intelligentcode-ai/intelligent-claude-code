# Planning Commands (Corrected Terminology)

## Epic Management Commands

### /create-epic
**PURPOSE:** Create new epic for overarching feature
**USAGE:** /create-epic "title" [--owner @PM]
**AUTHORITY:** PM, Architect, Requirements-Engineer, User
**EXECUTION:**
1. Create epic directory structure
2. Generate epic.yaml from template
3. Enter epic planning phase
4. Trigger story identification

### /plan-epic
**PURPOSE:** Plan stories and bugs for epic
**USAGE:** /plan-epic EPIC-XXX
**EXECUTION:**
1. Knowledge retrieval for similar epics
2. Story identification workshop
3. Bug triage from backlog
4. Priority and dependency mapping

## Story/Bug Management Commands

### /create-story
**PURPOSE:** Create new story within epic
**USAGE:** /create-story "title" --epic EPIC-XXX [--type feature|enhancement|refactor]
**AUTHORITY:** PM, Architect, Requirements-Engineer, User
**EXECUTION:**
1. Create story directory under epic
2. Generate story.yaml from template
3. Enter story INIT phase
4. Trigger task planning

### /create-bug
**PURPOSE:** Create bug report within epic
**USAGE:** /create-bug "title" --epic EPIC-XXX --severity HIGH
**AUTHORITY:** Anyone can report, PM/Architect/RE create
**EXECUTION:**
1. Create bug directory under epic
2. Generate bug.yaml from template
3. Capture reproduction steps
4. Trigger task planning

### /plan-story
**PURPOSE:** Break story into executable tasks
**USAGE:** /plan-story STORY-XXX
**EXECUTION:**
1. Read embedded_config
2. Knowledge retrieval
3. Identify required task types
4. Assign specialists to tasks
5. Define task dependencies
6. Knowledge generation

### /plan-bug
**PURPOSE:** Plan tasks for bug resolution
**USAGE:** /plan-bug BUG-XXX
**EXECUTION:**
1. Analyze bug impact
2. Define investigation tasks
3. Plan fix implementation
4. Add testing tasks
5. Include knowledge capture

## Task Management Commands

### /assign-task
**PURPOSE:** Assign task to specialist
**USAGE:** /assign-task TASK-XXX @Specialist
**AUTHORITY:** PM
**EXECUTION:**
1. Verify capability match >70%
2. Create task assignment file
3. Notify specialist
4. Update story progress

### /execute-task
**PURPOSE:** Specialist executes assigned task
**USAGE:** /execute-task TASK-XXX
**AUTHORITY:** Assigned specialist
**EXECUTION:**
1. Knowledge retrieval
2. Optional: Create subtasks
3. Execute work
4. Update progress
5. Knowledge generation

### /create-subtask
**PURPOSE:** Break task into atomic steps
**USAGE:** /create-subtask "title" --task TASK-XXX
**AUTHORITY:** Assigned specialist only
**EXECUTION:**
1. Add subtask to task file
2. Update task complexity
3. Track subtask progress

## Progress Commands

### /story-status
**PURPOSE:** Show story progress
**USAGE:** /story-status STORY-XXX
**OUTPUT:**
```
STORY-002: Login and Session Management
Phase: EXECUTE
Tasks: 3/8 completed (37.5%)
- TASK-001: Research ✓
- TASK-002: Implementation ⟳ (40% - 2/6 subtasks)
- TASK-003: Session mgmt ⏸
[...]
Blockers: None
ETA: 2 hours
```

### /epic-status
**PURPOSE:** Show epic progress
**USAGE:** /epic-status EPIC-XXX
**OUTPUT:**
```
EPIC-003: User Authentication
Stories: 1/3 completed
Bugs: 0/1 resolved
Overall: 25% complete
Next milestone: MVP in 3 days
```

### /task-status
**PURPOSE:** Show task details
**USAGE:** /task-status TASK-XXX
**OUTPUT:**
```
TASK-002: Implement login endpoint
Assigned: @Backend-Developer
Status: IN_PROGRESS
Subtasks: 2/6 completed
- SUBTASK-001: Setup middleware ✓
- SUBTASK-002: Input validation ✓
- SUBTASK-003: Password verify ⟳
[...]
```

## Workflow Commands

### /complete-task
**PURPOSE:** Mark task as complete
**USAGE:** /complete-task TASK-XXX
**VALIDATION:**
1. All subtasks completed
2. Deliverables present
3. Validation passed
4. Knowledge captured

### /complete-story
**PURPOSE:** Mark story as done
**USAGE:** /complete-story STORY-XXX
**VALIDATION:**
1. All tasks completed
2. Acceptance criteria met
3. Integration successful
4. Knowledge generated

### /resolve-bug
**PURPOSE:** Mark bug as resolved
**USAGE:** /resolve-bug BUG-XXX
**VALIDATION:**
1. Fix implemented
2. Tests passing
3. No regression
4. Root cause documented

## Scoring Integration

### Task Completion Scoring
- Implementation task: +1.0P, +1.0Q
- Review task: +0.5P, +1.0Q
- Testing task: +0.5P, +1.5Q
- Documentation: +0.5P, +0.5Q
- Knowledge creation: +1.0P, +1.0Q

### Story Completion Scoring
- On-time delivery: +2.0P
- Quality delivery: +2.0Q
- Learning shared: +1.0P/Q bonus

### Bug Resolution Scoring
- Critical fix: +2.0P, +2.0Q
- Root cause found: +1.0P
- Prevention added: +1.0Q