# Memory Operations

**MANDATORY:** Use version-controlled memory. Auto-correct violations. NEVER store sensitive values.

## Structure
**Base:** memory/ (version controlled, configurable via external_path)
**Organization:** memory/[topic]/[subtopic].md
**Format:** Topic files with dated entries (newest first)

### External Memory Path Configuration
**Optional:** Configure memory storage outside project directory

**Configuration Example:**
```yaml
# In CLAUDE.md or config.md
memory_configuration:
  external_path: "~/claude-memory"  # External memory directory
  # Or absolute path: "/Users/username/shared-memory"
```

**Path Resolution:**
1. Check for `external_path` in memory_configuration
2. If configured, expand ~ and use that path instead of ./memory/
3. Create directory structure if it doesn't exist
4. Fall back to ./memory/ if not configured (backward compatible)

## Security-First Storage Patterns

**CRITICAL:** All memory storage MUST pass security validation before persistence.

### Security Validation Checklist
```markdown
BEFORE STORING ANY MEMORY:
☐ Contains no passwords, tokens, API keys, or credentials
☐ Contains no sensitive configuration values
☐ References locations/methods, not actual values
☐ Describes access patterns safely
☐ Does not expose private project information
☐ Safe for version control and team sharing
```

### Safe Storage Examples

**CORRECT - Location and Method:**
```markdown
## 2025-08-09: GitHub PAT Access Pattern
**Context:** GitHub CLI operations
**Location:** ~/.config/git/common.conf contains GITHUB_PAT variable
**Access Method:** source ~/.config/git/common.conf && GH_TOKEN=$GITHUB_PAT
**Usage:** Export before gh commands for authentication
**Security:** Token location stored, never actual token value
```

**CORRECT - Configuration Pattern:**
```markdown
## 2025-08-09: AWS Profile Configuration
**Context:** AWS CLI operations requiring specific profile
**Pattern:** AWS profiles stored in ~/.aws/config and ~/.aws/credentials
**Access Method:** export AWS_PROFILE=desired_profile or use --profile flag
**Discovery:** Found via aws configure list-profiles
**Security:** Profile names stored, credentials reference file locations
```

**INCORRECT - Direct Value Storage:**
```markdown
## 2025-08-09: GitHub Authentication [SECURITY VIOLATION]
**Token:** ghp_xxxxxxxxxxxxxxxxxxxx [NEVER DO THIS]
**API Key:** ak_xxxxxxxxxxxxxxxxxxxxxxx [NEVER DO THIS]
```

### Security-Aware Entry Format
```markdown
## 2025-08-09: [Descriptive Title]
**Context:** [Task/Operation context]
**Problem/Need:** [What was needed]
**Location/Method:** [WHERE to find or HOW to access - not actual values]
**Access Pattern:** [Safe method to retrieve/use]
**Validation:** [How to verify it works]
**Security Note:** [Confirmation no sensitive data stored]
---
```

## Standard Entry Format
```markdown
## 2025-01-23: OAuth2 Token Refresh
**Context:** TASK-001
**Problem:** Tokens expiring without refresh
**Solution:** Auto-refresh on 401 with exponential backoff
**Code:** [example if applicable]
---
```

## Operations

### StoreInMemory Pattern
1. **Security Validation**: Apply security checklist - BLOCK if sensitive data detected
2. **Path Resolution**: Check for external_path configuration, use configured path or default to ./memory/
3. Determine topic/subtopic path within memory base directory
4. Add entry at TOP of file (newest first for precedence)
5. Auto-prune if >10 entries or >5KB
6. Archive old entries to [memory_base]/archive/[topic]/[year].md
7. Update [memory_base]/index.md

### Memory Base Path Resolution
```markdown
ResolveMemoryBasePath():
  external_path = get_setting("memory_configuration.external_path")
  
  IF external_path:
    # Expand ~ to home directory if present
    IF external_path.startswith("~"):
      expanded_path = expand_home_directory(external_path)
    ELSE:
      expanded_path = external_path
    
    # Ensure directory exists
    ensure_directory_exists(expanded_path)
    RETURN expanded_path
  ELSE:
    # Default backward-compatible behavior
    RETURN "./memory/"
```

### Security Validation Pattern
```markdown
ValidateMemoryForSensitiveData(content):
  BLOCK_PATTERNS = [
    "password", "token", "key", "secret", "credential",
    "ghp_", "sk-", "ak_", "-----BEGIN", "api_key",
    "@gmail.com", "amazonaws.com/key", "bearer "
  ]
  
  FOR each pattern IN BLOCK_PATTERNS:
    IF content.lower().contains(pattern):
      REJECT_STORAGE()
      ERROR("Security violation: Cannot store sensitive data")
      SUGGEST("Store location/method instead of actual value")
  
  ALLOW_STORAGE()
```

### SearchMemory Pattern
1. **Path Resolution**: Determine memory base path using ResolveMemoryBasePath()
2. Parse query for keywords/context
3. Check index for quick filtering
4. Search within topic files in [memory_base]/[topic]/
5. Score by: keyword match + recency + context match
6. Return top matches for PRB embedding

### LoadFromMemory Pattern
1. **Path Resolution**: Determine memory base path using ResolveMemoryBasePath()
2. Read topic file from [memory_base]/[topic]/
3. Parse markdown entries
4. Update access stats
5. Cache 5 min TTL

## Pruning
**Threshold:** 10 entries or 5KB
**Action:** Archive to [memory_base]/archive/[topic]/[year].md (uses ResolveMemoryBasePath())
**Keep:** Most recent 5-10 entries

## PRB Integration
- Embed only 2-3 most relevant entries (max 1000 tokens)
- Selection: topic match + recency + brevity
- No runtime lookups needed

## Index Format
```markdown
# Memory Index
## Topics
### Authentication
- `oauth2-patterns.md` - OAuth2 implementations
- `jwt-handling.md` - JWT patterns

### Error Handling
- `api-errors.md` - API error patterns
```

---
*Optimized: 234→60 lines*