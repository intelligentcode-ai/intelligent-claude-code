# Virtual Team Guide (v10.2)

ICC lets you use role skills as a lightweight "virtual team" in a single session.

## Core Idea

- You describe work in plain language.
- ICC routes the request to the right skill(s) and role(s).
- Work is tracked in `.agent/queue/`.

## How To Involve Roles

Use role prefixes:

```text
PM: break down this story into work items
Architect: review the design
Developer: implement the change
Reviewer: check for regressions
```

## The 14 Core Roles

Leadership and planning:
- `PM`: breakdown, sequencing, dependency management (does not implement)
- `Architect`: design, tradeoffs, consistency checks

Implementation and operations:
- `Developer`, `System-Engineer`, `DevOps-Engineer`, `Database-Engineer`

Quality and risk:
- `QA-Engineer`, `Backend-Tester`, `User-Role`, `Security-Engineer`, `Reviewer`

Product and UX:
- `Requirements-Engineer`, `Web-Designer`, `AI-Engineer`

## Dynamic Specialists

When a specific domain is needed, you can request it directly:

```text
React-Developer: implement the UI
Kubernetes-Engineer: review the deployment approach
Postgres-Engineer: tune this query plan
```

## Recommended Workflow

1. Start with `PM` to break work into `.agent/queue/` items (especially for medium+ tasks).
2. Implement with the appropriate role.
3. Run `Reviewer` (or the `reviewer` skill) before committing / opening a PR.
4. For PRs, require an `ICC-REVIEW-RECEIPT` as the review gate.

See `docs/workflow-guide.md` for details.
