# STORY-001: Add MCP Installation Support to Ansible Playbook

**Status:** Ready  
**Priority:** High  
**Created:** 2025-01-09  
**Requestor:** User  
**Epic:** Installation Enhancement  

## Story
As a developer using intelligent-claude-code, I want the Ansible installation playbook to automatically install required MCP servers and allow me to specify additional MCPs to install, so that I have all necessary tools available without manual setup.

## Background
The intelligent-claude-code system relies on MCP (Model Context Protocol) servers for enhanced functionality. Currently, users must manually install these MCPs after the main installation. This story aims to automate this process and make it configurable.

## Requirements

### Core MCPs to Install
The installation must check for and install these MCPs if not present:
1. **Sequential Thinking MCP** - For structured problem-solving capabilities
2. **Playwright MCP** - For browser automation and testing support

### Configuration Support
1. **Configuration File Format**
   - JSON format (matching Claude Code's native configuration)
   - Can be located in:
     - Project configuration directory (e.g., `./config/mcps.json`)
     - External directory specified by user
   
2. **Configuration Structure**
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
       "custom-mcp": {
         "command": "node",
         "args": ["/path/to/custom/mcp.js"],
         "env": {
           "API_KEY": "optional-env-var"
         }
       }
     }
   }
   ```

### Makefile Enhancements
1. **Configuration Directory Parameter**
   ```bash
   make install MCP_CONFIG_DIR=/path/to/config
   ```

2. **Project-Only Installation**
   ```bash
   make install-project PROJECT_DIR=/path/to/project
   ```
   - Installs everything to a specific project directory
   - Does not modify system-wide configuration
   - Creates project-specific `.claude/` directory structure

### Research Requirements
The implementation must research and determine:
1. **Safe Installation Methods**
   - Using Claude Code CLI commands (if available)
   - Direct manipulation of configuration JSON files
   - Proper file permissions and ownership
   
2. **Configuration Locations**
   - System-wide: `~/.config/claude/mcp.json` (or similar)
   - Project-specific: `{project}/.claude/mcp.json`
   - How to properly merge configurations

3. **Security Considerations**
   - Validate MCP sources before installation
   - Check signatures/checksums if available
   - Warn about untrusted sources
   - Sanitize configuration inputs

## Acceptance Criteria
- [ ] Ansible playbook checks for required MCPs (Sequential Thinking, Playwright)
- [ ] Missing required MCPs are automatically installed
- [ ] User can provide JSON configuration for additional MCPs
- [ ] Makefile accepts MCP_CONFIG_DIR parameter
- [ ] Configuration can be in project or external directory
- [ ] Makefile supports project-only installation mode
- [ ] Installation safely modifies Claude Code configuration
- [ ] Installation validates MCP sources for security
- [ ] Documentation updated with MCP installation instructions
- [ ] Error handling for failed MCP installations
- [ ] Rollback capability if installation fails

## Technical Considerations
1. **Discovery Method**: Research how to detect installed MCPs
2. **Installation Method**: Determine safest approach (CLI vs config editing)
3. **Configuration Merge**: Handle existing vs new MCP configurations
4. **Permissions**: Ensure proper file permissions after installation
5. **Validation**: Verify MCP functionality after installation

## Dependencies
- Research on Claude Code MCP installation methods
- Understanding of Claude Code configuration structure
- Access to MCP package registries or sources

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Code reviewed by @DevOps-Engineer
- [ ] Security review by @Security-Engineer  
- [ ] Installation tested on fresh system
- [ ] Installation tested with existing MCPs
- [ ] Project-only installation tested
- [ ] Documentation complete
- [ ] Rollback tested