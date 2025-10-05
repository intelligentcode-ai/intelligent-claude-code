# Configuration Guide - Intelligent Claude Code

## Overview

This guide covers all configuration options available in the Intelligent Claude Code system. The system uses a hierarchical configuration approach with behavioral patterns defined in markdown files.

## Configuration Hierarchy

Settings are loaded in this priority order (highest to lowest):

1. **Embedded config** (in AgentTasks) - Configuration values resolved at generation time
2. **Project config** (`./config.md` or `.claude/config.md`) - Project-specific settings
3. **User global** (`~/.claude/config.md` - system-wide only) - User preferences
4. **System defaults** - Built-in fallback values

**Key Change from STORY-007/008**: All AgentTask templates now embed complete configuration at generation time rather than performing runtime config lookups, ensuring self-contained execution.

## Memory Configuration

The memory system is highly configurable to support different deployment scenarios.

### Basic Memory Settings

#### Default Configuration (No Setup Required)
```yaml
# No configuration needed - uses project-local memory
# Memory stored in: ./memory/
# Behavior: Version-controlled with project
```

#### External Memory Path Configuration
```yaml
# In CLAUDE.md or config.md
memory_configuration:
  external_path: "~/claude-memory"
```

### Memory Path Types and Examples

#### 1. Home Directory Storage
```yaml
memory_configuration:
  external_path: "~/claude-memory"
```
- **Expands to**: `/home/username/claude-memory` (Linux/macOS)
- **Use case**: Personal, private memory storage
- **Benefits**: Private to user, works across all projects

#### 2. Relative Path Storage
```yaml
memory_configuration:
  external_path: "../shared-memory"      # Parent directory
  external_path: "../../team-memory"    # Two levels up
  external_path: "../ai-knowledge"      # Sibling directory
```
- **Resolves relative to**: Project root directory
- **Use case**: Team sharing, multi-project setups
- **Benefits**: Portable across different systems

#### 3. Absolute Path Storage
```yaml
memory_configuration:
  external_path: "/opt/ai-memory"                    # System directory
  external_path: "/Users/dev/Documents/ai-memory"   # macOS
  external_path: "/home/dev/ai-memory"               # Linux
  external_path: "C:\\AI\\Memory"                   # Windows
```
- **Use case**: Fixed system locations, network drives
- **Benefits**: Precise control, shared network storage

### Git Repository Integration

When the memory path contains a `.git` directory, the system automatically manages version control:

#### Basic Git Memory Configuration
```yaml
memory_configuration:
  external_path: "~/claude-memory-repo"
```

#### Advanced Git Memory Setup

1. **Initialize Git repository**:
```bash
mkdir ~/claude-memory-repo
cd ~/claude-memory-repo
git init
git remote add origin git@github.com:username/private-memory.git
```

2. **Configure in CLAUDE.md**:
```yaml
memory_configuration:
  external_path: "~/claude-memory-repo"
```

3. **Automatic behavior**:
   - System detects `.git` directory
   - Auto-commits memory changes
   - Uses descriptive commit messages
   - Preserves full learning history

### Memory Path Validation

The system validates memory paths with these checks:

#### Security Validations
- **Sensitive Data Blocking**: Prevents storage of passwords, tokens, credentials
- **Path Safety**: Blocks dangerous system directories
- **Access Control**: Validates read/write permissions
- **Content Scanning**: Scans for sensitive patterns before storage

#### Path Resolution Process
1. **Configuration Check**: Load `external_path` from hierarchy
2. **Path Expansion**: Handle `~` and relative paths
3. **Directory Creation**: Auto-create if missing
4. **Permission Validation**: Ensure read/write access
5. **Git Detection**: Check for `.git` directory
6. **Ready for Use**: Path validated and ready

## Complete Configuration Examples

### Example 1: Privacy-Focused Individual Developer
```yaml
# CLAUDE.md
memory_configuration:
  external_path: "~/private-ai-memory"

# Behavioral settings
autonomy_level: "L2"
git_privacy: true

# Project-specific settings
prb_configuration:
  best_practices_paths:
    - "docs/standards/"
```

**Result**: Private memory storage, moderate autonomy, clean git commits.

### Example 2: Team Collaboration Setup
```yaml
# CLAUDE.md
memory_configuration:
  external_path: "/shared/team/ai-memory"

# Team settings
autonomy_level: "L1"
git_privacy: false

# Shared practices
prb_configuration:
  best_practices_paths:
    - "/shared/team/practices/"
    - "docs/team-standards/"
```

**Result**: Shared team memory, manual approval required, collaborative practices.

### Example 3: Multi-Project Consistency
```yaml
# CLAUDE.md (same across all projects)
memory_configuration:
  external_path: "~/unified-ai-memory"

# High autonomy for experienced use
autonomy_level: "L3"

# Project-specific practices
prb_configuration:
  best_practices_paths:
    - "docs/practices/"
  code_pattern_search:
    paths: ["src/", "lib/", "components/"]
```

**Result**: Consistent AI knowledge across projects, high autonomy, project-specific practices.

### Example 4: Version-Controlled Learning History
```yaml
# CLAUDE.md
memory_configuration:
  external_path: "~/ai-memory-git-repo"

# Git integration settings
git_privacy: false  # Allow AI mentions in memory commits
branch_protection: false  # Direct commits to memory repo

# Memory-focused configuration
prb_configuration:
  behavioral_overrides:
    memory_first: true
    learning_capture: "detailed"
```

**Result**: Full Git history of AI learning, detailed memory capture, AI attribution.

## Configuration Loading Behavior

### Dynamic Configuration Resolution
The system uses behavioral patterns for configuration management:

1. **Memory Base Path Resolution Pattern**: 
   - Check for `external_path` configuration
   - Expand home directory paths (`~`)
   - Resolve relative paths from project root
   - Create directories if missing
   - Return validated path

2. **Security Validation Pattern**:
   - Scan content for sensitive data patterns
   - Block storage if violations detected
   - Suggest alternative approaches
   - Ensure privacy and security

3. **Git Integration Pattern**:
   - Detect `.git` directory in memory path
   - Auto-commit memory changes
   - Use behavioral commit messages
   - Maintain learning history

### Configuration Validation

#### Valid Configurations
```yaml
# These work correctly
memory_configuration:
  external_path: "~/claude-memory"        # ✓ Home directory
  external_path: "../team-memory"        # ✓ Relative path
  external_path: "/opt/ai-memory"         # ✓ Absolute path
  external_path: "$HOME/ai-memory"        # ✓ Environment variable
```

#### Invalid Configurations
```yaml
# These will be rejected
memory_configuration:
  external_path: "/etc/memory"            # ✗ System directory
  external_path: "/root/memory"           # ✗ Root directory
  external_path: "invalid\\path"         # ✗ Invalid path format
  external_path: ""                      # ✗ Empty path
```

## Integration with Other Systems

### AgentTask System Integration
Memory configuration affects AgentTask generation:
- **Memory Search**: AgentTasks search configured memory location
- **Context Embedding**: Memory patterns embedded in AgentTasks
- **Learning Storage**: New learnings stored in configured location

### Behavioral Pattern Integration
Memory paths integrate with all behavioral patterns:
- **Learning Team Automation**: Uses configured memory for pattern storage
- **Memory Operations**: All operations respect external path configuration
- **Context Validation**: Memory path validated during context gathering

### Command System Integration
Configuration affects these commands:
- `/icc-search-memory`: Searches configured memory location
- `/icc-store-memory`: Stores in configured memory location  
- `/icc-memory-status`: Reports configured memory location

## Troubleshooting Configuration

### Common Configuration Issues

#### Issue: Memory not storing externally
```
Check: external_path setting in CLAUDE.md
Solution: Verify path syntax and permissions
```

#### Issue: Git operations failing
```
Check: .git directory in memory path
Solution: Initialize Git repository properly
```

#### Issue: Permission denied errors
```
Check: Directory ownership and permissions
Solution: Ensure write access to memory path
```

#### Issue: Path not found
```
Check: Parent directory exists
Solution: Create parent directories manually
```

### Configuration Debugging

To debug configuration issues:

1. **Check Configuration Loading**:
   - Verify CLAUDE.md syntax
   - Check for configuration hierarchy conflicts

2. **Validate Path Resolution**:
   - Test path expansion manually
   - Verify directory creation

3. **Monitor Memory Operations**:
   - Watch for memory storage during interactions
   - Verify files appear in expected location

## Best Practices

### Configuration Organization
- Keep memory configuration in CLAUDE.md for visibility
- Use comments to document path choices
- Maintain consistent paths across related projects

### Security Considerations
- Never commit actual credentials to memory paths
- Use private repositories for memory storage
- Validate external path security before deployment

### Performance Optimization
- Prefer local paths for single-user setups
- Use network paths only when necessary
- Consider Git repository size for long-term memory storage

### Team Collaboration
- Document team memory path decisions
- Ensure all team members have access to shared paths
- Consider read-only access for some team members

## Agent System Configuration

The 14-role virtual team system with unlimited dynamic specialist creation is fully configurable.

### Core Agent Settings

```yaml
# In CLAUDE.md or config.md
agent_configuration:
  # Autonomy levels
  autonomy_level: "L2"                    # L1=Manual, L2=Guided, L3=Autonomous
  
  # L3 Autonomous mode settings
  l3_settings:
    max_parallel_tasks: 5                 # Concurrent task limit
    auto_discover_work: true              # Discover PLANNED/IN_PROGRESS tasks
    continue_on_error: true               # Keep working on other tasks if one fails
    memory_improvement: true              # Continuously improve memory patterns
    
  # Dynamic specialist creation
  specialist_creation: 
    enabled: true                         # Allow unlimited specialist creation
    expertise_threshold: "when_needed"    # Create when technology expertise needed
    storage_location: ".claude/agents/dynamic/"  # Where to store created specialists
    
  # Agent communication patterns
  communication:
    direct_agent_calls: true              # Enable @Agent mentions
    task_tool_integration: true           # Use Task tool for subagent creation
    context_preservation: true            # Preserve context across agent interactions
```

### Template Resolution Configuration

Configure how AgentTask templates are resolved with actual values:

```yaml
# Template enforcement settings
template_configuration:
  mandatory_templates: true               # Block manual AgentTask creation
  placeholder_resolution: "generation_time" # Resolve all placeholders at generation
  config_embedding: true                  # Embed complete config in AgentTasks
  template_source: "agenttask-templates/"   # Required template source hierarchy
  
  # Template validation
  validation:
    block_unresolved_placeholders: true   # Block [FROM_CONFIG] in final AgentTasks
    require_complete_context: true        # Require complete_context section
    enforce_template_sections: true       # All mandatory sections must be present
    
  # Runtime behavior
  runtime:
    config_lookups_blocked: true          # Block runtime config access
    self_contained_execution: true        # AgentTasks must be completely self-contained
```

### Dynamic Specialist Configuration

Control unlimited specialist creation for ANY technology domain:

```yaml
# Dynamic specialist settings
dynamic_specialists:
  # Creation triggers
  creation_policy: "always_when_needed"   # Create specialists when technology expertise needed
  domain_detection: "automatic"           # Auto-detect technology domains from work
  architect_collaboration: "mandatory"    # PM + Architect must collaborate on creation
  
  # Specialist properties
  expertise_level: "10_years_plus"        # All specialists have senior expertise
  behavioral_patterns: "embedded"         # Behavioral patterns embedded in specialist files
  storage_pattern: "@[Domain]-[RoleType]" # Naming convention
  
  # Integration
  subagent_integration: true              # Created specialists available as subagents
  prb_assignment: "automatic"             # Auto-assign work to appropriate specialists
  memory_integration: true                # Specialists contribute to memory system
```

## MCP Integration Configuration

The Model Context Protocol (MCP) integration allows projects to connect with external systems while maintaining robust file-based fallbacks.

### Complete MCP Configuration Schema

Configure MCP integrations in your project's `CLAUDE.md` file:

```yaml
mcp_integrations:
  memory:
    provider: "mcp__memory"         # Provider identifier
    enabled: true                   # Enable/disable integration
    fallback: "file-based"          # Always file-based for reliability
    config:                         # Provider-specific configuration
      graph_database: "neo4j"
      retention_days: 90
      database_url: "${NEO4J_URI}"   # Environment variables supported
      username: "${NEO4J_USER}"
      password: "${NEO4J_PASSWORD}"
  
  issue_tracking:
    provider: "mcp__github"         # Built-in GitHub provider
    enabled: true
    fallback: "file-based"
    project: "owner/repository"     # Required for issue providers
    config:
      labels: ["ai-generated", "intelligent-claude-code"]
      default_assignee: "username"
      board_id: "project-board-123"
      milestone: "Sprint 2024.1"
  
  documentation:
    provider: "mcp__confluence"     # Custom documentation provider
    enabled: true
    fallback: "file-based"
    config:
      space_key: "ENGINEERING"
      parent_page: "API Documentation"
      base_path: "docs/"
      auto_publish: true
```

### MCP Provider Types

#### Memory Providers
Handle learning storage and retrieval operations:
- **mcp__memory**: Built-in memory provider with graph database support
- **Operations**: create_entities, search_nodes, get_relations, update_observation
- **Fallback**: Uses `memory/` directory structure with topic organization

#### Issue Tracking Providers
Connect with external issue tracking systems:
- **mcp__github**: GitHub issues integration
- **mcp__jira**: Jira project management
- **mcp__gitlab**: GitLab issue tracking
- **Fallback**: Uses `stories/` and `bugs/` directory structure

#### Documentation Providers
Integrate with documentation platforms:
- **mcp__confluence**: Atlassian Confluence integration
- **user-custom-mcp**: Custom documentation providers
- **Fallback**: Uses `docs/` directory structure

### MCP Server Configuration

Create `config/mcps.json` with your MCP server definitions:

```json
{
  "mcpServers": {
    "memory": {
      "command": "python",
      "args": ["-m", "mcp_memory_server"],
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USER": "neo4j",
        "NEO4J_PASSWORD": "password"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-github-token"
      }
    }
  }
}
```

### Installation with MCP Support

```bash
# Create MCP configuration
cat > config/mcps.json << 'EOF'
# ... your MCP servers configuration ...
EOF

# Install with MCP integration
make install MCP_CONFIG=./config/mcps.json
```

### MCP Fallback Behavior

**IMPORTANT**: All MCP operations have file-based fallbacks to ensure reliability:

1. **Try Primary**: Configured MCP provider
2. **Use Fallback**: File-based operations if MCP unavailable
3. **Log Degradation**: Warning for visibility

This means projects work perfectly without MCP servers - they're purely optional enhancements.

## Template Extension Configuration

The AgentTask Template Extensions system allows projects to customize AgentTask templates without copying entire template files.

### Basic Template Extension Configuration

Create a `prb-extensions.yaml` file in your project root:

```yaml
# Universal extensions - applied to ALL template sizes
all:
  # Add new requirements to every AgentTask
  requirements:
    functional:
      - "Follow project-specific business rules"
    processual:
      - "Run project linting before completion"
      - "Execute custom validation scripts"  
      - "Update project documentation"
    technical:
      - "Follow project coding standards"
      - "Use established project patterns"
  
  # Add completely new sections
  custom_validation:
    - "Project-specific quality gates"
    - "Custom testing requirements"
    - "Security compliance checks"
  
  # Extend existing workflow settings
  workflow_additions:
    notify_teams: ["development", "qa", "security"]
    custom_checks: true
    slack_notifications: true
```

### Size-Specific Template Extensions

```yaml
# Nano-specific extensions (0-2 points)
nano:
  workflow:
    changelog_required: "!override false"  # Skip changelog for nano changes
    review_required: "!override false"     # Skip review for trivial changes

# Tiny-specific extensions (3-5 points)  
tiny:
  version_bump:
    type: "!override patch"               # Always patch for tiny changes
  validation_steps:
    - "Run unit tests"
    - "Check code style"

# Medium-specific extensions (6-15 points)
medium:
  review_checklist:
    - "Integration test coverage > 70%"
    - "API contract validation"
    - "Performance impact assessment"
  
  implementation:
    coordination_required: true
    breaking_change_assessment: true

# Large-specific extensions (16-30 points)
large:
  planning_requirements:
    - "Architecture review completed"
    - "Cross-team coordination planned"
    - "Rollback strategy defined"
  
  validation:
    load_testing: true
    security_review: true
    stakeholder_approval: true

# Mega-specific extensions (30+ points)
mega:
  governance:
    executive_approval: true
    change_advisory_board: true
    business_impact_assessment: true
  
  risk_management:
    disaster_recovery_plan: true
    communication_plan: true
    phased_rollout: true
```

### Template Extension File Locations

The system searches for template extensions in this order:
1. **`{project_root}/prb-extensions.yaml`** (recommended)
2. **`{project_root}/.claude/prb-extensions.yaml`** (alternative)

### Override Syntax

Use the `!override` prefix to replace base template values:
- **`"!override false"`**: Force false value
- **`"!override patch"`**: Force specific string value
- **`"!override true"`**: Force true value

## Dynamic Path Resolution

The system uses intelligent path resolution to locate installation and configuration files dynamically.

### Installation Path Detection

The system detects installation location in this priority order:
1. **Project Scope**: `{project_root}/.claude/` (project-specific installation)
2. **Environment Variable**: `CLAUDE_INSTALL_PATH` environment variable
3. **User Scope**: `~/.claude/` (global user installation)
4. **Error**: Report installation not detected if none found

### Path Resolution Functions

#### get_install_path()
- **Purpose**: Returns actual installation directory
- **Caching**: 5-minute TTL for performance
- **Returns**: Absolute path to installation base

#### get_project_path(setting_key, default_value)
- **Purpose**: Resolves project-specific paths with configuration override support
- **Examples**:
  - `get_project_path("story_path", "stories")` → Uses configured story directory
  - `get_project_path("memory_path", "memory")` → Uses configured memory directory
  - `get_project_path("prb_template_path", "prb-templates")` → Uses configured template directory

#### Dynamic Configuration Loading
- **Template Paths**: Project → User → System template hierarchy
- **Memory Paths**: External → Project → Default path resolution
- **Config Paths**: Embedded → Project → User → System defaults

### Path Resolution Examples

```yaml
# In CLAUDE.md or config.md
directory_structure:
  story_path: "user-stories"          # Custom story directory
  bug_path: "issues"                  # Custom bug directory  
  prb_path: "requirements"            # Custom AgentTask directory
  memory_path: "knowledge-base"       # Custom memory directory
  prb_template_path: "custom-templates" # Custom template directory

# System automatically resolves:
# get_project_path("story_path", "stories") → "user-stories"
# get_project_path("prb_template_path", "prb-templates") → "custom-templates"
```

## Complete Settings Reference

### Configuration Hierarchy Settings

| Setting Category | Setting Key | Type | Default Value | Description |
|------------------|-------------|------|---------------|-------------|
| **Git Settings** | `git_privacy` | boolean | `true` | Strip AI mentions from commits |
| | `branch_protection` | boolean | `true` | Protect main branch from direct pushes |
| | `default_branch` | string | `"main"` | Default branch name |
| | `require_pr_for_main` | boolean | `true` | Require pull requests for main branch |
| **Autonomy Settings** | `autonomy_level` | string | `"L2"` | L1=Manual, L2=Guided, L3=Autonomous |
| | `pm_always_active` | boolean | `true` | Always activate PM role |
| | `blocking_enabled` | boolean | `true` | Enable enforcement blocking |
| **L3 Autonomous Settings** | `l3_settings.max_parallel_tasks` | number | `5` | Concurrent task limit |
| | `l3_settings.auto_discover_work` | boolean | `true` | Auto-discover PLANNED/IN_PROGRESS |
| | `l3_settings.continue_on_error` | boolean | `true` | Continue on task failures |
| | `l3_settings.memory_improvement` | boolean | `true` | Continuous memory improvement |

### Team and Agent Settings

| Setting Category | Setting Key | Type | Default Value | Description |
|------------------|-------------|------|---------------|-------------|
| **Agent Configuration** | `agent_configuration.specialist_creation` | boolean | `true` | Allow unlimited specialist creation |
| | `agent_configuration.expertise_threshold` | string | `"when_needed"` | Specialist creation trigger |
| | `agent_configuration.storage_location` | string | `".claude/agents/dynamic/"` | Dynamic specialist storage |
| **Communication** | `communication.direct_agent_calls` | boolean | `true` | Enable @Agent mentions |
| | `communication.task_tool_integration` | boolean | `true` | Use Task tool for subagents |
| | `communication.context_preservation` | boolean | `true` | Preserve context across agents |
| **Team Settings** | `default_reviewer` | string | `"@Architect"` | Default code reviewer role |
| | `role_validation` | boolean | `true` | Validate role assignments |

### Template and AgentTask Settings

| Setting Category | Setting Key | Type | Default Value | Description |
|------------------|-------------|------|---------------|-------------|
| **Template Configuration** | `template_configuration.mandatory_templates` | boolean | `true` | Block manual AgentTask creation |
| | `template_configuration.placeholder_resolution` | string | `"generation_time"` | When to resolve placeholders |
| | `template_configuration.config_embedding` | boolean | `true` | Embed complete config in AgentTasks |
| | `template_configuration.template_source` | string | `"agenttask-templates/"` | Required template source |
| **Template Validation** | `validation.block_unresolved_placeholders` | boolean | `true` | Block [FROM_CONFIG] in AgentTasks |
| | `validation.require_complete_context` | boolean | `true` | Require complete_context section |
| | `validation.enforce_template_sections` | boolean | `true` | All mandatory sections required |
| **Runtime Behavior** | `runtime.config_lookups_blocked` | boolean | `true` | Block runtime config access |
| | `runtime.self_contained_execution` | boolean | `true` | AgentTasks must be self-contained |

### Directory Structure Settings

| Setting Category | Setting Key | Type | Default Value | Description |
|------------------|-------------|------|---------------|-------------|
| **Directory Paths** | `directory_structure.story_path` | string | `"stories"` | Story directory name |
| | `directory_structure.bug_path` | string | `"bugs"` | Bug directory name |
| | `directory_structure.prb_path` | string | `"prbs"` | AgentTask directory name |
| | `directory_structure.memory_path` | string | `"memory"` | Memory directory name |
| | `directory_structure.docs_path` | string | `"docs"` | Documentation directory |
| | `directory_structure.src_path` | string | `"src"` | Source code directory |
| | `directory_structure.test_path` | string | `"tests"` | Test directory name |
| | `directory_structure.config_path` | string | `"config"` | Configuration directory |
| | `directory_structure.prb_template_path` | string | `"prb-templates"` | Template directory name |

### Memory Configuration Settings

| Setting Category | Setting Key | Type | Default Value | Description |
|------------------|-------------|------|---------------|-------------|
| **Memory Paths** | `memory_configuration.external_path` | string | `null` | External memory storage path |
| **Memory Behavior** | `memory_configuration.auto_commit` | boolean | `true` | Auto-commit memory changes |
| | `memory_configuration.git_integration` | boolean | `true` | Enable Git integration |
| | `memory_configuration.retention_policy` | string | `"unlimited"` | Memory retention policy |

### MCP Integration Settings

| Setting Category | Setting Key | Type | Default Value | Description |
|------------------|-------------|------|---------------|-------------|
| **Memory Provider** | `mcp_integrations.memory.enabled` | boolean | `false` | Enable MCP memory provider |
| | `mcp_integrations.memory.provider` | string | `null` | Memory provider identifier |
| | `mcp_integrations.memory.fallback` | string | `"file-based"` | Fallback strategy |
| **Issue Tracking** | `mcp_integrations.issue_tracking.enabled` | boolean | `false` | Enable issue tracking provider |
| | `mcp_integrations.issue_tracking.provider` | string | `null` | Issue provider identifier |
| | `mcp_integrations.issue_tracking.project` | string | `null` | Target project/repository |
| **Documentation** | `mcp_integrations.documentation.enabled` | boolean | `false` | Enable documentation provider |
| | `mcp_integrations.documentation.provider` | string | `null` | Documentation provider |
| | `mcp_integrations.documentation.config` | object | `{}` | Provider-specific config |

### Workflow Settings by AgentTask Size

| AgentTask Size | Version Bump | Changelog | PR Required | Merge Strategy | Release Automation |
|----------|-------------|-----------|-------------|----------------|--------------------|
| **Nano (0-2 pts)** | `false` | `false` | `false` | `direct_commit` | `false` |
| **Tiny (3-5 pts)** | `true` (patch) | `true` | `false` | `direct_commit` | `false` |
| **Medium (6-15 pts)** | `true` (minor) | `true` | `true` | `feature_branch` | `true` |
| **Large (16-30 pts)** | `true` (minor) | `true` | `true` | `feature_branch` | `true` |
| **Mega (30+ pts)** | `true` (major) | `true` | `true` | `feature_branch` | `true` |

## PM Constraints and Enforcement

### Overview

The `blocking_enabled` setting controls how PM (Project Manager) role constraint violations are handled by the PreToolUse hook system.

### Configuration

```yaml
blocking_enabled: true  # Default - recommended for production
```

**Configuration Hierarchy** (checked in priority order):
1. `./CLAUDE.md` - Project CLAUDE.md (highest priority)
2. `./.claude/CLAUDE.md` - Project .claude/CLAUDE.md
3. `~/.claude/CLAUDE.md` - User global CLAUDE.md (fallback)

### Enforcement Modes

#### BLOCKING Mode (Default)

**When**: `blocking_enabled: true` or setting not found (secure by default)

**Behavior**:
- PM constraint violations are **blocked** with exit code 2
- Operations prevented from proceeding
- Error messages displayed to user
- Comprehensive logging of violations

**Use Cases**:
- Production environments
- Strict governance requirements
- Team collaboration with enforced roles
- Security-sensitive projects

**Example Violation**:
```
🚫 PM role is coordination only - create AgentTask for technical work

Blocked: src/hooks/example.js
Reason: PM cannot modify files in src/

Allowed directories: stories, bugs, memory, docs, agenttasks, root *.md files
```

#### WARNING Mode (Non-Blocking)

**When**: `blocking_enabled: false`

**Behavior**:
- PM constraint violations log **warnings** with exit code 0
- Operations allowed to proceed
- Warnings logged for review
- Educational feedback provided

**Use Cases**:
- Learning environments
- Exploratory work and prototyping
- Solo developer projects
- Development and testing of system itself

**Example Warning**:
```
⚠️ WARNING (non-blocking): PM role is coordination only

Suggested: Create AgentTask for technical work
Operation: Edit src/hooks/example.js
Allowed: Proceeding with operation for learning purposes
```

### Constraint Types

The `blocking_enabled` setting applies to three types of PM violations:

1. **Summary Files in Root**
   - Detects: Files matching SUMMARY, REPORT, VALIDATION, ANALYSIS patterns
   - Suggests: Moving to `./summaries/` directory
   - Applies to: All roles (PM and agents)

2. **Blocked Bash Commands**
   - Blocks: npm, yarn, make, docker, cargo, kubectl, terraform, ansible, etc.
   - Reason: Build/deploy/system commands require specialist agents
   - PM Allowed: Read-only commands (git status, ls, grep, etc.)

3. **File Operations Outside Allowlist**
   - PM Allowlist: stories/, bugs/, memory/, docs/, agenttasks/, root *.md
   - PM Blocklist: src/, lib/, config/, tests/
   - Tools Checked: Edit, Write, MultiEdit

### Configuration Examples

#### Production Environment (Strict Enforcement)

```yaml
# CLAUDE.md
autonomy_level: L2
blocking_enabled: true   # Enforce PM constraints strictly
git_privacy: true        # Strip AI mentions from commits
```

#### Learning Environment (Flexible Exploration)

```yaml
# CLAUDE.md
autonomy_level: L3
blocking_enabled: false  # Allow violations with warnings
git_privacy: false       # Preserve full commit messages
```

#### Mixed Environment (Project Override)

**User Global** (`~/.claude/CLAUDE.md`):
```yaml
blocking_enabled: true   # Default strict for all projects
```

**Project** (`./CLAUDE.md`):
```yaml
blocking_enabled: false  # Override for this learning project
```

### Hook Integration

The PM constraints enforcement hook (`pm-constraints-enforcement.js`) automatically:

1. Checks configuration hierarchy for `blocking_enabled`
2. Defaults to `true` (BLOCKING) if not found
3. Applies appropriate enforcement mode
4. Logs mode selection and violations comprehensively

**Hook Logs** (`~/.claude/logs/YYYY-MM-DD-pm-constraints-enforcement.log`):
```
[2025-10-05T18:00:00.000Z] Config found at ./CLAUDE.md: blocking_enabled=false
[2025-10-05T18:00:01.000Z] PM context: isSidechain=false in assistant tool_use entry
[2025-10-05T18:00:01.001Z] File operation BLOCKED: src/test.js
[2025-10-05T18:00:01.002Z] ⚠️ WARNING (non-blocking): PM role is coordination only...
```

### Best Practices

**Recommended Settings**:
- Production: `blocking_enabled: true` (strict enforcement)
- Development: `blocking_enabled: true` (learn correct patterns)
- Learning: `blocking_enabled: false` (explore system behavior)
- Testing: `blocking_enabled: false` (verify hook logic)

**Migration Strategy**:
1. Start with `blocking_enabled: false` (learning mode)
2. Understand PM constraints and AgentTask patterns
3. Switch to `blocking_enabled: true` (production mode)
4. Use AgentTask system for all technical work

**Troubleshooting**:
- Hook not blocking: Check CLAUDE.md for `blocking_enabled: false`
- Unexpected blocking: Verify configuration hierarchy (project overrides user)
- Agent operations blocked: Check hook logs for agent detection (should see `isSidechain: true`)

## Configuration Usage Examples

### Access Configuration Values

```bash
# Get specific setting values
/icc-get-setting git_privacy                    # Returns: true
/icc-get-setting autonomy_level                 # Returns: L2
/icc-get-setting mcp_integrations.memory.enabled # Returns: false
/icc-get-setting directory_structure.story_path  # Returns: stories
```

### Environment-Specific Configuration

```yaml
# Development environment
automy_level: "L3"                    # High autonomy for development
git_privacy: false                     # Allow AI attribution
mcp_integrations:
  memory:
    enabled: true
    provider: "mcp__memory"
    config:
      database_url: "bolt://localhost:7687"
```

```yaml
# Production environment  
automy_level: "L1"                    # Manual approval required
git_privacy: true                      # Strip AI mentions
branch_protection: true                # Protect main branch
require_pr_for_main: true             # Require pull requests
```

This configuration guide provides comprehensive coverage of all configuration options including MCP integration, template extensions, dynamic path resolution, and complete settings reference for the Intelligent Claude Code system.