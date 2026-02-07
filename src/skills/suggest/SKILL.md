---
name: suggest
description: Activate when user asks for improvement suggestions, refactoring ideas, or "what could be better". Analyzes code and provides realistic, context-aware proposals. Implements safe improvements AUTOMATICALLY. Separate from reviewer (which finds problems).
---

# Suggest Skill

Proposes improvements and **IMPLEMENTS SAFE ONES AUTOMATICALLY**.

## Autonomous Execution

**DEFAULT BEHAVIOR: Implement safe improvements automatically.**

### Auto-Implement (no permission needed)

Implement automatically if ALL conditions are met:
- **Low-to-medium effort** (< 30 min work)
- **Safe** (doesn't change intended behavior)
- **Clear benefit** (readability, maintainability, performance)
- **Reversible** (easy to undo if wrong)

Examples of auto-implement:
- Extract repeated code into a function
- Rename unclear variables
- Add missing error handling
- Improve comment clarity
- Remove dead code
- Consolidate duplicate logic
- Add type annotations
- Fix inconsistent formatting

### Pause for Human Decision

Present to user if ANY condition applies:
- **High effort** (> 30 min work)
- **Behavior change** (even if "better")
- **Architectural** (affects multiple components)
- **Risky** (could break things if wrong)
- **Subjective** (style preference, not clear improvement)

Examples requiring human:
- Rewrite module with different pattern
- Change API interface
- Add new dependency
- Restructure directory layout
- Change error handling strategy

## Analysis Areas

### Auto-Implement Categories

**Code Quality (AUTO):**
- Extract function from duplicated code
- Rename unclear variables/functions
- Remove unused imports/variables
- Add missing null checks
- Simplify complex conditionals

**Maintainability (AUTO):**
- Add missing docstrings to public functions
- Extract magic numbers to constants
- Group related code together
- Remove commented-out code

**Performance (AUTO if safe):**
- Cache repeated calculations
- Use more efficient data structures
- Remove unnecessary operations

### Human Decision Categories

**Architecture (PAUSE):**
- Module restructuring
- Pattern changes
- New abstractions

**Dependencies (PAUSE):**
- Adding libraries
- Upgrading versions
- Removing dependencies

**Behavior (PAUSE):**
- Changing defaults
- Modifying error handling strategy
- Altering API contracts

## Execution Flow

```
1. Analyze changes for improvement opportunities
2. Categorize each suggestion:
   - Safe + Low effort → AUTO-IMPLEMENT
   - Risky or High effort → PRESENT TO USER
3. Implement all auto-implement items
4. Run tests
5. If tests pass:
   - Report what was implemented
   - Present remaining suggestions to user
6. If tests fail:
   - Revert auto-implemented changes
   - Report the issue
```

## Output Format

```markdown
# Improvement Analysis

## Auto-Implemented
1. **[file:line]** Extracted `calculateTotal()` from duplicated code
   - Before: 15 lines repeated in 3 places
   - After: Single function, 3 call sites

2. **[file:line]** Renamed `x` to `userCount`
   - Improves readability

## Tests: PASS ✓

## Suggestions for Human Decision
1. **[HIGH IMPACT]** Refactor auth module to use middleware pattern
   - Effort: ~2 hours
   - Benefit: Cleaner separation, easier testing
   - Risk: Touches 8 files, could break auth flow
   - Recommendation: Yes, but schedule dedicated time

2. **[MEDIUM IMPACT]** Add Redis caching layer
   - Effort: ~4 hours
   - Benefit: 10x faster repeated queries
   - Risk: New dependency, operational complexity
   - Recommendation: Evaluate if performance is actually a problem

## Summary
- Analyzed: X opportunities
- Auto-implemented: Y
- Needs decision: Z
```

## Integration with Process

After auto-implementing:
1. Tests are re-run automatically
2. If pass → continue to next phase
3. If fail → revert, report, pause for human

The process continues autonomously unless human decision is genuinely needed.

## Anti-Patterns

**DO NOT auto-implement:**
- "Let's rewrite this in a better way" (subjective)
- "This could use a different pattern" (architectural)
- "We should add validation here" (behavior change)
- "Let's add logging everywhere" (scope creep)

**DO auto-implement:**
- "This variable name is unclear" → rename it
- "This code is duplicated" → extract it
- "This import is unused" → remove it
- "This null check is missing" → add it
