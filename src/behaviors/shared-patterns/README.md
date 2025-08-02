# Shared Patterns

**Purpose:** Reusable patterns used by multiple behaviors

## Active Patterns

### learning-patterns.md
**Used by:** learning-team-automation, prb-creation-mandates, role-management
**Purpose:** Error forgiveness, learning detection, memory-first approach
**Key:** First error = learning, second = penalty, +0.5 bonus for applying learnings

### memory-operations.md  
**Used by:** learning-team-automation, memory commands (store/search/load)
**Purpose:** Topic-based memory storage, pruning, PRB embedding
**Key:** memory/[topic]/, newest first, auto-prune at 5KB

### autonomy-patterns.md
**Used by:** config-loader, role-management, prb behaviors
**Purpose:** L1/L2/L3 autonomy levels and enforcement
**Key:** L1=manual, L2=guided, L3=autonomous

## Pattern Usage
```markdown
@./shared-patterns/[pattern].md
```

Patterns provide consistency across behaviors while avoiding duplication.

---
*Optimized: 109→25 lines*