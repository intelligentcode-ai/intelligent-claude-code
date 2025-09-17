# Template Loading Patterns

**MANDATORY:** Use template hierarchy for AgentTask loading. Auto-correct violations.

## Imports

@./installation-path-detection.md

## Template Hierarchy

**Search Order (Highest→Lowest Priority):**
1. **Project Templates**: Project root agenttask_template_path
2. **Installation Templates**: Installation agenttask-templates/

## Standard Templates

- `nano-agenttask-template.yaml` - Trivial changes (0-2 points)
- `tiny-agenttask-template.yaml` - Single-file tasks (3-5 points)  
- `medium-agenttask-template.yaml` - Multi-file features (6-15 points)
- `large-agenttask-template.yaml` - Complex features (16-30 points)
- `mega-agenttask-template.yaml` - System-wide changes (30+ points)

## Template Loading Process

**Template Loading Steps:**
1. **Determine Name**: Build template filename from complexity level
2. **Search Hierarchy**: Check paths in priority order
3. **Load Context**: Parse CLAUDE.md for project context integration
4. **Apply Extensions**: Merge agenttask-extensions.yaml if present
5. **Validate**: Ensure complete context and structure

## Template Extension System

**Extension File**: agenttask-extensions.yaml in project root or .claude/

**Extension Structure:**
```yaml
# Applied to all template sizes
all:
  requirements:
    processual:
      - "Project-specific standards"

# Size-specific extensions
medium:
  version_bump:
    type: "!override minor"  # Override with !override marker
```

## Extension Merging Rules

**INTELLIGENT MERGING:**
- **Additive Default**: Arrays extended, keys added
- **Override Marker**: Use !override prefix for replacements  
- **Context-Aware**: AI understands merge intent
- **Backward Compatible**: Works without extensions

## Configuration Integration

**Template Path Setting**: Configure agenttask_template_path in CLAUDE.md or config.md
**Default Path**: "agenttask-templates"
**Hierarchy Override**: Projects can override any template

## Error Handling

**Missing Templates:**
- Search next in hierarchy
- Show error if none found in any path

**Template Validation:**
- YAML structure validation
- Required fields verification
- Complete context validation
- No placeholder patterns allowed

## Auto-Creation

**Missing Directories**: Auto-created with system defaults
**Template Installation**: System templates to installation path
**Project Override**: Local templates preserved during updates

## Integration Points

### With Configuration System
- Use configured template paths
- Apply configuration hierarchy
- Enable path flexibility

### With AgentTask Generation  
- Analyze complexity for template selection
- Load from hierarchy with extension processing
- Inject complete project context
- Validate merged template structure

### With Directory Structure
- Respect configured paths
- Auto-create missing directories
- Follow creation patterns

## Template Customization

### Extension-Based (Recommended)
**Process**: Create agenttask-extensions.yaml with customizations
**Benefits**: Automatic updates, clean separation, intelligent merging

### Template Copying (Legacy)
**Process**: Copy system template to project directory
**Drawbacks**: Manual updates, merge conflicts

## Version Control

**Project Extensions**: Version controlled with project
**System Templates**: Managed by installation
**User Templates**: Personal customization

---
*Template loading patterns for intelligent-claude-code system*