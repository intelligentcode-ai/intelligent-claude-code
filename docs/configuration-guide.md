# Configuration Guide (v10)

## Hierarchy
1. AgentTask overrides  
2. Project config: `./icc.config.json` or `./.claude/icc.config.json`  
3. User config: `~/.claude/icc.config.json`  
4. Defaults: `icc.config.default.json`

## Workflow Configuration (icc.workflow.json)

Workflow settings (version bump rules, PR requirements, release automation, auto-merge) live in a separate file:
`icc.workflow.json`.

**Workflow hierarchy (highest to lowest priority):**
1. AgentTask overrides (`agentTask.workflow.*`)
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

### AgentTask
- `agenttask.template_path`
- `agenttask.template_validation`
- `agenttask.complexity_override`

### Models
Model selection is **user‑controlled via Claude Code settings** (`.claude/settings.json` or `~/.claude/settings.json`) or `/model`.
