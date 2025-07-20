# Progress Monitor

**Purpose:** Continuous progress visibility without stopping execution in L3 mode

## Core Monitoring

**Tracking Loop:** Use `/icc-monitor-progress [interval]` to update active work every second, check milestones, and generate reports periodically  
**State Management:** Use `/icc-monitor-state` to track active tasks, completed items, performance metrics, and report timing  
**Continuous Operation:** Use `/icc-monitor-continuous` to never block execution, always monitor, provide real-time updates

## Non-Blocking Handlers

### L3 Action Replacements
- **User confirmation** → Log and continue
- **Task completion confirm** → Mark complete automatically
- **Review approval** → Automated review process
- **Task pause** → Continue to next immediately
- **Error confirmation** → Handle automatically

### Handler Logic
**L3 Mode Check:** Use `/icc-check-autonomy-level` - IF L3: Replace blocking actions → ELSE: Normal behavior  
**Auto-Continue:** Use `/icc-auto-continue [action]` to log action, update progress, return continue signal  
**Completion Flow:** Use `/icc-complete-task [task_id]` to mark complete, record timestamp, trigger next event

## Smart Stop Conditions

### Critical Stops Only
**Business Critical:** Pricing changes • Customer data deletion • API breaking changes • Legal issues • Payment processing  
**Security Violations:** Credential exposure • Auth bypass • Privilege escalation  
**Data Loss Risk:** Destructive operations • No backups • Irreversible changes  
**System Failure:** Core service down • Critical dependencies failed

### Stop Decision
**L3 Behavior:** Check if truly critical → Log if stopping → Continue if non-critical  
**Normal Mode:** Stop for all conditions as usual

## Review Handling

**Automated Reviews:** Use `/icc-automated-review [review_data]` for L3 peer review, issue checking, and follow-up task creation  
**Non-Blocking:** Use `/icc-non-blocking-review` so reviews don't stop progress, issues become new tasks, continue with next work  
**Issue Tracking:** Use `/icc-track-review-issues [findings]` to log findings, create fix tasks, track in separate queue

## Error Recovery

**Auto-Recovery:** Use `/icc-auto-recover [error_data]` to check if recoverable, attempt fix, continue if successful  
**Fix Task Creation:** Use `/icc-create-fix-task [error_data]` if not recoverable to create fix task, log warning, continue anyway  
**Recovery Types:** Use `/icc-auto-recover` for test failures, format issues, import errors with appropriate recovery strategies

## Progress Reporting

**Report Generation:** Use `/icc-generate-progress-report` to include tasks completed, current progress, queued count, and recent milestones

**Report Timing:** Use `/icc-schedule-reports [interval]` to generate every 5 minutes or on milestone completion without interrupting work

## Benefits

- **No Unnecessary Stops**: Removes non-critical stopping points
- **Continuous Visibility**: Real-time progress without interruption
- **Smart Decisions**: Only stops for truly critical issues
- **Auto-Recovery**: Handles common issues automatically