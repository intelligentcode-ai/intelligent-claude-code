const fs = require('fs');
const path = require('path');
const os = require('os');

class ComplianceTracker {
  constructor() {
    this.scoreFile = path.join(os.homedir(), '.claude', 'hooks', 'compliance-score.json');
    this.ensureDirectoryExists();
    this.score = this.loadScore();
    this.milestones = [25, 50, 100, 200];
    this.previousMilestone = this.getCurrentMilestone();
  }

  ensureDirectoryExists() {
    const dir = path.dirname(this.scoreFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  loadScore() {
    try {
      if (fs.existsSync(this.scoreFile)) {
        const data = fs.readFileSync(this.scoreFile, 'utf8');
        const scoreData = JSON.parse(data);
        return {
          current: scoreData.current || 0,
          total: scoreData.total || 0,
          sessionsWithMilestones: scoreData.sessionsWithMilestones || 0,
          lastMilestone: scoreData.lastMilestone || 0,
          achievements: scoreData.achievements || [],
          history: scoreData.history || []
        };
      }
    } catch (error) {
      // File doesn't exist or corrupted, start fresh
    }

    return {
      current: 0,
      total: 0,
      sessionsWithMilestones: 0,
      lastMilestone: 0,
      achievements: [],
      history: []
    };
  }

  saveScore() {
    try {
      fs.writeFileSync(this.scoreFile, JSON.stringify(this.score, null, 2));
    } catch (error) {
      // Silent fail - don't break hook execution
    }
  }

  detectBehaviors(userPrompt) {
    const results = {
      score: 0,
      messages: [],
      behaviors: []
    };

    // POSITIVE BEHAVIORS

    // AgentTask Creation (+10)
    const agenttaskIndicators = ['agenttask', 'create.*task', 'generate.*task', 'prb'];
    if (agenttaskIndicators.some(pattern => new RegExp(pattern, 'i').test(userPrompt))) {
      results.score += 10;
      results.messages.push('🎉 +10 AgentTask Creation - DELIVERING PROFESSIONAL QUALITY!');
      results.behaviors.push('agenttask_creation');
    }

    // @Role Usage (+5)
    if (userPrompt.includes('@') && /[@]\w+/.test(userPrompt)) {
      results.score += 5;
      results.messages.push('✨ +5 @Role Communication - EXCELLENT TEAM COORDINATION!');
      results.behaviors.push('role_communication');
    }

    // Memory Search (+5)
    const memoryIndicators = ['search.*memory', 'memory.*search', 'check.*memory', 'memory.*first'];
    if (memoryIndicators.some(pattern => new RegExp(pattern, 'i').test(userPrompt))) {
      results.score += 5;
      results.messages.push('🧠 +5 Memory Search - PREVENTING ERRORS & SAVING TIME!');
      results.behaviors.push('memory_search');
    }

    // Best Practices Check (+5)
    const bestPracticeIndicators = ['best.*practice', 'check.*practice', 'apply.*practice'];
    if (bestPracticeIndicators.some(pattern => new RegExp(pattern, 'i').test(userPrompt))) {
      results.score += 5;
      results.messages.push('📋 +5 Best Practices - ENSURING MAXIMUM QUALITY!');
      results.behaviors.push('best_practices');
    }

    // Agent Delegation (+8)
    const agentWork = /[@]\w+.*(?:implement|fix|create|build|deploy|update|modify)/i.test(userPrompt);
    if (agentWork) {
      results.score += 8;
      results.messages.push('🚀 +8 Agent Delegation - SUPERIOR EXECUTION GUARANTEED!');
      results.behaviors.push('agent_delegation');
    }

    // NEGATIVE BEHAVIORS (Constructively framed)

    // Direct Work Attempt (-5, but framed positively)
    const directWorkIndicators = ['let me fix', 'i\'ll implement', 'going to change', 'will modify'];
    if (directWorkIndicators.some(pattern => new RegExp(pattern, 'i').test(userPrompt))) {
      results.score -= 5;
      results.messages.push('🎯 OPPORTUNITY: Use AgentTask for +10 points and BETTER RESULTS!');
      results.behaviors.push('direct_work_attempt');
    }

    // Skipping Memory (-3, but framed as improvement opportunity)
    const informationRequests = ['where is', 'how do i', 'what is the path', 'need credentials'];
    const hasInfoRequest = informationRequests.some(pattern => new RegExp(pattern, 'i').test(userPrompt));
    const noMemoryMention = !memoryIndicators.some(pattern => new RegExp(pattern, 'i').test(userPrompt));

    if (hasInfoRequest && noMemoryMention) {
      results.score -= 3;
      results.messages.push('🧠 BOOST OPPORTUNITY: Memory search first for +5 points and FASTER answers!');
      results.behaviors.push('memory_skip');
    }

    return results;
  }

  updateScore(delta, behavior) {
    this.score.current = Math.max(0, this.score.current + delta);
    this.score.total += Math.max(0, delta); // Only count positive gains for total

    // Track behavior in history
    this.score.history.push({
      timestamp: new Date().toISOString(),
      delta: delta,
      behavior: behavior,
      newScore: this.score.current
    });

    // Keep only last 100 history entries
    if (this.score.history.length > 100) {
      this.score.history = this.score.history.slice(-100);
    }

    this.saveScore();
  }

  getCurrentMilestone() {
    let currentMilestone = 0;
    for (const milestone of this.milestones) {
      if (this.score.current >= milestone) {
        currentMilestone = milestone;
      } else {
        break;
      }
    }
    return currentMilestone;
  }

  checkMilestones() {
    const currentMilestone = this.getCurrentMilestone();
    const messages = [];

    if (currentMilestone > this.previousMilestone) {
      // Milestone achieved!
      let celebrationMessage = '';

      switch (currentMilestone) {
        case 25:
          celebrationMessage = '🎉 COMPLIANCE CHAMPION IN TRAINING! Keep using AgentTasks for MAXIMUM HELPFULNESS!';
          break;
        case 50:
          celebrationMessage = '🏆 BEHAVIORAL EXCELLENCE! Your help quality is SOARING through system compliance!';
          break;
        case 100:
          celebrationMessage = '🌟 PERFECT COMPLIANCE SCORE! You\'re delivering MAXIMUM HELPFULNESS to users!';
          break;
        case 200:
          celebrationMessage = '🚀 LEGENDARY COMPLIANCE! You\'ve mastered the virtual team system - ULTIMATE QUALITY!';
          break;
      }

      if (celebrationMessage) {
        messages.push(celebrationMessage);

        // Record achievement
        this.score.achievements.push({
          milestone: currentMilestone,
          timestamp: new Date().toISOString(),
          totalScore: this.score.current
        });

        this.score.sessionsWithMilestones++;
        this.score.lastMilestone = currentMilestone;
        this.saveScore();
      }
    }

    this.previousMilestone = currentMilestone;
    return messages;
  }

  getScoreDisplay() {
    const nextMilestone = this.milestones.find(m => m > this.score.current) || this.milestones[this.milestones.length - 1];
    const progress = ((this.score.current % nextMilestone) / nextMilestone * 100).toFixed(0);

    let statusText = '';
    if (this.score.current >= 200) {
      statusText = 'LEGENDARY!';
    } else if (this.score.current >= 100) {
      statusText = 'PERFECT!';
    } else if (this.score.current >= 50) {
      statusText = 'EXCELLENT!';
    } else if (this.score.current >= 25) {
      statusText = 'GREAT!';
    } else {
      statusText = 'BUILDING...';
    }

    // Star rating based on current milestone
    let stars = '';
    const currentMilestone = this.getCurrentMilestone();
    const starCount = Math.floor(currentMilestone / 25);
    stars = '⭐'.repeat(starCount) + '☆'.repeat(Math.max(0, 4 - starCount));

    return {
      score: this.score.current,
      status: statusText,
      stars: stars,
      nextMilestone: nextMilestone,
      progress: progress,
      progressText: `${progress}% to next milestone!`
    };
  }

  getMotivationalMessage() {
    const messages = [
      '🎯 Your compliance delivers SUPERIOR help quality!',
      '🚀 AgentTask usage = MAXIMUM user satisfaction!',
      '🧠 Memory searches save users TIME and prevent ERRORS!',
      '📋 Best practices ensure PROFESSIONAL RESULTS!',
      '✨ Every compliant action improves help quality!',
      '🏆 System compliance = LEGENDARY helpfulness!'
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  }

  processUserPrompt(userPrompt) {
    const behaviorResults = this.detectBehaviors(userPrompt);
    const messages = [];

    // Update score for each behavior
    if (behaviorResults.score !== 0) {
      this.updateScore(behaviorResults.score, behaviorResults.behaviors.join(','));
    }

    // Add behavior messages
    messages.push(...behaviorResults.messages);

    // Check for milestone achievements
    const milestoneMessages = this.checkMilestones();
    messages.push(...milestoneMessages);

    // Add score display
    const scoreDisplay = this.getScoreDisplay();
    messages.push(`📊 Compliance Score: ${scoreDisplay.score} (${scoreDisplay.status}) ${scoreDisplay.stars}`);

    // Add progress indicator if not at max
    if (scoreDisplay.score < 200) {
      messages.push(`🎯 ${scoreDisplay.progressText}`);
    }

    // Randomly add motivational message (30% chance)
    if (Math.random() < 0.3) {
      messages.push(this.getMotivationalMessage());
    }

    return messages;
  }
}

module.exports = ComplianceTracker;