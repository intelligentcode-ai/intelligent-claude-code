# Commands Reference

## Overview
The intelligent-claude-code system now provides **3 essential commands** for a lean, powerful virtual team experience. PRB generation, story management, and specialist creation are now handled automatically by the system.

## Core Commands

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

## Automatic System Features

### PRB Generation
**No commands needed** - PRBs are generated automatically when you:
- Make work requests: "Build a REST API for user management"
- Use @Role mentions: "@Developer implement authentication"
- Reference work items: "Fix BUG-001"

**Process:**
1. System analyzes work complexity automatically
2. Selects appropriate template (Nano/Tiny/Medium/Large/Mega)
3. Embeds relevant context and learnings
4. Assigns appropriate specialist role
5. Creates self-contained execution blueprint

### Story Management
**No commands needed** - Stories are managed through:
- Natural language: "@PM break down the authentication story"
- Direct communication: "@PM what story should we work on next?"

### Specialist Creation
**No commands needed** - Specialists are created automatically when:
- Expertise match is <70% with existing roles
- Domain-specific knowledge is required
- All specialists have 10+ years expertise

### Memory Management
**Automatic storage** - System stores learnings automatically:
- During PRB execution
- After problem resolution
- On successful pattern completion

## Usage Patterns

### Starting New Work
```bash
/icc-init-system                              # Initialize once
"Build a REST API for user management"        # Natural language request
# System automatically generates PRB and executes
```

### Working with Stories
```bash
"@PM break down the authentication story"     # Story to PRBs
"@PM what should we work on next?"            # Story selection
# No explicit commands needed
```

### Complex Problem Solving
```bash
"How should we handle 10K concurrent websocket connections?"
# System automatically engages appropriate specialists
```

### Configuration Management
```bash
/icc-get-setting autonomy_level               # Check current settings
/icc-get-setting git_privacy                 # Verify configuration
```

### Memory Operations
```bash
/icc-search-memory "authentication patterns"  # Find relevant learnings
# Memory storage happens automatically during work
```

## Lean System Benefits

### Simplified Interaction
- **Natural Language**: Speak directly to the system
- **Auto-Detection**: Work patterns recognized automatically
- **Role-Based**: Use @Role mentions for specific expertise

### Automatic Operations
- **PRB Generation**: No manual creation needed
- **Complexity Analysis**: Handled automatically
- **Specialist Assignment**: System chooses optimal roles
- **Memory Storage**: Learnings captured automatically

### Essential Commands Only
- **System Init**: `/icc-init-system` for setup
- **Configuration**: `/icc-get-setting` for values
- **Memory Search**: `/icc-search-memory` for exploration

## Tips

### Effective Communication
- Use natural language for work requests
- Mention @Roles for specific expertise
- Reference existing work items by ID
- Include constraints and success criteria

### Memory Utilization
- Search memory before starting complex work
- Review patterns for similar problems
- Trust automatic learning capture

### System Configuration
- Check settings with `/icc-get-setting`
- Initialize with appropriate autonomy level
- Let system handle complexity decisions

---

**3 commands. Unlimited power.** The lean command system provides complete virtual team control through natural interaction patterns.