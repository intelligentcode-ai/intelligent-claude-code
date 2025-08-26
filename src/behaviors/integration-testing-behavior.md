# Integration Testing Behavior

**MANDATORY:** Test template and process integration to ensure reliable subagent execution.

**PURPOSE:** Verify templates work with @PM process and validation tools

## Testing Framework

### Test Categories

**1. TEMPLATE LOADING TESTS**
- Verify templates load correctly from src/prb-templates/
- Confirm all required sections present
- Validate placeholder patterns are consistent

**2. RESOLUTION PROCESS TESTS**  
- Test @PM placeholder resolution with actual values
- Verify configuration extraction from CLAUDE.md
- Confirm context gathering and embedding

**3. VALIDATION TESTS**
- Test placeholder detection after resolution
- Verify quality gates catch incomplete PRBs
- Confirm validation blocks unresolved placeholders

**4. SUBAGENT EXECUTION TESTS**
- Test subagent can execute resolved PRBs
- Verify no configuration dependencies remain
- Confirm execution steps are clear and actionable

## Template Integration Tests

### Standard Template Test Workflow
1. **Load Template**: Load from src/prb-templates/
2. **Verify Placeholders**: Confirm standard placeholders present
3. **Apply @PM Process**: Extract config, gather context, resolve placeholders
4. **Validate Resolution**: Run placeholder detection, confirm none remain
5. **Test Execution**: Verify process is clear and executable

### Expected Results
- Template loads with standard placeholders
- @PM process resolves all placeholders with actual values
- Validation confirms zero placeholders remain
- Execution process is clear and actionable

## Process Integration Tests

### @PM Resolution Process Test
1. **Configuration Extraction**: Load from CLAUDE.md and config hierarchy
2. **Context Gathering**: Project root, system nature, critical files
3. **Placeholder Resolution**: Replace ALL placeholders with actual values
4. **Validation Gates**: Comprehensive validation before PRB creation

### Quality Gates Test
- **Pre-Creation Gate**: Block PRB creation with unresolved placeholders
- **Configuration Gate**: Validate actual config values vs placeholders
- **Content Gate**: Verify story-specific content vs template boilerplate
- **Final Gate**: Comprehensive validation before subagent execution

## Validation Tool Tests

### Placeholder Detection Test
- Scan for any remaining "[...]" patterns
- Validate configuration values are actual types
- Confirm content is story-specific
- Ensure paths are absolute

### Quality Assurance Test
- Template source validation
- Placeholder resolution completeness
- Configuration type accuracy
- Content authenticity verification

## Execution Readiness Tests

### Subagent Context Test
- PRB contains complete embedded context
- No runtime configuration lookups needed
- Self-contained execution environment
- Clear actionable steps

### Success Criteria
- Zero unresolved placeholders in final PRB
- All configuration values are actual (not placeholders)
- Content is story-specific and measurable
- Execution steps are clear and actionable

## Error Recovery Tests

### Template Loading Failures
- Missing template files
- Invalid template structure
- Placeholder pattern inconsistencies

### Resolution Process Failures
- Configuration loading errors
- Context gathering failures
- Placeholder resolution incomplete

### Validation Failures
- Unresolved placeholders detected
- Invalid configuration types
- Template boilerplate content

## Integration Success Metrics

### Quality Metrics
- **Template Compliance**: 100% use of src/prb-templates/
- **Resolution Accuracy**: 100% placeholder resolution rate
- **Validation Coverage**: All PRBs pass comprehensive validation
- **Execution Success**: All PRBs executable by subagents

### Process Metrics
- **@PM Process Adoption**: Systematic 5-phase methodology
- **Error Prevention**: Early detection and correction
- **Quality Gates**: Multiple validation checkpoints
- **Integration Harmony**: All components work together

---
*Integration testing behavior for intelligent-claude-code system*