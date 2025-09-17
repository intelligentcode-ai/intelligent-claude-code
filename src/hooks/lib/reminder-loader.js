const fs = require('fs');
const path = require('path');

class ReminderLoader {
  constructor() {
    this.reminders = this._loadReminders();
  }

  getPreExecutionReminder() {
    const preReminders = this.reminders.preAction || [];
    if (preReminders.length === 0) return '';
    return preReminders[Math.floor(Math.random() * preReminders.length)];
  }

  getPostExecutionReminder() {
    const postReminders = this.reminders.postAction || [];
    if (postReminders.length === 0) return '';
    return postReminders[Math.floor(Math.random() * postReminders.length)];
  }

  _loadReminders() {
    // Try to load reminders.json, fallback to hardcoded
    try {
      const remindersPath = path.join(__dirname, 'reminders.json');
      if (fs.existsSync(remindersPath)) {
        const content = fs.readFileSync(remindersPath, 'utf8');
        return JSON.parse(content);
      }
    } catch (error) {
      // Fall back to hardcoded reminders
    }

    return this._getFallbackReminders();
  }

  _getFallbackReminders() {
    return {
      preAction: [
        '🚫 NO WORK IN MAIN SCOPE - all work must use AgentTask → Task → Agent',
        '🔍 ALWAYS search memory before creating any AgentTask',
        '📋 Check best-practices/ directory before implementation',
        '🎯 Use @Role patterns for natural team interaction'
      ],
      postAction: [
        '💾 Store successful patterns in memory after completion',
        '✅ Validate all AgentTask requirements were met',
        '🎯 Remember @Role patterns for natural team coordination',
        '🧠 Memory-first approach - check memory before asking users'
      ]
    };
  }
}

module.exports = ReminderLoader;