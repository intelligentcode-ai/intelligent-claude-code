# Roles, Agents, and Subagents (v10.2)

Terminology can be confusing because different tools use different words.

## What ICC Ships

ICC primarily ships **Skills**:
- source of truth: `src/skills/*/SKILL.md`
- installed to: `~/.claude/skills/` (and optionally project `.claude/skills/`)

Role names like `PM` or `Reviewer` are **role skills** with well-defined responsibilities.

## How “Agents” Happen

- In **Claude Code**, the UI/runtime can run specialized subagents. ICC’s role skills are designed to be invoked with
  role prefixes like `PM: ...` or `Reviewer: ...`.

## Related Files

- Behaviors (always-on structural guidance): `src/behaviors/`
- Hooks (Claude Code safety + file hygiene): `src/hooks/`
- Work queue: `.agent/queue/`
