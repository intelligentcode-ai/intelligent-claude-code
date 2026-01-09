# AgentTask Creation System (Minimal)

**MANDATORY:** Planning happens before execution. All work requests become AgentTasks.

## Purpose
Provide a consistent “plan first” flow before any subagent executes work.

## Core Rules
1. **Work request detected** → create an AgentTask (do not implement directly).
2. **Planning first** → summarize approach, constraints, risks, and success criteria.
3. **Template selection** → choose nano/tiny/medium/large/mega based on complexity.
4. **Complete context** → include config values, file paths, memory references, and best‑practices.
5. **Execution path** → pass AgentTask to Task tool for subagent execution.

## Scope
- **Main agent only** creates AgentTasks.
- **Subagents** execute only from AgentTask context.

## Notes
This system replaces 1.x auto‑triggering and marker enforcement. It is a minimal, CC‑native planning gate.
