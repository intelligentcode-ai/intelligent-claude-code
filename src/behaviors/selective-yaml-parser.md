# Selective YAML Parser

**PURPOSE:** Optimize YAML parsing with selective field extraction to reduce token usage by 85%  
**TYPE:** Core Optimization Component  
**STATUS:** ACTIVE  
**TARGET:** 85% reduction in assignment file parsing tokens

## Core Selective YAML Parser

### Field-Specific Parser Engine
```pseudocode
CLASS SelectiveYAMLParser:
    fieldMaps: Map<string, FieldMap>
    operationContexts: Map<string, OperationContext>
    
    STRUCTURE FieldMap:
        operation: string
        requiredFields: string[]
        optionalFields: string[]
        nestedFields: Map<string, string[]>
        estimatedTokens: number
        
    STRUCTURE OperationContext:
        name: string
        fields: string[]
        maxDepth: number
        includeArrays: boolean
        
    FUNCTION initialize():
        initializeFieldMaps()
        initializeOperationContexts()
        logInfo("Selective YAML parser initialized")
        
    FUNCTION parseYAMLSelective(content, operation, context = null):
        // Get field map for operation
        fieldMap = fieldMaps.get(operation)
        
        IF NOT fieldMap:
            logWarning("Unknown operation: " + operation)
            RETURN parseYAMLFull(content)
            
        // Extract only required fields
        result = extractSelectiveFields(content, fieldMap, context)
        
        // Update statistics
        updateParsingStats(operation, result.tokensUsed)
        
        RETURN result
        
    FUNCTION extractSelectiveFields(content, fieldMap, context):
        result = {}
        tokensUsed = 0
        
        // Parse line by line for efficiency
        lines = content.split('\n')
        currentLevel = 0
        
        FOR lineNumber, line IN lines:
            // Skip empty lines and comments
            IF line.trim().isEmpty() OR line.trim().startsWith('#'):
                CONTINUE
                
            // Determine indentation level
            indentLevel = getIndentationLevel(line)
            fieldName = extractFieldName(line)
            
            // Check if this field is required
            IF isRequiredField(fieldName, fieldMap, currentLevel):
                fieldValue = extractFieldValue(line, lines, lineNumber, indentLevel)
                setNestedField(result, fieldName, fieldValue, indentLevel)
                tokensUsed += estimateTokens(fieldValue)
                
        RETURN {
            data: result,
            tokensUsed: tokensUsed,
            operation: fieldMap.operation
        }
```

### Operation-Specific Field Maps
```pseudocode
FUNCTION initializeFieldMaps():
    fieldMaps = new Map()
    
    // Status check - minimal fields
    fieldMaps.set("status_check", {
        operation: "status_check",
        requiredFields: ["id", "status", "phase", "progress"],
        optionalFields: [],
        nestedFields: {},
        estimatedTokens: 50
    })
    
    // Metadata access - basic information
    fieldMaps.set("metadata", {
        operation: "metadata",
        requiredFields: ["id", "title", "epic", "epic_id", "priority", "type"],
        optionalFields: ["created", "created_by", "assigned_to"],
        nestedFields: {},
        estimatedTokens: 100
    })
    
    // Task listing - tasks array with minimal task data
    fieldMaps.set("task_listing", {
        operation: "task_listing",
        requiredFields: ["id", "title", "tasks"],
        optionalFields: [],
        nestedFields: {
            "tasks": ["id", "title", "type", "status", "assigned_to", "priority"]
        },
        estimatedTokens: 200
    })
    
    // Embedded config - specific config section
    fieldMaps.set("embedded_config", {
        operation: "embedded_config",
        requiredFields: ["embedded_config"],
        optionalFields: [],
        nestedFields: {},
        estimatedTokens: 80
    })
    
    // Progress tracking - status and completion info
    fieldMaps.set("progress_tracking", {
        operation: "progress_tracking",
        requiredFields: ["id", "status", "phase", "progress", "tasks"],
        optionalFields: ["definition_of_done", "acceptance_criteria"],
        nestedFields: {
            "tasks": ["id", "status", "progress"]
        },
        estimatedTokens: 150
    })
    
    // Workflow context - workflow-specific fields
    fieldMaps.set("workflow_context", {
        operation: "workflow_context",
        requiredFields: ["id", "workflow", "current_phase", "approach"],
        optionalFields: ["testing_required", "review_required"],
        nestedFields: {},
        estimatedTokens: 120
    })
    
    // Validation context - for role assignment validation
    fieldMaps.set("validation_context", {
        operation: "validation_context",
        requiredFields: ["id", "type", "description", "problem_statement", "tasks"],
        optionalFields: ["user_story", "business_value"],
        nestedFields: {
            "tasks": ["id", "title", "type", "assigned_to", "description"]
        },
        estimatedTokens: 300
    })
```

### Progressive YAML Loading
```pseudocode
FUNCTION parseYAMLProgressive(filePath, initialOperation):
    progressiveData = {
        basicInfo: null,
        fullContext: null,
        loadedSections: new Set(),
        filePath: filePath
    }
    
    // Stage 1: Load basic info
    IF NOT progressiveData.basicInfo:
        progressiveData.basicInfo = parseYAMLSelective(
            readFile(filePath, 0, 500), // Read first 500 chars
            "metadata"
        )
        progressiveData.loadedSections.add("metadata")
        
    // Stage 2: Load operation-specific fields
    IF initialOperation != "metadata":
        operationData = parseYAMLSelective(
            readFile(filePath), // Full file for complex operations
            initialOperation
        )
        progressiveData.fullContext = operationData
        progressiveData.loadedSections.add(initialOperation)
        
    RETURN progressiveData
    
FUNCTION expandProgressiveData(progressiveData, newOperation):
    // Only load new sections if not already loaded
    IF NOT progressiveData.loadedSections.has(newOperation):
        newData = parseYAMLSelective(
            readFile(progressiveData.filePath),
            newOperation
        )
        
        // Merge with existing data
        progressiveData.fullContext = mergeYAMLData(
            progressiveData.fullContext,
            newData
        )
        
        progressiveData.loadedSections.add(newOperation)
        
    RETURN progressiveData
```

### Field Extraction Utilities
```pseudocode
FUNCTION extractFieldName(line):
    // Handle different YAML field formats
    trimmed = line.trim()
    
    IF trimmed.contains(':'):
        fieldName = trimmed.split(':')[0].trim()
        // Remove quotes if present
        IF fieldName.startsWith('"') OR fieldName.startsWith("'"):
            fieldName = fieldName.slice(1, -1)
        RETURN fieldName
        
    RETURN null
    
FUNCTION extractFieldValue(line, lines, lineNumber, indentLevel):
    trimmed = line.trim()
    
    // Simple key: value
    IF trimmed.contains(':'):
        parts = trimmed.split(':', 2)
        IF parts.length > 1:
            value = parts[1].trim()
            
            // Handle different value types
            IF value.startsWith('|') OR value.startsWith('>'):
                // Multi-line string
                RETURN extractMultilineValue(lines, lineNumber, indentLevel)
            ELSE IF value.startsWith('[') OR value.startsWith('-'):
                // Array
                RETURN extractArrayValue(lines, lineNumber, indentLevel)
            ELSE IF value.isEmpty():
                // Nested object
                RETURN extractNestedObject(lines, lineNumber, indentLevel)
            ELSE:
                // Simple value
                RETURN parseSimpleValue(value)
                
    RETURN null
    
FUNCTION extractMultilineValue(lines, startLine, baseIndent):
    result = ""
    lineIndex = startLine + 1
    
    WHILE lineIndex < lines.length:
        line = lines[lineIndex]
        
        // Stop if we hit a line with same or less indentation
        IF NOT line.trim().isEmpty() AND getIndentationLevel(line) <= baseIndent:
            BREAK
            
        // Add line to result
        result += line.substring(baseIndent + 2) + '\n'
        lineIndex++
        
    RETURN result.trim()
    
FUNCTION extractArrayValue(lines, startLine, baseIndent):
    result = []
    lineIndex = startLine
    
    // Handle inline array
    firstLine = lines[startLine].trim()
    IF firstLine.contains('['):
        // Try to parse as JSON array
        arrayMatch = firstLine.match(/\[(.*?)\]/)
        IF arrayMatch:
            RETURN JSON.parse('[' + arrayMatch[1] + ']')
            
    // Handle multi-line array
    WHILE lineIndex < lines.length:
        line = lines[lineIndex]
        
        IF line.trim().startsWith('-'):
            value = line.trim().substring(1).trim()
            result.append(parseSimpleValue(value))
        ELSE IF NOT line.trim().isEmpty() AND getIndentationLevel(line) <= baseIndent:
            BREAK
            
        lineIndex++
        
    RETURN result
```

### Integration with Session Cache
```pseudocode
FUNCTION getCachedYAMLContent(filePath, operation, context = null):
    // Generate cache key including operation
    cacheKey = generateYAMLCacheKey(filePath, operation, context)
    
    // Check cache first
    sessionCache = getSessionCache()
    IF sessionCache.has(cacheKey):
        entry = sessionCache.get(cacheKey)
        
        // Verify file hasn't changed
        IF isFileUnchanged(filePath, entry.mtime):
            entry.accessCount++
            entry.lastAccessed = getCurrentTime()
            
            logDebug("YAML cache hit: " + operation + " for " + filePath)
            RETURN entry.content
            
    // Cache miss - parse and store
    fileContent = readFile(filePath)
    parsedContent = parseYAMLSelective(fileContent, operation, context)
    
    // Store in cache
    cacheEntry = {
        path: filePath,
        content: parsedContent,
        mtime: getFileModTime(filePath),
        operation: operation,
        accessCount: 1,
        lastAccessed: getCurrentTime()
    }
    
    sessionCache.set(cacheKey, cacheEntry)
    
    logDebug("YAML parsed and cached: " + operation + " for " + filePath)
    RETURN parsedContent
    
FUNCTION generateYAMLCacheKey(filePath, operation, context):
    contextHash = context ? hashObject(context) : ""
    RETURN "yaml:" + filePath + ":" + operation + ":" + contextHash
```

### Workflow Integration Points
```pseudocode
// Integration with lean-workflow-executor
FUNCTION readAssignmentSelective(type, id, operation = "metadata"):
    filePath = getAssignmentFilePath(type, id)
    
    // Use selective YAML parsing
    yamlParser = getSelectiveYAMLParser()
    parsedData = yamlParser.getCachedYAMLContent(filePath, operation)
    
    // Apply embedded config if present
    IF parsedData.data.embedded_config:
        applyEmbeddedConfig(parsedData.data.embedded_config)
        
    RETURN parsedData
    
// Integration with work discovery
FUNCTION scanAssignmentsOptimized(pattern, operation = "status_check"):
    assignmentFiles = glob(pattern)
    results = []
    
    FOR file IN assignmentFiles:
        // Use selective parsing for status checks
        yamlData = getCachedYAMLContent(file, operation)
        
        IF yamlData.data.status IN ["PLANNED", "IN_PROGRESS"]:
            results.append(yamlData.data)
            
    RETURN results
    
// Integration with progress tracking
FUNCTION updateProgressSelective(itemId, newStatus, additionalFields = {}):
    // Read current data with progress context
    currentData = readAssignmentSelective("story", itemId, "progress_tracking")
    
    // Update only changed fields
    updates = {
        status: newStatus,
        ...additionalFields
    }
    
    // Write back minimal changes
    writeAssignmentUpdates(itemId, updates)
```

### Token Usage Optimization
```pseudocode
FUNCTION estimateTokenReduction(operation, fileSize):
    baseTokens = fileSize * 0.75 // Rough token estimation
    
    fieldMap = fieldMaps.get(operation)
    IF fieldMap:
        reductionPercentage = 1 - (fieldMap.estimatedTokens / baseTokens)
        RETURN Math.max(0, Math.min(0.9, reductionPercentage))
        
    RETURN 0
    
FUNCTION trackTokenUsage(operation, actualTokens, estimatedTokens):
    // Update statistics
    tokenStats = getTokenStats()
    tokenStats.operations[operation] = tokenStats.operations[operation] || {
        totalCalls: 0,
        actualTokens: 0,
        estimatedTokens: 0,
        avgReduction: 0
    }
    
    stats = tokenStats.operations[operation]
    stats.totalCalls++
    stats.actualTokens += actualTokens
    stats.estimatedTokens += estimatedTokens
    stats.avgReduction = 1 - (stats.actualTokens / stats.estimatedTokens)
    
    // Log significant improvements
    IF stats.avgReduction > 0.8:
        logInfo("High token reduction for " + operation + ": " + 
               (stats.avgReduction * 100).toFixed(1) + "%")
```

## Practical Usage Functions

### Easy Integration Functions
```pseudocode
// High-level helper functions for common operations
FUNCTION getAssignmentStatus(type, id):
    yamlParser = getSelectiveYAMLParser()
    result = yamlParser.getCachedYAMLContent(
        getAssignmentPath(type, id), 
        "status_check"
    )
    RETURN result.data
    
FUNCTION getAssignmentMetadata(type, id):
    yamlParser = getSelectiveYAMLParser()
    result = yamlParser.getCachedYAMLContent(
        getAssignmentPath(type, id), 
        "metadata"
    )
    RETURN result.data
    
FUNCTION getAssignmentTasks(type, id):
    yamlParser = getSelectiveYAMLParser()
    result = yamlParser.getCachedYAMLContent(
        getAssignmentPath(type, id), 
        "task_listing"
    )
    RETURN result.data.tasks
    
FUNCTION getEmbeddedConfig(type, id):
    yamlParser = getSelectiveYAMLParser()
    result = yamlParser.getCachedYAMLContent(
        getAssignmentPath(type, id), 
        "embedded_config"
    )
    RETURN result.data.embedded_config
    
FUNCTION getProgressData(type, id):
    yamlParser = getSelectiveYAMLParser()
    result = yamlParser.getCachedYAMLContent(
        getAssignmentPath(type, id), 
        "progress_tracking"
    )
    RETURN result.data
```

### Workflow Integration Helpers
```pseudocode
// Direct replacements for common workflow patterns
FUNCTION readAssignmentOptimized(type, id, operation = "metadata"):
    // Replaces: readAssignment(type, id)
    yamlParser = getSelectiveYAMLParser()
    result = yamlParser.getCachedYAMLContent(
        getAssignmentPath(type, id), 
        operation
    )
    
    // Apply embedded config if present
    IF result.data.embedded_config:
        applyEmbeddedConfig(result.data.embedded_config)
    
    RETURN result.data
    
FUNCTION scanAssignmentFiles(pattern, operation = "status_check"):
    // Optimized file scanning
    files = glob(pattern)
    results = []
    
    FOR file IN files:
        yamlParser = getSelectiveYAMLParser()
        result = yamlParser.getCachedYAMLContent(file, operation)
        results.append(result.data)
    
    RETURN results
    
FUNCTION updateAssignmentField(type, id, field, value):
    // Optimized field updates
    currentData = getAssignmentStatus(type, id)
    currentData[field] = value
    
    // Write back only the changed field
    writeAssignmentUpdate(type, id, field, value)
```

## Usage Examples

### Status Check Operations
```pseudocode
// Before: Full YAML parsing
content = readFile("epic.yaml")  // 2000 tokens
fullData = parseYAML(content)    // Parse entire structure

// After: Selective parsing
yamlParser = getSelectiveYAMLParser()
statusData = yamlParser.getCachedYAMLContent("epic.yaml", "status_check")
// Returns only: {id, status, phase, progress} - ~50 tokens

// Result: 97.5% token reduction for status checks
```

### Task Listing Operations
```pseudocode
// Before: Full file parsing for task list
content = readFile("story.yaml")  // 3000 tokens
fullData = parseYAML(content)
tasks = fullData.tasks           // Access full task objects

// After: Selective task parsing
taskData = yamlParser.getCachedYAMLContent("story.yaml", "task_listing")
// Returns: {id, title, tasks[{id, title, type, status, assigned_to, priority}]}
// ~200 tokens

// Result: 93% token reduction for task listings
```

### Progressive Loading
```pseudocode
// Start with metadata
progressiveData = parseYAMLProgressive("story.yaml", "metadata")
// Load: id, title, epic, priority - ~100 tokens

// Later, when full context needed
expandProgressiveData(progressiveData, "validation_context")
// Load: description, problem_statement, tasks details - additional ~300 tokens

// Total: 400 tokens vs 3000 tokens full file = 87% reduction
```

## Configuration

### Field Map Customization
```pseudocode
FUNCTION addCustomFieldMap(operationName, fieldMap):
    fieldMaps.set(operationName, fieldMap)
    
FUNCTION createFieldMap(operation, requiredFields, optionalFields = [], 
                       nestedFields = {}, estimatedTokens = 100):
    RETURN {
        operation: operation,
        requiredFields: requiredFields,
        optionalFields: optionalFields,
        nestedFields: nestedFields,
        estimatedTokens: estimatedTokens
    }
```

### Operation Context Configuration
```pseudocode
FUNCTION configureOperationContext(name, fields, maxDepth = 3, 
                                  includeArrays = true):
    operationContexts.set(name, {
        name: name,
        fields: fields,
        maxDepth: maxDepth,
        includeArrays: includeArrays
    })
```

## Performance Metrics

### Target Token Reductions
- **Status checks**: 97.5% reduction (50 tokens vs 2000)
- **Metadata access**: 95% reduction (100 tokens vs 2000)
- **Task listings**: 93% reduction (200 tokens vs 3000)
- **Embedded config**: 96% reduction (80 tokens vs 2000)
- **Progress tracking**: 92.5% reduction (150 tokens vs 2000)
- **Validation context**: 90% reduction (300 tokens vs 3000)

### Overall Target
- **Average reduction**: 85% across all assignment file operations
- **Cache hit rate**: 90% for repeated operations
- **Parse time**: 60% faster than full YAML parsing

## Integration Benefits

1. **Massive Token Savings**: 85% reduction in YAML parsing tokens
2. **Faster Operations**: Only parse needed fields
3. **Progressive Loading**: Load minimal data first, expand as needed
4. **Session Caching**: Avoid redundant parsing operations
5. **Operation-Specific**: Tailored field extraction for each use case
6. **Backward Compatible**: Falls back to full parsing when needed

---
*Selective YAML parser for intelligent-claude-code system*