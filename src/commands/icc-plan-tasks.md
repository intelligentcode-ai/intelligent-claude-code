# Plan Tasks

Create individual task files using $ARGUMENTS as story/bug ID.

## Workflow Integration

This command creates tasks that follow the **Inner Workflow Template** phases from `workflow-templates/inner-workflow.yaml`:

1. **knowledge_retrieval** - Process tasks (001-009) for loading context
2. **task_planning** - Handled during task creation by this command
3. **task_execution** - Core implementation tasks (010-994)
4. **task_validation** - Built into each task's acceptance criteria
5. **peer_review** - Auto-generated review tasks for implementations
6. **git_operations** - Wrap-up task (997) for commits/pushes
7. **task_completion** - Wrap-up task (999) for verification
8. **knowledge_generation** - Wrap-up task (998) for learning capture

## Behavioral Sequence
1. Verify current role is Specialist-Architect:
   - Must be @AI-Architect, @System-Architect, @Security-Architect, etc.
   - If not specialist architect, respond "Error: Task planning requires Specialist-Architect role. Current: [current_role]"
2. Parse $ARGUMENTS to extract item ID (STORY-XXX or BUG-XXX format)
3. If item ID missing, respond "Error: Item ID required (format: STORY-XXX or BUG-XXX)"
4. Validate item exists and is ready for task planning:
   - Locate item file based on type
   - If not found, respond "Error: Item [ITEM-ID] not found"
   - Load item YAML and verify phase is PLANNING
   - Verify planning order exists (from icc-plan-order)
5. If item not ready:
   - Respond "Error: Item must be in PLANNING phase with planning order. Current: [phase]"
6. Load planning context:
   - Read planning order document
   - Review dependencies and constraints
   - Load similar patterns from memory
   - Apply specialist architect domain expertise
7. Generate comprehensive task breakdown using standardized numbering:
   
   **Process Tasks (001-009) - Inner Workflow Phase: knowledge_retrieval**
   - TASK-001: Knowledge Loading (search memory, load context)
   - TASK-002: Dependency Resolution (resolve external dependencies)
   - TASK-003: Environment Setup (prepare tools, access, etc.)
   
   **Core Work Tasks (010-994) - Inner Workflow Phase: task_execution**
   - TASK-010: Analysis/Investigation (understand requirements)
   - TASK-020: Design/Architecture (create technical design)
   - TASK-030: Implementation (core development work)
   - TASK-040: Integration (connect with existing systems)
   - TASK-050: Configuration (setup and configuration)
   - TASK-060: Additional implementation tasks as needed
   
   **Quality Assurance (Auto-generated) - Inner Workflow Phase: peer_review**
   - TASK-[X+1]: Peer Review (for each implementation task)
   - Domain expert review by appropriate specialist
   
   **Wrap-up Tasks (995-999) - Inner Workflow Phases: git_operations, knowledge_generation, task_completion**
   - TASK-995: Documentation (update docs, comments)
   - TASK-996: Testing Validation (verify all tests pass)
   - TASK-997: Git Operations (commit, push, PR) - Phase: git_operations
   - TASK-998: Knowledge Creation (capture learnings) - Phase: knowledge_generation
   - TASK-999: Completion Verification (validate done) - Phase: task_completion

8. Apply domain-specific task patterns:
   
   **AI/ML Work:**
   - Data preparation and validation tasks
   - Model training and optimization tasks
   - Behavioral pattern implementation
   - AI system integration tasks
   
   **Infrastructure Work:**
   - Environment provisioning tasks
   - Deployment pipeline setup
   - Monitoring and logging configuration
   - Security and compliance validation
   
   **Frontend Work:**
   - Component design and implementation
   - User experience validation
   - Cross-browser testing
   - Accessibility compliance

9. Validate specialist assignments for each task:
   - Execute `icc-validate-work-type` for each task
   - Ensure >70% capability match for all assignments
   - Create dynamic specialists if needed
   - Require domain expertise for complex tasks
10. Auto-create review tasks for implementation work:
    - For every implementation task (TASK-030, TASK-040, etc.)
    - Create corresponding review task by domain expert
    - AI implementation → @AI-Engineer review
    - Infrastructure → @System-Engineer review
    - Security changes → @Security-Engineer review
11. Create detailed task files in item directory:
    ```markdown
    # TASK-030: Implement [Feature Name]
    
    **Parent**: [STORY-ID or BUG-ID]
    **Type**: implementation
    **Assigned To**: @[SpecialistRole]
    **Priority**: [blocking|critical_path|parallel|optional]
    **Workflow Phase**: task_execution  # Maps to inner-workflow.yaml phase
    **Estimated Hours**: [X]
    **Dependencies**: [TASK-010, TASK-020]
    **Review Task**: TASK-031
    
    ## Description
    [Detailed implementation requirements based on design]
    
    ## Technical Approach
    [Specific technical approach from architect planning]
    
    ## Acceptance Criteria
    - [ ] [Specific criterion 1]
    - [ ] [Specific criterion 2]
    - [ ] Code follows team standards
    - [ ] Tests written and passing
    - [ ] Documentation updated
    
    ## Architecture Context
    [Relevant architecture decisions and constraints]
    
    ## Quality Requirements
    - Performance: [requirements]
    - Security: [requirements]
    - Maintainability: [requirements]
    
    ## Definition of Done
    - [ ] Implementation complete
    - [ ] Peer review approved
    - [ ] Tests passing
    - [ ] Documentation updated
    
    ## Workflow Integration
    This task follows the **task_execution** phase of the inner workflow:
    - Execute work following retrieved patterns
    - Apply specialist expertise
    - Track progress updates
    - Handle blockers appropriately
    
    ## Status
    - Status: PLANNED
    - Created: [current_date]
    - Created By: @[SpecialistArchitect]
    - Estimated: [X] hours
    ```
12. Set task dependencies and priorities:
    - Process tasks → blocking priority
    - Core implementation → critical_path priority
    - Reviews and wrap-up → parallel priority
    - Documentation → optional priority
13. Update parent item:
    - Add all task IDs to tasks array
    - Calculate total estimated hours
    - Transition phase from PLANNING to REFINING
    - Set task_planning_complete to true
14. Create task dependency graph:
    - Visual representation of task flow
    - Identify critical path
    - Mark parallel execution opportunities
15. Generate task summary:
    "✅ Task planning completed for [ITEM-ID]"
    "📋 Created [X] tasks ([Y] implementation, [Z] review, [A] process)"
    "⏱️ Total estimated: [X] hours"
    "🔗 Critical path: [X] tasks"
    "🎯 Phase: REFINING (ready for execution)"
16. Store task planning insights in memory
17. Update specialist architect scores (+2.0P for planning, +1.0Q for quality)

## Error Handling
- Not specialist architect: "Error: Task planning requires Specialist-Architect role"
- Invalid item ID: "Error: Item ID must be STORY-XXX or BUG-XXX format"
- Item not found: "Error: Item [ITEM-ID] not found"
- Wrong phase: "Error: Item must be in PLANNING phase. Current: [phase]"
- No planning order: "Error: Planning order required. Run icc-plan-order first."
- Task validation failed: "Error: Task assignment validation failed: [specific issue]"
- File creation failed: "Error: Could not create task files: [specific error]"
- Dependency cycle detected: "Error: Circular dependency detected in task plan"

## Standardized Task Numbering System

Each task number range maps to specific **Inner Workflow phases** from `workflow-templates/inner-workflow.yaml`:

**001-009: Process Tasks (Phase: knowledge_retrieval)**
- 001: Knowledge Loading - Search memory, load context
- 002: Dependency Resolution - Resolve external dependencies
- 003: Environment Setup - Prepare tools, access, environments
- 004-009: Additional process tasks - Further knowledge gathering

**010-994: Core Work Tasks (Phase: task_execution)**
- 010: Analysis/Investigation - Understand requirements deeply
- 020: Design/Architecture - Create technical design
- 030: Implementation (primary) - Core development work
- 031: Peer Review (for 030) - Phase: peer_review
- 040: Integration - Connect with existing systems
- 041: Peer Review (for 040) - Phase: peer_review
- 050-094: Additional work tasks - Further implementation
- 100-994: Extended work for complex items

**995-999: Wrap-up Tasks (Multiple phases)**
- 995: Documentation - Update docs, comments (Phase: task_execution)
- 996: Testing Validation - Verify all tests pass (Phase: task_validation)
- 997: Git Operations - Commit, push, PR (Phase: git_operations)
- 998: Knowledge Creation - Capture learnings (Phase: knowledge_generation)
- 999: Completion Verification - Validate done (Phase: task_completion)

## Domain-Specific Task Patterns

**AI/ML Tasks:**
- Data pipeline setup
- Model architecture design
- Training and validation
- Behavioral pattern implementation
- AI system integration

**Infrastructure Tasks:**
- Environment provisioning
- CI/CD pipeline setup
- Monitoring configuration
- Security hardening
- Performance optimization

**Frontend Tasks:**
- Component architecture
- UI implementation
- User experience testing
- Cross-browser validation
- Accessibility compliance

## Quality Assurance Integration

**Automatic Review Creation:**
- Every implementation task gets review task
- Reviews assigned to domain experts
- Review criteria based on task type
- Quality gates prevent completion without reviews

**Quality Requirements:**
- Performance benchmarks
- Security standards
- Maintainability metrics
- Test coverage requirements

## Command Chaining
- Task planning enables execution phase
- Tasks ready for PM delegation via Task tool
- Dependencies tracked for resolution monitoring
- Quality gates established for validation

## Workflow Phase Progression

Tasks created by this command follow the **Inner Workflow** phases in sequence:

1. **knowledge_retrieval** (001-009): Tasks start here to gather context and patterns
2. **task_planning**: Handled by this command during task creation
3. **task_execution** (010-994): Main work performed by specialists
4. **task_validation**: Built into acceptance criteria and definition of done
5. **peer_review** (031, 041, etc.): Auto-generated for each implementation task
6. **git_operations** (997): Commit and push completed work
7. **task_completion** (999): Final verification and status update
8. **knowledge_generation** (998): Capture and store learnings

### Phase Prerequisites
- Cannot execute tasks before knowledge retrieval
- Cannot commit before validation
- Cannot complete before knowledge generation
- Peer review required for implementation tasks

### Phase Enforcement
The workflow phase enforcer (`behaviors/workflow-phase-enforcer.md`) ensures:
- Tasks execute in correct phase order
- Prerequisites are met before phase transitions
- Blocked actions are explained with corrective guidance
- Progress tracking follows phase completion