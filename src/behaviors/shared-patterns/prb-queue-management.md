# PRB Queue Management

**MANDATORY:** Track and manage PRB execution queue for parallel processing with capacity enforcement and conflict prevention.

## Queue States

### PRB State Lifecycle
- **queued**: Waiting for execution slot or dependency resolution
- **running**: Currently executing via background Task tool agent
- **completed**: Successfully finished execution
- **failed**: Execution failed, requires manual intervention or retry
- **blocked**: Cannot execute due to file conflicts or unmet dependencies

### Queue Structure Pattern

**Memory-Based Queue Tracking:**
```yaml
prb_queue:
  running:
    - prb_id: STORY-011-PRB-001
      agent_handle: agent_123
      start_time: 2025-08-30T10:00:00
      files_locked: [src/behaviors/prb-execution.md]
      estimated_completion: 2025-08-30T10:15:00
      
  queued:
    - prb_id: STORY-011-PRB-002
      priority: HIGH
      dependencies: []
      blocked_by_files: []
      queue_time: 2025-08-30T10:05:00
      
  completed:
    - prb_id: BUG-047-PRB-001
      completion_time: 2025-08-30T09:00:00
      execution_duration: 8m32s
      
  failed:
    - prb_id: STORY-010-PRB-003
      failure_time: 2025-08-30T09:30:00
      error_summary: "Build failed: missing dependency"
      retry_count: 2
      
  capacity_settings:
    max_parallel: 5  # From L3 autonomy settings
    current_running: 1
    queue_position_counter: 3
```

## Capacity Management Behaviors

### Capacity Check Decision Pattern
**BEFORE PRB DISPATCH:**
1. **Load L3 Settings:** Read `max_parallel` from autonomy configuration
2. **Count Running:** Count PRBs in `running` state
3. **Capacity Decision:**
   - If `current_running < max_parallel`: **DISPATCH** immediately  
   - If `current_running >= max_parallel`: **ADD TO QUEUE** with priority positioning
4. **Update Queue State:** Increment counters and track queue position

### Auto-Dispatch Behavioral Pattern
**ON PRB COMPLETION EVENT:**
```
Completion Detection → Queue Management Flow:
1. Move completed PRB to completed state
2. Decrement current_running counter
3. Release file locks from completed PRB
4. Scan queued PRBs for next eligible:
   - Check dependencies (all in completed state)
   - Check file conflicts (no locked file overlap)
   - Priority ordering (HIGH → MEDIUM → LOW)
5. If eligible PRB found and capacity available:
   - Dispatch via Task tool with run_in_background=true
   - Update queue state to running
   - Lock files for conflict prevention
6. Repeat until capacity full or no eligible PRBs
```

### Queue Priority Management
**Priority Ordering Logic:**
- **HIGH Priority:** Bug fixes, critical system issues, blocking dependencies
- **MEDIUM Priority:** Feature implementation, enhancement work
- **LOW Priority:** Documentation updates, cleanup tasks, optimization

**Queue Position Factors:**
1. **Priority Level** (primary)
2. **Queue Time** (secondary - FIFO within priority)
3. **Dependency Satisfaction** (blocking factor)
4. **File Conflict Status** (blocking factor)

## Conflict Prevention System

### File Locking Behavioral Pattern
**BEFORE PRB DISPATCH:**
1. **Analyze PRB Files:** Extract all files mentioned in PRB requirements
2. **Check File Locks:** Scan running PRBs for overlapping files
3. **Conflict Decision:**
   - **No Conflicts:** Proceed with dispatch
   - **Conflicts Detected:** Mark as `blocked` and defer to queue
4. **Lock Files:** Add files to running PRB's locked_files array
5. **Release on Completion:** Remove file locks when PRB completes

### File Conflict Detection Logic
**Conflict Categories:**
- **Direct File Conflicts:** Same file being modified by multiple PRBs
- **Directory Conflicts:** PRBs affecting same directory structure
- **Configuration Conflicts:** Multiple PRBs modifying same config files
- **Git Operation Conflicts:** Concurrent git operations (commits, pushes)

**Resolution Patterns:**
```yaml
conflict_resolution:
  same_file_modification:
    action: "Queue second PRB until first completes"
    rationale: "Prevent merge conflicts and lost changes"
    
  git_operations:
    action: "Serialize all git operations"
    rationale: "Prevent git repository corruption"
    
  configuration_changes:
    action: "Queue configuration changes"
    rationale: "Maintain consistency in system settings"
```

## Dependency Resolution Patterns

### Dependency Checking Behavioral Flow
**BEFORE DISPATCH FROM QUEUE:**
1. **Load PRB Dependencies:** Check `dependencies` array in PRB
2. **Validate Dependency States:** All dependencies must be in `completed` state
3. **Dependency Decision:**
   - **All Met:** Mark as eligible for dispatch
   - **Unmet Dependencies:** Keep in queued state, check after each completion
4. **Chain Dependencies:** Automatically detect common dependency patterns

### Common Dependency Patterns
**Automatic Dependency Detection:**
- **Validation → Implementation:** Validation PRBs depend on code PRBs completing
- **Fix → Validation:** Fix PRBs depend on validation PRBs identifying issues
- **Deploy → Build:** Deployment PRBs depend on successful build completion  
- **Test → Implementation:** Test PRBs depend on implementation changes
- **Documentation → Feature:** Documentation PRBs depend on feature completion

### Dependency Chain Management
```yaml
dependency_chains:
  implementation_flow:
    - implement_feature (PRB-001)
    - validate_implementation (PRB-002, depends: PRB-001)
    - fix_validation_issues (PRB-003, depends: PRB-002)
    - deploy_feature (PRB-004, depends: PRB-003)
    
  parallel_safe_flow:
    - update_documentation (PRB-005, no dependencies)
    - refactor_utility (PRB-006, no dependencies)  
    - optimize_memory (PRB-007, no dependencies)
```

## Background Execution Integration

### Task Tool Background Pattern
**DISPATCH WITH BACKGROUND EXECUTION:**
```markdown
# When capacity available and no conflicts:
Task(
    subagent_type='general-purpose',
    description='Execute [PRB-ID]: [brief_description]',
    prompt='[Complete PRB context with embedded configuration]',
    run_in_background=true
)

# Store agent handle in queue system for tracking
queue_system.update_running_prb(
    prb_id=prb_id,
    agent_handle=task_result.agent_handle,
    start_time=current_time,
    files_locked=extracted_files
)
```

### Background Status Monitoring
**PERIODIC QUEUE MANAGEMENT (Every 2-5 Minutes):**
1. **Check Running Agents:** Poll status of background agents
2. **Process Completions:** Move completed PRBs to completed state  
3. **Handle Failures:** Move failed PRBs to failed state
4. **Release Resources:** Clean up file locks and agent handles
5. **Trigger Dispatch:** Auto-dispatch eligible queued PRBs
6. **Update Statistics:** Track execution metrics and performance

### Agent Registry Maintenance
**Agent Handle Management:**
```yaml
agent_registry:
  cleanup_triggers:
    - agent_completion_detected
    - agent_failure_detected  
    - periodic_maintenance_cycle
    
  cleanup_actions:
    - remove_from_running_queue
    - release_file_locks
    - update_completion_statistics
    - trigger_next_dispatch_cycle
    
  error_handling:
    - orphaned_agent_detection
    - stale_agent_cleanup
    - failed_agent_retry_logic
```

## Queue Status Monitoring

### Queue Health Behavioral Checks
**HEALTH MONITORING PATTERNS:**
- **Queue Length Monitoring:** Alert if queue length exceeds capacity threshold
- **Completion Rate Tracking:** Monitor average PRB completion times
- **Failure Rate Analysis:** Track and analyze PRB failure patterns
- **Capacity Utilization:** Ensure max_parallel setting is effectively used
- **Bottleneck Detection:** Identify common blocking patterns

### Queue Statistics Tracking
```yaml
queue_statistics:
  performance_metrics:
    - average_queue_time
    - average_execution_time
    - completion_success_rate
    - parallel_utilization_rate
    
  bottleneck_analysis:
    - most_common_conflicts
    - longest_dependency_chains
    - peak_queue_length_times
    - failure_pattern_analysis
```

## Integration Points

### With PRB Execution System
**EXECUTION WORKFLOW INTEGRATION:**
- **Pre-Execution:** Check capacity and conflicts before dispatch
- **During Execution:** Track running PRBs and maintain file locks
- **Post-Execution:** Update queue state and trigger next dispatch cycle
- **Error Handling:** Move failed PRBs to appropriate state for retry

### With L3 Autonomy System
**AUTONOMY INTEGRATION:**
- **Read Capacity Settings:** Dynamic loading of `max_parallel` from L3 config
- **Respect Autonomy Levels:** Queue behavior adapts to L1/L2/L3 modes
- **Auto-Discovery Integration:** Queue discovered work alongside user requests
- **Continuous Operation:** Enable true autonomous parallel execution

### With Memory System  
**MEMORY INTEGRATION:**
- **Queue State Persistence:** Store queue state in memory for session continuity
- **Pattern Learning:** Capture successful queue management patterns
- **Performance Optimization:** Learn from execution statistics for better scheduling
- **Failure Analysis:** Store and learn from failure patterns

### With Configuration System
**CONFIGURATION INTEGRATION:**
- **Dynamic Settings:** Load queue settings from CLAUDE.md configuration
- **Project Overrides:** Allow project-specific queue behavior customization
- **Capacity Scaling:** Support different capacity limits per project
- **Behavioral Customization:** Enable project-specific queue priority rules

## Error Recovery Behaviors

### Failed PRB Management
**FAILURE HANDLING PATTERNS:**
- **Automatic Retry Logic:** Retry failed PRBs up to configured limit
- **Failure Analysis:** Categorize failures (transient vs permanent)
- **Manual Intervention Queue:** Flag PRBs requiring human review
- **Dependency Impact Assessment:** Handle downstream dependency failures

### Queue Corruption Recovery  
**RECOVERY PATTERNS:**
- **State Validation:** Periodic queue state consistency checks
- **Orphaned Agent Cleanup:** Detect and clean up lost agent handles
- **Queue Rebuild:** Reconstruct queue from PRB file states if needed
- **Graceful Degradation:** Fall back to sequential execution if queue fails

---
*PRB queue management for parallel execution with capacity enforcement and conflict prevention*