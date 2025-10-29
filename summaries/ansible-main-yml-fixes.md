# Ansible main.yml Fixes - Remove post-agent-file-validation.js

## File
`ansible/roles/intelligent-claude-code/tasks/main.yml`

## Fix 1: Remove from executable list (Line ~186)

**Current**:
```yaml
  loop:
    - agent-infrastructure-protection.js
    - agent-marker.js
    - config-protection.js
    - context-injection.js
    - git-enforcement.js
    - main-scope-enforcement.js
    - pm-constraints-enforcement.js
    - post-agent-file-validation.js    # <-- REMOVE THIS LINE
    - pre-agenttask-validation.js
    - project-scope-enforcement.js
    - stop.js
    - subagent-stop.js
    - summary-file-enforcement.js
    - task-tool-execution-reminder.js
    - user-prompt-submit.js
  ignore_errors: yes
```

**Fixed**:
```yaml
  loop:
    - agent-infrastructure-protection.js
    - agent-marker.js
    - config-protection.js
    - context-injection.js
    - git-enforcement.js
    - main-scope-enforcement.js
    - pm-constraints-enforcement.js
    - pre-agenttask-validation.js
    - project-scope-enforcement.js
    - stop.js
    - subagent-stop.js
    - summary-file-enforcement.js
    - task-tool-execution-reminder.js
    - user-prompt-submit.js
  ignore_errors: yes
```

## Fix 2: Remove from SubagentStop hooks (Line ~277)

**Current**:
```yaml
          SubagentStop:
            - hooks:
                - { type: 'command', command: 'node {{ claude_install_path }}/hooks/subagent-stop.js', timeout: 5000 }
                - { type: 'command', command: 'node {{ claude_install_path }}/hooks/post-agent-file-validation.js', timeout: 5000 }  # <-- REMOVE THIS LINE
```

**Fixed**:
```yaml
          SubagentStop:
            - hooks:
                - { type: 'command', command: 'node {{ claude_install_path }}/hooks/subagent-stop.js', timeout: 5000 }
```

## Manual Fix Command

```bash
cd /Users/karsten/Nextcloud_Altlandsberg/Work/Development/intelligentcode-ai/intelligent-claude-code

# Fix 1: Remove from executable list
sed -i '' '/^    - post-agent-file-validation\.js$/d' ansible/roles/intelligent-claude-code/tasks/main.yml

# Fix 2: Remove hook registration line
sed -i '' '/post-agent-file-validation\.js/d' ansible/roles/intelligent-claude-code/tasks/main.yml

# Verify changes
grep -n "post-agent-file-validation" ansible/roles/intelligent-claude-code/tasks/main.yml || echo "✅ All references removed"
```
