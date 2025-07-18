# Session File Cache

**PURPOSE:** Session-based file content caching system to avoid re-reading same files within session  
**TYPE:** Core Optimization Component  
**STATUS:** ACTIVE  
**TARGET:** 90% reduction in redundant read operations

## Imports

@./smart-content-chunker.md                  # Smart content chunking for large files

## Core Cache Implementation

### Session Cache Manager
```pseudocode
CLASS SessionFileCache:
    cache: Map<string, CacheEntry>
    stats: CacheStatistics
    maxCacheSize: 1000
    sessionId: string
    chunkingThreshold: 25000  # 25KB - files larger than this benefit from chunking
    
    STRUCTURE CacheEntry:
        path: string
        content: string
        mtime: number
        size: number
        accessCount: number
        lastAccessed: timestamp
        cacheHit: boolean
        
    STRUCTURE CacheStatistics:
        totalReads: number
        cacheHits: number
        cacheMisses: number
        filesEvicted: number
        redundantReads: number
        bytesRead: number
        bytesCached: number
        
    FUNCTION initialize():
        cache = new Map()
        stats = new CacheStatistics()
        sessionId = generateSessionId()
        maxCacheSize = 1000
        
        logInfo("Session file cache initialized: " + sessionId)
        
    FUNCTION getCachedContent(path, fileType = "generic", operationContext = null):
        // Generate cache key (include operation context for chunked content)
        cacheKey = generateCacheKey(path, fileType, operationContext)
        
        // Check cache first
        IF cache.has(cacheKey):
            entry = cache.get(cacheKey)
            
            // Validate cache entry
            IF isValidCacheEntry(entry):
                // Update statistics
                entry.accessCount++
                entry.lastAccessed = getCurrentTime()
                entry.cacheHit = true
                stats.cacheHits++
                stats.totalReads++
                
                logDebug("Cache HIT: " + path + " (type: " + fileType + ")")
                RETURN entry.content
            ELSE:
                // Remove stale entry
                cache.delete(cacheKey)
                logDebug("Cache STALE: " + path + " - removing")
        
        // Cache miss - read from file with chunking support
        content = readFileWithChunking(path, fileType, operationContext)
        
        // Cache the content
        cacheEntry = {
            path: path,
            content: content,
            mtime: getFileModificationTime(path),
            size: content.length,
            accessCount: 1,
            lastAccessed: getCurrentTime(),
            cacheHit: false,
            operationContext: operationContext,
            chunked: content.isChunked || false
        }
        
        // Add to cache with LRU eviction
        addToCache(cacheKey, cacheEntry)
        
        // Update statistics
        stats.cacheMisses++
        stats.totalReads++
        stats.bytesRead += content.length
        stats.bytesCached += content.length
        
        logDebug("Cache MISS: " + path + " (type: " + fileType + ") - cached")
        RETURN content
        
    FUNCTION readFileWithChunking(path, fileType, operationContext):
        // Check if file is large enough to benefit from chunking
        fileSize = getFileSize(path)
        
        IF fileSize < chunkingThreshold:
            // Use normal file reading for small files
            content = readFileWithType(path, fileType)
            RETURN content
            
        // Check if operation context supports chunking
        IF NOT operationContext:
            // No context - use normal reading
            content = readFileWithType(path, fileType)
            RETURN content
            
        // Use smart chunking for large files
        smartChunker = getSmartContentChunker()
        fullContent = readFileWithType(path, fileType)
        
        // Perform chunking
        chunks = smartChunker.chunkContent(fullContent, path, operationContext)
        
        // Progressive loading
        progressiveLoader = getProgressiveChunkLoader()
        loadingStrategy = determineLoadingStrategy(fileType, operationContext)
        progressiveData = progressiveLoader.loadChunksProgressive(chunks, operationContext, loadingStrategy)
        
        // Combine loaded chunks
        chunkedContent = progressiveData.loadedChunks.map(chunk => chunk.content).join('\n\n')
        
        // Add chunking metadata
        chunkedContent.isChunked = true
        chunkedContent.originalSize = fullContent.length
        chunkedContent.chunkCount = progressiveData.loadedChunks.length
        chunkedContent.tokenReduction = estimateTokenReduction(fullContent, chunkedContent)
        
        logInfo("Chunked " + path + " from " + fullContent.length + " to " + 
               chunkedContent.length + " chars (" + 
               (chunkedContent.tokenReduction.reduction * 100).toFixed(1) + "% reduction)")
        
        RETURN chunkedContent
        
    FUNCTION determineLoadingStrategy(fileType, operationContext):
        // Determine optimal loading strategy based on file type and operation
        baseStrategy = {
            initialChunks: 3,
            expansionThreshold: 2,
            maxChunks: 8
        }
        
        SWITCH fileType:
            CASE "behavioral_module":
                IF operationContext.name == "status_check":
                    baseStrategy.initialChunks = 2
                    baseStrategy.maxChunks = 4
                ELSE IF operationContext.name == "implementation":
                    baseStrategy.initialChunks = 4
                    baseStrategy.maxChunks = 10
                    
            CASE "assignment_file":
                IF operationContext.name == "status_check":
                    baseStrategy.initialChunks = 1
                    baseStrategy.maxChunks = 2
                ELSE IF operationContext.name == "task_listing":
                    baseStrategy.initialChunks = 2
                    baseStrategy.maxChunks = 4
                    
            CASE "documentation":
                baseStrategy.initialChunks = 3
                baseStrategy.maxChunks = 6
                
        RETURN baseStrategy
        
    FUNCTION generateCacheKey(path, fileType, operationContext = null):
        // Include file type and operation context in key for selective caching
        absolutePath = resolvePath(path)
        baseKey = absolutePath + ":" + fileType
        
        // Add operation context hash for chunked content
        IF operationContext:
            contextHash = hashObject(operationContext)
            RETURN baseKey + ":" + contextHash
        
        RETURN baseKey
        
    FUNCTION isValidCacheEntry(entry):
        // Check file modification time
        currentMtime = getFileModificationTime(entry.path)
        IF currentMtime > entry.mtime:
            RETURN false
            
        // Check if file still exists
        IF NOT fileExists(entry.path):
            RETURN false
            
        // Check cache age (max 1 hour)
        IF getCurrentTime() - entry.lastAccessed > 3600000:
            RETURN false
            
        RETURN true
        
    FUNCTION addToCache(cacheKey, entry):
        // Check if cache is full
        IF cache.size >= maxCacheSize:
            evictLRUEntries()
            
        cache.set(cacheKey, entry)
        
    FUNCTION evictLRUEntries():
        // Find oldest accessed entries
        entries = Array.from(cache.entries())
        entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed)
        
        // Remove 10% of cache (100 entries)
        entriesToRemove = Math.min(100, entries.length * 0.1)
        
        FOR i = 0 TO entriesToRemove - 1:
            cacheKey = entries[i][0]
            cache.delete(cacheKey)
            stats.filesEvicted++
            
        logInfo("Evicted " + entriesToRemove + " cache entries")
        
    FUNCTION readFileWithType(path, fileType):
        // Use selective reading based on file type
        SWITCH fileType:
            CASE "config":
                RETURN readConfigFile(path)
            CASE "assignment":
                RETURN readAssignmentFile(path)
            CASE "task":
                RETURN readTaskFile(path)
            CASE "behavioral":
                RETURN readBehavioralFile(path)
            CASE "gitignore":
                RETURN readGitIgnoreFile(path)
            DEFAULT:
                RETURN readFile(path)
                
    FUNCTION readConfigFile(path):
        // Config files: Read header first, then load more if needed
        header = readFile(path, offset: 0, limit: 50)
        
        // Check if YAML front matter exists
        IF header.startsWith("---"):
            yamlEndPos = header.indexOf("---", 3)
            IF yamlEndPos > 0:
                // Load just the YAML section
                RETURN readFile(path, offset: 0, limit: yamlEndPos + 10)
            ELSE:
                // YAML continues beyond header, load more
                RETURN readFile(path, offset: 0, limit: 200)
        ELSE:
            // Key-value format, load standard config section
            RETURN readFile(path, offset: 0, limit: 150)
            
    FUNCTION readAssignmentFile(path):
        // Assignment files: Load metadata first
        RETURN readFile(path, offset: 0, limit: 100)
        
    FUNCTION readTaskFile(path):
        // Task files: Load metadata section first
        RETURN readFile(path, offset: 0, limit: 80)
        
    FUNCTION readBehavioralFile(path):
        // Behavioral files: Load specific sections
        RETURN readFile(path, offset: 0, limit: 200)
        
    FUNCTION readGitIgnoreFile(path):
        // GitIgnore files: Usually small, read fully
        RETURN readFile(path)
```

### Cache Statistics and Monitoring
```pseudocode
FUNCTION getCacheStatistics():
    hitRate = (stats.cacheHits / stats.totalReads) * 100
    redundancyReduction = (stats.redundantReads / stats.totalReads) * 100
    
    RETURN {
        sessionId: sessionId,
        totalReads: stats.totalReads,
        cacheHits: stats.cacheHits,
        cacheMisses: stats.cacheMisses,
        hitRate: hitRate,
        redundancyReduction: redundancyReduction,
        filesEvicted: stats.filesEvicted,
        cacheSize: cache.size,
        bytesRead: stats.bytesRead,
        bytesCached: stats.bytesCached,
        memoryUsage: calculateMemoryUsage()
    }
    
FUNCTION calculateMemoryUsage():
    totalBytes = 0
    FOR entry IN cache.values():
        totalBytes += entry.size
    RETURN totalBytes
    
FUNCTION logCacheStatistics():
    stats = getCacheStatistics()
    
    logInfo("Cache Statistics:")
    logInfo("  Hit Rate: " + stats.hitRate.toFixed(1) + "%")
    logInfo("  Total Reads: " + stats.totalReads)
    logInfo("  Cache Hits: " + stats.cacheHits)
    logInfo("  Cache Misses: " + stats.cacheMisses)
    logInfo("  Files Cached: " + stats.cacheSize)
    logInfo("  Memory Usage: " + formatBytes(stats.memoryUsage))
    logInfo("  Redundancy Reduction: " + stats.redundancyReduction.toFixed(1) + "%")
    
FUNCTION clearSession():
    // Clear all cached content
    cache.clear()
    
    // Reset statistics
    stats = new CacheStatistics()
    
    // Generate new session ID
    sessionId = generateSessionId()
    
    logInfo("Session file cache cleared and reset")
```

### Cache Invalidation
```pseudocode
FUNCTION invalidateFile(path):
    // Remove specific file from cache
    FOR cacheKey IN cache.keys():
        IF cacheKey.startsWith(path + ":"):
            cache.delete(cacheKey)
            logDebug("Invalidated cache: " + path)
            
FUNCTION invalidatePattern(pattern):
    // Remove files matching pattern
    FOR cacheKey IN cache.keys():
        filePath = cacheKey.split(":")[0]
        IF matchesPattern(filePath, pattern):
            cache.delete(cacheKey)
            logDebug("Invalidated cache pattern: " + filePath)
            
FUNCTION invalidateDirectory(dirPath):
    // Remove all files in directory
    FOR cacheKey IN cache.keys():
        filePath = cacheKey.split(":")[0]
        IF filePath.startsWith(dirPath):
            cache.delete(cacheKey)
            logDebug("Invalidated cache directory: " + filePath)
```

### Smart Cache Policies
```pseudocode
FUNCTION shouldCacheFile(path, fileType, size):
    // Don't cache very large files
    IF size > 100000:  // 100KB
        RETURN false
        
    // Don't cache temporary files
    IF path.includes("/tmp/") OR path.includes("/.tmp"):
        RETURN false
        
    // Don't cache lock files
    IF path.endsWith(".lock"):
        RETURN false
        
    // Always cache frequently accessed file types
    frequentTypes = ["config", "assignment", "task", "behavioral"]
    IF fileType IN frequentTypes:
        RETURN true
        
    // Cache other files selectively
    RETURN true
    
FUNCTION getOptimalCacheSize():
    // Dynamic cache size based on available memory
    memoryUsage = calculateMemoryUsage()
    
    IF memoryUsage > 10000000:  // 10MB
        RETURN 500  // Reduce cache size
    ELSE IF memoryUsage > 5000000:  // 5MB
        RETURN 750
    ELSE:
        RETURN 1000  // Default size
```

## Integration Interface

### Global Cache Instance
```pseudocode
// Global cache instance
GLOBAL sessionCache = new SessionFileCache()

// Initialize on system startup
FUNCTION initializeSessionCache():
    sessionCache.initialize()
    
    // Log cache startup
    logInfo("Session file cache ready for 90% redundancy reduction")
    
// Public interface for other modules
FUNCTION getCachedFileContent(path, fileType = "generic"):
    RETURN sessionCache.getCachedContent(path, fileType)
    
FUNCTION invalidateCachedFile(path):
    sessionCache.invalidateFile(path)
    
FUNCTION getCacheStats():
    RETURN sessionCache.getCacheStatistics()
    
FUNCTION clearCacheSession():
    sessionCache.clearSession()
```

### Cache Performance Monitoring
```pseudocode
FUNCTION monitorCachePerformance():
    // Track cache effectiveness
    stats = getCacheStats()
    
    // Log performance metrics
    IF stats.totalReads > 50:
        logInfo("Cache performance: " + stats.hitRate.toFixed(1) + "% hit rate")
        
        // Check if target is met
        IF stats.redundancyReduction >= 90:
            logInfo("✅ TARGET ACHIEVED: 90% redundancy reduction")
        ELSE:
            logWarning("⚠️ Target not met: " + stats.redundancyReduction.toFixed(1) + "% reduction")
            
    // Alert on memory usage
    IF stats.memoryUsage > 20000000:  // 20MB
        logWarning("High cache memory usage: " + formatBytes(stats.memoryUsage))
        
FUNCTION formatBytes(bytes):
    IF bytes >= 1000000:
        RETURN (bytes / 1000000).toFixed(1) + "MB"
    ELSE IF bytes >= 1000:
        RETURN (bytes / 1000).toFixed(1) + "KB"
    ELSE:
        RETURN bytes + "B"
```

## Integration Summary

### Modules Integrated
1. **config-loader.md**: Configuration files cached with "config" type
2. **task-file-generator.md**: Task files cached with "task" type
3. **lean-workflow-executor.md**: Assignment files cached with "assignment" type
4. **archival-intelligence.md**: GitIgnore files cached with "gitignore" type

### Cache Usage Patterns
```pseudocode
// Replace direct file reads with cached versions
// OLD: content = readFile(path)
// NEW: content = getCachedFileContent(path, "fileType")

// Configuration files
configContent = getCachedFileContent("~/.claude/config.md", "config")

// Assignment files
assignmentContent = getCachedFileContent("epic.yaml", "assignment")

// Task files
taskContent = getCachedFileContent("TASK-001-implement.md", "task")

// GitIgnore files
gitignoreContent = getCachedFileContent(".gitignore", "gitignore")

// Behavioral files
behaviorContent = getCachedFileContent("workflow.md", "behavioral")
```

### Cache Invalidation Integration
```pseudocode
// Invalidate when files are modified
writeFile(path, content)
invalidateCachedFile(path)

// Invalidate directories when restructuring
moveDirectory(oldPath, newPath)
invalidateDirectory(oldPath)
```

### Performance Monitoring Integration
```pseudocode
// Built-in monitoring for all integrated modules
FUNCTION performanceReport():
    stats = getCacheStats()
    
    logInfo("Session Cache Performance Report:")
    logInfo("  Total File Reads: " + stats.totalReads)
    logInfo("  Cache Hit Rate: " + stats.hitRate.toFixed(1) + "%")
    logInfo("  Redundancy Reduction: " + stats.redundancyReduction.toFixed(1) + "%")
    
    IF stats.redundancyReduction >= 90:
        logInfo("  ✅ TARGET ACHIEVED: 90% redundancy reduction")
    ELSE:
        logWarning("  ⚠️ Target not met: " + stats.redundancyReduction.toFixed(1) + "%")
```

## Benefits

### Performance Improvements
- **90% Redundancy Reduction**: Target elimination of duplicate file reads
- **Sub-millisecond Cache Hits**: Instant access to cached content
- **Memory Efficient**: LRU eviction with smart size limits
- **Selective Caching**: File-type aware caching strategies

### Integration Benefits
- **Transparent**: Drop-in replacement for file reads
- **Type-Aware**: Optimized for different file types
- **Invalidation**: Smart cache invalidation patterns
- **Monitoring**: Real-time performance tracking

### Session Management
- **Session Scoped**: Cleared between sessions
- **Automatic Cleanup**: LRU eviction and memory management
- **Statistics**: Comprehensive performance metrics
- **Debugging**: Detailed logging and monitoring

## Usage in Integrated Modules

### Config Loader Integration
- Caches `~/.claude/config.md` and `.claude/config.md` with "config" type
- Automatically uses selective reading (YAML front matter or key-value pairs)
- Cache invalidation not needed (config files rarely change during session)

### Task File Generator Integration
- Caches task files with "task" type (metadata section only)
- Invalidates cache when task files are updated
- Optimized for frequent status checks and metadata reads

### Lean Workflow Executor Integration
- Caches assignment files (epic.yaml, story.yaml, bug.yaml) with "assignment" type
- Loads metadata sections for efficient workflow processing
- Integrated with initialization system for cache setup

### Archival Intelligence Integration
- Caches .gitignore files with "gitignore" type
- Invalidates cache when .gitignore is modified
- Optimized for frequent gitignore checks during archival operations

---
*Session file cache for intelligent-claude-code system - targeting 90% redundancy reduction*