# TASK-001 Rename Files

**Task:** Rename workflow template files to remove '-corrected' suffix  
**Assigned to:** @AI-Engineer  
**Status:** PLANNED  
**Priority:** blocking  
**Dependencies:** none

## Renaming Requirements

### Files to Rename
- `outer-workflow-corrected.yaml` → `outer-workflow.yaml`
- `inner-workflow-corrected.yaml` → `inner-workflow.yaml`

### Steps
1. Rename workflow template files
2. Verify no naming conflicts
3. Ensure clean naming convention
4. Maintain file integrity

## Implementation

```bash
# In workflow-templates/ directory
mv outer-workflow-corrected.yaml outer-workflow.yaml
mv inner-workflow-corrected.yaml inner-workflow.yaml
```

## Validation

- Verify files renamed correctly
- Check no duplicate files exist
- Ensure file contents preserved
- Confirm clean naming achieved