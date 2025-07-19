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

**Pattern Matching:** Scan text for @-notation patterns → Extract role names → Validate against core roles  
**Role Validation:** Check if core role → OR check if Technology-BaseRole format → Return valid roles only  
**Type Classification:** Direct mention → task_assignment → communication format

## Dynamic Specialist Validation

**Format Check:** Split on hyphen → Expect exactly 2 parts → Technology-BaseRole  
**Base Role Check:** Second part must be core role → First part is technology domain  
**Capability Merge:** Combine base role capabilities + domain expertise

## Integration Flow

**Assignment Processing:** Detect roles in content → Validate each role → Activate valid roles → Log invalid attempts  
**Role Activation:** Valid role detected → Trigger role switch → Apply role behavior

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