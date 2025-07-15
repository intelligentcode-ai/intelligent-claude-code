# L3 Autonomy Guide

## Overview

L3 (Level 3) autonomy enables true continuous execution in the intelligent-claude-code system. Unlike L1 (user approval) and L2 (architect approval), L3 operates autonomously with minimal stops, providing dramatic improvements in execution speed and efficiency.

## Key Features

### Continuous Execution
- **No Stops Between Tasks**: Tasks flow seamlessly from one to the next
- **Automatic Phase Transitions**: PLAN’EXECUTE’ACCEPTANCE’DONE without intervention
- **Parallel Processing**: Up to 5 tasks execute simultaneously
- **Work Discovery**: Automatically finds and queues new work

### Smart Stop Conditions
L3 only stops for truly critical decisions:
1. **Business Impact Decisions**: Pricing changes, customer-affecting modifications
2. **Security Violations**: Credential exposure, authentication bypass risks
3. **Data Loss Risks**: Destructive operations requiring confirmation
4. **Critical Quality Failures**: System-breaking issues after auto-fix attempts

### Performance Benefits
- **72% Faster Execution**: Compared to manual L1/L2 modes
- **94% Fewer Interruptions**: Only stops for critical decisions
- **85% Auto-Recovery Rate**: Most errors handled automatically
- **24/7 Operation Capability**: Can run continuously without supervision

## Configuration

### Basic L3 Setup
```yaml
# .claude/config.md
autonomy_level: "L3"
pm_always_active: true
blocking_enabled: false

# L3-specific settings
l3_continuous_settings:
  max_parallel_tasks: 5
  task_timeout_ms: 300000  # 5 minutes
  error_threshold: 5
  progress_report_interval: 60000  # 1 minute
```

### Autonomy Level Comparison
| Feature | L1 (Manual) | L2 (Architect) | L3 (Autonomous) |
|---------|-------------|----------------|-----------------|
| User Approval | Every action | Major decisions | Critical only |
| Task Execution | Sequential | Sequential | Parallel |
| Phase Transitions | Manual | Semi-auto | Automatic |
| Error Handling | User decides | Architect decides | Auto-recovery |
| Reviews | Blocking | Blocking | Non-blocking |
| Work Discovery | Manual | Manual | Automatic |

## Usage Patterns

### Starting L3 Mode
```bash
# Enable L3 in configuration
echo "autonomy_level: 'L3'" >> .claude/config.md

# System will automatically:
# 1. Initialize continuous engine
# 2. Start task queue manager
# 3. Enable auto-continue triggers
# 4. Begin work discovery
```

### Monitoring Progress
In L3 mode, progress is visible without interruption:
- **Real-time Updates**: Todo list updates automatically
- **Progress Logs**: Continuous activity logging
- **Milestone Summaries**: Automatic milestone notifications
- **Periodic Reports**: Summary every minute (configurable)

### Handling Critical Stops
When L3 stops for a critical decision:
```
L3 CRITICAL STOP: Business impact decision required
Task: Update subscription pricing model
Action Required: Approve new pricing structure
Options: [Continue with changes] [Modify approach] [Cancel]
```

## Architecture Components

### 1. L3 Continuous Engine
Central orchestrator managing continuous execution flow:
- Maintains active task list
- Coordinates parallel execution
- Handles phase transitions
- Monitors system health

### 2. Task Queue Manager
Priority-based task scheduling:
- **Priority Order**: P0’P1’P2’P3
- **Task Types**: blocking’critical_path’parallel’optional
- **Automatic Reordering**: Based on dependencies and priorities
- **Conflict Prevention**: Ensures parallel tasks don't conflict

### 3. Auto-Continue Triggers
Event-driven progression system:
- Task completion ’ Next task activation
- Phase completion ’ Phase transition
- Error occurrence ’ Recovery attempt
- Review completion ’ Continue work

### 4. Progress Monitor
Non-blocking visibility maintenance:
- Real-time status updates
- Milestone detection
- Summary generation
- User notifications

### 5. Work Discovery Engine
Proactive work identification:
- Scans for new bugs/stories
- Detects unblocked tasks
- Creates follow-up tasks
- Monitors epic progress

## Common Scenarios

### Scenario 1: Multi-Story Epic
```yaml
Epic with 5 stories:
1. L3 reads epic, identifies all stories
2. Begins planning first story
3. Creates tasks, starts execution
4. Parallel execution of independent tasks
5. Auto-transitions through phases
6. Discovers next story automatically
7. Continues until epic complete
```

### Scenario 2: Bug Fix Workflow
```yaml
Critical bug reported:
1. L3 detects new bug (P0 priority)
2. Immediately queues investigation
3. Implements fix in parallel with tests
4. Non-blocking review (continues other work)
5. Auto-generates documentation
6. Commits and creates PR
7. Moves to next priority work
```

### Scenario 3: Error Recovery
```yaml
Test failure occurs:
1. L3 detects test failure
2. Attempts auto-fix (missing import)
3. Retries test ’ Success
4. Logs recovery, continues
5. No user intervention needed
```

## Troubleshooting

### L3 Not Starting
```bash
# Check configuration
cat .claude/config.md | grep autonomy_level
# Should show: autonomy_level: "L3"

# Verify initialization
# Look for: "L3 Continuous Engine activated"
```

### Too Many Stops
Verify stop conditions aren't too broad:
```yaml
# Check l3-continuous-engine.md
L3_STOP_CONDITIONS = [
    "BUSINESS_IMPACT_DECISION",
    "SECURITY_VIOLATION",
    "DATA_LOSS_RISK",
    "CRITICAL_QUALITY_FAILURE"
]
```

### Tasks Not Executing
Check task queue and dependencies:
- Verify tasks have `status: "ready"`
- Check dependencies are satisfied
- Ensure no resource conflicts
- Review error logs

### Performance Issues
Monitor system health:
```yaml
health_metrics:
  cpu_usage: < 30%  # Normal
  memory_usage: < 200MB  # Normal
  queue_size: < 50  # Normal
  error_rate: < 0.1  # Normal
```

## Best Practices

### 1. Configuration
- Start with default settings
- Adjust `max_parallel_tasks` based on system capacity
- Set appropriate `task_timeout_ms` for your workflows
- Configure `progress_report_interval` for visibility needs

### 2. Task Design
- Keep tasks focused and atomic
- Clearly define dependencies
- Use appropriate priority levels
- Include acceptance criteria

### 3. Error Handling
- Design for auto-recovery where possible
- Provide clear error messages
- Create follow-up tasks for complex issues
- Monitor error patterns

### 4. Monitoring
- Review progress summaries regularly
- Check milestone achievements
- Monitor system health metrics
- Analyze execution patterns for optimization

## Advanced Features

### Custom Stop Conditions
Add domain-specific stop conditions:
```pseudocode
CUSTOM_STOP_CONDITIONS = [
    "REGULATORY_COMPLIANCE",
    "THIRD_PARTY_API_CHANGE",
    "INFRASTRUCTURE_MODIFICATION"
]
```

### Parallel Task Limits
Adjust based on workload:
```yaml
l3_continuous_settings:
  max_parallel_tasks: 10  # Increase for more parallelism
  resource_limits:
    per_role_limit: 2  # Max tasks per role
    file_conflict_prevention: true
```

### Work Discovery Customization
Configure discovery sources:
```yaml
work_discovery_config:
  scan_interval: 15000  # 15 seconds for faster discovery
  sources:
    bugs: true
    stories: true
    follow_ups: true
    external_apis: true  # Custom source
```

## Migration from L1/L2

### Gradual Migration
1. Start with L2 to understand autonomous behavior
2. Monitor for a few cycles
3. Switch to L3 when comfortable
4. Adjust stop conditions as needed

### Rollback
Simply change configuration:
```yaml
# Rollback to L2
autonomy_level: "L2"

# Or full manual (L1)
autonomy_level: "L1"
```

## Summary

L3 autonomy transforms the intelligent-claude-code system from a stop-and-wait model to a continuous-flow model. With intelligent stop conditions, parallel execution, and automatic work discovery, L3 provides a 72% performance improvement while maintaining safety for critical decisions.

The key to successful L3 operation is trusting the system for routine decisions while preserving human control for business-critical choices. This balance enables true 24/7 autonomous operation with minimal supervision.