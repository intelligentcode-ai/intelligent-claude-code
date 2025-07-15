# Workflow Enforcement Guide

**CORE:** Assignment files enforce behavior through structure, not complex prompts

## Overview

The enhanced planning system embeds ALL configuration into assignment files during the PLAN phase. During execution, the workflow structure itself drives behavior - no need for complex behavioral interpretation.

## Key Principle: Workflow as Enforcement

Instead of relying on AI behavioral understanding, the assignment file structure provides explicit instructions that enforce compliance.

## Enforcement Examples

### 1. Config Loading During PLAN Phase

```bash
# PLAN phase MUST read config.md first
config_path=$(find . -name "config.md" | grep -E "(\.claude/|src/)" | head -1)
if [ -f "$config_path" ]; then
    echo "Loading: $config_path"
    # Process ALL settings into assignment
else
    echo "WARNING: No config.md found, using defaults"
fi
```

### 2. Review Findings Respect blocking_enabled

```yaml
# In assignment file - workflow drives behavior
workflow:
  review_findings:
    if_blocking_false:
      action: "CREATE_FOLLOWUP_TASK"
      template: "TASK-XXX-fix-[finding]"
    if_blocking_true:
      action: "BLOCK_AND_RETURN"
      
# Execution logic is simple:
if review_has_findings:
    if embedded_config.blocking_enabled == false:
        action = workflow.review_findings.if_blocking_false.action
        # Creates follow-up task
    else:
        action = workflow.review_findings.if_blocking_true.action
        # Blocks execution
```

### 3. Git Privacy Enforcement

```yaml
# Assignment file provides sanitization
workflow:
  git_operations:
    if_privacy_true:
      sanitization_command: "sed -E 's/(Claude|AI|anthropic)//gi'"
      
# During commit:
if embedded_config.git_privacy == true:
    commit_msg = $(echo "$original_msg" | eval $workflow.git_operations.if_privacy_true.sanitization_command)
```

### 4. Timestamp Generation

```yaml
# No hardcoded dates needed
workflow:
  timestamps:
    command: "date '+%Y-%m-%d %H:%M:%S'"
    
# Usage:
timestamp=$(eval $workflow.timestamps.command)
```

## Implementation Pattern

### During PLAN Phase
1. Read config.md (MANDATORY FIRST)
2. Process ALL settings
3. Embed into assignment file
4. Create workflow instructions based on settings

### During EXECUTE Phase
1. Read embedded_config (NOT config.md)
2. Follow workflow instructions
3. No behavioral interpretation needed
4. Structure enforces compliance

## Benefits

1. **Deterministic**: Same config always produces same behavior
2. **Transparent**: Can see exactly what will happen
3. **Enforceable**: Structure drives behavior, not prompts
4. **Debuggable**: Clear workflow paths
5. **Tool-Ready**: Could be executed by simple scripts

## Migration Strategy

1. Existing behavioral system remains for non-task work
2. Tasks use assignment files with embedded config
3. Workflow structure replaces behavioral prompts
4. Gradual rollout preserves stability

## Key Files

- `src/planning/enhanced-planning-mode.md` - Planning workflow
- `src/planning/config-processor.md` - Config embedding logic
- `tasks/templates/assignment-template.yaml` - Assignment structure
- `src/config.md` - Source configuration

## Summary

The workflow enforcement pattern makes the enhanced planning system self-enforcing through structure rather than relying on complex behavioral understanding. Configuration drives workflow, workflow drives behavior.