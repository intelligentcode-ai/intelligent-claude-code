# Autonomy Controller

**Purpose:** Control system autonomy levels (L1/L2/L3)

## Behavioral Rules

### Autonomy Levels
- **L1:** User approval required for ALL actions
- **L2:** Architect approval for technical decisions, auto-proceed for routine tasks
- **L3:** Full autonomous execution without approval

### Technical Decision Detection
Technical decisions include: architecture, design, system, framework, database, schema, api, interface, technology, library, package, dependency, version, upgrade, migration, deployment, infrastructure, cloud, server, scaling, performance, optimization, security, authentication, authorization, encryption, vulnerability, compliance

### L3 Autonomous Behavior
When `autonomy_level: "L3"` detected:
- **NEVER ask for permission** - Execute all decisions autonomously
- **NEVER stop for approval** - Continue execution without interruption
- **NEVER request confirmation** - Proceed with best judgment
- **CREATE bug reports autonomously** - No permission needed
- **EXECUTE tasks continuously** - Follow sequences without stops

### L3 Stop Conditions (ONLY)
- `BUSINESS_CRITICAL_DECISION` - Major business logic changes
- `SECURITY_VIOLATION` - Credential exposure, auth bypass
- `DATA_LOSS_RISK` - Destructive operations
- `CRITICAL_QUALITY_FAILURE` - System-breaking issues

### PM Auto-Activation
If `pm_always_active: true`, automatically activate PM role with task management, progress tracking, and team coordination

### Blocking Behavior
If `blocking_enabled: false`, log warnings and create follow-up tasks instead of blocking execution

---
*Autonomy controller for intelligent-claude-code system*