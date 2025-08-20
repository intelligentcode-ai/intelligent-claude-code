# Agent Definitions

This directory contains the 13 core Claude Code Subagent definitions with embedded behavioral patterns for the intelligent-claude-code virtual team system.

## Architecture Overview

The intelligent-claude-code system implements a **hybrid agent architecture** that combines:

1. **13 Core Generic Agents**: Handle any work via context specialization
2. **Dynamic Specialization**: Achieved through PRB context, not separate files
3. **Unlimited Domain Coverage**: Any technology via specialized PRB content
4. **Claude Code Native Integration**: Full compatibility with Claude Code Subagents

## Core Agent Definitions

| Agent | Role | Specialization Capability |
|-------|------|---------------------------|
| **architect.md** | System architecture and technical design | Any architectural domain via PRB context |
| **developer.md** | Software implementation and feature development | Any technology stack via PRB context |
| **system-engineer.md** | Infrastructure and system operations | Any cloud/infrastructure platform via PRB context |
| **devops-engineer.md** | CI/CD and deployment automation | Any CI/CD platform or deployment strategy via PRB context |
| **database-engineer.md** | Database design and optimization | Any database technology via PRB context |
| **security-engineer.md** | Security and compliance frameworks | Any security domain via PRB context |
| **ai-engineer.md** | AI/ML and behavioral frameworks | Any AI/ML platform or behavioral domain via PRB context |
| **web-designer.md** | UI/UX design and user experience | Any design domain or industry via PRB context |
| **qa-engineer.md** | Quality assurance and test planning | Any testing domain via PRB context |
| **backend-tester.md** | Backend testing and API validation | Any backend technology via PRB context |
| **requirements-engineer.md** | Requirements analysis and documentation | Any domain or industry via PRB context |
| **user-role.md** | End-to-end testing and browser automation | Any testing framework via PRB context |

**Note**: @PM remains in main agent scope for coordination and delegation responsibilities.

## Dynamic Specialization System

### How Specialization Works

Instead of creating separate specialist agent files, the system achieves unlimited specialization through **PRB context injection**:

```yaml
# PRB Example with React Specialization
complete_context:
  specialization: |
    You are acting as React Developer with 10+ years experience.
    You are expert in:
    - React 18+ with hooks and modern patterns
    - TypeScript integration and type safety
    - State management with Redux Toolkit
    - Component architecture and reusability
    - Performance optimization and code splitting
```

When the **developer.md** agent receives this PRB, it fully embodies the React specialist expertise.

### Universal Domain Coverage

This approach enables specialization in **ANY** technology domain:

- **Frontend**: React, Vue, Angular, Svelte, TypeScript, JavaScript
- **Backend**: Node.js, Python, Java, Go, Rust, C#, PHP
- **Mobile**: React Native, Flutter, iOS (Swift), Android (Kotlin)
- **Cloud**: AWS, Azure, GCP, multi-cloud architectures
- **Database**: PostgreSQL, MongoDB, Redis, Elasticsearch, Cassandra
- **AI/ML**: TensorFlow, PyTorch, scikit-learn, Hugging Face
- **DevOps**: Docker, Kubernetes, Jenkins, GitHub Actions, Terraform
- **And ANY emerging technology via PRB context**

### PM + Architect Dynamic Creation Process

The @PM and specialist architects determine when specialization is needed:

1. **Work Analysis**: PM analyzes work requirements and technology stack
2. **Capability Matching**: Compare to 13 core agents (≥70% = use core, <70% = specialize)
3. **Specialization Decision**: PM + Domain Architect collaborate on specialization needs
4. **PRB Generation**: Create PRB with embedded specialization context
5. **Agent Execution**: Core agent receives PRB and operates as specialist

### Examples of Dynamic Specialization

```markdown
## React Frontend Project
PM Analysis: "This requires React expertise with Redux, TypeScript, and modern hooks"
Decision: <70% match with core developer → Create React specialization
PRB Context: "Act as React Developer with 10+ years experience..."
Execution: developer.md agent becomes React specialist for this PRB

## AWS Infrastructure Project  
PM Analysis: "This requires AWS expertise with EKS, RDS, and CloudFormation"
Decision: <70% match with core system-engineer → Create AWS specialization
PRB Context: "Act as AWS Solutions Architect with deep infrastructure expertise..."
Execution: system-engineer.md agent becomes AWS specialist for this PRB

## Machine Learning Project
PM Analysis: "This requires ML expertise with PyTorch, computer vision, and model deployment"
Decision: <70% match with core ai-engineer → Create ML specialization
PRB Context: "Act as Machine Learning Engineer with computer vision expertise..."
Execution: ai-engineer.md agent becomes ML specialist for this PRB
```

## Claude Code Integration

### File Format Compliance

All agent files follow **Claude Code native Subagents format**:

```yaml
---
name: agent-name
description: Specialist description with domain expertise
tools: Edit, MultiEdit, Read, Write, Bash, Grep, Glob, LS
---

# Agent markdown content with behavioral patterns and specialization capability
```

### YAML Frontmatter Rules

**ONLY 3 fields allowed** (per Claude Code specification):
- ✅ `name`: Agent identifier (lowercase, hyphenated)
- ✅ `description`: Specialist description and expertise area
- ✅ `tools`: Available tools for the agent

**FORBIDDEN fields** (will cause Claude Code to reject):
- ❌ `version`, `category`, `color`, `emoji`  
- ❌ `capabilities`, `working_directories`
- ❌ `specializations`, `domains`
- ❌ Any custom fields beyond name, description, tools

### Behavioral Pattern Encapsulation

Each agent embeds behavioral patterns in markdown content:

- **PRB Execution Patterns**: How to execute PRBs with embedded context
- **Memory Integration**: Search memory before work, store successful patterns
- **Quality Standards**: Ensure high standards for domain expertise
- **Specialization Instructions**: How to embody specialist expertise via PRB context
- **Collaboration Patterns**: How to work with other agents and PM

## Deployment Pipeline

### Source → Deployment Flow

```
src/agents/*.md 
  ↓ (Makefile build)
templates/agents/*.md 
  ↓ (Ansible deployment)  
~/.claude/agents/*.md
  ↓ (Claude Code native)
Available as Subagents
```

### Installation Integration

The agents integrate with existing intelligent-claude-code infrastructure:

1. **Development**: Edit agent definitions in `src/agents/`
2. **Build**: `make install` copies to installation templates
3. **Deploy**: Ansible deploys to user's `~/.claude/agents/`
4. **Usage**: Claude Code loads agents as native Subagents

## Usage Patterns

### Natural Agent Invocation

```markdown
# Instead of complex command scaffolding:
OLD: /icc-create-specialist react-developer && /icc-execute-with-specialist

# Use natural agent communication:
NEW: @Developer implement React authentication with modern hooks

# PM automatically determines specialization and creates PRB with context
# Developer agent receives PRB and operates as React specialist
```

### PRB-Driven Execution

```markdown
# PM creates PRB with specialization:
@PM break down authentication story

# PM generates PRB like:
STORY-001-PRB-001-react-auth-implementation.prb.yaml

# With embedded context:
complete_context:
  specialization: "React Developer with hooks expertise..."
  
# Developer agent executes PRB with full React specialization
```

## Benefits of This Architecture

### Unlimited Scalability
- **ANY Technology**: Support for emerging tech via PRB context
- **NO Maintenance Overhead**: No need to maintain hundreds of specialist files
- **Clean Architecture**: 13 generic agents + unlimited contextual specialization

### Claude Code Native
- **Perfect Compatibility**: Works seamlessly with Claude Code Subagents
- **Future-Proof**: Aligns with Claude Code's evolution
- **Performance Optimized**: Native context management and delegation

### Intelligent Coordination
- **PM Orchestration**: PM determines specialization needs intelligently
- **Architect Collaboration**: Domain architects guide specialization decisions
- **Quality Assurance**: Embedded behavioral patterns ensure consistent quality

### Maintainability
- **Single Source of Truth**: One agent file per core role
- **Version Controlled**: All definitions tracked in git
- **Documentation Integrated**: Behavioral patterns embedded in agent definitions

## Migration from Task Tool

This system provides a **smooth migration path** from the current Task tool approach:

1. **Phase 1**: Deploy core agents alongside existing Task tool system
2. **Phase 2**: Update PRB generation to include agent specialization context  
3. **Phase 3**: Migrate execution from Task tool to native Subagents
4. **Phase 4**: Remove Task tool scaffolding and obsolete commands

The architecture ensures **backward compatibility** during transition while providing the foundation for unlimited specialist creation and Claude Code native integration.

---

**Next Steps**: These agent definitions are ready for deployment via the existing Makefile/Ansible infrastructure and integration with Claude Code native Subagents.