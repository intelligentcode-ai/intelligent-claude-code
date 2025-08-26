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
- `[PROJECT_OVERVIEW]` → Extract from CLAUDE.md project description
- `[WORK_LOCATION]` → Extract from CLAUDE.md work boundaries
- `[KEY_CONTEXT]` → Extract from CLAUDE.md key context information
- `[SYSTEM_FEATURES]` → Extract from CLAUDE.md system features
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
   - **Placeholder Patterns:** [FROM_CONFIG], [ALL-SETTINGS], [PROJECT_ROOT], [PROJECT_OVERVIEW], [WORK_LOCATION], [KEY_CONTEXT], [SYSTEM_FEATURES], [DYNAMIC_*, [REQUIREMENT_*, [CURRENT_DATE]
   - **Pattern Detection:** Scan PRB content for any placeholder patterns
   - **When pattern found:** Block with error "❌ Unresolved placeholder: {pattern}"

**4. Embedded Values Check:**
   - **Configuration Embedding:** Verify complete_context.configuration exists
   - **When not embedded:** Block with error "❌ Configuration values not embedded"
   - **Specific Value Check:** Verify git_privacy is not "[FROM_CONFIG]"
   - **When not resolved:** Block with error "❌ git_privacy not resolved from config"

**5. Project Context Validation:**
   - **Project Boundaries:** Verify work_location specifies project boundaries
   - **When not specified:** Block with error "❌ Work location boundaries not defined"
   - **System Features:** Verify system_features describes actual system capabilities
   - **When not specified:** Block with error "❌ System features not properly described"
   - **Key Context:** Verify key_context contains essential project information
   - **When not specified:** Block with error "❌ Key context not properly embedded"

### Template Section Validation
**MANDATORY SECTIONS (ALL must be present):**

**Complete Context Section:**
- **project_root:** Absolute path (NOT "[PROJECT_ROOT]")
- **system_nature:** Specific system type (NOT "[SYSTEM_NATURE]")
- **project_overview:** Actual project description (NOT "[PROJECT_OVERVIEW]")
- **work_location:** Specific work boundaries (NOT "[WORK_LOCATION]")
- **key_context:** Essential project context (NOT "[KEY_CONTEXT]") 
- **system_features:** Core system capabilities (NOT "[SYSTEM_FEATURES]")
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
**RESOLUTION PROCESS:**
1. **Load Configuration Hierarchy**: Gather embedded, project, user, and system defaults
2. **Resolve Placeholders**: Replace all template placeholders with actual values
3. **Embed Complete Context**: Set configuration and project context in PRB
4. **Validate Resolution**: Ensure no placeholder patterns remain

**PLACEHOLDER RESOLUTION:**
- [FROM_CONFIG] → Actual config values
- [PROJECT_ROOT] → Actual project root path
- [CURRENT_DATE] → Current system date
- [PROJECT_OVERVIEW] → CLAUDE.md project description
- [WORK_LOCATION] → Project work boundaries

### Configuration Validation
**BEFORE/AFTER RESOLUTION:**
- **Before**: git_privacy: "[FROM_CONFIG]"
- **After**: git_privacy: true/false (actual value)

**VALIDATION REQUIREMENT:**
- All configuration placeholders must be resolved to actual values
- No "[FROM_CONFIG]" patterns allowed in final PRB
- Complete configuration embedded in complete_context section

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

## Integration

**AUTOMATIC ENFORCEMENT:**
All template enforcement integrated into PRB creation pipeline - no manual validation needed.

**VALIDATION POINTS:**
- Template compliance checking
- Placeholder resolution verification
- Configuration embedding validation
- Manual creation blocking
- Template source path validation

---
*Template enforcement with mandatory placeholder resolution and embedded configuration*