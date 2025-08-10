# Template Enforcement Patterns

**MANDATORY:** ALL PRB creation MUST use templates from src/prb-templates/ with COMPLETE placeholder resolution. NO exceptions.

**PURPOSE:** Enforce mandatory template usage with resolved placeholders - NO runtime config lookups

## Core Enforcement Rules

### Absolute Template Requirement
**CRITICAL RULE:** Every PRB MUST be created using appropriate complexity-based template with ALL placeholders resolved

**TEMPLATE SOURCE:** Only templates from `src/prb-templates/` hierarchy:
- `nano-prb-template.yaml` (0-2 complexity points)
- `tiny-prb-template.yaml` (3-5 complexity points) 
- `medium-prb-template.yaml` (6-15 complexity points)
- `large-prb-template.yaml` (16-30 complexity points)
- `mega-prb-template.yaml` (30+ complexity points)

**BLOCKED ABSOLUTELY:**
- ❌ Any PRB creation without using these templates
- ❌ Any PRB with unresolved placeholders
- ❌ Any PRB requiring runtime config lookups
- ❌ Any manual PRB structure creation

### Placeholder Resolution Requirement
**CRITICAL:** ALL placeholders MUST be resolved during PRB generation:

**MANDATORY RESOLUTION:**
```yaml
# Template contains:
git_privacy: "[FROM_CONFIG]"
branch_protection: "[FROM_CONFIG]"

# MUST become in final PRB:
git_privacy: <ACTUAL_VALUE_FROM_CONFIG_HIERARCHY>
branch_protection: <ACTUAL_VALUE_FROM_CONFIG_HIERARCHY>
```

**PLACEHOLDER PATTERNS TO RESOLVE:**
- `[FROM_CONFIG]` → Load actual config value
- `[ALL-SETTINGS]` → Replace with specific configuration
- `[PROJECT_ROOT]` → Use actual project root path
- `[DYNAMIC_*]` → Replace with discovered content
- `[REQUIREMENT_*]` → Replace with actual requirements
- `[CURRENT_DATE]` → Use actual system date

**BLOCK IF UNRESOLVED:** Any placeholder remaining in final PRB = BLOCKED

## Detection and Blocking

### Manual Creation Detection
**DETECT VIOLATIONS:**
- PRB file creation without template source reference
- PRB content missing mandatory template sections
- PRB structure not matching template format
- Any unresolved placeholder values in PRB
- Runtime config lookups instead of embedded values

**VALIDATION FUNCTION:**
```
ValidateTemplateEnforcement(prb_content, creation_context):
  # 1. Template Source Validation
  IF NOT creation_context.template_source:
    BLOCK_ERROR("❌ PRB creation without template FORBIDDEN")
  
  IF NOT template_source.startswith("src/prb-templates/"):
    BLOCK_ERROR("❌ Must use templates from src/prb-templates/")
  
  # 2. Template Completeness Check
  required_sections = [
    "complete_context", "requirements", "git_operations",
    "documentation_updates", "knowledge_management", 
    "review_process", "execution_checklist"
  ]
  
  FOR section IN required_sections:
    IF NOT section IN prb_content:
      BLOCK_ERROR("❌ Missing mandatory template section: {section}")
  
  # 3. Placeholder Resolution Check  
  placeholder_patterns = [
    "[FROM_CONFIG]", "[ALL-SETTINGS]", "[PROJECT_ROOT]",
    "[DYNAMIC_", "[REQUIREMENT_", "[CURRENT_DATE]"
  ]
  
  FOR pattern IN placeholder_patterns:
    IF pattern IN prb_content_text:
      BLOCK_ERROR("❌ Unresolved placeholder: {pattern}")
  
  # 4. Embedded Values Check
  IF NOT prb_content.complete_context.configuration:
    BLOCK_ERROR("❌ Configuration values not embedded")
  
  IF prb_content.complete_context.configuration.git_privacy == "[FROM_CONFIG]":
    BLOCK_ERROR("❌ git_privacy not resolved from config")
  
  RETURN VALIDATION_PASSED
```

### Template Section Validation
**MANDATORY SECTIONS (ALL must be present):**
```yaml
complete_context:
  project_root: "/absolute/path"  # NOT "[PROJECT_ROOT]"
  configuration:
    git_privacy: <ACTUAL_VALUE>   # NOT "[FROM_CONFIG]"
    branch_protection: <ACTUAL_VALUE>  # NOT "[FROM_CONFIG]"
    default_branch: <ACTUAL_VALUE>     # NOT "[FROM_CONFIG]"

requirements:
  functional: [...]               # NOT "[REQUIREMENT_1]"
  processual: [...]
  technical: [...]

git_operations:
  branch_strategy: "feature/"     # NOT "[FROM_CONFIG]"
  privacy_filter: true            # NOT "[FROM_CONFIG]"

knowledge_management:
  structure: "memory/[topic]/"    # Actual path structure
  storage: "version-controlled"

review_process:
  reviewer: "@AI-Engineer"        # NOT "[PRE_ASSIGNED_SME]"
  
execution_checklist:             # Complete checklist
documentation_updates:           # Documentation requirements
```

**BLOCK if ANY section missing or contains unresolved placeholders**

## Runtime Config Prevention

### NO Runtime Lookups
**FORBIDDEN PATTERNS:**
- Loading config during PRB execution
- Dynamic config lookups during work
- Checking settings files during implementation
- Runtime resolution of configuration values

**ENFORCE EMBEDDING:**
- ALL config values embedded in PRB at generation time
- NO need to check config files during execution
- Complete context available in PRB itself
- Self-contained execution without external dependencies

**VALIDATION:**
```
ValidateNoRuntimeConfig(prb_execution_plan):
  # Scan execution plan for config lookup attempts
  forbidden_patterns = [
    "load_config", "get_setting", "check_configuration",
    "read_claude_md", "config_hierarchy", "dynamic_config"
  ]
  
  FOR pattern IN forbidden_patterns:
    IF pattern IN prb_execution_plan:
      BLOCK_ERROR("❌ Runtime config lookup forbidden - embed in PRB")
      
  # Ensure all needed values are embedded
  required_embedded_values = [
    "git_privacy", "branch_protection", "default_branch", 
    "project_root", "autonomy_level"
  ]
  
  FOR value IN required_embedded_values:
    IF NOT value IN prb_content.complete_context.configuration:
      BLOCK_ERROR("❌ Required value not embedded: {value}")
```

## Enforcement Mechanisms

### Pre-Creation Blocking
**MANDATORY PRE-CREATION CHECKS:**
1. **Template Selection**: Choose complexity-appropriate template
2. **Template Loading**: Load from src/prb-templates/ only  
3. **Config Resolution**: Load ALL config values at generation time
4. **Placeholder Resolution**: Replace ALL template placeholders
5. **Context Embedding**: Embed complete context in PRB
6. **Section Validation**: Verify all mandatory sections present
7. **No-Lookup Validation**: Ensure no runtime config dependencies

**BLOCK CREATION if ANY check fails**

### Real-Time Monitoring
**MONITOR FOR VIOLATIONS:**
- PRB creation attempts without template usage
- Placeholder resolution failures  
- Missing mandatory template sections
- Runtime config lookup attempts during execution
- Manual PRB structure creation
- Template bypassing patterns

**AUTO-BLOCK IMMEDIATELY:**
```
PRB_CREATION_MONITOR():
  # Block manual creation
  IF detect_manual_prb_creation():
    BLOCK("❌ PRB creation without template FORBIDDEN")
  
  # Block unresolved placeholders
  IF detect_unresolved_placeholders():
    BLOCK("❌ All template placeholders must be resolved")
  
  # Block runtime config
  IF detect_runtime_config_lookup():
    BLOCK("❌ Config values must be embedded at generation time")
  
  # Block missing sections
  IF detect_missing_template_sections():
    BLOCK("❌ All mandatory template sections required")
```

### Error Responses
```
Template Enforcement Errors:
- TEMPLATE_REQUIRED: "❌ PRB creation without template FORBIDDEN - use src/prb-templates/"
- PLACEHOLDER_UNRESOLVED: "❌ Unresolved placeholder: {placeholder} - resolve during generation"
- SECTION_MISSING: "❌ Missing mandatory template section: {section}"
- RUNTIME_CONFIG_FORBIDDEN: "❌ Runtime config lookup forbidden - embed values in PRB"
- MANUAL_CREATION_BLOCKED: "❌ Manual PRB structure not allowed - use complexity-based templates"
- TEMPLATE_SOURCE_INVALID: "❌ Must use templates from src/prb-templates/ hierarchy only"
```

## Configuration Embedding Process

### Generation-Time Resolution
**MANDATORY DURING PRB GENERATION:**
```
ResolvePRBTemplate(template_content, work_context):
  # 1. Load complete configuration hierarchy
  config = LoadConfigurationHierarchy()
  
  # 2. Resolve all placeholders with actual values
  resolved_content = template_content
  resolved_content = resolved_content.replace("[FROM_CONFIG_git_privacy]", str(config.git_privacy))
  resolved_content = resolved_content.replace("[FROM_CONFIG_branch_protection]", str(config.branch_protection))
  resolved_content = resolved_content.replace("[FROM_CONFIG_default_branch]", config.default_branch)
  resolved_content = resolved_content.replace("[PROJECT_ROOT]", work_context.project_root)
  resolved_content = resolved_content.replace("[CURRENT_DATE]", get_current_date())
  
  # 3. Embed complete context
  resolved_content.complete_context.configuration = config
  resolved_content.complete_context.project_root = work_context.project_root
  
  # 4. Validate no placeholders remain
  IF detect_any_placeholder(resolved_content):
    BLOCK_ERROR("❌ Unresolved placeholders detected")
  
  RETURN resolved_content
```

### Configuration Validation
**VALIDATE EMBEDDED CONFIG:**
```yaml
# Template BEFORE resolution:
complete_context:
  configuration:
    git_privacy: "[FROM_CONFIG]"
    branch_protection: "[FROM_CONFIG]"

# Template AFTER resolution:
complete_context:
  configuration:
    git_privacy: <ACTUAL_VALUE_FROM_CONFIG>
    branch_protection: <ACTUAL_VALUE_FROM_CONFIG>
    default_branch: <ACTUAL_VALUE_FROM_CONFIG>
    autonomy_level: <ACTUAL_VALUE_FROM_CONFIG>
```

**BLOCK if any "[FROM_CONFIG]" remains after resolution**

## Integration Requirements

### With PRB Creation System
**MANDATORY INTEGRATION:**
- Block ALL non-template PRB creation
- Enforce placeholder resolution before creation
- Validate template completeness
- Document template source in metadata
- Prevent runtime config dependencies

### With Auto-Trigger System  
**TEMPLATE-FIRST FLOW:**
- Calculate complexity → Select template → Load from src/prb-templates/
- Resolve ALL placeholders → Embed complete context → Validate sections
- NO manual creation allowed at ANY point

### With Execution System
**EMBEDDED CONTEXT ONLY:**
- PRBs execute with embedded configuration only
- NO runtime config file access during execution
- Complete self-contained execution context
- All settings pre-resolved and embedded

## Validation Commands

**ENFORCEMENT COMMANDS:**
- `/validate-template-usage [prb-path]` - Check template compliance
- `/check-placeholder-resolution [prb-path]` - Verify all placeholders resolved
- `/validate-embedded-config [prb-path]` - Check configuration embedding
- `/block-manual-creation` - Enable manual creation blocking
- `/enforce-template-hierarchy` - Validate template source paths

**INTEGRATION:**
All enforcement automatically integrated into PRB creation pipeline - NO manual validation needed.

---
*Template enforcement with mandatory placeholder resolution and embedded configuration*