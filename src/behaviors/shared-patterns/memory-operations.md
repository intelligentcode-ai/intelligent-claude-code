# Memory Operations

**MANDATORY:** Version-controlled memory in project with MCP integration support. Auto-correct violations.

## Imports

@./mcp-configuration-patterns.md

## Structure

**Memory Directory Organization:**
- **memory/[topic]/[subtopic].md** - Dated entries (newest first)
- **memory/index.md** - Topic index

## Entry Format

**Standard Memory Entry Format:**
- **Header:** ## YYYY-MM-DD: Title
- **Context:** Task/PRB reference
- **Problem:** What went wrong
- **Solution:** How fixed
- **Code:** [if applicable]
- **Separator:** --- (between entries)

## Operations

### StoreInMemory Pattern
1. **Security Validation**: Apply security checklist - BLOCK if sensitive data detected
2. **MCP Provider Detection**: Check for mcp_integrations.memory configuration
3. **Provider Selection**: Use MCP provider if enabled, fallback to file-based
4. **Path Resolution**: Check for external_path configuration, use configured path or default to ./memory/
5. Determine topic/subtopic path within memory base directory
6. Add entry at TOP of file (newest first for precedence)
7. Auto-prune if >10 entries or >5KB
8. Archive old entries to [memory_base]/archive/[topic]/[year].md
9. Update [memory_base]/index.md

### Memory Base Path Resolution

**Steps to Determine Memory Base Path:**
1. **Check External Path Configuration:** Look for memory_configuration.external_path setting
2. **If External Path Exists:**
   - **Expand Home Directory:** If path starts with ~, expand to full home directory path
   - **Use Path Directly:** If path is absolute, use as specified
   - **Ensure Directory Exists:** Create directory if it doesn't exist
   - **Return External Path:** Use the configured external path
3. **If No External Path:** Use default backward-compatible behavior with get_project_path("memory_path", "memory")

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
1. **MCP Provider Detection**: Check for mcp_integrations.memory configuration
2. **Provider Selection**: Use MCP provider if enabled, fallback to file-based
3. **Path Resolution**: Determine memory base path using the Memory Base Path Resolution pattern
4. Parse query for keywords/context
5. Check index for quick filtering
6. Search within topic files in [memory_base]/[topic]/
7. Score by: keyword match + recency + context match
8. Return top matches for PRB embedding

### LoadFromMemory Pattern
1. **MCP Provider Detection**: Check for mcp_integrations.memory configuration
2. **Provider Selection**: Use MCP provider if enabled, fallback to file-based
3. **Path Resolution**: Determine memory base path using the Memory Base Path Resolution pattern
4. Read topic file from [memory_base]/[topic]/
5. Parse markdown entries
6. Update access stats
7. Store for efficient retrieval

## Pruning
- Threshold: 10 entries or 5KB
- Archive: memory/archive/[topic]/[year].md
- Keep: Most recent 5-10

## PRB Integration
- Embed 2-3 most relevant (max 1000 tokens)
- Selection: topic match + recency
- No runtime lookups needed

---
*Memory operations patterns for intelligent-claude-code system*