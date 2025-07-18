# Behavioral Quick Reference

**PURPOSE:** Concise behavioral patterns for efficient AI consumption (90% token reduction)

## Core Behavioral Patterns

### 1. Assignment-Driven Execution
```yaml
pattern: Read Assignment → Apply Config → Execute Phase → Update Progress
tokens_saved: 5,000+ per operation
key_functions: read_assignment(), execute_phase(), update_progress()
```

### 2. Role Management
```yaml
pattern: Detect Role → Validate Assignment → Activate Role → Execute Work
tokens_saved: 3,000+ per activation
key_functions: assign_role(), activateRole(), validateAssignment()
```

### 3. Validation Chains
```yaml
pattern: Detect Work Type → Require Triage → Validate → Approve → Execute
tokens_saved: 4,000+ per validation
commands: /icc-validate-work-type, /icc-require-triage, /icc-validate-assignments
```

### 4. Memory-First Operations
```yaml
pattern: Search Memory → Apply Learning → Execute → Capture Knowledge
tokens_saved: 2,000+ per operation
commands: /icc-memory-search, createLearningEntity(), storeInMemory()
```

### 5. Git Workflow
```yaml
pattern: Privacy Check → Branch Protection → Commit → Push → PR
tokens_saved: 1,500+ per operation
key_functions: enforceGitPrivacy(), validateBranchProtection()
```

## Essential Commands

### System Management
- `/icc-init-system` - Initialize behavioral system
- `/icc-load` - Force load behavioral patterns
- `/icc-system-status` - Check system health
- `@PM init/refresh/reset/status` - PM system commands

### Workflow Operations
- `/icc-create-story "title"` - Create new story
- `/icc-plan-story STORY-ID` - Plan story tasks
- `/icc-execute-task TASK-ID` - Execute specific task
- `/icc-validate-work-type` - Validate work assignment

### Memory Operations
- `/icc-memory-search "query"` - Search knowledge base
- `/icc-archive-completed` - Archive done items
- `/icc-capture-learning` - Store new knowledge

## Key Behavioral Modules

### Core System (Always Load)
1. `lean-workflow-executor.md` - Main execution engine
2. `config-loader.md` - Settings management
3. `role-activation-system.md` - Role switching

### On-Demand Modules
4. `git-privacy-enforcer.md` - Git operations
5. `learning-team-automation.md` - Learning capture
6. `l3-continuous-engine.md` - L3 autonomy only
7. `archival-intelligence.md` - Archive operations

## Quick Patterns

### Task Execution Flow
```bash
1. Read task assignment (cached)
2. Activate assigned role
3. Search relevant memory
4. Execute work
5. Update progress
6. Capture learnings
```

### Validation Quick Check
```bash
Work Type? → Required Architect? → Capability Match? → Approval? → Execute
```

### Priority Order
```bash
P0 (Critical) → P1 (High) → P2 (Medium) → P3 (Low)
blocking → critical_path → parallel → optional
```

## Token Optimization Tips

1. **Use Cache**: `SessionFileCache` for repeated reads
2. **Selective Parse**: Only requested fields from YAML
3. **Lazy Load**: Behaviors on-demand via registry
4. **Offset Reading**: Skip to relevant sections
5. **Summary First**: Read summaries before full content

## Common Integration Points

- **Settings**: `SettingsAPI.getSettings()`
- **Role Switch**: `RoleActivationController.activateRole()`
- **Memory**: `SearchMemory()` (file-based)
- **Validation**: `RoleAssignmentValidator.validateAssignment()`
- **Progress**: `TodoWrite` for task tracking

---
*Token-optimized quick reference - 500 tokens vs 50,000+ full system*