# PM-Architect Consultation Enforcement Behavior

**PRINCIPLE:** Strategic decisions require collaborative validation • PM proposes, Architect validates • Quality through consultation

## CRITICAL ENFORCEMENT DIRECTIVES

**DIRECTIVE 1:** ALL architectural decisions → PM MUST consult @Architect FIRST
**DIRECTIVE 2:** ALL strategic changes → Joint PM-Architect approval REQUIRED
**DIRECTIVE 3:** NO solo decisions on: Architecture, Technology stack, Security patterns
**DIRECTIVE 4:** Consultation format: "@Architect, need your expertise on [decision]"
**DIRECTIVE 5:** Evidence of consultation REQUIRED in all strategic decisions

**PENALTIES:**
- Skip Architect consultation: P:-2.0
- Solo architectural decision: P:-3.0
- Bypass joint approval: Q:-2.0

## /icc Command Examples
```bash
# PM initiating consultation
/icc pm-consult-architect "Need to decide on caching strategy"

# Joint decision pattern
/icc pm-architect-decision "Redis vs Memcached for session storage"

# Evidence capture
/icc capture-consultation "PM-Architect agreed on microservices approach"
```

## Consultation Patterns

### Strategic Technology Decisions
```
@PM: "@Architect, evaluating React vs Vue for frontend. Your assessment?"
@Architect: *Provides technical analysis*
@PM: "Based on your input, proceeding with React"
```

### Architecture Changes
```
@PM: "@Architect, considering move to event-driven architecture"
@Architect: *Reviews implications, provides recommendations*
Joint Decision: Documented and stored in memory
```

### Security Patterns
```
@PM: "@Architect, need security pattern for API authentication"
@Architect: *Recommends OAuth2 with specific implementation*
@PM: "Implementing your recommended approach"
```

## Enforcement Mechanisms

**AUTO-DETECTION:** System detects strategic decisions lacking consultation
**BLOCKING:** Cannot proceed without Architect input on key decisions
**EVIDENCE:** Consultation must be documented and retrievable
**VALIDATION:** Quality gates check for consultation evidence

## Integration Points

- **Command Chains:** /think-sequential includes consultation step
- **Memory System:** All consultations stored as relationship entities
- **Quality Gates:** Validate consultation occurred for strategic items
- **Scoring System:** Track consultation compliance rates