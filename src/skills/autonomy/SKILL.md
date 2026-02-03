---
name: autonomy
description: Apply autonomy level settings to work execution. Use when checking autonomy level (L1/L2/L3), determining work detection patterns, or applying autonomy-specific behaviors to AgentTask execution.
---

# Autonomy Skill

Apply autonomy level settings to work execution patterns.

## Autonomy Levels

### L1 - Guided Mode
- Explicit confirmation required before actions
- Step-by-step approval workflow
- Maximum user oversight

### L2 - Balanced Mode (Default)
- Work detection triggers AgentTask creation
- User approval for significant changes
- Automatic handling of routine tasks

### L3 - Autonomous Mode
- Maximum parallel execution
- Automatic continuation on success
- Minimal intervention required
- Auto-discovery of related work

## Work Detection Patterns

**Work Triggers** (create AgentTask):
- Action verbs: implement, fix, create, deploy, update, refactor
- @Role work patterns: "@Developer implement X"
- Continuation patterns: testing after implementation

**Information Patterns** (direct response):
- Questions: what, how, why, status, explain
- Consultation: "@PM what story next?"
- Research: exploring codebase, reading docs

## L3 Settings

When operating in L3 mode:
```json
{
  "max_parallel": 5,
  "auto_discover": true,
  "continue_on_error": true
}
```

- **max_parallel**: Maximum concurrent AgentTasks
- **auto_discover**: Find related work automatically
- **continue_on_error**: Don't stop on single failure

## PM Role Enforcement

**PM always active** setting determines:
- Whether PM is automatically activated on work detection
- Coordination layer for all technical work
- Story breakdown and task assignment flow

## Scope Blocking

Main scope is limited when `strict_main_scope` is enabled:
- Main agent coordinates only
- Technical work delegated via Task tool
- Prevents implementation in main context

## Configuration

Check current autonomy with `/icc-get-setting autonomy.level`

Set autonomy via `/icc-init-system [L1|L2|L3]`
