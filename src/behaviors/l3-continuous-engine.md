# L3 Continuous Engine

**MANDATORY:** MUST use continuous execution in L3. Auto-correct violations.

**Purpose:** Define L1/L2/L3 team autonomy levels and continuous execution patterns

## Autonomy Levels

### L1 Teams (Manual)
- **User approval required** for ALL actions
- **No autonomous decisions** - everything stops for confirmation
- **Manual workflow execution** - each step requires user permission
- **Use case:** High-control environments, learning phase

### L2 Teams (Architect Approval)
- **Architect approval** required for technical decisions only
- **Autonomous routine tasks** - standard work proceeds without approval
- **Technical decision detection** via keywords: architecture, design, system, framework, database, schema, API, technology, security, etc.
- **Use case:** Standard development with architectural oversight

### L3 Teams (Fully Autonomous)  
- **No approval required** - continuous execution without interruption
- **Auto-correction** of process violations and common errors
- **Smart stop conditions** only for critical issues:
  - BUSINESS_CRITICAL_DECISION - Major business logic changes
  - SECURITY_VIOLATION - Credential exposure, auth bypass  
  - DATA_LOSS_RISK - Destructive operations
- **Continuous work discovery** and parallel execution
- **Use case:** Mature teams with established processes

## L3 Continuous Execution

### Core Loop
1. **Find Ready Work** - Check tasks with status PLANNED
2. **Execute in Parallel** - Up to 5 non-conflicting tasks
3. **Auto-Recover Errors** - Apply known patterns for common issues
4. **Continue Without Stops** - Only halt for critical conditions
5. **Discover New Work** - Scan for additional ready tasks

### Auto-Recovery Patterns
- **Test failures** → Apply fix patterns and retry
- **Lint errors** → Auto-format and continue
- **Import errors** → Add missing dependencies
- **Type errors** → Fix type definitions
- **Process violations** → Auto-correct and proceed

### Work Discovery
- **Active Tasks** - Find PLANNED tasks in current epic/story
- **Dependencies** - Check for unblocked prerequisite work
- **Follow-up Tasks** - Create tasks for issues found during work
- **Priority Queue** - Always process P0 → P1 → P2 → P3 order

## Configuration Integration

L3 behavior controlled by settings:
- `autonomy_level: "L3"` - Enables L3 mode
- `blocking_enabled: false` - Prevents stops for non-critical issues
- `pm_always_active: true` - Auto-activates PM for coordination

## Stop Conditions (L3 Only)

**CRITICAL STOPS:**
- Major business logic changes affecting user experience
- Security credential exposure or authentication bypass
- Destructive operations without proper backups

**NON-STOPS (Auto-handle):**
- Code quality issues → Auto-fix
- Test failures → Apply patterns  
- Configuration problems → Auto-correct
- Process violations → Self-heal

---
*L3 continuous engine - defines team autonomy levels and autonomous execution patterns*