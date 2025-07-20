# Role Detection Engine

**Purpose:** Detect role assignments and mentions in text  
**Pattern:** @Role-Name or @Technology-BaseRole

## Detection Patterns

### Pattern Types
- **Direct mention:** @Role or @Role-Specialist
- **YAML assignment:** assigned_to: @Role
- **Communication format:** @Role (P:x, Q:y):

### Core Roles
PM, Architect, Developer, System-Engineer, DevOps-Engineer, Database-Engineer, Security-Engineer, AI-Engineer, Web-Designer, QA-Engineer, Frontend-Tester, Backend-Tester, Requirements-Engineer, User-Role

## Detection Process

**Pattern Matching:** Use `/icc-detect-role [content]` to scan text for @-notation patterns, extract role names, validate against core roles  
**Role Validation:** Use `/icc-validate-role [role_name]` to check if core role OR Technology-BaseRole format, return valid roles only  
**Type Classification:** Use `/icc-classify-role-mention [role_mention]` for direct mention, task_assignment, communication format

## Dynamic Specialist Validation

**Format Check:** Use `/icc-validate-specialist-format [role_name]` to split on hyphen, expect exactly 2 parts, validate Technology-BaseRole  
**Base Role Check:** Use `/icc-validate-base-role [base_role]` to ensure second part is core role, first part is technology domain  
**Capability Merge:** Use `/icc-merge-capabilities [base_role] [domain]` to combine base role capabilities + domain expertise

## Integration Flow

**Assignment Processing:** Use `/icc-process-role-assignments [content]` to detect roles in content, validate each role, activate valid roles, log invalid attempts  
**Role Activation:** Use `/icc-activate-role [detected_role]` when valid role detected to trigger role switch and apply role behavior

## Examples

```yaml
# Direct assignment
"Assigned to: @AI-Engineer" → {role: "AI-Engineer", type: "task_assignment"}

# Dynamic specialist  
"@React-Developer to implement UI" → {role: "React-Developer", type: "direct_mention"}

# Role communication
"@PM (P:5.5, Q:8.0): Delegating" → {role: "PM", type: "communication"}
```

---
*Ultra-optimized role detection engine*