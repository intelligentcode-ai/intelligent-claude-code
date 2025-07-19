# Work Type Validation

Detect work type and recommend appropriate specialist roles using $ARGUMENTS as work description.

## Behavioral Sequence
1. Parse $ARGUMENTS as work description text
2. If work description empty, respond "Error: Work description required for validation"
3. Analyze work content for domain keywords:
   - AI/ML keywords: "AI", "ML", "agentic", "behavioral", "modes/", "neural", "model"
   - Infrastructure: "deploy", "infrastructure", "docker", "kubernetes", "CI/CD", "server"
   - Security: "security", "auth", "encrypt", "OAuth", "vulnerability", "compliance"
   - Database: "database", "SQL", "schema", "migration", "query", "data"
   - Frontend: "UI", "UX", "React", "CSS", "frontend", "component", "styling"
   - Backend: "API", "endpoint", "service", "backend", "server", "integration"
4. Detect work type based on keyword matches:
   - Count matches for each domain
   - Require minimum 2 keywords for domain classification
   - If multiple domains match, identify primary and secondary
5. For each detected work type, identify:
   - Required specialist architect (@AI-Architect, @System-Architect, etc.)
   - Appropriate specialist roles (@AI-Engineer, @DevOps-Engineer, etc.)
   - Blocked roles (generic roles that shouldn't handle specialist work)
6. Calculate capability match for proposed roles:
   - Load role capabilities from `~/.claude/roles/specialists.md`
   - Score content match against role capabilities
   - Calculate percentage match (matches / total_capabilities)
7. Apply validation rules:
   - If capability match < 70%, flag need for dynamic specialist
   - If work type detected but generic role proposed, block assignment
   - If specialist work but no architect approval, require triage
8. Generate recommendations:
   - Primary recommendation: Best matching specialist
   - Alternative options if primary unavailable
   - Dynamic specialist name if needed (@Domain-BaseRole)
   - Required approvals (PM + Specialist Architect)
9. Output validation result:
   ```
   🔍 Work Type Analysis:
   Primary Domain: [domain] (confidence: X%)
   Required Specialist: @[RecommendedRole]
   Capability Match: X%
   Required Approvals: @PM + @[SpecialistArchitect]
   ⚠️ Blocked Roles: @[BlockedRole1], @[BlockedRole2]
   ```
10. Store validation result for audit trail

## Error Handling
- Empty work description: "Error: Work description required for validation"
- No domain keywords found: "Info: Generic work - any core role acceptable"
- Multiple equal domains: "Warning: Multi-domain work detected - requires @Architect review"
- Unknown role in validation: "Error: Proposed role @[Role] not found in system"
- System not initialized: "Error: Role validation requires initialized system"

## Validation Logic
```
WORK_TYPES = {
  "ai": {
    keywords: ["AI", "ML", "agentic", "behavioral", "modes/"],
    architect: "@AI-Architect",
    roles: ["@AI-Engineer"],
    blocked: ["@Developer", "@Web-Designer"]
  },
  "infrastructure": {
    keywords: ["deploy", "infrastructure", "docker", "kubernetes"],
    architect: "@System-Architect", 
    roles: ["@DevOps-Engineer", "@System-Engineer"],
    blocked: ["@Developer", "@Web-Designer"]
  }
}
```

## Command Chaining
- Output format allows piping validation results to assignment commands
- If --enforce flag present, block execution if validation fails
- If --create-specialist flag present, auto-create dynamic specialist