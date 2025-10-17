# Configuration Guide

Comprehensive guide to Intelligent Claude Code unified JSON configuration system.

## Overview

The system uses unified JSON configuration with hierarchical loading and separate workflow settings.

**Configuration Files**:
- `icc.config.json` - Core system settings (70+ settings across 15 categories)
- `icc.workflow.json` - Workflow settings by AgentTask tier (45 settings)

**Configuration Hierarchy** (highest to lowest priority):
1. Project configuration (`./icc.config.json`, `./icc.workflow.json`)
2. User global configuration (`~/.claude/icc.config.json`, `~/.claude/icc.workflow.json`)
3. System defaults (`~/.claude/icc.config.default.json`, `~/.claude/icc.workflow.default.json`)
4. Legacy YAML (backward compatibility only, triggers migration warning)

## Core Configuration (icc.config.json)

### Autonomy Settings

**autonomy.level** (L1 | L2 | L3)
- **Default**: L2
- **Description**: Autonomy level for agent execution
- **Values**:
  - **L1**: Manual approval required for all operations
  - **L2**: Guided mode with architect approval for technical decisions
  - **L3**: Full autonomous execution with continuous work discovery

**autonomy.pm_always_active** (boolean)
- **Default**: true
- **Description**: Always activate PM role for coordination

**autonomy.l3_settings.max_parallel** (integer, 1-10)
- **Default**: 5
- **Description**: Maximum parallel tasks in L3 autonomous mode

**autonomy.l3_settings.auto_discover** (boolean)
- **Default**: true
- **Description**: Automatically discover and execute available work in L3 mode

**autonomy.l3_settings.continue_on_error** (boolean)
- **Default**: true
- **Description**: Continue L3 work discovery after ICC principle violations
- **Important**: Applies to ICC violations (PM behavioral compliance), NOT deployment/production errors

### Git Settings

**git.privacy** (boolean)
- **Default**: false
- **Description**: Strip AI mentions from commit messages before commits
- **Privacy Patterns**: Configured in `git.privacy_patterns` array

**git.privacy_patterns** (array of strings)
- **Default**: `["AI", "Claude", "agent", "Generated with Claude Code", "Co-Authored-By: Claude"]`
- **Description**: Patterns to strip when git_privacy enabled

**git.branch_protection** (boolean)
- **Default**: true
- **Description**: Enable main branch protection

**git.default_branch** (string)
- **Default**: "main"
- **Description**: Default branch name for repository

**git.require_pr_for_main** (boolean)
- **Default**: true
- **Description**: Require pull requests for main branch changes

**git.validate_commits** (boolean)
- **Default**: true
- **Description**: Validate commit message format

### Path Settings

**paths.story_path** (string)
- **Default**: "stories"
- **Description**: Directory for user stories

**paths.bug_path** (string)
- **Default**: "bugs"
- **Description**: Directory for bug reports

**paths.memory_path** (string)
- **Default**: "memory"
- **Description**: Directory for version-controlled memory storage

**paths.docs_path** (string)
- **Default**: "docs"
- **Description**: Directory for documentation

**paths.src_path** (string)
- **Default**: "src"
- **Description**: Directory for source code

**paths.test_path** (string)
- **Default**: "tests"
- **Description**: Directory for test files

**paths.config_path** (string)
- **Default**: "config"
- **Description**: Directory for configuration files

**paths.agenttask_template_path** (string)
- **Default**: "agenttask-templates"
- **Description**: Directory for AgentTask templates

### Team Settings

**team.default_reviewer** (string)
- **Default**: "@Architect"
- **Description**: Default code reviewer role

**team.specialist_creation** (boolean)
- **Default**: true
- **Description**: Allow dynamic specialist creation for technology domains

**team.role_validation** (boolean)
- **Default**: true
- **Description**: Validate role assignments before execution

### AgentTask Settings

**agenttask.template_validation** (boolean)
- **Default**: true
- **Description**: Validate AgentTask template compliance

**agenttask.complexity_override** (boolean)
- **Default**: false
- **Description**: Allow manual complexity override

**agenttask.auto_breakdown** (boolean)
- **Default**: true
- **Description**: Automatically break down large tasks

**agenttask.size_limits** (object)
- **nano**: { min: 0, max: 2 }
- **tiny**: { min: 3, max: 5 }
- **medium**: { min: 6, max: 15 }
- **large**: { min: 16, max: 30 }
- **mega**: { min: 31, max: 999 }

### Memory Settings

**memory.integration** (boolean)
- **Default**: true
- **Description**: Enable memory integration system

**memory.auto_storage** (boolean)
- **Default**: true
- **Description**: Automatically store learnings after execution

**memory.search_before_questions** (boolean)
- **Default**: true
- **Description**: Search memory before asking users for information

**memory.max_search_results** (integer)
- **Default**: 3
- **Description**: Maximum number of memory search results to return

**memory.max_search_tokens** (integer)
- **Default**: 1000
- **Description**: Maximum tokens in memory search results

**memory.relevance_threshold** (integer, 0-10)
- **Default**: 6
- **Description**: Minimum relevance score for memory results

### Quality Settings

**quality.enforce_peer_review** (boolean)
- **Default**: true
- **Description**: Require peer review for code changes

**quality.testing_required** (boolean)
- **Default**: true
- **Description**: Require tests for new features

**quality.documentation_required** (boolean)
- **Default**: true
- **Description**: Require documentation updates

**quality.security_validation** (boolean)
- **Default**: true
- **Description**: Enable security validation checks

**quality.compliance_checking** (boolean)
- **Default**: true
- **Description**: Enable compliance checking

### Development Settings

**development.auto_cleanup** (boolean)
- **Default**: true
- **Description**: Automatically clean up temporary files

**development.file_management_strict** (boolean)
- **Default**: true
- **Description**: Enforce strict file management rules

**development.testing_approach** (minimal | standard | comprehensive)
- **Default**: "comprehensive"
- **Description**: Testing approach for implementations

**development.allowed_allcaps_files** (array)
- **Default**: `["README.md", "LICENSE", "LICENSE.md", "CLAUDE.md", "CHANGELOG.md", "CONTRIBUTING.md", "AUTHORS", "NOTICE", "PATENTS", "VERSION", "MAKEFILE", "DOCKERFILE", "COPYING", "COPYRIGHT"]`
- **Description**: List of ALL-CAPITALS filenames that are allowed in the project (well-known files)
- **Example**:
  ```json
  {
    "development": {
      "allowed_allcaps_files": [
        "README.md",
        "LICENSE",
        "CLAUDE.md",
        "CUSTOM-FILE.md"
      ]
    }
  }
  ```
- **Usage**: Customize which ALL-CAPITALS filenames are permitted in your project. Projects can add their own files to the list.

### Tool Settings

**tools.context7_enabled** (boolean)
- **Default**: true
- **Description**: Enable Context7 documentation integration

**tools.sequential_thinking** (boolean)
- **Default**: true
- **Description**: Enable sequential thinking framework

**tools.mcp_tools_enabled** (boolean)
- **Default**: true
- **Description**: Enable MCP tool integrations

### Subagent Settings

**subagents.model** (sonnet | opus | haiku)
- **Default**: "sonnet"
- **Description**: Default model for subagent execution

**subagents.threshold** (integer)
- **Default**: 3
- **Description**: Complexity threshold for subagent delegation

**subagents.max_concurrent** (integer, 1-10)
- **Default**: 5
- **Description**: Maximum concurrent subagent executions

**subagents.auto_delegation** (boolean)
- **Default**: true
- **Description**: Automatically delegate to subagents when threshold met

### Project Settings

**project.repository_type** (git | mercurial | svn)
- **Default**: "git"
- **Description**: Version control system type

**project.release_automation** (boolean)
- **Default**: true
- **Description**: Enable automated release management

### Enforcement Settings

**enforcement.blocking_enabled** (boolean)
- **Default**: true
- **Description**: Enable enforcement blocking on violations (PM constraints, etc.)

**enforcement.violation_logging** (boolean)
- **Default**: true
- **Description**: Log enforcement violations

**enforcement.auto_correction** (boolean)
- **Default**: true
- **Description**: Automatically correct violations when possible

**enforcement.strict_main_scope** (boolean)
- **Default**: true
- **Description**: Enforces main scope to only perform coordination work
- **When enabled**: Main scope (outside of agent context) can only:
  - Read files and search (Read, Grep, Glob)
  - Create AgentTasks (Task tool)
  - Track tasks (TodoWrite)
  - Write to allowlist directories
  - Execute read-only coordination bash commands
- **All technical operations**: Must be delegated to specialist agents via Task tool (infrastructure, build, deploy, scripting)
- **Use Cases**:
  - Enforce strict delegation to agents
  - Prevent direct technical work in main scope
  - Ensure AgentTask-driven workflow
- **Disable for**:
  - Rapid prototyping without agent overhead
  - Single-user simple projects
  - Debugging and troubleshooting

**enforcement.strict_main_scope_message** (string)
- **Default**: "Main scope is limited to coordination work only. Create AgentTasks via Task tool for all technical operations."
- **Description**: Custom message to display when strict main scope enforcement blocks an operation

### Best Practices Settings

**best_practices.search_enabled** (boolean)
- **Default**: true
- **Description**: Enable best practices search

**best_practices.auto_generation** (boolean)
- **Default**: true
- **Description**: Automatically generate best practices from patterns

**best_practices.promotion_threshold** (integer)
- **Default**: 3
- **Description**: Number of successful uses before promoting to best practice

**best_practices.categories** (array of strings)
- **Default**: `["architecture", "collaboration", "development", "git", "operations", "quality", "security"]`
- **Description**: Best practice categories

### MCP Integration Settings

**mcp_integrations.[service].provider** (string)
- **Description**: MCP provider name
- **Example**: "mcp__memory", "mcp__github"

**mcp_integrations.[service].enabled** (boolean)
- **Description**: Enable this MCP integration

**mcp_integrations.[service].fallback** (string)
- **Default**: "file-based"
- **Description**: Fallback mechanism when MCP unavailable

**mcp_integrations.[service].config** (object)
- **Description**: Service-specific configuration

### Cache Settings

**cache.ttl_minutes** (integer)
- **Default**: 5
- **Description**: Configuration cache TTL in minutes

**cache.enabled** (boolean)
- **Default**: true
- **Description**: Enable configuration caching

### Logging Settings

**logging.enabled** (boolean)
- **Default**: true
- **Description**: Enable system logging

**logging.retention_hours** (integer)
- **Default**: 24
- **Description**: Log retention period in hours

**logging.directory** (string)
- **Default**: "~/.claude/logs"
- **Description**: Log storage directory

## Workflow Configuration (icc.workflow.json)

Workflow settings control version management, changelog requirements, PR requirements, and release automation based on AgentTask complexity tier.

### Tier Overview

- **nano** (0-2 points): Trivial one-line changes
- **tiny** (3-5 points): Simple single-file tasks
- **medium** (6-15 points): Multi-file features
- **large** (16-30 points): Complex features with coordination
- **mega** (30+ points): Major features with breaking changes

### Workflow Settings by Tier

**nano tier** (0-2 points):
- `version_bump`: false
- `changelog_required`: false
- `pr_required`: false
- `merge_strategy`: "direct_commit"
- `release_automation`: false

**tiny tier** (3-5 points):
- `version_bump`: true
- `version_type`: "patch"
- `changelog_required`: true
- `pr_required`: false
- `merge_strategy`: "direct_commit"
- `release_automation`: false

**medium tier** (6-15 points):
- `version_bump`: true
- `version_type`: "minor"
- `changelog_required`: true
- `pr_required`: true
- `merge_strategy`: "feature_branch"
- `release_automation`: true
- `auto_merge`: false

**large tier** (16-30 points):
- `version_bump`: true
- `version_type`: "minor"
- `changelog_required`: true
- `pr_required`: true
- `merge_strategy`: "feature_branch"
- `release_automation`: true
- `auto_merge`: false
- `coordination_required`: true

**mega tier** (30+ points):
- `version_bump`: true
- `version_type`: "major"
- `changelog_required`: true
- `pr_required`: true
- `merge_strategy`: "feature_branch"
- `release_automation`: true
- `auto_merge`: false
- `coordination_required`: true
- `breaking_change_assessment`: true

## Configuration Override Examples

### Project-Level Override

Create `icc.config.json` in project root:

```json
{
  "autonomy": {
    "level": "L3"
  },
  "git": {
    "privacy": false,
    "default_branch": "develop"
  },
  "paths": {
    "story_path": "features",
    "bug_path": "issues"
  }
}
```

### User-Level Override

Create `~/.claude/icc.config.json`:

```json
{
  "autonomy": {
    "level": "L2"
  },
  "git": {
    "privacy": true
  }
}
```

### Workflow Override

Create `icc.workflow.json` in project root:

```json
{
  "tiny": {
    "pr_required": true
  },
  "medium": {
    "auto_merge": true
  }
}
```

## Migration from Legacy YAML

### Legacy CLAUDE.md Format

```yaml
autonomy_level: L3
git_privacy: true
blocking_enabled: true
```

### New JSON Format

```json
{
  "autonomy": {
    "level": "L3"
  },
  "git": {
    "privacy": true
  },
  "enforcement": {
    "blocking_enabled": true
  }
}
```

### Migration Steps

1. **Create icc.config.json** in project root
2. **Map legacy settings** to new structure using table below
3. **Test configuration** with `/icc-get-setting [key]` command
4. **Remove legacy settings** from CLAUDE.md (optional - backward compatibility maintained)

### Legacy Mapping Table

| Legacy Setting | New Location |
|---------------|--------------|
| autonomy_level | autonomy.level |
| team_maturity_level | autonomy.level |
| pm_always_active | autonomy.pm_always_active |
| max_parallel_tasks | autonomy.l3_settings.max_parallel |
| blocking_enabled | enforcement.blocking_enabled |
| git_privacy | git.privacy |
| branch_protection | git.branch_protection |
| default_branch | git.default_branch |
| require_pr_for_main | git.require_pr_for_main |
| validate_commits | git.validate_commits |
| story_path | paths.story_path |
| bug_path | paths.bug_path |
| memory_path | paths.memory_path |
| docs_path | paths.docs_path |
| src_path | paths.src_path |
| test_path | paths.test_path |
| config_path | paths.config_path |
| agenttask_template_path | paths.agenttask_template_path |
| enforce_peer_review | quality.enforce_peer_review |
| testing_required | quality.testing_required |
| documentation_required | quality.documentation_required |
| security_validation | quality.security_validation |
| compliance_checking | quality.compliance_checking |
| auto_cleanup | development.auto_cleanup |
| file_management_strict | development.file_management_strict |
| testing_approach | development.testing_approach |
| context7_enabled | tools.context7_enabled |
| sequential_thinking | tools.sequential_thinking |
| mcp_tools_enabled | tools.mcp_tools_enabled |
| subagent_model | subagents.model |
| subagent_threshold | subagents.threshold |
| max_concurrent_subagents | subagents.max_concurrent |
| auto_delegation | subagents.auto_delegation |
| repository_type | project.repository_type |
| release_automation | project.release_automation |
| memory_integration | memory.integration |

## Validation

### JSON Schema Validation

```bash
# Validate main config (if you have jsonschema installed)
jsonschema -i icc.config.json src/schemas/icc.config.schema.json

# Validate workflow config
jsonschema -i icc.workflow.json src/schemas/icc.workflow.schema.json
```

### IDE Support

Both configuration files include `$schema` property for IDE autocomplete:

```json
{
  "$schema": "./src/schemas/icc.config.schema.json",
  ...
}
```

VSCode, IntelliJ, and other modern editors provide autocomplete and validation.

## Troubleshooting

### Configuration Not Loading

Check hierarchy order:
1. Verify project config exists: `ls -la icc.config.json`
2. Check user config: `ls -la ~/.claude/icc.config.json`
3. Verify defaults: `ls -la ~/.claude/icc.config.default.json`

### Setting Not Applied

Check precedence (project overrides user overrides defaults):
```bash
# Use the icc-get-setting command
/icc-get-setting autonomy.level
/icc-get-setting git.privacy
```

### Legacy YAML Still Used

Migration warning appears when legacy config detected. Create `icc.config.json` to silence warning and migrate to new structure.

### Invalid JSON Syntax

Use a JSON validator or IDE with JSON support:
- VSCode: Built-in JSON validation
- Online: jsonlint.com
- Command line: `node -e "console.log(JSON.parse(require('fs').readFileSync('icc.config.json')))"`

## Cache Behavior

Configuration cached for 5 minutes (300000ms) for performance. Changes require:
- New hook invocation (automatic during normal operation)
- Manual cache clear (restart Claude Code session)

Cache location: In-memory only (no persistent storage)

## Best Practices

### Start with Defaults

Use system defaults and override only what you need:

```json
{
  "autonomy": {
    "level": "L3"
  }
}
```

### Project-Specific Settings

Keep project-specific settings in project `icc.config.json`:
- Path configurations
- Autonomy level
- Git workflow settings

### User-Wide Preferences

Keep personal preferences in `~/.claude/icc.config.json`:
- Git privacy settings
- Default reviewer preferences
- Logging preferences

### Separate Workflow Settings

Keep workflow settings in separate `icc.workflow.json` for clarity:
- Version bump policies
- PR requirements
- Release automation settings

### Version Control

**Commit project config**: `icc.config.json` and `icc.workflow.json` should be version controlled
**Ignore user config**: User-level configs should NOT be in version control

Add to `.gitignore`:
```
# User-specific ICC configuration
~/.claude/icc.config.json
~/.claude/icc.workflow.json
```

## Reference

### Complete Default Configuration

See `icc.config.default.json` and `icc.workflow.default.json` in installation directory for complete default configuration with all settings documented.

### Schema Files

- `src/schemas/icc.config.schema.json` - Core configuration JSON schema
- `src/schemas/icc.workflow.schema.json` - Workflow configuration JSON schema

### Configuration Access

Use the `/icc-get-setting` command to retrieve any configuration value:

```bash
# Get specific settings
/icc-get-setting autonomy.level
/icc-get-setting git.privacy
/icc-get-setting paths.story_path
/icc-get-setting workflow.tiny.version_bump
```

## Advanced Configuration

### MCP Integration Example

```json
{
  "mcp_integrations": {
    "memory": {
      "provider": "mcp__memory",
      "enabled": true,
      "fallback": "file-based",
      "config": {
        "graph_database": "neo4j",
        "database_url": "${NEO4J_URI}"
      }
    }
  }
}
```

### Environment-Specific Configuration

**Development** (`icc.config.json`):
```json
{
  "autonomy": { "level": "L3" },
  "git": { "privacy": false },
  "enforcement": { "blocking_enabled": false }
}
```

**Production** (`icc.config.json`):
```json
{
  "autonomy": { "level": "L2" },
  "git": { "privacy": true },
  "enforcement": { "blocking_enabled": true }
}
```

This configuration guide provides comprehensive coverage of all 115+ settings in the unified JSON configuration system for Intelligent Claude Code.
