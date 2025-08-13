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

**Template Before Resolution:**
- git_privacy: "[FROM_CONFIG]"
- branch_protection: "[FROM_CONFIG]"

**Template After Resolution:**
- git_privacy: Actual value from config hierarchy
- branch_protection: Actual value from config hierarchy

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

**Template Enforcement Validation Process:**

**1. Template Source Validation:**
   - **Check Template Source:** Verify creation context includes template source
   - **When template source missing:** Block with error "❌ PRB creation without template FORBIDDEN"
   - **Check Template Path:** Verify template source starts with "src/prb-templates/"
   - **When wrong path:** Block with error "❌ Must use templates from src/prb-templates/"

**2. Template Completeness Check:**
   - **Required Sections:** complete_context, requirements, git_operations, documentation_updates, knowledge_management, review_process, execution_checklist
   - **Section Validation:** Check each required section exists in PRB content
   - **When section missing:** Block with error "❌ Missing mandatory template section: {section}"

**3. Placeholder Resolution Check:**
   - **Placeholder Patterns:** [FROM_CONFIG], [ALL-SETTINGS], [PROJECT_ROOT], [DYNAMIC_*, [REQUIREMENT_*, [CURRENT_DATE]
   - **Pattern Detection:** Scan PRB content for any placeholder patterns
   - **When pattern found:** Block with error "❌ Unresolved placeholder: {pattern}"

**4. Embedded Values Check:**
   - **Configuration Embedding:** Verify complete_context.configuration exists
   - **When not embedded:** Block with error "❌ Configuration values not embedded"
   - **Specific Value Check:** Verify git_privacy is not "[FROM_CONFIG]"
   - **When not resolved:** Block with error "❌ git_privacy not resolved from config"

### Template Section Validation
**MANDATORY SECTIONS (ALL must be present):**

**Complete Context Section:**
- **project_root:** Absolute path (NOT "[PROJECT_ROOT]")
- **configuration.git_privacy:** Actual value (NOT "[FROM_CONFIG]")
- **configuration.branch_protection:** Actual value (NOT "[FROM_CONFIG]") 
- **configuration.default_branch:** Actual value (NOT "[FROM_CONFIG]")

**Requirements Section:**
- **functional:** Actual requirements (NOT "[REQUIREMENT_1]")
- **processual:** Process requirements
- **technical:** Technical requirements

**Git Operations Section:**
- **branch_strategy:** Actual strategy like "feature/" (NOT "[FROM_CONFIG]")
- **privacy_filter:** Actual boolean value (NOT "[FROM_CONFIG]")

**Knowledge Management Section:**
- **structure:** Actual path structure like "memory/[topic]/"
- **storage:** Storage method like "version-controlled"

**Review Process Section:**
- **reviewer:** Actual reviewer like "@AI-Engineer" (NOT "[PRE_ASSIGNED_SME]")

**Additional Required Sections:**
- **execution_checklist:** Complete checklist content
- **documentation_updates:** Documentation requirements

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

**Runtime Configuration Validation Process:**

**1. Scan for Forbidden Patterns:**
   - **Forbidden Patterns:** load_config, get_setting, check_configuration, read_claude_md, config_hierarchy, dynamic_config
   - **Pattern Detection:** Review PRB execution plan for config lookup attempts
   - **When pattern found:** Block with error "❌ Runtime config lookup forbidden - embed in PRB"

**2. Ensure Required Values Embedded:**
   - **Required Values:** git_privacy, branch_protection, default_branch, project_root, autonomy_level
   - **Embedding Check:** Verify each required value exists in prb_content.complete_context.configuration
   - **When value missing:** Block with error "❌ Required value not embedded: {value}"

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

**Auto-Block Process:**

**PRB Creation Monitoring:**
- **Manual Creation Detection:** When manual PRB creation detected, block with "❌ PRB creation without template FORBIDDEN"
- **Unresolved Placeholders Detection:** When unresolved placeholders detected, block with "❌ All template placeholders must be resolved"
- **Runtime Config Detection:** When runtime config lookup detected, block with "❌ Config values must be embedded at generation time"
- **Missing Sections Detection:** When missing template sections detected, block with "❌ All mandatory template sections required"

### Error Responses

**Template Enforcement Error Messages:**
- **TEMPLATE_REQUIRED:** "❌ PRB creation without template FORBIDDEN - use src/prb-templates/"
- **PLACEHOLDER_UNRESOLVED:** "❌ Unresolved placeholder: {placeholder} - resolve during generation"
- **SECTION_MISSING:** "❌ Missing mandatory template section: {section}"
- **RUNTIME_CONFIG_FORBIDDEN:** "❌ Runtime config lookup forbidden - embed values in PRB"
- **MANUAL_CREATION_BLOCKED:** "❌ Manual PRB structure not allowed - use complexity-based templates"
- **TEMPLATE_SOURCE_INVALID:** "❌ Must use templates from src/prb-templates/ hierarchy only"

## Configuration Embedding Process

### Generation-Time Resolution
**PRB Template Resolution Process:**

**1. Load Configuration Hierarchy:**
   - Load complete configuration hierarchy from all sources
   - Gather embedded, project, user, and system defaults

**2. Resolve All Placeholders:**
   - Replace "[FROM_CONFIG_git_privacy]" with actual config.git_privacy value
   - Replace "[FROM_CONFIG_branch_protection]" with actual config.branch_protection value
   - Replace "[FROM_CONFIG_default_branch]" with actual config.default_branch value
   - Replace "[PROJECT_ROOT]" with actual work_context.project_root path
   - Replace "[CURRENT_DATE]" with current system date

**3. Embed Complete Context:**
   - Set resolved_content.complete_context.configuration to loaded config
   - Set resolved_content.complete_context.project_root to work context project root

**4. Validate Resolution Complete:**
   - Scan resolved content for any remaining placeholders
   - When placeholders detected: Block with error "❌ Unresolved placeholders detected"

### Configuration Validation
**Embedded Configuration Validation:**

**Template BEFORE Resolution:**
- **complete_context.configuration.git_privacy:** "[FROM_CONFIG]"
- **complete_context.configuration.branch_protection:** "[FROM_CONFIG]"

**Template AFTER Resolution:**
- **complete_context.configuration.git_privacy:** Actual value from config
- **complete_context.configuration.branch_protection:** Actual value from config
- **complete_context.configuration.default_branch:** Actual value from config
- **complete_context.configuration.autonomy_level:** Actual value from config

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