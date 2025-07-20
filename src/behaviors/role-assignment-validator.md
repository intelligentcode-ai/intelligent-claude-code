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

- **Developer:** programming, API, testing
- **AI-Engineer:** ML, AI, automation
- **DevOps-Engineer:** CI/CD, deployment, infrastructure
- **Database-Engineer:** SQL, data, queries
- **Security-Engineer:** security, encryption, auth
- **Web-Designer:** UI, frontend, CSS

## Validation Process

**Work Type Detection:** Scan task title + description → Match 2+ keywords → Identify work type  
**Capability Matching:** Compare role capabilities to task content → Calculate match percentage → Require >70%  
**Architect Approval:** IF specialist work detected → Require architect approval → Block without approval  
**Role Blocking:** Check blocked roles for work type → Suggest alternative if blocked

## Validation Chain

**Story Validation:** icc:detect-work-type → Identify specialist architect → Check PM+Architect triage → Validate all task assignments → Require joint approval  
**Task Validation:** icc:validate-assignments → Check capability match → Verify not blocked → Ensure architect approval  
**Failure Actions:** Low capability → Suggest better role • Blocked role → Suggest alternative • No approval → Require triage

## Integration

**Assignment Flow:** Validate role → IF invalid: Use suggested role → IF no suggestions: Block assignment → Activate validated role  
**Command Integration:** icc:validate-assignments performs checks → icc:require-triage ensures approval → icc:activate-role assigns specialist

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