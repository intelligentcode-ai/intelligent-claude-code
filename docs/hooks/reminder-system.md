# Dynamic Reminder System

The intelligent-claude-code system includes a dynamic reminder system that provides educational guidance to help users learn and follow system patterns effectively.

## Overview

The reminder system delivers educational messages at appropriate moments to reinforce key behavioral patterns without disrupting workflow. This system helps users understand and apply the system's principles through contextual guidance.

### Key Features

- **Educational Focus**: Non-blocking reminders that teach system patterns
- **Dynamic Loading**: JSON-based configuration with multi-location support
- **User Customization**: Project and user-level reminder customization
- **Automatic Integration**: Built into the hook system for seamless operation
- **Pattern Reinforcement**: 25+ reminders covering core system concepts

## Architecture

### Dynamic Loading System

The reminder system loads configuration from multiple locations with a clear priority order:

```
Priority Order (Highest to Lowest):
1. Project-local: .claude/hooks/reminders.json
2. User-global: ~/.claude/hooks/reminders.json
3. System default: ~/.claude/hooks/lib/reminders.json
```

### ReminderLoader Class

The `ReminderLoader` class manages the dynamic loading and provides several access methods:

```javascript
// Load reminders automatically from priority locations
const reminderLoader = new ReminderLoader();

// Get random reminder from specific category
const reminder = reminderLoader.getRandomReminder('preAction');

// Get formatted message for display
const message = reminderLoader.getPostExecutionReminder();

// Get loading information for debugging
const info = reminderLoader.getLoadingInfo();
```

## Reminder Categories

### Pre-Action Reminders (`preAction`)

Shown before tool execution to reinforce important patterns:

- **Memory Consultation**: Check memory before creating AgentTasks
- **Best Practices**: Consult project best-practices
- **Workflow Architecture**: Maintain Main → AgentTask → Task → Agent pattern
- **AgentTask Creation**: Follow structured workflow patterns
- **PM Role Boundaries**: Coordination only, no direct work
- **Context Completeness**: Ensure complete context in AgentTasks
- **Role Assignment**: Use @Role patterns for specialist assignment
- **Template Compliance**: Use appropriate complexity templates

### Post-Action Reminders (`postAction`)

Educational guidance after tool execution:

- **@Role Communication**: Use natural @Role patterns
- **AgentTask Workflow**: Follow work → AgentTask → execution pattern
- **Memory-First Approach**: Search memory before asking users
- **System Boundaries**: Respect main agent vs subagent boundaries
- **Learning Storage**: Store patterns and learnings
- **Configuration Changes**: Reload after config modifications
- **Documentation Updates**: Keep docs current with changes
- **Quality Assurance**: Validate completion requirements
- **Git Privacy**: Respect privacy settings in commits
- **Continuous Learning**: Capture successful patterns

### System Reminders (`system`)

General system guidance and notifications:

- **System Initialization**: Reload after configuration changes
- **Natural Interaction**: Use @Role patterns instead of commands
- **Parallel Execution**: Leverage multi-task capabilities
- **Dynamic Specialists**: Create unlimited domain specialists

### Memory Guidance (`memoryGuidance`)

Specific guidance for memory system usage:

- **Memory Search**: Always search memory first
- **Pattern Application**: Apply proven patterns from memory
- **Learning Capture**: Store new learnings for future use

## Configuration Format

### Basic Structure

```json
{
  "preAction": [
    {
      "category": "Memory Consultation",
      "message": "🧠 CONSULT MEMORY BEFORE WRITING AGENTTASKS!",
      "icon": "🧠",
      "principle": "Memory-first approach prevents repeated issues"
    }
  ],
  "postAction": [
    {
      "category": "@Role Communication",
      "message": "💡 Use @Role patterns for natural team coordination!",
      "principles": ["@Role patterns", "Natural coordination"]
    }
  ],
  "system": [
    {
      "category": "System Initialization",
      "message": "🔄 Reload Claude Code after configuration changes.",
      "principles": ["System reliability"]
    }
  ],
  "memoryGuidance": [
    {
      "category": "Memory Search",
      "message": "🔍 ALWAYS SEARCH MEMORY FIRST",
      "guidance": "Memory-first approach prevents duplicate work",
      "action": "Search relevant memory topics before AgentTask creation"
    }
  ]
}
```

### Reminder Object Properties

**Pre-Action Reminder:**
- `category`: Display category name
- `message`: Main reminder text
- `icon`: Optional emoji icon
- `principle`: Educational principle explanation

**Post-Action Reminder:**
- `category`: Display category name
- `message`: Main reminder text
- `principles`: Array of key principles (optional)

**Memory Guidance Reminder:**
- `category`: Display category name
- `message`: Main reminder text
- `guidance`: Detailed guidance explanation
- `action`: Specific action to take

## Customization Guide

### Project-Level Customization

Create `.claude/hooks/reminders.json` in your project:

```json
{
  "preAction": [
    {
      "category": "Project Standards",
      "message": "📋 Check project-specific coding standards before implementation",
      "icon": "📋",
      "principle": "Project consistency requires following established patterns"
    }
  ],
  "postAction": [
    {
      "category": "Team Communication",
      "message": "💬 Update team channel with completed work status",
      "principles": ["Team coordination", "Status transparency"]
    }
  ]
}
```

### User-Global Customization

Create `~/.claude/hooks/reminders.json` for personal preferences:

```json
{
  "preAction": [
    {
      "category": "Personal Workflow",
      "message": "⏰ Check calendar for meetings before starting deep work",
      "icon": "⏰",
      "principle": "Time management improves focus and productivity"
    }
  ]
}
```

### Extending System Reminders

You can add new categories or extend existing ones:

```json
{
  "projectSpecific": [
    {
      "category": "Code Review",
      "message": "👥 Schedule code review with team lead for complex changes",
      "principles": ["Quality assurance", "Knowledge sharing"]
    }
  ],
  "preAction": [
    {
      "category": "Custom Check",
      "message": "🔍 Run custom validation before proceeding",
      "icon": "🔍",
      "principle": "Custom validations ensure project-specific quality"
    }
  ]
}
```

## Integration with Hook System

### Post-Tool-Use Hook Integration

The reminder system is integrated into the `post-tool-use.js` hook:

```javascript
const ReminderLoader = require('./lib/reminder-loader');

class EducationalReminderSystem {
  constructor() {
    this.reminderLoader = new ReminderLoader();
  }

  shouldShowReminder(tool, parameters, result) {
    // Educational tools: 15% chance
    // Other tools: 5% chance
    const educational = ['Read', 'Grep', 'Glob'];
    const chance = educational.includes(tool) ? 0.15 : 0.05;
    return Math.random() < chance;
  }

  getRandomReminder() {
    return this.reminderLoader.getRandomReminder('postAction');
  }
}
```

### Display Frequency

Reminders are shown with different frequencies based on tool context:

- **Educational Tools** (Read, Grep, Glob): 15% chance
- **Modification Tools** (Edit, Write): 5% chance
- **Other Tools**: 5% chance

This ensures reminders are helpful without being intrusive.

## Installation and Updates

### Automatic Deployment

Both Ansible and PowerShell installers deploy the reminder system:

**Linux/macOS (Ansible):**
- Deploys system reminders to `~/.claude/hooks/lib/reminders.json`
- Preserves existing user customizations
- Updates system defaults while maintaining user extensions

**Windows (PowerShell):**
- Deploys system reminders during hook installation
- Maintains user customizations during updates
- Integrates with Windows-specific paths

### Preservation During Updates

The system preserves user customizations during updates:

1. **System files** are updated with new defaults
2. **User files** are preserved unchanged
3. **Project files** remain untouched
4. **Priority loading** ensures user preferences take precedence

## Debugging and Troubleshooting

### Loading Information

Check what reminders are loaded and from where:

```javascript
const reminderLoader = new ReminderLoader();
const info = reminderLoader.getLoadingInfo();

console.log('Loaded from:', info.loadedFrom);
console.log('Available paths:', info.availablePaths);
console.log('Total reminders:', info.reminderCount);
```

### Common Issues

**Reminders not showing:**
- Check hook installation: hooks should be in `~/.claude/hooks/`
- Verify file permissions: reminder files should be readable
- Check JSON syntax: malformed JSON will fall back to defaults

**Custom reminders not working:**
- Verify file location: `.claude/hooks/reminders.json` for project-level
- Check JSON structure: must match expected format
- Restart Claude Code: changes require restart to take effect

**Loading errors:**
- Check console output for loading messages
- Verify file paths exist and are accessible
- Ensure JSON syntax is valid

### Testing Custom Reminders

Test your custom reminders:

```javascript
// In Claude Code console or debug mode
const ReminderLoader = require('./lib/reminder-loader');
const loader = new ReminderLoader();

// Check loading
console.log(loader.getLoadingInfo());

// Test specific category
console.log(loader.getRandomReminder('preAction'));

// Test formatted output
console.log(loader.getPostExecutionReminder());
```

## Best Practices

### Writing Effective Reminders

1. **Be Specific**: Clear, actionable guidance
2. **Be Educational**: Explain the "why" behind patterns
3. **Be Concise**: Brief messages that don't interrupt flow
4. **Be Consistent**: Follow existing format and tone
5. **Be Helpful**: Focus on improving user understanding

### Customization Guidelines

1. **Start Small**: Add a few reminders, test, then expand
2. **Test Thoroughly**: Verify JSON syntax and loading
3. **Document Changes**: Note why specific reminders were added
4. **Share Learnings**: Consider contributing useful reminders back
5. **Maintain Compatibility**: Follow existing structure patterns

### Performance Considerations

1. **Reasonable File Size**: Keep reminder files under 50KB
2. **Efficient Loading**: System caches loaded reminders
3. **Appropriate Frequency**: Don't show reminders too often
4. **Graceful Fallback**: System works even if custom files fail

## Contributing

To contribute new system reminders:

1. **Follow Format**: Use existing reminder structure
2. **Test Thoroughly**: Verify loading and display
3. **Document Purpose**: Explain educational value
4. **Consider Frequency**: Ensure appropriate display rates
5. **Submit PR**: Include tests and documentation

The reminder system helps users learn intelligent-claude-code patterns through contextual, educational guidance that enhances understanding without disrupting workflow.