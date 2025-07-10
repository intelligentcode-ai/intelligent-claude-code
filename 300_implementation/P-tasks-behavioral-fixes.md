# P-Tasks: Behavioral Gap Resolution Plan

## Executive Summary
Collaborative planning session between @PM, @Architect, and @Requirements-Engineer to systematically resolve 16 identified behavioral gaps in the virtual team system, including real-time learning application.

## Prioritized Task List

### P0 Tasks (Critical - Core Infrastructure)

#### Task 0: Process Workflow Enforcement [P0]
- **Owner**: @AI-Engineer
- **Complexity**: High
- **Effort**: Standard
- **Impact**: Critical
- **Scope**: Extensive
- **Dependencies**: None (foundational)
- **Deliverable**: Automatic workflow enforcement
- **Acceptance Criteria**:
  - Config loads BEFORE any action (including PM activation)
  - PM auto-activates when pm_always_active=true
  - EVERY implementation triggers Review→Documentation→DoD
  - Correct SME auto-assigned for reviews
  - HARD BLOCK if process skipped
  - Role protocol enforced (right role for right task)
  - -1.0P penalty for violations
  - Self-violations trigger immediate task updates

#### Task 1: Runtime Execution Bridge [P0]
- **Owner**: @AI-Engineer
- **Complexity**: High
- **Effort**: Standard
- **Impact**: Critical
- **Scope**: Extensive
- **Dependencies**: None (root cause)
- **Deliverable**: Active runtime triggers in execution-engine.md
- **Acceptance Criteria**:
  - Config auto-loads on EVERY message
  - PM auto-activates when pm_always_active=true
  - L3 loop starts automatically when configured
  - Memory enforcement triggers on all actions

#### Task 2: Config Reading Protocol [P0]
- **Owner**: @AI-Engineer
- **Complexity**: Medium
- **Effort**: Small
- **Impact**: Critical
- **Scope**: Focused
- **Dependencies**: Task 1
- **Deliverable**: Automatic config loading enforcement
- **Acceptance Criteria**:
  - .claude/config.md loads before ANY action
  - -2.0P penalty auto-applied for violations
  - Evidence shown: "Loading: config.md"
  - Settings applied immediately

#### Task 3: L3 Autonomy Restoration [P0]
- **Owner**: @AI-Engineer
- **Complexity**: High
- **Effort**: Standard
- **Impact**: Critical
- **Scope**: Extensive
- **Dependencies**: Tasks 1, 2
- **Deliverable**: Continuous autonomous operation
- **Acceptance Criteria**:
  - Never stops for user input on technical tasks
  - Auto-continues through all workflows
  - Only 4 valid halt conditions enforced
  - Silent execution mode active

### P1 Tasks (High - Core Behaviors)

#### Task 4: Memory-First Enforcement [P1]
- **Owner**: @AI-Engineer
- **Complexity**: Medium
- **Effort**: Small
- **Impact**: Major
- **Scope**: Moderate
- **Dependencies**: Task 1
- **Deliverable**: Automatic memory consultation
- **Acceptance Criteria**:
  - Memory search before EVERY action
  - -1.0P penalty for violations
  - Search results displayed
  - New learnings stored automatically

#### Task 5: Scoring Auto-Update [P1]
- **Owner**: @AI-Engineer
- **Complexity**: Medium
- **Effort**: Standard
- **Impact**: Major
- **Scope**: Moderate
- **Dependencies**: Tasks 1, 4
- **Deliverable**: Real-time score tracking
- **Acceptance Criteria**:
  - Scores update after EVERY action
  - Memory entities created for scores
  - Learning callouts for significant changes
  - -10P triggers role replacement

#### Task 6: Sequential Thinking Activation [P1]
- **Owner**: @AI-Engineer
- **Complexity**: Medium
- **Effort**: Small
- **Impact**: Major
- **Scope**: Focused
- **Dependencies**: Task 1
- **Deliverable**: Auto-thinking for complex tasks
- **Acceptance Criteria**:
  - Triggers on tasks >3 steps
  - Mandatory for all role decisions
  - ULTRATHINKING for critical analysis
  - Evidence of thinking in responses

#### Task 7: Auto-Correction Loops [P1]
- **Owner**: @AI-Engineer
- **Complexity**: High
- **Effort**: Standard
- **Impact**: Major
- **Scope**: Extensive
- **Dependencies**: Tasks 1, 3
- **Deliverable**: Self-correcting workflows
- **Acceptance Criteria**:
  - Quality issues trigger auto-fix
  - Continues until 100% complete
  - No manual intervention needed
  - Learning captured from corrections

#### Task 8: Peer Review Enforcement [P1]
- **Owner**: @AI-Engineer
- **Complexity**: Medium
- **Effort**: Small
- **Impact**: Major
- **Scope**: Moderate
- **Dependencies**: Task 1
- **Deliverable**: Automatic reviewer assignment
- **Acceptance Criteria**:
  - Edit/Write/MultiEdit blocked without review
  - Correct SME auto-assigned
  - HARD BLOCK until review complete
  - Async review process works

### P2 Tasks (Medium - Specific Behaviors)

#### Task 9: PM Blocking Implementation [P2]
- **Owner**: @AI-Engineer
- **Complexity**: Low
- **Effort**: Trivial
- **Impact**: Minor
- **Scope**: Focused
- **Dependencies**: Task 8
- **Deliverable**: PM Edit/Write prevention
- **Acceptance Criteria**:
  - PM cannot use Edit/Write/MultiEdit
  - Auto-delegates to appropriate role
  - -1.0P penalty for attempts
  - Proper task creation instead

#### Task 10: Tool Fallback Logic [P2]
- **Owner**: @AI-Engineer
- **Complexity**: Medium
- **Effort**: Small
- **Impact**: Minor
- **Scope**: Moderate
- **Dependencies**: Task 1
- **Deliverable**: Cascading tool selection
- **Acceptance Criteria**:
  - Context7 → Brave → Built-in cascade
  - Automatic fallback on unavailability
  - No manual tool selection needed
  - Warnings for degraded capability

#### Task 11: Task Format Validation [P2]
- **Owner**: @AI-Engineer
- **Complexity**: Low
- **Effort**: Trivial
- **Impact**: Minor
- **Scope**: Focused
- **Dependencies**: Task 1
- **Deliverable**: Format enforcement
- **Acceptance Criteria**:
  - "@Role (P:X, Q:Y): task" enforced
  - -0.5P for missing format
  - Auto-correction adds format
  - TodoWrite includes role always

#### Task 12: Date Command Automation [P2]
- **Owner**: @AI-Engineer
- **Complexity**: Low
- **Effort**: Trivial
- **Impact**: Minor
- **Scope**: Focused
- **Dependencies**: Task 1
- **Deliverable**: Dynamic date generation
- **Acceptance Criteria**:
  - No hardcoded dates allowed
  - Auto-replaces with date commands
  - Uses proper format for context
  - Bash date command integration

#### Task 13: Role Replacement Protocol [P2]
- **Owner**: @AI-Engineer
- **Complexity**: Medium
- **Effort**: Small
- **Impact**: Minor
- **Scope**: Moderate
- **Dependencies**: Tasks 5, 4
- **Deliverable**: Automatic role replacement
- **Acceptance Criteria**:
  - Triggers at -10P exactly
  - Knowledge transfer automated
  - Team reflection captured
  - New role starts at 0.0P

#### Task 14: Real-Time Learning Application [P1]
- **Owner**: @AI-Engineer
- **Complexity**: Medium
- **Effort**: Standard
- **Impact**: Major
- **Scope**: Extensive
- **Dependencies**: Tasks 1, 4, 5
- **Deliverable**: Self-improvement incentive system
- **Acceptance Criteria**:
  - Process violations trigger immediate fix tasks
  - Discovered gaps auto-added to improvement plans
  - Self-identified issues rewarded with +1.0P
  - Learning application visible in real-time
  - Ultra-experienced behavior demonstrated

## Implementation Approach

### Phase 1: Core Infrastructure (P0 Tasks)
0. Process Workflow Enforcement - Foundational requirement
1. Runtime Execution Bridge - Makes everything else possible
2. Config Reading Protocol - Ensures settings load
3. L3 Autonomy Restoration - Enables continuous operation

### Phase 2: Core Behaviors (P1 Tasks)
4-8. Memory, Scoring, Thinking, Auto-correction, Reviews
14. Real-Time Learning Application - Ultra-experienced behavior

### Phase 3: Specific Behaviors (P2 Tasks)
9-13. PM blocking, Tool fallback, Format validation, Dates, Replacement

## Key Design Principles

1. **Active Not Passive**: All fixes must be runtime triggers, not documentation
2. **Automatic Activation**: No manual steps required
3. **Evidence-Based**: All behaviors must show evidence of execution
4. **Self-Correcting**: Problems trigger fixes, not stops
5. **Continuous Operation**: L3 autonomy means no unnecessary halts

## Success Validation

After implementation, ALL 16 gaps should be resolved:
- Thinking tools activate automatically
- Ultra-experienced expertise visible
- Memory consultation mandatory and enforced
- Retrospectives happen automatically
- P-tasks created systematically
- Research conducted before decisions
- Scoring/gamification executes visibly
- Anti-panic prevents crisis language
- All features tested and validated
- Process workflow enforcement automatic
- Config reading happens before all actions
- L3 autonomy continues without stops
- Real-time learning application visible
- Settings enforcement during execution

## Next Steps

1. @AI-Engineer begins Task 1 implementation
2. @PM tracks progress via TodoWrite
3. @QA-Engineer validates each implementation
4. Team retrospective after each phase

---
*Document created through PM + Architect + Requirements-Engineer collaboration*
*Demonstrating proper P-task creation and planning protocols*