# ICC Config Variants

Two ready-made configs are provided so you can swap behaviors without editing defaults:

- `config.relaxed.json`: mirrors the currently deployed settings (non-strict main scope; IAC-only infra protection; agents blocked from Task/SlashCommand/Skill).
- `config.strict-main-scope.json`: coordination-only main scope, agent delegation encouraged, MCP enabled; broad main-scope tool blacklist to force delegation while keeping agents free to work.

Usage:

1) To apply one, copy it to your user install:

   ```bash
   cp .icc/config.relaxed.json ~/.claude/icc.config.json
   # or
   cp .icc/config.strict-main-scope.json ~/.claude/icc.config.json
   ```

2) Restart Claude Code or rerun `make install` so hooks pick up the change.

Project defaults remain unchanged; these files are opt-in convenience presets.
