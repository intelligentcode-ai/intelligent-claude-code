# Complete Installation Guide

## Quick Install (30 seconds)

```bash
git clone https://github.com/ksamaschke/intelligent-claude-code
cd intelligent-claude-code
make install                  # Installs to ~/.claude/
```

Your project CLAUDE.md gets one import line:
```markdown
@~/.claude/modes/virtual-team.md
```

**That's it.** Your virtual development team is ready with Level 3 autonomous operation and mandatory behavioral enforcement enabled.

### Post-Installation: Initialize Your Team
After installation, initialize the virtual team system:
```bash
icc:init    # Validates configuration, verifies components, activates team
```

The `icc:init` command will:
- ✅ Verify configuration files are properly installed
- ✅ Check all 14 core roles are available  
- ✅ Validate memory system connectivity
- ✅ Confirm tool integrations are working
- ✅ Activate Level 3 autonomous operation mode
- ✅ Enable mandatory behavioral enforcement with penalty system
- ✅ Initialize dynamic specialist creation capabilities
- ✅ Report team readiness status

### Post-Installation: Configure Settings

The system uses a hierarchical configuration system. Create settings files as needed:

#### User Global Settings (All Projects)
```bash
# Create user-wide configuration
cat > ~/.claude/config.md << 'EOF'
---
autonomy_level: "L3"        # Full autonomy mode
pm_always_active: true      # Auto-activate PM role
git_privacy: true           # Strip AI mentions from commits
blocking_enabled: false     # Non-blocking for L3 mode
---
EOF
```

#### Project-Specific Settings
```bash
# Create project configuration
cat > .claude/config.md << 'EOF'
---
autonomy_level: "L2"        # Architect approval for this project
default_branch: "develop"   # Project uses develop branch
default_reviewer: "@Security-Engineer"  # Security-focused reviews
---
EOF
```

#### Common Configuration Profiles

**L3 Autonomous Profile (Recommended for experienced users):**
```yaml
autonomy_level: "L3"
pm_always_active: true
blocking_enabled: false
git_privacy: true
```

**L2 Balanced Profile (Default):**
```yaml
autonomy_level: "L2"
pm_always_active: false
blocking_enabled: true
git_privacy: false
```

**L1 Manual Profile (Maximum control):**
```yaml
autonomy_level: "L1"
pm_always_active: false
blocking_enabled: true
branch_protection: true
```

See `docs/CONFIG.md` for complete settings documentation.

## What You Get: Level 3 Autonomous System

After installation, your system includes:

### 🤖 **Level 3 Autonomous Operation**
- **Complete Technical Autonomy**: PM makes all technical decisions independently
- **Continuous Operation**: Self-correcting quality loops without user intervention
- **Strategic Business Escalation**: Only escalates budget, timeline, stakeholder decisions
- **Non-Blocking Quality Gates**: Autonomous validation with self-correction

### 🛡️ **Mandatory Behavioral Enforcement**
- **HALT/BLOCK Patterns**: Operations stop until requirements met
- **Automatic Penalties**: -1.0 to -3.0 instant penalties for violations
- **Forced Protocol Compliance**: No bypassing allowed for any behaviors
- **Memory-First Enforcement**: HALT until memory consultation complete (-1.0P penalty)

### 🎭 **Unlimited Dynamic Specialists**
- **Context-Aware Creation**: Generates domain experts for ANY technology
- **Capability Matching**: <70% match triggers automatic specialist creation
- **Context7 Integration**: Real-time domain knowledge injection
- **AI-Specialist Requirements**: Complex AI tasks automatically routed to AI specialists

### 📊 **Dual Scoring & Learning System**
- **Real-Time Performance Tracking**: Professionalism and quality scores
- **Learning Team Principles**: First errors become learning opportunities
- **Automatic Role Replacement**: -10pts professionalism triggers replacement
- **Evidence-Based Scoring**: All score changes require documented evidence

## Installation Options

### 1. User Scope Installation (Recommended)
Installs to `~/.claude/` and works with all your projects.

```bash
make install
```

**What it does:**
- Copies virtual team configuration to `~/.claude/`
- Your projects reference the shared configuration
- Update once, benefits all projects

### 2. Project-Specific Installation
Installs directly to a specific project directory.

```bash
make install PATH=/path/to/project
```

**What it does:**
- Copies configuration to `project/.claude/`
- Self-contained installation for that project only
- Useful for team environments or isolated setups

### 3. Remote Installation
Install on remote servers via SSH.

```bash
# With SSH key authentication
make install HOST=server.example.com USER=ubuntu

# With password authentication  
make install HOST=server.example.com USER=ubuntu PASS=your_password

# Custom user and path
make install HOST=server.example.com USER=deploy TARGET_PATH=/custom/path
```

## Prerequisites

### Control Machine (Your Computer)
- **Ansible** - Auto-detected in common locations or install via:
  ```bash
  # macOS
  brew install ansible
  
  # Linux (Ubuntu/Debian)
  sudo apt install ansible
  
  # Linux (RHEL/CentOS)
  sudo yum install ansible
  
  # Python pip
  pip install ansible
  ```
- **Make** command available
- **SSH access** for remote installations

### Target Machine (Where Claude Code runs)
- **SSH server** (standard on Unix systems)
- **Write permissions** to installation directory
- **That's it!** No Ansible or special software needed

## Platform Support

### macOS
```bash
# Native support with Homebrew, MacPorts, or pip Ansible
git clone https://github.com/ksamaschke/intelligent-claude-code
cd intelligent-claude-code
make install
```

### Linux
```bash
# Works with package manager or pip Ansible installations
git clone https://github.com/ksamaschke/intelligent-claude-code
cd intelligent-claude-code
make install
```

### Windows

#### Option 1: WSL (Recommended)
```powershell
# Install WSL if not already installed
wsl --install

# Inside WSL
git clone https://github.com/ksamaschke/intelligent-claude-code
cd intelligent-claude-code
make install
```

#### Option 2: Docker
```powershell
docker run -it -v ${PWD}:/work ansible/ansible bash
# Inside container:
cd /work
make install
```

## How It Works

### Ansible Architecture
- **Ansible runs ONLY on your control machine**
- **Uses SSH to execute commands on targets**
- **No Ansible installation needed on target machines**
- **Target only needs SSH server and write permissions**

### File Deployment
```
Source: intelligent-claude-code/src/
├── CLAUDE.md                 → ~/.claude/CLAUDE.md
├── modes/virtual-team.md     → ~/.claude/modes/virtual-team.md
├── personas/personas.md      → ~/.claude/personas/personas.md
└── behaviors/               → ~/.claude/behaviors/
```

### Graceful Integration
- **Preserves existing** `~/.claude/CLAUDE.md` content
- **Adds single import line** if not present
- **Never overwrites** your existing configuration
- **Complete removal** by deleting one import line
- **Behavioral intelligence enabled** automatically for all team members

## Optional CLI Tools

### GitHub CLI (gh)
For automated GitHub PR creation and management.

**Install:**
```bash
# macOS
brew install gh

# Linux (Ubuntu/Debian)
sudo apt install gh

# Windows
winget install GitHub.cli
```

**Authentication:**
```bash
gh auth login
# OR
export GITHUB_TOKEN=your_personal_access_token
```

### GitLab CLI (glab)
For automated GitLab MR creation and management.

**Install:**
```bash
# macOS
brew install glab

# Linux
curl -s https://api.github.com/repos/profclems/glab/releases/latest | grep "browser_download_url.*linux_amd64.tar.gz" | cut -d '"' -f 4 | wget -O- | tar -xz -C /usr/local/bin glab

# Windows
winget install glab.glab
```

**Authentication:**
```bash
glab auth login
# OR
export GITLAB_TOKEN=your_personal_access_token
```

## Verification

### Test Installation
```bash
# Verify files are in place
ls ~/.claude/CLAUDE.md
ls ~/.claude/modes/virtual-team.md

# Initialize and verify system
icc:init           # Should report all components ✅

# Test team activation
@PM Status check
```

### Test Level 3 Autonomous Operation
```bash
# Verify Level 3 autonomous activation
@PM autonomous operation status

# Test mandatory behavioral enforcement
@Developer Build authentication system    # Should HALT until acceptance criteria defined

# Test dynamic specialist creation
@PM Create machine learning recommendation system    # Should auto-create @ML-Engineer

# Verify autonomous technical decisions
@PM Design and implement REST API    # Should proceed autonomously without user escalation

# Test memory-first enforcement
@Architect Review previous patterns    # Should FORCE memory consultation first

# Verify penalty system
# Try skipping required steps - should see immediate penalty application
```

### Test CLI Integration (Optional)
```bash
# Test GitHub CLI (if installed)
@PM gh status

# Test GitLab CLI (if installed)  
@PM glab status

# Test unified platform detection
@PM git status
```

## Advanced Installation

### Custom Ansible Configuration
Create `ansible.cfg` in project directory:
```ini
[defaults]
host_key_checking = False
timeout = 30
remote_user = your_username

[ssh_connection]
ssh_args = -o ControlMaster=auto -o ControlPersist=60s
```

### Multiple Remote Hosts
```bash
# Install to multiple servers
make install HOST=server1.example.com,server2.example.com USER=ubuntu
```

### Custom Installation Paths
```bash
# Install to custom directory
make install PATH=/opt/claude-code

# Install to user home subdirectory
make install PATH=~/development/.claude
```

## Troubleshooting

### System Command Issues

If `icc:init` reports configuration problems:
```bash
# Check configuration file exists
ls ~/.claude/CLAUDE.md

# Check all required files are present
ls ~/.claude/modes/virtual-team.md
ls ~/.claude/behaviors/

# Verify Level 3 autonomy configuration
grep -r "Level 3" ~/.claude/

# If files are missing, reinstall
make install
```

If system becomes unresponsive or has penalties accumulated:
```bash
icc:reset          # Clears penalties, accumulated issues, fresh autonomous restart
icc:refresh        # Updates capabilities, tool integrations, specialist definitions
```

If autonomous operation stops unexpectedly:
```bash
# Check for accumulated penalties
@PM show team scores and violations

# Clear penalty state and restart autonomy
icc:reset

# Verify Level 3 operation resumed
@PM autonomous operation status
```

### System Command Usage
```bash
icc:init           # First setup, new project activation, after installation
icc:reset          # System stuck, accumulated penalties, need fresh start  
icc:refresh        # Tool updates, configuration changes, capability sync
```

### Ansible Not Found
```bash
# Check if Ansible is in PATH
which ansible

# Install via pip if package manager unavailable
pip3 install ansible

# Or use specific Python
python3 -m pip install ansible
```

### SSH Connection Issues
```bash
# Test SSH connection manually
ssh user@hostname

# Use password authentication
make install HOST=hostname USER=username PASS=password

# Use specific SSH key
ssh-add ~/.ssh/your_key
make install HOST=hostname USER=username
```

### Permission Denied
```bash
# Ensure write permissions to target directory
make install HOST=hostname USER=username TARGET_PATH=/home/user/.claude

# Or use sudo for system-wide installation  
make install HOST=hostname USER=username TARGET_PATH=/opt/claude-code BECOME=yes
```

### Windows SSH Issues
```bash
# Enable OpenSSH on Windows
Add-WindowsCapability -Online -Name OpenSSH.Server

# Or use WSL for easier SSH access
wsl make install HOST=target-server
```

## Uninstallation

### Complete Removal
```bash
# Remove all configuration files
rm -rf ~/.claude/

# Or remove just the virtual team
# Edit ~/.claude/CLAUDE.md and delete this line:
# @~/.claude/modes/virtual-team.md
```

### Project-Specific Removal
```bash
# Remove from specific project
rm -rf /path/to/project/.claude/

# Or edit project CLAUDE.md and delete import line
```

## Security Considerations

### SSH Key Management
- Use SSH keys instead of passwords for remote installations
- Ensure proper key permissions (`chmod 600 ~/.ssh/id_rsa`)
- Consider using SSH agent for key management

### Network Security
- Ansible uses SSH (port 22) - ensure firewall allows SSH
- Consider VPN for remote installations over internet
- Use jump hosts for access to internal networks

### File Permissions
- Installation creates files with standard user permissions
- No privileged access required for user scope installation
- Review file permissions after installation if needed

---

**💡 Remember**: The installation is completely non-invasive. You can always remove the virtual team by deleting a single import line from your CLAUDE.md file.