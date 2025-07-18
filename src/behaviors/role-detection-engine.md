# Role Detection Engine

**Purpose:** Detect and parse role assignments from @-notation  
**Type:** Core Role Management Component  
**Status:** ACTIVE

## Role Detection Implementation

### Core Detection Engine

```pseudocode
CLASS RoleDetectionEngine:
    
    // Pattern definitions for role detection
    ROLE_PATTERNS = [
        // Direct @-notation
        r"@(\w+(?:-\w+)*)",              // @Role or @Role-Specialist
        
        // Assignment patterns
        r"Assigned to:\s*@(\w+(?:-\w+)*)", // YAML assignment
        r"assigned_to:\s*[\"']?@(\w+(?:-\w+)*)[\"']?", // YAML with quotes
        r"Owner:\s*@(\w+(?:-\w+)*)",      // Ownership declaration
        
        // Role communication patterns
        r"^@(\w+(?:-\w+)*)\s*\(",        // @Role (P:x, Q:y): format
        r"(\w+(?:-\w+)*)\s*:\s*Received", // Role acknowledgment
        
        // Task handoff patterns
        r"Handing off to @(\w+(?:-\w+)*)", // Explicit handoff
        r"@(\w+(?:-\w+)*) to review",      // Review assignment
    ]
    
    // Core roles that always exist
    CORE_ROLES = [
        "PM", "Architect", "Developer", "System-Engineer",
        "DevOps-Engineer", "Database-Engineer", "Security-Engineer",
        "AI-Engineer", "Web-Designer", "QA-Engineer",
        "Frontend-Tester", "Backend-Tester", "Requirements-Engineer",
        "User-Role"
    ]
    
    FUNCTION detectRoleAssignments(text):
        detectedRoles = []
        
        FOR pattern IN ROLE_PATTERNS:
            matches = findAllMatches(text, pattern)
            
            FOR match IN matches:
                roleName = match.group(1)
                
                IF isValidRole(roleName):
                    roleAssignment = {
                        role: roleName,
                        context: extractContext(text, match),
                        position: match.position,
                        type: determineAssignmentType(pattern)
                    }
                    detectedRoles.append(roleAssignment)
        
        RETURN removeDuplicates(detectedRoles)
    
    FUNCTION isValidRole(roleName):
        // Check if it's a core role
        IF roleName IN CORE_ROLES:
            RETURN true
        
        // Check if it's a valid dynamic specialist
        IF isDynamicSpecialist(roleName):
            RETURN true
        
        // Check if we can create this specialist
        IF canCreateSpecialist(roleName):
            RETURN true
        
        RETURN false
    
    FUNCTION isDynamicSpecialist(roleName):
        // Pattern: [Technology/Domain]-[BaseRole]
        parts = roleName.split("-")
        
        IF parts.length >= 2:
            baseRole = parts[parts.length - 1]
            IF baseRole IN CORE_ROLES:
                RETURN true
        
        // Check known specialist patterns
        specialistPatterns = [
            r"\w+-Developer",      // React-Developer, Python-Developer
            r"\w+-Engineer",       // AI-Engineer, ML-Engineer
            r"\w+-Architect",      // System-Architect, AI-Architect
            r"\w+-Specialist",     // Security-Specialist, Data-Specialist
            r"\w+-Expert"          // Domain-Expert, Technology-Expert
        ]
        
        FOR pattern IN specialistPatterns:
            IF matches(roleName, pattern):
                RETURN true
        
        RETURN false
    
    FUNCTION canCreateSpecialist(roleName):
        // Check if specialist creation is enabled
        settings = SettingsAPI.getSettings()
        IF NOT settings.specialist_creation:
            RETURN false
        
        // Validate specialist name format
        IF isDynamicSpecialist(roleName):
            // Extract domain and base role
            parts = roleName.split("-")
            domain = parts[0..parts.length-2].join("-")
            baseRole = parts[parts.length-1]
            
            // Verify base role exists
            IF baseRole IN CORE_ROLES:
                // Check if domain makes sense
                IF isValidDomain(domain):
                    RETURN true
        
        RETURN false
```

### Context Extraction

```pseudocode
FUNCTION extractContext(text, match):
    // Get surrounding context (50 chars before and after)
    start = max(0, match.start - 50)
    end = min(text.length, match.end + 50)
    context = text.substring(start, end)
    
    // Extract specific context based on pattern
    contextInfo = {
        fullContext: context,
        taskId: extractTaskId(context),
        action: extractAction(context),
        priority: extractPriority(context)
    }
    
    RETURN contextInfo

FUNCTION extractTaskId(context):
    // Look for task ID patterns
    taskPattern = r"(TASK|STORY|BUG|EPIC)-\d+"
    match = findMatch(context, taskPattern)
    RETURN match ? match.group(0) : null

FUNCTION extractAction(context):
    // Determine what action is being requested
    actionKeywords = {
        "implement": "implementation",
        "review": "review",
        "test": "testing",
        "design": "design",
        "deploy": "deployment",
        "document": "documentation"
    }
    
    FOR keyword, action IN actionKeywords:
        IF context.toLowerCase().contains(keyword):
            RETURN action
    
    RETURN "general"
```

### Assignment Type Determination

```pseudocode
FUNCTION determineAssignmentType(pattern):
    // Map patterns to assignment types
    IF pattern.contains("Assigned to"):
        RETURN "task_assignment"
    ELSE IF pattern.contains("Owner"):
        RETURN "ownership"
    ELSE IF pattern.contains("Handing off"):
        RETURN "handoff"
    ELSE IF pattern.contains("review"):
        RETURN "review_request"
    ELSE IF pattern.startsWith("@"):
        RETURN "direct_mention"
    ELSE:
        RETURN "communication"
```

### Role Validation

```pseudocode
CLASS RoleValidator:
    
    FUNCTION validateRoleAssignment(role, task):
        // Check role capability match
        capabilityMatch = calculateCapabilityMatch(role, task)
        
        IF capabilityMatch < 0.7:
            RETURN {
                valid: false,
                reason: "Capability match below 70%",
                match: capabilityMatch,
                suggestedRole: findBetterRole(task)
            }
        
        // Check for specialist preference
        IF shouldUseSpecialist(role, task):
            specialist = determineSpecialist(task)
            RETURN {
                valid: false,
                reason: "Specialist preferred",
                suggestedRole: specialist
            }
        
        // Validate role constraints
        constraints = getRoleConstraints(role)
        FOR constraint IN constraints:
            IF NOT constraint.validate(task):
                RETURN {
                    valid: false,
                    reason: constraint.message
                }
        
        RETURN {valid: true}
    
    FUNCTION calculateCapabilityMatch(role, task):
        roleCapabilities = getRoleCapabilities(role)
        taskRequirements = extractTaskRequirements(task)
        
        matchScore = 0
        totalRequirements = taskRequirements.length
        
        FOR requirement IN taskRequirements:
            IF requirement IN roleCapabilities:
                matchScore += 1
            ELSE IF hasRelatedCapability(roleCapabilities, requirement):
                matchScore += 0.5
        
        RETURN matchScore / totalRequirements
```

### Integration with Workflow

```pseudocode
// Hook into the workflow executor
FUNCTION processRoleAssignment(assignment):
    engine = RoleDetectionEngine()
    validator = RoleValidator()
    
    // Detect all role mentions
    detectedRoles = engine.detectRoleAssignments(assignment.content)
    
    FOR roleAssignment IN detectedRoles:
        // Validate the assignment
        validation = validator.validateRoleAssignment(
            roleAssignment.role,
            assignment
        )
        
        IF NOT validation.valid:
            // Handle invalid assignment
            IF validation.suggestedRole:
                // Suggest alternative
                logSuggestion(
                    "Consider using " + validation.suggestedRole +
                    " instead of " + roleAssignment.role +
                    ": " + validation.reason
                )
            ELSE:
                // Block invalid assignment
                blockAssignment(roleAssignment, validation.reason)
        
        ELSE:
            // Process valid assignment
            activateRole(roleAssignment.role)
            applyRoleContext(roleAssignment.context)
```

### Dynamic Specialist Creation

```pseudocode
FUNCTION createDynamicSpecialist(specialistName):
    // Parse specialist name
    parts = specialistName.split("-")
    domain = parts[0..parts.length-2].join("-")
    baseRole = parts[parts.length-1]
    
    // Validate base role using common pattern
    IF NOT IsValidRole(baseRole):
        THROW "Invalid base role: " + baseRole
    
    // Create specialist profile
    profile = {
        name: specialistName,
        base: baseRole,
        domain: domain,
        capabilities: combineCapabilities(
            getRoleCapabilities(baseRole),
            getDomainCapabilities(domain)
        ),
        expertise: loadDomainExpertise(domain)
    }
    
    // Register the specialist
    registerDynamicRole(profile)
    
    RETURN profile
```

## Usage Examples

```yaml
# Direct assignment
text: "Assigned to: @AI-Engineer"
detected: {role: "AI-Engineer", type: "task_assignment"}

# Dynamic specialist
text: "@React-Developer to implement UI"
detected: {role: "React-Developer", type: "direct_mention"}
created: Dynamic specialist with React expertise

# Role communication
text: "@PM (P:5.5, Q:8.0): Delegating to @Developer"
detected: [
  {role: "PM", type: "communication"},
  {role: "Developer", type: "direct_mention"}
]

# Invalid assignment blocked
text: "Assigned to: @Developer for AI model training"
validation: {
  valid: false,
  reason: "Capability match below 70%",
  suggestedRole: "@AI-Engineer"
}
```

---
*Role detection engine for intelligent-claude-code system*