# Validation System

**MANDATORY:** Comprehensive validation for templates, processes, integration, and execution quality.

## Imports
@./shared-patterns/context-validation.md
@./shared-patterns/execution-validation.md
@./shared-patterns/template-enforcement.md

## Core Validation Framework

### Template Validation
**PRE-CREATION CHECKS:**
- Template source from hierarchy only
- Complete placeholder resolution (zero `[.*]` patterns)
- Complexity-appropriate template selection
- Configuration values embedded (no runtime lookups)

### Process Validation
**WORKFLOW COMPLIANCE:**
- @PM + Architect collaboration for role assignments
- Two-factor analysis documented
- Memory search completed before action
- Context completeness verified

### Integration Testing
**SYSTEM INTEGRATION:**
- Templates work with @PM processes
- Validation tools integrate smoothly
- Subagent execution compatibility
- End-to-end workflow functionality

### Execution Validation
**RUNTIME CHECKS:**
- Subagent context completeness
- No external dependency requirements
- Quality standards maintained
- Completion checklist compliance

## Validation Tools

### Comprehensive Validation
**AUTOMATED CHECKS:**
- Placeholder pattern scanning
- Template compliance verification
- Context completeness assessment
- Integration compatibility testing

### Progress Reporting
**CLEAN REPORTING:**
- Professional completion tracking
- Reliability-focused metrics
- No gamification elements
- Clear success/failure indicators

### Violation Detection
**REAL-TIME MONITORING:**
- Work intent vs information queries
- Direct execution without PRB attempts
- Role assignment bypass patterns
- Template compliance violations

## Quality Gates

### Pre-Execution Gates
1. **Template Compliance**: All template requirements met
2. **Context Completeness**: Full execution context available
3. **Role Assignment**: Appropriate specialist identified
4. **Integration Readiness**: All dependencies resolved

### Runtime Gates
1. **Execution Monitoring**: Progress tracking and error detection
2. **Quality Maintenance**: Standards upheld throughout execution
3. **Adaptation Handling**: Dynamic updates managed properly
4. **Resource Management**: Appropriate tool and system usage

### Post-Execution Gates
1. **Completion Verification**: All requirements satisfied
2. **Quality Assessment**: Standards met or exceeded
3. **Learning Capture**: Patterns documented for reuse
4. **Cleanup Completion**: All artifacts properly managed

## Error Handling

### Auto-Correction Patterns
- Template violations → Force compliant template usage
- Missing context → Systematic context gathering
- Role misassignment → Apply two-factor analysis
- Process bypass → Redirect to proper workflow

### Manual Intervention
- Complex validation failures requiring human input
- Context gathering failures needing clarification
- Integration issues requiring system-level fixes
- Quality standard violations requiring review

---
*Comprehensive validation system for quality assurance*