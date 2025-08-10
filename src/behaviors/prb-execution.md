# PRB Execution Behavior

**MANDATORY:** Enforce completion checklist. Auto-correct false completion claims.

## Imports
@./shared-patterns/learning-patterns.md
@./shared-patterns/template-loading.md
@./shared-patterns/execution-validation.md

## Task Tool Requirement

**CRITICAL:** ALL PRB execution via Task tool subagent ONLY.
- Block direct execution → Error: "❌ PRB requires Task tool subagent"
- Pattern: `Task(subagent_type='general-purpose', prompt='[PRB context]')`

## Mandatory Execution Checklist

### 6 Sections (ALL MANDATORY)
| Section | Requirements | Validation |
|---------|-------------|------------|
| 0. Task Tool | Verify subagent execution | BLOCKING if missing |
| 1. Context | Load settings, validate files | All values resolved |
| 2. Requirements | Execute functional/processual/technical | Every item complete |
| 3. Git Ops | Branch→Commit→PR→Merge | CHANGELOG before PR |
| 4. Knowledge | Capture learnings | Store in memory/ |
| 5. Review | SME review complete | Approval received |
| 6. Implementation | Apply samples | Patterns verified |

### Critical Settings
- **git_privacy: true** → NO AI mentions in commits
- **branch_protection** → Follow protection strategy
- **Project scope** → Operations within project root only
- **Memory** → Store in ./memory/ not ~/.claude/

## State Tracking

```
INITIALIZED → IN_PROGRESS → PENDING_REVIEW → PENDING_VALIDATION 
→ PENDING_KNOWLEDGE → PENDING_GIT → PENDING_LIFECYCLE → COMPLETE
```

State transitions require validation of previous state completion.

## Completion Validation

### Mandatory Before Completion
- [ ] All 6 sections executed completely
- [ ] Settings compliance verified
- [ ] Functional requirements met
- [ ] Process requirements followed
- [ ] Review approved by SME
- [ ] Success criteria validated
- [ ] Knowledge captured
- [ ] Git operations clean
- [ ] PRB moved to completed/ (FINAL STEP)

### Systematic Validation Protocol
1. **Search**: `grep -r "TERMS" .` for all changes
2. **Verify**: Each deliverable exists and works
3. **Document**: Evidence in validation log
4. **Confirm**: Zero remaining issues

## False Completion Detection

**Triggers**: "PRB COMPLETE" without checklist validation
**Action**: BLOCK → Display missing items → Reset state

**Auto-correction**:
```
❌ PRB COMPLETION BLOCKED
Missing: [unchecked items]
Action: Complete missing items
State: [current] → Required: COMPLETE
```

## Project Scope Enforcement

**BLOCKED Operations**:
- Write to ~/.claude/ (except installation)
- Access outside project root
- Memory in ~/.claude/memory/
- Global config changes

**Validation**: See shared-patterns/execution-validation.md

## Integration Points

- **PRB Enforcement**: Blocks direct work without PRB
- **Learning System**: Captures completion patterns
- **Git Operations**: Validates git compliance
- **Review System**: Mandates SME approval

## Error Recovery

- **Incomplete**: Identify missing → Reset state → Guide completion
- **False claim**: Block → Display validation → Ensure proper completion
- **State corruption**: Detect → Reset to last good → Rebuild from evidence

---
*Optimized: 654→~120 lines*