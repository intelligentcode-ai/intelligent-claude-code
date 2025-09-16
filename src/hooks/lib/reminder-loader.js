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
   * 3. System default: same directory as this loader (fallback)
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
    const projectDir = this._detectProjectDirectory();

    const paths = [];

    // 1. Project-local (highest priority) - only if we can detect project directory
    if (projectDir) {
      paths.push(path.join(projectDir, '.claude', 'hooks', 'reminders.json'));
    }

    // 2. User-global (medium priority)
    paths.push(path.join(homeDir, '.claude', 'hooks', 'reminders.json'));

    // 3. System default (installed location - fallback)
    paths.push(path.join(__dirname, 'reminders.json'));

    return paths;
  }

  /**
   * Detect the actual project directory when running from hook context
   * When hooks run from Claude Code, process.cwd() points to Claude's directory,
   * not the user's project directory. We need to detect the actual project.
   */
  _detectProjectDirectory() {
    // Strategy 1: Check environment variables that Claude Code might set
    if (process.env.CLAUDE_PROJECT_ROOT) {
      return process.env.CLAUDE_PROJECT_ROOT;
    }

    if (process.env.PWD) {
      return process.env.PWD;
    }

    // Strategy 2: Check process.cwd() first (works when not in hook context)
    const currentDir = process.cwd();
    if (this._isProjectDirectory(currentDir)) {
      return currentDir;
    }

    // Strategy 3: Look for common project indicators in nearby directories
    // Check parent directories for project markers
    let checkDir = currentDir;
    for (let i = 0; i < 5; i++) {
      if (this._isProjectDirectory(checkDir)) {
        return checkDir;
      }
      const parentDir = path.dirname(checkDir);
      if (parentDir === checkDir) break; // Reached root
      checkDir = parentDir;
    }

    // Strategy 4: If we're in ~/.claude/hooks/, the project might be in a common location
    if (currentDir.includes('.claude/hooks')) {
      // Could try to find project in common development directories, but this is risky
      // Better to just return null and skip project-local configuration
    }

    // Unable to detect project directory reliably
    return null;
  }

  /**
   * Check if a directory looks like a project directory
   */
  _isProjectDirectory(dir) {
    try {
      // Look for common project indicators
      const indicators = [
        'package.json',
        '.git',
        'Cargo.toml',
        'pyproject.toml',
        'go.mod',
        'pom.xml',
        'build.gradle',
        'Makefile',
        'CLAUDE.md',
        'README.md'
      ];

      for (const indicator of indicators) {
        if (fs.existsSync(path.join(dir, indicator))) {
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
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
      detectedProjectDir: this._detectProjectDirectory(),
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