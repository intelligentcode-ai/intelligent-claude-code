# Template Process Integration Behavior

**MANDATORY:** Integrate templates with @PM process and validation tools for unified workflow.

**PURPOSE:** Coordinate template improvements, process enhancements, and validation into unified system

## Integration Architecture

### Component Integration
**INTEGRATION FLOW:**

1. **Simplified Templates**: Clear execution processes, standardized placeholders, consistent structures
2. **Enhanced @PM Process**: Complete placeholder resolution, configuration embedding, validation enforcement
3. **Validation Tools**: Comprehensive placeholder detection, pre-execution validation, subagent protection

### End-to-End Workflow

**COMPLETE INTEGRATION PROCESS:**

1. **Template Loading**:
   - @PM loads template from src/prb-templates/
   - Template contains standardized placeholders
   - Clear execution steps and sections provided

2. **Placeholder Resolution**:
   - @PM extracts configuration from CLAUDE.md
   - @PM gathers project context and system nature
   - @PM replaces ALL placeholders with actual values

3. **Validation Enforcement**:
   - Automatic validation scans for remaining placeholders
   - Quality gates ensure completeness
   - Blocks execution if any placeholders remain

4. **Subagent Execution**:
   - Subagent receives self-contained PRB
   - Clear step-by-step execution process
   - No configuration dependencies

## Template-Process Coordination

### Template Simplification Benefits
- **Reduced Cognitive Load**: Clear structure easier for @PM to process
- **Standardized Placeholders**: Consistent patterns across all templates
- **Clear Instructions**: Obvious what @PM needs to fill in
- **Error Reduction**: Fewer opportunities for @PM mistakes

### Process Enhancement Benefits
- **Systematic Resolution**: 5-phase methodology prevents skipped steps
- **Configuration Accuracy**: Actual values embedded vs placeholders
- **Quality Gates**: Validation at each phase prevents error accumulation
- **Error Recovery**: Clear guidance when validation fails

### Validation Integration Benefits
- **Pre-Creation Blocking**: Prevents PRB creation with unresolved placeholders
- **Configuration Validation**: Ensures actual values vs placeholder patterns
- **Content Authenticity**: Verifies story-specific content vs template boilerplate
- **Subagent Protection**: Prevents runtime failures from incomplete context

## Quality Assurance Integration

### Template Quality
- All templates from src/prb-templates/ hierarchy
- Standardized placeholder patterns
- Clear step-by-step execution processes
- Consistent section structures

### Process Quality
- Systematic @PM methodology adoption
- Complete placeholder resolution
- Configuration accuracy validation
- Quality gate enforcement

### Validation Quality
- Zero unresolved placeholders in final PRBs
- All configuration values embedded
- All content story-specific and measurable
- All PRBs self-contained for subagent execution

## Integration Success Patterns

### Template Usage Success
- 100% template usage from src/prb-templates/
- Zero manual PRB creation attempts
- Complete template structure compliance
- Standardized placeholder resolution

### Process Execution Success
- Systematic @PM resolution methodology
- Error prevention through validation gates
- Configuration accuracy improvement
- Quality assurance throughout process

### Validation Enforcement Success
- Pre-creation error detection and blocking
- Configuration validation accuracy
- Content authenticity verification
- Subagent execution readiness assurance

## Error Prevention and Recovery

### Integrated Error Prevention
- Template structure prevents malformed PRBs
- Systematic process prevents missed placeholders
- Quality gates prevent incomplete PRBs reaching subagents
- Validation tools provide automatic error detection

### Recovery Mechanisms
- Template compliance guidance for structure errors
- Systematic resolution process for placeholder errors
- Validation failure guidance with specific fixes
- Integration troubleshooting for complex issues

## Implementation Patterns

### Template-First Pattern
- Always start with appropriate template from src/prb-templates/
- Use template structure to guide @PM process
- Validate template compliance throughout

### Process-Driven Pattern
- Follow systematic 5-phase @PM methodology
- Validate each phase before proceeding
- Apply quality gates throughout process

### Validation-Enforced Pattern
- Block creation with unresolved placeholders
- Enforce configuration value authenticity
- Validate content specificity and measurability
- Ensure subagent execution readiness

---
*Template process integration for intelligent-claude-code system*