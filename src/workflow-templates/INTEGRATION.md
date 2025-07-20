# Workflow Integration

## Basic Integration

**Reference Templates:**
```yaml
workflow:
  planning: "workflow-templates/outer-workflow.yaml"
  execution: "workflow-templates/inner-workflow.yaml"
```

**Add Customizations:**
```yaml
customizations:
  post_requirements:
    - "Security review"
    - "Compliance check"
```

## Hook-Based Extension

```yaml
hooks:
  pre_execution:
    - "Setup environment"
  post_implementation:
    - "Run validation"
```

## External Systems

**JIRA:** Task sync, status mapping  
**CI/CD:** Pipeline triggers, quality gates  
**Git:** Branch templates, commit hooks

## Configuration-Driven

**blocking_enabled=false:** Create follow-up tasks  
**blocking_enabled=true:** Block until resolved

**testing_approach:** minimal/standard/comprehensive coverage targets