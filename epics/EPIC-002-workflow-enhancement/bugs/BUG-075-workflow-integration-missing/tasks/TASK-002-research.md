# TASK-002: [AI-Engineer] Research Workflow Integration Patterns

## Overview
**Task ID:** TASK-002
**Title:** [AI-Engineer] Research Workflow Integration Patterns
**Status:** COMPLETED
**Assigned To:** @AI-Engineer
**Priority:** P1 (critical_path)
**Type:** research

## Description
Research how workflows should be integrated into behaviors and commands for proper execution patterns.

## Subtasks
1. **Analyze workflow phases**
   - Map outer workflow phases to behavioral triggers
   - Map inner workflow phases to task execution
   - Identify command integration points

2. **Design integration patterns**
   - How behaviors should reference workflows
   - How commands should follow workflow patterns
   - How to enforce task ordering

3. **Create behavioral mappings**
   - Map workflow hooks to behavioral actions
   - Define workflow-driven command sequences
   - Design enforcement mechanisms

## Acceptance Criteria
- [x] Integration patterns defined
- [x] Behavioral mappings created
- [x] Implementation approach clear

## Dependencies
- TASK-001 (context needed)

## Parallel Execution
- Subtasks can parallelize after initial analysis

## Output
- Integration pattern documentation
- Behavioral mapping guide
- Implementation blueprint

## Research Findings

### 1. Workflow Phase Mappings

#### Outer Workflow (Epic/Story/Bug Planning)
**Phase → Behavioral Trigger Mapping:**
- `knowledge_retrieval` → Should trigger when `icc-create-story` or `icc-create-bug` executes
- `epic_definition` → Maps to new command `icc-define-epic` (missing)
- `story_creation` → Current `icc-create-story` partially implements
- `task_decomposition` → Maps to `icc-plan-story` command (missing validation chain)
- `git_operations` → Should trigger in `icc-git-branch` command
- `acceptance_criteria` → Should be part of story/bug creation
- `knowledge_generation` → Should auto-trigger on phase completion

#### Inner Workflow (Task Execution)
**Phase → Behavioral Trigger Mapping:**
- `validation_gates.pre_execution` → Should block all task starts
- `knowledge_retrieval` → Should be first action in task execution
- `task_planning` → Maps to subtask creation behavior
- `task_execution` → Core work performed by specialist
- `task_validation` → Self-check before marking complete
- `peer_review` → Should trigger review assignment
- `git_operations` → Maps to `icc-git-commit` and push
- `task_completion` → Updates story progress
- `knowledge_generation` → Captures learnings

### 2. Integration Patterns

#### Pattern 1: Workflow Reference in Behaviors
**Current State:** Behaviors execute without workflow awareness
**Target State:** Behaviors should reference workflow phases

Example behavioral integration:
```
WHEN executing task:
  CHECK inner-workflow.validation_gates.pre_execution
  IF not validated: HALT with workflow requirement
  EXECUTE inner-workflow.phases.knowledge_retrieval
  CONTINUE through workflow phases sequentially
```

#### Pattern 2: Command-Workflow Alignment
**Current State:** Commands operate independently
**Target State:** Commands should follow workflow sequences

Command integration approach:
- Commands check current workflow phase
- Commands enforce phase prerequisites
- Commands trigger next workflow phase
- Commands update workflow progress

#### Pattern 3: Hook Integration
**Workflow Hooks → Behavioral Actions:**
- `pre_planning` → Memory search for similar work
- `post_story_creation` → Task generation trigger
- `pre_task_assignment` → Validation chain execution
- `pre_execution` → Role capability check
- `post_execution` → Learning capture

### 3. Behavioral Mappings

#### Command Mappings
**Missing Commands Needed:**
- `icc-define-epic` → Implements `epic_definition` phase
- `icc-plan-story` → Implements `task_decomposition` with validation
- `icc-execute-task` → Follows inner workflow phases
- `icc-complete-phase` → Transitions workflow phases

**Command Enhancement Required:**
- `icc-create-story` → Add workflow phase tracking
- `icc-create-bug` → Add workflow phase tracking
- `icc-git-operations` → Align with workflow git phases

#### Behavior Enhancements
**lean-workflow-executor.md:**
- Add workflow phase awareness to `execute_phase()`
- Integrate validation chains from workflows
- Map execution patterns to workflow phases

**role-assignment-validator.md:**
- Implement outer workflow validation chain
- Enforce mandatory requirements from workflows

**learning-team-automation.md:**
- Trigger on workflow `knowledge_generation` phases
- Store learnings per workflow phase

### 4. Implementation Blueprint

#### Phase 1: Add Workflow Awareness
1. Update lean-workflow-executor to load workflow templates
2. Add phase tracking to assignment files
3. Create workflow state management

#### Phase 2: Command Integration
1. Create missing workflow commands
2. Enhance existing commands with phase checks
3. Add workflow progress tracking

#### Phase 3: Behavioral Integration
1. Update behaviors to reference workflow phases
2. Implement hook triggers
3. Add validation chain enforcement

#### Phase 4: Validation & Testing
1. Ensure all phases execute in order
2. Verify hooks trigger correctly
3. Test validation chain blocking

### Key Integration Points

1. **Assignment Files** should include:
   - `workflow_phase: "current_phase_id"`
   - `workflow_template: "outer|inner"`
   - `phase_data: {phase-specific data}`

2. **Commands** should:
   - Check workflow phase before execution
   - Update phase after completion
   - Trigger hooks at phase boundaries

3. **Behaviors** should:
   - Load workflow template for context
   - Follow phase sequence strictly
   - Enforce validation requirements

4. **Validation Chains** must:
   - Execute before phase transitions
   - Block on validation failure
   - Log validation results

This research provides the foundation for proper workflow integration across the entire intelligent-claude-code system.