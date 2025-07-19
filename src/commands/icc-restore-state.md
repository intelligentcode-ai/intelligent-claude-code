# Restore State

Restore preserved system state after context loss using $ARGUMENTS for restoration options.

## Behavioral Sequence
1. Parse $ARGUMENTS for restoration options:
   - --full: Complete system state restoration
   - --roles: Restore only role states and scores
   - --tasks: Restore only task queue and progress
   - --memory: Restore only memory connections
   - --force: Force restore even with conflicts
   - --timestamp: Restore from specific timestamp
2. Display restoration initiation:
   "🔄 Restoring intelligent-claude-code system state"
   "Options: [full|roles|tasks|memory|force]"
   "Timestamp: [latest or specified]"
3. Initialize restoration process:
   - Test system availability and permissions
   - Verify memory system accessibility
   - Check for existing active state conflicts
   - Load restoration metadata
4. Restore memory connections:
   - Test MCP Memory connection with `mcp__memory__read_graph()`
   - If connection fails, activate file-based fallback
   - Search for system state entities in memory
   - Load last known memory snapshot
   - Display: "🧠 Memory connection: [Connected|File-based fallback]"
5. Restore active roles and context:
   
   **Role State Recovery:**
   - Search memory for role activation history
   - Load last active role and context
   - Restore role scores (P: Process, Q: Quality)
   - Recover role-specific working context
   - Rebuild role stack and switching history
   
   **Context Recovery:**
   - Load active work items and assignments
   - Restore current task focus and progress
   - Recover specialist assignments and validations
   - Rebuild role-specific tool access and constraints

6. Restore work progress and task context:
   
   **Task Queue Recovery:**
   - Scan file system for active epics/stories/bugs
   - Load task status and progress tracking
   - Rebuild task dependencies and priorities
   - Restore execution order and critical path
   
   **Progress State Recovery:**
   - Load completion percentages and metrics
   - Restore timeline tracking and estimates
   - Recover quality gates and validation status
   - Rebuild work item relationships

7. Restore role states and scores:
   
   **Score Recovery:**
   - Load historical scores from memory or files
   - Restore P (Process) and Q (Quality) metrics
   - Recover achievement tracking and badges
   - Rebuild score history and trends
   
   **Role Assignments:**
   - Restore current specialist assignments
   - Recover role validation states
   - Rebuild capability matching records
   - Restore dynamic specialist definitions

8. Restore task queue status:
   
   **Queue State:**
   - Load priority queue state and ordering
   - Restore task readiness and blocking states
   - Recover parallel execution opportunities
   - Rebuild dependency resolution tracking
   
   **Execution Context:**
   - Restore current execution phase
   - Recover autonomy level and settings
   - Rebuild continuous execution state (if L3)
   - Restore work discovery patterns

9. Restore ID sequence tracking:
   - Scan existing epics/stories/bugs for highest IDs
   - Rebuild ID counters: EPIC-XXX, STORY-XXX, BUG-XXX
   - Restore task numbering sequences
   - Verify no ID conflicts or gaps
10. Validate restoration integrity:
    
    **Consistency Checks:**
    - Verify role assignments match capabilities
    - Check task dependencies are valid
    - Validate all file references exist
    - Confirm memory state matches file state
    
    **Conflict Resolution:**
    - Detect conflicts between memory and file state
    - Resolve using timestamp precedence
    - Prompt user for conflict resolution if needed
    - Log all conflicts and resolutions

11. Rebuild system integrations:
    - Test GitHub CLI integration
    - Verify Context7 documentation access
    - Restore tool integrations and fallbacks
    - Rebuild validation enforcement state
12. Display restoration summary:
    ```
    ✅ System State Restored Successfully
    
    👥 Roles: @[CurrentRole] (P:X.X, Q:X.X)
    📋 Tasks: [X] active, [Y] completed
    🧠 Memory: [X] entities, [Y] recent learnings
    🔢 Sequences: EPIC-[X], STORY-[Y], BUG-[Z]
    ⚙️ Queue: [A] ready, [B] blocked
    🔄 Last Save: [timestamp]
    
    Status: FULLY RESTORED
    ```
13. Update restoration timestamp and log activity
14. Trigger post-restoration validation:
    - Test role switching functionality
    - Verify memory search works
    - Check task creation and assignment
    - Validate command chain execution

## Error Handling
- Memory connection failed: "Warning: Memory system unavailable, using file-based restoration"
- State conflicts detected: "Warning: State conflicts found, resolving with [resolution strategy]"
- Role state corrupted: "Error: Role state corrupted, reverting to default roles"
- Task queue inconsistent: "Warning: Task queue inconsistencies detected, rebuilding"
- ID sequence conflicts: "Error: ID sequence conflicts detected: [specific conflicts]"
- File access denied: "Error: Cannot access state files: [specific error]"
- Memory search failed: "Warning: Memory search failed during restoration"
- Integration test failed: "Warning: Post-restoration integration test failed: [specific test]"

## Restoration Strategies

**Full Restoration (--full):**
- Complete system state recovery
- All roles, tasks, memory, and sequences
- Most comprehensive but potentially slower
- Recommended after major interruptions

**Role-Only Restoration (--roles):**
- Restore only role states and scores
- Faster restoration for role-specific issues
- Maintains work context but not full state
- Useful for role switching problems

**Task-Only Restoration (--tasks):**
- Restore only task queue and progress
 - Rebuild work item relationships
- Useful for task tracking issues
- Faster than full restoration

**Memory-Only Restoration (--memory):**
- Restore only memory connections and state
- Rebuild learning and pattern access
- Useful for memory system issues
- Maintains other system state

## State Preservation Points

**Automatic Preservation:**
- Role activations and switches
- Task creations and completions
- Major system state changes
- Learning captures and applications

**Manual Preservation:**
- Before major operations
- At user request
- Before system shutdown
- After significant work completion

## Conflict Resolution

**Timestamp Precedence:**
- Most recent state wins conflicts
- Memory state vs file state comparison
- User confirmation for significant conflicts
- Automatic resolution for minor conflicts

**Consistency Validation:**
- Role assignments must match capabilities
- Task dependencies must be valid
 - ID sequences must be consistent
- File references must exist

## Recovery Scenarios

**Context Loss Recovery:**
- Browser refresh or session timeout
- System restart or interruption
- Network disconnection recovery
- Tool integration failures

**Data Corruption Recovery:**
- File corruption or deletion
- Memory system failures
- State inconsistencies
- Integration breakdowns

## Command Chaining
- Restoration enables all system functionality
- State must be restored before major operations
- Restoration success required for continued work