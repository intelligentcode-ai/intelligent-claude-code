# Hook System Guide

The intelligent-claude-code system uses a sophisticated hook architecture to enforce behavioral patterns and provide educational guidance. This guide covers the complete hook system, including enforcement mechanisms and the dynamic reminder system.

## Overview

The hook system provides multiple integration points within Claude Code to ensure proper behavioral patterns and educational guidance:

- **Behavioral Enforcement**: Prevent unauthorized patterns through pre-tool validation
- **Educational Guidance**: Dynamic reminder system for learning system patterns
- **Work Intent Classification**: Intelligent detection of work vs information requests
- **Memory Integration**: Automatic memory consultation and storage reminders

## Hook Architecture

### Hook Types

The system implements several hook types for different behavioral enforcement needs:

| Hook Type | Purpose | When Executed | Enforcement Level |
|-----------|---------|---------------|-------------------|
| **PreToolUse** | Validate and block unauthorized patterns | Before tool execution | **BLOCKING** |
| **PostToolUse** | Educational reminders and learning capture | After tool execution | **EDUCATIONAL** |

### Hook Components

```
src/hooks/
├── pre-tool-use.js           # Main enforcement hook
├── post-tool-use.js          # Educational reminder hook
└── lib/
    ├── intent-classifier.js  # Work vs information classification
    ├── config-loader.js      # Configuration management
    ├── reminder-loader.js    # Dynamic reminder system
    └── reminders.json        # Default reminder definitions
```

## Pre-Tool-Use Hook

The pre-tool-use hook enforces behavioral patterns before tool execution:

### Enforcement Patterns

1. **Work Intent Detection**: Distinguishes between work requests and information queries
2. **Tool Classification**: Categorizes tools as work, planning, or information
3. **Scope Validation**: Ensures work follows Main → AgentTask → Agent pattern
4. **Blocking Logic**: Prevents unauthorized direct execution

### Intent Classification

The system uses sophisticated classification to determine user intent:

```javascript
// Work Intent (Triggers AgentTask Creation)
const workIntents = [
  'implement', 'create', 'build', 'fix', 'deploy',
  'configure', 'setup', 'modify', 'update', 'refactor'
];

// Information Intent (Direct Response)
const infoIntents = [
  'show', 'display', 'explain', 'list', 'check',
  'analyze', 'describe', 'status', 'what', 'how'
];
```

### Blocking Behavior

When unauthorized patterns are detected:

1. **Log Violation**: Record the attempted pattern
2. **Block Execution**: Return exit code 2 to prevent tool usage
3. **Provide Guidance**: Show clear error message with correction
4. **Suggest Alternative**: Recommend proper @Role pattern

## Post-Tool-Use Hook

The post-tool-use hook provides educational guidance and learning reinforcement:

### Educational Reminder System

**Purpose**: Help users learn system patterns through contextual guidance

**Features**:
- Dynamic JSON-based configuration
- Multi-location loading with priority order
- User and project-level customization
- 25+ behavioral reminders across multiple categories

**Display Frequency**:
- Educational tools (Read, Grep, Glob): 15% chance
- Modification tools (Edit, Write): 5% chance
- Other tools: 5% chance

**📖 For complete documentation**: See [Hook Reminder System Documentation](hooks/reminder-system.md)

### Reminder Categories

#### Pre-Action Reminders
Shown before tool execution to reinforce patterns:
- Memory consultation requirements
- Best practices integration
- Workflow architecture compliance
- PM role boundaries
- Template enforcement

#### Post-Action Reminders
Educational guidance after tool execution:
- @Role communication patterns
- AgentTask workflow reminders
- Memory-first approach guidance
- System boundary education
- Learning storage encouragement

### Dynamic Loading System

The reminder system loads from multiple locations with clear priority:

```
1. Project-local: .claude/hooks/reminders.json (highest)
2. User-global: ~/.claude/hooks/reminders.json (medium)
3. System default: ~/.claude/hooks/lib/reminders.json (fallback)
```

## Configuration and Customization

### System Configuration

The hook system respects project and user configuration:

```yaml
# In CLAUDE.md or config.md
hook_configuration:
  reminder_frequency: 0.10        # 10% chance for reminders
  educational_mode: true          # Enable educational reminders
  enforcement_level: "standard"   # standard | strict | permissive
```

### Custom Reminders

#### Project-Level Customization

Create `.claude/hooks/reminders.json` in your project:

```json
{
  "preAction": [
    {
      "category": "Project Standards",
      "message": "📋 Check project-specific standards before implementation",
      "icon": "📋",
      "principle": "Project consistency requires following established patterns"
    }
  ],
  "postAction": [
    {
      "category": "Team Process",
      "message": "💬 Update team channel with progress",
      "principles": ["Team coordination", "Status transparency"]
    }
  ]
}
```

#### User-Global Customization

Create `~/.claude/hooks/reminders.json` for personal preferences:

```json
{
  "preAction": [
    {
      "category": "Personal Workflow",
      "message": "⏰ Check calendar before starting deep work",
      "icon": "⏰",
      "principle": "Time management improves focus and productivity"
    }
  ]
}
```

## Installation and Deployment

### Automatic Deployment

Both installation methods deploy the hook system:

**Linux/macOS (Ansible):**
```bash
make install    # Deploys hooks to ~/.claude/hooks/
```

**Windows (PowerShell):**
```powershell
.\install.ps1 install    # Deploys hooks with Windows integration
```

### Hook Registration

Hooks are automatically registered in Claude Code's `settings.json`:

```json
{
  "hooks": {
    "preToolUse": {
      "script": "/path/to/.claude/hooks/pre-tool-use.js"
    },
    "postToolUse": {
      "script": "/path/to/.claude/hooks/post-tool-use.js"
    }
  }
}
```

### Verification

Verify hook installation:

```bash
# Check hook files exist
ls ~/.claude/hooks/

# Check hook registration
cat ~/.config/claude-desktop/settings.json | grep hooks

# Test hook functionality (triggers educational reminder)
echo "Test message" | ~/.claude/hooks/post-tool-use.js
```

## Behavioral Enforcement Patterns

### Work vs Information Detection

The system distinguishes between different request types:

**Work Requests (Trigger AgentTask):**
- "Implement user authentication"
- "Fix the login bug"
- "Deploy to production"
- "Setup CI/CD pipeline"

**Information Requests (Direct Response):**
- "Show me the current status"
- "Explain how authentication works"
- "What files are in the src directory?"
- "How does the memory system work?"

### @Role Pattern Enforcement

The system enforces proper @Role usage:

**Correct Patterns:**
```bash
@PM Build a user management system    # Project coordination
@Developer Implement OAuth2 login     # Technical implementation
@DevOps-Engineer Setup monitoring     # Operations work
```

**Blocked Patterns:**
```bash
# Direct work without proper delegation
"Let me implement this feature"       # Missing @Role assignment
"I'll fix this bug quickly"          # Bypassing AgentTask workflow
```

### Main Scope Protection

The hook system prevents direct work execution in main scope:

**Allowed in Main Scope:**
- AgentTask creation and delegation
- @Role coordination and communication
- Information requests and status queries
- Memory consultation and pattern search

**Blocked in Main Scope:**
- Direct file modifications (Edit/Write/MultiEdit)
- System changes without AgentTask context
- Implementation work without specialist assignment
- Configuration changes without proper workflow

## Troubleshooting

### Common Issues

**Hooks not executing:**
- Check file permissions: hooks should be executable
- Verify registration: check settings.json for hook entries
- Check file paths: ensure hooks exist at registered locations

**Reminders not showing:**
- Verify reminder files exist and are readable
- Check JSON syntax in custom reminder files
- Restart Claude Code after reminder customization

**Enforcement not working:**
- Check pre-tool-use hook is registered and executable
- Verify intent classification is working properly
- Check console output for hook execution logs

### Debug Information

Enable debug output for hooks:

```javascript
// In hook files, add debug logging
console.log('Hook executed:', { tool, parameters, timestamp: new Date() });
```

View hook execution in Claude Code console or debug mode.

### Testing Hooks

Test hook functionality manually:

```bash
# Test pre-tool-use hook
echo '{"tool": "Edit", "parameters": {...}}' | ~/.claude/hooks/pre-tool-use.js

# Test post-tool-use hook
echo '{"tool": "Write", "result": "success"}' | ~/.claude/hooks/post-tool-use.js

# Test reminder loading
node -e "const RL = require('~/.claude/hooks/lib/reminder-loader'); console.log(new RL().getLoadingInfo());"
```

## Best Practices

### Hook Development

1. **Fail Safe**: Hooks should never crash Claude Code
2. **Performance**: Keep execution time under 5ms for responsiveness
3. **Logging**: Provide clear debug information when needed
4. **Graceful Degradation**: Continue operation if customizations fail

### Customization Guidelines

1. **Start Simple**: Begin with a few custom reminders
2. **Test Thoroughly**: Verify JSON syntax and loading
3. **Document Changes**: Note why specific customizations were added
4. **Follow Format**: Use existing reminder structure as template
5. **Consider Frequency**: Avoid overwhelming users with too many reminders

### Educational Effectiveness

1. **Be Specific**: Provide clear, actionable guidance
2. **Explain Why**: Include educational principles with reminders
3. **Be Contextual**: Show reminders at appropriate moments
4. **Be Helpful**: Focus on improving user understanding
5. **Be Concise**: Keep messages brief to avoid interrupting flow

## Advanced Features

### Custom Hook Integration

Advanced users can extend the hook system:

```javascript
// Custom hook integration example
const ReminderLoader = require('./lib/reminder-loader');
const customLoader = new ReminderLoader();

// Add custom categories
const customReminders = {
  "deployment": [
    {
      "category": "Production Safety",
      "message": "🚨 Run safety checks before production deployment",
      "principles": ["Production safety", "Risk management"]
    }
  ]
};
```

### Memory Integration

Hooks integrate with the memory system for learning:

```javascript
// Memory integration in hooks
const memoryPatterns = await searchMemory('hook-violations');
if (memoryPatterns.length > 0) {
  // Apply learned patterns to improve enforcement
}
```

### Analytics and Metrics

Track hook effectiveness:

```javascript
// Basic metrics tracking
const hookMetrics = {
  violations_prevented: 0,
  reminders_shown: 0,
  user_learning_progress: 0
};
```

## Security Considerations

### Input Validation

Hooks validate all input to prevent security issues:

```javascript
// Safe input handling
try {
  const input = JSON.parse(inputData);
  // Validate structure and content
} catch (error) {
  // Fail safe - continue operation
  return { success: true, message: "Hook input validation failed gracefully" };
}
```

### File System Access

Hooks operate with appropriate permissions:

- Read access to configuration and reminder files
- No write access to system files
- Respect user and project boundaries
- Graceful handling of permission errors

## Future Enhancements

### Planned Features

1. **Adaptive Reminders**: Learn user patterns and adjust reminder frequency
2. **Progress Tracking**: Track user learning and pattern adoption
3. **Team Analytics**: Share learning patterns across team members
4. **Integration Metrics**: Measure system adoption and effectiveness

### Extension Points

The hook system is designed for extension:

- Custom enforcement patterns
- Additional reminder categories
- Integration with external systems
- Advanced analytics and reporting

The hook system provides a robust foundation for behavioral enforcement and educational guidance, helping users learn and apply intelligent-claude-code patterns effectively while maintaining system reliability and automation quality.