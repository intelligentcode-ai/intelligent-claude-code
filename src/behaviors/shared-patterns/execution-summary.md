# Execution Summary Patterns

**MANDATORY:** Generate comprehensive execution summaries with checklists for all PRB completions.

## Imports

@./execution-validation.md
@./context-validation.md
@./workflow-enforcement-patterns.md
@./summary-validation-patterns.md

## Purpose

Provide transparent, comprehensive summaries at the end of every PRB execution to validate that all required steps have been completed successfully and maintain accountability in the autonomous execution process.

## Mandatory Summary Structure

### 1. Nine-Step Execution Checklist
**MANDATORY:** Every PRB execution MUST report status for all 9 standard steps:

```markdown
## 9-Step Execution Checklist
1. **Feature Branch Creation** → ✅/❌
2. **Knowledge Base Search** → ✅/❌  
3. **Implementation** → ✅/❌
4. **Integration/Updates** → ✅/❌
5. **Version Management** → ✅/❌
6. **Documentation Updates** → ✅/❌
7. **Git Operations** → ✅/❌
8. **Remote Push** → ✅/❌
9. **PR Creation** (if required) → ✅/❌
```

### 2. Functional Requirements Validation
**MANDATORY:** Validate all functional requirements met:

```markdown
## Functional Requirements Checklist
- [ ] All primary deliverables created/modified
- [ ] Technical specifications satisfied
- [ ] Acceptance criteria met
- [ ] Dependencies properly handled
- [ ] Edge cases addressed
- [ ] Integration points verified
```

### 3. Success Criteria Verification
**MANDATORY:** Confirm success criteria from PRB:

```markdown
## Success Criteria Validation
- [ ] Completion definition requirements met
- [ ] Validation tests passed
- [ ] Performance indicators achieved
- [ ] Quality gates satisfied
- [ ] System integrity maintained
```

### 4. Files Modified Summary
**MANDATORY:** List all files created, modified, or deleted:

```markdown
## Files Modified
### Created:
- path/to/new/file.ext - Purpose and description

### Modified:
- path/to/existing/file.ext - Changes made and rationale

### Deleted:
- path/to/removed/file.ext - Reason for removal
```

### 5. Git Operations Summary
**MANDATORY:** Document all git operations performed:

```markdown
## Git Operations Summary
- Branch: feature/branch-name
- Commits: N commits with privacy filtering applied
- Push Status: Successfully pushed to remote
- PR Status: Created/Not Required per workflow settings
- Privacy Compliance: git_privacy setting validated and applied
```

### 6. Next Steps Guidance
**MANDATORY:** Provide clear next steps:

```markdown
## Next Steps
- Immediate Actions Required: [List any immediate follow-up actions]
- PR Review Process: [If PR created, describe review process]
- Dependencies Triggered: [Any follow-up work items needed]
- Validation Required: [Any manual validation needed]
```

## Implementation Requirements

### Summary Generation Enforcement
**MANDATORY:** All agents executing PRBs MUST generate execution summaries:
- Summary generation is built into Step 8 (Completion) of PRB execution
- No PRB can be marked complete without comprehensive summary
- Summary follows exact format specified above
- All checklist items must show definitive ✅/❌ status

### Integration with Validation Systems
**EXECUTION SUMMARY integrates with:**
- execution-validation.md patterns for validation checklists
- workflow-enforcement-patterns.md for git operations compliance
- context-validation.md for scope and boundary validation
- prb-execution.md for mandatory completion requirements

## Integration Points

### With PRB Execution Flow
- Execution summary generation is mandatory final step
- Summary validates all previous execution steps
- Integration with completion criteria validation
- Automatic PRB state transition based on summary validation

### With Quality Gates
- Summary serves as final quality gate validation
- Integration with all quality standard checkpoints
- Validation of template compliance and requirements satisfaction
- Evidence collection for execution accountability

### With Learning System
- Successful execution patterns captured for memory storage
- Issue patterns documented for future prevention
- Summary content provides learning input for pattern improvement
- Execution quality metrics tracked through summary analysis

---
*Comprehensive execution summary patterns for transparent PRB completion validation*