# AgentTask Template Extensions Guide

## Overview

The AgentTask Template Extensions system allows projects to customize AgentTask templates without copying or maintaining entire template files. Using a single `prb-extensions.yaml` file, you can extend templates with project-specific requirements, customize workflows, and add validation steps while still receiving automatic updates to base templates.

**Key Benefits:**
- ✅ **No Template Copying** - Extend without maintaining full copies
- ✅ **Automatic Base Updates** - Changes to system templates propagate automatically
- ✅ **Clean Separation** - Project customizations clearly separated from base templates
- ✅ **AI-Powered Merging** - Intelligent contextual integration of extensions
- ✅ **Version Controlled** - Extensions tracked with your project

**Instead of copying entire templates and losing updates, use extensions to add only what you need.**

## Quick Start

Create a `prb-extensions.yaml` file in your project root with project-specific additions:

```yaml
# Universal extensions applied to ALL AgentTask sizes
all:
  requirements:
    processual:
      - "Run ESLint validation"
      - "Execute security scan with SonarQube"
      - "Update API documentation"

# Size-specific customization
medium:
  review_checklist:
    - "Integration test coverage > 80%"
    - "API contract validation completed"
    
large:
  coordination:
    pre_implementation_review: true
    multi_team_coordination: true
```

That's it! The system automatically applies these extensions to all AgentTasks generated in your project.

## Complete Extension Structure

Here's the full structure of what's possible in `prb-extensions.yaml`:

```yaml
# Universal extensions - applied to ALL template sizes
all:
  # Add new requirements to every AgentTask
  requirements:
    functional:
      - "New functional requirement for all AgentTasks"
    processual:
      - "Run project linting"
      - "Execute custom validation scripts"  
      - "Update project documentation"
    technical:
      - "Follow project coding standards"
      - "Use project-specific patterns"
  
  # Add completely new sections
  custom_validation:
    - "Project-specific quality gates"
    - "Custom testing requirements"
    - "Security compliance checks"
  
  # Extend existing workflow settings
  workflow_additions:
    notify_teams: ["development", "qa", "security"]
    custom_checks: true

# Nano-specific extensions (0-2 points)
nano:
  # Override default workflow for tiny changes
  workflow:
    changelog_required: "!override false"  # Skip changelog for nano changes

# Tiny-specific extensions (3-5 points)  
tiny:
  # Override version bump strategy
  version_bump:
    type: "!override patch"  # Always patch for tiny changes
  
  # Add validation for simple changes
  validation_steps:
    - "Run unit tests"
    - "Check code style"

# Medium-specific extensions (6-15 points)
medium:
  # Add integration requirements
  review_checklist:
    - "Integration test coverage > 70%"
    - "API contract validation"
    - "Performance impact assessment"
  
  # Extend implementation section
  implementation:
    additional_steps:
      - "Run integration tests"
      - "Update Swagger documentation"
      - "Validate API backwards compatibility"

# Large-specific extensions (16-30 points)
large:
  # Add coordination requirements
  coordination:
    pre_implementation_review: true
    multi_team_coordination: true
    architecture_review_required: true
  
  # Override merge strategy
  workflow:
    merge_strategy: "!override manual_review"
  
  # Add large-scale validation
  validation_enforcement:
    additional_gates:
      - "Full regression test suite"
      - "Security review completed"
      - "Performance benchmarks passed"

# Mega-specific extensions (30+ points)
mega:
  # Maximum governance for system-wide changes
  coordination:
    executive_approval: true
    change_advisory_board: true
    rollback_plan_required: true
  
  # Override to manual everything for mega changes
  workflow:
    auto_merge: "!override false"
    release_automation: "!override false"
  
  # Extensive validation
  validation_enforcement:
    comprehensive_review:
      - "Full system impact analysis"
      - "Cross-team coordination verification"
      - "Business continuity plan validation"
```

## Extension Location

The system searches for your extensions file in this order:

1. **`{project_root}/prb-extensions.yaml`** (recommended)
2. **`{project_root}/.claude/prb-extensions.yaml`** (alternative)

**Recommendation:** Use the project root location unless you want to keep extensions with other Claude configuration in the `.claude/` directory.

## AI-Powered Intelligent Merging

The extension system uses AI-powered contextual merging to intelligently combine your extensions with base templates:

### Merging Rules

**1. Additive by Default**
Arrays and lists are extended automatically:

```yaml
# Base template has:
requirements:
  processual:
    - "Apply git.privacy setting"
    - "Follow branch protection strategy"

# Your extension adds:
all:
  requirements:
    processual:
      - "Run ESLint validation"
      - "Update API documentation"

# Result: All four requirements included
```

**2. Override with !override Marker**
Use `!override` to replace values instead of extending:

```yaml
# Base template has:
version_bump:
  type: "minor"

# Your extension overrides:
medium:
  version_bump:
    type: "!override patch"  # Replaces "minor" with "patch"

# Result: medium AgentTasks use patch versioning
```

**3. New Section Addition**
Completely new sections are added to templates:

```yaml
# Your extension adds new validation
all:
  custom_security_scan:
    - "OWASP dependency check"
    - "Secret detection scan"
    - "License compliance check"

# Result: All AgentTasks get this new section
```

**4. Context-Aware Intelligence**
The AI understands intent and merges appropriately:
- Recognizes when extensions complement vs conflict with base templates
- Maintains template structure integrity 
- Preserves mandatory sections and validation rules
- Applies extensions in logical order

## Real-World Extension Examples

### Example 1: Frontend Project Extensions

For a React/TypeScript project:

```yaml
all:
  requirements:
    processual:
      - "Run TypeScript type checking"
      - "Execute ESLint with project rules"
      - "Run Prettier code formatting"
      - "Update Storybook stories if components changed"
    technical:
      - "Follow React component patterns"
      - "Use project TypeScript configurations"
      - "Maintain accessibility standards (WCAG 2.1 AA)"

medium:
  review_checklist:
    - "Component prop interfaces documented"
    - "Unit tests cover all component paths"
    - "Storybook stories updated"
    - "Bundle size impact assessed"

large:
  coordination:
    design_review_required: true
    accessibility_audit: true
```

### Example 2: Backend API Extensions

For a Node.js/Express API:

```yaml
all:
  requirements:
    processual:
      - "Run API security scan"
      - "Update OpenAPI/Swagger documentation"
      - "Execute database migration tests"
      - "Validate API contract compliance"
    technical:
      - "Follow REST API design principles"
      - "Use project error handling patterns"
      - "Maintain backward compatibility"

tiny:
  # Skip extensive docs for tiny API changes  
  documentation:
    api_docs_required: "!override false"

medium:
  review_checklist:
    - "API endpoints tested with integration tests"
    - "Database schema changes reviewed"
    - "Performance impact on existing endpoints assessed"
    
large:
  coordination:
    database_admin_review: true
    api_breaking_change_assessment: true
```

### Example 3: DevOps/Infrastructure Extensions

For infrastructure and deployment projects:

```yaml
all:
  requirements:
    processual:
      - "Run Terraform plan validation"
      - "Execute security compliance scan"
      - "Update infrastructure documentation"
      - "Validate disaster recovery impact"
    technical:
      - "Follow infrastructure as code standards"
      - "Use approved cloud resource types only"
      - "Maintain cost optimization guidelines"

medium:
  review_checklist:
    - "Infrastructure costs estimated and approved"
    - "Security groups and access policies reviewed"
    - "Monitoring and alerting configured"

large:
  coordination:
    security_team_approval: true
    operations_team_review: true
    cost_center_approval: true
  
  # Override to require manual deployment for infrastructure
  workflow:
    release_automation: "!override false"
```

### Example 4: Documentation Project Extensions

For documentation and content projects:

```yaml
all:
  requirements:
    processual:
      - "Run spelling and grammar check"
      - "Validate all links and references"
      - "Update table of contents if structure changed"
      - "Check compliance with style guide"
    technical:
      - "Follow documentation style guide"
      - "Use approved terminology and glossary"
      - "Maintain consistent formatting"

# Lighter workflow for documentation changes
tiny:
  workflow:
    pr_required: "!override false"  # Direct commits OK for tiny doc fixes

medium:
  review_checklist:
    - "Content reviewed by subject matter expert"
    - "All code examples tested and working"
    - "Screenshots and diagrams updated"
    
large:
  coordination:
    technical_writer_review: true
    stakeholder_approval: true
```

## Extensions vs Template Copying Comparison

| Aspect | Template Copying | Extension-Based |
|--------|------------------|----------------|
| **Maintenance** | ❌ Manual updates needed when base templates change | ✅ Automatic base template updates |
| **Clarity** | ❌ Hard to see what's custom vs standard | ✅ Clear separation of customizations |
| **Merge Conflicts** | ❌ Conflicts when base templates updated | ✅ AI-resolved intelligent merging |
| **File Complexity** | ❌ Full template complexity to maintain | ✅ Only your specific additions |
| **Update Propagation** | ❌ Miss improvements and bug fixes | ✅ Automatic improvements and fixes |
| **Version Control** | ❌ Large diffs, hard to review changes | ✅ Small, focused extension changes |
| **Team Collaboration** | ❌ Complex to coordinate template changes | ✅ Simple extensions anyone can understand |
| **Recommendation** | 🟡 Only for legacy or highly specialized needs | ✅ **Recommended for all new projects** |

**Migration Path:** If you have copied templates, you can migrate by:
1. Creating `prb-extensions.yaml` with only your customizations
2. Removing your copied template files  
3. The system will use base templates + your extensions

## Best Practices

### When to Use Extensions

**✅ Perfect for Extensions:**
- Adding project-specific validation steps
- Customizing review requirements
- Adding security or compliance checks
- Modifying workflow settings (versioning, changelog, PR requirements)
- Adding team-specific coordination requirements
- Project-specific documentation requirements

**🟡 Consider Template Copying for:**
- Complete workflow overhaul (rarely needed)
- Highly regulated environments with locked-down processes
- Legacy projects with extensive existing customizations

### Extension Organization

**Structure your extensions logically:**

```yaml
# Use clear, descriptive names
all:
  requirements:
    # Group by type
    processual:
      - "Project-specific process requirement"
    technical:
      - "Project-specific technical requirement"
    
  # Use descriptive section names  
  security_requirements:
    - "Specific security need"
  
  compliance_checks:
    - "Regulatory requirement"

# Size-specific sections for targeted customization
medium:
  # Only add what's needed at this complexity level
  integration_testing:
    - "Medium-complexity specific requirement"
```

### Override Usage

**Use overrides sparingly and with intention:**

```yaml
# Good: Clear business reason for override
tiny:
  workflow:
    changelog_required: "!override false"  # Skip changelog for typo fixes

# Good: Project-specific versioning strategy  
medium:
  version_bump:
    type: "!override patch"  # Always patch for features in this project

# Avoid: Overriding without clear need
large:
  workflow:
    pr_required: "!override false"  # ❌ Removes important protection
```

## Troubleshooting

### Extension File Not Loading

**Problem:** Extensions aren't being applied to generated AgentTasks.

**Solutions:**
1. **Check File Location:** Ensure `prb-extensions.yaml` is in project root or `.claude/` directory
2. **Validate YAML Syntax:** Use a YAML validator to check for syntax errors
3. **Check File Permissions:** Ensure file is readable by the system
4. **Verify Content:** Look for successful extension application in generated AgentTask content

### YAML Syntax Errors

**Problem:** `❌ Extension file syntax error: {error_details}`

**Solutions:**
1. **Validate YAML Structure:** Use `yamllint` or online YAML validator
2. **Check Indentation:** YAML is indent-sensitive, use consistent spaces (not tabs)
3. **Quote Special Values:** Quote strings with special characters or colons
4. **Test Minimal Extension:** Start with simple extension to isolate issues

```yaml
# Common YAML issues and fixes

# ❌ Inconsistent indentation
all:
  requirements:
  processual:  # Wrong indentation
    - "Requirement"

# ✅ Consistent indentation  
all:
  requirements:
    processual:  # Correct indentation
      - "Requirement"

# ❌ Unquoted special values
all:
  custom_field: value: with: colons  # Confuses YAML parser

# ✅ Quoted special values
all:
  custom_field: "value: with: colons"  # Clear string value
```

### Override Marker Issues

**Problem:** `❌ Invalid !override usage: {usage_error}`

**Solutions:**
1. **Use Correct Syntax:** `field: "!override new_value"` (note the quotes)
2. **Override Complete Values:** Can't override parts of complex structures
3. **Check Target Field:** Ensure field being overridden exists in base template

```yaml
# ❌ Incorrect override usage
medium:
  version_bump:
    type: !override patch  # Missing quotes

# ✅ Correct override usage
medium:
  version_bump:
    type: "!override patch"  # Properly quoted

# ❌ Trying to override nested part
medium:
  workflow:
    settings:
      auto_merge: "!override false"  # Can't override nested arbitrarily

# ✅ Override complete section if needed
medium:
  workflow: "!override {pr_required: true, auto_merge: false}"  # Override entire workflow
```

### Extension Merge Conflicts

**Problem:** `❌ Extension merge failed: {conflict_description}`

**Solutions:**
1. **Simplify Extensions:** Break complex extensions into smaller, focused additions
2. **Check Base Template:** Ensure extensions complement rather than conflict with base
3. **Use Explicit Overrides:** Use `!override` marker for intentional replacements
4. **Contact Support:** For complex merging issues, file an issue with your extension

### Missing Extension Effects

**Problem:** Extensions seem to load but don't appear in generated AgentTasks.

**Solutions:**
1. **Check Section Names:** Ensure extension section names match base template structure
2. **Verify Size Targeting:** Confirm size-specific extensions target the right complexity level
3. **Look for Overrides:** Check if other extensions or settings are overriding your additions
4. **Test with Simple Extension:** Use minimal extension to verify system is working

### Performance Issues with Large Extensions

**Problem:** AgentTask generation slower with complex extensions.

**Solutions:**
1. **Optimize Extension Size:** Keep extensions focused and minimal
2. **Use Caching:** Extension merging is cached, but large files take longer to process
3. **Split Large Extensions:** Consider separating into size-specific files if extremely large
4. **Profile Extension Impact:** Remove extensions temporarily to isolate performance impact

## Migration from Template Copying

If you currently have custom template copies, here's how to migrate to extensions:

### Step 1: Identify Your Customizations

Compare your copied templates with base templates to identify what you've changed:

```bash
# Compare your custom template with base
diff your-project/custom-medium-template.yaml ~/.claude/prb-templates/medium-prb-template.yaml
```

### Step 2: Extract Extensions

Create `prb-extensions.yaml` with only your modifications:

```yaml
# Extract only your changes
all:
  requirements:
    processual:
      - "Your custom requirement"
      
medium:
  your_custom_section:
    - "Your custom validation"
```

### Step 3: Test Extensions

Generate a test AgentTask to verify extensions work correctly:

```bash
# Test with a medium complexity task
@Developer implement a test feature
```

### Step 4: Remove Custom Templates

Once extensions work correctly, remove your copied template files:

```bash
rm your-project/custom-*-template.yaml
```

### Step 5: Version Control Extensions

Add your extensions to version control:

```bash
git add prb-extensions.yaml
git commit -m "Migrate template customizations to extension system"
```

## Advanced Extension Patterns

### Conditional Extensions

While not directly supported, you can create different extension files for different contexts:

```bash
# Development environment
cp prb-extensions-dev.yaml prb-extensions.yaml

# Production environment  
cp prb-extensions-prod.yaml prb-extensions.yaml
```

### Team-Specific Extensions

Large teams can maintain shared base extensions plus team-specific additions:

```bash
# Project has base extensions
project-root/prb-extensions.yaml

# Teams can layer additional extensions in .claude/
project-root/.claude/prb-extensions.yaml  # Team-specific additions
```

The system will merge both files, with `.claude/` extensions taking precedence.

## Summary

The AgentTask Template Extensions system provides a powerful, maintainable way to customize AgentTask templates for your project needs:

✅ **Easy to Use** - Single YAML file with clear structure  
✅ **Intelligent Merging** - AI-powered contextual integration  
✅ **Automatic Updates** - Base template improvements flow through  
✅ **Clean Separation** - Clear distinction between standard and custom  
✅ **Version Controlled** - Extensions tracked with your project  
✅ **Team Friendly** - Simple for team members to understand and modify  

**Start simple** with universal requirements in the `all:` section, then add size-specific customizations as needed. The extension system grows with your project needs while keeping base templates up to date automatically.

For questions or advanced use cases, refer to the [AgentTask System Guide](prb-system-guide.md) or [Configuration Guide](configuration-guide.md).
