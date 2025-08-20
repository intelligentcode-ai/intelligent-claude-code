# Agent Definitions Directory

This directory contains the core agent definitions for the intelligent-claude-code virtual team system.

## Core Agents

The following core agents are available:

- **architect.md**: System architecture and technical design specialist
- **developer.md**: Software implementation specialist  
- **ai-engineer.md**: AI/ML systems and behavioral framework specialist
- **system-engineer.md**: Infrastructure and system operations specialist
- **devops-engineer.md**: CI/CD and deployment automation specialist
- **security-engineer.md**: Security and compliance specialist
- **database-engineer.md**: Database design and optimization specialist
- **qa-engineer.md**: Quality assurance and test planning specialist
- **backend-tester.md**: Backend testing and API validation specialist
- **user-role.md**: End-to-end testing and browser automation specialist
- **web-designer.md**: UI/UX design and user experience specialist
- **requirements-engineer.md**: Requirements analysis and documentation specialist

## Agent Structure

Each agent definition follows this structure:

```yaml
---
name: "AgentName"
description: "Agent description with expertise areas"
tools: ["bash", "read", "write", "edit", "grep", "multiedit"]
---

# Agent Content
Detailed behavioral patterns and expertise areas
```

## Dynamic Specialist Creation

Each core agent can create domain-specific specialists when needed:
- **<70% Capability Match**: Create specialized version
- **Domain Expertise**: Focus on specific technology or domain
- **Project Context**: Created based on actual project needs

## Deployment

These agent definitions are deployed to user environments through:
- **Installation**: Copied to `~/.claude/agents/` during installation
- **Project Integration**: Available for @Agent interactions
- **Behavioral Framework**: Integrated with PRB system and memory

## Usage

Agents are activated through @-notation:
- `@Architect`: System architecture decisions
- `@Developer`: Feature implementation
- `@AI-Engineer`: Behavioral framework work
- `@Security-Engineer`: Security reviews
- `@Web-Designer`: UI/UX design and user experience
- `@Requirements-Engineer`: Requirements analysis and documentation
- `@User-Role`: End-to-end testing and browser automation

Each @Agent mention creates a subagent for specialized task execution.