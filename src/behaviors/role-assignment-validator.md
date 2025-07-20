# Role Assignment Validator

**Purpose:** Validate role assignments match capability requirements  
**Rule:** >70% capability match + architect approval for specialist work

## Work Type Detection

### AI Work
- **Keywords:** AI, ML, agentic, behavioral, modes/
- **Architect:** @AI-Architect
- **Roles:** @AI-Engineer
- **Blocked:** @Developer

### Infrastructure Work
- **Keywords:** deploy, infrastructure, docker, kubernetes
- **Architect:** @System-Architect
- **Roles:** @DevOps-Engineer
- **Blocked:** @Developer

### Security Work
- **Keywords:** security, auth, encrypt, OAuth
- **Architect:** @Security-Architect
- **Roles:** @Security-Engineer
- **Blocked:** @Developer

### Database Work
- **Keywords:** database, SQL, schema, migration
- **Architect:** @Data-Architect
- **Roles:** @Database-Engineer
- **Blocked:** @Web-Designer

### Frontend Work
- **Keywords:** UI, UX, React, CSS, frontend
- **Architect:** @Frontend-Architect
- **Roles:** @Web-Designer
- **Blocked:** @Database-Engineer

## Role Capabilities

**Capability Assessment:** Use `/icc-capability-match [role] [task_content]` for automated capability scoring and recommendations

## Validation Process

**Work Type Detection:** Use `/icc-detect-work-type [task_content]` for domain analysis and role recommendations  
**Capability Matching:** Apply validation results from work type detection command  
**Architect Approval:** Use `/icc-require-triage [pm_role] [specialist_architect]` for approval workflow  
**Role Blocking:** Command provides alternative suggestions for blocked roles

## Validation Chain

**Story Validation:** Follow command sequence: `/icc-detect-work-type` → `/icc-require-triage` → `/icc-validate-assignments`  
**Task Validation:** Use `/icc-validate-assignments [task] [proposed_role]` for capability verification  
**Failure Actions:** Commands provide suggestions and alternatives automatically

## Integration

**Assignment Flow:** Use command chain for validation and role activation via `/icc-activate-role`  
**Command Integration:** All validation handled through dedicated commands for consistency

## Examples

```yaml
# AI Work
Task: "Update behavioral patterns in modes/"
Result: @AI-Engineer with @AI-Architect approval

# Infrastructure
Task: "Deploy kubernetes"
Result: @DevOps-Engineer (blocked @Developer)

# Security
Task: "Design auth system"
Result: @Security-Engineer with @Security-Architect approval
```

---
*Ultra-optimized role assignment validation*