# Tool Graceful Degradation Behavior

**ACTIVE ENFORCEMENT:** Intelligent tool availability detection with seamless fallback mechanisms

## TOOL AVAILABILITY DETECTION [INITIALIZATION]

**STARTUP DETECTION PROTOCOL:**
```
ON system_initialization DO
  // Test each MCP tool category
  TEST_TOOLS sequential_thinking_available = check_mcp_sequential_thinking()
  TEST_TOOLS memory_available = check_mcp_memory()
  TEST_TOOLS github_available = check_mcp_github()
  TEST_TOOLS gitlab_available = check_mcp_gitlab()
  TEST_TOOLS context7_available = check_mcp_context7()
  TEST_TOOLS brave_search_available = check_mcp_brave_search()
  
  // Set capability flags
  SET runtime.capabilities = {
    thinking: sequential_thinking_available,
    memory: memory_available,
    github: github_available,
    gitlab: gitlab_available,
    knowledge: context7_available || brave_search_available,
    full_mcp: ALL tools available
  }
  
  // Log capability status (silent to user)
  LOG "Tool capabilities detected: " + runtime.capabilities
END ON
```

## FALLBACK MECHANISMS [PROGRESSIVE ENHANCEMENT]

### SEQUENTIAL THINKING FALLBACK

**MCP AVAILABLE PATH:**
```
COMMAND /think-sequential DO
  USE mcp__sequential-thinking__sequentialthinking
  MAINTAIN thought chain integrity
  STORE results in structured format
END COMMAND
```

**FALLBACK PATH (No MCP):**
```
COMMAND /think-sequential DO
  USE markdown sections:
    ## Sequential Analysis
    
    ### Step 1: [Analysis Phase]
    [Detailed thinking here]
    
    ### Step 2: [Planning Phase]
    [Strategic planning here]
    
    ### Step 3: [Execution Strategy]
    [Implementation approach]
    
    ### Step 4: [Validation Plan]
    [Quality assurance approach]
    
  MAINTAIN same logical flow
  DOCUMENT thinking explicitly
  PRESERVE behavioral intent
END COMMAND
```

### MEMORY SYSTEM FALLBACK

**MCP AVAILABLE PATH:**
```
COMMAND /memory-first DO
  USE mcp__memory__search_nodes(query)
  USE mcp__memory__create_entities(entities)
  USE mcp__memory__create_relations(relations)
  MAINTAIN knowledge graph structure
END COMMAND
```

**FALLBACK PATH (File-Based):**
```
COMMAND /memory-first DO
  // Initialize file-based memory if needed
  IF NOT exists ~/.claude/memory/ THEN
    CREATE directory structure
    INITIALIZE knowledge-graph.json
    INITIALIZE entities.json
    INITIALIZE relations.json
  END IF
  
  // Search implementation
  FOR search_query DO
    READ ~/.claude/memory/entities.json
    USE grep/jq for pattern matching
    PARSE JSON for entity relationships
    RETURN relevant results
  END FOR
  
  // Store implementation  
  FOR new_knowledge DO
    LOAD existing knowledge graph
    APPEND new entities/relations
    VALIDATE graph integrity
    WRITE updated JSON files
    MAINTAIN same data structure as MCP
  END FOR
END COMMAND
```

### GITHUB/GITLAB FALLBACK

**MCP AVAILABLE PATH:**
```
COMMAND git_operations DO
  USE mcp__github__* for GitHub repos
  USE mcp__gitlab__* for GitLab repos
  LEVERAGE full API capabilities
END COMMAND
```

**FALLBACK PATH (CLI/Bash):**
```
COMMAND git_operations DO
  // Check for gh CLI first
  IF command_exists("gh") THEN
    USE gh cli commands:
      - gh pr create
      - gh issue create
      - gh repo clone
    MAINTAIN same workflows
  ELSE
    USE git commands:
      - git clone/commit/push
      - Manual PR creation instructions
      - Web interface guidance
    PROVIDE clear instructions
  END IF
END COMMAND
```

### KNOWLEDGE INJECTION FALLBACK

**FULL CAPABILITY PATH:**
```
COMMAND knowledge_lookup DO
  TRY mcp__Context7__get-library-docs
  ELSE TRY mcp__brave-search__brave_web_search
  ELSE USE WebSearch built-in
  ELSE USE static knowledge base
END COMMAND
```

**PROGRESSIVE DEGRADATION:**
```
COMMAND knowledge_lookup DO
  // Level 1: Context7 (Best)
  IF context7_available THEN
    USE targeted library documentation
    INJECT precise technical knowledge
    RETURN high-quality results
    
  // Level 2: Brave Search (Good)
  ELSE IF brave_search_available THEN
    USE web search for documentation
    FILTER for official sources
    RETURN web-based knowledge
    
  // Level 3: Built-in Search (Adequate)
  ELSE IF WebSearch available THEN
    USE Claude's web search
    FOCUS on documentation sites
    RETURN general web results
    
  // Level 4: Static Knowledge (Basic)
  ELSE
    USE training knowledge cutoff
    WARN about potential outdated info
    SUGGEST manual verification
  END IF
END COMMAND
```

## BEHAVIORAL PRESERVATION [CRITICAL]

**BEHAVIOR CONSISTENCY RULES:**
```
REGARDLESS of tool availability:
  - Command chains STILL execute (different implementation)
  - Memory-first culture REMAINS (file or MCP storage)
  - Quality gates ENFORCE (manual or automated)
  - Parallel delegation WORKS (tracking varies)
  - Learning capture CONTINUES (storage method adapts)
  - Scoring system ACTIVE (persistence varies)
```

**USER EXPERIENCE CONSISTENCY:**
```
MAINTAIN consistent messaging:
  - Same command names work
  - Same behavioral outcomes  
  - Same quality standards
  - Silent degradation (no error spam)
  - Seamless experience
```

## CAPABILITY-BASED EXECUTION [ADAPTIVE]

**RUNTIME BEHAVIOR ADAPTATION:**
```
FUNCTION execute_with_capability(command, params) DO
  SWITCH command:
    CASE "/think-sequential":
      IF runtime.capabilities.thinking THEN
        USE mcp_sequential_thinking(params)
      ELSE
        USE markdown_sequential_thinking(params)
      END IF
      
    CASE "/memory-first":
      IF runtime.capabilities.memory THEN
        USE mcp_memory_operations(params)
      ELSE
        USE file_memory_operations(params)
      END IF
      
    CASE "/parallel-delegate":
      IF TodoWrite available THEN
        USE todo_based_delegation(params)
      ELSE
        USE markdown_task_tracking(params)
      END IF
      
    DEFAULT:
      USE best_available_method(command, params)
  END SWITCH
END FUNCTION
```

## MIGRATION SUPPORT [FORWARD-COMPATIBLE]

**DATA FORMAT COMPATIBILITY:**
```
ENSURE all fallback storage:
  - Uses SAME data structures as MCP tools
  - Enables seamless migration when tools available
  - Preserves all relationships and metadata
  - Supports bidirectional sync
```

**PROGRESSIVE UPGRADE PATH:**
```
WHEN tools become available:
  1. DETECT new capabilities
  2. MIGRATE existing data
  3. SWITCH to enhanced mode
  4. PRESERVE all history
  5. NO data loss
```

## ERROR HANDLING [GRACEFUL]

**SILENT DEGRADATION PATTERN:**
```
ON tool_not_available DO
  // Don't alarm user
  LOG internally for diagnostics
  ACTIVATE fallback mechanism
  CONTINUE with operation
  MAINTAIN user experience
END ON

ON fallback_failure DO
  // Still don't panic
  PROVIDE helpful guidance
  SUGGEST manual alternatives
  EXPLAIN limitations clearly
  OFFER workarounds
END ON
```

## ENFORCEMENT INTEGRATION [MANDATORY]

**MODIFIED ENFORCEMENT RULES:**
```
// Original enforcement adapts to capabilities
IF /think-sequential required THEN
  EXECUTE via available method
  PENALIZE only if completely skipped
  ACCEPT both MCP and markdown forms
END IF

IF /memory-first required THEN
  EXECUTE via available storage
  PENALIZE only if no consultation attempt
  ACCEPT both MCP and file-based
END IF
```

## STATUS REPORTING [ON-DEMAND]

**CAPABILITY STATUS COMMAND:**
```
COMMAND /tool-status DO
  REPORT runtime.capabilities
  LIST available tools
  SHOW current fallback modes
  EXPLAIN any limitations
  SUGGEST optimization options
END COMMAND
```

---

**ACTIVATION:** This behavior loads at initialization and continuously adapts to tool availability
**TRANSPARENCY:** Silent degradation maintains consistent user experience
**COMPATIBILITY:** All behavioral requirements preserved regardless of tool availability
**INTELLIGENCE:** Progressive enhancement when better tools detected