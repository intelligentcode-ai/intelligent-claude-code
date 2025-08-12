# Configuration Guide - Intelligent Claude Code

## Overview

This guide covers all configuration options available in the Intelligent Claude Code system. The system uses a hierarchical configuration approach with behavioral patterns defined in markdown files.

## Configuration Hierarchy

Settings are loaded in this priority order (highest to lowest):

1. **Embedded config** (in PRBs)
2. **Project config** (`./config.md` or `.claude/config.md`)
3. **User global** (`~/.claude/config.md` - system-wide only)
4. **System defaults**

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

### PRB System Integration
Memory configuration affects PRB generation:
- **Memory Search**: PRBs search configured memory location
- **Context Embedding**: Memory patterns embedded in PRBs
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

This configuration guide provides comprehensive coverage of memory path configuration options and behavioral patterns in the Intelligent Claude Code system.