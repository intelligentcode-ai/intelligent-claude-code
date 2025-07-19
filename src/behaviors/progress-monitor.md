# Progress Monitor

**Purpose:** Continuous progress visibility without stopping execution in L3 mode

## Core Monitoring

**Tracking Loop:** Update active work every second → Check milestones → Generate reports periodically  
**State Management:** Track active tasks → Completed items → Performance metrics → Report timing  
**Continuous Operation:** Never blocks execution → Always monitoring → Real-time updates

## Non-Blocking Handlers

### L3 Action Replacements
- **User confirmation** → Log and continue
- **Task completion confirm** → Mark complete automatically
- **Review approval** → Automated review process
- **Task pause** → Continue to next immediately
- **Error confirmation** → Handle automatically

### Handler Logic
**L3 Mode Check:** IF L3: Replace blocking actions → ELSE: Normal behavior  
**Auto-Continue:** Log action → Update progress → Return continue signal  
**Completion Flow:** Mark complete → Record timestamp → Trigger next event

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

**Automated Reviews:** L3 performs peer review → Check for issues → Create follow-up tasks if needed  
**Non-Blocking:** Reviews don't stop progress → Issues become new tasks → Continue with next work  
**Issue Tracking:** Log review findings → Create fix tasks → Track in separate queue

## Error Recovery

**Auto-Recovery:** Check if recoverable → Attempt fix → Continue if successful  
**Fix Task Creation:** IF not recoverable → Create fix task → Log warning → Continue anyway  
**Recovery Types:**
- Test failures → Re-run
- Format issues → Auto-fix
- Import errors → Resolve

## Progress Reporting

**Report Contents:**
- Tasks completed since last report
- Current tasks in progress
- Queued task count
- Recent milestones achieved

**Report Timing:** Generate every 5 minutes → Or on milestone completion → Never interrupt work

## Benefits

- **No Unnecessary Stops**: Removes non-critical stopping points
- **Continuous Visibility**: Real-time progress without interruption
- **Smart Decisions**: Only stops for truly critical issues
- **Auto-Recovery**: Handles common issues automatically