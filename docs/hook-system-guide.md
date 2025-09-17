# Hook System Guide

The intelligent-claude-code system uses an optimized hook architecture to provide behavioral guidance and system initialization. This guide covers the complete hook system, focusing on optimal timing for guidance delivery.

## Overview

The hook system provides strategic integration points within Claude Code to ensure proper behavioral patterns and virtual team initialization:

- **System Initialization**: Complete virtual team configuration at session start
- **Contextual Guidance**: Smart behavioral reminders based on user input analysis
- **Memory Integration**: Automatic memory consultation and storage guidance
- **Virtual Team Activation**: Full behavioral pattern loading and enforcement

## Hook Architecture

### Hook Types

The system implements a single optimally-timed hook:

| Hook Type | Purpose | When Executed | Guidance Level |
|-----------|---------|---------------|----------------|
| **UserPromptSubmit** | Contextual behavioral guidance | Before response generation | **EDUCATIONAL** |

### Hook Components

```
src/hooks/
├── user-prompt-submit.js     # Contextual guidance hook
└── lib/
    ├── reminder-loader.js    # Dynamic reminder system
    └── reminders.json        # Unified reminder definitions
```

## UserPromptSubmit Hook

The UserPromptSubmit hook provides contextual behavioral guidance before Claude generates responses.

### Intelligent Context Analysis

The hook analyzes user prompts to provide relevant guidance:

**@Role Detection**:
```javascript
if (userPrompt.includes('@')) {
  contextualGuidance.push('🎯 @Role Communication: Natural team interaction detected');
  contextualGuidance.push('📋 Role Assignment: Match project scope and work type to specialist expertise');
}
```

**Work Intent Detection**:
```javascript
const workIndicators = ['implement', 'fix', 'create', 'build', 'deploy', 'update', 'modify'];
if (workIndicators.some(indicator => userPrompt.toLowerCase().includes(indicator))) {
  contextualGuidance.push('🚫 NO WORK IN MAIN SCOPE - all work must use AgentTask → Task → Agent');
  contextualGuidance.push('🔍 ALWAYS search memory before creating any AgentTask');
  contextualGuidance.push('📦 AgentTasks must be SELF-CONTAINED with all context embedded');
}
```

**Question Detection**:
```javascript
if (userPrompt.includes('?') || userPrompt.toLowerCase().includes('how') || userPrompt.toLowerCase().includes('what')) {
  contextualGuidance.push('🧠 Memory-first approach - check memory before asking users');
  contextualGuidance.push('📚 Check best-practices/ directory for relevant patterns');
}
```

### Educational Reminder System

**Purpose**: Help users learn system patterns through contextual guidance

**Features**:
- Dynamic JSON-based configuration with weight-based selection
- Multi-location loading with priority order
- User and project-level customization
- 20+ behavioral reminders across multiple categories

## Unified Reminder Format

The system uses a unified reminder format optimized for UserPromptSubmit hook:

### Reminder Structure

```json
{
  "reminders": [
    {
      "message": "🚫 NO WORK IN MAIN SCOPE - all work must use AgentTask → Task → Agent",
      "weight": 10,
      "category": "architectural_enforcement"
    },
    {
      "message": "🔍 ALWAYS search memory before creating any AgentTask",
      "weight": 9,
      "category": "memory_operations"
    },
    {
      "message": "🎯 Use @Role patterns for natural team interaction",
      "weight": 9,
      "category": "team_communication"
    }
  ]
}
```

### Weight-Based Selection

- **Weight 10**: Critical enforcement patterns (highest frequency)
- **Weight 8-9**: Important behavioral guidance
- **Weight 6-7**: Quality standards and best practices
- **Weight 1-5**: Situational reminders

### Reminder Categories

- `architectural_enforcement`: Core system patterns and boundaries
- `memory_operations`: Memory-first approach guidance
- `quality_standards`: Best practices and quality gates
- `team_communication`: @Role interaction patterns
- `role_enforcement`: Role boundary enforcement
- `agenttask_quality`: AgentTask creation standards
- `learning_culture`: Memory storage and pattern capture
- `execution_validation`: Proof of work requirements

## Configuration and Customization

### Dynamic Loading System

The reminder system loads from multiple locations with clear priority:

```
1. Project-local: .claude/hooks/reminders.json (highest)
2. User-global: ~/.claude/hooks/reminders.json (medium)
3. System default: ~/.claude/hooks/lib/reminders.json (fallback)
```

### Custom Reminders

#### Project-Level Customization

Create `.claude/hooks/reminders.json` in your project:

```json
{
  "reminders": [
    {
      "message": "📋 Check project-specific standards before implementation",
      "weight": 10,
      "category": "project_standards"
    },
    {
      "message": "💬 Update team channel with progress",
      "weight": 7,
      "category": "team_process"
    }
  ]
}
```

#### User-Global Customization

Create `~/.claude/hooks/reminders.json` for personal preferences:

```json
{
  "reminders": [
    {
      "message": "⏰ Check calendar before starting deep work",
      "weight": 8,
      "category": "personal_workflow"
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
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.claude/hooks/user-prompt-submit.js"
          }
        ]
      }
    ]
  }
}
```

### Verification

Verify hook installation:

```bash
# Check hook files exist
ls ~/.claude/hooks/

# Check hook registration
cat ~/.config/claude-desktop/settings.json | grep -A 20 hooks

# Test hook functionality
echo '{"user_prompt": "test"}' | node ~/.claude/hooks/user-prompt-submit.js
```

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

**Virtual team initialization:**
- Use `/icc-init-system` command to activate virtual team mode
- This loads complete behavioral patterns and specialist roles
- Hook system provides contextual guidance only

### Debug Information

Enable debug output for hooks:

```javascript
// In hook files, add debug logging
console.log('Hook executed:', { input, timestamp: new Date() });
```

View hook execution in Claude Code console or debug mode.

### Testing Hooks

Test hook functionality manually:

```bash
# Test UserPromptSubmit hook
echo '{"user_prompt": "implement auth"}' | node ~/.claude/hooks/user-prompt-submit.js

# Test reminder loading
node -e "const RL = require('~/.claude/hooks/lib/reminder-loader'); const loader = new RL(); console.log(loader.getRandomReminder());"
```

## Best Practices

### Hook Development

1. **Fail Safe**: Hooks should never crash Claude Code
2. **Performance**: Keep execution time under 100ms for responsiveness
3. **Logging**: Provide clear debug information when needed
4. **Graceful Degradation**: Continue operation if customizations fail

### Customization Guidelines

1. **Start Simple**: Begin with a few custom reminders
2. **Test Thoroughly**: Verify JSON syntax and loading
3. **Document Changes**: Note why specific customizations were added
4. **Follow Format**: Use existing reminder structure as template
5. **Consider Weight**: Balance reminder frequency appropriately

### Educational Effectiveness

1. **Be Specific**: Provide clear, actionable guidance
2. **Be Contextual**: Show reminders at appropriate moments
3. **Be Helpful**: Focus on improving user understanding
4. **Be Concise**: Keep messages brief to avoid interrupting flow
5. **Be Consistent**: Maintain consistent terminology and patterns

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
  return { continue: true, suppressOutput: true };
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

- Custom reminder categories and weighting
- Additional contextual analysis patterns
- Integration with external systems
- Advanced analytics and reporting

The hook system provides an optimized foundation for behavioral guidance and system initialization, helping users learn and apply intelligent-claude-code patterns effectively while maintaining system reliability and automation quality.