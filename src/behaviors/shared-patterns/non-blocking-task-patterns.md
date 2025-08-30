# Non-Blocking Task Patterns

**MANDATORY:** Use non-blocking Task tool invocation for parallel agent execution. Auto-correct sequential execution violations.

**Purpose:** Enable parallel execution of multiple agents without blocking main scope operation
**Type:** Task Tool Enhancement Pattern
**Status:** ACTIVE

## Core Non-Blocking Pattern

### Non-Blocking Task Tool Invocation

**Standard Non-Blocking Pattern:**
```markdown
Task(
    subagent_type='general-purpose',
    description='Execute [PRB-ID]: [brief_description]',
    prompt='[Complete PRB context with embedded configuration]',
    run_in_background=true
)
```

### Execution Mode Decision Matrix

**NON-BLOCKING EXECUTION (run_in_background: true):**
- **L3 Autonomous Mode:** max_parallel > 1 configured
- **Independent PRBs:** No dependency chain requirements
- **Long-Running Tasks:** Expected execution time > 2 minutes
- **Validation Chains:** Can prepare next PRB while current executes
- **Parallel Capacity Available:** Current running agents < max_parallel

**BLOCKING EXECUTION (run_in_background: false):**
- **L1/L2 Modes:** Manual or architect approval required
- **Dependent PRBs:** Sequential execution needed for results
- **Critical Operations:** Immediate feedback required
- **Error-Prone Tasks:** Need immediate error handling
- **Capacity Limits:** At max_parallel threshold

## Background Agent Management

### Agent Handle Tracking

**Running Agent Registry:**
```yaml
parallel_execution:
  max_capacity: 5
  current_running: 2
  agent_registry:
    - handle: agent_001
      prb_id: STORY-011-PRB-001
      start_time: 2025-08-30T10:15:00Z
      status: running
      estimated_completion: 2025-08-30T10:45:00Z
    - handle: agent_002  
      prb_id: BUG-032-PRB-002
      start_time: 2025-08-30T10:20:00Z
      status: running
      estimated_completion: 2025-08-30T10:35:00Z
```

### Status Monitoring Pattern

**Background Agent Lifecycle:**
1. **Launch:** Store agent handle with metadata
2. **Track:** Periodically check execution status
3. **Monitor:** Watch for completion or error signals
4. **Complete:** Process results and clean up handle
5. **Cleanup:** Remove completed agents from registry

**Status Check Pattern:**
```markdown
# Periodic status monitoring (every 2-5 minutes)
for agent_handle in running_agents:
    status = check_agent_status(agent_handle)
    if status == 'completed':
        process_completion(agent_handle)
        remove_from_registry(agent_handle)
    elif status == 'error':
        handle_agent_error(agent_handle)
        remove_from_registry(agent_handle)
```

## Parallel Execution Coordination

### Capacity Management

**Parallel Execution Rules:**
- **Max Capacity:** Respect max_parallel configuration setting
- **Queue Management:** Hold PRBs when at capacity, auto-dispatch when slots available
- **Resource Conflicts:** Detect file/directory conflicts, serialize conflicting operations
- **Graceful Degradation:** Fall back to sequential execution if coordination fails

### Conflict Detection

**Resource Conflict Patterns:**
```yaml
conflict_detection:
  file_conflicts:
    - Check PRBs modifying same files
    - Serialize operations on conflicting paths
    - Allow parallel non-conflicting file operations
  
  directory_conflicts:
    - Detect overlapping directory operations
    - Prevent simultaneous git operations
    - Coordinate shared resource access
  
  dependency_conflicts:
    - Check PRB dependency chains
    - Ensure prerequisites complete before dependents
    - Maintain execution order for dependent work
```

## Error Handling & Recovery

### Background Agent Error Handling

**Error Recovery Patterns:**
- **Agent Timeout:** Configurable timeout (default: 30 minutes)
- **Agent Failure:** Capture error context, retry logic, escalation patterns
- **Communication Loss:** Detect silent failures, agent health checks
- **Resource Exhaustion:** Graceful capacity management, queue backoff

**Error Response Actions:**
```yaml
error_handling:
  timeout:
    action: "Terminate agent, log timeout, mark PRB for retry"
    escalation: "Manual review if repeated timeouts"
    
  failure:
    action: "Capture error context, attempt automatic retry"
    retry_limit: 2
    escalation: "Manual intervention after retry limit"
    
  resource_exhaustion:
    action: "Queue PRB, reduce parallel capacity temporarily"
    recovery: "Resume when resources available"
```

## Integration Points

### With L3 Autonomous Mode

**L3 Continuous Execution Enhancement:**
- **Discover Multiple Tasks:** Find all available work simultaneously
- **Parallel PRB Generation:** Create multiple PRBs for independent work
- **Background Dispatch:** Launch agents in parallel without waiting
- **Continuous Discovery:** Continue finding work while agents execute
- **Dynamic Capacity:** Adjust parallel execution based on system load

### With PRB Queue Management

**Queue Integration Patterns:**
- **Priority Scheduling:** High-priority PRBs get immediate slots
- **Dependency Resolution:** Dependent PRBs wait for prerequisites
- **Load Balancing:** Distribute work across available agent slots
- **Completion Triggers:** Auto-dispatch queued PRBs when slots available

### With Memory System

**Learning Integration:**
- **Performance Patterns:** Track parallel execution performance metrics
- **Error Patterns:** Store failure modes and recovery patterns
- **Optimization:** Learn optimal capacity settings and conflict resolution
- **Success Patterns:** Identify high-performing parallel execution strategies

## Implementation Guidelines

### Non-Blocking Invocation Pattern

**Task Tool Enhancement:**
1. **Add Background Parameter:** run_in_background=true for parallel execution
2. **Handle Storage:** Store returned agent handle for tracking
3. **Status Monitoring:** Implement periodic status checks
4. **Result Processing:** Handle asynchronous completion events

### Agent Registry Management

**Registry Operations:**
- **Registration:** Add new agents with metadata on launch
- **Updates:** Periodically refresh agent status information
- **Cleanup:** Remove completed/failed agents from active registry
- **Persistence:** Maintain registry across system operations

### Coordination Mechanisms

**Parallel Coordination:**
- **Resource Locking:** Prevent conflicts on shared resources
- **Dependency Tracking:** Ensure proper execution ordering
- **Capacity Monitoring:** Respect parallel execution limits
- **Error Isolation:** Prevent agent failures from cascading

---
*Non-blocking Task tool patterns for parallel agent execution*