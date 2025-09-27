# System Continuity Detection

**Purpose:** Detect when context has been summarized and guide system restoration.

## Context Loss Detection

**Common Indicators:**
- "continued from a previous conversation"
- "conversation was summarized"
- "ran out of context"
- "previous session"
- "summary provided"
- @Role patterns not recognized
- AgentTask template errors
- Virtual team patterns missing

## Simple Restoration Guidance

**When context loss detected:**
```
ℹ️  Context continuity detected
💡 Recommendation: Run /icc-init-system to restore full capabilities
📋 @Role patterns and AgentTask templates may need reinitialization
```

## Infrastructure Memory Patterns

### Access Pattern Storage
**Store infrastructure knowledge safely:**
- Connection methods and procedures
- Configuration file locations
- Environment variable patterns
- Authentication workflows
- Network topology and routing
- Service discovery patterns

### Credential Location Patterns
**Store access methods, not values:**
- Token storage locations (not tokens)
- Key file locations (not keys)
- Environment setup procedures
- Configuration access patterns

### Security-Safe Storage Examples
**Good patterns:**
- "SSH keys located in ~/.ssh/project-key"
- "Token available via: source ~/.bashrc && echo $PROJECT_TOKEN"
- "Config at: ~/.config/project/credentials"
- "Access via: kubectl config use-context production"

**Never store:**
- Actual tokens or passwords
- Private key contents
- Credential values
- Sensitive configuration data

## Pattern Application

**Before major operations:**
1. Check if @Role patterns working correctly
2. Verify AgentTask templates accessible
3. Confirm memory search functioning
4. If issues detected, suggest reinitialization

**Memory-first approach:**
- Search infrastructure patterns before asking users
- Store successful access methods for reuse
- Capture working configurations safely
- Build knowledge base of proven approaches

---
*Simple system continuity detection with practical infrastructure memory patterns*