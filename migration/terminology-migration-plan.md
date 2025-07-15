# Terminology Migration Plan

## Overview
Migrate from incorrect task-centric structure to correct epic→story/bug→task→subtask hierarchy.

## Current State (INCORRECT)
```
/tasks/TASK-XXX/          # Wrong: These are actually stories
  └── assignment.yaml     # Contains subtasks (which are actually tasks)
/stories/STORY-XXX/       # Confusing: Mixed terminology
  └── story.yaml          # Contains tasks (which are actually stories)
```

## Target State (CORRECT)
```
/epics/EPIC-XXX/
  ├── epic.yaml
  └── stories/
      ├── STORY-XXX/
      │   ├── story.yaml
      │   └── tasks/
      │       ├── TASK-XXX-research/
      │       ├── TASK-XXX-implement/
      │       └── TASK-XXX-review/
      └── BUG-XXX/
          ├── bug.yaml
          └── tasks/
```

## Migration Steps

### Phase 1: Structure Preparation
1. Create new directory structure
2. Update templates with correct terminology
3. Create migration scripts

### Phase 2: Data Migration
```bash
# 1. Create epic structure
mkdir -p epics/EPIC-002-workflow-enhancement/stories

# 2. Move current "stories" (they're correct)
mv stories/* epics/EPIC-002-workflow-enhancement/stories/

# 3. Move current "tasks" into story tasks (they're misnamed)
for task_dir in tasks/TASK-*; do
  story_id=${task_dir#tasks/TASK-}
  story_id="STORY-${story_id}"
  mkdir -p "epics/EPIC-002-workflow-enhancement/stories/${story_id}/tasks"
  mv "$task_dir" "epics/EPIC-002-workflow-enhancement/stories/${story_id}/tasks/"
done
```

### Phase 3: File Updates
1. Update all references in YAML files
2. Rename "subtasks" to "tasks" in story files
3. Rename task "subtasks" to "steps" or remove

### Phase 4: Workflow Updates
- Outer workflow: Epic→Story/Bug planning
- Inner workflow: Task execution
- Update all documentation

## Rollback Plan
Keep original structure until migration verified:
```bash
cp -r tasks tasks.backup
cp -r stories stories.backup
```

## Timeline
- Phase 1: 15 minutes
- Phase 2: 10 minutes  
- Phase 3: 20 minutes
- Phase 4: 15 minutes
Total: ~1 hour

## Success Criteria
- All files accessible in new structure
- Workflows use correct terminology
- No broken references
- Clear epic→story→task hierarchy