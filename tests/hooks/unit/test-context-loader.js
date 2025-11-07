#!/usr/bin/env node
/**
 * Unit Tests for context-loader.js
 * Tests CLAUDE.md context loading
 */

const assert = require('assert');
const { runTestSuite } = require('../fixtures/test-helpers');
const ContextLoader = require('../../../src/hooks/lib/context-loader.js');

const tests = {
  'ContextLoader: constructor initializes paths': () => {
    const loader = new ContextLoader();

    assert.ok(loader.claudeHome, 'Should set claudeHome');
    assert.ok(loader.modesPath, 'Should set modesPath');
    assert.ok(loader.virtualTeamFile, 'Should set virtualTeamFile');
  },

  'loadCompleteContext: returns fallback when file missing': () => {
    const loader = new ContextLoader();
    const context = loader.loadCompleteContext();

    assert.ok(context, 'Should return context');
    assert.ok(context.agentTaskTemplates, 'Should have agentTaskTemplates');
    assert.ok(context.memoryFirst, 'Should have memoryFirst');
    assert.ok(context.bestPractices, 'Should have bestPractices');
  },

  'loadCompleteContext: includes all required sections': () => {
    const loader = new ContextLoader();
    const context = loader.loadCompleteContext();

    assert.ok(Array.isArray(context.agentTaskTemplates), 'agentTaskTemplates should be array');
    assert.ok(Array.isArray(context.memoryFirst), 'memoryFirst should be array');
    assert.ok(Array.isArray(context.bestPractices), 'bestPractices should be array');
    assert.ok(Array.isArray(context.roleSystem), 'roleSystem should be array');
    assert.ok(Array.isArray(context.learningPatterns), 'learningPatterns should be array');
  },

  'getContextualReminders: returns reminders for agenttask prompt': () => {
    const loader = new ContextLoader();
    const reminders = loader.getContextualReminders('Create an agenttask for authentication');

    assert.ok(Array.isArray(reminders), 'Should return array');
    assert.ok(reminders.length > 0, 'Should have reminders');
  },

  'getContextualReminders: returns reminders for question prompt': () => {
    const loader = new ContextLoader();
    const reminders = loader.getContextualReminders('How do I implement authentication?');

    assert.ok(Array.isArray(reminders), 'Should return array');
    assert.ok(reminders.length > 0, 'Should have reminders');
  },

  'getContextualReminders: returns reminders for implementation prompt': () => {
    const loader = new ContextLoader();
    const reminders = loader.getContextualReminders('Implement user authentication');

    assert.ok(Array.isArray(reminders), 'Should return array');
    assert.ok(reminders.length > 0, 'Should have reminders');
  },

  'getContextualReminders: returns reminders for @Role prompt': () => {
    const loader = new ContextLoader();
    const reminders = loader.getContextualReminders('@Developer implement login');

    assert.ok(Array.isArray(reminders), 'Should return array');
    assert.ok(reminders.length > 0, 'Should have reminders');
  },

  'getContextualReminders: always includes learning patterns': () => {
    const loader = new ContextLoader();
    const reminders = loader.getContextualReminders('Any prompt');

    assert.ok(reminders.length > 0, 'Should include at least learning patterns');
  },

  'fallback context: includes AgentTask-Templates guidance': () => {
    const loader = new ContextLoader();
    const context = loader._getFallbackContext();

    const hasAgentTaskGuidance = context.agentTaskTemplates.some(item =>
      item.toLowerCase().includes('agenttask')
    );
    assert.ok(hasAgentTaskGuidance, 'Should include AgentTask guidance');
  },

  'fallback context: includes memory-first guidance': () => {
    const loader = new ContextLoader();
    const context = loader._getFallbackContext();

    const hasMemoryGuidance = context.memoryFirst.some(item =>
      item.toLowerCase().includes('memory')
    );
    assert.ok(hasMemoryGuidance, 'Should include memory guidance');
  }
};

console.log('\n=== Context Loader Unit Tests ===');
const allPassed = runTestSuite('context-loader.js', tests);
process.exit(allPassed ? 0 : 1);
