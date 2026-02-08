# Intelligent Claude Code

CC-native framework for role-based specialists, cross-agent work tracking, and minimal enforcement hooks.

## What You Get (v10.2.x)

- **Skills-first architecture**: 35 cross-platform skills loaded on demand.
- **Role-based specialists**: 14 core roles plus dynamic specialists when needed.
- **Work queue**: file-based tracking in `.agent/queue/` for cross-agent compatibility.
- **Minimal hooks**: keep only what Claude Code does not do natively (safety + file routing).
- **Behavior guidance**: a small set of foundational behaviors for structural rules.

## 60-Second Quickstart

```bash
git clone https://github.com/intelligentcode-ai/intelligent-claude-code.git
cd intelligent-claude-code
make install              # or .\\install.ps1 install on Windows
```

In Claude Code, start work via roles:

```text
@PM break down: "Fix the install regression"
@Developer implement the fix
@Reviewer review for regressions
```

For larger work, ICC uses a work queue under `.agent/queue/` so tasks stay portable across agents/tools.

## Minimal Hooks (Enforcement)

Hooks are intentionally minimal (PreToolUse only):
- `agent-infrastructure-protection.js`: blocks dangerous imperative infra operations unless explicitly requested.
- `summary-file-enforcement.js`: routes summaries/reports into `summaries/` and blocks unexpected ALL-CAPS filenames.

## Key Principles

1. Plan first: break work into small, explicit items.
2. Specialists do the work: the coordinator delegates; roles implement/review/test.
3. Keep outputs tidy: summaries in `summaries/`, memory in `memory/`, stories in `stories/`, bugs in `bugs/`.
4. Guard git hygiene: privacy and branch-protection rules keep commits/PRs clean.
5. Use native agent systems: do not reinvent what your tool already provides.

## Install

```bash
make install              # or .\install.ps1 install on Windows
make clean-install        # force uninstall + reinstall (Linux/macOS)
```

## Core Roles

`@PM`, `@Architect`, `@Developer`, `@Reviewer`, `@Security-Engineer`, `@QA-Engineer`, `@DevOps-Engineer`, `@Database-Engineer`,
`@System-Engineer`, `@AI-Engineer`, `@Web-Designer`, `@Backend-Tester`, `@Requirements-Engineer`, `@User-Tester`.

Dynamic specialists are encouraged (e.g. `@React-Developer`, `@Kubernetes-Engineer`).

## Example Usage

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

## Contributing / Branches

- Open PRs against `dev` (development branch).
- Release flow is `dev` -> `main` with a version bump, tag, and GitHub release.

## Works With

Skills are plain `SKILL.md` folders, so they work across tools that support this format (Claude Code, Codex, Cursor, etc.).

## Docs

- Start: `docs/index.md`
- Installation: `docs/installation-guide.md`
- Configuration: `docs/configuration-guide.md`
- Skills reference: `docs/skills-reference.md`
- Hooks: `docs/hook-registration-reference.md`

## License

MIT (see LICENSE)
