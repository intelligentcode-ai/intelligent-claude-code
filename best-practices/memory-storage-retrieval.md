# Memory-First Workflow

## Overview
Always search memory before asking users or creating work items to leverage collective knowledge and prevent repetitive questions.

## Core Principle

**FUNDAMENTAL RULE**: Check memory BEFORE asking users for any information that could be previously learned.

## Memory-First Query Pattern

### Before ANY User Query

**MANDATORY SEQUENCE**:
1. **Parse Query Intent**: Extract information requested
2. **Search Memory**: Query relevant memory topics for matching patterns
3. **Evaluate Results**: Check if memory contains sufficient information
4. **Use or Query**: Apply memory results OR ask user if insufficient

### Query Recognition Patterns

**LOCATION QUERIES**:
- "where is X"
- "how do I access Y"
- "what's the path to Z"

**CONFIGURATION QUESTIONS**:
- "how to configure X"
- "what settings for Y"

**PROCESS QUESTIONS**:
- "how do I X"
- "what's the procedure for Y"

**CREDENTIAL ACCESS**:
- "need token"
- "authentication required"
- "login details"

## Memory Search Topics

### Common Topics
- **authentication**: Auth patterns, credential locations, access methods
- **infrastructure**: Jump hosts, SSH methods, server access
- **configuration**: Settings, paths, environment variables
- **debugging**: Error resolutions, troubleshooting patterns
- **implementation**: Code patterns, architecture decisions
- **performance**: Optimization techniques, bottleneck solutions

### Search Strategy
1. Identify query category (location/config/process/credential)
2. Map to memory topic (authentication/infrastructure/configuration)
3. Search topic directory for matching patterns
4. Score results by relevance (exact match > partial > related)
5. Apply top 2-3 highest scoring results

## High-Value Storage Patterns

### Store When
- Information requested more than once
- Solution involves multiple steps for reuse
- Configuration or path discovery applies broadly
- Issue resolution helps future similar problems
- Process documentation standardizes workflows

### Don't Store When
- Information obvious or trivial
- Solution one-time only
- Content contains sensitive values directly
- Information already well-documented
- Temporary state or session-specific data

## Security-Aware Storage

### Safe Storage Patterns

**STORE Locations and References**:
- Configuration paths: `~/.config/git/common.conf`
- Environment variables: `$GITHUB_PAT`, `$AWS_PROFILE`
- Access methods: `source ~/.bashrc && echo $TOKEN`
- File locations: `/path/to/credentials/file`

**NEVER STORE Values**:
- Tokens: `ghp_xxxxxxxxxxxx`
- Passwords: `mypassword123`
- API Keys: `ak_xxxxxxxxxxxxxxxx`
- Private Keys: `-----BEGIN RSA PRIVATE KEY-----`

### Security Validation Checklist

Before storing any memory:

- ☐ Contains no actual passwords, tokens, or keys
- ☐ References locations or methods, not values
- ☐ Describes access patterns, not access credentials
- ☐ Helps users find their own credentials safely

## AgentTask Integration

### Memory-First Generation
1. Work request received
2. **Search memory immediately** for similar patterns
3. Embed memory results in AgentTask context
4. No runtime memory lookups during execution
5. Agent works with embedded memory patterns

### Automatic Storage
1. AgentTask execution completes successfully
2. **Analyze for reusable patterns** automatically
3. Apply relevance filters (MEMORY-RELEVANCE)
4. Store ONLY if relevant and valuable
5. Update memory/ topic files

## Common Pitfalls

### Skipping Memory Search
**WRONG**: Ask user immediately without checking memory
**CORRECT**: Search memory first, ask only if insufficient

### Storing Sensitive Values
**WRONG**: Store actual tokens or passwords
**CORRECT**: Store paths to credential files or environment variables

### Over-Storage
**WRONG**: Store every trivial interaction
**CORRECT**: Apply relevance filters, store only valuable patterns

### Under-Search
**WRONG**: Search only one narrow topic
**CORRECT**: Search related topics with broader patterns

## Quality Checklist

Before asking user for information:

- ☐ Memory search performed for relevant topics
- ☐ Multiple related topics checked
- ☐ Search results evaluated for relevance
- ☐ Memory insufficient OR no matches found
- ☐ Question necessary and well-formed

After successful execution:

- ☐ Execution analyzed for reusable patterns
- ☐ Relevance filters applied (MEMORY-RELEVANCE)
- ☐ Security validation passed (no credentials)
- ☐ Storage decision justified (clear future value)
- ☐ Memory updated with valuable patterns only

## Integration Points

### With AgentTask System
- Memory search before AgentTask creation
- Embed memory results in AgentTask context
- Store successful patterns after execution
- No runtime memory lookups by agents

### With Best Practices
- Memory patterns inform best practices
- Successful patterns promoted (3+ uses)
- Best practices reference memory topics
- Synergistic knowledge capture

### With Configuration
- Configuration paths stored in memory
- Settings locations discoverable
- Environment setup procedures captured
- Prevents repeated configuration questions

## Examples

### Memory-First Query Flow

**User**: "Where is the GitHub PAT stored?"

**CORRECT FLOW**:
1. Search memory/authentication/ for "GitHub PAT"
2. Find entry: "GitHub PAT in ~/.config/git/common.conf"
3. Return: "Based on memory, GitHub PAT is in ~/.config/git/common.conf"

**WRONG FLOW**:
1. Ask user: "Where do you store your GitHub PAT?"
2. User frustrated: "I told you this before!"

### Security-Aware Storage

**CORRECT MEMORY ENTRY**:
```markdown
## GitHub PAT Access

**Location**: `~/.config/git/common.conf`
**Variable**: `GITHUB_PAT`
**Access**: `source ~/.config/git/common.conf && echo $GITHUB_PAT`
```

**WRONG MEMORY ENTRY**:
```markdown
## GitHub PAT

**Token**: ghp_xxxxxxxxxxxxxxxxxxxx
```

## Success Metrics

- Reduced repetitive questions to users
- Faster response times (memory > user query)
- Higher user satisfaction (no repetition)
- Secure credential handling (no stored values)
- Growing knowledge base (valuable patterns only)
