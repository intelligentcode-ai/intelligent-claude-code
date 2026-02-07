---
name: infrastructure-protection
description: Activate when performing infrastructure, VM, container, or cloud operations. Ensures safety protocols are followed and blocks destructive operations by default. Mirrors agent-infrastructure-protection hook.
---

# Infrastructure Protection Skill

Apply safety rules for infrastructure and system operations.

## Why This Matters

Infrastructure operations are **enforced by hooks** - destructive operations will be blocked. This skill ensures you understand the rules so your operations aren't rejected.

## Protection Levels

### Read Operations (Always Allowed)
```bash
# Information gathering - safe
govc vm.info
kubectl get pods
docker ps
virsh list
terraform plan
ansible --check
```

### Write Operations (Require Caution)
```bash
# State-changing operations - proceed carefully
govc vm.power -on
kubectl apply
docker run
virsh start
terraform apply
```

### Destructive Operations (Blocked by Default)
```bash
# Dangerous operations - blocked unless explicit
govc vm.destroy
kubectl delete
docker rm -f
virsh undefine
terraform destroy
```

## Protected Platforms

### Virtualization
- VMware (govc, esxcli)
- Hyper-V (PowerShell VM cmdlets)
- KVM/libvirt (virsh)
- VirtualBox (vboxmanage)
- Proxmox (qm, pct)

### Containers
- Docker (docker, docker-compose)
- Kubernetes (kubectl, helm)
- Multipass

### Cloud
- AWS (aws cli)
- Azure (az cli)
- GCP (gcloud)

### Configuration Management
- Terraform
- Ansible
- Packer
- Vagrant

## Blocked Operations List

```bash
# VM/Container destruction
govc vm.destroy
virsh destroy
virsh undefine
docker rm -f
kubectl delete pod --force

# Disk operations
dd if=/dev/zero of=/dev/sda
mkfs
fdisk /dev/sda

# System cleanup
rm -rf /
```

## Safe Operation Patterns

### Before Destructive Operations
1. **Confirm intent**: User explicitly requested destruction
2. **Verify target**: Double-check resource name/ID
3. **Check dependencies**: What depends on this resource?
4. **Backup if needed**: Take snapshot/backup first

### Prefer IaC Over Imperative
```bash
# Preferred: Declarative/IaC
terraform apply
ansible-playbook deploy.yml
kubectl apply -f manifest.yaml

# Avoid: Imperative one-offs
govc vm.create ...
kubectl run ...
docker run ... (for persistent services)
```

## Hook Enforcement

The `agent-infrastructure-protection.js` hook will:
1. **Block** destructive operations without explicit request
2. **Allow** read operations freely
3. **Warn** on write operations
4. **Require** explicit confirmation for dangerous actions

## Emergency Override

In genuine emergencies, users can:
1. Set `emergency_override_enabled: true` in config
2. Provide emergency override token
3. Document reason for emergency action

**Note**: Emergency override is disabled by default.

## Integration with Hooks

This skill provides **guidance** - you understand the rules.
The hook provides **enforcement** - violations are blocked.

Together they prevent:
- Accidental VM/container destruction
- Unintended infrastructure changes
- Production outages from careless commands
