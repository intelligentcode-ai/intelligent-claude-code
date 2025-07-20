# Behavioral Module Index

## Core Modules

| Category | Module | Purpose | Tokens |
|----------|--------|---------|--------|
| **Core** | lean-workflow-executor.md | Main workflow | ~8k |
| **Core** | config-loader.md | Settings | ~2k |
| **Core** | role-activation-system.md | Role switching | ~3k |
| **Validation** | role-assignment-validator.md | Assignment validation | ~4k |
| **Validation** | git-privacy-enforcer.md | Git privacy | ~2.5k |
| **Learning** | learning-team-automation.md | Learning capture | ~3.5k |
| **L3** | l3-continuous-engine.md | L3 autonomy | ~4k |
| **L3** | task-queue-manager.md | Task priority | ~3k |
| **Utils** | role-detection-engine.md | @-notation | ~2k |
| **Utils** | pm-command-system.md | PM commands | ~2.5k |

## Loading Strategies

**Minimal (~13k):** lean-workflow-executor + config-loader + role-activation-system  
**Standard (~25k):** Add role-assignment-validator + git-privacy-enforcer + learning-team-automation  
**L3 (~40k):** Add l3-continuous-engine + task-queue-manager + progress-monitor  
**Full (~55k):** All modules loaded

## Trigger Lookup

**@PM** → pm-command-system  
**@Role** → role-detection-engine + role-activation-system  
**/icc-** → lean-workflow-executor  
**Error** → learning-team-automation  
**Git** → git-privacy-enforcer  
**L3** → l3-continuous-engine + task-queue-manager

---
*Efficient module navigation*