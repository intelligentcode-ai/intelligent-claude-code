# Role Assignment Validator

**Purpose:** Validate role assignments before execution to ensure correct specialist matching  
**Type:** Validation Component for Lean Workflow  
**Status:** ACTIVE  
**Integration:** Works with lean-workflow-executor.md and role-detection-engine.md

## Executive Summary (80 tokens)

**Core Function:** Prevents wrong specialist assignments via pattern detection  
**Key Validation:** Work type detection → Capability match >70% → Architect approval  
**Work Types:** ai_agentic, infrastructure, security, database, frontend  
**Main API:** `validateAssignment(task, role, allTasks)` → {valid, issues, suggestions}  
**Integration:** Mandatory for all story/bug creation and task assignment  

## Quick Validation Examples

```yaml
# AI Work → @AI-Engineer (not @Developer)
# Infrastructure → @DevOps-Engineer (not @Developer)  
# Security → @Security-Engineer with @Security-Architect approval
# >70% capability match required for all assignments
```

## Imports

@./common-patterns.md                      # Shared behavioral patterns

## Core Validation System

### Assignment Validation Engine

```pseudocode
CLASS RoleAssignmentValidator:
    
    // Work type patterns for specialist detection
    WORK_TYPE_PATTERNS = {
        "ai_agentic": {
            patterns: ["AI", "ML", "machine learning", "agentic", "behavioral", 
                      "automation", "intelligence", "neural", "model training",
                      "LLM", "GPT", "Claude", "virtual team", "modes/", "behaviors/",
                      "artificial intelligence", "deep learning", "autonomous", 
                      "cognitive", "intelligent-claude-code", "command chains",
                      "behavioral patterns", "AI system", "AI-driven"],
            required_architect: "AI-Architect",
            preferred_roles: ["AI-Engineer", "ML-Engineer", "AI-Specialist", 
                            "Autonomous-Systems-Specialist", "Learning-Systems-Specialist"],
            blocked_roles: ["Developer", "System-Engineer", "Web-Designer", "DevOps-Engineer"]
        },
        
        "infrastructure": {
            patterns: ["deployment", "infrastructure", "server", "cloud", "AWS",
                      "docker", "kubernetes", "CI/CD", "pipeline", "terraform"],
            required_architect: "System-Architect",
            preferred_roles: ["DevOps-Engineer", "System-Engineer", "Cloud-Specialist"],
            blocked_roles: ["Developer", "Web-Designer", "AI-Engineer"]
        },
        
        "security": {
            patterns: ["security", "authentication", "authorization", "encryption",
                      "vulnerability", "penetration", "audit", "compliance", "OAuth"],
            required_architect: "Security-Architect",
            preferred_roles: ["Security-Engineer", "Security-Specialist"],
            blocked_roles: ["Developer", "Web-Designer", "QA-Engineer"]
        },
        
        "database": {
            patterns: ["database", "SQL", "schema", "migration", "query optimization",
                      "NoSQL", "MongoDB", "PostgreSQL", "data modeling"],
            required_architect: "Data-Architect",
            preferred_roles: ["Database-Engineer", "Data-Engineer", "SQL-Specialist"],
            blocked_roles: ["Web-Designer", "Frontend-Tester", "DevOps-Engineer"]
        },
        
        "frontend": {
            patterns: ["UI", "UX", "React", "Vue", "Angular", "CSS", "frontend",
                      "component", "responsive", "accessibility", "user interface"],
            required_architect: "Frontend-Architect",
            preferred_roles: ["Web-Designer", "Frontend-Developer", "React-Developer"],
            blocked_roles: ["Database-Engineer", "DevOps-Engineer", "System-Engineer"]
        }
    }
    
    // Capability definitions for core roles
    ROLE_CAPABILITIES = {
        "Developer": ["general programming", "API development", "testing", "debugging"],
        "AI-Engineer": ["machine learning", "AI models", "data science", "automation"],
        "DevOps-Engineer": ["CI/CD", "deployment", "infrastructure", "monitoring"],
        "Database-Engineer": ["SQL", "data modeling", "query optimization", "migrations"],
        "Security-Engineer": ["security audits", "encryption", "authentication", "compliance"],
        "Web-Designer": ["UI/UX", "frontend", "CSS", "responsive design", "accessibility"],
        "System-Engineer": ["infrastructure", "servers", "networking", "system architecture"],
        "QA-Engineer": ["testing", "test automation", "quality assurance", "bug tracking"]
    }
    
    FUNCTION validateAssignment(task, proposedRole, allAssignments):
        validation = {
            valid: true,
            issues: [],
            suggestions: [],
            requiredActions: []
        }
        
        // Step 0: CONSULT LEARNING SYSTEM FIRST
        learningCheck = ConsultLearnings(task.type, proposedRole)  // Use common pattern
        IF learningCheck.hasLearning AND learningCheck.shouldPrevent:
            validation.valid = false
            validation.issues.append({
                type: "learning_prevention",
                role: proposedRole,
                reason: "Previous learning prevents this assignment",
                learning: learningCheck.learnings[0].name,
                prevention: learningCheck.learnings[0].observations[3]
            })
            
            IF learningCheck.alternative:
                validation.suggestions.append({
                    current: proposedRole,
                    suggested: learningCheck.alternative,
                    reason: "Based on previous learning prevention"
                })
        
        // Apply learning bonus if referencing previous learning
        IF learningCheck.referenced:
            applyLearningBonus(0.5, "P", "Applied previous learning about " + proposedRole)
        
        // Step 1: Detect work type
        workType = detectWorkType(task)
        
        // Step 2: Check if architect review required
        IF workType AND NOT hasArchitectApproval(task, workType):
            validation.valid = false
            validation.requiredActions.append({
                action: "architect_review",
                architect: WORK_TYPE_PATTERNS[workType].required_architect,
                reason: "Specialist work requires architect validation"
            })
        
        // Step 3: Calculate capability match
        capabilityMatch = calculateCapabilityMatch(proposedRole, task, workType)
        
        IF capabilityMatch < 0.7:
            validation.valid = false
            validation.issues.append({
                type: "capability_mismatch",
                role: proposedRole,
                match: capabilityMatch,
                reason: "Role capabilities don't match task requirements"
            })
            
            // Find better role
            betterRole = findOptimalRole(task, workType)
            validation.suggestions.append({
                current: proposedRole,
                suggested: betterRole.role,
                match: betterRole.match,
                reason: betterRole.reason
            })
        
        // Step 4: Check for blocked assignments
        IF isBlockedAssignment(proposedRole, workType):
            validation.valid = false
            validation.issues.append({
                type: "blocked_assignment",
                role: proposedRole,
                reason: "Role explicitly blocked for this work type"
            })
        
        // Step 5: Check for specialist preference
        IF shouldPreferSpecialist(proposedRole, workType):
            specialist = determineSpecialist(task, workType)
            validation.suggestions.append({
                current: proposedRole,
                suggested: specialist,
                reason: "Specialist preferred for this work type"
            })
        
        // Step 6: Validate no duplicate assignments
        IF hasDuplicateAssignment(proposedRole, allAssignments):
            validation.issues.append({
                type: "duplicate_assignment",
                role: proposedRole,
                reason: "Role already assigned to another task in this batch"
            })
        
        RETURN validation
```

### Work Type Detection

```pseudocode
FUNCTION detectWorkType(task):
    content = task.title + " " + task.description + " " + task.acceptance_criteria
    contentLower = content.toLowerCase()
    
    workTypeScores = {}
    
    // Use shared work type keywords from common patterns
    FOR workType, keywords IN WORK_TYPE_KEYWORDS:
        score = 0
        matchedPatterns = []
        
        FOR pattern IN keywords:
            IF contentLower.contains(pattern.toLowerCase()):
                score += 1
                matchedPatterns.append(pattern)
        
        IF score > 0:
            workTypeScores[workType] = {
                score: score,
                patterns: matchedPatterns,
                confidence: score / keywords.length
            }
    
    // Return highest scoring work type
    IF workTypeScores.length == 0:
        RETURN null
    
    bestMatch = getMaxByScore(workTypeScores)
    
    // Only return if confidence is high enough
    IF bestMatch.confidence >= 0.3:
        RETURN bestMatch.type
    
    RETURN null
```

### Capability Matching

```pseudocode
FUNCTION calculateCapabilityMatch(role, task, workType):
    // Get role capabilities
    roleCapabilities = getRoleCapabilities(role)
    
    // Extract task requirements
    taskRequirements = extractTaskRequirements(task, workType)
    
    IF taskRequirements.length == 0:
        RETURN 0.8  // Default for unclear requirements
    
    matchScore = 0
    
    FOR requirement IN taskRequirements:
        IF hasCapability(roleCapabilities, requirement):
            matchScore += 1.0
        ELSE IF hasRelatedCapability(roleCapabilities, requirement):
            matchScore += 0.5
    
    RETURN matchScore / taskRequirements.length

FUNCTION extractTaskRequirements(task, workType):
    requirements = []
    
    // Add work type specific requirements
    IF workType:
        config = WORK_TYPE_PATTERNS[workType]
        requirements.extend(config.patterns)
    
    // Extract from task description
    keywords = extractKeywords(task.description)
    requirements.extend(keywords)
    
    // Extract from acceptance criteria
    IF task.acceptance_criteria:
        acRequirements = extractACRequirements(task.acceptance_criteria)
        requirements.extend(acRequirements)
    
    RETURN unique(requirements)
```

### Optimal Role Finding

```pseudocode
FUNCTION findOptimalRole(task, workType):
    candidates = []
    
    // Start with preferred roles for work type
    IF workType:
        preferredRoles = WORK_TYPE_PATTERNS[workType].preferred_roles
        
        FOR role IN preferredRoles:
            match = calculateCapabilityMatch(role, task, workType)
            candidates.append({
                role: role,
                match: match,
                reason: "Preferred specialist for " + workType
            })
    
    // Check all core roles
    FOR role IN CORE_ROLES:
        IF NOT isBlockedForWorkType(role, workType):
            match = calculateCapabilityMatch(role, task, workType)
            candidates.append({
                role: role,
                match: match,
                reason: "Core role with matching capabilities"
            })
    
    // Consider dynamic specialists
    IF workType:
        dynamicSpecialist = createSpecialistName(workType)
        candidates.append({
            role: dynamicSpecialist,
            match: 0.95,
            reason: "Dynamic specialist for exact match"
        })
    
    // Sort by match score and return best
    candidates.sort((a, b) => b.match - a.match)
    
    RETURN candidates[0]

FUNCTION createSpecialistName(workType):
    // Map work types to specialist names
    specialistMap = {
        "ai_agentic": "AI-Engineer",
        "infrastructure": "Infrastructure-Engineer",
        "security": "Security-Engineer",
        "database": "Database-Engineer",
        "frontend": "Frontend-Developer"
    }
    
    RETURN specialistMap[workType] || "Domain-Specialist"
```

### Architect Review Validation

```pseudocode
FUNCTION validateArchitectReview(task, assignments):
    workType = detectWorkType(task)
    
    IF NOT workType:
        RETURN {valid: true}  // No specialist work detected
    
    requiredArchitect = WORK_TYPE_PATTERNS[workType].required_architect
    
    // Check for architect approval in task
    IF hasArchitectApproval(task, requiredArchitect):
        RETURN {valid: true}
    
    // Check for PM + Architect triage
    IF hasTriageApproval(task, "PM", requiredArchitect):
        RETURN {valid: true}
    
    RETURN {
        valid: false,
        required: requiredArchitect,
        reason: "Specialist work requires architect validation"
    }

FUNCTION hasArchitectApproval(task, architectRole):
    // Check task metadata
    IF task.approved_by AND architectRole IN task.approved_by:
        RETURN true
    
    // Check task comments/history
    IF task.comments:
        FOR comment IN task.comments:
            IF comment.author == architectRole AND 
               comment.text.contains("approved"):
                RETURN true
    
    RETURN false
```

### Validation Chain Integration

```pseudocode
FUNCTION executeValidationChain(story, proposedTasks):
    validator = new RoleAssignmentValidator()
    
    // Chain execution functions
    chainFunctions = {
        "detect-work-type": (content) => {
            RETURN validator.detectWorkType({description: content})
        },
        
        "require-triage": (pmRole, architectRole) => {
            // Check if triage completed
            IF NOT hasTriageApproval(story, pmRole, architectRole):
                RETURN {
                    complete: false,
                    action: "REQUIRE_TRIAGE",
                    participants: [pmRole, architectRole]
                }
            RETURN {complete: true}
        },
        
        "validate-assignments": (tasks) => {
            allValid = true
            issues = []
            
            FOR task IN tasks:
                validation = validator.validateAssignment(
                    task,
                    task.assigned_to,
                    tasks
                )
                
                IF NOT validation.valid:
                    allValid = false
                    issues.append({
                        task: task.id,
                        issues: validation.issues,
                        suggestions: validation.suggestions
                    })
            
            RETURN {
                valid: allValid,
                issues: issues
            }
        },
        
        "require-approval": (pmRole, architectRole) => {
            // Check joint approval
            IF NOT hasJointApproval(story, pmRole, architectRole):
                RETURN {
                    approved: false,
                    action: "REQUIRE_APPROVAL",
                    approvers: [pmRole, architectRole]
                }
            RETURN {approved: true}
        }
    }
    
    // Execute validation chain
    workType = chainFunctions["detect-work-type"](story.description)
    
    IF workType:
        architectRole = WORK_TYPE_PATTERNS[workType].required_architect
        
        // Require triage
        triageResult = chainFunctions["require-triage"]("PM", architectRole)
        IF NOT triageResult.complete:
            RETURN triageResult
        
        // Validate assignments
        validationResult = chainFunctions["validate-assignments"](proposedTasks)
        IF NOT validationResult.valid:
            RETURN validationResult
        
        // Require approval
        approvalResult = chainFunctions["require-approval"]("PM", architectRole)
        IF NOT approvalResult.approved:
            RETURN approvalResult
    
    RETURN {valid: true, workType: workType}
```

### Integration with Lean Workflow

```pseudocode
// Hook into lean-workflow-executor.md assign_role function
FUNCTION enhancedAssignRole(task, required_capabilities):
    validator = new RoleAssignmentValidator()
    
    // Get proposed role from task
    proposedRole = task.assigned_to || detectProposedRole(task)
    
    // Get all assignments in current batch
    allAssignments = getCurrentBatchAssignments()
    
    // Validate the assignment
    validation = validator.validateAssignment(task, proposedRole, allAssignments)
    
    IF NOT validation.valid:
        // Block and handle validation failures
        handleValidationFailure(validation)
        
        // If suggestions available, use them
        IF validation.suggestions.length > 0:
            bestSuggestion = validation.suggestions[0]
            logInfo("Reassigning from " + proposedRole + " to " + bestSuggestion.suggested)
            proposedRole = bestSuggestion.suggested
        ELSE:
            THROW "No valid role assignment possible for task"
    
    // Check for required actions
    IF validation.requiredActions.length > 0:
        FOR action IN validation.requiredActions:
            executeRequiredAction(action)
    
    // Proceed with validated assignment
    RETURN activateAndAssignRole(proposedRole, task)
```

## Usage Examples

### AI Work Detection and Validation
```yaml
Task: "Update virtual team behavioral patterns in modes/"
Detection: work_type = "ai_agentic" (matches: AI, behavioral, modes/)
Validation:
  - Required: @AI-Architect review (not generic @Architect)
  - Blocked: @Developer, @System-Engineer
  - Suggested: @AI-Engineer
Result: Assignment to @AI-Engineer after @AI-Architect approval
```

### Wrong Assignment Prevention
```yaml
Task: "Deploy kubernetes infrastructure"
Proposed: @Developer
Detection: work_type = "infrastructure" (matches: kubernetes, infrastructure)
Validation:
  - Capability match: 0.25 (below 0.7 threshold)
  - Blocked: Developer for infrastructure work
  - Required: @System-Architect review
  - Suggested: @DevOps-Engineer (match: 0.85)
Result: BLOCKED - Reassign to @DevOps-Engineer
```

### Specialist Preference Enforcement
```yaml
Task: "Design new authentication system"
Proposed: @Architect
Detection: work_type = "security" (matches: authentication)
Validation:
  - Specialist exists: @Security-Architect
  - Preference: Use specialist over generic
  - Required: @Security-Architect review
Result: Reassign to @Security-Engineer with @Security-Architect approval
```

### Multiple Work Type Detection
```yaml
Task: "Build ML model with secure API deployment"
Detection: 
  - ai_agentic (score: 0.5) - ML model
  - security (score: 0.3) - secure API
Primary: ai_agentic (highest score)
Validation:
  - Primary architect: @AI-Architect
  - Secondary consult: @Security-Architect
  - Suggested: @AI-Engineer with security review
Result: Multi-architect triage required
```

## Integration Points

### With lean-workflow-executor.md
- Replace simple capability check with comprehensive validation
- Add validation chain execution before task creation
- Integrate architect review requirements
- Enhanced error handling with suggestions

### With role-detection-engine.md
- Use existing role detection patterns
- Enhance with work type detection
- Add capability scoring
- Integrate dynamic specialist creation

### With config-loader.md
- Check specialist_creation setting
- Apply blocking_enabled for validation failures
- Use autonomy_level for approval requirements

## Benefits

✅ **Prevents wrong specialist assignments** through pattern-based detection  
✅ **Enforces architect review** for all specialist work  
✅ **Provides clear suggestions** when assignments fail validation  
✅ **Blocks problematic assignments** before they cause issues  
✅ **Supports dynamic specialist creation** when needed  
✅ **Lightweight integration** with existing lean workflow  

---
*Role assignment validation system for intelligent-claude-code*