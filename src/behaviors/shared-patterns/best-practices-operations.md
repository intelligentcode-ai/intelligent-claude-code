# Best-Practices Operations

**MANDATORY:** Best-practices search, application, and generation. Auto-correct violations.

## Structure
**Directory**: best-practices/[category]/[practice-name].md
**Categories**: architecture, collaboration, development, git, operations, quality, security

## File Format
Type, Applies To (AgentTask sizes), Keywords, Description, Implementation, Quality Gates, Examples.

## Operations

### SearchBestPractices
1. Analyze work type → 2. Map to directories → 3. Find .md files → 4. Parse content → 5. Score relevance (keyword, size, technology, context) → 6. Select top 2-3 (max 1000 tokens) → 7. Return for AgentTask embedding

### GenerateBestPractice
1. Analyze memory pattern for reusability → 2. Assign category → 3. Create file with standard format → 4. Populate Description, Implementation, Quality Gates, Examples → 5. Generate .md file → 6. Validate format

### Work Type Mapping
implement/create/build → development, quality / fix/update/modify → development, quality / architecture/design → architecture, development / security → security, development / deploy/configure/setup → operations, collaboration / git → git, collaboration / test/quality → quality, development / team/coordination → collaboration, operations

## Scoring
Score (0-10 each): Keyword match, AgentTask size match, technology alignment, context alignment.
Selection: Calculate total → Rank → Token limit (1000) → Threshold (6+) → Diversity across categories.

## AgentTask Integration
Embed 2-3 most relevant practices with title, implementation points, quality gates. Apply token limit.

## Generation Triggers
Promote memory pattern to best-practice when: 3+ uses, quality impact, reusability, broad applicability.
Process: Monitor memory → Evaluate impact → Generate practice → Store in category → Update index.

---
*Best-practices operations for search, application, and generation*