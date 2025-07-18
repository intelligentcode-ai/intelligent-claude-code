# icc-lazy-loading-status Command

**PURPOSE:** Display lazy loading status and performance metrics  
**USAGE:** `/icc-lazy-loading-status [--detailed]`  
**CONTEXT:** Token optimization and performance monitoring

## Command Implementation

```pseudocode
FUNCTION executeLazyLoadingStatus(options):
    
    // Get lazy loading statistics
    registry = getBehavioralModuleRegistry()
    stats = registry.getRegistryStats()
    
    // Display basic status
    output = []
    output.append("📊 Lazy Loading Status Report")
    output.append("=" * 50)
    output.append("")
    
    // Module statistics
    output.append("📦 Module Statistics:")
    output.append("  Total Modules: " + stats.totalModules)
    output.append("  Loaded Stubs: " + stats.loadedStubs)
    output.append("  Full Modules: " + stats.fullModules)
    output.append("  Memory Usage: " + formatBytes(stats.memoryUsage))
    output.append("")
    
    // Token statistics
    tokenStats = trackTokenUsage()
    output.append("🎯 Token Optimization:")
    output.append("  Available Tokens: " + tokenStats.totalTokensAvailable)
    output.append("  Loaded Tokens: " + tokenStats.tokensLoaded)
    output.append("  Saved Tokens: " + tokenStats.tokensSaved)
    output.append("  Savings: " + tokenStats.savingsPercentage + "%")
    output.append("")
    
    // Performance metrics
    performanceStats = getPerformanceStats()
    output.append("⚡ Performance Metrics:")
    output.append("  Avg Load Time: " + performanceStats.avgLoadTime + "ms")
    output.append("  Cache Hit Rate: " + performanceStats.cacheHitRate + "%")
    output.append("  Memory Efficiency: " + performanceStats.memoryEfficiency + "%")
    output.append("")
    
    // Module breakdown
    output.append("🔍 Module Breakdown:")
    moduleBreakdown = getModuleBreakdown()
    FOR module IN moduleBreakdown:
        status = module.loaded ? "✅ Loaded" : "💤 Stub"
        output.append("  " + module.name + ": " + status + " (" + module.tokenCount + " tokens)")
    
    // Detailed information if requested
    IF options.detailed:
        output.append("")
        output.append("📈 Detailed Analytics:")
        output.append(getDetailedAnalytics())
    
    // Recommendations
    output.append("")
    output.append("💡 Recommendations:")
    recommendations = generateRecommendations(stats)
    FOR rec IN recommendations:
        output.append("  • " + rec)
    
    RETURN output.join("\n")

FUNCTION getModuleBreakdown():
    registry = getBehavioralModuleRegistry()
    breakdown = []
    
    FOR moduleName, descriptor IN registry.modules:
        moduleInfo = {
            name: moduleName,
            loaded: registry.fullModules.has(moduleName),
            tokenCount: descriptor.estimatedTokens,
            loadingStrategy: descriptor.loadingStrategy,
            priority: descriptor.priority
        }
        breakdown.append(moduleInfo)
    
    // Sort by priority
    breakdown.sort((a, b) => a.priority - b.priority)
    
    RETURN breakdown

FUNCTION getDetailedAnalytics():
    analytics = []
    
    // Usage patterns
    patterns = getUsagePatterns()
    analytics.append("Usage Patterns:")
    FOR pattern IN patterns:
        analytics.append("  " + pattern.operation + ": " + pattern.frequency + " times")
    
    // Load time breakdown
    loadTimes = getLoadTimeBreakdown()
    analytics.append("")
    analytics.append("Load Time Analysis:")
    FOR time IN loadTimes:
        analytics.append("  " + time.module + ": " + time.avgTime + "ms")
    
    // Memory usage trends
    memoryTrends = getMemoryTrends()
    analytics.append("")
    analytics.append("Memory Usage Trends:")
    FOR trend IN memoryTrends:
        analytics.append("  " + trend.timeframe + ": " + trend.usage + "MB")
    
    RETURN analytics.join("\n")

FUNCTION generateRecommendations(stats):
    recommendations = []
    
    // Token usage recommendations
    IF stats.savingsPercentage < 50:
        recommendations.append("Consider more aggressive lazy loading strategies")
    
    IF stats.savingsPercentage > 70:
        recommendations.append("Excellent token optimization! Consider preloading frequently used modules")
    
    // Memory recommendations
    IF stats.memoryUsage > 50 * 1024 * 1024:  // 50MB
        recommendations.append("High memory usage detected. Consider unloading unused modules")
    
    // Performance recommendations
    performanceStats = getPerformanceStats()
    IF performanceStats.avgLoadTime > 100:  // 100ms
        recommendations.append("Average load time is high. Consider preloading critical modules")
    
    IF performanceStats.cacheHitRate < 70:
        recommendations.append("Low cache hit rate. Consider increasing cache size or adjusting TTL")
    
    // Module-specific recommendations
    moduleBreakdown = getModuleBreakdown()
    heavyModules = moduleBreakdown.filter(m => m.tokenCount > 2000)
    
    IF heavyModules.length > 0:
        recommendations.append("Heavy modules detected: " + heavyModules.map(m => m.name).join(", "))
    
    RETURN recommendations
```

## Performance Analysis

```pseudocode
FUNCTION getPerformanceStats():
    registry = getBehavioralModuleRegistry()
    
    // Calculate average load time
    loadTimes = []
    FOR module IN registry.loadedModules:
        loadTimes.append(module.loadTime)
    
    avgLoadTime = loadTimes.reduce((a, b) => a + b) / loadTimes.length
    
    // Calculate cache hit rate
    cacheStats = getSessionCache().getStats()
    cacheHitRate = (cacheStats.hits / (cacheStats.hits + cacheStats.misses)) * 100
    
    // Calculate memory efficiency
    totalMemory = getTotalMemoryUsage()
    usedMemory = getCurrentMemoryUsage()
    memoryEfficiency = (usedMemory / totalMemory) * 100
    
    RETURN {
        avgLoadTime: avgLoadTime,
        cacheHitRate: cacheHitRate,
        memoryEfficiency: memoryEfficiency
    }

FUNCTION getUsagePatterns():
    registry = getBehavioralModuleRegistry()
    patterns = []
    
    // Get operation patterns
    operationPatterns = registry.getOperationPatterns()
    
    FOR operation, frequency IN operationPatterns:
        patterns.append({
            operation: operation,
            frequency: frequency,
            modules: registry.getOperationModules(operation)
        })
    
    // Sort by frequency
    patterns.sort((a, b) => b.frequency - a.frequency)
    
    RETURN patterns

FUNCTION getLoadTimeBreakdown():
    registry = getBehavioralModuleRegistry()
    breakdown = []
    
    FOR moduleName, descriptor IN registry.modules:
        loadTime = getModuleLoadTime(moduleName)
        breakdown.append({
            module: moduleName,
            avgTime: loadTime.average,
            minTime: loadTime.min,
            maxTime: loadTime.max,
            loadCount: loadTime.count
        })
    
    // Sort by average time
    breakdown.sort((a, b) => b.avgTime - a.avgTime)
    
    RETURN breakdown
```

## Integration with PM Commands

```pseudocode
FUNCTION registerLazyLoadingCommands():
    // Register with PM command system
    pmCommands = getPMCommandSystem()
    
    pmCommands.register("lazy-status", {
        command: "icc-lazy-loading-status",
        description: "Display lazy loading status and performance metrics",
        usage: "/icc-lazy-loading-status [--detailed]",
        handler: executeLazyLoadingStatus
    })
    
    pmCommands.register("optimize-loading", {
        command: "icc-optimize-loading",
        description: "Optimize lazy loading based on usage patterns",
        usage: "/icc-optimize-loading",
        handler: executeOptimizeLoading
    })
    
    pmCommands.register("clear-cache", {
        command: "icc-clear-lazy-cache",
        description: "Clear lazy loading cache",
        usage: "/icc-clear-lazy-cache",
        handler: executeClearLazyCache
    })

FUNCTION executeOptimizeLoading():
    registry = getBehavioralModuleRegistry()
    
    // Analyze usage patterns
    patterns = getUsagePatterns()
    
    // Optimize based on patterns
    optimizations = []
    
    FOR pattern IN patterns:
        IF pattern.frequency > 10:  // High frequency
            // Preload these modules
            FOR module IN pattern.modules:
                IF NOT registry.isLoadedAtLevel(module, "core"):
                    registry.ensureModuleLoaded(module, "core")
                    optimizations.append("Preloaded " + module + " (high frequency)")
        
        ELSE IF pattern.frequency < 2:  // Low frequency
            // Unload or use lazy strategy
            FOR module IN pattern.modules:
                IF registry.isLoadedAtLevel(module, "full"):
                    registry.unloadModule(module)
                    registry.ensureModuleLoaded(module, "stub")
                    optimizations.append("Unloaded " + module + " (low frequency)")
    
    RETURN "Optimizations applied:\n" + optimizations.join("\n")

FUNCTION executeClearLazyCache():
    registry = getBehavioralModuleRegistry()
    sessionCache = getSessionCache()
    
    // Clear lazy loading cache
    lazyCache = sessionCache.getNamespace("lazy-loading")
    clearedCount = lazyCache.clear()
    
    // Reset registry
    registry.reset()
    registry.initialize()
    
    RETURN "Cleared " + clearedCount + " cached items. Registry reset."
```

## Example Output

```
📊 Lazy Loading Status Report
==================================================

📦 Module Statistics:
  Total Modules: 9
  Loaded Stubs: 7
  Full Modules: 2
  Memory Usage: 12.3 MB

🎯 Token Optimization:
  Available Tokens: 15,600
  Loaded Tokens: 6,240
  Saved Tokens: 9,360
  Savings: 60.0%

⚡ Performance Metrics:
  Avg Load Time: 45ms
  Cache Hit Rate: 78%
  Memory Efficiency: 82%

🔍 Module Breakdown:
  lean-workflow-executor: ✅ Loaded (2500 tokens)
  role-activation-system: ✅ Loaded (1800 tokens)
  learning-team-automation: 💤 Stub (500 tokens)
  l3-continuous-engine: 💤 Stub (450 tokens)
  task-queue-manager: 💤 Stub (400 tokens)
  auto-continue-triggers: 💤 Stub (350 tokens)
  progress-monitor: 💤 Stub (300 tokens)
  work-discovery-engine: 💤 Stub (320 tokens)
  archival-intelligence: 💤 Stub (340 tokens)

💡 Recommendations:
  • Excellent token optimization! Consider preloading frequently used modules
  • Heavy modules detected: lean-workflow-executor, role-activation-system
  • Consider more aggressive caching for frequently accessed functions
```

## Integration Points

- **PM Commands**: Available through @PM lazy-status
- **System Status**: Integrated with /icc-system-status
- **Performance Monitoring**: Real-time metrics collection
- **Optimization**: Automatic recommendations based on usage patterns

---
*Lazy loading status command for intelligent-claude-code token optimization monitoring*