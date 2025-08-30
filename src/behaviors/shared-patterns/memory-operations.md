# Memory Operations

**MANDATORY:** Version-controlled memory in project with MCP integration support. Auto-correct violations.

## Imports

@./mcp-configuration-patterns.md

## MCP Provider Detection

**Check for MCP Memory Provider:**
```
1. Load mcp_integrations.memory from CLAUDE.md
2. If enabled and provider specified:
   - Use MCP provider for operations
3. Else:
   - Use file-based storage (default)
```

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
1. **Check MCP Configuration**: 
   - IF mcp_integrations.memory.enabled = true:
     - Use mcp__memory__create_entities or configured provider
     - Pass topic as entity name
     - Pass content as observation
   - ELSE: Continue with file-based storage
2. **Security Validation**: Apply security checklist - BLOCK if sensitive data detected
3. **Provider Routing**:
   - MCP: Call provider's store method
   - File: Original file-based logic
4. **Error Handling**: 
   - If MCP fails, fall back to file-based
   - Log MCP failures for visibility
5. **Path Resolution**: Check for external_path configuration, use configured path or default to ./memory/ (file-based only)
6. Determine topic/subtopic path within memory base directory (file-based only)
7. Add entry at TOP of file (newest first for precedence) (file-based only)
8. Auto-prune if >10 entries or >5KB (file-based only)
9. Archive old entries to [memory_base]/archive/[topic]/[year].md (file-based only)
10. Update [memory_base]/index.md (file-based only)

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
1. **Check MCP Configuration**:
   - IF mcp_integrations.memory.enabled = true:
     - Use mcp__memory__search_nodes or configured provider
     - Pass query to provider search
   - ELSE: Continue with file-based search
2. **Provider Routing**:
   - MCP: Call provider's search method
   - File: Original file-based search
3. **Result Handling**:
   - Normalize results from different providers
   - Return consistent format to PRBs
4. **Path Resolution**: Determine memory base path using the Memory Base Path Resolution pattern (file-based only)
5. Parse query for keywords/context (file-based only)
6. Check index for quick filtering (file-based only)
7. Search within topic files in [memory_base]/[topic]/ (file-based only)
8. Score by: keyword match + recency + context match (file-based only)
9. Return top matches for PRB embedding

### LoadFromMemory Pattern
1. **Check MCP Configuration**:
   - IF mcp_integrations.memory.enabled = true:
     - Use configured MCP provider for loading
     - Pass topic/subtopic identifiers to provider
   - ELSE: Continue with file-based loading
2. **Provider Routing**:
   - MCP: Call provider's load/get method
   - File: Original file-based loading
3. **Result Handling**:
   - Normalize results from different providers
   - Return consistent format
4. **Path Resolution**: Determine memory base path using the Memory Base Path Resolution pattern (file-based only)
5. Read topic file from [memory_base]/[topic]/ (file-based only)
6. Parse markdown entries (file-based only)
7. Update access stats (file-based only)
8. Store for efficient retrieval (file-based only)

## Provider Abstraction Layer

### Memory Provider Interface
```
store_memory(topic, content, metadata)
search_memory(query, filters)
get_memory(topic, subtopic)
update_memory(id, content)
delete_memory(id)
```

### Provider Routing
```
IF mcp_provider configured:
  route_to_mcp_provider()
ELSE:
  route_to_file_based()
```

### Error Recovery
```
TRY:
  execute_mcp_operation()
CATCH:
  log_error()
  fallback_to_file_based()
```

## Pruning
- Threshold: 10 entries or 5KB (file-based only)
- Archive: memory/archive/[topic]/[year].md (file-based only)
- Keep: Most recent 5-10 (file-based only)
- MCP providers handle their own pruning strategies

## PRB Integration
- Embed 2-3 most relevant (max 1000 tokens)
- Selection: topic match + recency
- No runtime lookups needed
- Consistent format regardless of provider

---
*Memory operations patterns for intelligent-claude-code system*