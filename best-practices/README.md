# Best Practices System

**Dynamic injection system for methodological approaches into PRB generation**

## Overview

The best-practices system automatically discovers and injects methodological approaches and practices into PRBs during generation. This system follows the same auto-discovery pattern as the memory system but focuses on process and practice guidance.

## Directory Structure

```
best-practices/
├── development/     # Coding practices (TDD, Clean Code, SOLID)
├── architecture/    # Design patterns and architectural principles
├── operations/      # DevOps, GitOps, Infrastructure practices
├── security/        # DevSecOps, security practices
├── quality/         # Quality assurance methodologies
└── collaboration/   # Team practices and coordination
```

## Auto-Discovery Process

During PRB generation, the system:

1. **Scans best-practices/** directory for relevant practice files
2. **Matches practices** to work type and complexity
3. **Injects top 2-3 practices** into PRB context (max 800 tokens)
4. **Replaces template placeholders** with dynamic content

## Practice File Format

Create `.md` files in appropriate subdirectories:

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

## Integration with PRB Generation

The system automatically:
- **Discovers** relevant practices based on work request analysis
- **Scores** practices by relevance, recency, and project context
- **Embeds** selected practices into PRB complete_context
- **Replaces** template placeholders like `[CODING_STYLE]` with actual practice content

## Supported Methodologies

The system supports ANY methodological approach:
- **GitOps** (operations/gitops-practices.md)
- **Configuration-First** (architecture/config-first-design.md)
- **DevSecOps** (security/devsecops-integration.md)
- **Test-Driven Development** (development/tdd-practices.md)
- **Clean Architecture** (architecture/clean-architecture.md)
- **Infrastructure as Code** (operations/iac-practices.md)

## Usage

1. **Add practices**: Create `.md` files in appropriate subdirectories
2. **Use keywords**: Include relevant keywords for auto-discovery
3. **Specify scope**: Define what work types and complexity levels apply
4. **Let system work**: PRB generation automatically discovers and injects

## Template Integration

Replaces hardcoded placeholders:
- `[PROJECT_CODING_STYLE]` → Dynamic coding practices
- `[ARCHITECTURE_CONSTRAINTS]` → Relevant architectural practices
- `[QUALITY_STANDARDS]` → Applicable quality practices
- `[SECURITY_REQUIREMENTS]` → Security practice guidelines

## No Manual Template Modification

The system eliminates the need to modify PRB templates for customization. Simply add practice files and the auto-discovery mechanism handles injection automatically.

## Version Control

All best-practices are version controlled with the project, enabling:
- **Team consistency** across all PRB executions
- **Practice evolution** through normal git workflows
- **Project-specific** customization without system modification
- **Knowledge sharing** through documented practices