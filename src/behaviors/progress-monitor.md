# Progress Monitor

**Purpose:** Continuous progress visibility without stopping execution in L3 mode  
**Type:** L3 Autonomous Component  
**Status:** ACTIVE

## Imports

@./shared-patterns/autonomy-patterns.md
@./shared-patterns/monitoring-patterns.md

## Core Monitoring

### Progress Tracking (Using Shared Patterns)
- Apply Non-Blocking Monitoring from autonomy-patterns.md
- Use Real-Time Updates from monitoring-patterns.md
- Follow Continuous Operation patterns without execution blocks
- Implement Smart Stop Conditions for critical issues only

### Progress Commands
- Use `/icc-monitor-progress [interval]` to update active work and check milestones
- Use `/icc-monitor-state` to track tasks, metrics, and timing
- Use `/icc-monitor-continuous` for non-blocking real-time updates
- Use `/icc-get-setting "autonomy_level"` to check L3 mode dynamically

## L3 Behaviors

### Action Replacements (Using Shared Patterns)
- Apply L3 Action Replacements from autonomy-patterns.md:
  - User confirmation → Log and continue
  - Task completion → Mark complete automatically  
  - Review approval → Automated review process
  - Error confirmation → Handle automatically

### Handler Commands
- Use `/icc-auto-continue [action]` to log action, update progress, return continue signal
- Use `/icc-complete-task [task_id]` to mark complete, record timestamp, trigger next
- Use `/icc-automated-review [review_data]` for L3 peer review and follow-up creation

## Critical Stop Logic

### Stop Conditions (Using Shared Patterns)
- Business Critical: Pricing, customer data, API breaking changes
- Security Violations: Credential exposure, auth bypass, privilege escalation
- Data Loss Risk: Destructive operations, no backups, irreversible changes
- System Failure: Core service down, critical dependencies failed

### Recovery Commands
- Use `/icc-auto-recover [error_data]` to check recoverability and attempt fixes
- Use `/icc-create-fix-task [error_data]` for non-recoverable issues
- Use `/icc-track-review-issues [findings]` to log and create fix tasks

## Reporting

### Report Generation (Using Shared Patterns)
- Use `/icc-generate-progress-report` for tasks, progress, queue count, milestones
- Use `/icc-schedule-reports [interval]` for 5-minute cycles without work interruption

## Benefits

✅ **Non-Blocking Visibility** - Progress tracking without execution interruption
✅ **Smart Stop Logic** - Only critical issues halt execution  
✅ **Auto-Recovery** - Common issues handled automatically
✅ **Continuous Monitoring** - Real-time updates every cycle

---
*Progress monitor for intelligent-claude-code system*