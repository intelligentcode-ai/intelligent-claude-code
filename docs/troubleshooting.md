# Troubleshooting Guide

This guide covers common issues encountered when using the intelligent-claude-code system and their solutions.

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [System Initialization Problems](#system-initialization-problems)
3. [Role Assignment Errors](#role-assignment-errors)
4. [AgentTask Execution Issues](#prb-execution-issues)
5. [Memory System Problems](#memory-system-problems)
6. [Configuration Issues](#configuration-issues)
7. [Git Operation Problems](#git-operation-problems)
8. [MCP Integration Issues](#mcp-integration-issues)
9. [Performance Issues](#performance-issues)
10. [Debug Techniques](#debug-techniques)

## Installation Issues

### Ansible Not Found

**Error Message:**
```
ERROR: ansible-playbook not found!
```

**Cause:** Ansible is not installed or not in PATH.

**Solution:**
```bash
# macOS with Homebrew
brew install ansible

# Ubuntu/Debian
sudo apt update && sudo apt install ansible

# CentOS/RHEL/Fedora
sudo dnf install ansible  # or yum install ansible

# Python pip
pip install --user ansible

# Verify installation
ansible-playbook --version
```

### Permission Denied During Installation

**Error Message:**
```
Permission denied: '/Users/username/.claude/'
```

**Cause:** Insufficient permissions to write to target directory.

**Solution:**
```bash
# Fix permissions for user directory
chmod 755 ~/
mkdir -p ~/.claude
chmod 755 ~/.claude

# For project-specific installation
sudo chown -R $(whoami) /target/path
```

### Remote Installation Authentication Failed

**Error Message:**
```
Authentication failure
```

**Solutions:**

1. **SSH Key Authentication:**
```bash
# Generate SSH key if needed
ssh-keygen -t rsa -b 4096

# Copy public key to remote host
ssh-copy-id user@hostname

# Test connection
ssh user@hostname

# Install with explicit key
make install HOST=hostname USER=username KEY=~/.ssh/id_rsa
```

2. **Password Authentication:**
```bash
# Install with password
make install HOST=hostname USER=username PASS=your_password
```

### Installation Verification Failed

**Error Message:**
```
FAIL: CLAUDE.md not created
```

**Cause:** Installation didn't complete successfully.

**Debugging Steps:**
1. Check Ansible output for specific errors
2. Verify target directory is writable
3. Run installation with verbose output:
```bash
make install TARGET_PATH=./test-install 2>&1 | tee install.log
```

## System Initialization Problems

### Virtual Team System Not Responding

**Symptoms:** No response to @Role commands

**Cause:** System not properly initialized after installation.

**Solution:**
```bash
# Initialize the system
/icc-init-system

# Verify system status
/icc-system-status

# Check if CLAUDE.md import line exists
grep "@~/.claude/modes/virtual-team.md" CLAUDE.md
```

### Role Commands Not Working

**Symptoms:** @PM, @Developer commands ignored

**Diagnosis:**
1. Check if virtual team mode is loaded:
```bash
# Look for import line in CLAUDE.md
cat CLAUDE.md | grep "virtual-team.md"
```

2. Verify roles directory exists:
```bash
ls -la ~/.claude/roles/
```

**Solutions:**

1. **Missing Import Line:**
```bash
# Add import line to CLAUDE.md
echo '@~/.claude/modes/virtual-team.md' >> CLAUDE.md
```

2. **Corrupted Installation:**
```bash
# Reinstall system
make uninstall FORCE=true
make install
/icc-init-system
```

### Configuration Loading Errors

**Error Message:**
```
Failed to load configuration hierarchy
```

**Cause:** Invalid YAML in configuration files.

**Solution:**
1. Validate YAML syntax:
```bash
# Check CLAUDE.md YAML frontmatter
python -c "import yaml; yaml.safe_load(open('CLAUDE.md').read())"

# Check config.md if it exists
python -c "import yaml; yaml.safe_load(open('config.md').read())"
```

2. Fix YAML syntax errors:
- Ensure proper indentation (spaces, not tabs)
- Quote special characters
- Check for duplicate keys

## Role Assignment Errors

### Wrong Role for System Type

**Error Message:**
```
❌ Role assignment violates system nature
```

**Cause:** Assigning code-focused roles to AI-agentic systems or vice versa.

**Solution:**
```bash
# Check system nature in CLAUDE.md
grep -A 5 "system_nature:" CLAUDE.md

# For AI-AGENTIC systems, use:
@AI-Engineer    # For behavioral patterns, memory, AgentTasks
@PM             # For story breakdown
@Architect      # For system design

# For CODE-BASED systems, use:
@Developer      # For implementation
@Backend-Tester # For testing
@DevOps-Engineer # For deployment
```

### Dynamic Specialist Creation Failed

**Error Message:**
```
❌ Cannot create specialist for domain: [Domain]
```

**Cause:** Invalid domain specification or system constraints.

**Solution:**
1. Use valid domain patterns:
```bash
# Valid patterns
@React-Developer
@AWS-Engineer
@Database-Architect
@Security-Specialist

# Invalid patterns (too generic)
@Developer-Person
@Generic-Specialist
```

2. Let PM + Architect create specialists:
```bash
@PM Create specialist for React development
# System will create @React-Developer automatically
```

### Role Assignment Matrix Conflicts

**Error Message:**
```
❌ Two-factor analysis required
```

**Cause:** Role assignment without considering both project scope and work type.

**Solution:**
Use PM + Architect collaboration:
```bash
@PM analyze work type and assign appropriate specialist
# System will:
# 1. Analyze project scope (AI-AGENTIC vs CODE-BASED)
# 2. Analyze work type (implementation, security, etc.)
# 3. Create appropriate specialist
```

## AgentTask Execution Issues

### Template Not Found

**Error Message:**
```
Template not found: medium-prb-template.yaml
```

**Cause:** AgentTask templates not properly installed.

**Solution:**
1. Check template installation:
```bash
ls -la ~/.claude/prb-templates/
ls -la ./.claude/prb-templates/  # Project-specific
ls -la ./src/prb-templates/      # Source templates
```

2. Reinstall templates:
```bash
make uninstall
make install
```

3. Verify template hierarchy:
```bash
/icc-template-hierarchy
```

### Unresolved Placeholders in AgentTask

**Error Message:**
```
❌ Unresolved placeholder: [FROM_CONFIG]
```

**Cause:** AgentTask generated with unresolved template placeholders.

**Solution:**
1. Regenerate AgentTask with main agent (not subagent):
```bash
# Wrong - subagent cannot resolve placeholders
# Right - use main agent
@PM Create AgentTask for this work request
```

2. Check configuration hierarchy:
```bash
/icc-get-setting git_privacy
/icc-load-config
```

### AgentTask Size Limit Exceeded

**Error Message:**
```
❌ AgentTask too large (25 points). Break it down into smaller AgentTasks.
```

**Cause:** Single AgentTask exceeds 15 complexity points.

**Solution:**
```bash
@PM break down this large story into multiple AgentTasks
# Each AgentTask will be <15 points
# Sequential: STORY-001-AgentTask-001, STORY-001-AgentTask-002, etc.
```

### Runtime Config Lookups Blocked

**Error Message:**
```
❌ Runtime config lookup forbidden - embed values in AgentTask
```

**Cause:** AgentTask trying to load config during execution instead of having embedded values.

**Solution:**
1. Regenerate AgentTask with embedded configuration:
```bash
# AgentTasks must contain all needed config values
# Template resolution happens at generation time
```

2. Check AgentTask has embedded context:
```bash
grep -A 20 "complete_context:" your-prb-file.prb.yaml
```

## Memory System Problems

### Memory Search Not Working

**Symptoms:** `/icc-search-memory` returns no results

**Cause:** Memory system not initialized or corrupted.

**Solution:**
1. Check memory directory structure:
```bash
ls -la ./memory/
ls -la ./memory/*/
```

2. Initialize memory system:
```bash
mkdir -p ./memory/{system-design,behavioral-patterns,implementation}
```

3. Verify memory configuration:
```bash
/icc-get-setting memory_path
# Should return "./memory" or configured path
```

### Memory Storage Blocked

**Error Message:**
```
Security violation: Cannot store sensitive data
```

**Cause:** Attempting to store passwords, tokens, or sensitive information.

**Solution:**
Store location patterns, not actual values:
```bash
# Wrong
/icc-store-memory pattern "GitHub token: ghp_xyz123"

# Right
/icc-store-memory pattern "GitHub token location: ~/.config/git/common.conf"
```

### Memory Access Permissions

**Error Message:**
```
Permission denied: memory/topic/file.md
```

**Cause:** File permission issues in memory directory.

**Solution:**
```bash
# Fix memory directory permissions
find ./memory -type d -exec chmod 755 {} \;
find ./memory -type f -exec chmod 644 {} \;
```

## Configuration Issues

### Invalid Configuration Hierarchy

**Error Message:**
```
❌ Configuration hierarchy validation failed
```

**Cause:** Conflicting or invalid configuration values.

**Debugging:**
1. Check each level of hierarchy:
```bash
# System defaults (embedded in behaviors)
# User global
cat ~/.claude/config.md

# Project specific
cat ./config.md
cat ./.claude/config.md

# AgentTask embedded (check specific AgentTask file)
grep -A 10 "configuration:" prb-file.prb.yaml
```

2. Validate YAML syntax at each level:
```bash
python -c "import yaml; yaml.safe_load(open('config.md').read())"
```

### Setting Not Found

**Error Message:**
```
❌ Setting not found: custom_setting
```

**Cause:** Attempting to access undefined configuration setting.

**Solution:**
1. Check available settings:
```bash
/icc-load-config  # Loads and displays all settings
```

2. Add setting to appropriate config file:
```yaml
# In config.md or CLAUDE.md
custom_settings:
  custom_setting: "value"
```

### Configuration Cache Issues

**Symptoms:** Changes to config not taking effect

**Cause:** Configuration cache not refreshing.

**Solution:**
```bash
# Force reload configuration
/icc-load-config

# Check cache timestamps
ls -la ~/.claude/.cache/config-* 2>/dev/null || echo "No cache files"
```

## Git Operation Problems

### Git Privacy Filter Not Working

**Symptoms:** AI mentions appearing in commits despite git_privacy=true

**Cause:** Privacy filter not properly applied.

**Solution:**
1. Verify setting:
```bash
/icc-get-setting git_privacy
# Should return: true
```

2. Check commit message before committing:
```bash
# Look for AI mentions that should be stripped
git log -1 --oneline
```

3. Fix privacy setting:
```yaml
# In CLAUDE.md or config.md
git_privacy: true
```

### Branch Protection Conflicts

**Error Message:**
```
❌ Direct commits to main branch blocked
```

**Cause:** branch_protection=true blocks direct main branch commits.

**Solution:**
1. Create feature branch:
```bash
git checkout -b feature/your-work-description
# Make changes
git commit -m "Your changes"
git push origin feature/your-work-description
```

2. Or disable protection (not recommended):
```yaml
# In config.md
branch_protection: false
```

### Remote Push Authentication

**Error Message:**
```
Authentication failed for remote repository
```

**Solution:**
1. Check GitHub authentication:
```bash
# Verify GitHub CLI authentication
gh auth status

# Or check Git credentials
git config --list | grep credential
```

2. Set up authentication:
```bash
# GitHub CLI
gh auth login

# Or Git credentials
git config --global credential.helper store
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## MCP Integration Issues

### MCP Server Configuration Failed

**Error Message:**
```
MCP configuration validation failed
```

**Cause:** Invalid MCP servers configuration JSON.

**Solution:**
1. Validate JSON syntax:
```bash
python -c "import json; json.load(open('./config/mcps.json'))"
```

2. Check MCP configuration format:
```json
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["path/to/server.js"],
      "env": {
        "API_KEY": "value"
      }
    }
  }
}
```

3. Install with MCP configuration:
```bash
make install MCP_CONFIG=./config/mcps.json
```

### MCP Environment Variables Missing

**Error Message:**
```
Required environment variable not found: API_KEY
```

**Solution:**
1. Set environment variables:
```bash
export API_KEY="your-api-key"
export OTHER_VAR="value"
```

2. Add to shell profile:
```bash
echo 'export API_KEY="your-api-key"' >> ~/.bashrc
source ~/.bashrc
```

### MCP Server Connection Failed

**Symptoms:** MCP servers not responding

**Debugging:**
1. Check server status:
```bash
# Test MCP server manually
node path/to/server.js --check
```

2. Check installation logs:
```bash
make install MCP_CONFIG=./config/mcps.json 2>&1 | tee mcp-install.log
grep -i error mcp-install.log
```

## Performance Issues

### Slow AgentTask Generation

**Symptoms:** AgentTask creation takes >30 seconds

**Causes & Solutions:**

1. **Large Memory Directory:**
```bash
# Check memory size
du -sh ./memory/

# Archive old entries if >100MB
find ./memory -name "*.md" -mtime +90 -exec mv {} ./memory/archive/ \;
```

2. **Complex Project Analysis:**
```bash
# Simplify CLAUDE.md if too complex
# Focus on essential configuration only
```

3. **Network Issues (Remote Installation):**
```bash
# Use local installation for development
make install TARGET_PATH=./local-claude
```

### Memory System Performance

**Symptoms:** Memory searches taking >5 seconds

**Solutions:**
1. **Organize Memory Topics:**
```bash
# Group related memories
mkdir -p ./memory/{performance,security,implementation}
# Move specific memories to appropriate topics
```

2. **Clean Up Memory Files:**
```bash
# Remove duplicate entries
# Consolidate related patterns
# Archive old, unused memories
```

### High CPU Usage During Execution

**Symptoms:** System using >90% CPU during AgentTask execution

**Solutions:**
1. **Reduce Concurrent Operations:**
```yaml
# In config.md
max_concurrent_subagents: 2  # Reduce from default 5
```

2. **Optimize Complex AgentTasks:**
```bash
# Break down large AgentTasks (<15 complexity points)
@PM break down this complex work into smaller AgentTasks
```

## Debug Techniques

### Enable Verbose Logging

```bash
# Installation debugging
make install 2>&1 | tee debug-install.log

# System debugging
/icc-system-status --verbose

# Memory system debugging
/icc-memory-status --debug
```

### Configuration Debugging

```bash
# Show all configuration
/icc-load-config

# Show specific setting
/icc-get-setting [key]

# Show configuration hierarchy
ls -la ~/.claude/
ls -la ./.claude/
ls -la ./
```

### AgentTask Debugging

```bash
# Validate AgentTask structure
/icc-validate-prb path/to/prb-file.prb.yaml

# Check AgentTask template
/icc-validate-template medium-prb

# Show AgentTask hierarchy
/icc-template-hierarchy
```

### Memory System Debugging

```bash
# Check memory structure
find ./memory -type f -name "*.md" | head -10

# Test memory search
/icc-search-memory "test query"

# Show memory statistics
/icc-memory-status
```

### Git Debugging

```bash
# Check git configuration
git config --list | grep claude

# Verify remote configuration
git remote -v

# Check branch status
git status
git branch -a
```

## Recovery Procedures

### Complete System Reset

If the system is completely broken:

```bash
# 1. Force uninstall
make uninstall FORCE=true

# 2. Clean any remaining files
rm -rf ~/.claude
rm -rf ./.claude

# 3. Clean test installations
make clean

# 4. Fresh installation
make install

# 5. Initialize system
/icc-init-system

# 6. Verify installation
make test
```

### Partial Recovery

For specific component issues:

```bash
# Reset configuration only
rm ~/.claude/config.md
/icc-load-config

# Reset memory only
rm -rf ./memory/.cache
mkdir -p ./memory

# Reset templates only
rm -rf ~/.claude/prb-templates
make install  # Reinstalls templates
```

### Data Backup and Restore

Before major changes:

```bash
# Backup user data
tar -czf claude-backup-$(date +%Y%m%d).tar.gz ~/.claude ./memory

# Restore if needed
tar -xzf claude-backup-YYYYMMDD.tar.gz
```

## Getting Help

### System Information

When reporting issues, provide:

```bash
# System information
uname -a
python --version
ansible-playbook --version

# Installation information
ls -la ~/.claude/
ls -la ./.claude/

# Configuration status
/icc-system-status
/icc-load-config

# Git status
git status
git remote -v
```

### Log Collection

```bash
# Collect installation logs
make install 2>&1 | tee install-$(date +%Y%m%d).log

# Collect system logs
/icc-system-status --verbose > system-status-$(date +%Y%m%d).log

# Collect memory system logs
/icc-memory-status > memory-status-$(date +%Y%m%d).log
```

### Common Issue Patterns

Before reporting, check these common patterns:
1. **Permission Issues**: Usually fixed with `chmod` commands
2. **Configuration Errors**: Validate YAML syntax
3. **Installation Problems**: Try clean reinstall
4. **Authentication Issues**: Verify credentials and SSH setup
5. **Performance Issues**: Check system resources and memory usage

## Troubleshooting Checklist

When encountering issues:

- [ ] Check system status: `/icc-system-status`
- [ ] Verify installation: `ls -la ~/.claude/`
- [ ] Validate configuration: `/icc-load-config`
- [ ] Check memory system: `/icc-memory-status`
- [ ] Test basic commands: `@PM help`
- [ ] Review recent changes: `git log -5 --oneline`
- [ ] Check file permissions: `ls -la`
- [ ] Verify network connectivity (for remote operations)
- [ ] Check disk space: `df -h`
- [ ] Review system logs/error messages

This troubleshooting guide covers the most common issues encountered with the intelligent-claude-code system. For additional support or to report bugs, create an issue in the project repository with system information and detailed error descriptions.