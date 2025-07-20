# Autonomy Controller

**MANDATORY:** MUST use autonomy levels. Auto-correct violations.

**Purpose:** Control system autonomy levels (L1/L2/L3)

## Behavioral Rules

### Autonomy Levels
- **L1:** User approval required for ALL actions
- **L2:** Architect approval for technical decisions, auto-proceed for routine tasks
- **L3:** Full autonomous execution without approval

### Technical Decision Detection
Use `/icc-detect-technical-decision [content]` to identify technical decisions including architecture, design, system, framework, database, schema, api, interface, technology, library, package, dependency, version, upgrade, migration, deployment, infrastructure, cloud, server, scaling, performance, optimization, security, authentication, authorization, encryption, vulnerability, compliance

### L3 Autonomous Behavior
Use `/icc-get-setting "autonomy_level"` to dynamically check current setting, when result is "L3":
- **NEVER ask for permission** - Use `/icc-l3-execute [decision]` for autonomous execution
- **NEVER stop for approval** - Use `/icc-l3-continue` without interruption
- **NEVER request confirmation** - Use `/icc-l3-proceed` with best judgment
- **CREATE bug reports autonomously** - Use `/icc-create-bug [issue_data]` without permission
- **EXECUTE tasks continuously** - Use `/icc-l3-continuous-loop` without stops

**BEHAVIORAL RULE:** Always use `/icc-get-setting "autonomy_level"` instead of hardcoded checks. Support dynamic configuration changes during execution.

### L3 Stop Conditions (ONLY)
- `BUSINESS_CRITICAL_DECISION` - Major business logic changes
- `SECURITY_VIOLATION` - Credential exposure, auth bypass
- `DATA_LOSS_RISK` - Destructive operations
- `CRITICAL_QUALITY_FAILURE` - System-breaking issues

### PM Auto-Activation
Use `/icc-get-setting "pm_always_active"` to dynamically check setting, if result is true, use `/icc-activate-role @PM` with task management, progress tracking, and team coordination

### Blocking Behavior
Use `/icc-get-setting "blocking_enabled"` to dynamically check setting, if result is false, use `/icc-non-blocking-warning [issue]` and `/icc-create-task [follow_up]` instead of blocking execution

**BEHAVIORAL RULE:** All configuration checks must use dynamic loading through `/icc-get-setting` commands. Never assume configuration values.

---
*Autonomy controller for intelligent-claude-code system*