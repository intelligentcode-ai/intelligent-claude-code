# MCP Integration Guide

Complete guide for configuring and using Model Context Protocol (MCP) servers with the Intelligent Claude Code framework.

## Overview

MCP integration enables projects to connect with external systems while maintaining robust file-based fallbacks. This powerful feature allows you to:

- **Memory Integration**: Use external memory providers like graphs or databases instead of file-based storage
- **Issue Tracking**: Connect directly with GitHub, GitLab, or Jira for seamless issue management
- **Documentation Systems**: Integrate with external documentation platforms or content management systems
- **Custom Providers**: Create and integrate your own MCP servers for specialized workflows

**IMPORTANT**: File-based operations remain the default. MCP integration is completely opt-in and projects work perfectly without it.

## Configuration Schema

Configure MCP integrations in your project's `CLAUDE.md` file using the `mcp_integrations` section:

### Complete Configuration Structure

```yaml
mcp_integrations:
  memory:
    provider: "mcp__memory"         # Provider identifier
    enabled: true                   # Enable/disable integration
    fallback: "file-based"          # Always file-based for reliability
    config:                         # Provider-specific configuration
      graph_database: "neo4j"
      retention_days: 90
  
  issue_tracking:
    provider: "mcp__github"
    enabled: true
    fallback: "file-based"
    project: "owner/repository"     # Required for issue providers
    config:
      labels: ["ai-generated", "intelligent-claude-code"]
      default_assignee: "username"
      board_id: "project-board-123"
  
  documentation:
    provider: "mcp__confluence"
    enabled: true
    fallback: "file-based"
    config:
      space_key: "ENGINEERING"
      parent_page: "API Documentation"
      base_path: "docs/"
```

## Provider Types

### Memory Providers

Memory providers handle learning storage and retrieval operations:

#### Built-in Memory Provider
```yaml
mcp_integrations:
  memory:
    provider: "mcp__memory"
    enabled: true
    fallback: "file-based"
    config:
      # Neo4j graph database (recommended)
      database_url: "${NEO4J_URI}"
      username: "${NEO4J_USER}"
      password: "${NEO4J_PASSWORD}"
```

**Operations Supported**:
- `mcp__memory__create_entities` - Store new learning patterns
- `mcp__memory__search_nodes` - Query existing knowledge
- `mcp__memory__get_relations` - Find related concepts
- `mcp__memory__update_observation` - Update learning entries

**Fallback Behavior**: If MCP provider unavailable, automatically uses `memory/` directory structure with topic-based organization.

### Issue Tracking Providers

Connect with external issue tracking systems for story and bug management:

#### GitHub Integration
```yaml
mcp_integrations:
  issue_tracking:
    provider: "mcp__github"
    enabled: true
    fallback: "file-based"
    project: "your-org/your-repo"
    config:
      labels: ["ai-generated", "story", "bug"]
      default_assignee: "team-lead"
      milestone: "Sprint 2024.1"
      board_id: "project-board-123"
```

**Environment Variables Required**:
```bash
export GITHUB_TOKEN="ghp_your_personal_access_token"
export GITHUB_API_URL="https://api.github.com"  # Optional, defaults to public GitHub
```

**Operations Supported**:
- `mcp__github__create_issue` - Create GitHub issues
- `mcp__github__update_issue` - Update existing issues
- `mcp__github__search_issues` - Query issues
- `mcp__github__sync_status` - Sync completion status

#### GitLab Integration
```yaml
mcp_integrations:
  issue_tracking:
    provider: "mcp__gitlab"
    enabled: true
    fallback: "file-based"
    project: "group/project"
    config:
      labels: ["ai-generated", "enhancement"]
      milestone: "v2.1.0"
      iteration: "2024-W12"
      board_id: 456
```

**Environment Variables Required**:
```bash
export GITLAB_TOKEN="glpat_your_project_token"
export GITLAB_URL="https://gitlab.com"  # Or your GitLab instance
```

#### Jira Integration
```yaml
mcp_integrations:
  issue_tracking:
    provider: "mcp__jira"
    enabled: true
    fallback: "file-based"
    project: "ENG"
    config:
      issue_types:
        story: "Story"
        bug: "Bug" 
        task: "Task"
      epic_link: "ENG-1234"
      default_assignee: "john.doe@company.com"
```

**Environment Variables Required**:
```bash
export JIRA_URL="https://company.atlassian.net"
export JIRA_EMAIL="your-email@company.com"
export JIRA_API_TOKEN="your_api_token"
```

**Fallback Behavior**: If MCP provider unavailable, creates local files in `stories/` and `bugs/` directories with external issue references stored in YAML frontmatter.

### Documentation Providers

Integrate with external documentation systems:

#### Custom Documentation Provider
```yaml
mcp_integrations:
  documentation:
    provider: "mcp__confluence"
    enabled: true
    fallback: "file-based"
    config:
      space_key: "ENGINEERING"
      parent_page: "API Documentation"
      base_path: "docs/"
      template_id: "123456789"
```

#### Notion Integration
```yaml
mcp_integrations:
  documentation:
    provider: "mcp__notion"
    enabled: true
    fallback: "file-based"
    config:
      database_id: "${NOTION_DATABASE_ID}"
      parent_page: "System Documentation"
```

**Environment Variables Required**:
```bash
export NOTION_API_KEY="secret_your_notion_integration_token"
export NOTION_DATABASE_ID="your_database_id"
```

**Fallback Behavior**: If MCP provider unavailable, creates and maintains files in `docs/` directory with standard markdown format.

## Installation Configuration

### MCP Server Installation

When installing the framework, provide MCP server configurations to automatically integrate with Claude:
You can use `make clean-install` with the same MCP arguments for a full reset on macOS/Linux.

#### Create MCP Configuration File

Create `config/mcps.json` with your MCP server definitions:

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "memory-graph": {
      "command": "python",
      "args": ["/path/to/your/memory-server.py"],
      "env": {
        "NEO4J_URI": "${NEO4J_URI}",
        "NEO4J_USER": "${NEO4J_USER}",
        "NEO4J_PASSWORD": "${NEO4J_PASSWORD}"
      }
    },
    "github-integration": {
      "command": "node",
      "args": ["/path/to/github-mcp-server.js"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}",
        "GITHUB_API_URL": "${GITHUB_API_URL}"
      }
    }
  }
}
```

#### Install with MCP Integration

```bash
# Linux/macOS
make install MCP_CONFIG=./config/mcps.json

# Windows PowerShell
.\install.ps1 install -McpConfig ./config/mcps.json
```

### Environment Variables

Set required environment variables before installation:

```bash
# Memory provider credentials
export NEO4J_URI="bolt://localhost:7687"
export NEO4J_USER="neo4j"
export NEO4J_PASSWORD="your-password"

# GitHub integration
export GITHUB_TOKEN="ghp_your_personal_access_token"

# GitLab integration  
export GITLAB_TOKEN="glpat_your_project_token"
export GITLAB_URL="https://gitlab.com"

# Jira integration
export JIRA_URL="https://company.atlassian.net"
export JIRA_EMAIL="your-email@company.com"
export JIRA_API_TOKEN="your_api_token"

# Install with all integrations
make install MCP_CONFIG=./config/mcps.json
```

## Fallback Behavior

The framework guarantees robust operation through comprehensive fallback mechanisms:

### Automatic Fallback Triggers

1. **MCP Provider Unavailable**: Server not responding or not configured
2. **Authentication Failures**: Invalid credentials or expired tokens
3. **Network Issues**: Connectivity problems or timeouts
4. **Configuration Errors**: Invalid provider settings or missing parameters

### Fallback Operations

| Operation | MCP Provider | Fallback Behavior |
|-----------|-------------|-------------------|
| **Memory Storage** | `mcp__memory__create_entities` | Create `memory/[topic]/[subtopic].md` files |
| **Memory Search** | `mcp__memory__search_nodes` | Search local `memory/` directory structure |
| **Issue Creation** | `mcp__github__create_issue` | Create `stories/` or `bugs/` local files |
| **Issue Updates** | `mcp__github__update_issue` | Update local files with status changes |
| **Documentation** | `mcp__confluence__create_page` | Create `docs/` markdown files |

### Fallback Quality

- **No Feature Loss**: All functionality available in file-based mode
- **Seamless Transition**: Users experience no workflow interruption
- **Data Preservation**: All information captured regardless of provider status
- **Sync Capability**: When MCP providers return, data can be synchronized

## Real Configuration Examples

### Complete Startup Configuration

Here's a production-ready configuration for a software development team:

#### CLAUDE.md Configuration
```yaml
# Project Overview
project_overview: |
  Full-stack web application with microservices architecture
  using React frontend and Node.js backend services.

# MCP Integrations
mcp_integrations:
  memory:
    provider: "mcp__memory"
    enabled: true
    fallback: "file-based"
    config:
      database_url: "${NEO4J_URI}"
      retention_days: 365
      indexing: "full-text"
  
  issue_tracking:
    provider: "mcp__github"
    enabled: true
    fallback: "file-based"
    project: "mycompany/webapp"
    config:
      labels: ["ai-generated", "needs-review"]
      default_assignee: "tech-lead"
      board_id: "project-board-789"
      auto_milestone: true
  
  documentation:
    provider: "mcp__confluence"
    enabled: true
    fallback: "file-based"
    config:
      space_key: "WEBAPP"
      parent_page: "Technical Documentation"
      base_path: "docs/"
      auto_publish: true
```

#### MCP Servers Configuration (config/mcps.json)
```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "memory-graph": {
      "command": "docker",
      "args": ["run", "-p", "8000:8000", "memory-mcp-server:latest"],
      "env": {
        "NEO4J_URI": "${NEO4J_URI}",
        "NEO4J_USER": "${NEO4J_USER}",
        "NEO4J_PASSWORD": "${NEO4J_PASSWORD}",
        "LOG_LEVEL": "info"
      }
    },
    "github-integration": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}",
        "GITHUB_REPO": "mycompany/webapp"
      }
    },
    "confluence-docs": {
      "command": "python",
      "args": ["-m", "confluence_mcp_server"],
      "env": {
        "CONFLUENCE_URL": "${CONFLUENCE_URL}",
        "CONFLUENCE_EMAIL": "${CONFLUENCE_EMAIL}",
        "CONFLUENCE_API_TOKEN": "${CONFLUENCE_API_TOKEN}",
        "SPACE_KEY": "WEBAPP"
      }
    }
  }
}
```

#### Environment Setup Script (.env.mcp)
```bash
#!/bin/bash
# MCP Integration Environment Variables

# Neo4j Memory Database
export NEO4J_URI="bolt://localhost:7687"
export NEO4J_USER="neo4j"
export NEO4J_PASSWORD="dev-password-123"

# GitHub Integration
export GITHUB_TOKEN="ghp_1234567890abcdef1234567890abcdef"

# Confluence Documentation
export CONFLUENCE_URL="https://mycompany.atlassian.net/wiki"
export CONFLUENCE_EMAIL="team@mycompany.com"
export CONFLUENCE_API_TOKEN="ATATT3x..."

echo "MCP environment variables loaded"
```

#### Installation Process
```bash
# 1. Set up environment
source .env.mcp

# 2. Validate configuration
python -m json.tool config/mcps.json

# 3. Install with MCP integration
make install MCP_CONFIG=./config/mcps.json

# 4. Verify installation
ls -la ~/.config/claude/settings.json
grep -A 10 "mcpServers" ~/.config/claude/settings.json
```

### Minimal Configuration

For teams wanting to try MCP integration gradually:

```yaml
# Minimal MCP Integration
mcp_integrations:
  memory:
    provider: "mcp__memory"
    enabled: false  # Start with file-based
    fallback: "file-based"
    config: {}
  
  issue_tracking:
    provider: "mcp__github"
    enabled: true   # Only enable GitHub issues
    fallback: "file-based"
    project: "username/small-project"
    config:
      labels: ["ai-generated"]
```

With simple MCP server configuration:
```json
{
  "mcpServers": {
    "github-basic": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

## Troubleshooting

### Common Configuration Issues

#### 1. Provider Authentication Failures

**Symptoms**:
- "Authentication failed" errors in logs
- MCP operations falling back to file-based consistently
- "Invalid token" warnings

**Solutions**:
```bash
# Check environment variables
echo $GITHUB_TOKEN
echo $NEO4J_PASSWORD

# Test API access manually
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user

# Regenerate tokens if needed
# GitHub: Settings → Developer settings → Personal access tokens
# GitLab: User Settings → Access Tokens
# Jira: Account settings → Security → API tokens
```

#### 2. MCP Server Connection Issues

**Symptoms**:
- "MCP server not responding" errors
- Long timeouts during operations
- Operations always falling back to file-based

**Solutions**:
```bash
# Check MCP server configuration
cat ~/.config/claude/settings.json | jq '.mcpServers'

# Test MCP server manually
npx -y @modelcontextprotocol/server-sequential-thinking --help

# Check server logs
docker logs memory-mcp-server  # For containerized servers
```

#### 3. Configuration Schema Errors

**Symptoms**:
- "Invalid mcp_integrations configuration" warnings
- Providers not being loaded
- Missing required fields errors

**Solutions**:
```yaml
# Ensure required fields are present
mcp_integrations:
  issue_tracking:
    provider: "mcp__github"    # Required
    enabled: true              # Required
    fallback: "file-based"     # Required
    project: "org/repo"        # Required for issue providers
    config: {}                 # Can be empty but must be present
```

### Performance Optimization

#### Memory Provider Performance
```yaml
mcp_integrations:
  memory:
    provider: "mcp__memory"
    enabled: true
    fallback: "file-based"
    config:
      # Optimize for frequent searches
      cache_ttl: 300        # 5-minute cache
      batch_size: 50        # Batch operations
      indexing: "lazy"      # Index on demand
      compression: true     # Compress stored data
```

#### Issue Tracking Rate Limits
```yaml
mcp_integrations:
  issue_tracking:
    provider: "mcp__github"
    enabled: true
    fallback: "file-based"
    project: "org/repo"
    config:
      # Respect API rate limits
      rate_limit_delay: 1000    # 1 second between requests
      batch_operations: true    # Batch multiple updates
      cache_responses: true     # Cache API responses
```

### Monitoring and Logging

Enable detailed MCP logging to diagnose issues:

```yaml
# Add to CLAUDE.md for debugging
debug_settings:
  mcp_logging: true
  log_level: "debug"
  log_file: "logs/mcp-integration.log"
```

Check integration status:
```bash
# View integration logs
tail -f logs/mcp-integration.log

# Check fallback statistics  
grep "FALLBACK" logs/mcp-integration.log | wc -l

# Monitor provider health
curl -s http://localhost:8000/health  # Custom MCP server health check
```

## Best Practices

### Security

1. **Environment Variables**: Always use environment variables for credentials
2. **Token Rotation**: Regularly rotate API tokens and credentials
3. **Minimal Permissions**: Grant only required permissions to integration tokens
4. **Secure Storage**: Use secure secret management for production environments

### Reliability

1. **Fallback Testing**: Regularly test fallback scenarios by temporarily disabling MCP providers
2. **Provider Health Checks**: Implement health checks for custom MCP servers
3. **Data Synchronization**: Periodically sync file-based data with MCP providers
4. **Backup Strategy**: Maintain file-based backups even when using MCP providers

### Performance

1. **Selective Integration**: Enable only needed providers to reduce overhead
2. **Caching Strategy**: Configure appropriate cache TTL values for your use case
3. **Batch Operations**: Use batch operations for bulk data operations
4. **Resource Monitoring**: Monitor MCP server resource usage and performance

### Development Workflow

1. **Start File-Based**: Begin development with file-based operations, add MCP gradually
2. **Environment Parity**: Maintain consistent MCP configuration across dev/staging/production
3. **Provider Testing**: Test MCP integrations in isolated environments before production
4. **Documentation**: Document custom MCP server configurations and requirements

## Next Steps

1. **Choose Providers**: Select MCP providers based on your team's existing tools
2. **Start Small**: Begin with a single provider (recommend memory or issue tracking)
3. **Configure Environment**: Set up required environment variables and MCP servers
4. **Install Framework**: Use `make install MCP_CONFIG=./config/mcps.json`
5. **Validate Integration**: Test operations and verify fallback behavior
6. **Monitor Performance**: Watch for integration health and performance metrics
7. **Expand Gradually**: Add additional providers as your team gains confidence

Remember: MCP integration enhances the framework's capabilities while maintaining the reliability of file-based operations as the foundation.
