# MCP Server Integration - Troubleshooting Guide

This guide helps resolve common issues with MCP server integration during installation.

## Quick Diagnostics

### 1. Check Integration Status
```bash
# Check if settings.json was created/updated
ls -la ~/.config/claude/settings.json

# View current MCP servers
cat ~/.config/claude/settings.json | grep -A 20 "mcpServers"

# Check for backup files (created automatically)
ls -la ~/.config/claude/settings.json.backup.*
```

### 2. Review Error Logs
```bash
# Check integration error log
cat ~/.config/claude/mcp-integration-error.log

# Check Ansible output for detailed errors
# (Run installation with -v flag for verbose output)
```

## Common Issues & Solutions

### JSON Syntax Errors

**Symptoms:**
- Installation fails with "Invalid JSON syntax" error
- Error log mentions JSON parsing failure

**Solutions:**
1. **Validate JSON syntax:**
   ```bash
   # Test your MCP configuration file
   python -m json.tool config/mcps.json
   # or
   jq . config/mcps.json
   ```

2. **Common JSON mistakes:**
   - Missing commas between objects
   - Trailing commas (not allowed in JSON)
   - Unquoted keys or values
   - Mismatched brackets/braces

3. **Example of valid JSON:**
   ```json
   {
     "mcpServers": {
       "sequential-thinking": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
       }
     }
   }
   ```

### File Permission Errors

**Symptoms:**
- "Failed to read MCP configuration file" error
- "Permission denied" in error logs
- Cannot write to settings.json

**Solutions:**
1. **Check file permissions:**
   ```bash
   ls -la config/mcps.json
   ls -la ~/.config/claude/
   ```

2. **Fix configuration file permissions:**
   ```bash
   chmod 644 config/mcps.json
   ```

3. **Fix Claude directory permissions:**
   ```bash
   mkdir -p ~/.config/claude
   chmod 755 ~/.config/claude
   ```

4. **For macOS/Linux permission issues:**
   ```bash
   # Ensure proper ownership
   chown -R $USER ~/.config/claude
   ```

### Environment Variable Resolution Issues

**Symptoms:**
- Variables show as `${VARIABLE_NAME}` in final settings
- "Unresolved variable" warnings in logs
- MCP servers fail to start due to missing credentials

**Solutions:**
1. **Check environment variables are set:**
   ```bash
   echo $OPENAI_API_KEY
   echo $GITHUB_TOKEN
   # Should show actual values, not empty
   ```

2. **Set missing environment variables:**
   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   export GITHUB_TOKEN="your-token-here"
   
   # Or add to your shell profile
   echo 'export OPENAI_API_KEY="your-key"' >> ~/.bashrc
   source ~/.bashrc
   ```

3. **Alternative: Use direct values (less secure):**
   ```json
   {
     "mcpServers": {
       "custom-server": {
         "command": "node",
         "args": ["/path/to/server.js"],
         "env": {
           "API_KEY": "direct-value-here"
         }
       }
     }
   }
   ```

### MCP Configuration Structure Errors

**Symptoms:**
- "MCP configuration must contain 'mcpServers' object" error
- "Missing required 'command' field" error
- Installation succeeds but MCP servers don't work

**Solutions:**
1. **Ensure proper structure:**
   ```json
   {
     "mcpServers": {
       "server-name": {
         "command": "required-command",
         "args": ["optional", "arguments"],
         "env": {
           "OPTIONAL": "environment variables"
         }
       }
     }
   }
   ```

2. **Required fields:**
   - `mcpServers`: Top-level object (required)
   - `command`: Command to run MCP server (required for each server)
   - `args`: Command arguments (optional array)
   - `env`: Environment variables (optional object)

3. **Example with all fields:**
   ```json
   {
     "mcpServers": {
       "sequential-thinking": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
       },
       "custom-server": {
         "command": "python",
         "args": ["/path/to/mcp_server.py", "--port", "8080"],
         "env": {
           "LOG_LEVEL": "debug",
           "API_KEY": "${OPENAI_API_KEY}"
         }
       }
     }
   }
   ```

### Existing Settings.json Issues

**Symptoms:**
- "Existing settings.json is corrupted" warning
- Integration creates empty settings file
- Previous MCP configurations lost

**Solutions:**
1. **Check backup files:**
   ```bash
   # List all backup files
   ls -la ~/.config/claude/settings.json.backup.*
   
   # View backup content
   cat ~/.config/claude/settings.json.backup.1699123456
   ```

2. **Restore from backup if needed:**
   ```bash
   # Copy backup to restore original settings
   cp ~/.config/claude/settings.json.backup.1699123456 ~/.config/claude/settings.json
   ```

3. **Manual merge if necessary:**
   ```bash
   # View current and backup settings
   cat ~/.config/claude/settings.json
   cat ~/.config/claude/settings.json.backup.1699123456
   
   # Manually combine configurations
   ```

### Disk Space Issues

**Symptoms:**
- "No space left on device" error
- Installation fails during settings write
- Backup creation fails

**Solutions:**
1. **Check disk space:**
   ```bash
   df -h ~/.config
   ```

2. **Clean up if needed:**
   ```bash
   # Remove old backup files (keep recent ones)
   find ~/.config/claude -name "settings.json.backup.*" -mtime +7 -delete
   
   # Clean up system temporary files
   sudo apt autoclean  # Ubuntu/Debian
   brew cleanup        # macOS
   ```

## Recovery Procedures

### Complete Rollback
If integration fails completely:

```bash
# 1. Find the most recent backup
ls -t ~/.config/claude/settings.json.backup.* | head -1

# 2. Restore original settings
cp ~/.config/claude/settings.json.backup.1699123456 ~/.config/claude/settings.json

# 3. Verify restoration
cat ~/.config/claude/settings.json
```

### Partial Recovery
If some MCP servers were added but others failed:

```bash
# 1. Edit settings.json manually
nano ~/.config/claude/settings.json

# 2. Remove problematic MCP server entries
# 3. Keep working configurations
# 4. Save and test
```

### Clean Installation
If all else fails:

```bash
# 1. Backup current settings (if any)
cp ~/.config/claude/settings.json ~/.config/claude/settings.json.manual.backup

# 2. Remove corrupted settings
rm ~/.config/claude/settings.json

# 3. Fix MCP configuration file
# 4. Re-run installation (or use clean-install for a full reset)
make install MCP_CONFIG=./config/mcps.json
# Alternative clean reinstall (macOS/Linux):
make clean-install MCP_CONFIG=./config/mcps.json
```

## Prevention Tips

1. **Always validate JSON before installation:**
   ```bash
   python -m json.tool config/mcps.json > /dev/null && echo "JSON is valid" || echo "JSON is invalid"
   ```

2. **Test environment variables:**
   ```bash
   # Test variable resolution
   echo "API_KEY will be: ${OPENAI_API_KEY}"
   ```

3. **Use version control for MCP configurations:**
   ```bash
   git add config/mcps.json
   git commit -m "Add MCP server configuration"
   ```

4. **Keep backups of working configurations:**
   ```bash
   cp ~/.config/claude/settings.json ~/.config/claude/settings.json.working
   ```

## Getting Help

If these solutions don't resolve your issue:

1. **Check error log:** `cat ~/.config/claude/mcp-integration-error.log`
2. **Run with verbose output:** Re-run installation with detailed logging
3. **Verify file permissions:** Ensure all files are readable/writable
4. **Test individual components:** Validate JSON, test environment variables, check disk space
5. **Use backup files:** Restore to last working state if needed

## Testing MCP Integration

After successful installation, test your MCP servers:

```bash
# 1. Check settings.json content
cat ~/.config/claude/settings.json | jq '.mcpServers'

# 2. Verify no unresolved variables
grep '${' ~/.config/claude/settings.json || echo "All variables resolved"

# 3. Test MCP server commands manually
npx -y @modelcontextprotocol/server-sequential-thinking --help
```
