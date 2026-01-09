# Configuration Patterns (Minimal)

**MANDATORY:** Read config values from the hierarchy; do not assume defaults.

## Hierarchy
1. AgentTask overrides  
2. Project config (`./icc.config.json` or `./.claude/icc.config.json`)  
3. User config (`~/.claude/icc.config.json`)  
4. Defaults (`icc.config.default.json`)

## Key Areas
- `git.*`, `paths.*`, `team.*`, `agenttask.*`, `models.*`
