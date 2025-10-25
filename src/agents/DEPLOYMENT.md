# Agent Deployment

## Deployment Pipeline

### Source → Deployment Flow

```
src/agents/*.md 
  ↓ (Makefile build)
templates/agents/*.md 
  ↓ (Ansible deployment)  
user_config/agents/*.md
  ↓ (Claude Code native)
Available as Subagents
```

### Installation Integration

The agents integrate with existing intelligent-claude-code infrastructure:

1. **Development**: Edit agent definitions in `src/agents/`
2. **Build**: `make install` copies to installation templates
3. **Deploy**: Ansible deploys to user's configured agent directory
4. **Usage**: Claude Code loads agents as native Subagents

## Usage Patterns

### Natural Agent Invocation

```markdown
# Instead of complex command scaffolding:
OLD: /icc-create-specialist react-developer && /icc-execute-with-specialist

# Use natural agent communication:
NEW: @Developer implement React authentication with modern hooks

# PM automatically determines specialization and creates AgentTask with context
# Developer agent receives AgentTask and operates as React specialist
```

### AgentTask-Driven Execution

```markdown
# PM creates AgentTask with specialization:
@PM break down authentication story

# PM generates AgentTask like:
STORY-001-AgentTask-001-react-auth-implementation.agenttask.yaml

# With embedded context:
complete_context:
  specialization: "React Developer with hooks expertise..."
  
# Developer agent executes AgentTask with full React specialization
```

## Migration from Task Tool

This system provides a **smooth migration path** from the current Task tool approach:

1. **Phase 1**: Deploy core agents alongside existing Task tool system
2. **Phase 2**: Update AgentTask generation to include agent specialization context  
3. **Phase 3**: Migrate execution from Task tool to native Subagents
4. **Phase 4**: Remove Task tool scaffolding and obsolete commands

The architecture ensures **backward compatibility** during transition while providing the foundation for unlimited specialist creation and Claude Code native integration.

---

*Agent deployment pipeline and migration strategy*