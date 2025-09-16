# Hook Library

This directory contains shared utilities for the intelligent-claude-code hook system.

## Dynamic Reminder System

The hook system uses a dynamic reminder system that loads educational messages from JSON configuration with fallback to hardcoded defaults. The system supports user customization through multiple loading locations with priority order.

## User Extension Support

### Reminder File Priority Order

The system loads reminders from multiple locations in priority order:

1. **Project-local**: `.claude/hooks/reminders.json` (highest priority)
2. **User-global**: `~/.claude/hooks/reminders.json` (medium priority)
3. **System default**: `~/.claude/hooks/lib/reminders.json` (fallback)

This allows you to:
- **Override system reminders** with your own at user-global level
- **Add project-specific reminders** for individual projects
- **Keep customizations** through system updates (user files are preserved)

### Customization Examples

#### User-Global Customization

Create `~/.claude/hooks/reminders.json` to override system defaults:

```json
{
  "preAction": [
    {
      "category": "My Custom Reminder",
      "message": "🎯 Always check project requirements before starting work!",
      "icon": "🎯",
      "principle": "Custom principle that fits my workflow"
    }
  ],
  "postAction": [
    {
      "category": "Team Coordination",
      "message": "💬 Share learnings with the team after completing tasks.",
      "principles": ["Knowledge sharing", "Team collaboration"]
    }
  ]
}
```

#### Project-Specific Reminders

Create `.claude/hooks/reminders.json` in your project root:

```json
{
  "preAction": [
    {
      "category": "Project Standards",
      "message": "🏗️ Follow this project's specific architecture patterns!",
      "icon": "🏗️",
      "principle": "Project-specific architectural compliance"
    }
  ]
}
```

#### Extending System Reminders

To add to existing categories instead of replacing them, copy the system `reminders.json` first, then add your entries.

### Files

- **`reminders.json`** - Contains all educational reminders organized by category
- **`reminder-loader.js`** - Dynamic loader that reads reminders.json with fallback
- **`intent-classifier.js`** - Classifies user intent for appropriate guidance
- **`config-loader.js`** - Loads configuration settings

### Reminder Categories

#### `preAction`
Reminders shown before tool execution to guide best practices:
- Memory Consultation - Search memory before creating AgentTasks
- Best Practices - Consult project best-practices
- Workflow Architecture - Follow PRB → Task → Agent workflow
- PRB Creation - Ensure complete context
- PM Role Boundaries - PM coordination only
- Context Completeness - Complete PRB context required
- Role Assignment - Use @Role patterns
- Template Compliance - Use complexity-based templates

#### `postAction`
Reminders shown after tool execution to reinforce principles:
- @Role Communication - Use @Role patterns for team coordination
- AgentTask Workflow - Follow structured workflow patterns
- Memory-First Approach - Search memory before asking users
- System Boundaries - Respect main/agent architecture
- Learning Storage - Store learnings after tasks
- Configuration Changes - Reload after config changes
- Documentation Updates - Keep docs current
- Quality Assurance - Validate completion
- Git Privacy - Respect privacy settings
- Continuous Learning - Capture patterns

#### `system`
General system notifications and tips:
- System Initialization - Reload after changes
- Natural Interaction - Use @Role patterns
- Parallel Execution - Up to 5 concurrent tasks
- Dynamic Specialists - Create domain experts

#### `memoryGuidance`
Special memory-specific guidance:
- Memory Search - Search before creating work
- Pattern Application - Use proven patterns
- Learning Capture - Store new learnings

### Usage

```javascript
const ReminderLoader = require('./lib/reminder-loader');
const loader = new ReminderLoader();

// Get formatted reminders
const preReminder = loader.getPreExecutionReminder();
const postReminder = loader.getPostExecutionReminder();
const memoryReminder = loader.getMemoryGuidanceReminder();
const systemReminder = loader.getSystemReminder();

// Get random reminder from category
const reminder = loader.getRandomReminder('preAction');
```

### Updating Reminders

#### For Personal Use (Recommended)

1. **Copy system default**: `cp ~/.claude/hooks/lib/reminders.json ~/.claude/hooks/reminders.json`
2. **Edit your copy**: Modify `~/.claude/hooks/reminders.json` with your changes
3. **Follow existing structure** for each category
4. **Test changes**: `node -e "const ReminderLoader = require('~/.claude/hooks/lib/reminder-loader'); console.log(new ReminderLoader().getPreExecutionReminder())"`
5. **Your changes persist** through system updates

#### For Project-Specific Reminders

1. **Create project file**: Create `.claude/hooks/reminders.json` in your project root
2. **Add project-specific content** following the same JSON structure
3. **Test in project**: Run the test command from your project directory
4. **Project reminders override** user-global and system defaults

#### For System Updates (Advanced)

Only edit the system file `~/.claude/hooks/lib/reminders.json` if you want to change defaults for all users on the system.

### Maintenance Through Updates

- **User files preserved**: `~/.claude/hooks/reminders.json` and `.claude/hooks/reminders.json` are never overwritten during updates
- **System defaults updated**: `~/.claude/hooks/lib/reminders.json` gets updated with new system reminders
- **Your customizations safe**: Personal and project-specific customizations remain intact
- **New features inherited**: You can manually copy new system reminders to your custom files if desired

### Fallback System

If `reminders.json` fails to load:
- System logs warning and continues with hardcoded fallbacks
- No functionality is lost (fail-open design)
- Fallbacks include essential reminders for each category

### Debugging and Verification

To check which reminder file is being loaded:

```javascript
const ReminderLoader = require('~/.claude/hooks/lib/reminder-loader');
const loader = new ReminderLoader();
const info = loader.getLoadingInfo();

console.log('Loaded from:', info.loadedFrom);
console.log('Total reminders:', info.reminderCount);
console.log('Available paths:', info.availablePaths);
```

Or check the console output when the hook runs - it will show which file was loaded.

### Behavior Integration

When creating custom reminders, consider referencing the behavioral patterns:

- **Memory-First**: Always search memory before creating work
- **PRB Workflow**: All work goes through PRB → Task → Agent
- **PM Boundaries**: PM role is coordination only
- **@Role Patterns**: Use @Role for natural team communication
- **Context Completeness**: Ensure PRBs have complete context

### Key Benefits

- **Easy Maintenance**: Update reminders without code changes
- **Fail-Open Design**: Hardcoded fallbacks ensure reliability
- **Behavioral Compliance**: Reminders extracted from behavior patterns
- **Random Selection**: Keeps reminders fresh and non-repetitive
- **Categorized**: Different reminders for different contexts
- **User Customizable**: Override system defaults with personal/project preferences
- **Update-Safe**: Customizations preserved through system updates