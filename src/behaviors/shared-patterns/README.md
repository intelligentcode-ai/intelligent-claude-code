# Shared Patterns

**Purpose:** Reusable patterns used by multiple behaviors

## Active Patterns

### behavioral-decision-matrix.md
**Used by:** prb-enforcement, prb-auto-trigger, role-management
**Purpose:** Context-based behavioral decision system for consistent pattern following
**Key:** @Role direct → Work→PRB → Simple info direct → Complex→PRB precedence

### learning-patterns.md
**Used by:** learning-team-automation, prb-creation-mandates, role-management
**Purpose:** PRB learning capture, pattern detection, memory-first approach
**Key:** PRB execution generates learnings, patterns applied in future PRBs

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
*Shared behavioral patterns for intelligent-claude-code system*