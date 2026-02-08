# Best Practices Guide (v10.2)

ICC uses a simple, repo-local `best-practices/` directory to capture “how we do things here”.
The `best-practices` skill searches these docs (and memory) **before implementation**.

## Recommended Layout

```text
best-practices/
  architecture/
  collaboration/
  development/
  git/
  operations/
  quality/
  security/
```

## How It’s Used

- When starting new work, the agent should:
  - search `best-practices/<category>/` for relevant guidance
  - search the `memory` skill for related past decisions/patterns
- Then it applies the practices during implementation and reviews.

## Writing A Best Practice

Use this template:

```markdown
# [Practice Name]

## When to Use

## Pattern

## Example

## Rationale

## Anti-patterns
```

