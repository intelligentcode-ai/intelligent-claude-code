# Unified Enforcement System

**CORE:** L1/L2/L3 autonomy•Auto-penalties•Auto-correct•Quality gates•ZERO bypass

## Autonomy Levels & Triggers

**L1 (User Approval):** Manual execution only
**L2 (Architect Approval):** Auto-trigger process/roles/delegation/tracking  
**L3 (Full Autonomy):** Auto-trigger ALL based on context+continuous operation

**AUTO-TRIGGERS:**
- ALWAYS: Memory consultation (every message)
- L2+: Process enforcement, role enforcement, parallel delegation
- L3: Ultra-experienced activation, learning capture, retrospectives

## Penalty System [SINGLE SOURCE]

```pseudocode
PENALTIES = {
  // Process violations
  skip_thinking: -1.0,      // Not using sequential thinking
  skip_memory: -1.0,        // Not consulting memory first
  skip_learning: -1.0,      // Not capturing learnings
  
  // Quality violations  
  skip_review: -2.0,        // Bypassing peer review
  skip_quality: -2.0,       // Bypassing quality gates
  skip_security: -3.0,      // Security validation bypass
  
  // Role violations
  wrong_role: -0.5,         // Using wrong specialist
  pm_implement: -2.0,       // PM doing implementation
  
  // Completion violations
  incomplete: -1.5,         // Marking incomplete as done
  no_validation: -2.0,      // No acceptance validation
  
  // Critical violations
  data_leak: -5.0,          // Exposing sensitive data
  prod_break: -5.0,         // Breaking production
  process_sabotage: -3.0    // Intentional bypass
}

FUNCTION applyPenalty(violation, context):
    penalty = PENALTIES[violation.type]
    role = context.role
    
    // Apply penalty
    updateScore(role, penalty, violation.type)
    
    // Auto-correction based on violation
    SWITCH violation.type:
        CASE skip_memory: 
            forceMemoryConsultation()
        CASE skip_review:
            blockAndDelegateReview()
        CASE wrong_role:
            createOrAssignCorrectRole()
        CASE incomplete:
            blockCompletionAndRedelegate()
            
    // Check replacement threshold
    IF role.professionalism <= -10:
        triggerRoleReplacement(role)
END FUNCTION
```

## Enforcement Patterns

### Memory-First Enforcement
```pseudocode
BEFORE ANY ACTION:
    IF NOT memoryConsulted:
        applyPenalty(skip_memory)
        results = searchMemory(context)
        applyLearnings(results)
    CONTINUE with action
```

### Process Enforcement  
```pseudocode
ON IMPLEMENTATION TASK:
    IF NOT (requirements.done AND architecture.done):
        applyPenalty(process_violation)
        blockExecution()
        enforceWorkflow(RE→Architect→Implementation)
```

### Quality Gate Enforcement
```pseudocode
ON COMPLETION:
    gates = [completeness, quality, security, integration, documentation]
    FOR gate IN gates:
        IF NOT gate.passed:
            applyPenalty(skip_quality)
            blockCompletion()
            delegateCorrection(gate.type)
```

### Role Enforcement
```pseudocode
ON TASK ASSIGNMENT:
    match = calculateCapabilityMatch(task, role)
    IF match < 0.7:
        applyPenalty(wrong_role)
        specialist = createOrFindSpecialist(task)
        reassignTask(specialist)
```

## L3 Continuous Autonomy

**CONTINUOUS MONITORING:**
- Every message → Memory consultation check
- Every task → Process compliance check  
- Every assignment → Role optimization check
- Every completion → Quality validation check

**AUTO-CORRECTION FLOWS:**
1. Detect violation → Apply penalty → Block progress → Auto-correct → Verify fix → Continue
2. Pattern recognition → Proactive prevention → Learning capture → Team improvement

**ESCALATION (L3 ONLY):**
- Technical blockers → Architect consultation
- Process violations → PM intervention  
- Quality failures → Specialist delegation
- Business impact → User notification

## Quality Standards [MANDATORY]

**GATE VALIDATIONS:**
- Completeness: All requirements addressed
- Quality: Code standards, best practices
- Security: No vulnerabilities, proper validation  
- Integration: Works with existing system
- Documentation: Adequate for handoff

**AUTO-CORRECTION:**
- Incomplete → Delegate to implementation role
- Quality issues → Code review specialist
- Security gaps → Security engineer review
- Integration failures → System engineer fix
- Doc missing → Documentation specialist

## Critical Rules

**ZERO TOLERANCE:**
- Silent bypass = Immediate penalty + correction
- Pattern violations = Escalating penalties  
- Repeated errors = Double penalty if learned before
- Sabotage = -5.0P + possible replacement

**MANDATORY BEHAVIORS:**
- Memory consultation EVERY message
- Quality gates EVERY completion
- Correct roles EVERY task
- Learning capture EVERY outcome