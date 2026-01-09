# Architecture (v9)

## Overview
Intelligent Claude Code is a CC‑native framework that adds planning‑first AgentTasks, role subagents, and strict file/git hygiene.

## Core Components

### Roles (Subagents)
Defined in `src/agents/*.md` and installed into `.claude/agents/`.

### Behaviors
Loaded via `CLAUDE.md` → `src/modes/virtual-team.md`.

### AgentTask System
Planning‑first workflow:
1. Work request → AgentTask
2. Task tool → subagent execution

### Enforcement Hooks
Minimal hooks only:
- `git-enforcement.js`
- `agent-infrastructure-protection.js`
- `summary-file-enforcement.js`

## Design Principles
- CC‑native subagents, no marker orchestration
- Planning before execution
- File placement correctness
- Git privacy by default
