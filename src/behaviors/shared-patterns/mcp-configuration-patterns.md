# MCP Configuration Patterns

**MANDATORY:** Enable projects to configure their own MCP servers while maintaining file-based defaults. Auto-correct violations.

@./configuration-patterns.md

## Configuration Schema

```yaml
mcp_integrations:
  memory:
    provider: "mcp__memory"
    enabled: true
    fallback: "file-based"
    config: {}
  issue_tracking:
    provider: "mcp__github"
    enabled: true
    fallback: "file-based"
    project: "owner/repo"
    config: {}
  documentation:
    provider: "user-custom-mcp"
    enabled: true
    fallback: "file-based"
    config:
      base_path: "docs/"
```

## Detection Pattern

**MANDATORY:** All behaviors MUST check for MCP configuration before operations

```markdown
## Universal Provider Selection Pattern
IF mcp_integrations.[operation].enabled = true:
  AND mcp_integrations.[operation].provider exists:
    TRY specified MCP provider
    IF provider_available:
      USE MCP provider with config
    ELSE:
      LOG degradation warning
      USE file-based fallback
  ELSE:
    USE file-based default
ELSE:
  USE file-based default
```

## Fallback Hierarchy

**MANDATORY:** All MCP operations MUST have file-based fallbacks

**Priority Order:**
1. **Try Primary:** Configured MCP provider
2. **Use Fallback:** File-based operations
3. **Log Degradation:** Warning for visibility

## Error Messages & Interface

**Error Messages:** MCP_UNAVAILABLE, MCP_AUTH_FAILED, MCP_TIMEOUT, MCP_CONFIG_INVALID

**Operations:** Memory (store/search/retrieve/list), Issues (create/update/search/sync), Docs (create/update/delete/list)

**Response:** success, data, error, fallback_required

## Integration & Compatibility

**Routes:** StoreInMemory/SearchMemory → memory provider, story/bug creation → issue provider, doc generation → doc provider

**Backward Compatibility:** File-based operations remain default. MCP is opt-in only. Existing projects unaffected.

---
*Concise MCP configuration patterns with file-based fallback guarantee*