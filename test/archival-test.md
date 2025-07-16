# Archival System Test Cases

## Test 1: Completed Story Detection
```yaml
story:
  id: STORY-TEST-001
  title: Test Story for Archival
  status: COMPLETED
  phase: ARCHIVED
  completed_at: 2024-01-01
  expected: Should be detected and available for manual archival
```

## Test 2: Completed Task Detection
```yaml
task:
  id: TASK-TEST-001
  title: Test Task for Archival
  parent: STORY-TEST-001
  completed: true
  expected: Should be moved to archives/tasks/ (untracked)
```

## Test 3: Active Dependency Block
```yaml
story:
  id: STORY-TEST-002
  title: Story with Dependencies
  status: COMPLETED
  phase: ARCHIVED
  dependencies:
    - STORY-ACTIVE-001 (status: IN_PROGRESS)
  expected: Should NOT be archived due to active dependencies
```

## Test 4: Manual Archival Selection
```yaml
story:
  id: STORY-TEST-003
  title: Recently Completed Story
  status: COMPLETED
  phase: ARCHIVED
  completed_at: <current_time>
  expected: Available for archival immediately upon manual command
```

## Test 5: Git Operations
```yaml
test_scenarios:
  - Tracked file: Use git mv and commit
  - Untracked file: Simple filesystem move
  - Ignored file: Move and update .gitignore
```

## Test 6: Archive Structure
```yaml
expected_paths:
  - archives/completed/stories/2024/01/2024-01-15-STORY-001-user-authentication.md
  - archives/completed/bugs/2024/01/2024-01-15-BUG-042-login-fix.md
  - archives/tasks/2024/01/STORY-001/task-001-implement-login.md
```

## Test 7: Rollback Capability
```yaml
scenario:
  - Archive a story
  - Simulate failure during archival
  - Verify rollback restores original state
  - Check git history is clean
```

## Test 8: Manual Archival Commands
```yaml
specific_item_test:
  command: icc:archive-completed --item STORY-001
  expected: Archive specific item immediately
  
batch_test:
  command: icc:archive-completed
  expected: Scan all completed items and archive them
  
preview_test:
  command: icc:archive-completed --dry-run
  expected: Show list of archivable items without archiving
```

## Test 9: Integration Points
```yaml
lean_workflow_integration:
  - Task completion marks item as archivable
  - Phase change to ARCHIVED marks for potential archival
  - Progress update shows archivable items count
  
pm_commands:
  - @PM archive
  - @PM archive-status
  - @PM restore TASK-001
```

## Test 10: Learning Capture
```yaml
expected_memory_entities:
  - Archival-Patterns-YYYY-MM-DD
  - Success patterns captured
  - Failure patterns captured
  - User preferences learned
```