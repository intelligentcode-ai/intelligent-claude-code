const fs = require('fs');
const path = require('path');

class ReminderLoader {
  constructor() {
    this.reminders = this._loadReminders();
  }

  getReminder() {
    const reminders = this.reminders.reminders || this.reminders.preAction || [];
    if (reminders.length === 0) return '';

    // If using new format with weights, use weighted selection
    if (reminders[0] && typeof reminders[0] === 'object' && reminders[0].weight) {
      return this._getWeightedReminder(reminders);
    }

    // Legacy format - simple random selection
    return reminders[Math.floor(Math.random() * reminders.length)];
  }

  _getWeightedReminder(reminders) {
    const totalWeight = reminders.reduce((sum, r) => sum + (r.weight || 1), 0);
    let random = Math.random() * totalWeight;

    for (const reminder of reminders) {
      random -= (reminder.weight || 1);
      if (random <= 0) {
        return reminder.message || reminder;
      }
    }

    return reminders[reminders.length - 1].message || reminders[reminders.length - 1];
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
      reminders: [
        { message: '🧠 MEMORY FIRST - search memory/ before any work or questions', weight: 10 },
        { message: '📋 BEST-PRACTICES FIRST - check best-practices/ before implementation', weight: 10 },
        { message: '📑 AgentTask-Templates REQUIRED - use nano/tiny/medium/large/mega templates', weight: 9 },
        { message: '⚠️ AgentTask-Templates UNKNOWN? Load ~/.claude/modes/virtual-team.md + ALL included files!', weight: 10 },
        { message: '🚫 NO WORK IN MAIN SCOPE (except nano/tiny in-memory AgentTask-Templates)', weight: 10 },
        { message: '🎯 Use @Role patterns for natural team interaction', weight: 8 },
        { message: '🧠 MANDATORY - Store successful patterns in memory/ after completion', weight: 10 },
        { message: '📋 MANDATORY - Evaluate if pattern qualifies for best-practices/ promotion', weight: 9 },
        { message: '✅ Validate all AgentTask-Template requirements were met', weight: 8 },
        { message: '💡 Learning capture contributes to collective knowledge base', weight: 8 }
      ]
    };
  }
}

module.exports = ReminderLoader;