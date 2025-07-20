# Shared Enforcement Patterns

**MANDATORY:** Apply enforcement patterns. Auto-correct deviations.

**PURPOSE:** Common enforcement patterns for mandatory behavioral compliance

## Core Enforcement Patterns

### Enforcement Header Pattern
**Standard Format:**
```markdown
**[LEVEL]:** [Core directive]. Auto-correct violations.
```

**Levels:**
- `**CRITICAL:**` - System integrity at risk
- `**MANDATORY:**` - Required for compliance  
- `**REQUIRED:**` - Best practice enforcement
- `**RECOMMENDED:**` - Optional enhancement

### Command Enforcement Pattern
**Weak (Before):**
```markdown
Use /icc-command for [action]
```

**Strong (After):**
```markdown
**MUST use** /icc-command for [action]
**Auto-Correction:** Replace manual action with /icc-command
```

### Rule Structure Pattern
```markdown
### [Rule Name] - ALWAYS/NEVER
**MUST** [positive action]
**NEVER** [prohibited action]  
**Auto-Correction:** [correction action]
```

### Auto-Correction Pattern
```markdown
## AUTO-CORRECTION

**[Violation]:** [Correction Action]
**Missing X:** Auto-insert X
**Wrong Y:** Auto-replace with correct Y
**Skipped Z:** Auto-execute Z
```

## Common Auto-Corrections

### Process Violations
```markdown
**Missing validation:** Auto-insert validation step
**Skipped memory search:** Auto-execute /icc-memory-search
**No role assignment:** Auto-detect and assign role
**Wrong workflow phase:** Auto-correct to proper phase
```

### Command Violations
```markdown
**Manual action:** Auto-replace with /icc- command
**Wrong command:** Auto-correct to proper command
**Missing parameter:** Auto-add required parameter
**Invalid syntax:** Auto-fix command syntax
```

### Configuration Violations
```markdown
**Hardcoded value:** Auto-replace with dynamic lookup
**Missing setting:** Auto-add default value
**Invalid config:** Auto-correct to valid format
**Wrong priority:** Auto-apply inheritance rules
```

## Enforcement Integration

### detectViolation(action)
```
FOR pattern IN enforcement_patterns:
  IF action.violates(pattern):
    RETURN violation_type
RETURN none
```

### applyCorrection(violation)
```
correction = lookupCorrection(violation.type)
executeCorrection(correction)
logCorrection(violation, correction)
CONTINUE execution
```

### enforceCompliance(behavior)
```
IF NOT behavior.hasEnforcementHeader():
  addEnforcementHeader(behavior)
IF NOT behavior.hasMandatoryLanguage():
  strengthenLanguage(behavior)
IF NOT behavior.hasAutoCorrection():
  addAutoCorrection(behavior)
```

## Enforcement Commands

### Validation
- `/icc-validate-enforcement [file]` - Check enforcement compliance
- `/icc-test-correction [violation]` - Test auto-correction
- `/icc-report-violations` - List recent violations

### Correction
- `/icc-apply-correction [violation]` - Manual correction trigger
- `/icc-fix-all-violations` - Batch auto-correction
- `/icc-strengthen-language [file]` - Upgrade to mandatory language

## Tracking Patterns

### Violation Tracking
```markdown
**Track:** Violation type, frequency, location
**Store:** Learning-Violation-[Type]-[Date]
**Report:** Weekly compliance summary
```

### Compliance Scoring
```markdown
**Penalty:** -1.0P for first violation
**Penalty:** -2.0P for repeated violation
**Bonus:** +0.5P for compliance streak
**Bonus:** +1.0P for zero violations
```

## Standard File Template

```markdown
# [Behavior Name]

**[LEVEL]:** [Core directive]. Auto-correct violations.

**Purpose:** [One-line purpose]
**Type:** Core|Support|Integration
**Status:** ACTIVE

## Imports
@./shared-patterns/enforcement-patterns.md

## MANDATORY RULES

### [Rule] - ALWAYS
**MUST** [action]
**Auto-Correction:** [fix]

## AUTO-CORRECTION
[Using patterns from enforcement-patterns.md]

## ENFORCEMENT
**Compliance:** TRACKED via [method]
**Violations:** AUTO-CORRECTED per patterns
```

---
*Shared enforcement patterns for mandatory compliance*