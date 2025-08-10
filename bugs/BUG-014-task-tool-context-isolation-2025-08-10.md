# BUG-014: Work Item Creation Must Not Use Task Tool

**Status:** IN_PROGRESS  
**Priority:** CRITICAL  
**Reported:** 2025-08-10  
**Reporter:** User  
**Category:** Process Violation  

## Summary
Stories, Bugs, EPICs, and PRBs are being created via Task tool subagents, which is WRONG. These work items require full context and should ONLY be created by the main agent with complete access to behavioral instructions, configuration, and templates.

## Description
When @PM or any role is invoked via Task tool to create PRBs or work items, the subagent:
1. Has NO access to behavioral instruction files
2. Cannot read CLAUDE.md or configuration
3. Doesn't know about placeholder replacement rules
4. Cannot access template system properly
5. Makes up values instead of using actual configuration

This results in:
- PRBs with unresolved placeholders like `[FROM_CONFIG]`
- Wrong branch strategies like "work on current branch"
- Missing git workflow steps
- Violation of behavioral mandates
- Complete failure of the PRB system

## Evidence
- STORY-004-PRB-008: Has `branch_strategy: "work on current branch (fix/BUG-006-ai-instruction-clarification)"`
- STORY-005-PRB-001: Same wrong branch strategy
- Both PRBs created by @PM via Task tool with no context
- Placeholders never replaced with actual values
- Git workflow steps missing or wrong

## Impact
- **CRITICAL**: Every PRB created via Task tool is defective
- **CRITICAL**: Violates core PRB principle of self-contained execution
- **CRITICAL**: Breaks git workflow and branch protection
- **CRITICAL**: Makes behavioral instructions useless for subagents
- **HIGH**: Causes direct commits to main
- **HIGH**: Bypasses entire PR review process

## Root Cause
Task tool creates isolated subagents that:
- Only receive a text prompt
- Have no access to project files
- Cannot read behavioral instructions
- Don't inherit configuration context
- Must guess or make up required values

## Current Behavior (WRONG)
1. Main agent invokes Task tool for @PM
2. @PM subagent gets minimal prompt
3. Subagent cannot access behavioral files or config
4. Subagent creates PRB with placeholders/wrong values
5. Execution fails or violates all processes

## Expected Behavior (CORRECT)
EITHER:
1. Task tool should provide full context to subagents
OR:
2. PRB creation should NEVER use Task tool (main agent only)

## Proposed Solution

### Option A: Fix Task Tool Context
- Task tool should include relevant behavioral files in prompt
- Task tool should pass configuration values
- Task tool should provide project context

### Option B: Restrict Task Tool Usage
- PRB creation MUST be done by main agent only
- Story breakdown MUST be done by main agent only  
- Task tool ONLY for executing complete PRBs
- Never use Task tool for context-requiring operations

### Option C: Context Injection Protocol
- Before Task tool invocation, gather required context
- Include behavioral instructions in prompt
- Pass configuration values explicitly
- Provide template replacement rules

## Acceptance Criteria
- [ ] PRBs created with ALL placeholders properly replaced
- [ ] Correct branch names (feature/STORY-XXX)
- [ ] Complete git workflow included
- [ ] No made-up or wrong values
- [ ] Behavioral instructions followed
- [ ] Configuration values respected

## Priority Justification
CRITICAL because this breaks the fundamental PRB system architecture. Every work item created through Task tool is defective, leading to process violations, wrong git operations, and complete failure of the behavioral instruction system. This affects EVERY aspect of the virtual team operation.