# /icc:quality-gates Command Chain

**PURPOSE:** Mandatory quality validation before completion with auto-correction enforcement

## COMMAND EXECUTION

**TRIGGER:** EVERY completion, EVERY deliverable, EVERY task finalization
**PENALTY:** Q:-2.0 for bypassing quality gates (severe penalty)
**REQUIREMENT:** MANDATORY for ALL completions without exceptions

## /icc Command Examples
```bash
# Basic quality validation
/icc quality-gates --task "User authentication API"

# Comprehensive quality check
/icc quality-gates --full \
  --code-review "@Architect" \
  --security-scan "@Security-Engineer" \
  --test-coverage 90 \
  --documentation-check

# Feature completion validation
/icc quality-gates "Payment processing module" \
  --gates "completeness,security,performance,integration,documentation"

# Auto-correction trigger
/icc quality-gates --auto-correct "Failed API endpoints" \
  --delegate "@Developer" \
  --requirements "error-handling,validation,tests"
```

## QUALITY VALIDATION PROTOCOL

1. **Completeness Check** - Verify all requirements fully addressed
2. **Quality Standards** - Validate against established quality criteria
3. **Integration Validation** - Ensure proper integration with existing systems
4. **Security Review** - Mandatory security validation for all changes
5. **Documentation Compliance** - Verify documentation standards met

## QUALITY GATE STEPS

**STEP 1: COMPLETENESS VALIDATION**
```
Requirements: Verify all requirements fully addressed
Deliverables: Confirm all expected outputs delivered
Acceptance: Check against defined acceptance criteria
Coverage: Ensure no missing components or gaps
```

**STEP 2: QUALITY STANDARDS CHECK**
```
Code Quality: Validate coding standards and best practices
Architecture: Verify architectural principles followed
Performance: Check performance requirements met
Maintainability: Ensure code is maintainable and documented
```

**STEP 3: INTEGRATION VALIDATION**
```
Compatibility: Verify integration with existing systems
Dependencies: Check all dependencies properly handled
Testing: Validate comprehensive testing completed
Functionality: Confirm all functionality works as expected
```

**STEP 4: SECURITY REVIEW**
```
Vulnerabilities: Scan for security vulnerabilities
Credentials: Verify no exposed credentials or secrets
Permissions: Check proper access controls implemented
Compliance: Ensure security standards compliance
```

**STEP 5: DOCUMENTATION COMPLIANCE**
```
Documentation: Verify adequate documentation provided
Standards: Check documentation meets established standards
Completeness: Ensure all aspects properly documented
Accessibility: Confirm documentation is clear and accessible
```

## QUALITY CRITERIA

**CODE QUALITY:**
- Follows established coding standards
- Proper error handling and validation
- Clear naming and structure
- Adequate comments and documentation

**ARCHITECTURE QUALITY:**
- Follows architectural principles
- Proper separation of concerns
- Scalable and maintainable design
- Appropriate technology choices

**FUNCTIONAL QUALITY:**
- Meets all functional requirements
- Handles edge cases properly
- Provides good user experience
- Performs within acceptable parameters

**SECURITY QUALITY:**
- No security vulnerabilities
- Proper input validation
- Secure data handling
- Appropriate access controls

## AUTO-CORRECTION TRIGGERS

**QUALITY FAILURES:**
- Incomplete implementations → Auto-delegation back to implementation role
- Code quality issues → Auto-delegation to code review specialist
- Security violations → Auto-delegation to security engineer
- Documentation gaps → Auto-delegation to documentation role

**CORRECTION WORKFLOW:**
1. Identify specific quality issues
2. Auto-delegate to appropriate specialist role
3. Specify exact corrections needed
4. Require re-submission through quality gates
5. Continue until all gates passed

## ENFORCEMENT RULES

- **MANDATORY**: No completion without passing ALL quality gates
- **COMPREHENSIVE**: All quality dimensions must be validated
- **AUTO-CORRECTION**: Failed gates trigger automatic correction workflows
- **PENALTY**: Q:-2.0 severe penalty for bypass attempts
- **BLOCKING**: Quality gate failures block task completion

## QUALITY GATE CATEGORIES

**BASIC GATES** (Always Required):
- Completeness validation
- Basic quality standards
- Security review

**ADVANCED GATES** (Context Dependent):
- Performance validation
- Scalability review
- Integration testing
- User experience validation

**SPECIALIZED GATES** (Domain Specific):
- API design review
- Database schema validation
- UI/UX design review
- DevOps deployment validation

## COMMAND CHAIN FINALIZATION

**PASS ALL GATES:** → Task completion confirmed → Results stored in memory
**FAIL ANY GATE:** → Auto-correction workflow triggered → Re-delegation required
**BYPASS ATTEMPT:** → Q:-2.0 penalty → Forced quality validation