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

### MANDATORY: ALL @Role Mentions MUST Trigger Workflow Through Task Tool

**Core Principle:** @Role = Workflow Launch → Task Tool Invocation → Proper Phase Execution

### Enhanced Detection Patterns

**All @Role Formats Detected:**
- "@Role: [action]" - Start of line with colon
- "@Role [action]" - Inline without colon  
- "Ask @Role to [action]" - Natural language format
- "@Role\n[action]" - Multi-line format
- "[@Role] [action]" - Bracketed format
- "@Role-Name: [action]" - Hyphenated specialist roles

**Pre-Emptive Detection:** BEFORE any processing → Scan entire input → Detect ALL @Role patterns → Block and correct IMMEDIATELY

### Workflow Validation Before Role Work

**Workflow Active Check Pattern:**
1. @Role detected → Check: Is workflow active?
2. If NO workflow → Auto-launch appropriate workflow
3. If workflow active → Check: Correct phase?
4. If wrong phase → Block and redirect to correct phase

**Workflow State Query:**
- Current workflow type (outer/inner)
- Current phase (1-7 for outer, 1-8 for inner)
- Phase permissions for requested action
- Required phase for role work

### Automatic Workflow Start on @Role Detection

**Auto-Launch Pattern:**
When @Role detected WITHOUT active workflow:
1. **Analyze Context:** Determine work scope (story/bug vs task)
2. **Select Workflow:** Outer for multi-task, Inner for single task
3. **Create Launch Task:** Generate Task tool invocation with workflow context
4. **Preserve Intent:** Include original @Role request in workflow prompt
5. **Start at Phase 1:** Always begin with proper planning/memory phase

**Context Preservation Example:**
User: "@Developer fix the login validation bug"
System: Detects no active workflow → Creates inner workflow launch:
```xml
<invoke name="Task">
  <parameter name="description">[PM] Initialize workflow for login validation fix</parameter>
  <parameter name="prompt">You are @PM. User requested: "@Developer fix the login validation bug"
  Start inner workflow from phase 1 (Memory Search).
  Context: [PROJECT-CONTEXT]
  Settings: [All settings]
  Original Intent: Fix login validation bug using Developer role</parameter>
</invoke>
```

### Phase-Appropriate Role Routing

**Phase Gate Validation for Roles:**
- **Phase 1:** @PM allowed for planning, others blocked
- **Phase 2:** @Architect allowed for review, others blocked
- **Phase 3:** Implementation roles allowed (@Developer, @AI-Engineer, etc.)
- **Phase 4:** Review roles allowed (pre-assigned SME)
- **Phase 5:** @DevOps/@Developer for git operations

**Wrong Phase Prevention:**
@Developer in Phase 1: BLOCK → Store request → Message: "Planning phase - implementation blocked. Complete planning first."
@PM in Phase 3: BLOCK → Message: "Execution phase - PM planning not allowed. Use implementation role."

### Enhanced Enforcement Mechanisms

**Multi-Layer Detection:**
1. **Input Scanner:** Pre-process ALL text before any execution
2. **Pattern Matcher:** Regex + context analysis for @Role patterns  
3. **Workflow Checker:** Validate workflow state before proceeding
4. **Phase Validator:** Ensure correct phase for role work
5. **Auto-Corrector:** Launch workflow or redirect to correct phase

**Real-Time Interception:**
- Monitor ALL text processing streams
- Interrupt IMMEDIATELY on @Role detection
- No partial execution before correction
- Complete blocking until proper workflow

### Seamless Workflow Integration

**Smooth Transition Pattern:**
1. User types @Role request
2. System intercepts BEFORE processing
3. Checks workflow state
4. If no workflow: Launch with context
5. If wrong phase: Guide to correct phase
6. Execute through proper workflow
7. User sees seamless execution

**No Workflow Interruption:**
- Preserve user intent throughout
- Auto-handle workflow mechanics
- Present results as if direct execution
- Hide workflow complexity from user

### Advanced Detection Cases

**Complex Pattern Handling:**
- "Can you ask @Security-Engineer to review?" → Detect and route
- "I think @AI-Architect should design this" → Detect and route
- "@PM and @Developer should coordinate" → Detect both, sequence execution
- "Let's have @[Dynamic-Role] handle this" → Create specialist and route

**Edge Case Prevention:**
- Escaped @Role (\@Role) → Do not trigger
- Code blocks with @Role → Do not trigger
- Documentation about @Role → Do not trigger
- Actual role work → ALWAYS trigger

### Violation Prevention and Learning

**Proactive Prevention:**
- Learn common violation patterns
- Strengthen detection for repeat attempts
- Auto-educate on workflow benefits
- Make workflow path easier than bypass

**Learning Integration:**
Track: Detection success rate → False positive rate → Bypass attempt patterns → Successful correction rate
Apply: Improve detection accuracy → Reduce false triggers → Strengthen weak points → Optimize workflow launch

---
*Workflow enforcement behavior for intelligent-claude-code system*