# Best Practices Integration

**MANDATORY:** Load and apply project best practices patterns.

## Purpose

Integrate project-specific best practices, coding standards, and architectural patterns into PRB execution for consistent quality and style adherence.

## Best Practices Loading

### Search Paths
**ORDERED HIERARCHY (All Sources Used):**
1. **Project Best-Practices**: best-practices/[category]/ directory structure
2. **Project Docs**: CLAUDE.md configured best_practices_paths
3. **Standard Locations**: docs/best-practices/, docs/standards/, docs/guidelines/
4. **Project Root**: best-practices.md, coding-standards.md, guidelines.md

### Loading Process
1. **Path Resolution**: Use configured paths or search standard locations
2. **Work Type Analysis**: Determine work category (architecture, development, security, etc.)
3. **Directory Mapping**: Map work type to best-practices subdirectories
4. **File Discovery**: Find relevant practice documents by category
5. **Content Parsing**: Extract practices, standards, and guidelines
6. **Relevance Scoring**: Score practices by work context and keywords
7. **Token Optimization**: Select top 2-3 most relevant (max 1000 tokens)
8. **Validation Rules**: Extract validation criteria and requirements

## Work Type to Best-Practices Directory Mapping

### Directory Structure Mapping
**WORK TYPES → BEST-PRACTICES DIRECTORIES:**
- **Architecture/Design Work** → architecture/, development/ (for design patterns)
- **Code Implementation** → development/, quality/ (for coding standards)
- **Security Work** → security/, development/ (for secure coding)
- **DevOps/Operations** → operations/, collaboration/ (for deployment practices)
- **Git/Version Control** → git/, collaboration/ (for workflow practices)
- **Quality/Testing** → quality/, development/ (for testing practices)
- **Team Coordination** → collaboration/, operations/ (for team practices)

### Category Content Types

**architecture/**: Configuration-first design, component patterns, system design
**collaboration/**: Agile practices, team coordination, communication patterns  
**development/**: Clean code, TDD, coding standards, implementation patterns
**git/**: Feature branch workflow, commit practices, versioning strategies
**operations/**: GitOps practices, deployment patterns, infrastructure patterns
**quality/**: Code review standards, testing practices, quality gates
**security/**: Secure coding practices, authentication patterns, compliance

## Best-Practices Search Process

### Work Type Detection
**WORK ANALYSIS STEPS:**
1. **Intent Classification**: Extract primary work intent (implement, fix, deploy, configure, etc.)
2. **Technology Detection**: Identify technology domains (database, API, security, infrastructure)
3. **Scope Assessment**: Determine architectural vs implementation vs operational scope
4. **Risk Assessment**: Identify security, quality, or compliance requirements

### Directory Search Strategy
**SEARCH PROCESS FOR EACH WORK TYPE:**
1. **Map Work Type**: Use work type to directory mapping above
2. **Search Primary Directories**: Search mapped directories first (e.g., architecture/ for design work)
3. **Search Secondary Directories**: Search related directories (e.g., development/ for architecture work)
4. **Parse Files**: Extract practices from matching .md files
5. **Score Relevance**: Score based on work keywords, PRB size, and context
6. **Select Top Matches**: Choose 2-3 most relevant practices (max 1000 tokens total)

### Relevance Scoring Logic
**SCORING FACTORS:**
- **Keyword Match**: Direct work type and technology keyword matches
- **PRB Size Match**: "Applies To" field matching PRB complexity (nano, tiny, medium, large, mega)
- **Context Relevance**: Work description alignment with practice description
- **Quality Gate Relevance**: Validation criteria applicable to current work

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

## Best-Practices Generation

### Pattern Promotion Criteria
**SUCCESSFUL PATTERN → BEST-PRACTICE PROMOTION:**
- **Frequency Threshold**: Pattern used successfully 3+ times across different PRBs  
- **Broad Applicability**: Pattern applicable beyond original context
- **Quality Impact**: Demonstrable improvement in code quality, maintainability, or efficiency
- **Reusability**: Pattern can be documented with clear guidelines and examples

### Generation Process
**STEPS TO GENERATE BEST-PRACTICE FROM PATTERN:**
1. **Pattern Analysis**: Analyze successful pattern for reusable elements
2. **Category Assignment**: Determine appropriate best-practices directory (architecture, development, etc.)
3. **Template Application**: Use best-practices template structure with Type, Applies To, Keywords
4. **Quality Gates**: Extract validation criteria and measurable requirements
5. **Documentation**: Create clear implementation guidance with examples
6. **File Creation**: Generate .md file in appropriate best-practices/[category]/ directory

### Auto-Generation Triggers
**AUTOMATIC BEST-PRACTICE CREATION:**
- Memory patterns reaching frequency threshold (3+ successful applications)
- PRB patterns with proven quality improvements
- Solution patterns preventing recurring issues
- Workflow optimizations with broad applicability
- Tool integration patterns with consistent success

---
*Best practices integration for consistent quality and standards*