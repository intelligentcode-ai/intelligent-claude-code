# Role Assignment Validation Test Scenarios

## Test Case 1: AI-Agentic Work Detection
**Input Task:**
```yaml
title: "Update virtual team behavioral patterns in modes/"
description: "Enhance the AI behavioral framework for better autonomous operation"
type: implementation
assigned_to: @System-Engineer  # WRONG - should be @AI-Engineer
```

**Expected Validation Result:**
- Work type detected: `ai_agentic` (matches: AI, behavioral, modes/)
- Capability match: < 0.7 (FAIL)
- Blocked assignment: @System-Engineer blocked for AI work
- Required architect: @AI-Architect
- Suggested role: @AI-Engineer
- Result: BLOCKED until reassigned

## Test Case 2: Infrastructure Work Validation
**Input Task:**
```yaml
title: "Deploy kubernetes cluster"
description: "Set up production kubernetes infrastructure on AWS"
type: deployment
assigned_to: @Developer  # WRONG - should be @DevOps-Engineer
```

**Expected Validation Result:**
- Work type detected: `infrastructure` (matches: kubernetes, infrastructure, AWS)
- Capability match: 0.25 (FAIL - below 0.7)
- Required architect: @System-Architect
- Suggested role: @DevOps-Engineer or @Kubernetes-Specialist
- Result: Auto-reassign to specialist

## Test Case 3: Security Work Specialist Preference
**Input Task:**
```yaml
title: "Implement OAuth2 authentication"
description: "Design and implement secure authentication system"
type: security
assigned_to: @Architect  # Generic - should use specialist
```

**Expected Validation Result:**
- Work type detected: `security` (matches: authentication, OAuth)
- Specialist available: @Security-Architect preferred over generic
- Required architect: @Security-Architect
- Suggested role: @Security-Engineer
- Result: Reassign to security specialist

## Test Case 4: Database Work Validation
**Input Task:**
```yaml
title: "Optimize PostgreSQL query performance"
description: "Analyze and optimize slow database queries"
type: performance
assigned_to: @Web-Designer  # VERY WRONG
```

**Expected Validation Result:**
- Work type detected: `database` (matches: PostgreSQL, query, database)
- Capability match: 0.0 (COMPLETE MISMATCH)
- Blocked assignment: @Web-Designer blocked for database work
- Required architect: @Data-Architect
- Suggested role: @Database-Engineer or @PostgreSQL-Specialist
- Result: BLOCKED - complete reassignment needed

## Test Case 5: Frontend Work Correct Assignment
**Input Task:**
```yaml
title: "Build responsive React dashboard"
description: "Create user-friendly dashboard with React components"
type: frontend
assigned_to: @Web-Designer  # CORRECT
```

**Expected Validation Result:**
- Work type detected: `frontend` (matches: React, dashboard, UI)
- Capability match: 0.85 (PASS - above 0.7)
- Required architect: @Frontend-Architect
- Result: Assignment validated - proceed

## Test Case 6: Multi-Domain Work
**Input Task:**
```yaml
title: "Build ML model API with secure deployment"
description: "Create machine learning model with REST API and security controls"
type: implementation
assigned_to: @Developer  # Unclear - needs specialist determination
```

**Expected Validation Result:**
- Primary work type: `ai_agentic` (matches: ML, machine learning)
- Secondary work type: `security` (matches: secure, security controls)
- Required architects: @AI-Architect (primary), @Security-Architect (consult)
- Suggested roles: @AI-Engineer with @Security-Engineer review
- Result: Multi-architect triage required

## Test Case 7: No Clear Work Type
**Input Task:**
```yaml
title: "Fix typo in documentation"
description: "Correct spelling error in README"
type: documentation
assigned_to: @Developer  # Fine for simple work
```

**Expected Validation Result:**
- Work type detected: None (no specialist patterns matched)
- Capability match: 0.8 (default for unclear requirements)
- Result: Assignment allowed - proceed

## Test Case 8: Duplicate Assignment Prevention
**Input Tasks:**
```yaml
task1:
  title: "Implement feature A"
  assigned_to: @Developer
  
task2:
  title: "Implement feature B"
  assigned_to: @Developer  # Same role assigned to parallel task
```

**Expected Validation Result:**
- Duplicate assignment detected
- Issue: Role already assigned in this batch
- Suggestion: Use different developer or sequence tasks
- Result: Warning or reassignment needed

## Validation Chain Test Flow

### Step 1: Work Type Detection
```pseudocode
// Test each pattern matching
testWorkTypeDetection() {
    assert detectWorkType("AI behavioral patterns") == "ai_agentic"
    assert detectWorkType("kubernetes deployment") == "infrastructure"
    assert detectWorkType("OAuth authentication") == "security"
    assert detectWorkType("PostgreSQL optimization") == "database"
    assert detectWorkType("React components") == "frontend"
    assert detectWorkType("fix typo") == null
}
```

### Step 2: Capability Matching
```pseudocode
// Test capability calculations
testCapabilityMatching() {
    assert calculateMatch("System-Engineer", "AI work") < 0.7
    assert calculateMatch("Developer", "kubernetes") < 0.7
    assert calculateMatch("Web-Designer", "database") == 0.0
    assert calculateMatch("Web-Designer", "React UI") > 0.7
}
```

### Step 3: Architect Requirements
```pseudocode
// Test architect detection
testArchitectRequirements() {
    assert getRequiredArchitect("ai_agentic") == "AI-Architect"
    assert getRequiredArchitect("infrastructure") == "System-Architect"
    assert getRequiredArchitect("security") == "Security-Architect"
    assert getRequiredArchitect("database") == "Data-Architect"
    assert getRequiredArchitect("frontend") == "Frontend-Architect"
}
```

### Step 4: Validation Chain Execution
```pseudocode
// Test full validation chain
testValidationChain() {
    story = {description: "Build AI system for behavioral automation"}
    
    // Should trigger full chain
    result = executeValidationChain(story, proposedTasks)
    
    assert result.workType == "ai_agentic"
    assert result.requiredArchitect == "AI-Architect"
    assert result.requiresTriage == true
    assert result.requiresApproval == true
}
```

## Expected Benefits

✅ **No more @System-Engineer assigned to AI work**
✅ **No more @Developer assigned to infrastructure**
✅ **No more generic @Architect when specialists exist**
✅ **Clear architect requirements for specialist domains**
✅ **Automatic reassignment suggestions**
✅ **Multi-domain work properly handled**

## Integration Verification

The validation system should integrate at these points in lean-workflow-executor.md:

1. **planStory()** - Line 191-247: Validation chain execution before task creation
2. **assign_role()** - Line 103-126: Individual assignment validation
3. **Role capability checks** - Enhanced with work type detection
4. **Architect triage** - Required for all specialist work

## Success Criteria

- [ ] AI work blocked when assigned to non-AI roles
- [ ] Infrastructure work requires DevOps/System specialists
- [ ] Security work requires Security specialists
- [ ] Database work requires Database specialists
- [ ] Frontend work requires Frontend specialists
- [ ] Generic architects blocked when specialists available
- [ ] Multi-domain work triggers multi-architect review
- [ ] All validations provide helpful suggestions
- [ ] No valid assignments are incorrectly blocked
- [ ] Duplicate assignments are prevented