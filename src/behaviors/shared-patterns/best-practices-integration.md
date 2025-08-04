# Best-Practices Integration Patterns

**MANDATORY:** Use best-practices auto-discovery during PRB generation. Auto-correct violations.

**PURPOSE:** Automatically discover and inject methodological approaches into PRBs

## Auto-Discovery Process

### Search Pattern
1. **Analyze Work Request**: Extract keywords, work type, complexity level
2. **Scan best-practices/**: Search all subdirectories for relevant practice files
3. **Score Relevance**: Match keywords, work type, complexity to practice metadata
4. **Select Top Practices**: Choose 2-3 most relevant practices (max 800 tokens)
5. **Inject Content**: Replace template placeholders with dynamic practice content

### Practice File Structure
```markdown
# Practice Name

**Type:** [development|architecture|operations|security|quality|collaboration]
**Applies To:** [complexity_levels, work_types]
**Keywords:** keyword1, keyword2, keyword3

## Description
Brief description of the practice

## Implementation
Specific guidance for this practice

## Quality Gates
- [ ] Checklist item 1
- [ ] Checklist item 2

## Examples
Code or configuration examples
```

### Discovery Algorithm
```
SearchBestPractices(work_request, complexity, work_type):
  1. keywords = ExtractKeywords(work_request)
  2. practices = ScanDirectory("best-practices/")
  3. scored_practices = []
  
  4. For each practice in practices:
       score = 0
       if MatchKeywords(practice.keywords, keywords): score += 3
       if MatchWorkType(practice.applies_to, work_type): score += 2
       if MatchComplexity(practice.applies_to, complexity): score += 1
       if RecentlyUsed(practice): score += 0.5
       scored_practices.append((practice, score))
  
  5. top_practices = SortByScore(scored_practices)[:3]
  6. return FormatForInjection(top_practices)
```

## Template Placeholder Replacement

### Standard Placeholders
- `[PROJECT_CODING_STYLE]` → Discovered coding practices
- `[ARCHITECTURE_CONSTRAINTS]` → Relevant architectural practices
- `[QUALITY_STANDARDS]` → Applicable quality practices
- `[SECURITY_REQUIREMENTS]` → Security practice guidelines
- `[OPERATIONS_APPROACH]` → DevOps/GitOps practices
- `[COLLABORATION_STYLE]` → Team coordination practices

### Dynamic Injection Process
1. **Load Template**: Load PRB template with placeholders
2. **Discover Practices**: Run auto-discovery for work request
3. **Map Placeholders**: Match discovered practices to template placeholders
4. **Replace Content**: Inject practice content into template
5. **Validate Result**: Ensure no placeholders remain

## Integration Points

### With PRB Generation
- Called during PRB auto-trigger after memory search
- Embeds discovered practices into PRB complete_context
- Replaces template placeholders with actual practice content

### With Template System
- Works with all PRB templates (Nano through Mega)
- Uses template hierarchy for practice discovery
- Respects project-specific practice overrides

### With Memory System
- Complementary to memory search (practices vs. learnings)
- Both embedded in PRB for complete context
- No runtime lookups needed during execution

## Practice Organization

### Directory Structure
```
best-practices/
├── development/     # TDD, Clean Code, SOLID principles
├── architecture/    # Design patterns, architectural principles
├── operations/      # DevOps, GitOps, Infrastructure as Code
├── security/        # DevSecOps, security practices
├── quality/         # Quality assurance methodologies
└── collaboration/   # Team practices and coordination
```

### Practice Categories
- **Development**: Coding practices, testing approaches, code quality
- **Architecture**: Design patterns, system architecture, technical debt
- **Operations**: Deployment, monitoring, infrastructure management
- **Security**: Security reviews, compliance, vulnerability management
- **Quality**: Testing strategies, quality gates, validation processes
- **Collaboration**: Team coordination, code reviews, knowledge sharing

## Error Handling

### Missing Practices
- **NO_PRACTICES_FOUND**: Use template defaults, log for improvement
- **INVALID_PRACTICE_FORMAT**: Skip malformed practices, continue with others
- **PRACTICE_ACCESS_ERROR**: Log error, continue with available practices

### Placeholder Resolution
- **UNRESOLVED_PLACEHOLDERS**: Replace with generic guidance
- **MULTIPLE_MATCHES**: Use highest scored practice
- **CONFLICTING_PRACTICES**: Prefer project-specific over system defaults

## Performance Optimization

### Caching Strategy
- **Practice Index**: Cache practice metadata for 15 minutes
- **Keyword Extraction**: Cache work request analysis for 5 minutes
- **Discovery Results**: Cache per work request for session

### Search Optimization
- **Metadata Index**: Pre-index practice metadata for fast lookup
- **Keyword Matching**: Use efficient string matching algorithms
- **File Scanning**: Only scan modified files on subsequent runs

## Usage Examples

### GitOps Work Request
**Request**: "Deploy application using GitOps"
**Discovered**: operations/gitops-practices.md
**Injected**: GitOps deployment patterns and quality gates

### Clean Architecture Enhancement
**Request**: "Refactor to Clean Architecture"
**Discovered**: architecture/clean-architecture.md, development/clean-code-practices.md
**Injected**: Clean Architecture principles and code quality standards

### Security Review
**Request**: "Security review for authentication"
**Discovered**: security/devsecops-integration.md, security/auth-security.md
**Injected**: Security review checklist and authentication best practices

---
*Best-practices integration patterns for intelligent-claude-code system*