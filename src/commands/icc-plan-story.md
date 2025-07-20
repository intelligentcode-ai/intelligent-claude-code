# Story Planning Command

Plan story by generating tasks using $ARGUMENTS as story ID.

## Behavioral Sequence
1. Parse $ARGUMENTS to extract story ID (STORY-XXX format)
2. If story ID missing, respond "Error: Story ID required (format: STORY-XXX)"
3. Validate story exists:
   - Locate story file: `epics/*/stories/[STORY-ID]/story.yaml`
   - If not found, respond "Error: Story [STORY-ID] not found"
   - Load story.yaml and verify status is PLANNED
   - Check workflow_phase allows planning (must be "story_creation" or later)
   - If phase invalid, respond "Error: Story must complete story_creation phase first"
4. Execute knowledge_retrieval workflow phase:
   - Transition workflow_phase to "knowledge_retrieval"
   - Search memory for similar patterns
   - Complete all knowledge retrieval steps from outer workflow
5. Search memory for similar patterns:
   - Execute `icc-memory-search "[story.title] [story.type]"`
   - Look for TaskLearning entities with similar scope
   - Find Success-Pattern entities for story type
   - Display: "📚 Found X relevant patterns from memory"
5. Detect work type and complexity:
   - Execute `icc-detect-work-type "[story.description]"`
   - Identify primary domain (AI, infrastructure, frontend, etc.)
   - Determine complexity level (simple/medium/complex)
   - Calculate estimated task count based on scope
6. Transition to task_decomposition workflow phase:
   - Update story workflow_phase to "task_decomposition"
   - Follow outer workflow task_decomposition requirements
   - Enforce all validation gates before proceeding
7. Activate appropriate specialist architect:
   - Based on work type, activate required architect role
   - AI work: Execute `icc-activate-role @AI-Architect`
   - Infrastructure: Execute `icc-activate-role @System-Architect`
   - Security: Execute `icc-activate-role @Security-Architect`
8. Generate task breakdown with architect expertise:
   - Apply architect knowledge to create comprehensive task list
   - Standard tasks: knowledge_loading, research, implementation, peer_review, documentation, testing, git_operations, knowledge_creation
   - Sequence tasks with dependencies (blocking → critical_path → parallel → optional)
   - Estimate hours for each task
9. Validate specialist assignments:
   - For each task, execute `icc-detect-work-type "[task.description]"`
   - Ensure >70% capability match for all assignments
   - Create dynamic specialists if needed (@Domain-BaseRole)
   - Require PM + Specialist Architect approval for all assignments
10. Create task files in story directory:
   - Create `epics/[EPIC-ID]/stories/[STORY-ID]/tasks/TASK-001.md` for each task
   - Task file format:
   ```markdown
   # TASK-001: [Task Title]
   
   **Story**: [STORY-ID]
   **Assigned To**: @[SpecialistRole]
   **Priority**: [blocking|critical_path|parallel|optional]
   **Estimated Hours**: [X]
   **Dependencies**: [TASK-XXX, TASK-XXX]
   **Workflow Type**: inner
   **Workflow Phase**: knowledge_retrieval
   
   ## Description
   [Detailed task description]
   
   ## Acceptance Criteria
   - [ ] [Criterion 1]
   - [ ] [Criterion 2]
   
   ## Status
   - Status: PLANNED
   - Phase: INIT
   - Created: [date]
   - Started: null
   - Completed: null
   ```
11. Update story.yaml with task references:
    - Add task IDs to tasks array
    - Update estimated_hours (sum of task estimates)
    - Transition phase from INIT to PLAN
    - Transition workflow_phase to "acceptance_criteria"
    - Set status to IN_PROGRESS
12. Create dependency graph:
    - Generate visual representation of task dependencies
    - Identify critical path through tasks
    - Flag parallel execution opportunities
13. Complete acceptance_criteria workflow phase:
    - Define clear completion criteria for story
    - Update story.yaml with acceptance criteria
    - Transition workflow_phase to "git_operations"
14. Display planning summary:
    "✅ Story [STORY-ID] planned successfully"
    "📋 Created [X] tasks with [Y] hours estimated"
    "🔗 Dependencies: [X] blocking, [Y] parallel"
    "🔄 Workflow: Outer workflow - git_operations phase ready"
    "🎯 Ready for task execution"
15. Store planning insights in memory for future use

## Error Handling
- Invalid story ID format: "Error: Story ID must be in format STORY-XXX"
- Story not found: "Error: Story [STORY-ID] not found"
- Story already planned: "Warning: Story already has tasks, use --replan to regenerate"
- Story archived: "Error: Cannot plan archived story [STORY-ID]"
- Memory search failed: "Warning: Memory search failed, proceeding without patterns"
- Work type detection failed: "Warning: Could not detect work type, using default task breakdown"
- Validation failed: "Error: Task assignment validation failed: [specific issue]"
- File creation failed: "Error: Could not create task files: [specific error]"

## Task Generation Patterns
```
Standard Task Sequence:
1. TASK-001: Knowledge Loading (search memory, load context)
2. TASK-002: Research (investigate requirements, dependencies)
3. TASK-003: Implementation (core development work)
4. TASK-004: Peer Review (domain expert review)
5. TASK-005: Documentation (update docs, comments)
6. TASK-006: Testing (unit, integration, e2e tests)
7. TASK-007: Git Operations (commit, push, merge)
8. TASK-008: Knowledge Creation (capture learnings)
```

## Command Chaining
- If --execute flag present, immediately start task execution
- If --chain flag present, output task list for delegation
- Planning triggers PM task delegation workflow