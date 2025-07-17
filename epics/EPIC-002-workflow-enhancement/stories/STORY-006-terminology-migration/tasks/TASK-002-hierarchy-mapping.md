# TASK-002: Define Correct Hierarchy Mapping

**Status:** IN PROGRESS  
**Assigned to:** @AI-Architect  
**Story:** STORY-006 Terminology Migration  
**Priority:** P0 CRITICAL

## Memory Consultation Results

Based on TASK-001 audit findings, creating definitive hierarchy mapping:

## Official Hierarchy Definition

### Four-Level Hierarchy Structure

```yaml
EPIC:
  duration: "months"
  scope: "major initiative"
  contains: ["stories", "bugs"]
  example: "EPIC-002: Workflow System Enhancement"
  
STORY:
  duration: "weeks"
  scope: "feature implementation"
  contains: ["tasks"]
  example: "STORY-006: Migrate to Correct Terminology"
  
BUG:
  duration: "days to weeks"
  scope: "issue resolution"
  contains: ["tasks"]
  example: "BUG-006: Learning System Failure"
  
TASK:
  duration: "days"
  scope: "specific work item"
  contains: ["subtasks (implied)"]
  example: "TASK-001: Audit Current Terminology Usage"
```

### Terminology Mapping Matrix

#### Current State → Target State

| Current File | Current Term | Target Term | Action Required |
|-------------|-------------|-------------|-----------------|
| epic.yaml | epic | epic | ✅ No change |
| story.yaml | story | story | ✅ No change |
| bug.yaml | bug | bug | ✅ No change |
| task files | task | task | ✅ No change |
| outer-workflow.yaml | task | story | ❌ Must fix |
| inner-workflow.yaml | subtask | task | ❌ Must fix |
| documentation | mixed | standardized | ❌ Must fix |

### Specific Fixes Required

#### 1. Workflow Template Fixes

**outer-workflow.yaml (Story-Level Coordination)**:
```yaml
# WRONG (current):
steps:
  - name: "Plan tasks"
    task: "task-planning"
    
# CORRECT (target):
steps:
  - name: "Plan tasks"
    story: "story-planning"
```

**inner-workflow.yaml (Task-Level Execution)**:
```yaml
# WRONG (current):
steps:
  - name: "Execute subtask"
    subtask: "subtask-execution"
    
# CORRECT (target):
steps:
  - name: "Execute task"
    task: "task-execution"
```

#### 2. Assignment Template Consistency

**Current Templates (Already Correct)**:
- `epic-assignment-template.yaml` ✅
- `story-assignment-template.yaml` ✅
- `bug-assignment-template.yaml` ✅
- `task-assignment-template.yaml` ✅

**No changes needed** - templates already use correct terminology.

#### 3. Documentation Standards

**Standard Terminology Usage**:
- **Epic**: Use for large initiatives spanning months
- **Story**: Use for feature implementations spanning weeks
- **Bug**: Use for issue resolution spanning days-weeks
- **Task**: Use for specific work items spanning days
- **Subtask**: Use sparingly, only for granular steps within tasks

**Prohibited Terms**:
- ❌ "Item" (too generic)
- ❌ "Work unit" (too generic)
- ❌ "Assignment" (use specific level)
- ❌ Mixed usage (task for story, subtask for task)

### Implementation Mapping

#### Phase 1: Critical Fixes (P0)
```yaml
files_to_fix:
  - "workflow-templates/outer-workflow.yaml"
  - "workflow-templates/inner-workflow.yaml"
  
changes:
  outer_workflow:
    - "task" → "story" (for story-level coordination)
    - "task-planning" → "story-planning"
    - "task-execution" → "story-execution"
    
  inner_workflow:
    - "subtask" → "task" (for task-level execution)
    - "subtask-execution" → "task-execution"
    - "subtask-validation" → "task-validation"
```

#### Phase 2: Documentation Fixes (P1)
```yaml
files_to_fix:
  - "src/behaviors/*.md"
  - "src/roles/*.md"
  - "docs/*.md"
  
changes:
  - Standardize on epic→story/bug→task hierarchy
  - Remove ambiguous generic terms
  - Use specific level terminology
```

#### Phase 3: Code Comments (P2)
```yaml
files_to_fix:
  - Code comments throughout system
  - Variable names in behavioral modules
  - Internal logging messages
  
changes:
  - Update comments to use correct terminology
  - Rename variables for clarity
  - Fix logging messages
```

### Validation Criteria

#### Terminology Consistency Tests:
1. **Grep Tests**: No mixed terminology found
2. **Workflow Tests**: Templates use correct level terms  
3. **Assignment Tests**: Templates create correct hierarchy
4. **Documentation Tests**: All docs use standard terms

#### Specific Validation Commands:
```bash
# Test for mixed terminology
grep -r "task.*story\|story.*task" workflow-templates/
grep -r "subtask.*task\|task.*subtask" workflow-templates/

# Test for correct hierarchy
grep -r "epic.*story\|story.*task" templates/
grep -r "bug.*task" templates/

# Test for prohibited terms
grep -r "work unit\|assignment\|item" src/ docs/
```

### Migration Strategy

#### Safe Migration Approach:
1. **Backup**: Create backup of current files
2. **Test**: Validate current system works
3. **Fix**: Apply terminology fixes systematically
4. **Test**: Validate system still works
5. **Deploy**: Apply changes to production

#### Risk Mitigation:
- **Small changes**: Fix one file at a time
- **Test each change**: Validate functionality after each fix
- **Rollback plan**: Keep backups for quick rollback
- **Staged deployment**: Test in development first

### Integration Points

#### Systems Affected:
- **Workflow Engine**: Templates drive execution
- **Assignment System**: Templates create structure
- **Documentation**: User understanding
- **Behavioral Modules**: Internal references

#### Dependencies:
- **Workflow templates**: Core functionality
- **Assignment templates**: User interface
- **Documentation**: User training
- **Behavioral modules**: Internal consistency

## Summary

The hierarchy mapping is clear and most of the system already uses correct terminology. The primary fixes needed are:

1. **Critical (P0)**: Fix workflow templates (outer/inner)
2. **High (P1)**: Standardize documentation
3. **Medium (P2)**: Update code comments

The mapping provides a clear path for systematic migration with minimal risk.

**TASK-002 COMPLETE:** Hierarchy mapping defined with specific fix requirements.

### Next Steps:
1. Fix workflow templates (TASK-003, TASK-004)
2. Update behavioral modules (TASK-005)
3. Test entire system (TASK-007)
4. Deploy changes (TASK-009)