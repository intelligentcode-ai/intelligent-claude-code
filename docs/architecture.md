# Architecture (v10)

## Overview
Intelligent Claude Code is a CC-native framework that adds planning-first AgentTasks, role-based specialists, and strict file/git hygiene through a **skills-first architecture**.

## Core Components

### Skills (34 total)
Skills are the primary interface for specialized capabilities. They are:
- Defined in `src/skills/*/SKILL.md`
- Installed to `.claude/skills/`
- Invoked via `/skill-name` or `@Role` patterns

**Categories:**
- **Role Skills (14):** `/pm`, `/architect`, `/developer`, `/system-engineer`, `/devops-engineer`, `/database-engineer`, `/security-engineer`, `/ai-engineer`, `/web-designer`, `/qa-engineer`, `/backend-tester`, `/requirements-engineer`, `/user-tester`, `/reviewer`
- **Command Skills (4):** `/icc-version`, `/icc-init-system`, `/icc-search-memory`, `/icc-get-setting`
- **Process Skills (12):** `/thinking`, `/agenttask-create`, `/agenttask-execute`, `/memory`, `/best-practices`, `/validate`, `/autonomy`, `/parallel-execution`, `/workflow`, `/mcp-config`, `/story-breakdown`, `/git-privacy`
- **Enforcement Companion Skills (3):** `/file-placement`, `/branch-protection`, `/infrastructure-protection`
- **Meta Skill (1):** `/skill-creator`

### Behaviors (4 foundational)
Always-active structural guidance loaded via `CLAUDE.md`:
- `config-system.md` - Configuration hierarchy
- `directory-structure.md` - Project layout
- `file-location-standards.md` - File placement rules
- `naming-numbering-system.md` - Naming conventions

Located in `src/behaviors/` and installed to `.claude/behaviors/`.

### Enforcement Hooks (3)
Hooks provide enforcement that CC doesn't handle natively:
- `git-enforcement.js` - Strip AI mentions, branch protection
- `agent-infrastructure-protection.js` - Block imperative infra changes
- `summary-file-enforcement.js` - Route summaries/reports, block ALL-CAPS filenames

Located in `src/hooks/` and registered in `.claude/settings.json`.

### AgentTask System
Planning-first workflow:
1. Work request → AgentTask created
2. Task tool → subagent execution
3. Validation → completion criteria checked

## Design Principles

- **Skills-first** → Skills loaded on demand based on context
- **CC-native subagents** → No marker files, no custom role enforcement
- **Planning before execution** → AgentTasks before implementation
- **File placement correctness** → Summaries in `summaries/`, memory in `memory/`
- **Git privacy by default** → Strip AI mentions when privacy enabled
