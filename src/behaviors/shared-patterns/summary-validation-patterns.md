# Summary Validation Patterns

**MANDATORY:** Validation rules and quality standards for execution summaries.

## Validation Rules

### Summary Completeness Validation
**REQUIRED ELEMENTS:**
- All 6 mandatory sections present
- Nine-step checklist with definitive status
- Functional requirements fully addressed
- Success criteria comprehensively validated
- File changes completely documented
- Git operations transparently reported
- Next steps clearly defined

### Status Indicator Requirements
**CHECKLIST STATUS RULES:**
- ✅ Only for fully completed items
- ❌ For incomplete or failed items
- No partial status indicators allowed
- Evidence required for all ✅ claims
- Clear documentation required for all ❌ items

## Error Handling

### Incomplete Execution Detection
**BLOCKED COMPLETION PATTERNS:**
- Any step showing ❌ status blocks AgentTask completion
- Missing checklist items trigger completion validation failure
- Partial implementations require clear documentation of remaining work
- Git operations failures prevent completion until resolved

### Recovery Patterns
**WHEN EXECUTION ISSUES DETECTED:**
1. **Document Issue**: Specific details in summary
2. **Assess Impact**: Determine if blocking or non-blocking
3. **Create Follow-up**: Generate additional AgentTask if needed
4. **Update Status**: Reflect actual completion status
5. **Provide Guidance**: Clear steps for resolution

## Quality Standards
**SUMMARY QUALITY REQUIREMENTS:**
- Professional tone without gamification elements
- Clear, factual reporting of completion status
- Specific details rather than generic confirmations
- Evidence-based validation rather than assumptions
- Transparent reporting of any issues or partial completions

---
*Validation patterns for comprehensive execution summary quality*