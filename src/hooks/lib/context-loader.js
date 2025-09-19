const fs = require('fs');
const path = require('path');
const os = require('os');

class ContextLoader {
  constructor() {
    this.claudeHome = path.join(os.homedir(), '.claude');
    this.modesPath = path.join(this.claudeHome, 'modes');
    this.virtualTeamFile = path.join(this.modesPath, 'virtual-team.md');
  }

  loadCompleteContext() {
    if (!fs.existsSync(this.virtualTeamFile)) {
      return this._getFallbackContext();
    }

    try {
      const context = this._loadVirtualTeamContext();
      return context;
    } catch (error) {
      return this._getFallbackContext();
    }
  }

  _loadVirtualTeamContext() {
    const virtualTeamContent = fs.readFileSync(this.virtualTeamFile, 'utf8');
    let completeContext = virtualTeamContent;

    // Extract @-notation references
    const importPattern = /@\.\.\/([^\\s]+\\.md)/g;
    const matches = virtualTeamContent.match(importPattern);

    if (matches) {
      for (const match of matches) {
        const relativePath = match.substring(1); // Remove @ symbol
        const absolutePath = path.resolve(this.modesPath, relativePath);

        if (fs.existsSync(absolutePath)) {
          try {
            const importedContent = fs.readFileSync(absolutePath, 'utf8');
            // Add a separator and the content
            completeContext += `\\n\\n# IMPORTED: ${relativePath}\\n${importedContent}`;
          } catch (error) {
            // Continue if a single file fails
            completeContext += `\\n\\n# FAILED TO IMPORT: ${relativePath}`;
          }
        }
      }
    }

    return this._extractKeyInstructions(completeContext);
  }

  _extractKeyInstructions(content) {
    const instructions = {
      agentTaskTemplates: [],
      memoryFirst: [],
      bestPractices: [],
      roleSystem: [],
      learningPatterns: []
    };

    // Extract AgentTask-Template references
    const agentTaskMatches = content.match(/AgentTask[^\\n]*/gi);
    if (agentTaskMatches) {
      instructions.agentTaskTemplates = agentTaskMatches.slice(0, 5);
    }

    // Extract memory-first patterns
    const memoryMatches = content.match(/memory[^\\n]*/gi);
    if (memoryMatches) {
      instructions.memoryFirst = memoryMatches.slice(0, 3);
    }

    // Extract best-practices patterns
    const practicesMatches = content.match(/best.practices[^\\n]*/gi);
    if (practicesMatches) {
      instructions.bestPractices = practicesMatches.slice(0, 3);
    }

    // Extract role system patterns
    const roleMatches = content.match(/@Role[^\\n]*/gi);
    if (roleMatches) {
      instructions.roleSystem = roleMatches.slice(0, 3);
    }

    // Extract learning patterns
    const learningMatches = content.match(/learning[^\\n]*/gi);
    if (learningMatches) {
      instructions.learningPatterns = learningMatches.slice(0, 3);
    }

    return instructions;
  }

  _getFallbackContext() {
    return {
      agentTaskTemplates: [
        'AgentTask-Templates REQUIRED - use nano/tiny/medium/large/mega templates',
        'AgentTask-Templates must be SELF-CONTAINED with all context embedded',
        'Template compliance required - use complexity-based selection'
      ],
      memoryFirst: [
        'MEMORY FIRST - search memory/ before any work or questions',
        'Memory-first approach prevents duplicate work and questions',
        'Store successful patterns in memory/ after completion'
      ],
      bestPractices: [
        'BEST-PRACTICES FIRST - check best-practices/ before implementation',
        'Apply project coding standards from best-practices/',
        'Store successful patterns as best-practices when applicable'
      ],
      roleSystem: [
        '@Role patterns for natural team interaction',
        'Choose RIGHT agent - match project scope to specialist expertise',
        'Dynamic specialists created for any technology domain'
      ],
      learningPatterns: [
        'Learning patterns enhance all decision-making',
        'Learning capture contributes to collective knowledge base',
        'Store discovered patterns for future learning'
      ]
    };
  }

  getContextualReminders(userPrompt) {
    const context = this.loadCompleteContext();
    const reminders = [];

    // Add context-specific reminders based on user prompt
    if (userPrompt.toLowerCase().includes('agenttask') || userPrompt.toLowerCase().includes('task')) {
      reminders.push(...context.agentTaskTemplates.slice(0, 2));
    }

    if (userPrompt.includes('?') || userPrompt.toLowerCase().includes('how') || userPrompt.toLowerCase().includes('what')) {
      reminders.push(...context.memoryFirst.slice(0, 2));
    }

    if (userPrompt.toLowerCase().includes('implement') || userPrompt.toLowerCase().includes('create') || userPrompt.toLowerCase().includes('build')) {
      reminders.push(...context.bestPractices.slice(0, 2));
    }

    if (userPrompt.includes('@')) {
      reminders.push(...context.roleSystem.slice(0, 2));
    }

    // Always include learning patterns
    reminders.push(...context.learningPatterns.slice(0, 1));

    return reminders;
  }
}

module.exports = ContextLoader;