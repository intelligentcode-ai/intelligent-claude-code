# Best Practices System

**MANDATORY:** Best practices search, application, generation, and integration. Auto-correct violations.

## Purpose
Consolidated system for Best Practices Integration and Operations

## Best Practices Integration

### Core Function
Integrate project-specific best practices into AgentTask execution.

### Search Paths
**Hierarchy**: best-practices/[category]/ → CLAUDE.md paths → standard locations
**Categories**: architecture, development, security, operations, quality, git, collaboration

### Integration Points
**Loading Process**: Work type analysis → Directory mapping → Relevance scoring → Context embedding
**AgentTask Enhancement**: Embed relevant practices and validation criteria
**Pattern Generation**: Promote successful patterns (3+ uses) to best-practices

## Best Practices Operations

### Structure
**Directory**: `best-practices/[category]/[practice-name].md`
**Categories**: architecture, collaboration, development, git, operations, quality, security

### File Format
Required fields: Type, Applies To (AgentTask sizes), Keywords, Description, Implementation, Quality Gates, Examples

### Operations

**SearchBestPractices**:
1. Analyze work type → 2. Map to directories → 3. Find .md files → 4. Parse content → 5. Score relevance (keyword, size, technology, context) → 6. Select top 2-3 (max 1000 tokens) → 7. Return for AgentTask embedding

**GenerateBestPractice**:
1. Analyze memory pattern for reusability → 2. Assign category → 3. Create file with standard format → 4. Populate Description, Implementation, Quality Gates, Examples → 5. Generate .md file → 6. Validate format

### Work Type Mapping
- implement/create/build → development, quality
- fix/update/modify → development, quality
- architecture/design → architecture, development
- security → security, development
- deploy/configure/setup → operations, collaboration
- git → git, collaboration
- test/quality → quality, development
- team/coordination → collaboration, operations

### Scoring
Score (0-10 each): Keyword match, AgentTask size match, technology alignment, context alignment.
Selection: Calculate total → Rank → Token limit (1000) → Threshold (6+) → Diversity across categories.

### AgentTask Integration
Embed 2-3 most relevant practices with title, implementation points, quality gates. Apply token limit.

### Generation Triggers
Promote memory pattern to best-practice when: 3+ uses, quality impact, reusability, broad applicability.
Process: Monitor memory → Evaluate impact → Generate practice → Store in category → Update index.

## Integration Points
**With AgentTask System**: Load relevant practices during AgentTask generation, embed practices in AgentTask context, apply quality gates during execution
**With Memory System**: Promote memory patterns to best practices, track pattern usage frequency, cross-reference memory and practices
**With Learning System**: Capture successful patterns from execution, analyze pattern reusability, generate practices from proven patterns

## Quality Standards
**Practice Quality**: Clear, actionable implementation guidance, measurable quality gates, concrete examples, technology-specific when applicable, size-appropriate (matches AgentTask complexity)
**Selection Quality**: High relevance scores (6+ threshold), diverse category coverage, token budget compliance (1000 max), context-appropriate selection
**Generation Quality**: Proven reusability (3+ uses), demonstrable quality impact, broad applicability, standard format compliance

---
*Best practices system for consistent quality and pattern promotion*
