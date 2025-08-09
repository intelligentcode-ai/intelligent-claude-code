# Memory Operations

**MANDATORY:** Use version-controlled memory. Auto-correct violations. NEVER store sensitive values.

## Structure
**Base:** memory/ (version controlled)
**Organization:** memory/[topic]/[subtopic].md
**Format:** Topic files with dated entries (newest first)

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
2. Determine topic/subtopic path
3. Add entry at TOP of file (newest first for precedence)
4. Auto-prune if >10 entries or >5KB
5. Archive old entries to memory/archive/[topic]/[year].md
6. Update memory/index.md

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
1. Parse query for keywords/context
2. Check index for quick filtering
3. Search within topic files
4. Score by: keyword match + recency + context match
5. Return top matches for PRB embedding

### LoadFromMemory Pattern
1. Read topic file from memory/[topic]/
2. Parse markdown entries
3. Update access stats
4. Cache 5 min TTL

## Pruning
**Threshold:** 10 entries or 5KB
**Action:** Archive to memory/archive/[topic]/[year].md
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