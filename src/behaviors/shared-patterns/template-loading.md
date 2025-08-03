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

### Template Loading Logic

```
LoadTemplate(complexity_level):
  1. template_name = "{complexity_level}-prb-template.yaml"
  2. search_paths = [
       get_project_path("prb_template_path", "prb-templates"),
       project_root + "/.claude/prb-templates",
       "~/.claude/prb-templates"
     ]
  3. For each path in search_paths:
       if file_exists(path + "/" + template_name):
         return load_template(path + "/" + template_name)
  4. Error: "Template not found: {template_name}"
```

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

## Auto-Creation

### Missing Directories
- Auto-create configured template directories
- Copy from system defaults if empty
- Create README explaining hierarchy

### Template Installation
- System templates installed to `~/.claude/prb-templates/`
- Projects can override by copying to local template directory
- Modifications preserved during system updates

## Cache Management

### Template Caching
- **Template Files**: 15-minute TTL (moderate change frequency)
- **Directory Checks**: 5-minute TTL (path existence)
- **Template Validation**: 1-hour TTL (stable structure)

### Cache Invalidation
- File modification timestamp changes
- Directory structure changes
- Configuration updates affecting template paths

## Integration Points

### With Configuration System
- Use `get_project_path("prb_template_path", "prb-templates")` for configured path
- Apply configuration hierarchy for template path settings
- Cache configuration with appropriate TTL

### With PRB Generation
- **Complexity Analysis**: Determine template complexity level
- **Template Loading**: Use hierarchy to load appropriate template
- **Context Injection**: Inject project context into loaded template
- **Validation**: Ensure template matches complexity requirements

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

---
*Template loading patterns for intelligent-claude-code system*