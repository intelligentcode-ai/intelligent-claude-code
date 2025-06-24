# Git Safety & Privacy Features

## Overview

Professional git practices with automatic safety checks, privacy protection, and cleanup behaviors.

## 1. Commit Privacy  
**Default: ON** (configured in config.md)

**Default: ON**

Automatically removes AI/Assistant mentions from all git commits:

### Before
```
Fixed authentication bug with Claude's help
AI-generated comprehensive test suite
Refactored using assistant suggestions
```

### After
```
Fix authentication validation bug
Add comprehensive test coverage
Refactor database connection logic
```

## 2. Automatic .gitignore  
**Default: ON** (configured in config.md)

**Default: ON**

Automatically generates and maintains comprehensive .gitignore:

```gitignore
# Environment files
.env
.env.*
!.env.example

# Secrets and keys
*.key
*.pem
secrets/
credentials/

# IDE files
.idea/
.vscode/
*.swp

# And more...
```

## 3. Commit Validation  
**Default: ON** (configured in config.md)

**Default: ON**

Scans every commit for sensitive data before allowing:

### Checks for:
- API keys and tokens
- Private keys
- Passwords in code
- environment files
- Credential files

### Example Block
```
❌ Commit blocked: Sensitive data detected
Found: API key in src/config.js line 23
Found: environment file in staged changes

Fix: 
1. Remove API key from code
2. Add environment files to .gitignore
3. Use environment variables
```

## 4. CLAUDE.md Privacy  
**Default: OFF** (configured in config.md)

**Default: OFF**

Option to keep project-specific CLAUDE.md files private:
- When ON: Adds CLAUDE.md to .gitignore
- Useful for proprietary instructions
- Team-specific configurations

## 5. Human-Like Commits  
**Default: ON** (configured in config.md)

**Default: ON**

Professional, concise commit messages:

### Good Examples
```
Add user authentication endpoints
Fix memory leak in data processor
Update dependencies to latest versions
Refactor payment processing logic
```

### Avoids
- Exaggeration: "Massively improve incredible system"
- AI mentions: "Claude helped with this"
- Fluff: "Brilliantly optimize performance"

## 6. Icon Control  
**Default: OFF** (configured in config.md)

**Default: OFF**

When enabled, removes all emojis and icons:

### With Icons (default)
```
✨ Add new feature
🐛 Fix critical bug
📚 Update documentation
```

### Without Icons
```
Add new feature
Fix critical bug
Update documentation
```

## 7. Automatic Cleanup  
**Default: ON** (configured in config.md)

**Default: ON**

### Cleans
- Temporary files: `*.tmp`, `*.temp`, `*.bak`
- Empty directories
- Test artifacts
- Old log files

### Archives
- Progress files → `.archive/`
- Keeps last 5 versions
- Date-stamped organization

### Organizes
```
Before:
test_user.py
README.md
config.yaml
main.py
test_auth.py

After:
src/
  └── main.py
tests/
  ├── test_user.py
  └── test_auth.py
docs/
  └── README.md
config/
  └── config.yaml
```

## Configuration

Add to your `~/.claude/config.md` file:

```markdown
## Git Safety Features
- **Git Privacy**: true
- **Auto Gitignore**: true
- **Validate Commits**: true
- **Human Commits**: true
- **Auto Cleanup**: true

## Optional Configurations
- **Gitignore Project Claude**: false
- **No Icons**: false
- **Cleanup Patterns**: "*.tmp,*.bak"
- **Organize Files**: true
```

## Natural Overrides

Override any behavior naturally:
- "Include Claude in this commit" → Allows mention
- "Keep the temp files" → Skips cleanup
- "Don't validate this commit" → Bypasses checks
- "Use an emoji here" → Adds icon

## Security Benefits

1. **No Accidental Leaks**: Validates every commit
2. **Clean History**: Professional commit messages
3. **Privacy**: No AI tool mentions
4. **Organization**: Automatic file management
5. **Safety Net**: Comprehensive .gitignore

## Team Benefits

1. **Consistent Standards**: Same rules for everyone
2. **Professional Image**: Clean git history
3. **Security First**: Automatic protection
4. **Less Cleanup**: Automatic organization
5. **Configurable**: Adjust per project needs

## Examples in Action

### Feature Development
```bash
# You: "Add user registration feature"

# Claude automatically:
1. Creates branch: feature/add-user-registration
2. Implements feature
3. Generates .gitignore if missing
4. Validates no secrets in code
5. Commits: "Add user registration endpoints"
6. Cleans up temp files
```

### Bug Fix
```bash
# You: "Fix the login timeout bug"

# Claude automatically:
1. Creates branch: fix/login-timeout
2. Fixes bug
3. Validates changes
4. Commits: "Fix session timeout in login flow"
5. No mention of AI assistance
```

## Best Practices

1. **Review config.md**: Start with defaults
2. **Customize per project**: Adjust patterns
3. **Team alignment**: Share configuration
4. **Regular cleanup**: Automatic organization
5. **Trust but verify**: Check sensitive projects

These features ensure professional, secure, and clean git practices without manual intervention.