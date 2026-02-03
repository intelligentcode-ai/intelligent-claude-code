# Intelligent Claude Code

CC‑native framework for planning‑first AgentTasks, native subagents, and minimal hooks.

## Current scope (v10)

- **Skills-first architecture** — 34 cross-platform skills loaded on demand.
- **CC‑native subagents** — no marker files, no custom role enforcement hooks.
- **Planning‑first AgentTasks** — main scope plans, subagents implement.
- **Minimal hooks only** — keep only what CC doesn't do natively.
- **Behavior guidance** — 4 foundational behaviors for structural rules.

## Included

- **14 core roles** + **dynamic specialists**
- **Reviewer role** (critical risk/regression review)
- **AgentTask templates** (nano → mega)
- **Hooks (PreToolUse only)**:
  - `git-enforcement.js` — strip AI/Claude mentions from commit/PR text (privacy)
  - `agent-infrastructure-protection.js` — block imperative infra changes
  - `summary-file-enforcement.js` — route summaries/reports + block ALL‑CAPS filenames

## Removed

- Marker‑based orchestration
- Role enforcement hooks
- Reminder hooks
- Auto‑trigger and workflow hooks
- Redundant behavior trees

## Principles

1. **Plan first** → create AgentTask before implementation.
2. **Subagents do the work** → main scope coordinates only.
3. **Keep files tidy** → summaries in `summaries/`, memory in `memory/`.
4. **Protect git** → strip AI mentions when privacy is enabled.
5. **Use CC’s native agent system** → don’t re‑implement it.

## Core roles

@PM, @Architect, @Developer, @System‑Engineer, @DevOps‑Engineer, @Database‑Engineer,
@Security‑Engineer, @AI‑Engineer, @Web‑Designer, @QA‑Engineer, @Backend‑Tester,
@Requirements‑Engineer, @User‑Role, @Reviewer — plus dynamic specialists (e.g., @React‑Developer).

## Install

```bash
git clone https://github.com/intelligentcode-ai/intelligent-claude-code.git
cd intelligentcode-ai/intelligent-claude-code
make install              # or .\install.ps1 install on Windows
make clean-install        # force uninstall + reinstall (Linux/macOS)
```

Usage:

```bash
@PM break down the story
@Architect review the design
@Developer implement auth
@Reviewer audit for regressions
```

## Model control (user‑configurable)

Claude Code model selection remains user‑controlled. Set it via:
- `~/.claude/settings.json`
- project `.claude/settings.json`
- CLI or `/model`

## Migration (v9 → v10)

- **Skills-first architecture** — 34 skills replace behavior-heavy approach.
- **Cross-platform** — Skills work with Claude Code, Codex CLI, Cursor, Gemini CLI, etc.
- **Behaviors trimmed** — Only 4 foundational behaviors remain.
- **Same hooks** — 3 PreToolUse hooks continue unchanged.

## Docs

- Start: `docs/index.md`
- Installation: `docs/installation-guide.md`
- Configuration: `docs/configuration-guide.md`
- Hooks: `docs/hook-registration-reference.md`

## License

MIT (see LICENSE)
