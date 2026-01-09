# Configuration System (Minimal)

<behavior name="Configuration System (Minimal)">
**MANDATORY:** Use the configuration hierarchy; do not assume defaults.

## Configuration Hierarchy (highest to lowest)
1. Embedded AgentTask overrides  
2. Project config: `./icc.config.json` or `./.claude/icc.config.json`  
3. User config: `~/.claude/icc.config.json`  
4. System defaults: built-in (no default file shipped)

## Key Settings
- `git.*` (privacy, branch protection, PR requirement)
- `paths.*` (stories, bugs, memory, docs, summaries)
- `agenttask.*` (templates, sizing)
- `models.*` (optional user‑controlled model selection)
</behavior>
