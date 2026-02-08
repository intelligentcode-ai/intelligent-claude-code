# Skills and Roles Reference (v10.2)

ICC loads `SKILL.md` instructions on demand based on:
- explicit skill names (e.g. “use `reviewer`”)
- description matching (you ask for a review, it pulls `reviewer`)
- role prefixes (e.g. `PM: ...`, `Reviewer: ...`)

## Role Invocation (Recommended)

In most chat tools, `@...` is reserved for file mentions. ICC role invocation is just the role name as a prefix:

```text
PM: break down the story into work items
Architect: review the approach
Developer: implement the change
Reviewer: run a regression review
```

## Work Tracking (Cross-Platform)

Large work is tracked in `.agent/queue/` so it works across tools/editors:
- `001-pending-...`
- `002-in_progress-...`
- `003-completed-...`

See the `work-queue` skill for the exact format.

## Skills By Category

### Role Skills (14)
pm, architect, developer, system-engineer, devops-engineer,
database-engineer, security-engineer, ai-engineer, web-designer,
qa-engineer, backend-tester, requirements-engineer, user-tester, reviewer

### Command Skills (2)
- `icc-version`: show current ICC version / install status
- `icc-get-setting`: read config values from the config hierarchy

### Process Skills (15)
thinking, work-queue, process, best-practices, validate,
autonomy, parallel-execution, workflow, mcp-config,
story-breakdown, git-privacy, commit-pr, release, suggest, memory

### Enforcement Companion Skills (3)
file-placement, branch-protection, infrastructure-protection

### Meta (System) Skill
- `skill-creator`: guidance for creating new skills

## Configuration Files (Where Skills Read Settings)

- `icc.config.json`: behavior/enforcement configuration
- `icc.workflow.json`: workflow automation controls (auto-merge standing approval, optional GitHub approvals gate, release automation)

See `docs/configuration-guide.md` for the full hierarchy.
