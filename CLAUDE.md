# CLAUDE.md

This file is the **single entry point** for the behavioral system used by humans and Claude Code.

## Project Overview
Intelligent Claude Code is a CC‑native framework that adds:
- Planning‑first AgentTasks
- Role‑based subagents
- File placement rules (summaries/memory/stories/bugs)
- Git privacy filtering

## Primary Interaction Pattern
Use @Role requests for work, and always plan before execution:

```
@PM break down the story
@Architect review the design
@Developer implement auth
@Reviewer audit for regressions
```

## Core Roles (14)
@PM, @Architect, @Developer, @System-Engineer, @DevOps-Engineer, @Database-Engineer,
@Security-Engineer, @AI-Engineer, @Web-Designer, @QA-Engineer, @Backend-Tester,
@Requirements-Engineer, @User-Role, @Reviewer, plus dynamic specialists.

## Execution Model (Planning First)
1. Work request → AgentTask created by main agent  
2. AgentTask includes scope, risks, success criteria  
3. Task tool runs the appropriate subagent  
4. Subagent executes and returns summary  

## File Rules
- Summaries/reports **only** in `summaries/`
- Memory entries **only** in `memory/`
- Stories in `stories/`, bugs in `bugs/`
- Avoid ALL‑CAPS filenames (except allowlist)

## Git Privacy
If `git.privacy=true`, all AI references are stripped from commits and PR text.

## Behavior Stack
The system loads the virtual team behavior stack:
```
src/modes/virtual-team.md
```
