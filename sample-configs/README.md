# Sample ICC Configurations

These configs are **examples only**. They are not loaded automatically; copy the file you want to use to `./icc.config.json` (or `~/.claude/icc.config.json`) before running `make install`.

Configs included (all prefixed `icc.config.*`)
- `icc.config.sub-agent.json` — Main Scope coordination only; agents do all writes. Strict paths (no parent paths), markdown enforced, auto `@codex review` after each push.
- `icc.config.main-scope.json` — Main Scope can write; agents are read-only. Same strict path rules and `@codex review` requirement.
- `icc.config.relaxed.json` — Looser for local hacking: markdown outside allowlist permitted, parent paths allowed, blocking disabled.
- `icc.config.strict-main-scope.json` — Hard lock for Main Scope: no Write/Edit/Bash; delegation only; agents perform work under standard path restrictions.
- `icc.config.local-backup.json` — Snapshot of the previously active local config (before switching to the main-scope variant). Safety copy only.
- `icc.config.main-scope-dev.json` — Linux-friendly profile where Main Scope can run curated git/gh commands (e.g., merging PRs) without spawning agents; guardrails, privacy, and @codex review reminder remain enabled.

Main-scope agent privileges
- The new `enforcement.main_scope_has_agent_privileges` flag controls whether the Main Scope is treated like an agent (skips PM-only write limits, uses the agent allowlists). All presets keep it `false` except `icc.config.main-scope-dev.json`, which sets it to `true` so Ops/Dev work can run directly from the Main Scope.

How the PR review reminder is activated
- Each config sets `enforcement.require_codex_review_comment: true`.
- A hook detects pushes to an open PR branch and posts a standalone `@codex review` comment using `gh pr comment`.
- Tool blacklists keep the needed CLI commands allowed for the Main Scope while other tools stay restricted.
- To use a preset: `make install CONFIG_FILE=sample-configs/icc.config.main-scope-dev.json` (or copy to `~/.claude/icc.config.json`).
