# PRB Validation Integration Behavior

**MANDATORY:** Comprehensive validation integrating templates, @PM processes, and placeholder detection.

**PURPOSE:** End-to-end validation ensuring complete integration between all system improvements.

## Core Integration Principle

**VALIDATION AS BEHAVIORAL ENFORCEMENT**: Transform validation from manual checking to automatic behavioral pattern enforcement.

## Integration Points

### Template Simplification Integration
**GOAL:** Ensure simplified templates work seamlessly with @PM processes

**Template Enhancements:**
- Simplified structure with clear placeholder sections
- Obvious instructions for @PM placeholder resolution
- Reduced cognitive load while maintaining completeness
- Standardized placeholder patterns for better error detection

### PM Process Enhancement Integration
**GOAL:** Enhanced @PM behavioral patterns for systematic placeholder resolution

**Process Improvements:**
- Systematic 5-phase placeholder resolution process
- Data gathering before placeholder filling
- Comprehensive validation checkpoints
- Error recovery guidance by error type

### Validation Tool Integration
**GOAL:** Automatic error detection and prevention throughout PRB lifecycle

**Validation Enhancements:**
- Pre-creation validation gates
- Progressive checkpoint validation during resolution
- Configuration type validation
- Content authenticity verification
- Final quality assurance before subagent execution

## Complete Integration Workflow

### Phase 1: Template Loading with Validation
1. **Load Template**: From src/prb-templates/ with structure validation
2. **Placeholder Inventory**: Identify all placeholders requiring resolution
3. **Validation Setup**: Prepare validation checkpoints for resolution phases
4. **Error Prevention**: Block template usage if structure invalid

### Phase 2: Enhanced @PM Resolution Process
1. **Configuration Phase**: Load actual config values, validate types
2. **Context Phase**: Gather project context, validate completeness  
3. **Content Phase**: Extract story requirements, validate authenticity
4. **Integration Phase**: Combine all resolved values, validate consistency
5. **Final Phase**: Complete PRB with embedded context, validate readiness

### Phase 3: Comprehensive Validation
1. **Placeholder Detection**: Scan for any remaining "[...]" patterns
2. **Configuration Validation**: Verify all config values are actual
3. **Content Validation**: Confirm all content is story-specific
4. **Quality Validation**: Ensure PRB meets execution standards
5. **Final Gate**: Block creation if any validation fails

### Phase 4: Execution Readiness
1. **Self-Contained Check**: Verify PRB needs no runtime config
2. **Context Completeness**: Confirm all needed context embedded
3. **Subagent Compatibility**: Ensure PRB executable in isolated context
4. **Quality Assurance**: Final validation before subagent deployment

## Behavioral Enforcement Patterns

### Template Compliance Enforcement
- **Block**: Manual PRB creation without templates
- **Enforce**: Use of src/prb-templates/ hierarchy only
- **Validate**: Template structure and placeholder completeness
- **Prevent**: Template bypass attempts

### Resolution Process Enforcement
- **Guide**: @PM through systematic 5-phase process
- **Validate**: Each phase before proceeding to next
- **Block**: Skipped phases or incomplete resolution
- **Recover**: Provide specific guidance for resolution failures

### Quality Gate Enforcement
- **Pre-Creation**: Block PRB creation with unresolved placeholders
- **Configuration**: Block invalid config types or placeholder values
- **Content**: Block template boilerplate or generic content
- **Final**: Block subagent execution with incomplete PRBs

## Integration Success Metrics

### Template Integration Success
- 100% template usage from src/prb-templates/
- Zero manual PRB creation attempts
- Complete placeholder resolution rate
- Template structure compliance

### Process Integration Success
- Systematic @PM methodology adoption
- Error prevention through validation
- Quality gate passage rate
- Resolution accuracy improvement

### Validation Integration Success
- Pre-creation error detection rate
- Configuration validation accuracy
- Content authenticity verification
- Execution readiness assurance

## Error Prevention and Recovery

### Integrated Error Prevention
- Template structure validation prevents malformed PRBs
- Systematic resolution prevents missed placeholders
- Quality gates prevent incomplete PRBs reaching subagents
- Behavioral enforcement prevents process violations

### Recovery Guidance
- **Template Errors**: Provide template compliance guidance
- **Resolution Errors**: Guide through systematic resolution process
- **Validation Errors**: Display specific validation failures and fixes
- **Integration Errors**: Provide integration troubleshooting

## Quality Assurance

### Integration Quality Gates
- All templates must pass structure validation
- All @PM processes must complete systematic resolution
- All validation tools must pass quality checks
- All PRBs must achieve execution readiness

### Success Patterns
- Template → Resolution → Validation → Execution pipeline
- Zero unresolved placeholders in final PRBs
- Complete context embedding for subagent execution
- Behavioral compliance throughout process

---
*PRB validation integration for intelligent-claude-code system*