---
name: thinking
description: Break complex problems into explicit steps with validation. Use for multi-step decisions, high-risk changes, complex debugging, architectural decisions, or when careful analysis is needed before action.
---

# Thinking Skill

Structured problem-solving through explicit step-by-step analysis.

## When to Use

- Decisions are complex or multi-step
- Changes are high-risk or irreversible
- Debugging requires systematic exploration
- Architectural decisions with tradeoffs
- Planning before significant implementation

## Core Guidance

- **Break problems into explicit steps** - Don't jump to conclusions
- **Validate assumptions before acting** - Question what you think you know
- **Prefer planning before execution** - Map the approach first
- **Document reasoning** - Make the thought process visible

## Decision Matrix

### Work Triggers (require planning)
- Action verbs: implement, fix, create, deploy
- @Role work: "@Developer implement X"
- Continuation: testing after implementation

### Information Patterns (direct response)
- Questions: what, how, why, status
- @Role consultation: "@PM what story next?"

### Context Evaluation
- **Simple**: Single question, surface-level → direct response
- **Complex**: Multi-component, system-wide impact → use thinking

## Thinking Process

1. **Identify the problem** - What exactly needs to be solved?
2. **Gather context** - What information is relevant?
3. **List options** - What approaches are possible?
4. **Evaluate tradeoffs** - What are pros/cons of each?
5. **Select approach** - Which option best fits constraints?
6. **Plan execution** - What are the steps to implement?
7. **Identify risks** - What could go wrong?
8. **Define validation** - How will success be measured?

## Memory Integration

- **Search memory** before repeating analysis
- **Store patterns** that proved useful
- **Reference prior decisions** for consistency

## Sequential Thinking MCP Tool

For complex analysis, use the `mcp__sequential-thinking__sequentialthinking` tool:
- Break into numbered thoughts
- Allow revision of previous thoughts
- Support branching for alternative approaches
- Track hypothesis generation and verification
