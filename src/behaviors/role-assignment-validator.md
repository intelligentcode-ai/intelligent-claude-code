# Role Assignment Validator

**API:** `validateAssignment(task, role)` → {valid, issues, suggestions}  
**Rule:** >70% capability match + architect approval for specialist work

## Core Validation

```pseudocode
CLASS RoleAssignmentValidator:
    
    WORK_TYPES = {
        "ai": {keywords: ["AI", "ML", "agentic", "behavioral", "modes/"], architect: "AI-Architect", roles: ["AI-Engineer"], blocked: ["Developer"]},
        "infra": {keywords: ["deploy", "infrastructure", "docker", "kubernetes"], architect: "System-Architect", roles: ["DevOps-Engineer"], blocked: ["Developer"]},
        "security": {keywords: ["security", "auth", "encrypt", "OAuth"], architect: "Security-Architect", roles: ["Security-Engineer"], blocked: ["Developer"]},
        "database": {keywords: ["database", "SQL", "schema", "migration"], architect: "Data-Architect", roles: ["Database-Engineer"], blocked: ["Web-Designer"]},
        "frontend": {keywords: ["UI", "UX", "React", "CSS", "frontend"], architect: "Frontend-Architect", roles: ["Web-Designer"], blocked: ["Database-Engineer"]}
    }
    
    CAPABILITIES = {
        "Developer": ["programming", "API", "testing"],
        "AI-Engineer": ["ML", "AI", "automation"],
        "DevOps-Engineer": ["CI/CD", "deployment", "infrastructure"],
        "Database-Engineer": ["SQL", "data", "queries"],
        "Security-Engineer": ["security", "encryption", "auth"],
        "Web-Designer": ["UI", "frontend", "CSS"]
    }
    
    FUNCTION validateAssignment(task, role):
        workType = detectWorkType(task)
        capMatch = calculateCapabilityMatch(role, task)
        
        result = {valid: true, issues: [], suggestions: []}
        
        IF capMatch < 0.7:
            result.valid = false
            result.issues.append("Low capability match: " + capMatch)
            result.suggestions.append(findBestRole(workType))
        
        IF workType AND role IN WORK_TYPES[workType].blocked:
            result.valid = false
            result.issues.append("Role blocked for " + workType)
            result.suggestions.append(WORK_TYPES[workType].roles[0])
        
        IF workType AND NOT hasArchitectApproval(task, workType):
            result.valid = false
            result.issues.append("Requires " + WORK_TYPES[workType].architect + " approval")
        
        RETURN result
    
    FUNCTION detectWorkType(task):
        content = (task.title + " " + task.description).toLowerCase()
        
        FOR workType, config IN WORK_TYPES:
            matchCount = 0
            FOR keyword IN config.keywords:
                IF content.contains(keyword.toLowerCase()):
                    matchCount += 1
            
            IF matchCount >= 2:
                RETURN workType
        
        RETURN null
    
    FUNCTION calculateCapabilityMatch(role, task):
        capabilities = CAPABILITIES[role] || []
        content = (task.title + " " + task.description).toLowerCase()
        matches = 0
        
        FOR capability IN capabilities:
            IF content.contains(capability.toLowerCase()):
                matches += 1
        
        RETURN matches / max(capabilities.length, 1)
    
    FUNCTION findBestRole(workType):
        IF workType AND workType IN WORK_TYPES:
            RETURN WORK_TYPES[workType].roles[0]
        RETURN "Developer"
    
    FUNCTION hasArchitectApproval(task, workType):
        IF NOT workType:
            RETURN true
        
        requiredArchitect = WORK_TYPES[workType].architect
        RETURN task.approved_by AND requiredArchitect IN task.approved_by
```

## Validation Chain

```pseudocode
FUNCTION executeValidationChain(story, tasks):
    workType = detectWorkType(story)
    
    IF NOT workType:
        RETURN {valid: true}
    
    architect = WORK_TYPES[workType].architect
    
    IF NOT hasTriageApproval(story, "PM", architect):
        RETURN {valid: false, action: "REQUIRE_TRIAGE", participants: ["PM", architect]}
    
    FOR task IN tasks:
        validation = validateAssignment(task, task.assigned_to)
        IF NOT validation.valid:
            RETURN {valid: false, issues: validation.issues, suggestions: validation.suggestions}
    
    IF NOT hasJointApproval(story, "PM", architect):
        RETURN {valid: false, action: "REQUIRE_APPROVAL", approvers: ["PM", architect]}
    
    RETURN {valid: true, workType: workType}
```

## Integration

```pseudocode
FUNCTION enhancedAssignRole(task, role):
    validation = validateAssignment(task, role)
    
    IF NOT validation.valid:
        IF validation.suggestions.length > 0:
            role = validation.suggestions[0]
            logInfo("Reassigning to " + role)
        ELSE:
            THROW "No valid assignment: " + validation.issues[0]
    
    RETURN activateAndAssignRole(role, task)
```

## Examples

```yaml
# AI Work
Task: "Update behavioral patterns in modes/"
Result: @AI-Engineer with @AI-Architect approval

# Infrastructure
Task: "Deploy kubernetes"
Result: @DevOps-Engineer (blocked @Developer)

# Security
Task: "Design auth system"
Result: @Security-Engineer with @Security-Architect approval
```

---
*Ultra-optimized role assignment validation*