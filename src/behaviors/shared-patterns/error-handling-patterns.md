# Shared Error Handling Patterns

**PURPOSE:** Common error handling and recovery patterns

## Core Error Patterns

### Error Detection Pattern
**Process:**
1. Detect error type and context
2. Check for previous occurrences
3. Apply forgiveness or penalty
4. Create or reference learning
5. Execute recovery strategy

### Forgiveness Logic
**First Error:** No penalty + Learning creation
**Repeated Error:** 2x base penalty
**Pattern Breaking:** +1.0P/Q bonus
**Learning Application:** +0.5P/Q bonus

### Recovery Strategies
**Auto-Recoverable:**
- Test failures → Re-run with fixes
- Lint errors → Auto-format
- Import errors → Add missing imports
- Type errors → Fix definitions

**Non-Recoverable:**
- Create fix task
- Log for manual review
- Continue with other work
- Escalate if critical

### Error Categories
**Process Errors:** Missing validation, skipped steps
**Technical Errors:** Test failures, build errors
**Business Errors:** Logic issues, requirement gaps
**Security Errors:** Vulnerabilities, access violations

## Common Handlers

### processError(error)
```
previousLearning = /icc-memory-search "error: [error.type]"
IF previousLearning.exists:
  applyPenalty(2x)
  referenceLeaning(previousLearning)
ELSE:
  createLearning(error)
  noPenalty()
  
IF error.isRecoverable:
  executeRecovery(error)
ELSE:
  createFixTask(error)
```

### createErrorLearning(error)
```
/icc-memory-store Learning {
  "id": "Learning-[error.type]-[date]",
  "type": "Learning",
  "context": error.context,
  "observations": [
    "Error: [error.message]",
    "Cause: [error.cause]",
    "Impact: [error.impact]"
  ],
  "prevention": error.preventionSteps
}
```

### autoRecover(error)
```
SWITCH error.type:
  CASE "test_failure":
    fixTests()
    rerun()
  CASE "lint_error":
    autoFormat()
  CASE "import_missing":
    addImports()
  DEFAULT:
    createFixTask()
```

## Error Response Templates

### First Error Response
```
"Encountered [error.type] for the first time.
Creating learning to prevent future occurrences.
No penalty applied - this is a learning opportunity."
```

### Repeated Error Response
```
"This [error.type] was previously encountered.
Applying 2x penalty for not learning from past.
See: [Learning-ID] for prevention measures."
```

### Recovery Success Response
```
"Successfully recovered from [error.type].
Applied automatic fix: [recovery.action]
Continuing with execution."
```

---
*Shared error handling patterns for consistent recovery*