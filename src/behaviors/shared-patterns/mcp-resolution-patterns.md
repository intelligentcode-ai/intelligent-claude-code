# MCP Resolution Patterns

**MANDATORY:** Resolve MCP placeholders in templates with actual configuration values. Auto-correct violations.

## MCP Placeholder Resolution

**MCP Placeholders in Templates:**
- `[MCP_MEMORY_ENABLED]` → mcp_integrations.memory.enabled value
- `[MCP_MEMORY_PROVIDER]` → mcp_integrations.memory.provider value
- `[MCP_ISSUE_ENABLED]` → mcp_integrations.issue_tracking.enabled value
- `[MCP_ISSUE_PROVIDER]` → mcp_integrations.issue_tracking.provider value
- `[MCP_DOCS_ENABLED]` → mcp_integrations.documentation.enabled value
- `[MCP_DOCS_PROVIDER]` → mcp_integrations.documentation.provider value

## Configuration Loading

**MCP Configuration Sources:**
1. **icc.config.json**: mcp_integrations section
2. **Default Values**: false and "file-based" when not configured

## Resolution Process

**MCP Resolution Steps:**
1. **Load MCP Configuration**: Read mcp_integrations from icc.config.json
2. **Check Memory Integration**: Get memory.enabled and memory.provider
3. **Check Issue Integration**: Get issue_tracking.enabled and issue_tracking.provider
4. **Check Documentation Integration**: Get documentation.enabled and documentation.provider
5. **Apply Defaults**: Use false/file-based for missing configurations
6. **Resolve Placeholders**: Replace all MCP placeholders with actual values
7. **Validate Resolution**: Ensure no MCP placeholders remain unresolved

## Default Values

**When MCP Configuration Missing:**
- `[MCP_MEMORY_ENABLED]` → `false`
- `[MCP_MEMORY_PROVIDER]` → `"file-based"`
- `[MCP_ISSUE_ENABLED]` → `false`
- `[MCP_ISSUE_PROVIDER]` → `"file-based"`
- `[MCP_DOCS_ENABLED]` → `false`
- `[MCP_DOCS_PROVIDER]` → `"file-based"`

## Configuration Examples

### Full MCP Configuration
```json
{
  "mcp_integrations": {
    "memory": {
      "provider": "mcp__memory",
      "enabled": true,
      "fallback": "file-based"
    },
    "issue_tracking": {
      "provider": "mcp__github",
      "enabled": true,
      "project": "owner/repo"
    },
    "documentation": {
      "provider": "mcp__confluence",
      "enabled": true,
      "config": {
        "base_path": "docs/"
      }
    }
  }
}
```

### Partial MCP Configuration
```json
{
  "mcp_integrations": {
    "memory": {
      "enabled": true,
      "provider": "mcp__memory"
    }
  }
}
```
Note: issue_tracking and documentation use defaults when not specified.

### No MCP Configuration
```json
{}
```
Note: No mcp_integrations section - all use defaults (false, file-based).

## Resolution Examples

### Memory Integration Resolution
```yaml
# Template placeholder:
mcp_operations:
  memory:
    condition: "[MCP_MEMORY_ENABLED]"
    provider: "[MCP_MEMORY_PROVIDER]"

# With configuration:
mcp_operations:
  memory:
    condition: true
    provider: "mcp__memory"

# Without configuration:
mcp_operations:
  memory:
    condition: false
    provider: "file-based"
```

## Error Handling

**Resolution Errors:**
- `MCP_CONFIG_INVALID`: Invalid mcp_integrations structure
- `MCP_PROVIDER_UNKNOWN`: Unrecognized provider name
- `MCP_PLACEHOLDER_UNRESOLVED`: MCP placeholder not resolved

**Graceful Fallback:**
- Invalid configuration: Use file-based defaults
- Missing provider: Use file-based fallback
- Resolution errors: Default to disabled with file-based operations

## Integration Points

### With AgentTask Generation
- MCP resolution happens during placeholder resolution phase
- Applied after configuration loading, before template completion
- All MCP placeholders resolved before AgentTask creation

### With Template System
- MCP placeholders exist in all template sizes
- Resolution applied universally across templates
- Maintains template structure while resolving values

---
*MCP resolution patterns for template placeholder resolution*