# Commands Reference

## Overview
The intelligent-claude-code system provides 12 essential commands that cover initialization, PRB creation, story management, specialist management, problem-solving, and memory operations.

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

## Story Management Commands

### `/icc-breakdown-story`
Converts natural language stories into PRBs.

**Usage:** `/icc-breakdown-story <story_filename> [options]`

**Examples:**
```bash
/icc-breakdown-story auth-system.md
/icc-breakdown-story user-dashboard.txt preview
/icc-breakdown-story payment.md force
```

**Process:**
1. @PM analyzes the story
2. @Architect reviews technical approach
3. System generates appropriate PRBs
4. Story updated with PRB references

### `/icc-story-status`
Tracks story progress and PRB completion.

**Usage:** `/icc-story-status <story_filename> [detail_level]`

**Examples:**
```bash
/icc-story-status auth-system.md
/icc-story-status payment.txt detailed
```

## Agent System Integration

### Natural @Agent Communication
All work operates through direct agent communication - no command scaffolding needed.

**Usage:** Natural @Agent mentions automatically create subagents for execution

**Examples:**
```bash
# Direct agent communication patterns
"@PM break down the authentication story"     # PM analyzes and creates PRBs
"@Developer implement the login API"          # Developer creates PRB and executes
"@Security-Engineer review the auth flow"     # Security specialist reviews
"@AI-Engineer optimize ML algorithm"          # AI specialist handles behavioral work
```

**Agent Features:**
- 14 core specialized roles with embedded behavioral patterns
- Unlimited dynamic specialist creation for ANY technology domain when expertise needed
- Direct PRB execution through Task tool invocation
- Complete context preservation across agent interactions

## L3 Autonomous Mode Commands

### `/icc-enable-l3-autonomous`
Enables L3 autonomous operation for continuous work discovery.

**Usage:** `/icc-enable-l3-autonomous [max_parallel_tasks]`

**Examples:**
```bash
/icc-enable-l3-autonomous           # Enable with default settings
/icc-enable-l3-autonomous 3         # Enable with max 3 parallel tasks
```

**L3 Features:**
- Automatically discovers PLANNED/IN_PROGRESS tasks
- Processes uncommitted changes into PRBs
- Continuously improves memory and patterns
- Operates until explicit stop or critical issues
- Maintains up to 5 parallel non-conflicting tasks

## Template Validation Commands

### `/icc-validate-template-usage`
Validates PRB compliance with mandatory template usage from src/prb-templates/.

**Usage:** `/icc-validate-template-usage [prb-path]`

**Examples:**
```bash
/icc-validate-template-usage prbs/ready/STORY-001-PRB-001.prb.yaml
/icc-validate-template-usage prbs/completed/BUG-005-PRB-001.prb.yaml
```

**Validation Checks:**
- Template source from src/prb-templates/ hierarchy
- All placeholders resolved (no [FROM_CONFIG] remaining)
- Complete configuration embedded in PRB
- Mandatory template sections present
- No runtime config dependencies

### `/icc-check-placeholder-resolution`
Verifies all template placeholders have been resolved with actual values.

**Usage:** `/icc-check-placeholder-resolution [prb-path]`

**Examples:**
```bash
/icc-check-placeholder-resolution prbs/ready/STORY-001-PRB-001.prb.yaml
```

**Checks for unresolved patterns:**
- `[FROM_CONFIG]` - Must be replaced with actual config values
- `[PROJECT_ROOT]` - Must be replaced with actual project path
- `[CURRENT_DATE]` - Must be replaced with actual date
- `[ALL-SETTINGS]` - Must be replaced with specific configuration

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

Essential utility commands combined with natural @Agent behavioral patterns provide intuitive control over the virtual team system. Most work happens through natural language interaction with the 14-role team rather than command scaffolding.