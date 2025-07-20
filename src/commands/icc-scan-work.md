# Scan Work

Scan project for available work items using $ARGUMENTS.

## Behavior
Systematically scan project directories for epics, stories, bugs, and tasks
that are ready for execution. Identifies work in PLANNED or IN PROGRESS status
and filters by readiness criteria for queue addition.

## Arguments
**Format:** "Scope: epics|stories|bugs|tasks|all | Status: PLANNED|IN_PROGRESS|all | Phase: specific_phase | Ready: true|false"
**Example:** "Scope: bugs | Status: PLANNED | Phase: task_decomposition | Ready: true"

## Core Actions
- Parse scan criteria from $ARGUMENTS
- Scan project directories using glob patterns
- Load and parse work item files (YAML/Markdown)
- Filter by status, phase, and readiness criteria
- Check dependencies and blockers
- Validate role assignments and capability matches
- Classify work by execution readiness
- Return structured work inventory
- Log scan results for monitoring

## Scan Patterns

### File Discovery
- **Epics**: `epics/*/epic.yaml`
- **Stories**: `epics/*/stories/*/story.yaml`
- **Bugs**: `epics/*/bugs/*/bug.yaml`
- **Tasks**: `epics/*/*/tasks/*.md`

### Directory Structure
```
epics/
├── EPIC-001-user-authentication/
│   ├── epic.yaml
│   ├── stories/
│   │   ├── STORY-001-oauth-login/
│   │   │   ├── story.yaml
│   │   │   └── tasks/
│   │   │       ├── TASK-001-research.md
│   │   │       └── TASK-002-implement.md
│   └── bugs/
│       └── BUG-001-login-timeout/
│           ├── bug.yaml
│           └── tasks/
│               └── TASK-003-fix-timeout.md
```

## Status Filtering

### Work Item Status
- **PLANNED**: Ready for execution
- **IN_PROGRESS**: Currently being worked
- **COMPLETED**: Finished work
- **BLOCKED**: Cannot proceed
- **ARCHIVED**: Historical work

### Phase Filtering
- **Outer Workflow Phases**: knowledge_retrieval, story_creation, task_decomposition, etc.
- **Inner Workflow Phases**: task_planning, task_execution, peer_review, etc.
- **Phase Readiness**: Items ready for specific phase

## Readiness Assessment

### Epic Readiness
- **Status**: PLANNED or IN_PROGRESS
- **Phase**: Valid workflow phase
- **Dependencies**: No blocking dependencies
- **Resources**: Required resources available

### Story/Bug Readiness
- **Parent Epic**: Epic exists and is active
- **Task Breakdown**: Tasks created and assigned
- **Role Validation**: All role assignments validated
- **Dependencies**: Dependencies resolved

### Task Readiness
- **Assignment**: Valid specialist role assigned
- **Capability**: >70% capability match validated
- **Dependencies**: All dependent tasks completed
- **Resources**: Required tools and access available
- **Approval**: PM + Architect approval obtained

## Work Classification

### Ready for Execution
- All readiness criteria met
- No blockers or dependencies
- Resources available
- Can be added to execution queue

### Needs Attention
- Missing dependencies
- Invalid role assignments
- Blocked by external factors
- Requires manual intervention

### Waiting for Dependencies
- Dependent tasks not yet completed
- External dependencies pending
- Resource availability pending
- Scheduled for future execution

### Invalid/Broken
- Malformed files
- Invalid references
- Missing required fields
- Requires cleanup or repair

## Scan Output

### Work Inventory
```yaml
scan_results:
  timestamp: 2025-01-15T10:30:00Z
  scope: bugs
  criteria:
    status: PLANNED
    phase: task_decomposition
    ready: true
    
  found_items:
    ready_for_execution:
      - id: BUG-001
        type: bug
        title: "Fix login timeout issue"
        status: PLANNED
        phase: task_decomposition
        tasks_ready: 3
        estimated_hours: 8
        assigned_roles: [@Developer, @QA-Engineer]
        
    needs_attention:
      - id: BUG-002
        type: bug
        title: "Memory leak in user service"
        status: PLANNED
        phase: story_creation
        issues: ["No tasks created", "Missing role assignments"]
        
    waiting_dependencies:
      - id: BUG-003
        type: bug
        title: "Database connection timeout"
        status: IN_PROGRESS
        phase: task_execution
        blocked_by: ["TASK-050 in progress"]
        
  summary:
    total_found: 15
    ready_for_execution: 8
    needs_attention: 4
    waiting_dependencies: 2
    invalid: 1
```

## Performance Optimization

### Caching Strategy
- **File Metadata**: Cache file timestamps and sizes
- **Parse Results**: Cache parsed YAML/Markdown content
- **Readiness State**: Cache readiness assessments
- **Dependency Graph**: Cache dependency relationships

### Incremental Scanning
- **Change Detection**: Only scan modified files
- **Delta Updates**: Update only changed work items
- **Smart Filtering**: Skip obviously invalid items
- **Parallel Processing**: Concurrent file processing

## Integration
- Used by work discovery engine for continuous scanning
- Referenced by L3 continuous engine for work identification
- Integrates with queue management for task addition
- Supports manual work discovery and analysis
- Connected to monitoring systems for work tracking

## Quality Standards
- Comprehensive work item discovery
- Accurate readiness assessment
- Fast scanning performance
- Reliable dependency tracking
- Clear classification and reporting