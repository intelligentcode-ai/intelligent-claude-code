# Plan Bug

Generate task breakdown for bug fixing using $ARGUMENTS as bug ID.

## Behavioral Sequence
1. Parse $ARGUMENTS to extract bug ID (BUG-XXX format)
2. If bug ID missing, respond "Error: Bug ID required (format: BUG-XXX)"
3. Validate bug exists:
   - Locate bug file: `epics/*/bugs/[BUG-ID]/bug.yaml`
   - If not found, respond "Error: Bug [BUG-ID] not found"
   - Load bug.yaml and verify status is OPEN
4. Search memory for similar bug patterns:
   - Execute `icc-memory-search "[bug.title] [bug.severity] bug fix"`
   - Look for TaskLearning entities with similar bug types
   - Find Success-Pattern entities for bug resolution
   - Display: "📚 Found X similar bug resolution patterns"
5. Perform root cause analysis:
   - Analyze bug symptoms and reproducibility
   - Identify potential root causes based on:
     * Steps to reproduce
     * Expected vs actual behavior
     * Environment details
     * Similar bugs in memory
   - Categorize likely cause (logic error, integration issue, data problem, etc.)
6. Assess impact and scope:
   - Determine affected systems/components
   - Identify potential side effects of fixes
   - Estimate complexity based on root cause analysis
   - Calculate risk level for different fix approaches
7. Detect work type for specialist assignment:
   - Execute `icc-detect-work-type "[bug description and analysis]"`
   - Identify required specialist (AI-Engineer, DevOps-Engineer, etc.)
   - Ensure >70% capability match for assignments
8. Generate comprehensive task breakdown:
   
   **Standard Bug Fix Tasks:**
   - TASK-001: [AI-Engineer] Knowledge Loading (search for similar fixes)
   - TASK-002: [AI-Engineer] Investigation (reproduce bug, analyze logs)
   - TASK-003: [AI-Engineer] Root Cause Analysis (identify exact problem)
   - TASK-004: [Developer] Fix Implementation (develop solution)
   - TASK-005: [AI-Architect] Peer Review (domain expert review)
   - TASK-006: [QA-Engineer] Regression Testing (ensure no side effects)
   - TASK-007: [QA-Engineer] Validation Testing (verify bug fixed)
   - TASK-008: [AI-Engineer] Documentation (update docs, add comments)
   - TASK-009: [Developer] Git Operations (commit fix, create PR)
   - TASK-010: [AI-Engineer] Knowledge Creation (capture learnings)

9. Apply validation rules for specialist assignments:
   - Require PM + Specialist Architect approval for all assignments
   - Ensure domain expertise for complex bugs
   - Security bugs → @Security-Engineer required
   - Infrastructure bugs → @DevOps-Engineer or @System-Engineer
   - AI/ML bugs → @AI-Engineer required
10. Create task files in bug directory:
    - Create `epics/[EPIC-ID]/bugs/[BUG-ID]/tasks/TASK-XXX.md` for each task
    - Include specific bug context in each task
    - Set appropriate dependencies and priorities
11. Prioritize tasks based on bug severity:
    - CRITICAL bugs → All tasks get "blocking" priority
    - HIGH bugs → Investigation and fix tasks get "critical_path"
    - MEDIUM/LOW bugs → Standard priority assignment
12. Update bug.yaml with task references:
    - Add task IDs to tasks array
    - Update estimated_hours (sum of task estimates)
    - Transition phase from DEFINING to INVESTIGATING
    - Set status to IN_PROGRESS
13. Create bug investigation plan:
    - Document reproduction steps
    - List investigation areas to explore
    - Identify required tools and access
    - Plan rollback strategy if fix causes issues
14. Display planning summary:
    "✅ Bug [BUG-ID] planned successfully"
    "🐛 Severity: [SEVERITY] (Priority: [PRIORITY])"
    "🔍 Root Cause Category: [category]"
    "📋 Created [X] tasks with [Y] hours estimated"
    "🎯 Ready for investigation phase"
15. Store bug resolution insights in memory for future use

## Error Handling
- Invalid bug ID format: "Error: Bug ID must be in format BUG-XXX"
- Bug not found: "Error: Bug [BUG-ID] not found"
- Bug already planned: "Warning: Bug already has tasks, use --replan to regenerate"
- Bug resolved: "Error: Cannot plan resolved bug [BUG-ID]"
- Memory search failed: "Warning: Memory search failed, proceeding without patterns"
- Work type detection failed: "Warning: Could not detect work type, using default assignments"
- Validation failed: "Error: Task assignment validation failed: [specific issue]"
- File creation failed: "Error: Could not create task files: [specific error]"

## Bug-Specific Task Templates

**Investigation Task Template:**
```markdown
# TASK-002: [AI-Engineer] Investigate [Bug Title]

**Bug**: [BUG-ID]
**Type**: investigation
**Priority**: [based on severity]

## Investigation Areas
- [ ] Reproduce bug in development environment
- [ ] Analyze logs for error patterns
- [ ] Check recent code changes in affected area
- [ ] Review similar bugs in memory system
- [ ] Test edge cases and boundary conditions

## Expected Outputs
- Root cause identification
- Reproduction steps confirmed
- Impact assessment
- Recommended fix approach
```

**Fix Implementation Template:**
```markdown
# TASK-004: [Developer] Implement Fix for [Bug Title]

**Bug**: [BUG-ID]
**Root Cause**: [identified cause]
**Fix Strategy**: [approach to take]

## Implementation Plan
- [ ] Implement core fix
- [ ] Add error handling
- [ ] Update related documentation
- [ ] Add logging for future debugging

## Validation
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing confirms fix
```

## Priority Assignment Logic
```
Bug Severity → Task Priority:
CRITICAL → blocking (all tasks)
HIGH → critical_path (investigation + fix)
MEDIUM → parallel (most tasks)
LOW → optional (documentation tasks)

Security Bugs → All tasks escalate to blocking
Customer-Reported → +1 priority level
Production Issues → +1 priority level
```

## Command Chaining
- If --execute flag present, immediately start investigation tasks
- If --assign flag present, delegate tasks to appropriate specialists
- Planning enables bug investigation and resolution workflow