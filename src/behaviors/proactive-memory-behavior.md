# Proactive Memory Behavior

**MANDATORY:** Check memory before asking users. Auto-generate memory proactively.

## Core Principle: Memory-First Approach

**FUNDAMENTAL RULE:** Check memory BEFORE asking users for any information that could be previously learned.

## Memory-First Query Pattern

### Before ANY User Query
**MANDATORY SEQUENCE:**
1. **Parse Query Intent:** Extract information requested
2. **Search Memory:** Query relevant memory topics for matching patterns
3. **Evaluate Results:** Check if memory contains sufficient information
4. **Use or Query:** Apply memory results OR ask user if insufficient

### Query Recognition Patterns
**LOCATION QUERIES:** "where is X", "how do I access Y", "what's the path to Z"
**CONFIGURATION QUESTIONS:** "how to configure X", "what settings for Y"
**PROCESS QUESTIONS:** "how do I X", "what's the procedure for Y"
**CREDENTIAL ACCESS:** "need token", "authentication required", "login details"

## Proactive Memory Generation

### Generation Triggers
**CONTINUOUS LEARNING:** Generate memory entries during ALL operations:
1. **Discovery Events:** New information sources found
2. **Configuration Changes:** Settings or paths updated
3. **Problem Resolution:** Issues solved
4. **Pattern Recognition:** Repeated patterns observed
5. **User Corrections:** Missing information provided

### High-Value Storage Patterns
**STORE WHEN:**
- Information requested more than once
- Solution involves multiple steps for reuse
- Configuration or path discovery applies broadly
- Issue resolution helps future similar problems
- Process documentation standardizes workflows

**DON'T STORE WHEN:**
- Information obvious or trivial
- Solution one-time only
- Content contains sensitive values directly
- Information already well-documented

## Security-Aware Storage

### Safe Storage Patterns
**STORE Locations and References:**
- Configuration paths: `~/.config/git/common.conf`
- Environment variables: `$GITHUB_PAT`, `$AWS_PROFILE`
- Access methods: `source ~/.bashrc && echo $TOKEN`
- File locations: `/path/to/credentials/file`

**NEVER STORE Values:**
- Tokens: `ghp_xxxxxxxxxxxx`
- Passwords: `mypassword123`
- API Keys: `ak_xxxxxxxxxxxxxxxx`
- Private Keys: `-----BEGIN RSA PRIVATE KEY-----`

### Security Validation Checklist
**BEFORE STORING ANY MEMORY:**
☐ Contains no actual passwords, tokens, or keys
☐ References locations or methods, not values
☐ Describes access patterns, not access credentials
☐ Helps users find their own credentials safely

## Memory Utilization Patterns

### Automatic Application
**APPLY IMMEDIATELY:** Exact match, high relevance (>70%), context match, problem pattern match
**SUGGEST:** Medium relevance, analogous processes, related contexts
**REFERENCE ONLY:** Tangential information, different contexts, background information

### Context-Aware Selection
**PRIORITY ORDER:**
1. **Project-Specific:** Memories from current project context
2. **Recent:** Recently created or used memories
3. **Frequent:** Accessed multiple times
4. **Detailed:** Comprehensive information
5. **Successful:** Led to successful outcomes

---
*Proactive memory with security-aware storage and automatic utilization*