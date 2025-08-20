# Commands Reference

## Overview
The intelligent-claude-code system combines essential utility commands with natural @Agent interaction patterns. Most functionality operates through behavioral patterns rather than commands, enabling natural language work requests.

## System Commands

### `/icc-init-system`
Initializes the virtual team system and prepares for work.

**Usage:** `/icc-init-system [autonomy_level]`

**Examples:**
```bash
/icc-init-system          # Initialize with default settings
/icc-init-system L3       # Initialize with full autonomy
```

**What it does:**
- Loads configuration from CLAUDE.md
- Creates memory directory structure
- Activates the 14 core roles
- Sets up PRB system
- Configures autonomy level

### `/icc-get-setting [key]`
Retrieves configuration values from the hierarchy.

**Usage:** `/icc-get-setting [setting_name]`

**Examples:**
```bash
/icc-get-setting autonomy_level     # Returns: L2
/icc-get-setting git_privacy        # Returns: true
/icc-get-setting default_branch     # Returns: main
```

**Configuration hierarchy:**
1. Embedded config (in PRBs)
2. Project config (./config.md or CLAUDE.md)
3. User config (~/.claude/config.md - system-wide only)
4. System defaults

## PRB Commands

### `/icc-create-prb`
Generates a Product Requirement Blueprint for work.

**Usage:** `/icc-create-prb "[work description]"`

**Examples:**
```bash
/icc-create-prb "Add user authentication with JWT"
/icc-create-prb "Fix memory leak in dashboard"
/icc-create-prb "Optimize database queries"
```

**Process:**
1. Analyzes work complexity (0-30+ score)
2. Selects appropriate template (Nano/Tiny/Medium/Large/Mega)
3. Embeds relevant context and learnings
4. Assigns appropriate specialist role
5. Creates self-contained execution blueprint

### `/icc-analyze-complexity`
Preview complexity score before creating PRB.

**Usage:** `/icc-analyze-complexity "[work description]"`

**Examples:**
```bash
/icc-analyze-complexity "Update button color"        # Score: 2 (Nano)
/icc-analyze-complexity "Add OAuth2 authentication"  # Score: 15 (Medium)
/icc-analyze-complexity "Refactor entire backend"    # Score: 35 (Mega)
```

**Scoring factors:**
- Files affected
- Lines of code
- External integrations
- Security implications
- Coordination requirements

### `/icc-generate-prb-from-draft [path]`
Creates PRBs from your specification documents.

**Usage:** `/icc-generate-prb-from-draft [draft_directory]`

**Examples:**
```bash
/icc-generate-prb-from-draft drafts/new-feature/
/icc-generate-prb-from-draft specs/api-redesign/
/icc-generate-prb-from-draft docs/performance-improvements/
```

**Process:**
1. @PM analyzes draft specifications
2. @Architect designs technical approach
3. System generates appropriate PRBs
4. Includes all project context and standards

## Story Management

### Natural Language Story Breakdown
Stories are broken down through natural @PM interaction.

**Usage:** Natural language with @PM

**Examples:**
```bash
@PM break down the authentication story
@PM analyze STORY-001 and create PRBs
@PM what story should we work on next?
```

**Process:**
1. @PM analyzes the story requirements
2. @PM collaborates with domain-specific architect
3. System generates appropriate PRBs automatically
4. Story updated with PRB references through behavioral patterns

### `/icc-story-status`
Tracks story progress and PRB completion.

**Usage:** `/icc-story-status <story_filename> [detail_level]`

**Examples:**
```bash
/icc-story-status auth-system.md
/icc-story-status payment.txt detailed
```

## Dynamic Specialist Creation

### Automatic Specialist Generation
Specialists are created automatically through PM + Architect collaboration patterns.

**Usage:** Natural work requests trigger automatic specialist creation

**Examples:**
```bash
# Work requests automatically create appropriate specialists
"Implement GraphQL API"               # Auto-creates @GraphQL-Developer
"Set up Kubernetes deployment"        # Auto-creates @Kubernetes-Expert  
"Add WebRTC video chat"              # Auto-creates @WebRTC-Specialist
"Build blockchain integration"        # Auto-creates @Blockchain-Engineer
```

**Automatic Creation:**
- Triggered when expertise match <70% with existing 14 core roles
- PM + domain-specific architect collaboration determines specialist
- All specialists have 10+ years expertise with Context7 knowledge injection
- Seamless integration into PRB execution through behavioral patterns

## Embedded Problem-Solving

### Natural Sequential Thinking
All agents have embedded sequential thinking capabilities - no commands needed.

**Usage:** Complex problems automatically trigger sequential analysis

**Examples:**
```bash
# Complex problems automatically engage sequential thinking
"How to implement real-time collaboration?"   # @Architect applies sequential analysis
"Architecture for multi-tenant system?"      # System architects think step-by-step
"Optimize for 1M concurrent users?"          # @System-Engineer uses structured thinking
```

**Built-in Features:**
- Embedded in all 14 core roles and dynamic specialists
- Step-by-step analysis with evidence-based reasoning
- Self-correcting with assumption challenges
- Identifies when more analysis needed automatically
- Generates and verifies hypotheses through natural problem-solving

## Memory Commands

### `/icc-store-memory [topic] [content]`
Stores learnings in version-controlled memory.

**Usage:** `/icc-store-memory [topic/subtopic] "[learning content]"`

**Examples:**
```bash
/icc-store-memory authentication/oauth2 "Problem: Token expiry not handled. Solution: Implement automatic refresh on 401 errors with exponential backoff."

/icc-store-memory performance/caching "Redis cache with 5-minute TTL reduced API load by 80%. Key pattern: user:{id}:profile"

/icc-store-memory error-handling/retries "Network errors need exponential backoff: 1s, 2s, 4s, 8s with max 30s"
```

**Features:**
- Topic-based organization
- Auto-prunes to keep files small (5KB max)
- Newest entries first
- Version controlled (shared with team)

### `/icc-search-memory [query]`
Searches memory for relevant learnings.

**Usage:** `/icc-search-memory "[search terms]"`

**Examples:**
```bash
/icc-search-memory "oauth authentication"
/icc-search-memory "database optimization"
/icc-search-memory "error handling patterns"
```

**Used during:**
- PRB generation (automatic)
- Manual exploration
- Problem investigation

**Results include:**
- Topic location
- Entry date
- Relevance score
- Preview snippet

### `/icc-load-memory [topic/file]`
Loads specific memory entries for review.

**Usage:** `/icc-load-memory [topic/subtopic]`

**Examples:**
```bash
/icc-load-memory authentication/oauth2-patterns
/icc-load-memory performance/caching
/icc-load-memory error-handling/api-errors
```

**Returns:**
- Full content of topic file
- All entries (newest first)
- Archive references if applicable

## Command Patterns

### Starting New Work
```bash
/icc-init-system                              # Initialize
"Build a REST API for user management"        # Natural language
# OR
/icc-create-prb "Build REST API for users"    # Explicit PRB
```

### Working with Drafts
```bash
# Create your specs
echo "API Requirements..." > drafts/api-spec.md

# Generate PRBs
/icc-generate-prb-from-draft drafts/
```

### Complex Problem Solving
```bash
/icc-think-sequential "How to handle 10K concurrent websocket connections"
# ... thinking process ...
/icc-create-prb "Implement websocket scaling solution"
```

### Learning from PRB Patterns
```bash
# PRB pattern recognized - captured for learning
"Successful OAuth implementation with refresh"
/icc-store-memory authentication/oauth "Pattern: OAuth with auto-refresh. Context: Successful implementation"

# Next time - pattern applied automatically
/icc-create-prb "Implement Microsoft OAuth"
# PRB includes previous OAuth learnings
```

## Tips

### Effective Commands
- Be specific in descriptions
- Include success criteria
- Reference existing code/patterns
- Mention constraints upfront

### Memory Management
- Store learnings immediately after solving problems
- Use consistent topic naming
- Keep entries concise but complete
- Include code examples when relevant

### PRB Optimization
- Smaller PRBs execute faster
- Clear requirements = better output
- Let system choose complexity
- Trust specialist assignments

---

Essential utility commands combined with natural @Agent behavioral patterns provide intuitive control over the virtual team system. Most work happens through natural language interaction rather than command scaffolding.