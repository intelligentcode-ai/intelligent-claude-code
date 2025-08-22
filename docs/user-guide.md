# User Guide - Intelligent Claude Code

## Getting Started

Welcome to Intelligent Claude Code! This guide will help you understand how to configure and use the system effectively.

## Memory Configuration

The AI agents learn from every interaction and store knowledge in memory. You have flexibility in where this memory is stored.

### Default Setup

By default, memory is stored in the `./memory/` directory within your project. This works well for:
- Single projects
- When you want memory versioned with your project
- Simple setups without special requirements

### External Memory Setup

For more advanced scenarios, you can configure external memory paths.

#### Benefits of External Memory

- **Privacy**: Keep AI learnings separate from your project code
- **Cross-Project Sharing**: Use the same memory across multiple projects
- **Git Integration**: Auto-commit memory changes when stored in Git repositories
- **Team Collaboration**: Share learnings across team members
- **Clean Projects**: Keep project repositories focused on code, not AI memory

#### Configuration Options

Add this to your `CLAUDE.md` file:

```yaml
memory_configuration:
  external_path: "~/claude-memory"
```

#### Path Types Supported

1. **Home Directory Paths**
   ```yaml
   external_path: "~/claude-memory"
   ```
   - Expands to your home directory
   - Private to your user account
   - Works across all your projects

2. **Relative Paths**
   ```yaml
   external_path: "../shared-memory"
   external_path: "../../team-memory"
   ```
   - Relative to your project root
   - Useful for shared team setups
   - Can point to parent directories

3. **Absolute Paths**
   ```yaml
   external_path: "/opt/ai-memory"
   external_path: "/Users/username/Documents/ai-memory"
   ```
   - Full system paths
   - Maximum control over location
   - Works with network drives and special directories

#### Git Repository Integration

When your memory path contains a `.git` directory, the system automatically:
- Commits memory changes after storing learnings
- Uses meaningful commit messages
- Preserves the learning history in Git

To set up a Git-based memory repository:

1. **Create a private repository:**
   ```bash
   mkdir ~/claude-memory
   cd ~/claude-memory
   git init
   git remote add origin git@github.com:yourusername/private-memory.git
   ```

2. **Configure in CLAUDE.md:**
   ```yaml
   memory_configuration:
     external_path: "~/claude-memory"
   ```

3. **The system handles the rest automatically**

## Usage Examples

### Scenario 1: Privacy-Focused Developer

**Goal**: Keep AI learnings completely separate from open-source projects.

**Solution**:
```yaml
# In CLAUDE.md
memory_configuration:
  external_path: "~/private-ai-memory"
```

**Result**: All learnings stored in private location, project stays clean.

### Scenario 2: Team Knowledge Sharing

**Goal**: Share AI learnings across the development team.

**Solution**:
```yaml
# In CLAUDE.md
memory_configuration:
  external_path: "/shared/team/claude-memory"
```

**Result**: Team members benefit from collective AI learnings.

### Scenario 3: Multi-Project Consistency

**Goal**: Use same AI knowledge across multiple personal projects.

**Solution**:
```yaml
# In all project CLAUDE.md files
memory_configuration:
  external_path: "~/unified-ai-memory"
```

**Result**: AI learns from all projects, improves assistance across all work.

### Scenario 4: Version-Controlled Learning

**Goal**: Track and version AI learning history.

**Solution**:
```bash
# Set up Git repo
mkdir ~/claude-memory-repo
cd ~/claude-memory-repo
git init
git remote add origin git@github.com:username/ai-memory.git
```

```yaml
# In CLAUDE.md
memory_configuration:
  external_path: "~/claude-memory-repo"
```

**Result**: Full Git history of AI learning patterns and improvements.

## How It Works

### Memory Base Path Resolution

The system follows this process to determine where to store memory:

1. **Check Configuration**: Look for `external_path` setting in CLAUDE.md
2. **Expand Path**: Handle `~` for home directory, resolve relative paths
3. **Create Directory**: Automatically create the directory if it doesn't exist
4. **Validate Access**: Ensure the location is readable and writable
5. **Use Location**: Store all memory in the configured location

### Security and Privacy

The system includes built-in security measures:

- **No Sensitive Data Storage**: Never stores passwords, tokens, or credentials in memory
- **Path Validation**: Prevents storage in system directories or dangerous locations
- **Access Control**: Validates read/write permissions before using external paths
- **Content Scanning**: Blocks memory storage if sensitive patterns are detected

### Behavioral Instructions

This is a **MARKDOWN-BASED AI-AGENTIC SYSTEM**, meaning:
- All behavior is controlled through behavioral pattern files
- AI agents follow instructions defined in markdown documents
- Memory operations are behavioral patterns, not code functions
- The system adapts based on configuration without code changes

## Troubleshooting

### Common Issues

#### Permission Errors
```
Error: Cannot write to external memory path
Solution: Check directory permissions, ensure path is writable
```

#### Path Not Found
```
Error: External memory path does not exist
Solution: System should auto-create, check parent directory permissions
```

#### Git Integration Problems
```
Error: Git operations failing in memory directory
Solution: Verify Git is initialized and remote is configured
```

### Validation Steps

To verify your memory configuration is working:

1. **Check Configuration Loading**:
   - Ensure `external_path` is set in CLAUDE.md
   - Verify path syntax is correct

2. **Test Path Access**:
   - Check the directory exists and is writable
   - Verify any Git setup is functional

3. **Monitor Memory Operations**:
   - Watch for memory storage during AI interactions
   - Verify files appear in external location

## Best Practices

### For Individual Developers

- Use home directory paths: `~/claude-memory`
- Consider Git integration for learning history
- Keep memory private and separate from project code

### For Teams

- Use shared network locations: `/shared/team/claude-memory`
- Implement Git-based memory with team access
- Consider read-only memory for some team members

### for Multiple Projects

- Use consistent external paths across all projects
- Organize memory by topic within external directory
- Leverage cross-project learning benefits

### for Privacy

- Never configure external paths in public repositories
- Use private Git repositories for memory storage
- Keep memory separate from any published code

## Advanced Configuration

### Environment Variables

You can use environment variables in paths:
```yaml
memory_configuration:
  external_path: "$HOME/claude-memory"
  external_path: "$TEAM_MEMORY_PATH"
```

### Conditional Configuration

Different paths for different environments:
```yaml
memory_configuration:
  # Use environment-specific paths
  external_path: "~/claude-memory-dev"    # For development
  external_path: "~/claude-memory-prod"   # For production work
```

This user guide provides comprehensive instructions for configuring and using external memory paths with the Intelligent Claude Code system.