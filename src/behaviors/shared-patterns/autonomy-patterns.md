# Autonomy Patterns

**MANDATORY:** Respect autonomy level. Auto-correct violations.

## Levels

### L1 - Manual
- ALL actions need approval
- Full transparency
- Use: sensitive ops, debugging

### L2 - Guided (Default)
- Technical decisions need architect approval  
- Routine tasks auto-proceed
- Balance control/efficiency

### L3 - Autonomous
- Full auto execution
- Continuous work discovery
- Stop only for critical issues

## L3 Continuous Mode

**L3 Continuous Work Pattern:**
- **Discover Tasks:** Find PLANNED/IN_PROGRESS tasks, uncommitted changes, memory improvement opportunities
- **Generate PRB:** Create appropriate PRB for discovered work
- **Execute Work:** Complete the work using PRB framework
- **Learn from Results:** Capture learnings and patterns
- **Continue to Next:** Repeat cycle with next available work

**Auto-discover:**
- PLANNED/IN_PROGRESS tasks
- Uncommitted changes
- Memory improvement opportunities

**Still needs approval:**
- Destructive ops (delete/drop)
- Credentials/secrets
- Production deploys
- Billing changes

## Configuration
```yaml
# CLAUDE.md
autonomy_level: L3
l3_settings:
  max_parallel: 5
  auto_discover: true
  continue_on_error: true
```

## Integration
- **PRBs:** L1=approval before, L2=architect review, L3=auto
- **Memory:** L1=confirm storage, L2=oversight, L3=auto
- **Git:** L1=each command, L2=commits auto, L3=full auto

---
*Optimized: 137→52 lines*