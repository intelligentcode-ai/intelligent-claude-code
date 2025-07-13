# Role Assessment Behavior

**CORE:** Automated role requirement analysis • Continuous health checks • Gap detection • Specialist recommendations

## Assessment Engine

```pseudocode
// ROLE ASSESSMENT ENGINE
FUNCTION initializeAssessmentEngine():
    
    // TRIGGER MODE DETECTION
    triggerModes = {
        "CONTINUOUS_AUTO": {
            trigger: onMilestoneComplete() OR onDeliverableComplete(),
            action: () => executeFullProjectAssessment()
        },
        "ON_DEMAND": {
            trigger: pmRequestsAssessment(),
            action: () => executeCurrentStateAnalysis()
        },
        "PROJECT_CHANGE": {
            trigger: detectFileChanges() OR detectDependencyChanges(),
            action: () => executeIncrementalAssessment()
        },
        "TASK_COMPLETION": {
            trigger: onSignificantDeliverable(),
            action: () => executeRoleEffectivenessAssessment()
        }
    }
    
    // CONTINUOUS MONITORING
    setInterval(() => {
        FOR EACH mode IN triggerModes:
            IF mode.trigger():
                mode.action()
    }, 1000)
    
END FUNCTION

// PROJECT DISCOVERY ENGINE
FUNCTION executeProjectDiscovery():
    
    discoveryResults = {
        filePatterns: {},
        dependencies: {},
        activeTasks: {},
        architecturePatterns: {}
    }
    
    // FILE PATTERN ANALYSIS
    files = scanProjectFiles()
    FOR EACH file IN files:
        IF file.extension == ".js" AND containsReact(file):
            discoveryResults.filePatterns["React-Developer"] = "needed"
        ELSE IF file.extension == ".py":
            discoveryResults.filePatterns["Python-Developer"] = "needed"
        ELSE IF file.extension == ".tf":
            discoveryResults.filePatterns["Terraform-Engineer"] = "needed"
    
    // DEPENDENCY ANALYSIS
    dependencies = analyzeDependencies(["package.json", "requirements.txt", "Cargo.toml"])
    FOR EACH dependency IN dependencies:
        requiredRole = mapDependencyToRole(dependency)
        discoveryResults.dependencies[requiredRole] = "required"
    
    // ACTIVE TASK ANALYSIS
    activeTasks = getTodoWriteTasks()
    FOR EACH task IN activeTasks:
        requiredCapabilities = extractCapabilities(task)
        discoveryResults.activeTasks[task.id] = requiredCapabilities
    
    // ARCHITECTURE PATTERN ANALYSIS
    architecturePatterns = scanArchitecturePatterns()
    FOR EACH pattern IN architecturePatterns:
        requiredExpertise = mapPatternToExpertise(pattern)
        discoveryResults.architecturePatterns[pattern] = requiredExpertise
    
    RETURN discoveryResults
END FUNCTION

// CAPABILITY MATRIX ANALYSIS
FUNCTION executeCapabilityMatrixAnalysis(discoveryResults):
    
    // CURRENT ROLE CAPABILITIES
    currentRoles = scanActiveTeam()
    currentCapabilities = {}
    
    FOR EACH role IN currentRoles:
        capabilities = extractRoleCapabilities(role)
        currentCapabilities[role.name] = capabilities
    
    // REQUIRED CAPABILITIES
    requiredCapabilities = aggregateRequiredCapabilities(discoveryResults)
    
    // COVERAGE CALCULATION
    coverageMatrix = {}
    FOR EACH requirement IN requiredCapabilities:
        bestMatch = findBestCapabilityMatch(requirement, currentCapabilities)
        coverageScore = calculateCoverageScore(requirement, bestMatch)
        
        coverageMatrix[requirement] = {
            score: coverageScore,
            currentRole: bestMatch.role,
            gapTrigger: coverageScore < 0.7
        }
    
    RETURN coverageMatrix
END FUNCTION

// GAP DETECTION ALGORITHM
FUNCTION executeGapDetection(coverageMatrix):
    
    gaps = {
        capabilityGaps: [],
        workloadIssues: [],
        specialistNeeds: []
    }
    
    // CAPABILITY GAP IDENTIFICATION
    FOR EACH coverage IN coverageMatrix:
        IF coverage.gapTrigger:
            gap = {
                type: "CAPABILITY_GAP",
                requirement: coverage.requirement,
                currentScore: coverage.score,
                priority: calculateGapPriority(coverage)
            }
            gaps.capabilityGaps.append(gap)
    
    // WORKLOAD ANALYSIS
    workloadAnalysis = analyzeRoleUtilization()
    FOR EACH role IN workloadAnalysis:
        IF role.utilization > 0.9:
            gaps.workloadIssues.append({
                type: "OVERLOAD",
                role: role.name,
                utilization: role.utilization,
                recommendation: "load_balancing_needed"
            })
    
    // SPECIALIST NEEDS IDENTIFICATION
    domainExpertise = identifyDomainExpertiseRequirements()
    FOR EACH domain IN domainExpertise:
        IF NOT hasExpertise(domain, currentRoles):
            gaps.specialistNeeds.append({
                type: "SPECIALIST_NEEDED",
                domain: domain,
                context7Available: checkContext7Coverage(domain)
            })
    
    RETURN gaps
END FUNCTION
```

**TRIGGER MODES:**
- **CONTINUOUS AUTO:** Every major milestone/deliverable → Immediate full project assessment → Role gap analysis → Optimization report
- **ON-DEMAND:** @PM assessment → Immediate analysis → Current state report  
- **PROJECT CHANGE:** New files/dependencies detected → Immediate incremental assessment → Role review
- **TASK COMPLETION:** After significant deliverables → Immediate role effectiveness assessment

**ANALYSIS PIPELINE:**

### 1. Project Discovery
```markdown
**FILE PATTERNS:** *.js/React → @React-Developer needed
**DEPENDENCIES:** package.json/requirements.txt → Technology stack analysis
**ACTIVE TASKS:** TodoWrite analysis → Required capabilities mapping
**CODEBASE SCAN:** Architecture patterns → Role requirement inference
```

### 2. Capability Matrix Analysis
```markdown
**CURRENT ROLES:** Scan active team → Extract capabilities → Calculate coverage
**REQUIRED CAPS:** Project needs → Map to capability requirements → Score gaps
**COVERAGE SCORE:** Required vs Available → Percentage calculation → <70% gap trigger
```

### 3. Gap Detection Algorithm
```markdown
**CAPABILITY GAPS:** Missing expertise identification → Priority scoring
**WORKLOAD ANALYSIS:** Role utilization → Overload detection → Load balancing needs
**SPECIALIST NEEDS:** Domain expertise requirements → Context7 knowledge gaps
```

## Assessment Output

```pseudocode
// ASSESSMENT REPORT GENERATION
FUNCTION generateAssessmentReport(gaps, coverageMatrix):
    
    report = {
        projectName: getCurrentProjectName(),
        timestamp: getCurrentTimestamp(),
        overallCoverage: calculateOverallCoverage(coverageMatrix),
        gaps: [],
        recommendations: [],
        autoActions: []
    }
    
    // GAP IDENTIFICATION
    FOR EACH gap IN gaps.capabilityGaps:
        report.gaps.append({
            area: gap.requirement.domain,
            specialist: gap.requirement.specialistType,
            coverage: gap.currentScore * 100 + "%"
        })
    
    // RECOMMENDATION GENERATION
    prioritizedGaps = prioritizeGaps(gaps)
    FOR EACH gap IN prioritizedGaps:
        recommendation = {
            action: "Create @" + gap.requirement.specialistType,
            priority: gap.priority,
            impact: gap.requirement.impact,
            rationale: gap.requirement.rationale
        }
        report.recommendations.append(recommendation)
    
    // AUTO-ACTION EXECUTION
    FOR EACH gap IN gaps.capabilityGaps:
        IF gap.currentScore < 0.7:
            autoAction = executeSpecialistCreation(gap)
            report.autoActions.append(autoAction)
    
    // MEMORY STORAGE
    storeAssessmentInMemory(report)
    
    // SCHEDULING
    scheduleNextAssessment()
    
    RETURN formatReport(report)
END FUNCTION

// SPECIALIST CREATION AUTO-ACTION
FUNCTION executeSpecialistCreation(gap):
    
    specialist = {
        name: "@" + gap.requirement.specialistType,
        domain: gap.requirement.domain,
        expertise: loadContext7Knowledge(gap.requirement.domain),
        experience: "ultra-experienced (10+ years)"
    }
    
    // CREATE SPECIALIST
    createSpecialist(specialist)
    
    // NOTIFY TEAM
    notifyTeam("Specialist created: " + specialist.name)
    
    // UPDATE COVERAGE
    updateCoverageMatrix(gap.requirement, specialist)
    
    RETURN {
        action: "SPECIALIST_CREATED",
        specialist: specialist.name,
        coverage_improvement: calculateCoverageImprovement(gap, specialist)
    }
END FUNCTION
```

**ROLE GAP REPORT:**
```markdown
**PROJECT:** [name] - **DATE:** [timestamp]
**ROLE COVERAGE:** [X]% overall capability match
**GAPS IDENTIFIED:**
- Frontend: React specialist needed (45% coverage)
- Backend: GraphQL expert recommended (60% coverage)  
- Infrastructure: Kubernetes engineer required (35% coverage)

**RECOMMENDATIONS:**
1. Create @React-Developer specialist (P0 - Critical gap)
2. Generate @GraphQL-Expert for API layer (P1 - High impact)
3. Add @Kubernetes-Engineer for deployment (P2 - Medium priority)

**AUTO-ACTIONS TAKEN:**
- Triggered specialist creation for <70% gaps
- Updated Memory Bank with assessment results
- Next assessment: After next major milestone
```

## Integration Points

**MEMORY INTEGRATION:** Store all assessments → Historical tracking → Pattern recognition
**SPECIALIST CREATION:** <70% coverage → Auto-trigger unlimited specialist generation
**DASHBOARD ACCESS:** @PM dashboard → Display current assessment → Show recommendations
**NOTIFICATION SYSTEM:** @PM notified of critical gaps → Approval for specialist creation

**STORAGE:** ~/.claude/assessments/[milestone]-role-assessment.md
**FREQUENCY:** Milestone-triggered + on-demand + change-triggered
**APPROVAL:** Auto-create for P0 gaps • PM approval for P1/P2 recommendations

---

**Role Assessment: Continuous project-role optimization with automated gap detection and specialist recommendations.**