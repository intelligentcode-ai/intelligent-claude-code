# Detect Work Type

**BEHAVIORAL:** Auto-detect patterns from $ARGUMENTS.

Analyze task content in $ARGUMENTS to determine work type and required specialist roles.

## Behavior
Scans task title and description to identify work domain patterns (AI-agentic, infrastructure, security, etc.) and determines which specialist architect and roles are required.

## Arguments
**Format:** "Task: [task_title] | Description: [task_description]"
**Example:** "Task: Update behavioral patterns in modes/ | Description: Refactor AI coordination logic"

## Core Actions

### Work Type Detection
1. **AI-Agentic Work Detection**
   - Keywords: AI, ML, agentic, behavioral, modes/, neural, automation, intelligence
   - Required: @AI-Architect or @AI-Engineer
   - Blocked: @Developer (generic roles not allowed)

2. **Infrastructure Work Detection**
   - Keywords: deploy, infrastructure, docker, kubernetes, cloud, server, DevOps
   - Required: @System-Engineer or @DevOps-Engineer
   - Blocked: @Developer, @Web-Designer

3. **Security Work Detection**
   - Keywords: security, auth, encrypt, OAuth, credentials, vulnerability, compliance
   - Required: @Security-Engineer with @Security-Architect review
   - Blocked: @Developer (security expertise mandatory)

4. **Database Work Detection**
   - Keywords: database, SQL, schema, migration, query, data model
   - Required: @Database-Engineer
   - Blocked: @Web-Designer, @Frontend-Tester

5. **Frontend Work Detection**
   - Keywords: UI, UX, React, CSS, frontend, interface, design
   - Required: @Web-Designer or @Frontend-Developer
   - Blocked: @Database-Engineer, @Backend-Tester

### Pattern Matching Logic
- Require **2+ keyword matches** for work type classification
- **Multiple matches**: Prioritize security > AI > infrastructure > other
- **No matches**: Default to "general" but require specialist review
- **Mixed types**: Require multiple specialists with primary architect

## Results Format
```
Work Type: [detected_type]
Required Architect: @[Specialist]-Architect
Required Roles: [@Role1, @Role2]
Blocked Roles: [@BlockedRole1, @BlockedRole2]
Confidence: [high|medium|low]
```

## Error Handling
- **Insufficient Content**: "❌ Need task title and description for analysis"
- **Ambiguous Type**: "⚠️ Multiple work types detected - requires specialist consultation"
- **Security Critical**: "🚨 Security work detected - @Security-Engineer mandatory"
