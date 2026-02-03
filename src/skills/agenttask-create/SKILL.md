---
name: agenttask-create
description: Create properly structured AgentTasks with complete context. Use when work is detected that needs to be delegated to a specialist, when breaking down stories, or when planning execution of any non-trivial task.
---

# AgentTask Creation Skill

Create properly structured AgentTasks for subagent execution.

## When to Use

- Work request detected that needs delegation
- Breaking down stories into executable tasks
- Planning any non-trivial implementation
- Coordinating multi-step workflows

## Core Rules

1. **Work request detected** → create an AgentTask (do not implement directly)
2. **Planning first** → summarize approach, constraints, risks, and success criteria
3. **Template selection** → choose nano/tiny/medium/large/mega based on complexity
4. **Complete context** → include config values, file paths, memory references
5. **Execution path** → pass AgentTask to Task tool for subagent execution

## Template Selection

| Template | Points | Use Case |
|----------|--------|----------|
| **nano** | 0-2 | Trivial changes, single-line fixes |
| **tiny** | 3-5 | Simple single-file changes |
| **medium** | 6-15 | Multi-file features |
| **large** | 16-30 | Complex coordination |
| **mega** | 31+ | System-wide changes |

## Required Context

Every AgentTask must include:
- **Complete context** with actual values (no placeholders)
- **Absolute file paths** and configuration values
- **Embedded memory** search results and best practices
- **Clear success criteria** and validation steps
- **Proper role assignment** with documented rationale

## AgentTask Structure

```yaml
agentTask:
  id: STORY-XXX-AgentTask-001
  title: [descriptive title]
  role: @[Role]
  complexity: [1-15]
  template: [nano|tiny|medium|large|mega]

  context:
    project_root: [absolute path]
    relevant_files: [list]
    config_values: [embedded]
    memory_refs: [search results]

  success_criteria:
    - [measurable criterion 1]
    - [measurable criterion 2]

  validation:
    - [validation step 1]
    - [validation step 2]
```

## Scope

- **Main agent only** creates AgentTasks
- **Subagents** execute only from AgentTask context
- AgentTasks are the planning gate before execution
