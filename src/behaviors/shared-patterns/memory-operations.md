# Memory Operations

**MANDATORY:** Version-controlled memory in project.

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
2. **Path Resolution**: Check for external_path configuration, use configured path or default to ./memory/
3. Determine topic/subtopic path within memory base directory
4. Add entry at TOP of file (newest first for precedence)
5. Auto-prune if >10 entries or >5KB
6. Archive old entries to [memory_base]/archive/[topic]/[year].md
7. Update [memory_base]/index.md

### Memory Base Path Resolution

**Steps to Determine Memory Base Path:**
1. **Check External Path Configuration**: Look for memory_configuration.external_path setting
2. **If External Path Exists**: Expand home directory if starts with ~, use as specified, ensure directory exists
3. **If No External Path**: Use default backward-compatible behavior with get_project_path("memory_path", "memory")

### Security Validation Process

**Steps to Validate Memory Content for Sensitive Data:**

**Blocked Patterns:** Check content for sensitive patterns:
- General secrets: "password", "token", "key", "secret", "credential"
- Specific tokens: "ghp_", "sk-", "ak_", "-----BEGIN", "api_key"
- Service credentials: "@gmail.com", "amazonaws.com/key", "bearer "

**Validation Steps:**
1. **Scan Content**: Check if content contains any blocked patterns (case-insensitive)
2. **If Sensitive Data Found**: Block storage, show error, suggest storing location/method instead
3. **If Clean**: Allow storage to proceed normally

### SearchMemory Pattern
1. **Path Resolution**: Determine memory base path using the Memory Base Path Resolution pattern
2. **Query Analysis**: Parse work intent for keywords, work type, technical domains, and context
3. **Directory Scanning**: Check index for topic filtering, scan memory/[topic]/ directories
4. **Pattern Matching**: Search within topic files for keyword and context matches
5. **Pattern Scoring**: Score patterns by multiple factors:
   - **Keyword match**: Direct term matches (work type, technical domains, problem patterns)
   - **Recency**: Newer patterns weighted higher for current relevance
   - **Context relevance**: Similar problem/solution pattern matches
   - **Success indicators**: Patterns from successful PRB executions
6. **Pattern Selection**: Return top 2-3 most relevant patterns (max 1000 tokens total)
7. **PRB Embedding**: Patterns embedded directly in PRB context for self-contained execution

### LoadFromMemory Pattern
1. **Path Resolution**: Determine memory base path
2. Read topic file from [memory_base]/[topic]/
3. Parse markdown entries
4. Update access stats
5. Store for efficient retrieval

## Pruning
- Threshold: 10 entries or 5KB
- Archive: memory/archive/[topic]/[year].md
- Keep: Most recent 5-10

## PRB Integration

### Memory-First PRB Generation
**MANDATORY:** All PRB creation MUST implement memory-first approach:
- **Search BEFORE template loading**: Memory search happens before template selection
- **Embed patterns directly**: Include 2-3 most relevant patterns in PRB context
- **Token limit**: Maximum 1000 tokens from memory patterns total
- **Selection criteria**: Topic match + recency + context relevance + success indicators
- **Self-contained execution**: NO runtime memory lookups during PRB execution

### Memory Pattern Embedding Process
1. **SearchMemory execution**: Run during PRB creation in main agent context
2. **Pattern extraction**: Extract relevant learning entries from memory files
3. **Context integration**: Include patterns in PRB complete_context section
4. **Validation**: Ensure no `[MEMORY_SEARCH:topic]` placeholders remain
5. **Execution reference**: Agents apply embedded patterns during PRB execution

### Memory Application in PRB Execution
- **Pattern reference**: "Based on embedded memory pattern: [pattern summary]"
- **Learning application**: Apply proven approaches from embedded context
- **Issue prevention**: Avoid known problems documented in embedded patterns
- **Success replication**: Follow successful patterns from embedded learnings

### PRB Completion Memory Storage
**MANDATORY:** All PRB completions MUST automatically store execution learnings:

**Automatic Storage Triggers:**
- **Step 9 of PRB Execution**: Memory storage is mandatory step in execution flow
- **Successful Pattern Completion**: Store approaches that worked effectively
- **Error Resolution**: Document problems encountered and solutions applied
- **Configuration Discovery**: Store new tool configurations and settings
- **Process Optimization**: Capture workflow improvements and efficiency gains

**Topic Selection for PRB Storage:**
- **implementation/[domain]**: Implementation patterns, coding approaches, integration solutions
- **debugging/[technology]**: Error patterns, troubleshooting steps, resolution techniques
- **configuration/[tool]**: Tool settings, configuration discoveries, setup patterns
- **optimization/[area]**: Performance improvements, efficiency techniques, resource optimization
- **process/[workflow]**: Workflow enhancements, automation patterns, productivity improvements

**PRB Context Format:**
- **Header**: ## YYYY-MM-DD: PRB-XXX - [Brief description]
- **PRB Reference**: PRB identifier and completion context
- **Pattern Type**: Implementation/Debugging/Configuration/Optimization/Process
- **Problem/Situation**: What was being addressed
- **Solution/Approach**: How it was resolved or implemented
- **Outcome**: Results, success metrics, lessons learned
- **Reusability**: When this pattern applies to future work

**Security Validation for PRB Storage:**
- Apply standard StoreInMemory security checklist
- Focus on patterns and approaches, not sensitive data
- Store methods and processes, not credentials or keys
- Ensure patterns are broadly applicable, not project-specific secrets

---
*Memory operations patterns for intelligent-claude-code system*