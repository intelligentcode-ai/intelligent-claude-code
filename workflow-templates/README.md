# Workflow Templates

This directory contains reusable workflow process templates that define how work flows through the intelligent-claude-code system.

## Overview

The workflow system uses two primary templates:

1. **Outer Workflow** (`outer-workflow.yaml`) - Defines how planning artifacts (epics, stories, tasks) are created
2. **Inner Workflow** (`inner-workflow.yaml`) - Defines how individual tasks are executed

Both workflows follow the key principle:
- **First Step**: Knowledge Retrieval (learn from past)
- **Last Step**: Knowledge Generation (capture new learnings)

## Template Structure

### Core Sections
- `metadata` - Template information and version
- `phases` - Workflow phases and transitions
- `hooks` - Integration points for customization
- `steps` - Actual workflow steps to execute
- `validation` - Rules and checks to enforce

### Integration Hooks
Templates provide hooks for customization:
- `pre_planning` - Before planning begins
- `post_requirements` - After requirements gathered
- `pre_execution` - Before implementation
- `post_implementation` - After code complete
- `pre_deployment` - Before release

## Usage

### Basic Usage
Reference templates in your assignment files:
```yaml
workflow:
  outer: "workflow-templates/outer-workflow.yaml"
  inner: "workflow-templates/inner-workflow.yaml"
```

### Customization
Override or extend templates:
```yaml
workflow:
  outer: "workflow-templates/outer-workflow.yaml"
  customizations:
    post_requirements:
      - "Add security requirements"
      - "Define compliance needs"
```

### Examples
See the `examples/` directory for common customization patterns:
- `iac-customization.yaml` - Infrastructure as Code workflows
- `testing-customization.yaml` - Enhanced testing workflows

## Template Versioning

Templates use semantic versioning:
- `version` - Current template version
- `min_compatible` - Minimum compatible version

Assignment files record which template version was used for traceability.

## Validation

Templates are validated during the PLAN phase to ensure:
- Required sections are present
- Hooks are properly defined
- No circular dependencies
- Version compatibility

## Design Principles

1. **Simplicity** - Templates are self-documenting
2. **Flexibility** - Extensive customization via hooks
3. **Safety** - Invalid customizations don't break core flow
4. **Knowledge-Centric** - Always retrieve and generate knowledge