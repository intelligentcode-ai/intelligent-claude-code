# Behavioral Module Index

## Module Categories

### 🚀 Core Execution (Always Needed)
| Module | Purpose | Tokens | Load When |
|--------|---------|--------|-----------|
| `lean-workflow-executor.md` | Main workflow engine | ~8,000 | Always |
| `config-loader.md` | Settings management | ~2,000 | Always |
| `role-activation-system.md` | Role switching | ~3,000 | Role changes |

### 🔒 Validation & Security
| Module | Purpose | Tokens | Load When |
|--------|---------|--------|-----------|
| `role-assignment-validator.md` | Assignment validation | ~4,000 | Planning tasks |
| `git-privacy-enforcer.md` | Git privacy | ~2,500 | Git operations |
| `autonomy-controller.md` | L1/L2/L3 control | ~3,000 | Mode changes |

### 🧠 Learning & Memory
| Module | Purpose | Tokens | Load When |
|--------|---------|--------|-----------|
| `learning-team-automation.md` | Learning capture | ~3,500 | Errors/completion |
| `archival-intelligence.md` | Archive system | ~4,500 | Archive operations |

### 🔧 Specialized Systems
| Module | Purpose | Tokens | Load When |
|--------|---------|--------|-----------|
| `l3-continuous-engine.md` | L3 autonomy | ~4,000 | L3 mode only |
| `task-queue-manager.md` | Task prioritization | ~3,000 | L3 mode only |
| `progress-monitor.md` | Progress tracking | ~2,500 | L3 mode only |
| `work-discovery-engine.md` | Work finding | ~3,000 | L3 mode only |

### 🛠️ Utilities
| Module | Purpose | Tokens | Load When |
|--------|---------|--------|-----------|
| `role-detection-engine.md` | @-notation parsing | ~2,000 | Role mentions |
| `pm-command-system.md` | PM commands | ~2,500 | @PM commands |
| `auto-continue-triggers.md` | Task flow | ~2,000 | Task completion |

### 📊 Optimization Modules
| Module | Purpose | Tokens | Load When |
|--------|---------|--------|-----------|
| `selective-yaml-parser.md` | YAML optimization | ~1,500 | YAML parsing |
| `smart-content-chunker.md` | Content chunking | ~1,000 | Large files |
| `session-file-cache.md` | File caching | ~1,200 | Repeated reads |
| `lazy-loading-integration.md` | On-demand loading | ~1,000 | Initial setup |
| `behavioral-module-registry.md` | Module management | ~1,500 | Module loading |

## Loading Strategies

### Minimal Core (~13,000 tokens)
```yaml
always_load:
  - lean-workflow-executor.md
  - config-loader.md
  - role-activation-system.md
  - behavioral-module-registry.md
```

### Standard Workflow (~25,000 tokens)
```yaml
add_for_development:
  - role-assignment-validator.md
  - git-privacy-enforcer.md
  - learning-team-automation.md
  - role-detection-engine.md
```

### L3 Autonomous (~40,000 tokens)
```yaml
add_for_l3:
  - l3-continuous-engine.md
  - task-queue-manager.md
  - progress-monitor.md
  - work-discovery-engine.md
  - auto-continue-triggers.md
```

### Full System (~55,000 tokens)
```yaml
all_modules_loaded
```

## Quick Module Lookup

### By Functionality
- **Planning**: role-assignment-validator, role-detection-engine
- **Execution**: lean-workflow-executor, role-activation-system
- **Git Ops**: git-privacy-enforcer
- **Learning**: learning-team-automation
- **Archival**: archival-intelligence
- **L3 Mode**: l3-continuous-engine, task-queue-manager
- **Commands**: pm-command-system

### By Trigger
- **@PM command**: pm-command-system
- **@Role mention**: role-detection-engine, role-activation-system
- **/icc- command**: lean-workflow-executor
- **Error occurs**: learning-team-automation
- **Task complete**: auto-continue-triggers, progress-monitor
- **Git operation**: git-privacy-enforcer
- **Archive needed**: archival-intelligence

## Selective Reading Patterns

### For Quick Status
```bash
Read: quick-reference.md (500 tokens)
Skip: All implementation details
```

### For Task Execution
```bash
Read: lean-workflow-executor.md:0-100 (summary)
Read: role-activation-system.md:0-50 (role info)
Skip: L3 modules, archival, detailed implementations
```

### For Planning
```bash
Read: role-assignment-validator.md:0-150 (validation rules)
Read: role-detection-engine.md:0-100 (patterns)
Skip: Execution details, L3 modules
```

---
*Efficient module navigation - Load only what you need*