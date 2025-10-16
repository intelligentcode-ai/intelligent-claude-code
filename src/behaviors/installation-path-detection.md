# Installation Path Detection

**MANDATORY:** Detect and validate intelligent-claude-code installation paths.

## Path Detection Logic

**INSTALLATION DETECTION HIERARCHY:**
1. **Development Context**: If current project IS the intelligent-claude-code repository, use project_root/ (highest priority)
2. **Project Scope**: project_root/.claude/ (project-specific)
3. **Environment Variable**: Check CLAUDE_INSTALL_PATH
4. **User Global**: ~/.claude/ (user-wide installation)

**SELECTION PRIORITY:** First valid path found wins

## Detection Process

### Path Validation Steps
1. **Check Development Context**: If project has src/agenttask-templates/ and src/behaviors/ and VERSION file, use project_root/ (highest priority)
2. **Check Project Claude**: Verify project_root/.claude/ exists and valid
3. **Environment Variable**: Check CLAUDE_INSTALL_PATH environment variable
4. **User Global**: Fall back to ~/.claude/ if others unavailable
5. **Validation**: Confirm installation completeness at detected path
6. **Cache Result**: Store detected path for performance

### Installation Completeness Check
**REQUIRED COMPONENTS:**

**For Development Context (project_root/):**
- src/agenttask-templates/ directory with template files
- src/behaviors/ directory with behavioral patterns
- src/config.md file with system configuration
- src/agents/ directory with agent definitions
- src/commands/ directory with command definitions

**For Installation Context (user/.claude/):**
- agenttask-templates/ directory with template files
- behaviors/ directory with behavioral patterns
- config.md file with system configuration
- agents/ directory with agent definitions
- commands/ directory with command definitions

**VALIDATION PROCESS:**
1. **Context Detection**: Determine if development or installation context
2. **Directory Check**: Verify all required directories exist for detected context
3. **File Check**: Confirm essential files present in correct locations
4. **Content Check**: Validate file formats and structure
5. **Completeness Score**: Calculate installation completeness percentage

## Component Path Resolution

### Template Path Resolution
**TEMPLATE HIERARCHY:**
- Project templates: project_root/agenttask_template_path
- Development context: detected_path/src/agenttask-templates/
- Installation context: detected_path/agenttask-templates/

**NOTE:** Development context has HIGHEST priority to ensure templates are loaded from THIS project when working on intelligent-claude-code itself.

### Behavior Path Resolution
**BEHAVIOR LOADING:**
- Development context: detected_path/src/behaviors/
- Installation context: detected_path/behaviors/
- System behaviors loaded from installation path

### Configuration Path Resolution
**CONFIG HIERARCHY:**
- Project config: project_root/config.md
- Project .claude config: project_root/.claude/config.md
- Development context: detected_path/src/config.md
- Installation config: detected_path/config.md

### Command Path Resolution
**COMMAND DEFINITIONS:**
- Command definitions: detected_path/src/commands/
- Configuration access: detected_path/src/config.md

## Caching Strategy

### Performance Optimization
**CACHE IMPLEMENTATION:**
- **Cache Key**: Based on project root + environment variables
- **Cache Duration**: 15 minutes (moderate stability)
- **Invalidation**: On environment changes or installation updates
- **Storage**: In-memory cache with timestamp validation

### Cache Benefits
**PERFORMANCE GAINS:**
- Reduced filesystem operations
- Faster path resolution
- Improved system responsiveness

## Error Handling

### Missing Installation
**ERROR MESSAGE**: "Installation not detected. Expected locations: project_root/.claude/, $CLAUDE_INSTALL_PATH, ~/.claude/"
**RECOVERY**: Provide installation guidance

### Invalid Path
**ERROR MESSAGE**: "Path resolution failed for component: path"
**RECOVERY**: Fall back to next hierarchy level

### Performance Degradation
**IMPACT**: Performance degradation, no functional impact
**RECOVERY**: Continue with slower path resolution

## Integration Points

### With Template Loading
- Provides installation template path for hierarchy
- Template hierarchy includes installation templates

### With Configuration System
- Installation config provides system defaults
- Project templates from configured path
- Installation templates from detected installation path

### With Behavior System
- Installation behaviors loaded from detected path

### With Command System
- Command definitions from installation path
- Configuration access for command functionality

## Migration Support

### Legacy Path Support
**BACKWARDS COMPATIBILITY:**
- Support existing ~/.claude/ installations
- Graceful migration path for new structure
- Continue functioning during transition period

## Installation Verification

### Health Check
**VERIFICATION PROCESS:**
- Path detection successful
- Component completeness verified
- Cache performance optimal
- Configuration hierarchy functional

---
*Installation path detection for intelligent-claude-code system*
