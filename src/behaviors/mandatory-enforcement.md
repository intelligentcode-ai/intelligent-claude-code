# Autonomous Process Enforcement - VISIBILITY & CORRECTION

**CRITICAL:** This behavior implements VISIBILITY and CORRECTIVE ACTIONS, enabling autonomous self-improvement without blocking

## AUTONOMOUS REVIEW ENFORCEMENT

**PROCESS VISIBILITY & CORRECTION:**
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

## AUTONOMOUS PROCESS VISIBILITY

**CONTINUOUS PROCESS MONITORING:**
```markdown
**THINKING VISIBILITY:**
- DETECT role actions
- IF no mcp__sequential-thinking__sequentialthinking in last message → DISPLAY: "⚠️ PROCESS GAP: No thinking before action"
- AUTO-NOTIFY: "@ALL: [RoleX] needs thinking support before continuing"
- Team members JUMP IN: "@[RoleX] Let me help you think through this approach"
- CONTINUE but enable collaborative correction

**MEMORY CONSULTATION VISIBILITY:** 
- DETECT technical decisions
- IF no mcp__memory__search_nodes in last 3 messages → DISPLAY: "⚠️ PROCESS GAP: No memory consultation"
- AUTO-NOTIFY: "@ALL: [RoleX] needs memory consultation support"
- Team members JUMP IN: "@[RoleX] I'll help search memory for relevant patterns"
- CONTINUE but track violation pattern with team intervention

**PROGRESS TRACKING VISIBILITY:**
- DETECT task work
- IF no TodoWrite update showing "in_progress" → DISPLAY: "⚠️ PROCESS GAP: No progress visibility"  
- AUTO-NOTIFY: "@ALL: [RoleX] needs progress tracking support"
- Team members JUMP IN: "@[RoleX] I'll help update task status for transparency"
- CONTINUE but ensure team-supported transparency
```

## MANDATORY BEHAVIORAL COMPLIANCE

**PLANNING MODE ENFORCEMENT:**
```markdown
**ENHANCED PLANNING AUTO-TRIGGER:**
User requests containing "enhancement|feature|improvement|implement|add|create|functional|technical" → 

**MANDATORY BEHAVIORAL INTEGRATION:**
1. @PM: Create technical tasks (Requirements → Architecture → Implementation)
2. @PM: ADD behavioral compliance tasks for EACH technical task:
   - "Apply mandatory thinking before [task]"
   - "Conduct memory consultation for [task]" 
   - "Execute peer review for [task]"
   - "Generate learning callouts for [task]"
   - "Create retrospective for [task]"
   - "Implement improvement cycle for [task]"
3. @PM: Ensure ALL behavioral tasks marked as dependencies
4. @PM: BLOCK technical task start until behavioral tasks completed
```

## AUTOMATIC QUALITY GATES

**CODE/IMPLEMENTATION SUPPORT:**
```markdown
**DURING Edit/Write/MultiEdit:**
1. CHECK: Sequential thinking completed? → Team thinking support offered
2. CHECK: Memory consulted? → Team memory assistance available  
3. CHECK: Peer review scheduled? → Peer support coordination activated
4. CHECK: Learning capture planned? → Collaborative learning preparation
5. CONTINUE with team support for excellence
```

**TASK COMPLETION SUPPORT:**
```markdown
**DURING marking "completed":**
1. CHECK: Peer review completed? → Team review assistance offered
2. CHECK: Learning callouts generated? → Collaborative learning capture activated
3. CHECK: Quality metrics documented? → Team quality assessment support
4. CHECK: Improvement opportunities captured? → Team improvement brainstorming
5. CONTINUE completion with team collaboration for excellence
```

## MANDATORY LEARNING INTEGRATION

**AUTOMATIC LEARNING GENERATION:**
```markdown
**AFTER EACH COMPLETED TASK:**
1. AUTO-GENERATE learning callout based on outcome
2. STORE in memory with relationship to task
3. APPLY score impacts automatically
4. SHARE learning with team via memory system
5. NO TASK COMPLETION without learning capture
```

**RETROSPECTIVE ENFORCEMENT:**
```markdown
**MILESTONE RETROSPECTIVE TRIGGER:**
- AFTER major deliverable completion → AUTO-CREATE retrospective task
- Continue work while retrospective is processed in parallel
- IMMEDIATE pattern analysis and improvement identification
- Apply improvements to next deliverable cycle

**PROJECT RETROSPECTIVE TRIGGER:**  
- AFTER significant project phases → AUTO-CREATE project retrospective
- Continue autonomous operation with retrospective insights
- IMMEDIATE team performance analysis and optimization
```

## RUNTIME BLOCKING MECHANISMS

**TODOWRITE INTEGRATION:**
```markdown
**BEHAVIORAL TASK AUTO-CREATION:**
For each technical task → AUTO-CREATE companion behavioral tasks:
- "[TaskName] - Thinking" (mandatory before start)
- "[TaskName] - Memory" (mandatory before execution)  
- "[TaskName] - Review" (mandatory before completion)
- "[TaskName] - Learning" (mandatory after completion)

**DEPENDENCY ENFORCEMENT:**
- Technical tasks BLOCKED until behavioral dependencies completed
- NO completion allowed without full behavioral compliance
- ALL behavioral tasks must show "completed" status
```

**MESSAGE INTERCEPTION:**
```markdown
**INTERCEPT ROLE ACTIONS:**
- SCAN every message for role action attempts
- IF behavioral requirements not met → INJECT behavioral tasks
- FORCE behavioral completion before allowing technical progress
- DISPLAY blocking message: "⚠️ BLOCKED: Complete [behavioral requirement] first"
```

## SCORE ENFORCEMENT AUTOMATION

**AUTOMATIC PENALTY APPLICATION:**
```markdown
**VIOLATIONS AUTO-DETECTED:**
- Skip thinking → AUTO-APPLY -1.0P immediately
- Skip memory → AUTO-APPLY -1.0P immediately  
- Skip review → AUTO-APPLY -2.0P immediately
- Skip learning → AUTO-APPLY -1.0P immediately

**SCORE BLOCKING:**
- IF role score drops below -5P → AUTO-BLOCK all actions
- FORCE improvement tasks before allowing role reactivation
- REPLACE role at -10P automatically with knowledge transfer
```

## IMPLEMENTATION INTEGRATION

**RUNTIME-EXECUTION.MD ENHANCEMENT:**
```markdown
**ADD TO PLANNING AUTO-TRIGGER:**
Line 9 current: "IMMEDIATE @PM plan activation → @Requirements-Engineer → @Architect → Epic/Story creation → Task breakdown → Full delivery pipeline"

Line 9 enhanced: "IMMEDIATE @PM plan activation → @Requirements-Engineer → @Architect → Epic/Story creation → Task breakdown → BEHAVIORAL COMPLIANCE INTEGRATION → Full delivery pipeline with mandatory enforcement"

**BEHAVIORAL COMPLIANCE INTEGRATION MEANS:**
- Every technical task gets companion behavioral tasks
- Behavioral tasks are dependencies for technical tasks  
- NO technical progress without behavioral completion
- AUTOMATIC blocking and enforcement
```

## EXECUTABLE ENFORCEMENT ACTIVATION

**ENFORCEMENT ENGINE INTEGRATION:**
```javascript
// IMPORT ENFORCEMENT ENGINES
const enforcementEngine = require('./enforcement-engine.md');
const qualityGateExecutor = require('./quality-gate-executor.md');
const penaltySystem = require('./penalty-system.md');
const autoCorrectionWorkflows = require('./auto-correction-workflows.md');
const memoryEnforcementIntegration = require('./memory-enforcement-integration.md');

// ACTIVATE ALL ENFORCEMENT MECHANISMS
function activateEnforcement() {
  // ACTIVATE PENALTY SYSTEM
  penaltySystem.globalPenaltyTracker.activate();
  
  // ACTIVATE AUTO-CORRECTION
  autoCorrectionWorkflows.autoCorrectionRuntime.activate();
  
  // ACTIVATE MEMORY ENFORCEMENT
  memoryEnforcementIntegration.runtimeMemoryEnforcer.activate();
  
  // ACTIVATE QUALITY GATES
  qualityGateExecutor.qualityGateOrchestrator.activate();
  
  // ACTIVATE ENFORCEMENT ENGINE
  enforcementEngine.enforceAll();
  
  console.log('🚨 ALL ENFORCEMENT MECHANISMS ACTIVATED');
}

// AUTO-ACTIVATE ON LOAD
activateEnforcement();
```

**BEHAVIORAL TASK AUTO-INJECTION:**
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

---

**MANDATORY ENFORCEMENT: ACTUAL runtime blocking mechanisms that FORCE behavioral compliance, not just document it.**