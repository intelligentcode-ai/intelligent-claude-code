# Memory Operations

**MANDATORY:** Version-controlled memory in project.

## Structure
```
memory/
├── [topic]/
│   └── [subtopic].md  # Dated entries (newest first)
└── index.md           # Topic index
```

## Entry Format
```markdown
## YYYY-MM-DD: Title
**Context:** Task/PRB reference
**Problem:** What went wrong
**Solution:** How fixed
**Code:** [if applicable]
---
```

## Operations

### StoreInMemory Pattern
1. **Security Validation**: Apply security checklist - BLOCK if sensitive data detected
2. **Path Resolution**: Use ResolveMemoryBasePath() to determine memory base directory with external configuration support
3. Determine topic/subtopic path within memory base directory
4. Add entry at TOP of file (newest first for precedence)
5. Auto-prune if >10 entries or >5KB
6. Archive old entries to [memory_base]/archive/[topic]/[year].md
7. Update [memory_base]/index.md

### Memory Base Path Resolution

**Steps to Determine Memory Base Path:**
1. **Check External Memory Configuration:** Look for memory_configuration.external_memory_enabled setting
2. **If External Memory Disabled:** Use default project-local behavior with get_project_path("memory_path", "memory")
3. **If External Memory Enabled:**
   - **Validate Configuration:** Check memory_configuration.memory_path exists and is valid
   - **Apply Security Validation:** Run comprehensive path security checks
   - **Expand Home Directory:** If path starts with ~, expand to full home directory path
   - **Validate Path Accessibility:** Ensure read/write permissions and directory exists
   - **Apply Path Type Logic:** Handle local_dir vs git_repo based on memory_type
   - **Return External Path:** Use the validated external path
4. **Fallback on Errors:** If validation fails, log error and fallback to project-local memory

### External Path Security Validation

**Steps to Validate External Memory Path for Security:**

**Security Validation Rules:**
1. **Block System Directories:** Reject paths like /bin, /usr, /etc, /var, /sys, /proc
2. **Block Root Directory:** Reject attempts to use / as memory path
3. **Validate Permissions:** Check read/write access to target directory
4. **Check Path Traversal:** Block paths containing ../ or other traversal attempts
5. **Validate Home Directory:** If using ~/, ensure it expands to valid user home

**Validation Steps:**
1. **Normalize Path:** Convert to absolute path, resolve ~ expansion
2. **System Directory Check:** 
   - If path starts with /bin, /usr, /etc, /var, /sys, /proc, /boot, /dev
   - THEN block with error: "Security violation: Cannot use system directory for memory storage"
3. **Root Directory Check:**
   - If normalized path equals "/"
   - THEN block with error: "Security violation: Cannot use root directory for memory storage"
4. **Path Traversal Check:**
   - If path contains ".." components
   - THEN block with error: "Security violation: Path traversal not allowed in memory path"
5. **Permission Validation:**
   - Test directory exists or can be created
   - Test read/write permissions
   - If validation fails, show error: "Path validation failed: Cannot access configured memory path"
6. **Success:** Allow external path usage if all validations pass

### Memory Type Handling

**Local Directory (memory_type: local_dir):**
- Path must be accessible local filesystem directory
- Directory auto-created if it doesn't exist
- Standard file operations for memory storage

**Git Repository (memory_type: git_repo):**
- Path must be valid git repository URL or local git directory
- Requires git operations for sync based on sync_strategy
- Repository must be accessible and have proper permissions

### Security Validation Process

**Steps to Validate Memory Content for Sensitive Data:**

**Blocked Patterns:** Check content for these sensitive patterns:
- General secrets: "password", "token", "key", "secret", "credential"
- Specific tokens: "ghp_", "sk-", "ak_", "-----BEGIN", "api_key"
- Service credentials: "@gmail.com", "amazonaws.com/key", "bearer "

**Validation Steps:**
1. **Scan Content:** Check if content contains any blocked patterns (case-insensitive)
2. **If Sensitive Data Found:**
   - **Reject Storage:** Block the memory storage operation
   - **Show Error:** Display "Security violation: Cannot store sensitive data"
   - **Suggest Alternative:** Recommend storing location/method instead of actual value
3. **If Clean:** Allow storage to proceed normally

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
5. Store for efficient retrieval

## Pruning
- Threshold: 10 entries or 5KB
- Archive: memory/archive/[topic]/[year].md
- Keep: Most recent 5-10

## PRB Integration
- Embed 2-3 most relevant (max 1000 tokens)
- Selection: topic match + recency
- No runtime lookups needed

---
*Optimized: 179→~35 lines*