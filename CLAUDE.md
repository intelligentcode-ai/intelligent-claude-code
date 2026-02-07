# CLAUDE.md

This file is the **single entry point** for the behavioral system used by humans and Claude Code.

## Project Overview

Intelligent Claude Code is a CC-native framework that adds:
- **Skills-first architecture** - 33 cross-platform skills
- Work queue for task management (`.agent/queue/`)
- Role-based specialists (14 core + dynamic creation)
- File placement rules (summaries/memory/stories/bugs)
- Git privacy filtering

## Architecture

### Skills (Cross-Platform)
Skills are invoked on-demand based on description matching. They work across:
- Claude Code
- Codex CLI
- Cursor
- Gemini CLI
- GitHub Copilot
- Any SKILL.md-compatible agent

### Hooks (Claude Code Specific)
Hooks provide **enforcement** - they automatically run on events and can block actions:
- `agent-infrastructure-protection.js` - Protect system files
- `summary-file-enforcement.js` - Route files to correct directories

### Behaviors (Structural Guidance)
Only 4 foundational behaviors remain - always-active structural rules:
- `config-system.md` - Configuration hierarchy
- `directory-structure.md` - Project layout
- `file-location-standards.md` - File placement rules
- `naming-numbering-system.md` - Naming conventions

## Primary Interaction Pattern

Use @Role requests or skill names for work:

```
@PM break down the story
@Architect review the design
@Developer implement auth
@Reviewer audit for regressions
thinking skill for complex analysis
memory skill to search prior knowledge
```

## Core Skills (33)

### Role Skills (14)
pm, architect, developer, system-engineer, devops-engineer,
database-engineer, security-engineer, ai-engineer, web-designer,
qa-engineer, backend-tester, requirements-engineer, user-tester, reviewer

### Command Skills (2)
icc-version, icc-get-setting

### Process Skills (13)
thinking, work-queue, process, best-practices, validate,
autonomy, parallel-execution, workflow, mcp-config,
story-breakdown, git-privacy, commit-pr, release

### Enforcement Companion Skills (3)
These skills mirror what hooks enforce - defense in depth:
file-placement, branch-protection, infrastructure-protection

### Meta Skill (1)
skill-creator - Guide for creating new skills (from Anthropic)

## Execution Model

1. Work request → Added to `.agent/queue/` as work item
2. Work item includes description, assignee, success criteria
3. Task tool runs the appropriate subagent
4. Subagent executes, updates queue status, returns summary
5. Autonomy skill checks for next queued item

## File Rules

- Summaries/reports **only** in `summaries/`
- Memory entries **only** in `memory/`
- Stories in `stories/`, bugs in `bugs/`
- Avoid ALL-CAPS filenames (except allowlist)

## Git Privacy

If `git.privacy=true`, all AI references are stripped from commits and PR text.

## Skill Stack

The system loads skills from:
```
~/.claude/skills/     (user skills)
.claude/skills/       (project skills)
```

## Development (This Project)

**This project IS the ICC framework source.** When working here:

### Source Locations
- `src/skills/` - Distributed skills (what users install)
- `src/hooks/` - Enforcement hooks
- `src/behaviors/` - Behavioral guidance

### Local Testing Setup
See `docs/installation-guide.md` for setup instructions.

### Workflow
Use the process skill for the complete development workflow:
1. **Development Phase** - Implement → Test → Review → Fix (loop until clean)
2. **Deployment Phase** - Deploy → Test → Review → Commit (if applicable)
3. **PR Phase** - Create PR → Review → Fix → Await explicit user approval

### Key Skills for This Project
- process - Complete development workflow with quality gates
- commit-pr - Commit and PR formatting
- git-privacy - AI attribution prevention (MANDATORY)
- reviewer - Critical review (pre-commit, post-commit, post-PR)
