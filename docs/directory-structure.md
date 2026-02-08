# Directory Structure (v10.2)

ICC tries hard to **adapt to your existing repo**. The only “special” directories are for ICC’s own bookkeeping and
output hygiene.

## Recommended Minimum

```text
project-root/
  CLAUDE.md                # (recommended) single entry-point for tool-specific instructions
  icc.config.json          # (optional) behavior/enforcement config
  icc.workflow.json        # (optional) workflow automation config

  .claude/                 # (optional) project-local skill links and tool settings

  .agent/                  # ICC working state (queue + memory)
    queue/                 # work items (cross-platform tracking)
    memory/                # local runtime memory (SQLite DB)

  memory/                  # shareable memory exports (markdown)

  summaries/               # summaries/reports only (enforced)
  docs/                    # your docs (not enforced; normal project content)
  src/                     # your code
```

## What Goes Where

- `.agent/queue/`: lightweight work-item files used by the `work-queue` skill.
- `.agent/memory/`: local runtime state used by the `memory` skill (SQLite DB).
- `memory/`: shareable markdown exports produced by the `memory` skill.
- `summaries/`: the hooks/skills route “summary/report”-like files here.
- `docs/`: normal documentation. ICC does not try to force your docs structure.

## Notes On Git

Projects differ on whether they commit ICC artifacts:
- Many teams keep `.agent/queue/` local-only.
- Many teams commit `memory/exports/` to share “what we learned”.

Tune this via `.gitignore` to match your preference.
