# BUG-004: CRITICAL REGRESSION - PRB Execution Without Task Tool Subagents

**Status:** Open  
**Priority:** CRITICAL - REGRESSION  
**Reported:** 2025-01-09  
**Reporter:** User  

## Summary
System is executing PRBs directly instead of using Task tool to create subagents. This is a CRITICAL REGRESSION violating the fundamental PRB execution pattern that ALL PRBs MUST be executed via Task tool subagents.

## Description
The intelligent-claude-code system has regressed to directly executing PRBs instead of creating subagents via the Task tool. This violates the core architectural principle that EVERY PRB execution requires a Task tool invocation to create a specialized subagent.

### Critical Violations Observed
1. **Direct PRB execution attempted** - System tried to execute BUG-002 PRB directly
2. **No Task tool invocation** - Completely bypassed mandatory subagent creation
3. **Regression from established pattern** - System previously knew to use Task tool
4. **Violates PRB execution architecture** - Breaking fundamental system design

### Current Behavior (WRONG)
- System reads PRB
- System directly starts executing PRB steps
- No subagent creation
- No Task tool usage

### Expected Behavior (CORRECT)
```
1. System reads PRB
2. System invokes Task tool with subagent_type='general-purpose'
3. Subagent executes PRB with full context
4. Parent coordinates but doesn't execute
```

## Impact
- **CRITICAL**: Violates core architectural pattern
- **Regression**: System losing learned behaviors
- **Quality**: PRBs not executed with proper isolation
- **Coordination**: Parent mixing coordination with execution

## Root Cause Analysis
The system's behavioral patterns are not enforcing the mandatory Task tool usage for PRB execution. This is likely due to:
1. Missing enforcement in prb-execution.md
2. Insufficient validation in prb-enforcement.md
3. Pattern not being checked before execution
4. Memory of Task tool requirement not being accessed

## Reproduction Steps
1. Request execution of any PRB
2. Observe system attempts direct execution
3. No Task tool invocation occurs
4. Violation of architectural pattern

## Proposed Solution
1. **IMMEDIATE**: Add MANDATORY Task tool check in prb-execution.md
2. **ENFORCE**: Block ANY PRB execution without Task tool
3. **VALIDATE**: Check for Task tool invocation before PRB steps
4. **ERROR**: "❌ PRB execution REQUIRES Task tool subagent creation"
5. **MEMORY**: Store pattern with highest relevance

## Acceptance Criteria
- [ ] ALL PRB executions use Task tool
- [ ] Direct PRB execution is BLOCKED
- [ ] Clear error when Task tool not used
- [ ] Pattern stored in memory with highest relevance
- [ ] No regression possible in future
- [ ] Validation happens BEFORE execution

## Correct PRB Execution Pattern
```markdown
FOR EVERY PRB:
1. Read PRB to understand requirements
2. MANDATORY: Invoke Task tool
   - subagent_type: 'general-purpose'
   - description: Brief PRB description
   - prompt: Full PRB context and execution instructions
3. Subagent executes ALL PRB work
4. Parent only coordinates, NEVER executes
```

## Example of Correct Execution
```
User: Execute BUG-002
System: [Reads PRB]
System: [Invokes Task tool with PRB context]
Subagent: [Executes all PRB steps]
Parent: [Receives completion report]
```

## References
- Violated pattern: Task tool usage for ALL @Role mentions and PRB executions
- Related: prb-execution.md, prb-enforcement.md
- System architecture: Every PRB = New subagent