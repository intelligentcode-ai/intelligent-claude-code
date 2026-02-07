---
name: autonomy
description: Activate when a subagent completes work and needs continuation check. Activate when a task finishes to determine next steps or when detecting work patterns in user messages. Governs automatic work continuation and queue management.
---

# Autonomy Skill

**Invoke automatically** after subagent completion or when deciding next actions.

## When to Invoke (Automatic)

| Trigger | Action |
|---------|--------|
| Subagent returns completed work | Check `.agent/queue/` for next item |
| Task finishes successfully | Update status, pick next pending item |
| Work pattern detected in user message | Add to work queue if L2/L3 |
| Multiple tasks identified | Queue all, parallelize if L3 |

## Autonomy Levels

### L1 - Guided
- Confirm before each action
- Wait for explicit user instruction
- No automatic continuation

### L2 - Balanced (Default)
- Add detected work to `.agent/queue/`
- Confirm significant changes
- Continue routine tasks automatically

### L3 - Autonomous
- Execute without confirmation
- **Continue to next queued item on completion**
- Discover and queue related work
- Maximum parallel execution

## Continuation Logic (L3)

After work completes:
```
1. Mark current item completed in .agent/queue/
2. Check: Are there pending items in queue?
3. Check: Did the work reveal new tasks?
4. If yes → Add to queue, execute next pending item
5. If no more work → Report completion to user
```

## Work Detection

**Triggers queue addition:**
- Action verbs: implement, fix, create, deploy, update, refactor
- @Role patterns: "@Developer implement X"
- Continuation: testing after implementation

**Direct response (no queue):**
- Questions: what, how, why, explain
- Status checks
- Simple lookups

## Queue Integration

Uses `.agent/queue/` for cross-platform work tracking:
- Claude Code: TodoWrite for display + queue for persistence
- Other agents: Queue files directly

See work-queue skill for queue management details.

## Configuration

Level stored in `autonomy.level` (L1/L2/L3)
