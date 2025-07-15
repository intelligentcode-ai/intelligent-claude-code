# Capability Matching Enforcement Module [ST-004]

**CORE:** MANDATORY capability matching•<70% FORCES specialist•ZERO bypass•DOCUMENTED evidence

## CRITICAL ENFORCEMENT [NON-NEGOTIABLE]

**DIRECTIVE:** NO TASK ASSIGNMENT WITHOUT CAPABILITY CALCULATION
**PENALTY:** -2.0P for bypass•-3.0P for wrong assignment•IMMEDIATE BLOCKING
**REQUIREMENT:** EVERY assignment MUST calculate AND document match percentage

## Capability Match Calculator [ENFORCED]

```pseudocode
// CAPABILITY MATCH ENFORCEMENT ENGINE
FUNCTION enforceCapabilityMatch(task, proposedRole):
    
    // MANDATORY CALCULATION - NO EXCEPTIONS
    IF NOT task.requirements OR NOT proposedRole.capabilities:
        THROW "VIOLATION: Missing requirements/capabilities"
        applyPenalty(-2.0, "P", "CAPABILITY_BYPASS")
        BLOCK_EXECUTION()
    
    // EXTRACT TASK REQUIREMENTS
    requiredCapabilities = extractRequiredCapabilities(task)
    requiredExpertise = extractRequiredExpertise(task)
    requiredTools = extractRequiredTools(task)
    
    // EXTRACT ROLE CAPABILITIES
    roleCapabilities = proposedRole.capabilities
    roleExpertise = proposedRole.expertise
    roleTools = proposedRole.tools
    
    // CALCULATE MATCH PERCENTAGE
    capabilityScore = calculateCapabilityOverlap(requiredCapabilities, roleCapabilities)
    expertiseScore = calculateExpertiseMatch(requiredExpertise, roleExpertise)
    toolScore = calculateToolMatch(requiredTools, roleTools)
    
    // WEIGHTED CALCULATION
    matchPercentage = (
        capabilityScore * 0.4 +
        expertiseScore * 0.4 +
        toolScore * 0.2
    ) * 100
    
    // ENFORCEMENT DECISION
    IF matchPercentage < 70:
        HALT_EXECUTION()
        logViolation("CAPABILITY_MISMATCH", proposedRole, task, matchPercentage)
        RETURN {
            status: "BLOCKED",
            matchPercentage: matchPercentage,
            action: "CREATE_SPECIALIST_REQUIRED",
            specialist: generateSpecialistRequirements(task, requiredCapabilities)
        }
    
    // MANDATORY DOCUMENTATION
    documentMatch(task, proposedRole, matchPercentage)
    
    RETURN {
        status: "APPROVED",
        matchPercentage: matchPercentage,
        role: proposedRole,
        evidence: generateEvidence(matchPercentage, capabilityScore, expertiseScore, toolScore)
    }
    
END FUNCTION
```

## Specialist Creation Enforcement [MANDATORY]

```pseudocode
// SPECIALIST CREATION ENFORCEMENT
FUNCTION enforceSpecialistCreation(task, matchResult):
    
    IF matchResult.status == "BLOCKED":
        // FORCE SPECIALIST CREATION - NO OVERRIDE
        specialist = {
            name: generateSpecialistName(task),
            capabilities: matchResult.specialist.requiredCapabilities,
            expertise: matchResult.specialist.requiredExpertise,
            tools: matchResult.specialist.requiredTools,
            experience: "ULTRA-EXPERIENCED (10+ years)",
            matchPercentage: "100% (specialist created for task)"
        }
        
        // ACTIVATE WITH CONTEXT7
        activateSpecialistWithContext7(specialist)
        
        // DOCUMENT CREATION
        documentSpecialistCreation(specialist, task, matchResult.matchPercentage)
        
        // LOG LEARNING
        logLearning({
            pattern: "SPECIALIST_CREATION",
            originalMatch: matchResult.matchPercentage,
            task: task,
            specialist: specialist
        })
        
        RETURN specialist
    
END FUNCTION
```

## Match Calculation Components [PRECISE]

```pseudocode
// CAPABILITY OVERLAP CALCULATOR
FUNCTION calculateCapabilityOverlap(required, available):
    
    matchCount = 0
    totalRequired = required.length
    
    FOR EACH capability IN required:
        IF available.includes(capability):
            matchCount += 1
        ELSE IF hasRelatedCapability(capability, available):
            matchCount += 0.7  // Partial credit for related
        ELSE:
            matchCount += 0  // No match
    
    RETURN matchCount / totalRequired
    
END FUNCTION

// EXPERTISE MATCH CALCULATOR
FUNCTION calculateExpertiseMatch(requiredLevel, roleLevel):
    
    levels = {
        "JUNIOR": 1,
        "MID": 2,
        "SENIOR": 3,
        "EXPERT": 4,
        "ULTRA-EXPERIENCED": 5
    }
    
    requiredScore = levels[requiredLevel] || 3
    roleScore = levels[roleLevel] || 1
    
    IF roleScore >= requiredScore:
        RETURN 1.0
    ELSE:
        RETURN roleScore / requiredScore
    
END FUNCTION

// TOOL MATCH CALCULATOR
FUNCTION calculateToolMatch(requiredTools, roleTools):
    
    IF requiredTools.length == 0:
        RETURN 1.0  // No tools required
    
    matchCount = 0
    FOR EACH tool IN requiredTools:
        IF roleTools.includes(tool):
            matchCount += 1
    
    RETURN matchCount / requiredTools.length
    
END FUNCTION
```

## Documentation Requirements [MANDATORY]

```pseudocode
// MATCH DOCUMENTATION ENFORCER
FUNCTION documentMatch(task, role, matchPercentage):
    
    documentation = {
        timestamp: getCurrentTimestamp(),
        task: {
            id: task.id,
            name: task.name,
            requirements: task.requirements
        },
        role: {
            name: role.name,
            capabilities: role.capabilities
        },
        matchAnalysis: {
            percentage: matchPercentage,
            status: matchPercentage >= 70 ? "APPROVED" : "BLOCKED",
            evidence: generateDetailedEvidence()
        }
    }
    
    // STORE IN ASSIGNMENT FILE
    assignmentPath = `/assignments/${task.id}-capability-match.md`
    writeToFile(assignmentPath, formatDocumentation(documentation))
    
    // STORE IN MEMORY
    createMemoryEntity({
        name: `Capability-Match-${task.id}`,
        type: "CapabilityMatch",
        observations: [
            `Task: ${task.name}`,
            `Role: ${role.name}`,
            `Match: ${matchPercentage}%`,
            `Status: ${documentation.matchAnalysis.status}`
        ]
    })
    
END FUNCTION
```

## Enforcement Patterns [ZERO TOLERANCE]

```pseudocode
// ASSIGNMENT BLOCKING ENFORCER
FUNCTION blockInvalidAssignment(task, role, matchPercentage):
    
    // IMMEDIATE HALT
    HALT_ALL_EXECUTION()
    
    // GENERATE VIOLATION REPORT
    violation = {
        type: "CAPABILITY_MISMATCH_VIOLATION",
        severity: "CRITICAL",
        task: task.name,
        role: role.name,
        matchPercentage: matchPercentage,
        requiredPercentage: 70,
        gap: 70 - matchPercentage
    }
    
    // NOTIFY ALL ROLES
    broadcastViolation(violation)
    
    // FORCE CORRECTION
    correction = {
        action: "CREATE_SPECIALIST",
        requirements: extractUnmetRequirements(task, role),
        deadline: "IMMEDIATE"
    }
    
    // BLOCK UNTIL RESOLVED
    WHILE NOT specialistCreated:
        waitForSpecialistCreation()
        validateNewSpecialist()
    
    RETURN correction
    
END FUNCTION
```

## Integration Requirements [MANDATORY]

```pseudocode
// PLANNING SYSTEM INTEGRATION
FUNCTION integrateWithPlanning():
    
    // HOOK INTO TASK ASSIGNMENT
    onTaskAssignment((task, role) => {
        matchResult = enforceCapabilityMatch(task, role)
        
        IF matchResult.status == "BLOCKED":
            specialist = enforceSpecialistCreation(task, matchResult)
            RETURN specialist
        ELSE:
            RETURN role
    })
    
    // HOOK INTO DELEGATION
    onDelegation((delegations) => {
        FOR EACH delegation IN delegations:
            validateCapabilityMatch(delegation)
    })
    
    // CONTINUOUS MONITORING
    setInterval(() => {
        activeAssignments = getActiveAssignments()
        FOR EACH assignment IN activeAssignments:
            IF NOT assignment.capabilityMatchDocumented:
                HALT("UNDOCUMENTED ASSIGNMENT DETECTED")
                enforceDocumentation(assignment)
    }, 100)
    
END FUNCTION
```

## Violation Penalties [SEVERE]

**BYPASS ATTEMPT:** Skip calculation → -2.0P → IMMEDIATE BLOCK
**WRONG ASSIGNMENT:** <70% proceed → -3.0P → FORCE CORRECTION
**NO DOCUMENTATION:** Missing evidence → -1.5P → RETROACTIVE REQUIREMENT
**OVERRIDE ATTEMPT:** Ignore threshold → -5.0P → ESCALATION

## Success Patterns [REWARDED]

**PROPER CALCULATION:** Every assignment → +0.5P → EXCELLENCE
**SPECIALIST CREATION:** When needed → +1.0P → OPTIMIZATION
**DOCUMENTATION:** Complete evidence → +0.5Q → TRANSPARENCY
**THRESHOLD RESPECT:** No violations → +1.0Q → COMPLIANCE

## CRITICAL ENFORCEMENT RULES

1. **NO ASSIGNMENT** without capability calculation - ZERO EXCEPTIONS
2. **<70% MATCH** = AUTOMATIC SPECIALIST CREATION - NO OVERRIDE
3. **EVERY MATCH** must be documented in assignment files - MANDATORY
4. **BLOCKING ENFORCEMENT** - Cannot proceed without compliance
5. **REAL-TIME MONITORING** - Continuous validation of all assignments

---

**ENFORCEMENT:** Calculate→Document→Block if <70%→Create specialist→No bypass