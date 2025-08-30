# Continuation Work Patterns

**MANDATORY:** Work that follows from previous work ALWAYS requires PRBs

## Core Principle

Continuation work is ANY operation that logically follows from completed work.
Its complexity CANNOT be predetermined because it depends on results.

## Detection Patterns

### Category 1: Validation After Changes
**TRIGGER:** Any code/config change completion
**CONTINUATION:** Testing, linting, type checking, build verification
**PRB REQUIRED:** ALWAYS - results unpredictable

### Category 2: Fixes After Failures
**TRIGGER:** Any validation/test failure
**CONTINUATION:** Error analysis, bug fixes, corrections
**PRB REQUIRED:** ALWAYS - fix complexity unknown

### Category 3: Re-validation After Fixes  
**TRIGGER:** Any fix completion
**CONTINUATION:** Re-running tests, verification
**PRB REQUIRED:** ALWAYS - fix effectiveness unknown

### Category 4: Build After Validation
**TRIGGER:** Successful validation
**CONTINUATION:** Build, compilation, bundling
**PRB REQUIRED:** ALWAYS - build issues possible

### Category 5: Deployment After Build
**TRIGGER:** Successful build
**CONTINUATION:** Deploy, release, publish
**PRB REQUIRED:** ALWAYS - deployment complexity varies

## Integration Rules

### With Behavioral Decision Matrix
- Continuation work has HIGHEST precedence
- Overrides ALL complexity scoring
- Bypasses context evaluation
- ALWAYS triggers PRB generation

### With PRB Auto-Trigger
- Detect PRB completion → Check for continuation patterns
- Match pattern → Generate continuation PRB
- No pattern → Normal flow

## Common Continuation Chains

```
Feature Implementation
└── Validation (continuation)
    ├── Success → Build (continuation)
    │   └── Deploy (continuation)
    └── Failure → Fix (continuation)
        └── Re-validation (continuation)
            └── [Repeat until success]
```

## Blocking Patterns

**NEVER ALLOW** main scope to execute:
- "Let me test this" → Requires validation PRB
- "Let me fix this" → Requires fix PRB  
- "Let me check if it works" → Requires validation PRB
- "Let me build it" → Requires build PRB

## Memory Storage

Store successful continuation chains for pattern recognition:
- What work typically follows what
- Common validation requirements
- Typical fix patterns
- Build/deploy sequences

---
*Continuation work patterns for mandatory PRB generation*