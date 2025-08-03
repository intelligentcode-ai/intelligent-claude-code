# PRB Enforcement

**MANDATORY:** MUST use PRB system for all work. Auto-correct violations.

**PURPOSE:** Enforce PRB-based execution and prevent legacy workflow usage

## Imports
@./shared-patterns/template-loading.md

## Detection Patterns

### @Role Detection
**All Formats:** "@Role:", "@Role", "Ask @Role", "@Role\n", "[@Role]", "@Role-Name"
**Action:** Generate appropriate PRB → Block direct execution

### Work Item Detection  
**Patterns:** TASK-XXX, STORY-XXX, BUG-XXX, EPIC-XXX, PRB-XXX mentions
**Action:** Convert to PRB if not already → Execute PRB directly
**Context:** Preserve user intent in PRB generation

### PRB Validation
**Check:** Work has PRB? Correct template? Complexity accurate?
**Block:** Direct execution without PRB → Auto-generate PRB first

## PRB Enforcement

### Template Selection
**Automatic:** Complexity analysis determines template
**Override:** Allowed with justification
**Learning:** System improves selection accuracy

### Auto-Correction Patterns
**Missing PRB:** STOP → Analyze complexity → Generate PRB → Execute
**Wrong Template:** STOP → Re-analyze → Generate correct PRB
**Direct Execution:** STOP → Create PRB → Execute through PRB
**Legacy Workflow:** STOP → Convert to PRB → Direct execution

## Execution Enforcement

### PRB Launch Pattern
**Detection:** Work requirement → Complexity analysis → PRB generation → Direct execution
**No Workflows:** PRBs execute directly without Inner Workflow phases
**Complete Context:** Each PRB contains everything needed

### Context Preservation
**User Intent:** Include original request in PRB
**Settings:** All configuration passed to PRB
**Memory:** Pre-searched patterns included
**Validation:** Success criteria embedded

## Multi-Layer Detection
1. **Input Scanner:** Pre-process ALL text before execution
2. **Pattern Matcher:** Detect @Role and work patterns
3. **PRB Checker:** Validate PRB exists for work
4. **Template Validator:** Ensure correct complexity template
5. **Auto-Generator:** Create PRB if missing

## Real-Time Interception
**Monitor:** ALL execution attempts
**Interrupt:** IMMEDIATELY on non-PRB execution
**Block:** No direct work without PRB
**Correct:** Generate appropriate PRB

## Advanced Patterns

### Complex Detection Cases
**Natural Language:** "Can you ask @Security-Engineer to review?"
**Multiple Roles:** "@PM and @Developer should coordinate"  
**Dynamic Roles:** "Let's have @[Dynamic-Role] handle this"
**Work Items:** "Fix TASK-123" or "Implement STORY-456"

### Edge Case Prevention  
**Escaped Patterns:** \@Role → Do not trigger
**Code Blocks:** @Role in code → Do not trigger
**Documentation:** About @Role → Do not trigger  
**Actual Work:** @Role for work → ALWAYS generate PRB

### L3 Autonomous Behavior
**Detection:** Work attempt → Auto-generate PRB
**Learning:** Track patterns → Improve template selection
**Prevention:** Make PRB path easier than bypass attempts

## Completion Validation

### False Completion Detection
**MONITOR:** All completion claims ("PRB COMPLETE", "Task finished", "Work done")
**VALIDATE:** Against mandatory completion checklist from prb-execution.md
**BLOCK:** Any completion claim without full validation

### Completion Enforcement
**REQUIRED CHECKLIST:**
- [ ] All functional requirements met
- [ ] All processual requirements met  
- [ ] Reviews completed and passed
- [ ] Success criteria validated
- [ ] Knowledge captured in memory/
- [ ] Git operations executed (commit AND push)
- [ ] PRB moved to completed/

**NO SHORTCUTS:** Cannot skip any checklist item, even for "simple" work

### Completion State Tracking
**STATES:** INITIALIZED → IN_PROGRESS → PENDING_REVIEW → PENDING_VALIDATION → PENDING_KNOWLEDGE → PENDING_GIT → COMPLETE
**VALIDATION:** Each state transition requires evidence of completion
**BLOCKING:** Cannot claim completion without reaching COMPLETE state

## Integration Points

### With PRB Execution
**Import:** @./prb-execution.md for completion checklist enforcement
**Validate:** All completion claims against mandatory checklist
**Block:** False completion attempts immediately

### With Learning System
**Track:** PRB generation patterns → Template accuracy → Execution success → Completion enforcement
**Apply:** Improve detection → Optimize template selection → Reduce overrides → Prevent false completions

### With Autonomy Levels  
**L1:** User approval for PRB generation
**L2:** Architect approval for Large/Mega PRBs
**L3:** Autonomous PRB generation and execution with mandatory completion validation

### With PRB Templates
**Reference:** Use template hierarchy (see shared-patterns/template-loading.md)
**Loading:** Project → .claude → ~/.claude hierarchy
**Nano/Tiny:** Direct execution, minimal overhead, full completion validation
**Medium:** Replaces Inner Workflow completely, enforces completion checklist
**Large/Mega:** Orchestrates sub-PRBs, validates all sub-PRB completions

---
*PRB enforcement behavior for intelligent-claude-code system*