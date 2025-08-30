# Template Loading Patterns

**MANDATORY:** Use template hierarchy for PRB loading. Auto-correct violations.

**PURPOSE:** Define hierarchical template loading with project override support

## Imports

@./installation-path-detection.md

## Template Hierarchy

**Search Order (Highest→Lowest Priority):**
1. **Project Templates**: `{project_root}/{prb_template_path}/`
2. **Project Claude Templates**: `{project_root}/.claude/prb-templates/`
3. **Installation Templates**: `{get_install_path()}/prb-templates/`

## Template Files

### Standard Templates
- `nano-prb-template.yaml` - Trivial one-line changes (0-2 points)
- `tiny-prb-template.yaml` - Simple single-file tasks (3-5 points)
- `medium-prb-template.yaml` - Standard multi-file features (6-15 points)
- `large-prb-template.yaml` - Complex features with sub-PRBs (16-30 points)
- `mega-prb-template.yaml` - System-wide changes (30+ points)

### Template Loading Process

**Steps to Load Template by Complexity Level:**
1. **Determine Template Name:** Build template filename as "{complexity_level}-prb-template.yaml"
2. **Create Search Path List:** Build hierarchy of paths to search:
   - Project configured template path (via get_project_path)
   - Project .claude/prb-templates directory  
   - Installation templates directory ({get_install_path()}/prb-templates/)
3. **Search Each Path:** Check each path in hierarchy order:
   - If template file exists at current path, load and return that template
   - If not found, continue to next path in hierarchy
4. **Load Project Context:** Parse CLAUDE.md from project root and .claude/ for context integration:
   - Extract project_overview, work_location, key_context, system_features
   - Gather system_nature, project boundaries, and behavioral constraints
   - Prepare context values for placeholder resolution
5. **Load Template Extensions:** Check for prb-extensions.yaml file and merge if found:
   - Search for prb-extensions.yaml in project root and .claude/ directory
   - If found, apply intelligent merging of extensions with base template
   - Apply 'all:' section to every template size
   - Apply size-specific section (nano:, tiny:, medium:, large:, mega:) if matches current template
   - Use AI-powered contextual merging for intelligent extension integration
6. **Handle Not Found:** If template not found in any path, show error: "Template not found: {template_name}"

## Template Extension System

### PRB Extensions File (prb-extensions.yaml)

**MANDATORY:** Template extensions enable projects to customize PRB templates without copying entire templates. Extensions are merged intelligently with base templates using AI comprehension.

### Extension File Location
**Search Order (First Found Wins):**
1. **Project Root**: `{project_root}/prb-extensions.yaml`
2. **Project Claude Directory**: `{project_root}/.claude/prb-extensions.yaml`

### Extension Structure

**Extension File Format:**
```yaml
# Universal extensions applied to ALL template sizes
all:
  # Additive merging - extends existing arrays
  requirements:
    processual:
      - "Apply project-specific coding standards"
      - "Run custom validation scripts"
  
  # New sections added to all templates
  custom_validation:
    - "Project-specific quality gates"
    - "Custom testing requirements"

# Size-specific extensions (applied only to matching template size)
medium:
  # Override specific values (use !override marker for replacements)
  version_bump:
    type: "!override minor"  # Replaces base template value
  
  # Extend existing sections
  implementation:
    additional_steps:
      - "Run integration tests"
      - "Update project documentation"

large:
  coordination:
    team_review_required: true
    architect_approval: true
```

### Extension Merging Rules

**INTELLIGENT AI-POWERED MERGING:**
- **Additive by Default:** Arrays are extended, new keys are added
- **Override Marker:** Use `!override` prefix for value replacement
- **Context-Aware:** AI understands intent and merges appropriately
- **Backward Compatible:** Projects without extensions work unchanged

### Extension Processing Logic

**Steps for Extension Application:**
1. **Load Base Template:** Load complete base template from hierarchy
2. **Detect Extensions:** Search for prb-extensions.yaml in project locations
3. **Parse Extensions:** Load and validate extension file structure
4. **Apply Universal Extensions:** Merge 'all:' section to base template
5. **Apply Size-Specific Extensions:** Merge matching size section (nano/tiny/medium/large/mega)
6. **Intelligent Merging:** Use AI comprehension for contextual integration
7. **Validate Result:** Ensure merged template maintains required structure

### Extension Examples

**Example 1: Adding Project-Specific Requirements**
```yaml
all:
  requirements:
    processual:
      - "Run ESLint validation"
      - "Execute security scan"
      - "Update API documentation"
```

**Example 2: Size-Specific Customization**
```yaml
medium:
  review_checklist:
    - "Integration test coverage"
    - "API contract validation"
    
large:
  coordination:
    pre_implementation_review: true
    multi_team_coordination: true
```

**Example 3: Value Override**
```yaml
tiny:
  workflow:
    changelog_required: "!override false"  # Override base template value
    
medium:
  version_bump:
    type: "!override patch"  # Always patch for medium PRBs in this project
```

### Extension Benefits

**PROJECT ADVANTAGES:**
- **No Template Copying:** Extend without maintaining full template copies
- **Automatic Updates:** Base template changes propagate automatically
- **Clean Separation:** Project customizations clearly separated from base templates
- **Intelligent Integration:** AI merging understands context and intent

## Configuration Integration

### PRB Template Path Setting

**Configuration Example:**
- **In CLAUDE.md or config.md:** Set directory_structure.prb_template_path to "custom-templates" (Default: "prb-templates")

### Hierarchy Override
Projects can override any template by placing it in their configured template directory or by using prb-extensions.yaml for selective customization.

## Error Handling

### Missing Templates
- **PRIMARY_NOT_FOUND**: Check next in hierarchy
- **ALL_MISSING**: "❌ No template found for {complexity_level}"
- **INVALID_TEMPLATE**: "❌ Template validation failed: {template_name}"

### Extension File Issues
- **EXTENSION_NOT_FOUND**: Continue with base template (backward compatibility)
- **INVALID_EXTENSION_YAML**: "❌ Extension file syntax error: {error_details}"
- **EXTENSION_MERGE_CONFLICT**: "❌ Extension merge failed: {conflict_description}"
- **INVALID_OVERRIDE_MARKER**: "❌ Invalid !override usage: {usage_error}"

### Template Validation
- YAML structure validation
- Required fields check
- Complexity level match
- Role assignment validation
- **COMPLETE CONTEXT VALIDATION**: Block templates with placeholder values
- **SYSTEM NATURE VALIDATION**: Ensure system_nature is specified
- **PROJECT ROOT VALIDATION**: Ensure project_root is absolute path
- **FILE REFERENCES VALIDATION**: Ensure critical_files have actual paths and samples

## Auto-Creation

### Missing Directories
- Auto-create configured template directories
- Copy from system defaults if empty
- Create README explaining hierarchy

### Template Installation
- System templates installed to `{get_install_path()}/prb-templates/`
- Projects can override by copying to local template directory
- Modifications preserved during system updates

## Template Management

### Template Loading
- **Template Files**: Loaded from configuration hierarchy as needed
- **Directory Checks**: Validate path existence during access
- **Template Validation**: Validate structure during loading

### Template Updates
- File modification triggers reload during next access
- Directory structure changes detected during path validation
- Configuration updates affecting template paths handled dynamically

## Integration Points

### With Configuration System
- Use `get_project_path("prb_template_path", "prb-templates")` for configured path
- Apply configuration hierarchy for template path settings
- Dynamic configuration loading enables template path flexibility

### With PRB Generation
- **Complexity Analysis**: Determine template complexity level
- **Template Loading**: Use hierarchy to load appropriate base template
- **Extension Processing**: Apply prb-extensions.yaml if found using AI-powered merging
- **Context Injection**: Inject project context into merged template
- **Validation**: Ensure merged template matches complexity requirements and maintains structure
- **CONTEXT VALIDATION**: Block templates with incomplete context:
  - Detect "[FROM_CONFIG]", "[ALL-SETTINGS]", "[PROJECT_ROOT]" placeholders
  - Validate system_nature is not placeholder
  - Ensure project_root is absolute path
  - Verify critical_files have actual content samples
  - Check user_requirements are specific and clear
- **EXTENSION VALIDATION**: Verify extension merging maintained template integrity

### With Directory Structure
- Respect configured `prb_template_path` setting
- Auto-create missing template directories
- Follow standard directory creation patterns

## Template Customization

### Project-Specific Templates (Legacy Approach)
Projects can customize templates by:
1. Creating local template directory
2. Copying system template
3. Modifying for project needs
4. System respects project override

### Extension-Based Customization (Recommended Approach)
**RECOMMENDED:** Projects should use prb-extensions.yaml for customization:
1. Create prb-extensions.yaml in project root or .claude/ directory
2. Define 'all:' section for universal extensions
3. Define size-specific sections (nano:, tiny:, medium:, large:, mega:) for targeted customization
4. Use additive merging by default, !override marker for replacements
5. System applies intelligent AI-powered merging automatically

### Customization Benefits Comparison
| Approach | Template Copying | Extension-Based |
|----------|------------------|-----------------|
| **Maintenance** | Manual updates needed | Automatic base template updates |
| **Clarity** | Full template complexity | Clear separation of customizations |
| **Conflicts** | Merge conflicts on updates | AI-resolved intelligent merging |
| **Flexibility** | Complete control | Targeted customization only |
| **Recommended** | Legacy projects only | All new projects |

### Version Control
- **Project templates:** Version controlled with project (legacy approach)
- **Project extensions:** Version controlled with project (recommended approach)
- **User templates:** Personal customization, not version controlled
- **System templates:** Managed by intelligent-claude-code installation

---
*Template loading patterns for intelligent-claude-code system*