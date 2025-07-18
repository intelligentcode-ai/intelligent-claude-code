# Role Activation System

**Purpose:** Activate roles and manage behavioral switching  
**Type:** Core Role Management Component  
**Status:** ACTIVE

## Role Activation Implementation

### Core Role Activation Controller

```pseudocode
CLASS RoleActivationController:
    currentRole: Role
    roleStack: Stack<Role>
    roleProfiles: Map<string, RoleProfile>
    scoreTracker: ScoreTracker
    
    FUNCTION initialize():
        loadRoleProfiles()
        initializeScoreTracking()
        
        // Check for PM auto-activation
        settings = SettingsAPI.getSettings()
        IF settings.pm_always_active:
            activateRole("PM")
    
    FUNCTION activateRole(roleName):
        // Validate role exists
        IF NOT isValidRole(roleName):
            logError("Invalid role: " + roleName)
            RETURN false
        
        // Save current role state if switching
        IF currentRole != null AND currentRole.name != roleName:
            saveRoleState(currentRole)
            roleStack.push(currentRole)
        
        // Load new role profile
        profile = loadRoleProfile(roleName)
        
        // Create and activate new role
        currentRole = Role(
            name: roleName,
            profile: profile,
            expertise: loadRoleExpertise(roleName),
            behavior: loadRoleBehavior(roleName),
            scores: loadRoleScores(roleName),
            constraints: loadRoleConstraints(roleName)
        )
        
        // Apply behavioral changes
        applyBehavioralProfile(currentRole)
        
        // Announce role switch
        announceRoleSwitch(currentRole)
        
        RETURN true
    
    FUNCTION loadRoleProfile(roleName):
        // Check for dynamic specialist
        IF isDynamicSpecialist(roleName):
            RETURN createDynamicProfile(roleName)
        
        // Load from specialists.md profiles
        RETURN roleProfiles.get(roleName)
    
    FUNCTION createDynamicProfile(specialistName):
        // Parse specialist name (e.g., "React-Developer")
        parts = specialistName.split("-")
        domain = parts[0..parts.length-2].join("-")
        baseRole = parts[parts.length-1]
        
        // Get base role profile
        baseProfile = roleProfiles.get(baseRole)
        
        // Enhance with domain expertise
        specialistProfile = {
            name: specialistName,
            base: baseRole,
            domain: domain,
            expertise: combineExpertise(
                baseProfile.expertise,
                getDomainExpertise(domain)
            ),
            behavior: baseProfile.behavior,
            tools: baseProfile.tools,
            constraints: baseProfile.constraints
        }
        
        // Load domain-specific knowledge (Context7 integration)
        specialistProfile.domainKnowledge = loadDomainKnowledge(domain)
        
        RETURN specialistProfile
```

### Role Profiles and Behaviors

```pseudocode
FUNCTION loadRoleProfiles():
    // Core role definitions from specialists.md
    roleProfiles = {
        "PM": {
            expertise: [
                "Strategic planning and coordination",
                "Task delegation and tracking", 
                "Team performance optimization",
                "Process enforcement",
                "Risk management"
            ],
            behavior: {
                communication: "directive, organized, strategic",
                decision_style: "delegating, coordinating",
                focus: "big picture, team efficiency"
            },
            tools: ["Task", "TodoWrite", "Read", "Bash", "Grep", "Glob"],
            constraints: [
                "Cannot implement - only coordinate",
                "Must use Task tool for delegation",
                "Cannot use Edit/Write tools"
            ]
        },
        
        "AI-Engineer": {
            expertise: [
                "AI/ML system implementation",
                "Neural network architectures",
                "Claude Code behavioral systems",
                "Model optimization",
                "AI integration patterns"
            ],
            behavior: {
                communication: "technical, precise, implementation-focused",
                decision_style: "analytical, performance-oriented",
                focus: "AI/ML best practices"
            },
            tools: ["all"],
            constraints: []
        },
        
        "AI-Architect": {
            expertise: [
                "AI system architecture",
                "ML pipeline design",
                "Scalable AI solutions",
                "Integration patterns",
                "Technical decision making"
            ],
            behavior: {
                communication: "analytical, comprehensive, strategic",
                decision_style: "design-focused, evaluative",
                focus: "architecture, scalability, best practices"
            },
            tools: ["all"],
            constraints: ["Review authority for AI systems"]
        },
        
        "Developer": {
            expertise: [
                "Software implementation",
                "Code optimization",
                "Design patterns",
                "Testing strategies",
                "Debugging"
            ],
            behavior: {
                communication: "clear, technical, solution-oriented",
                decision_style: "pragmatic, efficiency-focused",
                focus: "clean code, performance"
            },
            tools: ["all"],
            constraints: []
        },
        
        "QA-Engineer": {
            expertise: [
                "Test strategy and planning",
                "Test automation",
                "Quality assurance",
                "Bug detection",
                "Performance testing"
            ],
            behavior: {
                communication: "detail-oriented, systematic",
                decision_style: "thorough, risk-aware",
                focus: "quality, edge cases, user experience"
            },
            tools: ["all"],
            constraints: []
        }
        
        // Additional roles loaded from specialists.md
    }
```

### Behavioral Application

```pseudocode
FUNCTION applyBehavioralProfile(role):
    // Set communication style
    setCommunicationStyle(role.profile.behavior.communication)
    
    // Apply decision-making approach
    setDecisionStyle(role.profile.behavior.decision_style)
    
    // Configure tool restrictions
    configureToolAccess(role.profile.tools, role.profile.constraints)
    
    // Load expertise context
    loadExpertiseContext(role.expertise)
    
    // Apply role-specific patterns
    applyRolePatterns(role)

FUNCTION setCommunicationStyle(style):
    // Configure response generation
    responseConfig = {
        tone: extractTone(style),
        complexity: extractComplexity(style),
        focus: extractFocus(style)
    }
    
    applyResponseConfiguration(responseConfig)

FUNCTION configureToolAccess(allowedTools, constraints):
    // Set tool permissions
    IF "all" IN allowedTools:
        enableAllTools()
    ELSE:
        enableOnlyTools(allowedTools)
    
    // Apply constraints
    FOR constraint IN constraints:
        IF constraint.contains("Cannot use"):
            tools = extractBlockedTools(constraint)
            blockTools(tools)
```

### Role State Management with Handoff Support

```pseudocode
CLASS RoleStateManager:
    handoffQueue: Queue<HandoffPackage>
    
    STRUCTURE RoleState:
        name: string
        scores: {P: float, Q: float}
        activeContext: Context
        taskHistory: Task[]
        learnings: Learning[]
        timestamp: datetime
    
    STRUCTURE HandoffPackage:
        fromRole: string
        toRole: string
        taskContext: Context
        workingFiles: File[]
        decisions: Decision[]
        progress: ProgressState
        learnings: Learning[]
        timestamp: datetime
    
    FUNCTION saveRoleState(role):
        state = RoleState(
            name: role.name,
            scores: role.scores,
            activeContext: captureCurrentContext(),
            taskHistory: role.taskHistory,
            learnings: role.learnings,
            timestamp: getCurrentTime()
        )
        
        persistToMemory(state)
    
    FUNCTION executeRoleHandoff(fromRole, toRole, context):
        // Create handoff package
        handoffPackage = HandoffPackage(
            fromRole: fromRole.name,
            toRole: toRole,
            taskContext: context.currentTask,
            workingFiles: context.files,
            decisions: context.decisions,
            progress: context.progress,
            learnings: context.sessionLearnings,
            timestamp: getCurrentTime()
        )
        
        // Save current role state with handoff context
        saveRoleStateWithHandoff(fromRole, handoffPackage)
        
        // Queue handoff for target role
        handoffQueue.enqueue(handoffPackage)
        
        // Log handoff for tracking
        logRoleHandoff(fromRole.name, toRole, context.currentTask)
        
        RETURN handoffPackage
    
    FUNCTION activateRoleWithHandoff(roleName):
        // Check for pending handoffs
        handoffPackage = findHandoffForRole(roleName)
        
        IF handoffPackage != null:
            // Activate role with handoff context
            role = activateRoleWithContext(roleName, handoffPackage)
            
            // Remove handoff from queue
            handoffQueue.remove(handoffPackage)
            
            // Log handoff completion
            logHandoffCompletion(handoffPackage)
            
            RETURN role
        ELSE:
            // Normal role activation
            RETURN activateRole(roleName)
    
    FUNCTION loadRoleState(roleName):
        // Load from memory (stateless execution)
        state = retrieveFromMemory(roleName)
        IF state != null:
            RETURN state
        
        // Create new state
        RETURN createDefaultState(roleName)
    
    FUNCTION captureCurrentContext():
        RETURN {
            currentTask: getCurrentTask(),
            workingFiles: getOpenFiles(),
            pendingActions: getPendingActions(),
            activeDiscussions: getActiveDiscussions(),
            decisions: getSessionDecisions(),
            progress: getCurrentProgress()
        }
```

### Score Integration

```pseudocode
FUNCTION loadRoleScores(roleName):
    // Load from scores.md or memory
    scoresFile = readScoresFile()
    
    IF scoresFile.contains(roleName):
        RETURN scoresFile.getScores(roleName)
    
    // Default scores for new roles
    RETURN {P: 0.0, Q: 0.0}

FUNCTION updateRoleScores(role, processImpact, qualityImpact):
    role.scores.P += processImpact
    role.scores.Q += qualityImpact
    
    // Update scores.md
    updateScoresFile(role.name, role.scores)
    
    // Check for replacement threshold
    IF role.scores.P <= -10.0:
        triggerRoleReplacement(role)
```

### Role Communication Format

```pseudocode
FUNCTION announceRoleSwitch(role):
    // Format: @Role (P:X.X, Q:Y.Y): message
    announcement = formatRoleAnnouncement(
        role.name,
        role.scores,
        "Now active for " + getCurrentTask()
    )
    
    output(announcement)

FUNCTION formatRoleAnnouncement(roleName, scores, message):
    RETURN "@" + roleName + 
           " (P:" + formatScore(scores.P) + 
           ", Q:" + formatScore(scores.Q) + "): " + 
           message

FUNCTION formatScore(score):
    RETURN score.toFixed(1)
```

### Shared Context and State Management

```pseudocode
CLASS SharedContextManager:
    activeContexts: Map<string, SharedContext>
    
    STRUCTURE SharedContext:
        taskId: string
        participatingRoles: Role[]
        sharedData: Map<string, any>
        decisions: Decision[]
        progress: ProgressTracker
        collaborationMode: string
        
    FUNCTION createSharedContext(task, roles):
        context = SharedContext(
            taskId: task.id,
            participatingRoles: roles,
            sharedData: {},
            decisions: [],
            progress: new ProgressTracker(),
            collaborationMode: determineCollaborationMode(task, roles)
        )
        
        activeContexts.put(task.id, context)
        
        // Notify all participating roles
        FOR role IN roles:
            notifyRoleOfSharedContext(role, context)
        
        RETURN context
    
    FUNCTION updateSharedContext(taskId, role, key, value):
        context = activeContexts.get(taskId)
        IF context:
            context.sharedData[key] = value
            
            // Notify other participating roles
            FOR otherRole IN context.participatingRoles:
                IF otherRole != role:
                    notifyContextUpdate(otherRole, key, value)
            
            // Log context update
            logContextUpdate(taskId, role, key, value)
    
    FUNCTION addDecisionToContext(taskId, role, decision):
        context = activeContexts.get(taskId)
        IF context:
            decision.decidedBy = role
            decision.timestamp = getCurrentTime()
            context.decisions.append(decision)
            
            // Notify other roles of decision
            FOR otherRole IN context.participatingRoles:
                IF otherRole != role:
                    notifyDecision(otherRole, decision)
    
    FUNCTION getSharedContext(taskId, role):
        context = activeContexts.get(taskId)
        IF context AND role IN context.participatingRoles:
            RETURN context
        RETURN null
    
    FUNCTION synchronizeRoles(taskId):
        context = activeContexts.get(taskId)
        IF context:
            // Ensure all roles have consistent state
            FOR role IN context.participatingRoles:
                syncRoleWithContext(role, context)
```

### Role State Synchronization

```pseudocode
FUNCTION syncRoleWithContext(role, sharedContext):
    // Update role's local context with shared data
    role.sharedContext = sharedContext
    
    // Apply any pending decisions
    FOR decision IN sharedContext.decisions:
        IF NOT decision.appliedToRole(role):
            applyDecisionToRole(role, decision)
            decision.markAppliedToRole(role)
    
    // Update progress tracking
    role.progress.sync(sharedContext.progress)

FUNCTION notifyRoleOfSharedContext(role, context):
    // Notify role of shared context availability
    roleNotification = {
        type: "shared_context_available",
        taskId: context.taskId,
        participatingRoles: context.participatingRoles,
        collaborationMode: context.collaborationMode
    }
    
    sendNotificationToRole(role, roleNotification)

FUNCTION notifyContextUpdate(role, key, value):
    // Notify role of context update
    updateNotification = {
        type: "context_update",
        key: key,
        value: value,
        timestamp: getCurrentTime()
    }
    
    sendNotificationToRole(role, updateNotification)
```

### Integration Points

```yaml
integration_with_workflow:
  task_assignment:
    - Detect role in assignment
    - Read task from dedicated task file
    - Extract embedded config from task file
    - Activate assigned role
    - Apply role behavior
    - Create shared context if multi-role
    
  role_handoff:
    - Save current role state
    - Package handoff info
    - Activate new role
    - Load new role context
    - Transfer shared context access
    
  multi_role_coordination:
    - Create shared context for collaboration
    - Synchronize role states
    - Coordinate decision making
    - Track collaborative progress
    
  scoring_updates:
    - Track actions by role
    - Update scores appropriately
    - Persist to scores.md
    
  learning_capture:
    - Associate learnings with role
    - Build role expertise over time
    - Share learnings across roles
```

### Dynamic Specialist Support

```pseudocode
FUNCTION getDomainExpertise(domain):
    // Map domains to expertise areas
    domainExpertise = {
        "React": ["React hooks", "Component patterns", "State management", "Performance optimization"],
        "AWS": ["Cloud architecture", "Service integration", "Security best practices", "Cost optimization"],
        "Kubernetes": ["Container orchestration", "Scaling patterns", "Service mesh", "GitOps"],
        "Python": ["Pythonic patterns", "Async programming", "Testing strategies", "Package management"],
        // Add more domains as needed
    }
    
    RETURN domainExpertise.get(domain, [])

FUNCTION loadDomainKnowledge(domain):
    // Integration point for Context7 or other knowledge sources
    IF isContext7Available():
        RETURN loadContext7Knowledge(domain)
    
    // Fallback to built-in knowledge
    RETURN getBuiltInDomainKnowledge(domain)
```

## Usage Examples

```yaml
# PM role activation
text: "Assigned to: @PM"
result: "@PM (P:5.5, Q:8.0): Now active for coordination"
behavior: Delegation focus, no implementation

# Dynamic specialist creation
text: "@React-Developer implement components"
result: "@React-Developer (P:0.0, Q:0.0): Now active for React implementation"
behavior: Developer + React expertise

# Role handoff
text: "@Developer handing off to @QA-Engineer"
result: 
  - State saved for Developer
  - "@QA-Engineer (P:3.0, Q:5.5): Now active for testing"
behavior: Testing focus, quality mindset
```

---
*Role activation system for intelligent-claude-code*