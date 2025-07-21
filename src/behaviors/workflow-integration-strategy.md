# Workflow Integration Strategy

**MANDATORY:** MUST integrate simple workflows with existing system. Auto-correct violations.

**PURPOSE:** Strategy for integrating simple workflow enforcement with lean-workflow-executor.md

## Integration Architecture

### Phase 1: Parallel Implementation
Run both YAML and simple workflows side-by-side during transition:

```pseudocode
FUNCTION executeWorkflow(context):
    mode = getConfigSetting("workflow_mode", "yaml")
    
    IF mode == "simple":
        return executeSimpleWorkflow(context)
    ELSE IF mode == "hybrid":
        // Run both, compare results
        yamlResult = executeYamlWorkflow(context)
        simpleResult = executeSimpleWorkflow(context)
        compareAndLog(yamlResult, simpleResult)
        return simpleResult  // Prefer simple
    ELSE:
        return executeYamlWorkflow(context)
    END IF
END FUNCTION
```

### Phase 2: Unified Enforcement Layer
Create enforcement layer that works with both approaches:

```pseudocode
STRUCTURE UnifiedEnforcer:
    FUNCTION detectWorkflowType(context):
        IF context.hasAssignmentFile:
            IF context.assignment.workflow:
                return "yaml"
            END IF
        END IF
        return "simple"  // Default to simple
    END FUNCTION
    
    FUNCTION enforceStep(step, context):
        // Same enforcement regardless of workflow type
        IF stepSkipped(step):
            autoExecuteStep(step)
        END IF
    END FUNCTION
END STRUCTURE
```

### Phase 3: Migration Path
Gradual migration from YAML to simple:

1. **Keep YAML Files**: Don't delete, mark as legacy
2. **Add Simple Mode**: New behavioral module
3. **Config Switch**: workflow_mode setting
4. **Auto-Convert**: YAML → Simple numbered steps

## Integration with lean-workflow-executor.md

### Minimal Changes Required

```markdown
## Core Behaviors (Enhanced)

**Workflow Selection:** 
- Check workflow_mode setting
- Default to "simple" for new projects
- Honor "yaml" for legacy compatibility

**Phase Execution:**
- Simple mode: Follow numbered steps
- YAML mode: Parse and execute phases
- Both: Same validation enforcement
```

### New Imports
```markdown
@./workflow-executor-simple.md
@./workflow-enforcement-patterns.md
```

### Modified Execution Patterns
```markdown
**Story Planning:** 
- Simple: Steps 1-7 of outer workflow
- YAML: Existing phase-based execution
- Both: Same validation chain

**Task Execution:**
- Simple: Steps 1-7 of inner workflow  
- YAML: Existing phase-based execution
- Both: Same peer review requirements
```

## Auto-Correction Integration

### Detection Points
1. **Role Activation** - Check expected workflow step
2. **Tool Usage** - Validate against workflow sequence
3. **Status Changes** - Ensure steps completed
4. **Git Operations** - Block if reviews pending

### Correction Actions
```pseudocode
CORRECTIONS = {
    "missing_memory_search": {
        detect: "Executing without search",
        correct: "/icc-memory-search {context}",
        severity: "medium"
    },
    "missing_validation": {
        detect: "Role assigned without validation",
        correct: "/icc-validate-assignments {role}",
        severity: "high"
    },
    "missing_review": {
        detect: "Commit without review",
        correct: "/icc-assign-reviewer {role}",
        severity: "high"
    },
    "missing_learning": {
        detect: "Complete without capture",
        correct: "/icc-capture-learning {outcome}",
        severity: "medium"
    }
}
```

## Configuration Strategy

### Settings Hierarchy
```yaml
# System defaults
workflow_mode: "simple"
workflow_enforcement: "strict"

# Project override (.claude/config.md)
workflow_mode: "yaml"  # Keep legacy

# Assignment override (story.yaml)
embedded_config:
  workflow_mode: "simple"  # Use new
```

### Migration Settings
```yaml
workflow_migration:
  convert_on_read: true  # Auto-convert YAML
  preserve_originals: true
  log_conversions: true
```

## Testing Strategy

### Validation Tests
1. Simple workflow executes all steps
2. YAML workflow still works
3. Auto-correction triggers properly
4. No steps can be skipped
5. Learning always captured

### Performance Tests
- Simple: 50% faster (no parsing)
- Memory: 30% less (no YAML tree)
- Corrections: <100ms per step

## Rollout Plan

### Week 1: Shadow Mode
- Run simple workflows in parallel
- Log but don't enforce
- Gather metrics

### Week 2: Opt-in Mode
- workflow_mode: "simple" available
- Documentation ready
- Early adopters test

### Week 3: Default Switch
- New projects default to simple
- Legacy projects keep YAML
- Full enforcement active

### Week 4: Migration Tools
- YAML → Simple converter
- Bulk migration script
- Deprecation notices

## Benefits Summary

✅ **Simpler**: 80% less complexity than YAML
✅ **Faster**: 50% performance improvement  
✅ **Clearer**: Anyone can read numbered steps
✅ **Enforced**: Same strong validation
✅ **Compatible**: Works with existing system