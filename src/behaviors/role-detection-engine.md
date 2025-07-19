# Role Detection Engine

**API:** `detectRoleAssignments(text)` → [{role, type}]  
**Pattern:** @Role-Name or @Technology-BaseRole

## Core Detection

```pseudocode
CLASS RoleDetectionEngine:
    
    PATTERNS = [
        r"@(\w+(?:-\w+)*)",              // @Role or @Role-Specialist
        r"assigned_to:\s*@(\w+(?:-\w+)*)", // YAML assignment
        r"@(\w+(?:-\w+)*)\s*\("         // @Role (P:x, Q:y): format
    ]
    
    CORE_ROLES = [
        "PM", "Architect", "Developer", "System-Engineer", "DevOps-Engineer",
        "Database-Engineer", "Security-Engineer", "AI-Engineer", "Web-Designer",
        "QA-Engineer", "Frontend-Tester", "Backend-Tester", "Requirements-Engineer"
    ]
    
    FUNCTION detectRoleAssignments(text):
        detectedRoles = []
        
        FOR pattern IN PATTERNS:
            matches = findAllMatches(text, pattern)
            
            FOR match IN matches:
                roleName = match.group(1)
                
                IF isValidRole(roleName):
                    detectedRoles.append({
                        role: roleName,
                        type: getAssignmentType(pattern)
                    })
        
        RETURN removeDuplicates(detectedRoles)
    
    FUNCTION isValidRole(roleName):
        IF roleName IN CORE_ROLES:
            RETURN true
        
        // Check dynamic specialist: Technology-BaseRole
        parts = roleName.split("-")
        IF parts.length == 2 AND parts[1] IN CORE_ROLES:
            RETURN true
        
        RETURN false
    
    FUNCTION getAssignmentType(pattern):
        IF pattern.contains("assigned_to"):
            RETURN "task_assignment"
        ELSE IF pattern.contains("("):
            RETURN "communication"
        ELSE:
            RETURN "direct_mention"
```

## Dynamic Specialist Creation

```pseudocode
FUNCTION createDynamicSpecialist(specialistName):
    parts = specialistName.split("-")
    IF parts.length != 2:
        THROW "Invalid format: " + specialistName
    
    domain = parts[0]
    baseRole = parts[1]
    
    IF NOT baseRole IN CORE_ROLES:
        THROW "Invalid base role: " + baseRole
    
    RETURN {
        name: specialistName,
        base: baseRole,
        domain: domain,
        capabilities: getCoreCapabilities(baseRole) + getDomainCapabilities(domain)
    }
```

## Integration

```pseudocode
FUNCTION processRoleAssignment(assignment):
    detectedRoles = detectRoleAssignments(assignment.content)
    
    FOR roleAssignment IN detectedRoles:
        IF isValidRole(roleAssignment.role):
            activateRole(roleAssignment.role)
        ELSE:
            logError("Invalid role: " + roleAssignment.role)
```

## Examples

```yaml
# Direct assignment
"Assigned to: @AI-Engineer" → {role: "AI-Engineer", type: "task_assignment"}

# Dynamic specialist  
"@React-Developer to implement UI" → {role: "React-Developer", type: "direct_mention"}

# Role communication
"@PM (P:5.5, Q:8.0): Delegating" → {role: "PM", type: "communication"}
```

---
*Ultra-optimized role detection engine*