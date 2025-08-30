# MCP Configuration Patterns

**MANDATORY:** Enable projects to configure their own MCP servers while maintaining file-based defaults. Auto-correct violations.

**Purpose:** Framework extensibility for MCP integrations with backward compatibility
**Type:** Configuration Extension Pattern
**Status:** ACTIVE

## Imports

@./configuration-patterns.md

## Configuration Schema

Projects can add MCP integrations to their CLAUDE.md:

```yaml
mcp_integrations:
  memory:
    provider: "mcp__memory"  # or any user MCP server
    enabled: true
    fallback: "file-based"  # Always have fallback
    config:
      # Provider-specific configuration
      connection_timeout: 30000
      retry_attempts: 3
      
  issue_tracking:
    provider: "mcp__github"  # or mcp__gitlab, mcp__jira, etc.
    enabled: true
    fallback: "file-based"
    project: "owner/repo"
    config:
      auto_create_from_stories: true
      sync_status: true
      labels:
        - "intelligent-claude-code"
        - "auto-generated"
        
  documentation:
    provider: "user-custom-mcp"  # User's own MCP for project docs
    enabled: true
    fallback: "file-based"
    config:
      base_path: "docs/"
      format: "markdown"
      auto_update: true
```

## Detection Patterns

### Check for MCP Configuration
**MANDATORY:** All behaviors MUST check for MCP configuration before operations

**Detection Process:**
1. **Load Configuration:** Check project CLAUDE.md for mcp_integrations section
2. **Validate Configuration:** Ensure schema compliance and provider availability
3. **Provider Selection:** Use specified provider if enabled and available
4. **Fallback Logic:** Use file-based default if MCP unavailable or disabled
5. **Error Handling:** Log issues and gracefully degrade to fallback

### Provider Detection Logic
```markdown
## Memory Provider Selection
IF mcp_integrations.memory.enabled = true:
  AND mcp_integrations.memory.provider exists:
    TRY specified MCP provider
    IF provider_available:
      USE MCP provider with config
    ELSE:
      LOG degradation warning
      USE fallback method
  ELSE:
    USE file-based storage
ELSE:
  USE file-based storage

## Issue Tracking Provider Selection  
IF mcp_integrations.issue_tracking.enabled = true:
  AND mcp_integrations.issue_tracking.provider exists:
    TRY specified MCP provider
    IF provider_available:
      USE MCP provider for issue operations
    ELSE:
      LOG degradation warning  
      USE file-based story/bug tracking
  ELSE:
    USE file-based story/bug tracking
ELSE:
  USE file-based story/bug tracking

## Documentation Provider Selection
IF mcp_integrations.documentation.enabled = true:
  AND mcp_integrations.documentation.provider exists:
    TRY specified MCP provider
    IF provider_available:
      USE MCP provider for doc operations
    ELSE:
      LOG degradation warning
      USE file-based documentation
  ELSE:
    USE file-based documentation  
ELSE:
  USE file-based documentation
```

## Fallback Patterns

### Graceful Degradation Rules
**MANDATORY:** All MCP operations MUST have file-based fallbacks

**Degradation Hierarchy:**
1. **Try Primary:** Attempt configured MCP provider
2. **Check Fallback:** Use specified fallback method if primary fails
3. **Default Fallback:** Use file-based operations as ultimate fallback
4. **Error Logging:** Log all degradations for visibility and debugging

### Fallback Scenarios
| Scenario | Primary Action | Fallback Action | Logging |
|----------|---------------|-----------------|---------|
| MCP server unavailable | Fail gracefully | Use file-based | WARN: MCP degraded |
| MCP authentication error | Skip MCP operation | Use file-based | ERROR: MCP auth failed |
| No MCP configuration | Skip MCP check | Use file-based | INFO: Using file-based |
| Invalid MCP config | Validate and warn | Use file-based | WARN: Invalid MCP config |
| MCP timeout | Cancel operation | Use file-based | WARN: MCP timeout |

### Error Handling Patterns
**MCP_UNAVAILABLE:** "⚠️ MCP server unavailable, using file-based fallback"
**MCP_AUTH_FAILED:** "❌ MCP authentication failed, check configuration"
**MCP_TIMEOUT:** "⏰ MCP operation timeout, using file-based fallback"
**MCP_CONFIG_INVALID:** "⚠️ Invalid MCP configuration, using file-based defaults"

## Integration Points

### With Memory Operations
**Memory Storage Selection:**
- Check `mcp_integrations.memory` configuration
- Route StoreInMemory operations to configured provider
- Handle provider responses and error states
- Fallback to file-based memory/[topic]/ structure

**Memory Retrieval Selection:**
- Check `mcp_integrations.memory` configuration  
- Route SearchMemory operations to configured provider
- Parse provider-specific response formats
- Fallback to file-based search patterns

### With Issue Tracking
**Story/Bug Creation:**
- Check `mcp_integrations.issue_tracking` configuration
- Create issues via configured provider (GitHub, GitLab, Jira)
- Sync issue status with PRB execution status
- Maintain local story/bug files as backup

**Issue Synchronization:**
- Bi-directional sync between file-based and MCP provider
- Update issue status based on PRB completion
- Handle provider-specific field mappings
- Preserve local files for offline access

### With Documentation
**Documentation Generation:**
- Check `mcp_integrations.documentation` configuration
- Generate docs via configured provider
- Store in provider-configured location
- Maintain local docs/ structure for fallback

**Documentation Updates:**
- Auto-update docs when PRBs complete
- Sync with external documentation systems
- Handle provider-specific formatting requirements
- Preserve markdown format for portability

## Backward Compatibility

### File-Based Default Guarantee
**CRITICAL:** File-based operations remain the default behavior

**Compatibility Rules:**
- **No MCP Config = File-Based Works:** Projects without MCP configuration operate normally
- **MCP is Opt-In Only:** No automatic MCP integration without explicit configuration
- **Existing Projects Unaffected:** Current projects continue working without changes
- **Gradual Migration Possible:** Projects can adopt MCP integrations incrementally

### Migration Support
**Migration Patterns:**
1. **Assessment:** Evaluate current file-based patterns
2. **Configuration:** Add MCP configuration to CLAUDE.md
3. **Testing:** Validate MCP integration with fallback verification
4. **Gradual Adoption:** Enable MCP for specific operations (memory, then issues, then docs)
5. **Full Integration:** Complete MCP adoption while maintaining fallback capability

### Legacy Support
**File-Based Preservation:**
- All current memory/ structure patterns preserved
- Existing stories/ and bugs/ directory support maintained
- Current configuration loading patterns unchanged
- PRB execution patterns remain backward compatible

## Provider Interface Standards

### MCP Provider Requirements
**MANDATORY:** All MCP providers MUST support standard operations

**Memory Provider Interface:**
```yaml
required_operations:
  - store_memory(topic, content, metadata)
  - search_memory(query, filters)  
  - retrieve_memory(topic, subtopic)
  - list_topics()

response_format:
  success: true/false
  data: operation_result
  error: error_message
  fallback_required: true/false
```

**Issue Tracking Provider Interface:**
```yaml
required_operations:
  - create_issue(title, description, labels, metadata)
  - update_issue(id, status, assignee, labels)
  - search_issues(query, filters)
  - sync_status(local_id, remote_id)

response_format:
  success: true/false
  data: issue_data
  remote_id: external_issue_id
  fallback_required: true/false
```

**Documentation Provider Interface:**
```yaml
required_operations:
  - create_document(path, content, metadata)
  - update_document(path, content, metadata)
  - delete_document(path)
  - list_documents(filters)

response_format:
  success: true/false
  data: document_data
  remote_path: external_document_path
  fallback_required: true/false
```

## Configuration Validation

### Schema Validation Rules
**MANDATORY:** All MCP configurations MUST be validated before use

**Validation Checks:**
```yaml
mcp_integrations:
  required: false  # MCP is optional
  type: object
  properties:
    memory:
      type: object
      properties:
        provider:
          type: string
          required: true
        enabled:
          type: boolean
          default: false
        fallback:
          type: string
          enum: ["file-based"]
          default: "file-based"
        config:
          type: object
          required: false
```

### Configuration Loading Integration
**Integration with config-loader.md:**
- Load MCP configuration during standard configuration loading
- Validate MCP schema as part of configuration validation
- Cache MCP configuration with standard TTL rules
- Make MCP settings available via icc-get-setting command

---
*MCP configuration patterns for framework extensibility with file-based fallback guarantee*