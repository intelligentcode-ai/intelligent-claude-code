# Intelligent Claude Code

Turn Claude Code into a multi-agent “virtual dev team” with AgentTasks, memory-first flows, and guardrails.

## Quick start

```bash
git clone https://github.com/intelligentcode-ai/intelligent-claude-code.git
cd intelligent-claude-code
make install              # or .\install.ps1 install on Windows
/icc-init-system          # one-time init
```

Then work conversationally:

```bash
@PM plan feature XYZ      # breaks into AgentTasks
@Developer implement auth # executes via AgentTask
/icc-search-memory auth   # reuse prior learnings
```

## What’s inside (at a glance)
- Specialist roles (PM, Dev, DevOps, QA, Security, DB, AI, etc.) plus dynamic specialists
- AgentTask automation with templates, memory injection, and constraints
- Guardrails: main-scope enforcement, scope/summary/file checks, infra safety
- MCP-ready: memory/docs/issue providers when enabled

## Operate safely
- Main scope: coordinate, delegate, read; agents do the heavy work (configurable)
- Memory-first: `memory/` is searched/stored automatically
- Infra protection: IAC-only posture by default; see `icc.config.json`
- Reviewed workflows: optional Task → Plan → Review → Execute → Review → Document enforcement via `reviewed_workflow` config

## Configure (minimal)
- Primary knobs live in `icc.config.json` (or project `.icc/config.json`)
- Quick presets available in `.icc/`:
  - `config.relaxed.json` – legacy behavior with lighter guardrails
  - `config.sub-agent.json` – agents do all writes/exec; main scope delegates only
  - `config.main-scope.json` – coordination-only main scope (agents execute work)
  - `config.strict-main-scope.json` – read-only/Task-only main scope (ultra-safe mode)
  - `config.main-scope-dev.json` – Linux/macOS friendly preset where Main Scope may run curated `git`/`gh` commands locally while all guardrails (file naming, folders, git privacy, @codex review, best practices, memory output) remain enabled
  - `config.workflow-reviewed.json` – Enables workflow enforcement (Task → Plan → Review → Execute → Review → Document) for Main Scope + agents

  See `sample-configs/README.md` for usage instructions and run `make install CONFIG_FILE=sample-configs/<name>.json` to apply one system-wide.

- Toggle `enforcement.main_scope_has_agent_privileges: true` if you want the Main Scope treated exactly like an agent (strict main-scope enforcement, PM-only limits, doc routing, etc. all short-circuit). Default is `false`; `icc.config.main-scope-dev.json` turns it on for systems impacted by the V8 issue.
- Enable `enforcement.workflow` to require the Task → Plan → Review → Execute → Review → Document sequence (see `icc.config.workflow-reviewed.json` for the default step mapping).

## Documentation
- Start: [docs/index.md](docs/index.md)
- Essentials: [installation-guide](docs/installation-guide.md), [user-guide](docs/user-guide.md), [agenttask-system-guide](docs/agenttask-system-guide.md), [virtual-team-guide](docs/virtual-team-guide.md)

## License
MIT (see LICENSE)
