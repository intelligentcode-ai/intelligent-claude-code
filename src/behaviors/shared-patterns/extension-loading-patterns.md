# Extension Loading Patterns

**MANDATORY:** Load agenttask-extensions.yaml for template customization. Auto-correct violations.

## Extension File Location

**Search Order (Highest→Lowest Priority):**
1. **Project Root**: `{project_root}/agenttask-extensions.yaml`
2. **Project Claude Directory**: `{project_root}/.claude/agenttask-extensions.yaml`

## Extension Structure

**Valid Extension Sections:**
- `all:` - Applied to every executable template size
- `nano:` - Applied to nano-agenttask-template.yaml (0-2 points)
- `tiny:` - Applied to tiny-agenttask-template.yaml (3-5 points)
- `medium:` - Applied to medium-agenttask-template.yaml (6-15 points)

**DEPRECATED SECTIONS (Work >15 pts becomes STORY):**
- `large:` - DEPRECATED (16-30 points → STORY in ./stories/)
- `mega:` - DEPRECATED (30+ points → STORY in ./stories/)

## Loading Process

**Extension Loading Steps:**
1. **Check Project Root**: Look for `{project_root}/agenttask-extensions.yaml`
2. **Check Claude Directory**: If not found, look for `{project_root}/.claude/agenttask-extensions.yaml`
3. **Parse YAML Structure**: Validate extension file syntax
4. **Validate Sections**: Recognize sections (all, nano, tiny, medium) - warn about deprecated sections (large, mega)
5. **Store Extensions**: Keep in memory for merging during AgentTask generation
6. **Handle Missing**: If no extension file found, continue with base templates only

## Extension Validation

**Structure Requirements:**
- Valid YAML syntax
- Recognized section names (all, nano, tiny, medium)
- Deprecated sections (large, mega) trigger warning
- Nested structure allowed within sections
- Override markers: `"!override value"` for replacements

**Error Handling:**
- `EXTENSION_SYNTAX_ERROR`: "❌ Extension file syntax error: {error_details}"
- `DEPRECATED_SECTION`: "⚠️ Deprecated extension section: {section_name} - work >15 pts becomes STORY"
- `FILE_READ_ERROR`: "❌ Cannot read extension file: {file_path}"

## Extension Storage Format

**In-Memory Structure:**
```yaml
extensions:
  all: {extension_content}
  nano: {extension_content}
  tiny: {extension_content}
  medium: {extension_content}
# large and mega sections deprecated (ignored if present)
```

## Integration Points

### With Template Loading
- Extensions loaded AFTER base template loading
- Extensions stored for use during template merging
- No modification of base templates - extensions kept separate

### With AgentTask Generation
- Extensions passed to merging process during AgentTask creation
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
*Extension loading patterns for AgentTask template customization*