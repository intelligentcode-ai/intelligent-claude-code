# Intelligent Claude Code

CC‑native framework slimmed to what Claude Code 2 + Opus still needs.

## Current scope (v9)

- **Claude Code 2 + Opus focused** — keep only what CC doesn’t do natively.
- **CC‑native subagents** — no marker files or custom role‑enforcement hooks.
- **Planning‑first AgentTasks** — main scope plans, subagents implement.
- **Minimal hooks** — privacy, infra safety, summary/report routing.
- **Behavior guidance** — behaviors live in the repo and guide humans + Claude.

## Included

- **14 core roles** + **dynamic specialists**
- **Reviewer role** (critical risk/regression review)
- **AgentTask templates** (nano → mega)
- **Hooks (PreToolUse only)**:
  - `git-enforcement.js` — strip AI/Claude mentions from commit/PR text (privacy)
  - `agent-infrastructure-protection.js` — block imperative infra changes
  - `summary-file-enforcement.js` — route summaries/reports + block ALL‑CAPS filenames

## Principles

1. **Plan first** → create AgentTask before implementation.
2. **Subagents do the work** → main scope coordinates only.
3. **Keep files tidy** → summaries in `summaries/`, memory in `memory/`.
4. **Protect git** → strip AI mentions when privacy is enabled.
5. **Use CC’s native agent system** → don’t re‑implement it.

## Core roles

pm, architect, developer, system‑engineer, devops‑engineer, database‑engineer,
security‑engineer, ai‑engineer, web‑designer, qa‑engineer, backend‑tester,
requirements‑engineer, user‑role, reviewer — plus dynamic specialists (e.g., react‑developer).

## Install

```bash
git clone https://github.com/intelligentcode-ai/intelligent-claude-code.git
cd intelligentcode-ai/intelligent-claude-code
make install              # or .\install.ps1 install on Windows
make clean-install        # force uninstall + reinstall (Linux/macOS)
```

Usage (if your Claude Code build supports @‑mentions, use the file names below):

```bash
@pm break down the story
@architect review the design
@developer implement auth
@reviewer audit for regressions
```

If @‑mentions aren’t supported, just ask in plain language:
“Use the architect subagent to review the design.”

## Model control (user‑configurable)

Claude Code model selection remains user‑controlled. Set it via:
- `~/.claude/settings.json`
- project `.claude/settings.json`
- CLI or `/model`

## Migration (v8 → v9)

- **Hooks slimmed** to 3 PreToolUse hooks only.
- **Old enforcement hooks removed** — CC handles subagents natively now.
- **Behavior stack trimmed** to essentials in `src/modes/virtual-team.md`.

## Docs

- Start: `docs/index.md`
- Installation: `docs/installation-guide.md`
- Configuration: `docs/configuration-guide.md`
- Hooks: `docs/hook-registration-reference.md`

## License

MIT (see LICENSE)
