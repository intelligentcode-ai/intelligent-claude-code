# Infrastructure Protection System

## Overview

The Infrastructure Protection hook blocks imperative infrastructure changes and steers work toward Infrastructure-as-Code (IaC). It runs on Bash tool usage and inspects commands for destructive or state-changing operations.

## Goals

- Prevent ad-hoc infrastructure changes that bypass version control.
- Encourage Terraform/Ansible/Helm (or equivalent) workflows.
- Allow safe read-only inspection where configured.

## How It Works

- **Imperative destructive** commands are blocked when IaC enforcement is enabled.
- **Write operations** are blocked when protection is enabled.
- **Read operations** are allowed only when `read_operations_allowed` is true.
- **Whitelist** entries override write/read blocks (but not destructive IaC enforcement).
- **Emergency override** can bypass blocking when enabled and a valid token is supplied.

## Configuration

All settings live under `enforcement.infrastructure_protection` in `icc.config.json`:

```json
{
  "enforcement": {
    "blocking_enabled": true,
    "infrastructure_protection": {
      "enabled": true,
      "enforce_iac_only": true,
      "read_operations_allowed": true,
      "whitelist": [],
      "imperative_destructive": [
        "kubectl delete",
        "govc vm.destroy",
        "Remove-VM"
      ],
      "write_operations": [
        "kubectl apply",
        "Start-VM"
      ],
      "read_operations": [
        "kubectl get",
        "Get-VM"
      ],
      "emergency_override_enabled": false,
      "emergency_override_token": ""
    }
  }
}
```

## Emergency Override

If enabled, prefix the command with:

```
EMERGENCY_OVERRIDE:<token>
```

Example:

```
EMERGENCY_OVERRIDE:abc123 kubectl delete pod xyz
```

## Logging

Hook logs are written under `~/.claude/logs/` with the hook name in the filename.

