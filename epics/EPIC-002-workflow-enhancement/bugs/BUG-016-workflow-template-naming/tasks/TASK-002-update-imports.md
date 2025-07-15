# TASK-002 Update Imports

**Task:** Update all import references to use new names  
**Assigned to:** @AI-Engineer  
**Status:** COMPLETED  
**Priority:** critical_path  
**Dependencies:** [TASK-001]

## Import Update Requirements

### Files with Imports to Update
- `src/modes/virtual-team.md`
  - Current: `@../../workflow-templates/outer-workflow-corrected.yaml`
  - Update to: `@../../workflow-templates/outer-workflow.yaml`
  - Current: `@../../workflow-templates/inner-workflow-corrected.yaml`
  - Update to: `@../../workflow-templates/inner-workflow.yaml`

### Update Process
1. Search for all references to old filenames
2. Update each import to use new name
3. Verify imports still resolve
4. Test system functionality

## Implementation

```pseudocode
FUNCTION updateImports():
    files = findFilesWithImports("*-corrected.yaml")
    
    FOR file IN files:
        content = readFile(file)
        content = replace(content, "outer-workflow-corrected.yaml", "outer-workflow.yaml")
        content = replace(content, "inner-workflow-corrected.yaml", "inner-workflow.yaml")
        writeFile(file, content)
```

## Validation

- All imports updated
- No broken references
- System loads correctly
- Functionality preserved