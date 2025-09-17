/**
 * Dynamic Reminder Loader
 *
 * Loads educational reminders from JSON configuration with fallback to hardcoded defaults.
 * Provides random selection and categorized access to reminder messages.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

class ReminderLoader {
  constructor() {
    this.reminders = null;
    this.fallbackReminders = this._getFallbackReminders();
    this.loadedFrom = null;
    this._loadReminders();
  }

  /**
   * Load reminders from multiple locations with priority order:
   * 1. Project-local: {process.cwd()}/.claude/hooks/reminders.json (highest priority)
   * 2. User-global: ~/.claude/hooks/reminders.json (medium priority)
   * 3. System default: same directory as this loader (fallback)
   *
   * Note: Claude Code provides correct project context via process.cwd()
   * Always checks for project-local reminders even when installed in user scope
   */
  _loadReminders() {
    const reminderPaths = this._getReminderPaths();
    const loadedReminders = [];

    // Always start with fallback reminders
    let mergedReminders = JSON.parse(JSON.stringify(this.fallbackReminders));

    // Load from all available sources and merge them
    for (const reminderPath of reminderPaths.reverse()) { // Start with lowest priority
      try {
        if (fs.existsSync(reminderPath)) {
          const remindersContent = fs.readFileSync(reminderPath, 'utf8');
          const loadedData = JSON.parse(remindersContent);

          // Merge categories
          for (const category in loadedData) {
            if (Array.isArray(loadedData[category])) {
              if (!mergedReminders[category]) {
                mergedReminders[category] = [];
              }
              // Add new reminders to category (higher priority sources override)
              mergedReminders[category] = [...mergedReminders[category], ...loadedData[category]];
            }
          }

          loadedReminders.push(reminderPath);
        }
      } catch (error) {
        continue;
      }
    }

    this.reminders = mergedReminders;
    this.loadedFrom = loadedReminders.length > 0 ? loadedReminders : 'fallback';
  }

  /**
   * Get reminder file paths in priority order
   */
  _getReminderPaths() {
    const homeDir = os.homedir();
    const currentDir = process.cwd(); // Claude Code already provides correct project context

    const paths = [];

    // 1. Project-local (highest priority) - process.cwd() is the project when Claude runs hooks
    paths.push(path.join(currentDir, '.claude', 'hooks', 'reminders.json'));

    // 2. User-global (medium priority)
    paths.push(path.join(homeDir, '.claude', 'hooks', 'reminders.json'));

    // 3. System default (installed location - fallback)
    paths.push(path.join(__dirname, 'reminders.json'));

    return paths;
  }


  /**
   * Get random reminder from specified category
   */
  getRandomReminder(category = 'preAction') {
    const categoryReminders = this.reminders[category] || [];

    if (categoryReminders.length === 0) {
      return this._getDefaultReminderString(category);
    }

    const randomIndex = Math.floor(Math.random() * categoryReminders.length);
    const reminder = categoryReminders[randomIndex];

    // Handle both string format (new) and object format (legacy)
    if (typeof reminder === 'string') {
      return reminder;
    } else {
      // Legacy object format
      return reminder.message || reminder;
    }
  }

  /**
   * Get 1-3 random reminders from specified category
   * Ensures no duplicates in single call
   */
  getMultipleRandomReminders(category = 'preAction', count = null) {
    const categoryReminders = this.reminders[category] || [];

    if (categoryReminders.length === 0) {
      return [this._getDefaultReminderString(category)];
    }

    // Determine random count (1-3) if not specified
    if (count === null) {
      count = Math.floor(Math.random() * 3) + 1; // Random 1-3
    }

    // Limit count to available reminders
    count = Math.min(count, categoryReminders.length);

    // Get random unique indices
    const indices = new Set();
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * categoryReminders.length));
    }

    // Extract reminders
    const selectedReminders = Array.from(indices).map(index => {
      const reminder = categoryReminders[index];

      // Handle both string format (new) and object format (legacy)
      if (typeof reminder === 'string') {
        return reminder;
      } else {
        // Legacy object format
        return reminder.message || reminder;
      }
    });

    return selectedReminders;
  }

  /**
   * Get all reminders for a category
   */
  getCategoryReminders(category) {
    return this.reminders[category] || [];
  }

  /**
   * Get formatted reminder message for pre-execution
   */
  getPreExecutionReminder() {
    const reminder = this.getRandomReminder('preAction');
    // Return just the one-line reminder
    return reminder;
  }

  /**
   * Get formatted reminder message for post-execution
   */
  getPostExecutionReminder() {
    const reminder = this.getRandomReminder('postAction');
    // Return just the one-line reminder
    return reminder;
  }

  /**
   * Get memory guidance reminder
   */
  getMemoryGuidanceReminder() {
    // Use preAction reminders for memory guidance too
    const reminder = this.getRandomReminder('preAction');
    return reminder;
  }

  /**
   * Get system reminder
   */
  getSystemReminder() {
    // Use postAction reminders for system reminders
    const reminder = this.getRandomReminder('postAction');
    return reminder;
  }

  /**
   * Get a pre-action reminder for PreToolUse hook
   */
  getPreActionReminder() {
    const reminder = this.getRandomReminder('preAction');
    return reminder;
  }

  /**
   * Get a post-action reminder for PostToolUse hook
   */
  getPostActionReminder() {
    const reminder = this.getRandomReminder('postAction');
    return reminder;
  }

  /**
   * Fallback reminders if JSON file fails to load
   */
  _getFallbackReminders() {
    return {
      preAction: [
        '🚫 NO WORK IN MAIN SCOPE - all work must use PRB → Task → Agent',
        '🔍 ALWAYS search memory before creating any AgentTask',
        '📋 Check best-practices/ directory before implementation',
        '🎯 Use @Role patterns for natural team interaction'
      ],
      postAction: [
        '💾 Store successful patterns in memory after completion',
        '✅ Validate all PRB requirements were met',
        '🎯 Remember @Role patterns for natural team coordination',
        '🧠 Memory-first approach - check memory before asking users'
      ]
    };
  }

  /**
   * Get default reminder for category
   */
  _getDefaultReminder(category) {
    const defaults = {
      preAction: {
        category: 'System Guidance',
        message: '💡 Follow intelligent-claude-code behavioral patterns for reliable automation.',
        icon: '💡',
        principle: 'Consistent patterns improve system reliability'
      },
      postAction: {
        category: 'System Reminder',
        message: '🌟 Remember to use @Role patterns and memory-first approaches.',
        principles: ['System patterns', 'Best practices']
      },
      system: {
        category: 'System Notification',
        message: '🔄 System reminder: Follow established patterns for best results.',
        principles: ['Pattern adherence']
      },
      memoryGuidance: {
        category: 'Memory Guidance',
        message: '🧠 Search memory before creating new work.',
        guidance: 'Memory-first approach improves efficiency',
        action: 'Check memory patterns before action'
      }
    };

    return defaults[category] || defaults.preAction;
  }

  /**
   * Get default reminder string for category
   */
  _getDefaultReminderString(category) {
    const defaults = {
      preAction: '💡 Follow intelligent-claude-code behavioral patterns for reliable automation.',
      postAction: '🌟 Remember to use @Role patterns and memory-first approaches.',
      system: '🔄 System reminder: Follow established patterns for best results.',
      memoryGuidance: '🧠 Search memory before creating new work.'
    };

    return defaults[category] || defaults.preAction;
  }

  /**
   * Get information about where reminders were loaded from
   */
  getLoadingInfo() {
    return {
      loadedFrom: this.loadedFrom,
      currentProjectDir: process.cwd(), // Simplified - Claude Code provides correct context
      availablePaths: this._getReminderPaths(),
      reminderCount: this._getTotalReminderCount()
    };
  }

  /**
   * Get total count of reminders across all categories
   */
  _getTotalReminderCount() {
    let total = 0;
    for (const category in this.reminders) {
      if (Array.isArray(this.reminders[category])) {
        total += this.reminders[category].length;
      }
    }
    return total;
  }

  /**
   * Reload reminders from file (useful for dynamic updates)
   */
  reload() {
    this._loadReminders();
  }
}

module.exports = ReminderLoader;