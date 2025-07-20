# Apply Config

Apply embedded configuration from assignment files using $ARGUMENTS.

## Behavior
Extract and apply embedded configuration from assignment files to override
system behavior temporarily. Used for assignment-specific behavior changes
without affecting global configuration.

## Arguments
**Format:** "AssignmentFile: file_path | Duration: temporary|session|persistent"
**Example:** "AssignmentFile: epics/EPIC-001/story.yaml | Duration: session"

## Core Actions
- Parse assignment file path from $ARGUMENTS
- Load and parse assignment file content
- Extract embedded_config section if present
- Validate embedded configuration format
- Apply configuration overrides to current session
- Set configuration duration and expiration
- Log configuration changes for transparency

## Embedded Config Format

### In YAML Assignment Files
```yaml
embedded_config:
  autonomy_level: "L3"
  blocking_enabled: false
  git_privacy: true
  default_reviewer: "@Security-Engineer"
```

### In Markdown Task Files
```markdown
---
embedded_config:
  peer_review_required: true
  capability_threshold: 0.8
---
```

## Configuration Overrides

### Behavioral Overrides
- **autonomy_level**: Temporary autonomy changes
- **blocking_enabled**: Non-blocking mode for specific work
- **peer_review_required**: Force/skip reviews
- **capability_threshold**: Adjust validation threshold

### Git Workflow Overrides
- **git_privacy**: Assignment-specific privacy mode
- **branch_protection**: Bypass for emergency fixes
- **commit_template**: Custom commit message format

### Role Assignment Overrides
- **default_reviewer**: Assignment-specific reviewer
- **specialist_creation**: Enable/disable for assignment
- **role_validation**: Strict/relaxed validation

## Duration Types

### Temporary
- Applied for single operation
- Reverts after command completion
- Used for one-time overrides

### Session
- Applied for current session
- Persists until system reset
- Most common usage pattern

### Persistent
- Applied permanently to project
- Written to project config file
- Requires explicit removal

## Configuration Precedence
1. **Active Embedded Config** (highest)
2. **Project Config**
3. **User Global Config**
4. **System Defaults** (lowest)

## Validation
- Verify embedded config syntax
- Validate configuration keys
- Check value types and ranges
- Ensure no conflicting settings

## Configuration Tracking
- Log all applied overrides
- Track configuration source
- Monitor expiration times
- Provide rollback capability

## Integration
- Used by workflow templates during assignment processing
- Referenced by behavioral modules for context-aware behavior
- Integrated with configuration hierarchy system
- Supports dynamic behavior adaptation
- Connected to learning system for pattern capture

## Quality Standards
- Clear override visibility
- Automatic expiration handling
- No permanent system corruption
- Rollback capability for safety
- Audit trail for all configuration changes