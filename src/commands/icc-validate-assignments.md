# Validate Assignments

Validate role assignments against capability requirements using >70% threshold enforcement in $ARGUMENTS.

## Behavior
Capability matching analysis ensuring roles have sufficient domain expertise. Enforces >70% threshold and blocks inappropriate assignments.

## Arguments
**Format:** "Task: [task_name] | Role: @[assigned_role] | Requirements: [capability_list]"
**Example:** "Task: Design AI system | Role: @AI-Engineer | Requirements: ML, behavioral patterns"

## Core Actions

### Capability Matching Analysis
1. **Role Capabilities**
   - **@AI-Engineer**: ML, AI systems, neural networks, automation, behavioral patterns
   - **@DevOps-Engineer**: CI/CD, deployment, infrastructure, containers, cloud platforms
   - **@Security-Engineer**: Security protocols, encryption, auth systems, vulnerability assessment
   - **@Database-Engineer**: SQL, database design, query optimization, data modeling
   - **@Web-Designer**: UI/UX, frontend frameworks, CSS, user experience, visual design
   - **@Developer**: General programming, APIs (BLOCKED for specialist work)

2. **Match Calculation**: (matched ∩ required) / total_required * 100 > 70%

3. **Dynamic Specialist Creation**: <70% match → @[Technology]-[BaseRole] + Context7 docs

### Assignment Validation Rules

#### Mandatory Specialist Requirements
- **AI-agentic**: @AI-Engineer/@AI-Architect/@[ML-Tech]-Engineer
- **Infrastructure**: @DevOps-Engineer/@System-Engineer/@[Cloud]-Engineer  
- **Security**: @Security-Engineer (no exceptions)
- **Database**: @Database-Engineer/@[DB-Tech]-Engineer
- **Frontend**: @Web-Designer/@[Frontend-Tech]-Developer

#### Blocked Assignments
- **@Developer** → Any specialist work
- **@Web-Designer** → Backend/database/infrastructure
- **@Database-Engineer** → Frontend UI/UX
- **Generic roles** → Domain-specific work

### Capability Assessment Matrix
| Role | AI | Infra | Security | DB | Frontend | Backend |
|------|----|----|----|----|----|----|
| @AI-Engineer | 95% | 20% | 30% | 25% | 15% | 60% |
| @DevOps-Engineer | 15% | 90% | 50% | 30% | 10% | 40% |
| @Security-Engineer | 25% | 40% | 95% | 35% | 20% | 50% |
| @Database-Engineer | 20% | 25% | 40% | 95% | 10% | 70% |
| @Web-Designer | 10% | 5% | 15% | 10% | 90% | 20% |
| @Developer | 40% | 40% | 30% | 50% | 50% | 80% |

### Validation Results Format
```
Validation: [timestamp] | Task: [name] | Role: @[role] | Match: [XX%]
Status: [APPROVED|REJECTED|REQUIRES_SPECIALIST] | Action: [recommendation]
```

## Specialist Creation Logic
<70% match → @[Technology]-[BaseRole] + Context7 docs + domain expertise

## Error Handling
- **Below 70%**: "❌ [XX%] below threshold - insufficient for [task_type]"
- **Blocked**: "🚨 @[role] cannot handle [work_type] - requires @[appropriate_role]"
- **Missing Caps**: "⚠️ Missing: [capabilities]"
- **Need Specialist**: "💡 Create @[Tech]-[BaseRole] with [XX%] match"
- **Invalid Role**: "❌ Role not recognized - use standard or create specialist"
