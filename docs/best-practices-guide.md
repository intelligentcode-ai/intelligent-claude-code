# Best-Practices Guide

**PURPOSE:** How to add your own best-practices to any project for automatic PRB injection

## Overview

The intelligent-claude-code system automatically discovers and injects best-practices from your project's `best-practices/` directory during PRB generation. This allows you to customize PRB templates without modifying the core system.

## Quick Start

1. Create `best-practices/` directory in your project root
2. Add practice files organized by category
3. PRB generation will automatically discover and inject your practices
4. Template placeholders like `[DYNAMIC_CODING_PRACTICES]` get replaced with your content

## Directory Structure

```
your-project/
├── best-practices/
│   ├── coding/
│   │   ├── style-guide.md
│   │   ├── patterns.md
│   │   └── standards.md
│   ├── architecture/
│   │   ├── design-principles.md
│   │   ├── patterns.md
│   │   └── constraints.md
│   ├── testing/
│   │   ├── strategy.md
│   │   ├── standards.md
│   │   └── automation.md
│   ├── security/
│   │   ├── guidelines.md
│   │   ├── compliance.md
│   │   └── review-checklist.md
│   └── deployment/
│       ├── pipeline.md
│       ├── environments.md
│       └── rollback.md
```

## Practice Categories

### Coding Practices (`best-practices/coding/`)
- **style-guide.md**: Code formatting, naming conventions, structure
- **patterns.md**: Reusable code patterns, design patterns
- **standards.md**: Quality standards, metrics, compliance

### Architecture Practices (`best-practices/architecture/`)
- **design-principles.md**: SOLID, DRY, architectural principles
- **patterns.md**: Microservices, event-driven, layered architectures
- **constraints.md**: Technology choices, scalability limits

### Testing Practices (`best-practices/testing/`)
- **strategy.md**: Test pyramid, coverage targets, automation
- **standards.md**: Test naming, structure, assertions
- **automation.md**: CI/CD integration, test environments

### Security Practices (`best-practices/security/`)
- **guidelines.md**: Secure coding, vulnerability prevention
- **compliance.md**: GDPR, SOX, industry requirements
- **review-checklist.md**: Security review criteria

### Deployment Practices (`best-practices/deployment/`)
- **pipeline.md**: Build, test, deploy automation
- **environments.md**: Dev, staging, production setup
- **rollback.md**: Rollback procedures, monitoring

## Template Placeholders

The system replaces these placeholders during PRB generation:

| Placeholder | Source | Description |
|-------------|--------|-------------|
| `[DYNAMIC_CODING_PRACTICES]` | `best-practices/coding/` | Code style, patterns, standards |
| `[DYNAMIC_ARCHITECTURE_PRACTICES]` | `best-practices/architecture/` | Design principles, constraints |
| `[DYNAMIC_TESTING_PRACTICES]` | `best-practices/testing/` | Test strategy, automation |
| `[DYNAMIC_SECURITY_PRACTICES]` | `best-practices/security/` | Security guidelines, compliance |
| `[DYNAMIC_DEPLOYMENT_PRACTICES]` | `best-practices/deployment/` | Pipeline, environments, rollback |

## Auto-Discovery Process

1. **Detection**: PRB generation scans for `best-practices/` directory
2. **Category Mapping**: Maps directories to placeholder types
3. **Content Extraction**: Reads markdown files and extracts content
4. **Injection**: Replaces template placeholders with discovered content
5. **Fallback**: Uses default practices if category not found

## File Format

Practice files should be standard markdown:

```markdown
# Coding Style Guide

## Naming Conventions
- Variables: camelCase
- Functions: camelCase  
- Classes: PascalCase
- Constants: UPPER_SNAKE_CASE

## Code Structure
- Maximum function length: 50 lines
- Maximum file length: 500 lines
- Prefer composition over inheritance

## Comments
- Document public APIs
- Explain complex algorithms
- Use JSDoc for JavaScript
```

## Integration with PRB Generation

The system automatically:
- Discovers your `best-practices/` directory
- Maps categories to template placeholders
- Injects relevant content during PRB generation
- Preserves your practices in version control
- Updates practices without system changes

## Examples

### Minimal Setup
```
project/
├── best-practices/
│   └── coding/
│       └── style-guide.md    # Basic coding standards
└── CLAUDE.md
```

### Comprehensive Setup
```
project/
├── best-practices/
│   ├── coding/              # 3-5 practice files
│   ├── architecture/        # Design principles
│   ├── testing/            # Test strategy
│   ├── security/           # Security guidelines
│   └── deployment/         # Pipeline practices
└── CLAUDE.md
```

### Team-Specific Practices
```
project/
├── best-practices/
│   ├── coding/
│   │   ├── javascript-guide.md
│   │   ├── react-patterns.md
│   │   └── node-standards.md
│   ├── architecture/
│   │   ├── microservices.md
│   │   └── event-sourcing.md
│   └── team/
│       ├── code-review.md
│       └── collaboration.md
└── CLAUDE.md
```

## Advanced Features

### Custom Categories
Create any directory structure - the system adapts:
```
best-practices/
├── frontend/          # Maps to [DYNAMIC_FRONTEND_PRACTICES]
├── backend/           # Maps to [DYNAMIC_BACKEND_PRACTICES]
├── database/          # Maps to [DYNAMIC_DATABASE_PRACTICES]
└── infrastructure/    # Maps to [DYNAMIC_INFRASTRUCTURE_PRACTICES]
```

### Practice Inheritance
- Project practices override system defaults
- Directory-specific practices override general ones
- File-specific practices are most specific

### Version Control
- Best-practices are version controlled with your project
- Changes tracked like any other project file
- Team collaboration through standard git workflows

## Migration Guide

### From Hardcoded Templates
1. Identify customized template values
2. Extract to appropriate practice files
3. Remove template customizations
4. Verify auto-injection works

### From Documentation
1. Extract best-practices from existing docs
2. Organize into category structure
3. Convert to markdown format
4. Test PRB generation with new practices

## Troubleshooting

### Practices Not Injected
- Verify `best-practices/` directory exists
- Check file permissions are readable
- Ensure markdown format is valid
- Check PRB template has appropriate placeholders

### Wrong Category Mapping
- Directory names map to placeholder names
- Use standard categories: coding, architecture, testing, security, deployment
- Custom directories create custom placeholders

### Content Too Long
- Keep practice files focused and concise
- Break large practices into multiple files
- System truncates overly long content

## Best Practices for Best-Practices

1. **Keep Focused**: Each file covers one specific area
2. **Stay Current**: Update practices as project evolves
3. **Be Specific**: Project-specific practices, not generic advice
4. **Version Control**: Treat as critical project documentation
5. **Team Alignment**: Ensure all team members contribute and follow
6. **Regular Review**: Update practices based on lessons learned

---

This system enables unlimited customization while maintaining the core PRB architecture. Your practices become part of every PRB automatically.