# Execution Summary Patterns

**MANDATORY:** Generate comprehensive execution summaries with checklists for all AgentTask completions.

## Imports

@./execution-validation.md
@./context-validation.md
@./workflow-enforcement-patterns.md
@./summary-validation-patterns.md

## Purpose

Provide transparent, comprehensive summaries at the end of every AgentTask execution to validate that all required steps have been completed successfully and maintain accountability in the autonomous execution process.

## Mandatory Summary Structure

### 1. Ten-Step Execution Checklist
**MANDATORY:** Every AgentTask execution MUST report status for all 10 standard steps:

```markdown
## 10-Step Execution Checklist
1. **Feature Branch Creation** → ✅/❌
2. **Knowledge Base Search** → ✅/❌
3. **Implementation** → ✅/❌
4. **Integration/Updates** → ✅/❌
5. **Version Management** → ✅/❌
6. **Documentation Updates** → ✅/❌
7. **Git Operations** → ✅/❌
8. **Remote Push** → ✅/❌
9. **Memory Storage** → ✅/❌
10. **PR Creation** (if required) → ✅/❌
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
**MANDATORY:** Confirm success criteria from AgentTask:

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

### 6. Memory Storage Summary
**MANDATORY:** Document automatic memory storage performed:

```markdown
## Memory Storage Summary
- Learning Patterns Stored: [Number and brief description of patterns stored]
- Memory Topics Updated: [List of topics where learnings were stored]
- Success Patterns Captured: [Specific successful approaches documented]
- Issue Resolutions Documented: [Problems and solutions stored for future reference]
- Security Validation Applied: ✅ [Confirm no sensitive data stored]
```

### 7. Next Steps Guidance
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
**MANDATORY:** All agents executing AgentTasks MUST generate execution summaries:
- Summary generation is built into Step 8 (Completion) of AgentTask execution
- No AgentTask can be marked complete without comprehensive summary
- Summary follows exact format specified above
- All checklist items must show definitive ✅/❌ status

### Integration with Validation Systems
**EXECUTION SUMMARY integrates with:**
- execution-validation.md patterns for validation checklists
- workflow-enforcement-patterns.md for git operations compliance
- context-validation.md for scope and boundary validation
- agenttask-execution.md for mandatory completion requirements

## Integration Points

### With AgentTask Execution Flow
- Execution summary generation is mandatory final step
- Summary validates all previous execution steps
- Integration with completion criteria validation
- Automatic AgentTask state transition based on summary validation

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
*Comprehensive execution summary patterns for transparent AgentTask completion validation*