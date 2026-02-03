---
name: icc-init-system
description: Initialize or restore ICC virtual team system. Use after context loss, fresh session, when @Role patterns stop working, or when system needs re-initialization. Also use when user explicitly asks to initialize or reset the system.
---

# ICC Init System

Initialize the intelligent-claude-code virtual team system with configuration loading and role activation.

## When to Use

- Fresh session startup
- After context loss or memory compaction
- When @Role patterns stop working
- User explicitly requests initialization
- System appears unresponsive to ICC commands

## Usage

```
/icc-init-system [autonomy_level] [pm_active]
```

**Arguments:**
- `autonomy_level` - Optional: L1, L2, L3 (default: from config, fallback to L2)
- `pm_active` - Optional: true/false for PM always active (default: from config)

## Initialization Process

### Phase 1: Context Recovery & Bootstrap

1. **Detect project root** and validate absolute path
2. **Resolve config paths** (project → user → system defaults)
3. **Validate file system** - check critical directories exist
4. **Assess context state** - fresh start vs recovery mode

### Phase 2: Component Loading

5. **Load configuration** from hierarchy
6. **Read autonomy level** from config
7. **Initialize memory system** for search capabilities
8. **Load role definitions** - 14 core roles + dynamic specialists
9. **Activate AgentTask system** with template validation
10. **Initialize workflow settings** if missing

### Phase 3: Integration & Validation

11. **Setup learning system** for pattern capture
12. **Configure tools** with fallbacks
13. **Apply autonomy level** (L1/L2/L3)
14. **Auto-activate PM** if pm_always_active=true
15. **Run system validation** with detailed reporting

## Output Format

```
RELOADING SYSTEM
Loading skills and behavioral patterns...
  [x] Skills loaded
  [x] AgentTask templates validated
  [x] Memory system initialized
  [x] Roles activated

PROJECT CONTEXT
System Nature: [CODE/AI-AGENTIC/HYBRID]
Project Type: [detected type]
Autonomy Level: [L1/L2/L3]

System ready for @Role requests
```

## Error Handling

- **INVALID_AUTONOMY**: "Error: Autonomy level must be L1, L2, or L3"
- **CONFIG_ERROR**: "Warning: Config issue, using defaults"
