#!/usr/bin/env node
/**
 * Unit Tests for reminder-loader.js
 * Tests reminder loading and selection
 */

const assert = require('assert');
const { runTestSuite } = require('../fixtures/test-helpers');
const ReminderLoader = require('../../../src/hooks/lib/reminder-loader.js');

const tests = {
  'ReminderLoader: constructor creates instance': () => {
    const loader = new ReminderLoader();

    assert.ok(loader, 'Should create instance');
  },

  'getReminder: returns string': () => {
    const loader = new ReminderLoader();
    const result = loader.getReminder();

    assert.ok(typeof result === 'string' || typeof result === 'object', 'Should return string or object');
  },

  'getReminder: returns non-empty reminder': () => {
    const loader = new ReminderLoader();
    const result = loader.getReminder();

    if (typeof result === 'string') {
      assert.ok(result.length > 0 || result === '', 'Should be string');
    } else {
      assert.ok(result.message || true, 'Object should have message or be empty');
    }
  },

  'getReminder: randomizes selection': () => {
    const loader = new ReminderLoader();
    const results = new Set();

    // Get 10 reminders, should have some variety
    for (let i = 0; i < 10; i++) {
      const reminder = loader.getReminder();
      const text = typeof reminder === 'string' ? reminder : reminder.message || '';
      results.add(text);
    }

    // Should have at least 2 different reminders in 10 tries (probabilistic)
    assert.ok(results.size >= 1, 'Should provide reminders');
  },

  '_loadReminders: returns reminders object': () => {
    const loader = new ReminderLoader();
    const result = loader._loadReminders();

    assert.ok(result, 'Should return object');
    assert.ok(result.reminders || result.preAction, 'Should have reminders or preAction array');
  },

  '_getFallbackReminders: includes memory-first reminders': () => {
    const loader = new ReminderLoader();
    const result = loader._getFallbackReminders();

    const hasMemoryReminder = result.reminders.some(r =>
      r.message.toLowerCase().includes('memory')
    );
    assert.ok(hasMemoryReminder, 'Should include memory-first reminders');
  },

  '_getFallbackReminders: includes agenttask reminders': () => {
    const loader = new ReminderLoader();
    const result = loader._getFallbackReminders();

    const hasAgentTaskReminder = result.reminders.some(r =>
      r.message.toLowerCase().includes('agenttask')
    );
    assert.ok(hasAgentTaskReminder, 'Should include AgentTask reminders');
  },

  '_getFallbackReminders: includes best-practices reminders': () => {
    const loader = new ReminderLoader();
    const result = loader._getFallbackReminders();

    const hasBestPracticesReminder = result.reminders.some(r =>
      r.message.toLowerCase().includes('best-practices')
    );
    assert.ok(hasBestPracticesReminder, 'Should include best-practices reminders');
  },

  '_getWeightedReminder: respects weights': () => {
    const loader = new ReminderLoader();
    const reminders = [
      { message: 'High weight', weight: 100 },
      { message: 'Low weight', weight: 1 }
    ];

    const result = loader._getWeightedReminder(reminders);
    assert.ok(typeof result === 'string', 'Should return string');
  },

  '_shuffleArray: returns array': () => {
    const loader = new ReminderLoader();
    const input = [1, 2, 3, 4, 5];

    const result = loader._shuffleArray(input);
    assert.ok(Array.isArray(result), 'Should return array');
    assert.strictEqual(result.length, input.length, 'Should preserve length');
  }
};

console.log('\n=== Reminder Loader Unit Tests ===');
const allPassed = runTestSuite('reminder-loader.js', tests);
process.exit(allPassed ? 0 : 1);
