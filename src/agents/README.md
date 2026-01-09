# Agent Definitions

This directory contains the 14 core Claude Code subagent definitions for the intelligent-claude-code virtual team system.

## Core Agent Definitions

| Agent | Role | Specialization Capability |
|-------|------|---------------------------|
| **pm.md** | Project management and coordination | Any project domain via context |
| **architect.md** | System architecture and technical design | Any architectural domain via context |
| **developer.md** | Software implementation and feature development | Any technology stack via context |
| **system-engineer.md** | Infrastructure and system operations | Any cloud/infrastructure platform via context |
| **devops-engineer.md** | CI/CD and deployment automation | Any CI/CD platform or deployment strategy via context |
| **database-engineer.md** | Database design and optimization | Any database technology via context |
| **security-engineer.md** | Security and compliance frameworks | Any security domain via context |
| **ai-engineer.md** | AI/ML systems and automation | Any AI/ML domain via context |
| **web-designer.md** | UI/UX design and user experience | Any design domain via context |
| **qa-engineer.md** | Quality assurance and test planning | Any testing domain via context |
| **backend-tester.md** | Backend testing and API validation | Any backend technology via context |
| **requirements-engineer.md** | Requirements analysis and documentation | Any domain or industry via context |
| **user-role.md** | End-to-end testing and browser automation | Any testing framework via context |
| **reviewer.md** | Critical code review and risk assessment | Any codebase via context |

**Note**: Subagent naming follows file names (e.g., `pm`, `architect`). @-mentions may or may not be supported depending on your Claude Code build.

## Key Features

- **14 core agents**: Handle broad domains via context specialization
- **Claude Code native**: Uses CC subagents directly (no custom orchestration)

## Quick Start

1. **Development**: Edit agent definitions in `src/agents/`
2. **Build**: `make install` copies to installation templates
3. **Deploy**: Ansible deploys to user's configured agent directory
4. **Usage**: Claude Code loads agents as native subagents

## Usage Examples

```markdown
# Natural agent communication (if @-mentions are supported):
@developer implement React authentication with modern hooks
@devops-engineer deploy to production environment
@ai-engineer optimize model training

# If @-mentions are not supported, ask in plain language:
# "Use the devops-engineer subagent to deploy to production."
```

---

*14 core agents with specialization via context*
