# User Guide (v10.2)

This guide describes the current ICC usage model: **roles + skills + work queue + PR receipts**.

## Quick Start

1. Install: `make install` (or `.\install.ps1 install` on Windows).
2. Start with a role request:

```text
@PM break down this story
@Developer implement the next work item
@Reviewer review for regressions
```

## Work Queue

Large work is tracked in `.agent/queue/`:
- one markdown file per work item
- status is tracked by renaming files (`pending` -> `in_progress` -> `completed`)

See the `work-queue` skill for the exact format and naming rules.

## Memory (Local RAG)

The `memory` skill stores persistent knowledge in:

```text
.agent/memory/
  memory.db
  exports/
  archive/
```

You can use it directly:

```text
memory search: auto merge receipt
remember: default merge gate is ICC-REVIEW-RECEIPT for PR head SHA
```

Many workflows also call memory silently (process/reviewer/best-practices).

## PR Review Gate: ICC-REVIEW-RECEIPT

For merges, ICC uses a Skills-level gate:
- Stage 3 review runs in a temp checkout.
- Reviewer posts an `ICC-REVIEW-RECEIPT` comment tied to the PR head SHA.
- Findings must be 0 (`NO FINDINGS`) and result PASS.

See `docs/workflow-guide.md`.

## Configuration

Config is JSON-based:
- `icc.config.json`: behavior and enforcement
- `icc.workflow.json`: workflow automation toggles (auto-merge standing approval, optional GitHub approvals gate)

See `docs/configuration-guide.md`.
