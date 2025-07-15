# Workflow Structure Requirements Analysis

## Template Requirements

### 1. Outer Workflow Template (outer-workflow.yaml)
Defines how planning artifacts (epics, stories, tasks) are created.

#### Required Sections:
- **metadata**: Template info, version, description
- **phases**: Standard planning phases with knowledge integration
- **knowledge_retrieval**: First step configuration
- **planning_steps**: Core planning activities  
- **knowledge_generation**: Last step configuration
- **customization_hooks**: Extension points for user requirements
- **embedded_config_rules**: How to process config.md

#### Phase Flow:
```
Knowledge Retrieval → Requirements → Architecture → Task Breakdown → Knowledge Generation
```

### 2. Inner Workflow Template (inner-workflow.yaml)  
Defines how individual tasks are executed.

#### Required Sections:
- **metadata**: Template info, version, description
- **phases**: Standard execution phases
- **knowledge_retrieval**: First step configuration
- **execution_steps**: Core implementation activities
- **validation_steps**: Quality and testing requirements
- **knowledge_generation**: Last step configuration
- **customization_hooks**: Extension points for user requirements

#### Phase Flow:
```
Knowledge Retrieval → Implementation → Validation → Review → Knowledge Generation
```

### 3. Integration Points

#### User Requirement Hooks:
- **pre_planning**: Before planning starts (e.g., compliance checks)
- **post_requirements**: After requirements gathered (e.g., security reqs)
- **pre_execution**: Before implementation (e.g., environment setup)
- **post_implementation**: After code complete (e.g., custom tests)
- **pre_deployment**: Before release (e.g., approval gates)

#### Customization Mechanisms:
- **step_override**: Replace entire step
- **step_extend**: Add to existing step
- **step_insert**: Add new step between existing ones
- **conditional_steps**: Steps that activate based on config

### 4. Template Structure Patterns

#### Inheritance Support:
```yaml
extends: "base-workflow.yaml"  # Optional inheritance
overrides:
  planning_steps:
    - id: "custom-step"
      replaces: "standard-step"
```

#### Conditional Logic:
```yaml
steps:
  - id: "security-review"
    condition: "embedded_config.security_validation == true"
    action: "Execute security scan"
```

#### Variable Substitution:
```yaml
git_operations:
  branch_name: "{{branch_prefix}}/{{task_id}}-{{description}}"
  commit_template: "{{type}}: {{summary}}"
```

### 5. Example Customizations

#### IaC Integration:
```yaml
customizations:
  iac_requirements:
    hook: "post_requirements"
    steps:
      - "Define infrastructure components"
      - "Specify deployment environments"
      - "Configure CI/CD pipelines"
```

#### Testing Specifications:
```yaml
customizations:
  testing_specs:
    hook: "pre_execution"
    steps:
      - "Generate test cases from requirements"
      - "Setup test environments"
      - "Define coverage targets"
```

### 6. Validation Requirements

Each template must support:
- Schema validation for structure
- Required field checking
- Hook point validation
- Circular reference detection
- Version compatibility checking