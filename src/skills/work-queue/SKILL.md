---
name: work-queue
description: Use when breaking down large tasks into work items. Use when managing sequential or parallel work execution. Use when checking what work remains. Creates and manages .agent/queue/ for cross-platform work tracking.
---

# Work Queue Skill

Manage work items in `.agent/queue/` for cross-platform agent compatibility.

## When to Invoke (Automatic)

| Trigger | Action |
|---------|--------|
| Large task detected | Break down into work items |
| Work item completed | Check for next item |
| User asks "what's left?" | List remaining items |
| Multiple tasks identified | Queue for sequential/parallel execution |

## Directory Structure

```
.agent/
└── queue/
    ├── 001-pending-implement-auth.md
    ├── 002-pending-write-tests.md
    └── 003-completed-setup-db.md
```

## Setup (Automatic)

On first use, the skill ensures:

1. **Create directory**: `mkdir -p .agent/queue`
2. **Add to .gitignore** (if not present):
   ```
   # Agent work queue (local, not committed)
   .agent/
   ```

## Work Item Format

Each work item is a simple markdown file:

```markdown
# [Title]

**Status**: pending | in_progress | completed | blocked
**Priority**: high | medium | low
**Assignee**: @Developer | @Reviewer | etc.

## Description
What needs to be done.

## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Notes
Any relevant context.
```

## File Naming Convention

```
NNN-STATUS-short-description.md
```

Examples:
- `001-pending-implement-auth.md`
- `002-in_progress-write-tests.md`
- `003-completed-setup-database.md`

## Operations

### Add Work Item
```bash
# Create new work item
echo "# Implement authentication" > .agent/queue/001-pending-implement-auth.md
```

### Update Status
```bash
# Rename to reflect status change
mv .agent/queue/001-pending-implement-auth.md .agent/queue/001-in_progress-implement-auth.md
```

### List Pending Work
```bash
ls .agent/queue/*-pending-*.md 2>/dev/null
```

### List All Work
```bash
ls -la .agent/queue/
```

### Complete Work Item
```bash
mv .agent/queue/001-in_progress-implement-auth.md .agent/queue/001-completed-implement-auth.md
```

## Platform Behavior

| Platform | Primary Tracking | .agent/queue/ |
|----------|-----------------|---------------|
| Claude Code | TodoWrite (display) | Persistence |
| Gemini CLI | File-based | Primary |
| Codex CLI | File-based | Primary |
| Others | File-based | Primary |

## Workflow Integration

1. **PM breaks down story** → Creates work items in queue
2. **Agent picks next item** → Updates status to `in_progress`
3. **Work completes** → Updates status to `completed`
4. **Autonomy skill checks** → Continues to next pending item

## Queue Commands

**Check queue status:**
```
What work is in the queue?
Show pending work items
```

**Add to queue:**
```
Add "implement login" to work queue
Queue these tasks: auth, tests, deploy
```

**Process queue:**
```
Work through the queue
Execute next work item
```

## Integration

Works with:
- autonomy skill - Automatic continuation through queue
- process skill - Quality gates between items
- pm skill - Story breakdown into queue items
