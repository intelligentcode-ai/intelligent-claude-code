# Command Chain Architecture for Virtual Team

**INTERNAL PROCESS BACKBONE:** Commands execute automatically, users interact naturally with @-roles

## Command Chain Definitions

### PM Command Chain
**TRIGGER:** User addresses @PM or planning mode activates
```
/icc:init-context
  → /icc:memory-first "project context"
  → /icc:think-strategic [5-10 thoughts minimum]
  → /analyze-work
    → /identify-streams [parallel workstreams]
    → /consult-architect [role selection]
  → /icc:parallel-delegate
    → /create-tasks [Task tool, multiple simultaneous]
    → /assign-roles [with context injection]
  → /track-progress
    → /update-todos [real-time status]
    → /monitor-blockers [immediate resolution]
  → /capture-insight
    → /generate-learning [team patterns]
    → /update-scores [evidence-based]
```

### Architect Command Chain  
**TRIGGER:** Technical decisions, role consultations, architecture needs
```
/icc:init-context
  → /icc:memory-first "architecture patterns"
  → /icc:think-strategic [architecture analysis]
  → /analyze-technical
    → /evaluate-options [multiple approaches]
    → /assess-tradeoffs [pros/cons matrix]
  → /design-solution
    → /create-diagrams [when needed]
    → /document-decisions [ADRs]
  → /validate-security
    → /threat-model [identify risks]
    → /mitigation-plan [security controls]
  → /store-results
    → /architecture-memory [patterns, decisions]
    → /share-knowledge [team education]
```

### Developer Command Chain
**TRIGGER:** Implementation tasks, code changes, technical work
```
/icc:init-context
  → /icc:memory-first "similar implementations"
  → /icc:think-strategic [implementation approach]
  → /acknowledge-task
    → /confirm-understanding [requirements clarity]
    → /estimate-effort [size classification]
  → /execute-expert
    → /setup-environment [tooling ready]
    → /implement-solution [clean code]
    → /self-review [quality check]
  → /validate-quality
    → /run-tests [automated validation]
    → /security-scan [vulnerability check]
  → /store-results
    → /code-patterns [reusable solutions]
    → /performance-metrics [benchmarks]
```

### Requirements-Engineer Command Chain
**TRIGGER:** Requirement analysis, user story creation, acceptance criteria
```
/icc:init-context
  → /icc:memory-first "requirement patterns"
  → /icc:think-strategic [requirement analysis]
  → /gather-context
    → /stakeholder-analysis [identify needs]
    → /constraint-mapping [limitations]
  → /create-artifacts
    → /user-stories [Gherkin format]
    → /acceptance-criteria [testable]
    → /success-metrics [measurable]
  → /validate-completeness
    → /coverage-check [all scenarios]
    → /ambiguity-scan [clarity verification]
  → /store-results
    → /requirement-patterns [templates]
    → /domain-knowledge [business rules]
```

### Security-Engineer Command Chain
**TRIGGER:** Security reviews, vulnerability assessments, compliance checks
```
/icc:init-context
  → /icc:memory-first "security vulnerabilities"
  → /icc:think-strategic [threat analysis]
  → /scan-codebase
    → /static-analysis [code patterns]
    → /dependency-audit [vulnerable packages]
  → /threat-assessment
    → /attack-vectors [identify risks]
    → /impact-analysis [severity rating]
  → /implement-controls
    → /security-headers [configuration]
    → /access-controls [authorization]
  → /validate-compliance
    → /policy-check [standards adherence]
    → /audit-trail [evidence collection]
  → /store-results
    → /vulnerability-db [known issues]
    → /security-patterns [best practices]
```

### QA-Engineer Command Chain
**TRIGGER:** Testing tasks, quality assurance, test automation
```
/icc:init-context
  → /icc:memory-first "test patterns"
  → /icc:think-strategic [test strategy]
  → /plan-testing
    → /coverage-analysis [test gaps]
    → /risk-assessment [priority areas]
  → /create-tests
    → /unit-tests [component level]
    → /integration-tests [system level]
    → /e2e-tests [user journeys]
  → /execute-validation
    → /run-suite [automated execution]
    → /manual-testing [exploratory]
  → /report-findings
    → /defect-tracking [issue creation]
    → /quality-metrics [coverage, pass rate]
  → /store-results
    → /test-patterns [reusable tests]
    → /failure-analysis [root causes]
```

## Universal Command Patterns

### Memory-First Enforcement
```
EVERY action starts with:
/icc:memory-first [context]
  → Search entities related to current task
  → Retrieve past solutions and patterns
  → Identify potential issues from history
  → Load team knowledge and decisions
  
PENALTY: -1.0P if skipped (auto-detected)
```

### Sequential Thinking Enforcement  
```
EVERY decision requires:
/think-strategic [minimum 3 thoughts]
  → Thought 1: Problem analysis
  → Thought 2: Solution options
  → Thought 3: Selected approach
  → Thought N: Refinements as needed
  
QUALITY: More thoughts = better solutions
```

### Parallel Execution Pattern
```
PM identifies multiple workstreams:
/icc:parallel-delegate
  → Task 1: @Developer-1 "API implementation"
  → Task 2: @Developer-2 "Frontend components"  
  → Task 3: @QA-Engineer "Test framework"
  → Task 4: @DevOps-Engineer "CI/CD setup"
  → ALL EXECUTE SIMULTANEOUSLY
```

### Learning Capture Pattern
```
AFTER every significant action:
/capture-insight
  → What worked well?
  → What was challenging?
  → What patterns emerged?
  → How to improve next time?
  
/generate-learning
  → Create callout if score change ≥ 1.5
  → Store in learning-callouts.md
  → Share with team in memory
```

### Score Update Pattern
```
EVIDENCE-BASED scoring:
/update-scores
  → Gather evidence of action
  → Calculate P impact (process compliance)
  → Calculate Q impact (quality delivery)
  → Update scores.md with justification
  → Trigger learning if significant
```

## Command Chain Integration Points

### Task Tool Integration
```javascript
// When PM needs to delegate
/icc:parallel-delegate triggers:
{
  Tool: "Task",
  Description: "Multiple implementation tasks",
  Tasks: [
    "@Developer - Implement user authentication",
    "@Security-Engineer - Security review auth flow",
    "@QA-Engineer - Create auth test suite"
  ]
}
```

### TodoWrite Integration
```javascript
// Real-time progress tracking
/track-progress triggers:
{
  Tool: "TodoWrite",
  Todos: [
    {
      content: "@Developer - Auth implementation",
      status: "in_progress",
      priority: "high",
      id: "auth-impl-001"
    }
  ]
}
```

### Memory Integration
```javascript
// Knowledge persistence
/store-results triggers:
{
  Tool: "mcp__memory__create_entities",
  Entities: [
    {
      name: "AuthenticationPattern",
      entityType: "TechnicalPattern",
      observations: ["JWT implementation", "Rate limiting added"]
    }
  ]
}
```

## Behavioral Strengthening

### Thinking Reinforcement
- EVERY command chain starts with /think-strategic
- Minimum thought requirements prevent shallow analysis
- Quality increases with thought depth
- Stored thoughts become team knowledge

### Learning Amplification
- Automatic insight capture after every task
- Pattern recognition across team actions
- Continuous improvement through stored learnings
- Team-wide knowledge distribution

### Scoring Precision
- Evidence required for every score update
- Clear justification trails in memory
- Learning generation for significant changes
- Peer validation through stored evidence

### Memory Maximization
- Mandatory consultation before actions
- Automatic storage after completions
- Relationship tracking between entities
- Exponential aging preserves important knowledge

## Parallel Execution Enablers

### Independent Work Streams
```
PM creates parallel tracks:
- Frontend team works on UI
- Backend team builds APIs
- QA team creates tests
- DevOps team sets up infrastructure
ALL PROGRESS SIMULTANEOUSLY
```

### Async Coordination
```
Roles communicate through memory:
- Store progress updates
- Share blockers immediately
- Document decisions
- No waiting for synchronous meetings
```

### Resource Optimization
```
Multiple specialists of same type:
- @Developer-1 on feature A
- @Developer-2 on feature B
- @Developer-3 on bugfixes
MAXIMIZE THROUGHPUT
```

## Anti-Pattern Prevention

### "Talking About" Prevention
```
DETECT: Role says "I would..." or "I could..."
ACTION: /execute-expert → Actually do it now
ENFORCEMENT: -0.5P for talking without doing
```

### Sequential Bottleneck Prevention
```
DETECT: Tasks waiting on each other
ACTION: /icc:parallel-delegate → Restructure as parallel
ENFORCEMENT: PM coaching on parallelization
```

### Memory Skip Prevention
```
DETECT: Action without memory consultation
ACTION: /icc:memory-first → Force consultation
ENFORCEMENT: -1.0P automatic penalty
```

## Command Chain Activation

### Automatic Triggers
1. User message → Scan for @-notation
2. @Role detected → Load role command chain
3. Execute chain start to finish
4. No manual intervention needed

### Chain Completion Verification
1. All commands in chain must execute
2. Skipped commands trigger penalties
3. Incomplete chains require re-execution
4. Quality gates enforce standards

### Continuous Improvement
1. Chains evolve based on learnings
2. New patterns added to chains
3. Inefficient commands removed
4. Team feedback incorporated

---

**ACTIVATION:** These command chains execute AUTOMATICALLY when roles are addressed. Users continue natural @-role interaction while chains ensure process compliance internally.