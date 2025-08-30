# Extension Loading Patterns

**MANDATORY:** Load prb-extensions.yaml for template customization. Auto-correct violations.

## Extension File Location

**Search Order (Highest→Lowest Priority):**
1. **Project Root**: `{project_root}/prb-extensions.yaml`
2. **Project Claude Directory**: `{project_root}/.claude/prb-extensions.yaml`

## Extension Structure

**Valid Extension Sections:**
- `all:` - Applied to every template size
- `nano:` - Applied to nano-prb-template.yaml (0-2 points)
- `tiny:` - Applied to tiny-prb-template.yaml (3-5 points)
- `medium:` - Applied to medium-prb-template.yaml (6-15 points)
- `large:` - Applied to large-prb-template.yaml (16-30 points)
- `mega:` - Applied to mega-prb-template.yaml (30+ points)

## Loading Process

**Extension Loading Steps:**
1. **Check Project Root**: Look for `{project_root}/prb-extensions.yaml`
2. **Check Claude Directory**: If not found, look for `{project_root}/.claude/prb-extensions.yaml`
3. **Parse YAML Structure**: Validate extension file syntax
4. **Validate Sections**: Ensure only valid sections (all, nano, tiny, medium, large, mega)
5. **Store Extensions**: Keep in memory for merging during PRB generation
6. **Handle Missing**: If no extension file found, continue with base templates only

## Extension Validation

**Structure Requirements:**
- Valid YAML syntax
- Only recognized section names (all, nano, tiny, medium, large, mega)
- Nested structure allowed within sections
- Override markers: `"!override value"` for replacements

**Error Handling:**
- `EXTENSION_SYNTAX_ERROR`: "❌ Extension file syntax error: {error_details}"
- `INVALID_SECTION`: "❌ Invalid extension section: {section_name}"
- `FILE_READ_ERROR`: "❌ Cannot read extension file: {file_path}"

## Extension Storage Format

**In-Memory Structure:**
```yaml
extensions:
  all: {extension_content}
  nano: {extension_content}
  tiny: {extension_content}
  medium: {extension_content}
  large: {extension_content}
  mega: {extension_content}
```

## Integration Points

### With Template Loading
- Extensions loaded AFTER base template loading
- Extensions stored for use during template merging
- No modification of base templates - extensions kept separate

### With PRB Generation
- Extensions passed to merging process during PRB creation
- Size-specific extensions selected based on complexity score
- Universal `all:` extensions applied to every template

### Error Recovery
- Missing extension files: Continue with base templates
- Syntax errors: Log error, continue with base templates
- Invalid sections: Skip invalid sections, use valid ones

## Cache Integration

**Extension Caching:**
- Cache extension content for 15-minute TTL
- Invalidate cache on file modification
- Separate cache keys for project root vs .claude/ locations
- Cache miss: Reload from filesystem

---
*Extension loading patterns for PRB template customization*