# Best Practices Integration

**MANDATORY:** Load and apply project best practices patterns.

## Purpose

Integrate project-specific best practices, coding standards, and architectural patterns into PRB execution for consistent quality and style adherence.

## Best Practices Loading

### Search Paths
**ORDERED HIERARCHY (First Found Wins):**
1. **Project Docs**: CLAUDE.md configured best_practices_paths
2. **Standard Locations**: docs/best-practices/, docs/standards/, docs/guidelines/
3. **Project Root**: best-practices.md, coding-standards.md, guidelines.md

### Loading Process
1. **Path Resolution**: Use configured paths or search standard locations
2. **File Discovery**: Find relevant practice documents
3. **Content Parsing**: Extract practices, standards, and guidelines
4. **Category Organization**: Group by type (coding, architecture, process, security)
5. **Validation Rules**: Extract validation criteria and requirements

## Practice Categories

### Coding Standards
- **Style Guidelines**: Formatting, naming conventions, code organization
- **Quality Standards**: Complexity limits, test coverage, documentation requirements
- **Language Patterns**: Preferred patterns, anti-patterns, best practices

### Architecture Patterns
- **Design Patterns**: Preferred architectural approaches
- **Component Structure**: Module organization and dependencies
- **Integration Patterns**: Service communication and data flow

### Process Standards
- **Workflow Requirements**: Version control, review processes
- **Documentation Standards**: Required documentation and formats
- **Testing Requirements**: Test types, coverage, validation

### Security Guidelines
- **Security Patterns**: Authentication, authorization, data protection
- **Compliance Requirements**: Regulatory and organizational requirements
- **Risk Mitigation**: Security best practices and controls

## PRB Integration

### Practice Application
**AUTOMATIC INTEGRATION:** Best practices automatically applied during PRB execution:
- **Quality Checks**: Validate against coding standards
- **Pattern Enforcement**: Apply architectural patterns
- **Process Compliance**: Ensure workflow requirements met
- **Security Validation**: Apply security guidelines

### Context Embedding
**PRB ENHANCEMENT:** Relevant practices embedded in PRBs:
- **Applicable Standards**: Only relevant practices for work type
- **Validation Criteria**: Specific quality gates and requirements
- **Pattern References**: Links to detailed guidelines and examples

## Validation Integration

### Pre-Execution Validation
**QUALITY GATES:** Validate PRB against applicable best practices:
- **Standard Compliance**: Ensure adherence to coding standards
- **Pattern Validation**: Verify architectural pattern usage
- **Process Requirements**: Confirm workflow compliance

### Execution Monitoring
**CONTINUOUS VALIDATION:** Monitor execution against practices:
- **Quality Metrics**: Track adherence to standards
- **Pattern Usage**: Verify correct pattern implementation
- **Process Compliance**: Ensure workflow requirements met

### Post-Execution Review
**COMPLETION VALIDATION:** Final validation against practices:
- **Standards Adherence**: Confirm final output meets standards
- **Pattern Implementation**: Verify correct pattern usage
- **Documentation Completeness**: Ensure required documentation

## Configuration

### Best Practices Paths
**CLAUDE.md Configuration:**
```yaml
best_practices_paths:
  - "docs/coding-standards/"
  - "docs/architecture-patterns/"
  - "docs/security-guidelines/"
```

### Practice Categories
**Organized Application:** Practices applied based on work context:
- **Code Changes**: Coding standards and quality requirements
- **Architecture Work**: Architecture patterns and design guidelines
- **Security Changes**: Security guidelines and compliance requirements
- **Process Work**: Workflow and documentation requirements

## Error Handling

**MISSING PRACTICES**: Continue with system defaults if project practices not found
**INVALID FORMAT**: Log errors and use available valid practices
**LOADING FAILURES**: Graceful degradation with system standards

## Memory Integration

**PRACTICE PATTERNS**: Store successful practice applications
**VIOLATION PATTERNS**: Learn from practice violations and corrections
**IMPROVEMENT TRACKING**: Track practice adherence improvements over time

---
*Best practices integration for consistent quality and standards*