# icc-plan-bug

**PURPOSE:** Generate task breakdown for bug fixing

## BEHAVIORAL GUIDANCE

### Input
- Bug file path (e.g., `epics/EPIC-004/bugs/BUG-059/bug.yaml`)

### Process
1. **Read bug YAML** → Extract requirements
2. **Root cause analysis** → Identify underlying issues
3. **Impact assessment** → Customer, system, security impacts
4. **Work type detection** → Trigger specialist validation
5. **Architect triage** → PM + Specialist-Architect approval
6. **Task generation** → Create fix and validation tasks
7. **Update bug file** → Write tasks array

### Bug Analysis Requirements
- **Root cause identification** (not just symptoms)
- **Impact scope** (customer count, feature areas)
- **Security implications** (data exposure, auth issues)
- **Regression risk** (what else might break)
- **Performance impact** (degradation metrics)

### Validation Chain Execution
```
icc:detect-work-type → specialist_architect
icc:require-triage(@PM, @specialist_architect)
icc:validate-assignments(tasks)
icc:require-approval(@PM, @specialist_architect)
```

### Task Generation Pattern
```yaml
tasks:
  - id: TASK-001
    title: Knowledge Retrieval
    assigned_to: [primary_specialist]
    priority: blocking
    
  - id: TASK-002
    title: Root Cause Analysis
    assigned_to: [specialist]
    priority: critical_path
    
  - id: TASK-003
    title: Implement Fix
    assigned_to: [specialist]
    priority: critical_path
    
  - id: TASK-004
    title: Fix Validation
    assigned_to: [QA-specialist]
    priority: critical_path
    
  - id: TASK-005
    title: Regression Testing
    assigned_to: [test_specialist]
    priority: parallel
    
  - id: TASK-999
    title: Knowledge Generation
    assigned_to: [primary_specialist]
    priority: optional
```

### Bug-Specific Task Types
- **Root cause analysis** → Investigation and diagnosis
- **Fix implementation** → Targeted solution
- **Fix validation** → Verify issue resolved
- **Regression testing** → Ensure no new breaks
- **Customer communication** → If high impact

### Priority Escalation
- **CRITICAL severity** → Auto-escalate to P0
- **HIGH severity + customer impact** → P1
- **Security implications** → P0 override
- **Performance degradation** → Priority +1

### Severity Mapping
```yaml
severity_to_priority:
  CRITICAL: P0  # System down, data loss
  HIGH: P1      # Major feature broken
  MEDIUM: P2    # Feature degraded
  LOW: P3       # Minor issue
```

### Output
Bug YAML updated with:
- Tasks array with proper specialists
- Root cause documented
- Impact assessment included
- Fix approach validated by architect
- Test coverage defined

### Chain Context
- **From:** icc-plan-order (bug prioritization)
- **To:** icc-plan-tasks (detailed planning)
- **Integration:** Role activation via @-notation

### Specialist Requirements
- **Security bugs** → @Security-Engineer review
- **Performance bugs** → @System-Engineer analysis
- **Data bugs** → @Database-Engineer validation
- **UI bugs** → @Frontend-Tester verification

### Quality Gates
- Root cause must be identified (not guessed)
- Fix must address cause (not symptoms)
- Tests must prevent regression
- Customer impact must be assessed