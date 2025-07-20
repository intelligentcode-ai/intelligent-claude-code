# TASK-006: Comprehensive Enforcement Design

## Executive Summary

This design establishes a **universal enforcement system** that transforms behavioral patterns from optional guidelines into mandatory directives. The approach uses:
- **Standardized enforcement header** (<100 chars)
- **Auto-correction patterns** (not blocking)
- **Clear enforcement hierarchy**
- **Token-efficient implementation**

## 1. Universal Enforcement Header

### Standard Format (One-Line)
```markdown
**MANDATORY:** [Core directive]. Auto-correct violations.
```

### Examples:
- `**MANDATORY:** Role-in-title + 3 subtasks. Auto-fix violations.`
- `**MANDATORY:** Memory-first before actions. Auto-correct if skipped.`
- `**MANDATORY:** Dynamic config only. Auto-fix hardcoded values.`

### Benefits:
- **<100 characters** for token efficiency
- **Scannable** by AI for immediate recognition
- **Action-oriented** with clear consequences
- **Consistent** across all behaviors

## 2. Auto-Correction Patterns

### Core Principle: Fix, Don't Block
Instead of stopping execution, the system automatically corrects violations:

```markdown
## AUTO-CORRECTION

**Missing validation:** Auto-insert validation step
**Wrong command:** Auto-replace with correct /icc- command
**Skipped memory:** Auto-execute memory search
**No role in title:** Auto-prepend [Role] to title
```

### Auto-Correction Triggers:
1. **Detection:** Monitor for violation patterns
2. **Correction:** Apply fix without interruption
3. **Logging:** Record correction for learning
4. **Continuation:** Resume normal flow

### Implementation Pattern:
```markdown
IF violation_detected:
    correction = lookup_correction_pattern(violation_type)
    apply_correction(correction)
    log_for_learning(violation, correction)
    CONTINUE execution
```

## 3. Enforcement Hierarchy

### Four Levels of Enforcement:

#### CRITICAL (System Integrity)
- **Prefix:** `**CRITICAL:**`
- **Violations:** System breaks or data loss
- **Correction:** Immediate auto-fix + alert
- **Examples:** Memory persistence, git operations

#### MANDATORY (Compliance Required)
- **Prefix:** `**MANDATORY:**`
- **Violations:** Process violations
- **Correction:** Auto-fix + score penalty
- **Examples:** Role validation, workflow phases

#### REQUIRED (Best Practice)
- **Prefix:** `**REQUIRED:**`
- **Violations:** Quality issues
- **Correction:** Auto-fix + warning
- **Examples:** Documentation, testing

#### RECOMMENDED (Enhancement)
- **Prefix:** `**RECOMMENDED:**`
- **Violations:** Missed optimizations
- **Correction:** Suggestion only
- **Examples:** Performance, parallel execution

## 4. Standard Behavioral Structure

Every behavioral file MUST follow this template:

```markdown
# [Behavior Name]

**[LEVEL]:** [Core directive]. Auto-correct violations.

**Purpose:** [One-line purpose]
**Type:** Core|Support|Integration
**Status:** ACTIVE

## MANDATORY RULES

### Rule 1 - ALWAYS
**MUST** [positive action]
**NEVER** [prohibited action]
**Auto-Correction:** [what happens on violation]

### Rule 2 - REQUIRED  
**MUST use** /icc-[command] for [action]
**PROHIBITED:** Manual [action] without command
**Auto-Correction:** Replace with /icc-[command]

## AUTO-CORRECTION

**[Violation Type]:** [Correction Action]
**[Violation Type]:** [Correction Action]

## ENFORCEMENT

**Tracking:** Via [method]
**Penalties:** -X.XP/Q for violations
**Bonuses:** +X.XP/Q for compliance streaks
```

## 5. Command Enforcement Pattern

### Before (Weak):
```markdown
Use /icc-memory-search before actions
```

### After (Strong):
```markdown
**MUST use** /icc-memory-search before ALL actions
**Auto-Correction:** If skipped, auto-execute search
```

## 6. Integration Strategy

### Phase 1: Core Behaviors (P0)
1. lean-workflow-executor.md
2. role-assignment-validator.md  
3. config-loader.md
4. learning-team-automation.md

### Phase 2: Support Behaviors (P1)
1. All shared-patterns/*.md
2. System behaviors (autonomy, l3, etc.)
3. Enforcement behaviors

### Phase 3: Commands (P2)
1. Update all /icc- commands
2. Add auto-correction handlers
3. Document enforcement

## 7. Token Optimization

### Efficient Patterns:
- **One-line headers** save 50-100 tokens per file
- **Compact rules** using bullet format
- **Shared patterns** reduce duplication
- **Auto-correction tables** vs verbose descriptions

### Before (150 tokens):
```markdown
This behavior ensures that all task creation follows the established patterns including having the role specified in the title and having at least three subtasks defined for proper granularity and tracking.
```

### After (50 tokens):
```markdown
**MANDATORY:** Role-in-title + 3 subtasks. Auto-fix violations.
```

## 8. Validation Mechanisms

### Compliance Checking:
```markdown
/icc-validate-compliance [behavior_name]
/icc-check-enforcement [file_path]
/icc-report-violations [time_period]
```

### Auto-Correction Verification:
```markdown
/icc-test-correction [violation_type]
/icc-verify-fix [behavior_name]
```

## 9. Implementation Checklist

### Per-File Updates:
- [ ] Add enforcement header (CRITICAL/MANDATORY/REQUIRED)
- [ ] Replace "Use" with "MUST use" 
- [ ] Add "ALWAYS/NEVER" prefixes
- [ ] Define auto-corrections
- [ ] Add tracking/penalty info

### System-Wide:
- [ ] Create enforcement-patterns.md
- [ ] Update command definitions
- [ ] Add validation commands
- [ ] Test auto-corrections
- [ ] Document in CLAUDE.md

## 10. Success Metrics

### Enforcement Coverage:
- **Goal:** 100% of behaviors have enforcement headers
- **Goal:** 100% of commands use "MUST use" language
- **Goal:** 100% have auto-correction defined

### Compliance Tracking:
- **Metric:** Violations per session
- **Metric:** Auto-corrections applied
- **Metric:** Compliance score trends

## Conclusion

This enforcement design transforms the intelligent-claude-code system from suggestion-based to mandate-based operation. By using:
- **Standardized headers** for immediate recognition
- **Auto-correction** instead of blocking
- **Clear hierarchy** for appropriate responses
- **Token-efficient** patterns

We achieve 100% mandatory adoption while maintaining system fluidity and developer experience.

---
*Design by @AI-Architect for BUG-059 TASK-006*