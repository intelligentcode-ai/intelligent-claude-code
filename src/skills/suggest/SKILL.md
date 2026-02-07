---
name: suggest
description: Activate when user asks for improvement suggestions, refactoring ideas, or "what could be better". Analyzes code and provides realistic, context-aware proposals for improvements. Separate from reviewer (which finds problems).
---

# Suggest Skill

Provides realistic, context-aware improvement proposals. This is NOT about finding bugs (use reviewer for that) - this is about making good code better.

## When to Use

- User asks "what could be improved?"
- User asks for refactoring suggestions
- User wants architecture recommendations
- After a feature is complete and working

## Core Principles

1. **Context-aware** - Proposals must fit the codebase style and constraints
2. **Realistic** - Suggestions must be implementable with reasonable effort
3. **Prioritized** - Most impactful improvements first
4. **Justified** - Explain WHY the improvement matters

## Analysis Areas

### Code Quality
- Readability improvements
- Naming clarity
- Function decomposition
- Duplication reduction
- Complexity reduction

### Architecture
- Better separation of concerns
- More appropriate patterns
- Improved modularity
- Cleaner interfaces

### Performance
- Obvious inefficiencies
- N+1 queries
- Unnecessary operations
- Caching opportunities

### Maintainability
- Test coverage gaps (for stability, not correctness)
- Documentation improvements
- Configuration externalization
- Error message clarity

### Developer Experience
- Simplified APIs
- Better defaults
- Clearer error handling
- Improved logging

## Output Format

```markdown
# Improvement Suggestions

## High Impact
1. **[Title]** in [file:line]
   - Current: Description of current approach
   - Suggested: What to change
   - Why: Benefit of the change
   - Effort: Low/Medium/High

## Medium Impact
...

## Low Impact (Nice-to-have)
...

## Not Recommended
- [Thing that might seem like an improvement but isn't worth it]
- Reason: Why it's not worth doing
```

## Anti-Patterns to Avoid

**DO NOT suggest:**
- Premature optimization
- Over-engineering for hypothetical future needs
- Changing working code just to match a pattern
- Adding complexity for marginal benefit
- Rewriting code that works fine

**DO suggest:**
- Simplifications that reduce cognitive load
- Extractions that improve testability
- Clarifications that help future maintainers
- Consolidations that reduce duplication

## Context Gathering

Before suggesting improvements, understand:

```bash
# Understand the codebase structure
find . -type f -name "*.ts" -o -name "*.js" | head -20

# Check existing patterns
grep -r "class\|function\|const.*=" --include="*.ts" | head -20

# Look at test coverage
find . -name "*test*" -o -name "*spec*" | head -10

# Check for existing style guides
cat .eslintrc* .prettierrc* tsconfig.json 2>/dev/null | head -30
```

## Example Analysis

**Good suggestion:**
```markdown
## High Impact
1. **Extract validation logic** in [src/api/users.ts:45-78]
   - Current: Validation is inline in the handler, duplicated in 3 places
   - Suggested: Create `validateUserInput()` function in `src/utils/validation.ts`
   - Why: Reduces duplication, makes validation testable, easier to update
   - Effort: Low (30 min)
```

**Bad suggestion:**
```markdown
## High Impact
1. **Rewrite to use functional programming**
   - Current: Uses classes and OOP patterns
   - Suggested: Rewrite everything with pure functions
   - Why: FP is trendy
   - Effort: High (weeks)
```
The bad example ignores context, is unrealistic, and lacks real justification.

## Integration

- Run AFTER reviewer skill (problems first, then improvements)
- Pairs with architect role for larger refactoring decisions
- Feeds into story-breakdown skill for planning improvement work
