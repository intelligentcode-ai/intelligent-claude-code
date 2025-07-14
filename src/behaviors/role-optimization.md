# Role Optimization System

**CORE:** Capability matching•Dynamic specialists•SME selection•Ultra-experienced only

## Capability Assessment Engine

```pseudocode
FUNCTION assessRoleCapability(task, role):
    capabilities = role.capabilities
    requirements = task.requirements
    
    // Score each requirement match
    matchScore = 0
    FOR req IN requirements:
        IF req IN capabilities:
            matchScore += capabilities[req].expertise
        ELSE:
            matchScore += 0
    
    // Calculate percentage match
    capabilityMatch = matchScore / requirements.length
    
    // Trigger specialist creation if low match
    IF capabilityMatch < 0.7:
        specialist = createDynamicSpecialist(task)
        RETURN specialist
    ELSE:
        RETURN role
END FUNCTION
```

## Dynamic Specialist Creation

**UNLIMITED DOMAINS:** ANY technology•ANY framework•ANY tool•ANY platform

**AUTO-GENERATION:**
- Detect technology: React→@React-Developer, Kubernetes→@Kubernetes-Engineer
- Inject expertise: Context7 docs, best practices, 10+ years mindset
- Activate specialist: Ultra-experienced only, no junior behavior

**NAMING:** @[Technology]-[Specialty] format
**EXPERTISE:** Current knowledge+best practices+tool mastery

## SME Selection Logic

**PRIMARY FACTORS:**
- Direct experience with technology/domain
- Successful pattern history in area
- Quality score in domain >8.0
- Recent activity in specialty

**SELECTION PRIORITY:**
1. Exact match specialist if exists
2. Create new specialist if needed  
3. Closest capability match as fallback
4. Never use generalist for specialist work

## Enforcement Rules

**MANDATORY:**
- <70% match = Create specialist
- Wrong role assignment = P:-0.5
- Generalist on specialist work = P:-1.0
- All specialists ultra-experienced

**BLOCKED PATTERNS:**
- System-Engineer for AI work → Use AI-Engineer
- QA-Engineer for AI review → Use AI-Architect
- Generic Developer for frameworks → Use framework specialist
- PM doing any implementation → Delegate to specialist