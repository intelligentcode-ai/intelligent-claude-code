# Template Loading Patterns

**MANDATORY:** Use template hierarchy for PRB loading. Auto-correct violations.

**PURPOSE:** Define hierarchical template loading with project override support

## Template Hierarchy

**Search Order (Highest→Lowest Priority):**
1. **Project Templates**: `{project_root}/{prb_template_path}/`
2. **Project Claude Templates**: `{project_root}/.claude/prb-templates/`
3. **User Global Templates**: `~/.claude/prb-templates/`

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
   - User global ~/.claude/prb-templates directory
3. **Search Each Path:** Check each path in hierarchy order:
   - If template file exists at current path, load and return that template
   - If not found, continue to next path in hierarchy
4. **Handle Not Found:** If template not found in any path, show error: "Template not found: {template_name}"

## Configuration Integration

### PRB Template Path Setting
```yaml
# CLAUDE.md or config.md
directory_structure:
  prb_template_path: "custom-templates"  # Default: "prb-templates"
```

### Hierarchy Override
Projects can override any template by placing it in their configured template directory.

## Error Handling

### Missing Templates
- **PRIMARY_NOT_FOUND**: Check next in hierarchy
- **ALL_MISSING**: "❌ No template found for {complexity_level}"
- **INVALID_TEMPLATE**: "❌ Template validation failed: {template_name}"

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
- System templates installed to `~/.claude/prb-templates/`
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
- **Template Loading**: Use hierarchy to load appropriate template
- **Context Injection**: Inject project context into loaded template
- **Validation**: Ensure template matches complexity requirements
- **CONTEXT VALIDATION**: Block templates with incomplete context:
  - Detect "[FROM_CONFIG]", "[ALL-SETTINGS]", "[PROJECT_ROOT]" placeholders
  - Validate system_nature is not placeholder
  - Ensure project_root is absolute path
  - Verify critical_files have actual content samples
  - Check user_requirements are specific and clear

### With Directory Structure
- Respect configured `prb_template_path` setting
- Auto-create missing template directories
- Follow standard directory creation patterns

## Template Customization

### Project-Specific Templates
Projects can customize templates by:
1. Creating local template directory
2. Copying system template
3. Modifying for project needs
4. System respects project override

### Version Control
- Project templates: Version controlled with project
- User templates: Personal customization, not version controlled
- System templates: Managed by intelligent-claude-code installation

## Commands

### Template Management
- `/icc-list-templates` - Show available templates in hierarchy order
- `/icc-validate-template [name]` - Validate template structure
- `/icc-load-template [complexity]` - Load template for complexity level
- `/icc-template-hierarchy` - Show template search paths
- `/icc-validate-context [template]` - Validate complete context in template
- `/icc-check-placeholders [template]` - Check for placeholder values
- `/icc-gather-context [work_request]` - Gather complete context before PRB generation

---
*Template loading patterns for intelligent-claude-code system*