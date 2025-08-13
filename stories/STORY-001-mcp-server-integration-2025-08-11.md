# STORY-001: MCP Server Integration via Ansible/Make

**Status:** Ready  
**Priority:** High  
**Created:** 2025-08-11  
**Requestor:** User  
**Epic:** Installation Enhancement  
**System Context:** Installation and Configuration System

## Story
As a developer using intelligent-claude-code, I want to define MCP servers in a JSON structure that gets gracefully integrated into ~/.claude/settings.json via Make/Ansible, so that I can configure MCP servers for my projects without manual editing of settings files.

## Background
MCP (Model Context Protocol) servers enhance Claude's capabilities. Currently, users must manually configure these in ~/.claude/settings.json. This story automates the integration of MCP server configurations while respecting existing settings and avoiding duplicates.

## Requirements

### Core Functionality

1. **MCP Server Configuration File**
   - Support JSON file similar to ~/Work/Engineering/claude-mcps/mcpServers.json
   - Default location: `{project_root}/mcp-servers.json`
   - Override via Make parameter: `MCP_CONFIG_PATH=/path/to/config.json`
   
2. **JSON Structure**
   ```json
   {
     "mcpServers": {
       "sequential-thinking": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
       },
       "playwright": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-playwright"]
       },
       "custom-server": {
         "command": "node",
         "args": ["/path/to/server.js"],
         "env": {
           "API_KEY": "${CUSTOM_API_KEY}"
         }
       }
     }
   }
   ```

3. **Environment Variable Resolution**
   - Support placeholders like `${VARIABLE_NAME}` in MCP config
   - Read from API keys file via Make parameter: `API_KEYS_FILE=/path/to/.env`
   - Resolve placeholders to actual values before integration
   - Store resolved values in settings.json (not placeholders)

4. **Graceful Integration**
   - Read existing ~/.claude/settings.json
   - Merge MCP servers without duplicating existing entries
   - Preserve all other settings unchanged
   - Handle missing settings.json (create if needed)
   - Backup existing settings before modification

5. **Make Interface**
   ```bash
   # Use project-local mcp-servers.json
   make install-mcp
   
   # Use external config file
   make install-mcp MCP_CONFIG_PATH=/path/to/mcps.json
   
   # With API keys file
   make install-mcp API_KEYS_FILE=/path/to/.env
   
   # Combined
   make install-mcp MCP_CONFIG_PATH=/path/to/mcps.json API_KEYS_FILE=/path/to/.env
   ```

6. **Ansible Implementation**
   - Task to read MCP configuration file
   - Task to read API keys file if provided
   - Task to resolve placeholders
   - Task to read existing settings.json
   - Task to merge configurations gracefully
   - Task to write updated settings.json
   - Task to validate final configuration

### Technical Requirements

1. **Configuration Merge Logic**
   - If MCP server exists in settings.json, skip (don't overwrite)
   - If new MCP server, add to mcpServers object
   - Maintain JSON formatting and structure
   - Preserve comments if possible (or document loss)

2. **Error Handling**
   - Validate JSON syntax before processing
   - Check file permissions for ~/.claude/settings.json
   - Handle missing MCP config file gracefully
   - Report which servers were added/skipped
   - Rollback on critical errors

3. **Placeholder Resolution**
   - Parse ${VARIABLE} patterns in JSON values
   - Look up in provided API keys file
   - Error if placeholder can't be resolved
   - Support nested objects with placeholders

## Acceptance Criteria

- [ ] Make target `install-mcp` exists and works
- [ ] Reads mcp-servers.json from project root by default
- [ ] Accepts MCP_CONFIG_PATH parameter for external config
- [ ] Accepts API_KEYS_FILE parameter for environment variables
- [ ] Resolves ${PLACEHOLDER} values from env file
- [ ] Gracefully merges with existing ~/.claude/settings.json
- [ ] Does not duplicate existing MCP server entries
- [ ] Preserves all other settings unchanged
- [ ] Creates settings.json if it doesn't exist
- [ ] Backs up existing settings before modification
- [ ] Reports which servers were added/skipped
- [ ] Validates JSON syntax before/after merge
- [ ] Handles errors gracefully with clear messages
- [ ] Documentation updated with usage instructions

## Example Scenarios

### Scenario 1: First-time Setup
1. User has no ~/.claude/settings.json
2. Runs `make install-mcp` with project mcp-servers.json
3. System creates settings.json with MCP servers
4. All servers from config are added

### Scenario 2: Adding to Existing Config
1. User has settings.json with some MCP servers
2. Runs `make install-mcp` with new servers
3. System merges only new servers
4. Existing servers remain unchanged
5. Reports: "Added 2 servers, skipped 1 (already exists)"

### Scenario 3: Using Environment Variables
1. MCP config has `"API_KEY": "${OPENAI_KEY}"`
2. User runs `make install-mcp API_KEYS_FILE=.env`
3. System reads OPENAI_KEY from .env file
4. Stores resolved value in settings.json

## Technical Considerations

1. **JSON Manipulation**
   - Use jq or Python json module in Ansible
   - Maintain proper formatting
   - Handle complex nested structures

2. **File Operations**
   - Atomic writes to prevent corruption
   - Proper file permissions (user-only read/write)
   - Cross-platform path handling

3. **Validation**
   - Schema validation for MCP server structure
   - Required fields: command, args
   - Optional fields: env, cwd

## Out of Scope
- Automatic MCP server installation (npm install)
- MCP server health checks
- Runtime configuration updates
- GUI configuration interface

## Dependencies
- Ansible JSON manipulation modules
- Make file in project
- Access to ~/.claude/ directory
- jq or Python for JSON processing

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Ansible playbook tasks created
- [ ] Makefile targets implemented
- [ ] Error handling tested
- [ ] Documentation complete
- [ ] Manual testing passed
- [ ] Edge cases handled