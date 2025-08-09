# Proactive Memory Behavior

**MANDATORY:** MUST check memory before asking users. Auto-generate memory proactively.

**PURPOSE:** Transform memory system from passive to proactive - automatically capture, store, and utilize knowledge patterns

## Core Principle: Memory-First Approach

**FUNDAMENTAL RULE:** Check memory BEFORE asking users for any information that could be previously learned.

## Memory-First Query Pattern

### Before ANY User Query
**MANDATORY SEQUENCE:**
1. **Parse Query Intent**: Extract what information is being requested
2. **Search Memory**: Query relevant memory topics for matching patterns
3. **Evaluate Results**: Check if memory contains sufficient information
4. **Use or Query**: Apply memory results OR ask user if insufficient

**Query Recognition Patterns:**
- **Location Queries**: "where is X", "how do I access Y", "what's the path to Z"
- **Configuration Questions**: "how to configure X", "what settings for Y"
- **Process Questions**: "how do I X", "what's the procedure for Y"
- **Credential Access**: "need token", "authentication required", "login details"

### Memory Query Examples

**CORRECT Proactive Behavior:**
```markdown
User: "Create a GitHub PR"
System: [Searches memory/configuration/ for GitHub authentication]
System: [Finds: "GitHub PAT location: ~/.config/git/common.conf"]
System: [Uses: source ~/.config/git/common.conf && GH_TOKEN=$GITHUB_PAT]
System: [Creates PR without asking user for credentials]
```

**INCORRECT Reactive Behavior:**
```markdown
User: "Create a GitHub PR"  
System: "I need your GitHub token, where is it located?"
[VIOLATION: Should have checked memory first]
```

## Proactive Memory Generation

### Generation Triggers

**CONTINUOUS LEARNING**: Generate memory entries during ALL operations, not just PRBs:

1. **Discovery Events**: When new information sources are found
2. **Configuration Changes**: When settings or paths are updated
3. **Problem Resolution**: When issues are solved
4. **Pattern Recognition**: When repeated patterns are observed
5. **User Corrections**: When user provides missing information

### Situational Awareness Patterns

**HIGH VALUE for Memory Storage:**
- **Frequently Requested Information**: Paths, configurations, credentials locations
- **Problem Solutions**: Error fixes, workarounds, troubleshooting steps
- **Project-Specific Patterns**: Build processes, deployment steps, testing procedures
- **External Dependencies**: API endpoints, service configurations, tool locations
- **Team Preferences**: Coding standards, review patterns, workflow preferences

**MODERATE VALUE for Memory Storage:**
- **One-time Solutions**: Specific bug fixes unlikely to recur
- **Context-Specific Details**: Information tied to current session only
- **Personal Preferences**: Individual user choices not broadly applicable

**LOW VALUE for Memory Storage:**
- **Transient Information**: Temporary states, session data
- **Obvious Information**: Standard commands, common knowledge
- **Highly Variable Data**: Information that changes frequently

### Intelligent Pattern Detection

**STORE When:**
- Information is requested more than once
- Solution involves multiple steps that could be reused
- Configuration or path discovery that applies broadly
- Error resolution that could help future similar issues
- Process documentation that standardizes workflows

**DON'T STORE When:**
- Information is obvious or trivial
- Solution is one-time only
- Content contains sensitive values directly
- Information is already well-documented in obvious places

## Security-Aware Storage

### Safe Storage Patterns

**STORE Locations and References:**
- **Configuration Paths**: `~/.config/git/common.conf`
- **Environment Variables**: `$GITHUB_PAT`, `$AWS_PROFILE`
- **Access Methods**: `source ~/.bashrc && echo $TOKEN`
- **File Locations**: `/path/to/credentials/file`

**NEVER STORE Values:**
- **Tokens**: `ghp_xxxxxxxxxxxx`
- **Passwords**: `mypassword123`
- **API Keys**: `ak_xxxxxxxxxxxxxxxx`
- **Private Keys**: `-----BEGIN RSA PRIVATE KEY-----`

### Security Validation Checklist
```markdown
BEFORE STORING ANY MEMORY:
☐ Contains no actual passwords, tokens, or keys
☐ References locations or methods, not values
☐ Describes access patterns, not access credentials
☐ Helps users find their own credentials safely
☐ Does not expose sensitive project information
```

### Example Safe Storage
```markdown
## GitHub Authentication Access
**Context:** GitHub CLI operations requiring authentication
**Location Pattern:** GitHub PAT typically stored in ~/.config/git/common.conf
**Access Method:** source ~/.config/git/common.conf && GH_TOKEN=$GITHUB_PAT
**Usage Pattern:** Export token before gh commands
**Security:** Never store actual token value
```

## Memory Utilization Patterns

### Automatic Application

**WHEN to Apply Memory:**
- **Exact Match**: User request matches stored pattern exactly
- **Partial Match**: User request overlaps with stored knowledge (>70% relevance)
- **Context Match**: Current task context matches stored scenario
- **Problem Pattern**: Current issue matches previously solved problem

### Relevance Scoring

**HIGH Relevance (Apply Immediately):**
- **Exact Information Match**: User asks for X, memory contains X
- **Direct Process Match**: User wants to do Y, memory has Y procedure
- **Same Context**: Current task context identical to stored context

**MEDIUM Relevance (Suggest or Combine):**
- **Similar Information**: User asks for X, memory contains X-related
- **Analogous Process**: User wants Y, memory has similar Z procedure
- **Related Context**: Current task similar to stored context

**LOW Relevance (Reference Only):**
- **Tangential Information**: Loosely related to user request
- **Different Context**: Stored for different scenarios
- **Background Information**: Provides context but not direct answer

### Context-Aware Selection

**PRIORITY ORDER:**
1. **Project-Specific**: Memories from current project context
2. **Recent**: Memories created or used recently (higher recency weight)
3. **Frequent**: Memories accessed multiple times (usage pattern)
4. **Detailed**: Memories with comprehensive information
5. **Successful**: Memories that led to successful outcomes

## Integration with Existing Systems

### With Learning System
- **Proactive Storage**: Generate memories based on learning triggers
- **Pattern Enhancement**: Use learning patterns to identify valuable storage opportunities
- **Error Prevention**: Store solution patterns to prevent repeated errors

### With Task Execution
- **Pre-Task Memory Check**: Search memory before starting any task
- **During-Task Learning**: Capture valuable discoveries during execution
- **Post-Task Storage**: Store new patterns and solutions after completion

### With Role System
- **Role-Specific Memory**: Each role can contribute specialized knowledge
- **Cross-Role Sharing**: Memories accessible across all roles
- **Expertise Capture**: Store role-specific expertise patterns

## Implementation Triggers

### System-Wide Activation
**ACTIVATE on:**
- Any information request from user
- Any task that could benefit from prior knowledge
- Any problem that might have been solved before
- Any process that could be standardized

### Response Patterns
```markdown
CORRECT Pattern:
1. User makes request
2. System searches memory FIRST
3. System applies relevant memories
4. System generates new memory if valuable patterns discovered
5. System completes request with enhanced knowledge

INCORRECT Pattern:
1. User makes request
2. System asks user for information
3. System completes request
4. System forgets to store learnings
[VIOLATION: Not proactive, not learning]
```

## Quality Assurance

### Memory Generation Quality
- **Specific**: Contains actionable, concrete information
- **Reusable**: Applicable to future similar scenarios
- **Safe**: No sensitive information stored directly
- **Organized**: Stored in appropriate topic categories
- **Accessible**: Easy to find with relevant search terms

### Usage Quality
- **Accurate**: Memory correctly addresses user needs
- **Timely**: Applied before asking user unnecessarily
- **Relevant**: Matches current context and requirements
- **Complete**: Provides sufficient information for task completion

## Success Indicators

### Behavioral Changes
- **Reduced Questions**: System asks fewer repeated questions
- **Faster Responses**: Quicker task completion using stored knowledge
- **Better Outcomes**: Higher success rates due to applied learnings
- **User Satisfaction**: Users notice system "remembering" their preferences

### Memory Metrics
- **Usage Frequency**: How often stored memories are applied
- **Success Rate**: Percentage of memory applications that help
- **Coverage**: How much repetitive questioning is eliminated
- **Growth**: Steady increase in valuable memory entries

---
*Proactive memory behavior for intelligent-claude-code system*