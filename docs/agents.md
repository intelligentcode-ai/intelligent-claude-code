# Agent Definitions

This directory contains the 14 core Claude Code Subagent definitions with embedded behavioral patterns for the intelligent-claude-code virtual team system.

## Core Agent Definitions

| Agent | Role | Specialization Capability |
|-------|------|---------------------------|
| **pm.md** | Project management and coordination | Any project domain via AgentTask context |
| **architect.md** | System architecture and technical design | Any architectural domain via AgentTask context |
| **developer.md** | Software implementation and feature development | Any technology stack via AgentTask context |
| **system-engineer.md** | Infrastructure and system operations | Any cloud/infrastructure platform via AgentTask context |
| **devops-engineer.md** | CI/CD and deployment automation | Any CI/CD platform or deployment strategy via AgentTask context |
| **database-engineer.md** | Database design and optimization | Any database technology via AgentTask context |
| **security-engineer.md** | Security and compliance frameworks | Any security domain via AgentTask context |
| **ai-engineer.md** | AI/ML and behavioral frameworks | Any AI/ML platform or behavioral domain via AgentTask context |
| **web-designer.md** | UI/UX design and user experience | Any design domain or industry via AgentTask context |
| **qa-engineer.md** | Quality assurance and test planning | Any testing domain via AgentTask context |
| **backend-tester.md** | Backend testing and API validation | Any backend technology via AgentTask context |
| **requirements-engineer.md** | Requirements analysis and documentation | Any domain or industry via AgentTask context |
| **user-role.md** | End-to-end testing and browser automation | Any testing framework via AgentTask context |
| **reviewer.md** | Critical review and risk assessment | Any domain via AgentTask context |

**Note**: @PM operates as both main agent (for story breakdown and coordination) and subagent (for delegation and specialized PM tasks).

## Key Features

- **14 core Generic Agents**: Handle any work via context specialization
- **Dynamic Specialization**: Achieved through AgentTask context, not separate files
- **Unlimited Domain Coverage**: Any technology via specialized AgentTask content
- **Claude Code Native Integration**: Full compatibility with Claude Code Subagents

## Quick Start

1. **Development**: Edit agent definitions in `src/agents/`
2. **Build**: `make install` copies to installation templates (or `make clean-install` for a full reset)
3. **Deploy**: Ansible deploys to user's configured agent directory
4. **Usage**: Claude Code loads agents as native Subagents

## Usage Examples

```markdown
# Natural agent communication:
@Developer implement React authentication with modern hooks
@DevOps deploy to production environment
@AI-Engineer optimize behavioral patterns

# PM automatically determines specialization and creates AgentTask with context
# Agents receive AgentTask and operate as specialists for the work
```

---

*14 core agents with unlimited specialization via AgentTask context*
