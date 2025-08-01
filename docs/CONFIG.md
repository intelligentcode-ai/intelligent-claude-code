# Configuration Guide

This guide provides comprehensive documentation for the intelligent-claude-code settings system.

## Overview

The settings system provides flexible configuration management through a hierarchical structure. Settings control various aspects of system behavior including autonomy levels, git privacy, team activation, and workflow behaviors.

## Configuration Hierarchy

Settings are loaded in priority order (highest to lowest):

1. **Embedded Config** - Settings within assignment files
2. **Project Config** - `.claude/config.md` in project root  
3. **User Global** - `~/.claude/config.md` for user preferences
4. **System Defaults** - Built-in fallback values

### Why This Hierarchy?

- **Embedded configs** allow task-specific overrides (e.g., L3 mode for complex tasks)
- **Project configs** maintain consistency across a repository
- **User configs** set personal preferences across all projects
- **System defaults** ensure the system always has valid settings

## Configuration File Format

Configuration files use YAML format, either as frontmatter or simple key-value pairs:

### YAML Frontmatter Format (Recommended)
```yaml
---
git_privacy: true
autonomy_level: "L2"
pm_always_active: false
blocking_enabled: true
---
# Additional markdown content can go here
```

### Simple Key-Value Format
```
git_privacy: true
autonomy_level: L2
pm_always_active: false
blocking_enabled: true
```

### Embedded Config in Assignment Files
```yaml
# In epic.yaml, story.yaml, or bug.yaml
embedded_config:
  autonomy_level: "L3"
  blocking_enabled: false
  git_privacy: true
```

## Available Settings

### Git Settings

#### git_privacy
- **Type:** boolean
- **Default:** false
- **Description:** Strip AI/Claude mentions from git commits and pull requests

When enabled, automatically removes:
- Direct mentions: "AI-generated", "Claude", "Anthropic"
- Emojis: 🤖, 🧠
- Markers: [AI], (AI)
- Co-authorship: "Co-Authored-By: Claude"
- Indirect references: "automated assistant", "virtual developer"

#### branch_protection
- **Type:** boolean
- **Default:** true
- **Description:** Enforce feature branch workflow

When enabled:
- Prevents direct commits to default branch
- Requires feature branches for all work
- Enforces PR/MR workflow

#### default_branch
- **Type:** string
- **Default:** "main"
- **Options:** "main", "master", "develop"
- **Description:** Name of the default/protected branch

#### require_pr_for_main
- **Type:** boolean
- **Default:** true
- **Description:** Require pull/merge requests for default branch

### Autonomy Settings

#### autonomy_level
- **Type:** string
- **Default:** "L2"
- **Options:** "L1", "L2", "L3"
- **Description:** System autonomy level

**L1 - Manual Mode:**
- Every action requires user approval
- Maximum control, slowest execution
- Good for critical or sensitive operations

**L2 - Architect Approval Mode:**
- Technical decisions require architect approval
- Routine tasks proceed autonomously
- Balance of control and efficiency

**L3 - Full Autonomy Mode:**
- Continuous execution without stops
- Only halts for critical issues:
  - Business impact decisions
  - Security violations
  - Data loss risks
  - Critical quality failures
- 72% faster execution, 94% fewer interruptions

#### pm_always_active
- **Type:** boolean
- **Default:** false
- **Description:** Auto-activate PM role on system startup

When enabled:
- PM role activates immediately
- Task management initialized
- Progress tracking enabled
- Team coordination active

#### blocking_enabled
- **Type:** boolean
- **Default:** true
- **Description:** Allow blocking behaviors for quality enforcement

When disabled (non-blocking mode):
- Issues create follow-up tasks instead of blocking
- Reviews don't stop execution
- Continuous flow maintained
- Good for L3 autonomous operation

### Team Settings

#### default_reviewer
- **Type:** string
- **Default:** "@AI-Architect"
- **Description:** Default role for peer reviews

Common values:
- "@AI-Architect" - For architecture and design reviews
- "@Security-Engineer" - For security-focused projects
- "@QA-Engineer" - For quality-focused workflows

#### specialist_creation
- **Type:** boolean
- **Default:** true
- **Description:** Allow dynamic specialist creation

When enabled:
- System creates specialists for <70% capability match
- Unlimited technology-specific roles
- Examples: @React-Developer, @Kubernetes-Expert

#### role_validation
- **Type:** boolean
- **Default:** true
- **Description:** Enforce role assignment validation

When enabled:
- Validates capability match >70%
- Requires appropriate specialist assignment
- Prevents role mismatches

## Common Configuration Scenarios

### Scenario 1: Maximum Autonomy for Experienced Users
```yaml
# ~/.claude/config.md
---
autonomy_level: "L3"
pm_always_active: true
blocking_enabled: false
git_privacy: true
specialist_creation: true
---
```

### Scenario 2: Careful Mode for Critical Projects
```yaml
# .claude/config.md
---
autonomy_level: "L1"
pm_always_active: false
blocking_enabled: true
branch_protection: true
require_pr_for_main: true
default_reviewer: "@Security-Engineer"
---
```

### Scenario 3: Balanced Team Operation
```yaml
# ~/.claude/config.md
---
autonomy_level: "L2"
pm_always_active: true
blocking_enabled: true
git_privacy: false
default_branch: "develop"
---
```

### Scenario 4: Task-Specific Override
```yaml
# In a complex bug.yaml file
embedded_config:
  autonomy_level: "L3"  # Override to L3 for this specific task
  blocking_enabled: false
  pm_always_active: true
```

## Settings API Usage

### Loading Settings
```pseudocode
// Get all settings
settings = SettingsAPI.getSettings()

// Get specific setting with default
gitPrivacy = SettingsAPI.getSetting("git_privacy", false)

// Get nested setting
reviewer = SettingsAPI.getSetting("team.default_reviewer", "@AI-Architect")
```

### Applying Embedded Config
```pseudocode
// When processing assignment file
assignmentContent = readFile("story.yaml")
settings = SettingsAPI.applyEmbeddedConfig(assignmentContent)
```

### Reloading Settings
```pseudocode
// Force reload (clears cache)
SettingsAPI.reloadSettings()
```

## Troubleshooting

### Settings Not Applied

1. **Check File Locations:**
   - User global: `~/.claude/config.md`
   - Project: `.claude/config.md` (in project root)
   - Embedded: Within assignment YAML files

2. **Verify File Format:**
   - YAML syntax must be valid
   - Use YAML frontmatter format (between `---` markers)
   - Check for typos in setting names

3. **Check Priority:**
   - Embedded configs override all others
   - Project configs override user global
   - Use correct file for desired scope

### Git Privacy Not Working

1. **Verify Setting:**
   ```bash
   # Check if git_privacy is true in active config
   cat ~/.claude/config.md | grep git_privacy
   ```

2. **Test Manually:**
   ```bash
   # Test with a sample commit message
   echo "AI-generated fix 🤖" | # Should become "fix" with privacy enabled
   ```

### Autonomy Level Issues

1. **L3 Not Continuing:**
   - Ensure `autonomy_level: "L3"` is set
   - Check `blocking_enabled: false` for non-blocking mode
   - Verify no critical errors stopping execution

2. **Unexpected Approval Requests:**
   - Check current autonomy level
   - L1 requires approval for everything
   - L2 requires approval for technical decisions

### Cache Issues

- Settings cached for 5 minutes
- Embedded configs cached for 1 hour
- Use `SettingsAPI.reloadSettings()` to force reload

## Best Practices

1. **Start Conservative:** Begin with L1 or L2, move to L3 as comfort grows
2. **Project-Specific Settings:** Use `.claude/config.md` for repository-wide consistency
3. **Privacy by Default:** Enable `git_privacy: true` for public repositories
4. **Review Defaults:** Set appropriate `default_reviewer` for your team
5. **Document Overrides:** Comment why embedded configs override defaults

## Security Considerations

1. **No Sensitive Data:** Don't store passwords, tokens, or secrets in config files
2. **Git Privacy:** Enable for public repos to avoid AI attribution
3. **File Permissions:** Config files should be readable but not world-writable
4. **Validation:** System validates all settings, invalid values use defaults

## Future Enhancements

Planned improvements to the settings system:

1. **Config Versioning:** Schema version for migration support
2. **Hot Reload:** File watching for L3 mode updates
3. **Config Templates:** Pre-built configs for common scenarios
4. **Validation Warnings:** Non-fatal issues reported to user
5. **Setting Inheritance:** More granular override capabilities

## Summary

The settings system provides powerful, flexible configuration management:

- **Hierarchical Loading:** Right setting at the right scope
- **Safe Defaults:** System always has valid configuration
- **Override Capability:** Task-specific settings when needed
- **Performance:** Efficient caching with reasonable TTLs
- **Extensibility:** Easy to add new settings as needed

For questions or issues, check the troubleshooting section or review the test results in `test-results/BUG-018-settings-test-results.md`.