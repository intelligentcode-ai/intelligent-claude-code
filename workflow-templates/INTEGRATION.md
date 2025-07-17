# Workflow Integration Patterns

This guide explains how to integrate and customize the workflow templates for your specific needs.

## Basic Integration

### 1. Reference Templates in Assignment Files

The simplest integration is to reference the templates in your assignment files:

```yaml
workflow:
  planning: "workflow-templates/outer-workflow.yaml"
  execution: "workflow-templates/inner-workflow.yaml"
```

### 2. Embed Customizations

Add project-specific customizations directly in the assignment file:

```yaml
workflow:
  planning: "workflow-templates/outer-workflow.yaml"
  execution: "workflow-templates/inner-workflow.yaml"
  
  customizations:
    post_requirements:
      - "Review with security team"
      - "Validate compliance requirements"
```

## Advanced Integration Patterns

### 1. Hook-Based Extension

Use hooks to inject custom steps at specific points:

```yaml
customizations:
  hooks:
    pre_execution:
      steps:
        - "Setup specialized environment"
        - "Load project-specific configurations"
        
    post_implementation:
      steps:
        - "Run custom validation suite"
        - "Generate compliance reports"
```

### 2. Conditional Logic

Add steps that only execute under certain conditions:

```yaml
conditional_steps:
  - condition: "embedded_config.security_validation == true"
    hook: "post_implementation"
    steps:
      - "Run security scanner"
      - "Generate security report"
      
  - condition: "task_type == 'database'"
    hook: "pre_execution"
    steps:
      - "Backup database"
      - "Prepare migration scripts"
```

### 3. Process Override

Replace entire workflow sections when needed:

```yaml
overrides:
  validation:
    replace_with:
      - "Custom validation process"
      - "Proprietary testing framework"
      - "Manual approval gate"
```

### 4. Process Extension

Add to existing processes without replacing them:

```yaml
extensions:
  knowledge_retrieval:
    additional_steps:
      - "Search proprietary knowledge base"
      - "Consult domain experts"
      
  knowledge_generation:
    additional_captures:
      - "Client-specific patterns"
      - "Regulatory compliance notes"
```

## Integration with External Systems

### 1. JIRA Integration

```yaml
external_integrations:
  jira:
    enabled: true
    project_key: "PROJ"
    field_mappings:
      task_id: "customfield_10001"
      acceptance_criteria: "customfield_10002"
    status_mappings:
      PLAN: "To Do"
      EXECUTE: "In Progress"
      ACCEPTANCE: "In Review"
      DONE: "Done"
```

### 2. CI/CD Integration

```yaml
external_integrations:
  ci_cd:
    enabled: true
    pipeline_triggers:
      on_execute: "run_build"
      on_validation: "run_tests"
      on_acceptance: "deploy_staging"
    gates:
      - "All tests must pass"
      - "Security scan clean"
      - "Performance benchmarks met"
```

### 3. Git Integration

```yaml
git_integration:
  enforce_privacy: true  # From embedded_config
  branch_strategy:
    template: "{{prefix}}/{{task_id}}-{{description}}"
    prefixes:
      feature: "feature/"
      bugfix: "fix/"
      infrastructure: "infra/"
  commit_hooks:
    - "Run linter"
    - "Check secrets"
    - "Validate commit message"
```

## Configuration-Driven Behavior

### 1. Review Workflow Based on Config

```yaml
# When embedded_config.blocking_enabled = false
review_workflow:
  findings_action: "create_followup_tasks"
  template: "TASK-{{parent}}-fix-{{finding}}"
  continue_execution: true
  
# When embedded_config.blocking_enabled = true  
review_workflow:
  findings_action: "block_until_resolved"
  require_re_review: true
  continue_execution: false
```

### 2. Testing Strategy Based on Config

```yaml
# Based on embedded_config.testing_approach
testing_strategies:
  minimal:
    run: ["unit_tests"]
    coverage_target: "60%"
    
  standard:
    run: ["unit_tests", "integration_tests"]
    coverage_target: "80%"
    
  comprehensive:
    run: ["unit_tests", "integration_tests", "e2e_tests", "performance_tests"]
    coverage_target: "90%"
```

## Best Practices

### 1. Keep Customizations Simple
- Use hooks rather than overrides when possible
- Document why customizations are needed
- Avoid deeply nested conditions

### 2. Maintain Traceability
- Always capture which template version was used
- Document customization rationale
- Keep customizations in version control

### 3. Test Your Customizations
- Validate workflow changes in development first
- Ensure customizations don't break core flow
- Test edge cases and error conditions

### 4. Use Composition
- Build reusable customization modules
- Combine multiple customizations cleanly
- Avoid duplication across projects

## Example: Complete Integration

Here's a complete example showing multiple integration patterns:

```yaml
# In assignment file
workflow:
  planning: "workflow-templates/outer-workflow.yaml"
  execution: "workflow-templates/inner-workflow.yaml"
  
  # Project-specific customizations
  project_customizations:
    # Extend planning with compliance
    planning_extensions:
      post_requirements:
        - "Compliance requirements review"
        - "Data privacy assessment"
        
    # Custom execution validations
    execution_extensions:
      validation:
        additional_checks:
          - "GDPR compliance scan"
          - "Accessibility audit"
          
  # Conditional behaviors
  conditional_workflows:
    - condition: "is_public_facing == true"
      additions:
        security_review: "mandatory"
        performance_testing: "comprehensive"
        
  # External integrations
  integrations:
    jira:
      sync_on: ["phase_change", "completion"]
    github:
      create_pr_on: "acceptance_complete"
    slack:
      notify_on: ["blocked", "completed"]
```

## Troubleshooting

### Common Issues

1. **Hook Not Executing**
   - Verify hook name matches exactly
   - Check condition evaluation
   - Ensure timing is correct

2. **Override Not Working**
   - Confirm override syntax
   - Check for conflicts with other customizations
   - Validate replacement steps

3. **Integration Failing**
   - Verify external system credentials
   - Check network connectivity
   - Validate field mappings

### Debug Mode

Enable workflow debugging to see execution details:

```yaml
workflow_config:
  debug: true
  log_level: "verbose"
  trace_hooks: true
```