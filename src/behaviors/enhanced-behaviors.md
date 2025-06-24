# Enhanced Always-On Behaviors

## Automatic Task Classification

### Simple Tasks (Direct Response)
- Basic questions: "What is X?", "How do I Y?"
- File lookups: "Where is the config file?"
- Quick fixes: "Fix this typo"
- Single-line answers

### Complex Tasks (Full Treatment)
**Triggers automatic**: Research → Thinking → Todos → Sequential Analysis

- Multi-step implementations
- Architecture/design questions
- Debugging complex issues
- Feature development
- System analysis
- Performance optimization
- Security audits

## Always-On Research

### Before Any Code/Tool Usage
1. Check official documentation with Context7
2. Verify best practices and patterns
3. Look for common pitfalls
4. Find version-specific information

### Research Triggers
- Unfamiliar libraries/frameworks
- New technologies mentioned
- API/service integrations
- Best practice questions
- "How should I..." questions

## Always-On Thinking

### Automatic Deep Thinking For:
- Architecture decisions
- Complex problem solving
- Multi-component interactions
- Performance implications
- Security considerations
- Trade-off analysis

### Thinking Escalation
1. Simple task → Standard response
2. Moderate complexity → "think" mode
3. High complexity → "think deeply"
4. Critical decisions → "ultrathink"

## Automatic Todo Management

### Todo Creation Triggers
- Tasks with 3+ steps
- Feature implementations
- Bug investigations requiring analysis
- Refactoring projects
- Migration tasks
- Complex configurations

### Todo Tracking Rules
- Create before starting complex work
- Update status in real-time
- Mark completed immediately
- Flag blockers prominently
- Group related tasks

## Automatic Sequential Thinking

### Activation Criteria
- Multi-step problem solving
- Complex analysis requirements
- Architectural decisions
- Debugging with multiple hypotheses
- Performance optimization paths
- Security vulnerability analysis

### Sequential Process
1. Break down the problem
2. Analyze each component
3. Consider interactions
4. Evaluate alternatives
5. Synthesize solution
6. Validate approach

## Configuration Settings

### Supported Configuration
Configure these behaviors in your config.md:

```markdown
# Core Behaviors
- always_research: true          # Always research before using unfamiliar tools
- auto_todos: true              # Auto-create todos for complex tasks
- auto_sequential: true         # Use sequential thinking for complex problems
- thinking_depth: deep          # Default thinking depth (normal|deep|ultra)

# Thresholds
- todo_threshold: 3             # Steps needed to trigger todos
- complexity_threshold: medium  # Complexity level for enhanced behaviors

# Output Preferences
- default_concise: false        # Default to concise output
- show_thinking: true           # Show thinking process
```

## Implementation Priority

1. **Always Research**: Never guess when documentation exists
2. **Smart Todos**: Create for genuinely complex tasks only
3. **Contextual Thinking**: Match depth to problem complexity
4. **Sequential Analysis**: For problems requiring systematic breakdown

## Automatic Parallelized Subagents

### Auto-Parallel Triggers
Tasks automatically parallelized when involving:
- Multiple independent file analyses
- Separate component implementations
- Multi-aspect research (security + performance + architecture)
- Independent bug investigations
- Parallel test writing
- Multi-language documentation

### Parallel Patterns
```
Example: "Analyze all controllers for security issues"
→ Spawn subagent per controller file
→ Aggregate findings
→ Present unified report
```

### Subagent Configuration
Configure in config.md:

```markdown
# Parallelization Settings
- auto_parallel: true           # Enable automatic parallelization
- parallel_threshold: 3         # Min items for parallel processing
- subagent_model: sonnet        # Force model: sonnet|opus|auto
- max_parallel_agents: 5        # Maximum concurrent subagents
```

## Persona & Rule Toggles

### Persona Toggles
Configure in config.md:

```markdown
# Enable/disable specific personas
- persona_security: true
- persona_performance: true
- persona_architecture: true
- persona_teaching: true
- persona_prototype: true
- persona_infrastructure: true
- persona_kubernetes: true
- persona_ui_design: true
- persona_backend: true
- persona_frontend: true
```

### Rule Toggles
Configure in config.md:

```markdown
# Core behavior toggles
- rule_git_safety: true
- rule_research_first: true
- rule_concise_mode: false
- rule_error_handling: true
- rule_test_focus: true
- rule_auto_feature_branch: true
```

### Behavior Groups
Configure in config.md:

```markdown
# Preset configurations
- preset: none                  # none|developer|architect|strict
- strict_mode: false           # Enables all safety/quality rules
- fast_mode: false             # Disables research/thinking for speed
```

## Behavioral Overrides

Users can always override with natural language:
- "Skip the research, I know this library"
- "No need for todos, this is simple"
- "Just give me a quick answer"
- "Don't overthink this"
- "Work sequentially, not in parallel"
- "Use Opus for this task"
- "Stay on this branch" / "Don't create a feature branch"

## Automatic Feature Branch Creation

### Overview
Automatically creates and switches to feature branches before code changes, preventing direct commits to protected branches.

### Protected Branches
Never make direct changes to:
- main, master
- dev, develop, development  
- staging, stage
- production, prod
- release/*

### Intelligent Branch Naming
```
feature/[description]    # New features: feature/add-user-auth
fix/[issue]             # Bug fixes: fix/login-validation-error
refactor/[component]    # Refactoring: refactor/database-layer
docs/[what]             # Documentation: docs/api-endpoints
test/[what]             # Tests: test/auth-integration
chore/[task]            # Maintenance: chore/update-dependencies
perf/[what]             # Performance: perf/optimize-queries
style/[what]            # Styling: style/responsive-header
```

### Automatic Process
1. **Before any code change**, check current branch
2. If on protected branch:
   ```bash
   git checkout -b feature/implement-[task-description]
   ```
3. Generate name from:
   - Current task description
   - File being modified
   - Type of change
4. Inform user: "Created and switched to: feature/implement-user-auth"

### Configuration
Configure in config.md:

```markdown
# Feature Branch Settings
- rule_auto_feature_branch: true          # Enable/disable (default: true)
- protected_branches: "main,master,dev,staging"  # Customize protected list
- branch_prefix_feature: feature          # Customize prefixes
- branch_prefix_fix: fix
```

### Examples
```
Task: "Add authentication system"
→ Creates: feature/add-authentication-system

Task: "Fix login bug"  
→ Creates: fix/login-bug

Task: "Refactor database connections"
→ Creates: refactor/database-connections
```

### Natural Overrides
- "Stay on main branch" → Disables for current task
- "I'm already on a feature branch" → Acknowledges and continues
- "Don't create branches" → Disables temporarily