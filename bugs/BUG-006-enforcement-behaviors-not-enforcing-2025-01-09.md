# BUG-006: Behavioral Patterns Treated as Code Instead of AI Instructions

**Date Created:** 2025-01-09
**Severity:** CRITICAL
**Category:** System Understanding
**Status:** Open

## Problem Description

The system is fundamentally misunderstanding its own nature. This is a **MARKDOWN-BASED AI-AGENTIC SYSTEM** where behavioral patterns are INSTRUCTIONS for AI agents, not code to be executed. Yet PRBs and implementations keep trying to create "services", "commands", and "validation logic" as if this were a software project.

## Evidence of Failure

When creating the PRB for BUG-005 (naming format), the system proposed:
- `numbering-service-behavior.md` - Trying to create a "service" in markdown
- `file-renaming-command.md` - Trying to create executable commands
- "Validation logic" and "auto-correction mechanisms"

This is **NOT** a codebase! These are behavioral instructions for Claude Code to follow.

## Root Cause

1. **Scope confusion** - System thinks it's building software instead of writing AI instructions
2. **Pattern misunderstanding** - Behavioral patterns are treated as executable code
3. **Architectural overengineering** - Simple instructions become complex "services"
4. **Wrong mental model** - Acting like a software project instead of AI behavioral framework

## Impact

- PRBs propose "services" and "commands" instead of behavioral instructions
- Complex architectures for simple AI guidance tasks
- Confusion about what the system actually is
- Overengineered solutions to simple instruction updates
- Task tool subagents don't understand they're giving AI instructions, not building software

## Expected Behavior

The system should understand that:
1. **Behavioral patterns are AI INSTRUCTIONS**, not executable code
2. **Updates mean changing the instructions**, not building services
3. **"Enforcement" means clear instructions**, not validation logic
4. **Task tool subagents should write instructions**, not code

## Reproduction Steps

1. Look at any PRB for behavioral updates
2. Notice it proposes "services", "commands", "validation logic"
3. Observe the system trying to build software in markdown files
4. See the architectural complexity for simple instruction changes

## Suggested Fix

1. **Clarify system nature** - Make it clear this is AI INSTRUCTIONS, not code
2. **Simplify PRB templates** - Remove software development language
3. **Update behavioral patterns** - Focus on clear instructions, not "logic"
4. **Task tool context** - Ensure subagents know they're writing AI instructions

The system needs to understand it's writing instructions for AI agents to follow, not building executable software.

## Acceptance Criteria

- [ ] PRBs for behavioral updates focus on AI instructions only
- [ ] No more "services" or "commands" in markdown behaviors
- [ ] Templates reflect AI-agentic nature, not software development
- [ ] Task tool subagents understand they're writing instructions
- [ ] System treats behavioral patterns as AI guidance, not code