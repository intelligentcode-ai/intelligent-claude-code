# Transform Claude Code into Your Development Team

**One import line. Twelve specialists. Zero compromise.**

Turn Claude Code into an intelligent virtual development team that scales from simple websites to enterprise applications. Get professional Git workflows, autonomous technical decisions, and growing team expertise - all through a single, non-invasive configuration.

## What You Get

🚀 **12 Expert Roles** - From Requirements Engineer to DevOps, each with deep domain expertise  
⚡ **Smart Team Scaling** - 6 roles for websites, 12 for enterprise SaaS  
🔄 **Professional Git Workflow** - Branching, MRs, automated versioning  
🎯 **Direct Communication** - `@Developer fix this bug` `@Architect design this system`  
📈 **Growing Autonomy** - Team learns and handles more over time  
🔗 **GitHub + GitLab** - Unified commands work with both platforms

## Quick Start

### Install (30 seconds)
```bash
git clone https://github.com/ksamaschke/intelligent-claude-code
cd intelligent-claude-code
make install                  # Local user install
# OR
make install PATH=/project    # Add to specific project
```

**Your project gets one import line:**
```markdown
# Virtual Development Team
@~/.claude/modes/virtual-team.md
```

### Start Building
```bash
@PM Build me a portfolio website with Jekyll
@Architect Design a scalable e-commerce API
@Developer Implement user authentication
@DevOps-Engineer Set up automated deployment
```

**That's it.** Your team is active and ready to build.

## How It Works

### Your Team Scales Automatically
- **Portfolio Site:** 6 specialists handle design, implementation, testing
- **Web App:** 8 specialists add database and backend testing
- **Enterprise SaaS:** All 12 specialists for complete coverage

### Professional Git Workflow
```bash
# Your team follows proper development practices
git checkout -b feature/user-auth
git commit -m "auth: Add JWT authentication system"
@PM mr create  # Creates PR/MR automatically
@PM mr merge   # Merges after review
```

### Growing Team Intelligence
- **Level 1:** Team asks for everything
- **Level 2:** Team handles implementation, asks for architecture
- **Level 3:** Team makes all technical decisions independently

### Awesome Features
✨ **Smart Versioning** - Automatic version bumps and changelog generation  
🔍 **Change Detection** - Keyword analysis determines branching needs  
🔀 **Unified Git Platform** - Same commands work for GitHub and GitLab  
🛡️ **Workflow Enforcement** - Prevents messy commits to main branch  
📊 **Progress Tracking** - Single progress file per day, zero document sprawl

## Team Roles

**Core Team:**
- **@PM** - Team coordination and role selection
- **@Requirements-Engineer** - Business requirements analysis
- **@Architect** - System design and technical leadership
- **@Developer** - Full-stack implementation

**Infrastructure & Data:**
- **@System-Engineer** - Server configuration and deployment
- **@DevOps-Engineer** - CI/CD, automation, orchestration
- **@Database-Engineer** - Database design and optimization
- **@Security-Engineer** - Security implementation and compliance

**Quality & Design:**
- **@Web-Designer** - UI/UX design and responsive implementation
- **@QA-Engineer** - Quality strategy and process improvement
- **@Frontend-Tester** - UI testing and responsive validation
- **@Backend-Tester** - API testing and end-to-end validation

## Real-World Examples

### Building a Portfolio Website
```bash
User: "Create a portfolio website with modern design"
@PM: Assigning 6 specialists - Requirements, Architect, Developer, Designer, Frontend-Tester
@Requirements-Engineer: Analyzing portfolio requirements - responsive, fast, showcase-focused
@Architect: Recommending Hugo static site generator - 3x faster than Jekyll
@Developer: Implementing optimized Hugo site with responsive images
@Web-Designer: Creating modern design system with mobile-first approach
@Frontend-Tester: Validating all breakpoints and accessibility compliance
```

### Scaling to Enterprise SaaS
```bash
User: "Build real-time analytics dashboard for enterprise clients"
@PM: Enterprise complexity detected - activating full 12-role team
@Requirements-Engineer: Real-time data requirements, multi-tenant architecture
@Architect: Microservices with event streaming, time-series database design
@Database-Engineer: InfluxDB for metrics, PostgreSQL for user management
@DevOps-Engineer: Kubernetes deployment with auto-scaling policies
@Security-Engineer: Multi-tenant isolation, encryption, audit logging
# Team continues with autonomous implementation and Git workflow
```

## Essential Commands

### Get Started
```bash
@PM init                     # Analyze project and configure team
@PM Build me a [project]     # Start any project with intelligent role selection
```

### Manage Versions
```bash
@PM version                  # Show current version
@PM version bump minor       # Smart version increment with changelog
```

### Git Operations
```bash
@PM mr create               # Create PR/MR (works with GitHub and GitLab)
@PM mr merge                # Merge with proper workflow
```

**📖 [Complete Command Reference](docs/commands.md)**

## Why Choose Virtual Team Mode?

### 🎯 **Focus on Building, Not Managing**
Your team handles technical decisions autonomously. You focus on features and business goals while specialists manage implementation details, security, testing, and deployment.

### 📈 **Grows With Your Project**
Start with 6 specialists for a simple website. Scale to 12 for enterprise applications. The team composition adapts automatically based on project complexity.

### 🔧 **Professional Git Workflow**
No more messy commits or broken main branches. Your team follows proper branching, creates merge requests, and maintains clean commit history automatically.

### ⚡ **Zero Learning Curve**
Simple @-notation gets you started immediately. `@Developer fix this bug` or `@Architect design this system` - it's that intuitive.

## Installation & Setup

### Quick Install
```bash
git clone https://github.com/ksamaschke/intelligent-claude-code
cd intelligent-claude-code
make install                  # Installs to ~/.claude/
```

### Non-Invasive by Design
- **Single import line** added to your project
- **Preserves existing setup** completely
- **Remove anytime** by deleting one line
- **No environment variables** or hidden configs

### Platform Support
- **macOS/Linux:** Native support
- **Windows:** WSL or Docker
- **Remote servers:** SSH-based installation

**🔧 [Complete Installation Guide](docs/installation.md)**

## ⚠️ Critical: Context Compacting Recovery

**Claude Code has known context persistence issues.** When Claude Code compacts context or restarts sessions, your virtual team may become unresponsive or fail to switch roles properly.

### 🚨 **IMMEDIATE SOLUTION**
```bash
@PM restart
```

**If `@PM restart` doesn't work:**
```bash
@PM **CHANGE** THE ROLES!
```

**If PM still won't delegate properly:**
```bash
# Emergency role activation sequence
@PM coordinate, @Architect design, @Developer implement. Technical focus, Git workflow, autonomous decisions.
```

**Ultimate fallback:**
```bash
# Exit Claude Code session and restart, then Resume
# This forces complete context reload
```

### 📋 **When You Need This**
- Team stops responding to @-notation commands
- **Roles not switching properly** (PM keeps implementing instead of delegating)
- After Claude Code session timeouts or interruptions
- After aggressive context compacting
- Virtual team seems "stuck" or unresponsive

### ⚡ **Quick Recovery Checklist**
1. `@PM restart` - Primary recovery method
2. `@PM **CHANGE** THE ROLES!` - Force role switching if restart fails
3. Emergency role activation sequence if still stuck
4. **Ultimate**: Exit Claude Code → Restart → Resume session

**💡 Save this command**: Always start troubleshooting with `@PM restart`

## Troubleshooting

### Team Not Responding?
```bash
# Quick recovery (30 seconds)
@PM restart                     # Primary solution for context compacting
@PM Status check                # Test if team is active after restart
```

### GitHub/GitLab Issues?
```bash
@PM git status                  # Check platform and authentication
gh auth login                   # Fix GitHub authentication
glab auth login                 # Fix GitLab authentication
```

**🆘 [Complete Recovery Guide](RECOVERY.md)**

## Getting Started

### 1. Install
```bash
git clone https://github.com/ksamaschke/intelligent-claude-code
cd intelligent-claude-code && make install
```

### 2. Activate
Your project CLAUDE.md gets one line:
```markdown
@~/.claude/modes/virtual-team.md
```

### 3. Build
```bash
@PM Build me a portfolio website
@PM Create a REST API with authentication
@PM Set up CI/CD pipeline
```

**That's it.** Your virtual development team is ready to build anything from static sites to enterprise applications.

---

**⭐ Transform your Claude Code experience today - professional development workflows with zero compromise.**

## What's New

**v2.5.0** - GitHub + GitLab unified support  
**v2.4.0** - GitHub CLI integration with workflow enforcement  
**v2.3.0** - Automated versioning and changelog generation  
**v2.0.0** - Complete 12-role virtual team implementation  

**📋 [Complete Version History](src/version-history.md)**

## License

MIT License - see LICENSE file for details.