# PRB System Guide

## What is the PRB System?

The **Product Requirement Blueprint (PRB)** system replaces complex multi-step workflows with self-contained execution blueprints. Based on proven PRP (Product Requirement Prompt) methodology, PRBs provide everything needed for single-pass, autonomous execution by specialist roles.

## Key Benefits

1. **Single-Pass Execution** - No workflow interruptions or context loss
2. **Self-Contained** - All context, standards, examples embedded in PRB
3. **Autonomous Operation** - Specialists execute independently with full context
4. **Token-Optimized** - Load only what's needed, when needed
5. **Project-Adaptive** - Respects your structure and standards
6. **Version-Controlled Memory** - Team learnings shared via git
7. **Systematic Validation** - Evidence-based completion verification with comprehensive checks

## How It Works

### 1. Work Request
User requests work through natural language or @Role mention:
```
"Build user authentication"
# OR
"@Developer implement OAuth2 login"
```

### 2. Complexity Analysis
System automatically analyzes complexity:
- Files affected
- Code volume
- External integrations
- Security implications
- Coordination requirements

### 3. PRB Generation
Appropriate template selected based on complexity:
- **Nano (0-2)**: Trivial one-line changes
- **Tiny (3-5)**: Simple single-file tasks
- **Medium (6-15)**: Standard features
- **Large (16-30)**: Complex with sub-PRBs
- **Mega (30+)**: System-wide changes

### 4. Context Integration
PRB includes everything from your project:
- **Best practices from best-practices/** - Methodological approaches (GitOps, TDD, DevSecOps, etc.)
- Architecture patterns
- Existing code examples
- External documentation
- Project standards
- **Embedded learnings from memory/** - Past solutions and patterns

### 4a. Best-Practices Auto-Discovery
The system automatically discovers and injects relevant methodological approaches:
- **Scans best-practices/** directory during PRB generation
- **Matches practices** to work type and complexity
- **Injects top 2-3 practices** into PRB context (max 800 tokens)
- **Replaces template placeholders** with dynamic content
- **No template modification needed** - system handles injection automatically

### 5. Specialist Execution
Appropriate @Role executes with full context:
- No workflow steps to follow
- Complete blueprint for implementation
- Built-in validation criteria
- Automatic learning capture

## PRB Structure

```yaml
# Self-contained execution blueprint
id: "AUTO-GENERATED"
title: "[Role] Clear description"

# GOAL - What we're building
goal:
  summary: "One sentence deliverable"
  success_criteria:
    - "Measurable outcome"

# WHY - Business rationale
why:
  business_value: "Why this matters"
  user_impact: "How it helps users"

# CONTEXT - Everything needed (embedded)
context:
  project_settings: "From CLAUDE.md"
  embedded_standards: |
    [Your coding standards HERE]
  code_examples: |
    [Existing patterns HERE]
  reference_docs: |
    [Documentation HERE]
  embedded_learnings: |
    # From memory/authentication/oauth2-patterns.md
    [Complete pattern content embedded]
    # From memory/errors/api-failures.md
    [Complete learning content embedded]

# IMPLEMENTATION - Blueprint
implementation:
  approach: "Technical approach"
  tasks: "Specific steps"
  pseudocode: "Implementation flow"

# VALIDATION - How we verify
validation:
  unit_tests: "Executable tests"
  acceptance_criteria: "User requirements"

# COMPLETION - Definition of done
completion:
  deliverables: "What gets created"
  learning_capture: 
    - "New patterns → memory/Pattern/"
    - "Error solutions → memory/Learning/"
    - "Domain knowledge → memory/Knowledge/"
```

## Configuration

In your CLAUDE.md:

```yaml
prb_configuration:
  # Directory structure configuration
  directory_structure:
    best_practices_path: "best-practices"    # Auto-discovered practices location
    
  # Code search configuration
  code_pattern_search:
    enabled: true
    paths: ["src/", "lib/"]     # Your code
    
  # Behavioral customization
  behavioral_overrides:
    error_handling: "defensive"
    testing_approach: "tdd"

# Best-practices system automatically discovers practices from:
# best-practices/development/     - Coding practices (TDD, Clean Code)
# best-practices/architecture/    - Design patterns and principles
# best-practices/operations/      - GitOps, DevOps, Infrastructure
# best-practices/security/        - DevSecOps, security practices
# best-practices/quality/         - Quality assurance methodologies
# best-practices/collaboration/   - Team practices and coordination
```

## Commands

- `/icc-create-prb` - Generate PRB for work
- `/icc-analyze-complexity` - Preview complexity score
- `/icc-generate-prb-from-draft` - Create from your drafts

## Example

```bash
# User request
"Add rate limiting to API"

# System analyzes → Medium complexity (score: 12)
# Generates Medium PRB with:
- Your API standards embedded
- Existing middleware patterns
- Rate limiting best practices
- Executable tests
- Everything @Developer needs

# Specialist executes autonomously
# Work completes in single pass
```

## Best Practices

1. **Configure CLAUDE.md** - Tell system where your docs are
2. **Natural Structure** - Work in your preferred layout
3. **Draft Support** - Create drafts anywhere, generate PRBs
4. **Let System Adapt** - PRBs include YOUR standards automatically

The PRB system makes AI development predictable, efficient, and adapted to YOUR project!