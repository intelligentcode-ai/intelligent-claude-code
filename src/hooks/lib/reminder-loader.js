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
        '🧠 MEMORY FIRST - search memory/ before any work or questions',
        '📋 BEST-PRACTICES FIRST - check best-practices/ before implementation',
        '📑 AgentTask-Templates REQUIRED - use nano/tiny/medium/large/mega templates',
        '🚫 NO WORK IN MAIN SCOPE (except nano/tiny in-memory AgentTask-Templates)',
        '🎯 Use @Role patterns for natural team interaction'
      ],
      postAction: [
        '🧠 MANDATORY - Store successful patterns in memory/ after completion',
        '📋 MANDATORY - Evaluate if pattern qualifies for best-practices/ promotion',
        '✅ Validate all AgentTask-Template requirements were met',
        '🎯 Remember @Role patterns for natural team coordination',
        '💡 Learning capture contributes to collective knowledge base'
      ]
    };
  }
}

module.exports = ReminderLoader;