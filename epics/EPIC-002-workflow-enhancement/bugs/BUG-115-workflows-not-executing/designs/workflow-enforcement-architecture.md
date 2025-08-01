# Workflow Enforcement Architecture

**Created:** 2025-07-21  
**Author:** @AI-Architect  
**Purpose:** Architectural design for enforcing outer and inner workflow execution

## Executive Summary

This architecture transforms workflow execution from optional documentation to mandatory behavioral enforcement. The design uses a three-layer system: assignment-driven metadata, behavioral phase enforcement, and simplified executable steps.

## Problem Analysis

**Current State:** Workflows exist as complex XML documentation that gets bypassed
**Root Cause:** No enforcement mechanism between workflow definition and execution  
**Target State:** Behavioral enforcement that makes workflow execution automatic and unavoidable

## Architectural Design

### Layer 1: Assignment Metadata Layer

All work assignments (stories, bugs, tasks) contain workflow tracking metadata:

```yaml
# story.yaml example
workflow_type: "outer"          # outer or inner
workflow_phase: "planning"      # current phase
phase_start_time: "2025-07-21T10:00:00Z"
phase_completion_required: true
next_phase: "architect_triage"
```

**Enforcement Point:** Every behavioral action checks assignment metadata before execution

### Layer 2: Behavioral Enforcement Layer  

Phase enforcement through behavioral patterns that cannot be bypassed:

```markdown
# Phase Validation Pattern
BEFORE any action:
1. Load assignment file
2. Check current workflow_phase
3. Validate action is allowed in current phase
4. IF not allowed: Block with helpful guidance
5. IF allowed: Proceed with phase-aware execution
```

**Integration:** Imports into existing behavioral files (lean-workflow-executor.md)

### Layer 3: Simplified Execution Layer

Replace complex XML Task invocations with numbered AI-executable steps:

```markdown
## Outer Workflow - Simple Steps
1. @PM: Search memory for similar story patterns
2. @AI-Architect: Review and approve approach  
3. @PM: Create role-assigned tasks with 3+ subtasks
4. @AI-Engineer: Create feature branch
5. Execute parallel task execution (max 5)
6. User decision: Create merge request?
7. @PM: Capture story learnings
```

**Key Change:** Direct role addressing instead of XML complexity

## Enforcement Mechanisms

### 1. Phase Gate Enforcement

```pseudocode
FUNCTION enforcePhaseGate(action, assignment):
  current_phase = assignment.workflow_phase
  required_phase = getRequiredPhase(action)
  
  IF current_phase != required_phase:
    BLOCK action
    DISPLAY "Action '{action}' requires phase '{required_phase}'"
    DISPLAY "Current phase: '{current_phase}'"
    DISPLAY "Complete current phase first: {getPhaseActions(current_phase)}"
    RETURN false
  
  RETURN true
```

### 2. Auto-Correction System

Based on learning-team-automation patterns:

```markdown
First Workflow Violation:
- Warning issued
- Learning entity created
- Phase guidance provided
- No penalties applied

Second+ Violations:
- 2x task complexity penalty
- Forced workflow compliance
- Reference existing learning
- Auto-correct in L3 mode
```

### 3. Autonomous Correction (L3 Mode)

```markdown
L3 Workflow Enforcement:
- Detect workflow violations automatically
- Apply corrections without asking permission
- Continue execution with proper phase sequence
- Log corrections for future learning
```

## Integration Strategy

### Integration with lean-workflow-executor.md

```markdown
# lean-workflow-executor.md additions
@../enforcement/workflow-phase-enforcer.md
@../enforcement/simple-workflow-steps.md

## Pre-Action Validation
Before every action:
1. Load assignment workflow metadata
2. Validate current phase allows action
3. Block if phase mismatch with guidance
4. Proceed if validated
```

### Integration with Configuration System

```markdown
# Config integration points
autonomy_level: "L3" → Auto-correct workflow violations
blocking_enabled: true → Block invalid phase actions  
workflow_enforcement: true → Enable phase validation
```

### Integration with Role System

```markdown
# Role behavioral additions
Every @Role activation includes:
1. Check assignment workflow_phase
2. Execute phase-appropriate actions only
3. Update phase completion status
4. Auto-transition if L3 autonomous
```

## Simple Workflow Templates

### Outer Workflow Template
```markdown
1. @PM: Memory search + planning (phase: planning)
2. @AI-Architect: Approach approval (phase: architect_triage)  
3. @PM: Task creation with roles (phase: task_decomposition)
4. @AI-Engineer: Git branch setup (phase: git_setup)
5. Parallel task execution (phase: task_execution)
6. User: Merge request decision (phase: merge_decision)
7. @PM: Story retrospective (phase: retrospective)
```

### Inner Workflow Template  
```markdown
1. @Role: Memory search (phase: knowledge_retrieval)
2. @Role: Plan approach (phase: planning)  
3. @Role: Execute work (phase: execution)
4. @Specialist: Peer review (phase: peer_review)
5. @Role: Git operations (phase: git_operations)
6. @Role: Task completion (phase: completion)
7. @Role: Learning capture (phase: knowledge_generation)
```

## Auto-Correction Behaviors

### Workflow Skip Detection
```markdown
Detection Triggers:
- Assignment phase not updated after time threshold
- Actions executed without phase validation
- Role work done out of sequence
- Missing required workflow steps
```

### Correction Actions
```markdown
L1/L2 Mode:
- Block action with phase guidance
- Require manual phase transition  
- Warn about workflow compliance

L3 Mode:  
- Auto-correct phase sequence
- Execute missing workflow steps
- Update assignment metadata automatically
- Continue execution without interruption
```

### Learning Integration
```markdown
Workflow Violation Learning:
- Capture what was skipped and why
- Store correction patterns
- Track violation frequency
- Apply learnings for prevention
```

## Implementation Phases

### Phase 1: Assignment Metadata
- Add workflow fields to all YAML templates
- Update existing assignments with metadata
- Create assignment loading behaviors

### Phase 2: Behavioral Enforcement  
- Create phase validation behaviors
- Integrate with existing behavioral files
- Add blocking and guidance patterns

### Phase 3: Simple Workflow Steps
- Convert XML workflows to numbered steps
- Create simple execution templates  
- Remove XML complexity dependencies

### Phase 4: Auto-Correction System
- Implement violation detection
- Add correction behaviors
- Integrate with learning system

## Validation Strategy

### Enforcement Testing
```bash
# Test phase blocking
Execute action in wrong phase
Expect: Block with helpful guidance

# Test auto-correction  
Set L3 mode + skip workflow step
Expect: Automatic correction and continuation

# Test learning capture
Cause workflow violation twice
Expect: Learning entity + penalty application
```

### Integration Testing
```bash  
# Test assignment metadata
Load story.yaml
Expect: workflow_type and workflow_phase fields

# Test behavioral integration
Execute role action
Expect: Phase validation before execution

# Test simple workflow
Execute outer workflow
Expect: Numbered step sequence completion
```

## Success Metrics

### Workflow Compliance  
- 95%+ phase validation success rate
- Zero workflow steps skipped in L3 mode
- Reduction in workflow confusion issues

### Behavioral Integration
- All role actions phase-validated
- Assignment metadata consistently updated
- Auto-correction working in L3 mode

### Simplification Achievement
- XML workflows replaced with numbered steps
- Reduced workflow execution complexity
- Improved team workflow adoption

## Migration Strategy

### Backward Compatibility
- Existing workflows continue working
- Gradual enforcement rollout
- Optional enforcement initially

### Rollout Plan
1. Deploy assignment metadata updates
2. Enable phase validation warnings  
3. Activate enforcement blocking
4. Replace XML with simple steps
5. Full auto-correction deployment

## Risk Mitigation

### Technical Risks
- **Risk:** Behavioral enforcement too rigid
- **Mitigation:** Configurable enforcement levels

- **Risk:** Assignment metadata corruption  
- **Mitigation:** Metadata validation and defaults

### User Experience Risks
- **Risk:** Workflow enforcement frustrating users
- **Mitigation:** Helpful guidance and learning integration

- **Risk:** L3 auto-correction too aggressive
- **Mitigation:** Conservative correction boundaries and logging

## Conclusion

This architecture transforms workflows from optional documentation into mandatory behavioral enforcement. The three-layer design ensures workflows guide execution automatically while maintaining the system's behavioral approach. The simplified execution layer removes XML complexity while the behavioral enforcement layer ensures compliance.

The auto-correction system learns from violations and improves over time, making workflow compliance natural rather than forced. Integration with existing configuration and role systems ensures seamless adoption.

---
*Architectural design for workflow enforcement in intelligent-claude-code system*