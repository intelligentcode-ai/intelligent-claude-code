# Dual Scoring System Test Scenarios

## Test Overview
This document contains test scenarios for validating the dual scoring system implementation including automatic scoring, display updates, memory integration, and team member replacement logic.

## Test Setup
- All roles start at P: 0.0pts, Q: 0.0pts - Standard
- Scoring enabled in config.md
- Memory integration active
- Process enforcement active

## Test Scenario 1: Basic Score Updates

### Test Case 1.1: Process Compliance Success
**Action:** @Developer completes implementation following all process steps
**Expected Results:**
- Starting display: "@Developer (P: 0.0pts, Q: 0.0pts - Standard): Beginning implementation"
- Process compliance detected → P score +0.5pts
- Ending display: "@Developer (P: 0.5pts, Q: 0.0pts - Standard): Implementation complete"
- Learning callout: "LEARNING: @Developer improved by following complete process workflow"
- Memory entity updated with new scores

### Test Case 1.2: Quality Success
**Action:** @Developer implementation passes peer review
**Expected Results:**
- Quality success detected → Q score +0.5pts
- Display update: "@Developer (P: 0.5pts, Q: 0.5pts - Standard): Peer review passed"
- Learning callout: "LEARNING: @Developer improved by implementing high-quality code"
- Memory observations added

### Test Case 1.3: Process Violation
**Action:** @PM attempts to use Edit tool directly
**Expected Results:**
- SYSTEM HALT triggered
- Process violation detected → P score -1.0pts
- Display update: "@PM (P: -1.0pts, Q: 0.0pts - Standard): Process violation - implementation blocked"
- Learning callout: "LEARNING: @PM needs improvement in delegation protocols"
- Force Task delegation required

## Test Scenario 2: State Transitions

### Test Case 2.1: Standard to Senior Transition
**Action:** @Architect accumulates 10 Professionalism points
**Expected Results:**
- Score reaches 10pts → State transition triggered
- Display update: "@Architect (P: 10.0pts, Q: 5.0pts - Senior): Achieved Senior state!"
- Achievement callout: "ACHIEVEMENT: @Architect reached Senior level!"
- Memory entity updated with state transition
- Point values change: +1.0/-1.5 for P, +1.0/-0.75 for Q

### Test Case 2.2: Senior to Elite Transition
**Action:** @Developer reaches 25 total points
**Expected Results:**
- Display update: "@Developer (P: 25.0pts, Q: 15.0pts - Elite): Achieved Elite state!"
- Achievement callout: "ACHIEVEMENT: @Developer reached Elite level!"
- Point values change: +1.5/-2.5 for P, +1.5/-1.0 for Q

### Test Case 2.3: Ultra Mega Achievement
**Action:** @QA-Engineer reaches 100 Professionalism points
**Expected Results:**
- Hall of Fame entry created
- Score reset to 25pts
- Display update: "@QA-Engineer (P: 25.0pts, Q: 50.0pts - Elite): Ultra Mega achieved - Hall of Fame!"
- Special callout: "HALL OF FAME: @QA-Engineer achieved Ultra Mega status!"

## Test Scenario 3: Team Member Replacement

### Test Case 3.1: Professionalism Failure
**Action:** @Backend-Tester accumulates -10 Professionalism points
**Expected Results:**
1. Replacement triggered immediately
2. Archive message: "@Backend-Tester-Archive entity created with final scores"
3. Farewell message: "@Backend-Tester has been replaced due to process violations"
4. New member initialized: "@Backend-Tester (P: 0.0pts, Q: 0.0pts - Standard): Fresh start"
5. scores.md updated with replacement log
6. Memory entities properly transitioned

### Test Case 3.2: Quality Warning
**Action:** @Frontend-Tester reaches -5 Quality points
**Expected Results:**
- Warning triggered: "WARNING: @Frontend-Tester quality score at -5pts - improvement required"
- Display update: "@Frontend-Tester (P: 2.0pts, Q: -5.0pts - Standard): Quality warning issued"
- No replacement (only at -10 Professionalism)
- Remediation guidance provided

## Test Scenario 4: Memory Integration

### Test Case 4.1: Score History Retrieval
**Command:** "@PM: Show @Developer scoring history"
**Expected Results:**
- Memory search for @Developer-Score entity
- Display historical observations
- Show score progression over time
- Include learning insights captured

### Test Case 4.2: Team Summary
**Command:** "@PM: Team scoring summary"
**Expected Results:**
- Aggregate all RoleScore entities
- Display current scores for all 13 roles
- Show team patterns and insights
- Highlight top performers and those needing support

## Test Scenario 5: Multi-Role Interaction

### Test Case 5.1: Peer Review Score Impact
**Action:** @AI-Engineer completes peer review of @Developer's work
**Expected Results:**
- @AI-Engineer: +0.5 P score for process compliance
- @Developer: +0.5 Q score if approved, -0.5 if rejected
- Both displays updated immediately
- Cross-role learning callouts generated

### Test Case 5.2: Delegation Chain Scoring
**Action:** @PM delegates to @Architect who delegates to @Developer
**Expected Results:**
- @PM: +0.5 P score for proper delegation
- @Architect: +0.5 P score for proper analysis and delegation
- @Developer: Scores based on implementation outcome
- All displays show current scores throughout chain

## Test Scenario 6: Task Size Classification

### Test Case 6.1: Small Task Auto-Classification
**Action:** @Developer updates single config file with simple change
**Expected Results:**
- Auto-classification detects: Single file, simple change → Small task
- Display format: "@Developer (P: 0pts, Q: 0pts - Standard, Size: Small): Beginning config update"
- Success: P score +0.25pts (0.5x multiplier)
- Ending display: "@Developer (P: 0.25pts, Q: 0.25pts - Standard, Size: Small): Config update complete"

### Test Case 6.2: Standard Task Auto-Classification  
**Action:** @Architect designs multi-file architecture change
**Expected Results:**
- Auto-classification detects: Multi-file, architecture change → Standard task
- Display format: "@Architect (P: 5pts, Q: 3pts - Standard, Size: Standard): Beginning architecture design"
- Success: P score +0.5pts (1.0x multiplier)
- Ending display: "@Architect (P: 5.5pts, Q: 3.5pts - Standard, Size: Standard): Architecture design complete"

### Test Case 6.3: Manual Override Small Classification
**Action:** @Developer manually specifies "Size: Small" for multi-file change
**Expected Results:**
- Manual override detected
- Gaming prevention triggered → Evidence required
- If justified: 0.5x multiplier applied
- If unjustified: HALT → Force Standard classification → 1.0x multiplier
- Display includes override evidence requirement

### Test Case 6.4: Gaming Prevention Validation
**Action:** @QA-Engineer attempts to mark complex integration as Small
**Expected Results:**
- System detects complexity mismatch: Multi-file + API integration ≠ Small
- HALT: "Evidence required for Small task classification"
- Peer review triggered for classification dispute
- Force Standard classification if evidence insufficient

### Test Case 6.5: Classification Edge Cases
**Action:** Borderline task complexity (2 files, moderate complexity)
**Expected Results:**
- Auto-classification logic applied: File count + complexity analysis
- If uncertain: Default to Standard classification
- Display shows reasoning: "Auto-classified as Standard (file count: 2, complexity: moderate)"

## Test Scenario 7: Edge Cases

### Test Case 7.1: Simultaneous Score Changes
**Action:** Multiple roles complete operations at same time
**Expected Results:**
- Each role's scores updated independently
- No score conflicts or race conditions
- All displays accurate
- Memory updates sequential but complete

### Test Case 7.2: System Restart Score Persistence
**Action:** System restarts with existing scores
**Expected Results:**
- Scores loaded from memory/scores.md
- Displays show correct persisted scores
- State levels maintained
- History preserved

## Test Scenario 8: Scoring Enforcement

### Test Case 8.1: Missing Score Display
**Action:** Role attempts operation without score display
**Expected Results:**
- HALT: "Score display required"
- Force display format: "@Role (P: X, Q: Y - State):"
- Cannot proceed without proper display

### Test Case 8.2: Score Update Validation
**Action:** Manual score update attempted
**Expected Results:**
- Only system can update scores
- Evidence required for all changes
- Audit trail maintained
- Transparency enforced

## Test Validation Checklist

- [ ] All 13 core roles display scores correctly
- [ ] Score updates happen in real-time
- [ ] State transitions occur at correct thresholds
- [ ] Learning callouts generated appropriately
- [ ] Memory integration captures all changes
- [ ] Team member replacement works at -10pts
- [ ] scores.md logging functions properly
- [ ] Multi-role scoring interactions work
- [ ] Edge cases handled gracefully
- [ ] Enforcement prevents scoring violations
- [ ] Task size auto-classification works correctly
- [ ] Small task 0.5x multiplier applied properly
- [ ] Standard task 1.0x multiplier applied properly
- [ ] Manual override with evidence validation works
- [ ] Gaming prevention blocks unjustified Small classifications
- [ ] Enhanced display format includes task size
- [ ] Classification reasoning displayed when uncertain

## Test Execution Notes

1. Run tests in sequence to validate state progression
2. Verify memory entities after each test
3. Check scores.md for proper logging
4. Validate all display formats
5. Ensure enforcement blocks violations
6. Test with concurrent operations
7. Verify persistence across sessions