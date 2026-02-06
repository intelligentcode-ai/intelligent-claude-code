# Architecture (v10.1)

## Overview
Intelligent Claude Code is a CC-native framework that adds role-based specialists, work queue management, and strict file/git hygiene through a **skills-first architecture**.

## Core Components

### Skills (35 total)
Skills are the primary interface for specialized capabilities. They are:
- Defined in `src/skills/*/SKILL.md`
- Installed to `.claude/skills/`
- Invoked via skill description matching or `@Role` patterns

**Categories:**
- **Role Skills (14):** pm, architect, developer, system-engineer, devops-engineer, database-engineer, security-engineer, ai-engineer, web-designer, qa-engineer, backend-tester, requirements-engineer, user-tester, reviewer
- **Command Skills (5):** icc-version, icc-init-system, icc-search-memory, icc-get-setting, icc-setup
- **Process Skills (12):** thinking, work-queue, process, best-practices, validate, autonomy, parallel-execution, workflow, mcp-config, story-breakdown, git-privacy, commit-pr
- **Enforcement Companion Skills (3):** file-placement, branch-protection, infrastructure-protection
- **Meta Skill (1):** skill-creator

### Behaviors (4 foundational)
Always-active structural guidance loaded via `CLAUDE.md`:
- `config-system.md` - Configuration hierarchy
- `directory-structure.md` - Project layout
- `file-location-standards.md` - File placement rules
- `naming-numbering-system.md` - Naming conventions

Located in `src/behaviors/` and installed to `.claude/behaviors/`.

### Enforcement Hooks (2)
Hooks provide enforcement that CC doesn't handle natively:
- `agent-infrastructure-protection.js` - Block imperative infra changes
- `summary-file-enforcement.js` - Route summaries/reports, block ALL-CAPS filenames

Located in `src/hooks/` and registered in `.claude/settings.json`.

### Work Queue System
Cross-platform work tracking in `.agent/queue/`:
1. Work request → Added to queue as work item file
2. Task tool → subagent execution
3. Completion → Status updated, next item picked
4. Autonomy skill → Checks for continuation

**Claude Code:** Uses TodoWrite for display + queue files for persistence
**Other platforms:** Queue files directly (Gemini CLI, Codex CLI, etc.)

## Design Principles

- **Skills-first** → Skills loaded on demand based on context
- **CC-native subagents** → No marker files, no custom role enforcement
- **Cross-platform queues** → `.agent/queue/` works across all agents
- **File placement correctness** → Summaries in `summaries/`, memory in `memory/`
- **Git privacy by default** → Strip AI attribution when privacy enabled
