# Load Project Context

Load PROJECT-CONTEXT.md file from current working directory using $ARGUMENTS.

## Behavior
Load and cache PROJECT-CONTEXT.md file from project root to provide project-specific context for all operations and decision-making.

## Arguments
**Format:** "force_reload:true|false"
**Example:** "force_reload:true"
**Default:** No arguments loads from cache if available

## Core Actions
1. Check current working directory for PROJECT-CONTEXT.md file
2. If force_reload=true or cache expired: reload from file
3. Parse markdown content and extract project information
4. Cache content with 15-minute TTL
5. Make project context available to all behavioral modules

## Project Context Structure
```yaml
project_context:
  name: string
  type: string
  description: string
  architecture: object
  dependencies: array
  workflows: object
  team_settings: object
  loaded_at: timestamp
  file_path: string
```

## Integration Points
- Config-loader.md: Integrate with configuration hierarchy
- Lean-workflow-executor.md: Use for system initialization
- Role-assignment-validator.md: Context-aware role assignments
- Memory system: Store project-specific learnings

## Cache Strategy
**TTL**: 15 minutes (moderate stability)
**Invalidation**: File timestamp changes
**Key**: project_path + file_hash

## Error Handling
- **File Not Found**: "PROJECT-CONTEXT.md not found in current directory"
- **Parse Error**: "Invalid markdown format in PROJECT-CONTEXT.md"
- **Cache Error**: "Failed to cache project context"
- **Permission Error**: "Cannot read PROJECT-CONTEXT.md file"

## Success Response
"✅ PROJECT-CONTEXT.md loaded successfully [cached for 15 minutes]"