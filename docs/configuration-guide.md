# Configuration Guide (v10)

## Hierarchy
1. Per-request overrides (when a tool provides request/task metadata)  
2. Project config: `./icc.config.json` or `./.claude/icc.config.json`  
3. User config: `~/.claude/icc.config.json`  
4. Defaults: `icc.config.default.json`

## Workflow Configuration (icc.workflow.json)

Workflow settings (version bump rules, PR requirements, release automation, auto-merge) live in a separate file:
`icc.workflow.json`.

**Workflow hierarchy (highest to lowest priority):**
1. Per-request overrides (when available)
2. Project workflow: `./icc.workflow.json` or `./.claude/icc.workflow.json`
3. User workflow: `~/.claude/icc.workflow.json`
4. Defaults: `icc.workflow.default.json`

### Enable Agent Auto-Merge (Standing Approval)

To allow the agent to merge PRs (agent-performed merge, no `gh pr merge --auto`) after a NO FINDINGS
`ICC-REVIEW-RECEIPT` is present and checks are green, set `auto_merge=true` for the desired task tiers:

```json
{
  "medium": { "auto_merge": true },
  "large":  { "auto_merge": true },
  "mega":   { "auto_merge": true }
}
```

Recommended: only auto-merge PRs targeting `dev`. Releases (`dev` -> `main`) remain explicit.

### Require GitHub-Style Approvals (Optional)

By default this repo uses **self-review-and-merge**:
- PR is required (branch protection), but GitHub required approvals may remain at 0.
- Review is required via `ICC-REVIEW-RECEIPT` as a skills-level merge gate.

If you want an additional, GitHub-native gate (at least 1 `APPROVED` review), set:

```json
{
  "medium": { "require_github_approval": true },
  "large":  { "require_github_approval": true },
  "mega":   { "require_github_approval": true }
}
```

Notes:
- GitHub forbids approving your own PR (server-side rule). For self-authored PRs, approvals require a second GitHub
  identity/bot if you want this gate to pass.

## Key Settings

### Git
- `git.privacy` (bool) — strip AI mentions from commits/PRs
- `git.privacy_patterns` (array)
- `git.branch_protection` (bool)
- `git.default_branch` (string)
- `git.require_pr_for_main` (bool)

### Paths
- `paths.story_path`, `paths.bug_path`, `paths.memory_path`
- `paths.docs_path`, `paths.summaries_path`

### Team
- `team.default_reviewer`
- `team.role_validation`

### Models
Model selection is **user‑controlled via Claude Code settings** (`.claude/settings.json` or `~/.claude/settings.json`) or `/model`.
