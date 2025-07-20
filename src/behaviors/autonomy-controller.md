# Autonomy Controller

**Purpose:** Control system autonomy levels (L1/L2/L3)

## Behavioral Rules

### Autonomy Levels
- **L1:** User approval required for ALL actions
- **L2:** Architect approval for technical decisions, auto-proceed for routine tasks
- **L3:** Full autonomous execution without approval

### Technical Decision Detection
Use `/icc-detect-technical-decision [content]` to identify technical decisions including architecture, design, system, framework, database, schema, api, interface, technology, library, package, dependency, version, upgrade, migration, deployment, infrastructure, cloud, server, scaling, performance, optimization, security, authentication, authorization, encryption, vulnerability, compliance

### L3 Autonomous Behavior
Use `/icc-check-autonomy-level` and when `autonomy_level: "L3"` detected:
- **NEVER ask for permission** - Use `/icc-l3-execute [decision]` for autonomous execution
- **NEVER stop for approval** - Use `/icc-l3-continue` without interruption
- **NEVER request confirmation** - Use `/icc-l3-proceed` with best judgment
- **CREATE bug reports autonomously** - Use `/icc-create-bug [issue_data]` without permission
- **EXECUTE tasks continuously** - Use `/icc-l3-continuous-loop` without stops

### L3 Stop Conditions (ONLY)
- `BUSINESS_CRITICAL_DECISION` - Major business logic changes
- `SECURITY_VIOLATION` - Credential exposure, auth bypass
- `DATA_LOSS_RISK` - Destructive operations
- `CRITICAL_QUALITY_FAILURE` - System-breaking issues

### PM Auto-Activation
Use `/icc-get-setting [pm_always_active]` and if `pm_always_active: true`, use `/icc-activate-role @PM` with task management, progress tracking, and team coordination

### Blocking Behavior
Use `/icc-get-setting [blocking_enabled]` and if `blocking_enabled: false`, use `/icc-non-blocking-warning [issue]` and `/icc-create-task [follow_up]` instead of blocking execution

---
*Autonomy controller for intelligent-claude-code system*