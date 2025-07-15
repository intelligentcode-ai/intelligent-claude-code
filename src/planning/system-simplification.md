# System Simplification Plan

## Overview
Transform the intelligent-claude-code system to use correct terminology and lean architecture while maintaining all essential functionality.

## Core Principles

### 1. Correct Hierarchy
```
EPIC (PM/Architect/RE/User create)
  └── STORY/BUG (PM/Architect/RE/User create)
       └── TASK (PM assigns to specialists)
            └── SUBTASK (Specialist creates optionally)
```

### 2. Lean Architecture
- **Remove**: Complex behavioral enforcement modules
- **Keep**: Role definitions, basic guidance, tool usage
- **Add**: Proper templates and workflow definitions

### 3. Essential Components

#### Retained Components
1. **Roles and Specialists** (14 core + unlimited dynamic)
2. **Workflow Templates** (outer and inner with knowledge phases)
3. **Config-driven behavior** (embedded settings shape execution)
4. **Memory/Learning** (knowledge retrieval first, generation last)
5. **Scoring System** (integrated into task/story completion)
6. **Tool Integration** (Task tool, memory, Context7, etc.)

#### Removed Components
1. Complex behavioral enforcement patterns
2. Penalty monitoring systems
3. Verbose command chains
4. Redundant coordination modules
5. Over-engineered compliance systems

## Simplified File Structure
```
/epics/
  └── EPIC-XXX-name/
      ├── epic.yaml
      └── stories/
          ├── STORY-XXX-name/
          │   ├── story.yaml
          │   └── tasks/
          │       └── TASK-XXX-name/
          │           └── task.yaml
          └── BUG-XXX-name/
              ├── bug.yaml
              └── tasks/

/templates/
  ├── epic-template.yaml
  ├── story-assignment-template.yaml
  ├── bug-assignment-template.yaml
  └── task-assignment-template.yaml

/workflow-templates/
  ├── outer-workflow.yaml  # Epic→Story→Task planning
  └── inner-workflow.yaml  # Task execution

/src/
  ├── config.md           # System configuration
  ├── roles/              # Role definitions
  │   └── specialists.md  # Dynamic specialist patterns
  └── planning/           # Simplified planning system
      ├── commands.md     # Corrected commands
      └── workflow.md     # Lean workflow executor
```

## Simplified Workflow

### Story Creation Flow
```
1. PM/Architect/RE/User creates STORY
2. System reads config.md during PLAN phase
3. PM breaks story into TASKS:
   - Knowledge loading/research
   - Implementation
   - Peer review
   - Testing
   - Documentation
   - Deployment
   - Knowledge creation
4. PM assigns tasks to specialists
5. Tasks execute in parallel where possible
```

### Task Execution Flow
```
1. Specialist receives task assignment
2. Knowledge retrieval (first step)
3. Optional: Create subtasks if complex
4. Execute work
5. Validation and review
6. Knowledge generation (last step)
7. Update scores
```

## Minimal Behavioral Guidance

### For PM Role
- Create stories and bugs, not individual tasks
- Break stories into diverse task types
- Ensure knowledge tasks at start and end
- Monitor story progress, not micromanage

### For Specialists
- Execute assigned tasks with expertise
- Create subtasks only if needed
- Always start with knowledge retrieval
- Always end with knowledge generation
- Update progress transparently

### For System
- Read config during planning
- Embed all settings in assignments
- Let workflow structure drive behavior
- Track scores automatically
- Facilitate learning capture

## Configuration Impact

Key settings that shape behavior:
- `blocking_enabled`: Reviews create tasks or block
- `git_privacy`: Sanitize commits automatically
- `testing_approach`: Determines test task depth
- `security_validation`: Adds security tasks
- `peer_review`: Makes review tasks mandatory

## Scoring Simplification

### Task-Level Scoring
Automatic based on task type completion:
- Research/Knowledge: +0.5P, +0.5Q
- Implementation: +1.0P, +1.0Q
- Review: +0.5P, +1.0Q
- Testing: +0.5P, +1.5Q
- Documentation: +0.5P, +0.5Q
- Knowledge Creation: +1.0P, +1.0Q

### Story-Level Bonuses
- All tasks complete on time: +2.0P
- Quality criteria met: +2.0Q
- Exceptional learning capture: +1.0P/Q

## Migration Path

### Phase 1: Terminology Correction (1 hour)
1. Update all templates
2. Correct workflow definitions
3. Fix command descriptions
4. Update examples

### Phase 2: Structure Migration (2 hours)
1. Reorganize existing work
2. Create proper epic structure
3. Move "tasks" to story level
4. Rename "subtasks" to tasks

### Phase 3: Behavioral Simplification (3 hours)
1. Remove complex enforcement modules
2. Create lean workflow executor
3. Simplify role guidance
4. Reduce context by 80%

### Phase 4: Validation (1 hour)
1. Test complete workflow
2. Verify scoring works
3. Confirm learning capture
4. Measure context reduction

## Success Metrics
- Context reduced by 80%
- Correct terminology throughout
- Natural workflow execution
- Automatic scoring and learning
- No complex behavioral prompts
- Clear role responsibilities