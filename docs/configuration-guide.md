# Configuration Guide (v9)

## Hierarchy
1. AgentTask overrides  
2. Project config: `./icc.config.json` or `./.claude/icc.config.json`  
3. User config: `~/.claude/icc.config.json`  
4. Defaults: built-in (no default file shipped)

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
