# Infrastructure Protection System

## Overview

The Infrastructure Protection system enforces **Infrastructure-as-Code (IaC) principles** by guiding users toward declarative infrastructure management tools instead of imperative command-line operations.

### Purpose

- **Enforce IaC Best Practices**: Encourage Terraform, Ansible, Helm, and other declarative tools
- **Prevent Accidental Destruction**: Block imperative destructive commands that bypass version control
- **Maintain Audit Trail**: Ensure all infrastructure changes are tracked and reproducible
- **Guide, Not Block**: Provide clear alternatives when blocking imperative operations

### Philosophy

The system is **educational and protective**, not restrictive:

- **Block imperative destructive commands** (kubectl delete, Remove-VM) → Suggest IaC alternatives
- **Allow read operations** (kubectl get, Get-VM) → Information gathering is safe
- **Provide emergency override** → Critical production issues can bypass protection
- **Scope: Agents only** → PM role already blocked from all infrastructure tools

### Scope

- **Agents**: Infrastructure protection applies to all technical agents (@Developer, @DevOps-Engineer, etc.)
- **PM Role**: Completely blocked from ALL infrastructure tools (coordination role, not execution)
- **Platforms Supported**: VMware (govc, ESXi CLI), Hyper-V (PowerShell), Kubernetes (kubectl), Linux (virsh, VirtualBox), Proxmox (qm, pct), Vagrant, Multipass, Azure (PowerShell)

---

## Configuration

All settings are in `icc.config.json` under `enforcement.infrastructure_protection`:

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enabled` | boolean | `true` | Enable/disable infrastructure protection |
| `enforce_iac_only` | boolean | `true` | Block write operations, suggest IaC alternatives |
| `imperative_destructive` | array | 34 commands | Commands that destroy infrastructure |
| `write_operations` | array | 42 commands | Commands that modify infrastructure state |
| `read_operations` | array | 31 commands | Commands that only read infrastructure state |
| `pm_blocked_all` | array | 9 tools | Infrastructure tools completely blocked for PM |
| `whitelist` | array | `[]` | Commands allowed despite protection |
| `read_operations_allowed` | boolean | `true` | Allow read commands (get, list, info) |
| `emergency_override_enabled` | boolean | `false` | Enable emergency override mechanism |
| `emergency_override_token` | string | `""` | Secret token for emergency overrides |

### Configuration Example

```json
{
  "enforcement": {
    "blocking_enabled": true,
    "infrastructure_protection": {
      "enabled": true,
      "enforce_iac_only": true,
      "emergency_override_enabled": false,
      "read_operations_allowed": true,
      "imperative_destructive": [
        "kubectl delete",
        "Remove-VM",
        "govc vm.destroy",
        "virsh destroy"
      ],
      "write_operations": [
        "kubectl apply",
        "Start-VM",
        "govc vm.power"
      ],
      "read_operations": [
        "kubectl get",
        "Get-VM",
        "govc vm.info"
      ],
      "pm_blocked_all": [
        "govc",
        "esxcli",
        "virsh",
        "kubectl"
      ],
      "whitelist": [],
      "emergency_override_token": ""
    }
  }
}
```

---

## Command Categories

### Imperative Destructive Commands

**Description**: Commands that irreversibly delete or destroy infrastructure. **Always blocked** when `enforce_iac_only=true`.

| Platform | Commands | IaC Alternative |
|----------|----------|-----------------|
| **Kubernetes** | `kubectl delete`, `kubectl drain`, `kubectl cordon` | Helm uninstall, remove manifest + `kubectl apply` |
| **VMware (govc)** | `govc vm.destroy`, `govc vm.remove`, `govc pool.destroy` | Terraform destroy, Ansible state=absent |
| **VMware (ESXi)** | `esxcli vm process kill` | Terraform destroy |
| **Hyper-V** | `Remove-VM`, `Remove-VirtualDisk`, `Remove-VMSnapshot` | Ansible playbook with state=absent |
| **Azure** | `Remove-AzVM`, `Remove-AzDisk` | Terraform destroy, ARM template deletion |
| **Linux (virsh)** | `virsh destroy`, `virsh undefine` | Terraform destroy, Ansible state=absent |
| **VirtualBox** | `vboxmanage unregistervm` | Vagrant destroy + Vagrantfile |
| **Proxmox** | `qm destroy`, `pct destroy` | Terraform destroy |
| **Multipass** | `multipass delete` | Cloud-init + instance recreation |
| **Vagrant** | `vagrant destroy` | Vagrantfile versioning + vagrant up |

**Error Message When Blocked**:
```
🚫 Infrastructure Protection: Imperative destructive command blocked

Command: kubectl delete deployment/my-app
Reason: Imperative destructive operations bypass IaC version control

IaC Alternatives:
✅ Helm: helm uninstall my-app
✅ Manifest: Remove deployment.yaml and run kubectl apply -f .
✅ Terraform: terraform destroy -target=kubernetes_deployment.my_app

Emergency Override: EMERGENCY_OVERRIDE:<token> kubectl delete deployment/my-app
```

### Write Operations

**Description**: Commands that modify infrastructure state but are not destructive. **Blocked** when `enforce_iac_only=true`.

| Platform | Commands | When Blocked |
|----------|----------|--------------|
| **Kubernetes** | `kubectl apply`, `kubectl create`, `kubectl patch`, `kubectl scale`, `kubectl set` | When enforce_iac_only=true |
| **VMware (govc)** | `govc vm.power`, `govc vm.shutdown`, `govc vm.create` | When enforce_iac_only=true |
| **VMware (ESXi)** | `esxcli system shutdown`, `esxcli system reboot` | When enforce_iac_only=true |
| **Hyper-V** | `Start-VM`, `Stop-VM`, `Restart-VM`, `New-VM`, `Set-VM` | When enforce_iac_only=true |
| **Azure** | `New-AzVM`, `Start-AzVM`, `Stop-AzVM`, `Restart-AzVM` | When enforce_iac_only=true |
| **Linux (virsh)** | `virsh start`, `virsh shutdown`, `virsh reboot` | When enforce_iac_only=true |
| **VirtualBox** | `vboxmanage startvm`, `vboxmanage controlvm` | When enforce_iac_only=true |
| **Proxmox** | `qm start`, `qm shutdown`, `qm reboot` | When enforce_iac_only=true |
| **Vagrant** | `vagrant up`, `vagrant halt`, `vagrant reload` | When enforce_iac_only=true |
| **Multipass** | `multipass start`, `multipass stop` | When enforce_iac_only=true |

**Error Message When Blocked**:
```
🚫 Infrastructure Protection: Write operation blocked

Command: kubectl apply -f deployment.yaml
Reason: Imperative write operations should use IaC tools

IaC Alternatives:
✅ Helm: helm upgrade --install my-app ./chart
✅ Terraform: terraform apply
✅ ArgoCD: Git-based deployment with automatic sync

Emergency Override: EMERGENCY_OVERRIDE:<token> kubectl apply -f deployment.yaml
```

### Read Operations

**Description**: Commands that only read infrastructure state. **Allowed by default** when `read_operations_allowed=true`.

| Platform | Commands | Always Safe |
|----------|----------|-------------|
| **Kubernetes** | `kubectl get`, `kubectl describe`, `kubectl logs`, `kubectl top`, `kubectl explain` | ✅ Yes |
| **VMware (govc)** | `govc vm.info`, `govc ls`, `govc find` | ✅ Yes |
| **VMware (ESXi)** | `esxcli system version` | ✅ Yes |
| **Hyper-V** | `Get-VM`, `Get-VMHost`, `Get-VMSwitch`, `Get-Service` | ✅ Yes |
| **Azure** | `Get-AzVM`, `Get-AzDisk`, `Get-AzResource` | ✅ Yes |
| **Linux (virsh)** | `virsh list`, `virsh dominfo` | ✅ Yes |
| **VirtualBox** | `vboxmanage list` | ✅ Yes |
| **Proxmox** | `qm list`, `qm status`, `pct list`, `pct status` | ✅ Yes |
| **Vagrant** | `vagrant status` | ✅ Yes |
| **Multipass** | `multipass list`, `multipass info` | ✅ Yes |

**Note**: Read operations can be disabled by setting `read_operations_allowed=false`, but this is rarely necessary.

---

## IaC Alternatives

### Kubernetes

**Blocked**: `kubectl delete deployment/my-app`

**IaC Alternatives**:
```bash
# Helm (recommended)
helm uninstall my-app

# Manifest removal
rm kubernetes/deployment.yaml
kubectl apply -f kubernetes/

# Terraform
terraform destroy -target=kubernetes_deployment.my_app

# ArgoCD (GitOps)
git rm manifests/deployment.yaml
git commit -m "Remove deployment"
# ArgoCD syncs automatically
```

### VMware (govc)

**Blocked**: `govc vm.destroy /dc1/vm/my-vm`

**IaC Alternatives**:
```bash
# Terraform (recommended)
terraform destroy -target=vsphere_virtual_machine.my_vm

# Ansible
ansible-playbook -e "vm_state=absent" vmware.yml

# Packer + Terraform
# Remove VM definition from Terraform and destroy
```

### Hyper-V (PowerShell)

**Blocked**: `Remove-VM -Name "MyVM" -Force`

**IaC Alternatives**:
```bash
# Ansible (recommended)
ansible-playbook -e "vm_state=absent" hyperv.yml

# Terraform (with Hyper-V provider)
terraform destroy -target=hyperv_machine_instance.my_vm

# DSC (Desired State Configuration)
# Set VM state to absent in DSC configuration
```

### Azure (PowerShell)

**Blocked**: `Remove-AzVM -Name "myVM" -ResourceGroupName "myRG"`

**IaC Alternatives**:
```bash
# Terraform (recommended)
terraform destroy -target=azurerm_virtual_machine.my_vm

# ARM Templates
az deployment group delete --resource-group myRG --name myDeployment

# Bicep
az deployment group delete --resource-group myRG --name myDeployment

# Ansible
ansible-playbook -e "vm_state=absent" azure.yml
```

### Linux (virsh)

**Blocked**: `virsh destroy my-vm`

**IaC Alternatives**:
```bash
# Terraform (recommended)
terraform destroy -target=libvirt_domain.my_vm

# Ansible
ansible-playbook -e "vm_state=absent" kvm.yml

# Vagrant
vagrant destroy
# Requires Vagrantfile version control
```

---

## Error Messages

### Imperative Destructive Error

```
🚫 Infrastructure Protection: Imperative destructive command blocked

Command: kubectl delete deployment/my-app
Reason: Imperative destructive operations bypass IaC version control

IaC Alternatives:
✅ Helm: helm uninstall my-app
✅ Manifest: Remove deployment.yaml and run kubectl apply -f .
✅ Terraform: terraform destroy -target=kubernetes_deployment.my_app

Emergency Override: EMERGENCY_OVERRIDE:<token> kubectl delete deployment/my-app
```

### Write Operation Error

```
🚫 Infrastructure Protection: Write operation blocked

Command: kubectl apply -f deployment.yaml
Reason: Imperative write operations should use IaC tools

IaC Alternatives:
✅ Helm: helm upgrade --install my-app ./chart
✅ Terraform: terraform apply
✅ ArgoCD: Git-based deployment with automatic sync

Emergency Override: EMERGENCY_OVERRIDE:<token> kubectl apply -f deployment.yaml
```

### Read Operation Error (if disabled)

```
🚫 Infrastructure Protection: Read operation blocked

Command: kubectl get pods
Reason: read_operations_allowed=false in configuration

To enable read operations:
Set "read_operations_allowed": true in icc.config.json
```

---

## Emergency Override

### When to Use

Emergency overrides should **only** be used for:

- **Critical Production Issues**: Service down, immediate recovery needed
- **Emergency Rollbacks**: Deployment failure, need instant revert
- **Disaster Recovery**: Infrastructure failure, normal IaC tools unavailable

**NOT for**:
- Convenience ("faster than IaC")
- Skipping proper process
- Regular operations

### Configuration

Enable emergency override in `icc.config.json`:

```json
{
  "enforcement": {
    "infrastructure_protection": {
      "emergency_override_enabled": true,
      "emergency_override_token": "your-secret-token-here"
    }
  }
}
```

**Security**: Use a strong, random token. Store securely (environment variables, secrets manager).

### Usage

```bash
# Format: EMERGENCY_OVERRIDE:<token> <command>
EMERGENCY_OVERRIDE:your-secret-token kubectl delete pod/broken-pod

# PowerShell example
EMERGENCY_OVERRIDE:your-secret-token Remove-VM -Name "BrokenVM" -Force

# VMware example
EMERGENCY_OVERRIDE:your-secret-token govc vm.destroy /dc1/vm/failed-vm
```

### Audit Trail

All emergency overrides are logged:

```
[EMERGENCY_OVERRIDE] User: @DevOps-Engineer
[EMERGENCY_OVERRIDE] Command: kubectl delete pod/broken-pod
[EMERGENCY_OVERRIDE] Timestamp: 2025-10-06T14:32:10Z
[EMERGENCY_OVERRIDE] Reason: Production service down, immediate recovery
```

**Note**: Review emergency override logs regularly to ensure proper usage.

---

## Customization Examples

### Allow Specific Commands (Whitelist)

```json
{
  "enforcement": {
    "infrastructure_protection": {
      "whitelist": [
        "kubectl delete pod",
        "kubectl delete job",
        "multipass delete"
      ]
    }
  }
}
```

**Use Case**: Allow deletion of transient resources (pods, jobs) that are recreated automatically.

### Disable Enforcement Entirely

```json
{
  "enforcement": {
    "blocking_enabled": false
  }
}
```

**Use Case**: Learning environments, development workstations, exploratory projects.

**Note**: Infrastructure protection is still **active** but provides **warnings** instead of **blocking**.

### Project-Specific Overrides

Create `icc.config.json` in your project root:

```json
{
  "enforcement": {
    "infrastructure_protection": {
      "enforce_iac_only": false,
      "read_operations_allowed": true,
      "whitelist": [
        "kubectl apply",
        "kubectl delete configmap",
        "kubectl delete secret"
      ]
    }
  }
}
```

**Use Case**: Project requires frequent imperative operations for testing/development.

### Disable Read Operation Blocking

```json
{
  "enforcement": {
    "infrastructure_protection": {
      "read_operations_allowed": false
    }
  }
}
```

**Use Case**: Highly restricted environments where even read access needs approval.

---

## PM Role Restrictions

### Complete Infrastructure Tool Block

PM role is **completely blocked** from ALL infrastructure tools, regardless of command type:

**Blocked Tools**:
- `govc` (VMware CLI)
- `esxcli` (ESXi CLI)
- `vcsa-cli` (vCenter CLI)
- `virsh` (KVM/QEMU)
- `vboxmanage` (VirtualBox)
- `qm` (Proxmox VMs)
- `pct` (Proxmox containers)
- `multipass` (Canonical Multipass)
- `vagrant` (HashiCorp Vagrant)
- `packer` (HashiCorp Packer)

### Rationale

- **PM = Coordination**: Project management focuses on planning, not execution
- **No Infrastructure Access**: PM creates AgentTasks, agents execute infrastructure operations
- **Delegation Pattern**: PM identifies infrastructure work → Creates AgentTask → Assigns @DevOps-Engineer

### Error Message (PM Role)

```
🚫 PM Role Restriction: Infrastructure tool blocked

Tool: govc
Reason: PM role focuses on coordination, not infrastructure manipulation

Delegation Pattern:
1. Create AgentTask for infrastructure work
2. Assign to @DevOps-Engineer or @System-Engineer
3. Agent executes with proper IaC tools
```

---

## PowerShell Support

### Imperative Destructive (Always Blocked)

| Command | Description | IaC Alternative |
|---------|-------------|-----------------|
| `Remove-VM` | Delete virtual machine | Ansible state=absent |
| `Remove-VirtualDisk` | Delete virtual disk | Terraform destroy |
| `Remove-VMHardDiskDrive` | Remove VM disk | Ansible playbook |
| `Remove-VMSnapshot` | Delete VM snapshot | Terraform state management |
| `Remove-AzVM` | Delete Azure VM | Terraform destroy |
| `Remove-AzDisk` | Delete Azure disk | ARM template deletion |

### Write Operations (Blocked when enforce_iac_only=true)

| Command | Description | IaC Alternative |
|---------|-------------|-----------------|
| `Start-VM` | Start virtual machine | Terraform apply |
| `Stop-VM` | Stop virtual machine | Terraform apply |
| `Restart-VM` | Restart virtual machine | Terraform apply |
| `Suspend-VM` | Suspend virtual machine | Terraform apply |
| `Resume-VM` | Resume virtual machine | Terraform apply |
| `New-VM` | Create virtual machine | Terraform apply |
| `Set-VM` | Modify VM configuration | Terraform apply |
| `Start-Service` | Start Windows service | DSC configuration |
| `Stop-Service` | Stop Windows service | DSC configuration |
| `Restart-Service` | Restart Windows service | DSC configuration |
| `New-AzVM` | Create Azure VM | Terraform apply |
| `Start-AzVM` | Start Azure VM | Terraform apply |
| `Stop-AzVM` | Stop Azure VM | Terraform apply |
| `Restart-AzVM` | Restart Azure VM | Terraform apply |

### Read Operations (Allowed by default)

| Command | Description | Always Safe |
|---------|-------------|-------------|
| `Get-VM` | Get VM information | ✅ Yes |
| `Get-VMHost` | Get Hyper-V host info | ✅ Yes |
| `Get-VMSwitch` | Get virtual switch info | ✅ Yes |
| `Get-VMNetworkAdapter` | Get VM network adapter | ✅ Yes |
| `Get-VirtualDisk` | Get virtual disk info | ✅ Yes |
| `Get-VMHardDiskDrive` | Get VM disk info | ✅ Yes |
| `Get-VMSnapshot` | Get VM snapshot info | ✅ Yes |
| `Get-Service` | Get Windows service info | ✅ Yes |
| `Get-AzVM` | Get Azure VM info | ✅ Yes |
| `Get-AzDisk` | Get Azure disk info | ✅ Yes |
| `Get-AzResource` | Get Azure resource info | ✅ Yes |

---

## Related Documentation

- **[Configuration Guide](/Users/karsten/Nextcloud/Work/Development/intelligentcode-ai/intelligent-claude-code/docs/configuration-guide.md)**: Complete configuration reference
- **[Enforcement Hooks](/Users/karsten/Nextcloud/Work/Development/intelligentcode-ai/intelligent-claude-code/src/hooks/infrastructure-protection.js)**: Hook implementation details
- **[PM Constraints](/Users/karsten/Nextcloud/Work/Development/intelligentcode-ai/intelligent-claude-code/src/hooks/pm-constraints-enforcement.js)**: PM role restrictions

## IaC Tool Documentation

- **[Terraform](https://www.terraform.io/docs)**: Infrastructure as Code
- **[Ansible](https://docs.ansible.com/)**: Configuration management and automation
- **[Helm](https://helm.sh/docs/)**: Kubernetes package manager
- **[ArgoCD](https://argo-cd.readthedocs.io/)**: GitOps continuous delivery
- **[Packer](https://www.packer.io/docs)**: Image building automation
- **[Vagrant](https://www.vagrantup.com/docs)**: Development environment automation
