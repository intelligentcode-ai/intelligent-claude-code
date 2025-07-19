# Lazy Loading Status

Display module loading optimization status using $ARGUMENTS for detail level.

## Behavioral Sequence
1. Parse $ARGUMENTS for display options:
   - --detail: brief, standard, verbose (default: standard)
   - --format: table, json, yaml (default: table)
   - --sort: name, size, status (default: status)
   - --filter: loaded, stub, all (default: all)
2. Display status header:
   "🚀 Lazy Loading Status - Intelligent Claude Code"
   "Detail: [brief|standard|verbose]"
   "Filter: [loaded|stub|all]"
3. Scan behavioral module directory structure:
   - Check `~/.claude/modes/` for mode files
   - Scan `~/.claude/roles/` for role definitions
   - Examine `~/.claude/behaviors/` for behavioral modules
   - Check `~/.claude/commands/` for command definitions
   - Analyze `~/.claude/workflow-templates/` for workflow files
4. Analyze module loading states:
   
   **Loaded Modules:**
   - Fully loaded into active memory
   - All patterns and rules available
   - Immediate access without loading delay
   - Higher memory usage but faster execution
   
   **Stub Modules:**
   - Loaded as lightweight references
   - Metadata available, full content on-demand
   - Lower memory usage, slight loading delay
   - Optimized for large module collections
   
   **Unloaded Modules:**
   - Available on disk but not in memory
   - Require full load cycle when accessed
   - Minimal memory impact, higher latency
   - Used for rarely accessed modules

5. Calculate module metrics:
   
   **Size Metrics:**
   - File size on disk (KB/MB)
   - Estimated memory usage when loaded
   - Token count for AI processing
   - Complexity score based on content
   
   **Performance Metrics:**
   - Loading time (ms)
   - Access frequency
   - Cache hit rate
   - Optimization potential

6. Generate loading status report:
   ```
   📁 Module Loading Status
   
   Total Modules: [X]
   ✅ Loaded: [A] ([B%])
   🔄 Stub: [C] ([D%])
   ⏸️ Unloaded: [E] ([F%])
   
   Memory Usage: [G] MB ([H%] of available)
   Cache Efficiency: [I%]
   Average Load Time: [J] ms
   ```
7. Display detailed module breakdown:
   
   **Standard Detail Level:**
   ```
   Module                    Status    Size    Load Time  Usage
   virtual-team.md          Loaded    45KB    12ms       High
   specialists.md           Loaded    38KB    10ms       High
   lean-workflow-executor   Stub      67KB    25ms       Medium
   learning-team-automation Stub      52KB    18ms       Medium
   l3-continuous-engine     Unloaded  89KB    35ms       Low
   ```
   
   **Verbose Detail Level:**
   ```
   📁 virtual-team.md
   Status: Loaded (Active)
   Size: 45KB disk, ~67KB memory
   Tokens: ~2,850 tokens
   Load Time: 12ms
   Access: 47 times (last: 2min ago)
   Dependencies: 14 imported modules
   Optimization: Optimal (frequently used)
   ```

8. Analyze optimization opportunities:
   
   **Over-loaded Modules:**
   - Modules loaded but rarely used
   - Candidates for stub conversion
   - Memory usage reduction potential
   
   **Under-loaded Modules:**
   - Frequently accessed but not loaded
   - Candidates for pre-loading
   - Performance improvement potential
   
   **Fragmented Loading:**
   - Related modules with different states
   - Bundle loading opportunities
   - Dependency optimization potential

9. Generate performance recommendations:
   ```
   📈 Optimization Recommendations:
   
   🔄 Convert to Stub:
   - [module1]: Rarely used, save [X]KB memory
   - [module2]: Occasional use, save [Y]KB memory
   
   ⚙️ Pre-load:
   - [module3]: Frequent access, save [Z]ms latency
   - [module4]: Critical path, save [A]ms latency
   
   📦 Bundle Loading:
   - Group [modules]: Related functionality, optimize loading
   
   Total Potential:
   Memory Savings: [B]KB ([C%])
   Performance Gain: [D]ms average
   ```
10. Calculate token usage metrics:
    - Total tokens for all modules
    - Loaded tokens currently in memory
    - Token efficiency ratio
    - Estimated processing costs
11. Display cache and performance statistics:
    ```
    📊 Performance Statistics:
    
    Cache Metrics:
    Hit Rate: [X%] ([Y] hits / [Z] requests)
    Miss Penalty: [A]ms average
    Cache Size: [B]MB ([C] modules)
    
    Loading Metrics:
    Average Load Time: [D]ms
    Fastest Load: [E]ms ([module])
    Slowest Load: [F]ms ([module])
    
    Access Patterns:
    Most Used: [module] ([G] accesses)
    Least Used: [module] ([H] accesses)
    Recent Activity: [I] loads in last hour
    ```
12. Provide actionable optimization commands:
    ```
    🔧 Optimization Commands:
    
    # Convert high-memory, low-use modules to stubs
    icc-optimize-loading --stub [module1,module2]
    
    # Pre-load frequently accessed modules
    icc-optimize-loading --preload [module3,module4]
    
    # Bundle related modules for efficient loading
    icc-optimize-loading --bundle [group1]
    
    # Apply all recommended optimizations
    icc-optimize-loading --apply-recommendations
    ```

## Error Handling
- Module directory access failed: "Error: Cannot access module directory: [specific error]"
- File size calculation failed: "Warning: Could not calculate size for [module]: [specific error]"
- Loading time measurement failed: "Warning: Performance metrics unavailable for [module]"
- Cache analysis failed: "Warning: Cache statistics not available"
- Optimization calculation failed: "Warning: Could not generate optimization recommendations"

## Detail Level Behaviors

**Brief Detail:**
- Summary statistics only
- Total counts and percentages
- Key performance metrics
- Top recommendations

**Standard Detail:**
- Module-by-module breakdown
- Status and basic metrics
- Performance overview
- Actionable recommendations

**Verbose Detail:**
- Complete module analysis
- Detailed performance metrics
- Dependency mapping
- Comprehensive optimization analysis

## Loading State Definitions

**Loaded (Active):**
- Full module content in memory
- All patterns and rules immediately available
- Zero loading latency
- Higher memory consumption

**Stub (Cached Metadata):**
- Module metadata and structure cached
- Content loaded on first access
- Minimal loading latency
- Optimized memory usage

**Unloaded (Disk Only):**
- Module exists on disk only
- Full loading cycle required
- Maximum loading latency
- Zero memory usage

## Optimization Strategies

**Memory Optimization:**
- Convert rarely used modules to stubs
- Unload obsolete or deprecated modules
- Bundle small related modules
- Implement intelligent caching

**Performance Optimization:**
- Pre-load frequently accessed modules
- Cache critical path dependencies
- Optimize loading order
- Parallel loading for independent modules

**Usage-Based Optimization:**
- Track access patterns over time
- Adapt loading strategy to usage
- Seasonal optimization adjustments
- User-specific optimization profiles

## Command Chaining
- Status analysis can trigger optimization commands
- Performance data feeds into system tuning
- Usage patterns inform loading strategy updates