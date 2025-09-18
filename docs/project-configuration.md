# Project Configuration Guide

The intelligent-claude-code system supports extensive project-level configuration to enforce coding standards, architecture patterns, and best practices.

## Related Documentation
- [Virtual Team Guide](virtual-team-guide.md) - Understanding the 14 roles
- [Commands Reference](commands-reference.md) - All available commands
- [AgentTask System Guide](prb-system-guide.md) - How AgentTasks work
- [Directory Structure](directory-structure.md) - File organization

## Directory Structure

```
project-root/
├── claude.md                  # Project context and configuration (root OR .claude/)
├── docs/                      # Project documentation (user's natural location)
│   ├── best-practices/        # Domain-specific best practices
│   │   ├── terraform.md       # IaC best practices
│   │   ├── react.md          # React patterns and standards
│   │   └── security.md       # Security guidelines
│   ├── architecture/          # Architecture documentation
│   │   ├── overview.md        # System architecture
│   │   ├── patterns.md        # Design patterns to follow
│   │   └── constraints.md     # Architecture constraints
│   └── standards/             # Coding standards
│       ├── style-guide.md     # Code formatting rules
│       ├── naming.md          # Naming conventions
│       └── testing.md         # Testing requirements
├── examples/                  # Code examples (or wherever user keeps them)
│   ├── auth/                  # Authentication examples
│   └── api/                   # API pattern examples
├── drafts/                    # Draft specifications (user's choice)
│   └── feature-x/             # Working drafts for new features
├── memory/                    # Learning storage (version-controlled)
│   └── [topic]/               # Organized by topic
│       └── [subtopic].md      # Learnings and patterns
└── prbs/                      # Generated AgentTasks (version-controlled)
    ├── ready/                 # Ready to execute
    └── completed/             # Executed AgentTasks
```

## Configuration in CLAUDE.md

```yaml
# Project Configuration
project:
  name: "My Awesome Project"
  type: "web-application"
  
# AgentTask Configuration
prb_configuration:
  # Include project best practices in all AgentTasks
  include_best_practices: true
  best_practices_paths:
    - "docs/best-practices/"     # User's documentation
    - "docs/standards/"          # User's standards
    - "best-practices/"          # Alternative location
    - "standards/"               # Alternative location
  
  # Search for code patterns
  code_pattern_search:
    enabled: true
    paths: ["src/", "lib/"]
    exclude: ["node_modules/", "dist/"]
  
  # External documentation
  external_docs:
    - name: "React Docs"
      context7_id: "/facebook/react"
    - name: "AWS Best Practices"
      url: "https://aws.amazon.com/architecture/well-architected/"
  
  # Behavioral customization
  behavioral_overrides:
    error_handling: "defensive"  # defensive, fail-fast, resilient
    testing_approach: "tdd"      # tdd, bdd, integration-first
    review_style: "thorough"     # quick, balanced, thorough
    
# Coding Standards
coding_standards:
  style: "airbnb"              # or google, standard, custom
  linting: true
  formatting: "prettier"
  
# Architecture Enforcement
architecture:
  pattern: "microservices"     # monolith, microservices, serverless
  constraints:
    - "All APIs must be RESTful"
    - "Use dependency injection"
    - "Follow SOLID principles"
```

## Using Project Configuration

### 1. Best Practices Inclusion
When AgentTasks are generated, they automatically include:
- Relevant best practices from your project
- Architecture patterns and constraints
- Coding standards and style guides

### 2. Code Pattern Search
The system searches your codebase for:
- Similar implementations
- Existing patterns to follow
- Examples to reference

### 3. External Documentation
AgentTasks can reference:
- Real-time library documentation via Context7
- Project-specific documentation URLs
- Architecture decision records (ADRs)

### 4. Behavioral Customization
Each project can override default behaviors:
- How errors are handled
- Testing methodology
- Code review depth
- Validation criteria

## Draft-Based AgentTask Generation

Place draft specifications wherever natural in your project:

```bash
# Create draft directory in your preferred location
mkdir -p drafts/new-feature/
# OR
mkdir -p docs/drafts/new-feature/
# OR
mkdir -p specs/new-feature/

# Add specifications
echo "User Authentication Requirements..." > drafts/new-feature/requirements.md

# Generate AgentTasks from drafts
/icc-generate-prb-from-draft drafts/new-feature/
```

The system will:
1. @PM analyzes requirements
2. @Architect designs approach
3. Generate appropriate AgentTasks with all project context
4. Include best practices and standards
5. Reference existing code patterns

## Dynamic Configuration

AgentTasks adapt to your project:
- **React Project**: Includes React best practices, component patterns
- **Terraform Project**: Includes IaC standards, module patterns  
- **API Project**: Includes RESTful patterns, OpenAPI specs
- **Microservices**: Includes service boundaries, communication patterns

## Benefits

1. **Consistency**: All work follows project standards
2. **Knowledge Reuse**: Leverages existing patterns
3. **Quality**: Enforces best practices automatically
4. **Flexibility**: Fully configurable per project
5. **Autonomy**: AgentTasks contain everything needed for execution