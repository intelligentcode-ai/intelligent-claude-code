---
name: best-practices
description: Search and apply best practices before implementation. Use when starting new work to check for established patterns, when promoting successful memory patterns, or when ensuring consistency with team standards.
---

# Best Practices Skill

Search and apply established best practices before implementation.

## When to Use

- Starting new implementation work
- Checking for established patterns
- Promoting successful memory patterns
- Ensuring consistency with team standards

## Best Practices Location

Best practices are stored in `best-practices/<category>/`:
- `best-practices/architecture/`
- `best-practices/development/`
- `best-practices/git/`
- `best-practices/operations/`
- `best-practices/quality/`
- `best-practices/security/`
- `best-practices/collaboration/`

## Search Before Implementation

**MANDATORY**: Check best-practices before starting work:
1. Identify the domain/category of work
2. Search relevant best-practices directory
3. Apply established patterns to implementation
4. Note deviations with justification

## Best Practice Format

```markdown
# [Practice Name]

## When to Use
[Situations where this practice applies]

## Pattern
[The recommended approach]

## Example
[Concrete implementation example]

## Rationale
[Why this approach is preferred]

## Anti-patterns
[What to avoid]
```

## Promotion from Memory

When a memory pattern proves successful:
1. **Threshold**: Used 3+ times successfully
2. **Validation**: Pattern is generalizable
3. **Documentation**: Full best-practice format
4. **Location**: Move to appropriate category
5. **References**: Update memory to link to best-practice

## Integration with AgentTasks

When creating AgentTasks, reference applicable best practices:
```yaml
context:
  best_practices:
    - category: security
      practice: input-validation
    - category: git
      practice: commit-messages
```

## Categories

| Category | Focus |
|----------|-------|
| architecture | System design patterns |
| collaboration | Team workflow patterns |
| development | Coding standards |
| git | Version control practices |
| operations | Deployment/monitoring |
| quality | Testing/review practices |
| security | Security patterns |
