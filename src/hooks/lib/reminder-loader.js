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
   * 1. Project-local: .claude/hooks/reminders.json (highest priority)
   * 2. User-global: ~/.claude/hooks/reminders.json (medium priority)
   * 3. System default: ~/.claude/hooks/lib/reminders.json (fallback)
   */
  _loadReminders() {
    const reminderPaths = this._getReminderPaths();

    for (const reminderPath of reminderPaths) {
      try {
        if (fs.existsSync(reminderPath)) {
          const remindersContent = fs.readFileSync(reminderPath, 'utf8');
          this.reminders = JSON.parse(remindersContent);
          this.loadedFrom = reminderPath;
          console.log(`✅ Loaded reminders from: ${reminderPath}`);
          return;
        }
      } catch (error) {
        console.warn(`Failed to load reminders from ${reminderPath}: ${error.message}`);
        continue;
      }
    }

    console.warn('No valid reminders.json found in any location, using fallback reminders');
    this.reminders = this.fallbackReminders;
    this.loadedFrom = 'fallback';
  }

  /**
   * Get reminder file paths in priority order
   */
  _getReminderPaths() {
    const homeDir = os.homedir();
    const currentDir = process.cwd();

    return [
      // 1. Project-local (highest priority)
      path.join(currentDir, '.claude', 'hooks', 'reminders.json'),

      // 2. User-global (medium priority)
      path.join(homeDir, '.claude', 'hooks', 'reminders.json'),

      // 3. System default (installed location - fallback)
      path.join(__dirname, 'reminders.json'),

      // 4. Alternative system location
      path.join(homeDir, '.claude', 'hooks', 'lib', 'reminders.json')
    ];
  }

  /**
   * Get random reminder from specified category
   */
  getRandomReminder(category = 'preAction') {
    const categoryReminders = this.reminders[category] || [];

    if (categoryReminders.length === 0) {
      console.warn(`No reminders found for category: ${category}`);
      return this._getDefaultReminder(category);
    }

    const randomIndex = Math.floor(Math.random() * categoryReminders.length);
    return categoryReminders[randomIndex];
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

    let message = `🎓 PRE-EXECUTION PRINCIPLE REMINDER\n\n`;
    message += `${reminder.icon || '💡'} ${reminder.category.toUpperCase()}\n\n`;
    message += `${reminder.message}\n\n`;
    message += `💭 WHY: ${reminder.principle}\n\n`;
    message += `🎯 This reminder helps maintain intelligent-claude-code behavioral patterns for reliable automation.`;

    return message;
  }

  /**
   * Get formatted reminder message for post-execution
   */
  getPostExecutionReminder() {
    const reminder = this.getRandomReminder('postAction');

    let message = `🌟 SYSTEM PRINCIPLE REMINDER\n\n`;
    message += `${reminder.category.toUpperCase()}\n\n`;
    message += `${reminder.message}\n\n`;

    if (reminder.principles && reminder.principles.length > 0) {
      message += `🔑 KEY PRINCIPLES:\n`;
      reminder.principles.forEach(principle => {
        message += `• ${principle}\n`;
      });
      message += `\n`;
    }

    message += `💡 Following these patterns improves system reliability and automation effectiveness!`;

    return message;
  }

  /**
   * Get memory guidance reminder
   */
  getMemoryGuidanceReminder() {
    const reminder = this.getRandomReminder('memoryGuidance');

    let message = `🧠 MEMORY-FIRST GUIDANCE\n\n`;
    message += `${reminder.category.toUpperCase()}\n\n`;
    message += `${reminder.message}\n\n`;
    message += `📋 GUIDANCE: ${reminder.guidance}\n\n`;
    message += `✅ ACTION: ${reminder.action}`;

    return message;
  }

  /**
   * Get system reminder
   */
  getSystemReminder() {
    const reminder = this.getRandomReminder('system');
    return `${reminder.message}`;
  }

  /**
   * Fallback reminders if JSON file fails to load
   */
  _getFallbackReminders() {
    return {
      preAction: [
        {
          category: 'Memory Consultation',
          message: '🧠 CONSULT MEMORY BEFORE WRITING AGENTTASKS! Search memory/[topic]/ for proven patterns.',
          icon: '🧠',
          principle: 'Memory-first approach prevents repeated issues and applies proven solutions'
        },
        {
          category: 'Workflow Architecture',
          message: '🚫 NO WORK IN MAIN SCOPE: All work MUST go through PRB → Task → Agent workflow.',
          icon: '🚫',
          principle: 'Main scope is for coordination only - agents execute technical work'
        }
      ],
      postAction: [
        {
          category: '@Role Communication',
          message: '💡 Use @Role patterns for natural team coordination!',
          principles: ['@Role communication patterns', 'Natural team coordination']
        },
        {
          category: 'Memory Storage',
          message: '💾 Store learnings and patterns after every task.',
          principles: ['Learning capture', 'Knowledge building']
        }
      ],
      system: [
        {
          category: 'System Initialization',
          message: '🔄 Reload Claude Code after configuration changes.',
          principles: ['System reliability']
        }
      ],
      memoryGuidance: [
        {
          category: 'Memory Search',
          message: '🔍 ALWAYS SEARCH MEMORY FIRST before creating new work.',
          guidance: 'Memory-first approach prevents duplicate work',
          action: 'Search relevant memory topics before AgentTask creation'
        }
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
   * Get information about where reminders were loaded from
   */
  getLoadingInfo() {
    return {
      loadedFrom: this.loadedFrom,
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