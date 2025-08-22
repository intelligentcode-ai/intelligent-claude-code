# Installation Guide

This comprehensive guide covers the complete installation process for the intelligent-claude-code system, including prerequisites, installation procedures, configuration, and verification steps.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Installation Methods](#installation-methods)
4. [Configuration](#configuration)
5. [System Initialization](#system-initialization)
6. [Verification](#verification)
7. [Post-Installation Setup](#post-installation-setup)
8. [Advanced Configuration](#advanced-configuration)
9. [Troubleshooting](#troubleshooting)
10. [Uninstallation](#uninstallation)

## Quick Start

For users who want to get started immediately:

```bash
# 1. Install Ansible (if not already installed)
brew install ansible  # macOS
# OR
sudo apt install ansible  # Ubuntu/Debian

# 2. Clone the repository
git clone https://github.com/your-org/intelligent-claude-code.git
cd intelligent-claude-code

# 3. Install the system
make install

# 4. Initialize the virtual team system
/icc-init-system

# 5. Verify installation
@PM help
```

That's it! The system is now ready to use. Continue reading for detailed installation options and configuration.

## Prerequisites

### System Requirements

**Operating Systems:**
- macOS 10.15+ (Catalina or newer)
- Ubuntu 18.04+ LTS
- Debian 9+ (Stretch or newer)
- CentOS/RHEL 7+
- Fedora 30+
- Windows Subsystem for Linux (WSL2)

**Hardware Requirements:**
- Minimum: 2GB RAM, 1GB disk space
- Recommended: 4GB RAM, 2GB disk space
- For remote installation: SSH access to target systems

### Software Dependencies

**Required:**
- **Ansible** 2.9+ - Automation engine for installation
- **Git** 2.20+ - Version control system
- **Python** 3.6+ - Configuration validation and processing
- **Bash** 4.0+ - Shell environment for command execution

**Optional:**
- **GitHub CLI (gh)** - Enhanced Git operations
- **Node.js** 14+ - MCP server support
- **Docker** - Containerized development environments

### Dependency Installation

#### macOS (using Homebrew)

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install dependencies
brew install ansible git python node gh

# Verify installations
ansible-playbook --version
git --version
python3 --version
```

#### Ubuntu/Debian

```bash
# Update package index
sudo apt update

# Install dependencies
sudo apt install -y ansible git python3 python3-pip curl

# Install Node.js (optional)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Install GitHub CLI (optional)
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update && sudo apt install gh

# Verify installations
ansible-playbook --version
git --version
python3 --version
```

#### CentOS/RHEL/Fedora

```bash
# For CentOS/RHEL 7
sudo yum install -y ansible git python3 python3-pip curl

# For CentOS/RHEL 8+ or Fedora
sudo dnf install -y ansible git python3 python3-pip curl

# Install Node.js (optional)
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo dnf install -y nodejs  # or yum install for CentOS 7

# Verify installations
ansible-playbook --version
git --version
python3 --version
```

#### Python (pip installation)

If Ansible is not available through system packages:

```bash
# Install Ansible via pip
pip3 install --user ansible

# Add to PATH (add to ~/.bashrc or ~/.zshrc)
export PATH="$HOME/.local/bin:$PATH"

# Verify installation
ansible-playbook --version
```

### Pre-Installation Checklist

Before proceeding, ensure:

- [ ] All required dependencies are installed and accessible
- [ ] You have write permissions to the target installation directory
- [ ] Git is configured with your name and email
- [ ] SSH access is configured (for remote installations)
- [ ] Network connectivity is available for downloading components

## Installation Methods

The intelligent-claude-code system supports multiple installation methods to accommodate different deployment scenarios.

### Method 1: Local User Scope Installation (Recommended)

This installs the system to `~/.claude/` for the current user.

```bash
# Clone the repository
git clone https://github.com/your-org/intelligent-claude-code.git
cd intelligent-claude-code

# Install to user directory
make install

# Verify CLAUDE.md was created/updated
cat CLAUDE.md | grep "virtual-team.md"
```

**What this does:**
- Creates `~/.claude/` directory structure
- Installs behavioral patterns and templates
- Adds import line to project's `CLAUDE.md`
- Preserves existing project structure

### Method 2: Project Scope Installation

This installs everything within the current project directory.

```bash
# Install to current project
make install TARGET_PATH=.

# Check installation
ls -la ./.claude/
```

**When to use:**
- Isolated project requirements
- No user-wide installation desired
- Multiple versions needed for different projects
- Deployment to systems without user home directory access

### Method 3: Remote Installation

Install the system on remote servers via SSH.

#### SSH Key Authentication (Recommended)

```bash
# Ensure SSH key is set up
ssh-keygen -t rsa -b 4096  # if you don't have a key
ssh-copy-id user@remote-host

# Test connection
ssh user@remote-host

# Install remotely
make install HOST=192.168.1.100 USER=ubuntu
```

#### Password Authentication

```bash
# Install with password (less secure)
make install HOST=remote-host USER=username PASS=your-password
```

#### Custom SSH Key

```bash
# Use specific SSH key
make install HOST=remote-host USER=username KEY=~/.ssh/custom-key
```

#### Remote Project Installation

```bash
# Install to specific path on remote host
make install HOST=remote-host USER=username TARGET_PATH=/opt/intelligent-claude-code
```

### Method 4: MCP Server Integration

Install with Model Context Protocol server support.

#### Basic MCP Installation

```bash
# Install with MCP configuration
make install MCP_CONFIG=./config/mcps.json
```

#### MCP Configuration File Format

Create `config/mcps.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": ["node_modules/@modelcontextprotocol/server-filesystem/dist/index.js", "/path/to/allowed/directory"],
      "env": {}
    },
    "brave-search": {
      "command": "python",
      "args": ["-m", "mcp_server_brave_search"],
      "env": {
        "BRAVE_API_KEY": "${BRAVE_API_KEY}"
      }
    },
    "database": {
      "command": "node",
      "args": ["database-mcp-server/index.js"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

#### Environment Variables for MCP

```bash
# Set required environment variables
export BRAVE_API_KEY="your-brave-api-key"
export DATABASE_URL="postgresql://user:pass@localhost:5432/db"

# Install with environment validation
make install MCP_CONFIG=./config/mcps.json
```

### Installation Verification

After any installation method:

```bash
# Check installation structure
ls -la ~/.claude/           # For user scope
ls -la ./.claude/           # For project scope

# Verify import line was added
grep "@~/.claude/modes/virtual-team.md" CLAUDE.md

# Test basic functionality
/icc-system-status
```

## Configuration

### Project Configuration

The primary configuration is done through `CLAUDE.md` in your project root.

#### Basic CLAUDE.md Setup

```markdown
# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Brief description of your project and its purpose.

## Configuration

```yaml
---
# Git Settings
git_privacy: true              # Strip AI mentions from commits
branch_protection: true        # Protect main branch
default_branch: "main"         # Primary branch name

# System Behavior
autonomy_level: "L2"          # L1=Manual, L2=Guided, L3=Autonomous
memory_integration: true       # Enable learning system
specialist_creation: true      # Enable dynamic specialists

# Directory Structure
directory_structure:
  story_path: "stories"        # User stories location
  prb_path: "prbs"            # PRB execution files
  memory_path: "memory"        # Learning storage
  docs_path: "docs"           # Documentation
---

## Development Guidelines

Add project-specific development guidelines here.
```

#### Advanced Configuration Options

```yaml
---
# Performance Settings
max_concurrent_subagents: 5    # Parallel execution limit
template_validation: true      # Enforce PRB template compliance
complexity_override: false     # Allow manual complexity override

# Security Settings
memory_security_scan: true     # Scan memory for sensitive data
file_access_restriction: true  # Limit file operations to project

# Integration Settings
github_integration: true       # Enable GitHub operations
mcp_servers_enabled: true     # Enable MCP server integration

# Custom Directory Paths
directory_structure:
  story_path: "requirements"   # Custom story location
  bug_path: "issues"          # Custom bug location
  prb_path: "blueprints"      # Custom PRB location
  memory_path: "knowledge"    # Custom memory location
  prb_template_path: "templates"  # Custom template location
---
```

### User Global Configuration

Create `~/.claude/config.md` for user-wide settings:

```yaml
---
# User Preferences
default_autonomy_level: "L2"
preferred_git_privacy: true
default_branch_protection: true

# Development Style
coding_style: "clean-code"
testing_framework: "jest"
documentation_level: "comprehensive"

# Git Configuration
git_author_name: "Your Name"
git_author_email: "your.email@example.com"
commit_style: "conventional"

# Editor Preferences
editor: "vscode"
terminal: "bash"
---
```

### Environment-Specific Configuration

#### Development Environment

```yaml
# config/development.yml
---
autonomy_level: "L1"          # Manual approval for safety
debug_mode: true              # Enhanced logging
test_mode: true               # Include test scaffolding
memory_detailed_logging: true # Detailed memory operations
---
```

#### Production Environment

```yaml
# config/production.yml
---
autonomy_level: "L3"          # Full autonomous operation
git_privacy: true             # Enhanced privacy
performance_mode: true        # Optimized for speed
error_reporting: true         # Comprehensive error capture
---
```

## System Initialization

After installation, initialize the virtual team system:

### Basic Initialization

```bash
# Initialize the system
/icc-init-system

# Expected output:
# ✓ Configuration hierarchy loaded
# ✓ Memory system initialized  
# ✓ Role system activated
# ✓ Command registration complete
# ✓ Virtual team system ready
```

### Advanced Initialization

```bash
# Initialize with specific configuration
/icc-init-system --config=production.yml

# Initialize with memory reconstruction
/icc-init-system --rebuild-memory

# Initialize with verbose logging
/icc-init-system --verbose
```

### Initialization Verification

```bash
# Check system status
/icc-system-status

# Expected output:
# System Status: HEALTHY
# ├── Configuration: Loaded from 3 sources
# ├── Memory System: 0 patterns, 0 topics
# ├── Role System: 14 core roles available
# ├── Templates: 5 complexity levels ready
# └── Git Integration: Configured for branch protection
```

## Verification

### Installation Verification

Run the comprehensive test suite to verify installation:

```bash
# Run all installation tests
make test

# Expected output:
# Testing Ansible syntax validation...
# ✅ Ansible syntax validation passed!
# 
# Testing installation...
# ✅ Installation tests passed!
# 
# Testing idempotency...
# ✅ Idempotency test passed!
# 
# Testing conservative uninstall...
# ✅ Conservative uninstall test passed!
# 
# Testing force uninstall...
# ✅ Force uninstall test passed!
# 
# Testing install after uninstall...
# ✅ Reinstall test passed!
```

### Functional Verification

Test core system functionality:

#### 1. Role System Verification

```bash
# Test project management
@PM help
# Expected: PM role responds with available commands

# Test architecture guidance
@Architect review system design
# Expected: Architect provides design feedback

# Test development coordination
@Developer status
# Expected: Developer reports readiness
```

#### 2. PRB System Verification

```bash
# Test PRB creation
@PM create PRB for user authentication
# Expected: PRB generated with proper template

# Check PRB structure
ls -la prbs/ready/
# Expected: PRB file with proper naming convention
```

#### 3. Memory System Verification

```bash
# Test memory search
/icc-search-memory authentication
# Expected: Search results or "No patterns found"

# Test memory storage
/icc-store-memory learning "Installation completed successfully"
# Expected: Pattern stored in memory/

# Verify memory structure
ls -la memory/
# Expected: Topic directories created
```

#### 4. Configuration System Verification

```bash
# Test configuration loading
/icc-load-config
# Expected: Configuration hierarchy displayed

# Test specific setting retrieval
/icc-get-setting git_privacy
# Expected: Configuration value returned

# Test configuration validation
python3 -c "import yaml; yaml.safe_load(open('CLAUDE.md').read())"
# Expected: No errors (valid YAML)
```

### Integration Verification

#### GitHub Integration

```bash
# Test GitHub CLI integration
gh auth status
# Expected: Authentication status

# Test repository operations
gh repo view
# Expected: Repository information
```

#### Git Operations

```bash
# Test git configuration
git config --list | grep claude
# Expected: Git settings if configured

# Test branch protection
git checkout main
git checkout -b test-branch
# Expected: Branch operations work correctly
```

#### MCP Server Verification (if configured)

```bash
# Test MCP server configuration
cat ~/.claude/mcp-servers.json
# Expected: Valid MCP server configuration

# Test MCP server connectivity (manual verification)
# Check that MCP servers respond correctly
```

### Performance Verification

```bash
# Test response times
time /icc-system-status
# Expected: <2 seconds response time

# Test memory performance
time /icc-search-memory "test"
# Expected: <3 seconds search time

# Test PRB generation performance
time @PM create simple PRB for documentation update
# Expected: <10 seconds generation time
```

## Post-Installation Setup

### Initial Project Setup

#### 1. Create Project Structure

```bash
# Create recommended directories
mkdir -p {stories,prbs/{ready,completed},memory,docs}

# Create initial story (optional)
cat > stories/STORY-001-system-setup-$(date +%Y-%m-%d).md << 'EOF'
# System Setup Story

## Description
Set up the intelligent-claude-code system for this project.

## Acceptance Criteria
- [ ] System installed and configured
- [ ] Basic verification completed
- [ ] Team familiar with @Role commands
- [ ] First PRB successfully executed

## Notes
This story helps verify the system is working correctly.
EOF
```

#### 2. Configure Git Integration

```bash
# Set up git configuration (if not already done)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Configure GitHub CLI (optional but recommended)
gh auth login

# Test git integration
git status
```

#### 3. Initialize Memory System

```bash
# Create initial memory structure
mkdir -p memory/{behavioral-patterns,implementation,configuration}

# Store first learning
/icc-store-memory installation "System successfully installed on $(date)"
```

### Team Onboarding

#### 1. Introduce Core Concepts

```bash
# Demonstrate basic role usage
@PM explain the virtual team system
@Architect describe the PRB system
@Developer show available commands
```

#### 2. Create Sample Work

```bash
# Break down initial story
@PM break down stories/STORY-001-system-setup-*

# Check generated PRBs
ls -la prbs/ready/
```

#### 3. Execute First PRB

```bash
# Execute the generated PRB
# This will be done by the appropriate specialist based on PRB assignment
```

### Best Practices Setup

#### 1. Configure Development Workflow

```yaml
# Add to CLAUDE.md
development_workflow:
  - "Always create stories before implementation"
  - "Use @PM for story breakdown into PRBs"
  - "Execute PRBs via assigned specialists"
  - "Capture learnings in memory system"
  - "Review and document architectural decisions"
```

#### 2. Set Up Quality Gates

```yaml
# Add to CLAUDE.md  
quality_gates:
  - "All PRBs must be under 15 complexity points"
  - "Memory patterns captured for reusable solutions"
  - "Configuration changes documented"
  - "Security review for sensitive operations"
```

#### 3. Configure Automation

```yaml
# Add to CLAUDE.md
automation_settings:
  auto_prb_generation: true
  memory_auto_capture: true  
  complexity_auto_analysis: true
  template_auto_selection: true
```

## Advanced Configuration

### Custom Role Creation

Create project-specific specialist roles:

```bash
# Create custom specialist directory
mkdir -p .claude/agents/custom/

# Create custom role definition
cat > .claude/agents/custom/data-scientist.md << 'EOF'
# Data Scientist Specialist

## Expertise
- Statistical analysis and modeling
- Machine learning algorithms
- Data visualization and reporting
- ETL pipeline design

## Behavioral Patterns
- Focus on data-driven decision making
- Emphasize statistical significance
- Document methodology and assumptions
- Validate models with appropriate metrics
EOF
```

### Environment-Specific Configurations

#### Development Environment

```bash
# Create development configuration
cat > config/development.yml << 'EOF'
---
environment: development
autonomy_level: "L1"
debug_mode: true
test_coverage_required: true
memory_verbose_logging: true
git_privacy: false
EOF
```

#### Staging Environment

```bash
# Create staging configuration  
cat > config/staging.yml << 'EOF'
---
environment: staging
autonomy_level: "L2"  
performance_monitoring: true
integration_testing: true
deployment_validation: true
git_privacy: true
EOF
```

#### Production Environment

```bash
# Create production configuration
cat > config/production.yml << 'EOF'
---
environment: production
autonomy_level: "L3"
monitoring_enabled: true
error_reporting: comprehensive
backup_enabled: true
security_scanning: true  
git_privacy: true
EOF
```

### MCP Server Advanced Configuration

#### Multiple MCP Servers

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": ["@modelcontextprotocol/server-filesystem", "/allowed/path"],
      "env": {}
    },
    "database": {
      "command": "python",
      "args": ["-m", "database_mcp_server"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}",
        "DATABASE_TIMEOUT": "30"
      }
    },
    "web-scraper": {
      "command": "node", 
      "args": ["web-scraper-mcp/index.js"],
      "env": {
        "API_RATE_LIMIT": "100",
        "USER_AGENT": "IntelligentClaudeCode/1.0"
      }
    }
  }
}
```

#### MCP Environment Management

```bash
# Create environment file for MCP
cat > .env.mcp << 'EOF'
# Database Configuration
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
DATABASE_TIMEOUT=30

# API Keys
BRAVE_API_KEY=your_brave_api_key
OPENWEATHER_API_KEY=your_weather_api_key

# Service Configuration
API_RATE_LIMIT=100
USER_AGENT=IntelligentClaudeCode/1.0
EOF

# Source before installation
source .env.mcp
make install MCP_CONFIG=./config/mcps.json
```

### Custom Template Development

#### Create Custom PRB Template

```yaml
# custom-nano-prb-template.yaml
id: "custom-nano-prb"
type: custom-nano-prb
complexity: minimal
priority: "[PRIORITY_LEVEL]"
title: "[ROLE] [DESCRIPTION]"

complete_context:
  project_root: "[PROJECT_ROOT]"
  system_nature: "[SYSTEM_NATURE]" 
  configuration: "[ALL-SETTINGS]"
  critical_files: "[CRITICAL_FILES]"
  user_requirements: "[USER_REQUIREMENTS]"

requirements:
  functional:
    - "[FUNCTIONAL_REQUIREMENT_1]"
  processual:
    - "Apply git_privacy setting for commits"
    - "Follow branch protection strategy"
  technical:
    - "Single-file modification"

execution_process:
  - step: "Create feature branch"
    action: "[BRANCH_CREATION]"
  - step: "Implement change"
    action: "[IMPLEMENTATION]"
  - step: "Commit with privacy filter"
    action: "[GIT_COMMIT]"

validation_checklist:
  - "Single file modified"
  - "Change is minimal and focused"
  - "No breaking changes introduced"
  - "Commit message follows conventions"
```

#### Install Custom Template

```bash
# Copy to template directory
cp custom-nano-prb-template.yaml ~/.claude/prb-templates/

# Or project-specific
mkdir -p .claude/prb-templates/
cp custom-nano-prb-template.yaml .claude/prb-templates/

# Verify template loading
/icc-template-hierarchy
```

## Troubleshooting

### Common Installation Issues

See the [Troubleshooting Guide](./troubleshooting.md) for detailed solutions to common problems.

#### Quick Fixes

**Ansible Not Found:**
```bash
# macOS
brew install ansible

# Ubuntu  
sudo apt install ansible

# Python pip
pip3 install --user ansible
```

**Permission Denied:**
```bash
# Fix permissions
chmod 755 ~/
mkdir -p ~/.claude
chmod 755 ~/.claude
```

**Import Line Not Added:**
```bash
# Manually add import line
echo '@~/.claude/modes/virtual-team.md' >> CLAUDE.md
```

### Installation Validation

```bash
# Quick validation script
cat > validate-install.sh << 'EOF'
#!/bin/bash
echo "Validating installation..."

# Check CLAUDE.md import
if grep -q "@~/.claude/modes/virtual-team.md" CLAUDE.md; then
    echo "✓ CLAUDE.md import line present"
else
    echo "✗ CLAUDE.md import line missing"
fi

# Check system initialization  
if /icc-system-status >/dev/null 2>&1; then
    echo "✓ System initialization successful"
else
    echo "✗ System initialization failed"
fi

# Check role system
if @PM help >/dev/null 2>&1; then
    echo "✓ Role system operational" 
else
    echo "✗ Role system not responding"
fi

echo "Validation complete"
EOF

chmod +x validate-install.sh
./validate-install.sh
```

## Uninstallation

### Conservative Uninstall (Default)

Removes system files but preserves user data:

```bash
# Local uninstall
make uninstall

# Remote uninstall
make uninstall HOST=remote-host USER=username
```

**What is preserved:**
- User configuration files
- Memory and learning data  
- Project-specific data
- Custom templates and roles

**What is removed:**
- System behavioral patterns
- Default templates
- Core role definitions
- Import lines from CLAUDE.md

### Force Uninstall

Completely removes all system components:

```bash
# Force uninstall (removes everything)
make uninstall FORCE=true

# Remote force uninstall
make uninstall HOST=remote-host USER=username FORCE=true
```

**Warning:** This removes ALL system data including:
- User configurations
- Memory and learning data
- Custom templates and roles
- All `.claude/` directories

### Manual Cleanup

If automated uninstall fails:

```bash
# Remove system directories
rm -rf ~/.claude/modes/
rm -rf ~/.claude/behaviors/
rm -rf ~/.claude/roles/
rm -rf ~/.claude/prb-templates/

# Remove import lines (optional)
sed -i.bak '/@~\/\.claude\/modes\/virtual-team\.md/d' CLAUDE.md

# Complete removal (equivalent to FORCE=true)
rm -rf ~/.claude/
rm -rf ./.claude/
```

### Reinstallation After Uninstall

```bash
# Clean reinstall
make uninstall FORCE=true
make clean
make install
/icc-init-system

# Verify clean installation
make test
```

## Next Steps

After successful installation:

1. **Read the User Guide**: `docs/user-guide.md`
2. **Explore PRB System**: `docs/prb-system-guide.md`
3. **Configure Your Project**: Update `CLAUDE.md` with project specifics
4. **Create Your First Story**: Add stories and let @PM break them down
5. **Join the Community**: Contribute patterns and improvements

## Getting Help

- **Documentation**: Check `docs/` directory for comprehensive guides
- **Troubleshooting**: See `docs/troubleshooting.md` for common issues
- **Community**: Join discussions and share experiences
- **Support**: Create issues for bugs or feature requests

The intelligent-claude-code system is now ready to transform your development workflow with intelligent virtual team coordination!