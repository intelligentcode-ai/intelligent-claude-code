# Workflow Knowledge Retrieval for TASK-007

## Current Workflow Patterns

### Phase-Based Workflow Structure
The system uses a 5-phase workflow that drives all task execution:
1. **INIT** - Task creation and problem capture
2. **PLAN** - Config loading, role assignment, subtask definition  
3. **EXECUTE** - Actual implementation work
4. **ACCEPTANCE** - Validation and review
5. **DONE** - Completion and archival

### Key Discoveries

#### 1. Config-First Approach
- Config.md MUST be read during PLAN phase (not during execution)
- ALL settings are embedded into the assignment file
- Embedded config drives workflow behavior (no runtime lookups needed)

#### 2. Workflow as Enforcement
The assignment file structure itself enforces compliance through:
- `embedded_config` section containing all processed settings
- `workflow` section with conditional logic based on config
- No complex behavioral prompts needed - structure drives behavior

#### 3. Critical Config Settings That Drive Workflow

**blocking_enabled** determines review workflow:
- `false` (default): Review findings create follow-up tasks
- `true`: Review findings block execution until resolved

**git_privacy** determines commit handling:
- `true`: Sanitize AI mentions from commits
- `false`: Normal commit messages

#### 4. Subtask Structure
Each subtask contains:
- Unique ID and title
- Assigned role
- Status tracking (pending|in_progress|completed|blocked)
- Outcome options (continue_to, back_to, blocked_by)

#### 5. Knowledge Integration Points
Based on user feedback, workflows need:
- **Knowledge Retrieval** as FIRST step in both planning and execution
- **Knowledge Generation** as LAST step in both planning and execution
- Integration hooks for user-provided requirements (IaC, testing specs)

### Workflow Process Patterns

#### OUTER Workflow (Planning Process)
How epics, stories, and tasks are created:
1. Knowledge Retrieval - Search for similar past work
2. Requirements Analysis - Understand what needs to be built
3. Architecture Design - Define technical approach
4. Task Breakdown - Create atomic executable units
5. Knowledge Generation - Capture planning decisions

#### INNER Workflow (Execution Process)
How individual tasks are executed:
1. Knowledge Retrieval - Find relevant patterns/solutions
2. Implementation - Execute the actual work
3. Validation - Test and verify
4. Review - Peer review and feedback
5. Knowledge Generation - Capture learnings

### Integration Requirements
- Support for user-provided process customizations
- Hooks for IaC requirements injection
- Testing specification integration points
- Ability to override standard processes while maintaining structure

### Design Principles
1. **Simplicity** - Workflow structure is self-documenting
2. **Deterministic** - No ambiguity in what happens when
3. **Customizable** - Projects can adapt workflows to their needs
4. **Enforceable** - Structure itself prevents violations