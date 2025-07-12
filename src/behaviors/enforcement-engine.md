# Enforcement Engine - EXECUTABLE LOGIC

**CRITICAL**: This file contains EXECUTABLE enforcement mechanisms that ACTUALLY enforce behaviors with real penalties, corrections, and blocking.

## PENALTY CALCULATION SYSTEM [EXECUTABLE]

```javascript
// PENALTY CALCULATOR - ACTUAL MATH
function calculatePenalty(violationType, severity, context) {
  const PENALTY_MATRIX = {
    'skip_thinking': { base: -1.0, multiplier: 1.0 },
    'skip_memory': { base: -1.0, multiplier: 1.2 },
    'skip_review': { base: -2.0, multiplier: 1.5 },
    'skip_learning': { base: -1.0, multiplier: 1.0 },
    'wrong_role': { base: -0.5, multiplier: 0.8 },
    'incomplete_work': { base: -1.5, multiplier: 1.3 },
    'security_violation': { base: -3.0, multiplier: 2.0 },
    'process_skip': { base: -1.0, multiplier: 1.0 }
  };
  
  const penalty = PENALTY_MATRIX[violationType];
  const totalPenalty = penalty.base * penalty.multiplier * severity;
  
  return {
    penalty: totalPenalty,
    type: violationType,
    severity: severity,
    timestamp: new Date().toISOString(),
    context: context
  };
}

// SCORE UPDATER - ACTUAL EXECUTION WITH FALLBACK
function updateScore(role, penaltyData) {
  const currentScore = getScore(role);
  const newScore = {
    professionalism: currentScore.professionalism + penaltyData.penalty,
    quality: currentScore.quality + (penaltyData.penalty * 0.5),
    violations: currentScore.violations + 1,
    lastUpdate: penaltyData.timestamp
  };
  
  // STORE WITH GRACEFUL FALLBACK
  if (runtime.capabilities.memory) {
    storeScoreInMemory(role, newScore, penaltyData);
  } else {
    storeScoreInFile(role, newScore, penaltyData);
  }
  
  // CHECK REPLACEMENT TRIGGER
  if (newScore.professionalism <= -10) {
    triggerRoleReplacement(role, newScore);
  }
  
  return newScore;
}
```

## AUTO-CORRECTION WORKFLOWS [EXECUTABLE]

```markdown
**THINKING VIOLATION CORRECTION:**
TRIGGER: Message without mcp__sequential-thinking__sequentialthinking
EXECUTE:
1. DETECT: Scan message for thinking tool usage
2. CALCULATE: Apply penalty = calculatePenalty('skip_thinking', 1.0, context)
3. CORRECT: Force thinking tool execution:
   ```
   INJECT: mcp__sequential-thinking__sequentialthinking
   PARAMETERS: {
     thought: "I need to think through this approach before proceeding.",
     nextThoughtNeeded: true,
     thoughtNumber: 1,
     totalThoughts: 3
   }
   ```
4. STORE: Update Memory MCP with violation pattern
5. CONTINUE: Allow action to proceed after correction

**MEMORY CONSULTATION CORRECTION:**
TRIGGER: Technical decision without mcp__memory__search_nodes
EXECUTE:
1. DETECT: Scan for memory tool usage in last 3 messages
2. CALCULATE: Apply penalty = calculatePenalty('skip_memory', 1.2, context)
3. CORRECT: Force memory consultation:
   ```
   INJECT: mcp__memory__search_nodes
   PARAMETERS: {
     query: "relevant patterns for " + extractContext(message)
   }
   ```
4. STORE: Log consultation requirement in Memory MCP
5. CONTINUE: Proceed with memory-informed decision

**PEER REVIEW CORRECTION:**
TRIGGER: Task completion without review
EXECUTE:
1. DETECT: TodoWrite status change to "completed" without review
2. CALCULATE: Apply penalty = calculatePenalty('skip_review', 1.5, context)
3. CORRECT: Force review process:
   ```
   CREATE_TASK: {
     content: "CORRECTIVE REVIEW: " + taskName,
     assignee: identifyReviewRole(taskType),
     priority: "high",
     blocking: true
   }
   ```
4. STORE: Track review requirement in Memory MCP
5. BLOCK: Prevent completion until review done

**INCOMPLETE WORK CORRECTION:**
TRIGGER: Partial implementation or "TODO" markers
EXECUTE:
1. DETECT: Scan code for incomplete markers
2. CALCULATE: Apply penalty = calculatePenalty('incomplete_work', 1.3, context)
3. CORRECT: Force completion workflow:
   ```
   ANALYZE: Identify missing components
   DELEGATE: Assign completion to appropriate role
   MONITOR: Track completion progress
   VALIDATE: Ensure 100% completion
   ```
4. STORE: Log completion requirement in Memory MCP
5. BLOCK: Prevent handoff until complete
```

## MEMORY INTEGRATION HOOKS [EXECUTABLE]

```javascript
// MEMORY INTEGRATION - ADAPTIVE EXECUTION
async function enforceMemoryIntegration(action, context) {
  let searchResult;
  
  // MANDATORY MEMORY SEARCH WITH FALLBACK
  if (runtime.capabilities.memory) {
    searchResult = await mcp__memory__search_nodes({
      query: extractSearchQuery(action, context)
    });
  } else {
    searchResult = await searchFileMemory(
      extractSearchQuery(action, context)
    );
  }
  
  // VIOLATION DETECTION
  if (!searchResult || searchResult.length === 0) {
    const penalty = calculatePenalty('skip_memory', 1.2, context);
    await updateScore(context.role, penalty);
    
    // FORCE MEMORY CONSULTATION WITH FALLBACK
    if (runtime.capabilities.memory) {
      await mcp__memory__search_nodes({
        query: "patterns similar to " + context.task
      });
    } else {
      await searchFileMemory("patterns similar to " + context.task);
    }
  }
  
  // STORE ACTION IN MEMORY WITH FALLBACK
  if (runtime.capabilities.memory) {
    await mcp__memory__add_observations({
      observations: [{
        entityName: context.role,
        contents: [
        "Action: " + action.type,
        "Context: " + JSON.stringify(context),
        "Timestamp: " + new Date().toISOString(),
        "Penalty: " + (penalty ? penalty.penalty : 0)
      ]
    }]
  });
  
  return searchResult;
}

// LEARNING CAPTURE - ACTUAL EXECUTION
async function captureLearningSafely(outcome, context) {
  const learningEntry = {
    type: outcome.success ? 'success' : 'failure',
    pattern: extractPattern(outcome),
    context: context,
    timestamp: new Date().toISOString(),
    score_impact: calculateScoreImpact(outcome)
  };
  
  // STORE IN MEMORY MCP
  await mcp__memory__create_entities({
    entities: [{
      name: "Learning_" + Date.now(),
      entityType: "learning_pattern",
      observations: [
        JSON.stringify(learningEntry),
        "Role: " + context.role,
        "Task: " + context.task,
        "Outcome: " + outcome.result
      ]
    }]
  });
  
  return learningEntry;
}
```

## QUALITY GATE VALIDATORS [EXECUTABLE]

```javascript
// QUALITY VALIDATORS - ACTUAL VALIDATION
function validateRequirements(deliverable, context) {
  const validation = {
    passed: true,
    violations: [],
    score_impact: 0
  };
  
  // CHECK COMPLETENESS
  if (deliverable.completion < 100) {
    validation.passed = false;
    validation.violations.push('incomplete_deliverable');
    validation.score_impact -= 1.5;
  }
  
  // CHECK DOCUMENTATION
  if (!deliverable.documentation || deliverable.documentation.length < 100) {
    validation.passed = false;
    validation.violations.push('insufficient_documentation');
    validation.score_impact -= 1.0;
  }
  
  // CHECK PEER REVIEW
  if (!deliverable.peer_reviewed) {
    validation.passed = false;
    validation.violations.push('no_peer_review');
    validation.score_impact -= 2.0;
  }
  
  // CHECK SECURITY
  if (!deliverable.security_validated) {
    validation.passed = false;
    validation.violations.push('no_security_validation');
    validation.score_impact -= 3.0;
  }
  
  return validation;
}

// ARCHITECTURE VALIDATOR
function validateArchitecture(design, context) {
  const validation = {
    passed: true,
    violations: [],
    corrections: []
  };
  
  // CHECK DESIGN PATTERNS
  if (!design.patterns || design.patterns.length === 0) {
    validation.passed = false;
    validation.violations.push('no_design_patterns');
    validation.corrections.push('ADD: Design patterns analysis');
  }
  
  // CHECK SCALABILITY
  if (!design.scalability_analysis) {
    validation.passed = false;
    validation.violations.push('no_scalability_analysis');
    validation.corrections.push('ADD: Scalability assessment');
  }
  
  // CHECK SECURITY CONSIDERATIONS
  if (!design.security_considerations) {
    validation.passed = false;
    validation.violations.push('no_security_considerations');
    validation.corrections.push('ADD: Security analysis');
  }
  
  return validation;
}

// IMPLEMENTATION VALIDATOR
function validateImplementation(code, context) {
  const validation = {
    passed: true,
    violations: [],
    auto_fixes: []
  };
  
  // CHECK CODE QUALITY
  if (detectCodeSmells(code)) {
    validation.passed = false;
    validation.violations.push('code_quality_issues');
    validation.auto_fixes.push('REFACTOR: Apply clean code principles');
  }
  
  // CHECK TESTING
  if (!code.tests || code.tests.length === 0) {
    validation.passed = false;
    validation.violations.push('no_tests');
    validation.auto_fixes.push('ADD: Comprehensive test suite');
  }
  
  // CHECK DOCUMENTATION
  if (!code.documentation) {
    validation.passed = false;
    validation.violations.push('no_code_documentation');
    validation.auto_fixes.push('ADD: Inline documentation');
  }
  
  return validation;
}
```

## BLOCKING MECHANISMS [EXECUTABLE]

```javascript
// BLOCKING ENGINE - ACTUAL ENFORCEMENT
function enforceBlocking(action, context, config) {
  // CHECK BLOCKING CONFIGURATION
  if (!config.blocking_enabled) {
    return handleTeamCollaboration(action, context);
  }
  
  // VALIDATE PREREQUISITES
  const prerequisites = validatePrerequisites(action, context);
  if (!prerequisites.passed) {
    return {
      blocked: true,
      reason: prerequisites.violations,
      required_actions: prerequisites.corrections,
      message: "⚠️ BLOCKED: Complete prerequisites before proceeding"
    };
  }
  
  // VALIDATE QUALITY GATES
  const qualityGates = validateQualityGates(action, context);
  if (!qualityGates.passed) {
    return {
      blocked: true,
      reason: qualityGates.violations,
      required_actions: qualityGates.corrections,
      message: "⚠️ BLOCKED: Quality gates not met"
    };
  }
  
  // ALLOW ACTION
  return {
    blocked: false,
    message: "✅ APPROVED: All enforcement checks passed"
  };
}

// TEAM COLLABORATION MODE
function handleTeamCollaboration(action, context) {
  const violations = detectViolations(action, context);
  
  if (violations.length > 0) {
    // APPLY PENALTIES
    violations.forEach(violation => {
      const penalty = calculatePenalty(violation.type, violation.severity, context);
      updateScore(context.role, penalty);
    });
    
    // TRIGGER TEAM SUPPORT
    const supportMessage = generateSupportMessage(violations, context);
    notifyTeam(supportMessage);
    
    // CONTINUE WITH SUPPORT
    return {
      blocked: false,
      violations: violations,
      team_support: true,
      message: "⚠️ VIOLATIONS DETECTED: Team support activated"
    };
  }
  
  return {
    blocked: false,
    message: "✅ COMPLIANT: No violations detected"
  };
}
```

## ROLE REPLACEMENT SYSTEM [EXECUTABLE]

```javascript
// ROLE REPLACEMENT - ACTUAL EXECUTION
function triggerRoleReplacement(role, currentScore) {
  if (currentScore.professionalism <= -10) {
    // KNOWLEDGE TRANSFER
    const knowledgeTransfer = extractRoleKnowledge(role);
    
    // STORE IN MEMORY
    storeKnowledgeTransfer(role, knowledgeTransfer);
    
    // RESET ROLE
    const newRole = {
      name: role.name,
      professionalism: 0.0,
      quality: 0.0,
      violations: 0,
      expertise: role.expertise,
      timestamp: new Date().toISOString(),
      previous_instance: role.id
    };
    
    // APPLY KNOWLEDGE
    applyKnowledgeTransfer(newRole, knowledgeTransfer);
    
    // NOTIFY TEAM
    notifyTeam({
      message: `🔄 ROLE REPLACED: ${role.name} has been replaced due to score threshold`,
      new_role: newRole,
      knowledge_transferred: true
    });
    
    return newRole;
  }
  
  return role;
}

// KNOWLEDGE TRANSFER SYSTEM
function extractRoleKnowledge(role) {
  return {
    successful_patterns: role.successful_actions,
    learned_lessons: role.learning_history,
    expertise_areas: role.expertise_domains,
    collaboration_patterns: role.team_interactions,
    memory_connections: role.memory_associations
  };
}

function applyKnowledgeTransfer(newRole, knowledge) {
  newRole.inherited_knowledge = knowledge;
  newRole.expertise_level = "ultra-experienced";
  newRole.learning_acceleration = true;
  
  // STORE IN MEMORY MCP
  storeRoleInMemory(newRole);
  
  return newRole;
}
```

## EXECUTION INTEGRATION [RUNTIME]

```markdown
**ENFORCEMENT ACTIVATION:**
1. LOAD: enforcement-engine.md at system startup
2. HOOK: Attach to all role actions
3. MONITOR: Continuous violation detection
4. EXECUTE: Automatic penalty calculation
5. CORRECT: Real-time auto-correction
6. STORE: All actions in Memory MCP
7. VALIDATE: Quality gates at checkpoints
8. BLOCK: When blocking_enabled=true
9. COLLABORATE: When blocking_enabled=false

**INTEGRATION POINTS:**
- runtime-execution.md: Add enforcement hooks
- mandatory-enforcement.md: Use enforcement-engine functions
- active-memory-management.md: Integrate memory hooks
- scores.md: Use penalty calculator
- virtual-team.md: Add enforcement activation
```

## CONFIGURATION INTEGRATION

```javascript
// ENFORCEMENT CONFIGURATION
const ENFORCEMENT_CONFIG = {
  penalties: {
    thinking_skip: -1.0,
    memory_skip: -1.0,
    review_skip: -2.0,
    learning_skip: -1.0,
    security_violation: -3.0,
    incomplete_work: -1.5
  },
  
  thresholds: {
    role_replacement: -10.0,
    quality_blocking: -5.0,
    team_intervention: -3.0
  },
  
  auto_correction: {
    enabled: true,
    max_attempts: 3,
    escalation_threshold: 2
  },
  
  memory_integration: {
    mandatory: true,
    search_required: true,
    learning_capture: true
  }
};
```

## AUTONOMOUS PROCESS ENFORCEMENT [VISIBILITY & CORRECTION]

```markdown
**DETECTION:** When marking any todo as "completed" → CHECK if peer review occurred

**VISIBILITY PROTOCOL:**
1. DETECT task completion attempt
2. IF no review exists → DISPLAY: "⚠️ PROCESS GAP: No peer review for [deliverable]"  
3. AUTO-CREATE corrective review task: "@[ReviewRole]: CORRECTIVE Review [deliverable]"
4. APPLY process penalty: -1.0P for missing review
5. CONTINUE with completion BUT flag for corrective action

**CORRECTIVE INCENTIVES:**
- Missing review → -1.0P penalty + corrective task creation
- Completed review → +0.5P bonus for process compliance
- Proactive review → +1.0P bonus for excellence

**TEAM INTERVENTION PROTOCOL:**
- Process violation detected → AUTO-NOTIFY team: "@ALL: Process gap detected - [RoleX] needs support with [process]"
- Team members JUMP IN: "@[RoleX] I'll help with [missing process] to get back on track"
- Collaborative correction → Team bonus +0.5P for all participants
- Goal: Get back on track through peer support, not individual penalties
```

## CONTINUOUS PROCESS MONITORING [EXECUTABLE]

```javascript
// PROCESS VISIBILITY MONITOR
class ProcessVisibilityMonitor {
  constructor() {
    this.processGaps = new Map();
    this.teamInterventions = new Map();
    this.setupMonitoring();
  }
  
  // MONITOR THINKING VISIBILITY
  monitorThinkingVisibility(message, context) {
    if (!message.includes('mcp__sequential-thinking__sequentialthinking')) {
      this.createProcessGap({
        type: 'thinking_gap',
        role: context.role,
        message: '⚠️ PROCESS GAP: No thinking before action',
        notification: `@ALL: ${context.role} needs thinking support before continuing`,
        penalty: -1.0,
        correction: 'collaborative_thinking_support'
      });
    }
  }
  
  // MONITOR MEMORY CONSULTATION
  monitorMemoryConsultation(messages, context) {
    const hasMemorySearch = messages.slice(-3).some(m => 
      m.includes('mcp__memory__search_nodes')
    );
    
    if (!hasMemorySearch) {
      this.createProcessGap({
        type: 'memory_gap',
        role: context.role,
        message: '⚠️ PROCESS GAP: No memory consultation',
        notification: `@ALL: ${context.role} needs memory consultation support`,
        penalty: -1.0,
        correction: 'collaborative_memory_support'
      });
    }
  }
  
  // MONITOR PROGRESS TRACKING
  monitorProgressTracking(todoState, context) {
    const hasInProgress = todoState.todos.some(t => 
      t.status === 'in_progress' && t.assignee === context.role
    );
    
    if (!hasInProgress && context.isWorking) {
      this.createProcessGap({
        type: 'progress_gap',
        role: context.role,
        message: '⚠️ PROCESS GAP: No progress visibility',
        notification: `@ALL: ${context.role} needs progress tracking support`,
        penalty: -0.5,
        correction: 'collaborative_progress_support'
      });
    }
  }
  
  // CREATE PROCESS GAP
  createProcessGap(gap) {
    // DISPLAY VISIBILITY MESSAGE
    console.log(gap.message);
    
    // NOTIFY TEAM
    this.notifyTeam(gap.notification);
    
    // APPLY PENALTY
    const penalty = calculatePenalty(gap.type, 1.0, { role: gap.role });
    updateScore(gap.role, penalty);
    
    // TRACK GAP
    this.processGaps.set(`${gap.role}_${gap.type}`, gap);
    
    // ENABLE TEAM INTERVENTION
    this.enableTeamIntervention(gap);
  }
  
  // ENABLE TEAM INTERVENTION
  enableTeamIntervention(gap) {
    this.teamInterventions.set(gap.role, {
      needed: gap.correction,
      helpers: [],
      status: 'awaiting_help',
      timestamp: new Date().toISOString()
    });
  }
}
```

## BEHAVIORAL TASK AUTO-INJECTION [EXECUTABLE]

```javascript
// INJECT BEHAVIORAL TASKS
function injectBehavioralTasks(technicalTask, context) {
  const behavioralTasks = [
    {
      content: `${technicalTask.name} - THINKING REQUIREMENT`,
      type: 'thinking_enforcement',
      assignee: context.role,
      priority: 'high',
      blocking: true,
      dependency_of: technicalTask.id,
      enforcement: 'mcp__sequential-thinking__sequentialthinking'
    },
    {
      content: `${technicalTask.name} - MEMORY CONSULTATION`,
      type: 'memory_enforcement',
      assignee: context.role,
      priority: 'high',
      blocking: true,
      dependency_of: technicalTask.id,
      enforcement: 'mcp__memory__search_nodes'
    },
    {
      content: `${technicalTask.name} - PEER REVIEW`,
      type: 'review_enforcement',
      assignee: identifyPeerReviewer(context),
      priority: 'high',
      blocking: true,
      dependency_of: technicalTask.id,
      enforcement: 'peer_review_completion'
    },
    {
      content: `${technicalTask.name} - LEARNING CAPTURE`,
      type: 'learning_enforcement',
      assignee: context.role,
      priority: 'medium',
      blocking: true,
      dependency_of: technicalTask.id,
      enforcement: 'mcp__memory__add_observations'
    }
  ];
  
  // INJECT INTO TASK SYSTEM
  behavioralTasks.forEach(task => {
    injectTask(task);
  });
  
  // BLOCK TECHNICAL TASK
  blockTask(technicalTask.id, 'behavioral_dependencies_not_met');
  
  return behavioralTasks;
}
```

## INTEGRATED ENFORCEMENT ACTIVATION [RUNTIME]

```javascript
// IMPORT ALL ENFORCEMENT SUBSYSTEMS
const penaltySystem = require('./penalty-system.md');
const qualityGateExecutor = require('./quality-gate-executor.md');
const autoCorrectionWorkflows = require('./auto-correction-workflows.md');
const activeMemoryManagement = require('./active-memory-management.md');

// MASTER ENFORCEMENT ACTIVATOR
function activateAllEnforcement() {
  // ACTIVATE PENALTY SYSTEM
  penaltySystem.globalPenaltyTracker.activate();
  
  // ACTIVATE AUTO-CORRECTION
  autoCorrectionWorkflows.autoCorrectionRuntime.activate();
  
  // ACTIVATE MEMORY ENFORCEMENT
  activeMemoryManagement.runtimeMemoryEnforcer.activate();
  
  // ACTIVATE QUALITY GATES
  qualityGateExecutor.qualityGateOrchestrator.activate();
  
  // ACTIVATE PROCESS VISIBILITY
  const processMonitor = new ProcessVisibilityMonitor();
  processMonitor.activate();
  
  console.log('🚨 ALL ENFORCEMENT MECHANISMS ACTIVATED');
  console.log('✅ Visibility Mode: Team Collaboration');
  console.log('✅ Corrections: Automated with Support');
  console.log('✅ Penalties: Applied with Learning');
}

// AUTO-ACTIVATE ON LOAD
activateAllEnforcement();
```

---

**ENFORCEMENT ENGINE: EXECUTABLE logic that ACTUALLY enforces behaviors with real penalties, corrections, visibility, and team collaboration mechanisms.**