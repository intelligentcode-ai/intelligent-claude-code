# MCP Configuration Patterns

**MANDATORY:** Enable projects to configure their own MCP servers while maintaining file-based defaults. Auto-correct violations.

@./configuration-patterns.md

## Configuration Schema

**MCP Integrations Configuration Structure:**
- **memory:** provider: "mcp__memory", enabled: true, fallback: "file-based", config: {}
- **issue_tracking:** provider: "mcp__github", enabled: true, fallback: "file-based", project: "owner/repo", config: {}
- **documentation:** provider: "user-custom-mcp", enabled: true, fallback: "file-based", config: { base_path: "docs/" }

## Detection Pattern

**MANDATORY:** All behaviors MUST check for MCP configuration before operations

**Universal Provider Selection Pattern:**
1. Check if mcp_integrations.[operation].enabled = true
2. If enabled AND provider exists:
   - Try specified MCP provider
   - If provider available: Use MCP provider with config
   - Else: Log degradation warning, use file-based fallback
3. Otherwise: Use file-based default

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