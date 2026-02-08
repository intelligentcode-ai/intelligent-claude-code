# Execution Flow (v10.2)

This is the simplest way to think about ICC day-to-day.

## Typical Execution Pattern

```text
USER REQUEST
  |
  v
MAIN AGENT (coordination)
  - chooses relevant skills (best-practices, process, reviewer, etc.)
  - breaks large work into .agent/queue items (work-queue / PM)
  |
  v
ROLE EXECUTION (specialists)
  - Developer implements
  - Reviewer audits and fixes issues
  - DevOps-Engineer handles release mechanics (when requested)
  |
  v
QUALITY GATES
  - tests pass
  - reviewer finds 0 blocking issues
  - suggest implements safe improvements (optional)
  |
  v
PR PHASE (dev-first)
  - PR targets dev (default)
  - Reviewer posts ICC-REVIEW-RECEIPT for the PR's current commit SHA
  - merge only after receipt + approval (explicit or workflow.auto_merge)
  |
  v
RELEASE PHASE (only when requested)
  - dev -> main release PR
  - version bump + tag + GitHub release
  - sync main back into dev
```

## Key Rules

- `dev` is the integration branch. `main` is stable releases only.
- “Review required” is enforced by ICC via `ICC-REVIEW-RECEIPT` on the PR.
- GitHub approvals are optional by default (self-review-and-merge), but can be required via workflow config.

See:
- `docs/workflow-guide.md`
- `docs/configuration-guide.md`
