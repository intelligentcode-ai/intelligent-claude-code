# Virtual Development Team for Claude Code

Transform Claude Code into an intelligent virtual development team with 12 specialized roles, Git workflow integration, and autonomous technical decision-making.

## What This Does

Enables Claude Code to operate as a complete virtual development team:
- **12 specialized technical roles** from Requirements Engineer to Backend Tester
- **Intelligent role selection** based on project complexity
- **Complete Git workflow** with branching, MRs, and level-based approval
- **Autonomous technical decisions** while respecting user authority
- **Growing team autonomy** across 3 maturity levels

## Virtual Team Roles

**Core Team:**
- **@PM** - Project coordination and role selection
- **@Requirements-Engineer** - Technical requirements analysis
- **@Architect** - System design and technical leadership
- **@Developer** - Full-stack implementation

**Infrastructure & Data:**
- **@System-Engineer** - Server configuration and basic deployment
- **@DevOps-Engineer** - CI/CD, automation, advanced deployment
- **@Database-Engineer** - Database design and optimization
- **@Security-Engineer** - Security implementation and compliance

**Quality & Design:**
- **@Web-Designer** - UI/UX design and responsive implementation
- **@QA-Engineer** - Quality strategy and process improvement
- **@Frontend-Tester** - UI testing and responsive validation
- **@Backend-Tester** - API testing and end-to-end validation

## Key Features

### Intelligent Role Selection
Team scales based on project complexity:
- **Static Website:** 6 roles (PM, Requirements, Architect, Developer, Designer, Frontend-Tester)
- **Web Application:** 8 roles (adds Database-Engineer, Backend-Tester)
- **Enterprise SaaS:** All 12 roles for complete coverage

### Git Workflow Integration
Complete Git process with level-based autonomy:
```bash
# Level 1: User approval required
git checkout -b feature/auth-system
git commit -m "auth: Implement JWT authentication"
# Wait for user approval before push

# Level 3: Full autonomy
git checkout -b feature/performance-optimization
git commit -m "api: Add Redis caching layer"
git push origin feature/performance-optimization
# Architect reviews and approves MR automatically
```

### Team Maturity Levels
**Level 1 - New Team:** User approves everything
**Level 2 - Learning Team:** Team handles details, user approves architecture
**Level 3 - Experienced Team:** Full technical autonomy, Architect approves MRs

### Direct Role Communication
```
@PM Break down this e-commerce platform
@Architect Design scalable microservices architecture
@Database-Engineer Optimize user query performance
@Security-Engineer Implement OAuth2 authentication
@DevOps-Engineer Set up Kubernetes deployment
```

## Installation

### Prerequisites (Control Machine Only)
- **Ansible** installed (auto-detected in common locations)
- **SSH access** to remote machines (key or password)
- **Make** command available

### Supported Platforms
- **macOS**: Homebrew, MacPorts, Python installations
- **Linux**: Package manager or pip installations
- **Windows**: Use WSL (Windows Subsystem for Linux) or Docker

**Windows Users:**
```powershell
# Option 1: Use WSL
wsl make install

# Option 2: Use Docker
docker run -it -v ${PWD}:/work ansible/ansible make install
```

### How It Works
- Ansible runs ONLY on your control machine
- Uses SSH to execute commands on targets
- **NO Ansible or special software needed on target machines**
- Target only needs: SSH server and write permissions

### Target Requirements
- **SSH server** (standard on all Unix systems)
- **Write permissions** to installation directory
- **That's it!** No Ansible, no special tools, nothing else!

### Install
```bash
git clone https://github.com/ksamaschke/intelligent-claude-code
cd intelligent-claude-code
make install                      # Local user scope
make install PATH=/project        # Local project
make install HOST=server          # Remote with SSH key
make install HOST=server PASS=pwd # Remote with password
```

**Note:** Ansible runs from your machine - no software needed on targets!

## How to Use

### Adding to Your Project
Your project CLAUDE.md receives a single import line:
```markdown
# Virtual Development Team for Claude Code
@~/.claude/modes/virtual-team.md

<!-- Your existing project configuration preserved -->
```

## Usage Examples

### Simple Website
```
User: "Build a portfolio website with Jekyll"
@PM: Analyzing - assigning @Requirements-Engineer, @Architect, @Developer, @Web-Designer, @Frontend-Tester
@Requirements-Engineer: Technical requirements - responsive design, fast loading, portfolio showcase
@Architect: Recommending Hugo over Jekyll for performance - 3x faster builds
@Developer: Implementing Hugo site with optimized images and responsive layout
@Web-Designer: Creating modern design system with mobile-first approach
@Frontend-Tester: Validating responsive breakpoints and accessibility compliance
```

### Complex Application
```
User: "Build real-time analytics dashboard"
@PM: Enterprise complexity - activating full 12-role team
@Requirements-Engineer: Real-time data requirements, user interaction patterns
@Architect: Microservices with event streaming, time-series database
@Database-Engineer: InfluxDB for time-series, PostgreSQL for user data
@DevOps-Engineer: Kubernetes deployment with auto-scaling
@Security-Engineer: Authentication, data encryption, audit logging
[Autonomous implementation with Git workflow]
```

## Technical Focus

**What the team handles autonomously:**
- All implementation decisions
- Technology choices (databases, frameworks, tools)
- Security implementation approaches
- Performance optimization strategies
- Git workflow and code organization

**What requires user decision:**
- Major architecture choices (microservices vs monolith)
- Feature scope and business priorities
- Significant technology changes affecting timeline

## File Structure

```
~/.claude/
├── config.md                 # Virtual team configuration
├── modes/
│   └── virtual-team.md       # Complete virtual team mode
├── personas/
│   └── personas.md           # 14+ additional specialist personas
└── behaviors/
    ├── enhanced-behaviors.md
    ├── git-safety-behaviors.md
    └── documentation-behaviors.md
```

## Git Workflow Standards

### Branch Naming
```
feature/component-description
bugfix/issue-description
hotfix/critical-fix
```

### Commit Standards
```
[component]: Brief description

Examples:
auth: Implement JWT token validation
database: Add user schema migration
frontend: Update responsive design layout
```

**Never mentions Claude Code or AI assistance in commits**

### MR Approval Process
- **Level 1:** User approves all MRs
- **Level 2:** User approves significant, PM approves minor
- **Level 3:** Architect approves all MRs

## Why Virtual Team Mode

### Professional Development Process
- Proper Git workflow with branching and MRs
- Code review process through role-based approval
- Autonomous technical decision-making
- Growing team capabilities over time

### Comprehensive Coverage
- Complete development lifecycle from requirements to deployment
- Specialized expertise for each technical domain
- Quality assurance through dedicated testing roles
- Security and infrastructure handled professionally

### Scalable Complexity
- Right-sized team for project scope
- Autonomous operation reduces user burden
- Professional processes without bureaucracy
- Focus on technical excellence

## When Things Go Wrong

### Getting Your Team Back

Claude Code has known configuration persistence issues. Use these fallback methods:

#### Quick Recovery (30 seconds)
```bash
# Test if team is active
@PM Status check

# If no response, use this minimal activation:
@PM coordinate, @Architect design, @Developer implement. Technical focus, Git workflow, autonomous decisions.
```

#### Full Recovery
```bash
# Reinstall configuration
./install.sh  # Choose option 3 (User scope)

# Verify installation
ls ~/.claude/CLAUDE.md && echo "✅ Config restored"
```

#### Recovery Guide
- `RECOVERY.md` - Complete recovery procedures and activation methods

#### Session Recovery
```bash
# After Claude Code restart
@PM Review progress file 999_progress/<date>.md and reactivate team context
```

**Why This Happens:** Claude Code's configuration system has documented persistence issues, especially after system events, auto-compacting, or session timeouts.

## License

MIT License - see LICENSE file for details.