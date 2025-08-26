# Comprehensive Validation Tools

**MANDATORY:** Validation tools ensuring perfect PRB creation with zero unresolved placeholders.

**PURPOSE:** Complete validation suite for PRB quality assurance.

## Validation Tools Overview

**VALIDATION SUITE:**
1. **Pre-Creation Validation**: Block PRB creation with unresolved placeholders
2. **Configuration Validation**: Ensure proper value types (boolean vs string)
3. **Content Authenticity**: Verify story-specific content
4. **Final Quality Check**: Comprehensive pre-creation validation

## Pre-Creation Validation Gate

**MANDATORY:** Block PRB creation until ALL placeholders resolved

### Validation Process
1. Load template from src/prb-templates/
2. Execute complete placeholder scan
3. If ANY placeholders found: STOP immediately
4. Display clear error with specific placeholders
5. Only proceed when scan returns zero placeholders

### Blocking Conditions
- ANY "[PLACEHOLDER]" pattern found
- ANY "[FROM_CONFIG]" string found  
- ANY "[PROJECT_ROOT]" string found
- ANY "[USER_REQUEST]" string found
- ANY generic template content found

### Pass Conditions
- Zero bracket patterns in entire PRB
- All configuration values are actual types
- All content is story-specific
- All paths are absolute

## Configuration Type Validation

**MANDATORY:** Validate actual config values, not placeholders

### Valid Configuration Examples
```yaml
git_privacy: true                    # Boolean, unquoted
branch_protection: false             # Boolean, unquoted
default_branch: "main"               # String, quoted
autonomy_level: "L2"                 # String, quoted
```

### Invalid Configuration Examples
```yaml
git_privacy: "[FROM_CONFIG]"         # ❌ Placeholder
branch_protection: "true"            # ❌ Boolean as string
default_branch: main                 # ❌ String unquoted
```

## Content Authenticity Validation

**MANDATORY:** Verify story-specific content, not template boilerplate

### Authentic Content Indicators
- Specific feature names from actual story
- Measurable success criteria from story requirements
- Actual file paths from project
- Real configuration values from project

### Template Boilerplate Indicators (BLOCKED)
- Generic placeholders like "[FEATURE_NAME]"
- Boilerplate text like "implement the requested feature"
- Template examples like "update configuration files"
- Generic success criteria like "feature works correctly"

## Integration Validation

**MANDATORY:** All validation tools work together seamlessly

### Validation Sequence
1. **Template Loading** → Validate template source and structure
2. **Placeholder Resolution** → Validate each replacement phase
3. **Configuration Integration** → Validate actual config values
4. **Content Verification** → Validate story-specific content
5. **Final Quality Check** → Comprehensive validation before creation

### Quality Gates
Each validation tool must pass before PRB creation proceeds.

---
*Comprehensive validation tools for intelligent-claude-code system*