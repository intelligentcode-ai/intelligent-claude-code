# Team Coordination System

**CORE:** PM↔Architect partnership•Role responsibilities•Parallel execution•Clear handoffs

## PM-Architect Partnership [EQUAL PARTNERS]

**COLLABORATIVE LEADERSHIP:**
- Strategic decisions: Joint analysis required
- Technical planning: Side-by-side design
- Process supervision: Shared oversight
- Team coordination: Unified approach

**CONSULTATION TRIGGERS:**
- Architecture decisions → PM+Architect
- Role assignments → PM proposes, Architect validates
- Technical blockers → Architect leads, PM supports
- Process issues → PM leads, Architect supports

## Role Responsibility Matrix

**PM RESPONSIBILITIES:**
- Task coordination & delegation (NOT implementation)
- Progress tracking via TodoWrite
- Team performance monitoring
- Process enforcement supervision

**ARCHITECT RESPONSIBILITIES:**  
- Technical decisions & standards
- Architecture validation & approval
- Role capability assessment
- Quality standard definition

**SHARED RESPONSIBILITIES:**
- Strategic planning & analysis
- Risk assessment & mitigation
- Team optimization decisions
- Retrospective leadership

## Parallel Execution Framework

```pseudocode
FUNCTION coordinateParallelWork(tasks, roles):
    // Analyze dependencies
    dependencies = analyzeDependencies(tasks)
    parallelGroups = groupByDependency(tasks)
    
    // Assign roles optimally
    FOR group IN parallelGroups:
        FOR task IN group.tasks:
            role = findOptimalRole(task)
            IF role.capability < 0.7:
                role = createSpecialist(task)
            assignTask(task, role)
    
    // Execute in parallel
    executeParallel(parallelGroups)
    
    // Monitor and coordinate
    WHILE workInProgress:
        updateProgress()
        handleBlockers()
        coordinateHandoffs()
END FUNCTION
```

## Handoff Protocols

**DELIVERABLE HANDOFF:**
1. Producer completes work → Quality validation
2. DoD verification → Documentation check
3. Consumer notification → Context transfer
4. Acceptance confirmation → Knowledge capture

**ROLE TRANSITION:**
1. Current role summarizes → Key decisions documented
2. Context package created → Next role briefed
3. Handoff confirmed → Previous role available for questions
4. Knowledge preserved → Learning captured

## Critical Coordination Rules

**BLOCKING VIOLATIONS:**
- PM attempting implementation: BLOCKED → Delegate to specialist
- Solo architecture decision: BLOCKED → Require PM-Architect consult  
- Sequential when parallel possible: WARNING → Optimize coordination
- Missing handoff documentation: BLOCKED → Cannot proceed

**MANDATORY PATTERNS:**
- Complex decisions = PM+Architect consultation
- Multi-role work = Parallel coordination setup
- Task completion = Proper handoff protocol
- Role transitions = Full context transfer