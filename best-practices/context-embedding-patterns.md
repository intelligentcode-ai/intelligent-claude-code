# Context Embedding Patterns

## Overview
Embed complete project context in AgentTasks for self-contained execution without runtime dependencies.

## Core Principle

**Self-Contained Execution**
AgentTasks must include ALL necessary context to execute in isolation without external lookups.

## Required Context Elements

### Project Context
- **CLAUDE.md**: Complete project documentation
- **System Nature**: AI-AGENTIC, CODE, or HYBRID classification
- **Project Root**: Absolute project path
- **Project Boundaries**: What's in scope vs out of scope
- **Architecture Patterns**: Project-specific design patterns
- **Coding Standards**: Style guides and conventions

### Configuration Context
- **All Settings**: Embedded from configuration hierarchy
- **No Runtime Lookups**: All config values pre-resolved
- **Environment Variables**: Needed values embedded
- **Feature Flags**: Current state embedded
- **API Endpoints**: Service URLs and keys (references, not values)

### Memory Context
- **Search Results**: Relevant patterns from memory/
- **Similar Solutions**: Past approaches to similar problems
- **Lessons Learned**: Errors to avoid, patterns to apply
- **Troubleshooting**: Known issues and resolutions

### Best Practices Context
- **Applicable Practices**: Relevant to work type
- **Quality Gates**: Validation criteria
- **Implementation Patterns**: Proven approaches
- **Anti-Patterns**: Approaches to avoid

### File Context
- **Critical Files**: Content samples when needed
- **Dependencies**: Related files and their relationships
- **Code Examples**: Existing patterns to follow
- **Test Examples**: Testing patterns from project

## Context Embedding Process

### 1. Analyze Work Requirements
- Identify all information needed for execution
- Determine external dependencies
- List configuration values required
- Identify memory topics to search

### 2. Gather Context
- Load CLAUDE.md project context
- Search memory for relevant patterns
- Load applicable best practices
- Retrieve configuration values
- Sample critical file content

### 3. Resolve All Placeholders
- Replace `[FROM_CONFIG]` with actual values
- Replace `[PROJECT_ROOT]` with absolute path
- Replace `[SYSTEM_NATURE]` with classification
- Replace `[MEMORY_SEARCH:topic]` with results
- Replace `[CRITICAL_FILES]` with content

### 4. Validate Completeness
- Zero unresolved placeholders
- All config values embedded
- Memory patterns included
- Best practices applied
- File content available

## Self-Contained Execution

### What Agent Receives
```yaml
agenttask:
  project_context:
    root: "/absolute/path/to/project"
    nature: "AI-AGENTIC"
    claude_md: |
      [Complete CLAUDE.md content embedded]

  configuration:
    git:
      privacy: true
      branch_protection: true
    workflow:
      version_bump: true
      changelog_required: true

  memory_patterns:
    - pattern: "Authentication via JWT"
      source: "memory/authentication/jwt-patterns.md"
      lesson: "Always validate token expiration"

  best_practices:
    - practice: "Error handling"
      gates: ["Try-catch blocks", "Meaningful messages"]

  critical_files:
    - path: "src/auth/middleware.js"
      content: |
        [Relevant code sample embedded]
```

### What Agent Does NOT Need
- Runtime config file access
- Memory search during execution
- Best practices loading during execution
- External file reading (content pre-embedded)
- Network calls for documentation

## Common Pitfalls

### Runtime Config Lookups
**WRONG**:
```yaml
configuration:
  git_privacy: "[FROM_CONFIG:git.privacy]"  # Unresolved!
```

**CORRECT**:
```yaml
configuration:
  git_privacy: true  # Pre-resolved value
```

### Missing CLAUDE.md
**WRONG**:
```yaml
project_context:
  note: "See CLAUDE.md for details"  # Agent can't access!
```

**CORRECT**:
```yaml
project_context:
  claude_md: |
    [Complete CLAUDE.md content here]
```

### Relative Paths
**WRONG**:
```yaml
project_root: "./src"  # Relative path fails!
```

**CORRECT**:
```yaml
project_root: "/absolute/path/to/project/src"
```

### External Dependencies
**WRONG**:
```yaml
memory: "Search memory/ during execution"  # Can't access!
```

**CORRECT**:
```yaml
memory_patterns:
  - [All relevant patterns pre-embedded]
```

## Quality Checklist

Before deploying AgentTask:

- ☐ All placeholders resolved
- ☐ CLAUDE.md content embedded
- ☐ System nature classified
- ☐ Project root absolute path
- ☐ All config values embedded
- ☐ Memory search results included
- ☐ Best practices embedded
- ☐ Critical files content sampled
- ☐ No runtime dependencies
- ☐ Self-contained execution possible

During agent execution:

- ☐ Agent uses embedded context only
- ☐ No external file reads
- ☐ No config file lookups
- ☐ No memory searches
- ☐ Isolated execution successful

## Integration Points

### With Template System
- Templates define placeholder patterns
- Context embedding resolves placeholders
- Validation ensures completeness
- No placeholders in final AgentTask

### With Memory System
- Memory search before AgentTask creation
- Results embedded in context
- No runtime memory access needed
- Agent works with embedded patterns

### With Configuration System
- Load from hierarchy during creation
- Embed all needed values
- No runtime config lookups
- Complete settings available

### With Best Practices
- Load applicable practices during creation
- Embed quality gates and patterns
- No runtime practice loading
- Agent applies embedded guidance

## Examples

### Complete Context Embedding

**Before Embedding**:
```yaml
agenttask:
  project_root: "[PROJECT_ROOT]"
  system_nature: "[SYSTEM_NATURE]"
  git_privacy: "[FROM_CONFIG:git.privacy]"
  memory: "[MEMORY_SEARCH:authentication]"
  claude_md: "[LOAD_CLAUDE_MD]"
```

**After Embedding**:
```yaml
agenttask:
  project_root: "/Users/dev/my-project"
  system_nature: "AI-AGENTIC"
  git_privacy: true
  memory_patterns:
    - pattern: "JWT authentication with refresh tokens"
      source: "memory/authentication/jwt.md"
      lesson: "Validate expiration before use"
  claude_md: |
    # Project Overview
    [Complete CLAUDE.md content...]
```

### Self-Contained Execution Example

**Agent Receives**:
```yaml
agenttask_tiny_001:
  complexity: 3_points
  template: tiny

  complete_context:
    project:
      root: "/absolute/path"
      nature: "CODE"
      architecture: "Microservices with event-driven patterns"

    configuration:
      git: {privacy: true, branch_protection: true}
      workflow: {version_bump: true, changelog: true}

    memory:
      - "Error handling: Try-catch with specific messages"
      - "Testing: Unit tests required for all functions"

    best_practices:
      - "SOLID principles"
      - "DRY - extract common patterns"

    files:
      "src/auth/index.js": |
        [Existing code pattern to follow...]

  requirements:
    - "Implement password reset functionality"
    - "Follow existing authentication patterns"
    - "Add unit tests"
```

**Agent Executes**:
1. Uses embedded context exclusively
2. No external lookups needed
3. Follows embedded patterns
4. Applies embedded best practices
5. Completes in isolation

## Success Metrics

- Zero runtime config lookup failures
- No missing context errors
- 100% self-contained execution rate
- Single-pass completion >90%
- Agent isolation maintained
