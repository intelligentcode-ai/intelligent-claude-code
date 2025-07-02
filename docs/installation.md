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

**That's it.** Your virtual development team is ready.

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

# Test team activation
@PM Status check
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