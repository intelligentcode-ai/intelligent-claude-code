# Workflow Enforcement Behavior

**MANDATORY:** MUST follow workflow phases. Auto-correct violations.

**PURPOSE:** Enforce proper workflow execution and phase transitions

## Phase Enforcement Rules

### Pre-Action Validation
**BEFORE ANY ACTION:** Check current workflow phase → Validate action allowed in phase → Block if wrong phase → AUTO-CORRECT in L3 mode

### Phase Gates
**Phase 1 (Planning):** ONLY memory search and planning allowed → Block implementation attempts → Auto-redirect to planning
**Phase 2 (Validation):** ONLY architect review allowed → Block execution before approval → Auto-request review
**Phase 3 (Execution):** Implementation allowed AFTER validation → Block if no approval → Auto-check approval status
**Phase 4 (Review):** ONLY peer review allowed → Block new work → Auto-trigger review
**Phase 5 (Completion):** ONLY git operations allowed → Block new changes → Auto-commit work

## Auto-Correction Patterns

### Wrong Phase Detection
**Implementation in Planning:** STOP → Store attempted work → Return to planning → Apply after validation
**Execution without Approval:** STOP → Request architect review → Wait for approval → Resume execution
**Changes during Review:** STOP → Complete review first → Create follow-up task → Continue after review

### L3 Autonomous Correction
**Detection:** Action attempted in wrong phase
**Correction:** Auto-redirect to correct phase → Complete required steps → Return to intended action → Continue execution

## Phase Transition Rules

### Forward Transitions
**Planning → Validation:** Auto-trigger after plan complete
**Validation → Execution:** Require explicit approval
**Execution → Review:** Auto-trigger on completion
**Review → Completion:** Auto-proceed if approved

### Backward Transitions  
**Review → Execution:** If changes needed
**Execution → Validation:** If approach questioned
**Any → Planning:** If fundamental issue found

## Enforcement Mechanisms

### Phase Locks
**Lock Pattern:** Current phase determines allowed actions → All other actions blocked → Violations auto-corrected

### State Persistence
**Save State:** Phase transitions save state → Interruptions preserve phase → Resume from saved phase

### Violation Tracking
**Track Pattern:** Log phase violations → Identify repeat patterns → Strengthen enforcement → Report to learning system

## Integration Points

### With Workflow Templates
**Outer Workflow:** Enforce story-level phases
**Inner Workflow:** Enforce task-level phases
**Phase Sync:** Maintain phase consistency

### With Learning System
**Capture Violations:** Phase skip attempts → Wrong action patterns → Correction success rates
**Apply Learnings:** Previous violations → Successful patterns → Optimization opportunities

### With Autonomy Levels
**L1:** Strict enforcement, user approval for corrections
**L2:** Enforcement with architect approval for corrections  
**L3:** Auto-enforcement with autonomous corrections

## Critical Enforcement Points

### MUST Block
- Implementation before planning
- Execution without validation
- Changes during review phase
- New work in completion phase

### MUST Auto-Correct
- Phase skip attempts
- Out-of-order execution
- Missing validations
- Incomplete transitions

### MUST Track
- All violations
- Correction patterns
- Success rates
- Learning opportunities

## Role Mention Detection and Auto-Correction

### MANDATORY: ALL @Role Mentions MUST Trigger Task Tool

**Detection Pattern:** When @Role: appears at start of line or inline
**Auto-Correction:** Replace with Task tool XML invocation
**Enforcement:** Block direct role execution, enforce Task tool usage

### Auto-Correction Behavior

**When Detected:** "@PM: Plan STORY-XXX implementation"
**Auto-Replace:** Convert to Task tool XML with proper role and prompt parameters

**When Detected:** "@AI-Engineer: Implement the behavioral system"  
**Auto-Replace:** Convert to Task tool XML with proper role and prompt parameters

### Enforcement Mechanisms

**Pre-Processing:** Scan ALL input for @Role patterns → Block direct execution → Auto-convert to Task tool → Log violation for learning

**Runtime Detection:** Monitor execution for role mentions → Interrupt if @Role detected → Replace with Task invocation → Continue with corrected flow

**Multi-Line Detection:** Check for continuation patterns → Convert entire role block to single Task

### Blocking Direct Role Execution

**BLOCK ALL:**
- Direct @Role invocations without Task tool
- Manual role switching via @Role syntax
- Inline role mentions attempting execution
- Any circumvention attempts

**ENFORCE:**
- ONLY Task tool can invoke roles
- ALL role work MUST go through Task tool
- NO exceptions, even for simple tasks
- Violations trigger immediate correction

### Violation Tracking

**Log Pattern:** Track direct role execution attempts
**Auto-Correction:** Replace with Task tool invocation
**Learning Capture:** Store pattern for future prevention

---
*Workflow enforcement behavior for intelligent-claude-code system*