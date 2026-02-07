---
name: mcp-config
description: Activate when setting up MCP servers, resolving MCP tool availability, or configuring fallbacks for MCP-dependent features. Configures and troubleshoots MCP (Model Context Protocol) integrations.
---

# MCP Configuration Skill

Configure and resolve MCP (Model Context Protocol) tool integrations.

## When to Use

- Setting up MCP servers
- Resolving MCP tool availability
- Configuring fallbacks for MCP features
- Troubleshooting MCP connectivity

## MCP Integration Points

### Memory Integration
```json
{
  "memory": {
    "provider": "mcp__memory",
    "enabled": false,
    "fallback": "file-based"
  }
}
```

### Issue Tracking
```json
{
  "issue_tracking": {
    "provider": "mcp__github",
    "enabled": false,
    "fallback": "file-based"
  }
}
```

### Documentation
```json
{
  "documentation": {
    "provider": "file-based",
    "enabled": true
  }
}
```

## Available MCP Tools

### Context7
- `mcp__Context7__resolve-library-id` - Find library documentation
- `mcp__Context7__query-docs` - Query library documentation

### GitHub
- `mcp__github__*` - GitHub API operations

### Brave Search
- `mcp__brave-search__brave_web_search` - Web search
- `mcp__brave-search__brave_local_search` - Local search

### Memory
- `mcp__memory__*` - Knowledge graph operations

### Playwright
- `mcp__playwright__*` - Browser automation

### Sequential Thinking
- `mcp__sequential-thinking__sequentialthinking` - Structured analysis

## Fallback Configuration

When MCP tools are unavailable:
1. Check if fallback is configured
2. Use fallback provider
3. Log degraded capability
4. Continue with reduced functionality

## MCP Resolution Process

1. **Check availability** - Is the MCP server running?
2. **Verify configuration** - Are credentials valid?
3. **Test connectivity** - Can we reach the service?
4. **Apply fallback** - Use alternative if unavailable

## Configuration Location

MCP servers configured in `~/.claude/settings.json`:
```json
{
  "mcpServers": {
    "server-name": {
      "command": "...",
      "args": ["..."]
    }
  }
}
```

## Troubleshooting

- **Server not found**: Check settings.json mcpServers
- **Connection failed**: Verify server is running
- **Auth error**: Check credentials/tokens
- **Timeout**: Increase timeout or check network
