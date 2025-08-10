# Execution Validation Patterns

**PURPOSE:** Shared validation patterns for PRB execution

## Detailed Validation Checklists

### Functional Requirements
- All deliverables created/modified
- Acceptance criteria met
- Code changes correct
- Dependencies handled
- Edge cases addressed

### Processual Requirements  
- PRB template followed
- Role assignments complete
- Complexity appropriate
- Quality standards met
- Documentation updated

### Review Validation
- SME identified
- Review executed
- Feedback addressed
- Approval received
- Quality gates passed

### Success Criteria
- Acceptance validated
- Performance met
- Security satisfied
- Integration tested
- System stable

### Knowledge Capture
- Learnings documented
- Memory entities created
- Patterns captured
- Errors improved
- Metrics recorded

### Git Operations
- Changes staged
- Commits follow privacy
- Branches managed
- Changes pushed
- Status clean

### PRB Lifecycle
- Git ops complete
- Log updated
- Dependencies notified
- Follow-ups created
- State validated
- PRB moved to completed/

## Scope Validation Function

```
ValidateProjectScope(operation_context):
  project_root = get_project_root()
  
  FOR each operation:
    IF write to ~/.claude/ AND NOT installation:
      BLOCK with SCOPE_VIOLATION_ERROR
    IF outside project_root:
      BLOCK with BOUNDARY_ERROR
  
  RETURN VALIDATION_PASSED
```

## Evidence Collection

```markdown
## VALIDATION LOG
### Search: grep -r "PATTERN" .
Results: [DOCUMENTED]
Zero remaining: ✓/❌

### Deliverables: 
Requirements met: ✓/❌
Specifications: ✓/❌
Quality gates: ✓/❌

### Documentation:
README updated: ✓/❌
All docs checked: ✓/❌
Consistency: ✓/❌
```

---
*Shared validation patterns extracted from prb-execution.md*