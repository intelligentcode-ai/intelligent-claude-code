# TASK-001: Audit Current Terminology Usage

**Status:** IN PROGRESS  
**Assigned to:** @AI-Architect  
**Story:** STORY-006 Terminology Migration  
**Priority:** P0 CRITICAL

## Memory Consultation Results

Consulting memory for terminology patterns and inconsistencies:

## Comprehensive Terminology Audit

### Current System Hierarchy Analysis

#### Template Files Analysis
```bash
# Found terminology patterns in templates/
templates/epic-assignment-template.yaml - Uses "epic" ✅
templates/story-assignment-template.yaml - Uses "story" ✅
templates/task-assignment-template.yaml - Uses "task" ✅
templates/bug-assignment-template.yaml - Uses "bug" ✅
```

#### Workflow Templates Analysis
```bash
# Found terminology patterns in workflow-templates/
workflow-templates/outer-workflow.yaml - Uses mixed terminology ❌
workflow-templates/inner-workflow.yaml - Uses mixed terminology ❌
```

#### Source Code Analysis
```bash
# Found terminology patterns in src/
src/behaviors/lean-workflow-executor-v2.md - Uses "assignment" generically ✅
src/roles/specialists.md - Uses "tasks" consistently ✅
src/modes/virtual-team-lean.md - Uses "task" consistently ✅
```

### Current Terminology Usage Patterns

#### ✅ CORRECT Usage:
1. **Epic Level**: Large initiatives (months of work)
   - Used correctly in: epic.yaml files
   - Contains: stories and bugs
   - Duration: Months of work

2. **Story Level**: Feature implementation (weeks of work)
   - Used correctly in: story.yaml files
   - Contains: tasks
   - Duration: Weeks of work

3. **Bug Level**: Issue resolution (days to weeks)
   - Used correctly in: bug.yaml files
   - Contains: tasks
   - Duration: Days to weeks

4. **Task Level**: Specific work items (days of work)
   - Used correctly in: task files
   - Contains: subtasks (implied)
   - Duration: Days of work

#### ❌ INCONSISTENT Usage Found:

1. **Mixed Task/Subtask References**:
   - Some files use "task" to refer to story-level work
   - Some files use "subtask" to refer to task-level work
   - Assignment templates sometimes mix levels

2. **Workflow Template Issues**:
   - outer-workflow.yaml uses "task" for story-level coordination
   - inner-workflow.yaml uses "subtask" for task-level work
   - Inconsistent with file structure

3. **Documentation Inconsistencies**:
   - Some docs use "task" for any work unit
   - Some docs use "item" generically
   - Mixed terminology in behavioral modules

### File-by-File Terminology Analysis

#### Templates Directory: ✅ MOSTLY CORRECT
- `epic-assignment-template.yaml`: Uses "epic" correctly
- `story-assignment-template.yaml`: Uses "story" correctly  
- `task-assignment-template.yaml`: Uses "task" correctly
- `bug-assignment-template.yaml`: Uses "bug" correctly

#### Workflow Templates Directory: ❌ NEEDS FIXING
- `outer-workflow.yaml`: 
  - Uses "task" for story-level coordination ❌
  - Should use "story" for story-level work
- `inner-workflow.yaml`:
  - Uses "subtask" for task-level work ❌
  - Should use "task" for task-level work

#### Source Behaviors Directory: ✅ MOSTLY CORRECT
- `lean-workflow-executor-v2.md`: Uses "assignment" generically ✅
- Uses "task" consistently throughout ✅

#### Existing Epic Files: ✅ CORRECT STRUCTURE
- `epic.yaml`: Contains stories and bugs ✅
- `story.yaml`: Contains tasks ✅
- `bug.yaml`: Contains tasks ✅
- Task files: Individual work items ✅

### Terminology Mapping Required

#### Current → Correct Mapping:
1. **Epic Level**: 
   - Current: "epic" ✅ → Keep as "epic"
   - Contains: stories, bugs

2. **Story Level**:
   - Current: "story" ✅ → Keep as "story"
   - Contains: tasks
   - Duration: Weeks

3. **Bug Level**:
   - Current: "bug" ✅ → Keep as "bug"
   - Contains: tasks
   - Duration: Days-weeks

4. **Task Level**:
   - Current: "task" ✅ → Keep as "task"
   - Contains: subtasks (implied)
   - Duration: Days

#### Files Requiring Updates:

1. **workflow-templates/outer-workflow.yaml**:
   - Change: "task" → "story" for story-level coordination
   - Fix: Story-level workflow references

2. **workflow-templates/inner-workflow.yaml**:
   - Change: "subtask" → "task" for task-level work
   - Fix: Task-level workflow references

3. **Any documentation using mixed terminology**:
   - Standardize on epic→story/bug→task hierarchy
   - Remove ambiguous generic terms

### Impact Assessment

#### High Impact (Must Fix):
- Workflow templates: Core system functionality
- Assignment templates: User-facing structure
- Documentation: User understanding

#### Medium Impact (Should Fix):
- Behavioral module comments
- Role definition examples
- Internal documentation

#### Low Impact (Nice to Fix):
- Code comments
- Variable names
- Internal logging

### Implementation Priority

1. **P0 - Critical**: Workflow templates (breaks functionality)
2. **P1 - High**: Assignment templates (user confusion)
3. **P2 - Medium**: Documentation (clarity)
4. **P3 - Low**: Code comments (consistency)

## Summary

The audit reveals that most of the system uses correct terminology, but there are critical inconsistencies in the workflow templates that need immediate fixing. The core file structure (epic→story/bug→task) is correct, but workflow coordination uses mixed terminology.

**TASK-001 COMPLETE:** Terminology audit complete with clear mapping for migration.

### Next Steps:
1. Fix workflow templates (highest priority)
2. Update assignment templates if needed
3. Standardize documentation
4. Test entire system with consistent terminology