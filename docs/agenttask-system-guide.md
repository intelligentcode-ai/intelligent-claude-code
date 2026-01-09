# AgentTask System Guide

## What is the AgentTask System?

The **AgentTask** system replaces complex multi-step workflows with self-contained execution blueprints. Based on proven methodologies, AgentTasks provide everything needed for single-pass, autonomous execution by specialist roles.

## Key Benefits

1. **Single-Pass Execution** - No workflow interruptions or context loss
2. **Self-Contained** - All context, standards, examples embedded in AgentTask
3. **Autonomous Operation** - Specialists execute independently with full context
4. **Token-Optimized** - Load only what's needed, when needed
5. **Project-Adaptive** - Respects your structure and standards
6. **Version-Controlled Memory** - Team learnings shared via git
7. **Systematic Validation** - Evidence-based completion verification with comprehensive checks
8. **Template Enforcement** - Mandatory template usage with zero-tolerance blocking
9. **Configuration Embedding** - Complete config resolution at generation time, no runtime lookups
10. **Automatic Generation** - Revolutionary zero-touch AgentTask creation with intelligent work detection
11. **Seamless Execution** - Work requests automatically trigger AgentTask generation and specialist execution

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

### 3. AgentTask Generation
Mandatory template selected from agenttask-templates/ based on complexity:
- **Nano (0-2)**: Trivial one-line changes - 4-step execution process
- **Tiny (3-5)**: Simple single-file tasks - 7-step execution process
- **Medium (6-15)**: Standard features - 9-step execution process
- **Large (16-30)**: Complex with sub-AgentTasks - Sequential coordination
- **Mega (30+)**: System-wide changes - Epic-level coordination

All templates use standardized execution processes with mandatory template usage and complete placeholder resolution at generation time.

### 4. Context Integration
AgentTask includes everything from your project:
- Architecture patterns
- Existing code examples
- External documentation
- Project standards
- **Embedded learnings from memory/** - Past solutions and patterns

### 5. Agent System Execution
AgentTasks execute through the 14-role virtual team system:
- **Direct @Agent Communication**: Natural @Role mentions trigger Task tool subagent creation
- **Context Preservation**: Complete AgentTask context passed to executing subagent
- **Behavioral Patterns**: Embedded behavioral patterns guide specialist execution
- **Dynamic Specialist Creation**: Unlimited specialists created when technology expertise needed
- **Self-Contained Execution**: No workflow steps, complete blueprint for implementation
- **Built-in Validation**: Evidence-based completion verification
- **Automatic Learning Capture**: Successful patterns stored in memory/

## AgentTask Structure

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
agenttask_configuration:
  # Directory structure configuration
  directory_structure:
    
  # Code search configuration
  code_pattern_search:
    enabled: true
    paths: ["src/", "lib/"]     # Your code
    
  # Behavioral customization
  behavioral_overrides:
    error_handling: "defensive"
    testing_approach: "tdd"

```

## Commands

Note: The system now uses only 3 essential commands. Most interaction is through @Role communication:

- `/icc-init-system` - Initialize virtual team system
- `/icc-get-setting [key]` - Get configuration values

Primary interaction: @Role communication (@PM, @Developer, @AI-Engineer, etc.)

## Example

```bash
# User request
"Add rate limiting to API"

# System analyzes → Medium complexity (score: 12)
# Generates Medium AgentTask with:
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
3. **Draft Support** - Create drafts anywhere, generate AgentTasks
4. **Let System Adapt** - AgentTasks include YOUR standards automatically

The AgentTask system makes AI development predictable, efficient, and adapted to YOUR project!
