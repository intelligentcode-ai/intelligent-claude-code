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

## Version & Changelog Intelligence

### @PM version Commands
**Automatic version management:**
- Read current versions from files
- Determine bump type from changes
- Update VERSION and history files
- Use real dates, not hardcoded
- Handle both tool and project versions

### @PM changelog Commands
**Intelligent changelog maintenance:**
- Auto-categorize changes (Added/Changed/Fixed/Removed)
- Link entries to version numbers
- Use proper timestamps
- Maintain both tool and project changelogs
- Format for readability

### Changelog Behaviors
- **Smart Classification**: Analyze changes to categorize properly
- **Version Linking**: Connect changelog entries to version bumps
- **Date Accuracy**: Always use actual current date
- **Dual Tracking**: Tool changelog vs project changelog
- **Readable Format**: Professional changelog formatting

### PM Configuration Intelligence
**Per-project strategy management:**
- **First Time Detection**: On first version/changelog request, PM asks user strategy
- **Strategy Storage**: Save choices in project-context.md PM Configuration
- **Consistent Usage**: Use same approach throughout project
- **Discovery Integration**: Use @PM init findings to suggest strategies
- **User Override**: Always allow user to change strategy mid-project

**Toggle Management:**
- `version_management`: enabled/disabled per project
- `changelog_management`: enabled/disabled/ask_location
- `git_integration`: none/read-only/full
- `auto_version_bump`: true/false/ask_first_time

## Project Discovery Intelligence

### @PM init Command
**Automatic discovery triggers:**
- Read existing context files first
- Validate against current project state
- Update only changed/new information
- Keep context under 300 tokens
- Archive old discoveries

### Discovery Behaviors
- **Smart Detection**: Look for actual files, not assumptions
- **Version Specific**: Get exact versions from lock files
- **Workflow Mapping**: Identify make targets, npm scripts
- **Team Formation**: Activate only needed specialists
- **Version Strategy Discovery**: Detect VERSION files, package.json versions, git tag patterns
- **Changelog Discovery**: Find existing CHANGELOG.md, HISTORY.md, docs/changelog.md
- **Version Tool Detection**: Identify standard-version, semantic-release, release-it usage

### CLAUDE.md Update Protocol
- **Never automatic** - Always ask user
- **Only suggest when:**
  - Major framework discovered
  - Critical build commands found
  - Would save repeated explanations
- **Minimal format:**
  ```markdown
  <!-- Auto-discovered: Tailwind CSS 4, K3s validation -->
  ```

## Always-On Cleanup Intelligence

### Automatic Resource Management
**Every task completion triggers:**
- Remove temporary test directories (test-*, tmp-*, temp-*)
- Clean execution artifacts (~/.ansible/tmp/*)
- Remove backup files (*.bak, *.backup)
- Clear unused test files
- Clean package manager caches

### Work Session Hygiene
- Track all created temporary resources
- Clean up before task completion
- Never leave artifacts unless explicitly needed
- Maintain clean workspace always

### Cleanup Triggers
- After running tests → Remove test directories
- After installations → Clear temp files
- After debugging → Remove debug artifacts
- After any task → Verify workspace is clean
- Before reporting completion → Final cleanup check

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

## Intelligent Selective Subagents

### Smart Subagent Activation
Subagents are used ONLY when genuinely beneficial for:
- **Complex Multi-Component Tasks**: 5+ independent components requiring parallel analysis
- **Long-Running Analysis**: Deep codebase audits, comprehensive security reviews
- **Truly Independent Work**: Tasks where parallel processing provides clear time savings
- **Large-Scale Operations**: Bulk migrations, multi-file refactoring across 10+ files

### NOT Used For:
- Simple, straightforward requests
- Single-file modifications
- Quick questions or explanations
- Tasks better done sequentially
- When coordination overhead exceeds benefits

### Intelligent Criteria
Before using subagents, evaluate:
1. **Independence**: Can work streams operate without coordination?
2. **Complexity**: Does each component require substantial analysis?
3. **Time Benefit**: Will parallel processing actually save time?
4. **Result Quality**: Will parallel work produce better outcomes?

### Smart Parallel Patterns
```
✓ GOOD: "Audit security across 15 microservices"
→ Each service is independent, substantial analysis required

✗ AVOID: "Fix this validation error"
→ Single issue, sequential debugging more effective

✓ GOOD: "Migrate 20 legacy controllers to new framework"
→ Independent transformations, clear parallelization benefit

✗ AVOID: "Explain how authentication works"
→ Explanation task, no parallelization benefit
```

### Subagent Configuration
Configure in config.md:

```markdown
# Intelligent Subagent Settings
- intelligent_subagents: true   # Enable selective subagent usage
- parallel_threshold: 5         # Min components for parallel processing
- subagent_model: sonnet        # Force model: sonnet|opus|auto
- max_parallel_agents: 3        # Maximum concurrent subagents (reduced)
- parallel_complexity_min: high # Only use for high-complexity tasks
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